<template>
  <div class="npl-ban-giao-chung-tu">
    <FormBasicNPLCustom
      :title="'Bàn giao chứng từ'"
      :fields="fieldsTable"
      :items="dataTable"
      :fieldsForm="fieldsForm"
      ref="refFormBasicNPLCustom"
      :sAdd="false"
      :sDelete="false"
      :componentKey="'BanGiaoChungTu'"
    >
      <template #tabTwo="slotProps">
        <div class="form-cnct">
          <div class="mt-2">
            <b-row>
              <b-col lg="8">
                <div class="mb-3">
                  <strong>
                    <i class="fas fa-file-invoice-dollar"></i>
                    THÔNG TIN CHỨNG TỪ</strong
                  >
                </div>
                <div>
                  <b-row>
                    <b-col lg="3">
                      <b-form-group
                        label="Mã chứng từ"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          value="AUTO"
                          disabled
                          class="text-center"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="3">
                      <b-form-group
                        label="Ngày chứng từ"
                        class="has-float-label mb-4"
                      >
                        <datepicker
                          v-model="slotProps.dataForm.createDate"
                          :format="'dd/MM/yyyy'"
                          :placeholder="'DD/MM/YYYY'"
                          :disabled="slotProps.isDisable"
                          :bootstrap-styling="true"
                          @input="convertDate('createDate')"
                        ></datepicker>
                      </b-form-group>
                    </b-col>
                    <b-col lg="6"></b-col>
                    <b-col lg="3">
                      <b-form-group
                        label="Đơn hàng"
                        class="has-float-label mb-4"
                      >
                        <v-select
                          v-model="slotProps.dataForm.MaDH"
                          :options="['DH001', 'DH002', 'DH003']"
                          :disabled="slotProps.isDisable"
                        ></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col lg="5">
                      <b-form-group
                        label="Khách hàng"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          v-model="slotProps.dataForm.KhachHang"
                          :disabled="slotProps.isDisable"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col lg="4"></b-col>

                    <b-col lg="3">
                      <b-form-group
                        label="Người giao"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          v-model="slotProps.dataForm.NguoiGiao"
                          :disabled="slotProps.isDisable"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="3">
                      <b-form-group
                        label="Người nhận"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          v-model="slotProps.dataForm.NguoiNhan"
                          :disabled="slotProps.isDisable"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="2">
                      <b-form-group label="SLVD" class="has-float-label mb-4">
                        <b-form-input
                          v-model="slotProps.dataForm.SLVD"
                          :disabled="slotProps.isDisable"
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col lg="12">
              <div class="mb-1 d-flex justify-content-between">
                <div>
                  <strong> CHI TIẾT BÀN GIAO</strong>
                  <b-button
                    class="ml-1 mb-1"
                    squared
                    :variant="`outline-primary`"
                    size="sm"
                    style="
                      height: 24px;
                      padding: 1px;
                      padding-left: 3px;
                      padding-right: 3px;
                    "
                    @click="showModalCNCT"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div class="text-right pt-1">
                  <!-- <strong
                    ><span class="text-muted">Tổng cộng : </span>1,050,000
                  </strong> -->
                </div>
              </div>
              <div>
                <b-table
                  :fields="fieldsBGCT"
                  :items="tableBGCT"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)="row">
                    <div class="text-center">
                      <i
                        class="fas fa-trash-alt text-danger mr-2"
                        @click="removeBGCT(row.item)"
                      ></i>
                      <!-- <i class="fas fa-edit text-warning"></i> -->
                    </div>
                  </template>
                  <template #empty>
                    <div class="text-left font-italic text-muted">
                      {{ $t("data.non-data") }}
                    </div>
                  </template>
                  <template #emptyfiltered>
                    <div class="text-left font-italic text-muted">
                      {{ $t("data.non-result") }}
                    </div>
                  </template>
                </b-table>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLCustom>
    <b-modal
      id="modal-cnct"
      centered
      size="xl"
      @ok="handleAddBGCT"
      title="THÊM"
    >
      <div>
        <b-table
          class="table-ban-giao-chung-tu"
          :fields="fieldsCNCT"
          :items="tableCNCT"
          bordered
          responsive
          show-empty
          head-variant="light"
          selectable
          :select-mode="'single'"
          @row-selected="handleSelected"
        >
          <template v-slot:cell(statusName)="row">
            <div>
              <Status
                :color="row.item.statusColor"
                :label="row.item.statusName"
                :showCircle="false"
              ></Status>
            </div>
          </template>
          <template #empty>
            <div
              class="text-center font-italic text-muted"
              style="font-weight: 600"
            >
              {{ $t("data.non-data") }}
            </div>
          </template>
          <template #emptyfiltered>
            <div
              class="text-center font-italic text-muted"
              style="font-weight: 600"
            >
              {{ $t("data.non-result") }}
            </div>
          </template>
        </b-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Status from "@/components/Badges/StatusColor.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";

