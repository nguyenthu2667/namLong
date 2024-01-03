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
        <b-row>
          <template v-for="device in dataModal.DeviceInfoProperties">
            <template v-if="device.InfoCode === 'OPEN'">
              <b-colxx md="6">
                <b-form-group class="mb-0" :label="device.InfoName + ':'">
                  <b-alert
                    class="text-center"
                    show
                    style="background-color: rgb(255, 0, 50); color: black"
                    v-if="parseInt(device.InfoValue) === 1"
                  >
                    <strong>
                      <i class="fas fa-lock-open"></i>
                      {{ $t("modal.device-open") }}
                    </strong>
                  </b-alert>
                  <b-alert
                    class="text-center"
                    show
                    style="background-color: rgb(60, 179, 113); color: black"
                    v-else
                  >
                    <strong>
                      <i class="fas fa-lock"></i>
                      {{ $t("modal.device-close") }}
                    </strong>
                  </b-alert>
                </b-form-group>
              </b-colxx>
            </template>
            <template v-else-if="device.InfoCode === 'STT'">
              <b-colxx md="6">
                <b-form-group class="mb-0" :label="device.InfoName + ':'">
                  <b-alert
                    class="text-center"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <strong>
                      {{ device.InfoValue + " " }}
                    </strong>
                  </b-alert>
                </b-form-group>
              </b-colxx>
            </template>
          </template>
          <template v-for="(monitor, index) in dataModal.MonitorInfoProperties">
            <b-col :key="index" class="text-center mb-2">
              <div>
                <cus-cirle-pie-semi
                  :value="parseInt(monitor.IndicatorValue)"
                  :label="
                    monitor.IndicatorValue + ' (' + monitor.UnitName + ')'
                  "
                />
              </div>
              <div
                style="font-size: 13px"
                class="text-small text-muted font-weight-bold mt-2"
              >
                {{ monitor.IndicatorName }}
              </div>
            </b-col>
            <template v-if="index == 1">
              <template v-for="device in dataModal.DeviceInfoProperties">
                <template v-if="device.InfoCode === 'LV'">
                  <b-col class="text-center mb-2">
                    <div>
                      <cus-cirle-pie-semi
                        :value="parseInt(device.InfoValue)"
                        :label="device.InfoValue + ' (' + device.Unitname + ')'"
                      />
                    </div>
                    <div
                      style="font-size: 13px"
                      class="text-small text-muted font-weight-bold mt-2"
                    >
                      {{ device.InfoName }}
                    </div>
                  </b-col>
                </template>
              </template>
            </template>
          </template>
          <template v-if="dataModal.ActionID === 5 && !dataModal.IsSchedule">
            <b-colxx md="12"><br /></b-colxx>
            <b-colxx md="12">
              <b class="mr-2">
                <i class="fas fa-sliders-h mr-2"></i>
                {{ $t("modal.advanced-control").toUpperCase() }}
              </b>
            </b-colxx>
            <b-colxx md="12"><br /></b-colxx>
            <b-colxx md="2">
              <b-form-group class="mb-0" :label="$t('modal.on-off-lamp') + ':'">
                <b-form-checkbox
                  class="mt-2"
                  v-model="lampControl"
                  name="check-button"
                  switch
                  size="md"
                  @change="closeLampControl(dataModal)"
                >
                  <template v-if="lampControl">
                    <b>{{ $t("modal.on") }}</b>
                  </template>
                  <template v-else>
                    <b>{{ $t("modal.off") }}</b>
                  </template>
                </b-form-checkbox>
              </b-form-group>
            </b-colxx>
            <b-colxx xl="4">
              <template v-if="lampControl && !dataModal.IsSchedule">
                <b-form-group
                  class="mb-3"
                  :label="$t('modal.light-level') + ':'"
                >
                  <b-form-select
                    v-model="dataModal.LightID"
                    :options="lightOption"
                  ></b-form-select>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="6"></b-colxx>
            <template v-if="lampControl && !dataModal.IsSchedule">
              <b-colxx md="6">
                <span class="float-right">
                  <!-- <template v-if="dataChange"> -->
                  <b-button
                    size="sm"
                    variant="success"
                    class="mr-2"
                    @click="changeLampControl(dataModal)"
                  >
                    {{ $t("modal.change") }}
                  </b-button>
                  <b-button
                    size="sm"
                    variant="danger"
                    class="mr-2"
                    @click="cancelSubmitControl(dataModalHistory)"
                  >
                    {{ $t("modal.cancel") }}
                  </b-button>
                </span>
              </b-colxx>
            </template>
          </template>
        </b-row>
        <b-row>
          <b-col lg="12">
            <b-tabs class="mt-2" content-class="mt-1" fill>
              <b-tab title="BIỂU ĐỒ THỐNG KÊ">
                <b-row>
                  <b-col md="12" class="text-right mt-2">
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
                          <b-col
                            :key="index"
                            xl="6"
                            lg="12"
                            class="text-center"
                          >
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
              </b-tab>
              <b-tab title="LỊCH SỬ HOẠT ĐỘNG">
                <b-tabs class="mt-2" content-class="mt-1" fill>
                  <b-tab title="LỊCH SỬ HIỆN TẠI">
                    <template
                      v-if="
                        dataHistory &&
                        dataHistory.Actions &&
                        dataHistory.Actions.length > 0
                      "
                    >
                      <b-table
                        :fields="fieldHistoryCurrent"
                        :items="dataHistory.Actions"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPage"
                      ></b-table>
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
                  </b-tab>
                  <b-tab title="LỊCH SỬ MẤT KẾT NỐI">
                    <template
                      v-if="
                        dataHistory &&
                        dataHistory.Disconnects &&
                        dataHistory.Disconnects.length > 0
                      "
                    >
                      <b-table
                        :fields="fieldHistoryDisconnect"
                        :items="dataHistory.Disconnects"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPage"
                      ></b-table>
                      <b-pagination
                        size="sm"
                        align="center"
                        :total-rows="totalRowsDisconnect"
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
                  </b-tab>
                  <b-tab title="LỊCH SỬ BỊ DI CHUYỂN"> Chưa có dữ liệu </b-tab>
                  <b-tab title="LỊCH SỬ BỊ LỖI">
                    <template
                      v-if="
                        dataHistory &&
                        dataHistory.Errors &&
                        dataHistory.Errors.length > 0
                      "
                    >
                      <b-table
                        :fields="fieldHistoryError"
                        :items="dataHistory.Errors"
                        :select-mode="selectMode"
                        :row-page="10"
                        class="text-center"
                        :per-page="perPage"
                        :current-page="currentPage"
                      ></b-table>
                      <b-pagination
                        size="sm"
                        align="center"
                        :total-rows="totalRowsError"
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
                  </b-tab>
                </b-tabs>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import lightAPI from "@/api/modules/lightAPI";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import CusCirlePieSemi from "@/components/Charts/CusCirlePieSemi";
