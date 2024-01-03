<template>
  <div
    class="err-npl h-100 w-100 d-flex justify-content-center align-items-center"
  >
    <b-card
      class="pt-5 pb-5"
      no-body
      style="opacity: 0.85; padding-left: 100px; padding-right: 100px"
    >
      <div style="width: 100%">
        <router-link tag="a" to="/">
          <div class="text-center">
            <span class="logo-single" style="margin-bottom: 10px" />
          </div>
        </router-link>
        <h6 class="mb-4">
          <span style="font-weight: 600">Không tìm thấy trang !</span>
        </h6>
        <div class="text-center" style="font-size: 50px">404</div>
        <div class="text-center">
          <b-button
            type="submit"
            variant="primary"
            size="lg"
            class="btn-shadow"
            @click="goBack"
            >{{ $t("pages.go-back-home") }}</b-button
          >
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { adminRoot } from "../constants/config";
export default {
  methods: {
    goBack() {
      this.$router.push(adminRoot);
    },
  },
  mounted: function () {
    document.body.classList.add("background");
  },
  beforeDestroy() {
    document.body.classList.remove("background");
  },
};
</script>
<style scoped>
.err-npl {
  background: url(/assets/img/npl/bg3.jpg) no-repeat center center fixed;
  background-color: #34495e;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.title {
  text-align: center;
  display: flex;
  color: #e74c3c !important;
  font-weight: 900;
  background: #000;
  opacity: 0.8;
  padding: 3px;
  padding-top: 5px;
  border-radius: 5px;
}
</style>