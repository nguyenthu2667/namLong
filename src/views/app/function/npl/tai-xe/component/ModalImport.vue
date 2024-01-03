<template>
  <b-modal
    id="modal-import-special"
    title="ĐÍNH KÈM FILE"
    @hidden="hiddenModal"
  >
    <b-row>
      <b-col lg="12">
        <b-form-group :label="'Tiêu đề'">
          <b-form-input></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group :label="'File'">
          <b-form-file
            :placeholder="'Xin mời chọn...'"
            v-model="files"
            multiple
            accept="/*"
            :browse-text="'Chọn Tệp'"
          ></b-form-file>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group :label="'Ghi chú'">
          <b-form-textarea rows="2" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      files: null
    };
  },
  methods: {
    hiddenModal() {
      this.$emit('hidden')
    }
  },
  watch: {
    show(newVal) {
      if(newVal) {
        this.$bvModal.show('modal-import-special')
      }
      else {
        this.$bvModal.hide('modal-import-special')
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
