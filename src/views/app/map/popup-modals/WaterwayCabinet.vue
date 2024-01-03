<template>
  <div style="height: 80vh">
    <b-row>
      <b-colxx md="12">
        <b-tabs content-class="mt-1" fill>
          <b-tab :title="$t('detail').toUpperCase()">
            <b-card>
              <div class="d-flex flex-column flex-lg-row gap-5">
                <div class="light-box-left">
                  <div>
                    <h6 class="font-weight-bold" style="color: black">
                      {{ dataModal.StationName.toUpperCase() }}
                    </h6>
                    <div class="fz-14 pl-2">
                      <div class="d-flex align-items-center fw-600 mb-2">
                        <i class="fad fa-map-marker-alt"></i>
                        <strong class="ml-2 fw-600 font-weight-bold">
                          {{ dataModal.StationAddress }}
                        </strong>
                      </div>
                      <div class="d-flex align-items-center fw-600 mb-2">
                        <div
                          style="width: 12px; height: 12px; border-radius: 50%"
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
                  <div class="d-flex flex-column flex-lg-row gap-4 pb-2"></div>
                  <div
                    class="font-size-custom pb-1 pt-2 border-bottom text-capitalize"
                  >
                    {{
                      $t("report.aqua.fields-current.info-device").toUpperCase()
                    }}
                  </div>
                  <div style="max-height: 21vh; overflow-y: auto">
                    <div class="">
                      <div class="d-flex flex-column">
                        <div class="mb-2">
                          <div class="mt-2">
                            <template
                              v-if="
                                dataModal.DeviceInfoProperties &&
                                dataModal.DeviceInfoProperties.length > 0
                              "
                            >
                              <template
                                v-for="(
                                  device, i
                                ) in dataModal.DeviceInfoProperties"
                              >
                                <template>
                                  <div :key="i">
                                    <div
                                      class="d-flex justify-content-between align-items-center"
                                    >
                                      <template v-if="device.InfoValue < 0">
                                        <div
                                          style="color: red; margin-bottom: 8px"
                                        >
                                          {{ device.InfoName }}
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
                                      v-if="device.InfoValue >= 0"
                                      :max="
                                        (dataModal.ListIndicator.filter(
                                          (r) =>
                                            r.IndicatorCode == device.InfoCode
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
                                      <template
                                        v-if="
                                          device.arrHandle &&
                                          device.arrHandle.length
                                        "
                                      >
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
                                            ((device.InfoValue < device.minValue
                                              ? 0
                                              : device.InfoValue -
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
                                      </template>
                                      <template v-else>
                                        <div
                                          v-if="
                                            (device.InfoValue /
                                              device.arrHandleNull[
                                                device.arrHandleNull.length - 1
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
                                            ((device.InfoValue < device.minValue
                                              ? 0
                                              : device.InfoValue -
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
                                      </template>
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
                                          v-for="(
                                            item, index
                                          ) in device.arrHandle"
                                        >
                                          <div
                                            style="
                                              color: black;
                                              text-align: left;
                                            "
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
                                      <div
                                        class="d-flex justify-content-between"
                                      >
                                        <template
                                          v-for="(
                                            item, index
                                          ) in device.arrHandleNull"
                                        >
                                          <div
                                            style="color: black"
                                            :key="index"
                                          >
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
                              <p class="mt-2 mb-0 font-italic text-small">
                                {{ $t("panel.non-data") }}
                              </p>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-100">
                    <b-img
                      thumbnail
                      fluid
                      v-img
                      class="h-img-wind w-100"
                      style="cursor: pointer; object-fit: cover"
                      :src="dataModal.StationImage"
                    ></b-img>
                  </div>
                </div>
                <div class="light-box-right">
                  <div class="light-item-right mb-3">
                    <div class="font-size-custom border-bottom text-capitalize">
                      {{ $t("dashboards.float-details").toUpperCase() }}
                    </div>
                    <div class="light-grid-dashboard mt-2">
                      <div class="d-flex flex-row align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/water-way-icon/total.svg')
                          "
                          style="height: 44px"
                          class="mr-2"
                        ></b-img>
                        <div class="d-flex flex-column">
                          <h3 class="font-weight-bold mb-0 pb-0">
                            {{ dataModal.StationTotal }}
                          </h3>
                          <p
                            class="text-small text-muted font-weight-bold mb-0"
                          >
                            {{ $t("dashboards.water-way-total") }}
                          </p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/water-way-icon/disconnect.svg')
                          "
                          style="height: 44px"
                          class="mr-2"
                        ></b-img>
                        <div class="d-flex flex-column">
                          <h3 class="font-weight-bold mb-0 pb-0">
                            {{ dataModal.StationDisconnect }}
                          </h3>
                          <p
                            class="text-small text-muted font-weight-bold mb-0"
                          >
                            {{ $t("status.disconnect") }}
                          </p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/water-way-icon/error.svg')
                          "
                          style="height: 44px"
                          class="mr-2"
                        ></b-img>
                        <div class="d-flex flex-column">
                          <h3 class="font-weight-bold mb-0 pb-0">
                            {{ dataModal.StationError }}
                          </h3>
                          <p
                            class="text-small text-muted font-weight-bold mb-0"
                          >
                            {{ $t("dashboards.water-way-error") }}
                          </p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <b-img
                          :src="require('@/assets/img/fire-icon/battery.svg')"
                          style="height: 44px"
                          class="mr-2"
                        ></b-img>
                        <div class="d-flex flex-column">
                          <h3 class="font-weight-bold mb-0 pb-0">
                            {{ dataModal.StationLowPin }}
                          </h3>
                          <p
                            class="text-small text-muted font-weight-bold mb-0"
                          >
                            {{ $t("dashboards.warning-fire.low-pin") }}
                          </p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/light-lamp-icon/moved.svg')
                          "
                          style="height: 44px"
                          class="mr-2"
                        ></b-img>
                        <div>
                          <h3 class="font-weight-bold mb-0 pb-0">
                            {{ dataModal.StationMoved }}
                          </h3>
                          <p
                            class="text-small text-muted font-weight-bold mb-0"
                          >
                            {{ $t("dashboards.lamp-move") }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <b-tabs
                    content-class="mt-3"
                    fill
                    class="tabs-custom-ligh-cabinet"
                  >
                    <b-tab :title="$t('tabs.title.all').toUpperCase()" active>
                      <template
                        v-if="
                          dataModal.StationProperties &&
                          dataModal.StationProperties.length > 0
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
                          :items="dataModal.StationProperties"
                          :select-mode="selectMode"
                          :row-page="10"
                          class="text-center"
                          responsive
                        >
                          <template v-slot:cell(StatusLampName)="row">
                            <b-badge
                              pill
                              :style="
                                'background-color:' +
                                row.item.StatusLampColor +
                                '!important; font-size: 88%;color:white;'
                              "
                            >
                              {{ row.item.StatusLampName }}
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
                      <template
                        v-else-if="
                          dataModal.LampProperties &&
                          dataModal.LampProperties.length > 0
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
                          :items="dataModal.LampProperties"
                          :select-mode="selectMode"
                          :row-page="10"
                          class="text-center"
                          responsive
                        >
                          <template v-slot:cell(StatusLampName)="row">
                            <b-badge
                              pill
                              :style="
                                'background-color:' +
                                row.item.StatusLampColor +
                                '!important; font-size: 88%;color:white;'
                              "
                            >
                              {{ row.item.StatusLampName }}
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
                        v-if="dataDistWarning && dataDistWarning.length > 0"
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
                          :items="dataDistWarning"
                          :select-mode="selectMode"
                          :row-page="10"
                          class="text-center"
                          :per-page="perPage"
                          :current-page="currentPageDist"
                          responsive
                        >
                          <template v-slot:cell(StatusLampName)="row">
                            <b-badge
                              pill
                              :style="
                                'background-color:' +
                                row.item.StatusLampColor +
                                '!important; font-size: 88%;color:white;'
                              "
                            >
                              {{ row.item.StatusLampName }}
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
                      :title="$t('tabs.title.lowpin-warning').toUpperCase()"
                    >
                      <template
                        v-if="dataPinWarning && dataPinWarning.length > 0"
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
                          :items="dataPinWarning"
                          :select-mode="selectMode"
                          :row-page="10"
                          class="text-center"
                          :per-page="perPage"
                          :current-page="currentPageWarning"
                          responsive
                        >
                          <template v-slot:cell(StatusLampName)="row">
                            <b-badge
                              pill
                              :style="
                                'background-color:' +
                                row.item.StatusLampColor +
                                '!important; font-size: 88%;color:white;'
                              "
                            >
                              {{ row.item.StatusLampName }}
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
                        v-if="
                          dataStatusLampWarning &&
                          dataStatusLampWarning.length > 0
                        "
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
                          :items="dataStatusLampWarning"
                          :select-mode="selectMode"
                          :row-page="10"
                          class="text-center"
                          :per-page="perPage"
                          :current-page="currentPageError"
                          responsive
                        >
                          <template v-slot:cell(StatusLampName)="row">
                            <b-badge
                              pill
                              :style="
                                'background-color:' +
                                row.item.StatusLampColor +
                                '!important; font-size: 88%;color:white;'
                              "
                            >
                              {{ row.item.StatusLampName }}
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
          </b-tab>
          <b-tab :title="$t('tabs.title.analysis-chart').toUpperCase()">
            <b-card>
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
                      id="MONTH"
                      :class="{
                        active: typeLoadData.toUpperCase() === 'MONTH',
                        'none-click': typeLoadData.toUpperCase() === 'MONTH',
                      }"
                      @click="setTypeLoadData('Month')"
                    >
                      <label id="l2">{{ $t("dashboards.month") }}</label>
                    </li>
                    <li
                      id="YEAR"
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
            </b-card>
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
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import RadialChartApexSemi from "@/components/Charts/RadialChartApexSemi";
import CustomTables from "@/components/Table/CustomTables";
import waterwayAPI from "@/api/modules/waterwayAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import systemAPI from "@/api/modules/systemAPI";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import { timer } from "@/constants/config";

export default {
  props: [
    "dataMapNow",
    "dataParent",
    "objectData",
    "reloadData",
    "updatedData",
  ],

  components: {
    "custom-table": CustomTables,
    "radial-chart-apex-semi": RadialChartApexSemi,
    "area-chart-apex": AreaChartApex,
    "custom-carousel-component": BCarouselComponent,
  },
  computed: {
    dataDistWarning() {
      let dynamicProperty =
        this.dataModal.StationProperties || this.dataModal.LampProperties;
      return dynamicProperty.filter((item) => item.DistWarning > 0);
    },
    dataPinWarning() {
      let dynamicProperty =
        this.dataModal.StationProperties || this.dataModal.LampProperties;
      return dynamicProperty.filter((item) => item.PinWarning > 0);
    },
    dataStatusLampWarning() {
      let dynamicProperty =
        this.dataModal.StationProperties || this.dataModal.LampProperties;
      if (this.dataModal.StationProperties) {
        return dynamicProperty.filter((item) => item.StatusLampID == 3);
      }
      return dynamicProperty.filter((item) => item.StatusID == 3);
    },
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      animated: true,
      selectMode: "single",
      fieldStation: [
        {
          key: "StationName",
          label: "Tên",
          tdClass: "text-center",
        },
        {
          key: "DistWarningName",
          label: this.$t("table.title.dist"),
          tdClass: "text-center",
        },
        {
          key: "PinWarningName",
          label: this.$t("table.title.status-pin"),
          tdClass: "text-center",
        },
        {
          key: "StatusLampName",
          label: this.$t("table.title.status-lamp"),
          tdClass: "text-center",
        },
        {
          key: "IsConnected",
          label: this.$t("table.title.online"),
          tdClass: "text-center",
        },
        {
          key: "UpdateTime",
          label: this.$t("table.title.update-time"),
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      totalRows: 0,
      totalRowsDist: 0,
      totalRowsError: 0,
      totalRowsWarning: 0,
      perPage: 5,
      currentPage: 1,
      currentPageDist: 1,
      currentPageWarning: 1,
      currentPageError: 1,
      typeLoadData: "Week",
      typeLoadChartID: this.dataParent.StationID || this.dataParent.CabinetID,
      dataChart: null,
      dataImages: null,
      listImage: null,
      timer,
    };
  },
  watch: {
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName.toUpperCase() ==
          this.dataParent.moduleType.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.StationID == this.dataParent.StationID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
    dataModal() {
      this.dataModal.DeviceInfoProperties =
        this.dataModal.DeviceInfoProperties.map((x) => {
          return {
            ...x,
            InfoCode: x.InfoCode || x.IndicatorCode,
            InfoName: x.InfoName || x.IndicatorName,
            InfoValue: x.InfoValue || x.IndicatorValue,
          };
        });
      this.dataModal.DeviceInfoProperties = this.handleDeviceRangeColor(
        this.dataModal.DeviceInfoProperties
      );
    },
  },
  async created() {
    this.dataModal.DeviceInfoProperties =
      this.dataModal.DeviceInfoProperties.map((x) => {
        return {
          ...x,
          InfoCode: x.InfoCode || x.IndicatorCode,
          InfoName: x.InfoName || x.IndicatorName,
          InfoValue: x.InfoValue || x.IndicatorValue,
        };
      });
    this.dataModal.DeviceInfoProperties = this.handleDeviceRangeColor(
      this.dataModal.DeviceInfoProperties
    );
    await this.setTypeLoadData("Week");
  },
  mounted() {
    this.getImages();
  },
  methods: {
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      targetDiv.style.display = "none";
    },
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
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.dataModal.StationID
          ? this.dataModal.StationID
          : this.dataModal.CabinetID,
        GeoCode: "WaterwayCabinet",
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
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
    setTypeLoadData(type) {
      this.typeLoadData = type;
      let body = {
        StationID: this.typeLoadChartID,
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
    handleDeviceRangeColor(deviceInfoProperties) {
      return deviceInfoProperties.map((x) => {
        if (x.InfoCode !== "IMG") {
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
    handleReloadData() {
      this.$emit("reload-data");
    },
    handleUpdateDataChange(value) {
      this.$emit("updated-data", value);
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
    changeSchedule(id, status) {
      let body = {
        CabinetID: id,
        IsSchedule: handling.convertBooleanToBit(status),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .mapCabinetActionSchedules(body)
        .then((val) => {
          if (val.status) {
            this.handleReloadData();
            setTimeout(() => {
              this.dataModal.IsSchedule = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.dataModal.IsSchedule = !status;
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
            this.dataModal.IsSchedule = !status;
          }, this.timer);
          console.log(err);
        });
    },
    handleChangeOnOff(id, status) {
      let body = {
        CabinetID: id,
        CabinetStatus: handling.convertBooleanToBit(status),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .mapCabinetChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.handleReloadData();
            setTimeout(() => {
              this.dataModal.CabinetStatus = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.dataModal.CabinetStatus = !status;
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
            this.dataModal.CabinetStatus = !status;
          }, this.timer);
          console.log(err);
        });
    },
  },
};
</script>
<style>
.tabs-custom-ligh-cabinet .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  font-weight: 900 !important;
}
</style>
<style scoped>
.fz-14 {
  font-size: 14px;
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
.view-chart-table:hover {
  color: black;
}
.follow-list-station {
  height: 370px;
}
.light-grid-dashboard {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.light-box-left {
  width: 40%;
}

.light-box-right {
  width: 60%;
}

.light-box-left-modal {
  width: 50%;
}

.light-box-right-modal {
  width: 50%;
}

.h-img-wind {
  height: 265px;
}

.light-item-left {
  width: 60%;
}

.light-item-right {
  width: 100%;
}

.gap-5 {
  gap: 20px;
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

.fw-600 {
  font-weight: 600;
}

.fw-900 {
  font-weight: 900;
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

@media only screen and (max-width: 46.1875em) {
  .light-box-left {
    width: 100%;
  }

  .light-box-right {
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
