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
      <b-col xl="6">
        <b-card class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">{{ $t("dashboards.chart-warning") }}</h5>
                <span class="text-muted text-small d-block">
                  {{
                    "(" +
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
                    "(" +
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
import ListWithUserItem from "@/components/Listing/ListWithEmployerThermal";
import thermalAPI from "@/api/modules/thermalAPI";
import mapAPI from "@/api/modules/mapAPI";
import moment from "moment";
import "moment-timezone";
import handling from "@/constants/handling";
import Draggable from "vuedraggable";
import RadialProgressCard from "@/components/Cards/RadialProgressCard";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();

export default {
  components: {
    "list-with-user-item": ListWithUserItem,
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
    "area-shadow-chart": AreaShadowChart,
  },
  data() {
    return {
      timer,
      typeLoadData: "DAY",
      selectedStation: null,
      optionStation: [],
      searchText: "",
      hisList: null,
      dataMapNow: null,
      follow: null,
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
      showChart: false,
    };
  },
  methods: {
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.optionStation.forEach((val) => {
          if (val.KioskCameraName.search(regex) !== -1) {
            array.push(val);
          }
        });
        console.log(array);
        return array;
      } else {
        return [];
      }
    },
    setTypeLoadData(string) {
      this.typeLoadData = string;
      this.dataLayer = null;
      this.showChart = false;
      this.getDataChart(this.selectedStation.SerialNumber, this.typeLoadData);
    },
    changeStation(station) {
      this.selectedStation = station;
      this.dataLayer = null;
      this.showChart = false;
      this.getDataChart(this.selectedStation.SerialNumber, this.typeLoadData);
      this.getHistory(this.selectedStation.SerialNumber);
      this.follow = this.dataMapNow.filter(
        (x) => x.SerialNumber === this.selectedStation.SerialNumber
      );
    },
    getHistory(series) {
      let body = {
        SerialNumber: series,
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
            switch (type) {
              case "DAY":
                newDataLabel.push(val.ItemHH.split("-")[1] + ":00");
                break;
              case "MONTH":
                newDataLabel.push(
                  val.ItemHH.split("-")[1] + "/" + val.ItemHH.split("-")[0]
                );
                break;
              case "YEAR":
                newDataLabel.push(
                  val.ItemHH.split("-")[1] + "/20" + val.ItemHH.split("-")[0]
                );
                break;
            }
            newDataTotal.push(val.TotalData);
            newDataWarning.push(val.TotalWarning);
          });
          setTimeout(() => {
            this.areaChartData.labels = newDataLabel;
            this.areaChartData.datasets[0].data = newDataWarning;
            this.conversionChartData.labels = newDataLabel;
            this.conversionChartData.datasets[0].data = newDataTotal;
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
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataDashboard() {
      thermalAPI
        .thermalKioskGet()
        .then((val) => {
          if (val.status) {
            let result = handling.convertDataBitToBoolean(val.data);
            let array = [];
            for (let i = 0; i < result.length; i++) {
              if (result[i].IsActive) {
                array.push(result[i]);
              }
            }
            this.optionStation = array;
            if (!this.selectedStation) {
              this.selectedStation = this.optionStation[0];
            }
            this.areaChartData.datasets[0].data = [];
            this.conversionChartData.datasets[0].data = [];
            this.getDataChart(
              this.selectedStation.SerialNumber,
              this.typeLoadData
            );
            this.getHistory(this.selectedStation.SerialNumber);
            setTimeout(() => {
              if (this.dataMapNow) {
                this.follow = this.dataMapNow.filter(
                  (x) => x.SerialNumber === this.selectedStation.SerialNumber
                );
              }
            }, 200);
          } else {
            this.optionStation = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    timerLoadDashboard(time) {
      if (this.selectedStation) {
        this.getHistory(this.selectedStation.SerialNumber);
      }
      this.getMapNowByCode("Kiosk");
      this.getDataDashboard();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.timerLoadDashboard(this.timer * 20);
  },
};
</script>
<style scoped>
.list-item-station-option {
  max-height: 115px;
  padding-right: 0;
  margin-right: 0;
}

.item-station-option {
  text-transform: capitalize;
}

#search-input {
  height: 2rem;
}

.none-click {
  pointer-events: none;
}

.chart-option-3 .card-header {
  padding-top: 0.75rem;
  font-size: 16px;
}
.chart-option-3 .card-body {
  height: 370px;
}
</style>
