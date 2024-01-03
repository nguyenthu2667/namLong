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
                  <b-col lg="6" class="pl-0">
                    <b-row>
                      <b-col lg="4">
                        <b-form-group label="Chứng từ">
                          <b-form-input
                            v-model="dataForm['ID']"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
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
                      <b-col lg="4">
                        <b-form-group label="Loại xe">
                          <b-form-select
                            v-model="dataForm['typeOfVehicle']"
                            :options="tempData.typeOfVehicleOptions"
                          ></b-form-select>
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
                </div>
                <b-row>
                  <b-col lg="6">
                    <div class="table-relative">
                      <div class="d-flex flex-wrap align-items-center">
                        <div class="style-special">*Chi tiết chu kỳ bảo dưỡng</div>
                        <!-- <b-button
                          size="sm"
                          variant="primary"
                          class="d-inline-block ml-2 btn-show-modal-select"
                          @click="showModalAddRow('section1')"
                          >Thêm</b-button
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
                        :items="dataDetailMaintenanceRender"
                        :fields="fieldsDetailMaintenanceRender"
                        :bordered="true"
                        show-empty
                        head-variant="light"
                      >
                        <template #cell(delete)="">
                          <div class="text-center btn-remove">
                            <div class="text-danger">
                              <i class="fad fa-trash-alt"></i>
                            </div>
                          </div>
                        </template>
                      </b-table>
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <div class="table-relative">
                      <div class="d-flex flex-wrap align-items-center">
                        <div class="style-special">
                          *Chi tiết công việc trong kỳ
                        </div>
                        <!-- <b-button
                          size="sm"
                          variant="primary"
                          class="d-inline-block ml-2 btn-show-modal-select"
                          @click="showModalAddRow('section2')"
                          >Thêm</b-button
                        > -->
                        <div style="width: 100px" class="d-inline-block mx-2">
                          <b-form-select
                            :options="tempData.periodOptions"
                            v-model="tempData.periodOptions[0].value"
                          ></b-form-select>
                        </div>
                        <b-button
                          size="sm"
                          variant="primary"
                          class="d-inline-block ml-2 btn-show-modal-select"
                          @click="showModalAdd('section2')"
                          >Thêm</b-button
                        >
                      </div>
                      <b-table
                        :items="dataWorkPeriodRender"
                        :fields="fieldsWorkPeriodRender"
                        :bordered="true"
                        show-empty
                        head-variant="light"
                      >
                        <template #cell(delete)="">
                          <div class="text-center btn-remove">
                            <div class="text-danger">
                              <i class="fad fa-trash-alt"></i>
                            </div>
                          </div>
                        </template>
                      </b-table>
                    </div>
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
        <!-- MODAL RIÊNG -->
        <b-modal
          :id="modalAddRowName"
          scrollable
          class="text-center"
          size="lg"
          hide-header
          @ok="handleModalAddRow"
          ok-title="Xác nhận"
          cancel-title="Đóng"
          body-class="npl-modal-add-row"
        >
          <b-row>
            <template v-for="(item, index) in formAddRow">
              <template v-if="item.key == 'supplies'">
                <b-col lg="6" :key="index">
                  <b-form-group :label="item.label" :key="index">
                    <b-form-select
                      v-model="changeSupplies"
                      :options="tempData[`${item.key}Options`]"
                      disabled
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </template>
              <template v-else-if="item.key == 'amountOfSupplies'">
                <b-col lg="6" :key="index">
                  <b-form-group :label="item.label" :key="index">
                    <b-form-input
                      v-model="changeAmountOfSupplies"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </template>
              <template v-else-if="item.key == 'work'">
                <b-col lg="6" :key="index">
                  <b-form-group :label="item.label" :key="index">
                    <b-form-select
                      v-model="item.value"
                      :options="tempData[`${item.key}Options`]"
                      @change="setChangeWork"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </template>
              <!-- <template v-else-if="item.type == 'select'">
                <b-col lg="6" :key="index">
                  <b-form-group :label="item.label" :key="index">
                    <b-form-select v-model="item.value" :options="tempData[`${item.key}Options`]"></b-form-select>
                  </b-form-group>
                </b-col>
              </template> -->
              <template v-else>
                <b-col lg="6" :key="index">
                  <b-form-group :label="item.label" :key="index">
                    <b-form-input v-model="item.value"></b-form-input>
                  </b-form-group>
                </b-col>
              </template>
            </template>
          </b-row>
        </b-modal>
        <b-modal
          :id="modalAddName"
          scrollable
          class="text-center"
          size="md"
          :title="titleModalAdd"
          @ok="handleModalAdd"
          ok-title="Thêm"
          cancel-title="Đóng"
          body-class="body-modal-add"
        >
          <template v-if="formModalAdd">
            <template v-if="sectionModalAdd == 'section1'">
              <b-row>
                <b-col lg="12">
                  <b-form-group label="Tên kỳ bảo dưỡng">
                    <b-form-input v-model="formModalAdd.name" />
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group label="Kỳ bảo dưỡng">
                    <b-form-input
                      :options="tempData.period"
                      v-model="formModalAdd.period"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group label="Số km theo chu kỳ">
                    <b-form-input
                      v-model="formModalAdd.km"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group label="Dung sai (+)/biên độ">
                    <b-form-input
                      v-model="formModalAdd.tolerance"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
            <template v-else-if="sectionModalAdd == 'section2'">
              <b-row>
                <b-col lg="9">
                  <b-form-group label="Công việc">
                    <b-form-select
                      :options="tempData.workOptions"
                      v-model="formModalAdd.work"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Chu kỳ">
                    <b-form-select
                      :options="tempData.periodOptions"
                      v-model="formModalAdd.period"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="9">
                  <b-form-group label="Vật tư/PTTT">
                    <b-form-input v-model="formModalAdd.supplies" disabled />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Số lượng vật tư">
                    <b-form-input
                      v-model="formModalAdd.amountOfSupplies"
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
import TitleOption from "@/data/modules/npl/titleOptions";

