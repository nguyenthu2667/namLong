<template>
  <b-card no-body class="" style="cursor: pointer" @click="handleDetail(data)">
    <div class="bg-color-title">
      <div class="py-2 px-2">
        <div
          v-b-tooltip.hover
          :title="data.StationName"
          class="font-size-md pb-1"
        >
          {{ data.StationName }}
        </div>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div class="w-40">
        <div class="px-2 py-2" style="height: 235px">
          <template v-if="data.StationImage && data.StationImage.length > 0">
            <b-img
              thumbnail
              fluid
              class="h-img-wind"
              style="cursor: pointer; object-fit: cover; height: 100%"
              :src="data.StationImage"
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
              <!-- <camera-full-wind :dataCameraFull="data" /> -->
            </b-modal>
          </template>
          <template v-else>
            <b-img
              thumbnail
              fluid
              class="h-img-wind"
              src="/assets/img/no-image.jpg"
            ></b-img>
          </template>
        </div>
      </div>
      <div class="w-60">
        <div style="max-height: 230px; overflow-y: auto">
          <div class="px-2 py-2">
            <div class="d-flex flex-column">
              <div class="mb-2">
                <div
                  class="font-weight-bold font-size-custom pb-2 border-bottom text-capitalize"
                >
                  {{ $t("form.monitor-index") }}
                </div>
                <template
                  v-if="
                    data.MonitorInfoProperties &&
                    data.MonitorInfoProperties.length > 0
                  "
                >
                  <template v-for="(monitor, i) in data.MonitorInfoProperties">
                    <div :key="i">
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <template
                          v-if="
                            monitor.InfoValue === -1 &&
                            monitor.InfoCode.toUpperCase() !== 'LVWATER'
                          "
                        >
                          <div style="color: red; margin-bottom: 8px">
                            {{ monitor.InfoName }}
                          </div>
                          <div style="font-style: italic; color: red">
                            {{ $t("dashboards.error") }}
                          </div>
                        </template>
                        <template v-else-if="monitor.IsWarning === 1">
                          <div style="color: rgb(255 107 2)">
                            <span>
                              <i class="fad fa-exclamation-triangle"></i
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
                      </div>
                      <b-progress
                        class="mt-2"
                        :max="
                          (data.ListIndicator.filter(
                            (r) => r.IndicatorCode == monitor.InfoCode
                          )[0].Maxvalue /
                            data.ListIndicator.filter(
                              (r) => r.IndicatorCode == monitor.InfoCode
                            )[0].Maxvalue) *
                          100
                        "
                        height="5px"
                        style="position: relative"
                      >
                        <template
                          v-if="
                            monitor.arrMonitor && monitor.arrMonitor.length > 0
                          "
                        >
                          <template v-for="(item, index) in monitor.arrMonitor">
                            <b-progress-bar
                              :key="index"
                              :value="item.colorCM"
                              :style="'background: ' + item.Color + ';'"
                            >
                            </b-progress-bar>
                          </template>
                        </template>
                        <template v-else>
                          <template
                            v-for="(item, index) in monitor.arrMonitorNull"
                          >
                            <b-progress-bar
                              :key="index"
                              :value="item.colorCM"
                              :style="'background: ' + item.Color + ';'"
                            >
                            </b-progress-bar>
                          </template>
                        </template>
                        <div
                          v-if="
                            ((monitor.InfoValue - monitor.minValue) /
                              monitor.totalValue) *
                              100 <
                            98
                          "
                          style="
                            height: 20px;
                            width: 2px;
                            background-color: black;
                            position: absolute;
                          "
                          :style="`left: calc(${
                            monitor.InfoValue < monitor.minValue
                              ? 0
                              : ((monitor.InfoValue - monitor.minValue) /
                                  monitor.totalValue) *
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
                            monitor.InfoValue < monitor.minValue
                              ? 0
                              : ((monitor.InfoValue - monitor.minValue) /
                                  monitor.totalValue) *
                                100
                          }% - 1%)`"
                        ></div>
                      </b-progress>
                      <template
                        v-if="
                          monitor.arrMonitor && monitor.arrMonitor.length > 0
                        "
                      >
                        <div class="d-flex">
                          <template v-for="(item, index) in monitor.arrMonitor">
                            <div
                              style="color: black; text-align: left"
                              :key="index"
                              v-if="item.FromValue"
                            >
                              {{ item.FromValue }}
                            </div>
                            <div
                              style="color: black; text-align: right"
                              :key="index + 'a'"
                              :style="{
                                width: item.colorCM + '%',
                              }"
                            >
                              {{ item.ToValue }}
                            </div>
                          </template>
                        </div>
                      </template>
                      <template v-else>
                        <div class="d-flex justify-content-between">
                          <template
                            v-for="(item, index) in monitor.arrMonitorNull"
                          >
                            <div style="color: black" :key="index">
                              {{ item.valueCustom }}
                            </div>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <p class="mt-2 mb-0 text-white font-italic text-small">
                    {{ $t("panel.non-data") }}
                  </p>
                </template>
              </div>
              <div class="mb-2">
                <div
                  class="font-weight-bold font-size-custom pb-2 border-bottom text-capitalize"
                >
                  {{ $t("report.aqua.fields-current.info-device") }}
                </div>
                <template
                  v-if="
                    data.DeviceInfoProperties &&
                    data.DeviceInfoProperties.length > 0
                  "
                >
                  <template v-for="(device, i) in data.DeviceInfoProperties">
                    <template v-if="device.InfoCode == 'SW'">
                      <b-col :key="i" lg="2" class="text-center mb-4">
                        <b-img
                          v-if="device.InfoValue == 'Close'"
                          :src="require('@/assets/img/monitor-icon/close.png')"
                          style="width: 115px; height: 113px"
                        ></b-img>
                        <b-img
                          v-else
                          :src="require('@/assets/img/monitor-icon/open.png')"
                          style="width: 115px; height: 113px"
                        ></b-img>
                        <p
                          class="text-small text-muted"
                          :style="`
                          color:grey  !important;
                          font-weight: 600;
                          font-size: 14px;
                          text-align: center;`"
                        >
                          {{ device.InfoName }} ({{
                            device.InfoValue == "Close"
                              ? $t("modal.device-close")
                              : $t("modal.device-open")
                          }})
                        </p>
                      </b-col>
                    </template>
                    <template v-else-if="device.InfoCode !== 'IMG'">
                      <div :key="i">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <template
                            v-if="
                              device.InfoValue === -1 &&
                              device.InfoCode.toUpperCase() !== 'LVWATER'
                            "
                          >
                            <div style="color: red; margin-bottom: 8px">
                              {{ device.InfoName }}
                            </div>
                            <div style="font-style: italic; color: red">
                              {{ $t("dashboards.error") }}
                            </div>
                          </template>
                          <template v-else-if="device.IsWarning === 1">
                            <div style="color: rgb(255 107 2)">
                              <span>
                                <i
                                  style="color: #cf091c; font-size: 16px"
                                  class="fad fa-exclamation-triangle"
                                ></i
                              ></span>
                              {{ device.InfoName }}
                            </div>
                            <div style="color: rgb(255 107 2)">
                              {{ device.InfoValue
                              }}<span>({{ device.UnitName }})</span>
                            </div>
                          </template>
                          <template v-else>
                            <div>
                              {{ device.InfoName }}
                            </div>
                            <div>
                              {{ device.InfoValue
                              }}<span>({{ device.UnitName }})</span>
                            </div>
                          </template>
                        </div>
                        <b-progress
                          class="mt-2"
                          :max="
                            (data.ListIndicator.filter(
                              (r) => r.IndicatorCode == device.InfoCode
                            )[0].Maxvalue /
                              data.ListIndicator.filter(
                                (r) => r.IndicatorCode == device.InfoCode
                              )[0].Maxvalue) *
                            100
                          "
                          height="5px"
                          style="position: relative"
                        >
                          <template
                            v-if="device.arrHandle && device.arrHandle.length"
                          >
                            <template v-for="(item, index) in device.arrHandle">
                              <b-progress-bar
                                :key="index"
                                :value="item.colorCM"
                                :style="'background: ' + item.Color + ';'"
                              >
                              </b-progress-bar>
                            </template>
                          </template>
                          <template v-else>
                            <template
                              v-for="(item, index) in device.arrHandleNull"
                            >
                              <b-progress-bar
                                :key="index"
                                :value="item.colorCM"
                                :style="'background: ' + item.Color + ';'"
                              >
                              </b-progress-bar>
                            </template>
                          </template>
                          <div
                            v-if="
                              ((device.InfoValue - device.minValue) /
                                device.totalValue) *
                                100 <
                              98
                            "
                            style="
                              height: 20px;
                              width: 2px;
                              background-color: black;
                              position: absolute;
                            "
                            :style="`left: calc(${
                              ((device.InfoValue < device.minValue
                                ? 0
                                : device.InfoValue - device.minValue) /
                                device.totalValue) *
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
                              device.InfoValue < device.minValue
                                ? 0
                                : ((device.InfoValue - device.minValue) /
                                    device.totalValue) *
                                  100
                            }% - 1%)`"
                          ></div>
                        </b-progress>
                        <template
                          v-if="device.arrHandle && device.arrHandle.length > 0"
                        >
                          <div class="d-flex">
                            <template v-for="(item, index) in device.arrHandle">
                              <div
                                style="color: black; text-align: left"
                                :key="index"
                                :style="{ width: item.colorCM + '%' }"
                              >
                                {{ item.FromValue }}
                              </div>
                              <div
                                style="color: black; text-align: right"
                                :key="index + 'b'"
                                :style="{ width: item.colorCM + '%' }"
                              >
                                {{ item.ToValue }}
                              </div>
                            </template>
                          </div>
                        </template>
                        <template v-else>
                          <div class="d-flex justify-content-between">
                            <template
                              v-for="(item, index) in device.arrHandleNull"
                            >
                              <div style="color: black" :key="index">
                                {{ item.valueCustom }}
                              </div>
                            </template>
                          </div>
                        </template>
                      </div>
                    </template>
                  </template>
                </template>
                <template v-else>
                  <p class="mt-2 mb-0 text-white font-italic text-small">
                    {{ $t("panel.non-data") }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center p-1 bg-bottom-item"
    >
      <div>
        <i class="fad fa-clock"></i>
        {{ data.UpdateTime }}
      </div>
      <template v-if="data.StatusID === 3">
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
      <template v-else-if="data.StatusID === 1">
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
      <template v-else-if="data.StatusID === 2">
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
    <b-modal
      id="modal-detail"
      ref="modal-detail"
      hide-header
      v-if="dataForm"
      @hidden="resetChartDetail"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <popup :data-parent="dataForm" />
    </b-modal>
  </b-card>
</template>

<script>
import EnvironmentPopup from "@/views/app/map/popup-modals/Environment";
import moment from "moment";
import handling from "@/constants/handling";

import { timer } from "@/constants/config";

export default {
  components: {
    popup: EnvironmentPopup,
  },
  props: ["data", "objectData", "dataMapNow"],
  watch: {
    data(to, from) {
      this.isShow = false;
      setTimeout(() => {
        if (this.dataForm) {
          if (this.dataMapNow && this.dataMapNow.length > 0) {
            this.dataForm = this.dataMapNow.find(
              (el) => el.StationID == this.data.StationID
            );
          }
        }
        this.isShow = true;
      }, 700);
    },
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 700);
  },
  data() {
    return {
      keyString: null,
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      titleForm: null,
      dataForm: null,
      typeLoadData: "DAY",
      dataChart: null,
      dataReport: null,
      selectReportOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionReport: [
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
      selectTypeReport: {
        label: "Cảnh báo",
        value: "Warn",
      },
      optionTypeReport: [
        {
          label: "Cảnh báo",
          value: "Warn",
        },
        {
          label: "Lỗi thiết bị",
          value: "Error",
        },
      ],
      fieldReport: [
        {
          key: "IndicatorName",
          label: "Tên",
          tdClass: "text-center",
        },
        {
          key: "IndicatorValue",
          label: "Giá trị",
          tdClass: "text-center",
          formatter: (value, key, item) => {
            if (!value) {
              return "Không có giá trị";
            } else {
              return value + " " + item.UnitName;
            }
          },
        },
        {
          key: "WarningName",
          label: "Cảnh báo",
          tdClass: "text-center",
        },
        {
          key: "CreateTime",
          label: "Thời gian",
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
    };
  },

  computed: {
    isStatusCabinet: function () {
      let result = null;
      if (this.data && this.data.DeviceInfoProperties) {
        result = this.data.DeviceInfoProperties.find(
          (x) => x.IndicatorCode === "OPEN"
        );
        return result ? result : null;
      } else {
        return result;
      }
    },
  },
  async created() {
    await this.timerLoadDashboard(this.timer * 240);
  },
  methods: {
    timerLoadDashboard(time) {
      this.data.DeviceInfoProperties = this.handleDeviceRangeColor(
        this.data.DeviceInfoProperties
      );
      this.data.MonitorInfoProperties = this.handleMonitorRangeColor(
        this.data.MonitorInfoProperties
      );
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
    handleMonitorRangeColor(monitorInfoProperties) {
      return monitorInfoProperties.map((x) => {
        let filteredCator = this.data.ListIndicator.filter(
          (y) => x.InfoCode === y.IndicatorCode
        );
        let formatCator = filteredCator[0].Properties.map((c, index) => {
          let percentRange =
            ((c.ToValue - c.FromValue) /
              (filteredCator[0].Maxvalue +
                Math.abs(filteredCator[0].MinValue))) *
            100;
          if (index === 0) {
            return {
              ...c,
              colorCM: percentRange,
              ToValue: percentRange > 12 ? c.ToValue : "",
            };
          }
          return {
            ...c,
            colorCM: percentRange,
            ToValue: percentRange > 12 ? c.ToValue : "",
            FromValue: null,
          };
        });
        let totalValue =
          Math.abs(filteredCator[0].Maxvalue) +
          Math.abs(filteredCator[0].MinValue);
        if (formatCator && formatCator.length > 0) {
          return {
            ...x,
            arrMonitor: formatCator,
            totalValue,
            minValue: filteredCator[0].MinValue,
          };
        } else {
          return {
            ...x,
            arrMonitorNull: [
              {
                Color: "#2993d4",
                colorCM: 100,
                valueCustom: filteredCator[0].MinValue,
              },
              {
                Color: "#2993d4",
                colorCM: 100,
                valueCustom: filteredCator[0].Maxvalue,
              },
            ],
            totalValue,
            minValue: filteredCator[0].MinValue,
          };
        }
      });
    },
    handleDeviceRangeColor(deviceInfoProperties) {
      return deviceInfoProperties.map((x) => {
        if (x.InfoCode !== "IMG") {
          let filteredCator = this.data.ListIndicator.filter(
            (y) => x.InfoCode === y.IndicatorCode
          );
          let formatCator = filteredCator[0].Properties.map((c, index) => {
            let percentRange =
              ((c.ToValue - c.FromValue) /
                (filteredCator[0].Maxvalue +
                  Math.abs(filteredCator[0].MinValue))) *
              100;
            if (index === 0) {
              return {
                ...c,
                colorCM: percentRange,
              };
            }
            return {
              ...c,
              colorCM: percentRange,
              FromValue: null,
            };
          });
          let totalValue =
            Math.abs(filteredCator[0].Maxvalue) +
            Math.abs(filteredCator[0].MinValue);
          if (formatCator && formatCator.length > 0) {
            return {
              ...x,
              arrHandle: formatCator,
              totalValue,
              minValue: filteredCator[0].MinValue,
            };
          } else {
            return {
              ...x,
              arrHandleNull: [
                {
                  Color: "#2993d4",
                  colorCM: 100,
                  valueCustom: filteredCator[0].MinValue,
                },
                {
                  Color: "#2993d4",
                  colorCM: 100,
                  valueCustom: filteredCator[0].Maxvalue,
                },
              ],
              totalValue,
              minValue: filteredCator[0].MinValue,
            };
          }
        } else {
          return {
            ...x,
          };
        }
      });
    },
    async handleDetail(item) {
      if (this.dataMapNow && this.dataMapNow.length > 0) {
        this.dataForm = this.dataMapNow[0].DataProperties.find(
          (data) => data.StationID == item.StationID
        );
      }
      if (this.dataForm) {
        setTimeout(() => {
          this.$bvModal.show("modal-detail");
        }, this.timer);
      }
    },
    showDetail(item) {
      this.dataForm = item;
      this.titleForm = this.$t("pages.info").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, this.timer);
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    resetChartDetail() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
      this.typeLoadData = "DAY";
      this.dataChart = null;
      this.titleForm = null;
      this.dataForm = null;
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
  },
};
</script>
<style>
.h-img-wind {
  width: 100%;
  height: 28vh;
}
.current-value {
  font-size: 14px !important;
  fill: rgb(154 154 154) !important;
}
</style>
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

.font-size-md {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.font-size-lg {
  font-size: 18px;
}

.bg-color-title {
  color: white;
  font-weight: 900;
  background-color: #2a93d5;
}

.bg-bottom-item {
  background-color: #e1e1e1;
  padding: 0.5rem 0.5rem !important;
}
</style>
