<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
      ><i class="fas fa-info-square mr-1"></i>
      <b>Đơn hàng</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fas fa-history mr-1"></i>
      <b>Lịch sử thao tác</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-file-alt mr-1"></i>
      <b>File đính kèm</b>
    </b-button>
  </div>
</template>

<script>
export default {
  props: [
    "activeFocus",
    "titleTab0",
    "titleTab1",
    "titleTab2",
    "titleTab3",
    "titleTab4",
  ],
  data() {
    return {
      title0: this.titleTab0 ?? "Chứng từ",
      title1: this.titleTab1 ?? "Lịch sử thao tác",
      title2: this.titleTab2 ?? "File đính kèm",
      title3: this.titleTab3 ?? "Khác",
    };
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