import AreaChartApex from "@/components/Charts/AreaChartApex";

export default {
  components: {
    "radial-chart-apex-two": RadialChartApexTwo,
    "cus-cirle-pie-semi": CusCirlePieSemi,
    "area-chart-apex": AreaChartApex,
  },
  props: [
    "dataParent",
    "objectData",
    "reloadData",
    "lampControl",
    "dataModalHistory",
    "lightOption",
  ],
  watch: {
    dataModal(to, from) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 1000);
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName?.toUpperCase() ==
          this.dataParent.moduleType?.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.StationID == this.dataParent.StationID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
  },
  created() {
    if (this.dataModal["IsSchedule"] != undefined) {
      this.dataModal.IsSchedule = !!this.dataModal.IsSchedule;
    }
  },
  mounted() {
    this.getDataHistory(this.typeLoadByID);
    this.getDataChart(this.typeLoadData, this.typeLoadByID);
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      // lampControl: this._lampControl,
      selectMode: "single",
      isShow: false,
      animated: true,
      typeLoadData: "Week",
      typeLoadByID: this.dataParent.StationID,
      dataChart: null,
      fieldHistoryCurrent: [
        {
          key: "UserFullName",
          label: "Tên",
          tdClass: "text-center",
        },
        {
          key: "LampID",
          label: "Đèn",
          tdClass: "text-center",
        },
        {
          key: "LightID",
          label: "Mức sáng",
          tdClass: "text-center",
        },
        {
          key: "UpdateTime",
          label: "Cập nhật lúc",
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      fieldHistoryDisconnect: [
        {
          key: "StationID",
          label: "Đèn",
          tdClass: "text-center",
        },
        {
          key: "TimeError",
          label: "Thời gian bị mất (phút)",
          tdClass: "text-center",
        },
        {
          key: "CreateDate",
          label: "Thời gian",
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      fieldHistoryError: [
        {
          key: "StationID",
          label: "Đèn",
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
      dataHistory: null,
      totalRows: 0,
      totalRowsDist: 0,
      totalRowsError: 0,
      totalRowsDisconnect: 0,
      perPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    getDataHistory(id) {
      let body = {
        LampID: id,
      };
      lightAPI
        .lampHistory(body)
        .then((val) => {
          this.dataHistory = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTypeLoadData(type) {
      this.typeLoadData = type;
      this.getDataChart(type, this.typeLoadByID);
    },
    getDataChart(type, id) {
      let body = {
        Type: type,
        StationID: id,
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
          objArea.data.push([
            handling.convertDateToTimeStamp(objAreaData[k].ItemDate),
            parseFloat(objAreaData[k].IndicatorValue),
          ]);
        }
      }
      seriesArea.push(objArea);
      return seriesArea;
    },
    handleReloadData() {
      this.$emit("reload-data");
    },
    changeLampControl(data) {
      let body = {
        CabinetID: data.CabinetID,
        LightID: data.LightID,
        ActionID: data.ActionID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      let state = this.lampControl;
      lightAPI
        .mapCabinetActionLamp(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.handleReloadData();
              if (state) {
                this.lampControl = true;
              } else {
                this.lampControl = false;
              }
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              if (state) {
                this.lampControl = false;
              } else {
                this.lampControl = true;
              }
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
            if (state) {
              this.lampControl = false;
            } else {
              this.lampControl = true;
            }
          }, this.timer);
          console.log(err);
        });
      this.dataChange = false;
    },
    closeLampControl(data) {
      if (!this.lampControl) {
        let body = {
          CabinetID: data.CabinetID,
          LightID: 0,
          ActionID: data.ActionID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        let state = this.lampControl;
        lightAPI
          .mapCabinetActionLamp(body)
          .then((val) => {
            if (val.status) {
              this.handleReloadData();
              setTimeout(() => {
                // if (this.$route.query.layers) {
                //   let stringLayer = ''
                //   if (typeof this.$route.query.layers === 'string') {
                //     stringLayer = stringLayer + this.$route.query.layers + ';'
                //   } else {
                //     for (let j = 0; j < this.$route.query.layers.length; j++) {
                //       stringLayer =
                //         stringLayer + this.$route.query.layers[j] + ';'
                //     }
                //   }
                //   this.getMapNowByCode(stringLayer)
                // }
                if (state) {
                  this.lampControl = true;
                } else {
                  this.lampControl = false;
                }
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              setTimeout(() => {
                if (state) {
                  this.lampControl = false;
                } else {
                  this.lampControl = true;
                }
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
              if (state) {
                this.lampControl = false;
              } else {
                this.lampControl = true;
              }
            }, this.timer);
            console.log(err);
          });
        this.dataChange = false;
      }
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    cancelSubmitControl(history) {
      this.dataModal.LightID = history.LightID;
      this.dataModal.ActionID = history.ActionID;
      this.dataChange = false;
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
</style>
