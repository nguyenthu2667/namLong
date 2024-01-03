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
              <b-dropdown-item @click="printExternalExcel('moved-light')">
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
          <b-row>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption(from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption(from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4"></b-colxx>
          </b-row>
          <template v-if="datas && datas.length">
            <custom-table
              :id-table="'moved-light'"
              :type-show-table="'MOVED-LIGHT'"
              :field-table="fields"
              :data-table="datas"
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
import CustomTables from "@/components/Table/CustomTableSimple";
//api
import lightAPI from "@/api/modules/lightAPI";
import systemAPI from "@/api/modules/systemAPI";

export default {
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      fileNameExcel: "",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedStation: null,
      menuRight: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      datas: [],
      fields: [
        {
          label: this.$t("report.light.fields-disconnect.cabinet-info"),
          key: "CabinetInfo",
        },
        {
          label: this.$t("report.light.fields-disconnect.lamps"),
          key: "Lamp",
        },
        {
          label: this.$t("report.light.fields-disconnect.address-lamp"),
          key: "AddressLamp",
        },
        {
          label: this.$t("report.light.fields-moved.time-moved"),
          key: "TimeError",
        },
        {
          label: this.$t("report.light.fields-moved.count-time-moved"),
          key: "CountTimeError",
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
    getTitle(from, to) {
      if (this.objectData) {
        this.fileNameExcel = this.objectData.formName + "_" + from + "_" + to;
      }
    },
    changeOption(from, to) {
      this.getDataTable(from, to);
      this.getTitle(from, to);
    },
    convertDataTable(data) {
      let result = [];
      data.forEach((cabinet) => {
        cabinet.Lamps.forEach((lamp, index) => {
          let row = {};
          // if (index === 0) {
          //   row.CabinetInfo = [
          //     cabinet.Name ?? null,
          //     cabinet.Address ?? null,
          //     cabinet.LastTimeError ?? null,
          //     cabinet.TimeError ?? null,
          //     cabinet.CountTimeError ?? null,
          //   ]
          // }
          row.CabinetInfo = [
            cabinet.Name ?? null,
            cabinet.Address ?? null,
            cabinet.LastTimeError ?? null,
            cabinet.TimeError ?? null,
            cabinet.CountTimeError ?? null,
          ];
          row.CabinetID = cabinet.CabinetID;
          row.Lamp = lamp.Name;
          row.rowspan = cabinet.Lamps.length;
          row.TimeError = lamp.TimeError;
          row.CountTimeError = lamp.CountTimeError;
          row.AddressLamp = lamp.Address;
          result.push(row);
        });
      });

      return result;
    },
    getDataTable(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
        UserIDCurent: this.userID,
      };
      lightAPI
        .MovedLight(body)
        .then((val) => {
          this.datas = val.status ? val.data : [];
          if (this.datas && this.datas.length > 0) {
            this.datas = this.convertDataTable(this.datas);
          }
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
      a.download = this.fileNameExcel + "_THEO-TRANG" + ".xls";
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
    await this.changeOption(this.from, this.to);
  },
};
</script>
<style scoped></style>
