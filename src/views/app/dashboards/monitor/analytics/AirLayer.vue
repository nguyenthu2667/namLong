<!--suppress ALL -->
<template>
  <div>
    <template v-if="dataLayer && dataLayer.dataList.length > 0">
      <b-row class="pr-1">
        <b-col md="12">
          <div class="icon-cards-row">
            <glide-component :settings="glideIconsOption">
              <template v-for="(slide, index) in dataLayer.dataList">
                <template v-if="slide.ChartDetailList.length > 1">
                  <icon-card
                    :key="index"
                    :title="slide.IndicatorName"
                    icon="iconsminds-clock"
                    :value="
                      slide.ChartDetailList[slide.ChartDetailList.length - 1]
                        .IndicatorValue
                    "
                    :unit="slide.UnitName"
                    :sub="
                      (
                        parseFloat(
                          slide.ChartDetailList[
                            slide.ChartDetailList.length - 1
                          ].IndicatorValue
                        ) -
                        parseFloat(
                          slide.ChartDetailList[
                            slide.ChartDetailList.length - 2
                          ].IndicatorValue
                        )
                      ).toFixed(2)
                    "
                  />
                </template>
                <template v-else>
                  <icon-card
                    :key="index"
                    :title="slide.IndicatorName"
                    icon="iconsminds-clock"
                    :value="
                      slide.ChartDetailList[slide.ChartDetailList.length - 1]
                        .IndicatorValue
                    "
                    :unit="slide.UnitName"
                    :sub="
                      (
                        parseFloat(
                          slide.ChartDetailList[
                            slide.ChartDetailList.length - 1
                          ].IndicatorValue
                        ) - 0
                      ).toFixed(2)
                    "
                  />
                </template>
              </template>
            </glide-component>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <template v-if="barChart">
          <b-col class="mb-4" lg="3">
            <b-card
              class="chart-option-1"
              :header="barChartTitle"
              header-bg-variant="primary"
              header-border-variant="primary"
            >
              <bar-chart-apex :bar-chart="barChart"></bar-chart-apex>
            </b-card>
          </b-col>
        </template>
        <b-col class="mb-4" lg="6" v-if="dataLayer">
          <b-card class="chart-option-map">
            <b-card-header
              ><b-link
                @click="flyToPoint(dataLayer.station)"
                style="color: white; text-decoration-line: underline"
                >{{ $t("dashboards.location") }}</b-link
              ></b-card-header
            >
            <div class="map-control">
              <location-component
                ref="formMapTree"
                :lat-item="dataLayer.station.StationLat"
                :lng-item="dataLayer.station.StationLong"
                :type-item="'air'"
              ></location-component>
            </div>
          </b-card>
        </b-col>
        <template v-if="radialChart && radialChartTwo">
          <b-col class="mb-4" lg="3">
            <b-card
              class="chart-option-2 mb-4"
              :header="radialChartTitle"
              header-bg-variant="primary"
              header-border-variant="primary"
            >
              <radial-chart-apex
                :radial-chart="radialChart"
              ></radial-chart-apex>
            </b-card>
            <b-card
              class="chart-option-2"
              :header="radialChartTwoTitle"
              header-bg-variant="primary"
              header-border-variant="primary"
            >
              <radial-chart-apex
                :radial-chart="radialChartTwo"
              ></radial-chart-apex>
            </b-card>
          </b-col>
        </template>
      </b-row>
      <template v-if="areaChart && mixedChart">
        <b-row>
          <b-col class="mb-4" lg="6">
            <b-card
              class="chart-option-3"
              :header="areaChartTitle"
              header-bg-variant="primary"
              header-border-variant="primary"
            >
              <area-chart-apex
                :area-chart="areaChart"
                :width="`500px`"
              ></area-chart-apex>
            </b-card>
          </b-col>
          <b-col class="mb-4" lg="6">
            <b-card
              class="chart-option-3"
              :header="mixedChartTitle"
              header-bg-variant="primary"
              header-border-variant="primary"
            >
              <mixed-chart-apex
                :mixed-chart="mixedChart"
                :max-range="100"
              ></mixed-chart-apex>
            </b-card>
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <template v-if="areaChart">
          <b-row>
            <b-col class="mb-4" md="12">
              <b-card
                class="chart-option-3"
                :header="areaChartTitle"
                header-bg-variant="primary"
                header-border-variant="primary"
              >
                <area-chart-apex
                  :area-chart="areaChart"
                  :width="`500px`"
                ></area-chart-apex>
              </b-card>
            </b-col>
          </b-row>
        </template>
        <template v-if="mixedChart">
          <b-row>
            <b-col class="mb-4" md="12">
              <b-card
                class="chart-option-3"
                :header="mixedChartTitle"
                header-bg-variant="primary"
                header-border-variant="primary"
              >
                <mixed-chart-apex :mixed-chart="mixedChart"></mixed-chart-apex>
              </b-card>
            </b-col>
          </b-row>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import BarChartApex from "@/components/Charts/BarChartApex";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import MixedChartApex from "@/components/Charts/MixedChartApex";
