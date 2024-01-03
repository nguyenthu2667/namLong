<template>
  <div class="mt-2">
    <div class="header">
      <div class="text-success">
        <strong
          ><i class="fas fa-paste mr-1"></i>DANH SÁCH VẬN ĐƠN HIỆN TẠI</strong
        >
      </div>
      <div>
        <b-table
          id="npl-table-basic-form"
          class="npl-table-basic-form"
          :fields="fieldsTable"
          :items="dataTable"
          bordered
          responsive
          show-empty
          head-variant="light"
          selectable
          :select-mode="'single'"
        >
          <template #cell(QuaTai)="row">
            <span v-if="row.item.QuaTai">
              <i class="fad fa-exclamation-triangle text-danger"></i>
            </span>
            <span v-else> ➖ </span>
          </template>

          <template #cell(ChuyenGhep)="row">
            <span v-if="row.item.ChuyenGhep">
              <i class="fad fa-exclamation-triangle text-danger"></i>
            </span>
            <span v-else> ➖ </span>
          </template>

          <template #cell(CapCo)="row">
            <span v-if="row.item.CapCo">
              <i class="fad fa-exclamation-triangle text-danger"></i>
            </span>
            <span v-else> ➖ </span>
          </template>

          <template #empty>
            <div class="text-center text-muted">Dữ liệu trống !</div>
          </template>
          <template #emptyfiltered>
            <div class="text-center text-muted">Không tìm thấy kết quả !</div>
          </template>

          <template #cell(TrinhTrang)="row">
            <Status
              :color="row.item[`TrinhTrangColor`]"
              :label="row.item[`TrinhTrang`]"
              :showCircle="false"
            ></Status>
          </template>

          <template #cell(actions)="row">
            <div class="text-center" style="cursor: pointer">
              <i
                class="fas fa-trash-alt text-danger mr-2"
                @click="remove(row.item)"
              ></i>
              <i
                class="fas fa-edit text-warning"
                @click="handleEdit(row.item)"
              ></i>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="content">
      <div class="d-flex justify-content-between">
        <div class="text-primary">
          <strong
            ><i class="fas fa-paste mr-1"></i>DANH SÁCH ĐƠN HÀNG PHÙ HỢP VỚI XE
            ĐANG CHỌN</strong
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
            @click="handleModalAdd"
          >
            <i class="fas fa-plus"></i> <b>Điều độ xe</b>
          </b-button>
        </div>
        <div>
          <b-button
            class="ml-1 mb-1"
            squared
            :variant="`outline-primary`"
            style="
              height: 24px;
              padding: 1px;
              padding-left: 3px;
              padding-right: 3px;
            "
            @click="handleChangeDH('PH')"
          >
            <i class="fas fa-filter"></i> <b>Đơn phù hợp</b>
          </b-button>
          <b-button
            class="ml-1 mb-1"
            squared
            :variant="`outline-primary`"
            style="
              height: 24px;
              padding: 1px;
              padding-left: 3px;
              padding-right: 3px;
            "
            @click="handleChangeDH('ALL')"
          >
            <i class="fas fa-paste mr-1"></i><b>Tất cả</b>
          </b-button>
        </div>
      </div>
      <b-table
        id="npl-table-basic-form"
        class="npl-table-basic-form"
        :fields="fieldsTableDonHang"
        :items="dataTableDonHang"
        bordered
        responsive
        show-empty
        head-variant="light"
        selectable
        :select-mode="'multi'"
        @row-selected="handleSelected"
      ></b-table>
    </div>
    <b-modal
      id="modal-add-xcdd"
      size="xl"
      centered
      title="THÊM"
      @ok="submitAdd"
    >
      <FormAdd
        :type="type"
        :showDonHangDieuDo="false"
        :typeModal="typeModal"
        ref="refFormAddHangRoiCDD"
        :data="dataForm"
        :propsDonHang="propsDonHang"
        @returnAdd="handleAdd"
        @returnAddDetail="handleAddDetail"
      ></FormAdd>
      <!-- <template v-if="typeDonHang && typeDonHang.toUpperCase() == 'HÀNG RỜI'">
        <FormAdd
          :type="'HR'"
          :showDonHangDieuDo="false"
          :typeModal="typeModal"
          ref="refFormAddHangRoiCDD"
          :data="dataForm"
          :propsDonHang="[]"
          @returnAdd="handleAdd"
          @returnAddDetail="handleAddDetail"
        ></FormAdd>
      </template>
      <template v-if="typeDonHang && typeDonHang.toUpperCase() == 'CONT NHẬP'">
        <FormAddHangCNCDD
          ref="refFormAddHangCNCDD"
          :data="dataForm"
          @returnAdd="handleAdd"
        ></FormAddHangCNCDD>
      </template>
      <template v-if="typeDonHang && typeDonHang.toUpperCase() == 'CONT XUẤT'">
        <FormAddHangCXCDD
          ref="refFormAddHangCXCDD"
          :data="dataForm"
          @returnAdd="handleAdd"
        ></FormAddHangCXCDD>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import Status from "@/components/Badges/StatusColor.vue";
