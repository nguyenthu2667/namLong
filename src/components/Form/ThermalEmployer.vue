<template>
  <div>
    <b-row>
      <template v-if="data">
        <b-col lg="12" class="mb-3">
          <template v-if="data.IsWarning">
            <b-alert class="text-center font-weight-bolder mb-0" variant="danger" show>
              <p class="mb-0">{{data.DataTemperature}}&deg;C - {{data.DataType}}</p>
              <p class="text-small mb-0">{{data.DataTime}}</p>
            </b-alert>
          </template>
          <template v-else>
            <b-alert class="text-center font-weight-bolder mb-0" variant="success" show>
              <p class="mb-0">{{data.DataTemperature}}&deg;C - {{data.DataType}}</p>
              <p class="text-small mb-0">{{data.DataTime}}</p>
            </b-alert>
          </template>
          <div class="div-avatar-thermal mb-1 text-uppercase font-weight-bolder">
            <template v-if="data.DataImage">
              <b-img :id="'myImageFormKiosk_' + data.DataImage" :src="data.DataImage" fluid center alt="img-thermal-camera"
                     style="width: 200px; height: 200px" @click="openFullscreen('myImageFormKiosk_' +  data.DataImage)"></b-img>
            </template>
            <template v-else>
              <div class="absolute-default-avatar text-center">
                <p class="mb-0"><i class="fad fa-user-alt-slash p-3" style="font-size: 40px"></i></p>
                <p class="mb-0" style="font-size: 15px">No avatar</p>
              </div>
            </template>
          </div>
        </b-col>
        <b-col lg="12">
          <p class="font-weight-bold ml-2">{{$t('dashboards.info-employer').toUpperCase()}}:</p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.full-name')}}:</span><strong>{{data.FaceName}}</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.number-employer')}}:</span><strong>{{data.Passport}}</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.position')}}:</span><strong>{{data.PositionName}}</strong>
          </p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.phone')}}:</span><strong>{{data.Phone}}</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.address')}}:</span><strong>{{data.Address}}</strong></p>
        </b-col>
      </template>
      <template v-else>
        <b-col lg="12" class="mb-3">
          <b-alert class="text-center font-weight-bolder mb-0" variant="dark" show>
            <p class="mb-0">NaN &deg;C - NaN</p>
            <p class="text-small mb-0">NaN</p>
          </b-alert>
          <div class="div-avatar-thermal mb-1 text-uppercase font-weight-bolder">
            <div class="absolute-default-avatar text-center">
              <p class="mb-0"><i class="fad fa-user-alt-slash p-3" style="font-size: 40px"></i></p>
              <p class="mb-0" style="font-size: 15px">No avatar</p>
            </div>
          </div>
        </b-col>
        <b-col lg="12">
          <p class="font-weight-bold ml-2">{{$t('dashboards.info-employer').toUpperCase()}}:</p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.full-name')}}:</span><strong>NaN</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.number-employer')}}:</span><strong>NaN</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.position')}}:</span><strong>NaN</strong>
          </p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.phone')}}:</span><strong>NaN</strong></p>
        </b-col>
        <b-col lg="12">
          <p><span class="ml-2 mr-2">- {{$t('dashboards.address')}}:</span><strong>NaN</strong></p>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "ThermalEmployer",
    props: ['data'],
    methods: {
      openFullscreen(idElement) {
        let element = document.getElementById(idElement)
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
    }
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
</style>
