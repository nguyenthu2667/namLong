<template>
  <div class="box-content">
    <b-row>
      <!-- <b-col lg="6">
        <b-form-group label="Yêu cầu đặc biệt">
          <b-form-input value="Gắn Cảo" disabled></b-form-input>
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
            ><span style="font-size: 11px">LẤY HÀNG</span></strong
          >
        </div>
        <div>
          <b-table bordered :fields="fieldsCNL" :items="dataCNL"> </b-table>
        </div>
      </b-col>
      <b-col lg="12">
        <div class="text-success">
          <strong
            ><i class="fas fa-box-check mr-1"></i
            ><span style="font-size: 11px">TRẢ HÀNG</span></strong
          >
        </div>
        <b-table bordered :fields="fieldsCNT" :items="dataCNT"> </b-table>
      </b-col>
      <b-col lg="12">
        <div style="color: #9b59b6">
          <strong
            ><i class="fas fa-arrow-alt-to-bottom mr-1"></i
            ><span style="font-size: 11px">HẠ RỖNG</span>
          </strong>
        </div>
        <div>
          <b-table bordered :fields="fieldsCNHR" :items="dataCNHR"> </b-table>
        </div>
      </b-col> -->
      <b-col lg="12">
        <div class="d-flex justify-content-between">
          <div>
            <strong
              ><span style="font-size: 13px">
                <i class="fas fa-paste ml-1"></i>
                KẾ HOẠCH LẤY CONT, GIAO HÀNG VÀ HẠ RỖNG</span
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
      fieldsCNL: [
        {
          key: "DCL",
          label: "Địa chỉ lấy hàng",
        },
        {
          key: "DCT",
          label: "Địa chỉ trả hàng",
        },
        {
          key: "DCH",
          label: "Địa chỉ hạ rỗng",
        },
        // {
        //   key: "DiaChi",
        //   label: "Địa chỉ",
        // },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "HanLuuCont",
          label: "Dự kiến lấy cont",
        },
        {
          key: "MaCont",
          label: "Mã lấy cont",
        },
        {
          key: "SoBill",
          label: "Số bill",
        },
        {
          key: "FileDinhKem",
          label: "File đính kèm",
        },
        // {
        //   key: "CangLayHang",
        //   label: "Cảng lấy hàng",
        // },

        // {
        //   key: "HanLayRong",
        //   label: "Hạn lấy rỗng",
        // },
        // {
        //   key: "HanPhuThu",
        //   label: "Hạn phụ thu",
        // },
        // {
        //   key: "HanLuuBai",
        //   label: "Hạn lưu bãi",
        // },
        // {
        //   key: "NgayTauCap",
        //   label: "Ngày tàu cập",
        // },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      dataCNL: [
        {
          SoBill: "BILL2022",
          FileDinhKem: "file-dinh-kem.docx",
          CangLayHang: "Cát lái",
          HanLuuCont: "17:00 15-11-2022",
          HanLayRong: "18:00 16-11-2022",
          HanPhuThu: "19:00 16-11-2022",
          HanLuuBai: "20:00 16-11-2022",
          NgayTauCap: "07:00 17-11-2022",
          DiaChi: "33 Cát Lái, Đồng Nai",
          SoLuong: "2 cont20f",
          MaCont: "CONT23213",
          note: "",
          DCL: "Cảng Vũng Tàu (52 Bà rịa, Phường 11, TP.Vũng tàu)",
          DCT: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCH: "Cảng Cát Lái (65 Cát lái, Phường 12, Đồng nai)",
        },
      ],
      fieldsCNT: [
        // {
        //   key: "TenKho",
        //   label: "Tên kho",
        // },
        {
          key: "DCL",
          label: "Địa chỉ lấy hàng",
        },
        {
          key: "DCT",
          label: "Địa chỉ trả hàng",
        },
        {
          key: "DCH",
          label: "Địa chỉ hạ rỗng",
        },
        // {
        //   key: "DiaChi",
        //   label: "Địa chỉ",
        // },
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
          key: "ThoiGianTu",
          label: "Dự kiến giao hàng",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "LienHe",
          label: "Người liên hệ",
        },
        {
          key: "Phone",
          label: "Điện thoại",
        },
        // {
        //   key: "ThoiGianDen",
        //   label: "Thời gian đến",
        // },

        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      dataCNT: [
        {
          TenKho: "BILL0022",
          DiaChi: "file-dinh-kem.docx",
          LienHe: "Cát lái",
          Phone: "17:00 15-11-2022",
          YeuCau: "Khai báo abc",
          ThoiGianTu: "19:00 16-11-2022",
          ThoiGianDen: "20:00 16-11-2022",
          SLcont20: 2,
          SLcont40: 1,
          note: "",
          DCL: "Cảng Vũng Tàu (52 Bà rịa, Phường 11, TP.Vũng tàu)",
          DCT: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCH: "Cảng Cát Lái (65 Cát lái, Phường 12, Đồng nai)",
        },
      ],
      fieldsCNHR: [
        {
          key: "DCL",
          label: "Địa chỉ lấy hàng",
        },
        {
          key: "DCT",
          label: "Địa chỉ trả hàng",
        },
        {
          key: "DCH",
          label: "Địa chỉ hạ rỗng",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        // {
        //   key: "FileLenhHa",
        //   label: "File lệnh hạ",
        // },
        {
          key: "ThoiGianHaTu",
          label: "Dự kiến hạ rỗng",
        },
        // {
        //   key: "ThoiGianHaDen",
        //   label: "Thời gian hạ đến",
        // },
        {
          key: "CtyXHD",
          label: "Xuất hóa đơn cho",
        },
        {
          key: "MST",
          label: "Mã số thuế",
        },
        {
          key: "DiaChi",
          label: "Địa chỉ",
        },
        // {
        //   key: "actions",
        //   label: "Thao tác",
        // },
      ],
      dataCNHR: [
        {
          SoLuong: "2 cont20f",
          NoiHa: "Cát lái",
          FileLenhHa: "file-lenh-ha.docx",
          ThoiGianHaTu: "17:00 15-11-2022",
          ThoiGianHaDen: "18:00 15-11-2022",
          CtyXHD: "Công ty A",
          MST: "MST010112022",
          DiaChi: "43R Hồ Văn Huê, Phú Nhuận",
          note: "",
          DCL: "Cảng Vũng Tàu (52 Bà rịa, Phường 11, TP.Vũng tàu)",
          DCT: "Kho ABC (43R Hồ Văn Huê, Phú nhuận)",
          DCH: "Cảng Cát Lái (65 Cát lái, Phường 12, Đồng nai)",
        },
      ],
      fieldsMLCN: [
        {
          key: "ID",
          label: "Mã lấy cont",
        },
        {
          key: "SoCont",
          label: "Số cont",
          tdClass: "text-right",
        },
        {
          key: "SoSeal",
          label: "Số Seal",
          tdClass: "text-right",
        },
        {
          key: "width",
          label: "Chiều dài cont",
          tdClass: "text-right",
        },
      ],
      //
      dataMLCN: [
        {
          ID: "LLC12345",
          width: "40f",
          SoCont: "2",
          SoSeal: "2",
        },
        {
          ID: "LAC13468",
          width: "20f",
          SoCont: "2",
          SoSeal: "2",
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
          label: "Lấy cont",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "TraHang",
          label: "Giao Hàng",
        },
        {
          key: "HaRong",
          label: "Hạ Rỗng",
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
          KhachHang: "Công ty A",
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
            // {
            //   LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            //   GiaoHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
            //   HaRong: "Cảng Cát Lái (11 Đức Hòa Thượng, Đức Hòa, Long An)",
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
          KhachHang: "Công ty B",
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
          Detail: [
            {
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
            // {
            //   LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
            //   GiaoHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
            //   HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
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
        //   LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
        //   TraHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
        //   HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
        //   CapCo: "Có",
        //   QuaTai: "Có",
        //   CauHang: "Tự Cẩu",
        //   DonViCau: "53PS-12353",
        //   TrinhTrang: "Đang đi giao",
        //   TrinhTrangColor: "green",
        //   SoLuong: "2x20f",
        //   Detail: [
        //     {
        //       LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
        //       GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
        //       MatHangLay: "Thép",
        //       MatHangGiao: "Thép",
        //       SoLuongLay: 1,
        //       SoLuongGiao: 1,
        //       TrongLuongLay: 10,
        //       TrongLuongGiao: 10,
        //     },
        //     {
        //       LayHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
        //       GiaoHang: "Kho NLT (42R Hồ Văn Huê, Phú Nhuận, HCM)",
        //       HaRong: "Cảng cát lái (42 Cát Lái, Đồng Nai)",
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