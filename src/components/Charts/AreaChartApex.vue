<template>
  <div id="chart-area" v-if="series">
    <vue-apex-chart
      ref="chart-area"
      type="area"
      height="300px"
      :width="width || `100%`"
      :options="chartOptions"
      :series="series"
    ></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { ThemeColors } from '@/utils'
const colors = ThemeColors()

export default {
  props: ['areaChart', 'width'],
  name: 'AreaChartApex',
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data() {
    return {
      series: this.areaChart.series ?? null,
      chartOptions: {
        chart: {
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        colors: [colors.themeColor2],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
        },
        xaxis: {
          type: 'datetime',
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
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
          },
        },
        tooltip: {
          x: {
            format: 'dd/MM/yyyy',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
          },
        },
      },
    }
  },
  watch: {
    areaChart(to, from) {
      if (to) {
        this.series = this.areaChart.series
      }
    },
  },
}
</script>

<style scoped></style>
