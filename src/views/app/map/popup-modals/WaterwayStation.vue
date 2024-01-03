<template>
  <div style="height: 80vh">
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
        <b-tabs content-class="mt-1" fill>
          <b-tab :title="$t('detail').toUpperCase()">
            <b-card>
              <div class="d-flex flex-column flex-lg-row">
                <div style="height: 320px" class="w-100 w-lg-60">
                  <template v-if="dataModal.StationImage">
                    <b-img
                      id="image-station"
                      :src="dataModal.StationImage"
                      v-img:test
                      style="width: 100%; height: 100%"
                      @click="openFullscreen('image-station')"
                    ></b-img>
                  </template>
                  <template v-else-if="checkImg">
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
                        :src="deviceImg.InfoValue || dataModal.StationImage"
                        style="cursor: pointer; width: 100%; height: 100%"
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
                      style="cursor: pointer; width: 100%; height: 100%"
                    ></b-img>
                  </div>
                </div>
                <div class="w-100 w-lg-40">
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
                              <!-- IndicatorCode -->
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
                                  :max="
                                    (dataModal.ListIndicator.filter(
                                      (r) =>
                                        r.IndicatorCode == monitor.IndicatorCode
                                    )[0].Maxvalue /
                                      dataModal.ListIndicator.filter(
                                        (r) =>
                                          r.IndicatorCode ==
                                          monitor.IndicatorCode
                                      )[0].Maxvalue) *
                                    100
                                  "
                                  height="5px"
                                  style="position: relative"
                                >
                                  <template
                                    v-if="
                                      monitor.arrMonitor &&
                                      monitor.arrMonitor.length > 0
                                    "
                                  >
                                    <template
                                      v-for="(
                                        item, index
                                      ) in monitor.arrMonitor"
                                    >
                                      <b-progress-bar
                                        :key="index"
                                        :value="item.colorCM"
                                        :style="
                                          'background: ' + item.Color + ';'
                                        "
                                      >
                                      </b-progress-bar>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <template
                                      v-for="(
                                        item, index
                                      ) in monitor.arrMonitorNull"
                                    >
                                      <b-progress-bar
                                        :key="index"
                                        :value="item.colorCM"
                                        :style="
                                          'background: ' + item.Color + ';'
                                        "
                                      >
                                      </b-progress-bar>
                                    </template>
                                  </template>
                                  <div
                                    v-if="
                                      ((monitor.IndicatorValue -
                                        monitor.minValue) /
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
                                      monitor.IndicatorValue < monitor.minValue
                                        ? 0
                                        : ((monitor.IndicatorValue -
                                            monitor.minValue) /
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
                                      monitor.IndicatorValue < monitor.minValue
                                        ? 0
                                        : ((monitor.IndicatorValue -
                                            monitor.minValue) /
                                            monitor.totalValue) *
                                          100
                                    }% - 1%)`"
                                  ></div>
                                </b-progress>
                                <template
                                  v-if="
                                    monitor.arrMonitor &&
                                    monitor.arrMonitor.length > 0
                                  "
                                >
                                  <div class="d-flex">
                                    <template
                                      v-for="(
                                        item, index
                                      ) in monitor.arrMonitor"
                                    >
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
                                      v-for="(
                                        item, index
                                      ) in monitor.arrMonitorNull"
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
                            <b-col lg="12" class="mb-4">
                              <p class="text-muted text-small font-italic">
                                {{ $t("map.no-data") }}
                              </p>
                            </b-col>
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
                                    (dataModal.ListIndicator.filter(
                                      (r) => r.IndicatorCode == device.InfoCode
                                    )[0].Maxvalue /
                                      dataModal.ListIndicator.filter(
                                        (r) =>
                                          r.IndicatorCode == device.InfoCode
                                      )[0].Maxvalue) *
                                    100
                                  "
                                  height="5px"
                                  style="position: relative"
                                >
                                  <template
                                    v-if="
                                      device.arrHandle &&
                                      device.arrHandle.length
                                    "
                                  >
                                    <template
                                      v-for="(item, index) in device.arrHandle"
                                    >
                                      <b-progress-bar
                                        :key="index"
                                        :value="item.colorCM"
                                        :style="
                                          'background: ' + item.Color + ';'
                                        "
                                      >
                                      </b-progress-bar>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <template
                                      v-for="(
                                        item, index
                                      ) in device.arrHandleNull"
                                    >
                                      <b-progress-bar
                                        :key="index"
                                        :value="item.colorCM"
                                        :style="
                                          'background: ' + item.Color + ';'
                                        "
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
                                      device.InfoValue < device.minValue
                                        ? 0
                                        : ((device.InfoValue -
                                            device.minValue) /
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
                                        : ((device.InfoValue -
                                            device.minValue) /
                                            device.totalValue) *
                                          100
                                    }% - 1%)`"
                                  ></div>
                                </b-progress>
                                <template
                                  v-if="
                                    device.arrHandle &&
                                    device.arrHandle.length > 0 &&
                                    device.InfoValue > 0
                                  "
                                >
                                  <div class="d-flex">
                                    <template
                                      v-for="(item, index) in device.arrHandle"
                                    >
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
                                      v-for="(
                                        item, index
                                      ) in device.arrHandleNull"
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
            </b-card>
          </b-tab>
          <b-tab :title="$t('tabs.title.analysis-chart').toUpperCase()">
            <b-card>
              <b-row>
                <b-col md="12" class="text-right">
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
                            :area-chart="{
                              series: areaChartConvert(dataStation),
                            }"
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
            </b-card>
          </b-tab>
          <b-tab :title="$t('list-image-setting').toUpperCase()">
            <b-card>
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
            </b-card>
          </b-tab>
        </b-tabs>
        <br />
      </b-colxx>
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
import handling from "@/constants/handling";
import RadialChartApexSemi from "@/components/Charts/RadialChartApexSemi";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import systemAPI from "@/api/modules/systemAPI";
import waterwayAPI from "@/api/modules/waterwayAPI";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import { timer } from "@/constants/config";

