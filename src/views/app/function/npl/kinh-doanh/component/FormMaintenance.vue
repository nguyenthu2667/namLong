<template>
  <div class="form-maintenance">
    <template v-if="modifyDataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="4">
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="modifyDataForm.ID ? modifyDataForm.ID[0] : 'cl.OID'"
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
              <b-col lg="4">
                <b-form-group
                  :label="modifyDataForm.VehicleTypeID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.VehicleTypeID[3]"
                >
                  <v-select
                    v-model="modifyDataForm.VehicleTypeID[1]"
                    :options="dataFormOptions.VehicleTypeID"
                    :reduce="(item) => item.value"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @input="resetStateInput('VehicleTypeID', 'modifyDataForm')"
                  />
                </b-form-group>
              </b-col>
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
        <b-row>
          <b-col lg="4">
            <ChildTable
              :title="$t('npl.detail-of-maintenance-period')"
              :items="childTable.MaintenanceAllowancesPeriods.items"
              :fields="getFieldsChildTable('MaintenanceAllowancesPeriods')"
              :currentMode="currentMode"
              tableName="MaintenanceAllowancesPeriods"
              :formatCurrency="formatCurrency"
              :formatDecimal="formatDecimal"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
              @rowSelected="changePeriod"
            />
              <!-- :defaultSelect="selectedPeriod" -->
          </b-col>
          <b-col lg="6">
            <ChildTable
              :title="$t('npl.detail-of-work-in-the-period')"
              :items="maintenanceWorksArr"
              :fields="getFieldsChildTable('MaintenanceAllowancesWorks')"
              :currentMode="currentMode"
              tableName="MaintenanceAllowancesWorks"
              :formatCurrency="formatCurrency"
              :formatDecimal="formatDecimal"
              :hiddenBtnAdd="this.selectedPeriod ? false : true"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
            />
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
        <template v-if="tableName == 'MaintenanceAllowancesPeriods'">
          <b-row>
            <b-col lg="12">
              <b-form-group
                :label="formModalAdd.Name[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.Name[3]"
              >
                <b-form-input
                  v-model="formModalAdd.Name[1]"
                  @input="resetStateInput('Name', 'formModalAdd')"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.STT[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.STT[3]"
              >
                <v-select
                  v-model="formModalAdd.STT[1]"
                  :options="dataFormOptions.STT"
                  :reduce="(item) => item.value"
                  @input="resetStateInput('STT', 'formModalAdd')"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.KmOfPeriod[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.KmOfPeriod[3]"
              >
                <b-form-input
                  v-model="formModalAdd.KmOfPeriod[1]"
                  class="text-right"
                  type="number"
                  @input="resetStateInput('KmOfPeriod', 'formModalAdd')"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.Deviant[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.Deviant[3]"
              >
                <b-form-input
                  v-model="formModalAdd.Deviant[1]"
                  class="text-right"
                  type="number"
                  @input="resetStateInput('Deviant', 'formModalAdd')"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        <template v-else-if="tableName == 'MaintenanceAllowancesWorks'">
          <b-row>
            <b-col lg="8">
              <b-form-group
                :label="formModalAdd.MaintenanceJobsID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.MaintenanceJobsID[3]"
              >
                <v-select
                  v-model="formModalAdd.MaintenanceJobsID[1]"
                  :options="dataFormOptions.MaintenanceJobsID"
                  :reduce="(item) => item.value"
                  @input="
                    changeWork(
                      'MaintenanceJobsID',
                      'MaintenanceSuppliesName',
                      'Amount',
                      'formModalAdd'
                    )
                  "
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.STT[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.STT[3]"
              >
                <v-select
                  v-model="formModalAdd.STT[1]"
                  :options="dataFormOptions.STT"
                  :reduce="(item) => item.value"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-form-group
                :label="formModalAdd.MaintenanceSuppliesName[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.MaintenanceSuppliesName[3]"
              >
                <b-form-input
                  v-model="formModalAdd.MaintenanceSuppliesName[1]"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.Amount[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.Amount[3]"
              >
                <b-form-input
                  v-model="formModalAdd.Amount[1]"
                  class="text-right"
                  type="number"
                  @input="resetStateInput('STT', 'formModalAdd')"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </template>
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
        "STT",
        "STTName",
        "MaintenanceJobsName",
        "MaintenanceSuppliesName",
        "Supplies",
        "Action",
        "Note",
      ],
      childTable: {
        MaintenanceAllowancesPeriods: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        MaintenanceAllowancesWorks: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
      },
      selectedPeriod: "",
      maintenanceWorksArr: [],
    };
  },
  watch: {
    "$i18n.locale"() {
      this.getSelect("VehicleTypes", "VehicleTypesName", "VehicleTypeID");
      this.getSelect(
        "MaintenanceJobs",
        "MaintenanceJobsName",
        "MaintenanceJobsID"
      );
      this.getColTypesChildTable(
        "MaintenanceAllowancesPeriods",
        "MaintenanceAllowancesPeriods"
      );
      this.getDynamicFormAddChildTable(
        "MaintenanceAllowancesPeriods",
        "MaintenanceAllowancesPeriods"
      );
      this.getColTypesChildTable(
        "MaintenanceAllowancesWorks",
        "MaintenanceAllowancesWorks"
      );
      this.getDynamicFormAddChildTable(
        "MaintenanceAllowancesWorks",
        "MaintenanceAllowancesWorks"
      );
      this.dataFormOptions.STT = [
        { label: `${this.$t("npl.period")} 1`, value: 1 },
        { label: `${this.$t("npl.period")} 2`, value: 2 },
        { label: `${this.$t("npl.period")} 3`, value: 3 },
        { label: `${this.$t("npl.period")} 4`, value: 4 },
        { label: `${this.$t("npl.period")} 5`, value: 5 },
        { label: `${this.$t("npl.period")} 6`, value: 6 },
        { label: `${this.$t("npl.period")} 7`, value: 7 },
        { label: `${this.$t("npl.period")} 8`, value: 8 },
        { label: `${this.$t("npl.period")} 9`, value: 9 },
        { label: `${this.$t("npl.period")} 10`, value: 10 },
        { label: `${this.$t("npl.period")} 11`, value: 11 },
        { label: `${this.$t("npl.period")} 12`, value: 12 },
      ];
    },
    dataForm(newVal) {
      if (newVal) {
        this.modifyDataForm = this.customDataFormToShow(newVal);
      } else {
        this.modifyDataForm = null;
      }
    },
    dataChildTable(newVal) {
      if (newVal) {
        const arr = [];
        const arr2 = [];
        if (newVal[0] && newVal[0].length > 0) {
          newVal[0].forEach((item) => {
            arr.push({
              ...item,
              ID: this.randomString(10),
            });
          });
        }
        if (newVal[1] && newVal[1].length > 0) {
          newVal[1].forEach((item) => {
            arr2.push({
              ...item,
              ID: this.randomString(10),
            });
          });
        }

        const objectKeys = arr.length > 0 ? Object.keys(arr[0]) : [];
        this.childTable.MaintenanceAllowancesPeriods.items = arr;
        this.childTable.MaintenanceAllowancesPeriods.objectKeys = objectKeys;

        const objectKeys2 = arr2.length > 0 ? Object.keys(arr2[0]) : [];
        this.childTable.MaintenanceAllowancesWorks.items = arr2;
        this.childTable.MaintenanceAllowancesWorks.objectKeys = objectKeys2;

        this.selectedPeriod = '' //chỉnh lại rỗng khi dataChilTable có sự thay đổi (qua 1 chứng từ khác)
      }
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        if (obj) {
          const customPeriodArr = [];
          this.childTable.MaintenanceAllowancesPeriods.items.forEach((item) => {
            customPeriodArr.push({
              ...item,
              NameExtention1: "",
              NameExtention2: "",
              NameExtention3: "",
              NameExtention4: "",
              NameExtention5: "",
              NameExtention6: "",
              NameExtention7: "",
              NameExtention8: "",
              NameExtention9: "",
            });
          });
          obj.MaintenanceAllowancesPeriods = customPeriodArr;
          obj.MaintenanceAllowancesWorks =
            this.childTable.MaintenanceAllowancesWorks.items;
        }
        this.$emit("getDataForm", obj);
      }
    },
    selectedPeriod(newVal) {
      if (newVal) {
        this.maintenanceWorksArr =
          this.childTable.MaintenanceAllowancesWorks.items.filter(
            (item) => item.STT == newVal.STT
          );
      } else {
        this.maintenanceWorksArr = [];
      }
    },
  },
  created() {
    this.getSelect("VehicleTypes", "VehicleTypesName", "VehicleTypeID");
    this.getSelect(
      "MaintenanceJobs",
      "MaintenanceJobsName",
      "MaintenanceJobsID"
    );
    this.getColTypesChildTable(
      "MaintenanceAllowancesPeriods",
      "MaintenanceAllowancesPeriods"
    );
    this.getDynamicFormAddChildTable(
      "MaintenanceAllowancesPeriods",
      "MaintenanceAllowancesPeriods"
    );
    this.getColTypesChildTable(
      "MaintenanceAllowancesWorks",
      "MaintenanceAllowancesWorks"
    );
    this.getDynamicFormAddChildTable(
      "MaintenanceAllowancesWorks",
      "MaintenanceAllowancesWorks"
    );

    this.dataFormOptions.STT = [
      { label: `${this.$t("npl.period")} 1`, value: 1 },
      { label: `${this.$t("npl.period")} 2`, value: 2 },
      { label: `${this.$t("npl.period")} 3`, value: 3 },
      { label: `${this.$t("npl.period")} 4`, value: 4 },
      { label: `${this.$t("npl.period")} 5`, value: 5 },
      { label: `${this.$t("npl.period")} 6`, value: 6 },
      { label: `${this.$t("npl.period")} 7`, value: 7 },
      { label: `${this.$t("npl.period")} 8`, value: 8 },
      { label: `${this.$t("npl.period")} 9`, value: 9 },
      { label: `${this.$t("npl.period")} 10`, value: 10 },
      { label: `${this.$t("npl.period")} 11`, value: 11 },
      { label: `${this.$t("npl.period")} 12`, value: 12 },
    ];
  },
  methods: {
    changeWork(field1, field2, field3, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      if (this[form][field2][3] === false) {
        this[form][field2][3] = true;
      }
      if (this[form][field3][3] === false) {
        this[form][field3][3] = true;
      }
      const value = this[form][field1][1];
      const obj = this.dataFormOptions.MaintenanceJobsID.find(
        (item) => item.value == value
      );
      this[form][field2][1] = obj.supplies;
      this[form][field3][1] = obj.supplyAmount;
    },
    changePeriod(item) {
      this.selectedPeriod = item[0];
    },
    addChildTable(name) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        const obj = this.getFieldsModal(name)
        this.formModalAdd = obj
        this.tableName = name
        this.$bvModal.show("modal-child-table");

        //đoạn xử lí khác
        if(this.tableName === 'MaintenanceAllowancesWorks') {
          this.formModalAdd.STT[1] = this.selectedPeriod.STT
        }
      }
    },
    editChildTable(data) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        if (data.tableName == 'MaintenanceAllowancesWorks') {
          this.selectedPeriod = data.item
        }
        const obj = this.getFieldsModal(data.tableName, data.item)
        this.formModalAdd = obj
        this.tableName = data.tableName
        this.$bvModal.show("modal-child-table");
      }
    },
    handleModalChildTable(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.formModalAdd) return;
      this.isCheckIsValidChildTable = true;
      if (!this.checkFormValidateChildTable()) {
        this.$emit("getDataForm", null);
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.formModalAdd) {
        const value = this.formModalAdd[key][1];
        const type = this.formModalAdd[key][2];
        if (type.toUpperCase() == "CURRENCY" || type.toUpperCase() == "MONEY") {
          obj[key] = this.revertCurrency(value);
        } else if (type.toUpperCase() == "SELECT") {
          const relativeKey = this.formModalAdd[key][4];
          const label = this.dataFormOptions[key].find(
            (item) => item.value == value
          )?.label;
          obj[key] = value;
          obj[relativeKey] = label;
        } else if (type.toUpperCase() == "RELATIVEKEY") {
          //trường dùng để show ra khi lựa chọn theo key select liên quan
        } else {
          obj[key] = value;
        }
      }

      if (obj.ID) {
        const arr = this.childTable[this.tableName].items;
        const index = arr.findIndex((item) => item.ID == obj.ID);
        arr[index] = obj;
        this.childTable[this.tableName].items = [...arr];
      } else {
        obj.ID = this.randomString(10);
        this.childTable[this.tableName].items.push(obj);
        //trường hợp table chỉ mới có obj mới vừa add, cái objectKeys đang bằng []
        if (this.childTable[this.tableName].objectKeys.length == 0) {
          this.childTable[this.tableName].objectKeys = Object.keys(
            this.childTable[this.tableName].items[0]
          );
        }
      }
      // this.childTable = { ...this.childTable };
      // console.log(this.childTable);

      //xử lý thêm cho table 'MaintenanceWorks'
      this.maintenanceWorksArr =
        this.childTable.MaintenanceAllowancesWorks.items.filter(
          (item) => item.STT == this.selectedPeriod.STT
        );
      console.log(this.maintenanceWorksArr);

      this.$nextTick(() => {
        this.$bvModal.hide("modal-child-table");
      });
    },
    removeChildTable(obj) {
      const arr = [...this.childTable[obj.tableName].items]
      const newArr = arr.filter(item => item.ID !== obj.item.ID)
      this.childTable[obj.tableName].items = newArr
      this.childTable = { ...this.childTable };
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
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .vs__dropdown-menu {
    min-width: auto;
  }
}
.form-maintenance {
  .vs__dropdown-menu {
    min-width: auto;
  }
}
</style>
