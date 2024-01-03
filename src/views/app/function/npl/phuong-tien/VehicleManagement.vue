<template>
  <div id="app-content-full" class="form-npl-kinh-doanh vehicle-management">
    <b-card>
      <div class="form-basic">
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
            ><div class="box-content mt-2">
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
                  <div>
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
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
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
            <div class="box-content mt-2">
              <TitleMajor
                :titleOption="tempData?.titleOptions"
                :currentTitle="currentTitle"
              />
              <component :is="renderComponent" :dataForm="dataForm"></component>
              <!-- <b-row v-if="typeForm && typeForm.length > 0">
                <template v-for="(value, i) in typeForm">
                  <template
                    v-if="value.type && value.type.toUpperCase() == 'DATE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <datepicker
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Chọn ngày'"
                          v-model="dataForm[value.key]"
                          @input="convertDate(value.key)"
                          :disabled="isEdit || isAdd ? false : true"
                        ></datepicker>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'DATETIME'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <div class="d-flex">
                          <b-form-timepicker
                            style="
                              width: 50%;
                              padding-top: 5px;
                              font-size: 12px;
                            "
                            size="sm"
                            locale="vi"
                            class="mr-1"
                            label-no-time-selected="HH:MM"
                          ></b-form-timepicker>
                          <datepicker
                            style="width: 50%"
                            :language="locale"
                            :format="datePickerFormat"
                            :bootstrap-styling="true"
                            :placeholder="'DD/MM/YYYY'"
                            @input="convertDate(value.key)"
                            v-model="dataForm[value.key]"
                          ></datepicker>
                        </div>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'NUMBER'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          v-model.number="dataForm[value.key]"
                          type="number"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'SELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <v-select
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'MULTISELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <v-select
                          multiple
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'TABLE'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-table
                          v-if="dataForm[value.key].data"
                          id="npl-table-chil"
                          class="npl-table-chil"
                          :fields="dataForm[value.key].fields"
                          :items="dataForm[value.key].data"
                          bordered
                          responsive
                          show-empty
                          head-variant="light"
                        ></b-table>
                        <div class="text-center text-muted">
                          <strong>Dữ liệu không tồn tại !</strong>
                        </div>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-textarea
                          rows="2"
                          max-rows="6"
                          v-model="dataForm[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'STATUS'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          :style="`font-weight:600;color:${
                            dataForm[value.key + 'Color']
                          } !important;`"
                          v-model="dataForm[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                  <template v-else>
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                    <b-col v-if="value.br" :lg="value.lg" :key="'b' + i" />
                  </template>
                </template>
              </b-row> -->
            </div>
          </b-tab>
          <b-tab>
            <div class="box-content mt-2">
              <TitleMajor
                :titleOption="tempData?.titleOptions"
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
            <div class="box-content mt-2">
              <TitleMajor
                :titleOption="tempData?.titleOptions"
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
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import TitleOption from "@/data/modules/npl/titleOptions";
import TitleMajor from "@/views/app/function/npl/kinh-doanh/component/TitleMajor.vue";
import VehicleHandover from "./VehicleHandover.vue";
import VehicleRecovery from "./VehicleRecovery.vue";
import ChangeMooc from "./ChangeMooc.vue";

import YeuCauBanGiaoPhuongTien from "@/data/modules/npl/YeuCauBanGiaoPhuongTien(4.1)";
import YeuCauThuHoiPhuongTien from "@/data/modules/npl/YeuCauThuHoiPhuongTien(4.2)";
import YeuCauThayDoiRoMooc from "@/data/modules/npl/YeuCauThayDoiRoMooc(4.5)";

