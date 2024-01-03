<template>
  <div :class="'card bg-' + bgColor + ' order-card'">
    <div :style="'height:' + height + 'px'" class="card-block">
      <h2 class="text-right">
        <span><i :class="icon + ' f-left'"></i></span>
        <span class="m-b-20 ml-2 f-left">
          {{ titleHeader }}
        </span>
        <span>{{ value }}</span>
      </h2>
      <p class="m-b-0">
        {{ titleFooter }}
        <span class="f-right">{{ total }} {{ unit }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "far fa-question-circle" },
    titleHeader: { type: String, default: null },
    titleFooter: { type: String, default: null },
    value: { type: Number, default: null },
    total: { type: parseFloat(Number), default: null },
    unit: { type: String, default: null },
    bgColor: { type: String, default: "blue" },
    height: { type: Number, default: null },
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #fafafa;
}
.order-card {
  color: #fff;
}

.bg-blue {
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-green {
  background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}
.bg-success {
  background: linear-gradient(45deg, #2ed875, #5bee9d);
}

.bg-yellow {
  background: linear-gradient(45deg, #ffb64d, #ffcb80);
}

.bg-pink {
  background: linear-gradient(45deg, #ff5370, #ff869a);
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.card .card-block {
  padding: 25px;
}

.order-card i {
  font-size: 26px;
}

.f-left {
  float: left;
}

.f-right {
  float: right;
}
</style>
