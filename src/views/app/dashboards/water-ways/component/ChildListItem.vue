<template>
  <div @click="showModal(data)">
    <b-card class="child-item" no-body :id="'modal-detail-' + data.StationID">
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
            <p class="list-item-heading mb-1 truncate">
              {{ data.StationName }}
            </p>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="text-muted mb-1 text-small">
              <template v-if="data.UpdateTime">
                {{ convertDateTime(data.UpdateTime) }}
              </template>
              <template v-else>
                {{ convertDateTime(data.Updatetime) }}
              </template>
            </p>
          </b-col>
          <b-col
            lg="4"
            md="12"
            class="d-flex flex-nowrap text-nowrap text-right justify-content-end"
          >
            <span>
              <b-badge
                pill
                :style="
                  'background-color:' +
                  data.DistWarningColor +
                  '!important; font-size: 88%;color:white;'
                "
                class="ml-1"
              >
                {{ data.DistWarningName }}
              </b-badge>
            </span>
            <span>
              <b-badge
                pill
                :style="
                  'background-color:' +
                  data.PinWarningColor +
                  '!important; font-size: 88%;color:white;'
                "
                class="ml-1"
              >
                {{ data.PinWarningName }}
              </b-badge>
            </span>
            <span>
              <b-badge
                pill
                :style="
                  'background-color:' +
                  data.StatusColor +
                  '!important; font-size: 88%;color:white;'
                "
                class="ml-1"
              >
                {{ data.StatusName }}
              </b-badge>
            </span>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-modal
      :id="formID"
      :ref="formID"
      :title="titleForm"
      v-if="dataForm"
      centered
      hide-header
      ok-only
      size="xl"
      @hide="resetModal"
      scrollable
      title-class="font-weight-bolder"
    >
      <b-row>
        <b-col md="12" class="text-center">
          <h2 class="font-weight-bold text-muted">
            {{ $t("tabs.title.analysis-chart").toUpperCase() }}
            <!-- {{ $t('dashboards.chart-active').toUpperCase() }} -->
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
              <template v-for="(dataStation, index) in dataChart">
                <b-col :key="index" xl="6" lg="12" class="text-center">
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
import handling from "@/constants/handling";
import waterwayAPI from "@/api/modules/waterwayAPI";
import { timer } from "@/constants/config";
import AreaChartApex from "@/components/Charts/AreaChartApex";

export default {
  props: ["data"],
  components: {
    "area-chart-apex": AreaChartApex,
  },
  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      dataForm: null,
      dataChart: null,
      typeLoadData: "Week",
      typeLoadByID: this.data.StationID,
      formID: this.data.StationID,
    };
  },
  watch: {
    data() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
  },
  methods: {
    resetModal() {
      this.$bvModal.hide(this.formID);
      this.titleForm = null;
      this.dataForm = null;
      this.dataChart = null;
      this.typeLoadData = "Week";
    },
    showModal(data) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
      this.dataForm = data;
      this.titleForm = data.StationName.toUpperCase();
      this.getDataChart(this.typeLoadData, this.typeLoadByID);
      setTimeout(() => {
        this.$bvModal.show(this.formID);
      }, this.timer);
    },
    setTypeLoadData(type) {
      this.typeLoadData = type;
      this.getDataChart(type, this.typeLoadByID);
    },
    getDataChart(type, id) {
      let body = {
        CabinetID: id,
        UserIDCurent: this.userID,
        Type: type,
      };
      waterwayAPI
        .waterWayDashboardAnalytics(body)
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
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    durationDay(string) {
      return handling.durationDay(new Date(), string);
    },
  },
};
</script>
<style scoped>
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
  background-color: rgb(243, 239, 239);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #f3efef 0 -1px 9px,
    rgb(245, 241, 241) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
.child-item:hover {
  background: #eeecec;
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
</style>
