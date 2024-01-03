<template>
  <div class="form-oil">
    <template v-if="modifyDataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="4">
            <b-row>
              <b-col lg="8">
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
            </b-row>
            <b-row>
              <b-col lg="8">
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
              <b-col lg="4">
                <div
                  v-if="
                    modifyDataForm.IsActive && modifyDataForm.IsActive[1] == 1
                  "
                  class="img-lock"
                  style="margin-top: 27px;"
                >
                  <img
                    src="/assets/img/npl/img-lock.png"
                    alt=""
                    style="height: 60px; width: 100%"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <ChildTable
                  :title="$t('npl.OilAllowancesVehicles')"
                  :items="childTable.OilAllowancesVehicles.items"
                  :fields="getFieldsChildTable('OilAllowancesVehicles')"
                  :currentMode="currentMode"
                  tableName="OilAllowancesVehicles"
                  :formatCurrency="formatCurrency"
                  :formatDecimal="formatDecimal"
                  @add="addChildTable"
                  @edit="editChildTable"
                  @remove="removeChildTable"
                />
              </b-col>
            </b-row>
            <!-- <b-row>
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
            </b-row> -->
          </b-col>
          <b-col lg="8">
            <b-row>
              <b-col lg="6">
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
              <b-col lg="3">
                <b-form-group
                  :label="modifyDataForm.Cranes[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.Cranes[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.Cranes[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="modifyDataForm.NoCranes[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.NoCranes[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.NoCranes[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div>
                  <ChildTable
                    :title="$t('npl.OilAllowancesRoutes')"
                    :items="childTable.OilAllowancesRoutes.items"
                    :fields="getFieldsChildTable('OilAllowancesRoutes')"
                    :currentMode="currentMode"
                    tableName="OilAllowancesRoutes"
                    :formatCurrency="formatCurrency"
                    :formatDecimal="formatDecimal"
                    @add="addChildTable"
                    @edit="editChildTable"
                    @remove="removeChildTable"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col lg="6">
                <div class="text-info text-uppercase">
                  <strong>{{ "*" + $t("npl.not-cont-allowance") }}</strong>
                </div>
                <div class="mt-0">
                  <ChildTable
                    :title="$t('npl.detail-of-goods')"
                    :items="childTable.NotOverloadNotContGoodTypes.items"
                    :fields="getFieldsChildTable('NotOverloadNotContGoodTypes')"
                    :currentMode="currentMode"
                    tableName="NotOverloadNotContGoodTypes"
                    :formatCurrency="formatCurrency"
                    :formatDecimal="formatDecimal"
                    :isShowTitleNomal="true"
                    :otherValue="modifyDataForm.NotOverloadNotCont[1]"
                    @add="addChildTable"
                    @edit="editChildTable"
                    @remove="removeChildTable"
                    @changeOtherValue="changeOtherValue"
                  />
                </div>
                <div class="mt-3">
                  <ChildTable
                    :title="$t('npl.detail-of-overload-goods')"
                    :items="childTable.OverloadNotContGoodTypes.items"
                    :fields="getFieldsChildTable('OverloadNotContGoodTypes')"
                    :currentMode="currentMode"
                    tableName="OverloadNotContGoodTypes"
                    :formatCurrency="formatCurrency"
                    :formatDecimal="formatDecimal"
                    :isShowTitleNomal="true"
                    :otherValue="modifyDataForm.OverloadNotCont[1]"
                    @add="addChildTable"
                    @edit="editChildTable"
                    @remove="removeChildTable"
                    @changeOtherValue="changeOtherValue"
                  />
                </div>
              </b-col>
              <b-col lg="6">
                <div class="text-info text-uppercase">
                  <strong>{{ "*" + $t("npl.cont-allowance") }}</strong>
                </div>
                <div class="mt-0">
                  <ChildTable
                    :title="$t('npl.detail-of-goods')"
                    :items="childTable.NotOverloadContGoodTypes.items"
                    :fields="getFieldsChildTable('NotOverloadContGoodTypes')"
                    :currentMode="currentMode"
                    tableName="NotOverloadContGoodTypes"
                    :formatCurrency="formatCurrency"
                    :formatDecimal="formatDecimal"
                    :isShowTitleNomal="true"
                    :otherValue="modifyDataForm.NotOverloadCont[1]"
                    @add="addChildTable"
                    @edit="editChildTable"
                    @remove="removeChildTable"
                    @changeOtherValue="changeOtherValue"
                  />
                </div>
                <div class="mt-3">
                  <ChildTable
                    :title="$t('npl.detail-of-overload-goods')"
                    :items="childTable.OverloadContGoodTypes.items"
                    :fields="getFieldsChildTable('OverloadContGoodTypes')"
                    :currentMode="currentMode"
                    tableName="OverloadContGoodTypes"
                    :formatCurrency="formatCurrency"
                    :formatDecimal="formatDecimal"
                    :isShowTitleNomal="true"
                    :otherValue="modifyDataForm.OverloadCont[1]"
                    @add="addChildTable"
                    @edit="editChildTable"
                    @remove="removeChildTable"
                    @changeOtherValue="changeOtherValue"
                  />
                </div>
              </b-col>
              <b-col lg="12"> </b-col>
            </b-row>
            <b-row> </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <b-row>
              <!-- <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.NotOverloadCont[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.NotOverloadCont[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.NotOverloadCont[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.NotOverloadNotCont[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.NotOverloadNotCont[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.NotOverloadNotCont[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col> -->
            </b-row>
          </b-col>
          <b-col lg="6">
            <b-row>
              <!-- <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.OverloadCont[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.OverloadCont[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.OverloadCont[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="modifyDataForm.OverloadNotCont[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="modifyDataForm.OverloadNotCont[3]"
                >
                  <b-form-input
                    v-model="modifyDataForm.OverloadNotCont[1]"
                    class="text-right"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-col> -->
              <!-- <b-col lg="12">
                <ChildTable
                  :title="$t('npl.OverloadNotContGoodTypes')"
                  :items="childTable.OverloadNotContGoodTypes.items"
                  :fields="getFieldsChildTable('OverloadNotContGoodTypes')"
                  :currentMode="currentMode"
                  tableName="OverloadNotContGoodTypes"
                  :formatCurrency="formatCurrency"
                  :formatDecimal="formatDecimal"
                  @add="addChildTable"
                  @edit="editChildTable"
                  @remove="removeChildTable"
                />
              </b-col>
              <b-col lg="12" class="mt-3">
                <ChildTable
                  :title="$t('npl.OverloadContGoodTypes')"
                  :items="childTable.OverloadContGoodTypes.items"
                  :fields="getFieldsChildTable('OverloadContGoodTypes')"
                  :currentMode="currentMode"
                  tableName="OverloadContGoodTypes"
                  :formatCurrency="formatCurrency"
                  :formatDecimal="formatDecimal"
                  @add="addChildTable"
                  @edit="editChildTable"
                  @remove="removeChildTable"
                />
              </b-col> -->
            </b-row>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col lg="6" class="mt-3">
            <ChildTable
              :title="$t('npl.OilAllowancesRoutes')"
              :items="childTable.OilAllowancesRoutes.items"
              :fields="getFieldsChildTable('OilAllowancesRoutes')"
              :currentMode="currentMode"
              tableName="OilAllowancesRoutes"
              :formatCurrency="formatCurrency"
              :formatDecimal="formatDecimal"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
            />
          </b-col>
        </b-row> -->
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
        <template
          v-if="
            tableName === 'NotOverloadNotContGoodTypes' ||
            tableName === 'NotOverloadContGoodTypes' ||
            tableName === 'OverloadNotContGoodTypes' ||
            tableName === 'OverloadContGoodTypes'
          "
        >
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
                  @input="
                    changeGoodsType(
                      'GoodsTypeID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  @change="
                    changeGoodsType(
                      'GoodsTypeID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.OldQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.OldQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.OldQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.NewQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.NewQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.NewQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
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
                  disabled
                  type="number"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        <template v-else-if="tableName === 'OilAllowancesRoutes'">
          <b-row>
            <b-col lg="8">
              <b-form-group
                :label="formModalAdd.RouteID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.RouteID[3]"
              >
                <v-select
                  v-model="formModalAdd.RouteID[1]"
                  :options="dataFormOptions.RouteID"
                  :reduce="(item) => item.value"
                  @input="
                    changeRoute(
                      'RouteID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  @change="
                    changeRoute(
                      'RouteID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.RouteCode[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.RouteCode[3]"
              >
                <b-form-input v-model="formModalAdd.RouteCode[1]" disabled />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.OldQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.OldQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.OldQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.NewQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.NewQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.NewQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
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
                  disabled
                  type="number"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        <template v-else-if="tableName === 'OilAllowancesVehicles'">
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.VehicleID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.VehicleID[3]"
              >
                <v-select
                  v-model="formModalAdd.VehicleID[1]"
                  :options="dataFormOptions.VehicleID"
                  :reduce="(item) => item.value"
                  @input="
                    changeVehicle(
                      'VehicleID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  @change="
                    changeVehicle(
                      'VehicleID',
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.VehicleTypeName[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.VehicleTypeName[3]"
              >
                <b-form-input
                  v-model="formModalAdd.VehicleTypeName[1]"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.OldQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.OldQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.OldQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="formModalAdd.NewQuota[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="formModalAdd.NewQuota[3]"
              >
                <b-form-input
                  v-model="formModalAdd.NewQuota[1]"
                  class="text-right"
                  @input="
                    changeAllowance(
                      'OldQuota',
                      'NewQuota',
                      'Deviant',
                      'formModalAdd'
                    )
                  "
                  type="number"
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
                  disabled
                  type="number"
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
import nplAPI from "@/api/modules/nplAPI";
import formMixin from "@/views/app/function/npl/kinh-doanh/mixin/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      notRequiredChildTable: [
        "GoodsTypeName",
        "RouteName",
        "Deviant",
        "Action",
        "Note",
      ],
      childTable: {
        NotOverloadNotContGoodTypes: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        NotOverloadContGoodTypes: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        OverloadNotContGoodTypes: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        OverloadContGoodTypes: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        OilAllowancesRoutes: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
        OilAllowancesVehicles: {
          items: [],
          objectKeys: [],
          colTypes: [],
          columnAdd: [],
        },
      },
    };
  },
  created() {
    this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
    // this.getSelect("GoodsTypes", "GoodsTypesName", "GoodTypeID");
    this.getSelect("GoodsTypes", "GoodsTypesName", "GoodsTypeID");
    this.getRoute();
    this.getVehicle();
    for (let key in this.childTable) {
      this.getColTypesChildTable(key, key);
      this.getDynamicFormAddChildTable(key, key);
    }
  },
  watch: {
    "$i18n.locale"() {
      this.getSelect("VehicleGroups", "VehicleGroupsName", "VehicleGroupID");
      // this.getSelect("GoodsTypes", "GoodsTypesName", "GoodTypeID");
      this.getSelect("GoodsTypes", "GoodsTypesName", "GoodsTypeID");
      this.getRoutes();
      this.getVehicle();
      for (let key in this.childTable) {
        this.getColTypesChildTable(key, key);
        this.getDynamicFormAddChildTable(key, key);
      }
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
        if (newVal && newVal.length > 0) {
          newVal.forEach((obj) => {
            const key = Object.keys(obj)[0];
            const arr = obj[key];
            const newArr = [];
            arr.forEach((item) => {
              newArr.push({
                ...item,
                ID: this.randomString(10),
              });
            });
            const objectKeys = newArr.length > 0 ? Object.keys(newArr[0]) : [];
            this.childTable[key].items = newArr;
            this.childTable[key].objectKeys = objectKeys;
          });
        } else {
          for (let key in this.childTable) {
            this.childTable[key].items = [];
          }
        }
      }
    },
    isTakeDataForm(newVal) {
      if (newVal) {
        const obj = this.customDataFormToServer(this.modifyDataForm);
        if (obj) {
          for (const key in this.childTable) {
            obj[key] = this.childTable[key].items;
          }
        }
        this.$emit("getDataForm", obj);
      }
    },
  },
  methods: {
    getRoute() {
      nplAPI
        .getRoutesActive()
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              newArr.push({
                label: item.RoutesName,
                value: item.ID,
                code: item.Code,
              });
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            RouteID: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    getVehicle() {
      let body = {
        CategoryType: "Vehicles",
      };
      nplAPI
        .getVehiclesListActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              newArr.push({
                label: item.LicensePlates,
                value: item.ID,
                vehicleTypeName: item.VehicleTypeName,
              });
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            VehicleID: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    changeAllowance(field1, field2, field3, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      if (this[form][field2][3] === false) {
        this[form][field2][3] = true;
      }
      if (this[form][field3][3] === false) {
        this[form][field3][3] = true;
      }

      let numberA = this[form][field1][1] || 0;
      let numberB = this[form][field2][1] || 0;
      let numberC = Math.abs(parseFloat(numberA) - parseFloat(numberB));
      this[form][field3][1] = numberC;
    },
    changeGoodsType(field1, field2, field3, field4, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      let body = {
        GoodsTypeID: this[form][field1][1].toString(),
      };
      //OrderTypeID : 0 là hàng rời, 1 là hàng cont
      switch (this.tableName) {
        case "NotOverloadNotContGoodTypes":
          body.IsOverload = 0;
          body.OrderTypeID = 0;
          break;
        case "NotOverloadContGoodTypes":
          body.IsOverload = 0;
          body.OrderTypeID = 1;
          break;
        case "OverloadNotContGoodTypes":
          body.IsOverload = 1;
          body.OrderTypeID = 0;
          break;
        case "OverloadContGoodTypes":
          body.IsOverload = 1;
          body.OrderTypeID = 1;
          break;

        default:
          break;
      }
      nplAPI
        .oilAllowancesGoodsTypes(body)
        .then((val) => {
          this[form][field2][1] = val.status ? val.data[0].OldQuota : 0;
          this.changeAllowance(field2, field3, field4, form);
          this[form] = { ...this[form] };
        })
        .catch((err) => console.log(err));
    },
    changeRoute(field1, field2, field3, field4, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      let body = {
        RouteID: this[form][field1][1].toString(),
      };
      nplAPI
        .oilAllowancesRoutes(body)
        .then((val) => {
          const value = this[form][field1][1];
          const obj = this.dataFormOptions.RouteID.find(
            (item) => item.value == value
          );
          // this[form].Code[1] = obj.vehicleTypeName
          this[form].RouteCode[1] = obj.code;

          this[form][field2][1] = val.status ? val.data[0].OldQuota : 0;
          this.changeAllowance(field2, field3, field4, form);
          this[form] = { ...this[form] };
        })
        .catch((err) => console.log(err));
    },
    changeVehicle(field1, field2, field3, field4, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      let body = {
        VehicleID: this[form][field1][1].toString(),
      };
      nplAPI
        .oilAllowancesVehicles(body)
        .then((val) => {
          const value = this[form][field1][1];
          const obj = this.dataFormOptions.VehicleID.find(
            (item) => item.value == value
          );
          this[form].VehicleTypeName[1] = obj.vehicleTypeName;
          this[form].LicensePlates[1] = obj.label

          this[form][field2][1] = val.status ? val.data[0].OldQuota : 0;
          this.changeAllowance(field2, field3, field4, form);
          this[form] = { ...this[form] };
          // vehicleTypeName
        })
        .catch((err) => console.log(err));
    },
    changeOtherValue(obj) {
      switch (obj.tableName) {
        case "NotOverloadNotContGoodTypes":
          this.modifyDataForm.NotOverloadNotCont[1] = obj.value;
          break;
        case "NotOverloadContGoodTypes":
          this.modifyDataForm.NotOverloadCont[1] = obj.value;
          break;
        case "OverloadNotContGoodTypes":
          this.modifyDataForm.OverloadNotCont[1] = obj.value;
          break;
        case "OverloadContGoodTypes":
          this.modifyDataForm.OverloadCont[1] = obj.value;
          break;
        default:
          break;
      }
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
.form-oil {
  .frame-input-special {
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
