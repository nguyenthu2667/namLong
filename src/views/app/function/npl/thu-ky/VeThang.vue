<template>
  <div class="npl-ve-thang">
    <FormBasicNPLCustom
      :title="'Đăng ký vé tháng'"
      :fields="fieldsTable"
      :items="dataTable"
      :fieldsForm="fieldsForm"
      ref="refFormBasicNPLCustom"
      :sAdd="false"
      :componentKey="'VeThang'"
    >
      <template #tabTwo="slotProps">
        <div class="form-ve-thang">
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
                  <b-col lg="5"></b-col>
                  <b-col lg="9">
                    <b-form-group
                      label="Trạm thu phí"
                      class="has-float-label mb-4"
                    >
                      <v-select
                        v-model="slotProps.dataForm.TramThuPhi"
                        :options="[
                          'Trạm thu phí An Sương,Bình Tân',
                          'Trạm thu phí An Lạc,Phú Nhuận',
                          'Trạm Quốc Lộ 1A, Tân Kỳ Tân quý',
                        ]"
                        :disabled="slotProps.isDisable"
                      ></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Phí tháng"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.PhiThang"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group label="Từ ngày" class="has-float-label mb-4">
                      <datepicker
                        v-model="slotProps.dataForm.TuNgay"
                        :format="'dd/MM/yyyy'"
                        :placeholder="'DD/MM/YYYY'"
                        :disabled="slotProps.isDisable"
                        :bootstrap-styling="true"
                        @input="convertDate('TuNgay')"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group label="Đến ngày" class="has-float-label mb-4">
                      <datepicker
                        v-model="slotProps.dataForm.DenNgay"
                        :format="'dd/MM/yyyy'"
                        :placeholder="'DD/MM/YYYY'"
                        :disabled="slotProps.isDisable"
                        :bootstrap-styling="true"
                        @input="convertDate('DenNgay')"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Số lượng xe"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.SoLuongXe"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Tổng tiền"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TongTien"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        rows="2"
                        max-rows="6"
                        v-model="slotProps.dataForm.GhiChu"
                        :disabled="slotProps.isDisable"
                        style="height: 84px"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4">
              <div class="mb-1">
                <strong>
                  <i class="fas fa-file-alt"></i>
                  CHI TIẾT XE</strong
                >
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
                  <i class="fas fa-plus"></i> <b>Chọn xe</b>
                </b-button>
              </div>
              <div>
                <b-table
                  :fields="fieldsXe"
                  :items="tableXe"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)="row">
                    <div class="text-center">
                      <i
                        class="fas fa-trash-alt text-danger"
                        @click="remove(row.item)"
                      ></i>
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
    <b-modal id="modal-xe" centered size="md" @ok="handleAddXe" title="THÊM">
      <div>
        <b-table
          :fields="[{ label: 'Xin mời chọn xe', key: 'ID' }]"
          :items="tableListXe"
          bordered
          responsive
          show-empty
          head-variant="light"
          select-mode="multi"
          selectable
          @row-selected="handleSelect"
        >
        </b-table>
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
      formHoaDon: {},
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
          key: "TramThuPhi",
          label: "Trạm thu phí",
        },
        {
          key: "SoHoaDon",
          label: "Số hóa đơn",
        },
        {
          key: "PhiThang",
          label: "Phí tháng",
        },
        {
          key: "TuNgay",
          label: "Từ ngày",
        },
        {
          key: "DenNgay",
          label: "Đến ngày",
        },
        {
          key: "SoLuongXe",
          label: "Số lượng xe",
        },
        {
          key: "TongTien",
          label: "Tổng tiền",
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
      fieldsForm: [
        {
          key: "ID",
          label: "Mã chứng từ",
        },
        {
          key: "createDate",
          label: "Ngày CT",
        },
        {
          key: "TramThuPhi",
          label: "Trạm thu phí",
        },
        {
          key: "PhiThang",
          label: "Phí tháng",
        },
        {
          key: "TuNgay",
          label: "Từ ngày",
        },
        {
          key: "DenNgay",
          label: "Đến ngày",
        },
        {
          key: "SoLuongXe",
          label: "Số lượng xe",
        },
        {
          key: "TongTien",
          label: "Tổng tiền",
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
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "14,000,000",
          MaCT: "CT/22/001",
          NgayCT: "11/12/2022",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          SoHoaDon: "HD1921003",
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
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "7,500,000",
          MaCT: "CT/22/001",
          NgayCT: "11/12/2022",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SoHoaDon: "HD1921003",
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
          SoPhieuChi: "SP12347",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "8,400,000",
          MaCT: "CT/22/001",
          NgayCT: "11/12/2022",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SoHoaDon: "HD1921003",
        },
      ],
      fieldsXe: [
        {
          key: "ID",
          label: "Các xe đã chọn",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      tableListXe: [
        {
          ID: "59P1-69237",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "62P1-10456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "59P1-69137",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "62P1-11222",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "63P1-69237",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "57P1-10456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "15P1-69137",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "12P1-11456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
      ],
      tableXe: [
        {
          ID: "59P1-69237",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "62P1-10456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "59P1-69137",
          SoTien: "500,000",
          TaiXe: "Nguyễn Văn A",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "62P1-63456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
        {
          ID: "61P1-64456",
          SoTien: "200,000",
          TaiXe: "Nguyễn Văn B",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
        },
      ],
    };
  },
  methods: {
    handleSelect(items) {
      this.selectedItems = items;
    },
    remove(row) {
      this.tableXe = this.tableXe.filter((r) => r.ID != row.ID);
    },
    handleAddXe() {
      if (this.selectedItems.length > 0) {
        this.tableXe = [...this.tableXe, ...this.selectedItems];
        setTimeout(() => {
          this.selectedItems = [];
        }, 500);
      }
    },
    showModalXe() {
      this.formHoaDon = {};
      setTimeout(() => {
        this.$bvModal.show("modal-xe");
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