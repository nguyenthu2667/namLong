<template>
  <div id="app-content-full" class="form-npl-dieu-do">
    <b-card>
      <TabHeaderQuanLyDieuDo
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></TabHeaderQuanLyDieuDo>

      <b-tabs v-model="currentTab" nav-class="d-none" class="mb-2">
        <b-tab>
          <DonHangChoDuyet></DonHangChoDuyet>
        </b-tab>
        <b-tab>
          <DonHangChoDieuDo></DonHangChoDieuDo>
          <!-- Đơn hàng chờ chia xe -->
        </b-tab>
        <b-tab>
          <TheoDoiVanDon></TheoDoiVanDon>
        </b-tab>
        <b-tab>
          <ChiPhiPhatSinh></ChiPhiPhatSinh>
        </b-tab>
        <b-tab>
          <XeChoDieuDo></XeChoDieuDo>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TabHeaderQuanLyDieuDo from "./component/TabHeaderQuanLyDieuDo.vue";
import DonHangChoDuyet from "./component/DonHangChoDuyet.vue";
import DonHangChoDieuDo from "./component/DonHangChoDieuDo.vue";
import XeChoDieuDo from "./component/XeChoDieuDo.vue";
import TheoDoiVanDon from "./component/TheoDoiVanDon.vue";
import ChiPhiPhatSinh from "../kinh-doanh/component/ChiPhiPhatSinh.vue";

export default {
  components: {
    TabHeaderQuanLyDieuDo,
    DonHangChoDuyet,
    DonHangChoDieuDo,
    XeChoDieuDo,
    TheoDoiVanDon,
    ChiPhiPhatSinh,
  },
  data() {
    return {
      //tab-header
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