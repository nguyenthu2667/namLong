<template>
  <div>
    <div class="pb-3">
      <div class="wind-info-dashboard">
        <div class="bg-primary-wind position-relative box-shadow-custom">
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("report.location") }}
                </h6>
                <span class="font-md font-weight-bold text-white">{{
                  dataDashboard.LocationTotal
                }}</span>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-red"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-map-marker-alt box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-primary-wind position-relative box-shadow-custom">
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("form.camera-device") }}
                </h6>
                <div class="d-flex align-items-center mr-2">
                  <div class="font-md font-weight-bold text-white">
                    {{ dataDashboard.CameraTotal }} &nbsp;
                  </div>
                  <p class="mb-0 text-sm text-white">
                    (
                    <span class="text-white mr-1">{{
                      dataDashboard.CameraDisconnected
                    }}</span>
                    <span class="text-nowrap">{{
                      $t("dashboards.disconnect")
                    }}</span>
                    )
                  </p>
                </div>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-orange"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-cctv box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-primary-wind position-relative box-shadow-custom">
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("form.speaker-device") }}
                </h6>
                <div class="d-flex align-items-center mr-2">
                  <div class="font-md font-weight-bold text-white">
                    {{ dataDashboard.SpeakerTotal }} &nbsp;
                  </div>
                  <p class="mb-0 text-sm text-white">
                    (
                    <span class="text-white mr-1">{{
                      dataDashboard.SpeakerDisconnected
                    }}</span>
                    <span class="text-nowrap">{{
                      $t("dashboards.disconnect")
                    }}</span>
                    )
                  </p>
                </div>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-green"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-volume-up box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-primary-wind position-relative box-shadow-custom">
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("form.monitor-device") }}
                </h6>
                <div class="d-flex align-items-center mr-2">
                  <div class="font-md font-weight-bold text-white">
                    {{ dataDashboard.StationTotal }} &nbsp;
                  </div>
                  <p class="mb-0 text-sm text-white">
                    (
                    <span class="text-white mr-1">{{
                      dataDashboard.StationDisconnected
                    }}</span>
                    <span class="text-nowrap">{{
                      $t("dashboards.disconnect")
                    }}</span>
                    )
                  </p>
                </div>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-info"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-wind-turbine box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title-dashboard-wind">
      {{ $t("dashboards.detail-wind-power-pylon") }}
    </div>
    <b-row>
      <template v-for="(data, index) in dataLocations">
        <b-col cols="12" lg="6" :key="index">
          <b-card no-body class="mb-4">
            <div class="bg-color-title">
              <div class="py-2 px-2">
                <span>{{ data.LocationName }} |</span>
                <span>{{ data.LocationAddress }} </span>
              </div>
            </div>
            <div class="d-flex flex-column flex-lg-row">
              <div class="w-100 w-lg-40">
                <div class="px-2 py-2 h-100 h-lg-auto">
                  <template
                    v-if="
                      data.CameraProperties &&
                      data.CameraProperties.length > 0 &&
                      data.CameraProperties[0].DeviceStatus !== 0
                    "
                  >
                    <b-img
                      thumbnail
                      fluid
                      class="h-img-wind h-100 h-lg-auto"
                      @click="showModalCamera(data.Image)"
                      style="cursor: pointer"
                      :src="`https://apidev.namlongtekgroup.com/api/StationDevices/GetImage/1/${data.Image}`"
                    >
                    </b-img>
                    <b-modal
                      :id="`modal-cctv-report-${data.Image}`"
                      class="text-center"
                      size="xl"
                      centered
                      hide-header
                      hide-footer
                      scrollable
                      :body-class="'hide-relative-cctv'"
                      :content-class="'hide-content-relative-cctv'"
                      :no-close-on-backdrop="true"
                    >
                      <camera-full-wind
                        :dataCameraFull="data"
                        @hideCCTV="hideCCTV"
                      />
                    </b-modal>
                  </template>
                  <template v-else>
                    <b-img
                      thumbnail
                      fluid
                      class="h-img-wind w-100"
                      src="/assets/img/no-image.jpg"
                    ></b-img>
                  </template>
                </div>
              </div>
              <div class="w-100 w-lg-60">
                <div style="max-height: 28vh; overflow-y: auto">
                  <div class="px-2 py-2">
                    <div class="d-flex flex-column">
                      <div class="mb-2">
                        <div
                          class="font-weight-bold font-size-custom pb-2 border-bottom text-capitalize"
                        >
                          {{ $t("form.camera-device") }}
                        </div>
                        <template
                          v-if="
                            data.CameraProperties &&
                            data.CameraProperties.length > 0
                          "
                        >
                          <template v-for="(item, i) in data.CameraProperties">
                            <data-camera
                              :item="item"
                              :index="i"
                              :key="i"
                              :activeEl="data.activeEl"
                              @changeActive="changeActive"
                              @testHandle="handleChange(item)"
                            >
                            </data-camera>
                          </template>
                        </template>
                        <template v-else>
                          <p
                            class="mt-2 mb-0 text-white font-italic text-small"
                          >
                            {{ $t("panel.non-data") }}
                          </p>
                        </template>
                      </div>
                      <div class="mb-2">
                        <div
                          class="font-weight-bold font-size-custom pb-2 border-bottom text-capitalize"
                        >
                          {{ $t("form.speaker-device") }}
                        </div>
                        <template
                          v-if="
                            data.SpeakerProperties &&
                            data.SpeakerProperties.length > 0
                          "
                        >
                          <template v-for="(item, i) in data.SpeakerProperties">
                            <div
                              class="d-flex justify-content-between mt-2 text-size-md"
                              :key="i"
                            >
                              <div>{{ item.StationName }}</div>
                              <div>
                                <b-badge
                                  :class="{
                                    disconnected: item.SpeakerStatus === 0,
                                  }"
                                >
                                  {{
                                    item.SpeakerStatus === 1
                                      ? $t("dashboards.warning-fire.connected")
                                      : $t(
                                          "dashboards.warning-fire.disconnected"
                                        )
                                  }}
                                </b-badge>
                              </div>
                            </div>
                          </template>
                        </template>
                        <template v-else>
                          <p
                            class="mt-2 mb-0 text-white font-italic text-small"
                          >
                            {{ $t("panel.non-data") }}
                          </p>
                        </template>
                      </div>
                      <div class="mb-2">
                        <div
                          class="font-weight-bold font-size-custom pb-2 border-bottom text-capitalize"
                        >
                          {{ $t("form.monitor-device") }}
                        </div>
                        <template
                          v-if="
                            data.MonitorInfoProperties &&
                            data.MonitorInfoProperties.length > 0
                          "
                        >
                          <template
                            v-for="(item, i) in data.MonitorInfoProperties"
                          >
                            <div
                              class="d-flex justify-content-between mt-2 text-size-md color-danger"
                              :key="i"
                              v-if="+item.IndicatorValue < 0"
                            >
                              <div>{{ item.IndicatorName }}</div>
                              <div style="font-style: italic; font-weight: 700">
                                {{ $t("map.error-sensor") }}
                              </div>
                            </div>
                            <div
                              class="d-flex justify-content-between mt-2 text-size-md color-yellow"
                              :key="i"
                              v-else-if="item.IsWarning === 1"
                            >
                              <div>
                                {{ item.IndicatorName }}
                                <span
                                  ><i
                                    class="fad fa-exclamation-triangle font-size-custom"
                                  ></i
                                ></span>
                              </div>

                              <div style="font-style: italic">
                                {{ item.IndicatorValue }}
                                <span>{{ item.UnitName }}</span>
                              </div>
                            </div>
                            <div
                              class="d-flex justify-content-between mt-2 text-size-md"
                              :key="i"
                              v-else
                            >
                              <div>{{ item.IndicatorName }}</div>
                              <div style="font-style: italic">
                                {{ item.IndicatorValue }}
                                <span>{{ item.UnitName }}</span>
                              </div>
                            </div>
                          </template>
                        </template>
                        <template v-else>
                          <p
                            class="mt-2 mb-0 text-white font-italic text-small"
                          >
                            {{ $t("panel.non-data") }}
                          </p>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
