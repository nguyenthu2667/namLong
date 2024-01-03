<template>
  <div>
    <b-card
      v-b-toggle="`id-${data.ID}`"
      class="list-item"
      no-body
      :id="'modal-detail-' + data.ID"
      @click="handlClick"
    >
      <b-card-body style="padding: 1rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
            <b class="list-item-heading mb-1 truncate">
              {{ data.FoodCourtName }}
            </b>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="text-muted mb-1 text-small">
              {{ data.FoodCourtAddress }}
            </p>
          </b-col>
          <b-col lg="4" md="12" class="text-right pt-0">
            <b-badge
              pill
              style="
                background-color: orange !important;
                font-size: 90%;
                color: black;
              "
            >
              <i class="fas fa-exclamation-triangle"></i>
              {{ $t("badge.leakage") }}: {{ data.NumberDetected }}/{{
                data.NumberCabinets
              }}
            </b-badge>

            <b-badge
              pill
              style="
                background-color: red !important;
                font-size: 90%;
                color: black;
              "
            >
              <i class="fas fa-tools"></i>
              {{ $t("badge.error-device") }}: {{ data.NumberErrSensor }}/{{
                data.NumberCabinets
              }}
            </b-badge>
            <b-badge
              pill
              style="
                background-color: red !important;
                font-size: 90%;
                color: black;
              "
            >
              <i class="fas fa-globe"></i>
              {{ $t("badge.disconnect") }}: {{ data.NumberDisconnected }}/{{
                data.NumberCabinets
              }}
            </b-badge>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse :id="`id-${data.ID}`">
      <b-card style="box-shadow: none !important">
        <b-tabs content-class="mt-3" fill>
          <b-tab
            :title="$t('tabs.title.monitoring-information-list').toUpperCase()"
            active
          >
            <b-row>
              <b-colxx
                xxs="12"
                class="mb-3"
                v-for="(item, index) in data.Details"
                :key="index"
                :id="item.StationID"
              >
                <child-list
                  :key="item.StationID"
                  :data="item"
                  :reload-data="handleReload"
                />
              </b-colxx>
            </b-row>
          </b-tab>
          <b-tab
            :title="$t('tabs.title.analysis-chart').toUpperCase()"
            @click="handleClick"
          >
            <b-row>
              <b-col md="12" class="mb-4">
                <b-dropdown
                  :text="selectChartOption.label"
                  size="xs"
                  variant="outline-secondary"
                  class="float-right float-none-xs mt-2"
                >
                  <b-dropdown-item
                    v-for="(item, index) in optionChart"
                    @click="changeChartOption(item)"
                    :key="index"
                  >
                    {{ item.label }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-col>
              <b-col lg="6">
                <template v-if="showChartUseGas">
                  <area-shadow-chart :data="areaChartUseGas" :height="300" />
                </template>
                <template v-else>
                  <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
                </template>
                <p class="text-center text-muted font-weight-bold">
                  {{ $t("badge.use") }} gas (m³)
                </p>
              </b-col>
              <b-col lg="6">
                <template v-if="showChartDetector">
                  <area-shadow-chart :data="areaChartDetector" :height="300" />
                </template>
                <template v-else>
                  <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
                </template>
                <p class="text-center text-muted font-weight-bold">
                  {{ $t("badge.leakage") }} gas (m³)
                </p>
              </b-col>
              <!-- <b-col md="12" v-if="isShow">
                <apex-column-chart-two
                  :data="dataChart"
                  :colors="['#F44336', '#32CD32']"
                />
              </b-col>
              <b-col md="12" v-else>
                Loading...
              </b-col> -->
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import ChildItemList from "./ChildItemList";
import ColumnChartApexTwo from "@/components/Charts/ColumnChartApexTwo";
import gasFoodCourtAPI from "@/api/modules/gasFoodCourtAPI";
import { ThemeColors } from "@/utils";
import AreaShadowChart from "@/components/Charts/AreaShadow";

const colors = ThemeColors();

export default {
  components: {
    "child-list": ChildItemList,
    "apex-column-chart-two": ColumnChartApexTwo,
    "area-shadow-chart": AreaShadowChart,
  },
  props: ["data", "reload-data"],

  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      dataChart: null,
      selectChartOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChart: [
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
      showChartUseGas: false,
      areaUseGasHis: 0,
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
      showChartDetector: false,
      areaDetectorHis: 0,
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
      typeUseGasHis: null,
    };
  },
  created() {
    this.getDataChart();
  },
  watch: {
    data() {
      this.getDataChart();
    },
  },
  methods: {
    handleClick() {
      this.showChartUseGas = false;
      this.showChartDetector = false;
      setTimeout(() => {
        this.showChartUseGas = true;
        this.showChartDetector = true;
      }, 10);
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    handlClick() {
      this.isShow = false;
      this.showChartUseGas = false;
      this.showChartDetector = false;
      setTimeout(() => {
        this.isShow = true;
        this.showChartUseGas = true;
        this.showChartDetector = true;
      }, 50);
    },
    changeChartOption(item) {
      this.selectChartOption = item;
      if (this.selectChartOption.value !== this.typeUseGasHis) {
        this.showChartUseGas = false;
        this.showChartDetector = false;
      }
      this.areaChartUseGas.labels = [];
      this.areaChartUseGas.datasets[0].data = [];
      this.areaChartDetector.labels = [];
      this.areaChartDetector.datasets[0].data = [];
      this.getDataChart();
    },
    getDataChart() {
      let body = {
        Type: this.selectChartOption.value,
        FoodCourtID: this.data.ID,
      };
      gasFoodCourtAPI
        .getDataChartByStation(body)
        .then((val) => {
          this.dataChart = val.status ? val.data : [];
          let newDataLabel = [];
          let newDataEndGas = [];
          let newDataLabelDetector = [];
          let newDataDetector = [];
          this.dataChart.forEach((val) => {
            newDataLabel.push(val.ItemHH);
            newDataEndGas.push(val.UsedValues);
            newDataLabelDetector.push(val.ItemHH);
            newDataDetector.push(val.DetectedValues);
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
            //
            if (this.areaChartDetector.labels.length === 0) {
              this.areaChartDetector.labels = newDataLabelDetector;
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
              this.typeUseGasHis = body.Type;
              this.showChartUseGas = true;
              this.showChartDetector = true;
            }, 500);
          }, 200);
        })
        .catch((err) => console.log(err));
    },
    handleReload() {
      this.reloadData();
    },
  },
};
</script>
<style scoped>
.list-item:hover {
  cursor: pointer;
  background: #c7c2c2;
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
.led-green {
  background-color: rgb(60, 250, 50);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
</style>
