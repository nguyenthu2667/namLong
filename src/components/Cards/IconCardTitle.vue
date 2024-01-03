<template>
  <div>
    <b-card class="box_header">
      <div class="d-flex">
        <span class="box_header-icon">
          <b-img :src="img" style="height: 100%"></b-img>
        </span>
        <span class="box_header-value">
          <div class="text-center mt-2">{{ value }}</div>
        </span>
      </div>
      <div class="box_header-bottom">{{ label.toUpperCase() }}</div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "img"],
};
</script>

<style scoped>
.box_header .card-body {
  padding: 10px;
}
.box_header-icon {
  width: 80px;
  height: 70px;
}
.box_header-value {
  color: hsl(185 31% 15%);
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.box_header-bottom {
  color: hsl(185 31% 15%);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>