export default {
  props: ["dataParent", "objectData"],
  components: {
    "area-chart-apex": AreaChartApex,
    "radial-chart-apex-semi": RadialChartApexSemi,
    "custom-carousel-component": BCarouselComponent,
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      checkImg: null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      isShow: false,
      animated: true,
      typeLoadData: "Week",
      typeLoadByID: this.dataParent.StationID
        ? this.dataParent.StationID
        : this.dataParent.CabinetID,
      dataChart: null,
      dataImages: null,
      listImage: null,
      timer,
    };
  },
  watch: {
    dataModal(to, from) {
      this.isShow = false;
      this.dataModal.MonitorInfoProperties = this.handleMonitorRangeColor(
        this.dataModal.MonitorInfoProperties
      );
      this.dataModal.DeviceInfoProperties = this.handleDeviceRangeColor(
        this.dataModal.DeviceInfoProperties
      );
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName.toUpperCase() ==
          this.dataParent.moduleType.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.CabinetID == this.dataParent.CabinetID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
  },
  async created() {
    this.checkImg = this.dataModal.DeviceInfoProperties.some(
      (x) => x.InfoCode === "IMG"
    );
    this.dataModal.MonitorInfoProperties = this.handleMonitorRangeColor(
      this.dataModal.MonitorInfoProperties
    );
    this.dataModal.DeviceInfoProperties = this.handleDeviceRangeColor(
      this.dataModal.DeviceInfoProperties
    );
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.setTypeLoadData("Week");
      this.getImages();
      this.isShow = true;
    }, 1000);
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
        StationID: this.dataModal.StationID
          ? this.dataModal.StationID
          : this.dataModal.CabinetID,
        GeoCode: "WaterwayStation",
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    timerLoadDashboard(time) {
      this.dataModal.MonitorInfoProperties = this.handleMonitorRangeColor(
        this.dataModal.MonitorInfoProperties
      );
      this.dataModal.DeviceInfoProperties = this.handleDeviceRangeColor(
        this.dataModal.DeviceInfoProperties
      );
      setTimeout(
        async () => {
          await this.timerLoadDashboard(this.timer * 240);
        },
        time ? time : this.timer * 240
      );
    },
    handleMonitorRangeColor(monitorInfoProperties) {
      return monitorInfoProperties.map((x) => {
        let filteredCator = this.dataModal.ListIndicator.filter((y) =>
          x.InfoCode
            ? x.InfoCode === y.IndicatorCode
            : x.IndicatorCode === y.IndicatorCode
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
          let filteredCator = this.dataModal.ListIndicator.filter(
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
    setTypeLoadData(type) {
      this.typeLoadData = type;
      this.getDataChart(type, this.typeLoadByID);
    },
    getDataChart(type, id) {
      let body = {
        CabinetID: id,
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
.led-lightblue {
  background-color: rgba(56, 148, 209, 1);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #0db1b1 0 -1px 9px,
    rgba(56, 148, 209, 1) 0 2px 12px;
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
