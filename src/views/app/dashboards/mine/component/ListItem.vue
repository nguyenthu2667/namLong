<template>
  <div>
    <b-card
      no-body
      :id="'modal-detail-' + data.StationID"
      v-b-toggle="`id-${data.StationID}`"
      style="z-index: 1"
    >
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-colxx lg="4" md="12" class="text-left pt-1">
            <p class="list-item-heading mb-1 truncate">
              {{ data.StationName }}
            </p>
          </b-colxx>
          <b-colxx lg="2" md="12" class="text-left pt-1">
            <p class="text-muted mb-1 text-small">
              {{ time }}
            </p>
          </b-colxx>
          <b-colxx lg="6" md="12" class="text-right">
            <template
              v-if="
                data.Indicators &&
                data.Indicators.length > 0 &&
                data.Indicators.filter((x) => parseInt(x.IsWarning) < 0)
                  .length === 0 &&
                data.Indicators.filter((x) => parseInt(x.IsWarning) > 0)
                  .length === 0
              "
            >
              <span>
                <b-badge
                  pill
                  style="font-size: 88%; background-color: green !important"
                >
                  Bình thường
                </b-badge>
              </span>
            </template>
            <template v-else>
              <template
                v-if="
                  data.Indicators &&
                  data.Indicators.length > 0 &&
                  data.Indicators.filter((x) => parseInt(x.IsWarning) < 0)
                    .length > 0
                "
              >
                <span>
                  <b-badge
                    pill
                    style="font-size: 88%; background-color: red !important"
                  >
                    Lỗi cảm biến
                  </b-badge>
                </span>
              </template>
              <template
                v-if="
                  data.Indicators &&
                  data.Indicators.length > 0 &&
                  data.Indicators.filter((x) => parseInt(x.IsWarning) > 0)
                    .length > 0
                "
              >
                <template
                  v-if="
                    data.Indicators &&
                    data.Indicators.length > 0 &&
                    data.Indicators.filter((x) => parseInt(x.IsWarning) === 1)
                      .length > 0
                  "
                >
                  <span>
                    <b-badge
                      pill
                      style="
                        font-size: 88%;
                        background-color: yellow !important;
                        color: black;
                      "
                    >
                      Cảnh báo nhẹ
                    </b-badge>
                  </span>
                </template>
                <template
                  v-if="
                    data.Indicators &&
                    data.Indicators.length > 0 &&
                    data.Indicators.filter((x) => parseInt(x.IsWarning) === 2)
                      .length > 0
                  "
                >
                  <span>
                    <b-badge
                      pill
                      style="font-size: 88%; background-color: red !important"
                    >
                      Cảnh báo nặng
                    </b-badge>
                  </span>
                </template>
              </template>
            </template>
            <template
              v-if="
                Object.keys(data).filter(
                  (x) =>
                    x.toUpperCase().indexOf('PIN') > -1 &&
                    x.toUpperCase().indexOf('CP') > -1
                ).length > 0 &&
                Object.keys(data)
                  .filter(
                    (x) =>
                      x.toUpperCase().indexOf('PIN') > -1 &&
                      x.toUpperCase().indexOf('CP') > -1
                  )
                  .filter((y) => data[y] < 0).length > 0
              "
            >
              <span>
                <b-badge
                  pill
                  style="font-size: 88%; background-color: red !important"
                >
                  Lỗi thiết bị
                </b-badge>
              </span>
            </template>
            <span>
              <b-badge
                pill
                :style="{
                  'background-color':
                    parseInt(data.CUTPOW) === 0
                      ? 'green !important'
                      : 'grey !important',
                }"
                style="font-size: 88%"
              >
                {{
                  parseInt(data.CUTPOW) === 0
                    ? "Đang kết nối"
                    : "Đang ngắt điện"
                }}
              </b-badge>
            </span>
          </b-colxx>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse :id="`id-${data.StationID}`" :visible="true">
      <b-card no-body style="z-index: 0" class="mb-4">
        <b-card-body class="p-0">
          <b-row>
            <b-colxx md="12" class="mt-2">
              <b-tabs content-class="mt-3" fill>
                <b-tab :title="'Tình trạng hoạt động'.toUpperCase()"> </b-tab>
                <b-tab :title="'Sơ đồ hệ thống'.toUpperCase()"> </b-tab>
                <b-tab :title="'Biểu đồ chỉ số đo'.toUpperCase()" active>
                  <b-row>
                    <b-colxx md="12">
                      <div class="small">
                        {{ dataCollection }}
                        <line-chart
                          :data="dataCollection"
                          style="height: 300px"
                        ></line-chart>
                      </div>
                    </b-colxx>
                  </b-row>
                </b-tab>
              </b-tabs>
            </b-colxx>
          </b-row>
        </b-card-body>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import LineChart from "@/components/Charts/AreaShadow";

export default {
  props: ["data", "time"],
  components: {
    "radial-chart-apex-two": RadialChartApexTwo,
    "line-chart": LineChart,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      dataCollection: null,
    };
  },
  watch: {
    data(to, from) {
      if (to) {
        this.fillData(to);
      }
    },
  },
  methods: {
    fillData(data) {
      // let _dataset = []
      // if (data.Indicators && data.Indicators.length > 0) {
      //   data.Indicators.forEach(element => {
      //     let obj
      //   });
      // }

      // this.dataCollection = {
      //   labels: [this.getRandomChartValues(fetchedData), this.getRandomChartValues(fetchedData)],
      //   datasets: [
      //     {
      //       label: "Google Stock",
      //       backgroundColor: "#1A73E8",
      //       data: [this.getRandomChartValues(fetchedData), this.getRandomChartValues(fetchedData)]
      //     },
      //     {
      //       label: "Microsoft Stock",
      //       backgroundColor: "#2b7518",
      //       data: [this.getRandomChartValues(fetchedData), this.getRandomChartValues(fetchedData)]          }
      //   ]
      // };
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>
<style scoped>
.small {
  width: 100%;
  padding: 2rem;
}
.led-red {
  background-color: #f00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}
.led-green {
  background-color: rgb(60, 250, 50);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
</style>
