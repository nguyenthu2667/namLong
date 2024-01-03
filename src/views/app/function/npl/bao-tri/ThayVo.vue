<template>
  <div>
    <FormBasicNPLcustom
      :title="'THAY VỎ'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      :titles="['Bàn giao', 'Thu hồi', 'Cho mượn', 'Thu hồi cho mượn']"
      @currentTitle="handleChangeTitle"
      :componentKey="'XuLyYeuCau'"
    >
      <template #tabTwo="slotProps">
        <div class="mt-2">
          <b-row>
            <b-col lg="3">
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Mã CT" class="has-float-label mb-4">
                    <b-form-input v-model="slotProps.dataForm.ID" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
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
              </b-row>
              <b-row>
                <b-col lg="6" style="margin-top: -10px">
                  <div><span>Phương tiện</span></div>
                  <div class="d-flex">
                    <b-form-radio
                      style="white-space: nowrap"
                      class="mr-3"
                      v-model="radioLoaiXe"
                      name="some-radios"
                      value="ĐẦU KÉO"
                      >ĐẦU KÉO
                    </b-form-radio>
                    <b-form-radio
                      style="white-space: nowrap"
                      v-model="radioLoaiXe"
                      name="some-radios"
                      value="ROMOOC"
                      >ROMOOC
                    </b-form-radio>
                  </div>
                </b-col>
                <b-col lg="6">
                  <b-form-group
                    v-if="radioLoaiXe == 'ROMOOC'"
                    label="Chọn số phương tiện"
                    class="has-float-label mb-4"
                  >
                    <v-select
                      v-model="slotProps.dataForm.BSX"
                      :disabled="slotProps.isDisable"
                      :options="[
                        'RM-9323123',
                        'RM-2341232',
                        'RM-9323121',
                        'RM-9323120',
                      ]"
                    />
                  </b-form-group>
                  <b-form-group
                    v-else
                    label="Chọn số phương tiện"
                    class="has-float-label mb-4"
                  >
                    <v-select
                      v-model="slotProps.dataForm.BSX"
                      :disabled="slotProps.isDisable"
                      :options="[
                        '51P2-93223',
                        '62P1-23232',
                        '45P2-34245',
                        '32P3-93230',
                      ]"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="12">
                  <b-form-group label="Ghi chú">
                    <b-form-textarea
                      v-model="slotProps.dataForm.GhiChu"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="4">
              <div>
                <strong>CHI TIẾT THAY VỎ</strong>
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
                  @click="showModalCTTV"
                >
                  <i class="fas fa-plus"></i> <b>Thêm </b>
                </b-button>
              </div>
              <div class="mt-2">
                <b-table
                  :fields="fCTTV"
                  :items="tCTTV"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(VoLai)="row">
                    <div class="text-center">
                      <b-form-checkbox
                        v-model="row.item.VoLai"
                      ></b-form-checkbox>
                    </div>
                  </template>
                </b-table>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLcustom>
    <b-modal
      :id="`modal-cttv`"
      centered
      size="md"
      title="THÊM"
      @ok="handleAddCTTV"
    >
      <div class="mt-2">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Số seri củ" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.SoSeri"
                :options="['SRC09387731', 'SRC09387722', 'SRC09387733']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Số seri mới" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.SoSeriMoi"
                :options="['SRM09387731', 'SRM09387722', 'SRM09387733']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-checkbox v-model="formCustom.VoLai"
              >Vỏ lái ?
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </b-modal>
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
      formCustom: {},
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
          key: "LoaiVo",
          label: "Loại",
        },
        {
          key: "BSX",
          label: "Số xe",
        },

        {
          key: "SoSeri",
          label: "Số Seri",
          tdClass: "text-right",
        },
        {
          key: "SoSeriMoi",
          label: "Số Seri Mới",
          tdClass: "text-right",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "Status",
          label: "Trình trạng",
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
          LoaiVo: "MASIX",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC001",
          createDate: "09:30 12/12/2022",
          NghiepVu: "Bàn giao",
          NghiepVuColor: "green",
          BSX: "MOC138367",
          LoaiVo: "MASIX",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC002",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiVo: "MACHELINE",
          BSX: "59P2-40845",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC0021",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiVo: "Mooc sàn",
          BSX: "MOC187377",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC0031",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiVo: "MACHELINE",
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
          Status: "Đã xử lý",
          StatusColor: "green",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC003",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiVo: "MASIX",
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
          Status: "Đã xử lý",
          StatusColor: "green",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC0041",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiVo: "MASIX",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
        {
          ID: "YC004",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiVo: "Mooc sàn",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
          SoSeri: "S0398237",
          SoSeriMoi: "S1238764",
        },
      ],
      fCTTV: [
        {
          key: "SoSeri",
          label: "Loại giấy tờ",
        },
        {
          key: "VoLai",
          label: "Vỏ Lái",
        },
        {
          key: "SoSeriMoi",
          label: "Số seri mới",
        },
      ],
      tCTTV: [
        {
          SoSeri: "S231233",
          VoLai: true,
          SoSeriMoi: "S86273612",
        },
        {
          SoSeri: "S231233",
          VoLai: false,
          SoSeriMoi: "S86273612",
        },
      ],
      fDCBG: [
        {
          key: "Name",
          label: "Dụng cụ",
        },
        {
          key: "DVT",
          label: "Đơn vị",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "CTH",
          label: "Có thu hồi ?",
          typeCol: "CHECKBOX",
        },
      ],
      tDCBG: [
        {
          Name: "Bạt 5m",
          DVT: "tấn",
          SoLuong: "2",
          CTH: true,
        },
        {
          Name: "Xích 10m",
          DVT: "dây",
          SoLuong: "2",
          tdClass: "text-right",
          CTH: false,
        },
      ],
      fTTLX: [
        {
          key: "Seri",
          label: "Số seri",
        },
        {
          key: "TenLop",
          label: "Tên lốp",
        },
        {
          key: "Loai",
          label: "Loại",
        },
        {
          key: "CTH",
          label: "Có thu hồi ?",
          typeCol: "CHECKBOX",
        },
      ],
      tTTLX: [
        {
          ID: "001",
          Seri: "ABC134",
          TenLop: "Lốp Mechaline",
          Loai: "Mechaline",
          CTH: true,
        },
        {
          ID: "002",
          Seri: "ABC133",
          TenLop: "Lốp Ximes",
          Loai: "Ximes",
          CTH: false,
        },
        {
          ID: "003",
          Seri: "ABC134",
          TenLop: "Lốp Mechaline",
          Loai: "Mechaline",
          CTH: true,
        },
        {
          ID: "004",
          Seri: "ABC133",
          TenLop: "Lốp Ximes",
          Loai: "Ximes",
          CTH: false,
        },
        {
          ID: "005",
          Seri: "ABC134",
          TenLop: "Lốp Mechaline",
          Loai: "Mechaline",
          CTH: true,
        },
        {
          ID: "002",
          Seri: "ABC133",
          TenLop: "Lốp Ximes",
          Loai: "Ximes",
          CTH: false,
        },
        {
          ID: "003",
          Seri: "ABC134",
          TenLop: "Lốp Mechaline",
          Loai: "Mechaline",
          CTH: true,
        },
      ],
      options: {},
    };
  },
  methods: {
    handleAddCTTV() {
      let obj = {
        ID: this.tCTTV.length + 1,
        ...this.formCustom,
      };
      this.tCTTV.push(obj);
    },
    showModalCTTV() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-cttv");
      }, 500);
    },
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