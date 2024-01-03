<template>
  <div style="cursor: pointer">
    <b-row>
      <b-col lg="4">
        <b-card
          class="mb-4"
          :title="$t('dashboards.data-today')"
          style="height: 440px"
        >
          <template v-if="follow && follow.length > 0">
            <pie-chart-apex
              class="mb-3"
              :pie-chart="{
                series: [
                  follow[0].CountTodayData - follow[0].CountTodayWarning,
                  follow[0].CountTodayWarning,
                ],
                labels: [
                  $t('dashboards.thermal-normal-today'),
                  $t('dashboards.thermal-warning-today'),
                ],
              }"
            >
            </pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal-today") }}:
              <strong>{{
                follow[0].CountTodayData - follow[0].CountTodayWarning
              }}</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning-today") }}:
              <strong class="text-danger">{{
                follow[0].CountTodayWarning
              }}</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
          </template>
          <template v-else>
            <pie-chart-apex
              class="mb-3"
              :pie-chart="{
                series: [0, 0],
                labels: [
                  $t('dashboards.thermal-normal-today'),
                  $t('dashboards.thermal-warning-today'),
                ],
              }"
            >
            </pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal-today") }}: <strong>0</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning-today") }}:
              <strong class="text-danger">0</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
          </template>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card
          class="mb-4"
          :title="$t('dashboards.data-total')"
          style="height: 440px"
        >
          <template v-if="follow && follow.length > 0">
            <pie-chart-apex
              class="mb-3"
              :pie-chart="{
                series: [
                  follow[0].CountTotalData - follow[0].CountTotalDataWarning,
                  follow[0].CountTotalDataWarning,
                ],
                labels: [
                  $t('dashboards.thermal-normal'),
                  $t('dashboards.thermal-warning'),
                ],
              }"
            >
            </pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal") }}:
              <strong>{{
                follow[0].CountTotalData - follow[0].CountTotalDataWarning
              }}</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning") }}:
              <strong class="text-danger">{{
                follow[0].CountTotalDataWarning
              }}</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
          </template>
          <template v-else>
            <pie-chart-apex
              class="mb-3"
              :pie-chart="{
                series: [0, 0],
                labels: [
                  $t('dashboards.thermal-normal'),
                  $t('dashboards.thermal-warning'),
                ],
              }"
            >
            </pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal") }}: <strong>0</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning") }}:
              <strong class="text-danger">0</strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
          </template>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="card-custom-map-mini mb-4">
          <div class="border-map-mini">
            <div class="border-size-map-mini top"></div>
            <div class="map-control">
              <!-- v-if="latLng && latLng.length > 0" -->
              <multi-location-component
                :lat-lng="latLng"
                :type-item="'camerathermal'"
              ></multi-location-component>
            </div>
            <template v-if="follow && follow.length > 0">
              <div class="location-total-control mr-2 text-right text-small">
                <span>{{ $t("dashboards.device-total") }}: </span>
                <span class="font-weight-bold mr-1" style="color: dodgerblue">{{
                  follow[0].CountTotalDevice
                }}</span>
                <i
                  class="fad fa-camera-home mr-2"
                  style="color: dodgerblue"
                ></i>
                <span>{{ $t("dashboards.device-connect") }}: </span>
                <span class="font-weight-bold mr-1" style="color: green">{{
                  follow[0].TotalDeviceConnect
                }}</span>
                <i class="fad fa-camera-home mr-2" style="color: green"></i>
                <span>{{ $t("dashboards.device-disconnect") }}: </span>
                <span class="font-weight-bold mr-1" style="color: red">{{
                  follow[0].TotalDeviceDisconnect
                }}</span>
                <i class="fad fa-camera-home" style="color: red"></i>
              </div>
            </template>
            <div class="border-size-map-mini bottom"></div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="8">
        <b-card class="card-custom-big-image mb-4">
          <div class="border-image-big">
            <div class="border-size-image-big top"></div>
            <template v-if="report && report.length > 0">
              <b-alert
                class="mb-0 pt-3"
                show
                style="height: 50px"
                variant="primary"
              >
                <span class="h6"
                  ><strong>{{ report[0].CameraThermalName }}</strong></span
                >
                <span> - {{ $t("map.update-time") }}:</span>
                <span class="h6"
                  ><strong>{{ report[0].DataTime }}</strong></span
                >
              </b-alert>
              <div style="display: flex">
                <div style="height: 505px; width: calc(100% - 100px); order: 1">
                  <b-img
                    id="myImageBig"
                    :src="report[0].OriginalPictureUrl"
                    fluid
                    alt="Responsive image"
                    style="width: 100%"
                    @click="openFullscreen('myImageBig')"
                  ></b-img>
                </div>
                <div
                  style="
                    width: 100px;
                    height: 505px;
                    order: 2;
                    text-align: center;
                    padding: 10px 0;
                  "
                >
                  <vue-perfect-scrollbar
                    style="height: 485px"
                    class="scroll"
                    :settings="{
                      suppressScrollX: true,
                      wheelPropagation: false,
                    }"
                  >
                    <template v-for="(item, index) in report">
                      <template
                        v-if="
                          item.OriginalPictureUrl ===
                          report[0].OriginalPictureUrl
                        "
                      >
                        <template v-if="index === 0">
                          <b-img
                            :key="index"
                            :id="'image_small_' + index"
                            :src="item.FaceUrl"
                            fluid
                            alt="Responsive face"
                            style="
                              width: 100px;
                              height: 100px;
                              margin-top: -0.5rem;
                            "
                          ></b-img>
                        </template>
                        <template v-else>
                          <b-img
                            :key="index"
                            :id="'image_small_' + index"
                            :src="item.FaceUrl"
                            fluid
                            alt="Responsive face"
                            style="width: 100px; height: 100px"
                          ></b-img>
                        </template>
                        <div
                          style="
                            width: calc(100px - 1rem);
                            height: 20px;
                            background-color: rgba(0, 0, 0, 0.1);
                            margin-top: -0.5rem;
                            margin-left: 0.5rem;
                          "
                        >
                          <template v-if="item.IsWarning">
                            <p class="mb-0" style="color: red">
                              <strong>{{ item.Temperature }} &deg;C</strong>
                            </p>
                          </template>
                          <template v-else>
                            <p class="mb-0">
                              <strong>{{ item.Temperature }} &deg;C</strong>
                            </p>
                          </template>
                        </div>
                      </template>
                    </template>
                  </vue-perfect-scrollbar>
                </div>
              </div>
            </template>
            <template v-else>
              <p class="font-italic mt-4 ml-4">{{ $t("cards.no-data") }}</p>
            </template>
            <div class="border-size-image-big bottom"></div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card
          class="card-custom-list-his mb-4"
          :title="$t('dashboards.new-data')"
        >
          <div class="border-list-his">
            <div class="border-size-list-his top"></div>
            <div class="class-list-with-user">
              <vue-perfect-scrollbar
                style="height: 475px"
                class="scroll dashboard-list-with-user"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <template v-if="hisList && hisList.length > 0">
                  <list-with-user-item
                    v-for="(ticket, index) in hisList"
                    :data="ticket"
                    :key="index"
                    :id="index"
                  />
                </template>
                <template v-else>
                  <p class="font-italic">{{ $t("cards.no-data") }}</p>
                </template>
              </vue-perfect-scrollbar>
            </div>
            <div class="border-size-list-his bottom"></div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">{{ $t("dashboards.chart-warning") }}</h5>
                <span class="text-muted text-small d-block">
                  {{
                    $t("dashboards.in-month") +
                    " " +
                    getMonthNow() +
                    " (" +
                    $t("dashboards.unit") +
                    ": " +
                    $t("dashboards.case").toLowerCase() +
                    ")"
                  }}
                </span>
              </div>
            </div>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <area-shadow-chart :data="areaChartData" :height="300" />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">{{ $t("dashboards.chart-total") }}</h5>
                <span class="text-muted text-small d-block">
                  {{
                    $t("dashboards.in-month") +
                    " " +
                    getMonthNow() +
                    " (" +
                    $t("dashboards.unit") +
                    ": " +
                    $t("dashboards.case").toLowerCase() +
                    ")"
                  }}
                </span>
              </div>
            </div>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <area-shadow-chart :data="conversionChartData" :height="300" />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import MultiLocationComponent from "@/components/Map/MultiLocationComponent";
