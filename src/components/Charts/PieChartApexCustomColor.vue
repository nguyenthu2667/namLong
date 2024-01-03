<template>
  <div id="chart-bar">
    <vue-apex-chart type="pie" :options="chartOptions" :series="series" height="300"></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {ThemeColors} from '@/utils'
const colors = ThemeColors()

export default {
  props: ['pieChart'],
  name: "PieChartApex",
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data () {
    return {
      series: this.pieChart.series,
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        colors: ['#2D6C3C', '#FA7356'],
        labels: this.pieChart.labels,
        // theme: {
        //   mode: 'light',
        //   palette: 'palette7',
        //   // monochrome: {
        //   //   enabled: true,
        //   //   color: colors.themeColor2
        //   // }
        // },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10,
            },
          }
        },
        // dataLabels: {
        //   formatter(val, opts) {
        //     const name = opts.w.globals.labels[opts.seriesIndex]
        //     return [name, val.toFixed(1) + '%']
        //   }
        // },
        legend: {
          show: true,
          position: 'bottom'
        }
      },
    }
  },
  watch: {
    'pieChart'(to, from){
      if (to){
        this.series = to.series
        this.chartOptions.labels = to.labels
      }
    }
  },
}
</script>

<style scoped>

</style>
