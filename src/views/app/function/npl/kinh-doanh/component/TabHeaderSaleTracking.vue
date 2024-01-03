<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
      ><i class="fas fa-truck-container mr-1"></i>
      <b>Yêu cầu vận tải</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fas fa-paste mr-1"></i>
      <b>Đơn hàng</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-file-invoice-dollar mr-1"></i>
      <b>Duyệt phát sinh</b>
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