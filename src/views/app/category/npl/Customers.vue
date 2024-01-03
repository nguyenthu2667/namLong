<template>
  <div v-if="objectData" class="units-npl">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button
            variant="success"
            @click="() => $bvModal.show('advance-search')"
          >
            <i class="fas fa-search"></i>
            {{ $t("npl.advance-search") }}
          </b-button>
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <!-- <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t('report.action.download-excel-page') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t('report.action.download-excel-page') }}
              </b-dropdown-item> -->
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-card>
      <!-- <form class="mb-4" @submit.prevent="handleSearch">
        <b-row>
          <b-col
            v-for="(item, index) in searchValues"
            :key="index"
            md="3"
          >
            <b-form-group :label="item.Label + ':'">
              <b-form-input
                v-model="item.Param1"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col class="d-flex align-items-end mb-3">
            <button
              style="
                height: 40px;
                width: 40px;
                background: #004085;
                color: #fff;
                border: none
              "
            >
              <i style="padding: 5px" class="fas fa-search"></i>
            </button>
          </b-col>
        </b-row>
      </form> -->
      <dynamic-table
        v-if="items.length > 0"
        style="margin-top: -20px"
        :id="'units-npl'"
        ref="tableDynamic"
        :field-table="fields"
        :data-table="items"
        :access-write="objectData.accessWrite"
        :bordered="true"
        @dbclick="handleDbClick"
        @status-edit="changeStatus"
        :isSearch="true"
      ></dynamic-table>
      <template v-else>
        <div class="text-center font-italic text-muted p-3 bg-light">
          {{ $t("panel.non-data") }}
        </div>
      </template>
    </b-card>
    <b-modal
      :id="idModal"
      :name="idModal"
      :size="sizeModal"
      :title="titleModal"
      ok-only
      scrollable
      hide-footer
      class="text-center"
      @hidden="resetModal"
    >
      <form-customer
        v-if="dataForm"
        :type="idModal"
        :id="idClick"
        :data-form="dataForm"
        :data-form-options="dataFormOptions"
        :child-table="childTable"
        @submit="handleSubmit"
        @changeChildTable="changeChildTable"
      ></form-customer>
    </b-modal>
    <b-modal
      id="advance-search"
      size="lg"
      title="Tìm kiếm nâng cao"
      hide-footer
    >
      <form @submit.prevent="handleSearch">
        <b-row
          v-for="(item, index) in searchValues"
          :key="index"
          class="align-items-center my-2"
        >
          <b-col md="3">
            <label class="mb-0">{{ item.Label + ":" }}</label>
          </b-col>
          <b-col md="3">
            <b-form-select
              v-model="item.Operator"
              :options="methodsSearch"
              style="font-size: 0.8rem"
            />
          </b-col>
          <template v-if="item.Operator == 'between'">
            <b-col md="3">
              <b-form-input v-model="item.Param1" />
            </b-col>
            <b-col md="3">
              <b-form-input v-model="item.Param2" />
            </b-col>
          </template>
          <b-col md="6" v-else>
            <b-form-input v-model="item.Param1" />
          </b-col>
        </b-row>
      </form>
      <div class="text-right">
        <b-button
          class="t-btn"
          variant="secondary"
          @click="
            () => {
              $bvModal.hide('advance-search');
            }
          "
        >
          <i class="fas fa-undo"></i>
          {{ $t("npl.button.cancel").toUpperCase() }}
        </b-button>
        <b-button class="t-btn" variant="success" @click="handleSearch">
          <i class="fas fa-search"></i>
          {{ $t("npl.button.search").toUpperCase() }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/DynamicTable";
import FormCustomer from "./component/FormCustomer.vue";
import nplAPI from "@/api/modules/nplAPI";

export default {
  name: "customer-npl",
  components: {
    "dynamic-table": DynamicTable,
    "form-customer": FormCustomer,
  },
  data() {
    return {
      interval: null,
      menuRight: [],
      keys: null,
      colTypes: null,
      columnAdd: null,
      idClick: null,
      dataForm: null,
      idModal: null,
      titleModal: null,
      sizeModal: "md",
      items: [],
      keyString: "nPLCustomers",
      dataFormOptions: {
        City: [],
        BankID: [],
        GroupID: [],
      },
      childTable: {
        CustomerContacts: {
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerDebits: {
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerInvoices: {
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerSupports: {
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerAttachments: {
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
      },
      cusID: null,
      searchValues: [],
      methodsSearch: [],
    };
  },
  computed: {
    fields() {
      let result = handling.mergeKeyDynamic(this.keys, this.colTypes);
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
  methods: {
    handleSubmit(dataValue, type, id) {
      if (!this.idModal) return;
      if (type == "add") {
        let obj = {};
        dataValue.forEach((f) => {
          let key = f["name"];
          let value = f["value"];
          obj = { ...obj, [key]: value };
        });
        nplAPI
          .customerAdd(obj)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "edit" && id) {
        let obj = {};
        dataValue.forEach((f) => {
          let key = f["name"];
          let value = f["value"];
          obj = { ...obj, [key]: value };
        });
        let body = {
          ...obj,
          ID: id,
        };
        nplAPI
          .editCustomer(body)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "delete" && id) {
        let body = {
          ID: id,
        };
        nplAPI.deleteCustomer(body).then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
            this.getData();
            this.$bvModal.hide(this.idModal);
          } else {
            this.makeToast("danger", this.$t("toast.fail"), val.message);
          }
        });
      }
    },
    resetModal() {
      this.idClick = null;
      this.dataForm = null;
    },
    changeStatus(row, key) {
      const id = row.ID;
      const newStatus = handling.convertBooleanToBit(row.IsActive);
      let body = {
        ID: id,
        IsActive: newStatus,
      };
      nplAPI
        .customerChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
          } else {
            this.makeToast("dnager", this.$t("toast.fail"), val.message);
          }
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    getData() {
      nplAPI
        .getCustomerList()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.items =
            data.length > 0 ? handling.convertDataBitToBoolean([...data]) : [];
          this.keys = data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    handleDbClick(row) {
      this.idClick = row.ID;
      let body = {
        ID: row.ID,
      };

      for (const key in this.childTable) {
        this.getChildTable(key);
      }

      nplAPI.getCustomerByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = handling.showDynamicFormEdit(obj.Properties, obj);
          this.idModal = "edit";
          this.titleModal = this.$t("button.update").toUpperCase();
          this.sizeModal = "xl";
          setTimeout(() => {
            this.$bvModal.show(this.idModal);
          }, 500);
        }
      });
    },
    addModal() {
      this.dataForm = handling.showDynamicFormAdd(this.columnAdd);
      this.idModal = "add";
      this.titleModal = this.$t("button.create").toUpperCase();
      this.sizeModal = "xl";
      setTimeout(() => {
        this.$bvModal.show(this.idModal);
      }, 500);
    },
    printExternalExcel() {},
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDynamicFormAdd(string) {
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getSelect(type, nameKey, option) {
      let body = {
        CategoryType: type,
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                text: item[nameKey],
                value: item.ID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            [option]: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    getCities() {
      let body = {
        Level: 2,
      };
      nplAPI
        .getCities(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              if (item.IsActive == 1) {
                const obj = {
                  text: item.nPLRegionsName,
                  value: item.ID,
                };
                newArr.push(obj);
              }
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            City: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    getDataFormOptions() {
      this.getCities();
      this.getSelect("Banks", "BanksName", "BankID");
      this.getSelect("nPLCustomerGroups", "nPLCustomerGroupsName", "GroupID");
      this.getSelect("ContactTypes", "ContactTypesName", "ContactTypeID");
      this.getSelect(
        "ManagementRegions",
        "ManagementRegionsName",
        "ManagementRegionID"
      );
      this.getSelect("GoodsTypes", "GoodsTypesName", "GoodTypeID");
    },
    getChildTable(tableName) {
      this.getColTypesChildTable(tableName);
      this.getFormChildTable(tableName);
      this.getDataChildTable(tableName);
    },
    getColTypesChildTable(tableName) {
      let body = {
        ObjectName: tableName,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.childTable[tableName].colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFormChildTable(tableName) {
      let body = {
        ObjectName: tableName,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.childTable[tableName].columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataChildTable(tableName) {
      let body = {
        CategoryType: tableName,
        CusID: this.idClick,
      };
      nplAPI
        .getCategoryList(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.childTable[tableName].items =
            data.length > 0 ? handling.convertDataBitToBoolean([...data]) : [];
          this.childTable[tableName].keys =
            data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    changeChildTable(tableName) {
      this.getDataChildTable(tableName);
    },
    handleSearch() {
      console.log(this.searchValues);
      this.$bvModal.hide("advance-search");
      const ListSearch = [];
      this.searchValues.forEach((item) => {
        if (item.Param1 || item.Param1 === 0) {
          ListSearch.push(item);
        }
      });
      if (ListSearch.length > 0) {
        const body = { ListSearch: ListSearch };

        nplAPI
          .searchCustomer(body)
          .then((val) => {
            let data = val.status ? val.data : [];
            this.items =
              data.length > 0
                ? handling.convertDataBitToBoolean([...data])
                : [];
            this.keys = data.length > 0 ? Object.keys(data[0]) : null;
          })
          .catch((err) => console.log(err));
      } else {
        this.getData();
      }
    },
    getMethodAdvanceSearch() {
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
            this.methodsSearch = [...arr];
          }
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    colTypes() {
      if (this.colTypes && this.colTypes.length > 0) {
        const arr = [];
        this.colTypes.forEach((item) => {
          if (item.IsHide == 0 && item.ClName.toUpperCase() != "ISACTIVE") {
            arr.push({
              Label: item.ShwName,
              Name: item.ClName,
              Type: item.TypeCol,
              Operator: "like",
              Param1: null,
            });
          }
        });
        this.searchValues = [...arr];
      }
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColTypes(this.keyString);
    await this.getDynamicFormAdd(this.keyString);
    await setTimeout(async () => {
      await this.getData();
    }, 500);
    // this.interval = setInterval(async () => {
    //   await this.getData()
    // }, 30000)
    this.getDataFormOptions();
    this.getMethodAdvanceSearch();
  },
  // destroyed() {
  //   clearInterval(this.interval)
  // },
};
</script>

<style lang="scss" scoped></style>
