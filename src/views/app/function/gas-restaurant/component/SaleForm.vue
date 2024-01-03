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
            <b-form-group :label="$t('modal.delivery-date') + ':'">
              <b-form-datepicker
                :locale="locale"
                v-model="dataForm['EstimateDelivery']"
                required
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <template v-if="fastOrder">
              <b-form-group :label="$t('modal.choose-store') + ':'">
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
                        )[0].StationName
                      : ''
                  "
                  disabled
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
            <b-form-group :label="$t('dashboards.employer-sale') + ':'">
              <treeselect
                :searchable="searchable"
                :options="dataFormOption['SaleUserID']"
                :max-height="300"
                :placeholder="placeholder"
                :no-results-text="noResultsText"
                :clearable="false"
                v-model="dataForm['SaleUserID']"
                required
              />
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
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col md="12">
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
                  @row-selected="rowSelected"
                  head-variant="light"
                  class="text-center mb-0"
                  style="max-height: 220px"
                ></b-table>
              </template>
              <template v-else>
                <strong class="font-italic text-danger">
                  ({{ $t("modal.no-product") }})
                </strong>
              </template>
            </b-form-group>
          </b-col>
          <template v-if="dataForm.Details.length > 0">
            <b-col md="12" class="mb-3">
              <span class="text-danger">
                <i class="fad fa-shopping-cart mr-2"></i>
                <span class="font-weight-bold mr-2 p-1">
                  {{ $t("modal.list-product").toUpperCase() }}
                </span>
              </span>
            </b-col>
            <template v-for="gas in dataForm.Details">
              <b-col md="12">
                <span class="d-flex mb-2">
                  <b-button
                    style="
                      width: 25px;
                      height: 25px;
                      border-radius: 3px;
                      padding: 3px 6px;
                    "
                    variant="danger"
                    @click="removeGasItem(gas)"
                  >
                    <i class="fas fa-times" style="font-size: 10px"></i>
                  </b-button>
                  <span class="font-weight-bold ml-2 pt-1 pb-1">
                    {{ gas.ItemsName }}
                  </span>
                </span>
              </b-col>
              <b-col md="2">
                <b-form-group :label="$t('modal.quantity') + ':'">
                  <b-form-input
                    class="text-right"
                    v-model="gas.ItemQtty"
                    type="number"
                    min="1"
                    @change="
                      convertFloatChange(
                        gas,
                        'PriceVAT-input' + gas.ItemID,
                        'Item_Amnt-input' + gas.ItemID
                      )
                    "
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
                :value="
                  typeof dataForm['Prd_Amnt'] == 'string'
                    ? dataForm['Prd_Amnt']
                    : convertFloat(dataForm['Prd_Amnt'])
                "
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col v-show="typeForm != 'ADD' && typeForm != 'EDIT'" md="6">
            <b-form-group :label="$t('modal.money-gas-return') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Ret_Amnt-input"
                :value="convertFloat(dataForm['Ret_Amnt'])"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.discount') + ' (VNĐ):'">
              <!--@input="handleInputValue($event, 'Dcn_Amnt','Dcn_Amnt-input')"  -->
              <b-form-input
                class="text-right"
                id="Dcn_Amnt-input"
                :value="convertFloat(dataForm['Dcn_Amnt'])"
                @focus="revertFloatChange('Dcn_Amnt-input')"
                @blur="convertTotalFloatChange('Dcn_Amnt-input')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.money-deb_amnt') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Deb_Amnt-input"
                :value="convertFloat(dataForm['Deb_Amnt'])"
                @focus="revertFloatChange('Deb_Amnt-input')"
                @blur="convertTotalFloatChange('Deb_Amnt-input')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            v-show="typeForm != 'ADD' && typeForm != 'EDIT'"
            md="6"
          ></b-col>
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
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";

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
      },
    };
  },
  watch: {
    "dataForm.GasStationID"() {
      let item = this.stationOption.filter(
        (item) => item.StationID === this.dataForm.GasStationID
      );
      this.dataForm["Deb_Amnt"] = item[0].Debit_Amnt;
      this.$emit("get-option-saler", item[0].StoreID);
      setTimeout(() => {
        this.convertTotalFloatChangeRowSelected();
        if (
          this.dataFormOption["SaleUserID"] &&
          this.dataFormOption["SaleUserID"].length > 0
        ) {
          this.dataForm.SaleUserID = this.dataFormOption["SaleUserID"][0].id;
        }
      }, 500);
    },
  },
  mounted() {
    setTimeout(() => {
      if (
        this.dataForm &&
        this.dataForm.Details &&
        this.dataForm.Details.length > 0
      ) {
        this.dataForm.Details.forEach((element) => {
          this.$refs.gasItemTable.selectRow(
            this.tableListItem.findIndex((x) => x.ItemID === element.ItemID)
          );
        });
      }
    }, 500);
  },
  methods: {
    // handleInputValue(value, key, domID) {
    //   let num = this.revertFloat(value)
    //   this.dataForm[key] = num
    //   document.getElementById(domID).value = this.convertFloat(num)
    // },
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
        if (this.dataForm.Details.length === 0) {
          valid = false;
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            this.$t("modal.please-product")
          );
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
        EstimateDelivery: this.dataForm.EstimateDelivery,
        Dcn_Amnt: this.revertFloat(
          document.getElementById("Dcn_Amnt-input").value
        ),
        Total_Amnt: this.revertFloat(
          document.getElementById("Total_Amnt-input").value
        ),
        Ret_Amnt: this.dataForm.Ret_Amnt,
        Prd_Amnt:
          typeof this.dataForm.Prd_Amnt == "string"
            ? this.revertFloat(this.dataForm.Prd_Amnt)
            : this.dataForm.Prd_Amnt,
        Deb_Amnt:
          typeof this.dataForm.Deb_Amnt == "string"
            ? this.revertFloat(this.dataForm.Deb_Amnt)
            : this.dataForm.Deb_Amnt,
        SaleUserID: this.dataForm.SaleUserID,
        IsCusOrder: 0,
        Note: this.dataForm.Note,
      };
      let body = Object.assign(_obj, this.bodyFormDefault);
      let array = [];
      let __obj = {};
      if (this.dataForm.Details.length > 0) {
        this.dataForm.Details.forEach((element) => {
          let object = {
            ItemID: element.ItemID,
            UnitQtty: element.UnitQtty,
            ItemQtty: parseInt(element.ItemQtty),
            VAT: element.VAT,
            PriceVAT: element.PriceVAT,
            PriceVATKg: element.PriceVATKg,
            Item_Amnt: parseInt(element.ItemQtty) * element.PriceVAT,
            Note: element.Note,
          };
          array.push(object);
        });
        __obj.Details = array;
      }
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
      };
      this.$emit("reset-modal");
    },
    removeGasItem(items) {
      this.$refs.gasItemTable.unselectRow(
        this.tableListItem.findIndex((x) => x.ItemID === items.ItemID)
      );
      this.dataForm.Details = this.dataForm.Details.filter(
        (x) => x.ItemID !== items.ItemID
      );
    },
    rowSelected(data) {
      let _data = [];
      if (data && data.length > 0) {
        data.forEach((element) => {
          let object = {
            ItemID: element.ItemID,
            ItemsName: element.Name,
            UnitQtty: element.UnitQtty,
            VAT: element.VAT,
            PriceVAT: element.PriceVAT,
            PriceVATKg: element.PriceVATKg,
            ItemQtty:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter((x) => x.ItemID === element.ItemID)
                .length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.ItemID === element.ItemID
                  )[0].ItemQtty
                : 1,
            Item_Amnt:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter((x) => x.ItemID === element.ItemID)
                .length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.ItemID === element.ItemID
                  )[0].ItemQtty * element.PriceVAT
                : element.PriceVAT,
            Note:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter((x) => x.ItemID === element.ItemID)
                .length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.ItemID === element.ItemID
                  )[0].Note
                : element.Note,
          };
          _data.push(object);
        });
      }
      this.dataForm.Details = _data;
      this.convertTotalFloatChangeRowSelected();
    },
    convertTotalFloatChangeRowSelected() {
      let _totalPayment = 0;
      if (this.dataForm.Details.length > 0) {
        this.dataForm.Details.forEach((element) => {
          _totalPayment =
            _totalPayment + parseInt(element.ItemQtty) * element.PriceVAT;
        });
      }
      document.getElementById("Total_Amnt-input").value = this.convertFloat(
        _totalPayment -
          this.revertFloat(document.getElementById("Dcn_Amnt-input").value)
      );
      //
      let prd = _totalPayment;
      let total = this.revertFloat(
        document.getElementById("Total_Amnt-input").value
      );
      let dcn = this.revertFloat(
        document.getElementById("Dcn_Amnt-input").value
      );
      let deb = this.revertFloat(
        document.getElementById("Deb_Amnt-input").value
      );
      total = prd - dcn;
      total = total + deb;
      //cập nhật var
      this.dataForm.Total_Amnt = total;
      this.dataForm.Prd_Amnt = prd;
      //dom-value-UI
      document.getElementById("Prd_Amnt-input").value = this.convertFloat(prd);
      document.getElementById("Total_Amnt-input").value =
        this.convertFloat(total);
    },
    convertTotalFloatChange(id = null, _id = null, key = null) {
      if (id) {
        document.getElementById(id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value)
        );
      }
      if (_id) {
        document.getElementById(_id).value = this.convertFloat(
          this.revertFloat(document.getElementById(_id).value)
        );
      }
      //custom-module
      if (id === "Dcn_Amnt-input" && key == null) {
        let dcn = this.revertFloat(document.getElementById(id).value);
        let total = this.revertFloat(
          document.getElementById("Total_Amnt-input").value
        );
        let deb = this.revertFloat(
          document.getElementById("Deb_Amnt-input").value
        );
        let prd = this.revertFloat(
          document.getElementById("Prd_Amnt-input").value
        );
        total = prd - dcn;
        total = total + deb;
        // cập nhật variable
        this.dataForm.Dcn_Amnt = dcn;
        this.dataForm.Total_Amnt = total;
        //dom-value-UI
        document.getElementById("Dcn_Amnt-input").value =
          this.convertFloat(dcn);
        document.getElementById("Total_Amnt-input").value =
          this.convertFloat(total);
      }
      if (id === "Deb_Amnt-input" && key == null) {
        let deb = this.revertFloat(document.getElementById(id).value);
        let dcn = this.revertFloat(
          document.getElementById("Dcn_Amnt-input").value
        );
        let prd = this.revertFloat(
          document.getElementById("Prd_Amnt-input").value
        );
        let total = prd - dcn;
        total = total + deb;
        this.dataForm.Total_Amnt = total;
        this.dataForm.Deb_Amnt = deb;
        document.getElementById("Deb_Amnt-input").value =
          this.convertFloat(deb);

        document.getElementById("Total_Amnt-input").value =
          this.convertFloat(total);
      }
    },
    convertFloatChange(object, id, _id) {
      if (id && _id) {
        document.getElementById(_id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value) * object.ItemQtty
        );
        let totalPaymentString = document.getElementById(_id).value;
        document.getElementById("Prd_Amnt-input").value = totalPaymentString;
        this.dataForm.Prd_Amnt = this.revertFloat(totalPaymentString);
        this.convertTotalFloatChangeRowSelected();
      }
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
  },
};
</script>
<style scoped>
.from-input_color {
  font-weight: 700;
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
