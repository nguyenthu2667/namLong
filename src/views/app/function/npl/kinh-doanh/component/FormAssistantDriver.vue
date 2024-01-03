<template>
  <div class="crane-allowance">
    <template v-if="modifyDataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="4">
            <b-row>
              <b-col lg="6">
                <b-form-group
                  :label="
                    modifyDataForm.ID
                      ? modifyDataForm.ID[0]
                      : 'OID'
                  "
                >
                  <b-form-input
                    :value="modifyDataForm?.ID[1] || 'AUTO'"
                    disabled
                    class="text-center"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.Odate[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.Odate[3]"
                >
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="$t('modal.day-select')"
                    v-model="modifyDataForm.Odate[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @input="
                      formatDateToServer(modifyDataForm.Odate[1], 'Odate', 'modifyDataForm')
                    "
                  ></datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.CraneAllowance[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.CraneAllowance[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.CraneAllowance[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    :formatter="
                      (value) =>
                        currencyFormatInput(
                          value,
                          'CraneAllowance',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.NoCraneAllowance[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.NoCraneAllowance[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.NoCraneAllowance[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    :formatter="
                      (value) =>
                        currencyFormatInput(
                          value,
                          'NoCraneAllowance',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group
                  :label="modifyDataForm.VehicleGroupID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.VehicleGroupID[3]"
                >
                  <v-select
                    v-model="modifyDataForm.VehicleGroupID[1]"
                    :options="dataFormOptions.VehicleGroupID"
                    :reduce="(item) => item.value"
                    multiple
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @input="resetStateInput('VehicleGroupID', 'modifyDataForm')"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group :label="modifyDataForm.Note[0]">
                  <b-form-textarea
                    v-model="modifyDataForm.Note[1]"
                    rows="2"
                    max-rows="6"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="4">
            <div
              v-if="modifyDataForm.IsActive && modifyDataForm.IsActive[1] == 1"
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
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import moment from "moment";

// import datepickerMixin from "@/views/app/category/npl/mixin/datepickerMixin";
import handling from "@/constants/handling.js";
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
    };
  },
  created() {
    this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
  },
  watch: {
    "$i18n.locale"() {
      
      this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
    },
    dataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToShow(newVal);
        this.modifyDataForm = obj;
      } else {
        this.modifyDataForm = null;
      }
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        this.$emit("getDataForm", obj);
      }
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.body-modal-add {
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
}
.crane-allowance {
  th {
    padding: 0.5rem;
  }
  td {
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.5rem;

    .form-control {
      border: none;
      padding: 0;
    }
    .form-control:disabled {
      background-color: white;
    }
  }
}
</style>