import RadialChartApex from "@/components/Charts/RadialChartApex";
import GlideComponent from "@//components/Carousel/GlideComponent";
import IconCard from "@/views/app/dashboards/monitor/component/IconCard";
import LocationComponent from "@/components/Map/LocationComponent";

export default {
  props: ["dataLayer"],
  components: {
    "bar-chart-apex": BarChartApex,
    "area-chart-apex": AreaChartApex,
    "mixed-chart-apex": MixedChartApex,
    "radial-chart-apex": RadialChartApex,
    "glide-component": GlideComponent,
    "icon-card": IconCard,
    "location-component": LocationComponent,
  },
  name: "AirLayer",
  data() {
    return {
      barChart: null,
      barChartTitle: "",
      radialChart: null,
      radialChartTitle: "",
      radialChartTwo: null,
      radialChartTwoTitle: "",
      areaChart: null,
      areaChartTitle: "",
      mixedChart: null,
      mixedChartTitle: "",
      glideIconsOption: {
        gap: 6,
        perView: 3.2,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1.2,
          },
          575: {
            perView: 1.2,
          },
          1081: {
            perView: 1.7,
          },
          1600: {
            perView: 2.2,
          },
          1800: {
            perView: 2.7,
          },
        },
        hideNav: true,
        autoplay: 5000,
      },
    };
  },
  watch: {
    dataLayer(to, from) {
      if (to) {
        this.setDataChart(to.dataList);
      }
    },
  },
  methods: {
    flyToPoint(item) {
      this.$refs.formMapTree.flyPoint(item.StationLat, item.StationLong);
    },
    setDataChart(data) {
      let textBar = "";
      let categoriesBar = moment(new Date()).format("HH:mm DD/MM/YYYY");
      let seriesBar = [];
      let textRadial = "";
      let codeRadial = "";
      let unitRadial = "";
      let seriesRadial = [];
      let textRadialTwo = "";
      let codeRadialTwo = "";
      let unitRadialTwo = "";
      let seriesRadialTwo = [];
      let textArea = "";
      let seriesArea = [];
      let textMixed = "";
      let seriesMixed = [];
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].IndicatorCode === "PIN") {
            if (textBar === "") {
              textBar = textBar + data[i].IndicatorName;
            } else {
              textBar = textBar + ", " + data[i].IndicatorName.toLowerCase();
            }
            categoriesBar = [
              handling.convertDateTime(
                data[i].ChartDetailList[data[i].ChartDetailList.length - 1]
                  .ItemDate
              ),
            ];
            let objBar = {
              name: data[i].IndicatorName,
              data: [
                parseFloat(
                  data[i].ChartDetailList[data[i].ChartDetailList.length - 1]
                    .IndicatorValue
                ),
              ],
            };
            seriesBar.push(objBar);
          }
          if (data[i].IndicatorCode === "NL") {
            if (textRadial === "") {
              textRadial = textRadial + data[i].IndicatorName;
            } else {
              textRadial =
                textRadial + ", " + data[i].IndicatorName.toLowerCase();
            }
            codeRadial = data[i].IndicatorCode;
            unitRadial = data[i].UnitName;
            seriesRadial = [
              parseFloat(
                data[i].ChartDetailList[data[i].ChartDetailList.length - 1]
                  .IndicatorValue
              ),
            ];
          }
          if (data[i].IndicatorCode === "PM25") {
            if (textRadialTwo === "") {
              textRadialTwo = textRadialTwo + data[i].IndicatorName;
            } else {
              textRadialTwo =
                textRadialTwo + ", " + data[i].IndicatorName.toLowerCase();
            }
            codeRadialTwo = data[i].IndicatorCode;
            unitRadialTwo = data[i].UnitName;
            seriesRadialTwo = [
              parseFloat(
                data[i].ChartDetailList[data[i].ChartDetailList.length - 1]
                  .IndicatorValue
              ),
            ];
          }
          if (data[i].IndicatorCode === "CO2") {
            if (textArea === "") {
              textArea = textArea + data[i].IndicatorName;
            } else {
              textArea = textArea + ", " + data[i].IndicatorName.toLowerCase();
            }
            let objArea = {
              name: data[i].IndicatorName + " (" + data[i].UnitName + ")",
              data: [],
            };
            let objAreaData = data[i].ChartDetailList;
            if (objAreaData && objAreaData.length > 0) {
              for (let k = 0; k < objAreaData.length; k++) {
                objArea.data.push([
                  handling.convertDateToTimeStamp(objAreaData[k].ItemDate),
                  parseFloat(objAreaData[k].IndicatorValue),
                ]);
              }
            }
            seriesArea.push(objArea);
          }
          if (
            data[i].IndicatorCode === "HMDEN" ||
            data[i].IndicatorCode === "TMPEN"
          ) {
            if (textMixed === "") {
              textMixed = textMixed + data[i].IndicatorName;
            } else {
              textMixed =
                textMixed + ", " + data[i].IndicatorName.toLowerCase();
            }
            let objMixed;
            if (data[i].IndicatorCode === "TMPEN") {
              objMixed = {
                name: data[i].IndicatorName + " (" + data[i].UnitName + ")",
                type: "line",
                data: [],
              };
            }
            if (data[i].IndicatorCode === "HMDEN") {
              objMixed = {
                name: data[i].IndicatorName + " (" + data[i].UnitName + ")",
                type: "column",
                data: [],
              };
            }
            let objMixedData = data[i].ChartDetailList;
            if (objMixedData && objMixedData.length > 0) {
              for (let l = 0; l < objMixedData.length; l++) {
                objMixed.data.push([
                  handling.convertDateToTimeStamp(objMixedData[l].ItemDate),
                  parseFloat(objMixedData[l].IndicatorValue),
                ]);
              }
            }
            seriesMixed.push(objMixed);
          }
        }
      }
      this.barChart = {
        series: seriesBar,
        categories: categoriesBar,
      };
      this.barChartTitle = textBar;
      this.radialChart = {
        series: seriesRadial,
        unit: unitRadial,
        code: codeRadial,
      };
      this.radialChartTitle = textRadial;
      this.radialChartTwo = {
        series: seriesRadialTwo,
        unit: unitRadialTwo,
        code: codeRadialTwo,
      };
      this.radialChartTwoTitle = textRadialTwo;
      this.areaChart = {
        series: seriesArea,
      };
      this.areaChartTitle = textArea;
      this.mixedChart = {
        series: seriesMixed,
      };
      this.mixedChartTitle = textMixed;
    },
  },
};
</script>

<style scoped>
.chart-option-1 .card-header,
.chart-option-2 .card-header,
.chart-option-3 .card-header,
.chart-option-map .card-header {
  padding-top: 0.75rem;
  font-size: 16px;
}
.chart-option-1 .card-body {
  height: 365px;
}
.chart-option-2 .card-body {
  height: 146px;
}
.chart-option-3 .card-body {
  height: 370px;
}
.chart-option-map .card-body {
  padding: 0;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.map-control {
  height: 366px;
}
</style>
