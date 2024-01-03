<template>
  <div id="app-content-full" class="form-npl-kinh-doanh" style="overflow: auto">
    <b-card>
      <div class="form-basic npl-table-basic-form npl-maintenance">
        <ActionsHeaderNPL
          @first-index="updateFirstIndex"
          @pre-index="updatePreIndex"
          @next-index="updateNextIndex"
          @last-index="updateLastIndex"
          :currentIndex="currentIndex"
          :isAdd="isAdd"
          :isEdit="isEdit"
          :isDelete="isDelete"
          @change-actions="handleChangeActions"
        ></ActionsHeaderNPL>

        <b-tabs v-model="currentTab" nav-class="d-none">
          <b-tab
            ><div class="box-content p-1">
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form"
                :fields="tempData.fieldsManagement"
                :items="tempData.dataManagement"
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
                  <div style="max-width: 120px">
                    <Status
                      :color="row.item.statusColor"
                      :label="row.item.statusName"
                      :showCircle="false"
                    ></Status>
                  </div>
                </template>
              </b-table>
              <b-pagination
                align="center"
                :total-rows="tempData.dataManagement.length"
                :per-page="perPage"
                v-model="currentPage"
                size="sm"
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
          </b-tab>
          <b-tab>
            <div class="box-content">
              <TitleMajor
                :titleOption="titleOption"
                :currentTitle="currentTitle"
              />
              <div class="box-content-detail">
                <b-row>
                  <b-col lg="3">
                    <b-row>
                      <b-col lg="6">
                        <b-form-group label="Chứng từ">
                          <b-form-input
                            v-model="dataForm['ID']"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Ngày áp dụng">
                          <datepicker
                            :language="locale"
                            :format="datePickerFormat"
                            :bootstrap-styling="true"
                            :placeholder="'Chọn ngày'"
                            v-model="dataForm['date']"
                            @input="convertDate(dataForm['date'])"
                          ></datepicker>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <b-form-group label="Khách hàng">
                          <b-form-select
                            v-model="dataForm['customer']"
                            :options="tempData.customerOptions"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <b-form-group label="Địa chỉ">
                          <b-form-input
                            v-model="changeAddress"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Điện thoại">
                          <b-form-input
                            v-model="changePhone"
                            class="text-right"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Email">
                          <b-form-input
                            v-model="changeEmail"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="3">
                    <b-row>
                      <b-col lg="12">
                        <b-form-group label="Tuyến đường">
                          <b-form-select
                            v-model="dataForm['route']"
                            :options="tempData.routeOptions"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Mặt hàng">
                          <b-form-select
                            v-model="dataForm['goods']"
                            :options="tempData.goodsOptions"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Đơn vị tính">
                          <v-select
                            v-model="dataForm['units']"
                            :reduce="(item) => item.value"
                            :options="tempData.unitsOptions"
                          />
                        </b-form-group>
                        <!-- <b-form-group label="Loại hàng">
                          <b-form-select
                            v-model="dataForm['typeOfGoods']"
                            :options="tempData.typeOfGoodsOptions"
                          ></b-form-select>
                        </b-form-group> -->
                      </b-col>
                      <b-col lg="12">
                        <b-form-group label="Yêu cầu đặt biệt">
                          <v-select
                            v-model="dataForm['specialRequestID']"
                            multiple
                            :reduce="(item) => item.value"
                            :options="tempData.specialRequestOptions"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Giá chưa VAT">
                          <b-form-input
                            v-model="dataForm['costNoVAT']"
                            class="text-right"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="% VAT">
                          <b-form-input
                            v-model="dataForm['vat']"
                            class="text-right"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Giá có VAT">
                          <b-form-input
                            v-model="changeCostIncludeVAT"
                            class="text-right"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="6"> </b-col>
                  <b-col lg="6">
                    <b-form-group label="Ghi chú">
                      <b-form-textarea
                        rows="2"
                        max-rows="6"
                        v-model="dataForm['note']"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-tab>
          <b-tab
            ><div class="box-content">
              <TitleMajor
                :titleOption="titleOption"
                :currentTitle="currentTitle"
              />
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
              <TitleMajor
                :titleOption="titleOption"
                :currentTitle="currentTitle"
              />
              <table-list-file></table-list-file>
            </div>
          </b-tab>
        </b-tabs>
        <ActionsFooterNPL
          :activeFocus="currentTab"
          @change-tab="updateTab"
        ></ActionsFooterNPL>
        <b-modal :id="`modal-import-${keyComponent}`" title="ĐÍNH KÈM FILE">
          <b-row>
            <b-col lg="12">
              <b-form-group :label="'Tiêu đề'">
                <b-form-input></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="'File'">
                <b-form-file
                  :placeholder="'Xin mời chọn...'"
                  v-model="files"
                  multiple
                  accept="/*"
                  :browse-text="'Chọn Tệp'"
                ></b-form-file>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="'Ghi chú'">
                <b-form-textarea rows="2" max-rows="6"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          :id="`modal-find-${keyComponent}`"
          title="TÌM, LỌC DỮ LIỆU"
          size="lg"
        >
          <template v-for="(field, i) in fieldsTable">
            <div
              :key="i"
              class="d-flex justify-content-between align-items-center mb-1"
            >
              <div style="width: 100%">
                <strong>{{ field.label }}</strong>
              </div>
              <div style="width: 100%" class="text-right">
                <span style="color: #145388"
                  ><b>{{ currentSearch }}</b></span
                >
                <b-dropdown
                  class="title-dropdown ml-1 mr-4"
                  variant="link"
                  toggle-class="text-decoration-none"
                >
                  <b-dropdown-item
                    @click="changeTypeSearch('Lớn hơn')"
                    href="#"
                  >
                    Lớn hơn</b-dropdown-item
                  >
                  <b-dropdown-item @click="changeTypeSearch('Bé hơn')" href="#">
                    Bé hơn</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('Lớn hoặc bằng')"
                    href="#"
                    >Lớn hoặc bằng</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('Bé hoặc bằng')"
                    href="#"
                    >Bé hoặc bằng</b-dropdown-item
                  >
                  <b-dropdown-item @click="changeTypeSearch('Bằng')" href="#"
                    >Bằng</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('Trong khoảng')"
                    href="#"
                    >Trong khoảng</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div style="width: 100%" class="mr-2">
                <div>Giá trị 1</div>
                <b-form-input></b-form-input>
              </div>
              <div style="width: 100%">
                <div>Giá trị 2</div>
                <b-form-input></b-form-input>
              </div>
            </div>
          </template>
        </b-modal>
        <b-modal
          :id="`modal-print-${keyComponent}`"
          title="DANH SÁCH MẪU IN"
          size="lg"
          @ok="handlePrint"
        >
          <b-row>
            <b-col lg="12">
              <b-table
                select-mode="single"
                bordered
                :items="dataPrint"
                :fields="fieldsPrint"
                selectable
              >
                <template #cell(actions)>
                  <div>
                    <b-button size="sm" variant="outline-primary">
                      <b>chọn</b>
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import { mapGetters } from "vuex";
import TitleMajor from "@/views/app/function/npl/kinh-doanh/component/TitleMajor.vue";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import tempData from "@/data/modules/npl/shippingCost(2.2)";

