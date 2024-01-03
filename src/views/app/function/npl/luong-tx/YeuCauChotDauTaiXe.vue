<template>
  <div id="app-content-full">
    <b-card>
      <FormBasicNPLCustom
        :title="'YÊU CẦU CHỐT DẦU'"
        :fields="fieldsTable"
        :items="dataTable"
        :optionByKey="options"
        :fieldsForm="fieldsForm"
      >
        <template #tabTwo="slotProps">
          <div class="mt-2">
            <b-row>
              <b-col lg="4">
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Mã CT" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.ID"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Ngày CT" class="has-float-label mb-4">
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
                  <b-col lg="6">
                    <b-form-group label="Tháng" class="has-float-label mb-4">
                      <v-select
                        v-model="slotProps.dataForm.ThangNam"
                        :options="options.ThangNam"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Số lượng" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.SoLuong"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Ghi chú" class="has-float-label mb-4">
                  <b-form-textarea
                    rows="2"
                    max-rows="6"
                    v-model="slotProps.dataForm.GhiChu"
                    :disabled="slotProps.isDisable"
                    style="height: 96px"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div>
                  <strong>CHI TIẾT XE CHỐT DẦU</strong>
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
                    @click="showModalCD"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div>
                  <b-table
                    responsive
                    bordered
                    head-variant="light"
                    show-empty
                    :fields="fCD"
                    :items="aCD"
                  >
                    <template #cell(KmHienTai)="row">
                      <div class="text-center">
                        <span v-if="row.item.KmHienTai">{{
                          row.item.KmHienTai
                        }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(KmDaChon)="row">
                      <div class="text-center">
                        <span v-if="row.item.KmDaChon">{{
                          row.item.KmDaChon
                        }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(SLQD)="row">
                      <div class="text-center">
                        <span v-if="row.item.SLQD">{{ row.item.SLQD }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(SLPCQT)="row">
                      <div class="text-center">
                        <span v-if="row.item.SLPCQT">{{
                          row.item.SLPCQT
                        }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(SLPCT)="row">
                      <div class="text-center">
                        <span v-if="row.item.SLPCT">{{ row.item.SLPCT }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(SLTH)="row">
                      <div class="text-center">
                        <span v-if="row.item.SLTH">{{ row.item.SLTH }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(SLDD)="row">
                      <div class="text-center">
                        <span v-if="row.item.SLDD">{{ row.item.SLDD }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                    <template #cell(TonDau)="row">
                      <div class="text-center">
                        <span v-if="row.item.TonDau">{{
                          row.item.TonDau
                        }}</span>
                        <span v-else>
                          <i class="fas fa-minus text-muted"></i>
                        </span>
                      </div>
                    </template>
                  </b-table>
                </div>
              </b-col>
            </b-row>
          </div>
        </template>
      </FormBasicNPLCustom>
    </b-card>
    <b-modal id="modal-cd" title="THÊM" centered size="md" @ok="handleAddCD">
      <div>
        <b-row>
          <b-col lg="12">
            <b-form-group label="Số xe" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.BSX" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Km lần trước" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.KmTruoc" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Tài xế" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.TaiXe" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Điện thoại" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.SDT" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Địa chỉ" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.DiaChi" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";
export default {
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
  },
  data() {
    return {
      formCustom: {},
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
          key: "ThangNam",
          label: "Tháng",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
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
          SoLuong: "2",
          SLVD: "2",
          MaDH: "DH001",
          ID: "CD/001",
          DiaChi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
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
          MaCT: "CD/001",
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
          NghiepVu: "Đ/c Tăng",
          ThangNam: "12/2022",
          LiDo: "Thưởng hiệu suất chuyến",
        },
        {
          SoLuong: "10",
          SLVD: "2",
          MaDH: "DH002",
          ID: "CD/002",
          DiaChi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
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
          MaCT: "CD/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
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
          NghiepVu: "Đ/c Giảm",
          ThangNam: "12/2022",
          LiDo: "Nghỉ phép 1 ngày",
        },
        {
          SoLuong: "5",
          SLVD: "2",
          MaDH: "DH003",
          ID: "CD/003",
          DiaChi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
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
          MaCT: "CD/003",
          MaVD: "VD/22/003",
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
          NguoiGiao: "Nguyễn văn C",
          NguoiNhan: "Trần trung hiếu",
          NghiepVu: "Đ/c Tăng",
          ThangNam: "12/2022",
          LiDo: "Nghỉ phép quá 2 ngày",
        },
      ],
      options: {
        ThangNam: [
          "12/2022",
          "11/2022",
          "10/2022",
          "09/2022",
          "08/2022",
          "07/2022",
        ],
      },
      //detail
      fCD: [
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "KmTruoc",
          label: "Km lần trước",
        },
        {
          key: "KmHienTai",
          label: "Km hiện tại",
        },
        {
          key: "KmDaChon",
          label: "Km đã chọn",
        },
        {
          key: "SLQD",
          label: "Số lít quy định",
        },
        {
          key: "SLPCQT",
          label: "SLPC quá tải",
        },
        {
          key: "SLPCT",
          label: "SLPC tuyến",
        },
        {
          key: "SLTH",
          label: "Số lít tiêu hao",
        },
        {
          key: "SLDD",
          label: "Số lít đã đổ",
        },
        {
          key: "TonDau",
          label: "Tồn dầu",
        },
      ],
      aCD: [
        {
          BSX: "59P1-12345",
          TaiXe: "Nguyễn Văn A",
          KmTruoc: "5872",
          KmHienTai: null,
          KmDaChon: null,
          SLQD: null,
          SLPCQT: null,
          SLPCQT: null,
          SLPCT: null,
          SLTH: null,
          SLDD: null,
          TonDau: "15 lít",
        },
        {
          BSX: "59P1-88540",
          TaiXe: "Nguyễn Văn F",
          KmTruoc: "5872",
          KmHienTai: null,
          KmDaChon: null,
          SLQD: null,
          SLPCQT: null,
          SLPCQT: null,
          SLPCT: null,
          SLTH: null,
          SLDD: null,
          TonDau: "5 lít",
        },
        {
          BSX: "59P1-35411",
          TaiXe: "Nguyễn Văn X",
          KmTruoc: "5872",
          KmHienTai: null,
          KmDaChon: null,
          SLQD: null,
          SLPCQT: null,
          SLPCQT: null,
          SLPCT: null,
          SLTH: null,
          SLDD: null,
          TonDau: "7 lít",
        },
      ],
    };
  },
  methods: {
    handleAddCD() {
      let obj = {
        ...this.aCD[0],
        ...this.formCustom,
        ID: "CD/004",
      };
      this.aCD.push(obj);
      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Xư lí thành công !");
        this.formCustom = {};
      }, 500);
    },
    showModalCD() {
      this.$bvModal.show("modal-cd");
    },
    convertDate(key) {
      this.$refs.refFormBasicNPLCustom.convertDate(key);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>