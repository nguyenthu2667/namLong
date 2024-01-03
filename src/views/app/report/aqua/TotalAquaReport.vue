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
          <b-row>
            <b-colxx lg="6">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption()"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="6">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption()"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <template v-if="datas && datas.length">
            <custom-table
              :data-table="datas"
              :field-table="fields"
              :column-show="listColumnShow"
              :select-mode="selectMode"
              @row-dblclicked="dbClickDetail"
            ></custom-table>
          </template>
          <template v-else>
            <span class="font-italic">{{ $t("cards.no-data") }}</span>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      :id="`modal-aqua-${idClick}`"
      :title="titleForm"
      @hidden="resetModal"
      ok-only
      scrollable
      class="text-center"
      size="xl"
      v-if="dataModal"
    >
      <custom-table
        :data-table="dataModal"
        :field-table="fieldsAqua"
        :column-show="listColumnShow"
        :select-mode="selectMode"
      ></custom-table>
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

String.prototype.allReplace = function (obj) {
  let retStr = this;
  for (let i in obj) {
    retStr = retStr.replace(new RegExp(i, "g"), obj[i]);
  }
  return retStr;
};
export default {
  name: "CurrentAquaReport",
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
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      dataModal: null,
      listColumnShow: null,
      objectKey: null,
      objectKeyModal: null,
      idClick: null,
      titleForm: null,
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
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldsAqua: function () {
      return handling.mergeTableAndData(
        this.objectKeyModal,
        this.listColumnShow
      );
    },
  },
  methods: {
    resetModal() {
      this.dataModal = null;
    },
    dbClickDetail(row) {
      this.idClick = row.ID;
      let body = {
        NodeID: row.ID,
        DateType: "FromDateToDate",
        FromDate: this.from.toString().allReplace({ "-": "/" }),
        ToDate: this.to.toString().allReplace({ "-": "/" }),
      };
      aquaAPI
        .DetailAquaReport(body)
        .then((val) => {
          this.dataModal = val.status ? val.data : [];
          this.objectKeyModal = val.status ? Object.keys(val.data[0]) : [];
          this.titleForm = this.$t("dashboards.view-detail");
          setTimeout(() => {
            this.$bvModal.show(`modal-aqua-${this.idClick}`);
          }, 500);
        })
        .catch((err) => console.log(err));
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
    changeOption(selected, from, to, option) {
      this.getDataTable();
      // this.getTitle()
    },
    rowSelected() {},
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
      let body = {
        DateType: "FromDateToDate",
        FromDate: this.from.toString().allReplace({ "-": "/" }),
        ToDate: this.to.toString().allReplace({ "-": "/" }),
      };
      aquaAPI
        .TotalAquaReport(body)
        .then((val) => {
          console.log(val);
          this.datas = val.status ? val.data : [];
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
      a.download = this.objectData.formName + ".xls";
      a.click();
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getDataTable();
    await this.getColumn("ReportDetailAquas");
  },
};
</script>
<style scoped></style>
