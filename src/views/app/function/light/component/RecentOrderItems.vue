<template>
  <div style="cursor: pointer" class="mb-3 bg-light" @click="handleClick(item)">
    <b-row>
      <b-col>
        <div class="imgs d-block position-relative">
          <carousel
            :autoplay="true"
            :loop="true"
            :autoplayTimeout="3000"
            :perPage="2"
          >
            <template v-for="(img, i) in imgs">
              <slide :key="i">
                <b-img
                  :src="img.ImageLinks"
                  style="
                    width: 100% !important;
                    height: 100px;
                    background: #f3f3f3;
                  "
                />
              </slide>
            </template>
          </carousel>
          <b-badge
            :style="{
              'background-color': `${statusColor} !important`,
              right: '-15px',
            }"
            pill
            class="position-absolute badge-top-right"
          >
            {{ textStatus }}
          </b-badge>
        </div>
      </b-col>
      <b-col>
        <div class="d-flex">
          <div style="width: 100%" class="mt-1">
            <strong class="list-item-heading">{{ title }}</strong>
            <div class="pr-4">
              <p class="text-muted mb-1 text-small">
                <i class="fas fa-map-marker"></i>
                {{ address }}
              </p>
              <p class="text-muted mb-1 text-small">
                <i class="fas fa-user"></i>
                {{ employer }}
              </p>
            </div>
            <div
              class="text-primary text-small font-weight-medium d-none d-sm-block"
            >
              {{ convertDateTime(datetime) }}
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import handling from "@/constants/handling";
export default {
  props: [
    "imgs",
    "statusColor",
    "textStatus",
    "title",
    "employer",
    "address",
    "datetime",
    "notes",
    "item",
    "clickHandle",
  ],
  methods: {
    handleClick(item) {
      console.log(item);
      this.clickHandle(item);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>
<style>
.imgs {
  background: rgb(243, 243, 243);
}
.imgs .VueCarousel-pagination {
  display: none;
}
</style>
