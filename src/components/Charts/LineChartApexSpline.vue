<template>
  <div id="chart-spline" v-if="isShow">
    <vue-apex-chart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'AreaChartSpline',
  props: ['areaChart'],
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  watch: {
    areaChart(to, from) {
      this.isShow = false
      if (to) {
        this.series = this.areaChart.series
        this.chartOptions.xaxis.categories = this.areaChart.categories
      }
      setTimeout(() => {
        this.isShow = true
      }, 100)
    },
  },
  data() {
    return {
      isShow: true,
      series: this.areaChart.series,
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: this.areaChart.categories,
          labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MM',
              day: 'dd',
              hour: 'HH:mm',
              minute: 'HH:mm',
            },
          },
        },
        tooltip: {
          x: {
            format: 'dd/MM/yyyy HH:mm',
          },
        },
      },
    }
  },
}
</script>
