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
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.CraneCost0[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.CraneCost0[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.CraneCost0[1]"
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
                          'CraneCost0',
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.CraneCost11[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.CraneCost11[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.CraneCost11[1]"
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
                          'CraneCost11',
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
          <b-col lg="3" class="pl-0 pl-lg-3">
            <div class="style-special">
              *{{ $t("npl.number-of-cranes-in-1-day/place") }}
            </div>
            <b-table
              :items="detailCraneRender"
              :fields="[
                { key: 'time', label: $t('npl.time') },
                {
                  key: 'amount',
                  label: $t('npl.amount'),
                  tdClass: 'text-right',
                },
              ]"
              :bordered="true"
              show-empty
              head-variant="light"
              body-tr-class="crane-table"
            >
              <template #cell(amount)="row">
                <b-form-group
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm[`CraneCost${row.item.time}`][3]"
                >
                  <b-form-input
                    v-model="modifyDataForm[`CraneCost${row.item.time}`][1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    :placeholder="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? $t('npl.input-amount')
                        : ''
                    "
                    :formatter="
                      (value) =>
                        currencyFormatInput(
                          value,
                          `CraneCost${row.item.time}`,
                          'modifyDataForm'
                        )
                    "
                  ></b-form-input>
                </b-form-group>
              </template>
            </b-table>
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
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      notRequired: ["ID", "OID", "Note", "NameExtention1", "AddressExtention1"],
      detailCraneRender: [],
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
        this.detailCraneRender = [
          {
            time: 1,
            amount: obj.CraneCost1[1],
          },
          {
            time: 2,
            amount: obj.CraneCost2[1],
          },
          {
            time: 3,
            amount: obj.CraneCost3[1],
          },
          {
            time: 4,
            amount: obj.CraneCost4[1],
          },
          {
            time: 5,
            amount: obj.CraneCost5[1],
          },
          {
            time: 6,
            amount: obj.CraneCost6[1],
          },
          {
            time: 7,
            amount: obj.CraneCost7[1],
          },
          {
            time: 8,
            amount: obj.CraneCost8[1],
          },
          {
            time: 9,
            amount: obj.CraneCost9[1],
          },
          {
            time: 10,
            amount: obj.CraneCost10[1],
          },
        ];
      } else {
        this.modifyDataForm = null;
        this.detailCraneRender = [];
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
    vertical-align: middle !important;
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
    .form-group {
      margin-bottom: 0;
    }
  }
}
</style>
