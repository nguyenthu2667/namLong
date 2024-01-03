<template>
  <b-row style="height: 80vh">
    <b-colxx lg="12">
      <b-tabs content-class="mt-1" fill>
        <b-tab :title="$t('detail').toUpperCase()" style="height: 80vh">
          <b-card>
            <div class="d-flex flex-column flex-lg-row gap-3">
              <div class="light-box-left-modal">
                <div>
                  <h6 class="font-weight-bold" style="color: black">
                    {{
                      data.StationName
                        ? data.StationName.toUpperCase()
                        : data.Name.toUpperCase()
                    }}
                  </h6>
                  <div class="fz-14 pl-2">
                    <div class="d-flex align-items-center fw-600 mb-2">
                      <i class="fad fa-map-marker-alt"></i>
                      <strong class="ml-2 fw-600 font-weight-bold">
                        {{ data.StationAddress || data.address }}
                      </strong>
                    </div>
                    <div class="d-flex align-items-center fw-600 mb-2">
                      <div
                        style="width: 12px; height: 12px; border-radius: 50%"
                        :style="`backgroundColor: ${data.StatusColor}`"
                      ></div>
                      <strong class="ml-2"> {{ data.StatusName }}</strong>
                    </div>
                    <div class="d-flex align-items-center fw-600 mb-2">
                      <i class="fad fa-calendar"></i>
                      <strong class="ml-2 font-weight-bold">
                        {{ convertDateTime(data.UpdateTime) }}
                      </strong>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column flex-lg-row gap-4 pb-2">
                  <div class="light-item-right"></div>
                </div>
                <div
                  class="font-size-custom pb-1 pt-2 border-bottom text-uppercase"
                >
                  {{ $t("tabs.title.detail-device") }}
                </div>
                <div style="max-height: 21vh; overflow-y: auto">
                  <div>
                    <div class="d-flex flex-column">
                      <div class="mb-2">
                        <div class="mt-2">
                          <template
                            v-if="
                              data.MonitorInfoProperties &&
                              data.MonitorInfoProperties.length > 0
                            "
                          >
                            <template
                              v-for="(device, i) in data.MonitorInfoProperties"
                            >
                              <template>
                                <div :key="i" class="mb-2">
                                  <div
                                    class="d-flex justify-content-between align-items-center"
                                  >
                                    <template v-if="device.IndicatorValue < 0">
                                      <div
                                        style="color: red; margin-bottom: 8px"
                                      >
                                        {{ device.IndicatorName }}
                                      </div>
                                      <div
                                        style="font-style: italic; color: red"
                                      >
                                        {{ $t("dashboards.error") }}
                                      </div>
                                    </template>
                                    <template
                                      v-else-if="device.IsWarning === 1"
                                    >
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
                                        {{ device.IndicatorName }}
                                      </div>
                                      <div style="color: rgb(255 107 2)">
                                        {{ device.IndicatorValue
                                        }}<span>({{ device.UnitName }})</span>
                                      </div>
                                    </template>
                                    <template v-else>
                                      <div>
                                        {{ device.IndicatorName }}
                                      </div>
                                      <div>
                                        {{ device.IndicatorValue
                                        }}<span>({{ device.UnitName }})</span>
                                      </div>
                                    </template>
                                  </div>
                                  <template
                                    v-if="
                                      data.arrHandle &&
                                      data.arrHandle.length > 0
                                    "
                                  >
                                    <b-progress
                                      class="mt-2"
                                      v-if="device.IndicatorValue >= 0"
                                      :max="
                                        (data.ListIndicator.filter(
                                          (r) =>
                                            r.IndicatorCode ==
                                            device.IndicatorCode
                                        )[0]?.Maxvalue /
                                          data.ListIndicator.filter(
                                            (r) =>
                                              r.IndicatorCode ==
                                              device.IndicatorCode
                                          )[0]?.Maxvalue) *
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
                                          v-for="(
                                            item, index
                                          ) in device.arrHandle"
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
                                          ((device.IndicatorValue -
                                            device.minValue) /
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
                                          ((device.IndicatorValue <
                                          device.minValue
                                            ? 0
                                            : device.IndicatorValue -
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
                                          device.IndicatorValue <
                                          device.minValue
                                            ? 0
                                            : ((device.IndicatorValue -
                                                device.minValue) /
                                                device.totalValue) *
                                              100
                                        }% - 1%)`"
                                      ></div>
                                    </b-progress>
                                  </template>
                                  <!-- arrHandleNull -->
                                  <template>
                                    <b-progress
                                      class="mt-2"
                                      v-if="device.IndicatorValue >= 0"
                                      :max="
                                        (data.ListIndicator.filter(
                                          (r) =>
                                            r.IndicatorCode ==
                                            device.IndicatorCode
                                        )[0]?.Maxvalue /
                                          data.ListIndicator.filter(
                                            (r) =>
                                              r.IndicatorCode ==
                                              device.IndicatorCode
                                          )[0]?.Maxvalue) *
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
                                          v-for="(
                                            item, index
                                          ) in device.arrHandle"
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
                                          ((device.IndicatorValue -
                                            device.minValue) /
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
                                          ((device.IndicatorValue <
                                          device.minValue
                                            ? 0
                                            : device.IndicatorValue -
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
                                          device.IndicatorValue <
                                          device.minValue
                                            ? 0
                                            : ((device.IndicatorValue -
                                                device.minValue) /
                                                device.totalValue) *
                                              100
                                        }% - 1%)`"
                                      ></div>
                                    </b-progress>
                                  </template>
                                  <template
                                    v-if="
                                      device.arrHandle &&
                                      device.arrHandle.length > 0 &&
                                      device.IndicatorCode > 0
                                    "
                                  >
                                    <div class="d-flex">
                                      <template
                                        v-for="(
                                          item, index
                                        ) in device.arrHandle"
                                      >
                                        <div
                                          style="color: black; text-align: left"
                                          :key="index"
                                          :style="{
                                            width: item.colorCM + '%',
                                          }"
                                        >
                                          {{ item.FromValue }}
                                        </div>
                                        <div
                                          style="
                                            color: black;
                                            text-align: right;
                                          "
                                          :key="index + 'b'"
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
                <div class="mt-2">
                  <div class="d-flex align-items-center gap-1">
                    <span>{{ $t("modal.operation-control") + ":" }}</span>
                    <b-form-checkbox
                      v-model="data.IsSchedule"
                      name="check-button"
                      switch
                      size="md"
                      @change="
                        changeSchedule(
                          data.StationID ? data.StationID : data.CabinetID,
                          data.IsSchedule
                        )
                      "
                    >
                      <template v-if="data.IsSchedule">
                        <b>{{ $t("modal.auto") }}</b>
                      </template>
                      <template v-else>
                        <b>{{ $t("modal.manual") }}</b>
                      </template>
                    </b-form-checkbox>
                  </div>
                </div>
                <div>
                  <template
                    v-if="!data.IsSchedule && cabinetOption && lightOption"
                  >
                    <b-row class="mt-2">
                      <b-colxx
                        md="12"
                        class="d-flex justify-content-between align-items-center"
                      >
                        <b class="mr-2">
                          <i class="fas fa-sliders-h mr-2"></i>
                          {{ $t("modal.advanced-control").toUpperCase() }}
                        </b>
                      </b-colxx>
                      <b-colxx md="12"><br /></b-colxx>
                      <b-col xl="6">
                        <b-form-group
                          class="mb-3"
                          :label="$t('modal.on-off-lamp') + ':'"
                        >
                          <b-form-select
                            v-model="data.ActionID"
                            :options="cabinetOption"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col xl="6">
                        <template v-if="data.ActionID !== 5">
                          <template>
                            <b-form-group
                              class="mb-3"
                              :label="$t('modal.light-level') + ':'"
                            >
                              <b-form-select
                                v-model="data.LightID"
                                :options="lightOption"
                                :disabled="data.ActionID === 0"
                              ></b-form-select>
                            </b-form-group>
                          </template>
                          <!-- <template v-else>
                            <b-form-group
                              class="mb-3"
                              :label="$t('modal.light-level') + ':'"
                            >
                              <b-form-select
                                v-model="cacheLight"
                                :options="lightOption"
                                :disabled="data.ActionID === 0"
                              ></b-form-select>
                            </b-form-group>
                          </template> -->
                        </template>
                        <template v-else>
                          <b-form-group
                            class="mb-0"
                            :label="$t('modal.light-level') + ':'"
                          >
                            <b-alert show>
                              {{ $t("modal.description-operation") }}
                            </b-alert>
                          </b-form-group>
                        </template>
                      </b-col>
                      <b-colxx md="12">
                        <span class="float-right">
                          <template>
                            <b-button
                              size="sm"
                              variant="success"
                              class="mr-2"
                              @click="submitControl(data)"
                              :disabled="
                                data.ActionID !== 0 && data.LightID === 0
                              "
                            >
                              {{ $t("modal.change") }}
                            </b-button>
                            <!-- <b-button
                              size="sm"
                              variant="danger"
                              class="mr-2"
                              @click="cancelSubmitControl(dataHistory)"
                            >
                              {{ $t("modal.cancel") }}
                            </b-button> -->
                          </template>
                        </span>
                      </b-colxx>
                    </b-row>
                  </template>
                  <template v-else>
                    <b-row class="mt-2">
                      <b-colxx md="12">
                        <b class="mr-2">
                          <i class="fas fa-sliders-h mr-2"></i>
                          {{ $t("modal.schedules-control-list").toUpperCase() }}
                        </b>
                      </b-colxx>
                    </b-row>
                    <vue-perfect-scrollbar
                      class="scroll dashboard-list-with-thumbs"
                      :settings="{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }"
                      style="height: 28vh"
                    >
                      <b-row>
                        <template
                          v-if="
                            data.ScheduleProperties &&
                            data.ScheduleProperties.length > 0
                          "
                        >
                          <b-table
                            selectable
                            :fields="fieldTable"
                            :items="
                              data.ScheduleProperties.filter(
                                (x) => x.IsActive === 1
                              )
                            "
                            responsive
                            class="text-center"
                          >
                          </b-table>
                        </template>
                        <template v-else>
                          <div
                            class="text-center font-italic text-muted p-3 bg-light"
                          >
                            {{ $t("panel.non-data") }}
                          </div>
                        </template>
                      </b-row>
                    </vue-perfect-scrollbar>
                  </template>
                </div>
              </div>
              <div class="light-box-right-modal">
                <div class="font-size-custom pb-1 border-bottom text-uppercase">
                  {{ $t("tabs.title.general-information") }}
                </div>
                <div class="light-grid-dashboard mt-2 mb-4">
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/light-lamp-icon/total.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampTotal }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-total") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/light-icon/green.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampOpen }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-open") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/light-lamp-icon/open.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampOn }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-on") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="
                        require('@/assets/img/light-lamp-icon/light_off.svg')
                      "
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampOff }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-off") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="
                        require('@/assets/img/light-lamp-icon/disconnect.svg')
                      "
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div>
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampDisconnect }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("status.disconnect") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/light-lamp-icon/error.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampError }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-error") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/fire-icon/battery.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampLowPin }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.warning-fire.low-pin") }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <b-img
                      :src="require('@/assets/img/light-lamp-icon/moved.svg')"
                      style="height: 38px"
                      class="mr-1"
                    ></b-img>
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-bold mb-0 pb-0">
                        {{ data.LampMoved }}
                      </h3>
                      <p class="text-small text-muted font-weight-bold mb-0">
                        {{ $t("dashboards.lamp-move") }}
                      </p>
                    </div>
                  </div>
                </div>
                <b-tabs content-class="mt-1" fill class="tabs-custom-light">
                  <b-tab :title="$t('tabs.title.all').toUpperCase()">
                    <template
                      v-if="
                        data.LampProperties && data.LampProperties.length > 0
                      "
                    >
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
                      <b-table
                        :fields="fieldStation"
                        :items="data.LampProperties"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center light-custom-table"
                        :per-page="perPage"
                        :current-page="currentPage"
                        responsive
                      >
                        <template v-slot:cell(StatusName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.StatusColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.StatusName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(IsConnected)="row">
                          <span v-if="row.item.IsConnected == 1"> ✔️ </span>
                          <span v-else> ❌ </span>
                        </template>
                        <template v-slot:cell(PinWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.PinWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.PinWarningName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(DistWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.DistWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.DistWarningName }}
                          </b-badge>
                        </template>
                      </b-table>
                    </template>
                    <template v-else>
                      <p
                        class="p-3 text-center text-muted text-small font-italic"
                      >
                        {{ $t("map.no-data") }}
                      </p>
                    </template>
                  </b-tab>
                  <b-tab
                    :title="$t('tabs.title.err-lamp-warning').toUpperCase()"
                  >
                    <template
                      v-if="dataStationError && dataStationError.length > 0"
                    >
                      <b-pagination
                        size="sm"
                        align="center"
                        :total-rows="totalRowsError"
                        :per-page="perPage"
                        v-model="currentPageError"
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
                      <b-table
                        :fields="fieldStation"
                        :items="dataStationError"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPageError"
                        responsive
                      >
                        <template v-slot:cell(StatusName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.StatusColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.StatusName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(IsConnected)="row">
                          <span v-if="row.item.IsConnected == 1"> ✔️ </span>
                          <span v-else> ❌ </span>
                        </template>
                        <template v-slot:cell(PinWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.PinWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.PinWarningName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(DistWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.DistWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.DistWarningName }}
                          </b-badge>
                        </template>
                      </b-table>
                    </template>
                    <template v-else>
                      <p
                        class="p-3 text-center text-muted text-small font-italic"
                      >
                        {{ $t("map.no-data") }}
                      </p>
                    </template>
                  </b-tab>
                  <b-tab :title="$t('tabs.title.dist-warning').toUpperCase()">
                    <template
                      v-if="dataStationDist && dataStationDist.length > 0"
                    >
                      <b-pagination
                        size="sm"
                        align="center"
                        :total-rows="totalRowsDist"
                        :per-page="perPage"
                        v-model="currentPageDist"
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
                      <b-table
                        :fields="fieldStation"
                        :items="dataStationDist"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPageDist"
                        responsive
                      >
                        <template v-slot:cell(StatusName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.StatusColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.StatusName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(IsConnected)="row">
                          <span v-if="row.item.IsConnected == 1"> ✔️ </span>
                          <span v-else> ❌ </span>
                        </template>
                        <template v-slot:cell(PinWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.PinWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.PinWarningName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(DistWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.DistWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.DistWarningName }}
                          </b-badge>
                        </template>
                      </b-table>
                    </template>
                    <template v-else>
                      <p
                        class="p-3 text-center text-muted text-small font-italic"
                      >
                        {{ $t("map.no-data") }}
                      </p>
                    </template>
                  </b-tab>
                  <b-tab :title="$t('tabs.title.lowpin-warning').toUpperCase()">
                    <template
                      v-if="dataStationWarning && dataStationWarning.length > 0"
                    >
                      <b-pagination
                        size="sm"
                        align="center"
                        :total-rows="totalRowsWarning"
                        :per-page="perPage"
                        v-model="currentPageWarning"
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
                      <b-table
                        :fields="fieldStation"
                        :items="dataStationWarning"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPageWarning"
                        responsive
                      >
                        <template v-slot:cell(StatusName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.StatusColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.StatusName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(IsConnected)="row">
                          <span v-if="row.item.IsConnected == 1"> ✔️ </span>
                          <span v-else> ❌ </span>
                        </template>
                        <template v-slot:cell(PinWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.PinWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.PinWarningName }}
                          </b-badge>
                        </template>
                        <template v-slot:cell(DistWarningName)="row">
                          <b-badge
                            pill
                            :style="
                              'background-color:' +
                              row.item.DistWarningColor +
                              '!important; font-size: 88%;color:white;'
                            "
                          >
                            {{ row.item.DistWarningName }}
                          </b-badge>
                        </template>
                      </b-table>
                    </template>
                    <template v-else>
                      <p
                        class="p-3 text-center text-muted text-small font-italic"
                      >
                        {{ $t("map.no-data") }}
                      </p>
                    </template>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </b-card>

          <!-- Thiet lap dieu khien -->
        </b-tab>
        <b-tab
          :title="$t('tabs.title.analysis-chart').toUpperCase()"
          style="height: 80vh"
        >
          <b-row>
            <b-col md="12" class="text-right mt-2 mb-2">
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
                        :area-chart="{
                          series: areaChartConvert(dataStation),
                        }"
                        :width="`500px`"
                        v-if="isShow"
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
        </b-tab>
        <b-tab
          :title="$t('list-image-setting').toUpperCase()"
          style="height: 80vh"
        >
          <b-row v-if="dataImages && dataImages.length > 0">
            <template v-for="(img, index) in dataImages">
              <b-col lg="4 mb-2" :key="index">
                <div style="height: 250px; cursor: pointer">
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
      </b-tabs>
    </b-colxx>
    <div id="fullscreen-wallpaper-light">
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
    <b-modal
      v-if="data.ActionID == 5"
      id="modal-light-action"
      size="lg"
      title="Tùy chọn bật/ đèn"
    >
      <form ref="form" @submit.stop.prevent="emitSubmit">
        <b-row v-for="(item, index) in dataLamp" :key="index">
          <b-col lg="4">
            <div>{{ item.LampName }}</div>
          </b-col>
          <b-col lg="4">
            <b-form-select
              v-model="item.LightID"
              :options="optionLights"
              size="sm"
              @change="handleChange(k, 'light', $event)"
            ></b-form-select>
          </b-col>
          <b-col lg="4">
            <div @click="customLampAction(item)">ok</div>
          </b-col>
        </b-row>
      </form>
      <b-table
        :items="dataLamp"
        :fields="lampFields"
        :responsive="true"
        :sticky-header="true"
        :no-border-collapse="true"
        :hover="true"
        :per-page="perPage"
        :current-page="page"
      >
        <template #cell(LightLevelName)="row">
          <b-form-select
            v-model="row.item.LightID"
            :options="optionLights"
            size="sm"
          ></b-form-select>
        </template>
        <template #cell(Action)="row">
          <div @click="postLampAction(row.item)">
            <b-button variant="success">Gửi</b-button>
          </div>
        </template>
      </b-table>
      <b-pagination
        size="sm"
        align="center"
        :total-rows="dataLamp.length"
        :per-page="perPage"
        v-model="page"
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
    </b-modal>
  </b-row>
</template>

<script>
import moment from "moment";
import momentTimeZone from "moment";
import handling from "@/constants/handling";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import systemAPI from "@/api/modules/systemAPI";

import lightAPI from "@/api/modules/lightAPI";

export default {
  components: {
    "area-chart-apex": AreaChartApex,
    "custom-carousel-component": BCarouselComponent,
  },
  props: [
    "dataParent",
    "dataHistory",
    "rangeColorValues",
    "dataMapNow",
    "lightOptionProps",
    "cabinetOptionProps",
  ],
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
    dataStationError() {
      let result = this.data.LampProperties.filter(
        (item) => item.StatusID == 6
      );
      this.totalRowsError = result.length;
      return result;
    },
    dataStationWarning() {
      let result = this.data.LampProperties.filter(
        (item) => item.PinWarning == 3
      );
      this.totalRowsWarning = result.length;
      return result;
    },
    dataStationDist() {
      let result = this.data.LampProperties.filter(
        (item) => item.DistWarning == 1
      );
      this.totalRowsDist = result.length;
      return result;
    },
  },
  data() {
    return {
      fieldTable: [
        {
          key: "Time",
          label: this.$t("modal.time"),
        },
        {
          key: "ActionName",
          label: this.$t("modal.operation"),
        },
        {
          key: "LightName",
          label: this.$t("modal.light-level"),
        },
        {
          key: "DateDescription",
          label: this.$t("modal.broadcast-date"),
        },
      ],
      lightOption: this.lightOptionProps ?? null,
      cabinetOption: this.cabinetOptionProps ?? null,
      data: this.dataParent ?? null,
      optionsSchedulesLamp: [
        { text: this.$t("modal.monday"), value: "T2" },
        { text: this.$t("modal.tuesday"), value: "T3" },
        { text: this.$t("modal.wednesday"), value: "T4" },
        { text: this.$t("modal.thursday"), value: "T5" },
        { text: this.$t("modal.friday"), value: "T6" },
        { text: this.$t("modal.saturday"), value: "T7" },
        { text: this.$t("modal.sunday"), value: "CN" },
      ],
      listImage: null,
      isShow: false,
      dataImages: null,
      hisActionID: this.dataParent.ActionID,
      hisLightID: this.dataParent.LightID,
      selectMode: "single",
      isActive: !!this.dataParent,
      typeLoadData: "WEEK",
      dataChart: null,
      dataChartNode: [],
      totalRows: 0,
      totalRowsDist: 0,
      totalRowsError: 0,
      totalRowsWarning: 0,
      perPage: 10,
      page: 1,
      currentPage: 1,
      currentPageDist: 1,
      currentPageWarning: 1,
      currentPageError: 1,
      fieldStation: [
        {
          key: "StationName",
          label: this.$t("dashboards.lamp-name"),
          tdClass: "text-center",
        },
        // {
        //   key: "DistWarningName",
        //   label: this.$t("table.title.dist"),
        //   tdClass: "text-center",
        // },
        // {
        //   key: "PinWarningName",
        //   label: this.$t("table.title.status-pin"),
        //   tdClass: "text-center",
        // },
        {
          key: "StatusName",
          label: this.$t("table.title.status-lamp"),
          tdClass: "text-center",
        },
      ],
      dataLamp: null,
      optionLights: null,
      optionLamp: null,
      lampFields: [
        {
          key: "LampName",
          label: "Loại đèn",
          sortable: true,
        },
        {
          key: "LightLevelName",
          label: "Mức sáng",
          tdClass: "text-center",
        },
        {
          key: "Action",
          label: "Action",
          tdClass: "text-center",
          thClass: "text-center",
        },
      ],
      cacheLight: null,
    };
  },
  async created() {
    if (!this.lightOption) {
      await this.loadCabinetOption();
    }
    if (!this.cabinetOption) {
      await this.loadLightOption();
    }
    if (this.data["IsSchedule"] != undefined) {
      this.data.IsSchedule = !!this.data.IsSchedule;
    }
    this.data.MonitorInfoProperties = this.handleDeviceRangeColor(
      this.data.MonitorInfoProperties
    );
    await this.getDataLamp();
    await this.loadLightActiveOption();
    await this.setTypeLoadData("Week");
  },
  mounted() {
    this.getImages();
    this.totalRows = this.data.LampProperties.length;
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
  },
  watch: {
    dataParent(val) {
      this.data = { ...val };
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName?.toUpperCase() ==
          this.dataParent.moduleType?.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.StationID == this.dataParent.StationID) {
              this.data = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
    "data.ActionID"(to, from) {
      if (this.data.ActionID === 0 && this.data.LightID !== 0) {
        this.data.ActionID = 0;
        this.data.LightID = 0;
      }
    },
    "data.LightID"(to, from) {
      if (this.data.LightID === 0 && this.data.ActionID !== 0) {
        this.data.LightID = 0;
        this.data.ActionID = 0;
      }
    },
    data() {
      this.data.MonitorInfoProperties = this.handleDeviceRangeColor(
        this.data.MonitorInfoProperties
      );
    },
  },
  methods: {
    changeCacheLight(v) {
      // if (this.data.ActionID == 0 && v == 0) {
      //   cacheLight = true;
      // }
      // if (cacheLight) {
      // }
    },
    postLampAction(item) {
      let body = {
        LampID: item.LampID,
        LightID: item.LightID,
      };
      lightAPI
        .mapCabinetActionLamp(body)
        .then((val) => {
          if (val.status) {
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
        .catch((err) => console.log(error));
    },
    loadLightActiveOption() {
      lightAPI
        .lightLevelListActive()
        .then((val) => {
          this.optionLights = val.status
            ? val.data.map((item) => ({
                text: item.LightName,
                value: item.LightID,
              }))
            : [];
        })
        .catch((err) => console.log(err));
    },
    getDataLamp() {
      let body = {
        CabinetID: this.data.CabinetID,
      };
      lightAPI
        .mapCabinetGetActionLamp(body)
        .then((val) => {
          this.dataLamp = val.status
            ? val.data.map((item) => ({
                ...item,
                Action: "OK",
              }))
            : [];
          this.optionLamp = this.dataLamp.map((item) => ({
            text: item.LampName,
            value: item.LampID,
          }));
        })
        .catch((err) => console.log(err));
    },
    loadCabinetOption() {
      lightAPI
        .mapCabinetActionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.cabinetOption = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ActionName,
                  value: val.data[i].ID,
                };
                this.cabinetOption.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadLightOption() {
      lightAPI
        .lightLevelList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.lightOption = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LightName,
                    value: val.data[i].LightID,
                  };
                  this.lightOption.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeviceRangeColor(deviceInfoProperties) {
      return deviceInfoProperties.map((x) => {
        if (x.IndicatorCode !== "IMG") {
          let filteredCator = this.data.ListIndicator.filter(
            (y) => x.IndicatorCode === y.IndicatorCode
          );
          let formatCator = filteredCator[0]?.Properties.map((c, index) => {
            let percentRange =
              ((c.ToValue - c.FromValue) /
                (filteredCator[0]?.Maxvalue +
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
            Math.abs(filteredCator[0]?.Maxvalue) +
            Math.abs(filteredCator[0]?.MinValue);

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
                  valueCustom: filteredCator[0]?.MinValue,
                },
                {
                  Color: "#2993d4",
                  colorCM: 100,
                  valueCustom: filteredCator[0]?.Maxvalue,
                },
              ],
              totalValue,
              minValue: filteredCator[0]?.MinValue,
            };
          }
        } else {
          return {
            ...x,
          };
        }
      });
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      targetDiv.style.display = "none";
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
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    submitControl(data) {
      if (data.ActionID == 5) {
        data.LightID = 0;
      }
      let body = {
        CabinetID: data.StationID ? data.StationID : data.CabinetID,
        LightID: parseInt(data.LightID),
        ActionID: data.ActionID,
      };
      lightAPI
        .mapCabinetActionControl(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.data.LightID = parseInt(data.LightID);
              this.data.ActionID = data.ActionID;
              this.$emit("changeData", this.data);
              this.handleReloadData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
              setTimeout(() => {
                this.$bvModal.show("modal-light-action");
              }, 1000);
            }, this.timer);
          } else {
            setTimeout(() => {
              this.data.LightID = this.dataHistory.LightID;
              this.data.ActionID = this.dataHistory.ActionID;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.data.LightID = this.dataHistory.LightID;
            this.data.ActionID = this.dataHistory.ActionID;
          }, this.timer);
          console.log(err);
        });
      // this.dataChange = false
      this.handleUpdateDataChange(false);
    },
    cancelSubmitControl(history) {
      this.data.LightID = this.hisLightID;
      this.data.ActionID = this.hisActionID;
      // this.dataChange = false
      this.handleUpdateDataChange(false);
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    changeSchedule(id, status) {
      let body = {
        CabinetID: id,
        IsSchedule: handling.convertBooleanToBit(status),
      };
      lightAPI
        .mapCabinetActionSchedules(body)
        .then((val) => {
          if (val.status) {
            this.handleReloadData();
            setTimeout(() => {
              this.data.IsSchedule = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.data.IsSchedule = !status;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.data.IsSchedule = !status;
          }, this.timer);
          console.log(err);
        });
    },
    returnSchedulesLamp(obj) {
      let arr = [];
      if (obj.CN === 1) {
        arr.push("CN");
      }
      if (obj.T2 === 1) {
        arr.push("T2");
      }
      if (obj.T3 === 1) {
        arr.push("T3");
      }
      if (obj.T4 === 1) {
        arr.push("T4");
      }
      if (obj.T5 === 1) {
        arr.push("T5");
      }
      if (obj.T6 === 1) {
        arr.push("T6");
      }
      if (obj.T7 === 1) {
        arr.push("T7");
      }
      return arr;
    },
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.data.StationID
          ? this.data.StationID
          : this.data.CabinetID,
        GeoCode: "SLCabinets",
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    handleReloadData() {
      this.$emit("reload-data");
    },
    handleUpdateDataChange(value) {
      this.$emit("updated-data", value);
    },
    getDataChart(type, station) {
      let body = {
        Type: this.typeLoadData,
        StationID: station.StationID ? station.StationID : station.CabinetID,
      };
      lightAPI
        .lightDashboardAnalyticsTotal(body)
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
          handling.convertDateToTimeStamp(objAreaData[k].ItemDate);
          objArea.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemDate),
            parseFloat(objAreaData[k].IndicatorValue),
          ]);
        }
      }
      seriesArea.push(objArea);
      this.isShow = true;
      return seriesArea;
    },
    setTypeLoadData(type) {
      this.typeLoadData = type;
      this.getDataChart(type, this.data);
    },
    resetChartDetail() {
      this.typeLoadData = "WEEK";
      this.dataForm = null;
      this.data = null;
      this.titleForm = null;
      this.dataChart = null;
      this.dataChartNode = null;
    },
  },
};
</script>

<style scoped>
.fz-14 {
  font-size: 14px;
}
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

.light-grid-dashboard {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.light-box-left {
  width: 50%;
}

.light-box-right {
  width: 50%;
}

.light-box-left-modal {
  width: 44%;
}

.light-box-right-modal {
  width: 56%;
}

.h-img-wind {
  height: 265px;
}

.light-item-left {
  width: 50%;
}

.light-item-right {
  width: 100%;
}

.gap-4 {
  gap: 16px;
}

.gap-3 {
  gap: 12px;
}
.gap-1 {
  gap: 4px;
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

/* module-img */
#fullscreen-wallpaper-light {
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

#fullscreen-wallpaper-light .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper-light .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn i {
  font-size: 20px;
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

@media only screen and (max-width: 46.1875em) {
  .light-box-left-modal {
    width: 100%;
  }

  .light-box-right-modal {
    width: 100%;
  }

  .h-img-wind {
    height: 180px;
  }

  .light-item-left {
    width: 100%;
  }

  .light-item-right {
    width: 100%;
  }

  .light-grid-dashboard {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

<style>
.light-custom-table table.table tbody tr td {
  padding: 0.4rem 0.25rem !important;
  vertical-align: unset !important;
}
</style>
