<template>
  <div class="pb-4">
    <b-row>
      <b-col lg="6">
        <b-card style="padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Tìnht trạng xe 7 ngày gần đây</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartVehicle">
              <multi-area-shadow-chart
                :labelDate="labelChartVehicle"
                :data="dataChartVehicle"
                :height="300"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card style="padding: 0.75rem" no-body>
          <div class="float-left float-none-xs">
            <div class="d-inline-block">
              <h4 class="d-inline">Số lượng vận đơn 7 ngày gần đây</h4>
            </div>
          </div>
          <div class="chart card-body pt-0">
            <template v-if="showChartShipping">
              <multi-area-shadow-chart
                :labelDate="labelChartShipping"
                :data="dataChartShipping"
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
  </div>
</template>

<script>
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
// import MultiAreaShadowChart from "./component/MultiAreaShadow";
import fakeData from "@/data/modules/npl/dashboardDieuDo.js";

export default {
  components: {
    "multi-area-shadow-chart": MultiAreaShadowChart,
  },
  data() {
    return {
      showChartVehicle: false,
      showChartShipping: false,
      dataChartVehicle: null,
      labelChartVehicle: null,
      dataChartShipping: null,
      labelChartShipping: null,
      fakeData: fakeData,
    };
  },
  created() {
    this.getScheduleChart();
  },
  methods: {
    convertDataChartMultiAreaShadowVehicle(data) {
      const result = [
        {
          label: "Xe đang hoạt động",
          data: [],
          fill: false,
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 0,
        },
        {
          label: "Xe có đơn hàng",
          data: [],
          fill: false,
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          borderWidth: 0,
        },
        {
          label: "Xe không hoạt động",
          data: [],
          fill: false,
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          borderWidth: 0,
        },
        {
          label: "Xe trống",
          data: [],
          fill: false,
          borderColor: "#6597cf",
          pointBorderColor: "#6597cf",
          pointHoverBackgroundColor: "#6597cf",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#6597cf",
          borderWidth: 0,
        },
      ];
      data.dataVehicle.forEach((item) => {
        switch (item.label) {
          case "Xe đang hoạt động":
            result[0].data = item.data;
            break;
          case "Xe có đơn hàng":
            result[1].data = item.data;
            break;
          case "Xe không hoạt động":
            result[2].data = item.data;
            break;
          case "Xe trống":
            result[3].data = item.data;
            break;
          default:
            break;
        }
      });

      this.dataChartVehicle = result
      this.labelChartVehicle = data.labelArr;

      setTimeout(() => {
        this.showChartVehicle = true;
      }, 50);
    },
    convertDataChartMultiAreaShadowShipping(data) {
      const result = [
        {
          label: "Tổng",
          data: [],
          fill: false,
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 0,
        },
        {
          label: "Hàng rời",
          data: [],
          fill: false,
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          borderWidth: 0,
        },
        {
          label: "Cont nhập",
          data: [],
          fill: false,
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          borderWidth: 0,
        },
        {
          label: "Cont xuất",
          data: [],
          fill: false,
          borderColor: "#6597cf",
          pointBorderColor: "#6597cf",
          pointHoverBackgroundColor: "#6597cf",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#6597cf",
          borderWidth: 0,
        },
      ];
      data.dataShipping.forEach((item) => {
        switch (item.label) {
          case "Tổng":
            result[0].data = item.data;
            break;
          case "Hàng rời":
            result[1].data = item.data;
            break;
          case "Cont nhập":
            result[2].data = item.data;
            break;
          case "Cont xuất":
            result[3].data = item.data;
            break;
          default:
            break;
        }
      });

      this.dataChartShipping = result
      this.labelChartShipping = data.labelArr;

      setTimeout(() => {
        this.showChartShipping = true;
      }, 50);
    },
    getScheduleChart() {
      this.convertDataChartMultiAreaShadowVehicle(fakeData);
      this.convertDataChartMultiAreaShadowShipping(fakeData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
