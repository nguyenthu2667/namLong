<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
    >
      <i class="fas fa-list-alt mr-1"></i> <b>Danh sách chứng từ</b>
    </b-button>
    <b-button
      v-show="sTab1"
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
      ><i class="fas fa-info-square mr-1"></i>
      <b>{{ title1 }}</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-history mr-1"></i>
      <b>Lịch sử thao tác</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 3 ? `primary` : `outline-primary`"
      @click="emitChangeTab(3)"
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
    "showTab1",
  ],
  data() {
    return {
      title0: this.titleTab0 ?? "Danh sách",
      title1: this.titleTab1 ?? "Chứng từ",
      title2: this.titleTab2 ?? "Lịch sử thao tác",
      title3: this.titleTab3 ?? "File đính kèm",
      title4: this.titleTab4 ?? "Khác",
      sTab1: this.showTab1 ?? true,
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