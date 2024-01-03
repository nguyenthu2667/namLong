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
              <!-- <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t('pages.add') }}
              </b-dropdown-item> -->
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
                @click="handleLampManager()"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fas fa-charging-station"></i>
                &emsp;{{ $t("dropdown.lamp-manager") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fas fa-charging-station"></i>
                &emsp;{{ $t("dropdown.lamp-manager") }}
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
            @row-selected="rowSelected"
            :select-mode="selectMode"
            :field-table="fields"
            :column-show="listColumnShow"
            @status-edit="statusEdit"
            :access-write="objectData.accessWrite"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :data-form-option="dataFormOptions"
      :state-form="stateForm"
      :type-form="typeForm"
      :body-form-default="bodyFormDefault"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="modal-lamp"
      size="xl"
      hide-header
      scrollable
      ok-only
    >
      <template v-if="selectedItems.length > 0">
        <h1>
          <strong>
            {{ $t("dropdown.lamp-manager").toUpperCase() }}
            {{ " " + selectedItems[0].CabinetName.toUpperCase() }}
          </strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <!-- <b-dropdown-item @click="addModalLamp()">
                <i class="fad fa-plus"></i>
                &emsp;{{ $t('pages.add') }}
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="editModalLamp(selectedLamp)"
                v-if="
                  selectedLamp.length === 1 && objectData.accessWrite === true
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
                @click="deleteModalLamp(selectedLamp)"
                v-if="
                  selectedLamp.length === 1 && objectData.accessWrite === true
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
                @click="printExternalExcelModal('custom-table-lamp')"
                v-if="
                  dataLamps &&
                  dataLamps.length > 0 &&
                  objectData.accessWrite === true
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
        <div class="separator mb-5"></div>
        <custom-table
          :id="'custom-table-lamp'"
          ref="tableForm"
          :data-table="dataLamps"
          :field-table="fieldLamp"
          :column-show="listColumnShowLamp"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          @row-selected="rowSelectLamp"
          @status-edit="statusEditLamp"
        ></custom-table>
      </template>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/FormLight";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";
import shareAPI from "@/api/modules/shareAPI";

export default {
  name: "LightCabinets",
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
      selectedLamp: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      lampByID: null,
      columnAdd: null,
      dataFormOptions: {
        ConnectTypeID: [],
        PowerTypeID: [],
        RegionID: [],
        CabinetID: [],
      },
      regionOption: null,
      keyShow: 0,
      dataLamps: [],
      keyLamp: [],
      listColumnShowLamp: [],
      columnAddLamp: [],
    };
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldLamp: function () {
      return handling.mergeTableAndData(this.keyLamp, this.listColumnShowLamp);
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
  methods: {
    printExternalExcelModal(table) {
      handling.printExcel(
        table,
        this.$t("dropdown.lamp-manager").toUpperCase() +
          " " +
          this.selectedItems[0].CabinetName.toUpperCase(),
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
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
    getRegion() {
      shareAPI
        .shareRegionList()
        .then((val) => {
          if (val.status) {
            let array = [];
            handling.recursiveTreeSelectRegion(val.data, 0, array);
            this.dataFormOptions.RegionID = array;
            let arrTable = [];
            this.convertKeyTableData(val.data, 0, arrTable, 0);
            this.regionOption = arrTable;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          IsActive: item["IsActive"],
          Note: item["Note"],
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
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
    getKeyTable() {
      lightAPI
        .lightCabinetList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
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
    getData() {
      lightAPI
        .lightCabinetList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    statusEdit(data) {
      let body = {
        ID: data.CabinetID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .lightCabinetChangeStatus(body)
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
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/SLCabinets/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("SLCabinets");
          this.getKeyTable();
          this.getData();
          this.getColumnLampModal("SLLamps");
          this.getDataLamps(this.selectedItems[0].CabinetID);
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
          this.getColumnLampModal("SLLamps");
          this.getDataLamps(this.selectedItems[0].CabinetID);
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
      this.getDataByID(items[0].CabinetID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/SLCabinets/EditDeploy";
        this.bodyFormDefault = {
          CabinetID: items[0].CabinetID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].CabinetID + "?", {
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
            this.handleSubmitDelete(items[0].CabinetID);
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
      lightAPI
        .lightCabinetRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("SLCabinets");
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
    handleCabinetManager() {
      setTimeout(() => {
        this.$bvModal.show("modal-cabinet");
      }, this.timer);
    },
    handleLampManager() {
      this.getDataLamps(this.selectedItems[0].CabinetID);
      setTimeout(() => {
        this.$bvModal.show("modal-lamp");
      }, this.timer);
    },
    getDataLamps(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .lightLampByCabinetID(body)
        .then((val) => {
          this.dataLamps = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.keyLamp =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnLampModal(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowLamp = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFormAddShowLampModal(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAddLamp = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionCabinetID() {
      lightAPI
        .lightCabinetList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CabinetID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].CabinetName,
                  value: val.data[i].CabinetID,
                };
                this.dataFormOptions.CabinetID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addModalLamp() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAddLamp,
        this.dataFormOptions
      );
      this.nameForm = "modal-add-lamp";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/SLLamps/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    editModalLamp(items) {
      this.getDataLampByID(items[0].LampID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(
          this.lampByID,
          this.selectedItems[0]
        );
        this.nameForm = "modal-edit-lamp";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/SLLamps/EditDeploy";
        this.idForm = items[0].LampID;
        this.bodyFormDefault = {
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getDataLampByID(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .lightLampByID(body)
        .then((val) => {
          this.lampByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModalLamp(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].LampID + "?", {
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
            this.handleSubmitDeleteLamp(items[0].LampID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDeleteLamp(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .lightLampRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumnLampModal("SLLamps");
              this.getDataLamps(this.selectedItems[0].CabinetID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getDataLamps(this.selectedItems[0].CabinetID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getDataLamps(this.selectedItems[0].CabinetID);
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
    statusEditLamp(data) {
      let body = {
        ID: data.LampID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .lightLampChangeStatus(body)
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    rowSelectLamp(data) {
      this.selectedLamp = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .lightCabinetByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionConnectType() {
      shareAPI
        .shareConnectTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ConnectTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].ConnectTypeName,
                    value: val.data[i].ConnectTypeID,
                  };
                  this.dataFormOptions.ConnectTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionPowerType() {
      shareAPI
        .sharePowerTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.PowerTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].PowerTypeName,
                    value: val.data[i].PowerTypeID,
                  };
                  this.dataFormOptions.PowerTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("SLCabinets");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("SLCabinets");
    await this.getOptionPowerType();
    await this.getOptionConnectType();
    await this.getRegion();
    await this.getOptionCabinetID();
    await this.getColumnLampModal("SLLamps");
    await this.getFormAddShowLampModal("SLLamps");
  },
  watch: {
    items() {
      this.getColumn("SLCabinets");
      this.getKeyTable();
    },
  },
};
</script>

<style></style>
