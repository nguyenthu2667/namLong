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
    <b-tabs v-model="currentTab" nav-class="d-none">
      <b-tab>
        <div class="box-content">
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
            :current-page="currentPage"
            :per-page="perPage"
            @row-dblclicked="handleDbClick"
          >
            <template v-slot:cell(statusName)="row">
              <div style="max-width: 130px">
                <Status
                  :color="row.item.statusColor"
                  :label="row.item.statusName"
                  :showCircle="false"
                ></Status>
              </div>
            </template>
          </b-table>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <TitleMajor :titleOption="titleOption" :currentTitle="currentTitle" />
          <div>
            <b-col lg="12" class="pl-0">
              <b-row>
                <b-col lg="2">
                  <b-form-group label="Mã chứng từ">
                    <b-form-input v-model="dataForm.ID" disabled></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col lg="2">
                  <b-form-group label="Ngày chứng từ">
                    <b-form-input
                      v-model="dataForm.date"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <!-- <b-col lg="2">
                  <b-form-group label="Trạng thái">
                    <b-form-input
                      v-model="dataForm.statusName"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col> -->
                <!-- <b-col lg="4">
                  <div style="margin-top: 27px; text-align: left">
                    <b-button
                      squared
                      variant="success"
                      class="mr-3"
                      @click="handleShowNotify"
                      ><i class="far fa-check-circle mr-1"></i><b>Xác Nhận</b>
                    </b-button>
                    <b-button squared variant="danger" @click="showRefuseModal"
                      ><i class="fas fa-ban mr-1"></i><b>Bỏ qua</b>
                    </b-button>
                  </div>
                </b-col> -->
              </b-row>
              <b-row>
                <b-col lg="6">
                  <div class="text-info">
                    <strong>
                      <i class="fas fa-info-circle"></i>
                      <span style="font-size: 12px"
                        >THÔNG TIN YÊU CẦU</span
                      ></strong
                    >
                  </div>
                  <b-row>
                    <b-col lg="4">
                      <b-form-group label="Số xe">
                        <b-form-input
                          v-model="dataForm.licensePlate"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Tài xế">
                        <b-form-input
                          v-model="dataForm.driver"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Điện thoại">
                        <b-form-input
                          v-model="dataForm.phone"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="4">
                      <b-form-group label="Số km hiện tại">
                        <b-form-input
                          v-model="dataForm.currentKm"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số lít dầu yêu cầu đổ">
                        <b-form-input
                          v-model="dataForm.requestOil"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Thời gian yêu cầu">
                        <b-form-input
                          v-model="dataForm.requestTime"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="12">
                      <b-form-group label="Ghi chú">
                        <b-form-textarea
                          rows="1"
                          max-rows="6"
                          v-model="dataForm.note"
                          disabled
                          style="height: 36px"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="6">
                  <div class="text-info">
                    <strong>
                      <i class="fas fa-calculator"></i>
                      <span style="font-size: 12px"
                        >TÍNH TOÁN TỒN DẦU TRÊN XE CỦA TÀI XẾ</span
                      ></strong
                    >
                  </div>
                  <b-row>
                    <b-col lg="4">
                      <b-form-group label="Số km đổ dầu lần trước">
                        <b-form-input
                          v-model="dataCalcOil['Số km đổ dầu lần trước']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số km hiện tại">
                        <b-form-input
                          v-model="dataCalcOil['Số km hiện tại']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số km đã chạy">
                        <b-form-input
                          v-model="dataCalcOil['Số km đã chạy']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số vận đơn">
                        <b-form-input
                          v-model="dataCalcOil['Số vận đơn']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số lít dầu tiêu hao">
                        <b-form-input
                          v-model="dataCalcOil['Số lít dầu tiêu hao']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số lít dầu phụ cấp">
                        <b-form-input
                          v-model="dataCalcOil['Số lít dầu phụ cấp']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Dầu tồn lần trước">
                        <b-form-input
                          v-model="dataCalcOil['Dầu tồn lần trước']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số lít dầu đã đổ">
                        <b-form-input
                          v-model="dataCalcOil['Số lít dầu đã đổ']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số lít dầu tồn hiện tại">
                        <b-form-input
                          v-model="dataCalcOil['Số lít dầu tồn hiện tại']"
                          disabled
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="4">
                  <div class="text-info">
                    <i class="fas fa-location"></i>
                    <strong>VỊ TRÍ</strong>
                  </div>
                  <template v-if="currentTab == 1">
                    <div class="map-control" style="height: 319px">
                      <location-component
                        ref="formMapCustom"
                        :popup-location="true"
                        lat-item="10.74459799531374"
                        lng-item="106.62035045752945"
                      ></location-component>
                    </div>
                  </template>
                </b-col>
                <b-col lg="2" class="pl-0">
                  <div class="text-info">
                    <i class="fas fa-image"></i>
                    <strong>HÌNH ẢNH</strong>
                  </div>
                  <template v-if="dataImages && dataImages.length > 0">
                    <div class="image-accident">
                      <div
                        class="item-image"
                        :key="img.ID"
                        v-for="(img, index) in dataImages"
                        :class="index == dataImages.length - 1 && 'mb-0'"
                      >
                        <div class="frame-image">
                          <div class="frame-image-2">
                            <b-img
                              :src="img.ImageLink"
                              @click="showWallpaper(dataImages, img.ID)"
                            ></b-img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </b-col>
                <b-col lg="4">
                  <div class="d-flex flex-wrap justify-content-between mb-2">
                    <div class="text-info">
                      <strong>
                        <i class="fas fa-user-check"></i>
                        <span style="font-size: 12px"
                          >THÔNG TIN XÉT DUYỆT</span
                        ></strong
                      >
                    </div>
                    <div class="d-flex align-items-center">
                      <label class="mb-0 mr-2">Trạng thái</label>
                      <b-badge variant="success">Đã xác nhận</b-badge>
                    </div>
                  </div>
                  <b-row>
                    <b-col lg="6">
                      <b-form-group label="Thời gian xét duyệt">
                        <b-form-input
                          v-model="dataForm.approvalTime"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="6">
                      <b-form-group label="Người xét duyệt">
                        <b-form-input
                          v-model="dataForm.approver"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="12">
                      <b-form-group label="Nội dung xét duyệt">
                        <b-form-input
                          v-model="dataForm.approvalContent"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="12" class="d-flex justify-content-end">
                      <b-button
                        squared
                        variant="success"
                        class="mr-2"
                        @click="showConfirmModal"
                        style="
                          height: 37px;
                          white-space: nowrap;
                          padding: 0.25rem 0.5rem;
                        "
                        ><i class="far fa-check-circle mr-1"></i><b>Xác nhận</b>
                      </b-button>
                      <b-button
                        squared
                        variant="danger"
                        @click="showRefuseModal"
                        style="
                          height: 37px;
                          white-space: nowrap;
                          padding: 0.25rem 0.5rem;
                        "
                        ><i class="fas fa-ban mr-1"></i><b>Từ chối</b>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </div>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <TitleMajor :titleOption="titleOption" :currentTitle="currentTitle" />
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
          <TitleMajor :titleOption="titleOption" :currentTitle="currentTitle" />
          <table-list-file></table-list-file>
        </div>
      </b-tab>
    </b-tabs>
    <ActionsFooterNPL
      :activeFocus="currentTab"
      @change-tab="updateTab"
    ></ActionsFooterNPL>
    <ModalImport :show="showModalImport" @hidden="showModalImport = false" />
    <ModalFind
      :fieldsTable="fieldsTable"
      :show="showModalFind"
      @hidden="showModalFind = false"
    />
    <ModalPrint :show="showModalPrint" @hidden="showModalPrint = false" />
    <!-- MODULE-IMAGE -->
    <div id="fullscreen-wallpaper-light">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>

    <!-- MODAL REFUSE -->
    <b-modal id="modal-refuse" title="Từ chối" size="md">
      <b-form-group label="Lý do từ chối">
        <b-textarea rows="3" max-rows="6" v-model="refuseReason"></b-textarea>
      </b-form-group>
    </b-modal>
    <!-- MODAL CONFIRM -->
    <b-modal id="modal-confirm" title="Xác nhận" size="md">
      <b-form-group label="Số dầu được phép đổ">
        <b-form-input v-model="approvalOil" class="text-right"></b-form-input>
      </b-form-group>
      <b-form-group label="Nội dung xét duyệt">
        <b-textarea
          rows="3"
          max-rows="6"
          v-model="approvalContent"
        ></b-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import TitleMajor from "./TitleMajor";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import LocationComponent from "@/components/Map/LocationComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ModalFind from "./ModalFind.vue";
