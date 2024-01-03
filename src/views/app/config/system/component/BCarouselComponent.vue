<template>
  <div>
    <b-carousel
      id="custom-carousel-component"
      v-model="slide"
      :interval="autoplay"
      controls
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <template v-for="(item, key) in listImage">
        <template v-if="item.Image">
          <b-carousel-slide>
            <template #img>
              <b-img
                :key="key"
                :id="item.ID"
                :class="{ 'img-slide-active': key === slide }"
                :src="item.Image"
                :alt="'image-wallpaper-' + key"
                center
                fluid
                style="height: 100vh; width: auto"
              />
            </template>
          </b-carousel-slide>
        </template>
        <template v-else-if="item.Images">
          <b-carousel-slide>
            <template #img>
              <b-img
                :key="key"
                :id="item.ID"
                :class="{ 'img-slide-active': key === slide }"
                :src="item.Images"
                :alt="'image-wallpaper-' + key"
                center
                fluid
                style="height: 100vh; width: auto"
              />
            </template>
          </b-carousel-slide>
        </template>
      </template>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "BCarouselComponent",
  props: ["listImage"],
  data() {
    return {
      slide: 0,
      sliding: null,
      autoplay: 60000,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
#custom-carousel-component {
  position: absolute;
  height: auto;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
