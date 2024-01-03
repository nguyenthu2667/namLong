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
      :showEdit="false"
      :showDelete="false"
      :showSave="false"
      :showCancel="false"
      :showBlock="false"
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
              @click="handleFilter('Hàng rời')"
            >
              <b>HÀNG RỜI (1)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('Cont nhập')"
            >
              <b>CONT NHẬP (1)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('Cont xuất')"
            >
              <b>CONT XUẤT (1)</b>
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
                  :options="['Chờ khóa', 'Đã Khóa']"
                />
                <b-form-input v-else placeholder="Nhập tìm.." />
              </td>
            </template>
          </b-table>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <template v-if="typeDonHang.toUpperCase() == 'HÀNG RỜI'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐƠN HÀNG RỜI DH001</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <FormHangRoi></FormHangRoi>
          </template>
          <template v-else-if="typeDonHang.toUpperCase() == 'CONT NHẬP'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐƠN CONT NHẬP DH002</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <FormContNhap></FormContNhap>
          </template>
          <template v-else-if="typeDonHang.toUpperCase() == 'CONT XUẤT'">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>ĐƠN CONT XUẤT DH/22/09/0003</strong>
              <b-dropdown
                class="title-dropdown"
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
              >
              </b-dropdown>
              <hr class="m-0" />
            </div>
            <FormContXuat></FormContXuat>
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
  </div>
</template>

<script>
import { en, vi } from "vuejs-datepicker/dist/locale";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import FormHangRoi from "./FormHangRoi.vue";
import FormContXuat from "./FormContXuat.vue";
import FormContNhap from "./FormContNhap.vue";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    "v-select": vSelect,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    FormHangRoi,
    FormContNhap,
    FormContXuat,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
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
          label: "Mã đơn hàng",
        },
        {
          key: "Date",
          label: "Ngày đơn hàng",
        },
        {
          key: "Date",
          label: "Ngày đơn hàng",
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
          key: "HangHoa",
          label: "Hàng hóa",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "TrongLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "XeDuKien",
          label: "Dự kiến (xe)",
          tdClass: "text-right",
        },
        {
          key: "SoLuongXeDaDieu",
          label: "Điều độ (xe)",
          tdClass: "text-right",
        },
        {
          key: "DuKienLayHang",
          label: "Dự kiến lấy hàng",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "TienDo",
          label: "Tiến độ",
          tdClass: "text-center",
        },
      ],
      dataTable: [
        {
          ID: "DH001",
          Date: "20/11/2022",
          KhachHang: "Công ty A",
          LoaiHang: "Hàng rời",
          HangHoa: "Thép",
          SoLuong: "20 Cuộn",
          TrongLuong: "2 Tấn",
          XeDuKien: 15,
          SoLuongXeDaDieu: 10,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "SG-LA (Sài Gòn - Long An)",
          TienDo: "1/3 30%",
        },
        {
          ID: "DH002",
          Date: "20/11/2022",
          KhachHang: "Công ty B",
          LoaiHang: "Cont nhập",
          HangHoa: "Giấy",
          SoLuong: "30 Tấm",
          TrongLuong: "3 Tấn",
          XeDuKien: 21,
          SoLuongXeDaDieu: 12,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "AG-BT (An Giang - Ben Tree)",
          TienDo: "1/2 40%",
        },
        {
          ID: "DH003",
          Date: "20/11/2022",
          KhachHang: "Công ty C",
          LoaiHang: "Cont xuất",
          HangHoa: "Ván",
          SoLuong: "20 Tấm",
          TrongLuong: "2 Tấn",
          XeDuKien: 21,
          SoLuongXeDaDieu: 15,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "CL-SG (Cát Lái - Sài Gòn)",
          TienDo: "1/2 50%",
        },
      ],
      dataFinal: [],
      //type
      typeDonHang: "",
    };
  },
  created() {
    this.dataFinal = this.dataTable;
  },
  methods: {
    handleFilter(key) {
      switch (key) {
        case "ALL":
          this.dataFinal = this.dataTable;
          break;
        case "Hàng rời":
          this.dataFinal = this.dataTable.filter(
            (e) => e.LoaiHang == "Hàng rời"
          );
          break;
        case "Cont nhập":
          this.dataFinal = this.dataTable.filter(
            (e) => e.LoaiHang == "Cont nhập"
          );
          break;
        case "Cont xuất":
          this.dataFinal = this.dataTable.filter(
            (e) => e.LoaiHang == "Cont xuất"
          );
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
          this.typeAction = key;
          this.isEdit = !bol;
          this.isAdd = true;
          this.isDelete = true;
          // this.dataBackup = { ...this.dataForm };
          this.currentTab = 1;
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
      this.typeDonHang = row.LoaiHang.toUpperCase();
      this.currentTab = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 280px);
  overflow: auto;
}
.box-custom {
  height: calc(100vh - 300px);
  overflow: auto;
}
</style>