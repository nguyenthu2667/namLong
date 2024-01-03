<template>
  <div class="duyet-chi-phi">
    <div class="box-content custom-box">
      <div class="text-right mb-2">
        <b-button
          squared
          variant="primary"
          class="mb-1"
          @click="handleFilter('TATCA')"
        >
          <b>TẤT CẢ (4)</b>
        </b-button>
        <b-button
          squared
          variant="warning"
          class="mb-1"
          @click="handleFilter('CHODUYET')"
        >
          <b>CHỜ DUYỆT (1)</b>
        </b-button>
        <b-button
          squared
          variant="success"
          class="mb-1"
          @click="handleFilter('DADUYET')"
        >
          <b>ĐÃ DUYỆT (2)</b>
        </b-button>
        <b-button
          squared
          variant="danger"
          class="mb-1"
          @click="handleFilter('TUCHOI')"
        >
          <b>TỪ CHỐI (1)</b>
        </b-button>
      </div>
      <b-table
        style="height: calc(100vh - 350px)"
        id="npl-table-basic-form"
        class="npl-table-basic-form"
        :fields="fieldsTable"
        :items="dataTableFinal"
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
        <template v-slot:cell(Status)="row">
          <div>
            <Status
              :color="row.item.StatusColor"
              :label="row.item.Status"
              :showCircle="false"
            ></Status>
          </div>
        </template>
      </b-table>
      <b-pagination
        align="center"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
      >
        <template v-slot:next-text>
          <i class="simple-icon-arrow-right" />
        </template>
        <template v-slot:prev-text>
          <i class="simple-icon-arrow-left" />
        </template>
        <template v-slot:first-text>
          <i class="simple-icon-control-start" />
        </template>
        <template v-slot:last-text>
          <i class="simple-icon-control-end" />
        </template>
      </b-pagination>
    </div>
    <b-modal
      :id="`modal-duyet`"
      size="md"
      title="THÔNG TIN XÉT DUYỆT"
      hide-footer
      centered
    >
      <b-row>
        <b-col lg="12">
          <div class="d-flex justify-content-center mb-2">
            <b-form-checkbox class="mr-4" name="some-radios">
              <b>Đồng ý </b></b-form-checkbox
            >
            <b-form-checkbox name="some-radios"><b>Từ Chối</b></b-form-checkbox>
          </div>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Số tiền phê duyệt" size="sm">
            <b-form-input></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Nội dung phê duyệt" size="sm">
            <b-form-textarea rows="2" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="text-right">
        <b-button squared variant="info"> Hủy</b-button>
        <b-button squared variant="success" @click="hideModal">
          Xác nhận
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  components: {
    "v-select": vSelect,
    Status,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      fieldsTable: [
        {
          key: "NghiepVu",
          label: "Nghiệp vụ",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "VanDon",
          label: "Vận đơn",
        },
        {
          key: "BSX",
          label: "Biển số xe",
        },
        {
          key: "TypeOption",
          label: "Mục phí",
        },
        {
          key: "Money",
          label: "Số tiền đề xuất",
          tdClass: "text-right",
        },
        {
          key: "Name",
          label: "Người đề xuất",
        },
        {
          key: "TGDX",
          label: "Thời gian đề xuất",
        },
        {
          key: "STDD",
          label: "Số tiền đã duyệt",
          tdClass: "text-right",
        },
        {
          key: "NguoiDuyet",
          label: "Người duyệt",
        },
        {
          key: "NoiDung",
          label: "Nội dung duyệt",
        },
        {
          key: "Status",
          label: "Trạng thái",
        },
      ],
      dataTable: [
        {
          Type: "Chi phí phát sinh",
          Name: "Nguyễn Văn H",
          TypeOption: "Thủ kho",
          Money: "200,000",
          DonHang: "DH/22/09/00001",
          KhachHang: "Công ty B",
          Status: "Chờ duyệt",
          StatusColor: "orange",
          NghiepVu: "CPPS/22/002",
          VanDon: "VD002",
          BSX: "62P1-60232",
          TGDX: "10:00 15/11/2022",
          STDD: "100,000",
          NguoiDuyet: "Nguyễn Văn Dũng",
          NoiDung: "Thủ kho báo 100k",
        },
        {
          Type: "Chi phí phát sinh",
          Name: "Nguyễn Văn H",
          TypeOption: "Quét rác",
          Money: "100,000",
          DonHang: "DH/22/09/00003",
          KhachHang: "Công ty J",
          Status: "Từ chối",
          StatusColor: "red",
          NghiepVu: "CPPS/22/003",
          VanDon: "VD003",
          BSX: "62P1-60132",
          TGDX: "10:00 15/11/2022",
          STDD: "100,000",
          NguoiDuyet: "Nguyễn Văn Dũng",
          NoiDung: "Thủ kho báo 100k",
        },
        {
          Type: "Chi phí phát sinh",
          Name: "Nguyễn Văn A",
          TypeOption: "Bốc xếp",
          Money: "100,000",
          DonHang: "DH/22/09/00002",
          KhachHang: "Công ty B",
          Status: "Đã duyệt",
          StatusColor: "green",
          NghiepVu: "CPPS/22/001",
          VanDon: "VD001",
          BSX: "62P1-60237",
          TGDX: "10:00 15/11/2022",
          STDD: "100,000",
          NguoiDuyet: "Nguyễn Văn Dũng",
          NoiDung: "Thủ kho báo 100k",
        },
        {
          Type: "Doanh thu phát sinh",
          Name: "Nguyễn Văn C",
          TypeOption: "Neo xe",
          Money: "600,000",
          DonHang: "DH/22/09/00004",
          KhachHang: "Công ty F",
          Status: "Đã duyệt",
          StatusColor: "green",
          NghiepVu: "CPPS/22/004",
          VanDon: "VD004",
          BSX: "62P1-60235",
          TGDX: "10:00 15/11/2022",
          STDD: "100,000",
          NguoiDuyet: "Nguyễn Văn Dũng",
          NoiDung: "Thủ kho báo 100k",
        },
      ],
      dataTableFinal: [],
      totalRows: this.items?.length > 0 ? this.items.length : 0,
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
    };
  },
  created() {
    this.dataTableFinal = this.dataTable;
  },
  methods: {
    handleFilter(key) {
      switch (key) {
        case "TATCA":
          this.dataTableFinal = this.dataTable;
          break;
        case "DADUYET":
          this.dataTableFinal = this.dataTable.filter(
            (r) => r.StatusColor.toUpperCase() == "GREEN"
          );
          break;
        case "CHODUYET":
          this.dataTableFinal = this.dataTable.filter(
            (r) => r.StatusColor.toUpperCase() == "ORANGE"
          );
          break;
        case "TUCHOI":
          this.dataTableFinal = this.dataTable.filter(
            (r) => r.StatusColor.toUpperCase() == "RED"
          );
          break;
      }
    },
    hideModal() {
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công");
      setTimeout(() => {
        this.$bvModal.hide("modal-duyet");
      }, 500);
    },
    handleDbClick(row) {
      setTimeout(() => {
        this.$bvModal.show("modal-duyet");
      }, 500);
    },
  },
};
</script>
<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 335px);
  overflow: auto;
}
.custom-box {
  height: calc(100vh - 205px);
}
</style>
