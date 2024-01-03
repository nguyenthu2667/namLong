<template>
  <div>
    <b-row>
      <b-col class="text-center" lg="12">
        <h1 class="p-0 m-0">
          <strong>{{ dataModal.StationName.toUpperCase() }}</strong>
        </h1>
      </b-col>
      <b-col lg="12" class="text-center">
        <i>{{ dataModal.StationAddress }}</i>
        <div>
          <b-badge
            pill
            style="
              background-color: orange !important;
              font-size: 90%;
              color: black;
            "
          >
            <i class="fas fa-exclamation-triangle"></i>
            {{ $t("badge.leakage") }}: {{ dataModal.NumberDetected }}/{{
              dataModal.NumberCabinets
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
            {{ $t("badge.disconnect") }}: {{ dataModal.NumberDisconnected }}/{{
              dataModal.NumberCabinets
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
            {{ $t("badge.error-device") }}: {{ dataModal.NumberErrSensor }}/{{
              dataModal.NumberCabinets
            }}
          </b-badge>
        </div>
      </b-col>
      <b-col lg="12">
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="$t('tabs.title.analysis-chart').toUpperCase()" active>
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
                  <p class="text-center font-italic mt-4">
                    {{ $t("cards.no-data") }}
                  </p>
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
                  <p class="text-center font-italic mt-4">
                    {{ $t("cards.no-data") }}
                  </p>
                </template>
                <p class="text-center text-muted font-weight-bold">
                  {{ $t("badge.leakage") }} gas (m³)
                </p>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab
            :title="$t('tabs.title.monitoring-information-list').toUpperCase()"
          >
            <b-row>
              <b-col
                class="mb-2"
                lg="12"
                v-for="(item, index) in dataModal.Details"
                :key="index"
                :id="item.StationID"
              >
                <child-item-list
                  :key="item.StationID"
                  :data="item"
                  :reload-data="handleReload"
                />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import ListGasFoodCourtPopup from "@/views/app/dashboards/gas-food-court/component/ChildItemList.vue";
import gasFoodCourtAPI from "@/api/modules/gasFoodCourtAPI";
import { ThemeColors } from "@/utils";
import AreaShadowChart from "@/components/Charts/AreaShadow";

const colors = ThemeColors();
export default {
  components: {
    "child-item-list": ListGasFoodCourtPopup,
    "area-shadow-chart": AreaShadowChart,
  },
  props: ["dataModal", "accessWrite", "reloadData"],
  created() {
    this.getDataChart();
  },
  watch: {
    data() {
      this.getDataChart();
    },
  },
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
  methods: {
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
        FoodCourtID: this.dataModal.ID,
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

<style scoped></style>
