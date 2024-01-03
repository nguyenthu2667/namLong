<template>
  <div class="modal-table-route">
    <b-tabs v-model="currentTab">
      <b-tab :title="$t('npl.list-route')">
        <div class="mt-3">
          <b-table
            id="npl-table-basic-form"
            class="npl-table-basic-form border-bottom"
            :fields="fieldsTable"
            :items="dataTable"
            bordered
            responsive
            show-empty
            head-variant="light"
            selectable
            :select-mode="'single'"
            @row-dblclicked="handleDbClick"
            @row-selected="rowSelected"
          >
            <template #cell(IsActive)="row">
              <div class="d-flex justify-content-center">
                <div style="width: 90px">
                  <Status
                    :color="row.item.IsActive ? 'green' : 'gray'"
                    :label="
                      row.item.IsActive ? $t('npl.using') : $t('npl.not-use')
                    "
                    :showCircle="false"
                  ></Status>
                </div>
              </div>
            </template>
            <template #cell(Action)="row">
              <div class="btn-action">
                <i class="fas fa-edit text-black" @click="handleEdit(row.item)"></i>
                <!-- <i
                class="fad fa-trash-alt text-danger"
                @click="remove(row.item)"
              ></i> -->
              </div>
            </template>
            <!-- <template
              v-for="(field, index) in fields"
              v-slot:[`cell(${field.key})`]="row"
            >
              <template v-if="field.key.toUpperCase() === 'ODATE'">
                {{ convertDate(row.item[field.key]) }}
              </template>
              <template v-else-if="field.key.toUpperCase() === 'ISATTACHFILE'">
                <template v-if="row.item.IsAttachFile">
                  <div :key="index" class="text-center">
                    <span style="color: limegreen">✔</span>
                  </div>
                </template>
                <template v-else>
                  <div :key="index" class="text-center">
                    <span style="color: red">✘</span>
                  </div>
                </template>
              </template>
              <template v-else-if="field.key.toUpperCase() === 'ISACTIVE'">
                <div :key="index" class="d-flex justify-content-center">
                  <div style="width: 90px">
                    <Status
                      :color="row.item.IsActive ? 'green' : 'gray'"
                      :label="
                        row.item.IsActive ? $t('npl.locked') : $t('npl.not-lock')
                      "
                      :showCircle="false"
                    ></Status>
                  </div>
                </div>
              </template>
              <template v-else-if="field.typeCol.toUpperCase() == 'MONEY'">
                {{ convertCurrency(row.item[field.key]) }}
              </template>
              <template v-else>
                {{ row.item[field.key] }}
              </template>
            </template> -->
            <template #empty>
              <div class="text-center font-italic text-muted">
                {{ $t("data.non-data") }}
              </div>
            </template>
          </b-table>
        </div>
      </b-tab>
      <b-tab :title="$t('npl.create-edit')" @click="handleAdd">
        <template v-if="dataForm">
          <b-row class="mt-3">
            <b-col lg="2">
              <b-form-group :label="dataForm.ID ? dataForm.ID[0] : 'ID'">
                <b-form-input
                  :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                  disabled
                  class="text-center"
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
                  <b-form-radio v-model="dataForm.IsActive[1]" :value="1">{{
                    $t("npl.using")
                  }}</b-form-radio>
                  <b-form-radio
                    v-model="dataForm.IsActive[1]"
                    :value="0"
                    class="ml-2"
                    >{{ $t("npl.not-use") }}</b-form-radio
                  >
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <b-form-group
                :label="dataForm.StartCityID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.StartCityID[3]"
              >
                <v-select
                  v-model="dataForm.StartCityID[1]"
                  :options="dataFormOptions.StartCityID"
                  :reduce="(item) => item.value"
                  @input="
                    changeRegion('StartCityID', 'StartDistrictID', 'dataForm')
                  "
                  @change="
                    changeRegion('StartCityID', 'StartDistrictID', 'dataForm')
                  "
                />
              </b-form-group>
              <b-form-group
                :label="dataForm.StartDistrictID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.StartDistrictID[3]"
              >
                <v-select
                  v-model="dataForm.StartDistrictID[1]"
                  :options="dataFormOptions.StartDistrictID"
                  :reduce="(item) => item.value"
                  @input="
                    changeRegion('StartDistrictID', 'StartWardID', 'dataForm')
                  "
                  @change="
                    changeRegion('StartDistrictID', 'StartWardID', 'dataForm')
                  "
                />
              </b-form-group>
              <b-form-group
                :label="dataForm.StartWardID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.StartWardID[3]"
              >
                <v-select
                  v-model="dataForm.StartWardID[1]"
                  :options="dataFormOptions.StartWardID"
                  :reduce="(item) => item.value"
                  @input="autoCombine('dataForm')"
                  @change="autoCombine('dataForm')"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group
                :label="dataForm.EndCityID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.EndCityID[3]"
              >
                <v-select
                  v-model="dataForm.EndCityID[1]"
                  :options="dataFormOptions.EndCityID"
                  :reduce="(item) => item.value"
                  @input="
                    changeRegion('EndCityID', 'EndDistrictID', 'dataForm')
                  "
                  @change="
                    changeRegion('EndCityID', 'EndDistrictID', 'dataForm')
                  "
                />
              </b-form-group>
              <b-form-group
                :label="dataForm.EndDistrictID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.EndDistrictID[3]"
              >
                <v-select
                  v-model="dataForm.EndDistrictID[1]"
                  :options="dataFormOptions.EndDistrictID"
                  :reduce="(item) => item.value"
                  @input="
                    changeRegion('EndDistrictID', 'EndWardID', 'dataForm')
                  "
                  @change="
                    changeRegion('EndDistrictID', 'EndWardID', 'dataForm')
                  "
                />
              </b-form-group>
              <b-form-group
                :label="dataForm.EndWardID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.EndWardID[3]"
              >
                <v-select
                  v-model="dataForm.EndWardID[1]"
                  :options="dataFormOptions.EndWardID"
                  :reduce="(item) => item.value"
                  @input="autoCombine('dataForm')"
                  @change="autoCombine('dataForm')"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="8">
              <b-form-group
                :label="dataForm.Code[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Code[3]"
              >
                <b-form-input
                  v-model="dataForm.Code[1]"
                  @input="resetStateInput('Code', 'dataForm')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group
                :label="dataForm.LemonID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.LemonID[3]"
              >
                <b-form-input
                  v-model="dataForm.LemonID[1]"
                  @input="resetStateInput('LemonID', 'dataForm')"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group
                :label="dataForm.RouteGroupID[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.RouteGroupID[3]"
              >
                <v-select
                  v-model="dataForm.RouteGroupID[1]"
                  :options="dataFormOptions.RouteGroupID"
                  :reduce="(item) => item.value"
                  @input="resetStateInput('RouteGroupID', 'dataForm')"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group
                :label="dataForm.Distance[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Distance[3]"
              >
                <b-form-input
                  v-model="dataForm.Distance[1]"
                  @input="resetStateInput('Distance', 'dataForm')"
                  class="text-right"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-form-group
                :label="dataForm.Name[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Name[3]"
              >
                <b-form-input
                  v-model="dataForm.Name[1]"
                  @input="resetStateInput('Name', 'dataForm')"
                  @change="resetStateInput('Name', 'dataForm')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <div>
                <b-form-group :label="dataForm.Note[0]">
                  <b-form-textarea
                    v-model="dataForm.Note[1]"
                    rows="2"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
        </template>
      </b-tab>
    </b-tabs>
    <template v-if="currentTab == 0">
      <div class="d-flex justify-content-end">
        <b-button variant="outline-danger" size="sm" @click="hiddenModal">
          {{ $t("modal.cancel") }}
        </b-button>
        <b-button variant="primary" size="sm" class="d-inline-block ml-2" @click="chooseRoute">
          {{ $t("modal.change") }} 
        </b-button>;
      </div>
    </template>
    <template v-else>
      <div class="d-flex justify-content-end">
        <b-button variant="primary" size="sm" @click="handleSave">
          {{ $t("action.save") }}
        </b-button>
      </div>
    </template>
  </div>
