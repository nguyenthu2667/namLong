<template>
  <div class="d-flex flex-row mb-3 pb-3 border-bottom" @click="showDetailEmployer" :class="{'warning-class': data.IsWarning}">
    <b-img :id="'face-image-list-' + id" :src="data.DataImage" :alt="data.FaceName"
           class="img-thumbnail border-0 list-thumbnail align-self-center xsmall"
           style="height: 60px !important; width: 60px !important;"/>
    <div class="pl-3 pr-2">
      <template v-if="data.DataTemperature">
        <p class="font-weight-medium mb-0 "><strong>{{ data.FaceName }}</strong></p>
        <p class="font-weight-medium mb-0 "><strong>{{data.DataTemperature}}</strong> &deg;C - <strong>{{data.DataType}}</strong></p>
      </template>
      <template v-else>
        <p class="font-weight-medium mb-0">{{ data.FaceName }}</p>
      </template>
      <p class="text-muted mb-0 text-small">{{ data.DataTime }}</p>
    </div>
    <b-modal :id="'modal-thermal-employer' + id" :ref="'modal-thermal-employer' + id" v-if="data"
             centered hide-header ok-only size="md">
      <thermal-employer :data="data"></thermal-employer>
    </b-modal>
  </div>
</template>

<script>
  import ThermalEmployer from "../Form/ThermalEmployer";

  export default {
    components: {
      "thermal-employer": ThermalEmployer
    },
    name: "ListWithEmployerThermal",
    props: ['id', 'data'],
    methods: {
      showDetailEmployer() {
        this.$bvModal.show('modal-thermal-employer' + this.id)
      }
    }
  }
</script>

<style scoped>
.warning-class {
  color: red;
}
</style>
