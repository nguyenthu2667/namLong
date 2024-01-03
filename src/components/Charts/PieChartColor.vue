<template>
  <div id="chart">
    <apexchart
      v-if="isShow"
      type="pie"
      width="100%"
      :height="height ? height : 300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();

export default {
  components: { apexchart: VueApexCharts },
  props: ["data", "height"],
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.chartOptions.series = this.data.series;
      this.chartOptions.labels = this.data.labels;
      // this.chartOptions.colors = this.data.colors
      // this.chartOptions.fill.colors = this.data.colors
      this.isShow = true;
    }, 1000);
  },
  watch: {
    data(to, from) {
      this.isShow = false;
      if (to) {
        this.chartOptions.series = to.series;
        this.chartOptions.labels = to.labels;
        // this.chartOptions.colors = to.colors
        // this.chartOptions.fill.colors = to.colors
      }
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
    },
  },
  data() {
    return {
      isShow: false,
      series: this.data.series,
      chartOptions: {
        chart: {
          type: "pie",
          width: "100%",
          height: "auto",
        },
        // colors: this.data.colors,
        // fill: {
        //   colors: this.data.colors,
        // },
        tooltip: {
          x: {
            show: false,
          },
          y: {
            formatter: function (value) {
              return;
            },
          },
        },
        labels: this.data.labels,
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10,
            },
          },
        },
        legend: {
          show: true,
          position: "bottom",
        },
        responsive: [
          //   {
          //     breakpoint: 480,
          //     options: {
          //       chart: {
          //         width: 200,
          //         height: 200,
          //       },
          //       legend: {
          //         position: 'bottom',
          //       },
          //     },
          //   },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
