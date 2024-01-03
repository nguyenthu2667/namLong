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
    <b-tabs v-model="currentTab" nav-class="d-none ">
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
              <b>TẤT CẢ (10)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('Khác')"
            >
              <b>ĐANG CHẠY HÀNG (7)</b>
            </b-button>
            <b-button
              squared
              variant="outline-primary"
              class="mb-1"
              @click="handleFilter('Đang trống')"
            >
              <b>ĐANG TRỐNG (3)</b>
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
                <b-form-input placeholder="Nhập tìm.." />
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
          <Detail></Detail>
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
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import Status from "@/components/Badges/StatusColor.vue";
import Detail from "./xem-cho-dieu-do/Detail.vue";

export default {
  components: {
    Detail,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
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
          label: "Biển số xe",
        },
        {
          key: "Name",
          label: "Tài xế",
        },
        {
          key: "ThoiGianHoatDong",
          label: "T/gian hoạt động",
        },
        {
          key: "DoanhThu",
          label: "Lương tài xế",
          tdClass: "text-right",
        },
        {
          key: "SoChuyen",
          label: "Số chuyến",
          tdClass: "text-right",
        },
        {
          key: "StatusName",
          label: "Trạng thái",
          typeCol: "status",
        },
        {
          key: "VanDon",
          label: "Vận đơn",
        },
        {
          key: "LoaiHang",
          label: "Loại Hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "DKHT",
          label: "DK Hoàn Thành",
        },
      ],
      dataTable: [
        {
          ID: "59P1-45654",
          Name: "Nguyễn Văn A",
          DoanhThu: "10,000,000",
          ThoiGianHoatDong: "5 giờ",
          StatusName: "Đang đi hạ rỗng",
          StatusNameColor: "#9b59b6",
          VanDon: "VD003",
          SoLuongDon: 5,
          KhachHang: "Công ty A",
          DKHT: "21:00 21/11/2022",
          LoaiHang: "Cont nhập",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-43123",
          Name: "Nguyễn Văn B",
          DoanhThu: "15,000,000",
          ThoiGianHoatDong: "3 giờ",
          StatusName: "Chờ lên hàng",
          StatusNameColor: "Orange",
          VanDon: "VD001",
          SoLuongDon: 3,
          KhachHang: "Công ty B",
          DKHT: "09:00 21/11/2022",
          LoaiHang: "Cont xuất",
          SoChuyen: "3 ",
        },
        {
          ID: "59P1-43119",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "6 giờ",
          StatusName: "Đang đi hạ rỗng",
          StatusNameColor: "#9b59b6",
          VanDon: "VD009",
          SoLuongDon: 2,
          KhachHang: "Công ty C",
          DKHT: "12:00 21/11/2022",
          LoaiHang: "Hàng rời",
          SoChuyen: "3 ",
        },
        {
          ID: "59P1-43118",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "5 giờ",
          StatusName: "Đang đóng hàng",
          StatusNameColor: "green",
          VanDon: "VD008",
          SoLuongDon: 4,
          KhachHang: "Công ty C",
          DKHT: "12:00 21/11/2022",
          LoaiHang: "Hàng rời",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-43122",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "2 giờ",
          StatusName: "Đang trống",
          StatusNameColor: "Gray",
          VanDon: "--",
          SoLuongDon: 2,
          KhachHang: "--",
          DKHT: "--",
          LoaiHang: "--",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-43131",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "5 giờ",
          StatusName: "Đang trống",
          StatusNameColor: "Gray",
          VanDon: "--",
          SoLuongDon: 2,
          KhachHang: "--",
          DKHT: "--",
          LoaiHang: "--",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-86756",
          Name: "Nguyễn Văn B",
          DoanhThu: "15,000,000",
          ThoiGianHoatDong: "8 giờ",
          StatusName: "Chờ lên hàng",
          StatusNameColor: "Orange",
          VanDon: "VD001",
          SoLuongDon: 3,
          KhachHang: "Công ty B",
          DKHT: "09:00 21/11/2022",
          LoaiHang: "Cont xuất",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-44223",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "5 giờ",
          StatusName: "Đang đi hạ rỗng",
          StatusNameColor: "#9b59b6",
          VanDon: "VD009",
          SoLuongDon: 2,
          KhachHang: "Công ty C",
          DKHT: "12:00 21/11/2022",
          LoaiHang: "Hàng rời",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-22223",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "4 giờ",
          StatusName: "Đang đóng hàng",
          StatusNameColor: "green",
          VanDon: "VD008",
          SoLuongDon: 2,
          KhachHang: "Công ty C",
          DKHT: "12:00 21/11/2022",
          LoaiHang: "Hàng rời",
          SoChuyen: "2 ",
        },
        {
          ID: "59P1-43312",
          Name: "Nguyễn Văn C",
          DoanhThu: "17,000,000",
          ThoiGianHoatDong: "5 giờ",
          StatusName: "Đang trống",
          StatusNameColor: "Gray",
          VanDon: "--",
          SoLuongDon: 2,
          KhachHang: "--",
          DKHT: "--",
          LoaiHang: "--",
          SoChuyen: "2 ",
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
        case "Khác":
          this.dataFinal = this.dataTable.filter(
            (e) =>
              e.StatusName == "Chờ lên hàng" ||
              e.StatusName == "Đang đi hạ rỗng" ||
              e.StatusName == "Đang đóng hàng"
          );
          break;
        case "Đang trống":
          this.dataFinal = this.dataTable.filter(
            (e) => e.StatusName == "Đang trống"
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
      console.log("handleDbClick", row);
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