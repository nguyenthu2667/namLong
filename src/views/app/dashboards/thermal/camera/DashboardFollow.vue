<template>
  <div style="cursor: pointer">
    <b-row>
      <b-col lg="12">
        <h5 class="text-muted">
          <strong>{{ $t("dashboards.data-total").toUpperCase() }}</strong>
        </h5>
        <div class="separator mb-5"></div>
      </b-col>
      <b-col lg="12" v-if="follow && follow.length > 0">
        <draggable class="row">
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-total')"
              :percent="follow[0].CountTotalData"
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="blue"
            />
          </b-col>
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-normal')"
              :percent="
                follow[0].CountTotalData - follow[0].CountTotalDataWarning
              "
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="green"
            />
          </b-col>
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-warning')"
              :percent="follow[0].CountTotalDataWarning"
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="red"
            />
          </b-col>
        </draggable>
      </b-col>
      <b-col lg="12">
        <h5 class="text-muted">
          <strong>{{ $t("dashboards.data-today").toUpperCase() }}</strong>
        </h5>
        <div class="separator mb-5"></div>
      </b-col>
      <b-col lg="12" v-if="follow">
        <draggable class="row">
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-total-today')"
              :percent="follow[0].CountTodayData"
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="blue"
            />
          </b-col>
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-normal-today')"
              :percent="follow[0].CountTodayData - follow[0].CountTodayWarning"
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="green"
            />
          </b-col>
          <b-col xl="4" lg="6" class="mb-4">
            <radial-progress-card
              :title="$t('dashboards.thermal-warning-today')"
              :percent="follow[0].CountTodayWarning"
              :unit="$t('dashboards.case').toLowerCase()"
              color-string="red"
            />
          </b-col>
        </draggable>
      </b-col>
      <b-col lg="12">
        <h5 class="text-muted">
          <strong>{{ $t("dashboards.follow-station").toUpperCase() }}</strong>
        </h5>
        <div class="separator mb-5"></div>
      </b-col>
      <b-col lg="8">
        <b-card class="card-custom-big-image mb-4">
          <div class="border-image-big">
            <div class="border-size-image-big top"></div>
            <template v-if="report && report.length > 0">
              <b-alert
                class="mb-0 pt-3"
                show
                style="height: 50px"
                variant="primary"
              >
                <span class="h6"
                  ><strong>{{ report[0].CameraThermalName }}</strong></span
                >
                <span> - {{ $t("map.update-time") }}:</span>
                <span class="h6"
                  ><strong>{{ report[0].DataTime }}</strong></span
                >
              </b-alert>
              <div style="display: flex">
                <div style="height: 450px; width: calc(100% - 100px); order: 1">
                  <b-img
                    id="myImageBig"
                    :src="report[0].OriginalPictureUrl"
                    fluid
                    alt="Responsive image"
                    style="width: 100%"
                  ></b-img>
                </div>
                <div
                  style="
                    width: 100px;
                    height: 450px;
                    order: 2;
                    text-align: center;
                    padding: 10px 0;
                  "
                >
                  <vue-perfect-scrollbar
                    style="height: 430px"
                    class="scroll"
                    :settings="{
                      suppressScrollX: true,
                      wheelPropagation: false,
                    }"
                  >
                    <template v-for="(item, index) in report">
                      <template
                        v-if="
                          item.OriginalPictureUrl ===
                          report[0].OriginalPictureUrl
                        "
                      >
                        <template v-if="index === 0">
                          <b-img
                            :key="index"
                            :src="item.FaceUrl"
                            fluid
                            alt="Responsive face"
                            style="
                              width: 100px;
                              height: 100px;
                              margin-top: -0.5rem;
                            "
                          ></b-img>
                        </template>
                        <template v-else>
                          <b-img
                            :key="index"
                            :src="item.FaceUrl"
                            fluid
                            alt="Responsive face"
                            style="width: 100px; height: 100px"
                          ></b-img>
                        </template>
                        <div
                          style="
                            width: calc(100px - 1rem);
                            height: 20px;
                            background-color: rgba(0, 0, 0, 0.1);
                            margin-top: -0.5rem;
                            margin-left: 0.5rem;
                          "
                        >
                          <template v-if="item.IsWarning">
                            <p class="mb-0" style="color: red">
                              <strong>{{ item.Temperature }} &deg;C</strong>
                            </p>
                          </template>
                          <template v-else>
                            <p class="mb-0">
                              <strong>{{ item.Temperature }} &deg;C</strong>
                            </p>
                          </template>
                        </div>
                      </template>
                    </template>
                  </vue-perfect-scrollbar>
                </div>
              </div>
            </template>
            <div class="border-size-image-big bottom"></div>
          </div>
        </b-card>
        <b-card class="card-custom-small-image mb-4">
          <div class="border-table">
            <div class="border-size-table top"></div>
            <div class="class-table-new-data">
              <b-dropdown
                id="dropdown-form"
                ref="dropdown"
                left
                variant="empty"
                toggle-class="p-0"
                no-caret
              >
                <template slot="button-content">
                  <b-button
                    variant="outline-primary"
                    size="sm"
                    class="mb-2"
                    v-b-toggle.collapse-header
                    style="padding: 0.35rem; font-size: 0.6rem"
                  >
                    <i class="fad fa-cog" style="font-size: 22px"></i>
                  </b-button>
                </template>
                <vue-perfect-scrollbar
                  class="list-item-station-option"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <b-dropdown-item
                    v-for="(station, index) in optionStation"
                    :key="index"
                    @click="changeStation(station)"
                  >
                    <span class="item-station-option font-weight-bold">{{
                      station.ThermalCameraName
                    }}</span>
                  </b-dropdown-item>
                </vue-perfect-scrollbar>
              </b-dropdown>
              <template
                v-if="selectedStation"
                v-for="(item, index) in optionStation"
              >
                <span
                  class="ml-2 h5 text-muted"
                  v-if="selectedStation.SerialNumber === item.SerialNumber"
                  :key="index"
                >
                  <strong>{{
                    item.ThermalCameraName.toUpperCase()
                  }}</strong></span
                >
              </template>
              <template v-if="hisListBySeries && hisListBySeries.length > 0">
                <b-table
                  :sticky-header="true"
                  responsive
                  :items="hisListBySeries"
                  :fields="fieldListBySeries"
                  class="text-center"
                  style="min-height: 355px"
                  bordered
                >
                  <template v-slot:cell(_image)="slot">
                    <b-img
                      :src="slot.item.FaceUrl"
                      :id="'image_' + slot.item.FaceUrl"
                      fluid
                      :alt="'image_small'"
                      style="width: 50px; height: 50px"
                      @click="openFullscreen('image_' + slot.item.FaceUrl)"
                    ></b-img>
                  </template>
                  <template v-slot:cell(_imageOrigin)="slot">
                    <b-img
                      :src="slot.item.OriginalPictureUrl"
                      :id="'image_origin_' + slot.item.OriginalPictureUrl"
                      fluid
                      :alt="'image_origin'"
                      style="width: 100px; height: 50px"
                      @click="
                        openFullscreen(
                          'image_origin_' + slot.item.OriginalPictureUrl
                        )
                      "
                    ></b-img>
                  </template>
                  <template v-slot:cell(_temperature)="slot">
                    <template v-if="slot.item.IsWarning">
                      <p
                        class="mb-0 text-center font-weight-bold"
                        style="color: red"
                      >
                        {{ slot.item.Temperature }} °C
                      </p>
                    </template>
                    <template v-else>
                      <p class="mb-0 text-center font-weight-bold">
                        {{ slot.item.Temperature }} °C
                      </p>
                    </template>
                  </template>
                </b-table>
              </template>
              <template v-else>
                <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
              </template>
            </div>
            <div class="border-size-table bottom"></div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="card-custom-map-mini mb-4">
          <div class="border-map-mini">
            <div class="border-size-map-mini top"></div>
            <div class="map-control" v-if="latLng && latLng.length > 0">
              <multi-location-component
                :lat-lng="latLng"
                :type-item="'camerathermal'"
              ></multi-location-component>
            </div>
            <template v-if="follow && follow.length > 0">
              <div class="location-total-control mr-2 text-right text-small">
                <span>{{ $t("dashboards.device-total") }}: </span>
                <span class="font-weight-bold mr-1" style="color: dodgerblue">{{
                  follow[0].CountTotalDevice
                }}</span>
                <i
                  class="fad fa-camera-home mr-2"
                  style="color: dodgerblue"
                ></i>
                <span>{{ $t("dashboards.device-connect") }}: </span>
                <span class="font-weight-bold mr-1" style="color: green">{{
                  follow[0].TotalDeviceConnect
                }}</span>
                <i class="fad fa-camera-home mr-2" style="color: green"></i>
                <span>{{ $t("dashboards.device-disconnect") }}: </span>
                <span class="font-weight-bold mr-1" style="color: red">{{
                  follow[0].TotalDeviceDisconnect
                }}</span>
                <i class="fad fa-camera-home" style="color: red"></i>
              </div>
            </template>
            <div class="border-size-map-mini bottom"></div>
          </div>
        </b-card>
        <b-card class="card-custom-list-his mb-4">
          <div class="border-list-his">
            <div class="border-size-list-his top"></div>
            <div class="class-list-with-user">
              <vue-perfect-scrollbar
                style="height: 505px"
                class="scroll dashboard-list-with-user"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <template v-if="hisList && hisList.length > 0">
                  <list-with-user-item
                    v-for="(ticket, index) in hisList"
                    :data="ticket"
                    :key="index"
                    :id="index"
                  />
                </template>
              </vue-perfect-scrollbar>
            </div>
            <div class="border-size-list-his bottom"></div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import MultiLocationComponent from "@/components/Map/MultiLocationComponent";
