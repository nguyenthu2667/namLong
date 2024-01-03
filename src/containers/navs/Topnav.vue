<template>
  <nav class="navbar fixed-top">
    <!-- item-left -->
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click.prevent.stop="
          changeSideMenuStatus({
            step: menuClickCount + 1,
            classNames: menuType,
            selectedMenuHasSubItems,
          })
        "
      >
        <menu-icon />
      </a>
      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click.prevent.stop="changeSideMenuForMobile(menuType)"
      >
        <mobile-menu-icon />
      </a>
      <div class="d-inline-block">
        <b-dropdown
          id="langddm"
          class="ml-2"
          variant="light"
          size="sm"
          toggle-class="language-button"
        >
          <template slot="button-content" v-if="$i18n.locale">
            <template v-for="(k, index) in localeOptions">
              <b-img
                alt="img_language"
                fluid
                :key="index"
                :src="k.icon"
                width="30"
                v-if="k.id === $i18n.locale"
              />
            </template>
            <span class="name">{{ $i18n.locale.toUpperCase() }}</span>
          </template>
          <b-dropdown-item
            v-for="(l, index) in localeOptions"
            :key="index"
            @click="changeLocale(l.id, l.direction)"
          >
            <b-img fluid :src="l.icon" width="30" />
            {{ l.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <!-- item-center -->
    <router-link class="navbar-logo" :to="adminRoot">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
    </router-link>
    <!-- item-right -->
    <div class="navbar-right">
      <div class="d-none d-md-inline-block align-middle mr-3">
        <!-- <switches
          id="tool-mode-switch"
          v-model="isDarkActive"
          theme="custom"
          class="vue-switcher-small"
          color="primary"
        /> -->
        <!-- <b-tooltip
          target="tool-mode-switch"
          placement="left"
          title="Dark Mode"
        ></b-tooltip> -->
      </div>
      <div class="header-icons d-inline-block align-middle">
        <!-- notify -->
        <template v-if="notifyList && notifyList.length > 0">
          <div class="position-relative d-inline-block">
            <b-dropdown
              ref="dropdown"
              variant="empty"
              size="sm"
              right
              toggle-class="header-icon notificationButton"
              menu-class="position-absolute mt-3 notificationDropdown"
              no-caret
            >
              <template slot="button-content">
                <i class="simple-icon-bell" style="font-size: 18px" />
                <template
                  v-if="
                    notifyList.filter((x) => parseInt(x.IsView) === 0).length >
                    0
                  "
                >
                  <template
                    v-if="
                      notifyList.filter((x) => parseInt(x.IsView) === 0)
                        .length > 99
                    "
                  >
                    <span class="count">99+</span>
                  </template>
                  <template v-else>
                    <span class="count">
                      {{
                        notifyList.filter((x) => parseInt(x.IsView) === 0)
                          .length
                      }}
                    </span>
                  </template>
                </template>
              </template>
              <vue-perfect-scrollbar
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <template v-for="(n, index) in notifyList">
                  <div
                    class="d-flex flex-row"
                    :class="{
                      'mb-3': index + 1 < notifyList.length ? true : false,
                    }"
                    :key="index"
                  >
                    <div style="width: 50px; height: 50px">
                      <span @click="updateViewNotification(n)">
                        <b-img
                          :src="n.ImgLink"
                          alt="__images"
                          style="width: 50px; height: 50px"
                        />
                      </span>
                    </div>
                    <div class="pl-1 pr-1">
                      <span @click="updateViewNotification(n)">
                        <template v-if="parseInt(n.IsView) === 0">
                          <p class="text-danger mb-0 font-weight-bold">
                            {{ n.Title.slice(0, 28) + "..." }}
                          </p>
                          <p class="mb-0 text-small text-muted">
                            {{ n.Body.slice(0, 70) + "..." }}
                          </p>
                        </template>
                        <template v-else>
                          <p class="mb-0 font-weight-bold">
                            {{ n.Title.slice(0, 28) + "..." }}
                          </p>
                          <p class="text-muted mb-0 text-small">
                            {{ n.Body.slice(0, 70) + "..." }}
                          </p>
                        </template>
                      </span>
                    </div>
                  </div>
                </template>
              </vue-perfect-scrollbar>
              <div
                class="text-right pr-4"
                style="
                  position: absolute;
                  width: 100%;
                  height: 28px;
                  padding: 8px;
                  bottom: 0;
                  left: 0;
                  cursor: pointer;
                  color: #696969;
                "
              >
                <span
                  class="span-custom-hover text-small font-weight-bold"
                  @click="getListWarning()"
                >
                  <i class="fad fa-eye mr-2"></i>
                  {{ $t("modal.view-all") }}
                </span>
              </div>
            </b-dropdown>
          </div>
        </template>
        <template v-else>
          <b-dropdown
            variant="empty"
            size="sm"
            right
            toggle-class="header-icon notificationButton"
            menu-class="position-absolute mt-3 notificationDropdown"
            no-caret
          >
            <template slot="button-content">
              <i class="simple-icon-bell" />
            </template>
            <vue-perfect-scrollbar
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
              <div class="d-flex flex-row">
                <div class="m-auto text-muted text-center font-italic">
                  <span style="font-weight: 500"
                    >{{ $t("modal.no-new-notification") }} !</span
                  >
                </div>
              </div>
            </vue-perfect-scrollbar>
          </b-dropdown>
        </template>
        <!-- fullscreen -->
        <div class="position-relative d-none d-sm-inline-block">
          <div class="btn-group">
            <b-button
              variant="empty"
              class="header-icon btn-sm"
              @click="toggleFullScreen"
            >
              <i
                :class="{
                  'd-inline-block': true,
                  'simple-icon-size-actual': fullScreen,
                  'simple-icon-size-fullscreen': !fullScreen,
                }"
              />
            </b-button>
          </div>
        </div>
      </div>
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content" v-if="currentUser">
            <span class="name mr-1">{{ currentUser.title }}</span>
            <span>
              <img :alt="currentUser.title" :src="currentUser.img" />
            </span>
          </template>
          <b-dropdown-item
            ><i class="fas fa-user-circle mr-2"></i>Tài Khoản
          </b-dropdown-item>
          <b-dropdown-item
            ><i class="fad fa-lock-alt mr-2"></i>Đổi Mật Khẩu
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="logout">
            <i class="fas fa-sign-out-alt mr-2"></i>Đăng Xuất
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <b-modal
      @hide="resetModal"
      class="text-center"
      id="detail-notification"
      size="md"
      centered
      hide-header
      v-if="dataModal"
      ok-only
    >
      <custom-notification :data="dataModal"></custom-notification>
    </b-modal>
  </nav>
