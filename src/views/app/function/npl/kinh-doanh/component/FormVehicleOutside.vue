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
                      formatDateToServer(
                        modifyDataForm.Odate[1],
                        'Odate',
                        'modifyDataForm'
                      )
                    "
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.OtherOilAllowance[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.OtherOilAllowance[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.OtherOilAllowance[1]"
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
                          'OtherOilAllowance',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.OtherOTAllowance[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.OtherOTAllowance[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.OtherOTAllowance[1]"
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
                          'OtherOTAllowance',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
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
          <b-col lg="8">
            <ChildTable
              :title="$t('npl.region-allowance')"
              :items="childTable.OutSideVehiclesAllowancesDetails.items"
              :fields="getFieldsChildTable('OutSideVehiclesAllowancesDetails')"
              :currentMode="currentMode"
              tableName="OutSideVehiclesAllowancesDetails"
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
              :label="formModalAdd.RegionID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.RegionID[3]"
            >
              <v-select
                v-model="formModalAdd.RegionID[1]"
                :options="dataFormOptions.RegionID"
                :reduce="(item) => item.value"
                @input="resetStateInput('RegionID', 'formModalAdd')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.OldOilAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.OldOilAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.OldOilAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'OldOilAllowance', 'formModalAdd')
                "
                @input="
                  changeAllowance(
                    'OldOilAllowance',
                    'NewOilAllowance',
                    'DeviantOilAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.NewOilAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.NewOilAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.NewOilAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'NewOilAllowance', 'formModalAdd')
                "
                @input="
                  changeAllowance(
                    'OldOilAllowance',
                    'NewOilAllowance',
                    'DeviantOilAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.DeviantOilAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.DeviantOilAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.DeviantOilAllowance[1]"
                class="text-right"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.OldOTAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.OldOTAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.OldOTAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'OldOTAllowance',
                      'formModalAdd'
                    )
                "
                @input="
                  changeAllowance(
                    'OldOTAllowance',
                    'NewOTAllowance',
                    'DeviantOTAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.NewOTAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.NewOTAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.NewOTAllowance[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'NewOTAllowance',
                      'formModalAdd'
                    )
                "
                @input="
                  changeAllowance(
                    'OldOTAllowance',
                    'NewOTAllowance',
                    'DeviantOTAllowance',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.DeviantOTAllowance[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.DeviantOTAllowance[3]"
            >
              <b-form-input
                v-model="formModalAdd.DeviantOTAllowance[1]"
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
import nplAPI from "@/api/modules/nplAPI";
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      notRequiredChildTable: [
        "ID",
        "RegionName",
        "Action",
        'Note',
      ],
      childTable: {
        OutSideVehiclesAllowancesDetails: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: []
        },
      },
    };
  },
  created() {
    this.getCities()
    this.getColTypesChildTable('OutSideVehiclesAllowancesDetails', 'OutSideVehiclesAllowancesDetails')
    this.getDynamicFormAddChildTable('OutSideVehiclesAllowancesDetails', 'OutSideVehiclesAllowancesDetails')
  },
  watch: {
    "$i18n.locale"() {
      this.getCities()
      this.getColTypesChildTable('OutSideVehiclesAllowancesDetails', 'OutSideVehiclesAllowancesDetails')
      this.getDynamicFormAddChildTable('OutSideVehiclesAllowancesDetails', 'OutSideVehiclesAllowancesDetails')
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
      const arr = []
      if (newVal && newVal.length > 0) {
        newVal.forEach((item) => {
          arr.push({
            ...item,
            ID: this.randomString(10),
          });
        });
      }
      const objectKeys = arr.length > 0 ? Object.keys(arr[0]) : []
      this.childTable.OutSideVehiclesAllowancesDetails.items = arr;
      this.childTable.OutSideVehiclesAllowancesDetails.objectKeys = objectKeys;
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        if(obj) {
          obj.OutSideVehiclesAllowancesDetails = this.childTable.OutSideVehiclesAllowancesDetails.items;
        }
        this.$emit("getDataForm", obj);
      }
    },
  },
  methods: {
    getCities() {
      let body = {
        Level: 2, //mặc định 2 là gọi các tỉnh, thành phố của Việt Nam
      };
      nplAPI
        .getCities(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                label: item.nPLRegionsName,
                value: item.ID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            RegionID: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
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
