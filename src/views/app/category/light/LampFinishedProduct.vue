<template>
  <div 
    id="app-content-full" 
    class="npl-categories npl-regions"
  >
    <b-card>
      <div style="margin-top: -15px">
        <title-light :title="objectData.formName" />
      </div>
      <b-row class="h-100">
        <b-col 
          lg="6" 
          class="h-100"
        >
          <div class="units-frame">
            <div class="units-header">
              <div class="units-title">
                {{ $t("light.cabinets-manager") }}
              </div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="addUnits('magementCabinet')"
              />
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableMagementCabinet.length > 0"
                id="table-child"
                :items="dataTableMagementCabinet"
                :fields="[
                  {
                    key: 'CabinetID',
                    label: $t('light.cabinet-light-id'),
                  },
                  {
                    key: 'CabinetName',
                    label: $t('light.cabinet-light-name'),
                  },
                  {
                    key: 'InputDate',
                    label: $t('light.cabinet-light-date'),
                  },
                  {
                    key: 'Action',
                    label: $t('light.cabinet-lihgt-action'),
                  },
                ]"
                :bordered="true"
                show-empty
                sticky-header
                style="max-height: 100%"
              >
                <template #cell(IsActive)="row">
                  <div class="text-center">
                    <i 
                      v-if="row.item.IsActive === 1"
                      class="fas fa-check text-success"
                    />
                  </div>
                </template>
                <template #cell(Action)="row">
                  <div class="d-flex justify-content-center">
                    <i
                      v-if="objectData.accessWrite"
                      class="fas fa-trash-alt text-danger mr-2 btn-units"
                      @click.stop="removeUnits(row.item, 'magementCabinet')"
                    />
                  </div>
                </template>
              </b-table>
              <template v-else>
                <div class="units-item">
                  {{ $t("cards.no-data") }}
                </div>
              </template>
            </div>
          </div>
        </b-col>
        <b-col 
          lg="6"
          class="h-100"
        >
          <div class="units-frame">
            <div class="units-header">
              <div class="units-title">
                {{ $t("light.lamps-manager") }}
              </div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="addUnits('magementLamps')"
              />
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableMagementLamps.length > 0"
                id="table-child"
                :items="dataTableMagementLamps"
                :fields="[
                  {
                    key: 'LampID',
                    label: $t('light.cabinet-light-id'),
                  },
                  {
                    key: 'LampName',
                    label: $t('light.cabinet-light-name'),
                  },
                  {
                    key: 'InputDate',
                    label: $t('light.cabinet-light-date'),
                  },
                  {
                    key: 'Action',
                    label: $t('light.cabinet-lihgt-action'),
                  },
                ]"
                :bordered="true"
                show-empty
                sticky-header
                style="max-height: 100%"
              >
                <template #cell(IsActive)="row">
                  <div class="text-center">
                    <i
                      v-if="row.item.IsActive === 1"
                      class="fas fa-check text-success"
                    />
                  </div>
                </template>
                <template #cell(Action)="row">
                  <div class="d-flex justify-content-center">
                    <i
                      v-if="objectData.accessWrite"
                      class="fas fa-trash-alt text-danger mr-2 btn-units"
                      @click.stop="removeUnits(row.item, 'magementLamps')"
                    />
                  </div>
                </template>
              </b-table>
              <template v-else>
                <div class="units-item">
                  {{ $t("cards.no-data") }}
                </div>
              </template>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="modal-add-units"
      :title="$t('form.title-add')"
      size="md"
      :ok-title="$t('modal.agree')"
      :cancel-title="$t('modal.cancel')"
      @ok="handleAdd"
      @hidden="hiddenModalAdd"
    >
      <template v-if="dataFormAdd">
        <b-row>
          <b-col lg="12">
            <b-form-group :label="$t('form.device-id')">
              <b-form-input v-model="dataFormAdd.StationID" />
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Title from "@/views/app/category/npl/component/Title.vue";

import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import lightAPI from "@/api/modules/lightAPI";
import handling from "@/constants/handling.js";

