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
                @click="handleSubmitExport(0)"
                v-if="objectData.accessWrite === true"
              >
                <i class="fas fa-file-download"></i>
                &emsp; {{ $t("report.action.export-day") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="handleSubmitExport(1)"
                v-if="objectData.accessWrite === true"
              >
                <i class="fas fa-file-download"></i>
                &emsp; {{ $t("report.action.export-all") }}
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
          <b-row>
            <b-colxx xl="3" lg="6">
              <b-form-group :label="$t('modal.view-mode') + ':'">
                <b-form-select
                  v-model="selectedType"
                  :options="optionType"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx xl="3" lg="6">
              <b-form-group :label="$t('modal.device-option') + ':'">
                <b-form-select
                  v-model="selectedThermal"
                  :options="optionThermal"
                  size="sm"
                  @change="changeOption(selectedThermal, from, to)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx xl="3" lg="6">
              <b-form-group :label="$t('modal.from-datetime') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption(selectedThermal, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx xl="3" lg="6">
              <b-form-group :label="$t('modal.to-datetime') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption(selectedThermal, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            :row-page="100"
            @row-selected="rowSelected"
            :export-status="exportStatus"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="notify-modal"
      ref="notify-modal"
      hide-footer
      :title="$t('notify.notification').toUpperCase()"
    >
      <div class="text-center">
        <b-img
          :src="require('@/assets/img/V.svg')"
          style="height: 50px"
        ></b-img>
      </div>
      <div class="bar success text-center">
        <strong>
          {{ $t("notify.noti-check-2") }}
        </strong>
        <br />
        <strong>
          {{ $t("notify.noti-check-3") }}
        </strong>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import thermalAPI from "@/api/modules/thermalAPI";
import moment from "moment";
import excelAPI from "@/api/modules/excelAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      selectedThermal: null,
      optionThermal: [],
      items: null,
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedType: "%",
      optionType: [
        {
          text: this.$t("table.all"),
          value: "%",
        },
        {
          text: this.$t("table.normal"),
          value: 0,
        },
        {
          text: this.$t("table.temperature-warning"),
          value: 1,
        },
      ],
      exportStatus: "close",
      typeFile: "FACE",
    };
  },
  watch: {
    items() {
      this.getColumn("ReportCameraThermals");
    },
    selectedType(to, from) {
      this.getData(this.selectedThermal, this.from, this.to);
    },
  },
  methods: {
    changeOption(select, from, to) {
      this.getData(select, from, to);
      this.getKeyTable(select, from, to);
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    getList() {
      thermalAPI
        .thermalCamerakReportList()
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          if (result.length > 0) {
            result.forEach((_val) => {
              let obj = {
                text: _val.CameraThermalName,
                value: _val.SerialNumber,
              };
              array.push(obj);
            });
            this.optionThermal = array;
            this.selectedThermal = this.optionThermal[0].value;
            setTimeout(() => {
              this.getData(this.selectedThermal, this.from, this.to);
              this.getKeyTable(this.selectedThermal, this.from, this.to);
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(select, from, to) {
      let body = {
        SerialNumber: select,
        FromDate: from,
        ToDate: to,
      };
      thermalAPI
        .thermalCameraReportData(body)
        .then((val) => {
          let result = val.status ? val.data : [];
          if (this.selectedType === "%") {
            this.items = result;
          } else {
            this.items = result.filter(
              (x) => x.IsWarning === this.selectedType
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(select, from, to) {
      let body = {
        SerialNumber: select,
        FromDate: from,
        ToDate: to,
      };
      thermalAPI
        .thermalCameraReportData(body)
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
    handleSubmitExport(value) {
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.typeFile,
        IsAll: value,
        FromDate: this.from,
        ToDate: this.to,
      };
      excelAPI
        .exportExcel(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
            this.$bvModal.show("notify-modal");
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => console.log(err));
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
  async created() {
    await this.getList();
    await this.getListMenuRight();
    await this.getColumn("ReportCameraThermals");
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
};
</script>
<style scoped>
/* THE BASE */
.bar {
  padding: 10px;
  margin: 10px;
  color: #333;
  background: #fafafa;
  border: 1px solid #ccc;
  position: relative;
}
/* THE VARIATIONS */
.success {
  color: #2b7515;
  background: #ecffd6;
  border: 1px solid #617c42;
}
.error {
  color: #ba3939;
  background: #ffe0e0;
  border: 1px solid #a33a3a;
}

div.action {
  position: absolute;
  top: 30%;
  right: 10px;
  color: #888;
  cursor: pointer;
}
</style>
