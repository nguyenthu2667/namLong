<template>
  <div style="cursor: pointer">
    <b-row v-if="dataFollow && dataFollow.length > 0">
      <b-col xl="6" lg="6">
        <b-card style="height: 430px" class="mb-2" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block pt-1">
                <strong>{{
                  $t("tabs.title.analysis-chart").toUpperCase()
                }}</strong>
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
      <b-col xl="6" lg="6">
        <b-card style="height: 430px" class="mb-2" no-body>
          <div class="p-2 mb-2" style="padding-top: 12px">
            <strong>
              {{ $t("dashboards.history-station").toUpperCase() }}
            </strong>
          </div>
          <div>
            <b-table
              :sticky-header="true"
              :bordered="true"
              :hover="true"
              :items="itemsHis"
              :fields="fieldsHis"
              head-variant="light"
              class="text-center text-small mb-0"
            >
              <template v-slot:cell(_updateTime)="slot">
                <p class="p-0 m-0 text-small">
                  {{ convertDateTime(slot.item.UpdateTime) }}
                </p>
              </template>
            </b-table>
          </div>
        </b-card>
      </b-col>
      <b-col xl="12" lg="12">
        <gas-detector-monitors :keyShow="'dashboard'"></gas-detector-monitors>
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
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import systemAPI from "@/api/modules/systemAPI";
import ListItem from "./component/ListItem";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import handling from "@/constants/handling";
import GasDetectorMonitors from "./component/GasDetectorMonitors";

export default {
  components: {
    "list-item": ListItem,
    "multi-area-shadow-chart": MultiAreaShadowChart,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "gas-detector-monitors": GasDetectorMonitors,
  },
  data() {
    return {
      timer: 500,
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
          label: this.$t("form.detector") + " (lần)",
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
        // {
        //   label: this.$t('form.end') + ' gas' + ' (m³)',
        //   borderColor: '#ffb64d',
        //   pointBorderColor: '#ffb64d',
        //   pointHoverBackgroundColor: '#ffb64d',
        //   pointHoverBorderColor: 'black',
        //   pointBackgroundColor: '#ffb64d',
        //   pointBorderColor: '#ffb64d',
        //   borderWidth: 2,
        //   backgroundColor: this.gradient2,
        //   data: [],
        // },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemHH.split("-")[1]);
        for (const key in item) {
          if (key === "SL_Detector") {
            result[0].data.push(item[key]);
          }
          // if (key === 'SL_GasEnd') {
          //   result[1].data.push(item[key])
          // }
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
      systemAPI
        .getMenus()
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
    await this.timerLoadDashboard(this.timer * 15);
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
  height: 300px;
}
</style>
