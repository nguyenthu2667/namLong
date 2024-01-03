<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
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
          <b-row>
            <b-colxx lg="2">
              <b-form-group :label="$t('dashboards.store') + ':'">
                <b-form-select
                  v-model="storeDefault"
                  :options="storeOptions"
                  size="sm"
                  @change="
                    changeOption(
                      selectedOption,
                      from,
                      to,
                      storeDefault,
                      employerDefault
                    )
                  "
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="2">
              <b-form-group :label="'Nhân viên Giao' + ':'">
                <b-form-select
                  v-model="employerDefault"
                  :options="employerOptions"
                  size="sm"
                  @change="
                    changeOption(
                      selectedOption,
                      from,
                      to,
                      storeDefault,
                      employerDefault
                    )
                  "
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="2">
              <b-form-group :label="$t('view') + ':'">
                <b-form-select
                  v-model="selectedOption"
                  :options="options"
                  size="sm"
                  @change="
                    changeOption(
                      selectedOption,
                      from,
                      to,
                      storeDefault,
                      employerDefault
                    )
                  "
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="3">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="from"
                  required
                  @input="
                    changeOption(
                      selectedOption,
                      from,
                      to,
                      storeDefault,
                      employerDefault
                    )
                  "
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="3">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="to"
                  required
                  @input="
                    changeOption(
                      selectedOption,
                      from,
                      to,
                      storeDefault,
                      employerDefault
                    )
                  "
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>

          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            :export-status="exportStatus"
          ></custom-table>
          <b-row class="box-total" v-if="data">
            <b-col lg="12" class="text-right">
              <b-row>
                <b-col lg="9" class="text-right mb-2"></b-col>
                <b-col lg="3" class="mb-2 d-flex">
                  <div style="min-width: 100px" class="clearfix">
                    <i class="float-left">{{ $t("order-total") }}</i>
                    <span class="float-right mr-1">:</span>
                  </div>
                  <div
                    class="d-flex justify-content-between"
                    style="width: 180px"
                    v-if="data.ContractTotal && data.Total_Amnt"
                  >
                    <b>
                      {{ data.ContractTotal }} {{ $t("order") }} _
                      {{ convertFloat(data.Total_Amnt) }}
                    </b>
                    <b>VNĐ</b>
                  </div>
                  <b v-else>0 {{ $t("order") }} - 0 VNĐ</b>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="12">
              <b-row>
                <b-col lg="9" class="text-right mb-2"></b-col>
                <b-col lg="3" class="mb-2 d-flex">
                  <div style="min-width: 100px" class="clearfix">
                    <i class="float-left">{{ $t("order-cancel") }}</i>
                    <span class="float-right mr-1">:</span>
                  </div>
                  <div
                    style="width: 180px"
                    v-if="data.ContractCancel && data.Total_Cancel"
                    class="d-flex justify-content-between"
                  >
                    <b>
                      {{ data.ContractCancel }} {{ $t("order") }} _
                      {{ convertFloat(data.Total_Cancel) }}
                    </b>
                    <b>VNĐ</b>
                  </div>
                  <b v-else>0 {{ $t("order") }} - 0 VNĐ</b>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="12">
              <b-row>
                <b-col lg="9" class="text-right mb-2"></b-col>
                <b-col lg="3" class="mb-2 d-flex">
                  <div style="min-width: 100px" class="clearfix">
                    <i class="float-left">{{ $t("order-delivery") }}</i>
                    <span class="float-right mr-1">:</span>
                  </div>
                  <div
                    style="width: 180px"
                    class="d-flex justify-content-between"
                    v-if="data.ContractComplete && data.Total_Complete"
                  >
                    <b class="text-left mr-2">
                      {{ data.ContractComplete }} {{ $t("order") }} _
                      {{ convertFloat(data.Total_Complete) }}
                    </b>
                    <b>VNĐ</b>
                  </div>
                  <b v-else>0 {{ $t("order") }} - 0 VNĐ</b>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="12">
              <b-row>
                <b-col lg="9" class="text-right mb-2"></b-col>
                <b-col lg="3" class="mb-2 d-flex">
                  <div style="min-width: 100px" class="clearfix">
                    <i class="float-left">{{ $t("remaining-order") }}</i>
                    <span class="float-right mr-1">:</span>
                  </div>
                  <div
                    style="width: 180px"
                    class="d-flex justify-content-between"
                    v-if="data.ContractDelivering && data.Total_Delivering"
                  >
                    <b class="text-left mr-2">
                      {{ data.ContractDelivering }} {{ $t("order") }} _
                      {{ convertFloat(data.Total_Delivering) }}
                    </b>
                    <b>VNĐ</b>
                  </div>
                  <b v-else>0 {{ $t("order") }} - 0 VNĐ</b>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
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
    <b-modal
      id="export-modal"
      :title="titleForm"
      @hidden="resetModal"
      class="text-center"
    >
      <b-row>
        <b-colxx lg="12">
          <b-form-group :label="$t('dashboards.store') + ':'">
            <b-form-select
              v-model="storeDefault"
              :options="storeOptions"
              size="sm"
              @change="changeOption(selectedOption, from, to, storeDefault)"
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="6">
          <b-form-group :label="$t('view') + ':'">
            <b-form-select
              v-model="selectedOption"
              :options="options"
              size="sm"
              @change="changeOption(selectedOption, from, to, storeDefault)"
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="6">
          <b-form-group :label="$t('dashboards.employer') + ':'">
            <b-form-select
              v-model="employerDefault"
              :options="employerOptions"
              size="sm"
              @change="
                changeOption(
                  selectedOption,
                  from,
                  to,
                  storeDefault,
                  employerDefault
                )
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.from-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="from"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.to-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="to"
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
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import excelAPI from "@/api/modules/excelAPI";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import gasSalesAPI from "@/api/modules/gasSalesAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      data: null,
      from: handling.convertDateToPicker(handling.getDateSubtract(30)),
      to: handling.convertDateToPicker(handling.getDateNow()),
      exportStatus: "close",
      typeFile: "GET-TOTAL",
      titleForm: null,
      selectedOption: "GET-TOTAL",
      options: [
        {
          text: this.$t("select.total"),
          value: "GET-TOTAL",
        },
        {
          text: this.$t("detail"),
          value: "GET-DETAILS",
        },
      ],
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      storeOptions: null,
      storeDefault: null,
      employerDefault: null,
      employerOptions: null,
    };
  },
  watch: {
    storeDefault() {
      this.getOptionEmployer(this.storeDefault);
    },
    employerDefault() {
      this.getData(
        this.selectedOption,
        this.from,
        this.to,
        this.storeDefault,
        this.employerDefault
      );
      this.getKeyTable(
        this.selectedOption,
        this.from,
        this.to,
        this.storeDefault,
        this.employerDefault
      );
    },
    items() {
      this.getColumn("GasReportDeliverys");
    },
  },
  methods: {
    getOptionEmployer(id) {
      let body = {
        ID: id,
      };
      gasSalesAPI
        .getEmployersByID(body)
        .then((val) => {
          this.employerOptions = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              // if (val.data[i].IsActive === 1) {
              let obj = {
                text: val.data[i].ShipperName,
                value: val.data[i].ID,
              };
              this.employerOptions.push(obj);
              // }
            }
            this.employerDefault = this.employerOptions[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
    getOptionStore() {
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
    convertFloat(string) {
      return handling.convertFloat(string);
    },
    resetModal() {
      this.file = null;
      this.titleForm = null;
      this.dataNotify = [];
      // this.fromE= handling.convertDateToPicker(handling.getDateSubtract(30))
      // this.to = handling.convertDateToPicker(handling.getDateNow())
    },
    exportModal() {
      this.titleForm = this.$t("report.action.download-excel").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("export-modal");
      }, this.timer);
    },
    printExternalExcel(table) {
      this.exportStatus = "open";
      setTimeout(() => {
        handling.printExcel(
          table,
          this.objectData.formName,
          null,
          null,
          this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
        );
        setTimeout(() => {
          this.exportStatus = "close";
        }, 500);
      }, 500);
    },
    changeOption(selected, from, to, store, employer) {
      this.getData(selected, from, to, store, employer);
      this.getKeyTable(selected, from, to, store, employer);
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    getData(selected, from, to, store, employer) {
      let body = {
        Type: selected,
        StoreID: store,
        FromDate: from,
        ToDate: to,
        UserID: employer,
      };
      gasSalesAPI
        .getDeliverys(body)
        .then((val) => {
          this.items = val.status ? val.data.Details : [];
          this.data = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(selected, from, to, store, employer) {
      let body = {
        Type: selected,
        StoreID: store,
        FromDate: from,
        ToDate: to,
        UserID: employer,
      };
      gasSalesAPI
        .getDeliverys(body)
        .then((val) => {
          this.objectKey = val.status ? Object.keys(val.data.Details[0]) : [];
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
    handleSubmitExport(value) {
      let body = {
        UserID: this.employerDefault,
        StoreID: this.storeDefault,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.selectedOption,
        IsAll: value,
        FromDate: this.from,
        ToDate: this.to,
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
    convertFloat(string) {
      return handling.convertFloat(string);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
  },
  async created() {
    await this.getOptionStore();
    await this.getListMenuRight();
    await this.getColumn("GasReportDeliverys");
    setTimeout(async () => {
      await this.getKeyTable(
        this.selectedOption,
        this.from,
        this.to,
        this.storeDefault,
        this.employerDefault
      );
      await this.getData(
        this.selectedOption,
        this.from,
        this.to,
        this.storeDefault,
        this.employerDefault
      );
    }, 500);
  },
  computed: {
    fields: function () {
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
};
</script>
