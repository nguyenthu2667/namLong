<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
    >
      <i class="fas fa-truck-loading mr-1"></i>
      <b>Cập nhật phí nâng/hạ/DO</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fas fa-edit"></i>
      <b>Cập nhật chứng từ</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-sync-alt"></i>
      <b>Bàn giao chứng từ</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 3 ? `primary` : `outline-primary`"
      @click="emitChangeTab(3)"
    >
      <i class="fas fa-file-invoice-dollar"></i>
      <b>Tạm ứng tài xế</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 4 ? `primary` : `outline-primary`"
      @click="emitChangeTab(4)"
    >
      <i class="fas fa-file-invoice-dollar"></i>
      <b>Vé tháng</b>
    </b-button>
    <!-- <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 5 ? `primary` : `outline-primary`"
      @click="emitChangeTab(5)"
    >
      <i class="fas fa-file-invoice-dollar"></i>
      <b>P/cấp hàng lẻ</b>
    </b-button> -->
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 6 ? `primary` : `outline-primary`"
      @click="emitChangeTab(6)"
    >
      <i class="fas fa-file-invoice-dollar"></i>
      <b>Vé ETC</b>
    </b-button>
  </div>
</template>

<script>
export default {
  props: ["activeFocus"],
  data() {
    return {};
  },
  methods: {
    emitChangeTab(value) {
      this.$emit("change-tab", value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>