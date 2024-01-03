<template>
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
      :showIndex="showIndex"
      :showAdd="showAdd"
      :showEdit="showEdit"
      :showDelete="showDelete"
      :showSave="showSave"
      :showCancel="showCancel"
      :showBlock="showBlock"
      :showImport="showImport"
      :showCopy="false"
      @change-actions="handleChangeActions"
    ></ActionsHeaderNPL>
    <b-tabs v-model="currentTab" nav-class="d-none">
      <b-tab
        ><div class="box-content">
          <slot
            name="tabOneHeader"
            :dataForm="dataForm"
            :isDisable="isEdit || isAdd ? false : true"
          ></slot>
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
            :filter="filter"
            @filtered="onFiltered"
          >
            <template slot="top-row" slot-scope="{ fields }">
              <td v-for="field in fields" :key="field.ID">
                <datepicker
                  v-if="field.key == 'createDate' || field.key == 'DateTime'"
                  :language="locale"
                  :format="datePickerFormat"
                  :bootstrap-styling="true"
                  :placeholder="'DD/MM/YYYY'"
                ></datepicker>
                <v-select
                  v-else-if="
                    field.key == 'Status' ||
                    field.key == 'TrangThai' ||
                    field.key == 'statusName'
                  "
                  :options="['Chờ khóa', 'Đã Khóa']"
                />
                <b-form-input
                  v-else
                  placeholder="Nhập tìm.."
                  v-model="filterBy[`${field.key}`]"
                  @input="handleFilterByKey(filterBy[`${field.key}`])"
                />
              </td>
            </template>
            <template
              v-for="(field, index) in fieldsTable"
              v-slot:[`cell(${field.key})`]="row"
            >
              <template
                v-if="field.typeCol && field.typeCol.toUpperCase() == 'BADGE'"
              >
                <div :key="`${field.key}-${index}`">
                  <b-badge
                    :style="`
                            font-size: 90%;
                            color: #fff;
                            border: 1px solid #d3d0d0f7;background:${
                              row.item[field.key + 'Color']
                            } !important`"
                  >
                    {{ row.item[field.key] }}
                  </b-badge>
                </div>
              </template>
              <template
                v-else-if="
                  field.typeCol && field.typeCol.toUpperCase() == 'BADGECOLOR'
                "
              >
                <div :key="`${field.key}-${index}`" class="text-center">
                  <Status
                    :color="row.item[`${field.key}Color`]"
                    :label="row.item[`${field.key}`]"
                    :showCircle="false"
                  ></Status>
                </div>
              </template>
              <template v-else>
                <div :key="`${field.key}-${index}`">
                  {{ row.item[`${field.key}`] }}
                </div>
              </template>
            </template>
            <template #empty>
              <div class="text-center font-italic text-muted">
                {{ $t("data.non-data") }}
              </div>
            </template>
            <template #emptyfiltered>
              <div class="text-center font-italic text-muted">
                {{ $t("data.non-result") }}
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
        <div class="box-content">
          <div
            v-if="currentTitle"
            style="font-size: 16px; background: #d7d7d7; color: #005aab"
            class="text-center pt-1"
          >
            <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
            <b-dropdown
              class="title-dropdown"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              v-if="TitleOption && TitleOption.length > 0"
            >
              <template v-for="(title, key) in TitleOption">
                <b-dropdown-item @click="changeTitle(title)" :key="key" href="#"
                  >{{ title.toUpperCase() }}
                </b-dropdown-item>
              </template>
            </b-dropdown>
            <hr class="m-0" />
          </div>
          <slot
            name="tabTwo"
            :dataForm="dataForm"
            :isDisable="isEdit || isAdd ? false : true"
            :currentTitle="currentTitle"
          ></slot>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <div
            v-if="currentTitle"
            style="font-size: 16px; background: #d7d7d7; color: #005aab"
            class="text-center pt-1"
          >
            <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
            <b-dropdown
              class="title-dropdown"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
            >
            </b-dropdown>
            <hr class="m-0" />
          </div>
          <div class="mt-1">
            <table-history
              v-if="dataHisAction && dataHisAction.length > 0"
              :fields="fieldsHisAction"
              :items="dataHisAction"
            ></table-history>
            <div v-else class="mt-4 text-center text-muted font-weight-bold">
              Không tồn tại dữ liệu !
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab>
        <div class="box-content">
          <div
            v-if="currentTitle"
            style="font-size: 16px; background: #d7d7d7; color: #005aab"
            class="text-center pt-1 mb-1"
          >
            <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
            <b-dropdown
              class="title-dropdown"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
            >
            </b-dropdown>
            <hr class="m-0" />
          </div>
          <table-list-file></table-list-file>
        </div>
      </b-tab>
    </b-tabs>
    <div v-show="showFooter" class="footer mt-1">
      <ActionsFooterNPL
        :activeFocus="currentTab"
        @change-tab="updateTab"
        :showTab1="showTab1"
      ></ActionsFooterNPL>
    </div>
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
              <b-dropdown-item @click="changeTypeSearch('Lớn hơn')" href="#">
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

export default {
  props: [
    "items",
    "fields",
    "fieldsForm",
    "optionByKey",
    "title",
    "sIndex",
    "sAdd",
    "sEdit",
    "sDelete",
    "sSave",
    "sBlock",
    "sCancel",
    "sImport",
    "sTab1",
    "titles",
    "sFooter",
    "componentKey",
    "disDbclick",
  ],
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
  },
  data() {
    return {
      TitleOption: this.titles ?? null,
      filterBy: {},
      filter: "",
      showIndex: this.sIndex ?? true,
      showAdd: this.sAdd ?? true,
      showEdit: this.sEdit ?? true,
      showDelete: this.sDelete ?? true,
      showSave: this.sSave ?? true,
      showCancel: this.sCancel ?? true,
      showBlock: this.sBlock ?? true,
      showImport: this.sImport ?? true,
      showTab1: this.sTab1 ?? true,
      showFooter: this.sFooter ?? true,
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
      keyComponent: this.componentKey ?? "basic",
      //title-options
      currentTitle: this.title ?? null,
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
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  watch: {
    currentTitle(string) {
      this.$emit("currentTitle", string);
    },
  },
  methods: {
    handleFilterByKey(value) {
      this.filter = value;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
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
    changeTitle(title) {
      this.currentTitle = title;
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
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = index;
      this.dataForm = { ...row };
      if (!this.disDbclick) {
        this.currentTab = 1;
      }
    },
    updateTab(value) {
      this.currentTab = value;
      if (value == 2) {
        this.currentTitle = "Lịch sử thao tác";
      }
      if (value == 3) {
        this.currentTitle = "File đính kèm";
      }
      if (value == 0) {
        this.currentTitle = "Yêu cầu vận tải";
      }
      if (value == 1) {
        this.currentTitle = "Yêu cầu vận tải";
      }
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
<style  scoped>
.box-content {
  height: calc(100vh - 335px);
  overflow: auto;
  overflow-x: hidden;
}
.custom-box-tab1 {
  height: calc(100vh - 297px);
}
</style>
<style scoped>
@media screen and (max-width: 1366px) {
  .box-content {
    height: calc(100vh - 308px);
  }
  .custom-box-tab1 {
    height: calc(100vh - 270px);
  }
}
</style>