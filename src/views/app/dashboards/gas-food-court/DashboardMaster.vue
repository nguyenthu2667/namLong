<template>
  <div style="cursor: pointer">
    <b-row v-if="dataFollow && dataFollow.length > 0">
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-qr-code"
          :title="`${dataFollow[0].Total_Export} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Export_Description"
          :percent="100"
          :progressText="dataFollow[0].Total_Export"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-home"
          :title="`${dataFollow[0].Total_Deploy} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Deploy_Description"
          :percent="
            (dataFollow[0].Total_Deploy * 100) / dataFollow[0].Total_Export
          "
          :progressText="
            dataFollow[0].Total_Deploy + '/' + dataFollow[0].Total_Export
          "
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-box-close"
          :title="`${dataFollow[0].Total_Inventory} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Inventory_Description"
          :percent="
            (dataFollow[0].Total_Inventory * 100) / dataFollow[0].Total_Export
          "
          :progressText="
            dataFollow[0].Total_Inventory + '/' + dataFollow[0].Total_Export
          "
        />
      </b-col>
      <b-col lg="6">
        <b-card class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">{{ $t("dashboards.chart-gas-use") }}</h5>
                <span class="text-muted text-small d-block">
                  {{ "(" + $t("dashboards.unit") + ": " + "m³" + ")" }}
                </span>
              </div>
            </div>
            <b-dropdown
              :text="selectChartUseGas.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs mt-2"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChartUseGas"
                @click="changeChartUseGas(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChartUseGas">
              <area-shadow-chart :data="areaChartUseGas" :height="300" />
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
                <h5 class="d-inline">
                  {{ $t("dashboards.chart-gas-detector") }}
                </h5>
                <span class="text-muted text-small d-block">
                  {{ "(" + $t("dashboards.unit") + ": " + "m³" + ")" }}
                </span>
              </div>
            </div>
            <b-dropdown
              :text="selectChartDetector.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs mt-2"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChartDetector"
                @click="changeChartDetector(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChartDetector">
              <area-shadow-chart :data="areaChartDetector" :height="300" />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col xl="4" class="mb-4">
        <b-card style="height: 414px" :title="$t('cards.deploy-info')">
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_CusUsing_Description }}
              <template
                v-if="dataFollow[0].Total_CusUsing_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_CusUsing_Description,
                      dataFollow[0].ShowAllProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_CusUsing_Description,
                      dataFollow[0].ShowAllProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_CusUsing }}/{{ dataFollow[0].Total_Cus }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_CusUsing / dataFollow[0].Total_Cus) * 100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_Disconnect_Description }}
              <template
                v-if="dataFollow[0].Total_Disconnect_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Disconnect_Description,
                      dataFollow[0].DisconnectProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Disconnect_Description,
                      dataFollow[0].DisconnectProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_Disconnect }}/{{
                  dataFollow[0].Total_Cus
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_Disconnect / dataFollow[0].Total_Cus) * 100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_Detected_Description }}
              <template
                v-if="dataFollow[0].Total_Detected_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Detected_Description,
                      dataFollow[0].DetectedProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Detected_Description,
                      dataFollow[0].DetectedProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_Detected }}/{{ dataFollow[0].Total_Cus }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_Detected / dataFollow[0].Total_Cus) * 100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_ErrSensor_Description }}
              <template
                v-if="dataFollow[0].Total_ErrSensor_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_ErrSensor_Description,
                      dataFollow[0].ErrorSensorProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_ErrSensor_Description,
                      dataFollow[0].ErrorSensorProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_ErrSensor }}/{{
                  dataFollow[0].Total_Cus
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_ErrSensor / dataFollow[0].Total_Cus) * 100
              "
            ></b-progress>
          </div>
        </b-card>
      </b-col>
      <b-col xl="8" class="mb-4">
        <b-card :title="$t('dashboards.history-station')" style="height: 416px">
          <b-row>
            <b-colxx lg="12">
              <b-table
                :responsive="true"
                :sticky-header="true"
                :no-border-collapse="true"
                :bordered="true"
                :hover="true"
                :items="itemsHis"
                :fields="fieldsHis"
                head-variant="light"
                class="text-center text-small mb-0"
                style="max-height: 305px"
              >
                <template v-slot:cell(_updateTime)="slot">
                  <p class="p-0 m-0 text-small">
                    {{ convertDateTime(slot.item.UpdateTime) }}
                  </p>
                </template>
              </b-table>
            </b-colxx>
          </b-row>
        </b-card>
      </b-col>
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>{{ title.toUpperCase() }}</strong>
        </h5>
      </b-col>
      <b-col xl="12">
        <div class="mb-2">
          <b-button
            variant="empty"
            class="pt-0 pl-0 d-inline-block d-md-none"
            v-b-toggle.displayOptions
          >
            <i class="simple-icon-arrow-down align-middle" />
          </b-button>
          <b-collapse id="displayOptions" class="d-md-block">
            <div class="d-block d-md-inline-block pt-1">
              <div
                class="search-sm d-inline-block float-md-left mr-1 align-top"
              >
                <b-input
                  :placeholder="$t('form.customer-name')"
                  v-model="search"
                />
              </div>
            </div>
          </b-collapse>
        </div>
        <div class="separator mb-3" />
      </b-col>
      <template v-if="convertItems && convertItems.length > 0">
        <b-col lg="12" class="mb-4">
          <b-row v-if="displayMode === 'thumb'" key="thumb">
            <b-colxx
              xxs="12"
              class="mb-3"
              v-for="(item, index) in convertItems"
              :key="index"
              :id="item.StationID"
            >
              <list-item
                :key="item.StationID"
                :data="item"
                :reload-data="handleReload"
              />
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx xxs="12">
              <b-pagination
                :total-rows="totalRows"
                v-model="page"
                :per-page="perPage"
                size="sm"
                align="center"
              >
                <template v-slot:next-text>
                  <i class="simple-icon-arrow-right" />
                </template>
                <template v-slot:prev-text>
                  <i class="simple-icon-arrow-left" />
                </template>
                <template v-slot:first-text>
                  <i class="simple-icon-control-start" />
                </template>
                <template v-slot:last-text>
                  <i class="simple-icon-control-end" />
                </template>
              </b-pagination>
            </b-colxx>
          </b-row>
        </b-col>
      </template>
      <template v-else>
        <b-col lg="12" class="mb-4">
          <p class="text-muted text-small font-italic">
            {{ $t("map.no-data") }}
          </p>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import gasFoodCourtAPI from "@/api/modules/gasFoodCourtAPI";
import ListItem from "./component/ListItem";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import { ThemeColors } from "@/utils";
import handling from "@/constants/handling";
import ListGasFoodCourtPopup from "@/views/app/map/popup-modals/ListGasFoodCourtDetail";

const colors = ThemeColors();

export default {
  components: {
    "list-item": ListItem,
    "area-shadow-chart": AreaShadowChart,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "list-gas-food-court-popup": ListGasFoodCourtPopup,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      dataFollow: null,
      displayMode: "thumb",
      layerLoad: "FoodCourt",
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      title: null,
      items: null,
      itemsHis: null,
      filterItems: null,
      convertItems: null,
      dataMapNow: null,
      areaChartDetector: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            //colors.themeColor1
            borderColor: "#FF9500",
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: "#FF9500",
            pointHoverBackgroundColor: "#FF9500",
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: "#FCDCAE",
          },
        ],
      },
      areaDetectorHis: 0,
      typeDetectorHis: null,
      areaChartUseGas: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            //colors.themeColor2
            borderColor: "#FC0000",
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: "#FC0000",
            pointHoverBackgroundColor: "#FC0000",
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
      areaUseGasHis: 0,
      typeUseGasHis: null,
      showChartDetector: false,
      showChartUseGas: false,
      selectChartDetector: null,
      optionChartDetector: [
        {
          label: this.$t("modal.this-week"),
          value: "WEEK",
        },
        {
          label: this.$t("modal.this-month"),
          value: "MONTH",
        },
        {
          label: this.$t("modal.this-year"),
          value: "YEAR",
        },
      ],
      selectChartUseGas: null,
      optionChartUseGas: [
        {
          label: this.$t("modal.this-week"),
          value: "WEEK",
        },
        {
          label: this.$t("modal.this-month"),
          value: "MONTH",
        },
        {
          label: this.$t("modal.this-year"),
          value: "YEAR",
        },
      ],
      fieldsHis: [
        {
          key: "StationName",
          label: this.$t("dashboards.aqua-name"),
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "ContentValue",
          label: this.$t("report.warning"),
          tdClass: "font-weight-bold text-muted",
        },
        {
          key: "_updateTime",
          label: this.$t("dashboards.timer"),
          tdClass: "text-muted",
        },
      ],
    };
  },
  watch: {
    search(to, from) {
      if (this.items.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.items, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              newArr
            );
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.convertItems = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.convertItems = this.paginationData(
            this.page,
            this.perPage,
            this.items
          );
          this.totalRows = this.items.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.convertItems = this.paginationData(
          to,
          this.perPage,
          this.filterItems
        );
        this.totalRows = this.filterItems.length;
      } else {
        this.convertItems = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  methods: {
    handleReload() {
      this.getDataDashboard();
    },
    listHistory() {
      gasFoodCourtAPI
        .historyGasFoodCourt()
        .then((val) => {
          this.itemsHis = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "StationName") {
            if (
              i[j].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
            ) {
              status = true;
            }
          }
        });
        if (status) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    paginationData(page, perPage, array) {
      let newArray = [];
      array.forEach((val, index) => {
        if (page === 1) {
          if (index < perPage) {
            newArray.push(val);
          }
        } else {
          if (index >= perPage * (page - 1) && index < perPage * page) {
            newArray.push(val);
          }
        }
      });
      return newArray;
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    changeChartDetector(items) {
      this.selectChartDetector = items;
      if (this.selectChartDetector.value !== this.typeDetectorHis) {
        this.showChartDetector = false;
      }
      this.areaChartDetector.labels = [];
      this.areaChartDetector.datasets[0].data = [];
      this.getDataChartDetector(this.selectChartDetector.value);
    },
    changeChartUseGas(items) {
      this.selectChartUseGas = items;
      if (this.selectChartUseGas.value !== this.typeUseGasHis) {
        this.showChartUseGas = false;
      }
      this.areaChartUseGas.labels = [];
      this.areaChartUseGas.datasets[0].data = [];
      this.getDataChartUseGas(this.selectChartUseGas.value);
    },
    getDataChartDetector(type) {
      let body = {
        Type: type,
      };
      gasFoodCourtAPI
        .gasFoodCourtChart(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          let newDataLabel = [];
          let newDataDetector = [];
          data.forEach((val) => {
            newDataLabel.push(val.ItemHH.split("-")[1]);
            newDataDetector.push(val.SL_Detector);
          });
          setTimeout(() => {
            if (this.areaChartDetector.labels.length === 0) {
              this.areaChartDetector.labels = newDataLabel;
            }
            this.areaChartDetector.datasets[0].data = this.sumArrays(
              this.areaChartDetector.datasets[0].data,
              newDataDetector
            );
            if (
              this.areaChartDetector.datasets[0].data[
                this.areaChartDetector.datasets[0].data.length - 1
              ] !== this.areaDetectorHis
            ) {
              this.showChartDetector = false;
              this.areaDetectorHis =
                this.areaChartDetector.datasets[0].data[
                  this.areaChartDetector.datasets[0].data.length - 1
                ];
            }
            setTimeout(() => {
              this.typeDetectorHis = type;
              this.showChartDetector = true;
            }, 500);
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataChartUseGas(type) {
      let body = {
        Type: type,
      };
      gasFoodCourtAPI
        .gasFoodCourtChart(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          let newDataLabel = [];
          let newDataEndGas = [];
          data.forEach((val) => {
            newDataLabel.push(val.ItemHH.split("-")[1]);
            newDataEndGas.push(val.SL_GasUse);
          });
          setTimeout(() => {
            if (this.areaChartUseGas.labels.length === 0) {
              this.areaChartUseGas.labels = newDataLabel;
            }
            this.areaChartUseGas.datasets[0].data = this.sumArrays(
              this.areaChartUseGas.datasets[0].data,
              newDataEndGas
            );
            if (
              this.areaChartUseGas.datasets[0].data[
                this.areaChartUseGas.datasets[0].data.length - 1
              ] !== this.areaUseGasHis
            ) {
              this.showChartUseGas = false;
              this.areaUseGasHis =
                this.areaChartUseGas.datasets[0].data[
                  this.areaChartUseGas.datasets[0].data.length - 1
                ];
            }
            setTimeout(() => {
              this.typeUseGasHis = type;
              this.showChartUseGas = true;
            }, 500);
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    listStation(title, array) {
      this.search = "";
      this.items = array;
      this.convertItems =
        array.length > 0
          ? this.paginationData(this.page, this.perPage, array)
          : null;
      this.totalRows = array.length > 0 ? array.length : 0;
      this.title = title;
    },
    getDataDashboard() {
      gasFoodCourtAPI
        .gasFoodCourtDashboard()
        .then((val) => {
          this.dataFollow = val.status ? val.data : [];
          if (this.search.length > 0) {
            let newArr = [];
            this.dataFollow[0].ShowAllProperties.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.StationID === ele.StationID) {
                  newArr.push(item);
                }
              });
              this.convertItems = newArr;
            });
          } else {
            this.listStation(
              this.dataFollow[0].Total_CusUsing_Description,
              this.dataFollow[0].ShowAllProperties
            );
            this.filterItems = null;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
            this.totalRows = this.items.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDashboard(time) {
      this.getDataDashboard();
      this.listHistory();
      if (this.selectChartDetector) {
        this.changeChartDetector(this.selectChartDetector);
      } else {
        this.changeChartDetector(this.optionChartDetector[0]);
      }
      if (this.selectChartUseGas) {
        this.changeChartUseGas(this.selectChartUseGas);
      } else {
        this.changeChartUseGas(this.optionChartUseGas[0]);
      }
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.timerLoadDashboard(this.timer * 120);
  },
};
</script>

<style scoped>
.btn-i-custom:hover {
  color: red;
}
.list-item:hover {
  cursor: pointer;
  background: #c7c2c2;
}
</style>
