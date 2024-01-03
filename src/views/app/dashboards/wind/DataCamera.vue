<template>
  <div
    class="d-flex justify-content-between mt-2 text-size-md align-items-center"
    :class="{ active: activeEl === index }"
    @click="test(item), check(item, index)"
    style="cursor:pointer"
  >
    <div>
      {{ item.StationName }} | {{ $t('dashboards.channel')
      }}<span style="color: blue"> {{ item.Channel }}</span>
    </div>
    <div>
      <b-badge
        :class="{
          disconnected: item.DeviceStatus === 0,
        }"
      >
        {{
          item.DeviceStatus === 1
            ? $t('dashboards.warning-fire.connected')
            : $t('dashboards.warning-fire.disconnected')
        }}
      </b-badge>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item', 'index', 'activeEl'],
  data() {
    return {}
  },
  methods: {
    test(v) {
      this.$emit('testHandle', v)
    },
    check(item, v) {
      this.$emit('changeActive', item, v)
    },
  },
}
</script>
<style lang="scss" scoped>
.activeZTE {
  color: blue !important;
  background-color: red !important;
}

.disconnected {
  background-color: #f5365c !important;
  color: white;
}

.text-size-md {
  font-size: 14px;
  font-weight: 500;
}

// LOADING

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