import ListWithUserItem from "@/components/Listing/ListWithEmployerThermalCamera";
import Draggable from "vuedraggable";
import RadialProgressCard from "@/components/Cards/RadialProgressCard";
import thermalAPI from "@/api/modules/thermalAPI";
import PieChartApex from "@/components/Charts/PieChartApexCustomColor";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();

export default {
  components: {
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
    "multi-location-component": MultiLocationComponent,
    "list-with-user-item": ListWithUserItem,
    "pie-chart-apex": PieChartApex,
    "area-shadow-chart": AreaShadowChart,
  },
  data() {
    return {
      timer,
      follow: null,
      report: null,
      hisList: null,
      latLng: null,
      listImageSmall: null,
      areaChartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            //colors.themeColor1
            borderColor: "#FA7356",
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: "#FA7356",
            pointHoverBackgroundColor: "#FA7356",
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: "#FAD9D2",
          },
        ],
      },
      areaHis: 0,
      conversionChartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            //colors.themeColor2
            borderColor: "#2D6C3C",
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: "#2D6C3C",
            pointHoverBackgroundColor: "#2D6C3C",
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: "#CCF0D4",
          },
        ],
      },
      conversionHis: 0,
      typeLoadData: "MONTH",
      count: 0,
      showChart: false,
      dataList: null,
    };
  },
  methods: {
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    getDataChart(id, type) {
      let body = {
        SerialNumber: id,
        Type: type,
      };
      thermalAPI
        .thermalCameraDashboardAnalytics(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          let newDataLabel = [];
          let newDataTotal = [];
          let newDataWarning = [];
          data.forEach((val) => {
            // if ((val.ItemHH.split("-")[0] === handling.getMonth()) && (val.ItemHH.split("-")[1] < handling.getDay())) {
            //   newDataLabel.push(val.ItemHH.split("-")[1])
            //   newDataTotal.push(val.TotalData)
            //   newDataWarning.push(val.TotalWarning)
            // }
            if (val.ItemHH.split("-")[0] === handling.getMonth()) {
              newDataLabel.push(val.ItemHH.split("-")[1]);
              newDataTotal.push(val.TotalData);
              newDataWarning.push(val.TotalWarning);
            }
          });
          setTimeout(() => {
            if (this.areaChartData.labels.length === 0) {
              this.areaChartData.labels = newDataLabel;
            }
            this.areaChartData.datasets[0].data = this.sumArrays(
              this.areaChartData.datasets[0].data,
              newDataWarning
            );
            if (this.conversionChartData.labels.length === 0) {
              this.conversionChartData.labels = newDataLabel;
            }
            this.conversionChartData.datasets[0].data = this.sumArrays(
              this.conversionChartData.datasets[0].data,
              newDataTotal
            );
            this.count += 1;
            if (this.count === this.dataList.length) {
              if (
                this.areaChartData.datasets[0].data[
                  this.areaChartData.datasets[0].data.length - 1
                ] !== this.areaHis ||
                this.conversionChartData.datasets[0].data[
                  this.conversionChartData.datasets[0].data.length - 1
                ] !== this.conversionHis
              ) {
                this.showChart = false;
                this.areaHis =
                  this.areaChartData.datasets[0].data[
                    this.areaChartData.datasets[0].data.length - 1
                  ];
                this.conversionHis =
                  this.conversionChartData.datasets[0].data[
                    this.conversionChartData.datasets[0].data.length - 1
                  ];
              }
              setTimeout(() => {
                this.showChart = true;
              }, 500);
            }
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMonthNow() {
      return handling.getMonth();
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    getData() {
      thermalAPI
        .thermalCameraGet()
        .then((val) => {
          let result = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          let array = result.filter((x) => x.IsActive);
          this.dataList = array;
          let latLngArray = [];
          this.areaChartData.datasets[0].data = [];
          this.conversionChartData.datasets[0].data = [];
          this.count = 0;
          array.forEach((val) => {
            latLngArray.push([parseFloat(val.Lat), parseFloat(val.Long)]);
            this.getDataChart(val.SerialNumber, this.typeLoadData);
          });
          this.latLng = latLngArray;
          // setTimeout(() => {
          //   if (this.count === array.length) {
          //     this.showChart = true
          //   }
          // }, 1500)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFollow() {
      thermalAPI
        .thermalCameraDashboardFollow()
        .then((val) => {
          this.follow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistory() {
      let body = {
        SerialNumber: "%",
      };
      thermalAPI
        .thermalCameraReportTop(body)
        .then((val) => {
          this.report = val.status ? val.data : [];
          this.listImageSmall = this.report.filter(
            (x) => x.OriginalPictureUrl === this.report[0].OriginalPictureUrl
          );
          let array = [];
          this.report.forEach((val) => {
            let obj = {
              FaceUrl: val.FaceUrl,
              DataTime: val.DataTime,
              Temperature: val.Temperature,
              IsWarning: val.IsWarning,
              OriginalPictureUrl: val.OriginalPictureUrl,
              CameraThermalName: val.CameraThermalName,
            };
            array.push(obj);
          });
          this.hisList = array;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    autoReloadData(timer) {
      this.getFollow();
      this.getHistory();
      setTimeout(() => {
        this.autoReloadData(timer);
      }, timer);
    },
  },
  async created() {
    await this.getData();
    await this.autoReloadData(this.timer * 20);
  },
};
</script>

<style scoped type="scss">
.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  border: 5px solid red;
}

.card-custom-big-image .card-body {
  padding: 0;
}

.card-custom-map-mini .card-body {
  padding: 0;
}

.card-custom-list-his .card-body {
  padding: 1.05rem;
}

.card-custom-list-his .card-body .card-title {
  margin-bottom: 0.5rem;
}

.card-custom-small-image .card-body {
  padding: 0.5rem;
}

.border-image-big {
  width: 100%;
  height: 555px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-image-big .border-size-image-big {
  position: absolute;
  width: 100%;
}

.border-image-big img {
  height: 100%;
  padding: 0.5rem;
}

.border-image-big .border-size-image-big:before,
.border-image-big .border-size-image-big:after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  padding: 5px;
}

/*.border-image-big .border-size-image-big.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-image-big .border-size-image-big:before {
  left: 0;
}

.border-image-big .border-size-image-big:after {
  right: 0;
}

.border-image-big .border-size-image-big.top {
  top: 0;
}

.border-image-big .border-size-image-big.bottom {
  bottom: 200px;
}

.border-map-mini {
  width: 100%;
  height: 440px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-map-mini .border-size-map-mini {
  position: absolute;
  width: 100%;
}

.border-map-mini .map-control {
  height: 415px;
  padding: 0.5rem;
}

.border-map-mini .border-size-map-mini:before,
.border-map-mini .border-size-map-mini:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 50px;
  padding: 5px;
}

/*.border-map-mini .border-size-map-mini.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-map-mini .border-size-map-mini:before {
  left: 0;
}

.border-map-mini .border-size-map-mini:after {
  right: 0;
}

.border-map-mini .border-size-map-mini.top {
  top: 0;
}

.border-map-mini .border-size-map-mini.bottom {
  bottom: 50px;
}

.border-list-his {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-list-his .border-size-list-his {
  position: absolute;
  width: 100%;
}

.border-list-his .class-list-with-user {
  padding: 0.5rem;
}

.border-list-his .border-size-list-his:before,
.border-list-his .border-size-list-his:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 200px;
  padding: 5px;
}

/*.border-list-his .border-size-list-his.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-list-his .border-size-list-his:before {
  left: 0;
}

.border-list-his .border-size-list-his:after {
  right: 0;
}

.border-list-his .border-size-list-his.top {
  top: 0;
}

.border-list-his .border-size-list-his.bottom {
  bottom: 200px;
}

.border-table {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-table .border-size-table {
  position: absolute;
  width: 100%;
}

.border-table .class-table-new-data {
  padding: 0.5rem;
  height: 415px;
}

.border-table .border-size-table:before,
.border-table .border-size-table:after {
  content: "";
  position: absolute;
  width: 200px;
  height: 100px;
  padding: 5px;
}

/*.border-table .border-size-table.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-table .border-size-table:before {
  left: 0;
}

.border-table .border-size-table:after {
  right: 0;
}

.border-table .border-size-table.top {
  top: 0;
}

.border-table .border-size-table.bottom {
  bottom: 100px;
}

.led-red {
  color: white;
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

.led-blue {
  color: white;
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}
</style>
