<template>
  <div>
    <b-row>
      <b-col lg="12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-muted">
              <strong> Thống kê dữ liệu tiếp nhận yêu cầu vận tải </strong>
            </h5>
          </div>
          <div class="">
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 0 ? `primary` : `outline-primary`"
              @click="changeDate(0)"
            >
              <i class="fas fa-list-alt mr-1"></i> <b>Trong tuần</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 1 ? `primary` : `outline-primary`"
              @click="changeDate(1)"
              ><i class="fas fa-info-square mr-1"></i>
              <b>Trong tháng</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 2 ? `primary` : `outline-primary`"
              @click="changeDate(2)"
            >
              <i class="fas fa-history mr-1"></i>
              <b>Trong năm</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 3 ? `primary` : `outline-primary`"
              @click="changeDate(3)"
            >
              <i class="fas fa-file-alt mr-1"></i>
              <b>Trong khoảng</b>
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo hàng rời</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartHangRoi">
              <multi-area-shadow-chart
                :labelDate="labelChartHangRoi"
                :data="dataChartHangRoi"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>

      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo hàng cont</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartHangCont">
              <multi-area-shadow-chart
                :labelDate="labelChartHangCont"
                :data="dataChartHangCont"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <!-- thoi tiet -->
      <!-- <b-col md="12" lg="3" class="mb-3">
        <h5 class="text-muted">
          <strong>
            {{ $t("dashboards.weather") }}
          </strong>
        </h5>
        <b-card
          style="
            background: linear-gradient(#43afd1, #41b1cd);
            color: white;
            height: 395px;
          "
        >
          <div class="text-center">
            <div class="mb-2 fz-medium">
              {{ getDayWeekYear }}
            </div>
            <div class="mb-2 fz-small">
              {{ getTime }}
            </div>
            <div class="mb-2 fz-small">
              {{ $t("dashboards.city-danang") }}
            </div>
            <div class="mb-2 fz-small">
              <div>
                <b-img
                  class="image"
                  :src="srcImage"
                  fluid
                  style="max-height: 80px"
                ></b-img>
              </div>
            </div>
            <div class="mb-2">
              <div
                class="d-flex justify-content-center box_header-bottom-temperature"
              >
                <div class="">
                  {{ temperatureBienHoa }}
                </div>
                <span class="">°C</span>
              </div>
            </div>
            <div style="height: 2px; background-color: white"></div>
            <div v-if="dataTemperatures">
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <i class="fad fa-humidity mr-2"></i>
                  <strong>
                    {{ $t("dashboards.humidity") }}:
                    {{ dataTemperatures.main.humidity }}
                    <span>%</span></strong
                  >
                </div>
                <div class="">
                  <i class="fad fa-wind mr-1"></i>
                  <strong
                    >{{ $t("dashboards.wind") }}:
                    {{ (dataTemperatures.wind.speed * 3.6).toFixed(2) }}
                    <span>km/h</span></strong
                  >
                </div>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <i class="fad fa-location mr-2"></i>
                  <strong>
                    {{ $t("map.lng") }}:
                    {{ dataTemperatures.coord.lon }}
                  </strong>
                </div>
                <div class="">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <strong
                    >{{ $t("map.lat") }}:
                    {{ dataTemperatures.coord.lat }}
                  </strong>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <i class="fad fa-humidity mr-2"></i>
                  <strong>
                    {{ $t("dashboards.humidity") }}: 61 <span>%</span></strong
                  >
                </div>
                <div class="">
                  <i class="fad fa-wind mr-1"></i>
                  <strong
                    >{{ $t("dashboards.wind") }}: 3.71 <span>km/h</span></strong
                  >
                </div>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <i class="fad fa-location mr-2"></i>
                  <strong> {{ $t("map.lng") }}: 108.2208 </strong>
                </div>
                <div class="">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <strong>{{ $t("map.lat") }}: : 16.0678 </strong>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col> -->
    </b-row>

    <b-row class="mt-3">
      <b-col lg="12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-muted">
              <strong> Thống kê dữ liệu bán hàng </strong>
            </h5>
          </div>

          <div class="">
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 0 ? `primary` : `outline-primary`"
              @click="changeDate(0)"
            >
              <i class="fas fa-list-alt mr-1"></i> <b>Trong tuần</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 1 ? `primary` : `outline-primary`"
              @click="changeDate(1)"
              ><i class="fas fa-info-square mr-1"></i>
              <b>Trong tháng</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 2 ? `primary` : `outline-primary`"
              @click="changeDate(2)"
            >
              <i class="fas fa-history mr-1"></i>
              <b>Trong năm</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 3 ? `primary` : `outline-primary`"
              @click="changeDate(3)"
            >
              <i class="fas fa-file-alt mr-1"></i>
              <b>Trong khoảng</b>
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo doanh thu</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartDoanhThu">
              <multi-area-shadow-chart
                :labelDate="labelChartDoanhThu"
                :data="dataChartDoanhThu"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>

      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo số lượng</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartSoLuong">
              <multi-area-shadow-chart
                :labelDate="labelChartSoLuong"
                :data="dataChartSoLuong"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col lg="12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-muted">
              <strong> Thống kê dữ liệu mặt hàng </strong>
            </h5>
          </div>

          <div class="">
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 0 ? `primary` : `outline-primary`"
              @click="changeDate(0)"
            >
              <i class="fas fa-list-alt mr-1"></i> <b>Trong tuần</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 1 ? `primary` : `outline-primary`"
              @click="changeDate(1)"
              ><i class="fas fa-info-square mr-1"></i>
              <b>Trong tháng</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 2 ? `primary` : `outline-primary`"
              @click="changeDate(2)"
            >
              <i class="fas fa-history mr-1"></i>
              <b>Trong năm</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 3 ? `primary` : `outline-primary`"
              @click="changeDate(3)"
            >
              <i class="fas fa-file-alt mr-1"></i>
              <b>Trong khoảng</b>
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo doanh thu</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartMatHang">
              <multi-area-shadow-chart
                :labelDate="labelChartMatHang"
                :data="dataChartMatHang"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>

      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo số lượng</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartMatHangSoLuong">
              <multi-area-shadow-chart
                :labelDate="labelChartMatHangSoLuong"
                :data="dataChartMatHangSoLuong"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>

      <!-- <b-col lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo số lượng</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartSoLuong">
              <multi-area-shadow-chart
                :labelDate="labelChartSoLuong"
                :data="dataChartSoLuong"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col> -->
    </b-row>

    <b-row class="mt-3">
      <b-col lg="12">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-muted">
              <strong> Thống kê dữ liệu nhân viên </strong>
            </h5>
          </div>

          <div class="">
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 0 ? `primary` : `outline-primary`"
              @click="changeDate(0)"
            >
              <i class="fas fa-list-alt mr-1"></i> <b>Trong tuần</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 1 ? `primary` : `outline-primary`"
              @click="changeDate(1)"
              ><i class="fas fa-info-square mr-1"></i>
              <b>Trong tháng</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 2 ? `primary` : `outline-primary`"
              @click="changeDate(2)"
            >
              <i class="fas fa-history mr-1"></i>
              <b>Trong năm</b>
            </b-button>
            <b-button
              class="mb-1"
              squared
              :variant="tabDate == 3 ? `primary` : `outline-primary`"
              @click="changeDate(3)"
            >
              <i class="fas fa-file-alt mr-1"></i>
              <b>Trong khoảng</b>
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo doanh thu</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartNhanVienDoanhThu">
              <multi-area-shadow-chart
                :labelDate="labelChartNhanVienDoanhThu"
                :data="dataChartNhanVienDoanhThu"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>

      <b-col md="12" lg="6">
        <b-card style="height: 395px; padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Theo số lượng</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartNhanVienSoLuong">
              <multi-area-shadow-chart
                :labelDate="labelChartNhanVienSoLuong"
                :data="dataChartNhanVienSoLuong"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-modal
      v-if="tabDate == 3"
      id="range-time-modal"
      size="sm"
      ok-only
      scrollable
      hide-header
      hide-footer
    >
      <div
        class="d-flex flex-wrap align-items-center"
        style="min-height: 300px"
      >
        <div class="w-100">
          <div>
            <b-form-group label="Từ ngày">
              <b-form-datepicker
                v-model="fromDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </b-form-group>
          </div>
          <div>
            <b-form-group label="Đến ngày">
              <b-form-datepicker
                v-model="toDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end btn-group-led mt-2">
        <b-button variant="secondary" size="sm" @click="cancelFormRangeTime">
          Đóng
        </b-button>
        <b-button
          variant="primary"
          class="ml-2"
          size="sm"
          @click="chooseRangeTime()"
        >
          Xác nhận
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";

import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import dataFakeChart from "@/data/modules/npl/dashboardKD.js";
export default {
  name: "DashboardNPLSale",
  components: {
    "multi-area-shadow-chart": MultiAreaShadowChart,
  },
  data() {
    return {
      // field: [
      //   {
      //     tr: [
      //       { key: "Yêu cầu vận tải", rowspan: 2, class: "text-center" },
      //       { key: "Trong ngày", colspan: 2, class: "text-center" },
      //       { key: "Tuần", colspan: 2, class: "text-center" },
      //       { key: "Tháng", colspan: 2, class: "text-center" },
      //       { key: "Năm", colspan: 2, class: "text-center" },
      //     ],
      //   },
      //   {
      //     tr: [
      //       { key: "Tiếp nhận", colspan: 1, class: "text-center" },
      //       { key: "Từ chối", colspan: 1, class: "text-center" },
      //       { key: "Tiếp nhận", colspan: 1, class: "text-center" },
      //       { key: "Từ chối", colspan: 1, class: "text-center" },
      //       { key: "Tiếp nhận", colspan: 1, class: "text-center" },
      //       { key: "Từ chối", colspan: 1, class: "text-center" },
      //       { key: "Tiếp nhận", colspan: 1, class: "text-center" },
      //       { key: "Từ chối", colspan: 1, class: "text-center" },
      //     ],
      //   },
      // ],
      // dataTable: [
      //   {
      //     check: ["Hàng rời", "5", "15", "20", "3", "5", "15", "20", "3"],
      //   },
      //   {
      //     check: ["Hàng cont", "5", "15", "20", "3", "5", "15", "20", "3"],
      //   },
      //   {
      //     check: ["Hàng nhập", "5", "15", "20", "3", "5", "15", "20", "3"],
      //   },
      // ],
      dataRange: dataFakeChart.dataRange,
      selectChartOption: {
        label: this.$t("modal.this-day"),
        value: "DAY",
      },
      watchByType: [
        { key: "Day", label: "Trong ngày" },
        { key: "Week", label: "Trong tuần" },
        { key: "Month", label: "Trong tháng" },
        { key: "Year", label: "Trong năm" },
        { key: "Date", label: "Khoảng thời gian" },
      ],
      showChartDoanhThu: false,
      showChartSoLuong: false,
      showChartHangRoi: false,
      showChartHangCont: false,
      showChartMatHang: false,
      showChartMatHangSoLuong: false,
      showChartNhanVienDoanhThu: false,
      showChartNhanVienSoLuong: false,
      dataChartMatHang: null,
      dataChartMatHangSoLuong: null,
      dataChartNhanVienDoanhThu: null,
      labelChartMatHang: null,
      labelChartMatHangSoLuong: null,
      labelChartNhanVienSoLuong: null,
      dataChartDoanhThu: null,
      labelChartDoanhThu: null,
      dataChartSoLuong: null,
      labelChartSoLuong: null,
      dataChartHangRoi: null,
      labelChartHangRoi: null,
      dataChartHangCont: null,
      labelChartHangCont: null,
      tabDate: 0,
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      dataTemperatures: null,
      apiKeyWeather: `7332304f45b419ee8c65c1d452a83349`,
      srcImage: "",
      classTableData: [
        {
          Day: { name: "Đơn hàng", rowspan: 1, colspan: 2 },
          Week: { name: "Từ chối", rowspan: 1, colspan: 2 },
          Month: { name: "Tiếp nhận", rowspan: 1, colspan: 2 },
          Year: { name: "Từ chối", rowspan: 1, colspan: 2 },
        },
      ],
    };
  },
  computed: {
    getTitleCloud() {
      return this.dataTemperatures?.weather[0].description;
    },
    getSunrise() {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date(this.dataTemperatures.sys.sunrise).toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        {
          timeStyle: "short",
        }
      );
    },
    getSunset() {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date(this.dataTemperatures.sys.sunset).toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        {
          timeStyle: "short",
        }
      );
    },
    getDayWeekYear() {
      return (
        this.getCurrentLanguage({ weekday: "long" }) +
        `, ${this.getCurrentLanguage({ dateStyle: "long" })}`
      );
    },
    getTime() {
      return this.time;
    },
    temperatureBienHoa() {
      if (this.dataTemperatures) {
        const temperature = Math.round(this.dataTemperatures.main?.temp);
        return temperature;
      }
      return 32;
    },
  },
  async created() {
    await this.getScheduleChart();
    await this.getTemperature();
    this.interval = setInterval(async () => {
      await this.getTemperature();
    }, 30000);
    this.intervalTime = setInterval(() => {
      this.time = this.getCurrentLanguage({ timeStyle: "short" });
    }, 1000);
  },
  methods: {
    getCurrentLanguage(options) {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date().toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        options
      );
    },
    async getTemperature() {
      let body = "DaNang";
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
    cancelFormRangeTime() {
      this.$bvModal.hide("range-time-modal");
    },
    changeDate(date) {
      if (date === 3) {
        this.tabDate = date;
        setTimeout(() => {
          this.$bvModal.show("range-time-modal");
        }, 500);
      } else {
        this.tabDate = date;
        this.getScheduleChart();
      }
    },
    getScheduleChart() {
      this.convertDataChartMultiAreaShadowDoanhThu(
        dataFakeChart.dataChartWeekDoanhThu
      );
      this.convertDataChartMultiAreaShadowSoLuong(
        dataFakeChart.dataChartWeekSoLuong
      );
      this.convertDataChartMultiAreaShadowHangRoi(
        dataFakeChart.dataChartWeekHangRoi
      );
      this.convertDataChartMultiAreaShadowHangCont(
        dataFakeChart.dataChartWeekHangNhap
      );
      this.convertDataChartMultiAreaShadowMatHang(
        dataFakeChart.dataChartWeekMatHang
      );
      this.convertDataChartMultiAreaShadowMatHangSoLuong(
        dataFakeChart.dataChartWeekMatHangSoLuong
      );
      this.convertDataChartMultiAreaShadowNhanVienDoanhThu(
        dataFakeChart.dataChartWeekNhanVienDoanhThu
      );
      this.convertDataChartMultiAreaShadowNhanVienSoLuong(
        dataFakeChart.dataChartWeekNhanVienSoLuong
      );
    },
    convertDataChartMultiAreaShadowDoanhThu(data) {
      let labelDate = [];
      let result = [
        {
          label: "Doanh thu", //StationNo
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          // backgroundColor: this.gradient,
          data: [],
        },
        {
          label: "Hàng rời",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Cont nhập",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Cont xuất",
          borderColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          pointHoverBackgroundColor: "#c7e8ea",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Money") {
            result[0].data.push(item[key]);
          }
          if (key === "Roi") {
            result[1].data.push(item[key]);
          }
          if (key === "Nhap") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChartDoanhThu = labelDate;
      this.dataChartDoanhThu = result;
      setTimeout(() => {
        this.showChartDoanhThu = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowSoLuong(data) {
      let labelDate = [];
      let result = [
        {
          label: "Số lượng", //StationNo
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          // backgroundColor: this.gradient,
          data: [],
        },
        {
          label: "Hàng rời",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Cont nhập",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Cont xuất",
          borderColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          pointHoverBackgroundColor: "#c7e8ea",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Money") {
            result[0].data.push(item[key]);
          }
          if (key === "Roi") {
            result[1].data.push(item[key]);
          }
          if (key === "Nhap") {
            result[2].data.push(item[key]);
          }
          if (key === "Roi") {
            result[3].data.push(item[key]);
          }
        }
      });
      this.labelChartSoLuong = labelDate;
      this.dataChartSoLuong = result;
      setTimeout(() => {
        this.showChartSoLuong = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowHangRoi(data) {
      let labelDate = [];
      let result = [
        {
          label: "Tiếp nhận", //StationNo
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          // backgroundColor: this.gradient,
          data: [],
        },
        {
          label: "Từ chối",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Chờ duyệt",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Tiepnhan") {
            result[0].data.push(item[key]);
          }
          if (key === "Tuchoi") {
            result[1].data.push(item[key]);
          }
          if (key === "Choduyet") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChartHangRoi = labelDate;
      this.dataChartHangRoi = result;
      setTimeout(() => {
        this.showChartHangRoi = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowHangCont(data) {
      let labelDate = [];
      let result = [
        {
          label: "Tiếp nhận", //StationNo
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          // backgroundColor: this.gradient,
          data: [],
        },
        {
          label: "Từ chối",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Chờ duyệt",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Tiepnhan") {
            result[0].data.push(item[key]);
          }
          if (key === "Tuchoi") {
            result[1].data.push(item[key]);
          }
          if (key === "Choduyet") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChartHangCont = labelDate;
      this.dataChartHangCont = result;
      setTimeout(() => {
        this.showChartHangCont = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowMatHang(data) {
      let labelDate = [];
      let result = [
        {
          label: "Thép", //StationNo
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
          label: "Ván",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Thạch cao",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient3,
          data: [],
        },
        {
          label: "Đồng tấm",
          borderColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          pointHoverBackgroundColor: "#c7e8ea",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          borderWidth: 2,
          backgroundColor: this.gradient4,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Thep") {
            result[0].data.push(item[key]);
          }
          if (key === "Van") {
            result[1].data.push(item[key]);
          }
          if (key === "Thachcao") {
            result[2].data.push(item[key]);
          }
          if (key === "Dongtam") {
            result[3].data.push(item[key]);
          }
        }
      });
      this.labelChartMatHang = labelDate;
      this.dataChartMatHang = result;
      setTimeout(() => {
        this.showChartMatHang = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowMatHangSoLuong(data) {
      let labelDate = [];
      let result = [
        {
          label: "Thép", //StationNo
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
          label: "Ván",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Thạch cao",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient3,
          data: [],
        },
        {
          label: "Đồng tấm",
          borderColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          pointHoverBackgroundColor: "#c7e8ea",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#c7e8ea",
          pointBorderColor: "#c7e8ea",
          borderWidth: 2,
          backgroundColor: this.gradient4,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Thep") {
            result[0].data.push(item[key]);
          }
          if (key === "Van") {
            result[1].data.push(item[key]);
          }
          if (key === "Thachcao") {
            result[2].data.push(item[key]);
          }
          if (key === "Dongtam") {
            result[3].data.push(item[key]);
          }
        }
      });
      this.labelChartMatHangSoLuong = labelDate;
      this.dataChartMatHangSoLuong = result;
      setTimeout(() => {
        this.showChartMatHangSoLuong = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowNhanVienDoanhThu(data) {
      let labelDate = [];
      let result = [
        {
          label: "Tâm", //StationNo
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
          label: "Tú",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Nhất",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient3,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Tam") {
            result[0].data.push(item[key]);
          }
          if (key === "Tu") {
            result[1].data.push(item[key]);
          }
          if (key === "Nhat") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChartNhanVienDoanhThu = labelDate;
      this.dataChartNhanVienDoanhThu = result;
      setTimeout(() => {
        this.showChartNhanVienDoanhThu = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowNhanVienSoLuong(data) {
      let labelDate = [];
      let result = [
        {
          label: "Tâm", //StationNo
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
          label: "Tú",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: "Nhất",
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient3,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "Tam") {
            result[0].data.push(item[key]);
          }
          if (key === "Tu") {
            result[1].data.push(item[key]);
          }
          if (key === "Nhat") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChartNhanVienSoLuong = labelDate;
      this.dataChartNhanVienSoLuong = result;
      setTimeout(() => {
        this.showChartNhanVienSoLuong = true;
      }, 50);
    },
  },
};
</script>

<style lang="scss" scoped>
.box_header-bottom-temperature {
  font-size: 36px;
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

.fz-medium {
  font-size: 18px;
}

.fz-small {
  font-size: 16px;
}

.fz-large {
  font-size: 20px;
}

.range-font {
  font-size: 12px;
  font-weight: 600;
  color: black;
}
</style>
