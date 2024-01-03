<template>
  <div>
    <custom-table
      @row-selected="rowSelected"
      :select-mode="selectMode"
      :data-table="items"
      :region-table="regionTable"
      :field-table="fields"
      :column-show="listColumnShow"
      :access-write="objectData.accessWrite"
    ></custom-table>
    <b-modal id="modal-lamp" size="xl" hide-header scrollable>
      <lamp-manager
        :listColumnShow="cusColumnShowLamp"
        :cusFields="cusFieldsLamp"
        :data="dataLamp"
        :objectData="objectData"
      />
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTablesReportCabinets";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import LampManager from "./LampReport";
import lightAPI from "@/api/modules/lightAPI";

export default {
  props: ["objectData"],
  name: "RegionReport",
  components: {
    "custom-table": CustomTables,
    "lamp-manager": LampManager,
  },
  data() {
    return {
      timer,
      stateForm: {
        Name: null,
        NameExtention1: null,
        NameExtention2: null,
        NameExtention3: null,
        NameExtention4: null,
        NameExtention5: null,
        NameExtention6: null,
        NameExtention7: null,
        NameExtention8: null,
        NameExtention9: null,
      },
      items: null,
      objectKey: null,
      listColumnShow: null,
      regionTable: null,
      selectMode: "single",
      selectedItems: [],
      dataLamp: [],
      cusFieldsLamp: [],
      cusColumnShowLamp: null,
    };
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldsExcel: function () {
      if (!this.fields) {
        return;
      }
      let obj = {};
      let arr = this.fields;
      for (let i = 0; i < arr.length; i++) {
        let label = arr[i].label;
        obj[label] = arr[i].key;
      }
      return obj;
    },
  },
  methods: {
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
      a.download = "BÁO_CÁO_THỐNG_KÊ_TỦ_QUẢN_LÍ" + ".xls";
      a.click();
    },
    rowSelected(data) {
      this.dataLamp = [];
      this.cusColumnShowLamp = null;
      this.cusFieldsLamp = [];
      this.selectedItems = data;
      this.getDataLamp(data.CabinetID);
      setTimeout(() => {
        this.$bvModal.show("modal-lamp");
      }, this.timer);
    },
    getDataLamp(id) {
      let key = null;
      let body = {
        ObjectName: "ReportLamps",
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.cusColumnShowLamp = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
      lightAPI.reportLightDetail().then((val) => {
        let lamp = val.status ? val.data.Lamps : [];
        if (lamp.length > 0) {
          key = Object.keys(lamp[0]);
          for (let i = 0; i < lamp.length; i++) {
            if (lamp[i].CabinetID === id) {
              this.dataLamp.push(lamp[i]);
            }
          }
        } else {
          this.dataLamp = [];
        }
      });
      this.cusFieldsLamp = handling.mergeTableAndData(
        key,
        this.cusColumnShowLamp
      );
    },
    handleDataExcelToParent() {
      this.$emit("childToParent", this.items, this.fieldsExcel);
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
    getKeyTable() {
      lightAPI
        .reportLightTotalByCabinet()
        .then((val) => {
          this.objectKey = val.status ? Object.keys(val.data.Cabinets[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      lightAPI
        .reportLightTotalByCabinet()
        .then((val) => {
          this.items = val.status ? val.data.Cabinets : [];
          this.regionTable = val.status ? val.data.Regions : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getColumn("ReportCabinets");
    await this.getKeyTable();
    await this.getData();
  },
};
</script>
