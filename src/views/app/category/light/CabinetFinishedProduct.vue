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
                {{ $t("lights.cabinets-manager") }}
              </div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="showModalAddDevice('magementCabinet')"
              />
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableCabinet.length > 0"
                id="tu-table"
                class="tu-table"
                :items="dataTableCabinet"
                :fields="fieldCabinet"
                :bordered="true"
                show-empty
                sticky-header
                style="max-height: 100%"
                responsive
              >
                <template
                  v-for="(field, index) in fieldCabinet"
                  v-slot:[`cell(${field.key})`]="row"
                >
                  <template v-if="field.typeCol.toUpperCase() == 'STRING-TREE'">
                    {{ row.item[`${field.key}`] }}
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase() == 'AVATAR' || field.typeCol.toUpperCase() == 'IMAGE'
                    "
                  >
                    <div 
                      :key="index" 
                      style="width: 65px; height: 33px"
                    >
                      <img
                        style="width: 100%; height: 100%"
                        :src="row.item[`${field.key}`]"
                        alt=""
                        @error="loadImgDefault"
                      >
                    </div>
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase().search('FLOAT') > -1 || field.typeCol.toUpperCase().search('MONEY') > -1 || field.typeCol.toUpperCase() == 'NUMBERBOLDVN'
                    "
                  >
                    <div 
                      :key="index"
                      class="text-right" 
                    >
                      {{
                        convertMoneyVN(row.item[`${field.key}`]).split(".")[0]
                      }}
                    </div>
                  </template>
                  <template v-else-if="field.typeCol.toUpperCase() == 'DATE'">
                    <span 
                      :key="index"
                      style="color: #858585" 
                    >
                      {{ convertDate(row.item[`${field.key}`]) }}
                    </span>
                  </template>
                  <template
                    v-else-if="field.typeCol.toUpperCase() == 'DATETIME'"
                  >
                    <span 
                      :key="index"
                      style="color: #858585" 
                    >
                      {{ convertDateTime(row.item[`${field.key}`]) }}
                    </span>
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase() == 'ISCHECK' || field.typeCol.toUpperCase() == 'MUTEDBIT'
                    "
                  >
                    <span
                      v-if="
                        row.item[`${field.key}`] == 1 || row.item[`${field.key}`] == true
                      "
                      :key="index"
                      style="color: limegreen"
                    >✔
                    </span>
                    <span 
                      v-else 
                      :key="index" 
                      style="color: red"
                    >✗ </span>
                  </template>
                  <template v-else-if="field.typeCol.toUpperCase() == 'BIT'">
                    <b-form-checkbox
                      :key="index"
                      v-model="row.item[`${field.key}`]"
                      switch
                      size="md"
                      @change="emitEdit(row.item, field.key)"
                    />
                  </template>
                  <template v-else>
                    <div :key="index">
                      {{ row.item[`${field.key}`] }}
                    </div>
                  </template>
                </template>
                <template #empty>
                  <div class="text-left font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
                <template #emptyfiltered>
                  <div class="text-left font-italic text-muted">
                    {{ $t("data.non-result") }}
                  </div>
                </template>
                <template #cell(Actions)="row">
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
                {{ $t("lights.lamps-manager") }}
              </div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="showModalAddDevice('magementLamps')"
              />
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableLamps.length > 0"
                id="tu-table"
                class="tu-table"
                :items="dataTableLamps"
                :fields="fieldLamp"
                :bordered="true"
                show-empty
                sticky-header
                style="max-height: 100%"
                responsive
              >
                <template
                  v-for="(field, index) in fieldLamp"
                  v-slot:[`cell(${field.key})`]="row"
                >
                  <template v-if="field.typeCol.toUpperCase() == 'STRING-TREE'">
                    {{ row.item[`${field.key}`] }}
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase() == 'AVATAR' || field.typeCol.toUpperCase() == 'IMAGE'
                    "
                  >
                    <div 
                      :key="index" 
                      style="width: 65px; height: 33px"
                    >
                      <img
                        style="width: 100%; height: 100%"
                        :src="row.item[`${field.key}`]"
                        alt=""
                        @error="loadImgDefault"
                      >
                    </div>
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase().search('FLOAT') > -1 || field.typeCol.toUpperCase().search('MONEY') > -1 || field.typeCol.toUpperCase() == 'NUMBERBOLDVN'
                    "
                  >
                    <div 
                      :key="index"
                      class="text-right" 
                    >
                      {{
                        convertMoneyVN(row.item[`${field.key}`]).split(".")[0]
                      }}
                    </div>
                  </template>
                  <template v-else-if="field.typeCol.toUpperCase() == 'DATE'">
                    <span 
                      :key="index"
                      style="color: #858585" 
                    >
                      {{ convertDate(row.item[`${field.key}`]) }}
                    </span>
                  </template>
                  <template
                    v-else-if="field.typeCol.toUpperCase() == 'DATETIME'"
                  >
                    <span 
                      :key="index"
                      style="color: #858585" 
                    >
                      {{ convertDateTime(row.item[`${field.key}`]) }}
                    </span>
                  </template>
                  <template
                    v-else-if="
                      field.typeCol.toUpperCase() == 'ISCHECK' || field.typeCol.toUpperCase() == 'MUTEDBIT'
                    "
                  >
                    <span
                      v-if="
                        row.item[`${field.key}`] == 1 || row.item[`${field.key}`] == true
                      "
                      :key="index"
                      style="color: limegreen"
                    >✔
                    </span>
                    <span 
                      v-else 
                      :key="index" 
                      style="color: red"
                    >✗ </span>
                  </template>
                  <template v-else-if="field.typeCol.toUpperCase() == 'BIT'">
                    <b-form-checkbox
                      :key="index"
                      v-model="row.item[`${field.key}`]"
                      switch
                      size="md"
                      @change="emitEdit(row.item, field.key)"
                    />
                  </template>
                  <template v-else>
                    <!-- STRING -->
                    <div :key="index">
                      {{ row.item[`${field.key}`] }}
                    </div>
                  </template>
                </template>
                <template #empty>
                  <div class="text-left font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
                <template #emptyfiltered>
                  <div class="text-left font-italic text-muted">
                    {{ $t("data.non-result") }}
                  </div>
                </template>
                <template #cell(Actions)="row">
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
      id="modal-add-device"
      :title="$t('form.title-add').toUpperCase()"
      size="md"
      :ok-title="$t('modal.agree')"
      :cancel-title="$t('modal.cancel')"
      @ok="handleAddDevice"
      @hide="refeshModal"
    >
      <b-row>
        <b-col lg="12">
          <b-form-group
            :label="
              keyDevice == 'magementCabinet'
                ? $t('form.device-id')
                : $t('lights.stt')
            "
          >
            <b-form-input v-model="dataForm.StationID" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import TitleModul from "@/views/app/category/npl/component/Title.vue";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";
