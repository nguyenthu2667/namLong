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
                @click="indicatorModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t("form.indicator-warning-index") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t("form.indicator-warning-index") }}
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
      :data-form-option="dataFormOptions"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="indicator-modal"
      hide-header
      ok-only
      @hidden="resetModalIndicator"
      scrollable
      size="lg"
    >
      <b-row>
        <b-colxx xxs="12">
          <h1 v-if="titleModal">
            <strong>{{ titleModal.toUpperCase() }}</strong>
          </h1>
          <div class="top-right-button-container">
            <b-button-group>
              <b-dropdown right :text="$t('dropdown.action')" variant="primary">
                <b-dropdown-item
                  @click="addModalIndicator(selectedItems)"
                  v-if="objectData.accessWrite === true"
                >
                  <i class="fad fa-plus"></i>
                  &emsp;{{ $t("pages.add") }}
                </b-dropdown-item>
                <b-dropdown-item
                  @click="editModalIndicator(selectedItemsIndicator)"
                  v-if="
                    selectedItemsIndicator.length === 1 &&
                    objectData.accessWrite === true
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
                  @click="deleteModalIndicator(selectedItemsIndicator)"
                  v-if="
                    selectedItemsIndicator.length === 1 &&
                    objectData.accessWrite === true
                  "
                >
                  <i class="fad fa-trash-alt"></i>
                  &emsp;{{ $t("pages.delete") }}
                </b-dropdown-item>
                <b-dropdown-item v-else disabled>
                  <i class="fad fa-trash-alt"></i>
                  &emsp;{{ $t("pages.delete") }}
                </b-dropdown-item>
              </b-dropdown>
            </b-button-group>
          </div>
          <div class="mb-2 mt-2"></div>
          <div class="separator mb-5" style="margin: 0 -1.75rem"></div>
        </b-colxx>
      </b-row>
      <template v-if="itemsIndicatorFilter">
        <custom-table
          :data-table="itemsIndicatorFilter"
          :field-table="fieldsIndicator"
          :column-show="listColumnShowIndicator"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          @row-selected="rowSelectedIndicator"
          @status-edit="statusEditIndicator"
        ></custom-table>
      </template>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "../component/CustomFormWarningLevel.vue";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import warningAPI from "@/api/modules/warningAPI";
