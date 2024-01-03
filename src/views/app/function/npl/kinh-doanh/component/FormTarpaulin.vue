<template>
  <div>
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
                  :label="modifyDataForm.MaxAllowanceCost[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.MaxAllowanceCost[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.MaxAllowanceCost[1]"
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
                          'MaxAllowanceCost',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
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
            </b-row>
            <b-row>
              <b-col lg="12">
                <div>
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
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="8">
            <ChildTable
              :title="$t('npl.details-of-supplementary-items')"
              :items="childTable.CoatTarpAllowanceDetails.items"
              :fields="getFieldsChildTable('CoatTarpAllowanceDetails')"
              :currentMode="currentMode"
              tableName="CoatTarpAllowanceDetails"
              :formatCurrency="formatCurrency"
              :formatDecimal="formatDecimal"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
            />
          </b-col>
        </b-row>
        <div
          v-if="modifyDataForm.IsActive && modifyDataForm.IsActive[1] == 1"
          class="img-lock"
        >
          <img src="/assets/img/npl/img-lock.png" alt="" style="height: 60px" />
        </div>
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
    <b-modal
      id="modal-child-table"
      :title="$t('modal.add')"
      body-class="body-modal-add"
      size="lg"
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
              :label="formModalAdd.GoodsTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.GoodsTypeID[3]"
            >
              <v-select
                v-model="formModalAdd.GoodsTypeID[1]"
                :options="dataFormOptions.GoodsTypeID"
                :reduce="(item) => item.value"
                @input="resetStateInput('GoodsTypeID', 'formModalAdd')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.OldAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.OldAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.OldAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'OldAllowance', 'formModalAdd')
                "
                @input="
                  changeAllowance(
                    'OldAllowance',
                    'NewAllowance',
                    'DeviantAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.NewAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.NewAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.NewAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'NewAllowance', 'formModalAdd')
                "
                @input="
                  changeAllowance(
                    'OldAllowance',
                    'NewAllowance',
                    'DeviantAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.DeviantAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.DeviantAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.DeviantAllowance[1]"
                class="text-right"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.TotalOldAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.TotalOldAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.TotalOldAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'TotalOldAllowance',
                      'formModalAdd'
                    )
                "
                @input="
                  changeAllowance(
                    'TotalOldAllowance',
                    'TotalNewAllowance',
                    'DeviantMonthAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.TotalNewAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.TotalNewAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.TotalNewAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'TotalNewAllowance',
                      'formModalAdd'
                    )
                "
                @input="
                  changeAllowance(
                    'TotalOldAllowance',
                    'TotalNewAllowance',
                    'DeviantMonthAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.DeviantMonthAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.DeviantMonthAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.DeviantMonthAllowance[1]"
                class="text-right"
                disabled
              />
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
      notRequiredChildTable: [
        "GoodsTypeName",
        "DeviantAllowance",
        "DeviantMonthAllowance",
        "Action",
        "Note",
      ],
      childTable: {
        CoatTarpAllowanceDetails: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: []
        },
      },
    };
  },
  watch: {
    "$i18n.locale"() {
      this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
      this.getSelect("GoodsTypes", "GoodsTypesName", "GoodsTypeID");
      this.getColTypesChildTable('CoatTarpAllowanceDetails', 'CoatTarpAllowanceDetails')
      this.getDynamicFormAddChildTable('CoatTarpAllowanceDetails', 'CoatTarpAllowanceDetails')
    },
    dataForm(newVal) {
      if (newVal) {
        this.modifyDataForm = this.customDataFormToShow(newVal);
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
      this.childTable.CoatTarpAllowanceDetails.items = arr;
      this.childTable.CoatTarpAllowanceDetails.objectKeys = objectKeys;
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        if (obj) {
          obj.CoatTarpAllowanceDetails = this.childTable.CoatTarpAllowanceDetails.items;
        }
        this.$emit("getDataForm", obj);
      }
    },
  },
  created() {
    this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
    this.getSelect("GoodsTypes", "GoodsTypesName", "GoodsTypeID");
    this.getColTypesChildTable('CoatTarpAllowanceDetails', 'CoatTarpAllowanceDetails')
    this.getDynamicFormAddChildTable('CoatTarpAllowanceDetails', 'CoatTarpAllowanceDetails')
  },
  methods: {
    changeAllowance(field1, field2, field3, form) {
      let numberA = this[form][field1][1] || 0;
      if (numberA) {
        numberA = this.revertCurrency(numberA);
      }
      let numberB = this[form][field2][1] || 0;
      if (numberB) {
        numberB = this.revertCurrency(numberB);
      }
      let numberC = Math.abs(parseFloat(numberA) - parseFloat(numberB));
      numberC = this.convertCurrency(numberC);
      this[form][field3][1] = numberC;
    },
  },
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
</style>
