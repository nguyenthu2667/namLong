<template>
  <div>
    <FormBasicNPLcustom
      :title="'BÀN GIAO'"
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
            <b-col lg="2">
              <b-form-group label="Mã" class="has-float-label mb-4">
                <b-form-input v-model="slotProps.dataForm.ID" disabled />
              </b-form-group>
            </b-col>
            <b-col lg="1">
              <b-form-group label="Ngày yêu cầu" class="has-float-label mb-4">
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
            <b-col lg="2" class="d-flex">
              <b-form-radio
                class="mr-4"
                v-model="radioLoaiXe"
                name="some-radios"
                value="ĐẦU KÉO"
                >ĐẦU KÉO</b-form-radio
              >
              <b-form-radio
                v-model="radioLoaiXe"
                name="some-radios"
                value="ROMOOC"
                >ROMOOC
              </b-form-radio>
            </b-col>
            <b-col lg="1">
              <b-form-group
                style="margin-left: -50px"
                v-show="radioLoaiXe == 'ROMOOC'"
                label="Số xe"
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
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <b-row>
                <b-col lg="3">
                  <b-form-group
                    label="Số phương tiện"
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
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Tài xế" class="has-float-label mb-4">
                    <b-form-input v-model="slotProps.dataForm.TaiXe" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Điện thoại" class="has-float-label mb-4">
                    <b-form-input v-model="slotProps.dataForm.SDT" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="CMND" class="has-float-label mb-4">
                    <b-form-input v-model="slotProps.dataForm.CMND" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="2">
                  <b-form-group label="Số Km BG" class="has-float-label mb-4">
                    <b-form-input
                      class="text-right"
                      v-model="slotProps.dataForm.KMBG"
                      disabled
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="7">
                  <b-form-group
                    label="TT Bàn giao"
                    class="has-float-label mb-4"
                  >
                    <b-form-input v-model="slotProps.dataForm.TTBG" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-checkbox name="checkbox-1">
                    DẦU ĐẦY BÌNH ?
                  </b-form-checkbox>
                </b-col>
                <template
                  v-if="slotProps.currentTitle.toUpperCase() == 'THU HỒI'"
                >
                  <b-col lg="2">
                    <b-form-group
                      label="Km Thu hồi"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.KMBG"
                        disabled
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="7">
                    <b-form-group
                      label="TT Thu hồi"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTTH"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                </template>
              </b-row>
            </b-col>
            <b-col lg="3">
              <b-form-group label="Ghi chú" class="has-float-label mb-4">
                <b-form-textarea
                  style="height: 98px"
                  v-model="slotProps.dataForm.note"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <div>
                <strong>THÔNG TIN GIẤY TỜ BÀN GIAO</strong>
              </div>
              <div class="mb-2">
                <b-table
                  :fields="fGTBG"
                  :items="tGTBG"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template
                    v-for="(field, index) in fGTBG"
                    v-slot:[`cell(${field.key})`]="row"
                  >
                    <template
                      v-if="
                        field.typeCol &&
                        field.typeCol.toUpperCase() == 'CHECKBOX'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-form-checkbox
                          size="md"
                          v-model="row.item[`${field.key}`]"
                        ></b-form-checkbox>
                      </div>
                    </template>
                    <template
                      v-else-if="
                        field.typeCol && field.typeCol.toUpperCase() == 'BADGE'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-badge
                          :style="`
                            font-size: 90%;
                            color: #fff;
                            border: 1px solid #d3d0d0f7;background:${
                              row.item[field.key + 'Color']
                            } !important`"
                        >
                          {{ row.item[field.key] }}
                        </b-badge>
                      </div>
                    </template>
                    <template v-else>
                      <div :key="`${field.key}-${index}`">
                        {{ row.item[`${field.key}`] }}
                      </div>
                    </template>
                  </template>
                </b-table>
              </div>
              <div>
                <strong>THÔNG TIN DỤNG CỤ BÀN GIAO</strong>
              </div>
              <div class="mb-2">
                <b-table
                  :fields="fDCBG"
                  :items="tDCBG"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template
                    v-for="(field, index) in fDCBG"
                    v-slot:[`cell(${field.key})`]="row"
                  >
                    <template
                      v-if="
                        field.typeCol &&
                        field.typeCol.toUpperCase() == 'CHECKBOX'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-form-checkbox
                          size="md"
                          v-model="row.item[`${field.key}`]"
                        ></b-form-checkbox>
                      </div>
                    </template>
                    <template
                      v-else-if="
                        field.typeCol && field.typeCol.toUpperCase() == 'BADGE'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-badge
                          :style="`
                            font-size: 90%;
                            color: #fff;
                            border: 1px solid #d3d0d0f7;background:${
                              row.item[field.key + 'Color']
                            } !important`"
                        >
                          {{ row.item[field.key] }}
                        </b-badge>
                      </div>
                    </template>
                    <template v-else>
                      <div :key="`${field.key}-${index}`">
                        {{ row.item[`${field.key}`] }}
                      </div>
                    </template>
                  </template>
                </b-table>
              </div>
            </b-col>
            <b-col lg="5">
              <div>
                <strong>THÔNG TIN LỐP XE</strong>
              </div>
              <div class="mb-2">
                <b-table
                  :fields="fTTLX"
                  :items="tTTLX"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template
                    v-for="(field, index) in fTTLX"
                    v-slot:[`cell(${field.key})`]="row"
                  >
                    <template
                      v-if="
                        field.typeCol &&
                        field.typeCol.toUpperCase() == 'CHECKBOX'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-form-checkbox
                          size="md"
                          v-model="row.item[`${field.key}`]"
                        ></b-form-checkbox>
                      </div>
                    </template>
                    <template
                      v-else-if="
                        field.typeCol && field.typeCol.toUpperCase() == 'BADGE'
                      "
                    >
                      <div :key="`${field.key}-${index}`" class="text-center">
                        <b-badge
                          :style="`
                            font-size: 90%;
                            color: #fff;
                            border: 1px solid #d3d0d0f7;background:${
                              row.item[field.key + 'Color']
                            } !important`"
                        >
                          {{ row.item[field.key] }}
                        </b-badge>
                      </div>
                    </template>
                    <template v-else>
                      <div :key="`${field.key}-${index}`">
                        {{ row.item[`${field.key}`] }}
                      </div>
                    </template>
                  </template>
                </b-table>
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
          key: "NghiepVu",
          label: "Yêu cầu",
          typeCol: "BADGE",
        },
        {
          key: "PhuongTien",
          label: "Phương tiện",
        },
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
          key: "CMND",
          label: "CMND",
        },
        {
          key: "DKTG",
          label: "TG Dự kiến",
        },
        {
          key: "TGTT",
          label: "TG Thực tế",
        },
        {
          key: "TTBG",
          label: "TT bàn giao",
        },
        {
          key: "TTTH",
          label: "TT Thu hồi",
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
          LoaiXe: "HW1000",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Đã xử lý",
          StatusColor: "green",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Đã xử lý",
          StatusColor: "green",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
          Status: "Chờ xử lý",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTT: "17:00 12/12/2022",
          KMBG: "15,500",
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
        //   Status: "Chờ xử lý",
        //   StatusColor: "orange",
        //   PhuongTien: "Đầu kéo",
        //   TGTT: "17:00 12/12/2022",
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
        //   Status: "Chờ xử lý",
        //   StatusColor: "orange",
        //   PhuongTien: "Romooc",
        //   TGTT: "17:00 12/12/2022",
        //   KMBG: "15,500",
        // },
      ],
      fGTBG: [
        {
          key: "type",
          label: "Loại giấy tờ",
        },
        {
          key: "BG",
          label: "Bản chính ?",
          typeCol: "CHECKBOX",
        },
        {
          key: "Photo",
          label: "Photo ?",
          typeCol: "CHECKBOX",
        },
        {
          key: "CTH",
          label: "Có thu hồi ?",
          typeCol: "CHECKBOX",
        },
      ],
      tGTBG: [
        {
          ID: "001",
          type: "Giấy tờ xe",
          BG: true,
          Photo: false,
          CTH: true,
        },
        {
          ID: "002",
          type: "Bảo hiểm xe",
          BG: true,
          Photo: false,
          CTH: true,
        },
        {
          ID: "003",
          type: "Phí cầu đường",
          BG: true,
          Photo: true,
          CTH: false,
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
          key: "LopLai",
          label: "Lốp lái",
          typeCol: "CHECKBOX",
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
          LopLai: true,
        },
        {
          ID: "002",
          Seri: "ABC133",
          TenLop: "Lốp Ximes",
          Loai: "Ximes",
          CTH: false,
          LopLai: true,
        },
        {
          ID: "003",
          Seri: "ABC134",
          TenLop: "Lốp Mechaline",
          Loai: "Mechaline",
          CTH: true,
          LopLai: true,
        },
        {
          ID: "004",
          Seri: "ABC133",
          TenLop: "Lốp Ximes",
          Loai: "Ximes",
          CTH: false,
          LopLai: true,
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
  created() {
    this.handleChangeTitle("BÀN GIAO");
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