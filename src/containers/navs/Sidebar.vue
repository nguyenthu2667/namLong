<template>
  <div class="sidebar" @click.stop="() => {}">
    <div class="main-menu">
      <vue-perfect-scrollbar
        class="scroll"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <ul class="list-unstyled">
          <li
            v-for="(item, index) in filteredMenuItems(menuItems)"
            :id="'tooltip-target-' + item.id"
            :class="{
              active:
                (selectedParentMenu === item.id && viewingParentMenu === '') ||
                viewingParentMenu === item.id,
            }"
            :key="`parent_${index}`"
            :data-flag="item.id"
          >
            <a
              v-if="item.newWindow"
              :href="item.to"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i :class="item.icon" />
              {{ item.label }}
            </a>
            <a
              v-else-if="item.subs && item.subs.length > 0"
              @click.prevent="openSubMenu($event, item)"
              :href="`#${item.to}`"
            >
              <i :class="item.icon" />
              <!-- level-1 -->
              <!-- {{ $t(item.label) }} -->
            </a>
            <router-link
              v-else
              @click.native="changeSelectedParentHasNoSubmenu(item.id)"
              :to="item.to"
            >
              <i :class="item.icon" />
              <!-- {{ item.label }} -->
            </router-link>
            <b-tooltip
              :target="'tooltip-target-' + item.id"
              triggers="hover"
              placement="right"
              id="cus-tooltip"
            >
              <div>
                <strong>
                  {{ item.label.toUpperCase() }}
                </strong>
              </div>
            </b-tooltip>
          </li>
        </ul>
      </vue-perfect-scrollbar>
    </div>
    <div class="sub-menu">
      <vue-perfect-scrollbar
        class="scroll"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <ul
          v-for="(item, itemIndex) in filteredMenuItems(menuItems)"
          :class="{
            'list-unstyled': true,
            'd-block':
              (selectedParentMenu === item.id && viewingParentMenu === '') ||
              viewingParentMenu === item.id,
          }"
          :data-parent="item.id"
          :key="`sub_${item.id}`"
        >
          <li
            v-for="(sub, subIndex) in filteredMenuItems(item.subs)"
            :key="`sub_${subIndex}`"
            :class="{
              'has-sub-item': sub.subs && sub.subs.length > 0,
              active: $route.path.indexOf(sub.to) > -1,
            }"
          >
            <a
              v-if="sub.newWindow"
              :href="sub.to"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i :class="sub.icon" />
              <span>{{ sub.label }}</span>
            </a>
            <template v-else-if="sub.subs && sub.subs.length > 0">
              <b-link
                v-b-toggle="`menu_${itemIndex}_${subIndex}`"
                variant="link"
                class="rotate-arrow-icon opacity-50"
              >
                <i class="simple-icon-arrow-down"></i>
                <span class="d-inline-block">{{ sub.label }}</span>
              </b-link>
              <b-collapse :id="`menu_${itemIndex}_${subIndex}`" visible>
                <ul class="list-unstyled third-level-menu">
                  <li
                    v-for="(thirdLevelSub, thirdIndex) in filteredMenuItems(
                      sub.subs
                    )"
                    :key="`third_${itemIndex}_${subIndex}_${thirdIndex}`"
                    :class="{
                      'third-level-menu': true,
                      active: $route.path === thirdLevelSub.to,
                    }"
                    @click.prevent="checkLayer(thirdLevelSub.to)"
                  >
                    <a
                      v-if="thirdLevelSub.newWindow"
                      :href="thirdLevelSub.to"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i :class="thirdLevelSub.icon" />
                      <span>{{ thirdLevelSub.label }}</span>
                    </a>
                    <!-- level-3 -->
                    <router-link
                      v-else
                      :to="
                        sub.action.toUpperCase() === 'MAP'
                          ? '#'
                          : thirdLevelSub.to
                      "
                    >
                      <template v-if="sub.action.toUpperCase() === 'MAP'">
                        <b-form-checkbox
                          :checked="selectedLayer.includes(thirdLevelSub.to)"
                          >{{ thirdLevelSub.label }}
                        </b-form-checkbox>
                      </template>
                      <template v-else>
                        <i :class="thirdLevelSub.icon" />
                        <span>{{ thirdLevelSub.label }}</span>
                      </template>
                    </router-link>
                  </li>
                </ul>
              </b-collapse>
            </template>
            <router-link
              v-else
              :to="sub.action.toUpperCase() === 'MAP' ? '#' : sub.to"
            >
              <!-- level-2 -->
              <template v-if="sub.action.toUpperCase() === 'MAP'">
                <div @click.prevent="checkType(sub.to)">
                  <b-form-checkbox :checked="selectedType.includes(sub.to)">
                    {{ sub.label }}
                  </b-form-checkbox>
                </div>
              </template>
              <template v-else>
                <i :class="sub.icon" />
                <span>{{ sub.label }}</span>
              </template>
            </router-link>
          </li>
        </ul>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  defaultRegionCode,
  defaultMapType,
  menuHiddenBreakpoint,
  subHiddenBreakpoint,
} from "../../constants/config";
import handling from "../../constants/handling";
import systemAPI from "@/api/modules/systemAPI.js";
import { adminRoot } from "@/constants/config";

