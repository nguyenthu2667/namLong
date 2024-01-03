<template>
  <div>
    <FormBasicNPLcustom
      :title="'Xử Lý Bảo Dưỡng'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      @currentTitle="handleChangeTitle"
      :componentKey="'XuLyYeuCau'"
    >
      <template #tabTwo="slotProps">
        <div class="mt-2">
          <b-row>
            <b-col lg="4">
              <div class="mb-2">
                <strong
                  ><i class="fas fa-info-square mr-1"></i>THÔNG TIN YÊU CẦU BẢO
                  DƯỠNG</strong
                >
              </div>
              <div>
                <b-row>
                  <b-col lg="3">
                    <b-form-group label="Mã" class="has-float-label mb-4">
                      <b-form-input v-model="slotProps.dataForm.ID" disabled />
                    </b-form-group>
                  </b-col>
                  <b-col lg="3">
                    <b-form-group
                      label="Ngày yêu cầu"
                      class="has-float-label mb-4"
                    >
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
                  <b-col lg="6"></b-col>
                  <b-col lg="4">
                    <b-form-group label="Số xe" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.BSX"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Loại" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.LoaiXe"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Chu kỳ bảo dưỡng"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.ChuKy"
                        :disabled="slotProps.isDisable"
                        class="text-center"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="4">
                    <b-form-group label="Tài xế" class="has-float-label mb-4">
                      <v-select
                        v-model="slotProps.dataForm.TaiXe"
                        :options="[
                          'Nguyễn Văn A',
                          'Nguyễn Văn B',
                          'Nguyễn Văn C',
                        ]"
                        :disabled="slotProps.isDisable"
                      />
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
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="DK Thời gian"
                      class="has-float-label mb-4"
                    >
                      <datepicker
                        v-model="slotProps.dataForm.DKTG"
                        :format="'10:30 dd/MM/yyyy'"
                        :placeholder="'DD/MM/YYYY'"
                        :bootstrap-styling="true"
                        @input="convertDate('createDate')"
                        :disabled="slotProps.isDisable"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <b-form-group
                      label="Yêu cầu khác"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.YCK"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        v-model="slotProps.dataForm.note"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12"><div>Hình ảnh:</div></b-col>
                  <b-col lg="6">
                    <div
                      style="
                        width: 100%;
                        height: 200px;
                        border: 1px solid #d7d7d7;
                      "
                    >
                      <img
                        v-img
                        style="width: 100%; height: 100%"
                        src="https://cuuhogiaothongninhbinh.com/wp-content/uploads/2022/06/nhung-loi-thuong-gap-xe-container-ninhbinh.jpeg"
                      />
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <div
                      style="
                        width: 100%;
                        height: 200px;
                        border: 1px solid #d7d7d7;
                      "
                    >
                      <img
                        v-img
                        style="width: 100%; height: 100%"
                        src="https://otohoanglong.vn/wp-content/uploads/2019/07/Sua-xe-dau-keo-chat-luong.jpg"
                      />
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4">
              <div class="mb-2">
                <strong
                  ><i class="fas fa-info-square mr-1"></i>THÔNG TIN BẢO
                  DƯỠNG</strong
                >
              </div>
              <div class="d-flex text-muted mb-2">
                <strong>TIẾP NHẬN PHƯƠNG TIỆN </strong>
              </div>
              <div>
                <b-row>
                  <b-col lg="4">
                    <b-form-group
                      label="Thời gian tiếp nhận"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TGTN"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Dự kiến hoàn thành"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.DKHT"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-button squared :variant="`success`" size="sm">
                      <b
                        ><i class="far fa-check-circle mr-1"></i>Xác nhận tiếp
                        nhận</b
                      >
                    </b-button>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Tình trạng tiếp nhận"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTTN"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
              <hr class="m-0 p-0 mb-2" />
              <div class="d-flex text-muted mb-2">
                <strong>BÀN GIAO XE </strong>
              </div>
              <div>
                <b-row>
                  <b-col lg="8">
                    <b-form-group
                      label="Thời gian bàn giao"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TGHT"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-button squared :variant="`success`" size="sm">
                      <b
                        ><i class="far fa-check-circle mr-1"></i>Xác nhận bàn
                        giao</b
                      >
                    </b-button>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Tình trạng bàn giao"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTBG"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Công việc chưa xử lý"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.CVCXL"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        v-model="slotProps.dataForm.note"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4">
              <div class="d-flex mb-2">
                <strong
                  ><i class="fas fa-info-square mr-1"></i>THÔNG TIN CÔNG VIỆC VÀ
                  VẬT TƯ BẢO DƯỠNG
                </strong>
              </div>
              <div>
                <b-table
                  :fields="fCVVT"
                  :items="tCVVT"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                ></b-table>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLcustom>
  </div>
</template>

