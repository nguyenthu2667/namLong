<template>
  <div>
    <b-modal
      :id="nameForm"
      :ref="nameForm"
      :title="titleForm"
      @hidden="resetModal"
      @ok="handleModal"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
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
            <b-form-group
              :label="$t('report.aqua.fields-current.station-date') + ':'"
            >
              <b-form-datepicker
                :locale="locale"
                v-model="dataForm['Odate']"
                required
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <template v-if="typeForm === 'INFO'">
              <b-form-group :label="$t('modal.choose-store') + ':'">
                <b-form-input
                  class="text-left"
                  v-model="dataForm['StationName']"
                  disabled
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else>
              <b-form-group
                :state="stateForm['GasStationID']"
                :invalid-feedback="
                  $t('form.please-select') + ' ' + $t('modal.choose-store')
                "
                :label="$t('modal.choose-store') + ':'"
              >
                <treeselect
                  id="select-tree"
                  name="tree-select-input"
                  :searchable="searchable"
                  :options="dataFormOption['GasStationID']"
                  :max-height="300"
                  :placeholder="placeholder"
                  :no-results-text="noResultsText"
                  :clearable="false"
                  v-model="dataForm['GasStationID']"
                  @input="getOptionItems(dataForm['GasStationID'])"
                  :state="stateForm['GasStationID']"
                  required
                />
              </b-form-group>
            </template>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('pages.warehouse-return') + ':'">
              <b-form-input
                class="text-left"
                :value="
                  typeForm === 'INFO'
                    ? dataForm['StoreName']
                    : stationOption &&
                      stationOption.length > 0 &&
                      stationOption.filter(
                        (x) => x.StationID === dataForm['GasStationID']
                      ).length > 0
                    ? stationOption.filter(
                        (x) => x.StationID === dataForm['GasStationID']
                      )[0].StoreName
                    : dataForm['StoreName']
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
                  typeForm === 'INFO'
                    ? dataForm['StationPhone']
                    : stationOption &&
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
                  typeForm === 'INFO'
                    ? dataForm['AddressName']
                    : stationOption &&
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
                :disabled="typeForm === 'INFO' ? true : false"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col v-show="typeForm !== 'INFO'" md="12">
            <b-form-group :label="$t('modal.list-product') + ':'">
              <template v-if="tableListItem">
                <b-table
                  ref="gasItemTable"
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="tableListItem"
                  :fields="tableField"
                  selectable
                  selectedVariant="primary"
                  select-mode="single"
                  head-variant="light"
                  class="text-center mb-0"
                  style="max-height: 220px"
                >
                  <template v-slot:cell(Action)="row">
                    <b-button
                      variant="outline-success"
                      size="sm"
                      @click="add(row.item)"
                    >
                      {{ $t("pages.adds") }}
                    </b-button>
                  </template>
                </b-table>
              </template>
              <template v-else>
                <strong class="font-italic text-danger">
                  ({{ $t("modal.no-product") }})
                </strong>
              </template>
            </b-form-group>
          </b-col>
          <b-col v-show="details && details.length > 0" md="12" class="mb-3">
            <span class="text-danger">
              <i class="fad fa-undo"></i>
              <span class="font-weight-bold mr-2 p-1">
                {{ $t("list-return").toUpperCase() }}
              </span>
            </span>
          </b-col>
          <template v-for="(detail, index) in details">
            <b-col md="3">
              <b-form-group :label="$t('report.station-name') + ':'">
                <b-form-input
                  disabled
                  class="text-left"
                  v-model="detail.ItemName"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                :state="stateForm['ItemCode']"
                :invalid-feedback="$t('dashboards.cannot-be-left-blank')"
                :label="$t('code') + ':'"
              >
                <b-form-input
                  :disabled="isShow ? false : true"
                  class="text-left"
                  v-model="detail.ItemCode"
                  :state="stateForm['ItemCode']"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group :label="'Kg' + ':'">
                <b-form-input
                  :disabled="isShow ? false : true"
                  class="text-right"
                  v-model.number="detail.ItemKg"
                  @blur="handleBlur"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group :label="$t('dashboards.note') + ':'">
                <b-form-input
                  class="text-left"
                  :disabled="isShow ? false : true"
                  v-model="detail.Note"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col v-show="isShow" md="12" class="text-right">
              <b-button
                style="height: 20px; border-radius: 4px; padding: 0px 8px"
                variant="outline-danger"
                @click.stop.prevent="remove(index)"
              >
                <i class="fas fa-minus" style="font-size: 11px"></i>
              </b-button>
            </b-col>
          </template>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b-form-group :label="$t('total-product') + ':'">
              <b-form-input
                class="text-right"
                v-model="countItem"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group :label="$t('total-kg') + ':'">
              <b-form-input
                class="text-right"
                v-model="totalKg"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group :label="$t('pages.gas-returned') + ':'">
              <b-form-input
                id="Ret_PriceKg"
                class="text-right"
                v-model="
                  typeForm === 'INFO'
                    ? convertFloat(dataForm['Ret_PriceKg'])
                    : Ret_PriceKg
                "
                :value="Ret_PriceKg"
                @blur="convertFloatChange('Ret_PriceKg')"
                :disabled="typeForm === 'INFO' ? true : false"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group :label="$t('modal.total-money') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                v-model="totalMoney"
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
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";

