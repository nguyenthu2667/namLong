<template>
  <div style="cursor: pointer">
    <b-row>
      <b-col md="12">
        <b-dropdown
          id="dropdown-form"
          ref="dropdown"
          left
          variant="empty"
          toggle-class="p-0"
          no-caret
        >
          <template slot="button-content">
            <b-button
              variant="outline-primary"
              size="sm"
              class="mb-2"
              v-b-toggle.collapse-header
            >
              <i class="fad fa-cog" style="font-size: 22px"></i>
            </b-button>
          </template>
          <b-dropdown-form>
            <b-form-input
              class="mt-1"
              id="search-input"
              type="search"
              size="sm"
              v-model="searchText"
              :placeholder="$t('panel.search-input-monitor')"
            ></b-form-input>
            <template v-if="searchText && searchText !== ''">
              <template v-if="optionSearch(searchText).length > 0">
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t("panel.total") }}
                  {{ optionSearch(searchText).length }}
                  {{ $t("panel.result") }}
                </p>
              </template>
              <template v-else>
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t("panel.non-data") }}
                </p>
              </template>
            </template>
            <template v-else>
              <p class="mt-3 mb-0 text-muted font-italic text-small">
                {{ $t("panel.total") }} {{ optionStation.length }}
                {{ $t("panel.result") }}
              </p>
            </template>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <vue-perfect-scrollbar
            class="list-item-station-option"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
          >
            <template v-if="searchText && searchText !== ''">
              <b-dropdown-item
                v-for="(station, index) in optionSearch(searchText)"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">{{
                  station.KioskCameraName
                }}</span>
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item
                v-for="(station, index) in optionStation"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">{{
                  station.KioskCameraName
                }}</span>
              </b-dropdown-item>
            </template>
          </vue-perfect-scrollbar>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-form class="mt-3">
            <ul class="button-wrapper float-right">
              <li
                id="day"
                :class="{
                  active: typeLoadData === 'DAY',
                  'none-click': typeLoadData === 'DAY',
                }"
                @click="setTypeLoadData('DAY')"
              >
                <label id="l1">{{ $t("dashboards.day") }}</label>
              </li>
              <li
                id="month"
                :class="{
                  active: typeLoadData === 'MONTH',
                  'none-click': typeLoadData === 'MONTH',
                }"
                @click="setTypeLoadData('MONTH')"
              >
                <label id="l2">{{ $t("dashboards.month") }}</label>
              </li>
              <li
                id="year"
                :class="{
                  active: typeLoadData === 'YEAR',
                  'none-click': typeLoadData === 'YEAR',
                }"
                @click="setTypeLoadData('YEAR')"
              >
                <label id="l3">{{ $t("dashboards.year") }}</label>
              </li>
            </ul>
          </b-dropdown-form>
        </b-dropdown>
        <template v-if="selectedStation" v-for="(item, index) in optionStation">
          <span
            class="ml-2 h4 text-muted"
            v-if="selectedStation.SerialNumber === item.SerialNumber"
            :key="index"
            ><strong>{{ item.KioskCameraName.toUpperCase() }}</strong></span
          >
        </template>
        <div class="separator mb-5"></div>
      </b-col>
      <b-col lg="12">
        <template v-if="follow && follow.length > 0">
          <draggable class="row">
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-total')"
                :percent="follow[0].TotalData"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="blue"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-normal')"
                :percent="follow[0].TotalData - follow[0].TotalWarning"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="green"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-warning')"
                :percent="follow[0].TotalWarning"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="red"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-total-today')"
                :percent="follow[0].TodayData"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="blue"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-normal-today')"
                :percent="follow[0].TodayData - follow[0].TodayWarning"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="green"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-warning-today')"
                :percent="follow[0].TodayWarning"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="red"
              />
            </b-col>
          </draggable>
        </template>
        <template v-else>
          <draggable class="row">
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-total')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="blue"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-normal')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="green"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-warning')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="red"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-total-today')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="blue"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-normal-today')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="green"
              />
            </b-col>
            <b-col xl="4" lg="6" class="mb-4">
              <radial-progress-card
                :title="$t('dashboards.thermal-warning-today')"
                :percent="0"
                :unit="$t('dashboards.case').toLowerCase()"
                color-string="red"
              />
            </b-col>
          </draggable>
        </template>
      </b-col>
      <b-col lg="4" md="6">
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
            ></pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal-today") }}:
              <strong>
                {{ follow[0].CountTodayData - follow[0].CountTodayWarning }}
              </strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning-today") }}:
              <strong class="text-danger">
                {{ follow[0].CountTodayWarning }}
              </strong>
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
            ></pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal-today") }}:
              <strong>0</strong>
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
      <b-col lg="4" md="6">
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
            ></pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal") }}:
              <strong>
                {{ follow[0].CountTotalData - follow[0].CountTotalDataWarning }}
              </strong>
              {{ $t("dashboards.case").toLowerCase() }}
            </p>
            <p>
              - {{ $t("dashboards.thermal-warning") }}:
              <strong class="text-danger">
                {{ follow[0].CountTotalDataWarning }}
              </strong>
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
            ></pie-chart-apex>
            <p>
              - {{ $t("dashboards.thermal-normal") }}:
              <strong>0</strong>
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
      <b-col lg="4" md="12">
        <b-card class="card-custom-map-mini mb-4">
          <div class="border-map-mini">
            <div class="border-size-map-mini top"></div>
            <div class="map-control">
              <!-- v-if="latLng && latLng.length > 0" -->
              <multi-location-component
                :lat-lng="latLng"
                :type-item="'kiosk'"
              ></multi-location-component>
            </div>
            <template v-if="follow && follow.length > 0">
              <div class="location-total-control mr-2 text-right text-small">
                <span>{{ $t("dashboards.device-total") }}:</span>
                <span class="font-weight-bold mr-1" style="color: dodgerblue">
                  {{ follow[0].CountTotalDevice }}
                </span>
                <i
                  class="fad fa-camera-home mr-2"
                  style="color: dodgerblue"
                ></i>
                <span>{{ $t("dashboards.device-connect") }}:</span>
                <span class="font-weight-bold mr-1" style="color: green">
                  {{ follow[0].TotalDeviceConnect }}
                </span>
                <i class="fad fa-camera-home mr-2" style="color: green"></i>
                <span>{{ $t("dashboards.device-disconnect") }}:</span>
                <span class="font-weight-bold mr-1" style="color: red">
                  {{ follow[0].TotalDeviceDisconnect }}
                </span>
                <i class="fad fa-camera-home" style="color: red"></i>
              </div>
            </template>
            <div class="border-size-map-mini bottom"></div>
          </div>
        </b-card>
      </b-col>
      <b-col xl="3" md="6">
        <b-card class="card-thermal-analytics mb-4">
          <template v-if="report && report.length > 0">
            <thermal-employer :data="report[0]"></thermal-employer>
          </template>
          <template v-else>
            <thermal-employer :data="null"></thermal-employer>
          </template>
        </b-card>
      </b-col>
      <b-col xl="5" md="6">
        <template v-if="report && report.length > 0">
          <template v-if="report[0].IsWarning">
            <b-card
              class="card-thermal-analytics mb-4"
              style="background-color: red"
            >
              <div class="div-avatar-thermal text-uppercase font-weight-bolder">
                <template v-if="report[0].DataImage">
                  <b-img
                    id="myImageBig_warning"
                    :src="report[0].DataImage"
                    fluid
                    center
                    alt="img-thermal-camera"
                    style="width: auto; height: 100%"
                    @click="openFullscreen('myImageBig_warning')"
                  ></b-img>
                </template>
                <template v-else>
                  <div class="absolute-default-avatar text-center">
                    <p class="mb-0">
                      <i
                        class="fad fa-user-alt-slash p-3"
                        style="font-size: 40px"
                      ></i>
                    </p>
                    <p class="mb-0" style="font-size: 15px">No avatar</p>
                  </div>
                </template>
              </div>
            </b-card>
          </template>
          <template v-else>
            <b-card
              class="card-thermal-analytics mb-4"
              style="background-color: green"
            >
              <div class="div-avatar-thermal text-uppercase font-weight-bolder">
                <template v-if="report[0].DataImage">
                  <b-img
                    id="myImageBig_normal"
                    :src="report[0].DataImage"
                    fluid
                    center
                    alt="img-thermal-camera"
                    style="width: auto; height: 100%"
                    @click="openFullscreen('myImageBig_normal')"
                  ></b-img>
                </template>
                <template v-else>
                  <div class="absolute-default-avatar text-center">
                    <p class="mb-0">
                      <i
                        class="fad fa-user-alt-slash p-3"
                        style="font-size: 40px"
                      ></i>
                    </p>
                    <p class="mb-0" style="font-size: 15px">No avatar</p>
                  </div>
                </template>
              </div>
            </b-card>
          </template>
        </template>
        <template v-else>
          <b-card
            class="card-thermal-analytics mb-4"
            style="background-color: gray"
          >
            <div class="div-avatar-thermal text-uppercase font-weight-bolder">
              <div class="absolute-default-avatar text-center">
                <p class="mb-0">
                  <i
                    class="fad fa-user-alt-slash p-3"
                    style="font-size: 40px"
                  ></i>
                </p>
                <p class="mb-0" style="font-size: 15px">No avatar</p>
              </div>
            </div>
          </b-card>
        </template>
      </b-col>
      <b-col xl="4">
        <b-card class="mb-4">
          <vue-perfect-scrollbar
            style="min-height: 520px"
            class="scroll dashboard-list-with-user mb-2"
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
        </b-card>
      </b-col>
      <b-col xl="6">
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
      <b-col xl="6">
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
import ListWithUserItem from "@/components/Listing/ListWithEmployerThermal";
import Draggable from "vuedraggable";
import RadialProgressCard from "@/components/Cards/RadialProgressCard";
import ThermalEmployer from "@/components/Form/ThermalEmployer";
import thermalAPI from "@/api/modules/thermalAPI";
import PieChartApex from "@/components/Charts/PieChartApexCustomColor";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();
import mapAPI from "@/api/modules/mapAPI";

