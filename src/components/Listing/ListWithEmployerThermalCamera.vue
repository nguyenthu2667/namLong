<template>
  <div
    class="d-flex flex-row mb-3 pb-3 border-bottom"
    @click="showDetailEmployer"
    :class="{ 'warning-class': data.IsWarning }"
  >
    <b-img
      :id="'face-image-list-' + id"
      :src="data.FaceUrl"
      :alt="'image_origin'"
      class="img-thumbnail border-0 list-thumbnail align-self-center xsmall text-small"
      style="height: 60px !important; width: 60px !important"
    />
    <div class="pl-3 pr-2">
      <template v-if="data.Temperature">
        <p class="font-weight-medium mb-0">
          <strong>{{ data.CameraThermalName }}</strong>
        </p>
        <p class="font-weight-medium mb-0">
          <strong>{{ data.Temperature }}</strong> &deg;C
        </p>
        <!--          - <strong>{{data.DataType}}</strong></p>-->
      </template>
      <template v-else>
        <p class="font-weight-medium mb-0">{{ data.CameraThermalName }}</p>
      </template>
      <p class="text-muted mb-0 text-small">{{ data.DataTime }}</p>
    </div>
    <b-modal
      :id="'modal-thermal-camera' + id"
      :ref="'modal-thermal-camera' + id"
      v-if="data"
      centered
      hide-header
      ok-only
      size="md"
    >
      <thermal-camera :data="data"></thermal-camera>
    </b-modal>
  </div>
</template>

<script>
import ThermalCamera from "@/components//Form/ThermalCamera";

export default {
  components: {
    "thermal-camera": ThermalCamera,
  },
  props: ["id", "data"],
  methods: {
    showDetailEmployer() {
      this.$bvModal.show("modal-thermal-camera" + this.id);
    },
  },
};
</script>

<style scoped>
.warning-class {
  color: red;
}
</style>
