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
          <b-col md="3">
            <b-form-group :label="$t('modal.adjust-oid') + ':'">
              <b-form-input
                class="text-center"
                v-model="dataForm['OID']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="9">
            <b-row>
              <b-col md="6">
                <b-form-group :label="$t('modal.from-date') + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="dataForm['FromDate']"
                    required
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group :label="$t('modal.to-date') + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="dataForm['ToDate']"
                    required
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="12">
            <b-form-group
              :state="stateForm['ListCustypeID']"
              :invalid-feedback="
                $t('form.please-select') + ' ' + $t('modal.group-customer')
              "
              :label="$t('modal.group-customer') + ':'"
            >
              <!-- <treeselect
                name="tree-select-input"
                :searchable="searchable"
                :close-on-select="closeOnSelect"
                :options="dataFormOption['ListCustypeID']"
                :max-height="500"
                :placeholder="placeholder"
                :no-results-text="noResultsText"
                :multiple="true"
                v-model="dataForm['ListCustypeID']"
                :show-count="true"
                :flat="true"
                :sort-value-by="sortValueBy"
                :state="stateForm['ListCustypeID']"
                required
              /> -->
              <treeselect
                :multiple="true"
                :options="dataFormOption['ListCustypeID']"
                :placeholder="placeholder"
                v-model="dataForm['ListCustypeID']"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group :label="$t('modal.description') + ':'">
              <b-form-textarea
                class="text-left"
                v-model="dataForm['Note']"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group :label="$t('modal.list-product') + ':'">
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
                select-mode="multi"
                @row-selected="rowSelected"
                head-variant="light"
                class="text-center mb-0"
                style="max-height: 220px"
              ></b-table>
            </b-form-group>
          </b-col>
          <template v-if="dataForm.Details.length > 0">
            <!-- <b-col md="12">
              <b-alert show variant="success" class="text-center"
                ><strong>{{
                  $t("modal.list-product-apply").toUpperCase()
                }}</strong></b-alert
              >
            </b-col> -->
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
                    {{ gas.GasItemsName }}
                  </span>
                </span>
              </b-col>
              <b-col md="4">
                <b-form-group :label="$t('modal.price-vat') + ':'">
                  <b-form-input
                    class="text-right"
                    :id="'PriceVAT-input' + gas.GasItemsID"
                    :value="convertFloat(gas.PriceVAT)"
                    @focus="
                      revertFloatChange('PriceVAT-input' + gas.GasItemsID)
                    "
                    @blur="
                      convertFloatChange(
                        gas,
                        'PriceVAT-input' + gas.GasItemsID,
                        'PriceVATKg-input' + gas.GasItemsID
                      )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group :label="$t('modal.unit-qtty') + ':'">
                  <b-form-input
                    class="text-right"
                    :id="'UnitQtty-input' + gas.GasItemsID"
                    :value="gas.UnitQtty"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group :label="$t('modal.price-vat-kg') + ':'">
                  <b-form-input
                    class="text-right"
                    :id="'PriceVATKg-input' + gas.GasItemsID"
                    :value="convertFloat(gas.PriceVATKg)"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group :label="$t('modal.vat') + ':'">
                  <b-form-input
                    class="text-right"
                    :id="'VAT-input' + gas.GasItemsID"
                    :value="gas.VAT"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <b-form-input
                    :id="'Note-input' + gas.GasItemsID"
                    v-model="gas.Note"
                    :placeholder="$t('modal.description') + '...'"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </template>
          </template>
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
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import systemAPI from "@/api/modules/systemAPI";

