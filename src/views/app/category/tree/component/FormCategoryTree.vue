<template>
  <div class="mt-3">
    <form ref="form" @submit.stop.prevent="emitSubmit" v-if="dataForm">
      <b-row>
        <b-col lg="6" xl="6">
          <!-- check null dataForm.IsActive[1] -->
          <!-- !disableEdit(false) -->
          <b-row class="align-items-center">
            <b-col lg="2" xl="2">
              <b-form-group label="ID">
                <b-form-input
                  class="text-center"
                  :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                  disabled
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="10" xl="10">
              <b-form-group
                :label="dataForm.IsActive[0]"
                v-if="dataForm.IsActive"
              >
                <b-form-radio-group
                  id="radio-group-isactive"
                  v-model="dataForm.IsActive[1]"
                  :options="optionsRadio"
                  :disabled="!disableEdit"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" xl="6">
              <b-form-group
                :label="dataForm.Name[0]"
                :state="stateForm.Name"
                :invalid-feedback="$t('form.no-blank')"
              >
                <b-form-input
                  class="text-left"
                  v-model="dataForm.Name[1]"
                  type="text"
                  :disabled="!disableEdit"
                  id="Name-input"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :label="dataForm.NameExtention1[0]"
                :state="stateForm.NameExtention1"
                :invalid-feedback="$t('form.no-blank')"
              >
                <b-form-input
                  class="text-left"
                  v-model="dataForm.NameExtention1[1]"
                  type="text"
                  id="NameExtention1-input"
                  :disabled="!disableEdit"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6" xl="6">
              <b-form-group :label="dataForm.Note[0]">
                <b-form-textarea
                  v-model="dataForm.Note[1]"
                  rows="2"
                  max-rows="6"
                  style="height: 113px"
                  :disabled="!disableEdit"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: () => {},
    },
    disableAdd: {
      type: Boolean,
      default: true,
    },
    disableEdit: {
      type: Boolean,
      default: true,
    },
    apiForm: {
      type: String,
      default: "",
    },
    stateForm: {
      type: Object,
      default: () => {},
    },
    typeDelete: {
      type: Boolean,
      default: null,
    },
    typeAction: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dataByID: null,
      optionsRadio: [
        { text: "Đang dùng", value: 1 },
        { text: "Không dùng", value: 0 },
      ],
    };
  },
  methods: {
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      for (const key in this.dataForm) {
        if (document.getElementById(`${key}-input`)) {
          this.stateForm[key] = document
            .getElementById(`${key}-input`)
            .checkValidity();
        }
      }
      console.log(valid);
      return valid;
    },
    emitSubmit() {
      if (!this.checkFormValidityModal()) {
        this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
        return;
      } else {
        this.$emit("emitSubmit", this.dataForm, this.apiForm);
      }
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
