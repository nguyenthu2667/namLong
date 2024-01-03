<template>
  <div id="app-content-full">
    <b-card>
      <div class="box-img">
        <!-- <img
          src="https://www.npllogistics.com/Data/Sites/5/media/img/news/yvcwrem_ihe1d7zi2wi8b_mc32qa8l6i4fcjmdzgojwjc-h_aahgxwashtlmpsv14vu2tyz9a1ptdfngxztuhjjfehll6ed_eb_v9fn-w70.jpg"
          style="width: 100%; height: 100%"
        /> -->
        <img
          src="../../../assets/logos/banner.gif"
          style="width: 100%; height: 100%"
        />
      </div>
      <!-- <div class="d-flex mt-3 justify-content-center">
        <StatusColor
          :color="'green'"
          :label="'Trạng thái kết nối'"
        ></StatusColor>
        <StatusColor :color="'red'" :label="'Trạng thái bị lỗi'"></StatusColor>
        <StatusColor
          :color="'blue'"
          :label="'Trạng thái bình thường'"
        ></StatusColor>
        <StatusColor
          :color="'orange'"
          :label="'Trạng thái cảnh báo'"
        ></StatusColor>
      </div> -->
    </b-card>
  </div>
</template>

<script>
import StatusColor from "@/components/Badges/StatusColor.vue";
export default {
  components: {
    StatusColor,
  },
};
</script>

<style lang="scss" scoped>
.box-img {
  height: calc(100vh - 180px);
}
</style>
