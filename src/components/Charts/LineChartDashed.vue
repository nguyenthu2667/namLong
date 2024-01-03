<template>
  <div id="chart-area-dashed" v-if="series">
    <vue-apex-chart
      ref="chart-area"
      type="area"
      height="300px"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();

export default {
  name: "AreaChartDashed",
  props: ["areaChart"],
  components: {
    "vue-apex-chart": VueApexCharts
  },

  data() {
    return {
      series: this.areaChart.series,
      chartOptions: {
        chart: {
          type: "line",
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        legend: {
          position: "top",
          horizontalAlign: "center"
        },
        xaxis: {
          type: "datetime",
          labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
              year: "yyyy",
              month: "MM",
              day: "dd",
              hour: "HH:mm",
              minute: "HH:mm"
            }
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true,
            formatter: function(value) {
              return value.toFixed(2);
            }
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yyyy"
          },
          fixed: {
            enabled: false,
            position: "topRight"
          }
        }
      }
    };
  },
  watch: {
    areaChart(to, from) {
      if (to) {
        this.series = this.areaChart.series;
      }
    }
  }
};
</script>
