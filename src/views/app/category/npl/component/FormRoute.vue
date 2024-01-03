<template>
  <div>
    <form>
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
                  disabled
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
              <template
                v-if="
                  field.name.toUpperCase() == 'ENDCITYID' ||
                  field.name.toUpperCase() == 'STARTCITYID'
                "
              >
                <b-form-select
                  class="text-left"
                  v-model="regionSelected[field.name]"
                  :options="dataFormOptions[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
              <template
                v-else-if="
                  field.name.toUpperCase() == 'ENDDISTRICTID' ||
                  field.name.toUpperCase() == 'STARTDISTRICTID'
                "
              >
                <b-form-select
                  class="text-left"
                  v-model="regionSelected[field.name]"
                  :options="options[field.name]"
                  size="sm"
                ></b-form-select>
              </template>
              <template
                v-else-if="
                  field.name.toUpperCase() == 'ENDWARDID' ||
                  field.name.toUpperCase() == 'STARTWARDID'
                "
              >
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
          THOÁT
        </b-button>
        <b-button
          v-if="type == 'add'"
          class="t-btn"
          variant="success"
          @click="emitSubmit"
        >
          <i class="fas fa-plus"></i>
          THÊM
        </b-button>
        <b-button
          v-if="type != 'add'"
          class="t-btn"
          variant="danger"
          @click="emitSubmitDelete"
        >
          <i class="fas fa-trash-alt"></i>
          XÓA
        </b-button>
        <b-button
          v-if="type == 'edit'"
          class="t-btn"
          variant="warning"
          @click="emitSubmit"
        >
          <i class="fas fa-edit"></i>
          CẬP NHẬT
        </b-button>
      </div>
    </form>
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
        EndCityID: null,
        EndDistrictID: null,
        EndWardID: null,
        StartCityID: null,
        StartDistrictID: null,
        StartWardID: null,
      },
      options: {
        EndDistrictID: [],
        EndWardID: [],
        StartDistrictID: [],
        StartWardID: [],
      },
    };
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
    "regionSelected.StartCityID"(newVal) {
      if (newVal) {
      }
      const StartCityID =
        this.dataForm.find((item) => item.name == "StartCityID")?.value || null;
      if (StartCityID !== newVal) {
        this.regionSelected.StartDistrictID = null;
        this.regionSelected.StartWardID = null;
        this.updateRegion("StartCityID", newVal);
      }

      this.options.StartDistrictID = [];
      this.options.StartWardID = [];
      this.getDistrictsWards("StartDistrictID", newVal);
    },
    "regionSelected.StartDistrictID"(newVal) {
      const StartDistrictID =
        this.dataForm.find((item) => item.name == "StartDistrictID")?.value ||
        null;
      if (StartDistrictID !== newVal) {
        this.regionSelected.StartWardID = null;
        this.updateRegion("StartDistrictID", newVal);
      }

      this.options.StartWardID = [];
      this.getDistrictsWards("StartWardID", newVal);
    },
    "regionSelected.StartWardID"(newVal) {
      this.updateRegion("StartWardID", newVal);
    },
    "regionSelected.EndCityID"(newVal) {
      const EndCityID =
        this.dataForm.find((item) => item.name == "EndCityID")?.value || null;
      if (EndCityID !== newVal) {
        this.regionSelected.EndDistrictID = null;
        this.regionSelected.EndWardID = null;
        this.updateRegion("EndCityID", newVal);
      }

      this.options.EndDistrictID = [];
      this.options.EndWardID = [];
      this.getDistrictsWards("EndDistrictID", newVal);
    },
    "regionSelected.EndDistrictID"(newVal) {
      const EndDistrictID =
        this.dataForm.find((item) => item.name == "EndDistrictID")?.value ||
        null;
      if (EndDistrictID !== newVal) {
        this.regionSelected.EndWardID = null;
        this.updateRegion("EndDistrictID", newVal);
      }

      this.options.EndWardID = [];
      this.getDistrictsWards("EndWardID", newVal);
    },
    "regionSelected.EndWardID"(newVal) {
      this.updateRegion("EndWardID", newVal);
    },
  },
  created() {
    if (this.id) {
      const StartCityID =
        this.dataForm.find((item) => item.name == "StartCityID")?.value || null;
      const StartDistrictID =
        this.dataForm.find((item) => item.name == "StartDistrictID")?.value ||
        null;
      const StartWardID =
        this.dataForm.find((item) => item.name == "StartWardID")?.value || null;
      const EndCityID =
        this.dataForm.find((item) => item.name == "EndCityID")?.value || null;
      const EndDistrictID =
        this.dataForm.find((item) => item.name == "EndDistrictID")?.value ||
        null;
      const EndWardID =
        this.dataForm.find((item) => item.name == "EndWardID")?.value || null;
      this.regionSelected = {
        StartCityID,
        StartDistrictID,
        StartWardID,
        EndCityID,
        EndDistrictID,
        EndWardID,
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
