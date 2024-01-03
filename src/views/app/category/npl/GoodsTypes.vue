<template>
  <div v-if="objectData" class="units-npl">
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
      <form-dynamic
        v-if="dataForm"
        :type="idModal"
        :id="idClick"
        :data-form="dataForm"
        :data-form-options="dataFormOptions"
        @submit="handleSubmit"
      ></form-dynamic>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/DynamicTable";
import FormDynamic from "./component/FormDynamic.vue";
import nplAPI from "@/api/modules/nplAPI";

export default {
  name: "units-npl",
  components: {
    "dynamic-table": DynamicTable,
    "form-dynamic": FormDynamic,
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
      keyString: "GoodsTypes",
      dataFormOptions: {
        QuantityUnitID: [],
        WeightUnitID: [],
      },
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
  async created() {
    await this.getListMenuRight();
    await this.getColTypes(this.keyString);
    await this.getDynamicFormAdd(this.keyString);
    await setTimeout(async () => {
      await this.getData();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
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
        let body = {
          ...obj,
          CategoryType: this.keyString,
        };
        nplAPI
          .nplCategoryAdd(body)
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
          CategoryType: this.keyString,
          ID: id,
        };
        nplAPI
          .editCategory(body)
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
        nplAPI.deleteCategory(body).then((val) => {
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
        .changeStatusCategory(body)
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
      let body = {
        CategoryType: this.keyString,
      };
      nplAPI
        .getCategoryList(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.items =
            data.length > 0 ? handling.convertDataBitToBoolean([...data]) : [];
          this.keys = data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    handleDbClick(row) {
      this.getSelect("nPLUnits", "nPLUnitsName", "QuantityUnitID");
      this.getSelect("nPLUnits", "nPLUnitsName", "WeightUnitID");

      this.idClick = row.ID;
      let body = {
        ID: row.ID,
      };
      nplAPI.getCategoryByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = handling.showDynamicFormEdit(obj.Properties, obj);
          this.idModal = "edit";
          this.titleModal = this.$t("button.update").toUpperCase();
          this.sizeModal = "lg";
          setTimeout(() => {
            this.$bvModal.show(this.idModal);
          }, 500);
        }
      });
    },
    addModal() {
      this.getSelect("nPLUnits", "nPLUnitsName", "QuantityUnitID");
      this.getSelect("nPLUnits", "nPLUnitsName", "WeightUnitID");

      this.dataForm = handling.showDynamicFormAdd(this.columnAdd);
      this.idModal = "add";
      this.titleModal = this.$t("button.create").toUpperCase();
      this.sizeModal = "lg";
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
  },
};
</script>

<style lang="scss" scoped></style>