export default {
  data() {
    return {
      adminRoot,
      selectedParentMenu: "",
      menuItems: null,
      viewingParentMenu: "",
      selectedType: [],
      selectedLayer: [],
    };
  },
  async created() {
    this.selectedType = await [`${this.regionCenter}${this.typeMap}`];
    this.selectedLayer = await this.layers;
    await this.getMenuRight();
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.handleDocumentClick);
    this.handleWindowResize();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters({
      layers: "layers",
      typeMap: "typeMap",
      regionCenter: "regionCenter",
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems",
    }),
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.getMenuRight();
      }
    },
    selectedLayer(arr) {
      this.setLayer(arr);
    },
    selectedType(arr) {
      let type = arr[0];
      let string = "";
      for (let i = 0; i < type.length - 2; i++) {
        string = string + type[i];
      }
      let typeFinal = type.split(string)[1];
      this.setTypeMap(typeFinal);
    },
    $route(to, from) {
      if (to.path !== from.path) {
        const toParentUrl = to.path.split("/").filter((x) => x !== "")[1];
        if (toParentUrl !== undefined || toParentUrl !== null) {
          this.selectedParentMenu = toParentUrl.toLowerCase();
        } else {
          this.selectedParentMenu = "002"; //bug
        }
        this.selectMenu();
        this.toggle();
        this.changeSideMenuStatus({
          step: 0,
          classNames: this.menuType,
          selectedMenuHasSubItems: this.selectedMenuHasSubItems,
        });

        window.scrollTo(0, top);
      }
    },
  },
  methods: {
    ...mapMutations([
      "changeSideMenuStatus",
      "addMenuClassname",
      "changeSelectedMenuHasSubItems",
    ]),
    ...mapActions(["setLayer", "setTypeMap"]),
    checkLayer(layer) {
      let numCheck = layer.split("/").length;
      if (numCheck === 1) {
        if (!this.selectedLayer.includes(layer)) {
          this.selectedLayer.push(layer);
        } else {
          this.selectedLayer.splice(this.selectedLayer.indexOf(layer), 1);
        }
      }
    },
    checkType(type) {
      this.selectedType = [];
      this.selectedType.push(type);
    },
    getMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          let result = [];
          handling.recursiveMenuRight(val.data, "0", result);
          this.menuItems = result[0].subs;
          this.selectMenu();
        })
        .catch((err) => {
          console.log(err);
          this.menuItems = [];
        });
    },
    selectMenu() {
      // bắt route.path để set đang ở đâu
      const currentParentUrl = this.$route.path
        .split("/")
        .filter((x) => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        if (currentParentUrl == "dashboards") {
          this.selectedParentMenu = "002"; //id dashboards = 001
        }
      } else {
        this.selectedParentMenu = "002"; //focus id default
      }
      this.isCurrentMenuHasSubItem();
    },
    isCurrentMenuHasSubItem() {
      if (!this.menuItems?.length > 0) return;
      const menuItem = this.menuItems.find(
        (x) => x.id == this.selectedParentMenu
      );
      const isCurrentMenuHasSubItem =
        menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
      if (isCurrentMenuHasSubItem != this.selectedMenuHasSubItems) {
        if (!isCurrentMenuHasSubItem) {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: false,
          });
        } else {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: true,
          });
        }
      }
      return isCurrentMenuHasSubItem;
    },

    changeSelectedParentHasNoSubmenu(parentMenu) {
      this.selectedParentMenu = parentMenu;
      this.viewingParentMenu = parentMenu;
      this.changeSelectedMenuHasSubItems(false);
      this.changeSideMenuStatus({
        step: 0,
        classNames: this.menuType,
        selectedMenuHasSubItems: false,
      });
    },

    openSubMenu(e, menuItem) {
      if (menuItem.action.toUpperCase() == "MAP") {
        this.$router.push(menuItem.to);
      }
      //===========================================================
      const selectedParent = menuItem.id;
      const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
      this.changeSelectedMenuHasSubItems(hasSubMenu);
      if (!hasSubMenu) {
        this.viewingParentMenu = selectedParent;
        this.selectedParentMenu = selectedParent;
        this.toggle();
      } else {
        const currentClasses = this.menuType
          ? this.menuType.split(" ").filter((x) => x !== "")
          : "";

        if (!currentClasses.includes("menu-mobile")) {
          if (
            currentClasses.includes("menu-sub-hidden") &&
            (this.menuClickCount === 2 || this.menuClickCount === 0)
          ) {
            this.changeSideMenuStatus({
              step: 3,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu,
            });
          } else if (
            currentClasses.includes("menu-hidden") &&
            (this.menuClickCount === 1 || this.menuClickCount === 3)
          ) {
            this.changeSideMenuStatus({
              step: 2,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu,
            });
          } else if (
            currentClasses.includes("menu-default") &&
            !currentClasses.includes("menu-sub-hidden") &&
            (this.menuClickCount === 1 || this.menuClickCount === 3)
          ) {
            this.changeSideMenuStatus({
              step: 0,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu,
            });
          }
        } else {
          this.addMenuClassname({
            classname: "sub-show-temporary",
            currentClasses: this.menuType,
          });
        }
        this.viewingParentMenu = selectedParent;
      }
    },
    handleDocumentClick(e) {
      this.viewingParentMenu = "";
      this.selectMenu();
      this.toggle();
    },
    toggle() {
      const currentClasses = this.menuType.split(" ").filter((x) => x !== "");
      if (
        currentClasses.includes("menu-sub-hidden") &&
        this.menuClickCount === 3
      ) {
        this.changeSideMenuStatus({
          step: 2,
          classNames: this.menuType,
          selectedMenuHasSubItems: this.selectedMenuHasSubItems,
        });
      } else if (
        currentClasses.includes("menu-hidden") ||
        currentClasses.includes("menu-mobile")
      ) {
        if (!(this.menuClickCount === 1 && !this.selectedMenuHasSubItems)) {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: this.selectedMenuHasSubItems,
          });
        }
      }
    },

    // Resize
    handleWindowResize(event) {
      if (event && !event.isTrusted) {
        return;
      }
      let nextClasses = this.getMenuClassesForResize(this.menuType);
      this.changeSideMenuStatus({
        step: 0,
        classNames: nextClasses.join(" "),
        selectedMenuHasSubItems: this.selectedMenuHasSubItems,
      });
    },
    getMenuClassesForResize(classes) {
      let nextClasses = classes.split(" ").filter((x) => x !== "");
      const windowWidth = window.innerWidth;

      if (windowWidth < menuHiddenBreakpoint) {
        nextClasses.push("menu-mobile");
      } else if (windowWidth < subHiddenBreakpoint) {
        nextClasses = nextClasses.filter((x) => x !== "menu-mobile");
        if (
          nextClasses.includes("menu-default") &&
          !nextClasses.includes("menu-sub-hidden")
        ) {
          nextClasses.push("menu-sub-hidden");
        }
      } else {
        nextClasses = nextClasses.filter((x) => x !== "menu-mobile");
        if (
          nextClasses.includes("menu-default") &&
          nextClasses.includes("menu-sub-hidden")
        ) {
          nextClasses = nextClasses.filter((x) => x !== "menu-sub-hidden");
        }
      }
      return nextClasses;
    },

    //For UserRole
    filteredMenuItems(menuItems) {
      return menuItems
        ? menuItems.filter(
            (x) =>
              !x.roles || (x.roles && x.roles.includes(this.currentUser.role))
          )
        : [];
    },
  },
};
</script>
<style>
#cus-tooltip {
  position: relative;
}
</style>
<style scoped>
.sidebar .sub-menu ul li {
  margin-left: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
  overflow: hidden;
  font-weight: 600;
}
</style>
