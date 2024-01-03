<template>
  <div>
    <FormBasicNPLCustom
      :title="'TẠM ỨNG TÀI XẾ'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      :showCopy="false"
      :componentKey="'TamUngTaiXe'"
    >
      <template #tabTwo="slotProps">
        <div class="mt-2">
          <b-row>
            <b-col lg="4">
              <b-row>
                <b-col lg="4">
                  <b-form-group label="Mã CT" class="has-float-label mb-4">
                    <b-form-input v-model="slotProps.dataForm.ID" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group label="Ngày CT" class="has-float-label mb-4">
                    <datepicker
                      v-model="slotProps.dataForm.createDate"
                      :format="'dd/MM/yyyy'"
                      :placeholder="'DD/MM/YYYY'"
                      :bootstrap-styling="true"
                      :disabled="slotProps.isDisable"
                    ></datepicker>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <b-form-group
                    label="Số phiếu chi"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      v-model="slotProps.dataForm.SoPhieuChi"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group
                    label="Hình thức chi"
                    class="has-float-label mb-4"
                  >
                    <v-select
                      v-model="slotProps.dataForm.HinhThucChi"
                      :disabled="slotProps.isDisable"
                      :options="['Tiền mặt', 'Chuyển khoản']"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <b-form-group
                    label="Số lượng tài xế"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      v-model="slotProps.dataForm.SLTX"
                      :disabled="slotProps.isDisable"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group
                    label="Tổng tiền tạm ứng"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      v-model="slotProps.dataForm.TTTU"
                      :disabled="slotProps.isDisable"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="12">
                  <b-form-group label="Ghi chú" class="has-float-label mb-4">
                    <b-form-textarea
                      v-model="slotProps.dataForm.GhiChu"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="6">
              <div>
                <strong
                  >CHI TIẾT PHIẾU CHI
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
                    @click="showModalTUTX"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </strong>
              </div>
              <div>
                <b-table
                  :fields="fCTPC"
                  :items="tCTPC"
                  responsive
                  bordered
                  head-variant="light"
                ></b-table>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLCustom>
    <b-modal id="modal-tutx" centered size="md" title="THÊM">
      <div>
        <b-row>
          <b-col lg="12">
            <b-form-group :label="'Tài xế'">
              <v-select
                :options="['Nguyễn Văn A', 'Nguyên Văn B', 'Nguyễn Văn C']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group :label="'Số điện thoại'">
              <b-form-input></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group :label="'Số tiền'">
              <b-form-input></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
  },
  data() {
    return {
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
          key: "SoPhieuChi",
          label: "Số phiếu chi",
        },
        {
          key: "HinhThucChi",
          label: "Hình thức chi",
        },
        {
          key: "SLTX",
          label: "Số lượng tài xế",
          tdClass: "text-right",
        },
        {
          key: "TTTU",
          label: "Tổng tiền tạm ứng",
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
      dataTable: [
        {
          ID: "PC/22/001",
          createDate: "10:30 12/12/2022",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          TTTU: "10,000,000",
          HinhThucChi: "Chuyển khoản",
          SoPhieuChi: "SP12345",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          SLTX: "8",
        },
        {
          ID: "PC/22/002",
          createDate: "11:30 12/12/2022",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          TTTU: "11,000,000",
          HinhThucChi: "Tiền mặt",
          SoPhieuChi: "SP12346",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SLTX: "8",
        },
        {
          ID: "PC/22/003",
          createDate: "12:30 12/12/2022",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          TTTU: "12,000,000",
          HinhThucChi: "Chuyển khoản",
          SoPhieuChi: "SP12347",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          SLTX: "8",
        },
      ],
      fCTPC: [
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "SDT",
          label: "Điện thoại",
        },
        {
          key: "SoTien",
          label: "Số tiền",
        },
      ],
      tCTPC: [
        {
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          SoTien: "20,000,000",
        },
        {
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          SoTien: "15,000,000",
        },
        {
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          SoTien: "18,000,000",
        },
        {
          TaiXe: "Nguyễn Văn F",
          SDT: "0961421396",
          SoTien: "20,000,000",
        },
      ],
      options: {
        TaiXe: ["Nguyễn Văn A", "Nguyễn Văn B", "Nguyễn Văn C", "Nguyễn Văn D"],
        HinhThucChi: ["Chuyển Khoản", "Tiền mặt"],
      },
    };
  },
  methods: {
    showModalTUTX() {
      setTimeout(() => {
        this.$bvModal.show("modal-tutx");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>