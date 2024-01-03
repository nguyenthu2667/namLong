<template>
  <div>
    <b-row>
      <b-colxx md="12" class="mb-4">
        <vue-apex-chart
          ref="chart"
          type="line"
          height="500px"
          width="100%"
          :options="chartOptions"
          :series="series"
        ></vue-apex-chart>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

var lastDate = 0
var data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0
  while (i < count) {
    var x = baseval
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    data.push({
      x,
      y,
    })
    lastDate = baseval
    baseval += TICKINTERVAL
    i++
  }
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
  min: 10,
  max: 90,
})

function getNewSeries(baseval, yrange) {
  var newDate = baseval + TICKINTERVAL
  lastDate = newDate

  for (var i = 0; i < data.length - 10; i++) {
    data[i].x = newDate - XAXISRANGE - TICKINTERVAL
    data[i].y = 0
  }

  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  })
}

function resetData() {
  // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
  data = data.slice(data.length - 10, data.length)
}

export default {
  components: {
    'vue-apex-chart': VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          data: data.slice(),
        },
      ],
      chartOptions: {
        chart: {
          id: 'realtime',
          height: 500,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: XAXISRANGE,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
    }
  },
  mounted() {
    var me = this
    setInterval(function() {
      getNewSeries(lastDate, {
        min: 10,
        max: 90,
      })

      me.$refs.chart.updateSeries([
        {
          data: data,
        },
      ])
    }, 1000)

    // every 60 seconds, we reset the data to prevent memory leaks
    setInterval(function() {
      resetData()

      me.$refs.chart.updateSeries(
        [
          {
            data,
          },
        ],
        false,
        true,
      )
    }, 60000)
  },
  methods: {},
}
</script>
<style></style>