export default {
  props: ["items", "fields", "fieldsForm", "optionByKey", "title"],
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    TitleMajor,
    VehicleHandover,
    VehicleRecovery,
    ChangeMooc,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      dataForm: this.items?.length > 0 ? this.items[0] : null,
      dataBackup: null,
      fieldsTable: this.fields ?? [],
      typeForm: this.fieldsForm ?? [],
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
      currentTitle: this.title ?? null,
      titleOption: TitleOption.data,
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

      //////
      tempData: null,
      renderComponent: null,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
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
    // changeTitle(obj) {
    //   this.currentTitle = obj.label;
    // },
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
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = index;
      this.dataForm = { ...row };
      this.currentTab = 1;
    },
    updateTab(value) {
      this.currentTab = value;
      // if (value == 2) {
      //   this.currentTitle = "Lịch sử thao tác";
      // }
      // if (value == 3) {
      //   this.currentTitle = "File đính kèm";
      // }
      // if (value == 0) {
      //   this.currentTitle = "Yêu cầu vận tải";
      // }
      // if (value == 1) {
      //   this.currentTitle = "Yêu cầu vận tải";
      // }
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
    renderData(path) {
      switch (path) {
        case "/admin/function/vehicle-handover":
          this.tempData = YeuCauBanGiaoPhuongTien;
          this.currentTitle = "Yêu cầu bàn giao phương tiện";
          this.fieldsTable = this.tempData?.fieldsManagement || [];
          this.dataTable = this.tempData?.dataManagement || [];
          this.renderComponent = "VehicleHandover";
          this.dataForm = this.dataTable[this.dataTable.length - 1] || null;
          break;

        case "/admin/function/vehicle-recovery":
          this.tempData = YeuCauThuHoiPhuongTien;
          this.currentTitle = "Yêu cầu thu hồi phương tiện";
          this.fieldsTable = this.tempData?.fieldsManagement || [];
          this.dataTable = this.tempData?.dataManagement || [];
          this.renderComponent = "VehicleRecovery";
          this.dataForm = this.dataTable[this.dataTable.length - 1] || null;
          break;

        case "/admin/function/vehicle-recovery":
          this.tempData = YeuCauThuHoiPhuongTien;
          this.currentTitle = "Yêu cầu thu hồi phương tiện";
          this.fieldsTable = this.tempData?.fieldsManagement || [];
          this.dataTable = this.tempData?.dataManagement || [];
          this.renderComponent = "VehicleRecovery";
          this.dataForm = this.dataTable[this.dataTable.length - 1] || null;
          break;

        case "/admin/function/change-mooc":
          this.tempData = YeuCauThayDoiRoMooc;
          this.currentTitle = "Yêu cầu thay đổi rờ moóc";
          this.fieldsTable = this.tempData?.fieldsManagement || [];
          this.dataTable = this.tempData?.dataManagement || [];
          this.renderComponent = "ChangeMooc";
          this.dataForm = this.dataTable[this.dataTable.length - 1] || null;
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.renderData(this.$route.path);
      this.currentTab = 0
    },
  },
  created() {
    this.renderData(this.$route.path);
  },
};
</script>
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
.b-form-btn-label-control.form-control > .form-control.form-control-sm {
  white-space: nowrap;
  overflow: hidden;
}
</style>
<style scoped>
.box-content {
  height: calc(100vh - 240px);
  overflow: auto;
}
.custom-box-tab1 {
  height: calc(100vh - 250px);
}
#app-content-full {
  height: auto;
  /* overflow: auto; */
}
</style>
<style scoped>
/* @media screen and (max-width: 1366px) {
  .box-content {
    height: calc(100vh - 260px);
  }
} */
/* @media screen and (max-width: 1439px) {
  .box-content {
    height: calc(100vh - 250px);
  }
} */
</style>
<style lang="scss">
.vehicle-management {
  td {
    // white-space: nowrap;
  }
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
  .b-form-timepicker {
    padding-top: 0 !important;
    align-items: center;
  }
  .vdp-datepicker {
    .form-control[readonly] {
      background: none;
    }
    .form-control[disabled] {
      background: #e9ecef;
    }
  }
}
</style>
