<template>
  <div id="app-content-full" class="form-roots">
    <b-card>
      <ActionsHeaderTree
        @first-index="updateFirstIndex"
        @pre-index="updatePreIndex"
        @next-index="updateNextIndex"
        @last-index="updateLastIndex"
        :showBlock="false"
        :showCopy="false"
        :currentIndex="currentIndex"
        :currentTotalIndex="dataTable?.length"
        :disableAdd="disableAdd"
        :disableEdit="disableEdit"
        :disableDelete="disableDelete"
        :disableSave="disableSave"
        :disableCancel="disableCancel"
        :disablePrint="disablePrint"
        :disableImport="disableImport"
        :disableFind="disableFind"
        @change-actions="handleChangeActions"
      ></ActionsHeaderTree>
      <b-tabs v-model="currentTab" nav-class="d-none" class="box-content">
        <b-tab>
          <div class="mt-2">
            <template v-if="dataTable && dataTable.length > 0">
              <DynamicTableTree
                style="margin-top: -20px"
                :id="'units-npl'"
                ref="tableDynamic"
                :field-table="fields"
                :data-table="dataTable"
                :bordered="true"
                @dbclick="handleDbClick"
                :isSearch="false"
              ></DynamicTableTree>
            </template>
            <template v-else>
              <div class="text-center font-italic text-muted p-3 bg-light">
                {{ $t("panel.non-data") }}
              </div>
            </template>
          </div>
        </b-tab>
        <b-tab>
          <div class="mt-2">
            <template v-if="dataForm && Object.keys(dataForm).length > 0">
              <FormCategoryTree :data-form="dataForm"></FormCategoryTree>
            </template>
            <template v-else>
              <div class="text-center font-italic text-muted p-3 bg-light">
                {{ $t("panel.non-data") }}
              </div>
            </template>
          </div>
        </b-tab>
        <b-tab>
          <div class="mt-2">
            <h1>3333</h1>
          </div>
        </b-tab>
        <b-tab>
          <div class="mt-2">
            <h1>4444</h1>
          </div>
        </b-tab>
      </b-tabs>
      <ActionsFooterTree
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></ActionsFooterTree>
    </b-card>
  </div>
  <!-- <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      @handle-submit="handleSubmit"
    ></custom-form>
  </div> -->
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import treeAPI from "@/api/modules/treeAPI";
import ActionsHeaderTree from "../../../../components/Tree/ActionsHeaderTree.vue";
import ActionsFooterTree from "../../../../components/Tree/ActionsFooterTree.vue";
import DynamicTableTree from "../../../../components/Tree/DynamicTableTree.vue";
import FormCategoryTree from "./component/FormCategoryTree.vue";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    ActionsHeaderTree,
    ActionsFooterTree,
    DynamicTableTree,
    FormCategoryTree,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      dataTable: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,

      currentIndex: 0,
      currentTotalIndex: 0,
      currentTab: 0,

      // Actions-header
      disableAdd: false,
      disableEdit: false,
      disableDelete: false,
      disableSave: true,
      disableCancel: true,
      disablePrint: false,
      disableImport: false,
      disableFind: false,
    };
  },
  methods: {
    handleDbClick(v) {
      this.getDataByID(v?.TreeRootID);
    },
    updateTab(value) {
      this.currentTab = value;
      // if (value == 0) {
      // }
      // if (value == 1) {
      //   if (this.dataForm.type == "HR") {
      //     this.currentTitle = "HÀNG RỜI";
      //   }
      //   if (this.dataForm.type == "CX") {
      //     this.currentTitle = "CONT XUẤT";
      //   }
      //   if (this.dataForm.type == "CN") {
      //     this.currentTitle = "CONT NHẬP";
      //   }
      // }
      // if (value == 2) {
      //   this.currentTitle = "Lịch sử thao tác";
      // }
      // if (value == 3) {
      //   this.currentTitle = "File đính kèm";
      // }
    },
    updateFirstIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = 0;
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updatePreIndex() {
      if (!this.dataTable?.length > 0 || this.currentIndex == 0) return;
      this.currentIndex -= 1;
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateNextIndex() {
      let indexEqualDataTable = this.currentIndex == this.dataTable.length - 1;
      if (!this.dataTable?.length > 0 || indexEqualDataTable) return;
      this.currentIndex += 1;
      // this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateLastIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = this.dataTable.length - 1;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
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
          this.currentTab = 1;
          break;
        case "delete":
          this.typeAction = key;
          this.pushHistory();
          this.deleteModal();
          this.currentTab = 1;
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
            this.$bvModal.show(`modal-print-basic`);
          }, 500);
          break;
        case "import":
          setTimeout(() => {
            this.$bvModal.show(`modal-import-basic`);
          }, 500);
          // this.handleShowImportFile();
          break;
        case "find":
          setTimeout(() => {
            this.$bvModal.show(`modal-find-${this.keyComponent}`);
          }, 500);
          break;
      }
    },

    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/TreeRoots/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("TreeRoots");
          this.getKeyTable();
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getData();
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].TreeRootID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/TreeRoots/Edit";
        this.bodyFormDefault = {
          ID: items[0].TreeRootID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].TreeRootName + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].TreeRootID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      treeAPI
        .treeRootsRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("TreeRoots");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.TreeRootID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      treeAPI
        .treeRootsChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      treeAPI
        .treeRootsByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
          this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      treeAPI
        .treeRootsList()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.currentIndex = val.status ? val.data.length - 1 : 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      treeAPI
        .treeRootsList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("TreeRoots");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("TreeRoots");
    setTimeout(async () => {
      await this.getDataByID(
        this.dataTable[this.dataTable.length - 1].TreeRootID
      );
    }, 500);
  },
  watch: {
    items() {
      this.getColumn("TreeRoots");
      this.getKeyTable();
    },
  },
  computed: {
    fields() {
      let result = handling.mergeKeyDynamic(
        this.objectKey,
        this.listColumnShow
      );
      return result;
    },
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 500);
  },
};
</script>
<style scoped>
.box-content {
  height: calc(100vh - 247px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
