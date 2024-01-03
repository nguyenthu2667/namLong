<template>
  <div>
    <b-row>
      <!-- <b-col lg="12">
        <div class="text-info">
          <strong
            ><i class="fas fa-truck-loading mr-1"></i
            ><span style="font-size: 11px">LẤY HÀNG</span></strong
          >
        </div>
        <b-table bordered :fields="fieldsHR" :items="dataHRL"> </b-table>
        <div class="text-success">
          <strong
            ><i class="fas fa-box-check mr-1"></i
            ><span style="font-size: 11px">GIAO HÀNG</span></strong
          >
        </div>
        <b-table bordered :fields="fieldsHR" :items="dataHRG"> </b-table>
      </b-col> -->
      <b-col lg="12">
        <div class="d-flex justify-content-between">
          <div>
            <strong
              ><span style="font-size: 13px">
                <i class="fas fa-paste ml-1"></i>
                KẾ HOẠCH LẤY HÀNG VÀ GIAO HÀNG</span
              ></strong
            >
          </div>
          <div style="font-weight: 650">
            <span class="mr-3"
              >Cẩu hàng: <span class="text-danger">Thuê cẩu</span></span
            >
            <span>Xe cẩu: <span class="text-danger"> 59P1-12345</span></span>
          </div>
        </div>
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Status from "@/components/Badges/StatusColor.vue";

export default {
  components: {
    Status,
  },
  data() {
    return {
      fieldsHR: [
        {
          key: "Name",
          label: "Kho hàng",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "TrongLuong",
          label: "Trọng lượng",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        // {
        //   key: "fromDate",
        //   label: "Thời gian từ",
        // },
        // {
        //   key: "toDate",
        //   label: "Thời gian đến",
        // },
        {
          key: "LienHe",
          label: "Liên hệ",
        },
        {
          key: "phone",
          label: "Điện thoại",
        },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      dataHRL: [
        {
          ID: 0,
          Name: "Thủ Đức",
          Address: "13 Đồng khánh, Phú Nhuận",
          YeuCau: "Không bóc keo",
          fromDate: "11:30 16-11-2022",
          toDate: "18:00 15-11-2022",
          SoLuong: "5 cuộn",
          TrongLuong: "80tấn",
          LienHe: "Anh Tú",
          phone: "0961421396",
        },
      ],
      dataHRG: [
        {
          Name: "Phú nhuận",
          Address: "43R Hồ văn huê, Phú Nhuận",
          YeuCau: "Khai báo abc",
          fromDate: "19:30 15-11-2022",
          toDate: "22:00 15-11-2022",
          SoLuong: "5 cuộn",
          TrongLuong: "80tấn",
          LienHe: "Anh C",
          phone: "0912212133",
        },
      ],
      fieldsVanDon: [
        {
          key: "ID",
          label: "Mã đơn hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        // {
        //   key: "TaiXe",
        //   label: "Tài Xế",
        // },
        {
          key: "LayHang",
          label: "Lấy Hàng",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "TrongLuong",
          label: "Trọng lượng",
        },
        {
          key: "TraHang",
          label: "Giao Hàng",
        },
        // {
        //   key: "CauHang",
        //   label: "Cẩu Hàng",
        // },
        // {
        //   key: "DonViCau",
        //   label: "Đơn Vị Cẩu",
        // },
        // {
        //   key: "TrinhTrang",
        //   label: "Trình trạng",
        // },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      itemsVanDon: [
        {
          ID: "DH001",
          KhachHang: "Công ty A",
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
        {
          ID: "DH002",
          KhachHang: "Công ty B",
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
        // {
        //   ID: "DH/22/09/0003",
        //   KhachHang: "Công ty C",
        //   BSX: "51P1-1245",
        //   TaiXe: "Nguyễn Văn A",
        //   LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
        //   TraHang: "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
        //   CauHang: "Tự Cẩu",
        //   DonViCau: "53PS-12353",
        //   SoLuong: "6 cuộn",
        //   TrongLuong: "60 tấn",
        //   TrinhTrang: "Đang đi giao",
        //   TrinhTrangColor: "green",
        //   Detail: [
        //     {
        //       LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
        //       GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       MatHangLay: "Thép",
        //       MatHangGiao: "Thép",
        //       SoLuongLay: 1,
        //       SoLuongGiao: 1,
        //       TrongLuongLay: 10,
        //       TrongLuongGiao: 10,
        //     },
        //     {
        //       LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       GiaoHang:
        //         "Kho Hàng EDF (43R Hồ Văn Huê,Phường 11, Phú Nhuận, HCM)",
        //       MatHangLay: "Thép",
        //       MatHangGiao: "Thép",
        //       SoLuongLay: 1,
        //       SoLuongGiao: 1,
        //       TrongLuongLay: 10,
        //       TrongLuongGiao: 10,
        //     },
        //   ],
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>