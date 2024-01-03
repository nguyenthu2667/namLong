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
                <div class="text-muted"><b> CONT20</b></div>
                <div class="text-primary" style="font-weight: 600">5</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b> CONT40</b></div>
                <div class="text-primary" style="font-weight: 600">5</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">8</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="card p-2 bg-light" style="border: 1px solid #4db847">
            <div class="title text-center mb-2">
              <strong>
                <span style="font-size: 13px; color: #4db847">
                  ĐÃ ĐIỀU ĐỘ XE</span
                >
              </strong>
            </div>
            <div class="sumary d-flex justify-content-between">
              <div class="text-center">
                <div class="text-muted"><b>HÀNG HÓA</b></div>
                <div class="text-primary" style="font-weight: 600">Thép</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b> CONT20</b></div>
                <div class="text-primary" style="font-weight: 600">4</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b> CONT40</b></div>
                <div class="text-primary" style="font-weight: 600">4</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">6</div>
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
                <div class="text-muted"><b>CONT20</b></div>
                <div class="text-primary" style="font-weight: 600">2</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>CONT40</b></div>
                <div class="text-primary" style="font-weight: 600">2</div>
              </div>
              <div class="text-center">
                <div class="text-muted"><b>DỰ KIẾN XE</b></div>
                <div class="text-primary" style="font-weight: 600">3</div>
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
      :id="`modal-add-van-don-cn`"
      centered
      size="xl"
      title="THÊM VẬN ĐƠN ĐIỀU XE"
      @ok="handleSubmit"
    >
      <FormAdd
        :type="type"
        :showDonHangDieuDo="false"
        :typeModal="typeModal"
        ref="refFormAddHangRoiCNCDD"
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
          QuaTai: true,
          QuaETA: true,
          QuaETD: true,
          SaiTuyen: true,
          ChuyenGhep: true,
          CapCo: true,
          SDT: "0961421396",
          createDate: "08:00 20/10/2022",
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
        },
        {
          ID: "VD002",
          BSX: "51P1-1245",
          TaiXe: "Nguyễn Văn A",
          LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
          TraHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
          HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
          CapCo: "Có",
          QuaTai: "Có",
          CauHang: "Tự Cẩu",
          DonViCau: "53PS-12353",
          TrinhTrang: "Đang đi giao",
          TrinhTrangColor: "green",
          SoLuong: "2x20f",
          QuaTai: false,
          QuaETA: true,
          QuaETD: false,
          SaiTuyen: true,
          ChuyenGhep: false,
          CapCo: true,
          SDT: "0961421396",
          createDate: "08:00 20/10/2022",
          Detail: [
            {
              type: "CN",
              LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
              GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
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
              HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
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
      obj.SoLuong = "2x20f";
      obj.HaRong = "Cảng cát lái (42 Cát Lái, Đồng Nai)";
      obj.QuaTai = "Có";
      obj.CapCo = "Có";
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
        QuaTai: true,
        QuaETA: true,
        QuaETD: true,
        SaiTuyen: true,
        ChuyenGhep: true,
        CapCo: true,
        SDT: "0961421396",
        createDate: "08:00 20/10/2022",
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
      this.itemsVanDon.push(this.dataForm);
      setTimeout(() => {
        this.$notify("success", "THÀNH CÔNG", "Thêm vận đơn thành công!");
      }, 500);
      // if (this.typeModal.toUpperCase() == "ADD") {
      //   this.$refs.refFormAddHangRoiCNCDD.emitAdd();
      // } else {
      //   this.$refs.refFormAddHangRoiCNCDD.emitAddDetail();
      // }
    },
    remove(row) {
      this.itemsVanDon = this.itemsVanDon.filter((r) => r.ID != row.ID);
    },
    handleEdit(row) {
      this.typeModal = "EDIT";
      this.dataForm = row;
      setTimeout(() => {
        this.$bvModal.show("modal-add-van-don-cn");
      }, 500);
    },
    handleModalAdd() {
      this.typeModal = "ADD";
      this.dataForm = null;
      setTimeout(() => {
        this.$bvModal.show("modal-add-van-don-cn");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>