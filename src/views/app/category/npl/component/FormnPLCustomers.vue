<template>
  <div>
    <template v-if="dataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col xl="7">
            <b-row>
              <b-col lg="2">
                <b-form-group :label="dataForm.Code[0]">
                  <b-form-input
                    :value="dataForm.Code ? dataForm.Code[1] : 'AUTO'"
                    disabled
                    class="text-center"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group
                  :label="dataForm.LemonID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.LemonID[3]"
                >
                  <b-form-input
                    v-model="dataForm.LemonID[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.ShortName[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ShortName[3]"
                >
                  <b-form-input
                    v-model="dataForm.ShortName[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.IsActive[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.IsActive[3]"
                  v-if="dataForm.IsActive"
                >
                  <div class="d-flex">
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="1"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                      >{{ $t("npl.using") }}</b-form-radio
                    >
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="0"
                      class="ml-2"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                      >{{ $t("npl.not-use") }}</b-form-radio
                    >
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.Name[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Name[3]"
                >
                  <b-form-input
                    v-model="dataForm.Name[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.NameExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.NameExtention1[3]"
                >
                  <b-form-input
                    v-model="dataForm.NameExtention1[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.TaxCode[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.TaxCode[3]"
                >
                  <b-form-input
                    v-model="dataForm.TaxCode[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.PhoneNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.PhoneNumber[3]"
                >
                  <b-form-input
                    v-model="dataForm.PhoneNumber[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.Email[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Email[3]"
                >
                  <b-form-input
                    v-model="dataForm.Email[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.City[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.City[3]"
                >
                  <b-form-select
                    v-model="dataForm.City[1]"
                    :options="dataFormOptions.City"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @change="changeCity"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.District[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.District[3]"
                >
                  <b-form-select
                    v-model="dataForm.District[1]"
                    :options="dataFormOptions.District"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @change="changeDistrict"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.Ward[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Ward[3]"
                >
                  <b-form-select
                    v-model="dataForm.Ward[1]"
                    :options="dataFormOptions.Ward"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.Address[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Address[3]"
                >
                  <b-form-input
                    v-model="dataForm.Address[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <!-- <b-col lg="6">
                <b-form-group
                  :label="FullAddress[0]"
                  :invalid-feedback="$t('form.no-blank')"
                >
                  <b-form-input
                    v-model="FullAddress[1]"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col> -->
              <!-- <b-col lg="6">
                <b-form-group
                  :label="FullEnglishAddress[0]"
                  :invalid-feedback="$t('form.no-blank')"
                >
                  <b-form-input
                    v-model="FullEnglishAddress[1]"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col> -->
              <!-- <b-col lg="3">
                <b-form-group
                  :label="dataForm.AddressExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.AddressExtention1[3]"
                >
                  <b-form-input
                    v-model="dataForm.AddressExtention1[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.BankID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.BankID[3]"
                >
                  <b-form-select
                    v-model="dataForm.BankID[1]"
                    :options="dataFormOptions.BankID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.BankNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.BankNumber[3]"
                >
                  <b-form-input
                    v-model="dataForm.BankNumber[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.BankUsername[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.BankUsername[3]"
                >
                  <b-form-input
                    v-model="dataForm.BankUsername[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.EnterpriseEstablishmentDay[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.EnterpriseEstablishmentDay[3]"
                >
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="$t('modal.day-select')"
                    v-model="dataForm.EnterpriseEstablishmentDay[1]"
                    @input="
                      formatDateToServer(
                        dataForm.EnterpriseEstablishmentDay[1],
                        'EnterpriseEstablishmentDay'
                      )
                    "
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.ChairmanBirthday[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ChairmanBirthday[3]"
                >
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="$t('modal.day-select')"
                    v-model="dataForm.ChairmanBirthday[1]"
                    @input="
                      formatDateToServer(
                        dataForm.ChairmanBirthday[1],
                        'ChairmanBirthday'
                      )
                    "
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.OrderBirthday[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.OrderBirthday[3]"
                >
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="$t('modal.day-select')"
                    v-model="dataForm.OrderBirthday[1]"
                    @input="
                      formatDateToServer(
                        dataForm.OrderBirthday[1],
                        'OrderBirthday'
                      )
                    "
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.ManagementRegionID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ManagementRegionID[3]"
                >
                  <b-form-select
                    v-model="dataForm.ManagementRegionID[1]"
                    :options="dataFormOptions.ManagementRegionID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.GoodTypeID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.GoodTypeID[3]"
                >
                  <b-form-select
                    v-model="dataForm.GoodTypeID[1]"
                    :options="dataFormOptions.GoodTypeID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.GroupID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.GroupID[3]"
                >
                  <b-form-select
                    v-model="dataForm.GroupID[1]"
                    :options="dataFormOptions.GroupID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.ContactTypeID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ContactTypeID[3]"
                >
                  <b-form-select
                    v-model="dataForm.ContactTypeID[1]"
                    :options="dataFormOptions.ContactTypeID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.NumberOfDayDebt[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.NumberOfDayDebt[3]"
                >
                  <b-form-input
                    v-model="dataForm.NumberOfDayDebt[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group :label="dataForm.Note[0]">
                  <b-form-textarea
                    v-model="dataForm.Note[1]"
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
              <b-button
                v-if="dataForm.ID"
                @click="resetPassModal"
                variant="outline-danger"
                class="ml-2"
                style="height: 40px; margin-top: 25px"
              >
                <i class="fad fa-sync-alt"></i>
                &emsp;{{ $t("dropdown.reset-password") }}
              </b-button>
            </b-row>
          </b-col>
          <b-col xl="5">
            <ChildTable
              :items="childTable.CustomerContacts.items"
              :fields="
                getFieldsChildTable(
                  childTable.CustomerContacts.keys,
                  childTable.CustomerContacts.colTypes
                )
              "
              :title="getTitleChildTable('CustomerContacts')"
              tableName="CustomerContacts"
              @add="addChildTable"
              @edit="editChildTable"
              @remove="removeChildTable"
            />
            <div class="mt-4">
              <ChildTable
                :items="childTable.CustomerSupports.items"
                :fields="
                  getFieldsChildTable(
                    childTable.CustomerSupports.keys,
                    childTable.CustomerSupports.colTypes
                  )
                "
                :title="getTitleChildTable('CustomerSupports')"
                tableName="CustomerSupports"
                @add="addChildTable"
                @edit="editChildTable"
                @remove="removeChildTable"
              />
            </div>
            <div class="mt-4">
              <ChildTable
                :items="childTable.CustomerInvoices.items"
                :fields="
                  getFieldsChildTable(
                    childTable.CustomerInvoices.keys,
                    childTable.CustomerInvoices.colTypes
                  )
                "
                :title="getTitleChildTable('CustomerInvoices')"
                tableName="CustomerInvoices"
                @add="addChildTable"
                @edit="editChildTable"
                @remove="removeChildTable"
              />
            </div>
            <div class="mt-4" v-if="false">
              <ChildTable
                :items="childTable.CustomerDebits.items"
                :fields="
                  getFieldsChildTable(
                    childTable.CustomerDebits.keys,
                    childTable.CustomerDebits.colTypes
                  )
                "
                :title="getTitleChildTable('CustomerDebits')"
                :readOnly="true"
                tableName="CustomerDebits"
                @add="addChildTable"
                @edit="editChildTable"
                @remove="removeChildTable"
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
      :title="titleModalChildTable"
      size="lg"
      @ok="hanldeChangeChildTable"
      @hidden="hiddenModalChildTable"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <component
        :is="FormChildTable"
        :dataForm="dataFormChildTable"
        :type="typeModalChildTable"
      />
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling.js";

import nplAPI from "@/api/modules/nplAPI";
import systemAPI from "@/api/modules/systemAPI";
import datepickerMixin from "@/views/app/category/npl/mixin/datepickerMixin";
import dataFormOptionsMixin from "@/views/app/category/npl/mixin/dataFormOptionsMixin";

import ChildTable from "@/views/app/category/npl/component/customer/ChildTable";
import CustomerContacts from "@/views/app/category/npl/component/customer/CustomerContacts";
import CustomerSupports from "@/views/app/category/npl/component/customer/CustomerSupports";
import CustomerInvoices from "@/views/app/category/npl/component/customer/CustomerInvoices";

export default {
  props: ["dataForm", "currentMode"],
  mixins: [datepickerMixin, dataFormOptionsMixin],
  components: {
    ChildTable,
    CustomerContacts,
    CustomerSupports,
    CustomerInvoices,
  },
  data() {
    return {
      childTable: {
        CustomerContacts: {
          // title: this.$t("npl.customer-contacts"),
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerSupports: {
          // title: this.$t("npl.customer-supports"),
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerDebits: {
          // title: this.$t("npl.customer-debits"),
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        CustomerInvoices: {
          // title: this.$t("npl.customer-invoices"),
          items: [],
          keys: null,
          colTypes: null,
          columnAdd: null,
        },
        // CustomerAttachments: {
        //   items: [],
        //   keys: null,
        //   colTypes: null,
        //   columnAdd: null,
        // },
      },
      FormChildTable: "",
      dataFormChildTable: null,
      idModalChildTable: "",
      titleModalChildTable: "",
      typeModalChildTable: "", //add or edit
      isCheckIsValid: false,
      notRequired: ["ID", "Note", "NameExtention1", "AddressExtention1"],
    };
  },
  created() {
    this.getCities();
    this.getSelect("Banks", "BanksName", "BankID");
    this.getSelect("nPLCustomerGroups", "nPLCustomerGroupsName", "GroupID");
    this.getSelect("ContactTypes", "ContactTypesName", "ContactTypeID");
    this.getSelect(
      "ManagementRegions",
      "ManagementRegionsName",
      "ManagementRegionID"
    );
    this.getSelect("GoodsTypes", "GoodsTypesName", "GoodTypeID");

    //gọi colType của các childtable
    for (const key in this.childTable) {
      this.getColTypesChildTable(key);
      this.getDynamicFormAddChildTable(key);
    }
  },
  watch: {
    dataForm(newVal) {
      if (newVal) {
        if (newVal.City) {
          this.getDistrictsWardsFirst("District", newVal.City[1]);
        }
        if (newVal.District) {
          this.getDistrictsWardsFirst("Ward", newVal.District[1]);
        }
        if (newVal.ID) {
          for (const key in this.childTable) {
            this.getDataChildTable(key, newVal.ID[1]);
          }
        }
      }
    },
    "$i18n.locale"(to, from) {
      this.getCities();
      this.getSelect("Banks", "BanksName", "BankID");
      this.getSelect("nPLCustomerGroups", "nPLCustomerGroupsName", "GroupID");
      this.getSelect("ContactTypes", "ContactTypesName", "ContactTypeID");
      this.getSelect(
        "ManagementRegions",
        "ManagementRegionsName",
        "ManagementRegionID"
      );
      this.getSelect("GoodsTypes", "GoodsTypesName", "GoodTypeID");

      //gọi colType của các childtable
      for (const key in this.childTable) {
        this.getColTypesChildTable(key);
        this.getDynamicFormAddChildTable(key);
      }
      // this.childTable = [...this.childTable] //--> gán như vậy khi thay đổi ngôn ngữ nó ko có render lại
    },
  },
  methods: {
    formatDateToServer(value, field) {
      this.dataForm[field][1] = moment(value).format("YYYY-MM-DD");
    },
    getCities() {
      let body = {
        Level: 2,
      };
      nplAPI
        .getCities(body)
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
          // this.dataFormOptions.City = newArr;
          this.dataFormOptions = {
            ...this.dataFormOptions,
            City: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    getDistrictsWardsFirst(option, parentID) {
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
            this.dataFormOptions = {
              ...this.dataFormOptions,
              [option]: newArr,
            };
          })
          .catch((err) => console.log(err));
      }
    },
    getDistrictsWards(option, parentID) {
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
            if (newArr.length > 0) {
              //mặc định chọn phần tử đầu tiên trong mảng cho District, hoặc là Ward
              this.dataForm[option][1] = newArr[0].value;
              if (option == "District") {
                this.getDistrictsWards("Ward", newArr[0].value);
              }
            }
            this.dataFormOptions = {
              ...this.dataFormOptions,
              [option]: newArr,
            };
          })
          .catch((err) => console.log(err));
      }
    },
    changeCity(value) {
      this.getDistrictsWards("District", value);
    },
    changeDistrict(value) {
      this.getDistrictsWards("Ward", value);
    },
    getDataChildTable(tableName, CusID) {
      let body = {
        CategoryType: tableName,
        CusID: CusID,
      };
      nplAPI
        .getCustomersDetail(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.childTable[tableName].items = data;
          this.childTable[tableName].keys =
            data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    getColTypesChildTable(tableName) {
      let body = {
        ObjectName: tableName,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.childTable[tableName].colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getChildTableByID(id, isActive, tableName) {
      let body = {
        ID: id,
      };
      nplAPI
        .getCustomersDetailsByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataFormChildTable = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              IsActive: [this.$t("status.status"), isActive, null, null],
            };
            // this.titleModalChildTable = this.childTable[tableName].title;
            this.titleModalChildTable = this.getTitleChildTable(tableName)
            this.typeModalChildTable = "edit"; //add or edit
            this.FormChildTable = tableName;
            this.$bvModal.show("modal-child-table");
            // if (obj.Histories) {
            //   const arr = [];
            //   obj.Histories.forEach((item) => {
            //     arr.push({
            //       ...item,
            //       CreateDate: handling.convertDateTime(item.CreateDate),
            //     });
            //   });
            //   this.dataHistory = arr;
            // }
          } else {
            this.dataFormChildTable = null;
            // this.dataHistory = [];
            // this.dataAttachFile = [];
          }
        })
        .catch((err) => console.log(err));
    },
    getDynamicFormAddChildTable(tableName) {
      let body = {
        ObjectName: tableName,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.childTable[tableName].columnAdd = arr.filter(
            (item) => item.IsHide == 0
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFieldsChildTable(keys, colTypes) {
      let result = handling.mergeKeyDynamic(keys, colTypes);
      if (result) {
        result.forEach((item) => {
          item.sortable = false;
          item.tdClass = item.tdClass.replace("pt-2", "");
        });
        return result;
      }
    },
    addChildTable(tableName) {
      const arr = this.childTable[tableName].columnAdd;
      if (arr && arr.length > 0) {
        let newObj = {};
        arr.forEach((item) => {
          newObj = {
            ...newObj,
            [item.ClName]: [item.ShwName, null, item.TypeCol, null],
          };
        });
        this.dataFormChildTable = { ...newObj };

        // this.titleModalChildTable = this.childTable[tableName].title;
        this.titleModalChildTable = this.getTitleChildTable(tableName)
        this.typeModalChildTable = "add"; //add or edit
        this.FormChildTable = tableName;
        this.$bvModal.show("modal-child-table");
      } else {
        this.dataFormChildTable = null;
      }
    },
    checkIsValid(key) {
      //có bắt đầu kiểm có giá trị
      // let isValid = true
      if (!this.isCheckIsValid) {
        // isValid = true
        return true;
      }
      // const notRequired = ["ID", "Note"];
      if (this.notRequired.includes(key)) {
        // isValid = true
        return true;
      }
      const value = this.dataFormChildTable[key][1];
      // console.log(value);
      if (value || value === 0 || value === false) {
        // isValid = true
        // console.log(key);
        return true;
      } else {
        // isValid = false
        return false;
      }
      // return isValid
    },
    checkFormValidate() {
      // let result = true;
      for (const key in this.dataFormChildTable) {
        // console.log(key);
        let result = this.checkIsValid(key);
        this.dataFormChildTable[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          break;
        }
      }
      this.dataFormChildTable = { ...this.dataFormChildTable }; //--> gán lại để render lại dataFormChildTable
      for (const key in this.dataFormChildTable) {
        if (!this.dataFormChildTable[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    hanldeChangeChildTable(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataFormChildTable) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.dataFormChildTable) {
        obj = {
          ...obj,
          [key]: this.dataFormChildTable[key][1],
        };
      }

      let body = {
        ...obj,
        CusID: this.dataForm.ID[1],
        CategoryType: this.FormChildTable,
      };

      if (body.ID) {
        nplAPI
          .editCustomersDetails(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getDataChildTable(this.FormChildTable, this.dataForm.ID[1]);
              // this.getData();
              // this.getByID(obj.ID, obj.IsActive);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
            this.$bvModal.hide("modal-child-table");
          })
          .catch((err) => console.log(err));
      } else {
        nplAPI
          .addCustomersDetails(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getDataChildTable(this.FormChildTable, this.dataForm.ID[1]);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
            this.$bvModal.hide("modal-child-table");
          })
          .catch((err) => console.log(err));
      }
    },
    hiddenModalChildTable() {
      this.dataFormChildTable = null;
      this.FormChildTable = "";
      this.titleModalChildTable = "";
      this.typeModalChildTable = ""; //add or edit
    },
    editChildTable(obj) {
      this.getChildTableByID(obj.item.ID, obj.item.IsActive, obj.tableName);
    },
    removeChildTable(obj) {
      let body = {
        ID: obj.item.ID,
      };
      nplAPI
        .deleteCustomersDetails(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataChildTable(obj.tableName, this.dataForm.ID[1]);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
    getTitleChildTable(tableName) {
      //làm vậy để khi ngôn ngữ thay đổi nó render lại
      switch (tableName) {
        case "CustomerContacts":
          return this.$t("npl.customer-contacts");
        case "CustomerSupports":
          return this.$t("npl.customer-supports");
        case "CustomerDebits":
          return this.$t("npl.customer-debits");
        case "CustomerInvoices":
          return this.$t("npl.customer-invoices");
        default:
          break;
      }
    },
    resetPassModal() {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-pass") + this.dataForm.Name[1] + "?",
          {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("form.yes"),
            cancelTitle: this.$t("form.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value === true) {
            this.handleSubmitResetPass(this.dataForm.ID[1]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitResetPass(id) {
      let body = {
        ID: id,
      };
      nplAPI
        .resetPasswordCustomer(body)
        .then((val) => {
          if (val.status) {
            this.showNotify(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          } else {
            this.showNotify(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss"></style>
