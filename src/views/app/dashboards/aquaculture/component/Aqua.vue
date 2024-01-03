<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-tabs content-class="mt-1" fill>
          <b-overlay :show="!isShow" rounded="sm">
            <b-tab title="CHỈ SỐ HIỆN TẠI" active @click="handleClick()">
              <b-card>
                <div class="d-flex flex-column flex-lg-row">
                  <div class="light-box-left-modal">
                    <div>
                      <h6 class="font-weight-bold" style="color: black">
                        {{
                          dataModal.StationName
                            ? dataModal.StationName.toUpperCase()
                            : dataModal.Name.toUpperCase()
                        }}
                      </h6>
                      <div class="fz-14 pl-2">
                        <div class="d-flex align-items-center fw-600 mb-2">
                          <i class="fad fa-map-marker-alt"></i>
                          <strong class="ml-2 fw-600 font-weight-bold">
                            {{ dataModal.StationAddress || dataModal.address }}
                          </strong>
                        </div>
                        <div class="d-flex align-items-center fw-600 mb-2">
                          <div
                            style="
                              width: 12px;
                              height: 12px;
                              border-radius: 50%;
                            "
                            :style="`backgroundColor: ${dataModal.StatusColor}`"
                          ></div>
                          <strong class="ml-2">
                            {{ dataModal.StatusName }}</strong
                          >
                        </div>
                        <div class="d-flex align-items-center fw-600 mb-2">
                          <i class="fad fa-calendar"></i>
                          <strong class="ml-2 font-weight-bold">
                            {{ convertDateTime(dataModal.UpdateTime) }}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <!-- rangeColorValues Device-->
                    <div class="mt-2">
                      <div class="px-2 py-2">
                        <div class="d-flex flex-column">
                          <div class="mb-2">
                            <div
                              class="font-weight-bold list-item-heading pb-2 border-bottom text-capitalize"
                            >
                              {{ $t("dashboards.info-station-device") }}
                            </div>
                            <template
                              v-if="
                                dataModal.DeviceInfoProperties &&
                                dataModal.DeviceInfoProperties.length > 0
                              "
                            >
                              <template
                                v-for="(
                                  _item, i
                                ) in dataModal.DeviceInfoProperties"
                              >
                                <div :key="'itemA' + i">
                                  <div
                                    class="d-flex justify-content-between align-items-center"
                                  >
                                    <template v-if="_item.InfoValue < 0">
                                      <div style="color: red">
                                        {{ _item.InfoName }}
                                      </div>
                                      <div
                                        style="font-style: italic; color: red"
                                      >
                                        {{ $t("dashboards.error") }}
                                      </div>
                                    </template>
                                    <template v-else>
                                      <template v-if="_item.IsWarning === 1">
                                        <div style="color: rgb(255 107 2)">
                                          <span>
                                            <i
                                              class="fad fa-exclamation-triangle"
                                            ></i
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
                                        :style="
                                          'background: ' + item.Color + ';'
                                        "
                                      >
                                      </b-progress-bar>
                                    </template>
                                    <div
                                      v-if="
                                        (_item.InfoValue /
                                          _item.arrDevice[
                                            _item.arrDevice.length - 1
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
                                        (_item.InfoValue /
                                          _item.arrDevice[
                                            _item.arrDevice.length - 1
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
                                        (_item.InfoValue /
                                          _item.arrDevice[
                                            _item.arrDevice.length - 1
                                          ].ToValue) *
                                        100
                                      }% - 1%)`"
                                    ></div>
                                  </b-progress>
                                  <div
                                    class="d-flex"
                                    v-if="_item.InfoValue >= 0"
                                  >
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
                                v-if="
                                  dataModal.ExtraProperties &&
                                  dataModal.ExtraProperties.length > 0
                                "
                              >
                                <template
                                  v-for="(
                                    __item, __index
                                  ) in dataModal.ExtraProperties"
                                >
                                  <b-col
                                    :key="'itemC' + __index"
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
                                    <p
                                      class="text-muted font-weight-bold text-small"
                                    >
                                      {{ __item.StationExtraName }}
                                    </p>
                                    <template v-if="objectData.accessWrite">
                                      <b-form-checkbox
                                        class="ml-2 mb-4"
                                        @change="
                                          extrasDevice(
                                            __item,
                                            !convertBitToBoolean(
                                              __item.ExtraStatus
                                            )
                                          )
                                        "
                                        :checked="
                                          convertBitToBoolean(
                                            __item.ExtraStatus
                                          )
                                        "
                                        name="check-button"
                                        switch
                                      ></b-form-checkbox>
                                    </template>
                                    <template v-else>
                                      <b-form-checkbox
                                        class="ml-2 mb-4"
                                        :checked="
                                          convertBitToBoolean(
                                            __item.ExtraStatus
                                          )
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

                    <div>
                      <div class="w-100">
                        <b-img
                          thumbnail
                          fluid
                          class="h-img-wind w-100"
                          style="cursor: pointer; object-fit: cover"
                          :src="dataModal.StationImage"
                        ></b-img>
                      </div>
                    </div>
                  </div>
                  <div class="light-box-right-modal">
                    <vue-perfect-scrollbar
                      style="height: 71vh"
                      :settings="{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }"
                    >
                      <div class="px-2">
                        <div class="aqua-grid">
                          <template
                            v-if="
                              dataModal.NodeProperties &&
                              dataModal.NodeProperties.length > 0
                            "
                          >
                            <template
                              v-for="(node, i) in dataModal.NodeProperties"
                            >
                              <div class="custom-body-node mt-4">
                                <div style="font-weight: 700; font-size: 14px">
                                  <i class="fad fa-location mr-2"></i>
                                  <strong v-b-toggle="`collapse-${i}`">{{
                                    node.StationNodeName
                                  }}</strong>
                                </div>
                                <b-collapse
                                  visible
                                  :id="`collapse-${i}`"
                                  class="mt-2"
                                >
                                  <div
                                    style="max-height: 28vh; overflow-y: auto"
                                  >
                                    <div
                                      class="d-flex flex-column"
                                      style="padding: 4px 26px"
                                    >
                                      <!-- <template
                                        v-if="
                                          node.DeviceInfoProperties &&
                                            node.DeviceInfoProperties.length > 0
                                        "
                                      >
                                        <template
                                          v-for="(device,
                                          i) in node.DeviceInfoProperties"
                                        >
                                          <div :key="'itemF' + i">
                                            <div
                                              class="d-flex justify-content-between align-items-center"
                                            >
                                              <template
                                                v-if="device.InfoValue < 0"
                                              >
                                                <div style="color:red">
                                                  {{ device.InfoName }}
                                                </div>
                                                <div
                                                  style="font-style: italic; color: red"
                                                >
                                                  {{ $t('dashboards.error') }}
                                                </div>
                                              </template>
                                              <template v-else>
                                                <template
                                                  v-if="device.IsWarning === 1"
                                                >
                                                  <div
                                                    style="color: rgb(255 107 2)"
                                                  >
                                                    <span>
                                                      <i
                                                        class="fad fa-exclamation-triangle"
                                                      ></i
                                                    ></span>
                                                    {{ device.InfoName }}
                                                  </div>
                                                  <div
                                                    style="color: rgb(255 107 2)"
                                                  >
                                                    {{ device.InfoValue
                                                    }}<span
                                                      >({{
                                                        device.UnitName
                                                      }})</span
                                                    >
                                                  </div>
                                                </template>
                                                <template v-else>
                                                  <div>
                                                    {{ device.InfoName }}
                                                  </div>
                                                  <div>
                                                    {{ device.InfoValue
                                                    }}<span
                                                      >({{
                                                        device.UnitName
                                                      }})</span
                                                    >
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
                                                    r.Properties[0]
                                                      .IndicatorCode ==
                                                    device.InfoCode,
                                                )[0].Maxvalue /
                                                  rangeColorValues.filter(
                                                    (r) =>
                                                      r.Properties[0]
                                                        .IndicatorCode ==
                                                      device.InfoCode,
                                                  )[0].Maxvalue) *
                                                  100
                                              "
                                              height="5px"
                                              style="position: relative"
                                            >
                                              <template
                                                v-for="(item,
                                                index) in device.arrDevice"
                                              >
                                                <b-progress-bar
                                                  :key="index"
                                                  :value="item.colorCM"
                                                  :style="
                                                    'background: ' +
                                                      item.Color +
                                                      ';'
                                                  "
                                                >
                                                </b-progress-bar>
                                              </template>
                                              <div
                                                v-if="
                                                  (device.InfoValue /
                                                    device.arrDevice[
                                                      device.arrDevice.length -
                                                        1
                                                    ].ToValue) *
                                                    100 <
                                                    10
                                                "
                                                style="height: 20px;width: 2px;background-color: black;position: absolute;"
                                                :style="
                                                  `left: calc(${(device.InfoValue /
                                                    device.arrDevice[
                                                      device.arrDevice.length -
                                                        1
                                                    ].ToValue) *
                                                    100}%)`
                                                "
                                              ></div>
                                              <div
                                                v-else
                                                style="height: 20px;width: 2px;background-color: black;position: absolute;"
                                                :style="
                                                  `left: calc(${(device.InfoValue /
                                                    device.arrDevice[
                                                      device.arrDevice.length -
                                                        1
                                                    ].ToValue) *
                                                    100}% - 1%)`
                                                "
                                              ></div>
                                            </b-progress>
                                            <div
                                              class="d-flex "
                                              v-if="device.InfoValue >= 0"
                                            >
                                              <template
                                                v-for="(item,
                                                index) in device.arrDevice"
                                              >
                                                <div
                                                  style="color: black; text-align: right"
                                                  :key="index"
                                                  :style="{
                                                    width: item.colorCM + '%',
                                                  }"
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
                                            {{ $t('map.no-data') }}
                                          </p>
                                        </b-col>
                                      </template> -->
                                      <template
                                        v-if="
                                          node.MonitoringProperties &&
                                          node.MonitoringProperties.length > 0
                                        "
                                      >
                                        <template
                                          v-for="(
                                            monitor, i
                                          ) in node.MonitoringProperties"
                                        >
                                          <div :key="'itemH' + i">
                                            <div
                                              class="d-flex justify-content-between align-items-center"
                                            >
                                              <template
                                                v-if="
                                                  monitor.IndicatorValue < 0
                                                "
                                              >
                                                <div style="color: red">
                                                  {{ monitor.IndicatorName }}
                                                </div>
                                                <div
                                                  style="
                                                    font-style: italic;
                                                    color: red;
                                                  "
                                                >
                                                  {{ $t("dashboards.error") }}
                                                </div>
                                              </template>
                                              <template v-else>
                                                <template
                                                  v-if="monitor.IsWarning === 1"
                                                >
                                                  <div
                                                    style="
                                                      color: rgb(255 107 2);
                                                    "
                                                  >
                                                    <span>
                                                      <i
                                                        class="fad fa-exclamation-triangle"
                                                      ></i
                                                    ></span>
                                                    {{ monitor.IndicatorName }}
                                                  </div>
                                                  <div
                                                    style="
                                                      color: rgb(255 107 2);
                                                    "
                                                  >
                                                    {{ monitor.IndicatorValue
                                                    }}<span
                                                      >({{
                                                        monitor.UnitName
                                                      }})</span
                                                    >
                                                  </div>
                                                </template>
                                                <template v-else>
                                                  <div>
                                                    {{ monitor.IndicatorName }}
                                                  </div>
                                                  <div>
                                                    {{ monitor.IndicatorValue
                                                    }}<span
                                                      >({{
                                                        monitor.UnitName
                                                      }})</span
                                                    >
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
                                                    r.Properties[0]
                                                      .IndicatorCode ==
                                                    monitor.IndicatorCode
                                                )[0].Maxvalue /
                                                  rangeColorValues.filter(
                                                    (r) =>
                                                      r.Properties[0]
                                                        .IndicatorCode ==
                                                      monitor.IndicatorCode
                                                  )[0].Maxvalue) *
                                                100
                                              "
                                              height="5px"
                                              style="position: relative"
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
                                                    'background: ' +
                                                    item.Color +
                                                    ';'
                                                  "
                                                >
                                                </b-progress-bar>
                                              </template>
                                              <div
                                                v-if="
                                                  (monitor.IndicatorValue /
                                                    monitor.arrMonitor[
                                                      monitor.arrMonitor
                                                        .length - 1
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
                                                      monitor.arrMonitor
                                                        .length - 1
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
                                                      monitor.arrMonitor
                                                        .length - 1
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
                                                v-for="(
                                                  item, index
                                                ) in monitor.arrMonitor"
                                              >
                                                <div
                                                  style="
                                                    color: black;
                                                    text-align: right;
                                                  "
                                                  :key="index"
                                                  :style="{
                                                    width: item.colorCM + '%',
                                                  }"
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
                                  </div>
                                </b-collapse>
                              </div>
                            </template>
                          </template>
                        </div>
                      </div>
                    </vue-perfect-scrollbar>
                  </div>
                </div>
              </b-card>
            </b-tab>
            <b-tab
              :title="$t('tabs.title.analysis-chart').toUpperCase()"
              @click="handleClick('CHART')"
            >
              <b-row>
                <b-col md="6"></b-col>
                <b-col md="6" class="mb-3 mt-2 text-right">
                  <b-row>
                    <b-col>
                      <b-form-group>
                        <b-form-select
                          style="
                            height: calc(2.3rem);
                            border-radius: 20px;
                            padding: 0;
                            padding-left: 10px;
                            font-weight: bold;
                          "
                          v-model="itemSelected"
                          :options="optionItem"
                          size="sm"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <ul class="button-wrapper">
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
                  </b-row>
                </b-col>
                <template v-if="dataChart && dataChart.length > 0">
                  <template v-if="dataChart.length === 1">
                    <template v-for="(data, index) in dataChart">
                      <b-col
                        :key="'station' + index"
                        xl="12"
                        lg="12"
                        class="text-center"
                      >
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
                            :key="'station' + index"
                            xl="6"
                            lg="12"
                            class="text-center"
                          >
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
                <template v-for="(data, key) in dataNodeCharts">
                  <b-col :key="'node' + key" xl="6" lg="6" class="text-center">
                    <chart-apex-spline
                      :area-chart="areaChartConvertSpline(data)"
                    ></chart-apex-spline>
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
import handling from "@/constants/handling";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import aquacultureAPI from "@/api/modules/aquacultureAPI";
import CusCirlePieSemi from "@/components/Charts/CusCirlePieSemi";
import systemAPI from "@/api/modules/systemAPI";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import aquaAPI from "@/api/modules/aquaAPI";
import AreaChartApex from "@/components/Charts/LineChartDashed";
import VueSpeedometer from "vue-speedometer";
import LineChartApexSpline from "@/components/Charts/LineChartApexSpline";

export default {
  components: {
    "radial-chart-apex-two": RadialChartApexTwo,
    "cus-cirle-pie-semi": CusCirlePieSemi,
    "custom-carousel-component": BCarouselComponent,
    "area-chart-apex": AreaChartApex,
    VueSpeedometer,
    "chart-apex-spline": LineChartApexSpline,
  },
  props: ["dataModal", "objectData", "reloadData", "rangeColorValues"],
  name: "Aqua",
  data() {
    return {
      isShow: false,
      animated: true,
      //module-chart
      typeLoadData: "WEEK",
      dataChart: null,
      dataNodeCharts: null,
      // module-img
      keyString: this.dataModal.DataTypeName ?? "Aqua",
      dataImages: null,
      listImage: null,
      itemSelected: null,
      optionItem: null,
    };
  },
  watch: {
    dataModal() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    itemSelected() {
      this.isShow = false;
      setTimeout(() => {
        this.getDataNodeChart(this.typeLoadData, this.itemSelected);
        this.isShow = true;
      }, 500);
    },
  },
  mounted() {
    this.getImages();
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  methods: {
    async handleClick(key) {
      this.isShow = false;
      if (key === "CHART") {
        await this.getDataChart(this.typeLoadData, this.dataModal);
        this.optionItem = [];
        await this.dataModal.NodeProperties.forEach((node) => {
          let obj = {
            text: node.StationNodeName,
            value: node.NodeID,
          };
          this.optionItem.push(obj);
        });
        this.itemSelected = this.optionItem[0].value;
      }
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    //module-chart
    setTypeLoadData(type, station) {
      this.typeLoadData = type;
      this.isShow = false;
      setTimeout(() => {
        this.getDataChart(type, station);
        this.getDataNodeChart(type, this.itemSelected);
        this.isShow = true;
      }, 500);
    },
    getDataChart(type, station) {
      let body = {
        UserIDCurent: this.userID,
        StationID: station.StationID,
        Type: type,
      };
      aquaAPI
        .aquaDashboardAnalytics(body)
        .then((val) => {
          this.dataChart = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataNodeChart(type, id) {
      let body = {
        UserIDCurent: this.userID,
        NodeID: id,
        DateType: type,
      };
      aquaAPI
        .nodeDashboardAnalytics(body)
        .then((val) => {
          this.dataNodeCharts = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    areaChartConvertSpline(data) {
      let obj1 = {
        name: this.$t("dashboards.avg") + " (" + data.UnitName + ")",
        data: [],
      };
      let obj2 = {
        name: this.$t("dashboards.min") + " (" + data.UnitName + ")",
        data: [],
      };
      let obj3 = {
        name: this.$t("dashboards.max") + " (" + data.UnitName + ")",
        data: [],
      };
      let areaChart = { series: [], categories: [] };
      if (data.Values?.length > 0) {
        let arr = data.Values;
        arr.forEach((it, index) => {
          obj1.data.push(it.AverageValue);
          obj2.data.push(it.MinValue);
          obj3.data.push(it.MaxValue);
          let date = handling.convertDateToTimeStamp(it.ItemHH);
          areaChart.categories.push(date);
        });
      }
      areaChart.series = [obj1, obj2, obj3];
      return areaChart;
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
      let objAreaData = [];
      if (data.Properties) {
        objAreaData = data.Properties;
      } else {
        objAreaData = data.Values;
      }
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
    handleReloadData() {
      this.$emit("reload-data");
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
            //reload-data !!!
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    convertBitToBoolean(value) {
      return !!value;
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
  created() {
    this.dataModal.DeviceInfoProperties =
      this.dataModal.DeviceInfoProperties.map((x) => {
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
    console.log(this.dataModal);
    this.dataModal.NodeProperties = this.dataModal.NodeProperties.map((m) => {
      m.MonitoringProperties = m.MonitoringProperties.map((x) => {
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
      // m.DeviceInfoProperties = m.DeviceInfoProperties.map((x) => {
      //   let t = this.rangeColorValues.filter(
      //     (y) => x.InfoCode === y.Properties[0].IndicatorCode,
      //   )
      //   let u = t[0].Properties.map((c) => {
      //     return {
      //       ...c,
      //       colorCM:
      //         ((c.ToValue - c.FromValue) /
      //           t[0].Properties[t[0].Properties.length - 1].ToValue) *
      //         100,
      //     }
      //   })
      //   return {
      //     ...x,
      //     arrDevice: u,
      //   }
      // })
      return {
        ...m,
      };
    });
  },
};
</script>

<style scoped>
.light-box-left-modal {
  width: 44%;
}

.light-box-right-modal {
  width: 56%;
}

.h-img-wind {
  height: 220px;
}
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

.aqua-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.aqua-custom-left {
  width: 35%;
}

.aqua-custom-right {
  width: 65%;
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
<style>
.current-value {
  font-size: 14px !important;
  fill: rgb(154 154 154) !important;
}
</style>
