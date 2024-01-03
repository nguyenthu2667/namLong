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
            <b-form-group
              :state="stateForm['StationID']"
              :invalid-feedback="
                $t('form.please-select') + ' ' + $t('modal.choose-store')
              "
              :label="$t('modal.choose-store') + ':'"
            >
              <treeselect
                name="tree-select-input"
                :searchable="searchable"
                :options="dataFormOption['StationID']"
                :max-height="300"
                :placeholder="placeholder"
                :no-results-text="noResultsText"
                :clearable="false"
                v-model="dataForm['StationID']"
                :state="stateForm['StationID']"
                required
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              :state="stateForm['ReferenceID']"
              :invalid-feedback="
                $t('form.please-invalid') + ' ' + $t('modal.adjust-debit-oid')
              "
              :label="$t('modal.adjust-debit-oid') + ':'"
            >
              <b-form-input
                id="ReferenceID-input"
                class="text-left"
                v-model="dataForm['ReferenceID']"
                :state="stateForm['ReferenceID']"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.vouchers-date') + ':'">
              <b-form-datepicker
                :locale="locale"
                v-model="dataForm['ODate']"
                required
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.debit') + ' (VNĐ):'">
              <b-form-input
                class="text-right"
                id="Receipt_Amnt-input"
                :value="convertFloat(dataForm['Receipt_Amnt'])"
                @focus="revertFloatChange('Receipt_Amnt-input')"
                @blur="convertFloatChange('Receipt_Amnt-input')"
              ></b-form-input>
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
        ReferenceID: null,
        StationID: null,
      },
    };
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
      this.stateForm["ReferenceID"] = document
        .getElementById("ReferenceID-input")
        .checkValidity();
      if (!this.dataForm["StationID"]) {
        this.stateForm["StationID"] = false;
      } else {
        this.stateForm["StationID"] = true;
      }
      return valid;
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let _obj = {
        ReferenceID: this.dataForm.ReferenceID,
        ODate: this.dataForm.ODate,
        StationID: this.dataForm.StationID,
        Receipt_Amnt: this.revertFloat(
          document.getElementById("Receipt_Amnt-input").value
        ),
        Note: this.dataForm.Note,
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
      this.$emit("reset-modal");
      this.stateForm = {
        ReferenceID: null,
        StationID: null,
      };
    },
    convertFloatChange(id = null) {
      if (id) {
        document.getElementById(id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value)
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
