<template>
  <div id="app-content-full" class="form-npl-kinh-doanh">
    <b-card>
      <TabOutline
        :activeFocus="currentTabOutline"
        @change-tab="updateTab"
      ></TabOutline>
      <b-tabs v-model="currentTabOutline" nav-class="d-none" class="mb-2">
        <b-tab
          ><div class="box-content mt-2">
            <YeuCauVanTai
              :title="'TIẾP NHẬN YÊU CẦU VẬN TẢI'"
              :fields="oderKD.fields"
              :fieldsForm="oderKD.fieldsForm"
              :items="oderKD.data"
              :optionByKey="optionByKey"
            ></YeuCauVanTai>
          </div>
        </b-tab>
        <b-tab>
          <div class="box-content mt-2">
            <DonHang
              :title="'Quản lí và theo dõi đơn hàng'"
              :fields="donHangKD.fields"
              :fieldsFormHeader="donHangKD.fieldsFormHeader"
              :fieldsFormHeaderRight="donHangKD.fieldsFormHeaderRight"
              :fieldsFormBottomRight="donHangKD.fieldsFormBottomRight"
              :items="donHangKD.data"
              :optionByKey="optionByKey"
            ></DonHang></div
        ></b-tab>
        <b-tab
          ><div class="box-content">
            <ChiPhiPhatSinh></ChiPhiPhatSinh>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TabOutline from "./component/TabHeaderSaleTracking.vue";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import YeuCauVanTai from "./YeuCauVanTai.vue";
import ChiPhiPhatSinh from "./component/ChiPhiPhatSinh.vue";
import DonHang from "./component/DonHang.vue";
import oderKD from "@/data/modules/npl/oderKD";
import donHangKD from "@/data/modules/npl/donHangKD";
import loaiHang from "@/data/modules/npl/loaiHang";
import matHang from "@/data/modules/npl/matHang";
import status from "@/data/modules/npl/status";

export default {
  components: {
    TabOutline,
    ActionsFooterNPL,
    ActionsHeaderNPL,
    YeuCauVanTai,
    ChiPhiPhatSinh,
    DonHang,
  },
  data() {
    return {
      currentTabOutline: 0,
      //my-data
      oderKD,
      donHangKD,
      //options
      optionByKey: {
        loaiDonHang: loaiHang.optionLoaiHang,
        typeBrand: loaiHang.option,
        brand: matHang.option,
        statusName: status.optionDonHang,
        route: [
          "SG-CL (SÀI GÒN-CÁT LÁI)",
          "SG-LA (SÀI GÒN-LONG AN)",
          "BT-AG (BẾN TRE-AN GIANG)",
        ],
        unit: ["Chuyến", "Tấn", "Cont20", "Cont40"],
      },
    };
  },
  methods: {
    updateTab(value) {
      this.currentTabOutline = value;
    },
  },
};
</script>