export default {
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
    Status,
  },
  data() {
    return {
      itemsSelected: [],
      fieldsTable: [
        {
          key: "ID",
          label: "Mã CT",
        },
        {
          key: "createDate",
          label: "Ngày CT",
        },
        {
          key: "MaDH",
          label: "Đơn hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "SLVD",
          label: "SLVD",
          tdClass: "text-right",
        },
        {
          key: "NguoiGiao",
          label: "Người giao",
        },
        {
          key: "NguoiNhan",
          label: "Người nhận",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "statusName",
          label: "Trạng thái",
        },
      ],
      fieldsForm: [],
      dataTable: [
        {
          SLVD: "2",
          MaDH: "DH001",
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "2 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
          NguoiGiao: "Nguyễn văn giao",
          NguoiNhan: "Lê văn nhận",
        },
        {
          SLVD: "2",
          MaDH: "DH002",
          ID: "CT/22/002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: false,
          SLVT: "5Cuộn (30tấn)",
          NguoiGiao: "Nguyễn văn A",
          NguoiNhan: "Lê văn luyện",
        },
        {
          SLVD: "2",
          MaDH: "DH003",
          ID: "CT/22/003",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty C",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          BSX: "59P1-12345",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-SG (Cát Lái - Sài Gòn)",
          SoPhieuChi: "SP12347",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "400,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/003",
          MaVD: "VD/22/003",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
          NguoiGiao: "Nguyễn văn C",
          NguoiNhan: "Trần trung hiếu",
        },
      ],
      fieldsBGCT: [
        {
          key: "MaVD",
          label: "Mã VD",
        },
        {
          key: "createDate",
          label: "Ngày",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "DonHang",
          label: "Đơn hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "NgayDH",
          label: "Ngày",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "LoaiHang",
          label: "Loại hàng",
        },
        {
          key: "MatHang",
          label: "Mặt hàng",
        },
        {
          key: "DVT",
          label: "Đơn vị tính",
        },
        {
          key: "GiaVanChuyen",
          label: "Giá vận chuyển",
          tdClass: "text-right",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "TrongLuong",
          label: "Trọng lượng",
          tdClass: "text-right",
        },
        {
          key: "SoCont",
          label: "Số cont",
          tdClass: "text-right",
        },
        {
          key: "SoSeal",
          label: "Số seal",
          tdClass: "text-right",
        },
      ],
      tableBGCT: [
        {
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "2 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
          DonHang: "001",
          NgayDH: "10/12/2022",
          LoaiHang: "Cont rời",
          MatHang: "Thép",
          DVT: "Tấn",
          SoLuong: "10",
          TrongLuong: "2 tấn",
          SoCont: "AV124441",
          SoSeal: "S2937743",
        },
      ],
      fieldsCNCT: [
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "MaVD",
          label: "Mã VD",
        },
        {
          key: "createDate",
          label: "Ngày",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "SLVT",
          label: "SLVT",
        },
        {
          key: "GiaVanChuyen",
          label: "Giá vận chuyển",
          tdClass: "text-right",
        },
        {
          key: "PhiCauDuong",
          label: "Phí cầu đường",
          tdClass: "text-right",
        },
        {
          key: "PhiNangHa",
          label: "Phí nâng hạ",
          tdClass: "text-right",
        },
        {
          key: "PhiPhatSinh",
          label: "Phí (PS)",
          tdClass: "text-right",
        },
        {
          key: "DTPS",
          label: "DTPS",
          tdClass: "text-right",
        },
        {
          key: "PhiKhoan",
          label: "Phí khoán",
          tdClass: "text-right",
        },
        {
          key: "PhiKhac",
          label: "Phí khác",
          tdClass: "text-right",
        },
        {
          key: "LuongTaiXe",
          label: "Lương tài xế",
          tdClass: "text-right",
        },
        {
          key: "PhuCap",
          label: "Phụ cấp",
          tdClass: "text-right",
        },
        {
          key: "ChungTuGoc",
          label: "CTG",
          tdClass: "text-center",
        },
      ],
      tableCNCT: [
        {
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "2 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
        },
        {
          ID: "CT/22/002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: false,
          SLVT: "5Cuộn (30tấn)",
        },
        {
          ID: "CT/22/003",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty C",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          BSX: "59P1-12345",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-SG (Cát Lái - Sài Gòn)",
          SoPhieuChi: "SP12347",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "400,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/003",
          MaVD: "VD/22/003",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
        },
      ],
    };
  },
  methods: {
    handleAddBGCT() {
      if (this.itemsSelected?.length > 0) {
        this.tableBGCT = [...this.tableBGCT, ...this.itemsSelected];
      }
    },
    handleSelected(values) {
      this.itemsSelected = values;
    },
    showModalCNCT() {
      setTimeout(() => {
        this.$bvModal.show("modal-cnct");
      }, 500);
    },
    removeBGCT(row) {
      this.tableBGCT = this.tableBGCT.filter((r) => r.ID != row.ID);
    },
  },
};
</script>

<style>
.table-ban-giao-chung-tu .table th {
  white-space: nowrap;
}
</style>