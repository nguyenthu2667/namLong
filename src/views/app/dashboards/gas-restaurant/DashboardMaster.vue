<template>
  <div style="cursor: pointer">
    <b-row v-if="dataFollow && dataFollow.length > 0">
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-qr-code"
          :title="`${dataFollow[0].Total_Export} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Export_Description"
          :percent="100"
          :progressText="dataFollow[0].Total_Export"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-home"
          :title="`${dataFollow[0].Total_Deploy} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Deploy_Description"
          :percent="
            (dataFollow[0].Total_Deploy * 100) / dataFollow[0].Total_Export
          "
          :progressText="
            dataFollow[0].Total_Deploy + '/' + dataFollow[0].Total_Export
          "
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="iconsminds-box-close"
          :title="`${dataFollow[0].Total_Inventory} ${$t('cards.device')}`"
          :detail="dataFollow[0].Total_Inventory_Description"
          :percent="
            (dataFollow[0].Total_Inventory * 100) / dataFollow[0].Total_Export
          "
          :progressText="
            dataFollow[0].Total_Inventory + '/' + dataFollow[0].Total_Export
          "
        />
      </b-col>
      <b-col lg="6">
        <b-card style="height: 430px" class="mb-4" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h4 class="d-inline">{{ $t("tabs.title.analysis-chart") }}</h4>
              </div>
            </div>
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelChart"
                :data="dataChart"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card :title="$t('dashboards.history-station')" style="height: 430px">
          <b-row>
            <b-colxx lg="12">
              <b-table
                :responsive="true"
                :sticky-header="true"
                :no-border-collapse="true"
                :bordered="true"
                :hover="true"
                :items="itemsHis"
                :fields="fieldsHis"
                head-variant="light"
                class="text-center text-small mb-0"
                style="max-height: 305px"
              >
                <template v-slot:cell(_updateTime)="slot">
                  <p class="p-0 m-0 text-small">
                    {{ convertDateTime(slot.item.UpdateTime) }}
                  </p>
                </template>
              </b-table>
            </b-colxx>
          </b-row>
        </b-card>
      </b-col>
      <b-col xl="4" class="mb-4">
        <b-card style="height: 480px" :title="$t('cards.deploy-info')">
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_CusUsing_Description }}
              <template
                v-if="dataFollow[0].Total_CusUsing_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_CusUsing_Description,
                      dataFollow[0].ShowAllProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_CusUsing_Description,
                      dataFollow[0].ShowAllProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_CusUsing }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_CusUsing / dataFollow[0].Total_Deploy) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_Disconnect_Description }}
              <template
                v-if="dataFollow[0].Total_Disconnect_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Disconnect_Description,
                      dataFollow[0].DisconnectProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Disconnect_Description,
                      dataFollow[0].DisconnectProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_Disconnect }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_Disconnect / dataFollow[0].Total_Deploy) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_Detected_Description }}
              <template
                v-if="dataFollow[0].Total_Detected_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Detected_Description,
                      dataFollow[0].DetectedProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_Detected_Description,
                      dataFollow[0].DetectedProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_Detected }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_Detected / dataFollow[0].Total_Deploy) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_EndGas_Description }}
              <template v-if="dataFollow[0].Total_EndGas_Description === title">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_EndGas_Description,
                      dataFollow[0].EndGasProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_EndGas_Description,
                      dataFollow[0].EndGasProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_EndGas }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_EndGas / dataFollow[0].Total_Deploy) * 100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ dataFollow[0].Total_LittleGas_Description }}
              <template
                v-if="dataFollow[0].Total_LittleGas_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_LittleGas_Description,
                      dataFollow[0].LittleGasProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_LittleGas_Description,
                      dataFollow[0].LittleGasProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_LittleGas }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_LittleGas / dataFollow[0].Total_Deploy) *
                100
              "
            ></b-progress>
          </div>
          <div>
            <p class="mb-2">
              {{ dataFollow[0].Total_ErrSensor_Description }}
              <template
                v-if="dataFollow[0].Total_ErrSensor_Description === title"
              >
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_ErrSensor_Description,
                      dataFollow[0].ErrorSensorProperties
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      dataFollow[0].Total_ErrSensor_Description,
                      dataFollow[0].ErrorSensorProperties
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ dataFollow[0].Total_ErrSensor }}/{{
                  dataFollow[0].Total_Deploy
                }}
              </span>
            </p>
            <b-progress
              :value="
                (dataFollow[0].Total_ErrSensor / dataFollow[0].Total_Deploy) *
                100
              "
            ></b-progress>
          </div>
        </b-card>
      </b-col>
      <b-col xl="8" class="mb-4">
        <b-col xl="12">
          <h5 class="text-muted">
            <strong>{{ title.toUpperCase() }}</strong>
          </h5>
        </b-col>
        <b-col xl="12">
          <div class="mb-2">
            <b-button
              variant="empty"
              class="pt-0 pl-0 d-inline-block d-md-none"
              v-b-toggle.displayOptions
            >
              <i class="simple-icon-arrow-down align-middle" />
            </b-button>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <div
                  class="search-sm d-inline-block float-md-left mr-1 align-top"
                >
                  <b-input
                    :placeholder="$t('form.customer-name')"
                    v-model="search"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-3" />
        </b-col>
        <template v-if="convertItems && convertItems.length > 0">
          <b-col lg="12" class="mb-4 pr-0">
            <b-row>
              <vue-perfect-scrollbar
                class="scroll follow-list-station"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <b-col
                  lg="12"
                  class="mb-3 pr-0"
                  v-for="(item, index) in convertItems"
                  :key="index"
                  :id="item.StationID"
                >
                  <list-item
                    :key="item.StationID"
                    :data="item"
                    :object-data="objectData ? objectData : null"
                    @status-edit="lockGasModal"
                  />
                </b-col>
              </vue-perfect-scrollbar>
            </b-row>
            <b-row>
              <b-colxx xxs="12">
                <b-pagination
                  :total-rows="totalRows"
                  v-model="page"
                  :per-page="perPage"
                  size="sm"
                  align="center"
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
              </b-colxx>
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
      </b-col>
    </b-row>
    <b-modal
      id="modal-lock"
      ref="modal-lock"
      :title="
        lockStation && lockStation.IsLock
          ? $t('dashboards.gas-lock-open')
          : $t('dashboards.gas-lock')
      "
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalLock"
      @ok="handleOkLock"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitLock">
        <b-form-group
          :state="lockState"
          :label="$t('dashboards.reason') + ':'"
          label-for="lock-input"
          :invalid-feedback="$t('dashboards.enter-reason')"
        >
          <b-form-input
            id="lock-input"
            v-model="lock"
            :state="lockState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import systemAPI from "@/api/modules/systemAPI";