export default {
  components: {
    Treeselect,
  },
  props: [
    "nameForm",
    "titleForm",
    "bodyFormDefault",
    "dataForm",
    "dataFormOption",
    "apiForm",
    "typeForm",
    "keyShow",
    "tableListItem",
    "tableField",
  ],
  data() {
    return {
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      sortValueBy: "ORDER_SELECTED",
      tableSelectedItem: [],
      stateForm: {
        ListCustypeID: null,
      },
    };
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
            this.tableListItem.findIndex(
              (x) => x.GasItemsID === element.GasItemsID
            )
          );
        });
      }
    }, 500);
  },
  methods: {
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
      // if (this.dataForm.ListCustypeID.length === 0) {
      //   valid = false;
      //   this.makeToast(
      //     "danger",
      //     this.$t("toast.fail").toUpperCase(),
      //     this.$t("modal.please-customer-group")
      //   );
      // }
      if (this.dataForm.ListCustypeID.length === 0) {
        this.stateForm["ListCustypeID"] = false;
      } else {
        this.stateForm["ListCustypeID"] = true;
      }
      if (this.dataForm.Details.length === 0) {
        valid = false;
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("modal.please-product-apply")
        );
      }
      return valid;
    },
    // deRecursionFunction(array, _array) {
    //   if (!array?.length > 0) return

    // },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let string = "";
      this.dataForm.ListCustypeID.forEach((id, idx) => {
        if (idx + 1 === this.dataForm.ListCustypeID.length) {
          string = string + id;
        } else {
          string = string + id + ",";
        }
      });
      //check parent
      let _obj = {
        OID: this.dataForm.OID,
        ToDate: this.dataForm.ToDate,
        FromDate: this.dataForm.FromDate,
        ListCustypeID: string,
        Note: this.dataForm.Note,
      };
      let body = Object.assign(_obj, this.bodyFormDefault);
      let array = [];
      let __obj = {};
      if (this.dataForm.Details.length > 0) {
        this.dataForm.Details.forEach((element) => {
          let object = {
            ItemID: element.GasItemsID,
            UnitQtty: element.UnitQtty,
            VAT: element.VAT,
            PriceVAT: this.revertFloat(
              document.getElementById("PriceVAT-input" + element.GasItemsID)
                .value
            ),
            PriceVATKg: this.revertFloat(
              document.getElementById("PriceVATKg-input" + element.GasItemsID)
                .value
            ),
            Note: element.Note,
          };
          array.push(object);
        });
        __obj.AdjustPriceDetails = array;
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
        ListCustypeID: null,
      };
      this.$emit("reset-modal");
    },
    removeGasItem(items) {
      this.$refs.gasItemTable.unselectRow(
        this.tableListItem.findIndex((x) => x.GasItemsID === items.GasItemsID)
      );
      this.dataForm.Details = this.dataForm.Details.filter(
        (x) => x.GasItemsID !== items.GasItemsID
      );
    },
    rowSelected(data) {
      let _data = [];
      if (data && data.length > 0) {
        data.forEach((element) => {
          let object = {
            OID: element.OID,
            GasItemsID: element.GasItemsID,
            GasItemsName: element.GasItemsName,
            UnitQtty: element.UnitQtty,
            VAT: element.VAT,
            PriceVAT:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter(
                (x) => x.GasItemsID === element.GasItemsID
              ).length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.GasItemsID === element.GasItemsID
                  )[0].PriceVAT
                : element.PriceVAT,
            PriceVATKg:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter(
                (x) => x.GasItemsID === element.GasItemsID
              ).length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.GasItemsID === element.GasItemsID
                  )[0].PriceVATKg
                : element.PriceVATKg,
            Note:
              this.dataForm.Details?.length > 0 &&
              this.dataForm.Details.filter(
                (x) => x.GasItemsID === element.GasItemsID
              ).length > 0
                ? this.dataForm.Details.filter(
                    (x) => x.GasItemsID === element.GasItemsID
                  )[0].Note
                : element.Note,
          };
          _data.push(object);
        });
      }
      this.dataForm.Details = _data;
    },
    convertFloatChange(object, id = null, _id = null) {
      if (id) {
        document.getElementById(id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value)
        );
      }
      if (_id) {
        document.getElementById(_id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value) / object.UnitQtty
        );
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
