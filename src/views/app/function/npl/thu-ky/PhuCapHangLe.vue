<template>
  <div class="npl-ve-thang">
    <FormBasicNPLCustom
      :title="'Đăng ký vé tháng'"
      :fields="fieldsTable"
      :items="dataTable"
      :fieldsForm="fieldsForm"
      ref="refFormBasicNPLCustom"
      :sAdd="false"
    >
      <template #tabTwo="slotProps">
        <div class="form-ve-thang">
          <b-row>
            <b-col lg="4">
              <div class="mb-3">
                <strong>
                  <i class="fas fa-file-invoice-dollar"></i>
                  THÔNG TIN TỔNG HỢP</strong
                >
              </div>
              <div>
                <b-row>
                  <b-col lg="4">
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
                  <b-col lg="8">
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
                  <b-col lg="6">
                    <b-form-group
                      label="Số lượng vận đơn"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.SoLuongVD"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group
                      label="Tổng tiền"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TongTien"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        rows="2"
                        max-rows="6"
                        v-model="slotProps.dataForm.GhiChu"
                        :disabled="slotProps.isDisable"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="8">
              <div class="mb-1 d-flex justify-content-between">
                <div>
                  <strong> THÔNG TIN VẬN ĐƠN ĐIỀU CHỈNH</strong>
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
                    @click="showModalXe"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div class="text-right pt-1">
                  <strong
                    ><span class="text-muted">Tổng cộng : </span>600,000
                  </strong>
                </div>
              </div>
              <div>
                <b-table
                  :fields="fieldsVDDC"
                  :items="tableETC"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(SoTien)="row">
                    <div>
                      <b-form-input
                        v-model="row.item.SoTien"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
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
      id="modal-pchl"
      centered
      size="md"
      @ok="handleAddPCHL"
      title="THÊM"
    >
      <div>
        <b-col lg="12">
          <b-form-group>
            <b-form-datepicker
              v-model="formCustom.createDate"
              locale="vi"
              placeholder="DD/MM/YYYY"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Nhập số xe" class="has-float-label mb-4">
            <b-form-input v-model.number="formCustom.BSX"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Tài Xế" class="has-float-label mb-4">
            <b-form-input v-model="formCustom.TaiXe"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Tuyến đường" class="has-float-label mb-4">
            <b-form-input v-model="formCustom.TuyenDuong"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Khách hàng" class="has-float-label mb-4">
            <b-form-input v-model="formCustom.KhachHang"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Số tiền" class="has-float-label mt-2 mb-4">
            <b-form-input v-model.number="formCustom.SoTien"></b-form-input>
          </b-form-group>
        </b-col>
      </div>
    </b-modal>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";
export default {
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
  },
  data() {
    return {
      selectedItems: [],
      formCustom: {},
      fieldsTable: [
        {
          key: "ID",
          label: "Mã chứng từ",
        },
        {
          key: "createDate",
          label: "Ngày CT",
        },
        {
          key: "MaVD",
          label: "Vận đơn",
        },
        {
          key: "TongTienPC",
          label: "Tổng số tiền phụ cấp",
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
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "20 xe",
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
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
        },
        {
          ID: "CT/22/002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "15 xe",
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
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
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
          SoLuongXe: "12 xe",
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
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
        },
      ],
      fieldsVDDC: [
        {
          key: "ID",
          label: "Mã vận đơn",
        },
        {
          key: "createDate",
          label: "Ngày vận đơn",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "TaiXe",
          label: "Tài Xế",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "SoTien",
          label: "Số tiền",
        },
      ],
      tableListXe: [],
      tableETC: [
        {
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "20 xe",
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
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Chờ khóa",
          statusColor: "orange",
        },
        {
          ID: "CT/22/002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "15 xe",
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
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Đã khóa",
          statusColor: "red",
        },
      ],
    };
  },
  methods: {
    handleSelect(items) {
      this.selectedItems = items;
    },
    remove(row) {
      this.tableETC = this.tableETC.filter((r) => r.ID != row.ID);
    },
    handleAddPCHL() {
      if (this.formCustom) {
        this.formCustom.ID = "CT/22/003";
        console.log(1, "this.formCustom", this.formCustom);
        this.tableETC.push(this.formCustom);
        setTimeout(() => {
          this.formCustom = {};
        }, 500);
      }
    },
    showModalXe() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-pchl");
      }, 500);
    },
    convertDate(key) {
      this.$refs.refFormBasicNPLCustom.convertDate(key);
    },
  },
};
</script>
<style>
.npl-phi-nang-ha .table th {
  white-space: nowrap;
}
</style>