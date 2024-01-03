<template>
  <div style="cursor: pointer" class="mb-3 bg-light" @click="handleClick(item)">
    <b-row>
      <b-col>
        <div class="imgs d-block position-relative">
          <!-- v-if="imgs && imgs.length > 1" -->
          <carousel
            :autoplay="true"
            :loop="true"
            :autoplayTimeout="3000"
            :perPage="2"
          >
            <template v-for="(img, i) in imgs">
              <slide :key="i">
                <b-img
                  :src="img.Links"
                  style="
                    width: 100% !important;
                    height: 110px;
                    background: #f3f3f3;
                  "
                />
              </slide>
            </template>
          </carousel>
          <!-- <b-img
            v-else
            :src="
              imgs && imgs[0] && imgs[0].Links
                ? imgs[0].Links
                : require('@/assets/img/no-image.png')
            "
            class="list-thumbnail border-0"
            style="width: 100% !important; height: 100px; background: #f3f3f3;"
          /> -->
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
            <strong class="list-item-heading"
              >{{ title }} ({{ this.item.TreeNumber }})</strong
            >
            <div class="pr-4">
              <p class="text-muted mb-1 text-small">
                <i class="fas fa-user"></i>
                {{ employer }}
              </p>

              <p class="text-muted mb-1 text-small">
                <i class="fas fa-map-marker"></i>
                {{ address }}
              </p>
              <p class="text-muted mb-1 text-small">
                <i class="fas fa-route"></i>
                {{ this.item.TreeRouteName }}
              </p>
            </div>
            <div
              class="text-primary text-small font-weight-medium d-none d-sm-block"
            >
              <i class="fas fa-clock text-muted"></i>
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
