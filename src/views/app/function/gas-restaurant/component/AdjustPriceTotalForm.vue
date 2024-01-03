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
            <b-form-group :label="$t('modal.adjust-oid') + ':'">
              <b-form-input
                class="text-center"
                v-model="dataForm['OID']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.price-adjustment') + ':'">
              <!-- v-model="dataForm['TotalAdjust']" -->
              <b-form-input
                id="TotalAdjust-input"
                class="text-right"
                :value="convertFloat(dataForm['TotalAdjust'])"
                @focus="revertFloatChange('TotalAdjust-input')"
                @blur="convertTotalFloatChange('TotalAdjust-input')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
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
          <!-- <b-col md="12">
            <b-form-group
              :state="stateForm['ListCustypeID']"
              :invalid-feedback="
                $t('form.please-select') + ' ' + $t('modal.group-customer')
              "
              :label="$t('modal.group-customer') + ':'"
            >
              <treeselect
                :multiple="true"
                :options="dataFormOption['ListCustypeID']"
                :placeholder="placeholder"
                v-model="dataForm['ListCustypeID']"
              />
            </b-form-group>
          </b-col> -->
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
            <span>
              <b-form-checkbox
                v-model="isSelectAll"
                size="md"
                class="ml-3 mb-2"
              >
                <b>{{ $t("all").toUpperCase() }}</b>
              </b-form-checkbox>
            </span>
            <b-table
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
              head-variant="light"
              class="text-center mb-0"
              style="max-height: 220px"
            >
              <template v-slot:cell(Actions)="row">
                <b-form-checkbox
                  v-model="row.item.IsSelected"
                  @change="handleChangeIsSelect(row.item)"
                  size="md"
                ></b-form-checkbox>
              </template>
            </b-table>
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
  watch: {
    isSelectAll() {
      if (this.isSelectAll == true) {
        this.tableListItem.forEach((detail) => {
          if (detail.IsSelected == false) {
            detail.IsSelected = true;
            this.add(detail);
          }
        });
      } else {
        this.dataForm.Details = [];
        this.tableListItem.forEach((detail) => {
          detail.IsSelected = false;
        });
      }
    },
  },
  mounted() {
    // if (this.dataForm.Details && this.dataForm.Details.length > 0) {
    //   this.dataForm.Details.forEach((detail) => {
    //     if (detail.IsSelected == true) {
    //       this.tableListItem.forEach((item) => {
    //         if (item.RefereceID == detail.ReferenceID) {
    //           item.IsSelected = true
    //         }
    //       })
    //     }
    //   })
    // }
  },
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
      isSelectAll: false,
    };
  },
  methods: {
    add(item) {
      if (item.RefereceID) {
        let tmp = item.RefereceID;
        item.ReferenceID = tmp;
      }
      let obj = {
        ReferenceID: item.ReferenceID,
        Note: item.Customers,
        ItemDetails: item.ItemDetails,
      };
      this.dataForm.Details.push(obj);
    },
    remove(item) {
      const index = this.dataForm.Details.findIndex(
        (detail) => detail.ReferenceID == item.ReferenceID
      );
      this.dataForm.Details.splice(index, 1);
    },
    handleChangeIsSelect(item) {
      if (item.IsSelected == true) {
        this.add(item);
      } else {
        this.remove(item);
      }
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
      if (this.dataForm.Details.length === 0) {
        valid = false;
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("modal.please-object-apply")
        );
      }
      return valid;
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let _obj = {
        OID: this.dataForm.OID,
        FromDate: this.dataForm.FromDate,
        ToDate: this.dataForm.ToDate,
        TotalAdjust: this.dataForm.TotalAdjust,
        Note: this.dataForm.Note,
        Details: this.dataForm.Details,
      };
      let body = Object.assign(_obj, this.bodyFormDefault);
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

      this.$emit("reset-modal");
    },
    convertTotalFloatChange(id) {
      if (id) {
        //dom-value-UI
        document.getElementById(id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value)
        );
        //udpate-variable
        let floatStringNumber = document.getElementById(id).value;
        this.dataForm.TotalAdjust = this.revertFloat(floatStringNumber);
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
