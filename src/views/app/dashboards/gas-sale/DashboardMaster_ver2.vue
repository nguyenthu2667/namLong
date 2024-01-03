<template>
  <div>
    <div v-if="dataFollow && dataFollow.length > 0" class="mb-2">
      <b-dropdown
        id="dropdown-form"
        ref="dropdown"
        left
        variant="empty"
        toggle-class="p-0"
        no-caret
        class="pb-1"
      >
        <template slot="button-content">
          <span v-b-toggle.collapse-header>
            <i class="fad fa-cog" style="font-size: 18px"></i>
          </span>
        </template>
        <b-dropdown-form>
          <b-form-input
            class="mt-1"
            id="search-input"
            type="search"
            size="sm"
            v-model="searchText"
            :placeholder="$t('panel.search-input-monitor')"
            style="min-width: 200px"
          ></b-form-input>
          <template v-if="searchText && searchText !== ''">
            <template v-if="optionSearch(searchText).length > 0">
              <p class="mt-3 mb-0 text-muted font-italic text-small">
                {{ $t("panel.total") }}
                {{ optionSearch(searchText).length }}
                {{ $t("panel.result") }}
              </p>
            </template>
            <template v-else>
              <p class="mt-3 mb-0 text-muted font-italic text-small">
                {{ $t("panel.non-data") }}
              </p>
            </template>
          </template>
          <template v-else>
            <p class="mt-3 mb-0 text-muted font-italic text-small">
              {{ $t("panel.total") }} {{ dataFollow.length }}
              {{ $t("panel.result") }}
            </p>
          </template>
        </b-dropdown-form>
        <b-dropdown-divider></b-dropdown-divider>
        <vue-perfect-scrollbar
          class="list-item-station-option"
          :settings="{ suppressScrollX: true, wheelPropagation: false }"
        >
          <template v-if="searchText && searchText !== ''">
            <b-dropdown-item
              v-for="(station, index) in optionSearch(searchText)"
              :key="index"
              @click="changeStation(station)"
            >
              <span class="item-station-option">
                {{ station.StoreName }}
              </span>
            </b-dropdown-item>
          </template>
          <template v-else>
            <b-dropdown-item
              v-for="(station, index) in dataFollow"
              :key="index"
              @click="changeStation(station)"
            >
              <span class="item-station-option">
                {{ station.StoreName }}
              </span>
            </b-dropdown-item>
          </template>
        </vue-perfect-scrollbar>
      </b-dropdown>
      <template v-if="selectedData">
        <span class="ml-2 h5 text-muted">
          <strong>{{ selectedData.StoreName }}</strong>
        </span>
      </template>
    </div>
    <b-row>
      <b-col lg="8">
        <b-row>
          <b-col sm="12" md="6" lg="6" class="mb-4">
            <b-card
              :title="$t('dashboards.order-overview')"
              style="height: 310px"
            >
              <template v-if="data && data.Orders && data.Orders.length > 0">
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-receipt mr-2"></i>
                    {{ data.Orders[0].TotalOrdersNote }}
                    <span class="float-right text-muted">
                      {{ data.Orders[0].TotalOrders }}
                    </span>
                  </p>
                  <b-progress
                    :value="data.Orders[0].TotalOrders * 100"
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-times-circle mr-2"></i>
                    {{ data.Orders[0].OrdersCancelledNote }}
                    <span class="float-right text-muted">
                      {{ data.Orders[0].OrdersCancelled }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Orders[0].OrdersCancelled) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-spinner-third mr-2"></i>
                    {{ data.Orders[0].OrdersPendingNote }}
                    <span class="float-right text-muted">
                      {{ data.Orders[0].OrdersPending }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Orders[0].OrdersPending) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-file-check mr-2"></i>
                    {{ data.Orders[0].TotalApprovalNote }}
                    <span class="float-right text-muted">
                      {{ data.Orders[0].TotalApproval }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Orders[0].TotalApproval) * 100
                    "
                  ></b-progress>
                </div>
              </template>
              <template v-else>
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-card>
          </b-col>
          <b-col sm="12" md="6" lg="6" class="mb-4">
            <b-card
              :title="$t('dashboards.sale-slip-overview')"
              style="height: 310px"
            >
              <template v-if="data && data.Sales && data.Sales.length > 0">
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-receipt mr-2"></i>
                    {{ data.Sales[0].TotalSaleNote }}
                    <span class="float-right text-muted">
                      {{ data.Sales[0].TotalSales }}
                    </span>
                  </p>
                  <b-progress
                    :value="data.Sales[0].TotalSales * 100"
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-times-circle mr-2"></i>
                    {{ data.Sales[0].SalesCancelledNote }}
                    <span class="float-right text-muted">
                      {{ data.Sales[0].SalesCancelled }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Sales[0].SalesCancelled) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-file-check mr-2"></i>
                    {{ data.Sales[0].SalesDeliveryNote }}
                    <span class="float-right text-muted">
                      {{ data.Sales[0].SalesDelivery }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Sales[0].SalesDelivery) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-spinner-third mr-2"></i>
                    {{ data.Sales[0].SalesPendingNote }}
                    <span class="float-right text-muted">
                      {{ data.Sales[0].SalesPending }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Sales[0].SalesPending) * 100
                    "
                  ></b-progress>
                </div>
              </template>
              <template v-else>
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-card>
          </b-col>
          <b-col lg="12" class="mb-4">
            <b-card
              :title="$t('dashboards.recent-collect')"
              style="height: 427px"
            >
              <template
                v-if="data && data.Histories && data.Histories.length > 0"
              >
                <b-table
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="data.Histories.filter((x, i) => i < 30)"
                  :fields="fieldsHis"
                  head-variant="light"
                  class="text-center text-small mb-0"
                  style="height: 320px"
                ></b-table>
              </template>
              <template v-else>
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-row>
          <b-col lg="12">
            <b-card
              class="mb-4"
              :title="$t('dashboards.delivery-overview')"
              style="height: 310px"
            >
              <template
                v-if="data && data.Deliveries && data.Deliveries.length > 0"
              >
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-receipt mr-2"></i>
                    {{ data.Deliveries[0].TotalDeliverieNote }}
                    <span class="float-right text-muted">
                      {{ data.Deliveries[0].TotalDeliveries }}
                    </span>
                  </p>
                  <b-progress
                    :value="data.Deliveries[0].TotalDeliveries * 100"
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fas fa-times-circle mr-2"></i>
                    {{ data.Deliveries[0].DeliveriesCancelledNote }}
                    <span class="float-right text-muted">
                      {{ data.Deliveries[0].DeliveriesCancelled }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(
                        data.Deliveries[0].DeliveriesCancelled
                      ) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-shipping-fast mr-2"></i>
                    {{ data.Deliveries[0].DeliveringNote }}
                    <span class="float-right text-muted">
                      {{ data.Deliveries[0].Delivering }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Deliveries[0].Delivering) * 100
                    "
                  ></b-progress>
                </div>
                <div class="mb-4">
                  <p class="mb-2">
                    <i class="fad fa-box-check mr-2"></i>
                    {{ data.Deliveries[0].DeliveredNote }}
                    <span class="float-right text-muted">
                      {{ data.Deliveries[0].Delivered }}
                    </span>
                  </p>
                  <b-progress
                    :value="
                      convertStringToEval(data.Deliveries[0].Delivered) * 100
                    "
                  ></b-progress>
                </div>
              </template>
              <template v-else>
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-card>
          </b-col>
          <b-col lg="12">
            <b-card no-body class="mb-4">
              <b-card-body style="height: 126px">
                <template
                  v-if="data && data.Revenues && data.Revenues.length > 0"
                >
                  <p class="lead color-theme-1 mb-1 value">
                    <i class="far fa-money-bill-alt mr-2"></i>
                    {{ convertFloat(data.Revenues[0].Today_Amnt) }}
                  </p>
                  <br />
                  <p class="mb-0 label text-small float-right">
                    {{ data.Revenues[0].Today_AmntNote }} ({{
                      $t("dashboards.unit")
                    }}: VNĐ)
                  </p>
                </template>
                <template v-else>
                  <p class="text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </b-card-body>
            </b-card>
            <b-card no-body class="mb-4">
              <b-card-body style="height: 126px">
                <template
                  v-if="data && data.Revenues && data.Revenues.length > 0"
                >
                  <p class="lead color-theme-1 mb-1 value">
                    <i class="far fa-money-bill-alt mr-2"></i>
                    {{ convertFloat(data.Revenues[0].SevenDaysAgo_Amnt) }}
                  </p>
                  <br />
                  <p class="mb-0 label text-small float-right">
                    {{ data.Revenues[0].SevenDaysAgo_AmntNote }} ({{
                      $t("dashboards.unit")
                    }}: VNĐ)
                  </p>
                </template>
                <template v-else>
                  <p class="text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </b-card-body>
            </b-card>
            <b-card no-body class="mb-4">
              <b-card-body style="height: 126px">
                <template
                  v-if="data && data.Revenues && data.Revenues.length > 0"
                >
                  <p class="lead color-theme-1 mb-1 value">
                    <i class="far fa-money-bill-alt mr-2"></i>
                    {{ convertFloat(data.Revenues[0].ThirtyDaysAgo_Amnt) }}
                  </p>
                  <br />
                  <p class="mb-0 label text-small float-right">
                    {{ data.Revenues[0].ThirtyDaysAgo_AmntNote }} ({{
                      $t("dashboards.unit")
                    }}: VNĐ)
                  </p>
                </template>
                <template v-else>
                  <p class="text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="mb-4">
        <b-card no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">{{ $t("tabs.title.analysis-chart") }}</h5>
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
          <div class="chart card-body pt-0 pb-0">
            <template v-if="showChart">
              <b-row>
                <b-col lg="6" class="mb-4">
                  <multi-area-shadow-chart
                    :labelDate="labelDateOrders"
                    :data="dataChartOrders.items"
                    :height="340"
                  />
                  <p class="text-center mb-0">
                    {{ $t("dashboards.sale-statistics") }}
                    dataChartOrders
                  </p>
                </b-col>
                <b-col lg="6" class="mb-4">
                  <multi-area-shadow-chart
                    :labelDate="labelDateOrders"
                    :data="dataTotalAmntOrders"
                    :height="340"
                  />
                  <p class="text-center mb-0">
                    {{ $t("dashboards.revenue-sale") }}
                    dataTotalAmntOrders
                  </p>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6" class="mb-4">
                  <multi-area-shadow-chart
                    :labelDate="labelDateContracts"
                    :data="dataChartContracts.items"
                    :height="340"
                  />
                  <p class="text-center mb-0">
                    {{ $t("dashboards.order-statistics") }}
                    dataChartContracts
                  </p>
                </b-col>
                <b-col lg="6" class="mb-4">
                  <multi-area-shadow-chart
                    :labelDate="labelDateContracts"
                    :data="dataTotalAmntContracts"
                    :height="340"
                  />
                  <p class="text-center mb-0">
                    {{ $t("dashboards.revenue-order") }}
                  </p>
                  dataTotalAmntContracts
                </b-col>
              </b-row>
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import gasSalesAPI from "@/api/modules/gasSalesAPI";
import systemAPI from "@/api/modules/systemAPI";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import handling from "@/constants/handling";
import { ThemeColors } from "@/utils";
import Card from "@/components/Cards/CardDoupleValue";

const colors = ThemeColors();

export default {
  components: {
    card: Card,
    "multi-area-shadow-chart": MultiAreaShadowChart,
  },
  data() {
    return {
      apikey: "gHuEn9ghiy20CHSHAJ4ccgWcdU0XWkGS",
      city_key: 353981, //hcm
      dataWeather: [],
      timer,
      menuRight: [],
      data: null,
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
      showChart: false,
      dataChartContracts: null,
      labelDateContracts: null,
      dataChartOrders: null,
      labelDateOrders: null,
      dataTotalAmntContracts: null,
      dataTotalAmntOrders: null,
      //
      dataRevenues: null,
      dataHistory: null,
      fieldsHis: [
        {
          key: "StatusName",
          label: this.$t("status.status"),
          tdClass: "text-left",
        },
        {
          key: "OID",
          label: this.$t("dashboards.OID-delivery"),
        },
        {
          key: "StationName",
          label: this.$t("modal.customers"),
          tdClass: "text-left",
        },
        {
          key: "UserFullName",
          label: this.$t("dashboards.employer"),
          tdClass: "text-left",
        },
        {
          key: "Statustime",
          label: this.$t("dashboards.update-time"),
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      dataFollow: null,
      selectedData: null,
      searchText: "",
      search: "",
    };
  },
  methods: {
    convertStringToEval(string) {
      return eval(string);
    },
    changeStation(station) {
      this.selectedData = station;
      this.getData(this.selectedData);
      if (this.selectChartOption && this.selectedData) {
        this.getDataChart();
      }
    },
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.dataFollow.forEach((val) => {
          if (val.StoreName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    getOption() {
      gasSalesAPI
        .getStoreList()
        .then((val) => {
          this.dataFollow = val.status ? val.data : [];
          if (!this.selectedData) {
            this.selectedData = this.dataFollow[0];
          }
          this.getData(this.selectedData);
          if (this.selectChartOption && this.selectedData) {
            this.getDataChart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    changeChartOption(item) {
      this.selectChartOption = item;
      this.showChart = false;
      this.labelDateContracts = [];
      this.labelDateOrders = [];
      this.dataChartContracts = [];
      this.dataChartOrders = [];
      this.dataTotalAmntContracts = null;
      this.dataTotalAmntOrders = null;
      this.getDataChart();
    },
    getDataChart() {
      let body = {
        StoreID: this.selectedData.StoreID,
        Type: this.selectChartOption.value,
      };
      gasSalesAPI
        .getChart(body)
        .then((val) => {
          if (val.data && val.data.Contracts) {
            let itemTotalAmtContracts = [
              {
                label: "VNĐ",
                borderColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                pointHoverBackgroundColor: "#05CBE1",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
            ];
            this.dataTotalAmntContracts = itemTotalAmtContracts;
            let items = [
              {
                label: `${this.$t("total")} (${this.$t("order")})`,
                borderColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                pointHoverBackgroundColor: "#05CBE1",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: `${this.$t("accept")} (${this.$t("order")})`,
                borderColor: "#ffcb80",
                pointBorderColor: "#ffcb80",
                pointHoverBackgroundColor: "#ffcb80",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#ffcb80",
                pointBorderColor: "#ffcb80",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: `${this.$t("cancel")} (${this.$t("order")})`,
                borderColor: "#FC2525",
                pointBorderColor: "#FC0000",
                pointHoverBackgroundColor: "#FC0000",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#FC0000",
                pointBorderColor: "#FC0000",
                borderWidth: 2,
                backgroundColor: this.gradient,
                data: [],
              },
            ];
            this.dataChartContracts = this.convertDataChartMultiAreaShadow(
              val.data.Contracts,
              items,
              "Contracts"
            );
            this.labelDateContracts = this.dataChartContracts.labelDate;
          }
          if (val.data && val.data.Orders) {
            let itemTotalAmtOrders = [
              {
                label: "VNĐ",
                borderColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                pointHoverBackgroundColor: "#05CBE1",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
            ];
            this.dataTotalAmntOrders = itemTotalAmtOrders;
            let items = [
              {
                label: `${this.$t("total")} (${this.$t("sale")})`,
                borderColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                pointHoverBackgroundColor: "#05CBE1",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#05CBE1",
                pointBorderColor: "#05CBE1",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: `${this.$t("delivery-sale")} (${this.$t("sale")})`,
                borderColor: "#ffcb80",
                pointBorderColor: "#ffcb80",
                pointHoverBackgroundColor: "#ffcb80",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#ffcb80",
                pointBorderColor: "#ffcb80",
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: `${this.$t("cancel")} (${this.$t("sale")})`,
                borderColor: "#FC2525",
                pointBorderColor: "#FC0000",
                pointHoverBackgroundColor: "#FC0000",
                pointHoverBorderColor: "black",
                pointBackgroundColor: "#FC0000",
                pointBorderColor: "#FC0000",
                borderWidth: 2,
                backgroundColor: this.gradient,
                data: [],
              },
            ];
            this.dataChartOrders = this.convertDataChartMultiAreaShadow(
              val.data.Orders,
              items,
              "Orders"
            );
            this.labelDateOrders = this.dataChartOrders.labelDate;
          }
          setTimeout(() => {
            this.showChart = true;
          }, 50);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDataChartMultiAreaShadow(data, items, key) {
      //contructor
      let result = { items, labelDate: [] };
      //data-custom
      if (key.toUpperCase() === "CONTRACTS") {
        data.forEach((item) => {
          result.labelDate.push(item.ItemHH.split("-")[1]);
          for (const key in item) {
            if (key === "ContractTotal") {
              result.items[0].data.push(item[key]);
            }
            if (key === "ContractApproval") {
              result.items[1].data.push(item[key]);
            }
            if (key === "ContractCancel") {
              result.items[2].data.push(item[key]);
            }
            if (key === "Total_Amnt") {
              this.dataTotalAmntContracts[0].data.push(item[key]);
            }
          }
        });
      }
      if (key.toUpperCase() === "ORDERS") {
        data.forEach((item) => {
          result.labelDate.push(item.ItemHH.split("-")[1]);
          for (const key in item) {
            if (key === "OrderTotal") {
              result.items[0].data.push(item[key]);
            }
            if (key === "OrderDelivery") {
              result.items[1].data.push(item[key]);
            }
            if (key === "OrderCancel") {
              result.items[2].data.push(item[key]);
            }
            if (key === "Total_Amnt") {
              this.dataTotalAmntOrders[0].data.push(item[key]);
            }
          }
        });
      }
      return result;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    getData(item) {
      let body = {
        StoreID: item.StoreID,
      };
      gasSalesAPI
        .getDashboard(body)
        .then((val) => {
          this.data = val.status ? val.data : [];
          this.dataRevenues = this.data.Revenues ? this.data.Revenues : [];
          this.dataHistory = this.data.Histories ? this.data.Histories : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDataWeather() {
      let url =
        "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" +
        this.city_key;
      let param = "?language=vi&apikey=" + this.apikey;
      await fetch(url + param)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.DailyForecasts) {
            this.dataWeather = res.DailyForecasts;
          }
        })
        .catch((res) => {
          console.log("Faild fetch data ", res);
        });
    },
    timerLoadDashboard(time) {
      this.getOption();
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
  mounted() {
    this.getDataWeather();
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
.cus-card {
  color: white;
  height: 90px;
  background: linear-gradient(45deg, #73e9e8, #73b4ff);
  padding: 5% 10px;
  border-radius: 5px;
}
.cus-card-2 {
  width: 100%;
  color: white;
  height: 115px;
  background: linear-gradient(45deg, #73e9e8, #73b4ff);
  padding: 5% 10px;
  border-radius: 5px;
}
</style>
