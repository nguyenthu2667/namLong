<template>
  <div>
    <FormBasicNPLcustom
      :title="'THEO DÕI LỊCH BẢO TRÌ'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      :sIndex="false"
      :sAdd="false"
      :sEdit="false"
      :sDelete="false"
      :sSave="false"
      :sCancel="false"
      :sBlock="false"
      :showCopy="false"
      :sImport="false"
      :sFooter="false"
      :disDbclick="true"
      :componentKey="'TheoDoiLichBaoTri'"
    >
      <!-- <template #tabOneHeader="slotProps">
        <div class="text-right">
          <b-button
            size="xs"
            squared
            variant="primary"
            class="mb-1"
            @click="handleFilter('ALL')"
          >
            <b>TẤT CẢ (3)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="success"
            class="mb-1"
            @click="handleFilter('QDK')"
          >
            <b>CHƯA ĐẾN ĐỊNH MỨC (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="danger"
            class="mb-1"
            @click="handleFilter('QDK')"
          >
            <b>ĐÃ VƯỢT DUNG SAI (1)</b>
          </b-button>
          <b-button
            squared
            variant="warning"
            class="mb-1"
            size="xs"
            @click="handleFilter('THDK')"
          >
            <b>VƯỢT ĐỊNH MỨC (2)</b>
          </b-button>
        </div>
      </template> -->
    </FormBasicNPLcustom>
  </div>
</template>

<script>
import FormBasicNPLcustom from "./component/FormBasicNPLcustom.vue";
export default {
  components: {
    FormBasicNPLcustom,
  },
  data() {
    return {
      fieldsTable: [
        {
          key: "LoaiXe",
          label: "Loại xe",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "KmTruoc",
          label: "Km B/dưỡng trước",
          tdClass: "text-right",
        },
        {
          key: "DungSai",
          label: "Dung sai",
          tdClass: "text-right",
        },
        {
          key: "KmHienTai",
          label: "Km Hiện tại",
          tdClass: "text-right",
        },
        {
          key: "KmConLai",
          label: "Km Còn lại",
          tdClass: "text-right",
        },
        {
          key: "KmDoDauCuoi",
          label: "Km Đổ dầu cuối",
          tdClass: "text-right",
        },
        {
          key: "KmDoDauCuoiConLai",
          label: "Km Đ/dầu cuối C/lại",
          tdClass: "text-right",
        },
        {
          key: "CKTT",
          label: "Chu kỳ tiếp theo",
          tdClass: "text-right",
        },
        {
          key: "ChenhLech",
          label: "Chênh lệch",
          tdClass: "text-right",
        },
        {
          key: "statusName",
          label: "Trạng thái",
          typeCol: "BADGECOLOR",
        },
      ],
      dataTable: [
        {
          LoaiXe: "Xe tải",
          BSX: "59P2-40841",
          KmTruoc: "1,923",
          DungSai: "3,000",
          KmHienTai: "2,522",
          KmConLai: "478",
          KmDoDauCuoi: "2,712",
          KmDoDauCuoiConLai: "237",
          CKTT: "3",
          ChenhLech: "12",
          statusName: "Chưa đến định mức",
          statusNameColor: "green",
        },
        {
          LoaiXe: "Xe tải",
          BSX: "59P2-40845",
          KmTruoc: "1,923",
          DungSai: "3,000",
          KmHienTai: "3,522",
          KmConLai: "478",
          KmDoDauCuoi: "2,712",
          KmDoDauCuoiConLai: "237",
          CKTT: "3",
          ChenhLech: "12",
          statusName: "Đã vượt dung sai",
          statusNameColor: "red",
        },
        {
          LoaiXe: "Xe tải",
          BSX: "59P2-40845",
          KmTruoc: "1,923",
          DungSai: "3,000",
          KmHienTai: "3,100",
          KmConLai: "478",
          KmDoDauCuoi: "2,712",
          KmDoDauCuoiConLai: "237",
          CKTT: "3",
          ChenhLech: "12",
          statusName: "Đã vượt định mức",
          statusNameColor: "orange",
        },
        {
          LoaiXe: "Xe tải",
          BSX: "59P2-40845",
          KmTruoc: "1,923",
          DungSai: "3,000",
          KmHienTai: "3,000",
          KmConLai: "478",
          KmDoDauCuoi: "2,712",
          KmDoDauCuoiConLai: "237",
          CKTT: "3",
          ChenhLech: "12",
          statusName: "Đag trong định mức",
          statusNameColor: "#f1c40f",
        },
      ],
      options: {},
    };
  },
};
</script>