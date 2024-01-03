<template>
  <div class="status-color" :style="'border: 2px solid ' + color">
    <div class="content position-relative">
      <i
        v-show="isCircle"
        :style="'color:' + color"
        class="fas fa-circle position-absolute"
        style="top: 4px; left: 5px"
      ></i>
      <div>
        <strong>{{ label }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["color", "label", "showCircle"],
  name: "status-color",
  data() {
    return {
      isCircle: this.showCircle ?? true,
    };
  },
};
</script>

i<style lang="scss" scoped>
.status-color {
  border-radius: 20px;
  max-width: 150px;
  height: 30px;
  text-align: center;
}
.status-color .content {
  white-space: nowrap;
  margin-top: 3px;
  margin-left: 1px;
  margin-right: 1px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>