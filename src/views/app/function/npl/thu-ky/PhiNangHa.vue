<template>
  <div class="npl-phi-nang-ha">
    <FormBasicNPLCustom
      :title="'Cập nhật phí nâng/hạ/DO'"
      :fields="fieldsTable"
      :items="dataTable"
      :fieldsForm="fieldsForm"
      ref="refFormBasicNPLCustom"
      :sAdd="false"
      :componentKey="'PhiNangHa'"
    >
      <template #tabTwo="slotProps">
        <div class="form-phi-nang-ha">
          <b-row>
            <b-col lg="6">
              <div class="mb-3">
                <strong>
                  <i class="fas fa-file-invoice-dollar"></i>
                  THÔNG TIN PHIẾU CHI</strong
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
                  <b-col lg="4">
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
                  <b-col lg="7">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        rows="2"
                        max-rows="6"
                        v-model="slotProps.dataForm.GhiChu"
                        :disabled="slotProps.isDisable"
                        style="height: 95px"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <b-col lg="5">
                    <b-row>
                      <b-col lg="12">
                        <b-form-group
                          label="Hình thức chi"
                          class="has-float-label mb-4"
                        >
                          <v-select
                            v-model="slotProps.dataForm.HinhThucChi"
                            :options="['Chuyển khoản', 'Tiền mặt']"
                            :disabled="slotProps.isDisable"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <b-form-group
                          label="Số tiền chi"
                          class="has-float-label mb-4"
                        >
                          <b-form-input
                            v-model="slotProps.dataForm.SoTienDaChi"
                            :disabled="slotProps.isDisable"
                            class="text-right"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
              <div class="mb-1 d-flex justify-content-between">
                <div>
                  <strong>CHI PHÍ HÓA ĐƠN</strong>
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
                    @click="showModalHoaDon"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
              </div>
              <div class="total text-right">
                <strong class="mr-2"
                  ><span class="text-muted">Nâng cont quá hạn : </span>0
                </strong>
                <strong class="mr-2"
                  ><span class="text-muted">Phí đậu bãi : </span>0
                </strong>
                <strong class="mr-2"
                  ><span class="text-muted">Phí cược cont : </span>0
                </strong>
                <strong class="mr-2"
                  ><span class="text-muted">Tổng vệ sinh : </span>200,000
                </strong>
                <strong class="mr-2"
                  ><span class="text-muted">Tổng nâng hạ : </span>500,000
                </strong>
                <strong
                  ><span class="text-muted">Tổng cộng : </span>700,000
                </strong>
              </div>
              <div>
                <b-table
                  :fields="fieldsHoaDon"
                  :items="tableHoaDon"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(img)="row">
                    <div style="width: 32px; height: 32px">
                      <img
                        v-img
                        style="width: 100%; height: 100%"
                        :src="row.item.img"
                      />
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
            <b-col lg="6">
              <div class="mb-3">
                <strong>
                  <i class="fas fa-file-alt"></i>
                  THÔNG TIN VẬN ĐƠN</strong
                >
              </div>
              <div>
                <b-row>
                  <b-col lg="2">
                    <b-form-group
                      label="Mã vận đơn"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.ID"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="2">
                    <b-form-group
                      label="Ngày vận đơn"
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
                  <b-col lg="12">
                    <b-form-group
                      label="Khách hàng"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.KhachHang"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Số xe" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.BSX"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Tài xế" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.TaiXe"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Điện thoại"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.SDT"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="8">
                    <b-form-group label="Lấy cont" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.LayCont"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Số cont" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.SoCont"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="8">
                    <b-form-group label="Hạ cont" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.HaCont"
                        :disabled="slotProps.isDisable"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Số seal" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.SoSeal"
                        :disabled="slotProps.isDisable"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-row>
                      <b-col lg="8">
                        <b-form-group
                          label="Ghi chú"
                          class="has-float-label mb-4"
                        >
                          <b-form-textarea
                            rows="2"
                            max-rows="6"
                            v-model="slotProps.dataForm.GhiChu"
                            :disabled="slotProps.isDisable"
                            style="height: 97px"
                          ></b-form-textarea>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-row>
                          <b-col lg="12">
                            <b-form-group
                              label="Phí nâng"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                v-model="slotProps.dataForm.PhiNang"
                                :disabled="slotProps.isDisable"
                                class="text-right"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="12">
                            <b-form-group
                              label="Phí hạ"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                v-model="slotProps.dataForm.PhiHa"
                                :disabled="slotProps.isDisable"
                                class="text-right"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLCustom>
    <b-modal
      id="modal-hoa-don"
      centered
      size="md"
      @ok="handleAddHoaDon"
      title="THÊM"
    >
      <div class="mt-2">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Loại phí" class="has-float-label mb-4">
              <v-select
                v-model="formHoaDon.LoaiPhi"
                :options="[
                  'Phí nâng hạ',
                  'Phí vệ sinh',
                  'Phí cược cont',
                  'Phí đậu bãi',
                  'Phí nâng cont quá hạn',
                ]"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Cảng/Depot" class="has-float-label mb-4">
              <v-select
                v-model="formHoaDon.Depot"
                :options="[
                  'Cảng Cát Lái, Đồng Nai',
                  'Cảng Vũng tàu, Bà Rịa',
                  'Cảng Đức Hòa, Long An',
                ]"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
              label="Ký hiệu/Số hóa đơn"
              class="has-float-label mb-4"
            >
              <b-form-input v-model.number="formHoaDon.ID"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Nhập số tiền" class="has-float-label mb-4">
              <b-form-input v-model.number="formHoaDon.SoTien"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group>
              <b-form-file
                :placeholder="'Xin mời chọn...'"
                v-model="formHoaDon.img"
                accept="/*"
                :browse-text="'Chọn'"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Ghi chú" class="has-float-label mt-2 mb-4">
              <b-form-textarea
                v-model.number="formHoaDon.GhiChu"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
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
      formHoaDon: {},
      fieldsTable: [
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "ID",
          label: "Vận đơn",
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
          key: "SDT",
          label: "Số điện thoại",
          tdClass: "text-right",
        },
        {
          key: "LayCont",
          label: "Lấy cont",
        },
        {
          key: "PhiNang",
          label: "Phí nâng",
          tdClass: "text-right",
        },
        {
          key: "HaCont",
          label: "Hạ cont",
        },
        {
          key: "PhiHa",
          label: "Phí hạ",
        },
        {
          key: "SoTienDaChi",
          label: "Số tiền đã chi",
          tdClass: "text-right",
        },
        {
          key: "MaCT",
          label: "Mã CT",
        },
        {
          key: "NgayCT",
          label: "Ngày CT",
        },
        {
          key: "SoPhieuChi",
          label: "Số phiếu chi",
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
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "ID",
          label: "Vận đơn",
        },
        {
          key: "createDate",
          label: "Ngày CT",
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
          key: "SDT",
          label: "Số điện thoại",
          tdClass: "text-right",
        },
        {
          key: "LayCont",
          label: "Lấy cont",
        },
        {
          key: "PhiNang",
          label: "Phí nâng",
          tdClass: "text-right",
        },
        {
          key: "HaCont",
          label: "Hạ cont",
        },
        {
          key: "PhiHa",
          label: "Phí hạ",
        },
        {
          key: "SoTienDaChi",
          label: "Số tiền đã chi",
          tdClass: "text-right",
        },
        {
          key: "MaCT",
          label: "Mã CT",
        },
        {
          key: "NgayCT",
          label: "Ngày CT",
        },
        {
          key: "SoPhieuChi",
          label: "Số phiếu chi",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
      ],
      dataTable: [
        {
          ID: "VD/22/001",
          KhachHang: "Công ty A",
          MaCT: "CT/22/001",
          NgayCT: "11/12/2022",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          LayCont: "Cảng Cát Lái",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
        },
        {
          ID: "VD/22/002",
          MaCT: "CT/22/002",
          NgayCT: "11/12/2022",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          LayCont: "Cảng Cát Lái",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
        },
        {
          ID: "VD/22/003",
          MaCT: "CT/22/003",
          NgayCT: "11/12/2022",
          KhachHang: "Công ty C",
          LayCont: "Cảng Cát Lái",
          PhiHa: "100,000",
          BSX: "59P1-12345",
          createDate: "11/12/2022",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận",
          SoPhieuChi: "SP12347",
          SoTienDaChi: "300,000",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
        },
      ],
      fieldsHoaDon: [
        {
          key: "LoaiPhi",
          label: "Loại phí",
        },
        {
          key: "Depot",
          label: "Cảng/Depot",
        },
        {
          key: "ID",
          label: "Ký hiệu & Số hóa đơn",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "img",
          label: "Ảnh hóa đơn",
        },
      ],
      tableHoaDon: [
        {
          ID: "TC18P-000123",
          Depot: "Depot Tân Thuận",
          SoTien: "500,000",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
          LoaiPhi: "Phí nâng hạ",
        },
        {
          ID: "TC18P-000456",
          Depot: "Depot Tân Thuận",
          SoTien: "200,000",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
          LoaiPhi: "Phí vệ sinh",
        },
      ],
    };
  },
  methods: {
    handleAddHoaDon() {
      this.formHoaDon.img =
        "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg";
      this.tableHoaDon.push(this.formHoaDon);
    },
    showModalHoaDon() {
      this.formHoaDon = {};
      setTimeout(() => {
        this.$bvModal.show("modal-hoa-don");
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