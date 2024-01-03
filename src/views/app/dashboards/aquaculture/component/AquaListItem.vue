<template>
  <div v-if="data">
    <b-card
      no-body
      style="
        border-bottom: 1px solid #80808012 !important;
        box-shadow: none !important;
      "
    >
      <div
        v-b-toggle="`id-${data.StationID}`"
        :id="'modal-detail-' + data.StationID"
        class="w-100 p-3 header"
        style="
          border-bottom: 1px solid rgba(128, 128, 128, 0.07) !important;
          cursor: pointer;
        "
      >
        <div
          class="d-flex align-items-center justify-content-between flex-column flex-lg-row"
        >
          <p class="font-size-custom mb-1 truncate font-weight-bold">
            {{ data.StationName }}
          </p>
          <p class="text-muted mb-1">
            {{ data.UpdateTime }}
          </p>
          <template v-if="data.IsWarning === 0">
            <span>
              <b-badge
                pill
                :style="
                  'background-color:' +
                  data.StatusColor.toLowerCase() +
                  '!important;' +
                  ' font-size: 100%;'
                "
              >
                {{ data.StatusName }}
              </b-badge>
            </span>
          </template>
          <template v-else-if="data.IsWarning === 1">
            <span>
              <b-badge
                pill
                :style="
                  'background-color:' +
                  data.StatusColor.toLowerCase() +
                  '!important;' +
                  ' font-size: 100%;'
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
                :style="
                  'background-color:' +
                  data.StatusColor.toLowerCase() +
                  '!important;' +
                  ' font-size: 100%;'
                "
              >
                {{ data.StatusName }}
              </b-badge>
            </span>
          </template>
        </div>
      </div>
      <b-collapse :id="`id-${data.StationID}`" :visible="true">
        <div class="d-flex flex-column flex-lg-row">
          <div class="aqua-custom-left">
            <div class="d-flex flex-column p-3">
              <div class="w-100">
                <b-img
                  thumbnail
                  fluid
                  class="h-img-wind w-100"
                  style="object-fit: cover"
                  :src="data.StationImage"
                ></b-img>
              </div>
              <div class="mb-2">
                <div class="px-2 py-2">
                  <div class="d-flex flex-column">
                    <div class="mb-2">
                      <div class="d-flex justify-content-between">
                        <div
                          class="font-weight-bold list-item-heading pb-2 border-bottom text-capitalize"
                        >
                          {{ $t("dashboards.info-station-device") }}
                        </div>
                        <span @click="handleDetail(data)">
                          <p
                            class="font-weight-bold"
                            style="
                              color: red;
                              text-decoration: underline;
                              cursor: pointer;
                            "
                          >
                            {{ $t("dashboards.view-detail") }}
                          </p>
                        </span>
                      </div>
                      <template
                        v-if="
                          data.ListDeviceInfo && data.ListDeviceInfo.length > 0
                        "
                      >
                        <template v-for="(_item, i) in data.ListDeviceInfo">
                          <div :key="i">
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <template v-if="_item.InfoValue < 0">
                                <div style="color: red; margin-bottom: 8px">
                                  {{ _item.InfoName }}
                                </div>
                                <div style="font-style: italic; color: red">
                                  {{ $t("dashboards.error") }}
                                </div>
                              </template>
                              <template v-else>
                                <template v-if="_item.IsWarning === 1">
                                  <div style="color: rgb(255 107 2)">
                                    <span>
                                      <i class="fad fa-exclamation-triangle"></i
                                    ></span>
                                    {{ _item.InfoName }}
                                  </div>
                                  <div style="color: rgb(255 107 2)">
                                    {{ _item.InfoValue
                                    }}<span>({{ _item.UnitName }})</span>
                                  </div>
                                </template>
                                <template v-else>
                                  <div>
                                    {{ _item.InfoName }}
                                  </div>
                                  <div>
                                    {{ _item.InfoValue
                                    }}<span>({{ _item.UnitName }})</span>
                                  </div>
                                </template>
                              </template>
                            </div>
                            <b-progress
                              class="mt-2"
                              v-if="_item.InfoValue >= 0"
                              :max="
                                (rangeColorValues.filter(
                                  (r) =>
                                    r.Properties[0].IndicatorCode ==
                                    _item.InfoCode
                                )[0].Maxvalue /
                                  rangeColorValues.filter(
                                    (r) =>
                                      r.Properties[0].IndicatorCode ==
                                      _item.InfoCode
                                  )[0].Maxvalue) *
                                100
                              "
                              height="5px"
                              style="position: relative"
                            >
                              <template
                                v-for="(item, index) in _item.arrDevice"
                              >
                                <b-progress-bar
                                  :key="index"
                                  :value="item.colorCM"
                                  :style="'background: ' + item.Color + ';'"
                                >
                                </b-progress-bar>
                              </template>
                              <div
                                v-if="
                                  (_item.InfoValue /
                                    _item.arrDevice[_item.arrDevice.length - 1]
                                      .ToValue) *
                                    100 <
                                  10
                                "
                                style="
                                  height: 20px;
                                  width: 2px;
                                  background-color: black;
                                  position: absolute;
                                "
                                :style="`left: calc(${
                                  (_item.InfoValue /
                                    _item.arrDevice[_item.arrDevice.length - 1]
                                      .ToValue) *
                                  100
                                }%)`"
                              ></div>
                              <div
                                v-else
                                style="
                                  height: 20px;
                                  width: 2px;
                                  background-color: black;
                                  position: absolute;
                                "
                                :style="`left: calc(${
                                  (_item.InfoValue /
                                    _item.arrDevice[_item.arrDevice.length - 1]
                                      .ToValue) *
                                  100
                                }% - 1%)`"
                              ></div>
                            </b-progress>
                            <div class="d-flex" v-if="_item.InfoValue >= 0">
                              <template
                                v-for="(item, index) in _item.arrDevice"
                              >
                                <div
                                  style="color: black; text-align: right"
                                  :key="index"
                                  :style="{ width: item.colorCM + '%' }"
                                >
                                  {{ item.ToValue }}
                                </div>
                              </template>
                            </div>
                          </div>
                        </template>
                      </template>
                      <template v-else>
                        <b-col lg="12">
                          <p
                            class="text-muted text-small font-italic text-left"
                          >
                            {{ $t("map.no-data") }}
                          </p>
                        </b-col>
                      </template>
                    </div>
                    <div class="mb-2">
                      <div
                        class="font-weight-bold list-item-heading pb-2 border-bottom text-capitalize"
                      >
                        {{ $t("dashboards.device-active") }}
                      </div>
                      <div class="d-flex flex-column mt-2">
                        <template
                          v-if="data.ListExtra && data.ListExtra.length > 0"
                        >
                          <template v-for="(__item, __index) in data.ListExtra">
                            <b-col
                              :key="__index"
                              class="d-flex justify-content-between align-items-center"
                            >
                              <template
                                v-if="parseInt(__item.ExtraStatus) === 1"
                              >
                                <b-img
                                  :src="
                                    'http://imgsmartcity.namlongtekgroup.com/Icon/green_' +
                                    __item.Icon.toLowerCase() +
                                    '.svg'
                                  "
                                  style="height: 40px"
                                  class="mb-2"
                                ></b-img>
                              </template>
                              <template v-else>
                                <b-img
                                  :src="
                                    'http://imgsmartcity.namlongtekgroup.com/Icon/red_' +
                                    __item.Icon.toLowerCase() +
                                    '.svg'
                                  "
                                  style="height: 40px"
                                  class="mb-2"
                                ></b-img>
                              </template>
                              <p class="text-muted font-weight-bold text-small">
                                {{ __item.StationExtraName }}
                              </p>
                              <template v-if="objectData.accessWrite">
                                <b-form-checkbox
                                  class="ml-2 mb-4"
                                  @change="
                                    extrasDevice(
                                      __item,
                                      !convertBitToBoolean(__item.ExtraStatus)
                                    )
                                  "
                                  :checked="
                                    convertBitToBoolean(__item.ExtraStatus)
                                  "
                                  name="check-button"
                                  switch
                                ></b-form-checkbox>
                              </template>
                              <template v-else>
                                <b-form-checkbox
                                  class="ml-2 mb-4"
                                  :checked="
                                    convertBitToBoolean(__item.ExtraStatus)
                                  "
                                  name="check-button"
                                  switch
                                  disabled
                                ></b-form-checkbox>
                              </template>
                            </b-col>
                          </template>
                        </template>
                        <template v-else>
                          <b-col lg="12">
                            <p
                              class="text-muted text-small font-italic text-left"
                            >
                              {{ $t("map.no-data") }}
                            </p>
                          </b-col>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aqua-custom-right">
            <div class="p-3">
              <div class="aqua-grid">
                <template v-if="data.ListNode && data.ListNode.length > 0">
                  <template v-for="(node, i) in data.ListNode">
                    <vue-perfect-scrollbar
                      :key="i"
                      class="scroll dashboard-list-with-thumbs"
                      :settings="{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }"
                      style="height: 32vh"
                    >
                      <div class="custom-body-node">
                        <p
                          class="font-weight-bold font-size-md text-white p-1"
                          style="background-color: #2a93d5"
                        >
                          <i class="fad fa-location mr-2"></i>
                          <strong>{{ node.StationNodeName }}</strong>
                        </p>
                        <div class="d-flex flex-column">
                          <template
                            v-if="
                              node.ListMonitoring &&
                              node.ListMonitoring.length > 0
                            "
                          >
                            <template
                              v-for="(monitor, i) in node.ListMonitoring"
                            >
                              <div :key="i">
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <template v-if="monitor.InfoValue < 0">
                                    <div style="color: red; margin-bottom: 8px">
                                      {{ monitor.InfoName }}
                                    </div>
                                    <div style="font-style: italic; color: red">
                                      {{ $t("dashboards.error") }}
                                    </div>
                                  </template>
                                  <template v-else>
                                    <template v-if="monitor.IsWarning === 1">
                                      <div style="color: rgb(255 107 2)">
                                        <span>
                                          <i
                                            class="fad fa-exclamation-triangle"
                                          ></i
                                        ></span>
                                        {{ monitor.InfoName }}
                                      </div>
                                      <div style="color: rgb(255 107 2)">
                                        {{ monitor.InfoValue
                                        }}<span>({{ monitor.UnitName }})</span>
                                      </div>
                                    </template>
                                    <template v-else>
                                      <div>
                                        {{ monitor.InfoName }}
                                      </div>
                                      <div>
                                        {{ monitor.InfoValue
                                        }}<span>({{ monitor.UnitName }})</span>
                                      </div>
                                    </template>
                                  </template>
                                </div>
                                <b-progress
                                  class="mt-2"
                                  v-if="monitor.InfoValue >= 0"
                                  :max="
                                    (rangeColorValues.filter(
                                      (r) =>
                                        r.Properties[0].IndicatorCode ==
                                        monitor.InfoCode
                                    )[0].Maxvalue /
                                      rangeColorValues.filter(
                                        (r) =>
                                          r.Properties[0].IndicatorCode ==
                                          monitor.InfoCode
                                      )[0].Maxvalue) *
                                    100
                                  "
                                  height="5px"
                                  style="position: relative"
                                >
                                  <template
                                    v-for="(item, index) in monitor.arrMonitor"
                                  >
                                    <b-progress-bar
                                      :key="index"
                                      :value="item.colorCM"
                                      :style="'background: ' + item.Color + ';'"
                                    >
                                    </b-progress-bar>
                                  </template>
                                  <div
                                    v-if="
                                      (monitor.InfoValue /
                                        monitor.arrMonitor[
                                          monitor.arrMonitor.length - 1
                                        ].ToValue) *
                                        100 <
                                      10
                                    "
                                    style="
                                      height: 20px;
                                      width: 2px;
                                      background-color: black;
                                      position: absolute;
                                    "
                                    :style="`left: calc(${
                                      (monitor.InfoValue /
                                        monitor.arrMonitor[
                                          monitor.arrMonitor.length - 1
                                        ].ToValue) *
                                      100
                                    }%)`"
                                  ></div>
                                  <div
                                    v-else
                                    style="
                                      height: 20px;
                                      width: 2px;
                                      background-color: black;
                                      position: absolute;
                                    "
                                    :style="`left: calc(${
                                      (monitor.InfoValue /
                                        monitor.arrMonitor[
                                          monitor.arrMonitor.length - 1
                                        ].ToValue) *
                                      100
                                    }% - 1%)`"
                                  ></div>
                                </b-progress>
                                <div
                                  class="d-flex"
                                  v-if="monitor.InfoValue >= 0"
                                >
                                  <template
                                    v-for="(item, index) in monitor.arrMonitor"
                                  >
                                    <div
                                      style="color: black; text-align: right"
                                      :key="index"
                                      :style="{ width: item.colorCM + '%' }"
                                    >
                                      {{ item.ToValue }}
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </template>
                          </template>
                          <template v-else>
                            <p class="p-3 text-muted text-small">
                              {{ $t("map.no-data") }}
                            </p>
                          </template>
                        </div>
                      </div>
                    </vue-perfect-scrollbar>
                  </template>
                </template>
                <template v-else>
                  <b-col lg="12">
                    <p class="text-muted text-small text-left">
                      {{ $t("map.no-data") }}
                    </p>
                  </b-col>
                </template>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </b-card>

    <b-modal
      id="modal-detail"
      ref="modal-detail"
      :title="titleForm"
      hide-header
      v-if="dataForm"
      @hidden="resetChartDetail"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <popup
        :dataModal="dataForm"
        :objectData="objectData"
        :rangeColorValues="rangeColorValues"
        @reload-data="handleReloadData"
      />
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import CusCirlePieSemi from "@/components/Charts/CusCirlePieSemi";
import aquacultureAPI from "@/api/modules/aquacultureAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import PopupDetailAqua from "@/views/app/dashboards/aquaculture/component/Aqua.vue";
import mapAPI from "@/api/modules/mapAPI";
import VueSpeedometer from "vue-speedometer";

export default {
  components: {
    "radial-chart-apex-two": RadialChartApexTwo,
    "cus-cirle-pie-semi": CusCirlePieSemi,
    "area-chart-apex": AreaChartApex,
    popup: PopupDetailAqua,
    VueSpeedometer,
  },
  props: ["data", "objectData", "indexStation", "rangeColorValues"],
  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      titleForm: null,
      dataForm: null,
      typeLoadData: "WEEK",
      dataChartStation: null,
      dataChartNode: [],
      isActive: this.indexStation === 0 ? true : false,
      dataMapNow: null,
      keyString: "Aqua;",
    };
  },
  watch: {
    data(to, from) {
      this.getMapNowByCode();
      this.isShow = false;
      setTimeout(() => {
        if (this.dataForm) {
          if (
            this.dataMapNow &&
            this.dataMapNow[0].DataProperties &&
            this.dataMapNow[0].DataProperties.length > 0
          ) {
            this.dataForm = this.dataMapNow[0].DataProperties.find(
              (el) => el.StationID == this.data.StationID
            );
          }
        }
        this.isShow = true;
      }, 1000);
    },
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 800);
  },
  methods: {
    async handleDetail(item) {
      let body = {
        DataCode: this.data.GeoCode,
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.dataMapNow = val.status ? val.data : null;
          if (
            this.dataMapNow &&
            this.dataMapNow[0].DataProperties &&
            this.dataMapNow[0].DataProperties.length > 0
          ) {
            this.dataForm = this.dataMapNow[0].DataProperties.find(
              (data) => data.StationID == item.StationID
            );
          }
          if (this.dataForm) {
            setTimeout(() => {
              this.$bvModal.show("modal-detail");
            }, this.timer);
          }
        })
        .catch((err) => console.log(err));
    },
    getMapNowByCode() {
      let body = {
        DataCode: this.keyString,
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.dataMapNow = val.status ? val.data : null;
        })
        .catch((err) => console.log(err));
    },

    handleReloadData() {
      this.$emit("get-data-dashboard");
    },
    handleActive() {
      this.$root.$on("bv::collapse::state", (id, state) => {
        this.isActive = state;
      });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataStationChart(type, station) {
      this.dataChartNode = [];
      let body = {
        StationID: station.StationID,
      };
      aquacultureAPI
        .aquaStationChart(type, body)
        .then((val) => {
          this.dataChartStation = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
      if (station.ListNode && station.ListNode.length > 0) {
        station.ListNode.forEach((node) => {
          let bodyNode = {
            NodeID: node.NodeID,
            UserIDCurent: this.userID,
          };
          aquacultureAPI
            .aquaNodeChart(type, bodyNode)
            .then((val) => {
              if (val.status) {
                this.dataChartNode.push({
                  name: node.StationNodeName,
                  data: val.data,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
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
    setTypeLoadData(type, station) {
      this.typeLoadData = type;
      this.getDataStationChart(type, station);
    },
    resetChartDetail() {
      this.typeLoadData = "WEEK";
      this.dataForm = null;
      this.titleForm = null;
      this.dataChartStation = null;
      this.dataChartNode = null;
      //this.handleReloadData()
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    },
    showChartDetail(title, data) {
      this.dataForm = data;
      this.titleForm = title.toUpperCase();
      this.getDataStationChart(this.typeLoadData, this.dataForm);
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, this.timer);
    },
    convertBitToBoolean(value) {
      return !!value;
    },
    extrasDevice(item, status) {
      let body = {
        ID: item.ID,
        ExtraStatus: handling.convertBooleanToBit(status),
      };
      aquacultureAPI
        .aquaStationExtrasControl(body)
        .then((val) => {
          if (val.status) {
            this.handleReloadData();
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          } else {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }
        })
        .catch((err) => console.log(err));
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    timerLoadDashboard(time) {
      if (this.dataForm) {
        this.getDataStationChart(this.typeLoadData, this.data);
        setTimeout(() => {
          this.timerLoadDashboard(time);
        }, time);
      }
    },
  },
  async created() {
    this.data.ListDeviceInfo = this.data.ListDeviceInfo.map((x) => {
      let t = this.rangeColorValues.filter(
        (y) => x.InfoCode === y.Properties[0].IndicatorCode
      );
      let u = t[0].Properties.map((c) => {
        return {
          ...c,
          colorCM:
            ((c.ToValue - c.FromValue) /
              t[0].Properties[t[0].Properties.length - 1].ToValue) *
            100,
        };
      });
      return {
        ...x,
        arrDevice: u,
      };
    });
    this.data.ListNode = this.data.ListNode.map((m) => {
      m.ListMonitoring = m.ListMonitoring.map((x) => {
        let t = this.rangeColorValues.filter(
          (y) => x.InfoCode === y.Properties[0].IndicatorCode
        );
        let u = t[0].Properties.map((c) => {
          return {
            ...c,
            colorCM:
              ((c.ToValue - c.FromValue) /
                t[0].Properties[t[0].Properties.length - 1].ToValue) *
              100,
          };
        });
        return {
          ...x,
          arrMonitor: u,
        };
      });
      return {
        ...m,
      };
    });
    await this.timerLoadDashboard(this.timer * 120);
  },
};
</script>
<style>
.current-value {
  font-size: 14px !important;
  fill: rgb(154 154 154) !important;
}
</style>
<style scoped>
.header:hover {
  background-color: rgb(200, 200, 200);
}
.aqua-custom-left {
  width: 35%;
}

.aqua-custom-right {
  width: 65%;
}

.h-img-wind {
  height: 225px;
}

/* .header:hover {
  background-color: rgb(200, 200, 200);
} */
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

.font-size-md {
  font-size: 16px;
}

.font-size-custom {
  font-size: 18px;
}

.aqua-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media only screen and (max-width: 46.1875em) {
  .aqua-custom-left {
    width: 100%;
  }

  .aqua-custom-right {
    width: 100%;
  }
}
</style>
