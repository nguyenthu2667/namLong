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
                  station.ThermalCameraName
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
                  station.ThermalCameraName
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
            ><strong>{{ item.ThermalCameraName.toUpperCase() }}</strong></span
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
      <template v-if="mixedChart">
        <b-col class="mb-4" lg="8">
          <b-card
            class="chart-option-3"
            :header="mixedChartTitle"
            header-bg-variant="primary"
            header-border-variant="primary"
          >
            <mixed-chart-apex :mixed-chart="mixedChart"></mixed-chart-apex>
          </b-card>
        </b-col>
        <b-col lg="4" class="mb-4">
          <template v-if="hisList && hisList.length > 0">
            <b-card>
              <vue-perfect-scrollbar
                style="min-height: 362px"
                class="scroll dashboard-list-with-user"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <list-with-user-item
                  v-for="(ticket, index) in hisList"
                  :data="ticket"
                  :key="index"
                  :id="index"
                />
              </vue-perfect-scrollbar>
            </b-card>
          </template>
          <template v-else>
            <b-card>
              <vue-perfect-scrollbar
                style="min-height: 362px"
                class="scroll dashboard-list-with-user"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <p class="font-italic">{{ $t("cards.no-data") }}</p>
              </vue-perfect-scrollbar>
            </b-card>
          </template>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import MixedChartApex from "@/components/Charts/MixedChartApex";
import ListWithUserItem from "@/components/Listing/ListWithEmployerThermalCamera";
import thermalAPI from "@/api/modules/thermalAPI";
import mapAPI from "@/api/modules/mapAPI";
import moment from "moment";
import "moment-timezone";
import handling from "@/constants/handling";
import Draggable from "vuedraggable";
import RadialProgressCard from "@/components/Cards/RadialProgressCard";

export default {
  components: {
    "mixed-chart-apex": MixedChartApex,
    "list-with-user-item": ListWithUserItem,
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
  },
  data() {
    return {
      timer,
      typeLoadData: "DAY",
      selectedStation: null,
      optionStation: [],
      mixedChart: null,
      mixedChartTitle: "",
      searchText: "",
      hisList: null,
      dataMapNow: null,
      follow: null,
    };
  },
  methods: {
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.optionStation.forEach((val) => {
          if (val.ThermalCameraName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    setTypeLoadData(string) {
      this.typeLoadData = string;
      this.dataLayer = null;
      this.getDataChart(this.selectedStation.SerialNumber, this.typeLoadData);
    },
    changeStation(station) {
      this.selectedStation = station;
      this.dataLayer = null;
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
        .thermalCameraReportTop(body)
        .then((val) => {
          this.report = val.status ? val.data : [];
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
    getDataChart(id, type) {
      let body = {
        SerialNumber: id,
        Type: type,
      };
      thermalAPI
        .thermalCameraDashboardAnalytics(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          let textMixed = this.$t("dashboards.chart-station");
          let seriesMixed = [];
          if (data && data.length > 0) {
            let objMixedLine = {
              name: this.$t("dashboards.thermal-warning"),
              type: "line",
              data: [],
            };
            let objMixedColumn = {
              name: this.$t("dashboards.thermal-total"),
              type: "column",
              data: [],
            };
            data.forEach((val) => {
              let time;
              if (this.typeLoadData === "DAY") {
                time = moment(val.ItemHH, "DD-HH").format(
                  "YYYY/MM/DD HH:mm:ss"
                );
              }
              if (this.typeLoadData === "MONTH") {
                time = moment(val.ItemHH, "MM-DD").format(
                  "YYYY/MM/DD HH:mm:ss"
                );
              }
              if (this.typeLoadData === "YEAR") {
                time = moment(val.ItemHH, "YY-MM").format(
                  "YYYY/MM/DD HH:mm:ss"
                );
              }
              objMixedLine.data.push([
                handling.convertDateToTimeStamp(time),
                parseInt(val.TotalWarning),
              ]);
              objMixedColumn.data.push([
                handling.convertDateToTimeStamp(time),
                parseInt(val.TotalData),
              ]);
            });
            seriesMixed.push(objMixedColumn);
            seriesMixed.push(objMixedLine);
          }
          this.mixedChart = {
            series: seriesMixed,
          };
          this.mixedChartTitle = textMixed;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataDashboard() {
      thermalAPI
        .thermalCameraGet()
        .then((val) => {
          if (val.status) {
            let array = [];
            for (let i = 0; i < val.data.length; i++) {
              array.push(val.data[i]);
            }
            this.optionStation = array;
            if (!this.selectedStation) {
              this.selectedStation = this.optionStation[0];
            }
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
            if (val.DataTypeName === "CameraThermal") {
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
      this.getMapNowByCode("CameraThermal");
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
