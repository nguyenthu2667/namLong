<template>
  <div>
    <template v-if="type === 2">
      <b-card style="max-height: 120px !important;" class="text-center">
        <div>
          <i :class="icon" style="font-size: 30px; color: gray;" />
          <div class="d-flex justify-content-center align-content-center">
            <button
              style="border-radius: 20px;"
              class="card-text font-weight-bold mb-0"
              @click="handleClick(data)"
            >
              {{ title }}
            </button>
          </div>
        </div>
      </b-card>
    </template>
    <template v-else>
      <b-card
        :style="'max-height:' + maxHeight + 'px !important;'"
        class="text-center pb-4"
      >
        <div>
          <i :class="icon" style="font-size: 30px; color: gray;" />
          <p
            :style="'color:' + colorTitle + ';'"
            class="card-text font-weight-bold mb-0"
          >
            {{ title }}
          </p>
          <p class="lead text-center">{{ value }}</p>
          <br />
        </div>
      </b-card>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: null },
    colorTitle: { type: String, default: null },
    icon: { type: String, default: 'far fa-question-circle' },
    value: { type: Number, default: null },
    type: { type: Number, default: null },
    data: { type: Object, default: null },
    handleClickViewChart: { type: Function },
    maxHeight: { type: Number, default: 120 },
  },
  methods: {
    handleClick(data) {
      this.$emit('handleClickViewChart', data)
    },
  },
}
</script>
