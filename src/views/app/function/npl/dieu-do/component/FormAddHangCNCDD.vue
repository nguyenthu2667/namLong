<template>
  <div class="box-modal">
    <div class="box-card">
      <div class="box-header">
        <div>
          <div>
            <strong>ĐƠN HÀNG ĐIỀU ĐỘ</strong>
            <b-button
              v-show="isDonHangDieuDo"
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
              @click="showModalDonHang"
            >
              <i class="fas fa-plus"></i> <b>Thêm</b>
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
              <template #cell(actions)="row">
                <div class="text-center" style="cursor: pointer">
                  <i
                    class="fas fa-trash-alt text-danger mr-2"
                    @click="remove(row.item)"
                  ></i>
                  <!-- <i
                  class="fas fa-edit text-warning"
                  @click="handleEdit(row.item)"
                ></i> -->
                </div>
              </template>
            </b-table>
          </div>
        </div>

        <div>
          <strong>CHỌN XE DỰ KIẾN</strong>
        </div>
        <b-row>
          <b-col lg="6">
            <b-row>
              <b-col :sm="12">
                <b-input-group
                  prepend="Mã đơn"
                  class="t-input-group mb-3"
                  @click.prevent.stop="showModalBienSoXe"
                >
                  <b-form-input :value="'AUTO'" disabled></b-form-input>
                </b-input-group>
              </b-col>
              <b-col :sm="12">
                <b-input-group
                  prepend="Chọn xe"
                  class="t-input-group mb-3"
                  @click.prevent.stop="showModalBienSoXe"
                >
                  <b-form-input
                    v-model="dataForm['BSX']"
                    disabled
                  ></b-form-input>
                </b-input-group>
              </b-col>
              <b-col :sm="12">
                <b-input-group
                  prepend="Tài xế "
                  class="t-input-group mb-3"
                  @click.prevent.stop="showModalTaiXe"
                >
                  <b-form-input
                    :value="dataForm['TaiXe']"
                    disabled
                  ></b-form-input>
                </b-input-group>
              </b-col>
              <b-col :sm="12">
                <div class="text-right d-flex justify-content-end">
                  <b-form-checkbox class="mr-4">Hàng Cặp Cổ ?</b-form-checkbox>
                  <b-form-checkbox>Quá Tải Không ?</b-form-checkbox>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="6">
            <b-row>
              <b-col lg="12">
                <div class="box-map">
                  <MapXeNangLuc></MapXeNangLuc>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col :sm="6">
            <div>
              <strong>
                <span style="font-size: 14px"
                  >KẾ HOẠCH LẤY VÀ GIAO HÀNG</span
                ></strong
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
                @click="showModalAdd"
              >
                <i class="fas fa-plus"></i> <b>Thêm</b>
              </b-button>
            </div>
          </b-col>
          <b-col :sm="6">
            <!-- <div class="text-right d-flex justify-content-end">
              <b-form-checkbox class="mr-4">Hàng Cặp Cổ ?</b-form-checkbox>
              <b-form-checkbox>Quá Tải Không ?</b-form-checkbox>
            </div> -->
          </b-col>
        </b-row>
      </div>

      <div class="box-content mb-4">
        <KeHoachLayGiaoCN
          :ref="`refKeHoachLayGiaoCN`"
          :data="dataForm['Detail']"
          @returnRemove="handleRemove"
        ></KeHoachLayGiaoCN>
      </div>
      <div class="box-bottom"></div>
    </div>
    <b-modal
      :id="`modal-add-kehoachgiao-${this.idModal}`"
      title="THÊM"
      centered
      size="lg"
      @ok="handleAddKeHoachLayGiao"
    >
      <b-row class="bg-light pt-2 mb-2">
        <b-col lg="12">
          <div class="text-info">
            <strong><i class="fas fa-truck-loading mr-1"></i> LẤY CONT</strong>
          </div>
          <b-input-group prepend="Địa chỉ" class="t-input-group mb-3">
            <v-select
              style="width: 88%"
              v-model="dataFormAdd.LayHang"
              :options="[
                'Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)',
                '52 Bà Rịa, TP. Vũng Tàu',
                'Cảng HVH (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                'Cảng HVH (42R Hồ Văn Huê, Phú Nhuận, HCM)',
              ]"
            ></v-select>
          </b-input-group>
        </b-col>
        <b-col lg="12">
          <div class="d-flex justify-content-between">
            <div>
              <strong
                ><i class="fas fa-file-alt mr-1"></i>DANH SÁCH MÃ LẤY
                CONT</strong
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
                @click="showModalMLC"
              >
                <i class="fas fa-plus"></i> <b>Chọn</b>
              </b-button>
            </div>
            <div>
              <span style="font-weight: 600"
                ><span class="text-muted">Tổng:</span> 2x20f</span
              >
            </div>
          </div>
          <b-table
            :fields="fieldsMLC"
            :items="itemsMLCSelected"
            bordered
            show-empty
            head-variant="light"
          >
            <template #cell(SoLuong)="row">
              <div>1 {{ row.item.SoLuong }}</div>
            </template>
            <template #empty>
              <div class="text-left text-muted">Dữ liệu trống !</div>
            </template>
            <template #emptyfiltered>
              <div class="text-left text-muted">Không tìm thấy kết quả !</div>
            </template>
          </b-table>
        </b-col>
        <!-- <b-col lg="12">
          <b-form-group label="Thời gian dự kiến">
            <b-form-input
              type="datetime-local"
              v-model="dataFormAdd['DKETD']"
            ></b-form-input>
          </b-form-group>
        </b-col> -->
        <b-col lg="12">
          <div class="text-success">
            <strong>
              <i class="fas fa-box-check mr-1"></i>
              GIAO HÀNG</strong
            >
          </div>
          <b-input-group prepend="Địa chỉ" class="t-input-group mb-3">
            <v-select
              style="width: 88%"
              v-model="dataFormAdd.GiaoHang"
              :options="[
                'Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)',
                '52 Bà Rịa, TP. Vũng Tàu',
                'Cảng HVH (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                'Cảng HVH (42R Hồ Văn Huê, Phú Nhuận, HCM)',
              ]"
            ></v-select>
          </b-input-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Thời gian dự kiến">
            <b-form-input
              type="datetime-local"
              v-model="dataFormAdd['DKETA']"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <div style="color: #9b59b6">
            <strong>
              <i class="fas fa-arrow-alt-to-bottom mr-1"> </i>
              HẠ RỖNG</strong
            >
          </div>
          <b-input-group prepend="Địa chỉ" class="t-input-group mb-3">
            <v-select
              style="width: 88%"
              v-model="dataFormAdd.GiaoHang"
              :options="[
                'Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)',
                '52 Bà Rịa, TP. Vũng Tàu',
                'Cảng HVH (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                'Cảng HVH (42R Hồ Văn Huê, Phú Nhuận, HCM)',
              ]"
            ></v-select>
          </b-input-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Thời gian dự kiến">
            <b-form-input
              type="datetime-local"
              v-model="dataFormAdd['TGDK3']"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal id="modal-biensoxe" size="lg" title="CHỌN XE" centered>
      <b-table
        select-mode="single"
        selectable
        :fields="fieldsBienSoXe"
        :items="itemsBienSoXe"
        bordered
        head-variant="light"
        @row-selected="handleSelectBienSoXe"
      ></b-table>
    </b-modal>
    <b-modal id="modal-taixe" size="lg" title="CHỌN TÀI XẾ" centered>
      <b-table
        select-mode="single"
        selectable
        :fields="fieldsTaiXe"
        :items="itemsTaiXe"
        bordered
        head-variant="light"
        @row-selected="handleSelectTaiXe"
      ></b-table>
    </b-modal>
    <b-modal id="modal-mlc" size="lg" title="CHỌN MÃ LẤY CONT" centered>
      <b-table
        :fields="fieldsMLCM"
        :items="itemsMLC"
        bordered
        head-variant="light"
        select-mode="multi"
        selectable
        @row-selected="selectedMLC"
      ></b-table>
    </b-modal>
    <b-modal
      @ok="showNotify"
      id="modal-don-hang"
      size="xl"
      centered
      title="DANH SÁCH ĐƠN HÀNG"
    >
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
        ></b-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import KeHoachLayGiaoCN from "./KeHoachLayGiaoCN.vue";
