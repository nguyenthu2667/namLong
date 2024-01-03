<template>
  <div class="image-row-item">
    <b-card class="text-center">
      <b-img
        :id="idImage"
        :src="srcImage"
        :alt="altImage"
        center
        :style="{ cursor: 'pointer', width: width, height: height }"
      ></b-img>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["idImage", "srcImage", "altImage", "height", "width"],
};
</script>
<style scoped>
.image-row-item .card-body {
  padding: 0;
}
</style>
