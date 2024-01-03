<template>
  <div class="box-content">
    <b-row>
      <!-- <b-col lg="6">
        <b-form-group label="Yêu cầu đặc biệt">
          <b-form-input value="Gắn Xích" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <div class="d-flex align-items-center">
          <b-form-checkbox class="mr-4 mt-4">Hàng Cặp Cổ ?</b-form-checkbox>
          <b-form-checkbox class="mt-4" :checked="true"
            >Quá Tải Không ?</b-form-checkbox
          >
        </div>
      </b-col>
      <b-col lg="12">
        <div class="text-info">
          <strong
            ><i class="fas fa-truck-loading mr-1"></i
            ><span style="font-size: 11px">LẤY RỖNG</span></strong
          >
        </div>
        <div>
          <b-table bordered :fields="fieldsCXL" :items="dataCXL"> </b-table>
        </div>
        <div class="text-success">
          <strong
            ><i class="fas fa-truck-loading mr-1"></i
            ><span style="font-size: 11px">ĐÓNG HÀNG</span></strong
          >
        </div>
        <b-table bordered :fields="fieldsCXG" :items="dataCXG"> </b-table>
        <div style="color: #9b59b6">
          <strong
            ><i class="fas fa-arrow-alt-to-bottom mr-1"></i
            ><span style="font-size: 11px">HẠ HÀNG</span></strong
          >
        </div>
        <div>
          <b-table bordered :fields="fieldsCXHH" :items="dataCXHH"> </b-table>
        </div>
      </b-col> -->
      <b-col lg="12">
        <div class="d-flex justify-content-between">
          <div>
            <strong
              ><span style="font-size: 13px">
                <i class="fas fa-paste ml-1"></i>
                KẾ HOẠCH LẤY RỖNG, ĐÓNG HẠ VÀ HẠ CONT</span
              ></strong
            >
          </div>
          <div style="font-weight: 650">
            <span class="mr-3"
              >Căp cổ: <span class="text-danger">Có </span></span
            >
            <span>Quá tải: <span class="text-danger">Không</span></span>
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
      fieldsCXL: [
        {
          key: "DiaChi",
          label: "Địa chỉ",
        },
        {
          key: "SLcont20",
          label: "Số lượng cont20",
          tdClass: "text-right",
        },
        {
          key: "SLcont40",
          label: "Số lượng cont40",
          tdClass: "text-right",
        },
        {
          key: "TgianLayRongDau",
          label: "Dự kiến lấy rỗng",
        },
        {
          key: "SoLenh",
          label: "Số lệnh",
        },
        {
          key: "FileLenh",
          label: "File lệnh",
        },
        {
          key: "FileLenhDuyet",
          label: "File lệnh duyệt",
        },
        {
          key: "MaSoThue",
          label: "Xuấ mã số thuế",
        },
        // {
        //   key: "TgianLayRongCuoi",
        //   label: "Thời gian lấy rỗng cuối",
        // },
        // {
        //   key: "CtyXHD",
        //   label: "Công ty xuất hóa đơn",
        // },
      ],
      dataCXL: [
        {
          SoLenh: "SL/11/15/001",
          FileLenh: "file-lenh.docx",
          FileLenhDuyet: "file-lenh-duyet.docx",
          SLcont20: "10",
          SLcont40: "20",
          TgianLayRongDau: "18:00 10-11-2022",
          TgianLayRongCuoi: "20:00 12-11-2022",
          CtyXHD: "Công ty A",
          MaSoThue: "MST00129201",
          DiaChi: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCL: "Cảng Vũng Tàu (52 Bà rịa, Phường 11, TP.Vũng tàu)",
          DCT: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCH: "Cảng Cát Lái (65 Cát lái, Phường 12, Đồng nai)",
        },
      ],
      fieldsCXG: [
        // {
        //   key: "Name",
        //   label: "Kho hàng",
        // },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "cont20",
          label: "Số lượng cont20",
          tdClass: "text-right",
        },
        {
          key: "cont40",
          label: "Số lượng cont40",
          tdClass: "text-right",
        },
        {
          key: "fromDate",
          label: "Dự kiến đóng hàng",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "LienHe",
          label: "Liên hệ",
        },
        {
          key: "phone",
          label: "Điện thoại",
        },
        // {
        //   key: "toDate",
        //   label: "Thời gian đến",
        // },
      ],
      fieldsCXHH: [
        {
          key: "CangHa",
          label: "Cảng hạ",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "TgianHaCuoi",
          label: "Thời gian dự kiến",
        },
      ],
      dataCXG: [
        {
          Name: "Kho Quận 1",
          Address: "13 Đồng khánh, Quận 1",
          LienHe: "Anh Tú",
          phone: "0961421396",
          YeuCau: "Liên hệ bảo vệ",
          fromDate: "11:30 16-11-2022",
          toDate: "18:00 15-11-2022",
          SoLuong: "5 cuộn (80tấn)",
          cont20: 2,
          cont40: 1,
          DCL: "Cảng Vũng Tàu (52 Bà rịa, Phường 11, TP.Vũng tàu)",
          DCT: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCH: "Cảng Cát Lái (65 Cát lái, Phường 12, Đồng nai)",
        },
      ],
      dataCXHH: [
        {
          CangHa: "Cát lái",
          TgianHaDau: "12:00 16/11/2022",
          TgianHaCuoi: "17:00 16/11/2022",
          SoLuong: "2 cont20f",
        },
        {
          CangHa: "Đồng nai",
          TgianHaDau: "12:00 16/11/2022",
          TgianHaCuoi: "17:00 16/11/2022",
          SoLuong: "1 cont40f",
        },
      ],
      //
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
        //   key: "ID",
        //   label: "Mã Vận Đơn",
        // },
        // {
        //   key: "BSX",
        //   label: "Biển Số Xe",
        // },
        // {
        //   key: "TaiXe",
        //   label: "Tài Xế",
        // },
        {
          key: "LayHang",
          label: "Lấy Rỗng",
        },
        {
          key: "SoLuong",
          label: "Lấy cont",
        },
        {
          key: "TraHang",
          label: "Đóng Hàng",
        },
        {
          key: "HaRong",
          label: "Hạ cont",
        },
        // {
        //   key: "QuaTai",
        //   label: "Quá Tải",
        // },
        // {
        //   key: "CapCo",
        //   label: "Cặp Cổ",
        // },
        {
          key: "TrinhTrang",
          label: "Trình trạng",
        },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      itemsVanDon: [
        {
          ID: "DH001",
          BSX: "51P1-1245",
          TaiXe: "Nguyễn Văn A",
          KhachHang: "Công ty A",
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
            // {
            //   LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            //   GiaoHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
            //   HaRong: "Cảng DH (11 Đức Hòa Thượng, Đức Hòa, Long An)",
            //   MatHangLay: "Thép",
            //   MatHangGiao: "Thép",
            //   SoLuongLay: 1,
            //   SoLuongGiao: 1,
            //   TrongLuongLay: 10,
            //   TrongLuongGiao: 10,
            // },
          ],
        },
        {
          ID: "DH002",
          BSX: "51P1-1245",
          TaiXe: "Nguyễn Văn B",
          KhachHang: "Công ty B",
          TaiXe: "Nguyễn Văn B",
          LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
          TraHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
          HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
          CapCo: "Có",
          QuaTai: "Có",
          CauHang: "Tự Cẩu",
          DonViCau: "53PS-12353",
          TrinhTrang: "Đang đi giao",
          TrinhTrangColor: "green",
          SoLuong: "2x20f",
          Detail: [
            {
              LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
              GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
              MatHangLay: "Thép",
              MatHangGiao: "Thép",
              SoLuongLay: 1,
              SoLuongGiao: 1,
              TrongLuongLay: 10,
              TrongLuongGiao: 10,
            },
            // {
            //   LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            //   GiaoHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
            //   HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
            //   MatHangLay: "Thép",
            //   MatHangGiao: "Thép",
            //   SoLuongLay: 1,
            //   SoLuongGiao: 1,
            //   TrongLuongLay: 10,
            //   TrongLuongGiao: 10,
            // },
          ],
        },
        // {
        //   ID: "DH/22/09/0003",
        //   BSX: "51P1-1245",
        //   TaiXe: "Nguyễn Văn A",
        //   LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
        //   TraHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
        //   HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
        //   CapCo: "Có",
        //   QuaTai: "Có",
        //   CauHang: "Tự Cẩu",
        //   DonViCau: "53PS-12353",
        //   TrinhTrang: "Đang đi giao",
        //   TrinhTrangColor: "green",
        //   SoLuong: "2x20f",
        //   Detail: [
        //     {
        //       LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
        //       GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
        //       MatHangLay: "Thép",
        //       MatHangGiao: "Thép",
        //       SoLuongLay: 1,
        //       SoLuongGiao: 1,
        //       TrongLuongLay: 10,
        //       TrongLuongGiao: 10,
        //     },
        //     {
        //       LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       GiaoHang: "Kho Hàng DEF (43R Hồ Văn Huê, Phú Nhuận, HCM)",
        //       HaRong: "Cảng Cát Lái (42 Cát Lái, Đồng Nai)",
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
.box-content {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
</style>