export default {
  // props: ["items", "fields", "title"],
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    TitleMajor,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      // dataForm: this.items?.length > 0 ? this.items[0] : null,
      dataForm:
        tempData.dataManagement[tempData.dataManagement.length - 1] || null,
      dataBackup: null,
      fieldsTable: tempData.fieldsManagement ?? [],
      dataTable: this.items ?? [],
      totalRows: this.items?.length > 0 ? this.items.length : 0,
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
      //print
      fieldsPrint: [
        {
          key: "name",
          label: "Tên",
        },
      ],
      dataPrint: [
        {
          name: "Mẫu In 1",
        },
        {
          name: "Mẫu In 2",
        },
        {
          name: "Mẫu In 3",
        },
      ],
      //key-component
      keyComponent: "basic",
      //title-options
      currentTitle: "Đề xuất giá vận chuyển" ?? null,
      // titleOption: TitleOption.data,
      //table-chil-by-key
      fieldsByKey: {},
      dataByKey: {},
      //search
      currentSearch: "Chọn loại tìm kiếm",
      options: this.optionByKey ?? {},
      //actions-header
      isAdd: false,
      isEdit: false,
      isDelete: false,
      //import-file
      files: null,
      listFile: [],
      //history-actions
      typeAction: null,
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
          dateTime: "13:10 10/11/2022",
          userName: "Trần Văn A",
          typeAction: "add",
          note: "",
        },
        {
          dateTime: "15:10 10/11/2022",
          userName: "Trần Văn B",
          typeAction: "edit",
          note: "phát sinh abc...",
        },
        {
          dateTime: "12:10 11/11/2022",
          userName: "Trần Văn C",
          typeAction: "delete",
          note: "Không đủ xe vận tải",
        },
      ],
      isAdd: false,
      isEdit: false,
      isDelete: false,
      //import-file
      files: null,
      listFile: [],
      //history-actions
      typeAction: null,
      // fieldsHisAction: [
      //   {
      //     key: "dateTime",
      //     label: "Ngày thao tác",
      //   },
      //   {
      //     key: "userName",
      //     label: "Người thao tác",
      //   },
      //   {
      //     key: "referenceID",
      //     label: "Mã chứng từ",
      //   },
      //   {
      //     key: "typeAction",
      //     label: "Loại thao tác",
      //   },
      // ],
      //dataHisAction: [
      //        {
      //          time: "10:15P",
      //          performer: "Trần văn A",
      //          action: "Tạo mới chứng từ",
      //          note: "",
      //        },
      //        {
      //          time: "10:20P",
      //          performer: "Trần văn A",
      //          action: "Khóa chứng từ",
      //          note: "",
      //        },
      //      ],
      //fieldsHisAction: [
      //        { key: "time", label: "Thời gian" },
      //        { key: "performer", label: "Người thực hiện" },
      //        { key: "action", label: "Thao tác" },
      //        { key: "note", label: "Ghi chú" },
      //      ],
      dataFileAttach: [
        {
          time: "10:15P",
          performer: "Trần văn A",
          file: "Hóa đơn bán hàng",
          note: "",
        },
        {
          time: "10:25P",
          performer: "Trần văn A",
          file: "Hợp đồng giao hàng",
          note: "",
        },
      ],
      fieldsFileAttach: [
        { key: "time", label: "Thời gian" },
        { key: "performer", label: "Người thực hiện" },
        { key: "file", label: "File đính kèm" },
        { key: "note", label: "Ghi chú" },
      ],
      ////////
      tempData: tempData,
      title: "giá vận chuyển",
      isLock: false,
      perPageTable2: 10,
      currentPageTable2: 1,
      perPageTable3: 10,
      currentPageTable3: 1,
      modalSelectName: "",
      modalSelectTitle: "",
      dataTableModalSelect: [],
      fieldsTableModalSelect: [],
      titleOption: [
        {
          id: 0,
          label: "Đề xuất giá vận chuyển",
        },
      ],
      dataDetailMaintenanceRender: [],
      fieldsDetailMaintenanceRender: [
        { key: "period", label: "Kỳ bảo dưỡng" },
        { key: "name", label: "Tên kỳ bảo dưỡng" },
        { key: "km", label: "Số km theo chu kỳ" },
        { key: "tolerance", label: "Dung sai (+)/biên độ" },
      ],
      dataWorkPeriodRender: [],
      fieldsWorkPeriodRender: [
        { key: "period", label: "Chu kỳ" },
        { key: "work", label: "Công việc", type: "select" },
        { key: "supplies", label: "Vật tư/PTTT" },
        {
          key: "amountOfSupplies",
          label: "Số lượng vật tư",
          tdClass: "text-right",
        },
      ],
      formAddRow: [],
      modalAddRowName: "",
      changeCostIncludeVAT: "",
      newSpecialRequestOptions: [],
      changeAddress: "",
      changePhone: "",
      changeEmail: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    const obj = this.tempData.dataCustomerInfo.find(
      (item) => item.customer == this.dataForm.customer
    );
    this.changeAddress = obj.address;
    this.changeEmail = obj.email;
    this.changePhone = obj.phone;

    this.setChangeCostIncludeVAT(this.dataForm.costNoVAT, this.dataForm.vat);
    this.newSpecialRequestOptions = this.tempData.specialRequestOptions.map(
      (item) => ({
        id: item.value,
        label: item.text,
      })
    );
  },
  watch: {
    files(val) {
      console.log(1, "files", val);
    },
    currentTab() {
      this.dataDetailMaintenanceRender = this.tempData.dataMaintenance;
      this.dataWorkPeriodRender = this.tempData.dataWorkPeriod;
    },
    "dataForm.costNoVAT"() {
      this.setChangeCostIncludeVAT(this.dataForm.costNoVAT, this.dataForm.vat);
    },
    "dataForm.vat"() {
      this.setChangeCostIncludeVAT(this.dataForm.costNoVAT, this.dataForm.vat);
    },
    "dataForm.customer"() {
      const obj = this.tempData.dataCustomerInfo.find(
        (item) => item.customer == this.dataForm.customer
      );
      this.changeAddress = obj.address;
      this.changeEmail = obj.email;
      this.changePhone = obj.phone;
    },
  },
  methods: {
    handlePrint() {
      this.$notify("warning", "THÔNG BÁO", "Đang tải xử lí...", {
        duration: 2000,
        permanent: false,
      });
      setTimeout(() => {
        this.$notify("success", "THÔNG BÁO", "In thành công !", {
          duration: 3000,
          permanent: false,
        });
      }, 2000);
    },
    changeTypeSearch(value) {
      // this.currentSearch = value;
    },
    changeTitle(obj) {
      this.currentTitle = obj.label;
    },
    handleShowImportFile() {
      setTimeout(() => {
        this.$bvModal.show(`modal-import-${this.keyComponent}`);
      }, 500);
    },
    pushHistory() {
      if (this.typeAction) {
        let row = {
          dateTime: Handling.getDateTimeNow(),
          userName: this.currentUser.UserName,
          referenceID: this.dataForm.ID,
          typeAction: this.typeAction,
        };
        this.dataHisAction.unshift(row);
        this.typeAction = null;
      }
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
          this.handleAdd();
          break;
        case "edit":
          this.typeAction = key;
          this.isEdit = !bol;
          this.isAdd = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          break;
        case "delete":
          this.typeAction = key;
          this.pushHistory();
          this.deleteModal();
          break;
        case "save":
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.handleSave();
          this.pushHistory();
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
          setTimeout(() => {
            this.$bvModal.show(`modal-print-${this.keyComponent}`);
          }, 500);

          break;
        case "import":
          this.handleShowImportFile();
          break;
        case "find":
          setTimeout(() => {
            this.$bvModal.show(`modal-find-${this.keyComponent}`);
          }, 500);
          break;
      }
    },
    convertDate(key) {
      this.dataForm[key] = Handling.convertDateNPL(this.dataForm[key]);
    },
    updateFirstIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = 0;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updatePreIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == 0) {
        this.currentIndex = 0;
      } else {
        this.currentIndex -= 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateNextIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == this.dataTable.length - 1) {
        this.currentIndex = this.dataTable.length - 1;
      } else {
        this.currentIndex += 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateLastIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = this.dataTable.length - 1;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    handleDbClick(row, index) {
      this.currentTab = 1;
      return;
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = index;
      this.dataForm = { ...row };
      this.currentTab = 1;
    },
    updateTab(value) {
      this.currentTab = value;
    },
    handleAdd() {
      for (const key in this.dataForm) {
        this.dataForm[key] = null;
      }
      this.dataForm.ID = moment(new Date()).format("HH:mm:ss").toString();
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
    },
    handleSave() {
      this.dataTable = this.dataTable.filter(
        (row) => row.ID != this.dataForm.ID
      );
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công", {
        duration: 3000,
        permanent: false,
      });
    },
    deleteModal() {
      this.$bvModal
        .msgBoxConfirm(`Bạn muốn xóa ${this.dataForm.ID} ?`, {
          title: "CẢNH BÁO",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Đồng ý",
          cancelTitle: "Hủy",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.dataTable = this.dataTable.filter(
              (row) => row.ID != this.dataForm.ID
            );
            if (this.dataTable?.length > 0) {
              this.dataForm = { ...this.dataTable[0] };
              this.currentIndex = 0;
              this.$notify("success", "THÔNG BÁO", "Xử lí thành công", {
                duration: 3000,
                permanent: false,
              });
            } else {
              this.dataForm = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModalSelect(name) {
      this.modalSelectName = `modal-select-${name}`;
      if (name == "section1") {
        this.modalSelectTitle = "Danh mục tuyến đường";

        if (this.dataTableSection1?.length) {
          const arr = [];
          this.dataTableSection1.forEach((item) => {
            // const obj = this.selectedVehicle.find(vehicle => vehicle.licensePlates == item.licensePlates)
            // arr.push({
            //   ...item,
            //   isSelected: obj ? true : false
            // })
            arr.push({
              ...item,
              isSelected: false,
            });
          });
          this.dataTableModalSelect = arr;
          this.fieldsTableModalSelect = this.fieldsTableSection1;
        }
      } else if (name == "section2") {
        this.modalAddRowTitle = "Danh mục đội xe";

        if (this.tempData.dataGroupVehicleAllowance?.length) {
          const arr = [];
          this.tempData.dataGroupVehicleAllowance.forEach((item) => {
            // const obj = this.selectedRoute.find(route => route.ID == item.ID)
            // arr.push({
            //   ...item,
            //   isSelected: obj ? true : false
            // })
            arr.push({
              ...item,
              isSelected: false,
            });
          });
          this.dataTableModalSelect = arr;
          this.fieldsTableModalSelect = this.fieldsTableSection2;
        }
      }
      setTimeout(() => {
        this.$bvModal.show(this.modalSelectName);
      }, 300);
    },
    handleModalSelect() {},
    showModalAddRow(value) {
      this.modalAddRowName = `modal-select-${value}`;

      if (value == "section1") {
        this.formAddRow = [...this.fieldsDetailMaintenanceRender];
      } else if (value == "section2") {
        this.formAddRow = [...this.fieldsWorkPeriodRender];
      }
      setTimeout(() => {
        this.$bvModal.show(this.modalAddRowName);
      }, 300);
    },
    handleModalAddRow() {
      const val = this.modalAddRowName.slice(13);
      let obj = {};
      this.formAddRow.forEach((item) => {
        obj[item.key] = item.value;
      });
      switch (val) {
        case "section1":
          this.dataDetailMaintenanceRender = [
            ...this.dataDetailMaintenanceRender,
            obj,
          ];
          break;

        case "section2":
          obj.supplies = this.changeSupplies;
          obj.amountOfSupplies = this.changeAmountOfSupplies;
          this.dataWorkPeriodRender = [...this.dataWorkPeriodRender, obj];
          break;

        default:
          break;
      }
    },
    addRow(value) {
      if (value == "section1") {
        this.dataDetailMaintenanceRender = [
          ...this.dataDetailMaintenanceRender,
          {
            period: "",
            name: "",
            km: "",
            tolerance: "",
            isNewRow: true,
          },
        ];
      } else if (value == "section2") {
        this.dataWorkPeriodRender = [
          ...this.dataWorkPeriodRender,
          {
            period: "",
            work: "",
            supplies: "",
            amountOfSupplies: "",
            isNewRow: true,
          },
        ];
      }
    },
    setChangeCostIncludeVAT(costBeforeVAT, vat) {
      if (costBeforeVAT && vat) {
        const newCostBeforeVAT = costBeforeVAT.replace(/\./g, "");
        const a = parseFloat(vat) / 100;
        const b = parseFloat(newCostBeforeVAT) * a;
        const c = parseFloat(newCostBeforeVAT) + b;
        this.changeCostIncludeVAT = c.toLocaleString();
      } else {
        this.changeCostIncludeVAT = 0;
      }
    },
  },
};
</script>

<style lang="scss">
.npl-table-basic-form .table th {
  white-space: nowrap;
}
.npl-maintenance {
  .title-dropdown button {
    font-size: 20px;
    padding: 0;
  }
  table {
    margin-bottom: 0;
  }
  .table-responsive {
    margin-bottom: 0;
  }
  th {
    padding: 0.5rem;
  }
  td {
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.5rem;
  }
  .box-content-detail {
    position: relative;
  }
  .btn-show-modal-select {
    padding: 0.25rem 0.7rem;
    border-radius: 0;
  }
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
}
.npl-modal-add-row {
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
}
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 235px);
  overflow: auto;
  padding-right: 15px;
}
.btn-remove {
  display: flex;
  justify-content: center;

  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f5f5f5;
    }
  }
}
.style-special {
  font-weight: 700;
  font-size: 14px;
}
</style>
