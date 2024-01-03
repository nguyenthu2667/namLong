<template>
  <div id="app-content-full" class="form-npl-thu-ky">
    <b-card>
      <TabNghiepVu
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></TabNghiepVu>
      <b-tabs v-model="currentTab" nav-class="d-none">
        <b-tab>
          <PhiNangHa></PhiNangHa>
        </b-tab>
        <b-tab><CapNhatChungTu></CapNhatChungTu></b-tab>
        <b-tab><BanGiaoChungTu></BanGiaoChungTu></b-tab>
        <b-tab><TamUngTaiXe></TamUngTaiXe></b-tab>
        <b-tab>
          <VeThang></VeThang>
        </b-tab>
        <b-tab>
          <PhuCapHangLe></PhuCapHangLe>
        </b-tab>
        <b-tab><VeETC></VeETC></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TabNghiepVu from "./component/TabNghiepVu.vue";
import TamUngTaiXe from "./TamUngTaiXe.vue";
import PhiNangHa from "./PhiNangHa.vue";
import VeThang from "./VeThang.vue";
import PhuCapHangLe from "./PhuCapHangLe.vue";
import VeETC from "./VeETC.vue";
import CapNhatChungTu from "./CapNhatChungTu.vue";
import BanGiaoChungTu from "./BanGiaoChungTu.vue";

export default {
  components: {
    TabNghiepVu,
    TamUngTaiXe,
    PhiNangHa,
    VeThang,
    PhuCapHangLe,
    VeETC,
    CapNhatChungTu,
    BanGiaoChungTu,
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    updateTab(value) {
      this.currentTab = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>