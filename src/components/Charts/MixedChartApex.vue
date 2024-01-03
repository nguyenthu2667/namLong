<template>
  <div id="chart-mixed" v-if="series">
    <vue-apex-chart ref="chart-mixed" type="line" height="300px" width="100%" :options="chartOptions"
                    :series="series"></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {ThemeColors} from '@/utils'
const colors = ThemeColors()

export default {
  props: ['mixedChart', 'maxRange'],
  name: "MixedChartApex",
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data () {
    return {
      series: this.mixedChart.series,
      chartOptions: {
        chart: {
          type: 'line',
          toolbar: {
            show: false
          },
          stacked: false,
        },
        colors: [colors.themeColor2, colors.primaryColor],
        markers: {
          size: 3,
          strokeWidth: 0,
          hover: {
            size: 6
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'center'
            },
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [0, 3],
          curve: 'smooth',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false,
            datetimeFormatter: {
              year: 'MM/yyyy',
              month: 'MM',
              day: 'dd',
              hour: 'HH:mm',
              minute: 'HH:mm'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          min: 0,
          max: this.maxRange,
          tickAmount: 5,
          labels: {
            show: true,
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yyyy",
          },
          fixed: {
            enabled: false,
            position: 'topRight'
          },
        },
      },
    }
  },
  watch: {
    // 'maxRange'(to, from) {
    //   if (!to) {
    //     this.chartOptions.yAxis.max = null
    //   }
    // },
    'mixedChart'(to, from){
      if (to){
        this.series = this.mixedChart.series
      }
    }
  },
}
</script>

<style scoped>
#card-loading-chart {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
