<template>
  <div>
    <b-row>
      <b-col class="text-center" lg="12">
        <h1 class="p-0 m-0">
          <strong>{{ dataModal.StationName.toUpperCase() }}</strong>
        </h1>
      </b-col>
      <b-col lg="12" class="text-center">
        <p class="text-center">
          <span class="font-italic">{{ $t("map.address") + ": " }}</span>
          <span class="font-weight-bold">
            {{ dataModal.StationAddress ? dataModal.StationAddress : null }}
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
          <span class="font-italic">{{ $t("header.phone") }}:</span>
          <span class="font-weight-bold">
            {{ dataModal.Phone ? dataModal.Phone : NaN }}
          </span>
        </p>
      </b-col>
      <b-col lg="12">
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="$t('tabs.title.analysis-chart').toUpperCase()" active>
            <b-row>
              <b-col lg="12" class="mb-4">
                <b-card no-body>
                  <b-card-body>
                    <div class="float-left float-none-xs">
                      <div class="d-inline-block">
                        <h5 class="d-inline">
                          {{ $t("tabs.title.analysis-chart") }}
                        </h5>
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
          </b-tab>
          <b-tab :title="$t('list-employer').toUpperCase()">
            <b-row>
              <b-colxx xxs="12" class="mb-4">
                <!-- <b-card>
                  <custom-table
                    v-if="items && items.length > 0"
                    ref="tableForm"
                    :data-table="items"
                    :field-table="fields"
                    :access-write="accessWrite"
                    :select-mode="selectMode"
                    @row-selected="rowSelected"
                  ></custom-table>
                  <template v-else>
                    <p class="text-center text-muted text-small font-italic">
                      {{ $t('map.no-data') }}
                    </p>
                  </template>
                </b-card> -->
                <custom-table
                  v-if="items && items.length > 0"
                  ref="tableForm"
                  :data-table="items"
                  :field-table="fields"
                  :access-write="accessWrite"
                  :select-mode="selectMode"
                  @row-selected="rowSelected"
                ></custom-table>
                <template v-else>
                  <p class="text-center text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </b-colxx>
            </b-row>
          </b-tab>
          <b-tab :title="$t('list-image').toUpperCase()">
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
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import gasSalesAPI from "@/api/modules/gasSalesAPI";
import { ThemeColors } from "@/utils";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import CustomTables from "@/components/Table/CustomTables";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";

const colors = ThemeColors();
export default {
  components: {
    "custom-table": CustomTables,
    "multi-area-shadow-chart": MultiAreaShadowChart,
    "custom-carousel-component": BCarouselComponent,
  },
  props: ["dataMapNow", "dataParent", "objectData", "accessWrite"],
  created() {
    this.getDataChart();
    this.getDataEmployrs();
    this.getImages();
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      selectMode: "single",
      selectedItems: [],
      isShow: false,
      timer,
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
      items: null,
      fields: [
        {
          key: "ShipperName",
          label: "Tên",
          sortable: true,
          tdClass: "text-left pt-3",
        },
        {
          key: "Position",
          label: "Đơn vị",
          sortable: true,
          tdClass: "text-left pt-3",
        },
        {
          key: "Phone",
          label: "Điện thoại",
          sortable: true,
          tdClass: "pt-3",
        },
        {
          key: "Note",
          label: "Ghi chú",
          sortable: true,
          tdClass: "text-left pt-3",
        },
      ],
      dataImages: null,
      listImage: null,
    };
  },
  watch: {
    dataParent(val) {
      this.dataModal = { ...val };
    },
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
  },
  methods: {
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    handlClick() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 50);
    },
    getImages() {
      let body = {
        ID: this.dataModal.StationID,
      };
      gasSalesAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    getDataEmployrs() {
      let body = {
        ID: this.dataModal.StationID,
        //ID: 1018,
      };
      gasSalesAPI
        .getEmployersByID(body)
        .then((val) => {
          this.items = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
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
        StoreID: this.dataModal.StationID,
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
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>

<style scoped>
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
