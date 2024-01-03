<template>
  <div>
    <FormBasicNPLcustom
      :title="'THEO DÕI'"
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
      :sTab1="false"
      :componentKey="'TheoDoiGiayTo'"
      :sFooter="false"
      :disDbclick="true"
    >
      <template #tabOneHeader="slotProps">
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
            variant="danger"
            class="mb-1"
            @click="handleFilter('QDK')"
          >
            <b>QUÁ ĐĂNG KIỂM (1)</b>
          </b-button>
          <b-button
            squared
            variant="warning"
            class="mb-1"
            size="xs"
            @click="handleFilter('THDK')"
          >
            <b>Đ.HẠN ĐĂNG KIỂM (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="danger"
            class="mb-1"
            @click="handleFilter('QPDB')"
          >
            <b>QUÁ PHÍ ĐƯỜNG BỘ (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="warning"
            class="mb-1"
            @click="handleFilter('THDB')"
          >
            <b>Đ.HẠN PHÍ ĐƯỜNG BỘ (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="danger"
            class="mb-1"
            @click="handleFilter('QPBH')"
          >
            <b>QUÁ BẢO HIỂM (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="warning"
            class="mb-1"
            @click="handleFilter('THDB')"
          >
            <b>Đ.HẠN BẢO HIỂM (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="danger"
            class="mb-1"
            @click="handleFilter('QPDB')"
          >
            <b>QUÁ PHÙ HIỆU (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="warning"
            class="mb-1"
            @click="handleFilter('THDB')"
          >
            <b>Đ.HẠN PHÙ HIỆU (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="danger"
            class="mb-1"
            @click="handleFilter('QPDB')"
          >
            <b>QUÁ GPS (1)</b>
          </b-button>
          <b-button
            size="xs"
            squared
            variant="warning"
            class="mb-1"
            @click="handleFilter('THDB')"
          >
            <b>Đ.HẠN GPS (1)</b>
          </b-button>
        </div>
      </template>
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
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "LoaiXe",
          label: "Loại",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "SDT",
          label: "Điện thoại",
        },
        {
          key: "DangKiem",
          label: "Đăng kiểm",
          typeCol: "BADGECOLOR",
        },
        {
          key: "PhiDuongBo",
          label: "Phí đường bộ",
          typeCol: "BADGECOLOR",
        },
        {
          key: "BaoHiem",
          label: "Bảo hiểm",
          typeCol: "BADGECOLOR",
        },
        {
          key: "PHVT",
          label: "Phù hiệu vận tải",
          typeCol: "BADGECOLOR",
        },
        {
          key: "GPS",
          label: "GPS",
          typeCol: "BADGECOLOR",
        },
      ],
      dataTable: [
        {
          BSX: "59P2-40841",
          DangKiem: "31/12/2023 (30Ngày)",
          DangKiemColor: "green",
          PhiDuongBo: "31/12/2023 (10Ngày)",
          PhiDuongBoColor: "red",
          BaoHiem: "31/12/2023 (10Ngày)",
          BaoHiemColor: "red",
          PHVT: "31/12/2023 (10Ngày)",
          PHVTColor: "orange",
          GPS: "01/01/2023 (10Ngày)",
          GPSColor: "red",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          LoaiXe: "Mooc xương",
        },
        {
          BSX: "59P2-40841",
          DangKiem: "31/12/2023 (25Ngày)",
          DangKiemColor: "orange",
          PhiDuongBo: "31/12/2023 (10Ngày)",
          PhiDuongBoColor: "green",
          BaoHiem: "31/12/2023 (10Ngày)",
          BaoHiemColor: "green",
          PHVT: "31/12/2023 (10Ngày)",
          PHVTColor: "red",
          GPS: "01/01/2023 (10Ngày)",
          GPSColor: "orange",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          LoaiXe: "Mooc sàn",
        },
        {
          BSX: "59P2-40841",
          DangKiem: "31/12/2023 (30Ngày)",
          DangKiemColor: "red",
          PhiDuongBo: "31/12/2023 (10Ngày)",
          PhiDuongBoColor: "orange",
          BaoHiem: "31/12/2023 (10Ngày)",
          BaoHiemColor: "orange",
          PHVT: "31/12/2023 (10Ngày)",
          PHVTColor: "green",
          GPS: "01/01/2023 (10Ngày)",
          GPSColor: "green",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          LoaiXe: "Mooc xương",
        },
      ],
      options: {},
    };
  },
  methods: {
    handleFilter(key) {},
  },
};
</script>