<template>
  <div class="mt-3 npl-form-fixation">
    <form ref="form" @submit.stop.prevent="emitSubmit" v-if="dataForm">
      <b-row>
        <b-col lg="4" xl="4">
          <!-- check null dataForm.IsActive[1] -->
          <!-- !disableEdit(false) -->
          <b-row class="align-items-center">
            <b-col lg="4" xl="4">
              <b-form-group :label="dataForm.OID[0]">
                <b-form-input
                  class="text-center"
                  :value="dataForm.OID[1] ? dataForm.OID[1] : 'AUTO'"
                  disabled
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="8" xl="8">
              <b-form-group
                :label="dataForm.Odate[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="stateForm.Odate"
              >
                <datepicker
                  :language="locale"
                  :format="datePickerFormat"
                  :bootstrap-styling="true"
                  :placeholder="$t('modal.day-select')"
                  v-model="dataForm.Odate[1]"
                  :disabled="!disableAdd"
                  @input="formatDateToServer(dataForm.Odate[1], 'Odate')"
                  id="Odate-input"
                ></datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-form-group
                :label="dataForm.VehicleGroupID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="stateForm.VehicleGroupID"
              >
                <v-select
                  v-model="dataForm.VehicleGroupID[1]"
                  :options="dataFormOptions.VehicleGroupID"
                  :reduce="(item) => item.value"
                  multiple
                  :disabled="!disableAdd"
                  id="VehicleGroupID-input"
                >
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" xl="6">
              <b-form-group
                :label="dataForm.TotalQuantityTrip[0]"
                :state="stateForm.TotalQuantityTrip"
                :invalid-feedback="$t('form.no-blank')"
              >
                <b-form-input
                  class="text-right"
                  v-model.number="dataForm.TotalQuantityTrip[1]"
                  type="number"
                  :disabled="!disableAdd"
                  id="TotalQuantityTrip-input"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6" xl="6">
              <b-form-group
                :label="dataForm.TotalAmountTrip[0]"
                :state="stateForm.TotalAmountTrip"
                :invalid-feedback="$t('form.no-blank')"
              >
                <b-form-input
                  v-model="dataForm.TotalAmountTrip[1]"
                  class="text-right"
                  type="text"
                  :disabled="!disableAdd"
                  id="TotalAmountTrip-input"
                  @input="convertCurrency"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" xl="12">
              <b-form-group :label="dataForm.Note[0]">
                <b-form-textarea
                  v-model="dataForm.Note[1]"
                  rows="2"
                  max-rows="6"
                  style="height: 113px"
                  :disabled="!disableAdd"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4">
          <ChildTable
            :title="$t('npl.details-of-supplementary-items')"
            :items="dataTableChildren"
            :fields="fieldsChildren"
            :pDataCurrency="pDataCurrency"
            tableName="PieceTireAllowancesDetails"
            @add="addChildTable"
            @edit="editChildTable"
            @remove="removeChildTable"
            :disableAdd="disableAdd"
          />
        </b-col>
        <b-col lg="2">
          <div
            v-if="dataForm.IsActive && dataForm.IsActive[1] == 1"
            class="img-lock"
          >
            <img
              src="/assets/img/npl/img-lock.png"
              alt=""
              style="height: 60px"
            />
          </div>
        </b-col>
      </b-row>
    </form>
    <b-modal
      id="modal-child-table"
      :title="titleModalChild"
      body-class="body-modal-add"
      size="md"
      @ok="handleModalChildTable"
      @hidden="hiddenModalChildTable"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <template v-if="dataFormChildren">
        <form ref="formChildren">
          <b-row>
            <b-col lg="12">
              <b-form-group
                :label="dataFormChildren.NumberOfRedemptions[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="stateFormChildren?.NumberOfRedemptions"
              >
                <b-form-input
                  v-model.number="dataFormChildren.NumberOfRedemptions[1]"
                  class="text-right"
                  type="number"
                  id="NumberOfRedemptions-input"
                  min="1"
                />
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <b-form-group
                :label="dataFormChildren.RouteID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="stateFormChildren?.RouteID"
              >
                <v-select
                  v-model="dataFormChildren.RouteID[1]"
                  :options="dataFormOptionsChildren.RouteID"
                  :reduce="(item) => item.value"
                  id="RouteID-input"
                >
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import ChildTable from "./ChildTable.vue";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";