import FormAddHangRoiCDD from "../FormAddHangRoiCDD";
import FormAddHangCNCDD from "../FormAddHangCNCDD.vue";
import FormAddHangCXCDD from "../FormAddHangCXCDD.vue";
import moment from "moment";
import FormAdd from "../FormAdd.vue";

export default {
  components: {
    FormAdd,
    FormAddHangCNCDD,
    FormAddHangRoiCDD,
    FormAddHangCXCDD,
    Status,
  },
  data() {
    return {
      propsDonHang: [],
      type: null,
      typeModal: null,
      itemsSelected: [],
      fieldsTable: [
        {
          key: "ID",
          label: "Mã Vận Đơn",
        },
        {
          key: "createDate",
          label: "Ngày",
        },
        {
          key: "BSX",
          label: "Số Xe",
        },
        {
          key: "TaiXe",
          label: "Tài Xế",
        },
        {
          key: "SDT",
          label: "Điện thoại",
        },
        {
          key: "QuaTai",
          label: "Quá tải",
        },
        {
          key: "ChuyenGhep",
          label: "Chuyến ghép",
        },
        {
          key: "CapCo",
          label: "Cặp cổ",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
        // {
        //   key: "ID",
        //   label: "Mã vận đơn",
        // },
        // {
        //   key: "BSX",
        //   label: "Số xe",
        // },
        // {
        //   key: "QuaTai",
        //   label: "Quá Tải",
        //   typeCol: "icon",
        //   tdClass: "text-center",
        // },
        // {
        //   key: "QuaETA",
        //   label: "Quá ETA",
        //   typeCol: "icon",
        //   tdClass: "text-center",
        // },
        // {
        //   key: "QuaETD",
        //   label: "Quá ETD",
        //   typeCol: "icon",
        //   tdClass: "text-center",
        // },
        // {
        //   key: "SaiTuyen",
        //   label: "Sai Tuyến",
        //   typeCol: "icon",
        //   tdClass: "text-center",
        // },
        // {
        //   key: "DKETD",
        //   label: "DK Lấy hàng",
        // },
        // {
        //   key: "DKETA",
        //   label: "DK Giao hàng",
        // },
        // {
        //   key: "Status",
        //   label: "Trình Trạng",
        //   typeCol: "status",
        // },
        // {
        //   key: "DKCT",
        //   label: "DK Chứng Từ",
        //   typeCol: "isDoc",
        //   tdClass: "text-center",
        // },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        //   tdClass: "text-center",
        // },
      ],
      dataTable: [
        // {
        //   ID: "VD001",
        //   BSX: "20P1-2011",
        //   QuaTai: true,
        //   QuaETA: true,
        //   QuaETD: true,
        //   SaiTuyen: true,
        //   DKETD: "08:00 20/10/2022",
        //   DKETA: "20:00 20/10/2022",
        //   DKHT: "08:00 20/10/2022",
        //   Status: "Đang đi giao",
        //   StatusColor: "green",
        //   DKCT: true,
        //   type: "HR",
        // },
        // {
        //   ID: "VD002",
        //   BSX: "20P1-2022",
        //   QuaTai: false,
        //   QuaETA: true,
        //   QuaETD: false,
        //   SaiTuyen: true,
        //   DKETD: "08:00 20/10/2022",
        //   DKETA: "20:00 20/10/2022",
        //   DKHT: "09:00 16/10/2022",
        //   Status: "Đang đóng hàng",
        //   StatusColor: "orange",
        //   DKCT: false,
        //   type: "CN",
        // },
        // {
        //   ID: "VD003",
        //   BSX: "20P1-2033",
        //   QuaTai: true,
        //   QuaETA: false,
        //   QuaETD: true,
        //   SaiTuyen: false,
        //   DKETD: "08:00 20/10/2022",
        //   DKETA: "20:00 20/10/2022",
        //   DKHT: "10:00 16/10/2022",
        //   Status: "Đang đóng hàng",
        //   StatusColor: "orange",
        //   DKCT: true,
        //   type: "CX",
        // },
      ],
      fieldsTableDonHang: [
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
      dataTableDonHang: [
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
      dataTablePH: [
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
      dataTableAll: [
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
        {
          ID: "DH004",
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
          ID: "DH005",
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
          ID: "DH006",
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
      typeDonHang: null,
      dataForm: null,
    };
  },
  methods: {
    handleChangeDH(key) {
      if (key == "PH") {
        this.dataTableDonHang = this.dataTablePH;
      } else {
        this.dataTableDonHang = this.dataTableAll;
      }
    },
    handleAddDetail(obj) {
      this.dataTable.forEach((e) => {
        if (e.ID == obj.ID) {
          e.Detail = obj.Detail;
        }
      });
    },
    submitAdd() {
      let obj = {
        ...this.dataForm,
        ID: `VD00${this.dataTable.length + 1}`,
        QuaTai: true,
        QuaETA: true,
        QuaETD: true,
        SaiTuyen: true,
        DKETD: "08:00 20/10/2022",
        DKETA: "20:00 20/10/2022",
        DKHT: "08:00 20/10/2022",
        Status: "Chờ tài xế xác nhận",
        StatusColor: "orange",
        DKCT: true,
        type: "HR",
        DKETD: this.dataForm.LayHang,
        DKETA: this.dataForm.TraHang,
        BSX: this.dataForm.BSX,
        SaiTuyen: true,
        CapCo: true,
        ChuyenGhep: false,
        SDT: "0961421396",
        createDate: "08:00 20/10/2022",
      };
      this.dataTable.push(obj);
      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Thêm vận đơn thành công!");
      }, 500);
      // if (this.typeDonHang && this.typeDonHang.toUpperCase() == "HÀNG RỜI") {
      //   this.$refs.refFormAddHangRoiCDD.emitAdd();
      // }
      // if (this.typeDonHang && this.typeDonHang.toUpperCase() == "CONT NHẬP") {
      //   this.$refs.refFormAddHangCNCDD.emitAdd();
      // }
      // if (this.typeDonHang && this.typeDonHang.toUpperCase() == "CONT XUẤT") {
      //   this.$refs.refFormAddHangCXCDD.emitAdd();
      // }
    },
    handleAdd(dataForm) {
      let obj = {
        QuaTai: true,
        QuaETA: true,
        QuaETD: true,
        SaiTuyen: true,
        DKETD: "08:00 20/10/2022",
        DKETA: "20:00 20/10/2022",
        DKHT: "08:00 20/10/2022",
        Status: "Chờ tài xế xác nhận",
        StatusColor: "orange",
        DKCT: true,
        type: "HR",
        DKETD: dataForm.LayHang,
        DKETA: dataForm.TraHang,
        BSX: dataForm.BSX,
        ...dataForm,
      };
      let check = this.dataTable.every((e) => e.ID != obj.ID);
      if (!check) {
        this.dataTable.forEach((e) => {
          if (e.ID == obj.ID) {
            e = obj;
          }
        });
      } else {
        this.dataTable.push(obj);
      }
    },
    handleModalAdd() {
      if (this.itemsSelected?.length > 0) {
        if (this.itemsSelected[0].LoaiHang.toUpperCase() == "HÀNG RỜI") {
          this.type = "HR";
          this.dataForm = {
            ID: "DH001",
            BSX: "51P1-1245",
            TaiXe: "Nguyễn Văn A",
            LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
            TraHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
            CauHang: "Tự Cẩu",
            DonViCau: "53PS-12353",
            SoLuong: "5 cuộn",
            TrongLuong: "50 tấn",
            TrinhTrang: "Chờ xác nhận",
            TrinhTrangColor: "orange",
            Detail: [
              {
                type: "HR",
                LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
                GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
                MatHangLay: "Thép",
                MatHangGiao: "Thép",
                SoLuongLay: "1 Cuộn",
                SoLuongGiao: "1 Cuộn",
                TrongLuongLay: "10 Tấn",
                TrongLuongGiao: "10 Tấn",
              },
              {
                type: "HR",
                LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
                GiaoHang:
                  "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
                MatHangLay: "Thép",
                MatHangGiao: "Thép",
                SoLuongLay: "1 Cuộn",
                SoLuongGiao: "1 Cuộn",
                TrongLuongLay: "10 Tấn",
                TrongLuongGiao: "10 Tấn",
              },
            ],
          };
          this.propsDonHang = this.itemsSelected;
          setTimeout(() => {
            this.$bvModal.show("modal-add-xcdd");
          }, 500);
        }
        if (this.itemsSelected[0].LoaiHang.toUpperCase() == "CONT NHẬP") {
          this.type = "CN";
          this.dataForm = {
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
                type: "CN",
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
                type: "CN",
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
          };
          this.propsDonHang = this.itemsSelected;
          setTimeout(() => {
            this.$bvModal.show("modal-add-xcdd");
          }, 500);
        }
        if (this.itemsSelected[0].LoaiHang.toUpperCase() == "CONT XUẤT") {
          this.type = "CX";
          this.dataForm = {
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
                type: "CX",
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
                type: "CX",
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
          };
          this.propsDonHang = this.itemsSelected;
          setTimeout(() => {
            this.$bvModal.show("modal-add-xcdd");
          }, 500);
        }
      } else {
        this.$notify("warning", "THẤT BẠI", "Bạn chưa chọn đơn hàng !");
      }
    },
    handleSelected(values) {
      this.itemsSelected = values;
    },
    remove(row) {
      this.dataTable = this.dataTable.filter((e) => e.ID != row.ID);
    },
    handleEdit(row) {
      if (row.type == "HR") {
        this.typeDonHang = "hàng rời";
      }
      if (row.type == "CX") {
        this.typeDonHang = "cont xuất";
      }
      if (row.type == "CN") {
        this.typeDonHang = "cont nhập";
      }
      this.dataForm = row;
      setTimeout(() => {
        this.$bvModal.show("modal-add-xcdd");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>