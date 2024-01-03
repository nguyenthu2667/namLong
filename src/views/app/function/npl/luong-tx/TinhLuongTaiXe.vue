<template>
  <div id="app-content-full">
    <b-card>
      <FormBasicNPLCustom
        :title="'TÍNH LƯƠNG TÀI XẾ'"
        :fields="fieldsTable"
        :items="dataTable"
        :optionByKey="options"
        :fieldsForm="fieldsForm"
      >
        <template #tabTwo="slotProps">
          <div class="mt-2">
            <b-row>
              <b-col lg="8">
                <b-row>
                  <b-col lg="3">
                    <b-form-group label="Mã CT" class="has-float-label mb-4">
                      <b-form-input v-model="slotProps.dataForm.ID" disabled />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group label="Ngày CT" class="has-float-label mb-4">
                      <datepicker
                        v-model="slotProps.dataForm.createDate"
                        :format="'dd/MM/yyyy'"
                        :placeholder="'DD/MM/YYYY'"
                        :bootstrap-styling="true"
                        @input="convertDate('createDate')"
                        :disabled="slotProps.isDisable"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tháng chốt lương"
                      class="has-float-label mb-4"
                    >
                      <v-select
                        v-model="slotProps.dataForm.ThangNam"
                        :options="options.ThangNam"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Trạng thái"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        value="Chờ khóa"
                        disabled
                        class="text-center"
                        style="color: #b38808"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="4"></b-col>
            </b-row>
            <b-row>
              <b-col lg="8">
                <b-row>
                  <b-col lg="3">
                    <b-row>
                      <b-col
                        ><b-form-group
                          label="Số lượng TX"
                          class="has-float-label mb-4"
                        >
                          <b-form-input
                            v-model="slotProps.dataForm.SoLuong"
                            disabled
                            class="text-right"
                          /> </b-form-group
                      ></b-col>
                      <b-col>
                        <b-form-group
                          label="SL Chuyến"
                          class="has-float-label mb-4"
                        >
                          <b-form-input
                            v-model="slotProps.dataForm.SLC"
                            disabled
                            class="text-right"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng lương chuyến"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TLC"
                        disabled
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng phụ cấp"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TPC"
                        disabled
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng DC tăng"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TDCT"
                        disabled
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng vé lượt"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TVL"
                        disabled
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng phụ cấp khác"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TPS"
                        disabled
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng tạm ứng"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTU"
                        disabled
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng DC giảm"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TDCG"
                        disabled
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
                  <strong>CHI TIẾT LƯƠNG TÀI XẾ</strong>
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
                    @click="showModalLTX"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div>
                  <b-table
                    class="my-table"
                    responsive
                    bordered
                    head-variant="light"
                    show-empty
                    :fields="fLTX"
                    :items="aLTX"
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
    <b-modal id="modal-cd" title="THÊM" centered size="md" @ok="handleAddLTX">
      <div>
        <b-row>
          <b-col lg="12">
            <b-table
              class="my-table"
              responsive
              bordered
              head-variant="light"
              show-empty
              :fields="fTX"
              :items="aTX"
              select-mode="multi"
              selectable
              @row-selected="handleSelect"
            ></b-table>
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
      itemsSelect: [],
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
          label: "SL Tài xế",
          tdClass: "text-right",
        },
        {
          key: "SLC",
          label: "TL Chuyến",
          tdClass: "text-right",
        },
        {
          key: "TLC",
          label: "Tổng lương Chuyến",
          tdClass: "text-right",
        },
        {
          key: "TPC",
          label: "Tổng phụ cấp",
          tdClass: "text-right",
        },
        {
          key: "TDCT",
          label: "Tổng DC tăng",
          tdClass: "text-right",
        },
        {
          key: "TVL",
          label: "Tổng vé lượt",
          tdClass: "text-right",
        },
        {
          key: "TPS",
          label: "Tổng phát sinh",
          tdClass: "text-right",
        },
        {
          key: "TTU",
          label: "Tổng trạm ứng",
          tdClass: "text-right",
        },
        {
          key: "TDCG",
          label: "Tổng DC giảm",
          tdClass: "text-right",
        },
        {
          key: "TongLuong",
          label: "Tổng lương",
          tdClass: "text-right",
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
          SoLuong: "3",
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
          SLC: "5",
          TLC: "50,000,000",
          TPC: "30,000,000",
          TDCT: "10,000,000",
          TVL: "3,000,000",
          TPS: "5,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "83,000,000",
        },
        {
          SoLuong: "3",
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
          SLC: "5",
          TLC: "50,000,000",
          TPC: "30,000,000",
          TDCT: "10,000,000",
          TVL: "3,000,000",
          TPS: "5,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "83,000,000",
        },
        {
          SoLuong: "3",
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
          SLC: "5",
          TLC: "50,000,000",
          TPC: "30,000,000",
          TDCT: "10,000,000",
          TVL: "3,000,000",
          TPS: "5,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "83,000,000",
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
      fLTX: [
        {
          key: "ID",
          label: "LemonID",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "SLC",
          label: "Số lượng chuyến",
          tdClass: "text-right",
        },
        {
          key: "LuongChuyen",
          label: "Lương chuyến",
          tdClass: "text-right",
        },
        {
          key: "PC35C",
          label: "PC trên 35 chuyến",
          tdClass: "text-right",
        },
        {
          key: "PCC",
          label: "Phụ cấp cơm",
          tdClass: "text-right",
        },
        {
          key: "PCCau",
          label: "Phụ cấp cẩu",
          tdClass: "text-right",
        },
        {
          key: "PCPB",
          label: "PC Phủ bạt",
          tdClass: "text-right",
        },
        {
          key: "PCC",
          label: "Phụ cấp cẩu",
          tdClass: "text-right",
        },
        {
          key: "PCL",
          label: "PC Lơ",
          tdClass: "text-right",
        },
        {
          key: "PCCCQT",
          label: "PCCC Quá tải",
          tdClass: "text-right",
        },
        {
          key: "PCKVV",
          label: "PC Khoán/VV",
          tdClass: "text-right",
        },
        {
          key: "PCHL",
          label: "PC hàng lẻ",
          tdClass: "text-right",
        },
        {
          key: "PCK",
          label: "PC khác",
          tdClass: "text-right",
        },
        {
          key: "TDCT",
          label: "TDC tăng",
          tdClass: "text-right",
        },
        {
          key: "TVL",
          label: "Tổng vé lượt",
          tdClass: "text-right",
        },
        // {
        //   key: "TPS",
        //   label: "Tổng PS",
        //   tdClass: "text-right",
        // },
        {
          key: "TTU",
          label: "Tổng tạm ứng",
          tdClass: "text-right",
        },
        {
          key: "TDCG",
          label: "TDC giảm",
          tdClass: "text-right",
        },
        {
          key: "TongLuong",
          label: "Tổng lương",
          tdClass: "text-right",
        },
      ],
      aLTX: [
        {
          BSX: "59P1-12345",
          TaiXe: "Nguyễn Văn A",
          ID: "001",
          SLC: "20",
          LuongChuyen: "20,000,000",
          PPC: "3,000,000",
          PCPB: "0",
          PCC: "0",
          PCL: "500,000",
          PCCCQT: "1,500,000",
          PCKVV: "300,000",
          PCK: "0",
          PCHL: "0",
          TDCT: "500,000",
          TVL: "300,000",
          TPS: "1,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "14,100,000",
          PC35C: "500,000",
          PCCau: "200,000",
        },
        {
          BSX: "59P1-88540",
          TaiXe: "Nguyễn Văn F",
          ID: "002",
          SLC: "20",
          LuongChuyen: "20,000,000",
          PPC: "3,000,000",
          PCPB: "0",
          PCC: "0",
          PCL: "500,000",
          PCCCQT: "1,500,000",
          PCKVV: "300,000",
          PCK: "0",
          PCHL: "0",
          TDCT: "500,000",
          TVL: "300,000",
          TPS: "1,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "14,100,000",
          PC35C: "500,000",
          PCCau: "200,000",
        },
        {
          BSX: "59P1-35411",
          TaiXe: "Nguyễn Văn X",
          ID: "003",
          SLC: "20",
          LuongChuyen: "20,000,000",
          PPC: "3,000,000",
          PCPB: "0",
          PCC: "0",
          PCL: "500,000",
          PCCCQT: "1,500,000",
          PCKVV: "300,000",
          PCK: "0",
          PCHL: "0",
          TDCT: "500,000",
          TVL: "300,000",
          TPS: "1,000,000",
          TTU: "10,000,000",
          TDCG: "3,000,000",
          TongLuong: "14,100,000",
          PC35C: "500,000",
          PCCau: "200,000",
        },
      ],
      fTX: [
        {
          key: "ID",
          label: "Mã",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "DienThoai",
          label: "Điện thoại",
        },
        {
          key: "Email",
          label: "Email",
        },
      ],
      aTX: [
        {
          ID: "004",
          TaiXe: "Nguyễn Văn A",
          DienThoai: "0961421396",
          Email: "vana@gmail.com",
        },
        {
          ID: "005",
          TaiXe: "Nguyễn Văn B",
          DienThoai: "0961421396",
          Email: "vana@gmail.com",
        },
        {
          ID: "006",
          TaiXe: "Nguyễn Văn C",
          DienThoai: "0961421396",
          Email: "vana@gmail.com",
        },
        {
          ID: "007",
          TaiXe: "Nguyễn Văn D",
          DienThoai: "0961421396",
          Email: "vana@gmail.com",
        },
        {
          ID: "008",
          TaiXe: "Nguyễn Văn E",
          DienThoai: "0961421396",
          Email: "vana@gmail.com",
        },
      ],
    };
  },
  methods: {
    handleSelect(values) {
      this.itemsSelect = values?.length > 0 ? values : [];
    },
    handleAddLTX() {
      this.aLTX = [
        ...this.aLTX,
        ...this.itemsSelect.map((e) => {
          return { ...this.aLTX[0], ...e };
        }),
      ];
      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Xư lí thành công !");
        this.formCustom = {};
      }, 500);
    },
    showModalLTX() {
      this.$bvModal.show("modal-cd");
    },
    convertDate(key) {
      this.$refs.refFormBasicNPLCustom.convertDate(key);
    },
  },
};
</script>

<style >
.my-table .table th {
  white-space: nowrap;
}
</style>