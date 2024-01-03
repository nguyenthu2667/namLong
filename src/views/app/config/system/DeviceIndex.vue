<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="d-flex justify-content-between">
          <div class="mb-2 ml-2">
            <b-dropdown
              id="dropdown-form"
              ref="dropdown"
              left
              variant="empty"
              toggle-class="p-0"
              no-caret
              class="pb-1"
            >
              <template slot="button-content">
                <span v-b-toggle.collapse-header>
                  <i class="fad fa-cog" style="font-size: 18px"></i>
                </span>
              </template>
              <b-dropdown-form>
                <b-form-input
                  class="mt-1"
                  id="search-input"
                  type="search"
                  size="sm"
                  v-model="searchText"
                  :placeholder="$t('panel.search-input-monitor')"
                  style="min-width: 200px"
                ></b-form-input>
                <template v-if="searchText && searchText !== ''">
                  <template v-if="optionSearch(searchText).length > 0">
                    <p class="mt-3 mb-0 text-muted font-italic text-small">
                      {{ $t("panel.total") }}
                      {{ optionSearch(searchText).length }}
                      {{ $t("panel.result") }}
                    </p>
                  </template>
                  <template v-else>
                    <p class="mt-3 mb-0 text-muted font-italic text-small">
                      {{ $t("panel.non-data") }}
                    </p>
                  </template>
                </template>
                <template v-else>
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.total") }} {{ listGeoCode.length }}
                    {{ $t("panel.result") }}
                  </p>
                </template>
              </b-dropdown-form>
              <b-dropdown-divider></b-dropdown-divider>
              <vue-perfect-scrollbar
                class="list-item-station-option"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <template v-if="searchText && searchText !== ''">
                  <b-dropdown-item
                    v-for="(station, index) in optionSearch(searchText)"
                    :key="index"
                    @click="changeSelectedGeoCode(station)"
                  >
                    <span class="item-station-option">
                      {{ station.text }}
                    </span>
                  </b-dropdown-item>
                </template>
                <template v-else>
                  <b-dropdown-item
                    v-for="(station, index) in listGeoCode"
                    :key="index"
                    @click="changeSelectedGeoCode(station)"
                  >
                    <span class="item-station-option">
                      {{ station.text }}
                    </span>
                  </b-dropdown-item>
                </template>
              </vue-perfect-scrollbar>
            </b-dropdown>
            <template v-if="selectedGeoCode">
              <span class="ml-2 h5 text-muted">
                <strong>{{ selectedGeoCode.text }}</strong>
              </span>
            </template>
          </div>
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="colorModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-eye-dropper"></i>
                &emsp;{{ $t("pages.color-setting") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-eye-dropper"></i>
                &emsp;{{ $t("pages.color-setting") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>

    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
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
    <b-modal
      v-if="selectedItems.length > 0"
      :id="`modal-indicator-device-${selectedItems[0].IndicatorID}`"
      centered
      hide-header
      ok-only
      size="lg"
    >
      <color-popup
        :selected-items="selectedItems"
        :select-mode="selectMode"
        :selectedGeoCode="selectedGeoCode.value"
      ></color-popup>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "./component/CustomTables";
import CustomForm from "./component//CustomForm";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import ColorPopup from "./component/ColorPopup.vue";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "color-popup": ColorPopup,
  },
  data() {
    return {
      timer: 500,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      listGeoCode: [],
      selectedGeoCode: null,
      //search
      searchText: "",
      search: "",
    };
  },
  methods: {
    async colorModal(items) {
      const { IndicatorID } = items[0];
      setTimeout(() => {
        this.$bvModal.show(`modal-indicator-device-${IndicatorID}`);
      }, this.timer);
    },
    //search
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.listGeoCode.forEach((val) => {
          if (val.text.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    //
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/DeviceInfos/AddDeviceInfo";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        GeoCode: this.selectedGeoCode.value,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("DeviceInfos");
          this.getKeyTable();
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getData();
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].DeviceInfoID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/DeviceInfos/EditIndicators";
        this.bodyFormDefault = {
          ID: items[0].DeviceInfoID,
          MenuIDCurent: this.objectData.menuIDCurrent,
          GeoCode: this.selectedGeoCode.value,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].DeviceInfoName + "?",
          {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("form.yes"),
            cancelTitle: this.$t("form.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].DeviceInfoID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      systemAPI
        .shareDeviceRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("DeviceInfos");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.DeviceInfoID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      systemAPI
        .shareDeviceChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
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
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      systemAPI
        .shareDeviceByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      let body = {
        GeoCode: this.selectedGeoCode.value,
        UserIDCurent: this.userID,
      };
      systemAPI
        .shareDeviceList(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      let body = {
        GeoCode: this.selectedGeoCode.value,
        UserIDCurent: this.userID,
      };
      systemAPI
        .shareDeviceList(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeSelectedGeoCode(item) {
      this.selectedGeoCode = item;
      this.getKeyTable();
      this.getData();
    },
    getOption() {
      this.listGeoCode = [];
      systemAPI
        .getListGeoCode()
        .then((val) => {
          if (val.status) {
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                id: val.data[i].DataTypeID,
                value: val.data[i].GeoCode,
                text: val.data[i].DataTypeName,
                icon: val.data[i].Icon,
              };
              this.listGeoCode.push(obj);
            }
            this.selectedGeoCode = this.listGeoCode[0];
            this.getKeyTable();
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    await this.getColumn("DeviceInfos");
    await this.getOption();
    await this.getFormAddShow("DeviceInfos");
  },
  watch: {
    items() {
      this.getColumn("DeviceInfos");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
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