import ListWithUserItem from "@/components/Listing/ListWithEmployerThermalCamera";
import Draggable from "vuedraggable";
import RadialProgressCard from "@/components/Cards/RadialProgressCard";
import thermalAPI from "@/api/modules/thermalAPI";

export default {
  components: {
    draggable: Draggable,
    "radial-progress-card": RadialProgressCard,
    "multi-location-component": MultiLocationComponent,
    "list-with-user-item": ListWithUserItem,
  },
  name: "DashboardFollow",
  data() {
    return {
      timer,
      follow: null,
      report: null,
      hisList: null,
      latLng: null,
      listImageSmall: null,
      fieldListBySeries: [
        {
          key: "_image",
          label: this.$t("table.face-image"),
          tdClass: "text-center",
        },
        {
          key: "_imageOrigin",
          label: this.$t("table.full-image"),
          tdClass: "text-center",
        },
        {
          key: "_temperature",
          label: this.$t("table.temperature"),
          // formatter: function (val) {
          //   return val + ' °C'
          // },
          tdClass: "text-center",
        },
        {
          key: "DataTime",
          label: this.$t("table.time"),
          tdClass: "text-center text-muted",
        },
      ],
      hisListBySeries: null,
      selectedStation: null,
      optionStation: [],
    };
  },
  methods: {
    changeStation(station) {
      this.selectedStation = station;
      this.getHistoryBySeries(this.selectedStation.SerialNumber);
    },
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    getData() {
      thermalAPI
        .thermalCameraGet()
        .then((val) => {
          let result = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          let array = result.filter((x) => x.IsActive);
          let latLngArray = [];
          let _array = [];
          array.forEach((val) => {
            latLngArray.push([parseFloat(val.Lat), parseFloat(val.Long)]);
            _array.push(val);
          });
          this.optionStation = _array;
          if (!this.selectedStation) {
            this.selectedStation = this.optionStation[0];
          }
          this.getHistoryBySeries(this.selectedStation.SerialNumber);
          this.latLng = latLngArray;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFollow() {
      thermalAPI
        .thermalCameraDashboardFollow()
        .then((val) => {
          this.follow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistory() {
      let body = {
        SerialNumber: "%",
      };
      thermalAPI
        .thermalCameraReportTop(body)
        .then((val) => {
          this.report = val.status ? val.data : [];
          this.listImageSmall = this.report.filter(
            (x) => x.OriginalPictureUrl === this.report[0].OriginalPictureUrl
          );
          let array = [];
          this.report.forEach((val) => {
            let obj = {
              FaceUrl: val.FaceUrl,
              DataTime: val.DataTime,
              Temperature: val.Temperature,
              IsWarning: val.IsWarning,
              OriginalPictureUrl: val.OriginalPictureUrl,
              CameraThermalName: val.CameraThermalName,
            };
            array.push(obj);
          });
          this.hisList = array;
          // this.getHistoryBySeries(this.report[0].SerialNumber)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistoryBySeries(series) {
      let body = {
        SerialNumber: series,
      };
      thermalAPI
        .thermalCameraReportTop(body)
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          result.forEach((val) => {
            let obj = {
              FaceUrl: val.FaceUrl,
              DataTime: val.DataTime,
              Temperature: val.Temperature,
              IsWarning: val.IsWarning,
              OriginalPictureUrl: val.OriginalPictureUrl,
              CameraThermalName: val.CameraThermalName,
            };
            array.push(obj);
          });
          this.hisListBySeries = array;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    autoReloadData(timer) {
      this.getData();
      this.getFollow();
      this.getHistory();
      setTimeout(() => {
        this.autoReloadData(timer);
      }, timer);
    },
  },
  async created() {
    await this.autoReloadData(this.timer * 20);
  },
};
</script>

<style scoped type="scss">
.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  border: 5px solid red;
}

.card-custom-big-image .card-body {
  padding: 0;
}

.card-custom-map-mini .card-body {
  padding: 0;
}

.card-custom-list-his .card-body {
  padding: 1.05rem;
}

.card-custom-small-image .card-body {
  padding: 0.5rem;
}

.border-image-big {
  width: 100%;
  height: 500px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-image-big .border-size-image-big {
  position: absolute;
  width: 100%;
}

.border-image-big img {
  height: 100%;
  padding: 0.5rem;
}

.border-image-big .border-size-image-big:before,
.border-image-big .border-size-image-big:after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  padding: 5px;
}

/*.border-image-big .border-size-image-big.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-image-big .border-size-image-big.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-image-big .border-size-image-big:before {
  left: 0;
}

.border-image-big .border-size-image-big:after {
  right: 0;
}

.border-image-big .border-size-image-big.top {
  top: 0;
}

.border-image-big .border-size-image-big.bottom {
  bottom: 200px;
}

.border-map-mini {
  width: 100%;
  height: 375px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-map-mini .border-size-map-mini {
  position: absolute;
  width: 100%;
}

.border-map-mini .map-control {
  height: 350px;
  padding: 0.5rem;
}

.border-map-mini .border-size-map-mini:before,
.border-map-mini .border-size-map-mini:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 50px;
  padding: 5px;
}

/*.border-map-mini .border-size-map-mini.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-map-mini .border-size-map-mini.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-map-mini .border-size-map-mini:before {
  left: 0;
}

.border-map-mini .border-size-map-mini:after {
  right: 0;
}

.border-map-mini .border-size-map-mini.top {
  top: 0;
}

.border-map-mini .border-size-map-mini.bottom {
  bottom: 50px;
}

.border-list-his {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-list-his .border-size-list-his {
  position: absolute;
  width: 100%;
}

.border-list-his .class-list-with-user {
  padding: 0.5rem;
}

.border-list-his .border-size-list-his:before,
.border-list-his .border-size-list-his:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 200px;
  padding: 5px;
}

/*.border-list-his .border-size-list-his.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-list-his .border-size-list-his.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-list-his .border-size-list-his:before {
  left: 0;
}

.border-list-his .border-size-list-his:after {
  right: 0;
}

.border-list-his .border-size-list-his.top {
  top: 0;
}

.border-list-his .border-size-list-his.bottom {
  bottom: 200px;
}

.border-table {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-table .border-size-table {
  position: absolute;
  width: 100%;
}

.border-table .class-table-new-data {
  padding: 0.5rem;
  height: 415px;
}

.border-table .border-size-table:before,
.border-table .border-size-table:after {
  content: "";
  position: absolute;
  width: 200px;
  height: 100px;
  padding: 5px;
}

/*.border-table .border-size-table.top:before {*/
/*  border-top: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.top:after {*/
/*  border-top: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.bottom:before {*/
/*  border-bottom: 4px solid black;*/
/*  border-left: 4px solid black;*/
/*}*/

/*.border-table .border-size-table.bottom:after {*/
/*  border-bottom: 4px solid black;*/
/*  border-right: 4px solid black;*/
/*}*/

.border-table .border-size-table:before {
  left: 0;
}

.border-table .border-size-table:after {
  right: 0;
}

.border-table .border-size-table.top {
  top: 0;
}

.border-table .border-size-table.bottom {
  bottom: 100px;
}

.led-red {
  color: white;
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

.led-blue {
  color: white;
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}
</style>
