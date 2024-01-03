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
                @click="printExternalExcel('new-table-report-light')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp;{{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
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
          <!-- <template v-if="selectedOption == 'Disconnected'">
            <template v-if="items && items.length">
              <custom-table
                :id-table="'new-table-report-light'"
                :type-show-table="'DISCONNECT-LIGHT'"
                :field-table="fieldsDisconnected"
                :data-table="items"
              ></custom-table>
            </template>
            <template v-else>
              <span class="font-italic">{{ $t('cards.no-data') }}</span>
            </template>
          </template>
          <template v-else-if="selectedOption == 'Moved'">
            <template v-if="items && items.length">
              <custom-table
                :id-table="'new-table-report-light'"
                :type-show-table="'MOVED-LIGHT'"
                :field-table="fieldsMoved"
                :data-table="items"
              ></custom-table>
            </template>
            <template v-else>
              <span class="font-italic">{{ $t('cards.no-data') }}</span>
            </template>
          </template>
          <template v-else-if="selectedOption == 'LampError'">
            <template v-if="items && items.length">
              <custom-table
                :id-table="'new-table-report-light'"
                :type-show-table="'LAMP-ERROR-LIGHT'"
                :field-table="fieldsLampError"
                :data-table="items"
              ></custom-table>
            </template>
            <template v-else>
              <span class="font-italic">{{ $t('cards.no-data') }}</span>
            </template>
          </template> -->
          <custom-table
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @row-dblclicked="dbClickDetail"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      :id="`modal-light-${idClick}`"
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
        :field-table="fieldsDetail"
        :column-show="listColumnShow"
        :select-mode="selectMode"
      ></custom-table>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import moment from "moment";
import lightAPI from "@/api/modules/lightAPI";

