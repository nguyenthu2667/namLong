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
              :id="'err-aqua-report'"
              :data-table="datas"
              :field-table="fields"
              :access-write="objectData.accessWrite"
              :select-mode="selectMode"
              @row-dblclicked="handleDbClick"
            ></custom-table>
          </template>
          <template v-else>
            <span class="font-italic">{{ $t("cards.no-data") }}</span>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="modal-detail"
      name="modal-detail"
      class="text-center"
      :title="'CHI TIẾT'"
      ok-only
      @hidden="resetModal"
      scrollable
      size="lg"
      v-if="dataForm"
    >
      <b-table
        v-if="dataForm && dataForm.length > 0"
        :fields="fieldsDetail"
        :items="dataForm"
      ></b-table>
      <template v-else>
        <p class="text-center text-muted text-small font-italic">
          {{ $t("map.no-data") }}
        </p>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import moment from "moment";
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
//api
import aquaAPI from "@/api/modules/aquaAPI";
import systemAPI from "@/api/modules/systemAPI";

export default {
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      dataForm: null,
      fieldsDetail: [
        {
          label: "Thời điểm",
          key: "CreateDate",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          label: this.$t("report.aqua.fields-current.count-time-err"),
          key: "TimeError",
        },
      ],
      selectMode: "single",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedStation: null,
      menuRight: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      datas: [],
      fields: [
        {
          label: this.$t("report.aqua.fields-current.station-name"),
          key: "StationName",
        },
        {
          label: this.$t("report.aqua.fields-current.station-address"),
          key: "StationAddress",
        },
        {
          label: this.$t("report.aqua.fields-current.connect-type"),
          key: "ConnectTypeName",
        },
        {
          label: this.$t("report.aqua.fields-current.power-type"),
          key: "PowerTypeName",
        },
        {
          label: this.$t("report.aqua.fields-current.input-date"),
          key: "InputDate",
        },
        {
          label: this.$t("report.aqua.fields-current.count-time-err"),
          key: "CountTimeError",
        },
        {
          label: this.$t("report.aqua.fields-current.sum-time-err"),
          key: "SumTimeError",
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
    resetModal() {
      this.dataForm = null;
    },
    handleDbClick(row) {
      console.log(1, "row", row);
      this.dataForm = row.Details;
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, 500);
    },
    changeOption(from, to) {
      this.getDataTable(from, to);
    },
    getDataTable(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
        UserIDCurent: this.userID,
      };
      aquaAPI
        .ErrAquaReport(body)
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
    await this.changeOption(this.from, this.to);
  },
};
</script>
<style scoped></style>
