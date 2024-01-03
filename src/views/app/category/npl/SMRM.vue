<template>
  <div v-if="objectData" class="units-npl">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-card>
      <dynamic-table
        v-if="items.length > 0"
        style="margin-top: -20px"
        :id="'units-npl'"
        ref="tableDynamic"
        :field-table="fields"
        :data-table="items"
        :access-write="objectData.accessWrite"
        :bordered="true"
        @dbclick="handleDbClick"
        @status-edit="changeStatus"
        :isSearch="true"
      ></dynamic-table>
      <template v-else>
        <div class="text-center font-italic text-muted p-3 bg-light">
          {{ $t("panel.non-data") }}
        </div>
      </template>
    </b-card>
    <b-modal
      :id="idModal"
      :name="idModal"
      :size="sizeModal"
      :title="titleModal"
      ok-only
      scrollable
      hide-footer
      class="text-center"
      @hidden="resetModal"
    >
      <form-dynamic
        v-if="dataForm"
        :type="idModal"
        :id="idClick"
        :data-form="dataForm"
        :dataFormOptions="dataFormOptions"
        @submit="handleSubmit"
      ></form-dynamic>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/DynamicTable";
import FormDynamic from "./component/FormDynamic.vue";
import nplAPI from "@/api/modules/nplAPI";

export default {
  name: "units-npl",
  components: {
    "dynamic-table": DynamicTable,
    "form-dynamic": FormDynamic,
  },
  data() {
    return {
      interval: null,
      menuRight: [],
      keys: null,
      colTypes: null,
      columnAdd: null,
      idClick: null,
      dataForm: null,
      idModal: null,
      titleModal: null,
      sizeModal: "md",
      items: [],
      keyString: "SMRMs",
      dataFormOptions: {},
    };
  },
  computed: {
    fields() {
      let result = handling.mergeKeyDynamic(this.keys, this.colTypes);
      return result;
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
  async created() {
    await this.getListMenuRight();
    await this.getColTypes(this.keyString);
    await this.getDynamicFormAdd(this.keyString);
    await this.getVehicleTypes();
    await this.getDriveHelpers();
    await this.getFuelKinds();
    await this.getSMRMTypes();
    await this.getVehicleColors();
    await this.getVehicleProducers();
    await setTimeout(async () => {
      await this.getData();
      await this.getVehicleTypes();
      await this.getDriveHelpers();
      await this.getFuelKinds();
      await this.getSMRMTypes();
      await this.getVehicleColors();
      await this.getVehicleProducers();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    getDriveHelpers() {
      nplAPI
        .getDriveHelperActive()
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.DriveHelperID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.nPLDriveHelpersName,
                };
                this.dataFormOptions.DriveHelperID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getFuelKinds() {
      let body = {
        CategoryType: "FuelKinds",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.FuelKindID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.FuelKindsName,
                  note: item.Note,
                };
                this.dataFormOptions.FuelKindID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getSMRMTypes() {
      let body = {
        CategoryType: "SMRMTypes",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.SMRMTypeID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.SMRMTypesName,
                };
                this.dataFormOptions.SMRMTypeID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getVehicleColors() {
      let body = {
        CategoryType: "VehicleColors",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.VehicleColorID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.VehicleColorsName,
                };
                this.dataFormOptions.VehicleColorID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getVehicleTypes() {
      let body = {
        CategoryType: "VehicleTires",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.VehicleTyreID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.VehicleTiresName,
                  note: item.Note,
                };
                this.dataFormOptions.VehicleTyreID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getVehicleProducers() {
      let body = {
        CategoryType: "VehicleProducers",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.VehicleProducerID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.VehicleProducersName,
                  note: item.Note,
                };
                this.dataFormOptions.VehicleProducerID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    handleSubmit(dataValue, type, id) {
      if (!this.idModal) return;
      if (type == "add") {
        let obj = {};
        dataValue.forEach((f) => {
          let key = f["name"];
          let value = f["value"];
          obj = { ...obj, [key]: value };
        });
        let body = {
          ...obj,
          CategoryType: this.keyString,
        };
        nplAPI
          .nplVehiclesAdd(body)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "edit" && id) {
        let obj = {};
        dataValue.forEach((f) => {
          let key = f["name"];
          let value = f["value"];
          obj = { ...obj, [key]: value };
        });
        let body = {
          ...obj,
          CategoryType: this.keyString,
          ID: id,
        };
        nplAPI
          .editVehicles(body)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "delete" && id) {
        let body = {
          ID: id,
        };
        nplAPI.deleteVehicles(body).then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
            this.getData();
            this.$bvModal.hide(this.idModal);
          } else {
            this.makeToast("danger", this.$t("toast.fail"), val.message);
          }
        });
      }
    },
    resetModal() {
      this.idClick = null;
      this.dataForm = null;
    },
    changeStatus(row, key) {
      const id = row.ID;
      const newStatus = handling.convertBooleanToBit(row.IsActive);
      let body = {
        ID: id,
        IsActive: newStatus,
      };
      nplAPI
        .nplVehiclesChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
          } else {
            this.makeToast("dnager", this.$t("toast.fail"), val.message);
          }
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    getData() {
      let body = {
        CategoryType: this.keyString,
      };
      nplAPI
        .getVehiclesList(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.items =
            data.length > 0 ? handling.convertDataBitToBoolean([...data]) : [];
          this.keys = data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    handleDbClick(row) {
      this.idClick = row.ID;
      let body = {
        ID: row.ID,
        CategoryType: this.keyString,
      };
      nplAPI.getVehiclesByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = handling.showDynamicFormEdit(obj.Properties, obj);
          this.idModal = "edit";
          this.titleModal = "CẬP NHẬT";
          this.sizeModal = "lg";
          setTimeout(() => {
            this.$bvModal.show(this.idModal);
          }, 500);
        }
      });
    },
    addModal() {
      this.dataForm = handling.showDynamicFormAdd(this.columnAdd);
      this.idModal = "add";
      this.titleModal = "THÊM MỚI";
      this.sizeModal = "lg";
      setTimeout(() => {
        this.$bvModal.show(this.idModal);
      }, 500);
    },
    printExternalExcel() {},
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDynamicFormAdd(string) {
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
