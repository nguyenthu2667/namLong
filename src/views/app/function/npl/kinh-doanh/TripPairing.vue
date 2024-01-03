<template>
  <div id="app-content-full" class="form-npl-kinh-doanh" style="overflow: auto">
    <b-card>
      <div class="form-basic npl-table-basic-form crane-allowance">
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
                <!-- <div
                  class="btn-block-non-block bg-primary shadow"
                  v-if="isLock"
                >
                  <i class="fas fa-lock-alt mr-1"></i>
                  Đã khóa
                </div>
                <div
                  class="btn-block-non-block bg-dark text-light shadow"
                  v-else
                >
                  <i class="fas fa-unlock-alt mr-1"></i>
                  Chưa khóa
                </div> -->
                <div class="d-flex flex-wrap">
                  <b-col lg="4" class="pl-0">
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
                            :disabled="isEdit || isAdd ? false : true"
                          ></datepicker>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <b-form-group label="Ghi chú">
                          <b-form-textarea
                            rows="2"
                            max-rows="6"
                            v-model="dataForm['note']"
                            :disabled="isEdit || isAdd ? false : true"
                          ></b-form-textarea>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="6">
                    <div class="table-relative">
                      <div class="d-flex flex-wrap align-items-center">
                        <div class="style-special">*Chi tiết quy đổi</div>
                        <!-- <b-button
                          size="sm"
                          variant="primary"
                          class="d-inline-block ml-2 btn-show-modal-select"
                          @click="showModalSelect('section1')"
                          >Chọn</b-button
                        > -->
                        <b-button
                          size="sm"
                          variant="primary"
                          class="d-inline-block ml-2 btn-show-modal-select"
                          @click="showModalAdd('section1')"
                          >Thêm</b-button
                        >
                      </div>
                      <b-table
                        :items="selectedSection1"
                        :fields="fieldsSelectedSection1"
                        :bordered="true"
                        show-empty
                        head-variant="light"
                      >
                        <template #cell(delete)>
                          <div class="text-center btn-remove">
                            <div class="text-danger">
                              <i class="fad fa-trash-alt"></i>
                            </div>
                          </div>
                        </template>
                      </b-table>
                    </div>
                  </b-col>
                </div>
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
        <!-- MODAL RIÊNG -->
        <b-modal
          :id="modalSelectName"
          scrollable
          class="text-center"
          size="lg"
          hide-header
          @ok="handleModalSelect"
          ok-title="Xác nhận"
          cancel-title="Đóng"
        >
          <div class="modal-select-table">
            <h5 class="text-center">{{ modalSelectTitle }}</h5>
            <b-table
              :items="dataTableModalSelect"
              :fields="fieldsTableModalSelect"
              :bordered="true"
              show-empty
              head-variant="light"
            >
              <template #cell(isSelected)="row">
                <div class="d-flex justify-content-center ml-2">
                  <b-form-checkbox
                    v-model="row.item.isSelected"
                    :value="true"
                    :unchecked-value="false"
                  >
                  </b-form-checkbox>
                </div>
              </template>
              <template #empty>
                <div class="text-center">Không có dữ liệu</div>
              </template>
            </b-table>
            <b-pagination
              align="center"
              :total-rows="dataTableModalSelect.length"
              :per-page="perPageTable3"
              v-model="currentPageTable3"
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
        </b-modal>
        <b-modal
          :id="modalAddName"
          scrollable
          class="text-center"
          size="md"
          title="Thêm quy đổi"
          @ok="handleModalAdd"
          ok-title="Thêm"
          cancel-title="Đóng"
          body-class="body-modal-add"
        >
          <template v-if="formModalAdd">
            <template v-if="sectionModalAdd == 'section1'">
              <b-row>
                <b-col lg="12">
                  <b-form-group label="Tuyến đường">
                    <b-form-select
                      :options="tempData.routeOptions"
                      v-model="formModalAdd.route"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Số lần quy đổi/chuyến">
                    <b-form-input
                      v-model="formModalAdd.numberOfExchange"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Số tiền quy đổi">
                    <b-form-input
                      v-model="formModalAdd.amount"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
          </template>
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
import tempData from "@/data/modules/npl/exchangeForJointTripsIncreaseTips(1.10)";

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
      keyComponent: "trip-pairing",
      //title-options
      currentTitle: 'Định mức Quy đổi chuyến ghép/tăng bo' ?? null,
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
      ////////
      tempData: tempData,
      // title: "Quy đổi chuyến ghép/tăng bo",
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
          label: "Định mức Quy đổi chuyến ghép/tăng bo",
        },
      ],
      selectedSection1: [],
      fieldsSelectedSection1: [
        { key: "route", label: "Tuyến đường" },
        {
          key: "numberOfExchange",
          label: "Số lần quy đổi/chuyến",
          tdClass: "text-right",
        },
        { key: "amount", label: "Số tiền quy đổi", tdClass: "text-right" },
        {
          key: "delete",
          label: "Xóa",
          thClass: "text-center",
        },
      ],
      dataTableSection1: [
        {
          route: "Bình Dương - Bình Phước",
          numberOfExchange: "10",
          amount: "500.000",
        },
        {
          route: "Cát Lái - Tân Tạo",
          numberOfExchange: "8",
          amount: "400.000",
        },
      ],
      fieldsTableSection1: [
        { key: "route", label: "Tuyến đường" },
        {
          key: "isSelected",
          label: "Chọn",
          thClass: "text-center",
        },
      ],
      modalAddName: "",
      sectionModalAdd: "",
      formModalAdd: null,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.selectedSection1 = this.dataTableSection1;
  },
  watch: {
    files(val) {
      console.log(1, "files", val);
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
        this.modalSelectTitle = "Danh mục đội xe";

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
    addRow() {
      const newIndex = this.detailCraneRender.length + 1;
      this.detailCraneRender = [
        ...this.detailCraneRender,
        {
          time: newIndex.toString(),
          amount: "",
          isNewRow: true,
        },
      ];
    },
    showModalAdd(name) {
      this.modalAddName = `modal-add-${name}`;
      this.sectionModalAdd = name;

      if (name == "section1") {
        this.formModalAdd = {};
      } else if (name == "section2") {
        this.formModalAdd = {};
      }

      setTimeout(() => {
        this.$bvModal.show(this.modalAddName);
      }, 300);
    },
    handleModalAdd() {},
  },
};
</script>