import MapXeNangLuc from "./MapXeNangLuc.vue";

export default {
  props: ["data", "typeModal", "showDonHangDieuDo"],
  components: {
    "v-select": vSelect,
    MapXeNangLuc,
    KeHoachLayGiaoCN,
  },
  mounted() {
    if (this.typeModal == "ADD") {
      this.handleAddKeHoachLayGiao();
    }
    if (this.isDonHangDieuDo == false) {
      this.fieldsVanDon = [
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
      ];
      this.itemsVanDon = [
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
      ];
    }
  },
  data() {
    return {
      isDonHangDieuDo: this.showDonHangDieuDo ?? true,
      idModal: null,
      isCau: true,
      //mã lấy cont
      fieldsMLCM: [
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
      fieldsMLC: [
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
      itemsMLCSelected: [],
      itemsMLC: [
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
      //
      dataFormAdd: {
        SoLuongLay: 2,
        TrongLuongLay: 20,
        LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
        GiaoHang: "Cảng HVH (43R Hồ Văn Huê, Phú Nhuận, HCM)",
        HaRong: "33 Cát Lái, Đồng Nai",
      },
      dataForm: this.data ?? {
        ID: "AUTO" + moment(new Date()).format("ss"),
        BSX: null,
        TaiXe: null,
        DKETA: "08:00 25/11/2022",
        DKETD: "12:00 25/11/2022",
        TGDK3: "12:00 25/11/2022",
        LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
        TraHang: "Cảng HVH (43R Hồ Văn Huê, Phú Nhuận, HCM)",
        CauHang: null,
        DonViCau: null,
        Detail: [],
      },
      //modal-biensoxe
      fieldsBienSoXe: [
        {
          key: "BSX",
          label: "Biển xố xe",
        },
        {
          key: "RoMoc",
          label: "Rơ móc",
        },
        {
          key: "KhoangCachDiemNhanHang",
          label: "Khoảng cách",
        },
        {
          key: "SoDonGanDiemGiao",
          label: "Đơn gần Đ/giao",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "NangLuc",
          label: "Năng lực",
        },
        {
          key: "ThoiGianHoatDong",
          label: "Hoạt động",
        },
        {
          key: "DoanhThu",
          label: "Doanh thu",
        },
      ],
      itemsBienSoXe: [
        {
          BSX: "51P1-12345",
          RoMoc: "Xương",
          KhoangCachDiemNhanHang: "30km",
          SoDonGanDiemGiao: 1,
          TaiXe: "Trần Văn A",
          NangLuc: "Thép, Tôn",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "5,000,000",
        },
        {
          BSX: "51P1-41212",
          RoMoc: "Sàn",
          KhoangCachDiemNhanHang: "10km",
          SoDonGanDiemGiao: 0,
          TaiXe: "Trần Văn B",
          NangLuc: "Ván, Thạch cao",
          ThoiGianHoatDong: "01:00",
          DoanhThu: "6,000,000",
        },
        {
          BSX: "51P1-11202",
          RoMoc: "Xương",
          KhoangCachDiemNhanHang: "50km",
          SoDonGanDiemGiao: 1,
          TaiXe: "Trần Văn C",
          NangLuc: "Thép, Ván",
          ThoiGianHoatDong: "05:00",
          DoanhThu: "7,000,000",
        },
      ],
      //modal-taixe
      fieldsTaiXe: [
        {
          key: "TaiXe",
          label: "Tài Xế",
        },
        {
          key: "DienThoai",
          label: "Điện thoại",
        },
        {
          key: "NangLuc",
          label: "Năng lực",
        },
        {
          key: "ThoiGianHoatDong",
          label: "Tgian hoạt động",
        },
        {
          key: "DoanhThu",
          label: "Doanh thu",
        },
        {
          key: "HanGPLX",
          label: "Hạn GPLX",
        },
      ],
      itemsTaiXe: [
        {
          TaiXe: "Trần Văn A",
          DienThoai: "0961421396",
          NangLuc: "Thép, Tôn",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "5,000,000",
          HanGPLX: "21/01/2025",
        },
        {
          TaiXe: "Trần Văn B",
          DienThoai: "0961421222",
          NangLuc: "Ván, Thạch cao",
          ThoiGianHoatDong: "02:00",
          DoanhThu: "3,000,000",
          HanGPLX: "21/01/2025",
        },
        {
          TaiXe: "Trần Văn C",
          DienThoai: "0961421333",
          NangLuc: "Ván, Thép",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "7,000,000",
          HanGPLX: "21/01/2025",
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
        {
          key: "actions",
          label: "Thao tác",
        },
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
    };
  },
  methods: {
    showNotify() {
      this.$notify("success", "THÀNH CÔNG", "Thêm thành công!");
    },
    showModalDonHang() {
      setTimeout(() => {
        this.$bvModal.show("modal-don-hang");
      }, 500);
    },
    remove(row) {
      this.itemsVanDon = this.itemsVanDon.filter((e) => e.ID != row.ID);
    },
    selectedMLC(row) {
      this.itemsMLCSelected = row;
    },
    showModalMLC() {
      setTimeout(() => {
        this.$bvModal.show("modal-mlc");
      }, 500);
    },
    handleSelect(value) {
      if (value == "Cẩu giúp" || value == "Thuê Cẩu") {
        this.isCau = false;
      } else {
        this.isCau = true;
      }
    },
    handleRemove(newDataFormDetail) {
      this.dataForm.Detail = newDataFormDetail;
      this.$emit("returnAddDetail", this.dataForm);
    },
    emitAdd() {
      this.$emit("returnAdd", this.dataForm);
    },
    emitAddDetail() {
      this.$emit("returnAddDetail", this.dataForm);
    },
    handleSelectBienSoXe(row) {
      this.dataForm.BSX = row[0].BSX;
      this.dataForm.DonViCau = row[0].BSX;
      this.dataForm.TaiXe = row[0].TaiXe;
    },
    handleSelectTaiXe(row) {
      this.dataForm.TaiXe = row[0].TaiXe;
    },
    showModalTaiXe() {
      setTimeout(() => {
        this.$bvModal.show("modal-taixe");
      }, 500);
    },
    showModalBienSoXe() {
      setTimeout(() => {
        this.$bvModal.show("modal-biensoxe");
      }, 500);
    },
    handleActions(action) {
      switch (action.toUpperCase()) {
        case "ADD":
          this.dataForm.XeDuKien += 1;
          break;
        case "DELETE":
          this.dataForm.XeDuKien -= 1;
          break;
      }
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công !.", {
        duration: 3000,
        permanent: false,
      });
    },
    handleAddKeHoachLayGiao() {
      this.$refs.refKeHoachLayGiaoCN.addItemList(this.dataFormAdd);
    },
    showModalAdd() {
      this.idModal = this.dataForm.ID;
      setTimeout(() => {
        this.handleAddKeHoachLayGiao();
        // this.$bvModal.show(`modal-add-kehoachgiao-${this.idModal}`);
      }, 500);
    },
  },
};
</script>


<style scoped>
.box-modal {
  max-height: calc(100vh - 300px);
  overflow: auto;
  overflow-x: hidden;
}
</style>
<style >
.t-input-group .input-group-prepend .input-group-text {
  width: 88px;
  white-space: nowrap;
}
</style>
<style>
.table th {
  white-space: nowrap;
}
</style>
<style scoped>
.box-map {
  height: 236px;
  background: lightblue;
}
</style>