<template>
  <div>
    <template v-if="type == 'edit'">
      <b-tabs style="margin-top: -20px" class="tab-form-customer">
        <b-tab
          v-for="(item, index) in listTab"
          :key="index"
          :title="item.title"
          @click="selectedTab = item.tabName"
        >
        </b-tab>
      </b-tabs>
    </template>
    <form v-if="showCustomer" :class="type == 'edit' && 'mt-4'">
      <b-row>
        <template v-for="(field, i) in dataForm">
          <b-col
            v-if="field.type == 'KEY'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-input
                class="text-center"
                v-model="field.value"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <template v-else-if="field.name.toUpperCase() == 'CODE'">
            <b-col
              v-if="type == 'edit'"
              :key="i"
              :md="field.sizeCol"
              :lg="field.sizeCol"
            >
              <b-form-group :label="field.label + ':'">
                <b-form-input
                  class="text-left"
                  v-model="field.value"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </template>
          <b-col
            v-else-if="field.type == 'SELECT'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <template v-if="field.name.toUpperCase() == 'CITY'">
                <b-form-select
                  class="text-left"
                  v-model="regionSelected[field.name]"
                  :options="dataFormOptions[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
              <template v-else-if="field.name.toUpperCase() == 'DISTRICT'">
                <b-form-select
                  class="text-left"
                  v-model="regionSelected[field.name]"
                  :options="options[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
              <template v-else-if="field.name.toUpperCase() == 'WARD'">
                <b-form-select
                  class="text-left"
                  v-model="regionSelected[field.name]"
                  :options="options[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
              <template v-else>
                <b-form-select
                  class="text-left"
                  v-model="field.value"
                  :options="dataFormOptions[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'COLOR'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <color-picker v-model="field.value" @change="changeColor">
              </color-picker>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'BIT'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-checkbox
                id="cus-checkbox"
                v-model="field.value"
                switch
                size="md"
              >
                <template v-if="field.value == true">
                  <slot name="bitTrue"></slot>
                </template>
                <template v-else>
                  <slot name="bitFalse"></slot>
                </template>
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'DATE'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-datepicker
                :locale="locale"
                v-model="field.value"
                required
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'NUMBER'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-input
                class="text-left"
                v-model.number="field.value"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'NOTE' || field.type == 'DESCRIPTION'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-textarea
                class="text-left"
                v-model="field.value"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col v-else :key="i" :md="field.sizeCol" :lg="field.sizeCol">
            <b-form-group :label="field.label + ':'">
              <b-form-input
                class="text-left"
                v-model="field.value"
              ></b-form-input>
              <div
                v-if="field.isValid && validFisrt"
                class="text-danger text-right text-small"
              >
                {{ $t("dashboards.cannot-be-left-blank") }}
              </div>
            </b-form-group>
          </b-col>
        </template>
      </b-row>
      <div class="text-right">
        <b-button
          class="t-btn"
          variant="secondary"
          @click="
            () => {
              $bvModal.hide(type);
            }
          "
        >
          <i class="fas fa-undo"></i>
          {{ $t("npl.button.cancel").toUpperCase() }}
        </b-button>
        <b-button
          v-if="type == 'add'"
          class="t-btn"
          variant="success"
          @click="emitSubmit"
        >
          <i class="fas fa-plus"></i>
          {{ $t("npl.button.add").toUpperCase() }}
        </b-button>
        <b-button
          v-if="type != 'add'"
          class="t-btn"
          variant="danger"
          @click="emitSubmitDelete"
        >
          <i class="fas fa-trash-alt"></i>
          {{ $t("npl.button.delete").toUpperCase() }}
        </b-button>
        <b-button
          v-if="type == 'edit'"
          class="t-btn"
          variant="warning"
          @click="emitSubmit"
        >
          <i class="fas fa-edit"></i>
          {{ $t("npl.button.update").toUpperCase() }}
        </b-button>
      </div>
    </form>
    <template v-else>
      <customer-child-table
        :cusID="id"
        :items="childTable[selectedTab].items"
        :keys="childTable[selectedTab].keys"
        :colTypes="childTable[selectedTab].colTypes"
        :columnAdd="childTable[selectedTab].columnAdd"
        :selectedTab="selectedTab"
        :titleTab="titleTab"
        @changeChildTable="changeChildTable"
      />
    </template>
  </div>
</template>