import indicatorAPI from "@/api/modules/indicatorAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer: 500,
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
      columnAddIndicator: null,
      itemsIndicator: null,
      listColumnShowIndicator: null,
      objectKeyIndicator: null,
      dataByIDIndicator: null,
      // itemsIndicatorFilter: null,
      selectedItemsIndicator: [],
      dataFormOptions: {
        // LevelCode: [],
        IndicatorCode: [],
      },
      titleModal: null,
      listGeoCode: [],
      selectedGeoCode: null,
      //search
      searchText: "",
      search: "",
    };
  },
  methods: {
    changeSelectedGeoCode(item) {
      this.selectedGeoCode = item;
      this.getKeyTable();
      this.getData();
      this.getDataIndicator();
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
    async addModalIndicator(items) {
      await this.getOptionIndicator();
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAddIndicator,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/IndicatorWarnings/AddIndicatorWarning";
      this.bodyFormDefault = {
        LevelCode: items[0].LevelWarningID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        GeoCode: this.selectedGeoCode.value,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    async editModalIndicator(items) {
      await this.getOptionIndicator();
      this.getIndicatorWarningByID(items[0].IndicatorWarningID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByIDIndicator);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/IndicatorWarnings/EditIndicatorWarning";
        this.bodyFormDefault = {
          ID: items[0].IndicatorWarningID,
          LevelCode: items[0].LevelCode,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getIndicatorWarningByID(id) {
      let body = {
        ID: id,
      };
      indicatorAPI
        .indicatorWarningByID(body)
        .then((val) => {
          this.dataByIDIndicator = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModalIndicator(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") +
            items[0].LevelWarningName +
            " - " +
            items[0].IndicatorName +
            "?",
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
            this.handleSubmitDeleteIndicator(items[0].IndicatorWarningID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDeleteIndicator(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      indicatorAPI.indicatorWarningRemove(body).then((val) => {
        if (val.status) {
          this.getDataIndicator();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.getDataIndicator();
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
    rowSelectedIndicator(data) {
      this.selectedItemsIndicator = data;
    },
    statusEditIndicator(data) {
      let body = {
        ID: data.IndicatorWarningID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      indicatorAPI
        .indicatorWarningChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getDataIndicator();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getDataIndicator();
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
    resetModalIndicator() {
      // this.itemsIndicatorFilter = null
      this.selectedItemsIndicator = [];
      this.titleModal = null;
    },
    indicatorModal(items) {
      // this.itemsIndicatorFilter =  this.itemsIndicator.filter(x => parseInt(x.LevelCode) === items[0].LevelWarningID)
      this.titleModal = items[0].LevelWarningName;
      setTimeout(() => {
        this.$bvModal.show("indicator-modal");
      }, this.timer);
    },
    getDataIndicator() {
      let body = {
        GeoCode: this.selectedGeoCode.value,
      };
      indicatorAPI
        .indicatorWarningList(body)
        .then((val) => {
          this.itemsIndicator = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableIndicator() {
      let body = {
        GeoCode: this.selectedGeoCode.value,
      };
      indicatorAPI
        .indicatorWarningList(body)
        .then((val) => {
          this.objectKeyIndicator =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnIndicator(string) {
      let body = {
        ObjectName: string,
      };

      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowIndicator = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/LevelWarnings/AddLevelWarning";
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
          this.getColumn("LevelWarnings");
          this.getKeyTable();
          this.getData();
          if (this.selectedItems.length > 0) {
            this.getDataIndicator();
          }
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
          if (this.selectedItems.length > 0) {
            this.getDataIndicator();
          }
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
    editModal(items) {
      this.getLevelWarningByID(items[0].LevelWarningID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/LevelWarnings/EditLevelWarning";
        this.bodyFormDefault = {
          ID: items[0].LevelWarningID,
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
          this.$t("form.question") + items[0].LevelWarningName + "?",
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
            this.handleSubmitDelete(items[0].LevelWarningID);
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
      warningAPI.levelWarningRemove(body).then((val) => {
        if (val.status) {
          if (this.items.length === 1) {
            this.getColumn("LevelWarnings");
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
      });
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.LevelWarningID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      warningAPI
        .levelWarningChangeStatus(body)
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
    getOptionIndicator() {
      let body = {
        GeoCode: this.selectedGeoCode.value,
      };
      indicatorAPI
        .indicatorListActive(body)
        .then((val) => {
          if (val.status) {
            if (val.data.length) {
              this.dataFormOptions.IndicatorCode = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].IndicatorName,
                  value: val.data[i].IndicatorCode,
                };
                this.dataFormOptions.IndicatorCode.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFormAddShowIndicator(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAddIndicator = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getOptionLevel() {
    //   warningAPI.levelWarningList().then(val => {
    //     if (val.status) {
    //       if (val.data.length) {
    //         this.dataFormOptions.LevelCode = []
    //         for (let i = 0; i < val.data.length; i++) {
    //           if (val.data[i].IsActive === 1) {
    //             let obj = {
    //               text: val.data[i].LevelWarningName,
    //               value: val.data[i].LevelWarningID,
    //             }
    //             this.dataFormOptions.LevelCode.push(obj)
    //           }
    //         }
    //       }
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    getLevelWarningByID(id) {
      let body = {
        ID: id,
      };
      warningAPI
        .levelWarningByID(body)
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
      };
      warningAPI
        .levelWarningList(body)
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
      };
      warningAPI
        .levelWarningList(body)
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
            this.getDataIndicator();
            this.getKeyTableIndicator();
            this.getOptionIndicator();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
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
    await this.getColumn("LevelWarnings");
    await this.getOption();
    await this.getFormAddShow("LevelWarnings");
    await this.getColumnIndicator("IndicatorWarnings");
    await this.getFormAddShowIndicator("IndicatorWarnings");
    // await this.getOptionLevel()
  },
  watch: {
    items() {
      this.getColumn("LevelWarnings");
      this.getKeyTable();
    },
    itemsIndicator() {
      this.getColumnIndicator("IndicatorWarnings");
      this.getKeyTableIndicator();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldsIndicator: function () {
      return handling.mergeTableAndData(
        this.objectKeyIndicator,
        this.listColumnShowIndicator
      );
    },
    itemsIndicatorFilter: function () {
      if (this.itemsIndicator && this.selectedItems.length > 0) {
        return this.itemsIndicator.filter(
          (x) => parseInt(x.LevelCode) === this.selectedItems[0].LevelWarningID
        );
      }
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