</template>

<script>
import Switches from "vue-switches";

import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../../components/Svg";
import {
  menuHiddenBreakpoint,
  localeOptions,
  adminRoot,
} from "../../constants/config";
import {
  getDirection,
  setDirection,
  getThemeColor,
  setThemeColor,
} from "../../utils";
import notificationAPI from "@/api/modules/notificationAPI";
import firebase from "firebase/app";
import "firebase/firebase-messaging";
import CustomNotification from "@/views/app/notification/component/CustomNotification.vue";
import store from "../../store/index";

export default {
  components: {
    "menu-icon": MenuIcon,
    "mobile-menu-icon": MobileMenuIcon,
    switches: Switches,
    "custom-notification": CustomNotification,
  },
  data() {
    return {
      searchKeyword: "",
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      adminRoot,
      localeOptions,
      isDarkActive: false,
      //myVar
      notifyList: null,
      dataModal: null,
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut", "setNotification"]),
    resetModal() {
      this.dataModal = null;
    },
    updateViewNotification(item) {
      this.dataModal = item;
      setTimeout(() => {
        this.$bvModal.show("detail-notification");
        let body = {
          NotifyID: item.NotifyID,
        };
        notificationAPI
          .updateViewNotify(body)
          .then((val) => {
            if (val.status) {
              this.getListNotify();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
    getListWarning() {
      let path = "/admin/notification/warning-list";
      if (this.$route.fullPath !== path) {
        this.$refs.dropdown.hide(true);
        this.$router.push({ path: path });
      }
    },
    getListNotify() {
      notificationAPI.getNotify().then((val) => {
        this.notifyList = val.status ? val.data : null;
        // this.setNotification(false);
        store.dispatch("setNotification", false);
      });
    },
    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
        setDirection(direction);
      }
      this.setLang(locale);
    },
    logout() {
      this.signOut().then(() => {
        this.$router.push("/user/login");
      });
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems",
      notification: "notification",
    }),
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  async created() {
    const color = getThemeColor();
    this.isDarkActive = color.indexOf("dark") > -1;
    //myCode (notify)
    await this.getListNotify();
    const messaging = await firebase.messaging();
    messaging
      .getToken({
        vapidKey:
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
      })
      .then((currentToken) => {
        if (currentToken) {
          let body = {
            token: currentToken,
          };
          notificationAPI
            .tokenAdd(body)
            .then((val) => {
              if (val.status) {
                // console.log(currentToken)
                localStorage.setItem("tokenFirebase", currentToken);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          localStorage.setItem("tokenFirebase", currentToken);
          let _body = {
            token: localStorage.getItem("tokenFirebase"),
          };
          notificationAPI
            .tokenEditLanguage(_body)
            .then()
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
    messaging.onMessage(function (_payload) {
      // console.log("On message", _payload)
      let notificationTitle, notificationOptions;
      if (_payload.notification) {
        notificationTitle = _payload.notification.title;
        notificationOptions = {
          body: _payload.notification.body,
          icon: require("@/assets/logos/mobile.svg"),
        };
        let notification = new Notification(
          notificationTitle,
          notificationOptions
        );
        notification.onclick = function (event) {
          notification.close();
        };
        // this.setNotification(true);
        store.dispatch("setNotification", true);
      }
    });
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        // this.$router.go(this.$route.path); // bug-i18 : ngăn reload trang
      }
    },
    notification(to, from) {
      this.getListNotify();
    },
    isDarkActive(val) {
      let color = getThemeColor();
      let isChange = false;
      if (val && color.indexOf("light") > -1) {
        isChange = true;
        color = color.replace("light", "dark");
      } else if (!val && color.indexOf("dark") > -1) {
        isChange = true;
        color = color.replace("dark", "light");
      }
      if (isChange) {
        setThemeColor(color);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
  },
};
</script>
<style scoped>
.span-custom-hover:hover {
  color: red;
}
</style>
