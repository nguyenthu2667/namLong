<template>
  <div class="box-modal">
    <b-row>
      <b-col lg="6">
        <b-row>
          <b-colxx sm="3">
            <b-form-group :label="'Mã đơn hàng'">
              <b-form-input v-model="dataForm['ID']" disabled></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="3">
            <b-form-group :label="'Ngày'">
              <b-form-input
                v-model="dataForm['createDate']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx v-show="isShow" sm="6">
            <div style="margin-top: 27px; text-align: center">
              <b-button squared variant="success" class="mr-3"
                ><i class="far fa-check-circle mr-1"></i><b>Xác Nhận</b>
              </b-button>
              <b-button squared variant="danger" @click="handleShowNotify"
                ><i class="fas fa-ban mr-1"></i><b>Từ Chối</b>
              </b-button>
            </div>
          </b-colxx>
          <b-colxx sm="12">
            <b-form-group :label="'Khách hàng'">
              <b-form-input
                v-model="dataForm['company']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Người liên hệ'">
              <b-form-input
                v-model="dataForm['fullName']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Điện thoại'">
              <b-form-input v-model="dataForm['phone']" disabled></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Email'">
              <b-form-input v-model="dataForm['email']" disabled></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx :sm="8">
            <b-form-group :label="'Tuyến đường'">
              <b-form-input v-model="dataForm['route']" disabled />
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Đơn giá'">
              <b-form-input
                v-model="dataForm['donGia']"
                disabled
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx :sm="4">
            <b-form-group :label="'Mặt hàng'">
              <b-form-input v-model="dataForm['brand']" disabled></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Số lượng'">
              <div class="d-flex">
                <b-form-input
                  style="width: 60%"
                  v-model="dataForm['quantity']"
                  disabled
                  class="text-right"
                ></b-form-input>
                <b-form-input
                  style="width: 40%"
                  :value="'Cuộn'"
                  disabled
                  class="text-center"
                ></b-form-input>
              </div>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="4">
            <b-form-group :label="'Trọng lượng'">
              <div class="d-flex">
                <b-form-input
                  style="width: 60%"
                  v-model="dataForm['weight']"
                  disabled
                  class="text-right"
                ></b-form-input>
                <b-form-input
                  style="width: 40%"
                  :value="'Tấn'"
                  disabled
                  class="text-center"
                ></b-form-input>
              </div>
            </b-form-group>
          </b-colxx>
          <b-colxx sm="12">
            <div class="mb-1">
              <strong>THÔNG TIN XUẤT HÓA ĐƠN</strong>
            </div>
            <b-table bordered :fields="fieldsXHD" :items="dataXHD"> </b-table>
          </b-colxx>
        </b-row>
      </b-col>
      <b-col lg="2">
        <b-row v-if="typeFormHeaderRight && typeFormHeaderRight.length > 0">
          <template v-for="(value, i) in typeFormHeaderRight">
            <template v-if="value.type && value.type.toUpperCase() == 'DATE'">
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    v-model="dataForm[value.key]"
                    @input="convertDate(value.key)"
                    disabled
                  ></datepicker>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="
                (value.type && value.type.toUpperCase() == 'NUMBER') ||
                (value.type && value.type.toUpperCase() == 'MONEY')
              "
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label" class="has-float-label mb-4">
                  <b-form-input
                    v-model.number="dataForm[value.key]"
                    type="number"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'SELECT'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <v-select
                    v-model="dataForm[value.key]"
                    :options="options[value.key]"
                    disabled
                  />
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="
                value.type && value.type.toUpperCase() == 'MULTISELECT'
              "
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label" class="has-float-label mb-4">
                  <v-select
                    multiple
                    v-model="dataForm[value.key]"
                    :options="options[value.key]"
                    disabled
                  />
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'TABLE'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-table
                    id="npl-table-chil"
                    class="npl-table-chil"
                    :fields="fieldsByKey[value.key]"
                    :items="dataByKey[value.key]"
                    bordered
                    responsive
                    show-empty
                    head-variant="light"
                  ></b-table>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-textarea
                    rows="2"
                    max-rows="6"
                    :style="value.height ? `height:${value.height}` : null"
                    v-model="dataForm[value.key]"
                    disabled
                  ></b-form-textarea>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'STATUS'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-input
                    :style="`font-weight:600;color:${
                      dataForm[value.key + 'Color']
                    } !important`"
                    v-model="dataForm[value.key]"
                    disabled
                    :class="value.class"
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
            <template v-else>
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-input
                    v-model="dataForm[value.key]"
                    disabled
                    :class="value.class"
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
          </template>
          <b-colxx sm="12">
            <b-form-group :label="'Ghi chú'">
              <b-form-textarea
                rows="2"
                max-rows="6"
                v-model="dataForm['note']"
                disabled
              ></b-form-textarea>
            </b-form-group>
          </b-colxx>
        </b-row>
      </b-col>
      <b-col lg="2">
        <b-row v-if="typeFormBottomRight && typeFormBottomRight.length > 0">
          <template v-for="(value, i) in typeFormBottomRight">
            <template v-if="value.type && value.type.toUpperCase() == 'DATE'">
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    v-model="dataForm[value.key]"
                    @input="convertDate(value.key)"
                    disabled
                  ></datepicker>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="
                (value.type && value.type.toUpperCase() == 'NUMBER') ||
                (value.type && value.type.toUpperCase() == 'MONEY')
              "
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label" class="has-float-label mb-4">
                  <b-form-input
                    v-model.number="dataForm[value.key]"
                    type="number"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'SELECT'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label" class="has-float-label mb-4">
                  <v-select
                    v-model="dataForm[value.key]"
                    :options="options[value.key]"
                    disabled
                  />
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="
                value.type && value.type.toUpperCase() == 'MULTISELECT'
              "
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label" class="has-float-label mb-4">
                  <v-select
                    multiple
                    v-model="dataForm[value.key]"
                    :options="options[value.key]"
                    disabled
                  />
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'TABLE'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-table
                    id="npl-table-chil"
                    class="npl-table-chil"
                    :fields="fieldsByKey[value.key]"
                    :items="dataByKey[value.key]"
                    bordered
                    responsive
                    show-empty
                    head-variant="light"
                  ></b-table>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-textarea
                    rows="2"
                    max-rows="6"
                    :style="value.height ? `height:${value.height}` : null"
                    v-model="dataForm[value.key]"
                    disabled
                  ></b-form-textarea>
                </b-form-group>
              </b-colxx>
            </template>
            <template
              v-else-if="value.type && value.type.toUpperCase() == 'STATUS'"
            >
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-input
                    :style="`font-weight:600;color:${
                      dataForm[value.key + 'Color']
                    } !important`"
                    v-model="dataForm[value.key]"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
            <template v-else>
              <b-colxx :key="i" :sm="value.col">
                <b-form-group :label="value.label">
                  <b-form-input
                    :style="value.style ? value.style : null"
                    :class="value.class ? value.class : null"
                    v-model="dataForm[value.key]"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-colxx>
            </template>
          </template>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
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
      </b-col>
    </b-row>
    <b-row v-show="showCPPS" class="mb-4">
      <b-col lg="6">
        <div class="mb-1 d-flex justify-content-between">
          <div>
            <strong>CHI PHÍ PHÁT SINH</strong>
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
              @click="showModalSPPS"
            >
              <i class="fas fa-plus"></i> <b>Thêm</b>
            </b-button>
          </div>
          <div class="text-right pt-1">
            <strong
              ><span class="text-muted">Tổng cộng : </span>300,000
            </strong>
          </div>
        </div>
        <b-table bordered :fields="fieldsCPPS" :items="dataCPPS">
          <template #cell(Status)="row">
            <div :style="`color:${row.item.StatusColor}`">
              {{ row.item.Status }}
            </div>
          </template>
        </b-table>
      </b-col>
      <b-col lg="6">
        <div class="mb-1 d-flex justify-content-between">
          <div>
            <strong>DOANH THU PHÁT SINH</strong>
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
              @click="showModalSPPS"
            >
              <i class="fas fa-plus"></i> <b>Thêm</b>
            </b-button>
          </div>
          <div class="text-right mr-2 pt-1">
            <strong><span class="text-muted">Tổng cộng : </span>700,000</strong>
          </div>
        </div>
        <b-table bordered :fields="fieldsCPPS" :items="dataDTPS">
          <template #cell(Status)="row">
            <div :style="`color:${row.item.StatusColor}`">
              {{ row.item.Status }}
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-modal id="modal-add-cpps" size="md" title="THÊM" centered>
      <b-row>
        <b-col lg="12">
          <b-form-group :label="'Mục phí:'">
            <v-select :options="['Bốc Xếp', 'Thủ Kho', 'Neo Xe']" />
          </b-form-group>
          <b-form-group :label="'Chi phí:'">
            <b-form-input></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal id="modal-lido" centered title="LÍ DO TỪ CHỐI" size="md">
      <b-col lg="12">
        <b-form-group label="Nội dung">
          <b-form-textarea rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";

export default {
  props: ["showXetDuyet", "showCPPS"],
  components: {
    vSelect,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      isShow: this.showXetDuyet ?? true,
      //chi phí phát
      fieldsXHD: [
        {
          key: "Name",
          label: "Tên công ty",
        },
        {
          key: "MST",
          label: "Mã số thuế",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "Money",
          label: "Số tiền",
        },
      ],
      dataXHD: [
        {
          Name: "Công ty NL",
          MST: "0310111222",
          Address: "43r Hồ Văn Huê, Phú nhuận, HCM",
          Money: "300,000",
        },
        {
          Name: "Công ty ABC",
          MST: "0310113333",
          Address: "49r Cao Thắng, Quận 1, HCM",
          Money: "200,000",
        },
      ],
      //====
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
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "fromDate",
          label: "Thời gian từ",
        },
        {
          key: "toDate",
          label: "Thời gian đến",
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
      //chi phí phát sinh
      dataFormXHD: {},
      fieldsXHD: [
        {
          key: "Name",
          label: "Tên công ty",
        },
        {
          key: "MST",
          label: "Mã số thuế",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "Money",
          label: "Số tiền",
        },
      ],
      dataXHD: [
        {
          Name: "Công ty NL",
          MST: "0310111222",
          Address: "43r Hồ Văn Huê, Phú nhuận, HCM",
          Money: "300,000",
        },
        {
          Name: "Công ty ABC",
          MST: "0310113333",
          Address: "49r Cao Thắng, Quận 1, HCM",
          Money: "200,000",
        },
      ],
      fieldsCPPS: [
        {
          key: "Name",
          label: "Mục phí",
        },
        {
          key: "Money",
          label: "ST đề xuất",
          tdClass: "text-right",
        },
        {
          key: "STPD",
          label: "ST Phê duyệt",
          tdClass: "text-right",
        },
        {
          key: "NDPD",
          label: "ND Phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "TGPD",
          label: "Tgian phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "Status",
          label: "Trạng thái",
          tdClass: "text-center",
        },
      ],
      dataCPPS: [
        {
          Name: "Bốc xếp",
          Money: "100,000",
          Status: "Đã duyệt",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          StatusColor: "green",
        },
        {
          Name: "Thủ kho",
          Money: "200,000",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          Status: "Chờ duyệt",
          StatusColor: "orange",
        },
      ],
      dataDTPS: [
        {
          Name: "Neo xe",
          Money: "600,000",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          Status: "Đã duyệt",
          StatusColor: "green",
        },
        {
          Name: "Bốc xếp",
          Money: "100,000",
          STPD: "50,000",
          NDPD: "Sếp bảo miễn phí",
          TGPD: "19:00 20/11/2022",
          Status: "Từ chối",
          StatusColor: "red",
        },
      ],
      // fieldsCPPS: [
      //   {
      //     key: "Name",
      //     label: "Mục phí",
      //   },
      //   {
      //     key: "Money",
      //     label: "Số tiền",
      //     tdClass: "text-right",
      //   },
      //   {
      //     key: "Status",
      //     label: "Trạng thái",
      //     tdClass: "text-center",
      //   },
      // ],
      // dataCPPS: [
      //   {
      //     Name: "Bốc xếp",
      //     Money: "100,000",
      //     Status: "Đã duyệt",
      //     StatusColor: "green",
      //   },
      //   {
      //     Name: "Thủ kho",
      //     Money: "200,000",
      //     Status: "Chờ duyệt",
      //     StatusColor: "orange",
      //   },
      // ],
      // dataDTPS: [
      //   {
      //     Name: "Neo xe",
      //     Money: "600,000",
      //     Status: "Đã duyệt",
      //     StatusColor: "green",
      //   },
      //   {
      //     Name: "Bốc xếp",
      //     Money: "100,000",
      //     Status: "Đã duyệt",
      //     StatusColor: "green",
      //   },
      // ],
      //dataForm
      dataForm: {
        ID: "DH001",
        createDate: "1/10/2022",
        company: "Công ty B",
        loaiDonHang: "Hàng rời",
        brand: "Thép",
        quantityText: "5cuộn (30tấn)",
        route: "SG-LA (Sài gòn - Long an)",
        turnover: 17000000,
        tiepNhanDon: "Đã tiếp nhận",
        tiepNhanDonColor: "green",
        tienDo: "1/2 (50%)",
        timeSuccess: "15:10 15/11/2022",
        trangThaiVanDon: "Đang giao hàng",
        trangThaiVanDonColor: "orange",
        chungTuGoc: "Chưa nhận",
        chungTuGocColor: "red",
        banGiaoCT: "Chưa bàn giao",
        banGiaoCTColor: "red",
        type: "HR",
        note: "",
        fullName: "Trần văn B",
        email: "b@gmail.com",
        typeBrand: "Phủ",
        quantity: 3,
        weight: 15,
        phone: "07854122215855",
        donGia: "200,000",
        duKienHoanThanh: "17:30 12/11/2022",
        dkSoLuongXe: 30,
        tienVC: "500,000",
        giamGia: "100,000",
        lyDoGiamGia: "Khách quen chiết khấu",
        cpPhatSinh: "300,000",
        dtPhatSinh: "700,000",
        TongCong: "1,000,000",
      },
      typeFormHeaderRight: [
        {
          key: "tiepNhanDon",
          label: "Tiếp nhận đơn",
          col: 12,
          type: "status",
          class: "text-right",
        },
        {
          key: "tienDo",
          label: "Tiến độ",
          col: 12,
          class: "text-right",
        },
        {
          key: "duKienHoanThanh",
          label: "Dự kiến hoàn thành",
          col: 12,
          class: "text-right",
        },
        {
          key: "trangThaiVanDon",
          label: "Trạng thái vận đơn",
          col: 12,
          type: "status",
          class: "text-right",
        },
        {
          key: "chungTuGoc",
          label: "Chứng từ gốc",
          col: 12,
          type: "status",
          class: "text-right",
        },
        {
          key: "banGiaoCT",
          label: "Bàn giao chứng từ",
          col: 12,
          type: "status",
          class: "text-right",
        },
      ],
      typeFormBottomRight: [
        {
          key: "dkSoLuongXe",
          label: "Dự kiến (xe)",
          col: 12,
          class: "text-right",
        },
        {
          key: "tienVC",
          label: "Tiền Vận Chuyển",
          col: 12,
          class: "text-right",
        },

        {
          key: "cpPhatSinh",
          label: "Chi phí phát sinh",
          col: 12,
          class: "text-right",
        },
        {
          key: "dtPhatSinh",
          label: "Doanh thu phát sinh",
          col: 12,
          class: "text-right",
        },
        {
          key: "giamGia",
          label: "Giảm giá",
          col: 12,
          class: "text-right",
        },
        {
          key: "TongCong",
          label: "Tổng cộng",
          col: 12,
          class: "text-right font-weight-bold",
        },
        {
          key: "lyDoGiamGia",
          label: "Lý do giảm giá",
          col: 12,
          class: "text-right",
          style: "height:57px",
        },
      ],
    };
  },
  methods: {
    showModalSPPS() {
      setTimeout(() => {
        this.$bvModal.show("modal-add-cpps");
      }, 500);
    },
    handleShowNotify() {
      setTimeout(() => {
        this.$bvModal.show("modal-lido");
        // this.$notify("success", "THÔNG BÁO", "Xử Lí Thành Công !");
      }, 100);
    },
    handleSelect(value) {
      if (value == "SG-CL (SÀI GÒN-CÁT LÁI)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "600,000";
        }
      }
      if (value == "SG-LA (SÀI GÒN-LONG AN)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "400,000";
        }
      }
      if (value == "BT-AG (BẾN TRE-AN GIANG)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "200,000";
        }
      }
    },
  },
};
</script>