<template>
  <div>
    <ActionsHeaderNPL
      @first-index="updateFirstIndex"
      @pre-index="updatePreIndex"
      @next-index="updateNextIndex"
      @last-index="updateLastIndex"
      :currentIndex="currentIndex"
      :isAdd="isAdd"
      :isEdit="isEdit"
      :isDelete="isDelete"
      :showIndex="false"
      :showAdd="false"
      :showBlock="false"
      :showDelete="false"
      :showCancel="false"
      :showSave="false"
      :showCopy="false"
      @change-actions="handleChangeActions"
    ></ActionsHeaderNPL>
    <b-tabs v-model="currentTab" nav-class="d-none">
      <b-tab>
        <div class="box-content">
          <div
            class="text-right"
            style="position: absolute; right: 18px; top: 57px"
          >
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('ALL')"
            >
              <b>TẤT CẢ (3)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('ETA')"
            >
              <b>QUÁ ETA (2)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('ETD')"
            >
              <b>QUÁ ETD (2)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('ST')"
            >
              <b>SAI TUYẾN (2)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('QT')"
            >
              <b>QUÁ TẢI (2)</b>
            </b-button>
          </div>
          <b-table
            id="npl-table-basic-form"
            class="npl-table-basic-form"
            :fields="fieldsTable"
            :items="dataFinal"
            bordered
            responsive
            show-empty
            head-variant="light"
            selectable
            :select-mode="'single'"
            :current-page="currentPage"
            :per-page="perPage"
            @row-dblclicked="handleDbClick"
          >
            <template slot="top-row" slot-scope="{ fields }">
              <td v-for="field in fields" :key="field.ID">
                <datepicker
                  v-if="
                    field.key == 'createDate' ||
                    field.key == 'DateTime' ||
                    field.key == 'Date'
                  "
                  :language="locale"
                  :format="datePickerFormat"
                  :bootstrap-styling="true"
                  :placeholder="'DD/MM/YYYY'"
                ></datepicker>
                <v-select
                  v-else-if="
                    field.key == 'Status' ||
                    field.key == 'TrangThai' ||
                    field.key == 'statusName'
                  "
                  :options="['Đang đi giao', 'Đang đóng hàng']"
                />
                <b-form-input v-else placeholder="Nhập tìm.." />
              </td>
            </template>
            <template
              v-for="(field, index) in fieldsTable"
              v-slot:[`cell(${field.key})`]="row"
            >
              <div
                :key="index"
                v-if="field.typeCol && field.typeCol.toUpperCase() == 'ICON'"
              >
                <span v-if="row.item[`${field.key}`] == true">
                  <i class="fad fa-exclamation-triangle text-danger"></i>
                </span>
                <span v-else>
                  <i class="fas fa-minus text-muted"></i>
                </span>
              </div>
              <div
                :key="index"
                v-else-if="
                  field.typeCol && field.typeCol.toUpperCase() == 'ISDOC'
                "
              >
                <span v-if="row.item[`${field.key}`] == true">
                  <i class="fas fa-file-alt text-primary"></i>
                </span>
                <span v-else>
                  <i class="fas fa-minus text-muted"></i>
                </span>
              </div>
              <div
                :key="index"
                v-else-if="
                  field.typeCol && field.typeCol.toUpperCase() == 'STATUS'
                "
              >
                <Status
                  :color="row.item[`${field.key}Color`]"
                  :label="row.item[`${field.key}`]"
                  :showCircle="false"
                ></Status>
              </div>
              <div v-else :key="index">
                {{ row.item[`${field.key}`] }}
              </div>
            </template>
          </b-table>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <template v-if="typeDonHang.toUpperCase() == 'HR'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐIỀU ĐỘ HÀNG RỜI</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <DetailDH :type="typeDonHang"></DetailDH>
          </template>
          <template v-else-if="typeDonHang.toUpperCase() == 'CN'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐIỀU ĐỘ HÀNG CONT NHẬP</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <DetailDH :type="typeDonHang"></DetailDH>
          </template>
          <template v-else-if="typeDonHang.toUpperCase() == 'CX'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐIỀU ĐỘ HÀNG CONT XUẤT</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <DetailDH :type="typeDonHang"></DetailDH>
          </template>
          <template v-else>
            <div class="text-muted text-center mt-5">Chưa chọn dữ liệu !</div>
          </template>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <div
            style="font-size: 16px; background: #d7d7d7; color: #005aab"
            class="text-center pt-1 mb-1"
          >
            <strong>LỊCH SỬ THAO TÁC </strong>
            <b-dropdown
              class="title-dropdown"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
            >
            </b-dropdown>
            <hr class="m-0" />
          </div>
          <table-history
            v-if="dataHisAction && dataHisAction.length > 0"
            :fields="fieldsHisAction"
            :items="dataHisAction"
          ></table-history>
          <div v-else class="mt-4 text-center text-muted font-weight-bold">
            Không tồn tại dữ liệu !
          </div>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <div
            style="font-size: 16px; background: #d7d7d7; color: #005aab"
            class="text-center pt-1 mb-1"
          >
            <strong>DANH SÁCH FILE</strong>
            <b-dropdown
              class="title-dropdown"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
            >
            </b-dropdown>
            <hr class="m-0" />
          </div>
          <table-list-file></table-list-file>
        </div>
      </b-tab>
    </b-tabs>
    <ActionsFooterNPL
      :activeFocus="currentTab"
      @change-tab="updateTab"
    ></ActionsFooterNPL>
    <b-modal
      :id="`modal-add-van-don-hr-tdvd`"
      centered
      size="xl"
      title="CẬP NHẬT"
      @ok="handleSubmit"
    >
      <FormAddHangRoiCDD
        ref="refFormAddHangRoiCDD"
        :data="dataEditHR"
      ></FormAddHangRoiCDD>
    </b-modal>
    <b-modal
      :id="`modal-add-van-don-cn-tdvd`"
      centered
      size="xl"
      title="CẬP NHẬT"
      @ok="handleSubmit"
    >
      <FormAddHangCNCDD
        ref="refFormAddHangRoiCNCDD"
        :data="dataEditCN"
      ></FormAddHangCNCDD>
    </b-modal>
    <b-modal
      :id="`modal-add-van-don-cx-tdvd`"
      centered
      size="xl"
      title="CẬP NHẬT"
      @ok="handleSubmit"
    >
      <FormAddHangCXCDD
        ref="refFormAddHangRoiCXCDD"
        :data="dataFormCX"
      ></FormAddHangCXCDD>
    </b-modal>
  </div>
