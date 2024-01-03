<template>
  <div>
    <div class="header">
      <b-row>
        <b-col lg="4">
          <div
            class="card p-2 bg-light"
            style="border: 1px solid #005aab; margin-left: 25px"
          >
            <div class="title text-center mb-2">
              <strong>
                <span style="font-size: 13px; color: #005aab"
                  >KẾ HOẠCH VẬN CHUYỂN</span
                >
              </strong>
            </div>
            <div class="sumary d-flex justify-content-between">
              <div class="text-center">
                <div class="text-muted"><b>HÀNG HÓA</b></div>
                <div class="text-primary" style="font-weight: 600">Thép</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>SỐ LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">6 Cuộn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>TRỌNG LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">6 Tấn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">3</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="card p-2 bg-light" style="border: 1px solid #4db847">
            <div class="title text-center mb-2">
              <strong>
                <span style="font-size: 13px; color: #4db847"
                  >ĐÃ ĐIỀU ĐỘ XE</span
                >
              </strong>
            </div>
            <div class="sumary d-flex justify-content-between">
              <div class="text-center">
                <div class="text-muted"><b>HÀNG HÓA</b></div>
                <div class="text-primary" style="font-weight: 600">Thép</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>SỐ LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">4 Cuộn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>TRỌNG LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">4 Tấn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">2</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <div
            class="card p-2 bg-light"
            style="border: 1px solid #f3701b; margin-right: 25px"
          >
            <div class="title text-center mb-2">
              <strong>
                <span style="font-size: 13px; color: #f3701b"
                  >KẾ HOẠCH CÒN LẠI</span
                >
              </strong>
            </div>
            <div class="sumary d-flex justify-content-between">
              <div class="text-center">
                <div class="text-muted"><b>HÀNG HÓA</b></div>
                <div class="text-primary" style="font-weight: 600">Thép</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>SỐ LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">2 Cuộn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>TRỌNG LƯỢNG</b></div>
                <div class="text-primary" style="font-weight: 600">2 Tấn</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">1</div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="content">
      <div class="title mt-3 mb-1">
        <strong>
          <span style="font-size: 13px">CHI TIẾT VẬN ĐƠN</span>
        </strong>
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
          <i class="fas fa-plus"></i> <b>Điều Xe</b>
        </b-button>
      </div>
      <div>
        <b-table
          show-empty
          bordered
          head-variant="light"
          :fields="fieldsVanDon"
          :items="itemsVanDon"
        >
          <template #cell(TrinhTrang)="row">
            <Status
              :color="row.item[`TrinhTrangColor`]"
              :label="row.item[`TrinhTrang`]"
              :showCircle="false"
            ></Status>
          </template>
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
    <b-modal
      :id="`modal-add-van-don-hr`"
      centered
      size="xl"
      title="THÊM VẬN ĐƠN ĐIỀU XE"
      @ok="handleSubmit"
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
    </b-modal>
  </div>
</template>

<script>
import Status from "@/components/Badges/StatusColor.vue";
import FormAdd from "./FormAdd.vue";
export default {
  props: ["type", "propsDonHang"],
  components: {
    FormAdd,
    Status,
  },
  data() {
    return {
      typeModal: null,
      dataForm: null,
      fieldsVanDon: [
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
      ],
      itemsVanDon: [
        {
          ID: "VD001",
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
          QuaTai: true,
          QuaETA: true,
          QuaETD: true,
          SaiTuyen: true,
          ChuyenGhep: true,
          CapCo: true,
          SDT: "0961421396",
          createDate: "08:00 20/10/2022",
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "08:00 20/10/2022",
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
        },
        {
          ID: "VD002",
          BSX: "51P1-1245",
          TaiXe: "Nguyễn Văn A",
          LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
          TraHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
          CauHang: "Tự Cẩu",
          DonViCau: "53PS-12353",
          SoLuong: "6 cuộn",
          TrongLuong: "60 tấn",
          TrinhTrang: "Đang đi giao",
          TrinhTrangColor: "green",
          QuaTai: false,
          QuaETA: true,
          QuaETD: false,
          SaiTuyen: true,
          ChuyenGhep: false,
          CapCo: true,
          SDT: "0961421396",
          createDate: "08:00 20/10/2022",
          DKETD: "08:00 20/10/2022",
          DKETA: "20:00 20/10/2022",
          DKHT: "08:00 20/10/2022",
          Detail: [
            {
              type: "HR",
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
              type: "HR",
              LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              GiaoHang:
                "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
              MatHangLay: "Thép",
              MatHangGiao: "Thép",
              SoLuongLay: 1,
              SoLuongGiao: 1,
              TrongLuongLay: 10,
              TrongLuongGiao: 10,
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleAdd(obj) {
      obj.SoLuong = "6 cuộn";
      obj.TrongLuong = "60 tấn";
      // obj.BSX = "51P1-1245";
      // obj.TaiXe = "Nguyễn Văn A";
      // obj.CauHang = "Tự cẩu";
      // obj.DonViCau = "53PS-12353";
      obj.TrinhTrang = "Chờ tài xế xác nhận";
      obj.TrinhTrangColor = "orange";
      this.itemsVanDon.push(obj);
    },
    handleAddDetail(obj) {
      this.itemsVanDon.forEach((e) => {
        if (e.ID == obj.ID) {
          e.Detail = obj.Detail;
        }
      });
    },
    handleSubmit() {
      this.dataForm = {
        ID: "VD003",
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
        QuaTai: true,
        QuaETA: true,
        QuaETD: true,
        SaiTuyen: true,
        ChuyenGhep: true,
        CapCo: true,
        SDT: "0961421396",
        createDate: "08:00 20/10/2022",
        DKETD: "08:00 20/10/2022",
        DKETA: "20:00 20/10/2022",
        DKHT: "08:00 20/10/2022",
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
            GiaoHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
            MatHangLay: "Thép",
            MatHangGiao: "Thép",
            SoLuongLay: "1 Cuộn",
            SoLuongGiao: "1 Cuộn",
            TrongLuongLay: "10 Tấn",
            TrongLuongGiao: "10 Tấn",
          },
        ],
      };
      this.itemsVanDon.push(this.dataForm);
      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Thêm vận đơn thành công!");
      }, 500);
      // if (this.typeModal.toUpperCase() == "ADD") {
      //   this.$refs.refFormAddHangRoiCDD.emitAdd();
      // } else {
      //   this.$refs.refFormAddHangRoiCDD.emitAddDetail();
      // }
    },
    remove(row) {
      this.itemsVanDon = this.itemsVanDon.filter((r) => r.ID != row.ID);
    },
    handleEdit(row) {
      this.typeModal = "EDIT";
      this.dataForm = row;
      setTimeout(() => {
        this.$bvModal.show("modal-add-van-don-hr");
      }, 500);
    },
    handleModalAdd() {
      this.typeModal = "ADD";

      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Thêm vận đơn thành công!");
        this.$bvModal.show("modal-add-van-don-hr");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>