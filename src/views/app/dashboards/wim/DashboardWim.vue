<template>
  <div v-if="objectData && dashboardWim">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
      </b-colxx>
    </b-row>
    <b-row>
      <b-col lg="9">
        <b-row>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.Total_Wim_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.Total_Wim }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/tong-luot-can.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.Total_WimOverLoad_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.Total_WimOverLoad }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/tong-luot-qua-tai.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.Total_WimReport_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.Total_WimReport }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/tong-luot-xu-phat.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.TotalDay_Wim_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.TotalDay_Wim }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/luot-can-hom-nay.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.TotalDay_WimOverLoad_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.TotalDay_WimOverLoad }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/qua-tai-hom-nay.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col lg="4" class="mb-2">
            <b-card no-body>
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="box_header-top">
                      {{ dashboardWim.TotalDay_WimReport_Description }}
                    </div>
                    <div class="box_header-bottom">
                      {{ dashboardWim.TotalDay_WimReport }}
                    </div>
                  </div>
                  <div>
                    <b-img
                      src="/assets/img/wim-icon/xu-phat-hom-nay.png"
                      fluid
                      style="max-height: 68px"
                    ></b-img>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="3">
        <b-card no-body>
          <div no-body style="height: 215px">
            <div v-if="dataTemperatures">
              <div class="p-3 pt-3">
                <div class="title-temperature">
                  <i style="color: gray" class="fas fa-map-marker"></i>
                  <strong>TP.Biên Hòa, Đồng Nai</strong>
                </div>
                <div
                  class="text-left subtitle-temperature"
                  v-if="new Date().getDay() + 1 !== 1"
                >
                  <i style="color: black" class="fad fa-clock"></i>
                  {{
                    "Thứ " +
                    (new Date().getDay() + 1) +
                    " " +
                    new Date().getHours() +
                    "" +
                    ":" +
                    ("0" + new Date().getMinutes()).slice(-2)
                  }}
                </div>
                <div class="text-right subtitle-temperature" v-else>
                  {{
                    "Chủ nhật" +
                    " " +
                    new Date().getHours() +
                    "" +
                    ":" +
                    ("0" + new Date().getMinutes()).slice(-2)
                  }}
                </div>
                <div class="subtitle-temperature">
                  <i class="fad fa-humidity"></i>
                  <strong
                    >Độ ẩm: {{ dataTemperatures.main.humidity }}
                    <span>%</span></strong
                  >
                </div>
                <div class="subtitle-temperature">
                  <i class="fad fa-wind"></i>
                  <strong
                    >Gió: {{ (dataTemperatures.wind.speed * 3.6).toFixed(2) }}
                    <span>km/h</span></strong
                  >
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                <div>
                  <b-img
                    class="image"
                    :src="srcImage"
                    fluid
                    style="max-height: 80px"
                  ></b-img>
                </div>
                <div class="d-flex">
                  <div class="box_header-bottom-temperature">
                    {{ temperatureBienHoa }}
                  </div>
                  <span style="font-family: 600; font-size: 18px">°C</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="p-3 pt-3">
                <div class="title-temperature">
                  <i style="color: gray" class="fas fa-map-marker"></i>
                  <strong>TP.Biên Hòa, Đồng Nai</strong>
                </div>
                <div
                  class="text-left subtitle-temperature"
                  v-if="new Date().getDay() + 1 !== 1"
                >
                  <i style="color: black" class="fad fa-clock"></i>
                  {{
                    "Thứ " +
                    (new Date().getDay() + 1) +
                    " " +
                    new Date().getHours() +
                    "" +
                    ":" +
                    ("0" + new Date().getMinutes()).slice(-2)
                  }}
                </div>
                <div class="text-right subtitle-temperature" v-else>
                  {{
                    "Chủ nhật" +
                    " " +
                    new Date().getHours() +
                    "" +
                    ":" +
                    ("0" + new Date().getMinutes()).slice(-2)
                  }}
                </div>
                <div class="subtitle-temperature">
                  <i class="fad fa-humidity"></i>
                  <strong>Độ ẩm: 70 <span>%</span></strong>
                </div>
                <div class="subtitle-temperature">
                  <i class="fad fa-wind"></i>
                  <strong>Gió: 13 <span>km/h</span></strong>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                <div>
                  <b-img
                    class="image"
                    :src="`http://openweathermap.org/img/wn/10d@2x.png`"
                    fluid
                    style="max-height: 80px"
                  ></b-img>
                </div>
                <div class="d-flex">
                  <div class="box_header-bottom-temperature">32</div>
                  <span style="font-family: 600; font-size: 18px">°C</span>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="9" class="mt-4">
        <b-card style="height: 430px" class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h4 class="d-inline">{{ $t("tabs.title.analysis-chart") }}</h4>
              </div>
            </div>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelChart"
                :data="chartWim"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" class="mt-4">
        <b-card no-body style="height: 430px">
          <b-calendar
            style="width: 100%"
            locale="vi"
            class="wim-calendar"
            :label-help="''"
            v-model="dayNow"
          ></b-calendar>
          <div class="title-footer p-3 text-center">
            <strong style="color: #918d8d">TRẠM CÂN BIÊN HÒA</strong>
            <div class="text-muted">Copyright by Nam Long Technology</div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
