<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1 class="mb-0">
          <strong class="mr-1">{{ objectData.formName }}</strong>
          <span class="h5" v-if="storeDefault">
            ({{ storeOptions.filter((x) => x.value === storeDefault)[0].text }})
          </span>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                v-if="selectedItems.length === 1"
                @click="
                  selectedItems[0].StatusID > 0
                    ? fullInfoItem(selectedItems[0].OID)
                    : infoItem(selectedItems[0].OID)
                "
              >
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
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
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  selectedItems[0].StatusEdit === 1
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
                @click="cancelModal(selectedItems[0])"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  selectedItems[0].StatusEdit === 1
                "
              >
                <i class="fad fa-ban"></i>
                &emsp;{{ $t("modal.cancel-order") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-ban"></i>
                &emsp;{{ $t("modal.cancel-order") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  selectedItems[0].StatusEdit === 1
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
                &emsp;
                {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="exportModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2">
          <span v-b-toggle.header-options variant="primary">
            <i class="fad fa-cog mr-2" style="font-size: 15px"></i>
            <strong>
              {{ $t("dashboards.from-date") }}:
              {{ convertPickerToDate(fromDateDefault) }} -
              {{ $t("dashboards.to-date") }}:
              {{ convertPickerToDate(toDateDefault) }}
            </strong>
          </span>
          <b-collapse id="header-options">
            <div class="mt-1">
              <b-row>
                <b-colxx xl="3" v-if="storeOptions">
                  <span class="text-small">{{ $t("dashboards.store") }}:</span>
                  <b-form-select
                    v-model="storeDefault"
                    :options="storeOptions"
                    size="sm"
                    @change="
                      selectOption(fromDateDefault, toDateDefault, storeDefault)
                    "
                  ></b-form-select>
                </b-colxx>
                <b-colxx xl="3">
                  <span class="text-small">
                    {{ $t("dashboards.from-date") }}:
                  </span>
                  <b-form-datepicker
                    size="sm"
                    :locale="locale"
                    v-model="fromDateDefault"
                    @input="
                      selectOption(fromDateDefault, toDateDefault, storeDefault)
                    "
                  ></b-form-datepicker>
                </b-colxx>
                <b-colxx xl="3">
                  <span class="text-small">
                    {{ $t("dashboards.to-date") }}:
                  </span>
                  <b-form-datepicker
                    size="sm"
                    :locale="locale"
                    v-model="toDateDefault"
                    @input="
                      selectOption(fromDateDefault, toDateDefault, storeDefault)
                    "
                  ></b-form-datepicker>
                </b-colxx>
              </b-row>
            </div>
          </b-collapse>
        </div>
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
      :type-form="typeForm"
      :data-form-option="dataFormOptions"
      @handle-submit="handleSubmit"
      @reset-modal="resetModal"
      @get-option-items="getOptionItems"
      @get-option-saler="getOptionSaler"
      :station-option="stationOptions"
      :table-list-item="gasItems"
      :table-field="gasItemFields"
      v-if="nameForm"
    ></custom-form>
    <order-form
      :name-form="nameOrderForm"
      :title-form="titleOrderForm"
      :data-form="orderForm"
      @reset-modal="resetOrderModal"
      :station-option="stationOptions"
      :hide-footer="true"
      v-if="nameOrderForm"
    ></order-form>
    <full-order-form
      :name-form="nameFullOrderForm"
      :title-form="titleFullOrderForm"
      :data-form="dataFullOrderByID"
      @reset-modal="resetFullOrderModal"
      :hide-footer="true"
      v-if="nameFullOrderForm"
    ></full-order-form>
    <b-modal
      v-if="cancelContract"
      id="modal-cancel"
      ref="modal-cancel"
      :title="$t('modal.cancel-order') + ' ' + cancelContract.OID + '?'"
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalCancel"
      @ok="handleOkCancel"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitCancel">
        <b-form-group
          :state="cancelState"
          :label="$t('dashboards.reason') + ':'"
          label-for="lock-input"
          :invalid-feedback="$t('dashboards.enter-reason')"
        >
          <b-form-input
            id="lock-input"
            v-model="cancel"
            :state="cancelState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal id="export-modal" :title="titleForm" class="text-center">
      <b-row>
        <b-colxx lg="12">
          <b-form-group :label="$t('dashboards.store') + ':'">
            <b-form-select
              v-model="storeDefault"
              :options="storeOptions"
              size="sm"
              @change="
                selectOption(fromDateDefault, toDateDefault, storeDefault)
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.from-date') + ':'">
            <b-form-datepicker
              :locale="locale"
              v-model="fromDateDefault"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.to-date') + ':'">
            <b-form-datepicker
              :locale="locale"
              v-model="toDateDefault"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
      </b-row>
      <template #modal-footer="{ cancel }">
        <b-button variant="success" @click="handleSubmitExport(0)">
          {{ $t("report.action.download-excel") }}
        </b-button>
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
      </template>
    </b-modal>
    <b-modal
      id="notify-modal"
      ref="notify-modal"
      hide-footer
      :title="$t('notify.notification').toUpperCase()"
    >
      <div class="text-center mb-4">
        <b-img
          :src="require('@/assets/img/V.svg')"
          style="height: 100px"
        ></b-img>
      </div>
      <strong class="text-center">
        <p class="mb-0">{{ $t("notify.noti-check-2") }}.</p>
        <p class="mb-0">{{ $t("notify.noti-check-3") }}!</p>
      </strong>
    </b-modal>
  </div>
</template>

<script>
import excelAPI from "@/api/modules/excelAPI";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/SaleForm";
import OrderForm from "./component/OrderForm";
import FullOrderForm from "./component/OrderFullForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import gasSalesAPI from "@/api/modules/gasSalesAPI";
import userAPI from "@/api/modules/userAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "order-form": OrderForm,
    "full-order-form": FullOrderForm,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      gasItems: null,
      gasItemFields: [
        {
          key: "Name",
          label: this.$t("modal.gas-name"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "PriceVAT",
          label: this.$t("modal.price-vat"),
          tdClass: "text-right",
          sortable: true,
          formatter: (value) => {
            return this.convertFloat(value);
          },
        },
        {
          key: "PriceVATKg",
          label: this.$t("modal.price-vat-kg"),
          tdClass: "text-right",
          sortable: true,
          formatter: (value) => {
            return this.convertFloat(value);
          },
        },
        {
          key: "UnitQtty",
          label: this.$t("modal.unit-qtty"),
          tdClass: "text-right",
          sortable: true,
        },
      ],
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      typeForm: "",
      dataForm: {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
        StatusColor: null,
        StatusName: null,
        Statustime: null,
        StatusEdit: null,
        CancelNote: null,
        StatusID: null,
        Prd_Amnt: 0,
        Ret_Amnt: 0,
        SaleUserID: null,
        Deb_Amnt: 0,
      },
      dataByID: null,
      dataFormOptions: {
        GasStationID: [
          {
            value: this.$t("modal.choose-unit"),
            text: null,
            disabled: true,
          },
        ],
        SaleUserID: [],
      },
      stationOptions: null,
      nameOrderForm: null,
      titleOrderForm: null,
      orderForm: {
        OID: "AUTO",
        GasStationID: null,
        StationName: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
        StatusColor: null,
        StatusName: null,
        Statustime: null,
        StatusEdit: null,
        CancelNote: null,
        StatusID: null,
        Prd_Amnt: 0,
        Ret_Amnt: 0,
      },
      dataOrderByID: null,
      nameFullOrderForm: null,
      titleFullOrderForm: null,
      dataFullOrderByID: null,
      cancelContract: null,
      cancelState: null,
      cancel: "",
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      storeOptions: null,
      storeDefault: null,
    };
  },
  methods: {
    getOptionSaler(id) {
      let body = {
        StoreID: id + "|#",
      };
      userAPI
        .getSalerByStoreID(body)
        .then((val) => {
          this.dataFormOptions.SaleUserID = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              // if (val.data[i].IsActive === 1) {
              let obj = {
                label: val.data[i].UserFullName,
                id: val.data[i].UserID,
              };
              this.dataFormOptions.SaleUserID.push(obj);
              // }
            }
          }
        })
        .catch((err) => console.log(err));
    },
    exportModal() {
      this.titleForm = this.$t("report.action.download-excel").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("export-modal");
      }, this.timer);
    },
    handleSubmitExport(value) {
      let body = {
        StoreID: this.storeDefault,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.typeFile,
        IsAll: value,
        FromDate: this.fromDateDefault,
        ToDate: this.toDateDefault,
      };
      excelAPI
        .exportExcel(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
            this.$bvModal.show("notify-modal");
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.$bvModal.hide("export-modal");
        })
        .catch((err) => console.log(err));
    },
    selectOption(from, to, id) {
      this.getData(from, to, id);
    },
    getOption() {
      gasSalesAPI
        .getStoreList()
        .then((val) => {
          let options = val.status ? val.data : null;
          if (options?.length > 0) {
            let array = [];
            options.forEach((ele) => {
              let obj = {
                value: ele.StoreID,
                text: ele.StoreName,
              };
              array.push(obj);
            });
            this.storeOptions = array;
            this.storeDefault =
              this.storeOptions?.length > 0 ? this.storeOptions[0].value : null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
    fullInfoItem(id) {
      this.getDataByID(id);
      this.getOptionStation();
      setTimeout(() => {
        this.dataFullOrderByID = this.dataByID;
        this.dataFullOrderByID.StationName = this.dataByID.GasStationName;
        this.nameFullOrderForm = "modal-approval-full";
        this.titleFullOrderForm = this.$t("modal.order-details").toUpperCase();
        setTimeout(() => {
          this.$bvModal.show(this.nameFullOrderForm);
        }, this.timer);
      }, this.timer);
    },
    infoItem(id) {
      this.getOptionSaler(this.selectedItems[0].StoreID);
      this.getDataByID(id);
      this.getOptionStation();
      setTimeout(() => {
        this.orderForm = {
          OID: this.dataByID.ReferenceID,
          GasStationID: this.dataByID.GasStationID,
          StationName: this.dataByID.GasStationName,
          Odate: handling.convertDateForm(this.dataByID.Odate),
          EstimateDelivery: handling.convertDateForm(
            this.dataByID.EstimateDelivery
          ),
          Dcn_Amnt: this.dataByID.Dcn_Amnt,
          Deb_Amnt: this.dataByID.Deb_Amnt,
          Total_Amnt: this.dataByID.Total_Amnt,
          Note: this.dataByID.Note,
          Details: this.dataByID.Details,
          StatusColor: this.dataByID.StatusColor,
          StatusName: this.dataByID.StatusName,
          Statustime: this.dataByID.StatusTime,
          CancelNote: this.dataByID.CancelNote,
          StatusID: this.dataByID.StatusID,
          Prd_Amnt: this.dataByID.Prd_Amnt,
          Ret_Amnt: this.dataByID.Ret_Amnt,
          //tbug
          SalerUser: this.dataFormOptions["SaleUserID"].filter(
            (item) => item.id == this.dataByID.SaleUserID
          ),
        };
        this.getOptionItems(this.orderForm.GasStationID);
        this.nameOrderForm = "modal-approval";
        this.typeForm = "INFO";
        this.titleOrderForm = this.$t("modal.order-details").toUpperCase();
        setTimeout(() => {
          this.$bvModal.show(this.nameOrderForm);
        }, this.timer);
      }, this.timer);
    },
    resetFullOrderModal() {
      this.nameFullOrderForm = null;
      this.titleFullOrderForm = null;
    },
    resetOrderModal() {
      this.orderForm = {
        OID: "AUTO",
        GasStationID: null,
        StationName: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
        StatusColor: null,
        StatusName: null,
        Statustime: null,
        StatusEdit: null,
        CancelNote: null,
        StatusID: null,
        Prd_Amnt: 0,
        Ret_Amnt: 0,
      };
      this.nameOrderForm = null;
      this.titleOrderForm = null;
    },
    resetModal() {
      this.dataForm = {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
        StatusColor: null,
        StatusName: null,
        Statustime: null,
        StatusEdit: null,
        CancelNote: null,
        StatusID: null,
        Prd_Amnt: 0,
        Ret_Amnt: 0,
        SaleUserID: null,
        Deb_Amnt: 0,
      };
      this.gasItems = null;
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
      this.dataFormOptions.SaleUserID = [];
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
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    addModal() {
      this.getOptionStation();
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/GasContracts/Add";
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
          this.getColumn("GasContracts");
          this.getKeyTable(
            this.fromDateDefault,
            this.toDateDefault,
            this.storeDefault
          );
          this.getData(
            this.fromDateDefault,
            this.toDateDefault,
            this.storeDefault
          );
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData(
            this.fromDateDefault,
            this.toDateDefault,
            this.storeDefault
          );
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
        this.getData(
          this.fromDateDefault,
          this.toDateDefault,
          this.storeDefault
        );
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.dataForm = {
        OID: "AUTO",
        GasStationID: null,
        Odate: handling.convertDateForm(new Date()),
        EstimateDelivery: handling.convertDateForm(new Date()),
        Dcn_Amnt: 0,
        Deb_Amnt: 0,
        Total_Amnt: 0,
        Note: null,
        Details: [],
        StatusColor: null,
        StatusName: null,
        Statustime: null,
        StatusEdit: null,
        CancelNote: null,
        StatusID: null,
        Prd_Amnt: 0,
        Ret_Amnt: 0,
        Deb_Amnt: 0,
        SaleUserID: null,
      };
      this.gasItems = null;
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
      this.dataFormOptions.SaleUserID = [];
    },
    editModal(items) {
      this.getDataByID(items[0].OID);
      this.getOptionStation();
      this.getOptionSaler(items[0].StoreID);
      setTimeout(() => {
        this.dataForm = {
          OID: this.dataByID.ReferenceID,
          GasStationID: this.dataByID.GasStationID,
          Odate: handling.convertDateForm(this.dataByID.Odate),
          EstimateDelivery: handling.convertDateForm(
            this.dataByID.EstimateDelivery
          ),
          Dcn_Amnt: this.dataByID.Dcn_Amnt,
          Deb_Amnt: this.dataByID.Deb_Amnt,
          Total_Amnt: this.dataByID.Total_Amnt,
          Note: this.dataByID.Note,
          Details: this.dataByID.Details,
          StatusColor: this.dataByID.StatusColor,
          StatusName: this.dataByID.StatusName,
          Statustime: this.dataByID.StatusTime,
          CancelNote: this.dataByID.CancelNote,
          StatusID: this.dataByID.StatusID,
          Prd_Amnt: this.dataByID.Prd_Amnt,
          Ret_Amnt: this.dataByID.Ret_Amnt,
          Deb_Amnt: this.dataByID.Deb_Amnt,
          SaleUserID: this.dataByID.SaleUserID,
        };
        this.getOptionItems(this.dataForm.GasStationID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/GasContracts/Edit";
        this.bodyFormDefault = {
          OID: items[0].OID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].OID + "?", {
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
            this.handleSubmitDelete(items[0].OID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDelete(id) {
      let body = {
        OID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasRestaurantAPI
        .gasSaleRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("GasContracts");
              this.getKeyTable(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              this.getData(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData(
              this.fromDateDefault,
              this.toDateDefault,
              this.storeDefault
            );
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
    cancelModal(items) {
      this.cancelContract = items;
      setTimeout(() => {
        this.$bvModal.show("modal-cancel");
      }, 200);
    },
    handleSubmitCancel() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitCancelOK(this.cancel, this.cancelContract.OID);
        this.$bvModal.hide("modal-cancel");
      });
    },
    handleOkCancel(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitCancel();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.cancelState = valid;
      return valid;
    },
    resetModalCancel() {
      this.cancel = "";
      this.cancelState = null;
      this.cancelContract = null;
    },
    submitCancelOK(note, id) {
      let body = {
        OID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
        CancelNote: note,
      };
      gasRestaurantAPI
        .gasOrderAndSaleCancel(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("GasContracts");
              this.getKeyTable(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              this.getData(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData(
                this.fromDateDefault,
                this.toDateDefault,
                this.storeDefault
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData(
              this.fromDateDefault,
              this.toDateDefault,
              this.storeDefault
            );
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getOptionItems(id) {
      let body = {
        StationID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasRestaurantAPI
        .gasItemByStationID(body)
        .then((val) => {
          this.gasItems = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionStation() {
      gasRestaurantAPI
        .gasRestaurantCustomerGet()
        .then((val) => {
          this.dataFormOptions.GasStationID = [];
          if (val.status) {
            if (val.data.length > 0) {
              this.stationOptions = val.data;
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    label: val.data[i].StationName,
                    id: val.data[i].StationID,
                  };
                  this.dataFormOptions.GasStationID.push(obj);
                }
              }
            } else {
              this.stationOptions = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        OID: id,
      };
      gasRestaurantAPI
        .gasOrderAndSaleByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(from, to, id) {
      let body = {
        StoreID: id,
        FrmDate: from,
        ToDate: to,
      };
      gasRestaurantAPI
        .gasSaleGet(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(from, to, id) {
      let body = {
        StoreID: id,
        FrmDate: from,
        ToDate: to,
      };
      gasRestaurantAPI
        .gasSaleGet(body)
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
    timerLoadDashboard(time) {
      if (this.storeDefault)
        this.getData(
          this.fromDateDefault,
          this.toDateDefault,
          this.storeDefault
        );
      if (this.storeDefault)
        this.getKeyTable(
          this.fromDateDefault,
          this.toDateDefault,
          this.storeDefault
        );
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getOption();
    await this.getListMenuRight();
    await this.getColumn("GasContracts");
    // await this.getKeyTable()
    setTimeout(async () => {
      await this.timerLoadDashboard(this.timer * 120);
    }, 500);
    // await this.getData();
    // await this.timerLoadDashboard(this.timer * 120)
  },
  watch: {
    items() {
      this.getColumn("GasContracts");
      this.getKeyTable(
        this.fromDateDefault,
        this.toDateDefault,
        this.storeDefault
      );
    },
  },
  computed: {
    fields: function () {
      // console.log(this.objectKey, handling.mergeTableAndData(this.objectKey, this.listColumnShow))
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
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
