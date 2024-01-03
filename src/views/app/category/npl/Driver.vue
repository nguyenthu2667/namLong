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
        :dataFormOptions="dataFormOptions"
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
      keyString: "nPLDrivers",
      dataFormOptions: {},
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
    await this.getListGoodsTypes();
    await setTimeout(async () => {
      await this.getData();
      await this.getListGoodsTypes();
      await this.getListOrderTypes();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    handleGoodType(value) {
      let stringFormat = "";
      value.forEach((item) => {
        let formatItem = {
          [item.value]: item.checked,
        };
        for (const property in formatItem) {
          stringFormat += `${property}:${formatItem[property] ? 1 : 0},`;
        }
        console.log(stringFormat);
      });
      value = stringFormat.slice(0, -1);
      console.log(value);
      return value;
    },
    handleSubmit(dataValue, type, id) {
      if (!this.idModal) return;
      if (type == "add") {
        let obj = {};
        dataValue.forEach((f) => {
          let key = f["name"];
          let value = f["value"];
          if (key === "GoodType") {
            value = this.handleGoodType(value);
          }
          obj = { ...obj, [key]: value };
        });
        let body = {
          ...obj,
          CategoryType: this.keyString,
        };
        nplAPI
          .nplDriverAdd(body)
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
          if (key === "GoodType") {
            value = this.handleGoodType(value);
          }
          obj = { ...obj, [key]: value };
        });
        let body = {
          ...obj,
          CategoryType: this.keyString,
          ID: id,
        };
        nplAPI
          .editDriver(body)
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
        nplAPI.deleteDriver(body).then((val) => {
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
        .nplDriverChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
          } else {
            this.makeToast("danger", this.$t("toast.fail"), val.message);
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
        .getDriverList(body)
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
      nplAPI.getDriverByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          delete obj.GoodType;
          this.dataForm = handling.showDynamicFormEdit(obj.Properties, obj);
          let objectData = [];
          // format key
          objectData = obj.GoodTypes.map((item) => {
            return {
              checked: !!item.IsSelected,
              value: item.GoodTypeID,
              text: item.GoodTypeName,
            };
          });
          // set value
          this.dataForm.map((data) => {
            if (data.name === "GoodType") {
              data.value = objectData;
            }
          });
          // set checked
          this.dataFormOptions.GoodType = this.dataFormOptions.GoodType.map(
            (data) => {
              let resultFind = objectData.find((y) => data.value == y.value);
              return { ...data, ...resultFind };
            }
          );
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
      this.dataForm = handling.showDynamicFormAdd(this.columnAdd);
      // check box-checked true
      if (this.dataFormOptions.GoodType.some((item) => item.checked)) {
        this.dataFormOptions.GoodType = this.dataFormOptions.GoodType.map(
          (data) => {
            return {
              ...data,
              checked: false,
            };
          }
        );
      }
      this.dataForm.forEach((f) => {
        if (f.name == "OrderTypeID") {
          f.value = this.dataFormOptions.OrderTypeID[0].value;
        }
      });
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
    getListGoodsTypes() {
      let body = {
        CategoryType: "GoodsTypes",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.GoodType = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.GoodsTypesName,
                  checked: false,
                };
                this.dataFormOptions.GoodType.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getListOrderTypes() {
      let body = {
        CategoryType: "OrderTypes",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptions.OrderTypeID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  text: item.OrderTypesName,
                };
                this.dataFormOptions.OrderTypeID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
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
};
</script>

<style lang="scss" scoped></style>
