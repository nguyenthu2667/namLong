<template>
  <div v-if="data">
    <b-card
      class="header"
      v-b-toggle="`id-${data.StationID}`"
      no-body
      :id="'modal-detail-' + data.StationID"
      style="
        border-bottom: 1px solid #80808012 !important;
        box-shadow: none !important;
      "
    >
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
            <p class="list-item-heading mb-1 truncate font-weight-bold">
              {{ data.Name }}
            </p>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="text-muted mb-1">
              {{ $t("report.address") }}: {{ data.Address }}
            </p>
          </b-col>
          <b-col lg="4" md="12" class="text-right">
            <template v-if="data.Status && data.StatusName">
              <span>
                <b-badge
                  pill
                  :style="
                    'background-color:' +
                    data.StatusColor +
                    '!important; font-size: 100%;'
                  "
                >
                  {{ data.StatusName }}
                </b-badge>
              </span>
            </template>
            <template v-else>
              <span>
                <b-badge
                  pill
                  style="background-color: gray !important; font-size: 100%"
                >
                  {{ data.StatusName }}
                </b-badge>
              </span>
            </template>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse :id="`id-${data.StationID}`" :visible="true">
      <b-card
        style="box-shadow: none !important"
        class="list-station-custom mb-4"
      >
        <div class="custom-body-control">
          <div class="custom-body-control-top">
            <b-row>
              <b-col>
                <b-card
                  style="height: 122px"
                  class="d-flex align-items-center justify-content-center"
                >
                  <b-card-body style="padding: 0 !important">
                    <img
                      style="position: relative; width: 100px; height: 100px"
                      :src="imgDown"
                    />
                    <h1
                      style="
                        position: absolute;
                        font-size: 20px;
                        left: 42%;
                        bottom: 30px;
                      "
                    >
                      {{ data.ClearanceHeight }}
                    </h1>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col>
                <b-card
                  style="height: 122px"
                  class="d-flex align-items-center justify-content-center"
                >
                  <b-card-body style="padding: 0 !important">
                    <img
                      style="position: relative; width: 100px; height: 100px"
                      :src="imgUp"
                    />
                    <h1
                      style="
                        position: absolute;
                        font-size: 20px;
                        left: 42%;
                        bottom: 30px;
                      "
                    >
                      {{ data.RiverHeight }}
                    </h1>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col>
                <icon-card :icon="'fas fa-route'" :title="data.RouteName" />
              </b-col>
              <template v-if="data.ConnectTypeID === 2">
                <b-col>
                  <icon-card
                    :icon="'fad fa-wifi'"
                    :title="data.ConnectTypeName"
                  />
                </b-col>
              </template>
              <template v-else-if="data.ConnectTypeID === 3">
                <b-col>
                  <icon-card
                    :icon="'fas fa-sim-card'"
                    :title="data.ConnectTypeName"
                  />
                </b-col>
              </template>
              <template v-else-if="data.ConnectTypeID === 4">
                <b-col>
                  <icon-card
                    :icon="'fad fa-ethernet'"
                    :title="data.ConnectTypeName"
                  />
                </b-col>
              </template>
              <template v-else>
                <b-col>
                  <icon-card :title="data.ConnectTypeName" />
                </b-col>
              </template>
              <template v-if="data.PowerTypeID === 2">
                <b-col>
                  <icon-card
                    :icon="'fab fa-acquisitions-incorporated'"
                    :title="data.PowerTypeName"
                  />
                </b-col>
              </template>
              <template v-else-if="data.PowerTypeID === 3">
                <b-col>
                  <icon-card
                    :icon="'fas fa-solar-panel'"
                    :title="data.PowerTypeName"
                  />
                </b-col>
              </template>
              <template v-else>
                <b-col>
                  <icon-card :title="data.PowerTypeName" />
                </b-col>
              </template>
              <b-col>
                <icon-card
                  :type="2"
                  :icon="'fas fa-chart-area'"
                  :title="$t('dashboards.view-chart')"
                  :data="data"
                  @handleClickViewChart="showChartDetail"
                />
              </b-col>
            </b-row>
          </div>
        </div>
      </b-card>
    </b-collapse>
    <b-modal
      id="modal-detail"
      ref="modal-detail"
      :title="titleForm"
      @hidden="resetChartDetail"
      v-if="dataForm"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <b-row>
        <b-col md="12" class="text-center">
          <h2 class="font-weight-bold text-muted">
            {{ $t("dashboards.chart-active").toUpperCase() }}
          </h2>
        </b-col>
        <b-col md="12" class="text-center">
          <ul class="button-wrapper">
            <li
              id="WEEK"
              :class="{
                active: typeLoadData.toUpperCase() === 'WEEK',
                'none-click': typeLoadData.toUpperCase() === 'WEEK',
              }"
              @click="setTypeLoadData('Week')"
            >
              <label id="l1">{{ $t("dashboards.week") }}</label>
            </li>
            <li
              id="month"
              :class="{
                active: typeLoadData.toUpperCase() === 'MONTH',
                'none-click': typeLoadData.toUpperCase() === 'MONTH',
              }"
              @click="setTypeLoadData('Month')"
            >
              <label id="l2">{{ $t("dashboards.month") }}</label>
            </li>
            <li
              id="year"
              :class="{
                active: typeLoadData.toUpperCase() === 'YEAR',
                'none-click': typeLoadData.toUpperCase() === 'YEAR',
              }"
              @click="setTypeLoadData('Year')"
            >
              <label id="l3">{{ $t("dashboards.year") }}</label>
            </li>
          </ul>
        </b-col>
        <template v-if="dataChart && dataChart.length > 0">
          <b-col md="12">
            <b-row>
              <template v-for="dataStation in dataChart">
                <b-col xl="6" lg="12" class="text-center">
                  <area-chart-apex
                    v-if="isShow"
                    :area-chart="{ series: areaChartConvert(dataStation) }"
                  ></area-chart-apex>
                  <p class="text-muted font-weight-bold">
                    {{
                      dataStation.IndicatorName.toUpperCase() +
                      " (" +
                      dataStation.UnitName +
                      ")"
                    }}
                  </p>
                </b-col>
              </template>
            </b-row>
          </b-col>
        </template>
        <template v-else>
          <b-col lg="12" class="mb-4">
            <p class="text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </b-col>
        </template>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import IconCard from "@/components/Cards/IconCardTwo";
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import waterwayAPI from "@/api/modules/waterwayAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import imgDown from "@/assets/img/water-way-icon/down.jpg";
import imgUp from "@/assets/img/water-way-icon/up.jpg";

