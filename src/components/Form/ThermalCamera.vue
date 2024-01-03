<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h4 class="text-center"><strong>{{data.CameraThermalName}}</strong></h4>
      </b-col>
      <b-col lg="12" class="mb-3">
        <template v-if="data.IsWarning">
          <b-alert class="text-center font-weight-bolder mb-0" variant="danger" show>
            <p class="mb-0">{{data.Temperature}}&deg;C</p>
            <p class="text-small mb-0">{{data.DataTime}}</p>
          </b-alert>
        </template>
        <template v-else>
          <b-alert class="text-center font-weight-bolder mb-0" variant="success" show>
            <p class="mb-0">{{data.Temperature}}&deg;C</p>
            <p class="text-small mb-0">{{data.DataTime}}</p>
          </b-alert>
        </template>
        <div class="div-avatar-thermal mb-1 text-uppercase font-weight-bolder">
          <template v-if="data.FaceUrl">
            <b-img :src="data.FaceUrl" fluid center alt="img-thermal-camera"
                   style="width: 200px; height: 200px"></b-img>
          </template>
          <template v-else>
            <div class="absolute-default-avatar text-center">
              <p class="mb-0"><i class="fad fa-user-alt-slash p-3" style="font-size: 40px"></i></p>
              <p class="mb-0" style="font-size: 15px">No avatar</p>
            </div>
          </template>
        </div>
        <template v-if="data.OriginalPictureUrl">
          <b-img :src="data.OriginalPictureUrl" fluid center alt="img-thermal-camera-original" class="border-image-custom"
                 style="width: 100%; height: auto"></b-img>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "ThermalEmployer",
    props: ['data'],
  }
</script>

<style scoped>
  .div-avatar-thermal {
    width: 100%;
    height: 250px;
    position: relative;
    background-color: #d7d7d7;
    padding: 25px 0;
  }

  .div-avatar-thermal .absolute-default-avatar {
    color: white;
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .border-image-custom{
    border: 2px solid #d7d7d7;
  }
</style>