export default {
  components: {
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
    "multi-location-component": MultiLocationComponent,
    "list-with-user-item": ListWithUserItem,
    "pie-chart-apex": PieChartApex,
    "area-shadow-chart": AreaShadowChart,
    "thermal-employer": ThermalEmployer,
  },
  name: "DashboardFollow",
  data() {
    return {
      selectedStation: null,
      timer,
      follow: null,
      report: null,
      hisList: null,
      latLng: null,
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
      typeLoadData: "DAY",
      count: 0,
      showChart: false,
      dataList: null,
      // analysis
      searchText: "",
      optionStation: [],
      dataMapNow: null,
    };
  },
  methods: {
    getMapNowByCode(layer) {
      let body = {
        DataCode: layer,
      };
      mapAPI.mapNowByCode(body).then((val) => {
        let result = val.status ? val.data : null;
        let array = [];
        if (result && result.length > 0) {
          result.forEach((val) => {
            if (val.DataTypeName === "Kiosk") {
              array.push(val.DataProperties);
            }
          });
        }
        this.dataMapNow = array[0];
      });
    },
    setTypeLoadData(string) {
      this.typeLoadData = string;
      this.showChart = false;
      this.getDataChart(this.selectedStation.SerialNumber, this.typeLoadData);
    },
    changeStation(station) {
      this.selectedStation = station;
      this.showChart = false;
      this.getDataChart(this.selectedStation.SerialNumber, this.typeLoadData);
      this.getHistory(this.selectedStation.SerialNumber);
      this.follow = this.dataMapNow.filter(
        (x) => x.SerialNumber === this.selectedStation.SerialNumber
      );
    },
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.optionStation.forEach((val) => {
          if (val.KioskCameraName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
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
        .thermalDashboardAnalytics(body)
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
        .thermalKioskGet()
        .then((val) => {
          let result = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          let array = result.filter((x) => x.IsActive);
          this.dataList = array;
          this.optionStation = array;
          if (!this.selectedStation) {
            this.selectedStation = this.optionStation[0];
          }
          let latLngArray = [];
          this.areaChartData.datasets[0].data = [];
          this.conversionChartData.datasets[0].data = [];
          this.count = 0;
          array.forEach((val) => {
            latLngArray.push([parseFloat(val.Lat), parseFloat(val.Long)]);
            this.getDataChart(val.SerialNumber, this.typeLoadData);
          });
          setTimeout(() => {
            console.log(this.dataMapNow);
            if (this.dataMapNow) {
              this.follow = this.dataMapNow.filter(
                (x) => x.SerialNumber === this.selectedStation.SerialNumber
              );
            }
          }, 200);
          this.latLng = latLngArray;
          this.getHistory(this.selectedStation.SerialNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFollow() {
      thermalAPI
        .thermalDashboardFollow()
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
        .thermalReportTop(body)
        .then((val) => {
          this.report = val.status ? val.data : [];
          let array = [];
          this.report.forEach((val) => {
            let obj = {
              DataImage: val.DataImage,
              FaceName: val.FaceName,
              DataTime: val.DataTime,
              DataTemperature: val.DataTemperature,
              IsWarning: val.IsWarning,
              PositionName: val.PositionName,
              Phone: val.Phone,
              Address: val.Address,
              DataType: val.DataType,
              Passport: val.Passport,
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
      this.getMapNowByCode("Kiosk");
      this.getData();
      this.getFollow();
      this.getHistory();
      setTimeout(() => {
        this.autoReloadData(timer);
      }, timer);
    },
  },
  async created() {
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

.card-thermal-analytics .card-header {
  padding-top: 0.75rem;
  font-size: 16px;
}

.card-thermal-analytics .card-body {
  padding: 0.5rem;
  height: 585px;
}

.div-avatar-thermal {
  width: 100%;
  height: 569px;
  position: relative;
  background-color: #d7d7d7;
  padding: 25px 0;
}

.div-avatar-thermal .absolute-default-avatar {
  color: white;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
