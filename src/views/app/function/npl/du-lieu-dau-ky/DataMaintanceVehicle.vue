<template>
  <div 
    id="app-content-full" 
    lass="npl-categories"
  >
    <b-card>
      <div 
        ref="form-basic" 
        class="h-100"
      >
        <div ref="action-header">
          <ActionsHeaderNPL
            :total="dataTable.length"
            :current-index="currentIndex"
            :is-disabled-add="isDisabledAdd"
            :is-disabled-edit="isDisabledEdit"
            :is-disabled-delete="isDisabledDelete"
            :is-disabled-save="isDisabledSave"
            :is-disabled-cancel="isDisabledCancel"
            :is-disabled-attach-file="isDisabledAttachFile"
            :is-disabled-print="isDisabledPrint"
            :is-disabled-import-excel="isDisabledImportExcel"
            :is-disabled-search="isDisabledSearch"
            :is-disabled-lock="isDisabledLock"
            :is-disabled-copy="isDisabledCopy"
            :show-import-excel="false"
            :is-permission="setAccessWrite"
            @change-index="handleChangeIndex"
            @change-action="handleChangeAction"
            @change-tab="updateTab"
          />
        </div>
        <b-tabs 
          v-model="currentTab" 
          nav-class="d-none" 
          class="box-content"
        >
          <b-tab>
            <div 
              class="box-content mt-2" 
              style="overflow: hidden"
            >
              <b-table
                id="npl-table-basic-form"
                ref="selectableTable"
                class="npl-table-basic-form border-bottom text-center"
                sticky-header
                :items="dataTable"
                :fields="fieldsTable"
                bordered
                responsive
                show-empty
                head-variant="light"
                selectable
                :select-mode="'single'"
                style="max-height: calc(100% - 15px); margin-top: -1px"
                @row-dblclicked="handleDbClick"
                @row-selected="rowSelected"
              >
                <template 
                  v-if="fieldsTable" 
                  slot="top-row" 
                  slot-scope="{ fields }"
                >
                  <td 
                    v-for="(field, index) in fields" 
                    :key="index"
                  >
                    <div
                      v-if="
                        field.typeCol.toUpperCase() == 'DATE' || field.key.toUpperCase() == 'ODATE'
                      "
                      class="frame-filter text-dark"
                    >
                      <datepicker
                        :format="datePickerFormat"
                        :bootstrap-styling="true"
                        :clear-button="true"
                        :placeholder="$t('modal.day-select')"
                        :value="setFilterValues(field.key)"
                        @input="
                          (value) => changeFilterValues(field.key, value, field.typeCol)
                        "
                      />
                    </div>
                    <div
                      v-else-if="
                        field.key.toUpperCase() == 'ISATTACHFILE' || field.key.toUpperCase() == 'ISLOCK'
                      "
                      style="min-width: 80px"
                      class="frame-filter"
                    >
                      <b-form-select
                        :options="[
                          { text: $t('npl.button.all'), value: '' },
                          { text: $t('npl.button.yes'), value: 1 },
                          { text: $t('npl.button.no'), value: 0 },
                        ]"
                        :value="setFilterValues(field.key)"
                        @change="
                          (value) => changeFilterValues(field.key, value, field.typeCol)
                        "
                      />
                    </div>
                    <div
                      v-else-if="field.key.toUpperCase() == 'ISACTIVE'"
                      style="min-width: 100px"
                      class="frame-filter"
                    >
                      <b-form-select
                        :options="[
                          { text: 'Tất cả', value: '' },
                          { text: 'Đã khóa', value: true },
                          { text: 'Chưa khóa', value: false },
                        ]"
                        :value="setFilterValues(field.key)"
                        @change="
                          (value) => changeFilterValues(field.key, value, field.typeCol)
                        "
                      />
                    </div>
                    <div
                      v-else-if="field.typeCol.toUpperCase() == 'MONEY'"
                      style="min-width: 100px"
                      class="frame-filter"
                    >
                      <b-form-input
                        class="text-right"
                        :value="setFilterValues(field.key)"
                        :formatter="currencyFormatFilter"
                        @input="
                          (value) => changeFilterValues(field.key, value, field.typeCol)
                        "
                      />
                    </div>
                    <div 
                      v-else 
                      class="frame-filter"
                    >                    
                      <b-form-input
                        :placeholder="'Nhập tìm ...'"
                        :value="setFilterValues(field.key)"
                        @input="
                          (value) => changeFilterValues(field.key, value, field.typeCol)
                        "
                      />
                    </div>
                  </td>
                </template>
                <template #empty>
                  <div class="text-center font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
                <template #cell(IsActive)="row">
                  <template v-if="row.item.IsActive == '1'">
                    <div :style="'text-align: center !important;'">
                      <div
                        class="has-use"
                        :style="'border: 2px solid; color: green; margin: 0 auto'"
                      >
                        <div :style="'color: black; font-weight: 600;'">
                          Đã khóa
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div :style="'text-align: center !important;'">
                      <div
                        class="not-use"
                        :style="'border: 2px solid; color: gray;  margin: 0 auto'"
                      >
                        <div :style="'color: black; font-weight: 600;'">
                          Chưa khóa
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab>
            <span class="title-category">NGHIỆP VỤ: BẢO TRÌ, BẢO DƯỠNG ĐẦU KÉO</span>
            <form-detail
              class="box-content-form"
              :data-form="dataForm"
              :current-mode="currentMode"
            />
          </b-tab>
          <b-tab>
            <span class="title-category">NGHIỆP VỤ: BẢO TRÌ, BẢO DƯỠNG ĐẦU KÉO</span>
            <form-history
              :data-table-history="dataTableHistory"
              :fields-table-history="fieldsTableHistory"
              class="box-content-his"
            />
          </b-tab>
          <b-tab>
            <span class="title-category">NGHIỆP VỤ: BẢO TRÌ, BẢO DƯỠNG ĐẦU KÉO</span>
            <TableListFile
              v-if="dataAttachFile && dataAttachFile.length > 0"
              class="box-content-lis"
              :items="dataAttachFile"
              :fields="fieldsAttachFile"
              @removeFile="removeAttachFile"
              @editFile="editAttachFile"
            />
            <TableListFile v-else>
              {{ $t("cards.no-data") }}
            </TableListFile>
          </b-tab>
        </b-tabs>
        <div ref="action-footer">
          <ActionsFooterNPL
            :active-focus="currentTab"
            :title-tab0="$t('footer-tab.list')"
            :title-tab1="$t('footer-tab.detail')"
            :title-tab2="$t('footer-tab.action-history')"
            :title-tab3="$t('footer-tab.file-attach')"
            @clear-row="clearSelected"
            @change-tab="updateTab"
          />
        </div>
        <modal-attach-file
          :show="showModalAttachFile"
          :form-edit="formEditAttachFile"
          @hidden="showModalAttachFile = false"
          @submitData="handleAttachFile"
        />
        <modal-print
          :data-print="dataPrint"
          :show="showModalPrintFile"
          @hidden="showModalPrintFile = false"
          @formPrint="handlePrint"
        />
        <modal-import-ex
          :show="showModalExFile"
          :data-notify="dataNotifyImportExcel"
          @hidden="showModalExFile = false"
          @submitData="handleImportExcel"
        />
        <modal-search
          :show="showModalSearch"
          :method-search="methodSearch"
          :data-search="dataSearch"
          @hidden="showModalSearch = false"
          @search="handleSearch"
          @resetSearch="resetSearch"
        />
      </div>
    </b-card>
  </div>