import ListItem from "./component/ListItem";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import handling from "@/constants/handling";
import { ThemeColors } from "@/utils";
const colors = ThemeColors();

export default {
  components: {
    "list-item": ListItem,
    "multi-area-shadow-chart": MultiAreaShadowChart,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
  },
  data() {
    return {
      timer,
      menuRight: [],
      dataFollow: null,
      displayMode: "thumb",
      page: 1,
      perPage: 5,
      totalRows: 0,
      search: "",
      title: null,
      items: null,
      itemsHis: null,
      filterItems: null,
      convertItems: null,
      selectChartOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChart: [
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
      typeUseGasHis: null,
      showChart: false,
      areaCharts: null,
      dataChart: null,
      labelChart: null,
      gradient: null,
      gradient2: null,
      //
      fieldsHis: [
        {
          key: "StationName",
          label: this.$t("dashboards.aqua-name"),
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "ContentValue",
          label: this.$t("report.warning"),
          tdClass: "font-weight-bold text-muted",
        },
        {
          key: "_updateTime",
          label: this.$t("dashboards.timer"),
          tdClass: "text-muted",
        },
      ],
      lockState: null,
      lock: "",
      lockStation: null,
    };
  },
  watch: {
    search(to, from) {
      if (this.items.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.items, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              newArr
            );
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.convertItems = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.convertItems = this.paginationData(
            this.page,
            this.perPage,
            this.items
          );
          this.totalRows = this.items.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.convertItems = this.paginationData(
          to,
          this.perPage,
          this.filterItems
        );
        this.totalRows = this.filterItems.length;
      } else {
        this.convertItems = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  methods: {
    changeChartOption(item) {
      this.selectChartOption = item;
      this.showChart = false;
      this.areaCharts = [];
      this.getDataChart();
    },
    getDataChart() {
      let body = {
        Type: this.selectChartOption.value,
      };
      gasRestaurantAPI
        .gasRestaurantChart(body)
        .then((val) => {
          if (val.data && val.data.length > 0) {
            this.convertDataChartMultiAreaShadow(val.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDataChartMultiAreaShadow(data) {
      //contructor
      let labelDate = [];
      let result = [
        {
          label: this.$t("form.detector") + " (m³)",
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          backgroundColor: this.gradient,
          data: [],
        },
        {
          label: this.$t("form.end") + " gas" + " (m³)",
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemHH.split("-")[1]);
        for (const key in item) {
          if (key === "SL_Detector") {
            result[0].data.push(item[key]);
          }
          if (key === "SL_GasEnd") {
            result[1].data.push(item[key]);
          }
        }
      });
      this.labelChart = labelDate;
      this.dataChart = result;
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    },
    submitLockOK(note, items) {
      let body = {
        StationID: items.StationID,
        IsLock: handling.convertBooleanToBit(!items.IsLock),
        LockDescription: note,
      };
      gasRestaurantAPI.gasRestaurantLock(body).then((val) => {
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
      });
    },
    handleSubmitLock() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitLockOK(this.lock, this.lockStation);
        this.$bvModal.hide("modal-lock");
      });
    },
    handleOkLock(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitLock();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.lockState = valid;
      return valid;
    },
    resetModalLock() {
      this.lock = "";
      this.lockState = null;
      this.lockStation = null;
      this.getDataDashboard();
    },
    lockGasModal(items) {
      this.lockStation = items;
      setTimeout(() => {
        this.$bvModal.show("modal-lock");
      }, 200);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    listHistory() {
      gasRestaurantAPI
        .gasRestaurantHistory()
        .then((val) => {
          this.itemsHis = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "StationName") {
            if (
              i[j].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
            ) {
              status = true;
            }
          }
        });
        if (status) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    paginationData(page, perPage, array) {
      let newArray = [];
      array.forEach((val, index) => {
        if (page === 1) {
          if (index < perPage) {
            newArray.push(val);
          }
        } else {
          if (index >= perPage * (page - 1) && index < perPage * page) {
            newArray.push(val);
          }
        }
      });
      return newArray;
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    listStation(title, array) {
      this.search = "";
      this.items = array;
      this.convertItems =
        array.length > 0
          ? this.paginationData(this.page, this.perPage, array)
          : null;
      this.totalRows = array.length > 0 ? array.length : 0;
      this.title = title;
    },
    getDataDashboard() {
      gasRestaurantAPI
        .gasRestaurantDashboard()
        .then((val) => {
          this.dataFollow = val.status ? val.data : [];
          if (this.search.length > 0) {
            let newArr = [];
            this.dataFollow[0].ShowAllProperties.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.StationID === ele.StationID) {
                  newArr.push(item);
                }
              });
              this.convertItems = newArr;
            });
          } else {
            this.listStation(
              this.dataFollow[0].Total_CusUsing_Description,
              this.dataFollow[0].ShowAllProperties
            );
            this.filterItems = null;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
            this.totalRows = this.items.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDashboard(time) {
      this.getDataDashboard();
      this.listHistory();
      if (this.selectChartOption) {
        this.getDataChart();
      }
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
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
  async created() {
    await this.getListMenuRight();
    await this.timerLoadDashboard(this.timer * 60);
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
};
</script>

<style scoped>
.btn-i-custom:hover {
  color: red;
}
.follow-list-station {
  width: 100%;
  height: 400px;
}
</style>
