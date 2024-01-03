<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1 class="mb-0">
          <strong class="mr-1">{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="infoModal(selectedItems)"
                v-if="selectedItems.length === 1"
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
      :station-option="stationOptions"
      :table-list-item="gasItems"
      :table-field="gasItemFields"
      v-if="nameForm"
    ></custom-form>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/GasReturnTankForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import gasSalesAPI from "@/api/modules/gasSalesAPI";
export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
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
          key: "UnitQtty",
          label: this.$t("modal.unit-qtty"),
          tdClass: "text-right",
          sortable: true,
        },
        {
          key: "Action",
          label: this.$t("dropdown.action"),
          tdClass: "text-center",
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
      },
      stationOptions: null,
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
    selectOption(from, to, id) {
      this.getData(from, to, id);
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
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
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
      };
      this.gasItems = null;
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
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
    infoModal(items) {
      this.getDataByID(items[0].OID);
      setTimeout(() => {
        this.dataForm = this.dataByID;
        this.nameForm = "modal-info";
        this.titleForm = this.$t("form.title-info").toUpperCase();
        this.typeForm = "INFO";
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    addModal() {
      this.getOptionStation();
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/GasReturnTanks/Add";
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
          this.getColumn("GasReturnTanks");
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
        StoreID: null,
        EmployerID: null,
        Odate: handling.convertDateForm(new Date()),
        Note: null,
        GasDeliveryDetails: [],
      };
      this.gasItems = [];
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
      this.dataFormOptions.EmployerID = [];
    },
    editModal(items) {
      this.getDataByID(items[0].OID);
      this.getOptionStation();
      setTimeout(() => {
        this.dataForm = this.dataByID;
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/GasReturnTanks/Edit";
        this.bodyFormDefault = {
          OID: items[0].OID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.dataForm.GasStationID = this.dataByID.StationID;
        this.getOptionItems(this.dataForm.GasStationID);
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
      gasSalesAPI
        .gasReturnTankRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("GasReturnTanks");
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
      gasSalesAPI
        .gasReturnTankByID(body)
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
      gasSalesAPI
        .gasReturnTankGet(body)
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
      gasSalesAPI
        .gasReturnTankGet(body)
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
      this.getData(this.fromDateDefault, this.toDateDefault, this.storeDefault);
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getOption();
    await this.getListMenuRight();
    await this.getColumn("GasReturnTanks");
    await this.getKeyTable(
      this.fromDateDefault,
      this.toDateDefault,
      this.storeDefault
    );
    setTimeout(async () => {
      await this.timerLoadDashboard(this.timer * 120);
    }, 500);
  },
  watch: {
    items() {
      this.getColumn("GasReturnTanks");
      this.getKeyTable(
        this.fromDateDefault,
        this.toDateDefault,
        this.storeDefault
      );
    },
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