import handling from "@/constants/handling.js";

export default {
  name: "ExportDevice",
  components: {
    "title-light": TitleModul,
  },
  data() {
    return {
      menuRight: [],
      titleModal: "THÊM",
      dataForm: {},
      keyDevice: null,

      keyCabinets: null,
      keyLamps: null,
      columnCabinets: null,
      columnLamps: null,
      dataTableCabinet: [],
      dataTableLamps: [],

      actionField: {
        key: "Actions",
        label: this.$t("dropdown.action"),
        tdClass: "text-center",
      },
    };
  },
  computed: {
    objectData() {
      if (this.menuRight && this.menuRight.length) {
        for (let i = 0; i < this.menuRight.length; i++) {
          if (this.$route.fullPath === this.menuRight[i].Link) {
            console.log("formname objectData", this.menuRight[i].MenuName.toUpperCase());
            console.log("acces objectData", handling.convertBitToBoolean(
                this.menuRight[i].AccessWrite));
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
    fieldCabinet() {
      if (this.keyCabinets && this.columnCabinets) {
        let sortStickey = false;
        let results = handling.mergeKeyDynamic(
          this.keyCabinets,
          this.columnCabinets,
          sortStickey
        );
        results.push(this.actionField);
        return results;
      } else {
        return [];
      }
    },
    fieldLamp() {
      if (this.keyLamps && this.columnLamps) {
        let sortStickey = false;
        let results = handling.mergeKeyDynamic(
          this.keyLamps,
          this.columnLamps,
          sortStickey
        );
        results.push(this.actionField);
        return results;
      } else {
        return [];
      }
    },
  },

  watch: {
    async "$i18n.locale"(to, from) {
      if (from !== to) {
        await this.getMenuRight();
        await this.getcolumnCabinets("SLCabinetExports");
        await this.getColumnLamp("SLLampExports");
        await this.getDataCabinets();
        await this.getDataLamps();
      }
    },
  },

  async created() {
    await this.getMenuRight();
    await this.getcolumnCabinets("SLCabinetExports");
    await this.getColumnLamp("SLLampExports");
    await this.getDataCabinets();
    await this.getDataLamps();
  },

  methods: {
    getcolumnCabinets(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.columnCabinets = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnLamp(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.columnLamps = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataCabinets() {
      lightAPI
        .lightCabinetExportList()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.keyCabinets =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : null;
          this.dataTableCabinet = data;
        })
        .catch((err) => console.log(err));
    },
    getDataLamps() {
      lightAPI
        .lightLampExportList()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.keyLamps =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : null;
          this.dataTableLamps = data;
        })
        .catch((err) => console.log(err));
    },

    getMenuRight() {
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

    showModalAddDevice(type) {
      if (type == "magementCabinet") {
        this.keyDevice = type;
      } else if (type == "magementLamps") {
        this.keyDevice = type;
      }
      setTimeout(() => {
        this.$bvModal.show("modal-add-device");
      }, 500);
    },

    removeUnits(item, type) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.keyDevice = type;
            this.handleDelete(item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    refeshModal() {
      this.dataForm = {};
    },

    handleAddDevice(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataForm.StationID) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("form.no-blank")
        );
      }
      switch (this.keyDevice) {
        case "magementCabinet":
          this.cabinetExportProduct();
          break;
        case "magementLamps":
          this.lampsExportProduct();
          break;
      }
    },

    handleDelete(item) {
      switch (this.keyDevice) {
        case "magementCabinet":
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
        CabinetID: this.dataForm.StationID,
      };
      lightAPI
        .cabinetExportProduct(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataCabinets();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-device");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    lampsExportProduct() {
      let body = {
        STT: this.dataForm.StationID,
      };
      lightAPI
        .lampsExportProduct(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataLamps();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-device");
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
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataCabinets();
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
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataLamps();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    convertMoneyVN(value) {
      return handling.convertFloat(value);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
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
.tu-table .table th {
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