export default {
  props: ["data", "handleClickViewChart"],
  components: {
    "icon-card": IconCard,
    "area-chart-apex": AreaChartApex,
  },
  data() {
    return {
      isShow: false,
      imgDown,
      imgUp,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      typeLoadChartID: null,
      titleForm: null,
      dataForm: null,
      typeLoadData: "Week",
      dataChart: null,
    };
  },
  watch: {
    data(to, from) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  methods: {
    showChartDetail(data) {
      this.typeLoadChartID = data.StationID;
      this.dataForm = data;
      this.titleForm = data.Name.toUpperCase();
      this.getDataChart(this.typeLoadData, this.typeLoadChartID);
      this.isShow = false;
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, this.timer);
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    getDataChart(type, id) {
      let body = {
        StationID: id,
        Type: type,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .clearanceHeightDashboardAnalytics(body)
        .then((val) => {
          this.dataChart = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    areaChartConvert(data) {
      let seriesArea = [];
      let objArea = {
        name: data.IndicatorName + " (" + data.UnitName + ")",
        data: [],
      };
      let objAreaData = data.ChartDetailList;
      if (objAreaData && objAreaData.length > 0) {
        for (let k = 0; k < objAreaData.length; k++) {
          objArea.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemDate),
            parseFloat(objAreaData[k].IndicatorValue),
          ]);
        }
      }
      seriesArea.push(objArea);
      return seriesArea;
    },
    setTypeLoadData(type) {
      this.typeLoadData = type;
      this.getDataChart(type, this.typeLoadChartID);
    },
    resetChartDetail() {
      this.typeLoadData = "Week";
      this.dataForm = null;
      this.titleForm = null;
      this.dataChart = null;
      this.typeLoadChartID = null;
    },
  },
};
</script>

<style scoped>
.header:hover {
  background-color: rgb(200, 200, 200);
}
.button-wrapper label {
  font-size: 10px;
  padding: 5px 10px;
}

.button-wrapper li {
  height: 26px;
}

.button-wrapper li:first-child {
  margin-left: 0;
}

.button-wrapper li {
  margin-left: 20px;
}
.view-chart-table:hover {
  color: black;
}
</style>
