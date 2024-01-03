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
              <!-- <CustomTable
                :fields="fieldsTable"
                :items="dataTable"
                :formatCurrency="formatCurrency"
                :formatDecimal="formatDecimal"
                :heightContent="heightContent"
                @rowDblclicked="handleDbClick"
              >
              </CustomTable> -->
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
import functionMixin from "@/views/app/function/npl/kinh-doanh/mixin/functionMixin";
export default {
  mixins: [functionMixin],
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