export default {
  components: {
    "v-select": vSelect,
    ChildTable,
  },
  props: {
    dataForm: {
      type: Object,
      default: () => {},
    },
    disableAdd: {
      type: Boolean,
      default: true,
    },
    disableEdit: {
      type: Boolean,
      default: true,
    },
    disableBlock: {
      type: Boolean,
      default: true,
    },
    apiForm: {
      type: String,
      default: "",
    },
    stateForm: {
      type: Object,
      default: () => {},
    },
    typeDelete: {
      type: Boolean,
      default: null,
    },
    typeAction: {
      type: String,
      default: "",
    },
    dataFormOptions: {
      type: Object,
      default: () => {},
    },
    pDataTableChildren: {
      type: Array,
      default: () => [],
    },
    pDataCurrency: {
      type: Object,
      default: () => {},
    },
    pCurrentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dataByID: null,
      optionsRadio: [
        { text: "Đang dùng", value: 1 },
        { text: "Không dùng", value: 0 },
      ],
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      dataFormChildren: null,
      columnAddChildren: null,
      stateFormChildren: null,
      dataFormOptionsChildren: {
        RouteID: [],
      },
      listColumnShowChildren: null,
      titleModalChild: "",
      isActionChildren: "",
      indexEdit: null,
      keyString: "PairshipAllowancesDetails",
      objectKeyChildren: null,
      dataTableChildren: this.pDataTableChildren,
    };
  },
  computed: {
    fieldsChildren() {
      if (this.dataTableChildren?.length > 0) {
        let sortTable = false;
        let result = handling.mergeKeyDynamic(
          this.objectKeyChildren,
          this.listColumnShowChildren,
          sortTable
        );
        if (result?.length > 0) {
          result.forEach((item) => {
            item.tdClass = item.tdClass.replace("pt-2", "");
          });
          result.push({
            key: "Action",
            label: this.$t("npl.action"),
            typeCol: "Action",
            thClass: "text-center",
            tdClass: "text-center",
          });
        }
        return result;
      }
      return [];
    },
  },
  async created() {
    await this.getFormAddShowChildren(this.keyString);
    await this.getActiveNPLRoute();
    await this.getColumnChildren(this.keyString);
    await this.getKeyTableChildren();
  },
  watch: {
    pCurrentIndex(v) {
      setTimeout(() => {
        this.dataTableChildren = [...this.pDataTableChildren];
      }, 100);
    },
    typeAction(v) {
      if (this.disableAdd && this.typeAction?.toUpperCase() === "ADD") {
        this.dataTableChildren.length = 0;
      } else {
        this.dataTableChildren = [...this.pDataTableChildren];
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.columnAddChildren) {
        let obj = {};
        for (let i = 0; i < this.columnAddChildren.length; i++) {
          let key = this.columnAddChildren[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateFormChildren = obj;
      }
    }, 500);
  },
  methods: {
    getKeyTableChildren() {
      this.objectKeyChildren =
        this.dataTableChildren && this.dataTableChildren.length > 0
          ? Object.keys(this.dataTableChildren[0])
          : [];
    },
    getColumnChildren(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowChildren = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getActiveNPLRoute() {
      nplAPI
        .getRoutesActive()
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            this.dataFormOptionsChildren.RouteID = [];
            val.data.forEach((item) => {
              if (item.IsActive === 1) {
                let obj = {
                  value: item.ID,
                  label: item.RoutesName,
                };
                this.dataFormOptionsChildren.RouteID.push(obj);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    handleModalChildTable(bvModal) {
      bvModal.preventDefault();
      if (!this.checkFormValidityModal("dataFormChildren")) {
        this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
        return;
      } else {
        if (this.isActionChildren === "ADD") {
          let obj = {};
          for (const key in this.dataFormChildren) {
            let value = this.dataFormChildren[key][1];
            obj[key] = value;
          }
          let result = this.dataFormOptionsChildren.RouteID.find(
            (item) => item.value == obj.RouteID
          );
          obj.RoutesName = result.label;
          this.dataTableChildren.push(Object.assign({}, obj));
        } else {
          // EDIT
          let obj = {};
          for (const key in this.dataFormChildren) {
            obj[key] = this.dataFormChildren[key][1];
          }

          let result = this.dataFormOptionsChildren.RouteID.find(
            (item) => item.value == obj.RouteID
          );
          obj.RoutesName = result.label;

          this.dataTableChildren[this.indexEdit] = Object.assign(
            this.dataTableChildren[this.indexEdit],
            obj
          );
        }

        this.$nextTick(() => {
          this.$bvModal.hide("modal-child-table");
        });
      }
    },
    hiddenModalChildTable() {
      this.titleModalChild = "";
      this.isActionChildren = "";
      this.dataFormChildren = null;
      for (const key in this.stateFormChildren) {
        this.stateFormChildren[key] = null;
      }
    },
    getFormAddShowChildren(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAddChildren = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addChildTable() {
      this.titleModalChild = this.$t("modal.add");
      this.isActionChildren = "ADD";
      this.dataFormChildren = handling.showExtensionFormAdd(
        this.columnAddChildren
      );
      this.$bvModal.show("modal-child-table");
    },
    editChildTable(row) {
      this.titleModalChild = this.$t("modal.edit");
      this.indexEdit = row.index;
      this.isActionChildren = "EDIT";
      let nObject = {};
      this.columnAddChildren.forEach((column) => {
        for (const key in row.item) {
          if (column.ClName == key) {
            nObject[key] = [column["ShwName"], row.item[key]];
            break;
          }
        }
      });
      this.dataFormChildren = Object.assign({}, nObject);
      this.$bvModal.show("modal-child-table");
    },
    removeChildTable(row) {
      this.dataTableChildren.splice(row.index, 1);
    },
    formatDateToServer(value, field) {
      this.dataForm[field][1] = moment(value).format("YYYY-MM-DD");
    },
    checkFormValidityModal(form) {
      if (form === "dataForm") {
        // nhắc validation
        for (const key in this.dataForm) {
          if (document.getElementById(`${key}-input`)) {
            let value = this.dataForm[key][1];
            if (value || value === 0 || value === false) {
              value = true;
            } else {
              value = false;
            }
            this.stateForm[key] = value;
          }
        }

        // hiển thị showNotify
        let result = null;
        for (const key in this.stateForm) {
          let booleanState = this.stateForm[key];
          if (document.getElementById(`${key}-input`)) {
            if (booleanState) {
              result = booleanState;
            } else {
              // nếu chỉ 1 field chưa nhập break ra luôn
              result = booleanState;
              break;
            }
          }
        }
        return result;
      }

      if (form === "dataFormChildren") {
        // nhắc validation
        for (const key in this.dataFormChildren) {
          if (document.getElementById(`${key}-input`)) {
            let value = this.dataFormChildren[key][1];
            if (value || value === 0 || value === false) {
              value = true;
            } else {
              value = false;
            }
            this.stateFormChildren[key] = value;
          }
        }

        // hiển thị showNotify
        let result = null;
        for (const key in this.stateFormChildren) {
          if (document.getElementById(`${key}-input`)) {
            let booleanState = this.stateFormChildren[key];
            if (booleanState) {
              result = booleanState;
            } else {
              // nếu chỉ 1 field chưa nhập break ra luôn
              result = booleanState;
              break;
            }
          }
        }
        return result;
      }
    },
    emitSubmit() {
      if (!this.checkFormValidityModal("dataForm")) {
        this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
        return;
      } else {
        let obj = {
          [this.keyString]: this.dataTableChildren,
        };

        this.dataForm = Object.assign(this.dataForm, obj);
        this.$emit("emitSubmit", this.dataForm, this.apiForm);
      }
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },

    convertCurrency(number) {
      this.$emit("handleCurrency", number);
    },
  },
};
</script>

<style lang="scss">
.npl-form-fixation {
  .vdp-datepicker {
    .form-control[readonly] {
      background: none;
    }
    .form-control[disabled] {
      background: #e9ecef;
    }
  }
}
</style>
