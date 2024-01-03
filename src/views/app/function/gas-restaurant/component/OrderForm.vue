<template>
  <div>
    <b-modal
      :id="nameForm"
      :ref="nameForm"
      :title="titleForm"
      @hidden="resetModal"
      @ok="handleModal"
      @cancel="handleCancelModal"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
      :cancel-title="$t('modal.cancel-order')"
      :ok-title="$t('pages.approval')"
      :hide-footer="hideFooter"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col md="12">
            <b-alert
              class="text-dark"
              show
              :style="{ 'background-color': dataForm['StatusColor'] }"
            >
              <span>
                <strong>{{ dataForm["StatusName"] }}</strong>
                - {{ $t("modal.at") }}:
                <strong>{{ convertDateTime(dataForm["Statustime"]) }}</strong>
              </span>
              <template
                v-if="dataForm['StatusID'] === -1 || dataForm['StatusID'] === 5"
              >
                <br />
                <span>
                  {{ $t("dashboards.reason") }}:
                  <strong>{{ dataForm["CancelNote"] }}</strong>
                </span>
              </template>
            </b-alert>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.order-code') + ':'">
              <b-form-input
                class="text-center"
                v-model="dataForm['OID']"
                disabled
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.delivery-date') + ':'">
              <b-form-datepicker
                :locale="locale"
                v-model="dataForm['EstimateDelivery']"
                disabled
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="$t('modal.choose-store') + ':'">
              <b-form-input
                class="text-left"
                v-model="dataForm['StationName']"
                disabled
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            md="4"
            v-if="dataForm['SalerUser'] && dataForm['SalerUser'][0]"
          >
            <!-- bug -->
            <b-form-group :label="$t('dashboards.employer-sale') + ':'">
              <b-form-input
                class="text-left"
                v-model="dataForm['SalerUser'][0].label"
                disabled
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="$t('modal.warehouse-for-sale') + ':'">
              <b-form-input
                class="text-left"
                :value="
                  stationOption &&
                  stationOption.length > 0 &&
                  stationOption.filter(
                    (x) => x.StationID === dataForm['GasStationID']
                  ).length > 0
                    ? stationOption.filter(
                        (x) => x.StationID === dataForm['GasStationID']
                      )[0].StoreName
                    : ''
                "
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="$t('modal.phone') + ':'">
              <b-form-input
                class="text-left"
                :value="
                  stationOption &&
                  stationOption.length > 0 &&
                  stationOption.filter(
                    (x) => x.StationID === dataForm['GasStationID']
                  ).length > 0
                    ? stationOption.filter(
                        (x) => x.StationID === dataForm['GasStationID']
                      )[0].StationPhone
                    : ''
                "
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="8">
            <b-form-group :label="$t('modal.address') + ':'">
              <b-form-input
                class="text-left"
                :value="
                  stationOption &&
                  stationOption.length > 0 &&
                  stationOption.filter(
                    (x) => x.StationID === dataForm['GasStationID']
                  ).length > 0
                    ? stationOption.filter(
                        (x) => x.StationID === dataForm['GasStationID']
                      )[0].StationAddress
                    : ''
                "
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <b-form-textarea
                class="text-left"
                v-model="dataForm['Note']"
                :placeholder="$t('modal.description') + '...'"
                rows="3"
                max-rows="6"
                disabled
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <template v-if="dataForm.Details.length > 0">
            <b-col md="12" class="mb-2">
              <!-- <b-alert show variant="success" class="text-center"
                ><strong>{{
                  $t("modal.list-product").toUpperCase()
                }}</strong></b-alert
              > -->
              <span class="text-danger">
                <i class="fad fa-shopping-cart mr-2"></i>
                <span class="font-weight-bold mr-2 p-1">
                  {{ $t("modal.list-product").toUpperCase() }}
                </span>
              </span>
            </b-col>
            <template v-for="(gas, index) in dataForm.Details">
              <b-col md="12">
                <span class="d-flex mb-2">
                  <span class="font-weight-bold pt-1 pb-1">
                    {{ index + 1 }}. {{ gas.ItemName }}
                  </span>
                </span>
              </b-col>
              <b-col md="2">
                <b-form-group :label="$t('modal.quantity') + ':'">
                  <b-form-input
                    class="text-right"
                    v-model="gas.ItemQtty"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group :label="$t('modal.price-vat') + ':'">
                  <b-form-input
                    class="text-right"
                    :id="'PriceVAT-input' + gas.ItemID"
                    :value="convertFloat(gas.PriceVAT)"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group :label="$t('modal.into-money') + ' (VNĐ):'">
                  <b-form-input
                    class="text-right"
                    :id="'Item_Amnt-input' + gas.ItemID"
                    :value="convertFloat(gas.Item_Amnt)"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <b-form-input
                    :id="'Note-input' + gas.ItemID"
                    v-model="gas.Note"
                    :placeholder="$t('modal.description') + '...'"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </template>
          </template>
          <b-col md="12" class="mb-2">
            <span class="text-danger">
              <i class="fad fa-tags mr-2"></i>
              <span class="font-weight-bold mr-2 p-1">
                {{ $t("modal.total-payment").toUpperCase() }}
              </span>
            </span>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.money-product') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Prd_Amnt-input"
                :value="convertFloat(dataForm['Prd_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.discount') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Dcn_Amnt-input"
                :value="convertFloat(dataForm['Dcn_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.money-deb_amnt') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Deb_Amnt-input"
                :value="convertFloat(dataForm['Deb_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!-- <b-col md="6">
            <b-form-group :label="$t('modal.money-gas-return') + ' (VNĐ):'">
              <b-form-input
                style="color: black;"
                class="text-right"
                id="Ret_Amnt-input"
                :value="convertFloat(dataForm['Ret_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col> -->
          <!-- <b-col md="6"></b-col> -->
          <b-col md="6">
            <b-form-group :label="$t('modal.total-money') + ' (VNĐ):'">
              <b-form-input
                class="text-right from-input_color"
                id="Total_Amnt-input"
                :value="convertFloat(dataForm['Total_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
    <div id="custom-spinner-load-submit">
      <div class="form-spinner">
        <div class="spinner">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="text-spinner">
          <p>{{ $t("cards.loading") }} ...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";

export default {
  props: [
    "nameForm",
    "titleForm",
    "bodyFormDefault",
    "dataForm",
    "apiForm",
    "typeForm",
    "stationOption",
    "hideFooter",
  ],
  data() {
    return {
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  methods: {
    handleCancelModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("handle-cancel", this.dataForm);
    },
    getOptionItems(id) {
      this.$emit("get-option-items", id);
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData(this.apiForm, this.bodyFormDefault)
        .then((val) => {
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit", val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.$emit("reset-modal");
    },
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>
<style scoped>
.from-input_color {
  color: red;
  font-size: 14px;
  font-weight: 600;
}
#custom-spinner-load-submit {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form-spinner {
  --size: 80px;

  width: var(--size);
  height: var(--size);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-spinner p {
  font-weight: bold;
  color: white;
}

.spinner {
  --size: 62px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  perspective: 800px;

  margin-bottom: 10px;
  /*margin-left: 10px;*/
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #2cfffe;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #fcc10f;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #ec1b60;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
