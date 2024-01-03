<template>
  <div class="parent-virtual">
    <template v-for="(chil, index) in source.children">
      <div :key="index">
        <item-cctv :chil="chil" @showFullScreen="showFullScreen" :key="index" />
        <b-modal
          :id="`modal-cctv-${chil.LocationID}${chil.Channel}`"
          class="text-center"
          size="xl"
          centered
          hide-header
          hide-footer
          scrollable
          :body-class="'hide-relative-cctv'"
          :content-class="'hide-content-relative-cctv'"
          :no-close-on-backdrop="true"
        >
          <camera-full-cctv
            :dataCameraFull="dataCameraFull"
            @hideCCTV="hideCCTV"
          />
        </b-modal>
      </div>
    </template>
  </div>
</template>

<script>
import CameraFullCCTV from "@/views/app/dashboards/cctv/CameraFullCCTV";
import ItemCCTV from "@/views/app/dashboards/cctv/ItemCCTV";

export default {
  components: {
    "camera-full-cctv": CameraFullCCTV,
    "item-cctv": ItemCCTV,
  },
  props: ["source"],
  data() {
    return {
      dataCameraFull: null,
      serviceURL: "http://192.168.100.5:54321",
    };
  },
  methods: {
    stopStream(sid) {
      fetch(`${this.serviceURL}/stop?SID=${sid}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(sid);
          if (data && data.success && data.status === "STOP") {
            console.log("Stop streaming!");
          }
        });
    },
    showFullScreen(v) {
      setTimeout(() => {
        this.$bvModal.show(`modal-cctv-${v.LocationID}${v.Channel}`);
      }, 1000);
      this.dataCameraFull = v;
    },
    hideCCTV(v) {
      this.stopStream(v.IDCCTV);
      this.$bvModal.hide(`modal-cctv-${v.LocationID}${v.Channel}`);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
#custom-spinner-load-submit {
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
.parent-virtual {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.hide-relative-cctv {
  background: blue;
}

.dot {
  height: 25px;
  width: 25px;

  border-radius: 50%;
}

.header-view {
  height: 100px;
  width: 100%;
}
.header-view h1 {
  position: absolute;
  margin: 0;
  top: 10px;
  left: 10px;
}
.header-view h4 {
  position: absolute;
  margin: 0;
  top: 60px;
  left: 10px;
}
.header-view .form-network .network-url {
  width: 500px;
  padding: 5px;
}
.header-view .form-network .start-stream {
  font-weight: bold;
  padding: 5px;
  background-color: skyblue;
  color: white;
  border-color: skyblue;
}
.header-view .form-network .stop-stream {
  font-weight: bold;
  padding: 5px;
  background-color: red;
  color: white;
  border-color: red;
}
.main-view {
  height: calc(100% - 100px);
  width: 100%;
  text-align: center;
  background-color: black;
}
.main-view .canvas {
  height: 500px;
  width: auto;
}

// Mobile: width < 740px
@media only screen and (max-width: 46.1875em) {
  .parent-virtual {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
