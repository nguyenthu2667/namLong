<template>
  <div style="cursor: pointer" class="mb-3" @click="handleClick">
    <b-row>
      <b-col class="bg-light">
        <div class="imgs d-block position-relative">
          <carousel :perPage="2">
            <template v-for="(img, i) in order.Images">
              <slide :key="i">
                <b-img
                  :src="img.Image"
                  class="list-thumbnail border-0 pl-1"
                  style="
                    width: 100% !important;
                    height: 130px;
                    background: #f3f3f3 !important;
                  "
                />
              </slide>
            </template>
          </carousel>
          <b-badge
            :style="{
              'background-color': `${order.ProcessColor} !important`,
              right: '-10px',
            }"
            pill
            class="position-absolute badge-top-right"
          >
            {{ order.ProcessName }}
          </b-badge>
        </div>
      </b-col>
      <b-col class="bg-light">
        <div class="pt-1">
          <strong class="list-item-heading">{{ order.TreeName }}</strong>
          <div class="pr-4">
            <p class="text-muted mb-1 text-small">
              <i class="fas fa-user"></i>
              {{ order.EmployerName }}
            </p>
            <p class="text-muted mb-1 text-small">
              <i class="fas fa-map-marker"></i>
              {{ order.FullAddress }}
            </p>
            <!-- <p
              class="mb-1 text-small"
              :style="`color: ${order.TreeStatusColor}`"
            >
              {{ order.TreeStatusName }}
            </p> -->

            <p v-if="order.TreeStatusName">
              <b-badge
                variant="primary"
                :style="
                  'font-weight: 600;background:' +
                  order.TreeStatusColor +
                  '!important'
                "
              >
                {{ order.TreeStatusName }}
              </b-badge>
            </p>
          </div>
          <div
            class="text-primary text-small font-weight-medium d-none d-sm-block"
          >
            {{ convertDateTime(order.UpdateTime) }}
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import handling from "@/constants/handling";
export default {
  props: ["order", "detailPath", "clickHandle"],
  methods: {
    handleClick() {
      this.clickHandle(this.order);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>
<style>
.imgs {
  width: 100%;
  background: rgb(243, 243, 243);
}
.imgs .VueCarousel-pagination {
  display: none;
}
</style>