import windAPI from "@/api/modules/windAPI";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DataCamera from "@/views/app/dashboards/wind/DataCamera";
import CameraFullWind from "@/views/app/dashboards/wind/CameraFullWind";

export default {
  components: {
    "data-camera": DataCamera,
    "camera-full-wind": CameraFullWind,
  },
  async created() {
    await this.getListMenuRight();
    await this.getDataDashboard();
  },

  // lấy mảng
  data() {
    return {
      imgFirst: "",
      menuRight: [],
      dataDashboard: [],
      dataLocations: [],
      dataTest: [],
      fieldsCamera: [
        {
          key: "StationName",
          label: "",
        },
        {
          key: "DeviceStatus",
          label: "",
        },
        {
          key: "See",
          label: "",
        },
      ],
      fieldsSpeaker: [
        {
          key: "StationName",
          label: "",
        },
        {
          key: "SpeakerStatus",
          label: "",
        },
      ],
      fieldsMonitor: [
        {
          key: "IndicatorName",
          label: "",
        },
      ],
      selectMode: "single",
      clickChangeChannel: null,
      arrNew: [],
      serviceURL: "http://192.168.100.5:54321",
    };
  },
  computed: {
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
    stopStream(sid) {
      fetch(`${this.serviceURL}/stop?SID=${sid}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.success && data.status === "STOP") {
            console.log("Stop streaming!");
          }
        });
    },
    hideCCTV(v) {
      this.stopStream(v.IDCCTV);
      this.$bvModal.hide(`modal-cctv-report-${v.Image}`);
    },
    showModalCamera(id) {
      setTimeout(() => {
        this.$bvModal.show(`modal-cctv-report-${id}`);
      }, 500);
    },
    changeActive(v, i) {
      this.dataLocations.forEach((x) => {
        if (x.CameraProperties && x.CameraProperties.length > 0) {
          x.CameraProperties.forEach((y) => {
            if (y.Channel === v.Channel && y.LocationID === v.LocationID) {
              x.activeEl = i;
            }
          });
        }
      });
    },
    handleChange(v) {
      this.dataTest = JSON.parse(JSON.stringify(this.arrNew));
      this.dataTest.forEach((x) => {
        if (x.CameraProperties && x.CameraProperties.length > 0) {
          x.CameraProperties.forEach((y) => {
            if (y.Channel === v.Channel && y.LocationID === v.LocationID) {
              x.Image = +v.Channel;
            }
          });
        }
      });
      this.dataLocations = JSON.parse(JSON.stringify(this.dataTest));
    },

    getDataDashboard() {
      windAPI
        .windDashboard()
        .then((val) => {
          this.dataDashboard = val.status ? val.data.Dashboard[0] : [];
          this.dataLocations = val.status ? val.data.Locations : [];
          this.dataTest = val.status ? val.data.Locations : [];
          this.dataTest = this.dataTest.map((x) => {
            return {
              ...x,
              activeEl: 0,
            };
          });
          this.arrNew = val.status ? val.data.Locations : [];
          this.arrNew = this.arrNew.map((x) => {
            return {
              ...x,
              activeEl: 0,
            };
          });
          this.dataLocations = this.dataLocations.map((x) => {
            return {
              ...x,
              activeEl: 0,
              Image: +x.CameraProperties[0].Channel,
            };
          });
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
  },
};
</script>

<style lang="scss" scoped>
.bg-primary-wind {
  background-image: linear-gradient(to right top, #104978, #3582b2, #3693ce);
  border-radius: 4px;
}

.bg-gradient-red {
  background: linear-gradient(87deg, #f5365c, #f56036) !important;
}

.bg-gradient-orange {
  background: linear-gradient(87deg, #fb6340, #fbb140) !important;
}

.bg-gradient-green {
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
}

.bg-gradient-info {
  background: linear-gradient(87deg, #11cdef, #1171ef) !important;
}
.box-center-wind {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box-shadow-custom {
  box-shadow: 0 1px 15px RGB(0 0 0 / 4%), 0 1px 6px RGB(0 0 0 / 4%);
}

.gap-4 {
  gap: 1rem;
}

.col-4-custom {
}

.border-color-custom {
  border-color: 1px solid #d7d7d7;
}

.connected {
  background-color: #120c6e !important;
  color: white;
}
.disconnected {
  background-color: #f5365c !important;
  color: white;
}

.bg-color-title {
  color: white;
  font-size: 16px;
  font-weight: 900;
  background-color: #2a93d5;
}

.font-size-custom {
  font-size: 18px;
}

.active {
  background-color: #d3d3d3;
  padding: 4px;
  border-radius: 4px;
}

.hover-bg:hover {
  background-color: #d1d1d1;
}

.title-dashboard-wind {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.wind-info-dashboard {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.text-size-md {
  font-size: 14px;
  font-weight: 500;
}

.color-danger {
  color: #f5365c;
}

.color-yellow {
  color: #fbb140;
}

.font-md {
  font-size: 1.5rem;
}

.h-img-wind {
  height: 220px;
}

// Mobile: width < 740px
@media only screen and (max-width: 46.1875em) {
  .wind-info-dashboard {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .h-img-wind {
    height: 150px;
  }
}
</style>
