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
            {{
              dataModal.Long
                ? dataModal.Lat + ", " + dataModal.Long
                : dataModal.StationLat + ", " + dataModal.StationLong
            }}
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
          <strong>
            {{
              dataModal.StatusName ? dataModal.StatusName.toUpperCase() : null
            }}
          </strong>
        </b-alert>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-col lg="12">
        <b-tabs content-class="mt-1" fill>
          <b-overlay :show="!isShow" rounded="sm">
            <b-tab title="CHỈ SỐ HIỆN TẠI" active @click="handleClick()">
              <div class="d-flex flex-row">
                <div class="w-60">
                  <template v-if="checkImg">
                    <div
                      :key="iImg"
                      v-for="(
                        deviceImg, iImg
                      ) in dataModal.DeviceInfoProperties.filter(
                        (x) => x.InfoCode === 'IMG'
                      )"
                    >
                      <b-img
                        :key="iImg"
                        id="image-station"
                        :src="deviceImg.InfoValue"
                        style="cursor: pointer; width: 100%"
                        @click="openFullscreen('image-station')"
                      ></b-img>

                      <p class="mt-2 font-weight-bold text-muted text-center">
                        {{ deviceImg.InfoName }}
                      </p>
                    </div>
                  </template>
                  <div v-else>
                    <b-img
                      id="image-station"
                      src="/assets/img/no-image.png"
                      style="cursor: pointer; width: 100%"
                    ></b-img>
                  </div>
                </div>

                <div class="w-40">
                  <div class="px-4 py-4">
                    <div class="d-flex flex-column">
                      <div>
                        <div>
                          <b class="mr-2">
                            <i class="fas fa-sliders-h mr-2"></i>
                            {{ $t("form.monitor-index").toUpperCase() }}
                          </b>
                        </div>
                        <div>
                          <template
                            v-if="
                              dataModal.MonitorInfoProperties &&
                              dataModal.MonitorInfoProperties.length > 0
                            "
                          >
                            <template
                              v-for="(
                                monitor, iMonitor
                              ) in dataModal.MonitorInfoProperties"
                            >
                              <div :key="iMonitor">
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <template v-if="monitor.IndicatorValue < 0">
                                    <div style="color: red">
                                      {{ monitor.IndicatorName }}
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
                                        {{ monitor.IndicatorName }}
                                      </div>
                                      <div style="color: rgb(255 107 2)">
                                        {{ monitor.IndicatorValue
                                        }}<span>({{ monitor.UnitName }})</span>
                                      </div>
                                    </template>
                                    <template v-else>
                                      <div>
                                        {{ monitor.IndicatorName }}
                                      </div>
                                      <div>
                                        {{ monitor.IndicatorValue
                                        }}<span>({{ monitor.UnitName }})</span>
                                      </div>
                                    </template>
                                  </template>
                                </div>
                                <b-progress
                                  class="mt-2"
                                  v-if="monitor.IndicatorValue >= 0"
                                  :max="
                                    (rangeColorValues.filter(
                                      (r) =>
                                        r.Properties[0].IndicatorCode ==
                                        monitor.IndicatorCode
                                    )[0].Maxvalue /
                                      rangeColorValues.filter(
                                        (r) =>
                                          r.Properties[0].IndicatorCode ==
                                          monitor.IndicatorCode
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
                                      (monitor.IndicatorValue /
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
                                      (monitor.IndicatorValue /
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
                                      (monitor.IndicatorValue /
                                        monitor.arrMonitor[
                                          monitor.arrMonitor.length - 1
                                        ].ToValue) *
                                      100
                                    }% - 1%)`"
                                  ></div>
                                </b-progress>
                                <div
                                  class="d-flex"
                                  v-if="monitor.IndicatorValue >= 0"
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
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <b class="mr-2">
                          <i class="fas fa-sliders-h mr-2"></i>
                          {{
                            $t(
                              "report.aqua.fields-current.info-device"
                            ).toUpperCase()
                          }}
                        </b>
                      </div>
                      <div>
                        <template
                          v-if="
                            dataModal.DeviceInfoProperties &&
                            dataModal.DeviceInfoProperties.length > 0
                          "
                        >
                          <template
                            v-for="(
                              device, iDevice
                            ) in dataModal.DeviceInfoProperties"
                          >
                            <template v-if="device.InfoCode == 'SW'">
                              <div :key="iDevice">
                                <b-img
                                  v-if="device.InfoValue == 'Close'"
                                  :src="
                                    require('@/assets/img/monitor-icon/close.png')
                                  "
                                  style="width: 115px; height: 113px"
                                ></b-img>
                                <b-img
                                  v-else
                                  :src="
                                    require('@/assets/img/monitor-icon/open.png')
                                  "
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
                              </div>
                            </template>
                            <template v-else-if="device.InfoCode !== 'IMG'">
                              <div :key="iDevice">
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <template v-if="device.InfoValue < 0">
                                    <div style="color: red">
                                      {{ device.InfoName }}
                                    </div>
                                    <div style="font-style: italic; color: red">
                                      {{ $t("dashboards.error") }}
                                    </div>
                                  </template>
                                  <template v-else>
                                    <template v-if="device.IsWarning === 1">
                                      <div style="color: rgb(255 107 2)">
                                        <span>
                                          <i
                                            style="
                                              color: #cf091c;
                                              font-size: 16px;
                                            "
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
                                  </template>
                                </div>
                                <b-progress
                                  class="mt-2"
                                  v-if="device.InfoValue >= 0"
                                  :max="
                                    (rangeColorValues.filter(
                                      (r) =>
                                        r.Properties[0].IndicatorCode ==
                                        device.InfoCode
                                    )[0].Maxvalue /
                                      rangeColorValues.filter(
                                        (r) =>
                                          r.Properties[0].IndicatorCode ==
                                          device.InfoCode
                                      )[0].Maxvalue) *
                                    100
                                  "
                                  height="5px"
                                  style="position: relative"
                                >
                                  <template
                                    v-for="(item, index) in device.arrHandle"
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
                                      (device.InfoValue /
                                        device.arrHandle[
                                          device.arrHandle.length - 1
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
                                      (device.InfoValue /
                                        device.arrHandle[
                                          device.arrHandle.length - 1
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
                                      (device.InfoValue /
                                        device.arrHandle[
                                          device.arrHandle.length - 1
                                        ].ToValue) *
                                      100
                                    }% - 1%)`"
                                  ></div>
                                </b-progress>
                                <div class="d-flex">
                                  <template
                                    v-for="(item, index) in device.arrHandle"
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
                        </template>
                        <template v-else>
                          <b-col lg="12" class="mb-4">
                            <p class="text-muted text-small font-italic">
                              {{ $t("map.no-data") }}
                            </p>
                          </b-col>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab
              :title="$t('tabs.title.analysis-chart').toUpperCase()"
              @click="handleClick('CHART')"
            >
              <b-row>
                <b-col md="12" class="text-center mb-3 mt-2">
                  <ul class="button-wrapper">
                    <li
                      class="custom-type-load-li"
                      id="day"
                      :class="{
                        active: typeLoadData === 'DAY',
                        'none-click': typeLoadData === 'DAY',
                      }"
                      @click="setTypeLoadData('DAY', dataModal)"
                    >
                      <label class="custom-type-load-label" id="l0">
                        {{ $t("dashboards.day") }}
                      </label>
                    </li>
                    <li
                      class="custom-type-load-li"
                      id="week"
                      :class="{
                        active: typeLoadData === 'WEEK',
                        'none-click': typeLoadData === 'WEEK',
                      }"
                      @click="setTypeLoadData('WEEK', dataModal)"
                    >
                      <label class="custom-type-load-label" id="l1">
                        {{ $t("dashboards.week") }}
                      </label>
                    </li>
                    <li
                      class="custom-type-load-li"
                      id="month"
                      :class="{
                        active: typeLoadData === 'MONTH',
                        'none-click': typeLoadData === 'MONTH',
                      }"
                      @click="setTypeLoadData('MONTH', dataModal)"
                    >
                      <label class="custom-type-load-label" id="l2">
                        {{ $t("dashboards.month") }}
                      </label>
                    </li>
                    <li
                      class="custom-type-load-li"
                      id="year"
                      :class="{
                        active: typeLoadData === 'YEAR',
                        'none-click': typeLoadData === 'YEAR',
                      }"
                      @click="setTypeLoadData('YEAR', dataModal)"
                    >
                      <label class="custom-type-load-label" id="l3">
                        {{ $t("dashboards.year") }}
                      </label>
                    </li>
                  </ul>
                </b-col>
                <template v-if="dataChart && dataChart.length > 0">
                  <template v-if="dataChart.length === 1">
                    <template v-for="(data, index) in dataChart">
                      <b-col :key="index" xl="12" lg="12" class="text-center">
                        <area-chart-apex
                          v-if="isShow"
                          :area-chart="{ series: areaChartConvert(data) }"
                        ></area-chart-apex>
                        <p class="text-muted font-weight-bold">
                          {{
                            data.IndicatorName.toUpperCase() +
                            " (" +
                            data.UnitName +
                            ")"
                          }}
                        </p>
                      </b-col>
                    </template>
                  </template>
                  <template v-else>
                    <b-col md="12">
                      <b-row>
                        <template v-for="(data, index) in dataChart">
                          <b-col
                            :key="index"
                            xl="6"
                            lg="12"
                            class="text-center"
                          >
                            <area-chart-apex
                              :area-chart="{ series: areaChartConvert(data) }"
                            ></area-chart-apex>
                            <p class="text-muted font-weight-bold">
                              {{
                                data.IndicatorName.toUpperCase() +
                                " (" +
                                data.UnitName +
                                ")"
                              }}
                            </p>
                          </b-col>
                        </template>
                      </b-row>
                    </b-col>
                  </template>
                </template>
                <template v-else>
                  <b-col lg="12" class="text-center">
                    <p class="text-muted text-small font-italic">
                      {{ $t("map.no-data") }}
                    </p>
                  </b-col>
                </template>
              </b-row>
            </b-tab>
            <b-tab title="BÁO CÁO VƯỢT MỨC, LỖI">
              <b-row>
                <b-col lg="6"></b-col>
                <b-col lg="6" class="text-right mb-3">
                  <b-dropdown
                    :text="selectTypeReport.label"
                    size="xs"
                    variant="outline-secondary"
                    class="float-none-xs mt-2"
                  >
                    <b-dropdown-item
                      v-for="(item, index) in optionTypeReport"
                      @click="changeTypeReport(item)"
                      :key="index"
                    >
                      {{ item.label }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown
                    :text="selectReportOption.label"
                    size="xs"
                    variant="outline-secondary"
                    class="float-none-xs mt-2"
                  >
                    <b-dropdown-item
                      v-for="(item, index) in optionReport"
                      @click="changeReportOption(item)"
                      :key="index"
                    >
                      {{ item.label }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>
                <b-col lg="12">
                  <template v-if="dataReport && dataReport.length > 0">
                    <b-table
                      :fields="fieldReport"
                      :items="dataReport"
                      :select-mode="selectMode"
                      :row-page="10"
                      class="text-center"
                      :per-page="perPage"
                      :current-page="currentPage"
                    >
                      <template v-slot:cell(WarningName)="row">
                        <b-badge
                          pill
                          :style="
                            'background-color:' +
                            'orange' +
                            '!important; font-size: 88%;color:black;'
                          "
                        >
                          {{ row.item.WarningName }}
                        </b-badge>
                      </template>
                    </b-table>
                    <b-pagination
                      size="sm"
                      align="center"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                    >
                      <template v-slot:next-text>
                        <i class="simple-icon-arrow-right" />
                      </template>
                      <template v-slot:prev-text>
                        <i class="simple-icon-arrow-left" />
                      </template>
                      <template v-slot:first-text>
                        <i class="simple-icon-control-start" />
                      </template>
                      <template v-slot:last-text>
                        <i class="simple-icon-control-end" />
                      </template>
                    </b-pagination>
                  </template>
                  <template v-else>
                    <p
                      class="p-3 text-center text-muted text-small font-italic"
                    >
                      {{ $t("map.no-data") }}
                    </p>
                  </template>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('list-image-setting').toUpperCase()">
              <b-row v-if="dataImages && dataImages.length > 0">
                <template v-for="(img, index) in dataImages">
                  <b-col lg="4 mb-2" :key="index">
                    <div style="height: 250px">
                      <b-img
                        style="width: 100%; height: 100%"
                        :src="img.ImageLink"
                        alt="Image"
                        @click="showWallpaper(dataImages, index)"
                      ></b-img>
                    </div>
                  </b-col>
                </template>
              </b-row>
              <template v-else>
                <p class="text-center text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-tab>
          </b-overlay>
        </b-tabs>
      </b-col>
    </b-row>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import AreaChartApex from "@/components/Charts/LineChartDashed";
import {
  monitorDashboardAnalytics,
  masterMonitorReport,
} from "@/data/modules/monitor";
import RadialChartApexSemi from "@/components/Charts/RadialChartApexSemi";
import systemAPI from "@/api/modules/systemAPI";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import VueSpeedometer from "vue-speedometer";
import TreeVue from "../../../category/tree/Tree.vue";

export default {
  components: {
    "radial-chart-apex-semi": RadialChartApexSemi,
    "area-chart-apex": AreaChartApex,
    VueSpeedometer,
    "custom-carousel-component": BCarouselComponent,
  },
  props: ["dataModal", "rangeColorValues"],
  name: "Environment",
  data() {
    return {
      checkImg: null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      isShow: false,
      animated: true,
      typeLoadData: "DAY",
      dataChart: null,
      selectMode: "single",
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
      // module-img
      keyString: this.dataModal.DataTypeName,
      dataImages: null,
      listImage: null,
    };
  },
  created() {
    this.dataModal.DeviceInfoProperties.forEach((x) => {
      if (x.InfoCode === "IMG") {
        this.checkImg = true;
      } else {
        this.checkImg = false;
      }
    });
    this.dataModal.MonitorInfoProperties =
      this.dataModal.MonitorInfoProperties.map((x) => {
        let t = this.rangeColorValues.filter(
          (y) => x.IndicatorCode === y.Properties[0].IndicatorCode
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

    this.dataModal.DeviceInfoProperties =
      this.dataModal.DeviceInfoProperties.map((x) => {
        if (x.InfoCode !== "IMG") {
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
            arrHandle: u,
          };
        } else {
          return {
            ...x,
          };
        }
      });
  },
  mounted() {
    this.getImages();
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 300);
  },
  watch: {
    dataModal(to, from) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 300);
    },
  },
  methods: {
    //module-img
    showWallpaper(list, key) {
      let result = [];
      list.map((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.ImageLink, //img
        };
        result.push(obj);
      });
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });
      this.listImage = result;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.dataModal.StationID,
        GeoCode: this.keyString,
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    //
    changeReportOption(item) {
      this.selectReportOption = item;
      this.getDataReport();
    },
    changeTypeReport(item) {
      this.selectTypeReport = item;
      this.getDataReport();
    },
    getDataReport() {
      let body = {
        Type: this.selectReportOption.value,
        StationID: this.dataModal.StationID,
        ReportType: this.selectTypeReport.value,
      };
      masterMonitorReport(body)
        .then((val) => {
          this.dataReport = val.status ? val.data : [];
          this.totalRows = this.dataReport.length;
        })
        .catch((err) => console.log(err));
    },
    handleClick(key) {
      this.isShow = false;
      if (key === "CHART") {
        this.getDataChart(this.typeLoadData, this.dataModal);
      }
      setTimeout(() => {
        this.isShow = true;
      }, 10);
    },
    setTypeLoadData(type, station) {
      this.typeLoadData = type;
      this.getDataChart(type, station);
    },
    getDataChart(type, station) {
      let body = {
        UserIDCurent: this.userID,
        StationID: station.StationID,
        Type: type,
      };
      monitorDashboardAnalytics(body)
        .then((val) => {
          this.dataChart = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    areaChartConvert(data) {
      let seriesArea = [];
      let objArea1 = {
        name: this.$t("dashboards.avg") + " (" + data.UnitName + ")",
        data: [],
      };
      let objArea2 = {
        name: this.$t("dashboards.min") + " (" + data.UnitName + ")",
        data: [],
      };
      let objArea3 = {
        name: this.$t("dashboards.max") + " (" + data.UnitName + ")",
        data: [],
      };
      let objAreaData = data.Properties;
      if (objAreaData && objAreaData.length > 0) {
        for (let k = 0; k < objAreaData.length; k++) {
          objArea1.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemHH),
            parseFloat(objAreaData[k].AverageValue),
          ]);
          objArea2.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemHH),
            parseFloat(objAreaData[k].MinValue),
          ]);
          objArea3.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemHH),
            parseFloat(objAreaData[k].MaxValue),
          ]);
        }
      }
      seriesArea.push(objArea1);
      seriesArea.push(objArea2);
      seriesArea.push(objArea3);
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
/* module-img */
#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}
</style>
<style>
.current-value {
  font-size: 14px !important;
  fill: rgb(154 154 154) !important;
}
</style>
