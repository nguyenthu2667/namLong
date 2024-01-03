<template>
  <b-modal
    id="modal-find-advance"
    title="TÌM, LỌC DỮ LIỆU"
    size="lg"
    @hidden="hiddenModal"
  >
    <template v-for="(field, i) in fieldsTable">
      <div
        :key="i"
        class="d-flex justify-content-between align-items-center mb-1"
      >
        <div style="width: 100%">
          <strong>{{ field.label }}</strong>
        </div>
        <div style="width: 100%" class="text-right">
          <span style="color: #145388"
            ><b>Chọn loại tìm kiếm </b></span
          >
          <b-dropdown
            class="title-dropdown ml-1 mr-4"
            variant="link"
            toggle-class="text-decoration-none"
          >
            <b-dropdown-item @click="changeTypeSearch('Lớn hơn')" href="#">
              Lớn hơn</b-dropdown-item
            >
            <b-dropdown-item @click="changeTypeSearch('Bé hơn')" href="#">
              Bé hơn</b-dropdown-item
            >
            <b-dropdown-item @click="changeTypeSearch('Lớn hoặc bằng')" href="#"
              >Lớn hoặc bằng</b-dropdown-item
            >
            <b-dropdown-item @click="changeTypeSearch('Bé hoặc bằng')" href="#"
              >Bé hoặc bằng</b-dropdown-item
            >
            <b-dropdown-item @click="changeTypeSearch('Bằng')" href="#"
              >Bằng</b-dropdown-item
            >
            <b-dropdown-item @click="changeTypeSearch('Trong khoảng')" href="#"
              >Trong khoảng</b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div style="width: 100%" class="mr-2">
          <div>Giá trị 1</div>
          <b-form-input></b-form-input>
        </div>
        <div style="width: 100%">
          <div>Giá trị 2</div>
          <b-form-input></b-form-input>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['fieldsTable', 'show'],
  methods: {
    changeTypeSearch() {

    },
    hiddenModal() {
      this.$emit('hidden')
    }
  },
  watch: {
    show(newVal) {
      if(newVal) {
        this.$bvModal.show('modal-find-advance')
      }
      else {
        this.$bvModal.hide('modal-find-advance')
      }
    }
  }
}
</script>

<style lang="scss">
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
