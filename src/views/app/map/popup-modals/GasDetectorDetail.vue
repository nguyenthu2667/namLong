<template>
  <div>
    <b-row>
      <b-colxx md="12" class="mt-2">
        <b-row>
          <b-colxx lg="6">
            <b-form-group
              class="mb-0"
              :label="$t('dashboards.station-name') + ':'"
            >
              <b-alert
                class="text-left font-weight-bold"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationName.toUpperCase() }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.phone') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationPhone }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.input-date') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ convertDate(dataModal.InputDate) }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="8">
            <b-form-group class="mb-0" :label="$t('modal.address') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationAddress }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="4">
            <b-form-group
              class="mb-0"
              :label="$t('map.lng') + ', ' + $t('map.lat').toLowerCase() + ': '"
            >
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.Long + ", " + dataModal.Lat }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="12" class="mb-3 mt-2">
            <b-row>
              <!-- <b-col lg="4" md="4">
                <div class="font-weight-bold p-1">
                  <i class="fas fa-sliders-h mr-2"></i>
                  {{ $t('dashboards.monitoring-parameters').toUpperCase() }}
                </div>
                <div class="font-weight-bold mr-2 pl-1">
                  {{ $t('map.update-time') + ':' }}
                  <span class="text-danger">
                    {{
                      dataModal.UpdateTime
                        ? convertDateTime(dataModal.UpdateTime)
                        : convertDateTime(dataModal.Updatetime)
                    }}
                  </span>
                </div>
                <b-alert
                  show
                  variant="danger"
                  class="mt-3"
                  v-if="dataModal.IsLock"
                >
                  <strong>{{ $t('dashboards.gas-lock-reason') + ': ' }}</strong>
                  {{ dataModal.LockDescription }}
                </b-alert>
              </b-col> -->
              <b-col lg="6" md="6">
                <div class="label font-weight-bold">
                  <strong> {{ "Thiết bị " }}</strong>
                  {{ $t("map.update-time").toLowerCase() + ":" }}
                  <span class="text-danger">
                    {{
                      dataModal.UpdateTime
                        ? convertDateTime(dataModal.UpdateTime)
                        : convertDateTime(dataModal.Updatetime)
                    }}
                  </span>
                </div>
                <b-alert
                  class="text-center"
                  :style="
                    dataModal.StatusID == 2
                      ? 'background:green;color: white;'
                      : `color: white;background:${dataModal.StatusColor}`
                  "
                  show
                >
                  <strong>{{
                    dataModal.StatusID == 2
                      ? $t("table.title.online").toUpperCase()
                      : dataModal.StatusName.toUpperCase()
                  }}</strong>
                </b-alert>
              </b-col>
              <b-col lg="6" md="6">
                <div class="label">
                  <strong>
                    {{ $t("dashboards.detector-warning") + ": " }}</strong
                  >
                </div>
                <b-alert
                  class="text-center text-uppercase font-weight-bold"
                  show
                  :style="
                    'background-color:' +
                    dataModal.DetectorWarningStatusColor +
                    '; color: white;'
                  "
                >
                  {{ dataModal.DetectorWarning }}
                </b-alert>
              </b-col>
            </b-row>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx md="12" class="mt-2">
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="$t('pages.leak-detected').toUpperCase()" active>
            <b-colxx md="12">
              <custom-table
                :data-table="leakDetected"
                :field-table="fieldDetectedLeak"
                :column-show="listColumnShowDetectedLeak"
                :select-mode="selectMode"
                :row-page="10"
              ></custom-table>
            </b-colxx>
          </b-tab>
          <b-tab :title="$t('modal.detected-history').toUpperCase()">
            <b-colxx md="12">
              <custom-table
                :data-table="logDetected"
                :field-table="fieldDetected"
                :column-show="listColumnShowDetected"
                :select-mode="selectMode"
                :row-page="10"
              ></custom-table>
            </b-colxx>
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
        </b-tabs>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :type-form="typeForm"
      :data-form-option="dataFormOptions"
      @handle-submit="handleSubmit"
      @reset-modal="resetModal"
      @get-option-items="getOptionItems"
      :station-option="stationOptions"
      :table-list-item="gasItems"
      :table-field="gasItemFields"
      v-if="nameForm"
      :fast-order="true"
    ></custom-form>
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
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import systemAPI from "@/api/modules/systemAPI";
import gasFamilyAPI from "@/api/modules/gasFamilyAPI";
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import CustomForm from "@/views/app/function/gas-restaurant/component/SaleForm";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import userAPI from "@/api/modules/userAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "custom-carousel-component": BCarouselComponent,
  },
  props: ["dataModal", "objectData"],
  name: "GasRestaurant",
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      keyString: "GasRestaurent",
      timer: 500,
      selectMode: "single",
      logEndGas: null,
      logDetected: null,
      leakDetected: null,
      historyOrder: null,
      objectKeyEndGas: null,
      objectKeyDetected: null,
      objectKeyDetectedLeak: null,
      objectKeyHistoryOrder: null,
      listColumnShowEndGas: null,
      listColumnShowDetected: null,
      listColumnShowDetectedLeak: null,
      listColumnShowHistoryOrder: null,
      lastSale: null,
      stationOptions: null,
      dataFormOptions: {
        GasStationID: [],
        SaleUserID: [],
      },
      gasItems: null,
      gasItemFields: [
        {
          key: "Name",
          label: this.$t("modal.gas-name"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "PriceVAT",
          label: this.$t("modal.price-vat"),
          tdClass: "text-right",
          sortable: true,
          formatter: (value) => {
            return this.convertFloat(value);
          },
        },
        {
          key: "PriceVATKg",
          label: this.$t("modal.price-vat-kg"),
          tdClass: "text-right",
          sortable: true,
          formatter: (value) => {
            return this.convertFloat(value);
          },
        },
        {
          key: "UnitQtty",
          label: this.$t("modal.unit-qtty"),
          tdClass: "text-right",
          sortable: true,
        },
      ],
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      typeForm: "",
      dataForm: {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
      },
      dataImages: null,
      listImage: null,
    };
  },
  methods: {
    getOptionSaler(id) {
      let body = {
        StoreID: id + "|#",
      };
      userAPI
        .getSalerByStoreID(body)
        .then((val) => {
          this.dataFormOptions.SaleUserID = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              // if (val.data[i].IsActive === 1) {
              let obj = {
                label: val.data[i].UserFullName,
                id: val.data[i].UserID,
              };
              this.dataFormOptions.SaleUserID.push(obj);
              // }
            }
          }
        })
        .catch((err) => console.log(err));
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
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    resetModal() {
      this.dataForm = {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
      };
      this.gasItems = null;
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    handleSubmit(val) {
      this.$emit("handle-submit", val);
      this.dataForm = {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
      };
      this.gasItems = null;
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.orderAccept(items.StationID);
      this.getOptionStation();
      setTimeout(() => {
        this.dataForm = {
          OID: "AUTO",
          GasStationID: this.lastSale.GasStationID,
          Odate: handling.convertDateForm(new Date()),
          EstimateDelivery: handling.convertDateForm(new Date()),
          Dcn_Amnt: this.lastSale.Dcn_Amnt,
          Deb_Amnt: this.lastSale.Deb_Amnt,
          Total_Amnt: this.lastSale.Total_Amnt,
          Note: this.lastSale.Note,
          Details: this.lastSale.Details,
          SaleUserID: this.dataFormOptions["SaleUserID"].filter(
            (item) => item.id == this.lastSale.SaleUserID
          )[0].id,
        };
        this.getOptionItems(this.dataForm.GasStationID);
        this.nameForm = "modal-add";
        this.titleForm = this.$t("form.title-add").toUpperCase();
        this.typeForm = "ADD";
        this.apiForm = "/api/GasContracts/Add";
        this.bodyFormDefault = {
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    orderAccept(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasLastSale(body)
        .then((val) => {
          this.lastSale = val.status ? val.data : null;
          this.getOptionSaler(this.lastSale.StoreID);
        })
        .catch((err) => console.log(err));
    },
    getOptionItems(id) {
      let body = {
        StationID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasRestaurantAPI
        .gasItemByStationID(body)
        .then((val) => {
          this.gasItems = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionStation() {
      gasRestaurantAPI
        .gasRestaurantCustomerGet()
        .then((val) => {
          this.dataFormOptions.GasStationID = [];
          if (val.status) {
            if (val.data.length > 0) {
              this.stationOptions = val.data;
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    label: val.data[i].StationName,
                    id: val.data[i].StationID,
                  };
                  this.dataFormOptions.GasStationID.push(obj);
                }
              }
            } else {
              this.stationOptions = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistoryOrder(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasOrderHistory(body)
        .then((val) => {
          this.historyOrder = val.status ? val.data : null;
          this.objectKeyHistoryOrder =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    getLogEndGas(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasRestaurantLogEndGas(body)
        .then((val) => {
          this.logEndGas = val.status ? val.data : null;
          this.objectKeyEndGas =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    getLogDetected(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasRestaurantLogDetected(body)
        .then((val) => {
          this.logDetected = val.status ? val.data : null;
          this.objectKeyDetected =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    gasDetectorLeak(id) {
      let body = {
        StationID: id,
      };
      gasFamilyAPI
        .gasDetectorLeak(body)
        .then((val) => {
          this.leakDetected = val.status ? val.data : null;
          this.objectKeyDetectedLeak =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    statusEdit(items) {
      this.$emit("status-edit", items);
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    getColumnDetected(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowDetected = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnEndGas(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowEndGas = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnDetectedMonitor(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowDetectedLeak = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnHistoryOrder(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowHistoryOrder = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timeLoadData(time) {
      this.getLogEndGas(this.dataModal.StationID);
      this.getLogDetected(this.dataModal.StationID);
      this.gasDetectorLeak(this.dataModal.StationID);
      this.getHistoryOrder(this.dataModal.StationID);
      setTimeout(() => {
        this.timeLoadData(time);
      }, time);
    },
  },
  async created() {
    await this.timeLoadData(this.timer * 20);
    await this.getColumnDetected("LogDetected");
    await this.getColumnEndGas("LogEndGas");
    await this.getColumnDetectedMonitor("GasDetectorMonitors");
    await this.getColumnHistoryOrder("GasContracts");
    await this.getImages();
  },
  watch: {
    dataModal(to, from) {
      if (to) {
        this.getHistoryOrder(to.StationID);
        this.getColumnHistoryOrder("GasContracts");
      }
    },
  },
  computed: {
    fieldDetected: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetected,
        this.listColumnShowDetected
      );
    },
    fieldEndGas: function () {
      return handling.mergeTableAndData(
        this.objectKeyEndGas,
        this.listColumnShowEndGas
      );
    },
    fieldDetectedLeak: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetectedLeak,
        this.listColumnShowDetectedLeak
      );
    },
    fieldHistoryOrder: function () {
      return handling.mergeTableAndData(
        this.objectKeyHistoryOrder,
        this.listColumnShowHistoryOrder
      );
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