// import { getMenus } from '@/api/modules/systemAPI'
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
// import { wimDashboard, getWeather } from '@/data/modules/wim'
import wimAPI from "@/api/modules/wimAPI";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";

export default {
  components: {
    "multi-area-shadow-chart": MultiAreaShadowChart,
  },
  data() {
    return {
      interval: null,
      apiKeyWeather: `7332304f45b419ee8c65c1d452a83349`,
      showChart: false,
      menuRight: [],
      dashboardWim: [],
      chartWim: [],
      labelChart: null,
      gradient: null,
      gradient2: ["rgba(255, 134, 154, 1)", "rgba(255, 134, 154, 0.25)"],
      gradient3: ["rgba(255, 203, 128, 1)", "rgba(255, 203, 128, 0.25)"],
      selectChartOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChart: [
        {
          label: this.$t("modal.this-week"),
          value: "WEEK",
        },
        {
          label: this.$t("modal.this-month"),
          value: "MONTH",
        },
        {
          label: this.$t("modal.this-year"),
          value: "YEAR",
        },
      ],
      dataTemperatures: null,
      dayNow: moment(new Date()).format("YYYY-MM-DD"),
      srcImage: "",
    };
  },
  async created() {
    await this.getListMenuRight();
    await this.getDataDashboard();
    await this.getTemperature();
    this.interval = setInterval(async () => {
      await this.getDataDashboard();
      await this.getTemperature();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    temperatureBienHoa() {
      if (this.dataTemperatures) {
        const temperature = Math.round(this.dataTemperatures.main?.temp);
        return temperature;
      }
      return 32;
    },
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  methods: {
    changeChartOption(item) {
      this.selectChartOption = item;
      this.showChart = false;
      this.areaCharts = [];
      this.getDataChart();
    },
    convertDataChartMultiAreaShadow(data) {
      //contructor
      let labelDate = [];
      let result = [
        {
          label: this.$t("dashboards.total-weight"),
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          backgroundColor: this.gradient,
          data: [],
        },
        {
          label: this.$t("dashboards.overloads"),
          borderColor: "#ff869a",
          pointBorderColor: "#ff869a",
          pointHoverBackgroundColor: "#ff869a",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ff869a",
          pointBorderColor: "#ff869a",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
        {
          label: this.$t("dashboards.penalize"),
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient3,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(
          item.Odate.split("-")[2] + "-" + item.Odate.split("-")[1]
        );
        for (const key in item) {
          if (key === "Total_Wim") {
            result[0].data.push(item[key]);
          }
          if (key === "Total_WimOverLoad") {
            result[1].data.push(item[key]);
          }
          if (key === "Total_WimReport") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChart = labelDate;
      this.chartWim = result;
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    },
    getDataDashboard() {
      wimAPI
        .wimDashboard()
        .then((val) => {
          this.dashboardWim = val.status ? val.data.Dashboard[0] : [];
          if (val.data.Chart && val.data.Chart.length > 0) {
            this.convertDataChartMultiAreaShadow(val.data.Chart);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTemperature() {
      let body = "Biên hòa";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${body}&appid=${this.apiKeyWeather}&units=metric`;
      fetch(url).then((response) => {
        response
          .json()
          .then((data) => {
            this.dataTemperatures = data ? data : {};
            this.srcImage = this.dataTemperatures
              ? `http://openweathermap.org/img/wn/${this.dataTemperatures.weather[0].icon}@2x.png`
              : "http://openweathermap.org/img/wn/10d@2x.png";
          })
          .catch((error) => console.log(error));
      });
    },
  },
};
</script>
<style>
.b-calendar .b-calendar-nav {
  border: 1px solid #d7d7d7;
}
.b-calendar .b-calendar-inner {
  width: 100% !important;
}
.b-calendar .b-calendar-grid .row {
  height: 40px;
}
.b-calendar output {
  padding: 0.25rem;
  font-size: 90%;
  height: 40px;
  margin: auto;
  padding-top: 10px;
}
</style>
<style scoped>
.box_header-top {
  color: #8d8989;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.box_header-bottom {
  color: hsl(185deg 1% 26%);
  font-size: 32px;
  font-weight: 700;
}

.box_header-bottom-temperature {
  color: hsl(185deg 1% 26%);
  font-size: 38px;
  font-weight: 700;
}

.title-temperature {
  font-size: 17px;
  font-weight: 600;
}

.subtitle-temperature {
  font-size: 14px;
  font-weight: 700;
  color: #70757a;
}
</style>
