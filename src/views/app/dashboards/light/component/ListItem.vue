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
      v-if="data"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <light-cabinet
        :data-parent="data"
        :dataHistory="data"
        :objectData="objectData"
        :lightOption="lightOption"
        :cabinetOption="cabinetOption"
      ></light-cabinet>
    </b-modal>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import lightAPI from "@/api/modules/lightAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import systemAPI from "@/api/modules/systemAPI";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import LightCabinet from "@/views/app/map/popup-modals/LightCabinet";
import CustomTables from "@/views/app/dashboards/light/component/CustomTables";

export default {
  components: {
    "area-chart-apex": AreaChartApex,
    "custom-carousel-component": BCarouselComponent,
    "light-cabinet": LightCabinet,
    "custom-table": CustomTables,
  },
  props: [
    "objectData",
    "lightOption",
    "cabinetOption",
    "itemsTable",
    "listColumnShow",
    "fields",
  ],
  data() {
    return {
      data: null,
      listImage: null,
      dataImages: null,
      // hisActionID: this.data.ActionID,
      // hisLightID: this.data.LightID,
      optionsSchedulesLamp: [
        { text: this.$t("modal.monday"), value: "T2" },
        { text: this.$t("modal.tuesday"), value: "T3" },
        { text: this.$t("modal.wednesday"), value: "T4" },
        { text: this.$t("modal.thursday"), value: "T5" },
        { text: this.$t("modal.friday"), value: "T6" },
        { text: this.$t("modal.saturday"), value: "T7" },
        { text: this.$t("modal.sunday"), value: "CN" },
      ],
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      titleForm: null,
      dataForm: null,
      typeLoadData: "WEEK",
      dataChart: null,
      dataChartNode: [],
      isActive: this.indexStation === 0 ? true : false,
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
  watch: {
    "data.ActionID"() {
      if (this.data.ActionID === 0 && this.data.LightID !== 0) {
        this.data.ActionID = 0;
        this.data.LightID = 0;
      }
    },
    "data.LightID"() {
      if (this.data.LightID === 0 && this.data.ActionID !== 0) {
        this.data.LightID = 0;
        this.data.ActionID = 0;
      }
    },
  },
  async created() {
    // if (this.data['IsSchedule'] != undefined) {
    //   this.data.IsSchedule = !!this.data.IsSchedule
    // }
    // await this.timerLoadDashboard(this.timer * 240)
  },
  mounted() {
    // this.getImages()
    // this.totalRows = this.data.LampProperties.length
  },
  computed: {
    isStatusCabinet: function () {
      let result = null;
      if (this.data && this.data.DeviceInfoProperties) {
        result = this.data.DeviceInfoProperties.find(
          (x) => x.IndicatorCode === "OPEN"
        );
        return result ? result : null;
      } else {
        return result;
      }
    },
    dataStationError() {
      let result = this.data.LampProperties.filter(
        (item) => item.StatusID == 3
      );
      this.totalRowsError = result.length;
      return result;
    },
    dataStationWarning() {
      let result = this.data.LampProperties.filter(
        (item) => item.PinWarning == 3
      );
      this.totalRowsWarning = result.length;
      return result;
    },
    dataStationDist() {
      let result = this.data.LampProperties.filter(
        (item) => item.DistWarning == 1
      );
      this.totalRowsDist = result.length;
      return result;
    },
  },
  methods: {
    // timerLoadDashboard(time) {
    //   this.data.MonitorInfoProperties = this.handleDeviceRangeColor(
    //     this.data.MonitorInfoProperties,
    //   )
    //   setTimeout(async () => {
    //     await this.timerLoadDashboard(time)
    //   }, time)
    // },
    handleDeviceRangeColor(deviceInfoProperties) {
      return deviceInfoProperties.map((x) => {
        if (x.IndicatorCode !== "IMG") {
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
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
    //module-img
    showWallpaper(list, key) {
      let result = [];
      list.map((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.ImageLink, //img
        };
        result.push(obj);
      });
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });
      this.listImage = result;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.data.CabinetID,
        GeoCode: "SLCabinets",
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    handleReloadData() {
      this.$emit("reload-data");
    },
    handleUpdateDataChange(value) {
      this.$emit("updated-data", value);
    },
    submitControl(data) {
      let body = {
        CabinetID: data.CabinetID,
        LightID: parseInt(data.LightID),
        ActionID: data.ActionID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .mapCabinetActionControl(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.data.LightID = parseInt(data.LightID);
              this.data.ActionID = data.ActionID;
              this.dataHistory = { ...this.data };
              this.handleReloadData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.data.LightID = this.dataHistory.LightID;
              this.data.ActionID = this.dataHistory.ActionID;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.data.LightID = this.dataHistory.LightID;
            this.data.ActionID = this.dataHistory.ActionID;
          }, this.timer);
          console.log(err);
        });
      // this.dataChange = false
      this.handleUpdateDataChange(false);
    },
    cancelSubmitControl(history) {
      this.data.LightID = this.hisLightID;
      this.data.ActionID = this.hisActionID;
      // this.dataChange = false
      this.handleUpdateDataChange(false);
    },
    changeSchedule(id, status) {
      let body = {
        CabinetID: id,
        IsSchedule: handling.convertBooleanToBit(status),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .mapCabinetActionSchedules(body)
        .then((val) => {
          if (val.status) {
            this.handleReloadData();
            setTimeout(() => {
              this.data.IsSchedule = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.data.IsSchedule = !status;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.data.IsSchedule = !status;
          }, this.timer);
          console.log(err);
        });
    },
    returnSchedulesLamp(obj) {
      let arr = [];
      if (obj.CN === 1) {
        arr.push("CN");
      }
      if (obj.T2 === 1) {
        arr.push("T2");
      }
      if (obj.T3 === 1) {
        arr.push("T3");
      }
      if (obj.T4 === 1) {
        arr.push("T4");
      }
      if (obj.T5 === 1) {
        arr.push("T5");
      }
      if (obj.T6 === 1) {
        arr.push("T6");
      }
      if (obj.T7 === 1) {
        arr.push("T7");
      }
      return arr;
    },
    getDataCabinet(id) {
      let body = {
        CabinetID: id,
      };
      lightAPI
        .lightChart(body)
        .then((val) => {
          this.data = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    handleReloadData() {
      this.$emit("get-data-dashboard");
    },
    handleActive() {
      this.$root.$on("bv::collapse::state", (id, state) => {
        this.isActive = state;
      });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataChart(type, station) {
      let body = {
        CabinetID: station.CabinetID,
      };
      lightAPI
        .lightDashboardAnalytics(type, body)
        .then((val) => {
          this.dataChart = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTypeLoadData(type, station) {
      this.typeLoadData = type;
      this.getDataChart(type, station);
    },
    resetChartDetail() {
      this.typeLoadData = "WEEK";
      this.dataForm = null;
      // this.data = null
      this.titleForm = null;
      this.dataChart = null;
      this.dataChartNode = null;
      this.data;
    },
    showChartDetail(data) {
      this.data = data ? data : null;
      this.titleForm = data.StationName.toUpperCase();
      this.getDataChart(this.typeLoadData, this.data);
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

.h-img-wind {
  height: 265px;
}

.light-item-left {
  width: 50%;
}

.light-item-right {
  width: 50%;
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

.led-red {
  background-color: #f00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

/* module-img */
#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
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
