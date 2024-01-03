<template>
  <div class="units-npl">
    <b-row class="mt-2">
      <b-colxx
        xxs="12"
        class="d-flex align-items-center justify-content-between"
      >
        <h3 class="mb-0 pb-0" style="font-weight: 560">
          {{ titleTab }}
        </h3>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item @click="addModal">
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
      </b-colxx>
    </b-row>
    <dynamic-child-table
      v-if="items.length > 0"
      :id="'units-npl'"
      ref="tableDynamic"
      :field-table="fields"
      :data-table="items"
      :access-write="true"
      :bordered="true"
      @dbclick="handleDbClick"
      @status-edit="changeStatus"
      :isSearch="true"
    ></dynamic-child-table>
    <template v-else>
      <div class="text-center font-italic text-muted p-3 bg-light mt-2">
        {{ $t("panel.non-data") }}
      </div>
    </template>
    <b-modal
      id="child-table-modal"
      :name="idModal"
      :size="sizeModal"
      :title="titleModal"
      ok-only
      scrollable
      hide-footer
      class="text-center"
      @hidden="resetModal"
    >
      <form-dynamic-child-table
        v-if="dataForm"
        :type="idModal"
        :id="idClick"
        :data-form="dataForm"
        :data-form-options="dataFormOptions"
        @submit="handleSubmit"
      ></form-dynamic-child-table>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
// import DynamicTable from '@/components/Table/DynamicTable'
import DynamicChildTable from "./DynamicChildTable";
import FormDynamicChildTable from "./FormDynamicChildTable.vue";
import nplAPI from "@/api/modules/nplAPI";

export default {
  name: "customer-child-table",
  components: {
    "dynamic-child-table": DynamicChildTable,
    "form-dynamic-child-table": FormDynamicChildTable,
  },
  props: [
    "cusID",
    "items",
    "keys",
    "colTypes",
    "columnAdd",
    "selectedTab",
    "titleTab",
  ],
  data() {
    return {
      interval: null,
      menuRight: [],
      idClick: null,
      dataForm: null,
      idModal: null,
      titleModal: null,
      sizeModal: "md",
      dataFormOptions: {
        ChargeJobID: [],
      },
      inputedFile: null,
    };
  },
  computed: {
    fields() {
      let result = handling.mergeKeyDynamic(this.keys, this.colTypes);
      return result;
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
        let body = {
          ...obj,
          CategoryType: this.selectedTab,
          CusID: this.cusID,
        };
        nplAPI
          .nplCategoryAdd(body)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              // this.getData()
              this.$emit("changeChildTable");
              this.$bvModal.hide("child-table-modal");
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
          CategoryType: this.selectedTab,
          ID: id,
          CusID: this.cusID,
        };
        nplAPI
          .editCategory(body)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.$emit("changeChildTable");
              this.$bvModal.hide("child-table-modal");
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
            this.$emit("changeChildTable");
            this.$bvModal.hide("child-table-modal");
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
          this.$emit("changeChildTable");
        })
        .catch((err) => console.log(err));
    },
    handleDbClick(row) {
      this.idClick = row.ID;
      let body = {
        ID: row.ID,
      };
      nplAPI.getCategoryByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = handling.showDynamicFormEdit(obj.Properties, obj);
          this.idModal = "edit";
          this.modalName = "edit-child-table";
          this.titleModal = this.$t("button.update").toUpperCase();
          this.sizeModal = "lg";
          setTimeout(() => {
            this.$bvModal.show("child-table-modal");
          }, 500);
        }
      });
    },
    addModal() {
      this.dataForm = handling.showDynamicFormAdd(this.columnAdd);
      this.idModal = "add";
      this.titleModal = this.$t("button.create").toUpperCase();
      this.sizeModal = "lg";
      setTimeout(() => {
        this.$bvModal.show("child-table-modal");
      }, 500);
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
    getDataFormOptions() {
      this.getSelect("ChargeJobs", "ChargeJobsName", "ChargeJobID");
    },
  },
  created() {
    this.getDataFormOptions();
  },
};
</script>

<style lang="scss" scoped></style>
