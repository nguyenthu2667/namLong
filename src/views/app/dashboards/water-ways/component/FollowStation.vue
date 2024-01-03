<template>
  <div class="d-flex flex-row mb-3" @click="flyToPoint(value)">
    <span class="d-block position-relative">
      <b-img
        :src="value.StationImage"
        :alt="'image_' + value.CabinetID"
        fluid
        class="list-thumbnail border-0"
        style="width: 125px !important"
        @error="loadImgDefault"
      />
    </span>
    <div class="pl-3 pr-2 pb-2">
      <span>
        <p class="list-item-heading mb-0">{{ value.Name }}</p>
        <p class="text-small text-muted">{{ value.Address }}</p>
        <div class="pr-4">
          <p class="text-muted mb-1 text-small">
            {{ value.DescriptionWarning }}
          </p>
        </div>
        <div
          class="text-small font-weight-medium d-none d-sm-block"
          :style="{ color: value.StatusColor }"
        >
          {{ convertDateTime(value.UpdateTime) }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['value'],
  methods: {
    loadImgDefault(e) {
      return (e.target.src =
        'https://megahomevietnam.com/public/assets/resources/image/Default.png')
    },
    flyToPoint(items) {
      this.$emit('fly-to-point', items)
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss")
      return date.format('HH:mm:ss DD/MM/YYYY')
    },
  },
}
</script>
