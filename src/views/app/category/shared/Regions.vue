<template>
  <div id="app-content-full" class="npl-categories">
    <b-card>
      <div ref="form-basic" class="h-100">
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
            :show-block="false"
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
              class="mt-2" 
              style="overflow: hidden"
            >
              <template v-if="isSearching == false">
                <div id="t-table">
                  <TreeTable
                    class="p-treetable-sm"
                    :value="itemsCollapse"
                    :meta-key-selection="false"
                    :selection-keys.sync="selectedKey2"
                    selection-mode="single"
                    :style="'font-family: Nunito, sans-serif; font-size: 0.8rem; padding: 10 px'"
                    @node-unselect="onNodeUnselect"
                  >
                    <Column
                      field="name"
                      header="Khu vực/ Nhóm"
                      :expander="true"
                      style="
                      "
                    />
                    <Column 
                      field="note" 
                      header="Ghi chú" 
                    />
                    <Column
                      field="isActive"
                      header="Trạng thái"
                      style="text-align: center !important"
                    >
                      <template #body="slotProps">
                        <template v-if="slotProps.node.data.isActive == '1'">
                          <div
                            class="has-use"
                            :style="'border: 2px solid; color: green; margin: 0 auto'"
                          >
                            <div :style="'color: black; font-weight: 600;'">
                              Đang dùng
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div
                            class="not-use"
                            :style="'border: 2px solid; color: gray;  margin: 0 auto'"
                          >
                            <div :style="'color: black; font-weight: 600;'">
                              Không dùng
                            </div>
                          </div>
                        </template>
                      </template>
                    </Column>
                  </TreeTable>
                </div>
              </template>
              <template v-else>
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
                            Đang dùng
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div :style="'text-align: center !important;'">
                        <div
                          class="not-use"
                          :style="'border: 2px solid; color: gray; margin: 0 auto'"
                        >
                          <div :style="'color: black; font-weight: 600;'">
                            Không dùng
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                </b-table>
              </template>
            </div>
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: KHU VỰC/VÙNG MIỀN</span>
            <form-detail
              class="box-content-form"
              :data-form="dataForm"
              :current-mode="currentMode"
              :data-form-option="dataFormOptions"
              :key-show="keyShow"
              :load-options="false"
              :item="dataTable"
            />
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: KHU VỰC/VÙNG MIỀN</span>
            <form-history
              :data-table-history="dataTableHistory"
              :fields-table-history="fieldsTableHistory"
              class="box-content-his"
            />
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: KHU VỰC/VÙNG MIỀN</span>
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
import FormConnectType from "@/views/app/category/shared/component/FormRegions.vue";
import FormHistoryConnectType from "@/views/app/category/shared/component/FormHistory.vue";
import TableListFile from "@/views/app/category/npl/component/TableListFile";
import ModalAttach from "@/views/app/category/npl/component/ModalAttachFile";
import ModalPrint from "@/views/app/category/npl/component/ModalPrint";
import ModalImportEx from "@/views/app/category/npl/component/ModalImportExcel";
import ModalSearch from "@/views/app/category/npl/component/ModalFind";
import shareAPI from "@/api/modules/shareAPI";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";

