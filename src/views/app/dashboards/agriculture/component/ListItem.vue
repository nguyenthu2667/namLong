<template>
  <div v-if="data">
    <b-card
      class="header"
      v-b-toggle="`id-${data.StationID}`"
      no-body
      :id="'modal-detail-' + data.StationID"
      style="
        border-bottom: 1px solid #80808012 !important;
        box-shadow: none !important;
      "
    >
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
            <p class="list-item-heading mb-1 truncate font-weight-bold">
              {{ data.StationName }}
            </p>
          </b-col>
          <b-col lg="3" md="6" class="text-right pt-1">
            <p class="text-muted mb-1">
              {{ data.UpdateTime }}
            </p>
          </b-col>
          <b-col lg="5" md="12" class="text-right">
            <template v-if="data.IsWarning === 0">
              <span>
                <b-badge
                  pill
                  style="background-color: red !important; font-size: 100%"
                >
                  {{ data.DescriptionWarning }}
                </b-badge>
              </span>
            </template>
            <template v-else-if="data.IsWarning === 1">
              <span>
                <b-badge
                  pill
                  style="background-color: green !important; font-size: 100%"
                >
                  {{ data.DescriptionWarning }}
                </b-badge>
              </span>
            </template>
            <template v-else>
              <span>
                <b-badge
                  pill
                  style="background-color: gray !important; font-size: 100%"
                >
                  {{ data.DescriptionWarning }}
                </b-badge>
              </span>
            </template>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse :id="`id-${data.StationID}`" :visible="true">
      <b-card
        style="box-shadow: none !important"
        class="list-station-custom mb-4"
      >
        <div class="custom-body-control">
          <div class="custom-body-control-top">
            <b-row>
              <b-col lg="6">
                <b-row>
                  <b-col sm="12">
                    <p class="text-muted float-left">
                      <strong>
                        {{ $t("dashboards.info-station-device") }}
                      </strong>
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <template
                    v-if="data.ListDeviceInfo && data.ListDeviceInfo.length > 0"
                  >
                    <template v-for="(_item, _index) in data.ListDeviceInfo">
                      <b-col xl="4" lg="6" sm="6" class="text-center">
                        <radial-chart-apex-two
                          v-if="isShow"
                          :font-size="20"
                          :height="200"
                          :data="[parseFloat(_item.InfoValue)]"
                          :label="[
                            _item.InfoCode + ' (' + _item.UnitName + ')',
                          ]"
                          :key="_index"
                        ></radial-chart-apex-two>
                        <p
                          class="text-small text-muted font-weight-bold"
                          style="margin-top: -15px"
                        >
                          {{ _item.InfoName }}
                        </p>
                        <template v-if="_item.InfoValue < 0">
                          <p
                            class="text-small text-muted font-italic"
                            style="margin-top: -15px; color: red !important"
                          >
                            {{ $t("map.error-sensor") }}
                          </p>
                        </template>
                      </b-col>
                    </template>
                  </template>
                  <template v-else>
                    <b-col lg="12" class="mt-3">
                      <p class="text-muted text-small font-italic">
                        {{ $t("map.no-data") }}
                      </p>
                    </b-col>
                  </template>
                </b-row>
              </b-col>
              <b-col lg="6">
                <b-row>
                  <b-col sm="12" class="d-flex justify-content-between">
                    <p class="text-muted float-left">
                      <strong>
                        {{ $t("dashboards.device-active") }}
                      </strong>
                    </p>
                    <span @click="showChartDetail(data.StationName, data)">
                      <p
                        class="font-weight-bold"
                        style="color: red; text-decoration: underline"
                      >
                        {{ $t("dashboards.view-chart") }}
                      </p>
                    </span>
                  </b-col>
                </b-row>
                <b-row class="text-center mt-3 mb-3">
                  <template v-if="data.ListExtra && data.ListExtra.length > 0">
                    <template v-for="(__item, __index) in data.ListExtra">
                      <b-col sm="3" :key="__index">
                        <template v-if="parseInt(__item.ExtraStatus) === 1">
                          <b-img
                            :src="
                              'http://imgsmartcity.namlongtekgroup.com/Icon/green_' +
                              __item.Icon.toLowerCase() +
                              '.svg'
                            "
                            style="height: 70px"
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
                            style="height: 70px"
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
                            :checked="convertBitToBoolean(__item.ExtraStatus)"
                            name="check-button"
                            switch
                          ></b-form-checkbox>
                        </template>
                        <template v-else>
                          <b-form-checkbox
                            class="ml-2 mb-4"
                            :checked="convertBitToBoolean(__item.ExtraStatus)"
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
                      <p class="text-muted text-small font-italic text-left">
                        {{ $t("map.no-data") }}
                      </p>
                    </b-col>
                  </template>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <template v-if="data.ListNode && data.ListNode.length > 0">
            <div class="custom-body-control-bottom">
              <b-row style="margin-right: 0; margin-left: 0">
                <template v-for="(node, i) in data.ListNode">
                  <template
                    v-if="node.ListMonitoring && node.ListMonitoring.length > 0"
                  >
                    <b-col lg="12" style="padding-left: 0; padding-right: 0">
                      <div
                        class="custom-body-node mt-4"
                        :class="{
                          'border-bottom': i + 1 < data.ListNode.length,
                        }"
                      >
                        <p class="text-muted">
                          <i class="fad fa-location mr-2"></i>
                          <strong>{{ node.StationNodeName }}</strong>
                        </p>
                        <b-row>
                          <template v-for="monitor in node.ListMonitoring">
                            <b-col
                              xl="2"
                              lg="3"
                              md="4"
                              sm="4"
                              class="text-center"
                            >
                              <radial-chart-apex-two
                                v-if="isShow"
                                :font-size="15"
                                :height="150"
                                :data="[monitor.InfoValue]"
                                :label="[
                                  monitor.InfoCode +
                                    ' (' +
                                    monitor.UnitName +
                                    ')',
                                ]"
                              ></radial-chart-apex-two>
                              <p
                                class="text-small text-muted font-weight-bold"
                                style="margin-top: -15px"
                              >
                                {{ monitor.InfoName }}
                              </p>
                              <template v-if="monitor.InfoValue < 0">
                                <p
                                  class="text-small text-muted font-italic"
                                  style="
                                    margin-top: -15px;
                                    color: red !important;
                                  "
                                >
                                  {{ $t("map.error-sensor") }}
                                </p>
                              </template>
                            </b-col>
                          </template>
                        </b-row>
                      </div>
                    </b-col>
                  </template>
                  <template v-else>
                    <b-col lg="12">
                      <p class="text-muted text-small font-italic text-left">
                        {{ $t("map.no-data") }}
                      </p>
                    </b-col>
                  </template>
                </template>
              </b-row>
            </div>
          </template>
        </div>
      </b-card>
    </b-collapse>
    <b-modal
      id="modal-detail"
      ref="modal-detail"
      :title="titleForm"
      @hidden="resetChartDetail"
      v-if="dataForm"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <b-row>
        <b-col md="12" class="text-center">
          <h2 class="font-weight-bold text-muted">
            {{ $t("dashboards.chart-active").toUpperCase() }}
          </h2>
        </b-col>
        <b-col md="12" class="text-center">
          <ul class="button-wrapper">
            <li
              id="day"
              :class="{
                active: typeLoadData === 'DAY',
                'none-click': typeLoadData === 'DAY',
              }"
              @click="setTypeLoadData('DAY', dataForm)"
            >
              <label id="l1">{{ $t("dashboards.day") }}</label>
            </li>
            <li
              id="month"
              :class="{
                active: typeLoadData === 'MONTH',
                'none-click': typeLoadData === 'MONTH',
              }"
              @click="setTypeLoadData('MONTH', dataForm)"
            >
              <label id="l2">{{ $t("dashboards.month") }}</label>
            </li>
            <li
              id="year"
              :class="{
                active: typeLoadData === 'YEAR',
                'none-click': typeLoadData === 'YEAR',
              }"
              @click="setTypeLoadData('YEAR', dataForm)"
            >
              <label id="l3">{{ $t("dashboards.year") }}</label>
            </li>
          </ul>
        </b-col>
        <template v-if="dataChartStation && dataChartStation.length > 0">
          <b-col md="12">
            <b-row>
              <template v-for="dataStation in dataChartStation">
                <b-col xl="6" lg="12" class="text-center">
                  <area-chart-apex
                    :area-chart="{ series: areaChartConvert(dataStation) }"
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
        <template
          v-if="dataChartNode && dataChartNode.length > 0"
          v-for="(nodeCharts, index) in dataChartNode"
        >
          <b-col :key="index" md="12">
            <b-row>
              <b-col md="12">
                <b-alert show class="font-weight-bold" variant="primary">
                  <i class="fad fa-location mr-2"></i>
                  {{ nodeCharts.name }}
                </b-alert>
              </b-col>
              <template v-if="nodeCharts.data && nodeCharts.data.length > 0">
                <template v-for="(nodeData, key) in nodeCharts.data">
                  <b-col :key="key" xl="4" lg="6" md="12" class="text-center">
                    <area-chart-apex
                      :area-chart="{ series: areaChartConvert(nodeData) }"
                    ></area-chart-apex>
                    <p class="text-muted font-weight-bold">
                      {{
                        nodeData.IndicatorName.toUpperCase() +
                        " (" +
                        nodeData.UnitName +
                        ")"
                      }}
                    </p>
                  </b-col>
                </template>
              </template>
              <template v-else>
                <b-col lg="12" class="mb-4">
                  <p class="text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
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
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import agricultureAPI from "@/api/modules/agricultureAPI";
import AreaChartApex from "@/components/Charts/AreaChartApex";

export default {
  components: {
    "radial-chart-apex-two": RadialChartApexTwo,
    "area-chart-apex": AreaChartApex,
  },
  props: ["data", "objectData", "indexStation"],
  watch: {
    data(to, from) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
    },
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
  },
  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      titleForm: null,
      dataForm: null,
      typeLoadData: "DAY",
      dataChartStation: null,
      dataChartNode: [],
      isActive: this.indexStation === 0 ? true : false,
    };
  },
  methods: {
    handleReloadData() {
      this.$emit("get-data-dashboard");
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
      agricultureAPI
        .agriStationChart(type, body)
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
          agricultureAPI
            .agriNodeChart(type, bodyNode)
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
      this.typeLoadData = "DAY";
      this.dataForm = null;
      this.titleForm = null;
      this.dataChartStation = null;
      this.dataChartNode = null;
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
      agricultureAPI
        .agriStationExtrasControl(body)
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
    await this.timerLoadDashboard(this.timer * 120);
  },
};
</script>
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
</style>