</template>

<script>
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import Status from "@/components/Badges/StatusColor.vue";
import DetailDH from "./theo-doi-van-don/DetailDH.vue";
import FormAddHangRoiCDD from "./FormAddHangRoiCDD.vue";
import FormAddHangCNCDD from "./FormAddHangCNCDD.vue";
import FormAddHangCXCDD from "./FormAddHangCXCDD.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    DetailDH,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    FormAddHangRoiCDD,
    FormAddHangCNCDD,
    FormAddHangCXCDD,
  },
  data() {
    return {
      currentTab: 0,
      //history-actions
      fieldsHisAction: [
        {
          key: "dateTime",
          label: "Thời gian",
        },
        {
          key: "userName",
          label: "Người thực hiện",
        },
        {
          key: "typeAction",
          label: "Thao tác",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
      ],
      dataHisAction: [
        {
          dateTime: "13:10 10-11-2022",
          userName: "Trần Văn A",
          typeAction: "add",
          note: "",
        },
        {
          dateTime: "15:10 10-11-2022",
          userName: "Trần Văn B",
          typeAction: "edit",
          note: "phát sinh abc...",
        },
        {
          dateTime: "12:10 11-11-2022",
          userName: "Trần Văn C",
          typeAction: "delete",
          note: "Không đủ xe vận tải",
        },
      ],
      //header-actions
      typeAction: null,
      dataBackup: null,
      isAdd: false,
      isEdit: false,
      isDelete: false,
      currentIndex: 0,
      //panagition
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
      //table
      fieldsTable: [
        {
          key: "ID",
          label: "Mã vận đơn",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
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
          key: "QuaTai",
          label: "Quá Tải",
          typeCol: "icon",
          tdClass: "text-center",
        },
        {
          key: "QuaETA",
          label: "Quá ETA",
          typeCol: "icon",
          tdClass: "text-center",
        },
        {
          key: "QuaETD",
          label: "Quá ETD",
          typeCol: "icon",
          tdClass: "text-center",
        },
        {
          key: "SaiTuyen",
          label: "Sai Tuyến",
          typeCol: "icon",
          tdClass: "text-center",
        },
        {
          key: "DKETD",
          label: "DK Lấy hàng",
        },
        {
          key: "DKETA",
          label: "DK Giao hàng",
        },
        {
          key: "Status",
          label: "Trình Trạng",
          typeCol: "status",
        },
        {
          key: "DKCT",
          label: "DK Chứng Từ",
          typeCol: "isDoc",
          tdClass: "text-center",
        },
      ],
      dataTable: [
        {
          ID: "VD001",
          BSX: "20P1-2011",
          QuaTai: true,
          QuaETA: true,
          QuaETD: true,
          SaiTuyen: true,
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "08:00 20/10/2022",
          Status: "Đang đi giao",
          StatusColor: "green",
          DKCT: true,
          type: "HR",
          KhachHang: "Nguyên Văn A",
          LoaiHang: "Hàng rời",
          MatHang: "Thạch cao",
        },
        {
          ID: "VD001",
          BSX: "20P1-2011",
          QuaTai: true,
          QuaETA: true,
          QuaETD: true,
          SaiTuyen: true,
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "08:00 20/10/2022",
          Status: "Đang đi giao",
          StatusColor: "green",
          DKCT: true,
          type: "HR",
          KhachHang: "Nguyên Văn B",
          LoaiHang: "Hàng rời",
          MatHang: "Thạch cao",
        },
        {
          ID: "VD002",
          BSX: "20P1-2022",
          QuaTai: false,
          QuaETA: true,
          QuaETD: false,
          SaiTuyen: true,
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "09:00 16/10/2022",
          Status: "Đang đóng hàng",
          StatusColor: "orange",
          DKCT: false,
          type: "CN",
          KhachHang: "Nguyên Văn B",
          LoaiHang: "Cont nhập",
          MatHang: "Giấy",
        },
        {
          ID: "VD003",
          BSX: "20P1-2033",
          QuaTai: true,
          QuaETA: false,
          QuaETD: true,
          SaiTuyen: false,
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "10:00 16/10/2022",
          Status: "Đang đóng hàng",
          StatusColor: "orange",
          DKCT: true,
          type: "CX",
          KhachHang: "Nguyên Văn C",
          LoaiHang: "Cont xuất",
          MatHang: "Thép",
        },
      ],
      dataFinal: [],
      //type
      typeDonHang: "",
      //
      dataEditHR: {
        ID: "DH001",
        BSX: "51P1-1245",
        TaiXe: "Nguyễn Văn A",
        LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
        TraHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
        CauHang: "Tự Cẩu",
        DonViCau: "53PS-12353",
        SoLuong: "5 cuộn",
        TrongLuong: "50 tấn",
        TrinhTrang: "Chờ tài xế xác nhận",
        TrinhTrangColor: "orange",
        Detail: [
          {
            LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
            GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
          {
            LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            GiaoHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
        ],
      },
      //
      dataEditCN: {
        ID: "DH001",
        BSX: "51P1-1245",
        TaiXe: "Nguyễn Văn A",
        LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
        TraHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
        HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
        CapCo: "Không",
        QuaTai: "Không",
        CauHang: "Tự Cẩu",
        DonViCau: "53PS-12353",
        TrinhTrang: "Chờ tài xế xác nhận",
        TrinhTrangColor: "orange",
        SoLuong: "2x20f",
        Detail: [
          {
            LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
            GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            HaRong: "Cảng Cát Lái (11 Đức Hòa Thượng, Đức Hòa, Long An)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
          {
            LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            GiaoHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
            HaRong: "Cảng Cát Lái (11 Đức Hòa Thượng, Đức Hòa, Long An)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
        ],
      },
      //
      dataFormCX: {
        ID: "DH001",
        BSX: "51P1-1245",
        TaiXe: "Nguyễn Văn A",
        LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
        TraHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
        HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
        CapCo: "Không",
        QuaTai: "Không",
        CauHang: "Tự Cẩu",
        DonViCau: "53PS-12353",
        TrinhTrang: "Chờ tài xế xác nhận",
        TrinhTrangColor: "orange",
        SoLuong: "2x20f",
        Detail: [
          {
            LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
            GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            HaRong: "Cảng DH (11 Đức Hòa Thượng, Đức Hòa, Long An)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
          {
            LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            GiaoHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
            HaRong: "Cảng DH (11 Đức Hòa Thượng, Đức Hòa, Long An)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: 1,
            SoLuongGiao: 1,
            TrongLuongLay: 10,
            TrongLuongGiao: 10,
          },
        ],
      },
    };
  },
  created() {
    this.dataFinal = this.dataTable;
  },
  methods: {
    handleSubmit() {
      if (this.typeModal.toUpperCase() == "ADD") {
        this.$refs.refFormAddHangRoiCDD.emitAdd();
      } else {
        this.$refs.refFormAddHangRoiCDD.emitAddDetail();
      }
    },
    handleFilter(key) {
      switch (key) {
        case "ALL":
          this.dataFinal = this.dataTable;
          break;
        case "ETA":
          this.dataFinal = this.dataTable.filter((e) => e.QuaETA == true);
          break;
        case "ETD":
          this.dataFinal = this.dataTable.filter((e) => e.QuaETD == true);
          break;
        case "ST":
          this.dataFinal = this.dataTable.filter((e) => e.SaiTuyen == true);
          break;
        case "QT":
          this.dataFinal = this.dataTable.filter((e) => e.QuaTai == true);
          break;
      }
    },
    //tab
    updateTab(value) {
      this.currentTab = value;
    },
    //
    handleChangeActions(bol, key) {
      switch (key) {
        case "add":
          this.typeAction = key;
          this.isAdd = !bol;
          this.isEdit = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          this.currentTab = 1;
          // this.handleAdd();
          break;
        case "edit":
          console.log(1, "edit", this.typeDonHang);
          if (this.typeDonHang == "HR") {
            setTimeout(() => {
              this.$bvModal.show("modal-add-van-don-hr-tdvd");
            }, 500);
          }
          if (this.typeDonHang == "CN") {
            setTimeout(() => {
              this.$bvModal.show("modal-add-van-don-cn-tdvd");
            }, 500);
          }
          if (this.typeDonHang == "CX") {
            setTimeout(() => {
              this.$bvModal.show("modal-add-van-don-cx-tdvd");
            }, 500);
          }
          break;
        case "delete":
          this.typeAction = key;
          // this.pushHistory();
          // this.deleteModal();
          this.currentTab = 1;
          break;
        case "save":
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          // this.handleSave();
          // this.pushHistory();
          break;
        case "cancel":
          this.typeAction = null;
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.dataForm = { ...this.dataBackup };
          this.dataBackup = null;
          break;
        case "print":
          setTimeout(() => {
            this.$bvModal.show(`modal-print-basic`);
          }, 500);
          break;
        case "import":
          setTimeout(() => {
            this.$bvModal.show(`modal-import-basic`);
          }, 500);
          // this.handleShowImportFile();
          break;
        case "find":
          setTimeout(() => {
            this.$bvModal.show(`modal-find-${this.keyComponent}`);
          }, 500);
          break;
      }
    },
    updateFirstIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = 0;
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updatePreIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == 0) {
        this.currentIndex = 0;
      } else {
        this.currentIndex -= 1;
      }
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateNextIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == this.dataTable.length - 1) {
        this.currentIndex = this.dataTable.length - 1;
      } else {
        this.currentIndex += 1;
      }
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateLastIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = this.dataTable.length - 1;
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    //
    handleDbClick(row, index) {
      console.log("handleDbClick", row);
      this.currentTab = 1;
      this.typeDonHang = row.type.toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 280px);
  overflow: auto;
  overflow-x: hidden;
}
.box-custom {
  height: calc(100vh - 300px);
  overflow: auto;
  overflow-x: hidden;
}
</style>