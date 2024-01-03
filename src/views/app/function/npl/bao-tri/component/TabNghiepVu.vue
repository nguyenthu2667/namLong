<template>
  <div>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 0 ? `primary` : `outline-primary`"
      @click="emitChangeTab(0)"
    >
      <i class="fas fa-eye mr-1" />
      <b>Theo dõi lịch bảo dưỡng</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 1 ? `primary` : `outline-primary`"
      @click="emitChangeTab(1)"
    >
      <i class="fad fa-spinner-third" />
      <b>Xử lý yêu cầu phương tiện</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 2 ? `primary` : `outline-primary`"
      @click="emitChangeTab(2)"
    >
      <i class="fas fa-sync-alt" />
      <b>Xử lý yêu cầu bảo dưỡng</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 3 ? `primary` : `outline-primary`"
      @click="emitChangeTab(3)"
    >
      <i class="fas fa-sync-alt" />
      <b>Xử lý yêu cầu sửa chữa</b>
    </b-button>
    <b-button
      class="mb-1"
      squared
      :variant="activeFocus == 4 ? `primary` : `outline-primary`"
      @click="emitChangeTab(4)"
    >
      <i class="fas fa-sync-alt" />
      <b>Cập nhật thông tin thay vỏ</b>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    activeFocus: {
      type: Number,
      required: true,
    },
  },
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
