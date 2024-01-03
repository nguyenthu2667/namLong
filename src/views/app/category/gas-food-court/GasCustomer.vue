<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="listSensorModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-clipboard-list"></i>
                &emsp;{{ $t("pages.list-sensor") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-clipboard-list"></i>
                &emsp;{{ $t("pages.list-sensor") }}
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
      :data-form-option="dataFormOptions"
      :type-layer="'gasrestaurent'"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      class="text-center"
      id="modal-detect-station"
      hide-header
      ok-only
      @hidden="resetModalSensor"
      scrollable
      size="xl"
      v-if="selectedItems.length > 0"
    >
      <b-row>
        <b-colxx xxs="12">
          <h1>
            <strong>{{ $t("pages.list-sensor").toUpperCase() }}</strong>
          </h1>
          <div class="top-right-button-container">
            <b-button-group>
              <b-dropdown right :text="$t('dropdown.action')" variant="primary">
                <b-dropdown-item
                  @click="addModalDetectSensor(selectedItems)"
                  v-if="objectData.accessWrite === true"
                >
                  <i class="fad fa-plus"></i>
                  &emsp;{{ $t("pages.add") }}
                </b-dropdown-item>
                <b-dropdown-item
                  @click="editModalDetectSensor(selectedItemsDetectSensor)"
                  v-if="
                    selectedItemsDetectSensor.length === 1 &&
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
                  @click="deleteModalDetectSensor(selectedItemsDetectSensor)"
                  v-if="
                    selectedItemsDetectSensor.length === 1 &&
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
      <b-row>
        <b-colxx xxs="12" class="mb-4">
          <custom-table
            ref="tableForm"
            :data-table="detectSensor"
            :field-table="fieldsDetectSensor"
            :column-show="listColumnShowDetectSensor"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelectedDetectSensor"
            @status-edit="statusEditDetectSensor"
          ></custom-table>
        </b-colxx>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import gasFamilyAPI from "@/api/modules/gasFamilyAPI";
import gasFoodCourtAPI from "@/api/modules/gasFoodCourtAPI";
import gasStoreAPI from "@/api/modules/gasStoreAPI";
import groupAPI from "@/api/modules/groupAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      selectedItemsDetectSensor: [],
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
      dataFormOptions: {
        LevelDetectID: [],
        StoreID: [],
        CustypeID: [],
        FoodCourtID: [],
      },
      optionGroup: null,
      keyShow: 0,
      detectSensor: null,
      objectKeyDetectSensor: null,
      listColumnShowDetectSensor: null,
      columnAddDetectSensor: null,
      detectSensorByID: null,
    };
  },
  methods: {
    addModalDetectSensor(items) {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAddDetectSensor,
        this.dataFormOptions
      );
      this.nameForm = "modal-add-sensor";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/GasDetectorByStations/Add";
      this.bodyFormDefault = {
        StationID: items[0].StationID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    editModalDetectSensor(items) {
      this.getDetectSensorByID(items[0].ID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(
          this.detectSensorByID,
          this.dataFormOptions
        );
        this.nameForm = "modal-edit-sensor";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/GasDetectorByStations/Edit";
        this.bodyFormDefault = {
          ID: items[0].ID,
          StationID: items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getDetectSensorByID(id) {
      let body = {
        ID: id,
      };
      gasFamilyAPI
        .gasCustomerDetectByID(body)
        .then((val) => {
          this.detectSensorByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModalDetectSensor(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].GasDetectName + "?",
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
            this.handleSubmitDeleteDetectSensor(items[0].ID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDeleteDetectSensor(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasFamilyAPI
        .gasCustomerDetectRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.listDetectSensor(this.selectedItems[0].StationID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.listDetectSensor(this.selectedItems[0].StationID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.listDetectSensor(this.selectedItems[0].StationID);
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
    statusEditDetectSensor(data) {
      let body = {
        ID: data.ID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasFamilyAPI
        .gasCustomerDetectChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.listDetectSensor(this.selectedItems[0].StationID);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.listDetectSensor(this.selectedItems[0].StationID);
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
    resetModalSensor() {
      this.detectSensor = null;
      this.objectKeyDetectSensor = null;
      this.selectedItemsDetectSensor = [];
    },
    listSensorModal(items) {
      this.listDetectSensor(items[0].StationID);
      setTimeout(() => {
        setTimeout(() => {
          this.$bvModal.show("modal-detect-station");
        }, this.timer);
      }, this.timer);
    },
    listDetectSensor(id) {
      let body = {
        StationID: id,
      };
      gasFamilyAPI
        .gasCustomerGetListDetect(body)
        .then((val) => {
          this.detectSensor = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : null;
          this.objectKeyDetectSensor =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    getOptionLevelDetect() {
      gasFamilyAPI
        .gasCustomerGetLevelDetect()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LevelDetectID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].LevelDetectName,
                  value: val.data[i].LevelDetectID,
                };
                this.dataFormOptions.LevelDetectID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("StationByGasFoodAndCourts");
          this.getKeyTable();
          this.getData();
          if (this.selectedItems.length > 0) {
            this.listDetectSensor(this.selectedItems[0].StationID);
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
            this.listDetectSensor(this.selectedItems[0].StationID);
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
      this.showDataFormOptionParentCustomerGroup(this.optionGroup);
      this.getDataByID(items[0].StationID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        for (let i = 0; i < this.optionGroup.length; i++) {
          if (this.optionGroup[i].GroupID === this.dataByID.CustypeID) {
            this.keyShow = this.optionGroup[i].Key;
          }
        }
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/StationByGasFoodCourts/EditDeploy";
        this.bodyFormDefault = {
          ID: items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].StationName + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        StationID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasFoodCourtAPI
        .gasFoodCourtCustomerRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("StationByGasFoodAndCourts");
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
    rowSelectedDetectSensor(data) {
      this.selectedItemsDetectSensor = data;
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        StationID: data.StationID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasFoodCourtAPI
        .gasFoodCourtCustomerChangeStatus(body)
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
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] !== parentID) {
          return;
        }
        let obj = {
          GroupID: item["GroupID"],
          GroupName: item["GroupName"],
          ParentID: item["ParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["GroupID"], arrayTable, i + 1);
      });
    },
    showDataFormOptionParentCustomerGroup(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID !== id && x.GroupID !== id);
      } else {
        _array = array;
      }
      let newArray = [];
      handling.recursiveTreeSelectParentCustomerGroup(_array, 0, newArray, 0);
      this.dataFormOptions.CustypeID = newArray;
    },
    getOptionGroup() {
      groupAPI
        .groupCustomerListActive()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 0, arrTable, 0);
            this.optionGroup = arrTable;
          } else {
            this.optionGroup = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionGasStore() {
      gasStoreAPI
        .gasStoreListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.StoreID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].StoreName,
                    value: val.data[i].StoreID,
                  };
                  this.dataFormOptions.StoreID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionGasArea() {
      gasFoodCourtAPI
        .gasAreaFoodCourtGet()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.FoodCourtID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].FoodCourtsName,
                    value: val.data[i].FoodCourtsID,
                  };
                  this.dataFormOptions.FoodCourtID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
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
    getFormAddShowDetectSensor(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAddDetectSensor = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        StationID: id,
      };
      gasFoodCourtAPI
        .gasFoodCourtFinishedProductByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      gasFoodCourtAPI
        .gasFoodCourtCustomerGet()
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
      gasFoodCourtAPI
        .gasFoodCourtCustomerGet()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnDetectSensor(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowDetectSensor = val.status ? val.data : [];
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
    await this.getColumn("StationByGasFoodAndCourts");
    await this.getColumnDetectSensor("GasDetector");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("StationByGasFoodAndCourts");
    await this.getFormAddShowDetectSensor("GasDetector");
    await this.getOptionLevelDetect();
    await this.getOptionGasStore();
    await this.getOptionGasArea();
    await this.getOptionGroup();
  },
  watch: {
    items() {
      this.getColumn("StationByGasFoodAndCourts");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldsDetectSensor: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetectSensor,
        this.listColumnShowDetectSensor
      );
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
