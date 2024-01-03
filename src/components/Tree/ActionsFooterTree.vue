<template>
  <div>
    <b-button
      v-if="showTitle0"
      :disabled="isTitle0"
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
    >
      <i class="fas fa-list-alt mr-1"></i> <b>{{ title0 }}</b>
    </b-button>
    <b-button
      v-if="showTitle1"
      :disabled="isTitle1"
      @click="emitChangeTab(1)"
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      ><i class="fas fa-info-square mr-1"></i>
      <b>{{ title1 }}</b>
    </b-button>
    <b-button
      v-if="showTitle2"
      :disabled="isTitle2"
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-history mr-1"></i>
      <b>{{ title2 }}</b>
    </b-button>
    <b-button
      v-if="showTitle3"
      :disabled="isTitle3"
      @click="emitChangeTab(3)"
      class="mb-1"
      squared
      :variant="activeFocus == 3 ? `primary` : `outline-primary`"
    >
      <i class="fas fa-file-alt mr-1"></i>
      <b>{{ title3 }}</b>
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
  props: {
    // Title
    activeFocus: {
      type: Number,
      default: 0,
    },
    titleTab0: {
      type: String,
      default: "Danh sách chứng từ",
    },
    titleTab1: {
      type: String,
      default: "Chứng từ",
    },
    titleTab2: {
      type: String,
      default: "Lịch sử thao tác",
    },
    titleTab3: {
      type: String,
      default: "File đính kèm",
    },
    titleTab4: {
      type: String,
      default: "Khác",
    },

    // Show
    showTitle0: {
      type: Boolean,
      default: true,
    },
    showTitle1: {
      type: Boolean,
      default: true,
    },
    showTitle2: {
      type: Boolean,
      default: true,
    },
    showTitle3: {
      type: Boolean,
      default: true,
    },
    showTitle4: {
      type: Boolean,
      default: false,
    },

    // Diasble
    disabledTitle0: {
      type: Boolean,
      default: false,
    },
    disabledTitle1: {
      type: Boolean,
      default: false,
    },
    disabledTitle2: {
      type: Boolean,
      default: false,
    },
    disabledTitle3: {
      type: Boolean,
      default: false,
    },
    disabledTitle4: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Title
      title0: this.titleTab0,
      title1: this.titleTab1,
      title2: this.titleTab2,
      title3: this.titleTab3,
      title4: this.titleTab4,

      // Show
      sTitle0: this.showTitle0,
      sTitle1: this.showTitle1,
      sTitle2: this.showTitle2,
      sTitle3: this.showTitle3,
      sTitle4: this.showTitle4,

      // Disabled
      isTitle0: this.disabledTitle0,
      isTitle1: this.disabledTitle1,
      isTitle2: this.disabledTitle2,
      isTitle3: this.disabledTitle3,
      isTitle4: this.disabledTitle4,
    };
  },
  methods: {
    emitChangeTab(value) {
      this.$emit("change-tab", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