import ModalPrint from "./ModalPrint.vue";
import ModalImport from "./ModalImport.vue";

export default {
  props: ["tabParent"],
  components: {
    ActionsHeaderNPL,
    ActionsFooterNPL,
    Status,
    TitleMajor,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    "location-component": LocationComponent,
    "custom-carousel-component": BCarouselComponent,
    ModalFind,
    ModalPrint,
    ModalImport,
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
          label: "Mã chứng từ",
        },
        {
          key: "date",
          label: "Ngày chứng từ",
        },
        {
          key: "licensePlate",
          label: "Số xe",
        },
        {
          key: "driver",
          label: "Tài xế",
        },
        {
          key: "requestTime",
          label: "Thời gian yêu cầu",
        },
        {
          key: "currentKm",
          label: "Số km hiện tại",
          tdClass: "text-right",
        },
        {
          key: "requestOil",
          label: "Số lít dầu yêu cầu đổ",
          tdClass: "text-right",
        },
        {
          key: "approver",
          label: "Người duyệt",
        },
        {
          key: "approvalTime",
          label: "Thời gian duyệt",
        },
        {
          key: "aprovalContent",
          label: "Nội dung duyệt",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "statusName",
          label: "Trạng thái",
        },
      ],
      dataTable: [
        {
          ID: "BCSC/001",
          date: "22/11/2022",
          licensePlate: "51C 1234",
          driver: "Nguyễn Văn A",
          requestTime: "21/11/2022, 20:00",
          currentKm: "50 km",
          requestOil: "10 lít",
          note: "",
          statusName: "Chờ duyệt",
          statusColor: "gray",
          approver: "Phạm Văn Hoàng",
          approvalTime: "25/11/2022, 14:00",
          aprovalContent: "Phê duyệt chứng từ BCSC/001",
        },
        {
          ID: "BCSC/001",
          date: "22/11/2022",
          licensePlate: "51C 3142",
          driver: "Nguyễn Văn A",
          requestTime: "22/11/2022, 20:00",
          currentKm: "50 km",
          requestOil: "10 lít",
          note: "",
          statusName: "Chờ duyệt",
          statusColor: "gray",
          approver: "Phạm Văn Hoàng",
          approvalTime: "25/11/2022, 14:00",
          aprovalContent: "Phê duyệt chứng từ BCSC/001",
        },
        {
          ID: "BCSC/001",
          date: "22/11/2022",
          licensePlate: "51C 3153",
          driver: "Nguyễn Văn A",
          requestTime: "22/11/2022, 20:00",
          currentKm: "50 km",
          requestOil: "10 lít",
          note: "",
          statusName: "Đã duyệt",
          statusColor: "green",
          approver: "Phạm Văn Hoàng",
          approvalTime: "25/11/2022, 14:00",
          aprovalContent: "Phê duyệt chứng từ BCSC/001",
        },
        {
          ID: "BCSC/001",
          date: "22/11/2022",
          licensePlate: "51C 5421",
          driver: "Nguyễn Văn A",
          requestTime: "22/11/2022, 20:00",
          currentKm: "50 km",
          requestOil: "10 lít",
          note: "",
          statusName: "Từ chối",
          statusColor: "red",
          approver: "Phạm Văn Hoàng",
          approvalTime: "25/11/2022, 14:00",
          aprovalContent: "Phê duyệt chứng từ BCSC/001",
        },
      ],
      //type
      typeDonHang: "",

      ///////
      currentTitle: "Xin đổ dầu",
      titleOption: [
        {
          id: 0,
          label: "Xin đổ dầu",
        },
      ],
      dataForm: null,
      dataImages: [
        {
          ID: 0,
          ImageLink:
            "https://sanbonbanh.com/uploads/sellcar/2021_10/dong-ho-contermet-mercedes-gls450-4matic-model-2021-15.jpg",
        },
        {
          ID: 1,
          ImageLink:
            "https://imgd.aeplcdn.com/0x0/n/cw/ec/95489/maybach-gls-interior-instrument-cluster.jpeg?isig=0",
        },
        {
          ID: 2,
          ImageLink:
            "https://cdn.carbuzz.com/gallery-images/2020-mercedes-benz-s-class-convertible-gauge-cluster-carbuzz-584946.jpg",
        },
        {
          ID: 3,
          ImageLink: "https://i.ytimg.com/vi/WKhy2gSmbW8/maxresdefault.jpg",
        },
      ],
      listImage: null,
      licensePlatesOptions: [
        { value: "51C 1234", text: "51C 1234" },
        { value: "51C 3142", text: "51C 3142" },
        { value: "51C 3153", text: "51C 3153" },
        { value: "51C 5421", text: "51C 5421" },
      ],
      licensePlatesInfo: [
        {
          licensePlate: "51C 1234",
          type: "HW1000",
          licensePlateMooc: "51C 1234",
          licensePlateMoocType: "Moóc xương",
          driver: "Trần Văn A",
          CMND: "00124574556",
          phone: "123456789",
          address: "43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM",
          GPLX: "G1321",
          GPLXExpiredDate: "21/12/2025",
        },
        {
          licensePlate: "51C 3142",
          type: "HW2000",
          licensePlateMooc: "51C 1235",
          licensePlateMoocType: "Moóc sàn",
          driver: "Phạm Thị B",
          CMND: "99912287412",
          phone: "647521976448",
          address: "1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM",
          GPLX: "G9789",
          GPLXExpiredDate: "01/01/2024",
        },
        {
          licensePlate: "51C 3153",
          type: "HW3000",
          licensePlateMooc: "51C 1236",
          licensePlateMoocType: "Moóc xương",
          driver: "Trần Văn C",
          CMND: "00124574556",
          phone: "123456789",
          address: "43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM",
          GPLX: "G1321",
          GPLXExpiredDate: "21/12/2025",
        },
        {
          licensePlate: "51C 5421",
          type: "HW4000",
          licensePlateMooc: "51C 1237",
          licensePlateMoocType: "Moóc sàn",
          driver: "Lê Thị D",
          CMND: "99912287412",
          phone: "647521976448",
          address: "1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM",
          GPLX: "G9789",
          GPLXExpiredDate: "01/01/2024",
        },
      ],
      refuseReason: "",
      dataCalcOil: {
        "Số km đổ dầu lần trước": "1000",
        "Số km hiện tại": "2000",
        "Số vận đơn": "3",
        "Số lít dầu đã đổ": "50",
        "Dầu tồn lần trước": "10",
        "Số km đã chạy": "1000",
        "Số lít dầu tiêu hao": "15",
        "Số lít dầu phụ cấp": "10",
        "Số lít dầu tồn hiện tại": "35",
      },
      approvalContent: "",
      approvalOil: "",

      showModalFind: false,
      showModalPrint: false,
      showModalImport: false,
    };
  },
  methods: {
    //tab
    updateTab(value) {
      this.currentTab = value;
    },
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
          // setTimeout(() => {
          //   this.$bvModal.show(`modal-print-${this.keyComponent}`);
          // }, 500);
          this.showModalPrint = true;
          break;
        case "import":
          // setTimeout(() => {
          //   this.$bvModal.show(`modal-import-${this.keyComponent}`);
          // }, 500);
          // this.handleShowImportFile();
          this.showModalImport = true;
          break;
        case "find":
          // setTimeout(() => {
          //   this.$bvModal.show(`modal-find-${this.keyComponent}`);
          // }, 500);
          this.showModalFind = true;
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
      // this.typeDonHang = row.LoaiHang.toUpperCase();
      this.currentTab = 1;
      this.dataForm = {
        ...row,
        approvalTime: this.dateToday(),
        approvalContent: "Phê duyệt xin đổ dầu chứng từ BCSC/001",
        approver: "Phạm Văn Hoàng",
        statusName: "Đã xác nhận",
      };
    },
    handleShowNotify() {
      setTimeout(() => {
        this.$notify("success", "THÔNG BÁO", "Xử Lí Thành Công !");
      }, 100);
    },
    removeImage(index) {
      let remove = this.listImageBase64.splice(index, 1);
    },
    ////////
    dateToday() {
      const now = new Date();
      return `${moment(now).format("DD/MM/YYYY")}, ${moment(now).format(
        "HH:mm"
      )}`;
    },
    //module-img
    showWallpaper(list, key) {
      let result = [];
      list.map((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.ImageLink, //img
        };
        result.push(obj);
      });
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });

      this.listImage = [...result];
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      targetDiv.style.display = "none";
    },
    showRefuseModal() {
      this.$bvModal.show("modal-refuse");
    },
    showConfirmModal() {
      this.$bvModal.show("modal-confirm");
    },
  },
  created() {
    this.dataForm = {
      ...this.dataTable[this.dataTable.length - 1],
      approvalTime: this.dateToday(),
      approvalContent: "Phê duyệt xin đổ dầu chứng từ BCSC/001",
      approver: "Phạm Văn Hoàng",
      statusName: "Đã xác nhận",
    };
  },
  watch: {
    "dataForm.licensePlate"(to) {
      const obj = this.licensePlatesInfo.find(
        (item) => item.licensePlate == to
      );
      this.dataForm = {
        ...this.dataForm,
        ...obj,
      };
    },
    tabParent() {
      this.currentTab = 0;
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
.border-map-mini-two {
  width: 100%;
  height: 300px;
  // box-shadow: 0 1px 15px rgba(0, 0, 0, 0.4), 0 1px 6px rgba(0, 0, 0, 0.4);
}
.image-accident {
  height: 319px;
  overflow-y: auto;
}
.item-image {
  padding: 5px;
  background: whitesmoke;
  // flex: 0 0 30%;
  width: 100%;
  // margin: 5px;
  margin-bottom: 5px;
  // display: flex;
}
.frame-image {
  // margin-top: 5px;
  margin: auto;
  display: block;
  position: relative;
  // padding-top: 75%; //4:3
  padding-top: 56.25%; //16:9
}
.frame-image-2 {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
<style scoped>
/* module-img */
#fullscreen-wallpaper-light {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper-light .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper-light .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn i {
  font-size: 20px;
}
</style>
