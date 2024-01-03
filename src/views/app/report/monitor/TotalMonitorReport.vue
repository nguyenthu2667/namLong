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
                @click="printExternalExcel('total-monitor-report')"
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
        <!-- //aqua -->
        <b-card>
          <b-row>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.location-option') + ':'">
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
              :id="'total-monitor-report'"
              style="background-color: white"
              class="customTable"
              bordered
              @row-selected="rowSelected"
              :select-mode="selectMode"
              :data-table="datas"
              :field-table="fields"
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
//api
import monitorAPI from "@/api/modules/monitorAPI";
import systemAPI from "@/api/modules/systemAPI";

export default {
  name: "TotalMonitorRepo",
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      nameExcel: "báo_cáo_nuôi_trồng_thủy_sản_total.xls",
      selectMode: "single",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedStation: null,
      optionStation: [],
      menuRight: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      datas: [],
      fields: [
        {
          label: this.$t("report.aqua.fields-current.station-date"),
          key: "DataDate",
          formatter: (value, key, item) => {
            return this.convertDate(value);
          },
        },
        {
          label: "PIN(%)",
          key: "PIN",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[0]) return NaN;
            return item.DeviceInfos[0].Value;
          },
        },
        {
          label: "TDV(°C)",
          key: "TDV",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[1]) return NaN;
            return item.DeviceInfos[1].Value;
          },
        },
        {
          label: "PM10(μg/m3)",
          key: "PM10",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[2]) return NaN;
            return item.DeviceInfos[2].Value;
          },
        },
        {
          label: "PM2.5(μg/m3)",
          key: "PM2.5",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[6]) return NaN;
            return item.DeviceInfos[6].Value;
          },
        },
        {
          label: "O3(ppm)",
          key: "O3",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[3]) return NaN;
            return item.DeviceInfos[3].Value;
          },
        },
        {
          label: "CO2(ppm)",
          key: "CO2",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[4]) return NaN;
            return item.DeviceInfos[4].Value;
          },
        },
        {
          label: "CO(ppm)",
          key: "CO",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[7]) return NaN;
            return item.DeviceInfos[7].Value;
          },
        },
        {
          label: "NL(dB)",
          key: "NL",
          formatter: (value, key, item) => {
            if (!item.DeviceInfos[5]) return NaN;
            return item.DeviceInfos[5].Value;
          },
        },
      ],
    };
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
  methods: {
    changeOption(selected, from, to) {
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
        FromDate: from,
        ToDate: to,
        StationID: id,
        UserIDCurent: this.userID,
      };
      monitorAPI
        .TotalMonitorReport(body)
        .then((val) => {
          this.datas = val.status ? val.data : [];
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getOptionStation();
  },
};
</script>
<style scoped></style>
