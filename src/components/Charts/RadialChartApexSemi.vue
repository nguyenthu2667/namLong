<template>
  <div v-if="series">
    <vue-apex-chart
      v-if="isShow"
      type="radialBar"
      :height="height"
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
  props: ['data', 'label', 'height', 'fontSize', 'typeShow', 'color', 'unit'],
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data() {
    return {
      isShow: false,
      series: this.data,
      chartOptions: {
        chart: {
          height: this.height,
          type: 'radialBar',
        },
        xaxis: {
          show: true,
          showAlways: true,
          min: 0,
          max: 200,
        },
        yaxis: {
          show: true,
          showAlways: true,
          min: 0,
          max: 200,
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              size: '60%',
            },
            dataLabels: {
              name: {
                show: true,
                fontSize: this.typeShow === 1 ? '16px' : '12px',
                fontWeight: 550,
              },
              value: {
                show: this.typeShow === 1 ? false : true,
                fontSize: this.fontSize + 'px',
                fontWeight: 700,
                offsetY: this.fontSize / 2,
                color: this.color ? this.color : 'rgba(0, 143, 251, 0.85)',
                formatter: function (val) {
                  if (val >= 100) {
                    return val.toFixed(1) + '%'
                  } else {
                    return val.toFixed(2) + '%'
                  }
                },
              },
            },
          },
        },
        labels: this.label,
      },
    }
  },
  created() {
    setTimeout(() => {
      this.isShow = true
    }, 20)
  },
  watch: {
    data(to, from) {
      this.isShow = false
      if (to) {
        this.series = to
      }
      setTimeout(() => {
        this.isShow = true
      }, 50)
    },
    label(to, from) {
      this.isShow = false
      if (to) {
        this.chartOptions.labels = to
      }
      setTimeout(() => {
        this.isShow = true
      }, 50)
    },
  },
}
</script>

<style scoped></style>
