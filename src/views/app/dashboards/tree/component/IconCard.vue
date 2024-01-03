<template>
  <div class="icon-row-item">
    <b-card class="mb-4 custom-card-gradient">
      <span class="ml-5 mr-4">
        <b-row>
          <b-col xxs="8" class="text-left">
            <b-row class="mb-2">
              <b-col xxs="12">
                <strong class="h6">{{ title }}</strong>
              </b-col>
            </b-row>
            <b-row>
              <b-col xxs="12">
                <strong>{{ value }}</strong><span class="ml-1 font-italic">{{ unit }}</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col xxs="4" class="text-right">
            <template v-if="sub > 0">
              <span class="text-center">
                <i class="fad fa-arrow-alt-up" style="line-height: 50px"></i>
              </span>
              <span><strong>{{ sub }}</strong></span><span class="ml-1 font-italic">{{ unit }}</span>
            </template>
            <template v-else-if="sub < 0">
              <span>
                <i class="fad fa-arrow-alt-down" style="line-height: 50px"></i>
              </span>
               <span><strong>{{ sub }}</strong></span><span class="ml-1 font-italic">{{ unit }}</span>
            </template>
            <template v-else>
              <span class="text-center">
                <i class="fad fa-arrows-alt-v" style="line-height: 50px"></i>
              </span>
              <span><strong>{{ sub }}</strong></span><span class="ml-1 font-italic">{{ unit }}</span>
            </template>
          </b-col>
        </b-row>
      </span>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    title: "",
    value: "",
    unit: "",
    sub: 0.00,
  },
}
</script>
