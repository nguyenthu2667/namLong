<template>
  <div>
    <template v-if="modifyDataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="2">
            <b-form-group
              :label="modifyDataForm.ID ? modifyDataForm.ID[0] : 'OID'"
            >
              <b-form-input
                :value="modifyDataForm?.ID[1] || 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
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
          <b-col lg="2">
            <b-form-group
              :label="modifyDataForm.OrderTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="modifyDataForm.OrderTypeID[3]"
            >
              <v-select
                v-model="modifyDataForm.OrderTypeID[1]"
                :options="dataFormOptions.OrderTypeID"
                :reduce="(item) => item.value"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                @input="resetStateInput('OrderTypeID', 'modifyDataForm')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="modifyDataForm.GoodsTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="modifyDataForm.GoodsTypeID[3]"
            >
              <v-select
                v-model="modifyDataForm.GoodsTypeID[1]"
                :options="dataFormOptions.GoodsTypeID"
                :reduce="(item) => item.value"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                @input="resetStateInput('GoodsTypeID', 'modifyDataForm')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="modifyDataForm.NoOverloadTotalCost[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="modifyDataForm.NoOverloadTotalCost[3]"
            >
              <b-form-input
                v-model="modifyDataForm.NoOverloadTotalCost[1]"
                class="text-right"
                disabled
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'NoOverloadTotalCost',
                      'modifyDataForm'
                    )
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="modifyDataForm.OverloadTotalCost[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="modifyDataForm.OverloadTotalCost[3]"
            >
              <b-form-input
                v-model="modifyDataForm.OverloadTotalCost[1]"
                class="text-right"
                disabled
                :formatter="
                  (value) =>
                    currencyFormatInput(
                      value,
                      'OverloadTotalCost',
                      'modifyDataForm'
                    )
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <div class="text-info text-uppercase">
              <strong>{{ $t("npl.info-route") }}</strong>
              <b-button
                class="ml-1 mb-1"
                squared
                :variant="`outline-primary`"
                size="sm"
                style="
                  height: 24px;
                  padding: 1px;
                  padding-left: 3px;
                  padding-right: 3px;
                "
                :style="{
                  visibility:
                    currentMode === 'adding' || currentMode === 'editing'
                      ? 'visible'
                      : 'hidden',
                }"
                @click="setRoute"
              >
                <i class="fas fa-plus"></i> <b>{{ $t("button.choose") }}</b>
              </b-button>
            </div>
            <template v-if="modifyDataForm.RouteID && modifyDataForm.RouteID[1]">
              <b-row>
                <b-col lg="8">
                  <b-form-group
                    :label="modifyDataForm.RoutesName[0]"
                    :invalid-feedback="$t('form.no-blank')"
                    :state="modifyDataForm.RoutesName[3]"
                  >
                    <b-form-input
                      v-model="modifyDataForm.RoutesName[1]"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group
                    :label="modifyDataForm.RoutesCode[0]"
                    :invalid-feedback="$t('form.no-blank')"
                    :state="modifyDataForm.RoutesCode[3]"
                  >
                    <b-form-input
                      v-model="modifyDataForm.RoutesCode[1]"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="4">
                  <b-form-group
                    :label="modifyDataForm.RouteGroupsName[0]"
                    :invalid-feedback="$t('form.no-blank')"
                    :state="modifyDataForm.RouteGroupsName[3]"
                  >
                    <b-form-input
                      v-model="modifyDataForm.RouteGroupsName[1]"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group
                    :label="modifyDataForm.Distance[0]"
                    :invalid-feedback="$t('form.no-blank')"
                    :state="modifyDataForm.Distance[3]"
                  >
                    <b-form-input
                      v-model="modifyDataForm.Distance[1]"
                      disabled
                      class="text-right"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
            <template v-else>
              {{ $t("cards.no-data") }}
            </template>
            <div class="mt-3">
              <ChildTable
                :title="$t('npl.toll-costs')"
                :items="childTable.RouteAllowancesDetails.items"
                :fields="getFieldsChildTable('RouteAllowancesDetails')"
                :currentMode="currentMode"
                tableName="RouteAllowancesDetails"
                :formatCurrency="formatCurrency"
                :formatDecimal="formatDecimal"
                :otherValue="totalChargingStations"
                :isShowTotal="true"
                @add="addChildTable"
                @edit="editChildTable"
                @remove="removeChildTable"
              />
            </div>
          </b-col>
          <b-col lg="6">
            <b-row>
              <b-col lg="8">
                <div class="text-info text-uppercase">
                  <strong>{{ $t("npl.contract-costs-and-salary") }}</strong>
                </div>
                <b-row>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.NoOverloadCost[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.NoOverloadCost[3]"
                    >
                      <b-form-input
                        v-model="modifyDataForm.NoOverloadCost[1]"
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
                              'NoOverloadCost',
                              'modifyDataForm'
                            )
                        "
                        @input="
                          changeCost(
                            'NoOverloadTotalCost',
                            'NoOverloadCost',
                            'NoOverloadSalary',
                            'OtherCost',
                            'modifyDataForm'
                          )
                        "
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.OverloadCost[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.OverloadCost[3]"
                    >
                      <b-form-input
                        v-model="modifyDataForm.OverloadCost[1]"
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
                              'OverloadCost',
                              'modifyDataForm'
                            )
                        "
                        @input="
                          changeCost(
                            'OverloadTotalCost',
                            'OverloadCost',
                            'OverloadSalary',
                            'OtherCost',
                            'modifyDataForm'
                          )
                        "
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.NoOverloadSalary[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.NoOverloadSalary[3]"
                    >
                      <b-form-input
                        v-model="modifyDataForm.NoOverloadSalary[1]"
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
                              'NoOverloadSalary',
                              'modifyDataForm'
                            )
                        "
                        @input="
                          changeCost(
                            'NoOverloadTotalCost',
                            'NoOverloadCost',
                            'NoOverloadSalary',
                            'OtherCost',
                            'modifyDataForm'
                          )
                        "
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.OverloadSalary[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.OverloadSalary[3]"
                    >
                      <b-form-input
                        v-model="modifyDataForm.OverloadSalary[1]"
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
                              'OverloadSalary',
                              'modifyDataForm'
                            )
                        "
                        @input="
                          changeCost(
                            'OverloadTotalCost',
                            'OverloadCost',
                            'OverloadSalary',
                            'OtherCost',
                            'modifyDataForm'
                          )
                        "
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.OtherCost[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.OtherCost[3]"
                    >
                      <b-form-input
                        v-model="modifyDataForm.OtherCost[1]"
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
                              'OtherCost',
                              'modifyDataForm'
                            )
                        "
                        @input="
                          changeOrderCostChargeStaionConst(
                            [
                              'NoOverloadTotalCost',
                              'NoOverloadCost',
                              'NoOverloadSalary',
                              'OtherCost',
                              'modifyDataForm',
                            ],
                            [
                              'OverloadTotalCost',
                              'OverloadCost',
                              'OverloadSalary',
                              'OtherCost',
                              'modifyDataForm',
                            ]
                          )
                        "
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group
                      :label="modifyDataForm.OtherCostDescription[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="modifyDataForm.OtherCostDescription[3]"
                    >
                      <b-textarea
                        v-model="modifyDataForm.OtherCostDescription[1]"
                        rows="2"
                        max-rows="6"
                        :disabled="
                          currentMode === 'adding' || currentMode === 'editing'
                            ? false
                            : true
                        "
                      ></b-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="4">
                <div
                  v-if="
                    modifyDataForm.IsActive && modifyDataForm.IsActive[1] == 1
                  "
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
          <b-col lg="8">
            <b-form-group
              :label="formModalAdd.ChargingStationID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.ChargingStationID[3]"
            >
              <v-select
                v-model="formModalAdd.ChargingStationID[1]"
                :options="dataFormOptions.ChargingStationID"
                :reduce="(item) => item.value"
                @input="
                  changeChargingStation(
                    'ChargingStationID',
                    'ChargingCost',
                    'formModalAdd'
                  )
                "
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="formModalAdd.ChargingCost[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="formModalAdd.ChargingCost[3]"
            >
              <b-form-input
                v-model="formModalAdd.ChargingCost[1]"
                class="text-right"
                :formatter="
                  (value) =>
                    currencyFormatInput(value, 'ChargingCost', 'formModalAdd')
                "
              />
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-modal>
    <b-modal
      id="modal-route-table"
      :title="$t('modal.add')"
      body-class="body-modal-add"
      size="lg"
      hide-footer
    >
      <ModalTableRoute
        @hidden="hiddenModalRoute"
        @chooseRoute="handleAddRoute"
      />
    </b-modal>
  </div>