export default {
  components: {
    TreeTable,
    Column,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    TableListFile,
    "form-history": FormHistoryConnectType,
    "modal-attach-file": ModalAttach,
    "modal-print": ModalPrint,
    "modal-import-ex": ModalImportEx,
    "modal-search": ModalSearch,
    "form-detail": FormConnectType,
  },
  data() {
    return {
      selectedKey2: null,
      keyShow: 0,
      dataFormOptions: {
        RegionParentID: [],
      },
      listColumnShow: null,

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
      keyString: "Regions",
      currentMode: "readOnly",
      objData: null,
      columnAdd: null,
      dataForm: null,
      currentIndex: 0,
      isCheckIsValid: false,
      notRequired: ["Note", "IsActive", "RegionNameExtention1"],
      dataNotifyImportExcel: null,
      // showModalNotifyImportExcel: false,
      isDisabledAdd: false,
      isDisabledEdit: false,
      isDisabledDelete: false,
      isDisabledSave: true,
      isDisabledCancel: true,
      isDisabledAttachFile: false,
      isDisabledPrint: false,
      isDisabledImportExcel: false,
      isDisabledSearch: false,
      accessWrite: null,
      menuRight: [],
      items: null,
      itemsGetData: null,
      itemsCollapse: [],
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
      if (path.includes("category")) {
        return "Category";
      }
      return "";
    },

    //
    CategoryType() {
      return this.keyString;
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

  watch: {},

  async created() {
    await this.getListMenuRight();
    await this.getData();
    await this.getMethodSearch();
    await this.getAttachFile(this.currentIndex);
    await this.getColTypes(this.keyString);
    await this.getKeyTable();
    await this.getDynamicFormAdd(this.keyString);
    await this.getDataHistory(this.currentIndex);
    await this.getColumn(this.keyString);
    await this.getRegionData();
  },

  methods: {
    onNodeSelect(node) {
      this.$toast.add({
        severity: "success",
        summary: "Node Selected",
        detail: node.data.name,
        life: 3000,
      });
    },

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

    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ////getAll data table
    getData() {
      shareAPI
        .shareRegionList()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 0, arrTable, 0);
            this.itemsGetData = arrTable;
            this.dataTable = this.itemsGetData.map((item) => item);
          } else {
            this.itemsGetData = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRegionData() {
      shareAPI
        .shareRegionList()
        .then((val) => {
          let options = val.status ? val.data : null;
          if (options?.length > 0) {
            let newArray = [];
            handling.recursiveArray2(
              options,
              0,
              newArray,
              "RegionParentID",
              "RegionID",
              ""
            );
            this.items = newArray;
            this.itemsCollapse = this.items.map((item) => item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
          isCollapse: false,
          isParentCollapse: false,
        };

        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
      });
    },

    handleDbClick(row) {
      const index = this.dataTable.findIndex(
        (item) => item.RegionID == row.RegionID
      );

      const item = this.dataTable[index];
      this.getByID(item.RegionID);
      this.currentTab = 1;
      this.currentMode = "readOnly";
      this.currentIndex = index;
    },

    rowSelected(itemsGetData) {
      this.currentIndex = this.dataTable.length - 1;
      if (itemsGetData != null) {
        var idRegType;
        itemsGetData.forEach((el) => {
          idRegType = el.RegionID;
        });
        var count = 0;
        this.dataTable.forEach((element) => {
          count++;
          if (element.RegionID == idRegType) {
            this.currentIndex = count - 1;
            return;
          }
        });
      }
    },

    onNodeUnselect(row) {
      const index = this.dataTable.findIndex(
        (item) => item.RegionID == row.data.id
      );

      const item = this.dataTable[index];
      this.getByID(item.RegionID);
      this.currentTab = 1;
      this.currentMode = "readOnly";
      this.currentIndex = index;
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
      this.showDataFormOptionRoute(this.itemsGetData);
      if (this.currentTab === 0) {
        this.currentTab = 1;
      }
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.changeIndexWhenNotSave(index);
      }
      if (this.currentTab === 2) {
        this.currentIndex = index;
        return this.getDataHistory(this.currentIndex);
      }
      if (this.currentTab === 3) {
        this.currentIndex = index;
        return this.getAttachFile(this.currentIndex);
      }
      this.currentIndex = index;
      this.currentMode = "readOnly";
      const item = this.dataTable[index];
      this.getByID(item.RegionID);
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
            this.getByID(item.RegionID);
            this.disableCancel();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.showDataFormOptionRoute(this.itemsGetData);
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },

    showDataFormOptionRoute(array, id) {
      // this.getData();
      let _array = [];
      if (id) {
        _array = array.filter(
          (x) => x.RegionParentID !== id && x.RegionID !== id
        );
      } else {
        _array = array;
      }
      let newArray = [
        {
          id: 0,
          key: 0,
          label: this.$t("form.not-available"),
          parent: 0,
        },
      ];
      handling.recursiveRegionParent(_array, 0, newArray, 0);
      this.dataFormOptions.RegionParentID = newArray;
    },

    handleEdit() {
      this.showDataFormOptionRoute(this.itemsGetData);
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.RegionID);
    },

    //
    handleDelete(id) {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.RegionID);
      this.currentMode = "readOnly";
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-delete")} ${
            this.dataTable[this.currentIndex].RegionName
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
              ID: id,
            };
            shareAPI
              .shareRegionRemove(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData();
                  this.getRegionData();                  
                  this.getDataAfterSave();
                  this.currentMode = "readOnly";
                  this.isSearching = false;
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
      this.getData();
      this.showDataFormOptionRoute(this.itemsGetData);
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
      };
      if (this.currentMode == "editing") {
        shareAPI
          .shareRegionEdit(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.disableSave();
              this.getData();
              this.getDataAfterSave();
              this.getRegionData();
              this.isSearching = false;
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        shareAPI
          .shareRegionAdd(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.disableSave();
              this.getData();
              this.getDataAfterSave();
              this.currentMode = "readOnly";
              this.currentTab = 1;
              this.getRegionData();
              this.isSearching = false;
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },

    //
    handleCancel() {
      this.showDataFormOptionRoute(this.itemsGetData);
      if (this.dataTable.length) {
        const item = this.dataTable[this.currentIndex];
        this.getByID(item.RegionID);
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
      shareAPI
        .shareRegionList()
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

    //getData History by id
    getDataHistory(index) {
      shareAPI
        .shareRegionList()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          const item = this.dataTable[index];
          let body = {
            ID: item.RegionID,
          };
          /** */
          shareAPI.shareRegionByID(body).then((val) => {
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
      // this.getData();
      this.showDataFormOptionRoute(this.itemsGetData);
      let body = {
        ID: id,
      };
      shareAPI
        .shareRegionByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
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
      shareAPI
        .shareRegionList()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.currentMode == "editing") {
            if (this.dataTable.length) {
              // this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.currentIndex];
              this.getByID(item.RegionID);
              this.currentMode = "readModel";
            } else {
              this.currentTab = 0;
            }
          } else {
            if (this.dataTable.length) {
              this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.dataTable.length - 1];
              this.getByID(item.RegionID);
            } else {
              this.currentTab = 0;
            }
          }
        })
        .catch((err) => console.log(err));

      // this.getData();
    },

    ///ATTRACH FILE
    //getData Attrach file by id
    getAttachFile(index) {
      shareAPI.shareRegionList().then((val) => {
        this.dataTable = val.status
          ? handling.convertDataBitToBoolean(val.data)
          : [];
        index = this.currentIndex;
        const item = this.dataTable[index].RegionID;
        let body = {
          OID: item.toString(),
          FactorID: this.FactorID,
          EntryID: this.CategoryType,
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
      this.showDataFormOptionRoute(this.itemsGetData);
      this.showModalAttachFile = false;
      try {
        const id = this.dataTable[this.currentIndex].RegionID;

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
        EntryID: this.CategoryType,
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
          let formName = "KHU VỰC/VÙNG MIỀN";
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
      formData.append("EntryID", this.CategoryType);
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
      shareAPI
        .shareRegionList()
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
      this.getByID(item.PowerTypeID);
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
          EntryID: this.CategoryType,
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
        this.isSearching = false;
        this.getDataAndLastDocument();
      }
    },
    resetSearch() {
      // this.isSearching = false;
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
          this.handleDelete(this.dataTable[this.currentIndex].RegionID);
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
          this.getData();
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleEdit();
          break;
        case 2:
          this.getData();
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(2);
          }
          this.currentTab = 2;
          this.currentMode = "readOnly";
          this.getDataHistory(this.currentIndex);
          break;
        case 3:
          this.getData();
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
<style>
.p-treetable .p-treetable-thead > tr > th {
  text-align: center !important;
  background: #f3f3f3;
   font-weight: 800;
  
}
.p-treetable.p-treetable-sm .p-treetable-thead > tr > th{
 padding: 0.7rem 0.5rem;
 border: 1px solid #f3f3f3;
}
.p-treetable.p-treetable-sm .p-treetable-tbody > tr > td{
        border: 1px solid #f3f3f3;
}
.p-treetable .p-treetable-tbody > tr.p-highlight{
  background: #d9d9d9;
  color: #212529;
  border-color: #d9d9d9 ;
}
.p-treetable .p-treetable-tbody > tr:focus{
  outline: none;
}
/* .p-treetable.p-treetable-sm .p-treetable-tbody > tr:hover{
  background: none !important;
} */
.p-treetable .p-treetable-tbody > tr::selection{
  background: none;
}
.p-treetable .p-treetable-tbody > tr.p-highlight .p-treetable-toggler{
  color:#212529 ;
}
</style>
