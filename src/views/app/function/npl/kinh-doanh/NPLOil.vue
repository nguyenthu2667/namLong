<template>
  <div id="app-content-full" class="npl-categories">
    <b-card>
      <div ref="form-basic" class="h-100">
        <div ref="action-header">
          <ActionsHeaderNPL
            :currentIndex="currentIndex"
            :total="dataTable.length"
            :isPermission="objectData.accessWrite"
            :isDisabledAdd="isDisabledAdd"
            :isDisabledEdit="isDisabledEdit"
            :isDisabledDelete="isDisabledDelete"
            :isDisabledSave="isDisabledSave"
            :isDisabledCancel="isDisabledCancel"
            :isDisabledLock="isDisabledLock"
            :isDisabledCopy="isDisabledCopy"
            :isDisabledAttachFile="isDisabledAttachFile"
            :isDisabledPrint="isDisabledPrint"
            :isDisabledImportExcel="isDisabledImportExcel"
            :isDisabledSearch="isDisabledSearch"
            :statusLock="statusLock"
            :showImportExcel="false"
            @change-index="handleChangeIndex"
            @change-action="handleChangeAction"
            @change-tab="updateTab"
          ></ActionsHeaderNPL>
        </div>
        <b-tabs v-model="currentTab" nav-class="d-none">
          <b-tab>
            <div
              class="box-content mt-2"
              :style="{ height: heightContent }"
              style="overflow: hidden"
            >
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form border-bottom"
                :fields="fieldsTable"
                :items="dataTable"
                bordered
                responsive
                show-empty
                head-variant="light"
                selectable
                :select-mode="'single'"
                sticky-header
                style="max-height: calc(100% - 15px); margin-top: -1px"
                @row-dblclicked="handleDbClick"
              >
                <template
                  v-for="(field, index) in fieldsTable"
                  v-slot:[`cell(${field.key})`]="row"
                >
                  <template v-if="field.key.toUpperCase() === 'ODATE'">
                    {{ convertDate(row.item[field.key]) }}
                  </template>
                  <template
                    v-else-if="field.key.toUpperCase() === 'ISATTACHFILE'"
                  >
                    <template v-if="row.item.IsAttachFile">
                      <div :key="index" class="text-center">
                        <span style="color: limegreen">✔</span>
                      </div>
                    </template>
                    <template v-else>
                      <div :key="index" class="text-center">
                        <span style="color: red">✘</span>
                      </div>
                    </template>
                  </template>
                  <template v-else-if="field.key.toUpperCase() === 'ISACTIVE'">
                    <div :key="index" class="d-flex justify-content-center">
                      <div style="width: 90px">
                        <Status
                          :color="row.item.IsActive ? 'green' : 'gray'"
                          :label="
                            row.item.IsActive
                              ? $t('npl.locked')
                              : $t('npl.not-lock')
                          "
                          :showCircle="false"
                        ></Status>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="field.typeCol.toUpperCase() == 'MONEY'">
                    {{ convertCurrency(row.item[field.key]) }}
                  </template>
                  <template v-else>
                    {{ row.item[field.key] }}
                  </template>
                </template>
                <template #empty>
                  <div class="text-center font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab>
            <Title :title="objectData.formName" />
            <div class="box-content mt-2" :style="{ height: heightContent2 }">
              <component
                :is="renderForm"
                :dataForm="dataForm"
                :currentMode="currentMode"
                :isTakeDataForm="isTakeDataForm"
                :dataChildTable="dataChildTable"
                :formatCurrency="formatCurrency"
                :formatDecimal="formatDecimal"
                @getDataForm="handleSave"
              />
            </div>
          </b-tab>
          <b-tab>
            <Title :title="objectData.formName" />
            <div class="box-content mt-2" :style="{ height: heightContent2 }">
              <table-history
                v-if="dataHistory && dataHistory.length > 0"
                :fields="fieldsHistory"
                :items="dataHistory"
              ></table-history>
              <template v-else>
                {{ $t("cards.no-data") }}
              </template>
            </div>
          </b-tab>
          <b-tab>
            <Title :title="objectData.formName" />
            <div class="box-content mt-2" :style="{ height: heightContent2 }">
              <table-list-file
                v-if="dataAttachFile && dataAttachFile.length > 0"
                :fields="fieldsAttachFile"
                :items="dataAttachFile"
                @removeFile="removeAttachFile"
                @editFile="editAttachFile"
              ></table-list-file>
              <template v-else>
                {{ $t("cards.no-data") }}
              </template>
            </div>
          </b-tab>
        </b-tabs>
        <div ref="action-footer">
          <ActionsFooterNPL
            :activeFocus="currentTab"
            :titleTab0="$t('footer-tab.list')"
            :titleTab1="$t('footer-tab.detail')"
            :titleTab2="$t('footer-tab.action-history')"
            :titleTab3="$t('footer-tab.file-attach')"
            @change-tab="updateTab"
          />
        </div>
        <ModalAttachFile
          :show="showModalAttachFile"
          :formEdit="formEditAttachFile"
          @hidden="showModalAttachFile = false"
          @submitData="handleAttachFile"
        />
        <ModalPrint
          :show="showModalPrint"
          :dataPrint="dataPrint"
          @hidden="showModalPrint = false"
          @formPrint="handlePrint"
        />
        <ModalImportExcel
          :show="showModalImportExcel"
          @hidden="showModalImportExcel = false"
          @submitData="handleImportExcel"
        />
        <ModalNotifyImportExcel
          :show="showModalNotifyImportExcel"
          :dataNotify="dataNotifyImportExcel"
          @hidden="hiddenModalNotifyImportExcel"
        />
        <ModalFind
          :show="showModalFind"
          :methodSearch="methodSearch"
          :dataSearch="dataSearch"
          @hidden="showModalFind = false"
          @search="handleSearch"
          @resetSearch="resetSearch"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import nplAPI from "@/api/modules/nplAPI";
