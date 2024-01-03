<template>
  <b-row v-if="objectData">
    <b-colxx class="disable-text-selection" v-if="itemsRecursive.length > 0">
      <b-row v-if="isLoad">
        <b-colxx xxs="12">
          <h1>
            <strong>
              {{ objectData.formName }}
            </strong>
          </h1>
          <div class="top-right-button-container">
            <b-button-group>
              <b-button
                variant="primary"
                @click="openModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("dropdown.edit") }}
              </b-button>
              <b-button variant="primary" v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("dropdown.edit") }}
              </b-button>
            </b-button-group>
          </div>
          <div class="mb-2 mt-2"></div>
          <div class="separator mb-5" />
        </b-colxx>
      </b-row>
      <template v-if="isLoad">
        <b-row v-if="displayMode === 'list'" key="list">
          <b-colxx cols="12" class="mb-4">
            <menu-list-item
              v-if="itemsRecursive[0]"
              :type="type"
              :data="itemsRecursive[0].subs"
              :selected-items="selectedItems"
              :access-write="objectData.accessWrite"
              @toggle-item="toggleItem"
              @check-active="checkActive"
            ></menu-list-item>
          </b-colxx>
        </b-row>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      @handle-submit="handleSubmit"
    ></custom-form>
  </b-row>
</template>

<script>
import MenuListItem from "./component/MenuListItem.vue";
import CustomForm from "./component/CustomForm.vue";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";

export default {
  components: {
    "menu-list-item": MenuListItem,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer: 500,
      type: "Menu",
      isLoad: false,
      displayMode: "list",
      menuRight: [],
      itemsRecursive: [],
      selectedItems: [],
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: {
        Name: null,
        NameExtention1: null,
        NameExtention2: null,
        NameExtention3: null,
        NameExtention4: null,
        NameExtention5: null,
        NameExtention6: null,
        NameExtention7: null,
        NameExtention8: null,
        NameExtention9: null,
      },
      show: false,
      dataByID: null,
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      setTimeout(() => {
        this.selectedItems = [];
        this.isLoad = true;
      }, this.timer);
    },
    checkActive(data) {
      let body = {
        ListMenuID: data.id + ":" + handling.convertBooleanToBit(data.active),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      systemAPI.menuChangeStatus(body).then((val) => {
        if (val.status) {
          this.getListMenu();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.getListMenu();
          setTimeout(() => {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
      });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    toggleItem(event, item) {
      if (this.selectedItems.includes(item.id)) {
        this.selectedItems = [];
      } else {
        this.selectedItems = [];
        this.selectedItems.push(item.id);
      }
    },
    openModal(items) {
      this.getMenuByID(items[0]);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/menu/EditMenu";
        this.bodyFormDefault = {
          MenuID: items[0],
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        this.$bvModal.hide(this.nameForm);
        this.getListMenu();
        setTimeout(() => {
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        }, this.timer);
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getListMenu();
        setTimeout(() => {
          this.makeToast(
            "success",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.typeForm = "";
      this.bodyFormDefault = null;
    },
    getMenuByID(id) {
      let body = {
        ID: id,
      };
      systemAPI
        .menuByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenu() {
      systemAPI
        .menuList()
        .then((val) => {
          this.itemsRecursive = [];
          if (val.status) {
            handling.recursiveMenu(val.data, "0", this.itemsRecursive);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.loadItems();
    },
    getListMenuRight() {
      let body = {};
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getListMenu();
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullPath !== "/" && from.fullPath !== to.fullPath) {
      localStorage.removeItem("collapse");
    }
    next();
  },
  watch: {
    itemsRecursive() {
      if (this.itemsRecursive.length > 0) {
        setTimeout(() => {
          if (
            localStorage.getItem("collapse") !== undefined &&
            localStorage.getItem("collapse") !== null
          ) {
            let array = localStorage
              .getItem("collapse")
              .split(",")
              .filter((x) => x !== "");
            if (array.length > 0) {
              for (let i = 0; i < array.length; i++) {
                this.$root.$emit("bv::toggle::collapse", array[i]);
                setTimeout(() => {
                  this.$nextTick(() => {
                    document.getElementById("icon-" + array[i]).className =
                      "fa fa-minus";
                  });
                }, this.timer);
              }
            }
          }
        }, this.timer * 1.5);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 500);
  },
};
</script>
<style></style>