String.prototype.allReplace = function (obj) {
  let retStr = this;
  for (let i in obj) {
    retStr = retStr.replace(new RegExp(i, "g"), obj[i]);
  }
  return retStr;
};

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    // 'room-fire-warning-report': RoomFireWarningReport,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedFireLocation: null,
      optionFireLocation: [],
      title: "",
      // selectedOption: 'FIRE',
      selectedOption: "Disconnected",
      options: [
        {
          text: "Mất kết nối ",
          value: "Disconnected",
        },
        {
          text: "Bị di chuyển",
          value: "Moved",
        },
        {
          text: "Đèn lỗi",
          value: "LampError",
        },
      ],
      fieldsDisconnected: [
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
          label: this.$t("report.light.fields-disconnect.last-time-dis-lamp"),
          key: "LastTimeErrorLamp",
        },
        {
          label: this.$t("report.light.fields-disconnect.time-error"),
          key: "TimeError",
        },
        {
          label: this.$t("report.light.fields-disconnect.count-time-dis"),
          key: "CountTimeError",
        },
        {
          label: this.$t("report.light.fields-disconnect.sum-time-dis"),
          key: "SumTimeError",
        },
      ],
      fieldsMoved: [
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
      fieldsLampError: [
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
          label: this.$t("report.light.fields-lamp-err.time-error"),
          key: "TimeError",
        },
        {
          label: this.$t("report.light.fields-lamp-err.count-error"),
          key: "CountTimeError",
        },
        {
          label: this.$t("report.light.fields.connect-type"),
          key: "ConnectTypeName",
        },
        {
          label: this.$t("report.light.fields.power-type"),
          key: "PowerTypeName",
        },
      ],
      idClick: null,
      dataModal: null,
      objectKeyModal: null,
    };
  },
  methods: {
    resetModal() {
      this.dataModal = null;
    },
    dbClickDetail(row) {
      if (row?.Type === "Lamp") {
        this.idClick = row.ID;

        let body = {
          DateType: "FromDateToDate",
          LampID: row.ID,
          FromDate: this.from.toString().allReplace({ "-": "/" }),
          ToDate: this.to.toString().allReplace({ "-": "/" }),
        };
        lightAPI
          .reportLightDetails(body)
          .then((val) => {
            this.dataModal = val.status ? val.data : [];
            this.objectKeyModal =
              val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
            this.titleForm = this.$t("dashboards.view-detail");
            setTimeout(() => {
              this.$bvModal.show(`modal-light-${this.idClick}`);
            }, 500);
          })
          .catch((err) => console.log(err));
      }
    },
    convertKeyTableData(array, ParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] !== ParentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          ParentID: item["ParentID"],
          LocationName: item["LocationName"],
          SumDistance: item["SumDistance"],
          SumError: item["SumError"],
          SumOpen: item["SumOpen"],
          SumPin: item["SumPin"],
          Type: item["Type"],
          CountPin: item["CountPin"],
          CountOpen: item["CountOpen"],
          CountError: item["CountError"],
          CountDistance: item["CountDistance"],
          Key: i,
          isCollapse: false,
          isParentCollapse: false,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    getData() {
      let body = {
        DateType: "FromDateToDate",
        FromDate: this.from.toString().allReplace({ "-": "/" }),
        ToDate: this.to.toString().allReplace({ "-": "/" }),
      };
      lightAPI
        .reportLightTotal(body)
        .then((val) => {
          let array = val.status ? val.data : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, "0", arrTable, 0);
            this.items = arrTable;
          } else {
            this.items = [];
          }
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeOption() {
      this.getData();
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    showModalDetail(selected) {
      if (selected.length > 0) {
        setTimeout(() => {
          this.$bvModal.show("modal-room");
        }, this.timer);
      }
    },
    getTitle() {
      for (let i = 0; i < this.optionFireLocation.length; i++) {
        if (this.optionFireLocation[i].value === this.selectedFireLocation) {
          this.title = this.optionFireLocation[i].text;
        }
      }
    },
    timerLoadDashboard(time) {
      this.getKeyTable(
        this.selectedFireLocation,
        this.from,
        this.to,
        this.selectedOption
      );
      this.getData();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
    getKeyTable(id, from, to, option) {
      let body = {
        ErrorType: option,
        LocationID: id,
        FromDate: from.toString().allReplace({ "-": "/" }),
        ToDate: to.toString().allReplace({ "-": "/" }),
      };
      fireReportTotal(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
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
      // a.download = this.fileNameExcel + '_THEO-TRANG' + '.xls'
      const fieldsExcel = this.options.find(
        (item) => item.value === this.selectedOption
      ).text;
      a.download = `${fieldsExcel.toUpperCase()}_${this.from}_${
        this.to
      }_THEO-TRANG.xls`;
      a.click();
    },
    getDataTable(from, to, option) {
      let body = {
        DateType: "FromDateToDate",
        FromDate: this.from.toString().allReplace({ "-": "/" }),
        ToDate: this.to.toString().allReplace({ "-": "/" }),
        UserIDCurent: this.userID,
      };

      if (option == "Disconnected") {
        lightAPI
          .DisconnectLight(body)
          .then((val) => {
            this.items = val.status ? val.data : [];
            if (this.items && this.items.length > 0) {
              this.items = this.convertDataTableDisconnected(this.items);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (option == "Moved") {
        lightAPI
          .MovedLight(body)
          .then((val) => {
            this.items = val.status ? val.data : [];
            if (this.items && this.items.length > 0) {
              this.items = this.convertDataTableMoved(this.items);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (option == "LampError") {
        lightAPI
          .LampErrLight(body)
          .then((val) => {
            this.items = val.status ? val.data : [];
            if (this.items && this.items.length > 0) {
              this.items = this.convertDataTableLampError(this.items);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    convertDataTableDisconnected(data) {
      let result = [];
      data.forEach((cabinet) => {
        console.log(cabinet);
        cabinet.Lamps.forEach((lamp, index) => {
          let row = {};
          // if (index === 0) {
          //   row.CabinetInfo = [
          //     cabinet.Name ?? null,
          //     cabinet.Address ?? null,
          //     cabinet.LastTimeError ?? null,
          //     cabinet.TimeError ?? null,
          //     cabinet.CountTimeError ?? null,
          //     cabinet.SumTimeError ?? null,
          //   ]
          // }
          row.CabinetInfo = [
            cabinet.Name ?? null,
            cabinet.Address ?? null,
            cabinet.LastTimeError ?? null,
            cabinet.TimeError ?? null,
            cabinet.CountTimeError ?? null,
            cabinet.SumTimeError ?? null,
          ];
          row.CabinetID = cabinet.CabinetID;
          row.Lamp = lamp.Name;
          row.rowspan = cabinet.Lamps.length;
          row.LastTimeErrorLamp = lamp.LastTimeError;
          row.TimeError = lamp.TimeError;
          row.CountTimeError = lamp.CountTimeError;
          row.SumTimeError = lamp.SumTimeError;
          row.AddressLamp = lamp.Address;
          result.push(row);
        });
      });

      //clone-exam-page
      // let a = { ...result[0] }
      // a.CabinetID = 'C002'
      // let b = { ...result[1] }
      // b.CabinetID = 'C002'
      // let c = { ...result[2] }
      // c.CabinetID = 'C002'
      // result.push(a)
      // result.push(b)
      // result.push(c)

      return result;
    },
    convertDataTableMoved(data) {
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
    convertDataTableLampError(data) {
      let result = [];
      data.forEach((cabinet) => {
        cabinet.Lamps.forEach((lamp, index) => {
          let row = {};
          // if (index === 0) {
          //   row.CabinetInfo = [cabinet.Name ?? null, cabinet.Address ?? null]
          // }
          row.CabinetInfo = [cabinet.Name ?? null, cabinet.Address ?? null];
          row.CabinetID = cabinet.CabinetID;
          row.Lamp = lamp.Name;
          row.rowspan = cabinet.Lamps.length;
          row.TimeError = lamp.TimeError;
          row.CountTimeError = lamp.CountTimeError;
          row.AddressLamp = lamp.Address;
          row.ConnectTypeName = lamp.ConnectTypeName;
          row.PowerTypeName = lamp.PowerTypeName;
          result.push(row);
        });
      });
      return result;
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ReportDetailLights");
    // this.getDataTable()
    await this.getData();
  },
  // watch: {
  //   items() {
  //     this.getColumn('ReportFires')
  //   },
  // },

  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldsDetail: function () {
      return handling.mergeTableAndData(
        this.objectKeyModal,
        this.listColumnShow
      );
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
};
</script>
