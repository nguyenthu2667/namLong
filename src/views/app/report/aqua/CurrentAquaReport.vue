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
                @click="printExternalExcel('current-aqua-report')"
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
          <template v-if="datas && datas.length">
            <custom-table
              :id-table="'current-aqua-report'"
              style="background-color: white"
              class="customTable"
              bordered
              @row-selected="rowSelected"
              :select-mode="selectMode"
              :data-table="datas"
              :field-table="fields"
              :type-show-data="typeShowData"
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
import CustomTables from "./component/CurrentTable";
//api
import aquaAPI from "@/api/modules/aquaAPI";
import systemAPI from "@/api/modules/systemAPI";

export default {
  name: "CurrentAquaReportNew",
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      typeShowData: "CURRENT-REPORT-AQUA",
      nameExcel: "báo_cáo_nuôi_trồng_thủy_sản_hiện_Tại.xls",
      selectMode: "single",
      menuRight: [],
      datas: [],
      fields: [
        {
          label: this.$t("report.aqua.fields-current.station-name"),
          key: "StationName",
          tdClass: "p-2 text-center",
        },
        {
          label: this.$t("report.aqua.fields-current.device"),
          key: "Extras",
          tdClass: "p-2 text-center",
        },
        {
          label: this.$t("report.aqua.fields-current.node-device"),
          key: "Nodes",
          tdClass: "p-0",
        },
        {
          label: "PIN(%)",
          key: "PIN",
          tdClass: "p-0",
        },
        {
          label: "TDV(°C)",
          key: "TDV",
          tdClass: "p-0",
        },
        {
          label: "PH(pH)",
          key: "PH",
          tdClass: "p-0",
        },
        {
          label: "SAL(‰)",
          key: "SAL",
          tdClass: "p-0",
        },
        {
          label: "EC(S/m)",
          key: "EC",
          tdClass: "p-0",
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
    rowSelected() {
      console.log("rowSelected");
    },
    convertDataExcel(data) {
      this.json_data = [];
      data.forEach((item) => {
        let obj = {
          StationName: [],
          Extras: [],
          Nodes: [],
          PIN: [],
          TDV: [],
          PH: [],
          EC: [],
          SAL: [],
        };
        obj.StationName.push(item.StationName);
        item.DeviceInfos.forEach((el) => {
          obj.StationName.push(el.InfoName + ":" + el.InfoValue);
        });
        item.Extras.forEach((el) => {
          obj.Extras.push(el.StationExtraName + ":" + el.Status);
        });
        item.Nodes.forEach((el) => {
          obj.Nodes.push(el.StationNodeName);
        });
        item.PIN.forEach((el) => {
          obj.PIN.push(el.DeviceInfos[0].InfoValue);
        });
        item.TDV.forEach((el) => {
          obj.TDV.push(el.DeviceInfos[1].InfoValue);
        });
        item.PH.forEach((el) => {
          obj.PH.push(el.Indicators[0].IndicatorValue);
        });
        item.EC.forEach((el) => {
          obj.EC.push(el.Indicators[1].IndicatorValue);
        });
        item.SAL.forEach((el) => {
          obj.SAL.push(el.Indicators[2].IndicatorValue);
        });
        obj.StationName = obj.StationName.join("\n");
        obj.Extras = obj.Extras.join("\n");
        obj.Nodes = obj.Nodes.join("\n");
        obj.PIN = obj.PIN.join("\n");
        obj.TDV = obj.TDV.join("\n");
        obj.PH = obj.PH.join("\n");
        obj.EC = obj.EC.join("\n");
        obj.SAL = obj.SAL.join("\n");
        this.json_data.push(obj);
      });
    },
    convertDataTable(data) {
      let result = [];
      data.forEach((item) => {
        let obj = {
          StationID: item.StationID ?? null,
          StationName: item.StationName ?? null,
          UpdateTime: item.UpdateTime ?? null,
          StationAddress: item.StationAddress ?? null,
          Lat: item.Lat ?? null,
          Long: item.Long ?? null,
          StatusID: item.StatusID ?? null,
          StatusName: item.StatusName ?? null,
          DeviceInfos: [...item.DeviceInfos],
          Extras: [...item.Extras],
          Nodes: [...item.Nodes],
          PIN: [...item.Nodes],
          TDV: [...item.Nodes],
          PH: [...item.Nodes],
          SAL: [...item.Nodes],
          EC: [...item.Nodes],
        };
        result.push(obj);
      });
      return result;
    },
    getDataTable() {
      aquaAPI
        .CurrentAquaReport()
        .then((val) => {
          this.datas = val.status ? val.data : [];
          this.datas = this.convertDataTable(this.datas);
          //this.convertDataExcel(this.datas)
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
      a.download = this.objectData.formName + ".xls";
      a.click();
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getDataTable();
  },
};
</script>
<style scoped></style>
