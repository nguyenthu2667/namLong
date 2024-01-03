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
                @click="printExternalExcel('warning-monitor-report')"
              >
                <i class="fad fa-file-excel"></i>
                &emsp;{{ $t("report.action.download-excel-page") }}
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
            <b-colxx lg="4">
              <b-form-group :label="$t('dashboards.station') + ':'">
                <b-form-select
                  v-model="selectedStation"
                  :options="optionStation"
                  size="sm"
                  @change="changeOption(selectedStation, from, to)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption(selectedStation, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption(selectedStation, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <template v-if="datas && datas.length">
            <custom-table
              :id="'warning-monitor-report'"
              style="background-color: white"
              class="customTable"
              bordered
              @row-selected="rowSelected"
              :select-mode="selectMode"
              :data-table="datas"
              :field-table="fields"
              :column-show="listColumnShow"
            ></custom-table>
          </template>
          <template v-else>
            <span class="font-italic">{{ $t("cards.no-data") }}</span>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import moment from "moment";
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
import monitorAPI from "@/api/modules/monitorAPI";
import systemAPI from "@/api/modules/systemAPI";
export default {
  name: "masterMonitorReportErr",
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedStation: null,
      optionStation: [],
      menuRight: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      objectKey: null,
      listColumnShow: null,
      datas: [],
    };
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
  methods: {
    changeOption(selected, from, to) {
      this.getKeyTable(selected, from, to);
      this.getDataTable(selected, from, to);
    },
    getOptionStation() {
      monitorAPI
        .monitorStationList()
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          if (result.length > 0) {
            result.forEach((_val) => {
              let obj = {
                text: _val.StationName,
                value: _val.StationID,
              };
              array.push(obj);
            });
            this.optionStation = array;
            this.selectedStation = this.optionStation[0].value;
            setTimeout(() => {
              this.getKeyTable(this.selectedStation, this.from, this.to);
              this.getDataTable(this.selectedStation, this.from, this.to);
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataTable(id, from, to) {
      let body = {
        Type: "DateToDate",
        FromDate: from,
        ToDate: to,
        StationID: id,
        UserIDCurent: this.userID,
        ReportType: "Error",
      };
      monitorAPI
        .masterMonitorReport(body)
        .then((val) => {
          this.datas = val.status ? val.data : [];
          if (this.datas && this.datas.length > 0) {
            this.datas.forEach((item) => {
              item.CreateTime = this.convertDateTime(item.CreateTime);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(id, from, to) {
      let body = {
        Type: "DateToDate",
        FromDate: from,
        ToDate: to,
        StationID: id,
        UserIDCurent: this.userID,
        ReportType: "Error",
      };
      monitorAPI
        .masterMonitorReport(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
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
    printExternalExcel(id) {
      let table, name;
      table = id;
      name = "Table Report";
      let uri = "data:application/vnd.ms-excel;base64,",
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        };
      if (!table.nodeType) table = document.getElementById(table);
      let ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      let a = document.createElement("a");
      a.href = uri + base64(format(template, ctx));
      a.download =
        this.objectData.formName + "_" + this.from + "_" + this.to + ".xls";
      a.click();
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      sytemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    items() {
      this.getColumn("ReportMonitorsError");
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ReportMonitorsError");
    await this.getOptionStation();
  },
};
</script>
<style scoped></style>
