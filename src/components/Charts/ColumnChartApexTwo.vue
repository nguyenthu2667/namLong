<template>
  <div id="chart-bar">
    <vue-apex-chart
      v-if="isShow"
      type="bar"
      height="350px"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></vue-apex-chart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { ThemeColors } from '@/utils'
import moment from 'moment'

const colors = ThemeColors()

export default {
  props: ['data', 'colors'],
  name: 'dataApex',
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data() {
    return {
      isShow: false,
      date: [],
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {},
        fill: {
          opacity: 1,
        },
        colors: this.colors ?? this.colors,
        dataLabels: {
          enabled: false,
          style: {},
        },
        tooltip: {
          x: {
            format: 'dd/MM/yyyy',
          },
          y: {
            formatter: function (val) {
              return +val + ' m³'
            },
          },
        },
      },
    }
  },
  watch: {
    data() {
      this.convertDataChartColumn()
    },
    series() {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 1000)
    },
  },
  created() {
    this.convertDataChartColumn()
  },
  mounted() {
    this.isShow = false
    setTimeout(() => {
      this.isShow = true
    }, 1000)
  },
  methods: {
    convertDataChartColumn() {
      this.date = []
      this.series = []
      if (this.data && this.data.length > 0) {
        let keys = Object.keys(this.data[0])
        keys.forEach((key) => {
          if (key == 'DetectedValues') {
            let obj = {
              key: key,
              name: 'Rò rĩ gas',
              data: [],
            }
            this.series.push(obj)
          }
          if (key == 'UsedValues') {
            let obj = {
              key: key,
              name: 'Gas sử dụng',
              data: [],
            }
            this.series.push(obj)
          }
        })
        this.data.forEach((item) => {
          this.date.push(this.convertDate(item.ItemHH))
          this.series.forEach((obj) => {
            if (obj.key === 'DetectedValues') {
              obj.data.push(item.DetectedValues)
            }
            if (obj.key === 'UsedValues') {
              obj.data.push(item.UsedValues)
            }
          })
        })
      }
      this.chartOptions.xaxis.categories = this.date
    },
    convertDate(string) {
      let date = moment(string, 'YYYY/MM/DD')
      return date.format('DD/MM/YYYY')
    },
  },
}
</script>