export default {
  props: [
    "nameForm",
    "titleForm",
    "bodyFormDefault",
    "dataForm",
    "dataFormOption",
    "apiForm",
    "typeForm",
    "stationOption",
    "tableListItem",
    "tableField",
    "fastOrder",
  ],
  components: {
    Treeselect,
  },
  data() {
    return {
      searchable: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      stateForm: {
        GasStationID: null,
        ItemCode: null,
      },
      details: this.dataForm["Details"] ? this.dataForm["Details"] : [],
      Ret_PriceKg: 0,
      isShow: true,
      //total-footer
      countItem: 0,
      totalKg: 0,
      totalMoney: 0,
    };
  },
  watch: {
    details() {
      if (this.details && this.details.length > 0) {
        this.countItem = this.details.length;
        this.totalKg = 0;
        this.details.forEach((ite) => {
          this.totalKg = parseFloat(this.totalKg) + parseFloat(ite.ItemKg);
        });
        this.totalMoney = this.totalKg * this.Ret_PriceKg;
        this.totalMoney = this.convertFloat(this.totalMoney);
      } else {
        this.countItem = 0;
        this.totalKg = 0;
        this.totalMoney = 0;
      }
    },
    Ret_PriceKg() {
      if (this.details && this.details.length > 0) {
        this.countItem = this.details.length;
        this.totalKg = 0;
        this.details.forEach((ite) => {
          this.totalKg = parseFloat(this.totalKg) + parseFloat(ite.ItemKg);
        });
        this.totalMoney = this.totalKg * this.Ret_PriceKg;
        this.totalMoney = this.convertFloat(this.totalMoney);
      } else {
        this.countItem = 0;
        this.totalKg = 0;
        this.totalMoney = 0;
      }
    },
  },
  mounted() {
    if (this.typeForm === "INFO") {
      this.isShow = false;
      if (this.details && this.details.length > 0) {
        this.countItem = this.details.length;
        this.totalKg = 0;
        this.details.forEach((ite) => {
          this.totalKg = parseFloat(this.totalKg) + parseFloat(ite.ItemKg);
        });
        this.totalMoney = this.totalKg * this.dataForm["Ret_PriceKg"];

        this.totalMoney = this.convertFloat(this.totalMoney);
      } else {
        this.countItem = 0;
        this.totalKg = 0;
        this.totalMoney = 0;
      }
    }
    if (this.typeForm === "EDIT") {
      this.Ret_PriceKg = this.dataForm["Ret_PriceKg"];
    }
  },
  methods: {
    handleBlur() {
      if (this.details && this.details.length > 0) {
        this.countItem = this.details.length;
        this.totalKg = 0;
        this.details.forEach((ite) => {
          this.totalKg = parseFloat(this.totalKg) + parseFloat(ite.ItemKg);
        });
        this.totalMoney = this.totalKg * this.Ret_PriceKg;
        this.totalMoney = this.convertFloat(this.totalMoney);
      } else {
        this.countItem = 0;
        this.totalKg = 0;
        this.totalMoney = 0;
      }
    },
    getOptionOrder(id) {
      let body = {
        StoreID: id,
      };
      gasRestaurantAPI
        .gasOrderAndSaleByStoreID(body)
        .then((val) => {
          this.tableListItem = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertFloatChange(id) {
      document.getElementById(id).value = this.convertFloat(
        document.getElementById(id).value
      );
    },
    revertFloatChange(id) {
      document.getElementById(id).value = this.revertFloat(
        document.getElementById(id).value
      );
    },
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    revertFloat(n) {
      return handling.revertFloat(n);
    },
    add(item) {
      let obj = {
        ItemName: item.Name,
        ItemID: item.ItemID,
        ItemCode: null,
        ItemKg: 0,
        Note: "",
      };
      this.details.push(obj);
    },
    remove(index) {
      this.details.splice(index, 1);
    },
    getOptionItems(id) {
      this.$emit("get-option-items", id);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      if (!this.dataForm["GasStationID"]) {
        this.stateForm["GasStationID"] = false;
      } else {
        this.stateForm["GasStationID"] = true;
        if (this.details.length === 0) {
          valid = false;
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            this.$t("modal.please-product")
          );
        } else {
          let isCheck = this.details.some(
            (detail) => detail.ItemCode === null || detail.ItemCode === ""
          );
          if (isCheck) {
            this.stateForm["ItemCode"] = false;
            valid = false;
          } else {
            this.stateForm["ItemCode"] = true;
          }
        }
      }
      return valid;
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let _obj = {
        StationID: this.dataForm.GasStationID,
        Odate: this.dataForm.Odate,
        Note: this.dataForm.Note,
        Ret_PriceKg: this.revertFloat(this.Ret_PriceKg + ""),
      };

      let body = Object.assign(_obj, this.bodyFormDefault);
      let __obj = {};
      __obj.Details = this.details;
      Object.assign(body, __obj);
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit", val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.dataForm.Details = [];
      this.stateForm = {
        GasStationID: null,
        ItemCode: null,
      };
      this.$emit("reset-modal");
    },
  },
};
</script>
<style scoped>
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