<script>
import moment from "moment";
import nplAPI from "@/api/modules/nplAPI";
import CustomerChildTable from "./CustomerChildTable";

export default {
  props: ["dataForm", "dataFormOptions", "type", "id", "childTable"],
  name: "form-customer",
  components: {
    "customer-child-table": CustomerChildTable,
  },
  data() {
    return {
      validFisrt: false,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      time: moment().format("HH:mm"),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      date: moment().format("YYYY-MM-DD"),
      regionSelected: {
        City: null,
        District: null,
        Ward: null,
      },
      options: {
        District: [],
        Ward: [],
      },
      listTab: [
        {
          title: this.$t("npl.customers"),
          tabName: "Customers",
        },
        {
          title: this.$t("npl.customer-contacts"),
          tabName: "CustomerContacts",
        },
        {
          title: this.$t("npl.customer-debits"),
          tabName: "CustomerDebits",
        },
        {
          title: this.$t("npl.customer-invoices"),
          tabName: "CustomerInvoices",
        },
        {
          title: this.$t("npl.customer-supports"),
          tabName: "CustomerSupports",
        },
        {
          title: this.$t("npl.customer-attachments"),
          tabName: "CustomerAttachments",
        },
      ],
      selectedTab: "Customers",
    };
  },
  computed: {
    showCustomer() {
      if (
        (this.type == "edit" && this.selectedTab == "Customers") ||
        this.type == "add"
      ) {
        return true;
      }
      return false;
    },
    titleTab() {
      const result = this.listTab.find(
        (item) => item.tabName == this.selectedTab
      );
      return result.title;
    },
  },
  methods: {
    changeColor() {
      console.log("changeColor");
    },
    checkValid() {
      this.validFisrt = true;
      let result = false;
      this.dataForm.forEach((field) => {
        if (field.name.toUpperCase() == "CODE" && this.type == "add") {
          field.isValid = false;
        } else if (field.name.toUpperCase() == "NOTE") {
          field.isValid = false;
        } else if (!field.value || field.value == "") {
          result = true;
          field.isValid = true;
        } else {
          field.isValid = false;
        }
      });
      return result;
    },
    emitSubmit() {
      console.log("emitSubmit");
      if (this.checkValid()) return;
      this.$emit("submit", this.dataForm, this.type, this.id);
    },
    emitSubmitDelete() {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + " ?", {
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
            this.$emit("submit", this.dataForm, "delete", this.id);
          }
        });
    },
    getDistrictsWards(type, parentID) {
      if (parentID) {
        let body = {
          ParentId: parentID,
        };
        nplAPI
          .getDistrictsWards(body)
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
            this.options = {
              ...this.options,
              [type]: newArr,
            };
          })
          .catch((err) => console.log(err));
      }
    },
    updateRegion(type, value) {
      const obj = this.dataForm.find((item) => item.name == type);
      if (obj) {
        obj.value = value;
      }
    },
    changeChildTable() {
      this.$emit("changeChildTable", this.selectedTab);
    },
  },
  watch: {
    "regionSelected.City"(newVal) {
      const CityID =
        this.dataForm.find((item) => item.name == "City")?.value || null;
      if (CityID !== newVal) {
        this.regionSelected.District = null;
        this.regionSelected.Ward = null;
        this.updateRegion("City", newVal);
      }

      this.options.District = [];
      this.options.Ward = [];
      this.getDistrictsWards("District", newVal);
    },
    "regionSelected.District"(newVal) {
      const DistrictID =
        this.dataForm.find((item) => item.name == "District")?.value || null;
      if (DistrictID !== newVal) {
        this.regionSelected.Ward = null;
        this.updateRegion("District", newVal);
      }

      this.options.Ward = [];
      this.getDistrictsWards("Ward", newVal);
    },
    "regionSelected.Ward"(newVal) {
      this.updateRegion("Ward", newVal);
    },
  },
  created() {
    if (this.id) {
      const City =
        this.dataForm.find((item) => item.name == "City")?.value || null;
      const District =
        this.dataForm.find((item) => item.name == "District")?.value || null;
      const Ward =
        this.dataForm.find((item) => item.name == "Ward")?.value || null;
      this.regionSelected = {
        City,
        District,
        Ward,
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.t-btn {
  font-weight: 580;
}
</style>

<style>
.tab-form-customer .nav-item {
  font-weight: 560;
}
</style>
