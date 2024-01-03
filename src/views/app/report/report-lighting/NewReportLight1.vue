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
            <b-colxx lg="3">
              <b-form-group :label="'Xem theo:'">
                <b-form-select
                  v-model="selectedOption"
                  :options="options"
                  size="sm"
                  @change="changeOption()"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" class="mb-4">
              <custom-table
                :data-table="itemsCollapse"
                :field-table="fields"
                :column-show="listColumnShow"
                :access-write="objectData.accessWrite"
                :select-mode="selectMode"
                @row-clicked="rowClicked"
              ></custom-table>
            </b-colxx>
          </b-row>
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
      selectedOption: "Total",
      options: [
        {
          text: this.$t("select.total"),
          value: "Total",
        },
        {
          text: this.$t("detail"),
          value: "Details",
        },
      ],
      idClick: null,
      dataModal: null,
      objectKeyModal: null,
      isCollapse: false,
      itemsCollapse: [],
    };
  },
  methods: {
    rowClicked(data) {
      data.isParentCollapse = !data.isParentCollapse;
      let id = data.ID;
      if (data.isParentCollapse) {
        this.items.forEach((e) => {
          if (e.ParentID == id) {
            e.isCollapse = true;
            e.isParentCollapse = false;
            // chil
            this.items.forEach((c) => {
              if (c.ParentID == e.ID) {
                c.isCollapse = true;
                c.isParentCollapse = false;

                // children
                this.items.forEach((d) => {
                  if (d.ParentID == c.ID) {
                    d.isCollapse = true;
                    d.isParentCollapse = false;
                    // children
                    this.items.forEach((h) => {
                      if (h.ParentID == d.ID) {
                        h.isCollapse = true;
                      }
                    });
                  }
                });
              }
            });
          }
        });
        this.itemsCollapse = this.items.filter((e) => e.isCollapse === false);
      } else {
        this.items.forEach((e) => {
          if (e.ParentID == id) {
            e.isCollapse = false;

            // chil
            this.items.forEach((c) => {
              if (c.ParentID == e.ID) {
                c.isCollapse = false;
                // children
                this.items.forEach((d) => {
                  if (d.ParentID == c.ID) {
                    d.isCollapse = false;
                    // children5
                    this.items.forEach((h) => {
                      if (h.ParentID == d.ID) {
                        h.isCollapse = false;
                      }
                    });
                  }
                });
              }
            });
            //
          }
        });
        this.itemsCollapse = this.items.filter((e) => e.isCollapse === false);
      }
    },
    resetModal() {
      this.dataModal = null;
    },
    convertKeyTableData(array, ParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != ParentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          ParentID: item["ParentID"],
          LocationName: item["LocationName"],
          LampError: item["LampError"],
          LampDisconnect: item["LampDisconnect"],
          LampLowPin: item["LampLowPin"],
          LampMoved: item["LampMoved"],
          LampOff: item["LampOff"],
          LampOn: item["LampOn"],
          LampOpen: item["LampOpen"],
          LampTotal: item["LampTotal"],
          Key: i,
          isCollapse: false,
          isParentCollapse: false,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    getData() {
      this.selectedOption === "Total"
        ? lightAPI
            .reportLightCurrentTotals()
            .then((val) => {
              let array = val.status ? val.data : [];
              if (array.length > 0) {
                let arrTable = [];
                this.convertKeyTableData(array, "0", arrTable, 0);
                this.items = arrTable;
              } else {
                this.items = [];
              }
              this.itemsCollapse = this.items.map((item) => item);
              this.objectKey =
                val.status && val.data.length > 0
                  ? Object.keys(val.data[0])
                  : [];
            })
            .catch((err) => {
              console.log(err);
            })
        : lightAPI
            .reportLightCurrentDetails()
            .then((val) => {
              let array = val.status ? val.data : [];
              if (array.length > 0) {
                let arrTable = [];
                this.convertKeyTableData(array, "0", arrTable, 0);
                this.items = arrTable;
              } else {
                this.items = [];
              }
              this.itemsCollapse = this.items.map((item) => item);
              this.objectKey =
                val.status && val.data.length > 0
                  ? Object.keys(val.data[0])
                  : [];
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
    await this.getColumn("ReportCurrentLights");
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