<script>
import FormBasicNPLcustom from "./component/FormBasicNPLcustom.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    FormBasicNPLcustom,
    "v-select": vSelect,
  },
  data() {
    return {
      radioLoaiXe: "ĐẦU KÉO",
      fieldsTable: [
        {
          key: "ID",
          label: "Mã yêu cầu",
        },
        {
          key: "createDate",
          label: "Ngày yêu cầu",
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
          key: "BSX",
          label: "Số xe/romooc",
        },
        {
          key: "LoaiXe",
          label: "Loại",
        },
        {
          key: "ChuKy",
          label: "Chu kỳ",
          tdClass: "text-right",
        },
        {
          key: "DKTG",
          label: "TG Dự kiến",
        },
        {
          key: "TGTN",
          label: "TG Tiếp nhận",
        },
        {
          key: "DKHT",
          label: "DK hoàn thành",
        },
        {
          key: "TGHT",
          label: "TG hoàn thành",
        },
        {
          key: "TTTN",
          label: "Trình trạng tiếp nhận",
        },
        {
          key: "TTBG",
          label: "Trình trạng bàn giao",
        },
        {
          key: "CVCXL",
          label: "Công việc chưa xử lý",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "Status",
          label: "Trạng thái",
          typeCol: "BADGECOLOR",
        },
      ],
      dataTable: [
        {
          ID: "YC001",
          createDate: "09:30 12/12/2022",
          NghiepVu: "Bàn giao",
          NghiepVuColor: "green",
          BSX: "59P2-40841",
          LoaiXe: "HW1000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hư bình điện",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC001",
          createDate: "09:30 12/12/2022",
          NghiepVu: "Bàn giao",
          NghiepVuColor: "green",
          BSX: "MOC138367",
          LoaiXe: "Mooc xương",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Đã tiếp nhận",
          StatusColor: "#2980b9",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "4",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC002",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiXe: "RM1000",
          BSX: "59P2-40845",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "5",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC0021",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiXe: "Mooc sàn",
          BSX: "MOC187377",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Đang xử lý",
          StatusColor: "#8e44ad",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "6",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC0031",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiXe: "RM1000",
          BSX: "59P2-40245",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Đã hoàn thành",
          StatusColor: "green",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC003",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiXe: "Mooc xương",
          BSX: "MOC037888",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Đã hoàn thành",
          StatusColor: "green",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC0041",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiXe: "HW1000",
          BSX: "59P2-40845",
          TaiXe: "Nguyễn Văn D",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        {
          ID: "YC004",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiXe: "Mooc sàn",
          BSX: "MOC172829",
          TaiXe: "Nguyễn Văn D",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          DKHT: "20:00 12/12/2022",
          ChuKy: "3",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
        },
        // {
        //   ID: "YC0051",
        //   createDate: "09/12/2023",
        //   NghiepVu: "Thay đổi",
        //   LoaiXe: "HW1000",
        //   BSX: "59P2-40845",
        //   TaiXe: "Nguyễn Văn D",
        //   SDT: "0961421396",
        //   CMND: "301692324",
        //   GPLX: "GPLX09232",
        //   DKTG: "09:30 12/12/2022",
        //   MCTXL: "MCTXL9238",
        //   TTBG: " Hoạt động bình thường",
        //   TTTH: "Hoạt động bình thường",
        //   note: "...",
        //   Status: "Chờ tiếp nhận",
        //   StatusColor: "orange",
        //   PhuongTien: "Đầu kéo",
        //   TGTN: "17:00 12/12/2022",
        //   KMBG: "15,500",
        // },
        // {
        //   ID: "YC005",
        //   createDate: "09/12/2023",
        //   NghiepVu: "Thay đổi",
        //   LoaiXe: "Mooc sàn",
        //   BSX: "MOC28838",
        //   TaiXe: "Nguyễn Văn D",
        //   SDT: "0961421396",
        //   CMND: "301692324",
        //   GPLX: "GPLX09232",
        //   DKTG: "09:30 12/12/2022",
        //   MCTXL: "MCTXL9238",
        //   TTBG: " Hoạt động bình thường",
        //   TTTH: "Hoạt động bình thường",
        //   note: "...",
        //   Status: "Chờ tiếp nhận",
        //   StatusColor: "orange",
        //   PhuongTien: "Romooc",
        //   TGTN: "17:00 12/12/2022",
        //   KMBG: "15,500",
        // },
      ],
      fCVVT: [
        {
          key: "CongViec",
          label: "Công việc",
        },
        {
          key: "VatTu",
          label: "Vật tư",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
      ],
      tCVVT: [
        {
          ID: "001",
          CongViec: "Thay dây điện",
          VatTu: "Dây điện",
          SoLuong: "10",
        },
        {
          ID: "002",
          CongViec: "Thay gương",
          VatTu: "Gương xe",
          SoLuong: "2",
        },
        {
          ID: "003",
          CongViec: "Thay đèn",
          VatTu: "Đèn chiếu hậu",
          SoLuong: "2",
        },
      ],
      options: {},
    };
  },
  methods: {
    handleChangeTitle(string) {
      if (string.toUpperCase() != "THU HỒI") {
        this.fTTLX = this.fTTLX.filter((f) => f.key != "CTH");
        this.fDCBG = this.fDCBG.filter((f) => f.key != "CTH");
        this.fGTBG = this.fGTBG.filter((f) => f.key != "CTH");
      } else {
        let obj = {
          key: "CTH",
          label: "Có thu hồi ?",
          typeCol: "CHECKBOX",
        };
        this.fTTLX.push(obj);
        this.fDCBG.push(obj);
        this.fGTBG.push(obj);
      }
    },
  },
};
</script>