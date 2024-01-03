<template>
  <div v-if="data" class="mb-2" style="cursor: pointer">
    <h5 class="font-weight-bold title-click-custom" @click="flyToPoint(data)">{{data.StationName}}</h5>
    <p class="text-small font-weight-medium mb-2">{{data.StationAddress}}</p>
    <b-row>
      <b-col xs="8">
        <template v-if="parseInt(data.IsWarning) === 1">
          <p class="text-muted mb-0 text-small">{{data.UpdateTime}}</p>
        </template>
        <template v-else>
          <p class="mb-0 text-small" style="color: red">{{data.UpdateTime}}</p>
        </template>
        <br>
        <br>
        <p class="text-muted mb-0 text-small mt-1">
          <template v-if="(data.StationLat !== '') && (data.StationLong !== '')">
            <i class="fad fa-map-marker-alt mr-2"></i>
            <span style="color: blue">{{data.StationLat + ', ' + data.StationLong}}</span>
          </template>
        </p>
      </b-col>
      <b-col xs="4">
        <template v-if="image">
          <template v-if="id + 1 === length">
<!--            <b-img :id="data.StationID" :src="'http://imgsmartcity.namlongtekgroup.com/' + folder + '/' + data.StationID + '.jpg'"-->
<!--                   alt="avatar_station"-->
<!--                   class="img-thumbnail border-0 list-thumbnail align-self-center xsmall float-right"-->
<!--                   style="height: 70px !important; width: 100px !important;"/>-->
            <b-img :id="data.StationID" :src="image"
                   alt="avatar_station"
                   class="img-thumbnail border-0 list-thumbnail align-self-center xsmall float-right"
                   style="height: 70px !important; width: 100px !important;"/>
          </template>
          <template v-else>
<!--            <b-img :id="data.StationID" :src="'http://imgsmartcity.namlongtekgroup.com/' + folder + '/' + data.StationID + '.jpg'"-->
<!--                   alt="avatar_station"-->
<!--                   class="img-thumbnail border-0 list-thumbnail align-self-center xsmall float-right mb-4"-->
<!--                   style="height: 70px !important; width: 100px !important;"/>-->
            <b-img :id="data.StationID" :src="image"
                   alt="avatar_station"
                   class="img-thumbnail border-0 list-thumbnail align-self-center xsmall float-right mb-4"
                   style="height: 70px !important; width: 100px !important;"/>
          </template>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "ListWithEmployerThermal",
    props: ['id', 'data', 'folder', 'length', 'image'],
    methods: {
      flyToPoint(items){
        this.$emit('fly-to-point', items)
      }
    }
  }
</script>

<style scoped>
  /*.title-click-custom {*/
  /*  text-decoration: underline;*/
  /*}*/
  .title-click-custom:hover {
    color: blue;
  }
</style>