</template>

<script>
import handling from "@/constants/handling.js";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";

import vSelect from "vue-select";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  // props: ["fields", "items", "columnAdd"],
  components: {
    "v-select": vSelect,
    Status,
  },
  data() {
    return {
      currentTab: 0,
      dataTable: [],
      objectKeys: [],
      colTypes: [],
      columnAdd: [],
      dataForm: null,
      isCheckIsValid: false,
      dataFormOptions: {
        StartCityID: [],
        StartDistrictID: [],
        StartWardID: [],
        EndCityID: [],
        EndDistrictID: [],
        EndWardID: [],
      },
      selectedStartCity: "",
      selectedStartDistrict: "",
      selectedEndCity: "",
      selectedEndDistrict: "",
      notRequired: [
        "ID",
        "Note",
        "NameExtention1",
        "AddressExtention1",
        "EntryID",
      ],
      checkRouteID: '',
      selectedRoute: '',
    };
  },
  computed: {
    fieldsTable() {
      if (this.objectKeys.length > 0 && this.colTypes.length > 0) {
        let result = handling.mergeKeyDynamic(this.objectKeys, this.colTypes);
        result.forEach((item) => {
          if (item.key.toUpperCase() === "ODATE") {
            item.sortable = false;
            item.typeCol = "date";
          } else {
            item.sortable = false;
            item.tdClass = item.tdClass.replace("pt-2", "");
          }
        });
        return [
          ...result,
          {
            key: "Action",
            label: this.$t("npl.action"),
            type: "Action",
            thClass: "text-center",
            tdClass: "text-center",
          },
        ];
      }
      return []
    },
  },
  watch: {
    "$i18n.locale"() {
      this.getData();
      this.getColTypes("nPLRoutes");
      this.getDynamicFormAdd("nPLRoutes");

      this.getSelect("RouteGroups", "RouteGroupsName", "RouteGroupID");
      this.getCities("StartCityID");
      this.getCities("EndCityID");
    },
    dataForm(newVal) {
      if (newVal) {
        if (newVal?.StartCityID[1]) {
          this.getDistrictsWardsFirst("StartDistrictID", newVal.StartCityID[1]);
          this.getDistrictsWardsFirst("EndDistrictID", newVal.EndCityID[1]);
        }
        if (newVal?.StartDistrictID[1]) {
          this.getDistrictsWardsFirst("StartWardID", newVal.StartDistrictID[1]);
          this.getDistrictsWardsFirst("EndWardID", newVal.EndDistrictID[1]);
        }
      }
    },
    currentTab() {
      this.isCheckIsValid = false;
      this.checkRouteID = ''
      this.selectedRoute = ''
      if(this.currentTab == 0) {
        this.dataForm = null
      }
    },
  },
  created() {
    this.getData();
    this.getColTypes("nPLRoutes");
    this.getDynamicFormAdd("nPLRoutes");

    this.getSelect("RouteGroups", "RouteGroupsName", "RouteGroupID");
    this.getCities("StartCityID");
    this.getCities("EndCityID");
  },
  methods: {
    getData() {
      nplAPI
        .getRoutesList()
        .then((val) => {
          // this.dataTable = val.status ? val.data : [];
          const arr = val.status ? val.data : [];
          this.dataTable = arr;
          this.objectKeys = arr.length > 0 ? Object.keys(arr[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDynamicFormAdd(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.columnAdd = arr.filter((item) => item.IsHide == 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getByID(id) {
      let body = {
        ID: id,
      };
      nplAPI
        .getRoutesByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              IsActive: [this.$t("status.status"), obj.IsActive, null, null],
            };
            this.currentTab = 1
          } else {
            this.dataForm = null;
          }
        })
        .catch((err) => console.log(err));
    },
    resetStateInput(field, form) {
      //reset lại state khi có input để nó mất cái dòng cảnh báo đi
      if (this[form][field][3] === false) {
        this[form][field][3] = true;
      }
    },
    handleDbClick() {},
    rowSelected(row) {
      // this.$emit("rowSelected", row[0]);
      this.selectedRoute = row[0]
    },
    edit(item) {
      this.$emit("edit", item);
    },
    remove(item) {
      this.$emit("remove", item);
    },
    getCities(option) {
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
                  label: item.nPLRegionsName,
                  value: item.ID,
                };
                newArr.push(obj);
              }
            });
          }
          // this.dataFormOptions.City = newArr;
          this.dataFormOptions = {
            ...this.dataFormOptions,
            [option]: newArr,
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
                    label: item.nPLRegionsName,
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
                    label: item.nPLRegionsName,
                    value: item.ID,
                  };
                  newArr.push(obj);
                }
              });
            }
            if (newArr.length > 0) {
              //mặc định chọn phần tử đầu tiên trong mảng cho District, hoặc là Ward
              this.dataForm[option][1] = newArr[0].value;
              if (option == "StartDistrictID") {
                this.getDistrictsWards("StartWardID", newArr[0].value);
              } else if (option == "EndDistrictID") {
                this.getDistrictsWards("EndWardID", newArr[0].value);
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
    handleAdd() {
      if (this.columnAdd && this.columnAdd.length > 0) {
        let newObj = {};
        this.columnAdd.forEach((item) => {
          newObj = {
            ...newObj,
            [item.ClName]: [item.ShwName, "", item.TypeCol, null],
          };
        });
        this.dataForm = { ...newObj };
      } else {
        this.dataForm = null;
      }
    },
    handleEdit(item) {
      this.getByID(item.ID)
    },
    getSelect(type, nameKey, option) {
      let body = {
        CategoryType: type,
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              if (type == "GoodsTypes") {
                newArr.push({
                  label: item[nameKey],
                  value: Number(item.ID),
                });
              }
              if (type == "MaintenanceJobs") {
                newArr.push({
                  label: item[nameKey],
                  value: item.ID,
                  supplies: item.MaintenanceSuppliesName,
                  supplyAmount: item.MaintenanceSupplyAmount,
                });
              } else {
                newArr.push({
                  label: item[nameKey],
                  value: item.ID,
                });
              }
            });
          }
          // this.dataFormOptions[option] = newArr //--> cái này có khi nó sẽ ko cập nhật lại
          this.dataFormOptions = {
            ...this.dataFormOptions,
            [option]: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    changeRegion(field1, field2, form) {
      if (this[form][field1][3] === false) {
        this[form][field1][3] = true;
      }
      const value = this[form][field1][1];
      this.getDistrictsWards(field2, value);
      this.autoCombine(form);
    },
    autoCombine(form) {
      setTimeout(() => {
        const StartCityID = this[form]?.StartCityID[1] || "";
        const StartDistrictID = this[form]?.StartDistrictID[1] || "";
        const StartWardID = this[form]?.StartWardID[1] || "";
        const EndCityID = this[form]?.EndCityID[1] || "";
        const EndDistrictID = this[form]?.EndDistrictID[1] || "";
        const EndWardID = this[form]?.EndWardID[1] || "";
        if (
          StartCityID &&
          StartDistrictID &&
          StartWardID &&
          EndCityID &&
          EndDistrictID &&
          EndWardID
        ) {
          let body = {
            StartCityID,
            StartDistrictID,
            StartWardID,
            EndCityID,
            EndDistrictID,
            EndWardID,
          };

          nplAPI
            .checkRoutes(body)
            .then((val) => {
              let data = val.status ? val.data[0] : null;
              if (data) {
                this.checkRouteID = data.RouteID //nếu 0 là ko có trong hệ thống
                this[form].Code[1] = data.RouteCode;
                this[form].Name[1] = data.Name;
                this[form].Distance[1] = data.Distance;
                if(data.RouteGroupID == 0) {
                  this[form].RouteGroupID[1] = ''
                }
                else {
                  this[form].RouteGroupID[1] = data.RouteGroupID.toString();
                }
                this[form] = { ...this[form] };
              }
            })
            .catch((err) => console.log(err));
        }
      }, 500);
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
      const value = this.dataForm[key][1];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return true;
        } else {
          return false;
        }
      }
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
      for (const key in this.dataForm) {
        // console.log(key);
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          // break;
        }
      }
      this.dataForm = { ...this.dataForm }; //--> gán lại để render lại dataForm
      for (const key in this.dataForm) {
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    handleSave() {
      if (!this.dataForm) return null;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.dataForm) {
        obj = {
          ...obj,
          [key]: this.dataForm[key][1],
        };
      }

      let body = {
        ...obj,
        RouteID: this.checkRouteID
      };

      if (body.ID) {
        nplAPI
          .editRoutes(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.currentTab = 0;
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        nplAPI
          .addRoutes(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.currentTab = 0;
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
    hiddenModal() {
      this.$emit('hidden')
    },
    chooseRoute(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.selectedRoute) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("npl.no-device-to-add")
        );
      }
      if(this.selectedRoute && this.selectedRoute.IsActive == 0) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("npl.no-choose-not-use")
        );
      }
      this.$emit('chooseRoute', this.selectedRoute)
    },
  },
};
</script>

<style lang="scss">
.modal-table-route {
  td {
    vertical-align: middle;
  }
}
</style>