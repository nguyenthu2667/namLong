<template>
  <div v-if="itemsTable">
    <b-card>
      <custom-table
        :data-table="itemsTable"
        :field-table="fields"
        :column-show="listColumnShow"
        :access-write="objectData.accessWrite"
        :select-mode="selectMode"
        @row-dblclicked="showChartDetail"
      ></custom-table>
    </b-card>
    <b-modal
      :id="`modal-detail-${data.CabinetID}`"
      ref="modal-detail"
      @hidden="resetChartDetail"
      hide-header
      v-if="dataForm"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <water-way-cabinet-popup
        :data-parent="data"
        :objectData="objectData"
      ></water-way-cabinet-popup>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import RadialChartApexSemi from "@/components/Charts/RadialChartApexSemi";
import systemAPI from "@/api/modules/systemAPI";
import waterwayAPI from "@/api/modules/waterwayAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import WaterwayCabinetPopup from "@/views/app/map/popup-modals/WaterwayCabinet";
import CustomTables from "./CustomTables";

export default {
  components: {
    "radial-chart-apex-semi": RadialChartApexSemi,
    "area-chart-apex": AreaChartApex,
    "water-way-cabinet-popup": WaterwayCabinetPopup,
    "custom-table": CustomTables,
  },
  props: ["itemsTable", "objectData"],
  watch: {
    dataChart() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 200);
    },
  },
  data() {
    return {
      data: null,

      objectKey: null,
      items: null,
      listColumnShow: null,
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      titleForm: null,
      dataForm: null,
      typeLoadData: "Week",
      dataChart: null,
      dataChartNode: [],
      isActive: false,
      typeLoadChartID: null,
      fieldStation: [
        {
          key: "StationName",
          label: this.$t("dashboards.station-name"),
          tdClass: "text-center",
        },
        {
          key: "DistWarningName",
          label: this.$t("table.title.dist"),
          tdClass: "text-center",
        },
        {
          key: "PinWarningName",
          label: this.$t("table.title.status-pin"),
          tdClass: "text-center",
        },
        {
          key: "StatusName",
          label: this.$t("table.title.status-lamp"),
          tdClass: "text-center",
        },

        {
          key: "IsConnected",
          label: this.$t("table.title.online"),
          tdClass: "text-center",
        },
        {
          key: "UpdateTime",
          label: this.$t("table.title.update-time"),
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      totalRows: 0,
      totalRowsDist: 0,
      totalRowsError: 0,
      totalRowsWarning: 0,
      perPage: 10,
      currentPage: 1,
      currentPageDist: 1,
      currentPageWarning: 1,
      currentPageError: 1,
    };
  },
  computed: {
    fields: function () {
      let newFields = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      if (newFields && newFields.length > 0) {
        newFields.forEach((item) => {
          if (
            item.key === "StationMoved" ||
            item.key === "StationError" ||
            item.key === "StationDisconnect" ||
            item.key === "StationLowPin"
          ) {
            item.tdClass = "text-right pt-3";
          }
        });
      }
      return newFields;
    },
    dataDistWarning() {
      return this.data.LampProperties.filter((item) => item.DistWarning > 0);
    },
    dataPinWarning() {
      return this.data.LampProperties.filter((item) => item.PinWarning > 0);
    },
    dataStatusLampWarning() {
      return this.data.LampProperties.filter((item) => item.StatusID == 3);
    },
  },
  async created() {
    await this.getColumn("WaterwayMonitor");
    // await this.getDataTable()
    await this.getKeyTable();
  },
  methods: {
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status
            ? val.data.map((item) => {
                if (
                  item.ClName === "StationMoved" ||
                  item.ClName === "StationError" ||
                  item.ClName === "StationDisconnect" ||
                  item.ClName === "StationLowPin" ||
                  item.ClName === "StationTotal"
                ) {
                  return { ...item, custom: "custom" };
                }
                return { ...item };
              })
            : [];
          this.listColumnShow = this.listColumnShow.filter(
            (item) => item.ClName !== "StationTotal"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataTable() {
      waterwayAPI
        .waterWayMonitorList()
        .then((val) => {
          this.items = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      waterwayAPI
        .waterWayMonitorList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    areaChartConvert(data) {
      let seriesArea = [];
      let objArea = {
        name: data.IndicatorName + " (" + data.UnitName + ")",
        data: [],
      };
      let objAreaData = data.ChartDetailList;
      if (objAreaData && objAreaData.length > 0) {
        for (let k = 0; k < objAreaData.length; k++) {
          objArea.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemDate),
            parseFloat(objAreaData[k].IndicatorValue),
          ]);
        }
      }
      seriesArea.push(objArea);
      return seriesArea;
    },
    resetChartDetail() {
      this.typeLoadData = "Week";
      this.dataForm = null;
      this.titleForm = null;
      this.dataChart = null;
      this.dataChartNode = null;
      this.typeLoadChartID = null;
    },

    showChartDetail(data) {
      this.data = data ? data : null;
      this.typeLoadChartID = data.CabinetID;
      this.dataForm = data;
      this.titleForm = data.StationName.toUpperCase();
      setTimeout(() => {
        this.$bvModal.show(`modal-detail-${data.CabinetID}`);
      }, this.timer);
    },
    convertBitToBoolean(value) {
      return !!value;
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    handleDeviceRangeColor(deviceInfoProperties) {
      return deviceInfoProperties.map((x) => {
        if (x.InfoCode !== "IMG") {
          let filteredCator = this.data.ListIndicator.filter(
            (y) => x.IndicatorCode === y.IndicatorCode
          );
          let formatCator = filteredCator[0].Properties.map((c, index) => {
            let percentRange =
              ((c.ToValue - c.FromValue) /
                (filteredCator[0].Maxvalue +
                  Math.abs(filteredCator[0].MinValue))) *
              100;
            if (index === 0) {
              return {
                ...c,
                colorCM: percentRange,
              };
            }
            return {
              ...c,
              colorCM: percentRange,
              FromValue: null,
            };
          });
          let totalValue =
            Math.abs(filteredCator[0].Maxvalue) +
            Math.abs(filteredCator[0].MinValue);
          if (formatCator && formatCator.length > 0) {
            return {
              ...x,
              arrHandle: formatCator,
              totalValue,
              minValue: filteredCator[0].MinValue,
            };
          } else {
            return {
              ...x,
              arrHandleNull: [
                {
                  Color: "#2993d4",
                  colorCM: 100,
                  valueCustom: filteredCator[0].MinValue,
                },
                {
                  Color: "#2993d4",
                  colorCM: 100,
                  valueCustom: filteredCator[0].Maxvalue,
                },
              ],
              totalValue,
              minValue: filteredCator[0].MinValue,
            };
          }
        } else {
          return {
            ...x,
          };
        }
      });
    },
  },
};
</script>
<style scoped>
.header:hover {
  background-color: rgb(200, 200, 200);
}
.button-wrapper label {
  font-size: 10px;
  padding: 5px 10px;
}

.button-wrapper li {
  height: 26px;
}

.button-wrapper li:first-child {
  margin-left: 0;
}

.button-wrapper li {
  margin-left: 20px;
}
.view-chart-table:hover {
  color: black;
}
.follow-list-station {
  height: 370px;
}

.light-grid-dashboard {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.light-box-left {
  width: 50%;
}

.light-box-right {
  width: 50%;
}

.light-box-left-modal {
  width: 45%;
}

.light-box-right-modal {
  width: 55%;
}

.gap-5 {
  gap: 20px;
}

.gap-4 {
  gap: 16px;
}

.gap-3 {
  gap: 12px;
}
.gap-1 {
  gap: 4px;
}

.light-item-left {
  width: 50%;
}

.light-item-right {
  width: 50%;
}

.h-img-wind {
  height: 265px;
}
@media only screen and (max-width: 46.1875em) {
  .light-box-left {
    width: 100%;
  }

  .light-box-right {
    width: 100%;
  }

  .h-img-wind {
    height: 180px;
  }

  .light-item-left {
    width: 100%;
  }

  .light-item-right {
    width: 100%;
  }

  .light-grid-dashboard {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