import handling from "@/constants/handling.js";
import functionMixin from "@/views/app/function/npl/kinh-doanh/mixin/functionMixin";

export default {
  mixins: [functionMixin],
  methods: {
    getData() {
      let body = {
        EntryID: this.EntryID,
      };
      nplAPI
        .oilAllowancesGet(body)
        .then((val) => {
          // this.dataTable = val.status ? val.data : [];
          const arr = val.status ? val.data : [];
          if (arr.length) {
            arr.forEach((item) => {
              item.ID = item.OID;
            });
          }
          this.dataTable = arr;
        })
        .catch((err) => console.log(err));
    },
    getDataAndLastDocument() {
      let body = {
        EntryID: this.EntryID,
      };
      nplAPI
        .oilAllowancesGet(body)
        .then((val) => {
          // this.dataTable = val.status ? val.data : [];
          const arr = val.status ? val.data : [];
          if (arr.length) {
            arr.forEach((item) => {
              item.ID = item.OID;
            });
          }
          this.dataTable = arr;
          if (this.dataTable.length) {
            this.loadDocumentByIndex(this.dataTable.length - 1);
          }
        })
        .catch((err) => console.log(err));
    },
    getByID(id, isActive) {
      let body = {
        OID: id,
      };
      nplAPI
        .oilAllowancesGetById(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            const labelID = newObj?.OID ? newObj?.OID[0] : 'cl.OID'
            this.dataForm = {
              ...newObj,
              ID: [labelID, id, "ID", null],
              IsActive: [this.$t("status.status"), obj.IsActive, 'IsActive', null],
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
            //thay đổi 1 số thứ
            this.dataChildTable = [
              { NotOverloadNotContGoodTypes: obj.NotOverloadNotContGoodTypes },
              { NotOverloadContGoodTypes: obj.NotOverloadContGoodTypes },
              { OverloadNotContGoodTypes: obj.OverloadNotContGoodTypes },
              { OverloadContGoodTypes: obj.OverloadContGoodTypes },
              { OilAllowancesRoutes: obj.OilAllowancesRoutes },
              { OilAllowancesVehicles: obj.OilAllowancesVehicles },
            ];
          } else {
            this.dataForm = null;
            this.dataChildTable = [];
            this.dataHistory = [];
            this.dataAttachFile = [];
          }
        })
        .catch((err) => console.log(err));
    },
    handleSave(obj) {
      this.isTakeDataForm = false;
      if (!obj) return;

      let body = {
        ...obj,
        EntryID: this.EntryID,
      };
      this.currentMode = "readOnly";

      if (body.ID) {
        body.OID = body.ID;
        nplAPI
          .oilAllowancesEdit(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.getByID(val.data[0].OID)
              // this.getAttachFile(val.data[0].OID);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        delete body.ID
        nplAPI
          .oilAllowancesAdd(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.getByID(val.data[0].OID)
              this.getAttachFile(val.data[0].OID);
              this.isTakeNewIndex = true
              // this.getDataAndLastDocument();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    handleDelete(id) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-delete")} ${id} ?`, {
          title: this.$t("toast.message"),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            let body = {
              OID: id,
            };
            nplAPI
              .oilAllowancesDelete(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getDataAndLastDocument();
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
    handleLock(id, isActive) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-lock")} ${id} ?`, {
          title: this.$t("toast.message"),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            let body = {
              OID: id,
              IsActive: isActive == false || isActive == 0 ? 1 : 0,
            };
            nplAPI
              .oilAllowancesChangeStatus(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData()
                  this.getByID(val.data[0].OID)
                  this.getAttachFile(val.data[0].OID);
                  // this.getDataAndLastDocument();
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
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-copy")} ${id} ?`, {
          title: this.$t("toast.message"),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            let body = {
              OID: id,
            };
            nplAPI
              .oilAllowancesCopy(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData();
                  this.getByID(val.data[0].OID)
                  this.getAttachFile(val.data[0].OID);
                  this.isTakeNewIndex = true
                  // this.getDataAndLastDocument();
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
<style lang="scss">
.npl-categories {
  .card {
    height: 100%;
  }
  .card-body {
    height: 100%;
  }
  .box-content {
    overflow: auto;
  }
  .btn-warning.disabled {
    color: white;
  }
  .btn-outline-danger.disabled {
    &:hover {
      color: #dc3545;
    }
  }
  .btn-outline-secondary.disabled {
    color: #2a93d5;
    &:hover {
      color: #2a93d5;
      background-color: transparent;
    }
  }
  .btn-outline-info.disabled {
    &:hover {
      color: #17a2b8;
      background-color: transparent;
    }
  }
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  td {
    vertical-align: middle;
  }
  .vdp-datepicker {
    .form-control {
      text-align: right;
    }
    .form-control[readonly] {
      background: none;
    }
    .form-control:disabled {
      background: #e9ecef;
    }
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