</template>
<script>
import handling from "@/constants/handling.js";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import ActionsHeaderNPL from "@/views/app/category/npl/component/ActionsHeaderNPL";
import ActionsFooterNPL from "@/views/app/category/npl/component/ActionsFooterNPL";
import FormDetail from "@/views/app/function/npl/du-lieu-dau-ky/component/FormDetailDataMaintanceVehicle.vue";
import FormHistory from "@/views/app/function/npl/du-lieu-dau-ky/component/FormHistory.vue";
import TableListFile from "@/views/app/category/npl/component/TableListFile";
import ModalAttach from "@/views/app/category/npl/component/ModalAttachFile";
import ModalPrint from "@/views/app/category/npl/component/ModalPrint";
import ModalImportEx from "@/views/app/category/npl/component/ModalImportExcel";
import ModalSearch from "@/views/app/category/npl/component/ModalFind";
import dataAPI from "@/api/modules/dataBeginStartsVehiclesAPI";
import moment from "moment";

export default {
  components: {
    ActionsHeaderNPL,
    ActionsFooterNPL,
    TableListFile,
    "form-history": FormHistory,
    "modal-attach-file": ModalAttach,
    "modal-print": ModalPrint,
    "modal-import-ex": ModalImportEx,
    "modal-search": ModalSearch,
    "form-detail": FormDetail,
  },
  data() {
    return {
      filterValues: null,
      isClearFilter: false,
      dataBeforeFilter: [],
      datePickerFormat: "dd/MM/yyyy",
      currentPage: 1,
      perPage: 5,
      currentTab: 0,
      dataTable: [],

      showModalExFile: false,
      showModalSearch: false,
      dataSearch: [],
      methodSearch: [],
      isSearching: false,
      showModalPrintFile: false,
      dataPrint: [],
      showModalAttachFile: false,
      formEditAttachFile: [],
      dataAttachFile: [],
      fieldsAttachFile: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "Name", label: "Tiêu đề" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File đính kèm" },
        { key: "Note", label: "Ghi chú" },
        { key: "Action", label: "Thao tác" },
      ],
      dataTableHistory: [],
      fieldsTableHistory: [
        {
          key: "ActionTypeID",
          label: "Mã hành động",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "CreateDate",
          label: "Thời gian",
          thClass: " text-left ",
        },
        {
          key: "UserFullName",
          label: "Người thực hiện",
        },
        {
          key: "ActionTypeName",
          label: "Thao tác",
        },
        {
          key: "ErrDescription",
          label: "Thông báo xử lý",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "ID",
          label: "ID",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "Note ",
          label: "Ghi chú",
        },
        {
          key: "Valuerr",
          label: "Giá trị",
          thClass: "d-none",
          tdClass: "d-none",
        },
      ],
      objectKey: null,
      colTypes: null,
      objectKeyHistory: null,
      colTypesHistory: null,
      keyString: "Data_Maintance_Vehicle",
      currentMode: "readOnly",
      objData: null,
      columnAdd: null,
      dataForm: null,
      currentIndex: 0,
      isCheckIsValid: false,
      notRequired: ["Note", "IsActive", "OID" ],
      dataNotifyImportExcel: null,
      isDisabledAdd: false,
      isDisabledEdit: false,
      isDisabledDelete: false,
      isDisabledSave: true,
      isDisabledCancel: true,
      isDisabledAttachFile: false,
      isDisabledPrint: false,
      isDisabledImportExcel: false,
      isDisabledSearch: false,
      isDisabledLock: false,
      isDisabledCopy:false,
      accessWrite: null,
      menuRight: [],
    };
  },
  computed: {
    setAccessWrite() {
      this.menuRight.forEach((e) => {
        if (e.Link == this.$route.path && e.AccessWrite == 1) {
          this.accessWrite = false;
        } else {
          this.accessWrite = true;
        }
      });

      return this.accessWrite;
    },

    totalPage() {
      return this.dataTable.length;
    },

    //
    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("function") && path.includes("data-maintance-vehicle")) {
        return "DataBegin";
      }
      return "";
    },

    fieldsTable() {
      let arr = handling.mergeKeyDynamic(this.objectKey, this.colTypes);
      arr?.forEach((e) => {
        e.sortable = false;
      });

      return arr;
    },
    fieldsTableAndMethodSearch() {
      return {
        fieldsTable: this.fieldsTable,
        methodSearch: this.methodSearch,
      };
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getData();
    await this.getMethodSearch();
    await this.getAttachFile(this.currentIndex);
    await this.getColTypes(this.keyString);
    await this.getKeyTable();
    await this.getDynamicFormAdd(this.keyString);
    await this.getDataHistory(this.currentIndex);
  },

  methods: {
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDbClick(row) {
      const index = this.dataTable.findIndex(
        (item) => item.OID == row.OID
      );

      const item = this.dataTable[index];
      this.getByID(item.OID);
      this.currentTab = 1;
      this.currentMode = "readOnly";
      this.currentIndex = index;
      this.getDataIfDataLock(this.currentIndex);
    },

    rowSelected(items) {
      this.currentIndex = this.dataTable.length - 1;
      if (items != null) {
        var idDataGas;
        items.forEach((el) => {
          idDataGas = el.OID;
        });
        var count = 0;
        this.dataTable.forEach((element) => {
          count++;
          if (element.OID == idDataGas) {
            this.currentIndex = count - 1;
            this.getDataIfDataLock(this.currentIndex);
            return;
          }
        });
      }
    },

    getDynamicFormAdd(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.columnAdd = arr.filter((item) => item.IsHide == 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChangeIndex(index) {
      if (this.currentTab === 0) {
        this.getDataIfDataLock(index);
        this.currentTab = 1;
      }
      if (this.currentTab === 1) {
        this.getDataIfDataLock(index);
      }
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        this.getDataIfDataLock(index);
        return this.changeIndexWhenNotSave(index);
      }
      if (this.currentTab === 2) {
        this.getDataIfDataLock(index);
        this.currentIndex = index;
        return this.getDataHistory(this.currentIndex);
      }
      if (this.currentTab === 3) {
        this.getDataIfDataLock(index);
        this.currentIndex = index;
        return this.getAttachFile(this.currentIndex);
      }      
      this.currentIndex = index;
      this.currentMode = "readOnly";
      const item = this.dataTable[index];
      this.getByID(item.OID);
    },

    changeIndexWhenNotSave(index) {
      this.$bvModal
        .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          headerClass: "p-2 border-bottom-1",
          footerClass: "p-2 border-top-1",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.currentIndex = index;
            this.currentMode = "readOnly";
            this.currentTab = 1;
            const item = this.dataTable[index];
            this.getByID(item.OID);
            this.disableCancel();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setFilterValues(key) {
      if (this.filterValues && this.filterValues[key]) {
        return this.filterValues[key].value; //return value input box enter value
      }
      return "";
    },

    changeFilterValues(key, value, typeCol = "") {
      this.filterValues = {
        ...this.filterValues,
        [key]: {
          value,
          typeCol,
        },
      };
      this.handleFilter(this.filterValues);
    },

    handleFilter(obj) {
      this.isClearFilter = false
      if (this.isFiltering(obj)) {
        const tempArr = this.filterFunc(obj, this.dataBeforeFilter)
        this.dataTable = [...tempArr]
        if (tempArr.length) {
          this.loadDocumentByIndex(this.dataTable.length - 1);
        }
      } else {
        //nếu không có giá trị filter nào thì load lại data
        this.dataTable = [...this.dataBeforeFilter];
      }
    },

    filterFunc(objFilter, arr = []) {
      if (!objFilter) return []
      const newArr = arr.filter(item => {
        for (const key in objFilter) {
          let value = objFilter[key].value
          if (objFilter[key].typeCol.toUpperCase() === 'DATE' && value) {
            value = moment(value).format('YYYY-MM-DD') || ''
            if (!item[key].toLowerCase().trim().includes(value.toLowerCase().trim())) {
              return false
            }
          }
          else if(objFilter[key].typeCol.toUpperCase() == 'MONEY') {
            value = this.revertCurrency(value)
          }
          if (objFilter[key].typeCol.toUpperCase() != 'DATE' && !item[key].toString().toLowerCase().trim().includes(value.toString().toLowerCase().trim())) {
            return false
          }
        }
        return true;
      });
      return newArr;
    },

    isFiltering(obj) {
      //kiểm tra đang có giá trị filter ko?
      if (obj) {
        for (const key in obj) {
          if (obj[key].value || obj[key].value == 0) {
            return true
          }
        }
      }
      return false
    },

    changeIndexWhenNotSaveTab(index) {
      this.$bvModal
        .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          headerClass: "p-2 border-bottom-1",
          footerClass: "p-2 border-top-1",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.currentMode = "readOnly";
            this.disableCancel();
            this.currentTab = index;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleAdd() {
      if (this.columnAdd && this.columnAdd.length > 0) {
        let newObj = {};
        this.columnAdd.forEach((item) => {
          newObj = {
            ...newObj,
            [item.ClName]: [item.ShwName, null, item.TypeCol, null],
          };
        });
        this.dataForm = { ...newObj };
      } else {
        this.dataForm = null;
      }
    },

    handleEdit() {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.OID);
    },

    //
    handleDelete(id) {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.OID);
      this.currentMode = "readOnly";
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-delete")} mã chứng từ số ${
            this.dataTable[this.currentIndex].OID
          } ?`,
          {
            title: this.$t("toast.message"),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            let body = {
              OID: id,
            };
            dataAPI
              .deleteDataGas(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getDataAfterSave();
                } else {
                  this.showNotify(
                    "error",
                    this.$t("toast.message"),
                    val.message
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleBlock(id) {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.OID);
      this.currentMode = "readOnly";
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-lock")} mã chứng từ số ${
            this.dataTable[this.currentIndex].OID
          } ?`,
          {
            title: this.$t("toast.message"),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            let body = {
              OID: id,
              IsActive: 1,              
            };
            dataAPI
              .dataBlock(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData();
                  this.getByID(val.data[0].OID);
                  this.getAttachFile(val.data[0].OID);
                  this.disableBlockl();
                } else {
                  this.showNotify(
                    "error",
                    this.$t("toast.message"),
                    val.message
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleCopy(id) {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.OID);
      this.currentMode = "readOnly";
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-lock")} mã chứng từ số ${
            this.dataTable[this.currentIndex].OID
          } ?`,
          {
            title: this.$t("toast.message"),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            let body = {
              OID: id,            
            };
            dataAPI
              .dataCopy(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData();
                  this.getByID(val.data[0].OID);
                  this.getAttachFile(val.data[0].OID);
                } else {
                  this.showNotify(
                    "error",
                    this.$t("toast.message"),
                    val.message
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSave() {
      if (!this.dataForm) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        return this.showNotify(
            "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.dataForm) {
        obj = {
          ...obj,
          [key]: this.dataForm[key][1],
        };
      }
      let body = {
        ...obj,
        EntryID: this.keyString,
      };
      if (this.currentMode == "editing") {
        dataAPI
          .editDataGas(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.disableSave();
              this.getDataAfterSave();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        dataAPI
          .addDataGas(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.disableSave();
              this.getDataAfterSave();
              this.currentMode = "readOnly";
              this.currentTab = 1;
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },

    //
    handleCancel() {
      if (this.dataTable.length) {
        const item = this.dataTable[this.currentIndex];
        this.getByID(item.OID);
        this.currentMode = "readOnly";
      } else {
        this.currentTab = 0;
      }
    },

    //Check value notNull
    checkIsValid(key) {
      /**this.isCheckIsValid: false*/
      if (!this.isCheckIsValid) {
        return true;
      }

      /**notRequired: ["ID", "Note", "NameExtention1", "AddressExtention1"], */
      /**compare key with notRequired */
      if (this.notRequired.includes(key)) {
        return true;
      }
      const value = this.dataForm[key][1];
      if (value || value === 0 || value === false) {
        return true;
      } else {
        return false;
      }
      // return isValid
    },
    checkFormValidate() {
      // let result = true;
      for (const key in this.dataForm) {
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;

        if (!result) {
          break;
        }
      }
      this.dataForm = { ...this.dataForm }; //--> gán lại để render lại dataForm
      for (const key in this.dataForm) {
        /** !a a not value */
        /** !a <=> a == false || a == null || a == 0 || ... */
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },

    //call API getList
    getKeyTable() {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI
        .getListDataGas(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : [];
        })
        .catch((err) => {});
    },

    ////getAll data table
    getData() {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI
        .getListDataGas(body)
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.currentIndex = this.dataTable.length - 1;
          this.dataBeforeFilter = [...this.dataTable];  
          this.getDataIfDataLock(this.currentIndex);
        })
        .catch((err) => console.log(err));
    },

        //Block
    getDataIfDataLock(index){
      const item = this.dataTable[index];
      this.currentIndex = index;
      if ( item.IsActive === true || item.IsActive === 1) {
      this.disableBlockl();
      }
      if ( item.IsActive === false || item.IsActive === 0) {
      this.disableCancel();
      }
    },

    //getData History by id
    getDataHistory(index) {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI
        .getListDataGas(body)
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          const item = this.dataTable[index];
          let body = {
            OID: item.OID,
          };
          /** */
          dataAPI.getDataGasByID(body).then((val) => {
            let obj = val.status ? val.data.Histories : [];
            this.dataTableHistory = handling.convertDataBitToBoolean(obj);
            const arr = [];
            obj.forEach((item) => {
              arr.push({
                ...item,
                CreateDate: handling.convertDateTime(item.CreateDate),
              });
            });
            this.dataTableHistory = arr;
          });
        })
        .catch((err) => console.log(err));
    },

    //
    getByID(id) {
      let body = {
        OID: id,
      };
      dataAPI
        .getDataGasByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              OID: ["OID", id, "OID", null],
            };
            if (obj.Histories) {
              const arr = [];
              obj.Histories.forEach((item) => {
                arr.push({
                  ...item,
                  CreateDate: handling.convertDateTime(item.CreateDate),
                });
              });
              this.dataHistory = arr;
            }
          }
        })
        .catch((err) => console.log(err));
    },

    getDataAfterSave() {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI
        .getListDataGas(body)
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.currentMode == "editing") {
            if (this.dataTable.length) {
              // this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.currentIndex];
              this.getByID(item.OID);
              this.currentMode = "readModel";
            } else {
              this.currentTab = 0;
            }
          } else {
            if (this.dataTable.length) {
              this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.dataTable.length - 1];
              this.getByID(item.OID);
            } else {
              this.currentTab = 0;
            }
          }
        })
        .catch((err) => console.log(err));
    },

    ///ATTRACH FILE
    //getData Attrach file by id
    getAttachFile(index) {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI.getListDataGas(body).then((val) => {
        this.dataTable = val.status
          ? handling.convertDataBitToBoolean(val.data)
          : [];
        index = this.currentIndex;
        const item = this.dataTable[index].OID;
        let body = {
          OID: item.toString(),
        //   OID: item,
          FactorID: this.FactorID,
          EntryID: this.keyString,
        };
        nplAPI
          .getAttachFile(body)
          .then((val) => {
            const arr = val.status ? val.data : [];
            this.dataAttachFile = arr.map((item) => ({
              ...item,
              CreateDate: handling.convertDateTime(item.CreateDate),
            }));
          })
          .catch((err) => console.log(err));
      });
    },

    //
    async handleAttachFile(obj) {
      this.showModalAttachFile = false;
      try {
        const id = this.dataTable[this.currentIndex].OID;

        const newObj = {
          ...obj,
          OID: id,
          FactorID: this.FactorID,
          EntryID: this.keyString,
        };
        let formData = new FormData();
        for (const key in newObj) {
          if (key === "File" && newObj[key] && newObj[key].length > 0) {
            for (let i = 0; i < newObj[key].length; i++) {
              formData.append("File", newObj[key][i]);
            }
          } else {
            formData.append(key, newObj[key]);
          }
        }
        let res;
        if (obj.ID) {
          res = await nplAPI.editAttachFile(formData);
        } else {
          res = await nplAPI.addAttachFile(formData);
        }
        if (res.status) {
          this.getAttachFile(this.currentIndex);
          this.showNotify("success", this.$t("toast.message"), res.message);
        } else {
          this.showNotify("error", this.$t("toast.message"), res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //
    removeAttachFile(item) {
      let body = {
        ID: item.ID,
      };
      nplAPI
        .deleteAttachFile(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getAttachFile(this.currentIndex);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },

    //
    editAttachFile(item) {
      this.showModalAttachFile = true;
      this.formEditAttachFile = { ...item };
    },

    /// PRINT
    //get form modal print
    getFormPrint() {
      const body = {
        FactorID: this.FactorID,
        EntryID: this.keyString,
      };
      nplAPI
        .getFormPrint(body)
        .then((val) => {
          this.dataPrint = val.status ? val.data : [];
          this.showModalPrintFile = true;
        })
        .catch((err) => console.log(err));
    },

    //Button Print
    handlePrint(obj) {
      switch (obj.PrintType.toUpperCase()) {
        case "DOWNLOAD":
          /**gan the a cho thanh phan */
          const link = document.createElement("a");
          /**get name file */
          link.download = obj.FormPrintName;
          /**get link file */
          link.href = obj.PrintAction;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case "CLIENT":
          let formName = "BẢO TRÌ, BẢO DƯỠNG ĐẦU KÉO";
          handling.printExcel(
            "npl-table-basic-form",
            formName.toUpperCase(),
            null,
            null
            // this.$t("form.page") + " " + this.currentPage
          );
        case "SERVER":
        default:
          break;
      }
      if (obj.PrintType.toUpperCase() === "DOWNLOAD") {
        const link = document.createElement("a");
        link.download = obj.FormPrintName;
        link.href = obj.PrintAction;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      this.showModalPrintFile = false;
    },

    /// IMPORT
    //
    handleImportExcel(file) {
      let formData = new FormData();
      formData.append("FactorID", this.FactorID);
      formData.append("EntryID", this.keyString);
      formData.append("File", file);
      nplAPI
        .importExcel(formData)
        .then((val) => {
          if (val.status) {
            // this.showNotify("success", this.$t("toast.message"), val.message);
            this.dataNotifyImportExcel = val.data;
            // this.showModalNotifyImportExcel = true;
            this.currentTab = 0;
            this.getData();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.showModalExFile = false;
        })
        .catch((err) => console.log(err));
    },

    ///SEARCH
    //

    getDataAndLastDocument() {
      let body = {
        EntryID: this.keyString,
      };
      dataAPI
        .getListDataGas(body)
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.dataTable.length) {
            this.loadDocumentByIndex(this.dataTable.length - 1);
          }
        })
        .catch((err) => console.log(err));
    },

    loadDocumentByIndex(index) {
      this.currentMode = "readOnly";
      this.currentIndex = index;
      const item = this.dataTable[index];
      this.getByID(item.OID);
    },

    handleSearch(arr) {
      this.dataSearchCurrent = [...arr];
      this.isSearching = true;
      const ListSearch = [];
      arr.forEach((item) => {
        if (item.Operator) {
          if (item.Param1 || item.Param1 === 0) {
            ListSearch.push({
              Name: item.Name,
              Operator: item.Operator,
              Param1: item.Param1.toString(),
              Param2: item.Param2 ? item.Param2.toString() : "",
            });
          }
        }
      });
      if (ListSearch.length) {
        this.currentTab = 0;
        const body = {
          ListSearch,
          FactorID: this.FactorID,
          EntryID: this.keyString,
        };
        nplAPI
          .search(body)
          .then((val) => {
            this.currentPage = 1;
            this.dataTable = val.status ? val.data : [];
            if (this.dataTable.length) {
              this.loadDocumentByIndex(this.dataTable.length - 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getDataAndLastDocument();
      }
    },

    resetSearch() {
      this.isSearching = false;
      this.setDataSearch(this.fieldsTable);
    },

    //
    //SEARCH
    setDataSearch(arr) {
      const newArr = [];
      arr.forEach((item) => {
        const obj = {
          Label: item.label,
          Name: item.key,
          Type: item.typeCol,
          Operator: "like",
          OperatorDescription: "Có",
          SearchOption: this.getSearchOptionByType(
            item.typeCol,
            this.methodSearch
          ),
          Param1: null,
          Param2: null,
        };
        if (item.key.toUpperCase() === "ISACTIVE") {
          obj.Operator = "=";
          (obj.OperatorDescription = "Bằng"),
            (obj.SearchOption = [
              { text: this.$t("npl.using"), value: 1 },
              { text: this.$t("npl.not-use"), value: 0 },
            ]);
        } else if (item.typeCol.toUpperCase() === "DATE") {
          obj.Operator = "=";
          obj.OperatorDescription = "Bằng";
        }
        newArr.push(obj);
      });
      this.dataSearch = newArr;
    },

    getMethodSearch() {
      nplAPI
        .getMethodSearch()
        .then((val) => {
          let data = val.status ? val.data : [];
          if (data.length > 0) {
            const arr = [];
            data.forEach((item) => {
              if (item.Valu) {
                arr.push({
                  text: item.Shw,
                  value: item.Valu,
                });
              }
            });
            this.methodSearch = [...arr];
          }
        })
        .catch((err) => console.log(err));
    },

    getSearchOptionByType(type, arr) {
      let option = [...arr];
      if (type.toUpperCase() === "STRING" || type.toUpperCase() === "NOTE") {
        option = arr.filter(
          (item) =>
            item.value === "=" ||
            item.value === "like" ||
            item.value === "not like"
        );
      } else if (type.toUpperCase() === "DATE") {
        option = arr.filter(
          (item) => item.value !== "like" && item.value !== "not like"
        );
      }
      return option;
    },

    ///
    //
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },

    //
    handleChangeAction(key) {
      switch (key) {
        case "add":
          this.currentMode = "adding";
          this.currentTab = 1;
          this.handleAdd();
          this.disableAdd();

          break;
        case "edit":
          this.currentMode = "editing";
          this.currentTab = 1;
          this.handleEdit();
          this.disableEdit();

          break;
        case "delete":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableDelete();
          this.handleDelete(this.dataTable[this.currentIndex].OID);
          break;
        case "cancel":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableCancel();
          this.handleEdit();
          break;
        case "save":
          // this.disableSave();
          this.handleSave();
          break;
        case "lock":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableDelete();
          this.handleBlock(this.dataTable[this.currentIndex].OID);
          break;
        case "copy":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableDelete();
          this.handleCopy(this.dataTable[this.currentIndex].OID);
          break;
        case "attachFile":
          this.currentTab = 3;
          this.showModalAttachFile = true;
          this.currentMode = "readOnly";
          break;
        case "print":
          this.getFormPrint();
          this.showModalPrintFile = true;
          this.currentMode = "readOnly";
          break;
        case "importExcel":
          this.showModalExFile = true;
          this.currentMode = "readOnly";
          break;
        case "find":
          this.showModalSearch = true;
          this.currentMode = "readOnly";
          if (!this.isSearching) {
            // this.dataSearch = [...this.dataSearchCurrent]
            this.setDataSearch(this.fieldsTable);
          }
          break;
        default:
          this.currentTab = 0;

          break;
      }
    },

    //Change tab
    updateTab(value) {
      switch (value) {
        case 0:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(0);
          }
          this.currentTab = 0;
          break;
        case 1:
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleEdit();
          break;
        case 2:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(2);
          }
          this.currentTab = 2;
          this.currentMode = "readOnly";
          this.getDataHistory(this.currentIndex);
          break;
        case 3:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(3);
          }
          this.currentTab = 3;
          this.currentMode = "readOnly";
          break;
        default:
          break;
      }
    },

    //show notifi after handle button
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },

    ///disable
    /**Disable ADD */
    disableAdd() {
      this.isDisabledAdd = true;
      this.isDisabledEdit = true;
      this.isDisabledDelete = true;
      this.isDisabledSave = false;
      this.isDisabledCancel = false;
      this.isDisabledAttachFile = true;
      this.isDisabledPrint = true;
      this.isDisabledImportExcel = true;
      this.isDisabledCopy = false;
      this.isDisabledSearch = true;
    },

    /**Disable EDIT */
    disableEdit() {
      this.isDisabledAdd = true;
      this.isDisabledEdit = true;
      this.isDisabledDelete = true;
      this.isDisabledSave = false;
      this.isDisabledCancel = false;
      this.isDisabledAttachFile = true;
      this.isDisabledPrint = true;
      this.isDisabledImportExcel = true;
      this.isDisabledCopy = false;
      this.isDisabledSearch = true;
    },

    /**Disable DELETE */
    disableDelete() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledCopy = false;
      this.isDisabledSearch = false;
    },

    /**Disable SAVE */
    disableSave() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledCopy = false;
      this.isDisabledSearch = false;
    },

    /**Disable CANCEL */
    disableCancel() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledLock = false;
      this.isDisabledCopy = false;
      this.isDisabledSearch = false;
    },

    /**Disable BLOCK */
    disableBlockl() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = true;
      this.isDisabledDelete = true;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = true;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledLock = true;
      this.isDisabledCopy = false;
      this.isDisabledSearch = false;
    },
  },
};
</script>
<style scoped>
.has-use,
.not-use {
  border-radius: 20px;
  max-width: 150px;
  height: 30px;
  text-align: center;

  white-space: nowrap;
  margin-top: 3px;
  margin-left: 1px;
  margin-right: 1px;
  padding-left: 5px;
  padding-right: 5px;
}
.title-category {
  display: inline-block;
  height: 37px;
  border-bottom: 1px solid #d7d7d7;
  padding-left: 5px;
  line-height: 37px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: #005aab;
  margin-bottom: 20px;
}
.box-content {
  overflow: auto;
  height: calc(100vh - 250px);
  overflow-y: auto;
  overflow-x: hidden;
}
.box-content-his {
  overflow: auto;
  height: calc(90vh - 247px);
  overflow-y: auto;
  overflow-x: hidden;
}
.box-content-lis {
  overflow: auto;
  height: calc(87vh - 247px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 15px;
}
/* .rounded .card {
    height: 85vh;
} */
</style>

