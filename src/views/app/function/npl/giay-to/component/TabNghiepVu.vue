<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
    >
      <i class="fas fa-eye mr-1"></i>
      <b>Theo dõi hạn giấy tờ</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fad fa-spinner-third"></i>
      <b>Gia hạn giấy tờ</b>
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