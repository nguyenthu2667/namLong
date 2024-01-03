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
                @click="printExternalExcel('warning-aqua-report')"
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
            <b-colxx lg="2">
              <b-form-group :label="$t('modal.location-option') + ':'">
                <b-form-select
                  v-model="selectedStation"
                  :options="optionStation"
                  size="sm"
                  @change="changeOptionStation(selectedStation)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="2">
              <b-form-group :label="'Node' + ':'">
                <b-form-select
                  v-model="selectedNode"
                  :options="optionNode"
                  size="sm"
                  @change="changeOption(selectedNode, selectedUnit, from, to)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="2">
              <b-form-group :label="'Thông số' + ':'">
                <b-form-select
                  v-model="selectedUnit"
                  :options="optionUnit"
                  size="sm"
                  @change="changeOption(selectedNode, selectedUnit, from, to)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="3">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption(selectedNode, selectedUnit, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="3">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption(selectedNode, selectedUnit, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <template v-if="data && data.length">
            <custom-table
              :id="'warning-aqua-report'"
              style="background-color: white"
              class="customTable"
              bordered
              :select-mode="selectMode"
              :data-table="data"
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
import aquaAPI from "@/api/modules/aquaAPI";
import systemAPI from "@/api/modules/systemAPI";

export default {
  name: "WarningAquaReportNew",
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
      selectedNode: null,
      optionNode: [],
      selectedUnit: null,
      optionUnit: [],
      menuRight: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      data: [],
      fields: [
        {
          label: this.$t("report.station-name"),
          key: "Name",
        },
        {
          label: this.$t("report.start-time"),
          key: "StartTime",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          label: this.$t("report.end-time"),
          key: "EndTime",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          label: this.$t("report.warning") + `(${this.$t("report.minute")})`,
          key: "WarningTime",
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
    changeOptionStation(station) {
      this.getListNode(station);
    },
    changeOption(node, unit, from, to) {
      this.getDataTable(node, unit, from, to);
    },
    getOptionStation() {
      aquaAPI
        .getActiveStations()
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
            this.getListNode(this.selectedStation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListNode(selected) {
      let body = {
        StationID: selected,
        UserIDCurent: this.userID,
      };
      aquaAPI
        .getNodeActive(body)
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          if (result.length > 0) {
            result.forEach((_val) => {
              let obj = {
                text: _val.StationNodeName,
                value: _val.ID,
              };
              array.push(obj);
            });
            this.optionNode = array;
            this.selectedNode = this.optionNode[0].value;
            this.getUnit(this.selectedStation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUnit(selected) {
      let body = {
        StationID: selected,
        UserIDCurent: this.userID,
      };
      aquaAPI
        .listUnit(body)
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          if (result.length > 0) {
            result.forEach((_val) => {
              let obj = {
                text: _val.Name,
                value: _val.Code,
              };
              array.push(obj);
            });
            this.optionUnit = array;
            this.selectedUnit = this.optionUnit[0].value;
            setTimeout(() => {
              this.getDataTable(
                this.selectedNode,
                this.selectedUnit,
                this.from,
                this.to
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataTable(id, unit, from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
        NodeID: id,
        UserIDCurent: this.userID,
        Code: unit,
      };
      aquaAPI
        .WarningAquaReport(body)
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