<style lang="scss">
.npl-table-basic-form .table th {
  white-space: nowrap;
}
.crane-allowance {
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
  // .detail-crane-table {
  //   // border-left: 1px solid #d7d7d7;
  //   // border-top: 1px solid #d7d7d7;
  //   display: flex;
  //   flex-wrap: wrap;
  // }
  // .detail-crane-item {
  //   border-left: 1px solid #d7d7d7;
  //   border-top: 1px solid #d7d7d7;
  //   // border-right: 1px solid #d7d7d7;
  //   // border-bottom: 1px solid #d7d7d7;
  //   display: flex;
  //   flex: 0 0 30%;
  // }
  // .detail-crane-label {
  //   background: #f3f3f3;
  //   border-right: 1px solid #d7d7d7;
  //   border-bottom: 1px solid #d7d7d7;
  //   // border-left: 1px solid #d7d7d7;
  //   flex: 1 1 50%;
  //   padding: 0.5rem 0.75rem;
  // }
  // .detail-crane-value {
  //   border-right: 1px solid #d7d7d7;
  //   border-bottom: 1px solid #d7d7d7;
  //   flex: 1 1 50%;
  //   text-align: right;
  //   padding: 0.5rem 0.75rem;
  // }
  .title-dropdown button {
    font-size: 20px;
    padding: 0;
  }
}
.body-modal-add {
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
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
<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
