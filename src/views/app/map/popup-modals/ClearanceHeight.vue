<template>
  <div>
    <b-row>
      <b-colxx md="12">
        <h3 class="text-center font-weight-bold">
          {{ dataModal.StationName.toUpperCase() }}
        </h3>
        <p class="text-center">
          <span class="font-italic">{{ $t("map.address") + ": " }}</span>
          <span class="font-weight-bold">
            {{ dataModal.StationAddress }}
          </span>
          <span>/</span>
          <span class="font-italic">
            {{ $t("map.lng") + " - " + $t("map.lat") + ": " }}
          </span>
          <span class="font-weight-bold">
            {{ dataModal.Long + ", " + dataModal.Lat }}
          </span>
          <span>/</span>
          <span class="font-italic">
            {{ $t("map.update-time") + ": " }}
          </span>
          <span class="text-danger font-weight-bold">
            {{ convertDateTime(dataModal.UpdateTime) }}
          </span>
        </p>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx lg="6" md="12">
        <b-alert
          :class="['text-center', 'led-' + dataModal.StatusColor]"
          style="color: white; letter-spacing: 4px"
          show
        >
          <strong>{{ dataModal.StatusName.toUpperCase() }}</strong>
        </b-alert>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx md="12">
        <b-row>
          <b-col>
            <icon-card :icon="'fas fa-route'" :title="dataModal.RouteName" />
          </b-col>
          <b-col>
            <template v-if="dataModal.ConnectTypeID === 2">
              <b-col>
                <icon-card
                  :icon="'fad fa-wifi'"
                  :title="dataModal.ConnectTypeName"
                />
              </b-col>
            </template>
            <template v-else-if="dataModal.ConnectTypeID === 3">
              <b-col>
                <icon-card
                  :icon="'fas fa-sim-card'"
                  :title="dataModal.ConnectTypeName"
                />
              </b-col>
            </template>
            <template v-else-if="dataModal.ConnectTypeID === 4">
              <b-col>
                <icon-card
                  :icon="'fad fa-ethernet'"
                  :title="dataModal.ConnectTypeName"
                />
              </b-col>
            </template>
            <template v-else>
              <b-col>
                <icon-card :title="dataModal.ConnectTypeName" />
              </b-col>
            </template>
          </b-col>
          <b-colxx>
            <template v-if="dataModal.PowerTypeID === 2">
              <b-col>
                <icon-card
                  :icon="'fab fa-acquisitions-incorporated'"
                  :title="dataModal.PowerTypeName"
                />
              </b-col>
            </template>
            <template v-else-if="dataModal.PowerTypeID === 3">
              <b-col>
                <icon-card
                  :icon="'fas fa-solar-panel'"
                  :title="dataModal.PowerTypeName"
                />
              </b-col>
            </template>
            <template v-else>
              <b-col>
                <icon-card :title="dataModal.PowerTypeName" />
              </b-col>
            </template>
          </b-colxx>
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
                    left: 44%;
                    bottom: 30px;
                  "
                >
                  {{ dataModal.ClearanceHeight }}
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
                    left: 44%;
                    bottom: 30px;
                  "
                >
                  {{ dataModal.RiverHeight }}
                </h1>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-colxx>
    </b-row>
    <b-row>
      <b-col md="12" class="text-center mt-4">
        <h2 class="font-weight-bold text-muted">THỐNG KÊ TRONG NGÀY</h2>
      </b-col>
      <b-colxx md="12" class="text-center">
        <template v-if="dataChart && dataChart.length > 0">
          <b-row>
            <template v-for="(dataStation, index) in dataChart">
              <b-col :key="index" xl="6" lg="12" class="text-center">
                <area-chart-apex
                  :area-chart="{ series: areaChartConvert(dataStation) }"
                  :width="`500px`"
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
        </template>
        <template v-else>
          <b-col lg="12" class="mb-4 mt-4">
            <p class="text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </b-col>
        </template>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import imgDown from "@/assets/img/water-way-icon/down.jpg";
import imgUp from "@/assets/img/water-way-icon/up.jpg";
import IconCard from "@/components/Cards/IconCardTwo";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import waterwayAPI from "@/api/modules/waterwayAPI";

export default {
  props: ["dataModal", "objectData"],
  components: {
    "icon-card": IconCard,
    "area-chart-apex": AreaChartApex,
  },
  mounted() {
    this.getDataChart(this.typeLoadData, this.typeLoadByID);
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      imgDown,
      imgUp,
      typeLoadData: "Day",
      typeLoadByID: this.dataModal.StationID,
      dataChart: null,
    };
  },
  methods: {
    getDataChart(type, id) {
      let body = {
        CabinetID: id,
        UserIDCurent: this.userID,
        Type: type,
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
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
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
