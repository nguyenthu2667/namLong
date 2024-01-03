<template>
  <div class="crane-allowance">
    <template v-if="modifyDataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="4">
            <b-row>
              <b-col lg="8">
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
              <b-col lg="4">
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
                      formatDateToServer(
                        modifyDataForm.Odate[1],
                        'Odate',
                        'modifyDataForm'
                      )
                    "
                  ></datepicker>
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
            <ChildTable
              :title="$t('npl.details-of-supplementary-items')"
              :items="childTable.PieceTireAllowancesDetails.items"
              :fields="getFieldsChildTable('PieceTireAllowancesDetails')"
              :currentMode="currentMode"
              tableName="PieceTireAllowancesDetails"
              :formatCurrency="formatCurrency"
              :formatDecimal="formatDecimal"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
            />
          </b-col>
          <b-col lg="2">
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
    <b-modal
      id="modal-child-table"
      :title="$t('modal.add')"
      body-class="body-modal-add"
      size="md"
      @ok="handleModalChildTable"
      @hidden="hiddenModalChildTable"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <template v-if="formModalAdd">
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.FromTrip[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.FromTrip[3]"
            >
              <b-form-input
                v-model="formModalAdd.FromTrip[1]"
                class="text-right"
                @input="resetStateInput('FromTrip', 'formModalAdd')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.ToTrip[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.ToTrip[3]"
            >
              <b-form-input
                v-model="formModalAdd.ToTrip[1]"
                class="text-right"
                @input="resetStateInput('ToTrip', 'formModalAdd')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.AllowanceCost[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.AllowanceCost[3]"
            >
              <b-form-input
                v-model="formModalAdd.AllowanceCost[1]"
                class="text-right"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'AllowanceCost', 'formModalAdd')
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>

<script>
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      notRequiredChildTable: ["Action", "Note"],
      childTable: {
        PieceTireAllowancesDetails: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: []
        },
      },
    };
  },
  created() {
    this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
    this.getColTypesChildTable('PieceTireAllowancesDetails', 'PieceTireAllowancesDetails')
    this.getDynamicFormAddChildTable('PieceTireAllowancesDetails', 'PieceTireAllowancesDetails')
  },
  watch: {
    "$i18n.locale"() {
      this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
      this.getColTypesChildTable('PieceTireAllowancesDetails', 'PieceTireAllowancesDetails')
      this.getDynamicFormAddChildTable('PieceTireAllowancesDetails', 'PieceTireAllowancesDetails')
    },
    dataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToShow(newVal);
        this.modifyDataForm = obj;
      } else {
        this.modifyDataForm = null;
      }
    },
    dataChildTable(newVal) {
      const arr = [];
      if (newVal && newVal.length > 0) {
        newVal.forEach((item) => {
          arr.push({
            ...item,
            ID: this.randomString(10),
          });
        });
      }
      const objectKeys = arr.length > 0 ? Object.keys(arr[0]) : []
      this.childTable.PieceTireAllowancesDetails.items = arr;
      this.childTable.PieceTireAllowancesDetails.objectKeys = objectKeys;
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        if (obj) {
          obj.PieceTireAllowancesDetails = this.childTable.PieceTireAllowancesDetails.items;
        }
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