import tempData from "@/data/modules/npl/maintenance(1.11)";

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
      keyComponent: "maintenace",
      //title-options
      currentTitle: 'Định mức Bảo trì, bảo dưỡng' ?? null,
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
      title: "Bảo trì, bảo dưỡng",
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
          label: "Bảo trì, bảo dưỡng",
        },
      ],
      dataDetailMaintenanceRender: [],
      fieldsDetailMaintenanceRender: [
        { key: "period", label: "Kỳ bảo dưỡng" },
        { key: "name", label: "Tên kỳ bảo dưỡng" },
        { key: "km", label: "Số km theo chu kỳ", tdClass: "text-right" },
        {
          key: "tolerance",
          label: "Dung sai (+)/biên độ",
          tdClass: "text-right",
        },
        {
          key: "delete",
          label: "Xóa",
          thClass: "text-center",
        },
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
        {
          key: "delete",
          label: "Xóa",
          thClass: "text-center",
        },
      ],
      formAddRow: [],
      modalAddRowName: "",
      changeWork: "",
      changeSupplies: "",
      changeAmountOfSupplies: "",
      modalAddName: "",
      sectionModalAdd: "",
      formModalAdd: null,
      titleModalAdd: '',
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.selectedSection1 = this.dataTableSection1;
    this.dataDetailMaintenanceRender = this.tempData.dataMaintenance;
    this.dataWorkPeriodRender = this.tempData.dataWorkPeriod;
  },
  watch: {
    files(val) {
      console.log(1, "files", val);
    },
    currentTab() {
      this.dataDetailMaintenanceRender = this.tempData.dataMaintenance;
      this.dataWorkPeriodRender = this.tempData.dataWorkPeriod;
    },
    changeWork(to) {
      console.log(to);
    },
    "formModalAdd.work"(newVal) {
      const obj = this.tempData.dataWordInfo.find(
        (item) => item.work == newVal
      );
      this.formModalAdd.supplies = obj ? obj.supplies : "";
      this.formModalAdd.amountOfSupplies = obj ? obj.amountOfSupplies : "";
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
      this.title = obj.label;
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
    setChangeWork(value) {
      console.log(value);
      this.changeSupplies = value;
      this.changeAmountOfSupplies = this.tempData.amountOfSuppliesOptions.find(
        (item) => item.value == value
      ).text;
    },
    showModalAdd(name) {
      this.modalAddName = `modal-add-${name}`;
      this.sectionModalAdd = name;

      if (name == "section1") {
        this.formModalAdd = {};
        this.titleModalAdd = 'Thêm chu kỳ bảo dưỡng'
      } else if (name == "section2") {
        this.formModalAdd = {};
        this.titleModalAdd = 'Thêm công việc trong kỳ'
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
.v-select .vs__dropdown-toggle {
  z-index: 9999;
}
.vs--open .vs__dropdown-toggle {
  z-index: 9999;
}
</style>
<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 240px);
  overflow: auto;
}
.btn-show-modal-select {
  padding: 0.25rem 0.7rem;
  border-radius: 0;
}
.style-special {
  font-weight: 700;
  font-size: 14px;
}
</style>
