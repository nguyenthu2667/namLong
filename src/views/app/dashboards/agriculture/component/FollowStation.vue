<template>
  <div class="d-flex flex-row mb-3" @click="flyToPoint(value)">
    <span class="d-block position-relative">
      <b-img
        :src="value.StationImage"
        :alt="'image_' + value.StationID"
        fluid
        class="list-thumbnail border-0"
        style="width: 125px !important;"
      />
    </span>
    <div class="pl-3 pr-2 pb-2">
      <span>
        <p class="list-item-heading mb-0">{{ value.StationName }}</p>
        <p class="text-small text-muted">{{ value.StationAddress }}</p>
        <div class="pr-4">
          <p class="text-muted mb-1 text-small">
            {{ value.DescriptionWarning }}
          </p>
        </div>
        <div
          class="text-small font-weight-medium d-none d-sm-block"
          :style="{ color: value.StatusColor }"
        >
          {{ value.UpdateTime }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    flyToPoint(items) {
      this.$emit('fly-to-point', items)
    },
  },
  created() {},
}
</script>