export default {
  name: "LightLever",
  components: {
    "title-light": Title,
  },
  data() {
    return {
      menuRight: [],
      columnAdd: [],
      titleModal: "",
      dataForm: null,
      notRequired: [
        "ID",
        "Note",
        "NameExtention1",
        "AddressExtention1",
        "LemonID",
      ],
      updateUnitsType: "",
      dataTableMagementCabinet: [],
      dataTableMagementLamps: [],
      dataFormAdd: {
        StationID: null,
      },
      dataFormEdit: null,
    };
  },
  computed: {
    objectData() {
      if (this.menuRight && this.menuRight.length) {
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
      } else {
        return {
          menuIDCurrent: "",
          formName: "",
          accessWrite: "",
        };
      }
      return undefined;
    },

    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("category")) {
        return "Category";
      }
      return "";
    },
    CategoryType() {
      return this.$route.name;
    },
  },
    
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.getListMenuRight();
        this.getDynamicFormAdd(this.CategoryType);

        this.getDataMagementCabinet();
        this.getDataMagementLamps();
      }
    },
    dataForm(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-units");
      }
    },
  },
      
  created() {
    this.getListMenuRight();
    this.getDynamicFormAdd(this.CategoryType);

    this.getDataMagementCabinet();
    this.getDataMagementLamps();
  },
  methods: {
    getDataMagementCabinet() {
      lightAPI
        .getDeployCabinet()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableMagementCabinet = data;
          const arr = [];
          data.forEach((item) => {
            arr.push({
              ...item,
              InputDate: handling.convertDate(item.InputDate),
            });
          });
          this.dataTableMagementCabinet = arr;
        })
        .catch((err) => console.log(err));
    },

    getDataMagementLamps() {
      lightAPI
        .getDeployLamps()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableMagementLamps = data;
          const arr = [];
          data.forEach((item) => {
            arr.push({
              ...item,
              InputDate: handling.convertDate(item.InputDate),
            });
            console.log("it", item);
          });
          this.dataTableMagementLamps = arr;
        })
        .catch((err) => console.log(err));
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

    getDynamicFormAdd(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.columnAdd = arr.filter((item) => item.IsHide == 0);
          console.log(this.CategoryType);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getByID(id, isActive) {
      let body = {
        ID: id,
      };
      nplAPI
        .getRegionsByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              IsActive: [this.$t("status.status"), isActive, null, null],
            };
          } else {
            this.dataForm = null;
          }
        })
        .catch((err) => console.log(err));
    },
    addUnits(type) {
      if (type == "magementCabinet") {
        this.updateUnitsType = type;
        this.$bvModal.show("modal-add-units");
      } else if (type == "magementLamps") {
        this.updateUnitsType = type;
        this.$bvModal
          .msgBoxConfirm(this.$t("light.question-new-product") + "?", {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              this.updateUnitsType = type;
              this.lampsExportProduct();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    removeUnits(item, type) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.updateUnitsType = type;
            this.handleDelete(item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkIsValid(key) {
      if (!this.isCheckIsValid) {
        return true;
      }
      if (this.notRequired.includes(key)) {
        return true;
      }
      const value = this.dataForm[key][1];
      if (value || value === 0 || value === false) {
        return true;
      } else {
        return false;
      }
    },
    checkFormValidate() {
      for (const key in this.dataForm) {
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;
        if (!result) {
          console.log("invaildKey:", key);
          break;
        }
      }
      this.dataForm = { ...this.dataForm };
      for (const key in this.dataForm) {
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
    },
    hiddenModal() {
      this.dataForm = null;
    },
    handleAdd(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataFormAdd.StationID) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("form.no-blank")
        );
      }
      switch (this.updateUnitsType) {
        case "magementCabinet":
          this.cabinetExportProduct();
          break;
        default:
          break;
      }
    },

    handleDelete(item) {
      switch (this.updateUnitsType) {
        case "magementCabinet":
          console.log(item);
          this.cabinetRemove(item);
          break;
        case "magementLamps":
          this.lampsRemove(item);
        default:
          break;
      }
    },

    cabinetExportProduct() {
      let body = {
        CabinetID: this.dataFormAdd.StationID,
      };
      lightAPI
        .cabinetExportProduct(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementCabinet();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-units");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    lampsExportProduct() {
      lightAPI
        .lampsExportProduct()
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementLamps();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cabinetRemove(item) {
      let body = {
        ID: item.CabinetID,
      };
      lightAPI
        .cabinetRemove(body)
        .then((val) => {
          console.log(body);
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementCabinet();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    lampsRemove(item) {
      let body = {
        ID: item.LampID,
      };
      lightAPI
        .lampsRemove(body)
        .then((val) => {
          console.log(body);
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementLamps();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    hiddenModalAdd() {
      this.dataFormAdd.StationID = null;
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
.b-form-btn-label-control.form-control > .form-control.form-control-sm {
  white-space: nowrap;
  overflow: hidden;
}
</style>
<style lang="scss">
.npl-categories {
  .card {
    height: 100%;
  }
  .card-body {
    height: 100%;
  }
  .box-content {
    overflow: auto;
  }
  .btn-warning.disabled {
    color: white;
  }
  .btn-outline-danger.disabled {
    &:hover {
      color: #dc3545;
    }
  }
  .btn-outline-secondary.disabled {
    color: #2a93d5;
    &:hover {
      color: #2a93d5;
      background-color: transparent;
    }
  }
  .btn-outline-info.disabled {
    &:hover {
      color: #17a2b8;
      background-color: transparent;
    }
  }
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  td {
    vertical-align: middle;
  }
}
</style>
<style lang="scss">
.npl-regions {
  .units-frame {
    // border: 1px solid #dee2e6;
    margin-top: 15px;
    height: 100%;
  }
  .units-header {
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    border: 1px solid #f3f3f3;
    border-bottom: 0;
    height: 32px;
  }
  .units-title {
    padding: 5px 10px;

    // color: #17a2b8;
    // color: black;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bolder;
  }
  .btn-units {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  .units-content {
    height: calc(100% - 65px);
    overflow: auto;
    // border: 1px solid #dee2e6;
    border-top: 0;
    // padding: 5px 10px;
  }
  .units-item {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 10px;
    padding: 5px 10px;

    i {
      font-size: 11px;
    }

    &:hover {
      background-color: #f3f3f3;
      color: black;
    }
    &.active {
      background-color: #f3f3f3;
      color: black;
      // background-color: #005aab;
      // color: white;
    }
  }
  .b-table-sticky-header {
    margin-bottom: 0;
  }
}
</style>
