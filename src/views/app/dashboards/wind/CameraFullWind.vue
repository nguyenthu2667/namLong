<template>
  <div style="background: white;position: relative">
    <div
      class="button-close-wallpaper "
      style="position: absolute; right: -2%; top: -4%; overflow: hidden"
    >
      <b-button variant="danger" @click="handleModalHidden()">
        <i class="fas fa-times"></i>
      </b-button>
    </div>
    <div>
      <canvas
        class="canvas"
        :id="`canvasfullwind-${dataCameraFull.Image}`"
        style=" width: 100%"
      ></canvas>
    </div>
    <div id="custom-spinner-load-submit">
      <div class="form-spinner">
        <div class="spinner">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="text-spinner">
          <p>{{ $t('cards.loading') }} ...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['dataCameraFull'],
  data() {
    return {
      SID_start: null,
      status_stream: false,
      serviceURL: 'http://192.168.100.5:54321',
      serviceSocket: 'ws://192.168.100.5',
      network: '',
      loading: false,
    }
  },
  async mounted() {
    let spinnerDiv = document.getElementById('custom-spinner-load-submit')
    spinnerDiv.style.display = 'block'
    await this.startStream()
    if (!this.loading) {
      setTimeout(() => {
        spinnerDiv.style.display = 'none'
      }, 1500)
    }
  },
  watch: {},
  methods: {
    handleModalHidden() {
      this.$emit('hideCCTV', this.dataCameraFull)
    },
    startStream() {
      this.loading = true
      let rtspDefault = `rtsp://admin:namlong2020@nlt-group.com:50554/ISAPI/Streaming/channels/${+this
        .dataCameraFull.Image}01`
      if (this.status_stream) this.stopStream(this.SID_start)
      fetch(
        `${this.serviceURL}/stream?url=${encodeURIComponent(`${rtspDefault}`)}`,
        {
          method: 'POST',
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.success && data.status === 'START') {
            this.SID_start = data.SID
            this.dataCameraFull.IDCCTV = data.SID
            this.status_stream = !this.status_stream
            this.playWS(data.SID, this.dataCameraFull.Image)
          }
        })
      this.loading = false
    },
    stopStream(sid) {
      fetch(`${this.serviceURL}/stop?SID=${sid}`).then((response) =>
        response.json(),
      )
    },
    playWS(port, channel, location) {
      new JSMpeg.Player(`${this.serviceSocket}:${port}`, {
        canvas: document.getElementById(`canvasfullwind-${channel}`),
        videoBufferSize: 1024 * 1024 * 8,
        autoplay: true,
      })
    },
  },
}
</script>
<style scopce>
.custom-spinner-load-submit {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form-spinner {
  --size: 80px;

  width: var(--size);
  height: var(--size);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-spinner p {
  font-weight: bold;
  color: white;
}

.spinner {
  --size: 62px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  perspective: 800px;

  margin-bottom: 10px;
  /*margin-left: 10px;*/
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #2cfffe;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #fcc10f;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #ec1b60;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
.hide-relative-cctv {
  position: unset !important;
  overflow: hidden !important;
}

.hide-content-relative-cctv {
  position: unset !important;
  background: unset;
  box-shadow: unset !important;
}
</style>
