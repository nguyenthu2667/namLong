<template>
  <div>
    <custom-table
      :data-table="items"
      :field-table="fields"
      :column-show="listColumnShow"
      :access-write="objectData.accessWrite"
    ></custom-table>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";

export default {
  props: ["objectData"],
  name: "RegionReport",
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
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
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          ...item,
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
      });
    },
    getKeyTable() {
      lightAPI
        .reportLightTotalByRegion()
        .then((val) => {
          this.objectKey = val.status ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      lightAPI
        .reportLightTotalByRegion()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 1, arrTable, 0);
            this.items = arrTable;
          } else {
            this.items = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getColumn("ReportRegions");
    await this.getKeyTable();
    await this.getData();
  },
  updated() {
    this.handleDataExcelToParent();
  },
};
</script>
