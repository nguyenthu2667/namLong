<template>
  <div id="app-content-full" class="form-npl-bao-tri">
    <b-card>
      <TabNghiepVu
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></TabNghiepVu>
      <b-tabs v-model="currentTab" nav-class="d-none">
        <b-tab>
          <TheoDoiLichBaoTri />
        </b-tab>
        <b-tab><XuLyYeuCau /></b-tab>
        <b-tab><XuLyBaoDuong /></b-tab>
        <b-tab><XuLySuaChua /></b-tab>
        <b-tab><ThayVo /></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TabNghiepVu from "./component/TabNghiepVu.vue";
import TheoDoiLichBaoTri from "./TheoDoiLichBaoTri.vue";
import XuLyYeuCau from "./XuLyYeuCau.vue";
import XuLyBaoDuong from "./XuLyBaoDuong.vue";
import XuLySuaChua from "./XuLySuaChua.vue";
import ThayVo from "./ThayVo.vue";

export default {
  components: {
    TabNghiepVu,
    XuLyYeuCau,
    XuLyBaoDuong,
    XuLySuaChua,
    TheoDoiLichBaoTri,
    ThayVo,
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
