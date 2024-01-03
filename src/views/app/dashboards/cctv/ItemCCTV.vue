<template>
  <b-card no-body style="background: none; box-shadow: none;">
    <div class="d-flex flex-column">
      <div
        class="d-flex justify-content-between align-items-center p-1 p-lg-2 bg-color-title"
      >
        <div class="d-flex align-items-center" style="gap: 10px;">
          <div
            class="dot"
            :style="{
              backgroundColor:
                chil.DeviceStatus === true ? '#28a745' : '#ff9999',
            }"
          ></div>
          <span>{{ chil.LocationName }} |</span>
          <span>{{ chil.StationName }} |</span>
          <span>{{ $t('dashboards.channel') }} {{ chil.Channel }} </span>
        </div>
      </div>
      <div
        class=""
        @click="$emit('showFullScreen', chil)"
        v-if="chil.DeviceStatus"
        style="cursor: pointer;"
      >
        <canvas
          class="canvas bg-white"
          :id="`canvas-${chil.Channel}-${'' + chil.LocationID}`"
          style="height: 300px; width: 100%;"
        ></canvas>
      </div>
      <div v-else class="">
        <b-img
          fluid
          thumbnail
          src="/assets/img/camera-icon/no-camera-connect.jpg"
          class="cctv-img-no-camera"
          style="object-fit: cover; height: 300px;"
        ></b-img>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ['chil'],
  data() {
    return {
      SID_start: null,
      status_stream: false,
      serviceURL: 'http://192.168.100.5:54321',
      serviceSocket: 'ws://192.168.100.5',
      network: '',
    }
  },
  methods: {
    startStream() {
      let rtspDefault = `rtsp://admin:namlong2020@nlt-group.com:50554/ISAPI/Streaming/channels/${+this
        .chil.Channel}01`
      if (this.status_stream) this.stopStream(this.SID_start)
      fetch(
        `${this.serviceURL}/stream?url=${encodeURIComponent(`${rtspDefault}`)}`,
        {
          method: 'POST',
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(this.SID_start, 'check')
          if (data && data.success && data.status === 'START') {
            this.SID_start = data.SID
            this.status_stream = !this.status_stream
            console.log(this.SID_start)
            this.playWS(data.SID, this.chil.Channel, '' + this.chil.LocationID)
            console.log('Start streaming...')
          }
        })
    },
    stopStream(sid) {
      fetch(`${this.serviceURL}/stop?SID=${sid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(sid)
          if (data && data.success && data.status === 'STOP') {
            console.log('Stop streaming!')
          }
        })
    },
    playWS(port, channel, location) {
      console.log(`canvas-${channel}-${location}`)
      new JSMpeg.Player(`${this.serviceSocket}:${port}`, {
        canvas: document.getElementById(`canvas-${channel}-${location}`),
        videoBufferSize: 1024 * 1024 * 8,
        autoplay: true,
      })
    },
  },
  created() {
    if (this.chil.DeviceStatus && +this.chil.Channel === 24) {
      this.startStream()
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-color-title {
  color: white;
  font-size: 14px;
  font-weight: 900;
  background-color: #2a93d5;
}

@media only screen and (max-width: 46.1875em) {
  .bg-color-title {
    font-size: 12px;
  }
}
</style>
