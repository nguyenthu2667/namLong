<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
      ><i class="fad fa-spinner-third mr-1"></i>
      <b>Đơn hàng chờ duyệt</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fas fa-truck-loading mr-1"></i>
      <b>Đơn hàng chờ chia xe</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-file-medical-alt mr-1"></i>
      <b>Giám sát</b>
      <!-- Theo dõi vận đơn -->
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 3 ? `primary` : `outline-primary`"
      @click="emitChangeTab(3)"
    >
      <i class="fas fa-file-invoice-dollar mr-1"></i>
      <b>Duyệt phát sinh</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 4 ? `primary` : `outline-primary`"
      @click="emitChangeTab(4)"
    >
      <i class="fas fa-truck-moving" mr-1></i>
      <b>Xe chờ điều độ</b>
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