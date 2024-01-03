<template>
  <b-modal
    id="modal-import-excel"
    :title="$t('modal.import-excel')"
    :ok-title="$t('modal.agree')"
    :cancel-title="$t('modal.cancel')"
    @hidden="hiddenModal"
    @ok="emitData"
  >
    <b-row>
      <b-col lg="12">
        <b-form-group
          :label="$t('modal.file-attach')"
          :invalid-feedback="$t('form.no-blank')"
          :state="checkIsValid()"
        >
          <b-form-file
            :placeholder="$t('modal.please-choose-file')"
            accept=".xls,.xlsx"
            :browse-text="$t('modal.choose-file')"
            v-model="file"
          ></b-form-file>
        </b-form-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      file: null,
      isCheckIsValid: false,
    };
  },
  methods: {
    hiddenModal() {
      this.file = null
      this.isCheckIsValid = false;
      this.$emit("hidden");
    },
    checkIsValid() {
      if (!this.isCheckIsValid) {
        return true;
      }
      if(!this.file) {
        return false
      }
    },
    emitData(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.isCheckIsValid = true;
      if (!this.file) return
      this.$emit('submitData', this.file)
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-import-excel");
      } else {
        this.$bvModal.hide("modal-import-excel");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
