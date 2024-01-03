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
              <b-dropdown-item @click="printExternalExcel('err-aqua-report')">
                <i class="fad fa-file-excel"></i>
                &emsp;{{ $t("report.action.download-excel") }}
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
          <template v-if="data && data.length">
            <custom-table
              :id="'err-aqua-report'"
              :data-table="data"
              :field-table="fields"
              :access-write="objectData.accessWrite"
              :select-mode="selectMode"
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
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      selectedStation: null,
      menuRight: [],
      listColumnShow: null,
      objectKey: null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      data: [],
      fields: [
        {
          label: this.$t("report.station-name"),
          key: "StationName",
          tdClass: "text-left",
        },
        {
          label: this.$t("report.address"),
          key: "StationAddress",
          tdClass: "text-left",
        },
        {
          label: this.$t("report.location"),
          key: "Lat",
          formatter: (value, key, item) => {
            return item.Lat + " ," + item.Long;
          },
          tdClass: "text-left",
        },
        {
          label: this.$t("report.update-time"),
          key: "UpdateTime",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
          tdClass: "text-center",
        },
        {
          label: this.$t("status.status"),
          key: "StatusName",
          tdClass: "text-left",
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
    getDataTable() {
      monitorAPI
        .currentMonitorReport()
        .then((val) => {
          this.data = val.status ? val.data : [];
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
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    timerLoadDashboard(time) {
      this.getDataTable();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.timerLoadDashboard(this.timer * 240);
  },
};
</script>
<style scoped></style>