</template>

<script>
import ModalTableRoute from "@/views/app/function/npl/kinh-doanh/component/ModalTableRoute";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import handling from "@/constants/handling.js";
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  components: {
    ModalTableRoute,
  },
  data() {
    return {
      notRequired: ["ID", "OID", "Note", "NameExtention1", "AddressExtention1", "OtherCostDescription", "RouteCode", "RoutesCode", "RoutesName", "RouteGroupsName", "Distance"],
      notRequiredChildTable: [
        "GoodsTypeName",
        "DeviantAllowance",
        "DeviantMonthAllowance",
        "Action",
        "Note",
      ],
      childTable: {
        RouteAllowancesDetails: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
      },
      dataFormRoute: null,
    };
  },
  computed: {
    totalChargingStations() { //Tổng chi phí cầu đường
      let sum = 0;
      const arr = this.childTable.RouteAllowancesDetails.items;
      if (arr.length > 0) {
        arr.forEach((item) => {
          sum += Number(item.ChargingCost);
        });
      }
      return this.convertCurrency(sum);
    },
  },
  watch: {
    "$i18n.locale"() {
      this.setUp();
    },
    dataForm(newVal) {
      if (newVal) {
        this.modifyDataForm = this.customDataFormToShow(newVal);
      } else {
        this.dataFormRoute = null;
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
      const objectKeys = arr.length > 0 ? Object.keys(arr[0]) : [];
      this.childTable.RouteAllowancesDetails.items = arr;
      this.childTable.RouteAllowancesDetails.objectKeys = objectKeys;
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        console.log(obj);
        if (obj) {
          obj.RouteAllowancesDetails =
            this.childTable.RouteAllowancesDetails.items;
          obj.ChargeCost = this.revertCurrency(this.totalChargingStations);
        }
        this.$emit("getDataForm", obj);
      }
    },
    totalChargingStations() {
      this.changeOrderCostChargeStaionConst(
        [
          "NoOverloadTotalCost",
          "NoOverloadCost",
          "NoOverloadSalary",
          "OtherCost",
          "modifyDataForm",
        ],
        [
          "OverloadTotalCost",
          "OverloadCost",
          "OverloadSalary",
          "OtherCost",
          "modifyDataForm",
        ]
      );
    },
  },
  created() {
    this.setUp();
  },
  methods: {
    setUp() {
      this.getSelect("OrderTypes", "OrderTypesName", "OrderTypeID");
      this.getSelect("GoodsTypes", "GoodsTypesName", "GoodsTypeID");
      this.getSelect(
        "ChargingStations",
        "ChargingStationsName",
        "ChargingStationID"
      );

      this.getColTypesChildTable(
        "RouteAllowancesDetails",
        "RouteAllowancesDetails"
      );
      this.getDynamicFormAddChildTable(
        "RouteAllowancesDetails",
        "RouteAllowancesDetails"
      );
    },
    setRoute() {
      if (this.currentMode === "adding" || this.currentMode === "editing") {
        this.$bvModal.show("modal-route-table");
      }
    },
    handleAddRoute(value) {
      this.modifyDataForm.RouteID[1] = value.ID;
      this.modifyDataForm.RoutesCode[1] = value.Code;
      this.modifyDataForm.RoutesName[1] = value.RoutesName;
      this.modifyDataForm.RouteGroupsName[1] = value.RouteGroupsName;
      this.modifyDataForm.Distance[1] = value.Distance;
      this.modifyDataForm = {...this.modifyDataForm}
      this.$bvModal.hide("modal-route-table");
    },
    hiddenModalRoute() {
      this.$bvModal.hide("modal-route-table");
    },
    changeChargingStation(field1, field2, form) {
      this.resetStateInput(field1, form);
      this.resetStateInput(field2, form);
      const value = this[form][field1][1];
      const obj = this.dataFormOptions[field1].find(
        (item) => item.value == value
      );
      this[form][field2][1] = this.convertCurrency(obj.dailyFare);
    },
    changeCost(field1, field2, field3, field4, form) {
      this.resetStateInput(field1, form);
      this.resetStateInput(field2, form);
      this.resetStateInput(field3, form);
      this.resetStateInput(field4, form);

      const numb1 = Number(this.revertCurrency(this[form][field2][1]));
      const numb2 = Number(this.revertCurrency(this[form][field3][1]));
      const numb3 = Number(this.revertCurrency(this[form][field4][1]));
      const numb4 = Number(this.revertCurrency(this.totalChargingStations));

      this[form][field1][1] = this.convertCurrency(
        numb1 + numb2 + numb3 + numb4
      );
      this[form] = { ...this[form] };
    },
    changeOrderCostChargeStaionConst(arr1, arr2) {
      this.changeCost(arr1[0], arr1[1], arr1[2], arr1[3], arr1[4]);
      this.changeCost(arr2[0], arr2[1], arr2[2], arr2[3], arr2[4]);
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
