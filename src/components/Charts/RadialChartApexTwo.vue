<template>
  <div v-if="series">
    <vue-apex-chart
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
  props: [
    'data',
    'label',
    'height',
    'fontSize',
    'typeShow',
    'colorName',
    'notShowNaN',
  ],
  name: 'RadialChartApexTwo',
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  created() {
    if (this.data < 0 && this.notShowNaN === undefined) {
      this.chartOptions.plotOptions.radialBar.dataLabels.value.show = false
      this.chartOptions.plotOptions.radialBar.dataLabels.name.color = 'red'
      this.chartOptions.labels = [NaN]
    }
  },
  data() {
    return {
      series: this.data,
      chartOptions: {
        chart: {
          height: this.height,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            dataLabels: {
              name: {
                show: true,
                fontSize: this.typeShow === 1 ? '16px' : '12px',
                fontWeight: 300,
                color: this.colorName ?? this.colorName,
              },
              value: {
                show: this.typeShow === 1 ? false : true,
                fontSize: this.fontSize + 'px',
                fontFamily: undefined,
                fontWeight: 700,
                offsetY: this.fontSize / 2,
                color: 'rgba(0, 143, 251, 0.85)',
                formatter: function (val) {
                  return val
                },
              },
            },
          },
        },
        labels: this.label,
      },
    }
  },
  watch: {
    data(to, from) {
      if (to) {
        this.series = to
      }
    },
    label(to, from) {
      if (to) {
        this.chartOptions.labels = to
      }
    },
  },
}
</script>

<style scoped></style>
