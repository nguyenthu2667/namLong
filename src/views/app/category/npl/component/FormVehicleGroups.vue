<template>
  <div>
    <template v-if="dataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="3">
            <b-row>
              <b-col lg="6">
                <b-form-group label="ID">
                  <b-form-input
                    :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                    disabled
                    class="text-center"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
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
            </b-row>
            <b-row>
              <b-col lg="12">
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
              <b-col lg="12">
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
              <b-col lg="12">
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
              <b-col lg="12">
                <b-form-group
                  :label="dataForm.UserID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.UserID[3]"
                >
                  <b-form-select
                    v-model="dataForm.UserID[1]"
                    :options="dataFormOptions.UserID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="12">
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
            </b-row>
          </b-col>
          <b-col lg="9">
            <strong class="text-uppercase text-info">
              {{ $t("npl.vehicle-group.detail-vehicle") }}
            </strong>
            <b-table
              id="npl-table-basic-form"
              class="npl-table-basic-form border-bottom"
              :fields="fieldsTable"
              :items="dataTable"
              bordered
              head-variant="light"
              sticky-header
              style="max-height: 67vh"
            >
              <template #cell(IsSelected)="row">
                <b-form-checkbox
                  v-model="row.item.IsSelected"
                  :value="1"
                  :unchecked-value="0"
                  @change="(value) => changeChoose(value, row.item)"
                />
              </template>
              <template #empty>
                <div class="text-center font-italic text-muted">
                  {{ $t("data.non-data") }}
                </div>
              </template>
            </b-table>
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
import handling from "@/constants/handling.js";
import nplAPI from "@/api/modules/nplAPI";
import systemAPI from "@/api/modules/systemAPI";

import dataFormOptions from "../mixin/dataFormOptionsMixin";

export default {
  props: ["dataForm", "currentMode", "CategoryType"],
  mixins: [dataFormOptions],
  data() {
    return {
      colTypes: [],
      objectKeys: [],
      dataTable: [],
    };
  },
  computed: {
    fieldsTable() {
      if (this.objectKeys.length > 0 && this.colTypes.length > 0) {
        let result = handling.mergeKeyDynamic(this.objectKeys, this.colTypes);
        result.forEach((item) => {
          if (
            item.key === "LemonID" ||
            item.key === "Note" ||
            item.key === "IsActive"
          ) {
            item.sortable = false;
            item.thClass = "d-none";
            item.tdClass = "d-none";
          } else {
            item.sortable = false;
            item.tdClass = item.tdClass.replace("pt-2", "");
          }
        });
        // return result;
        return [
          {
            key: "IsSelected",
            label: this.$t("choose"),
            thClass: "text-center",
            tdClass: "text-center",
          },
          ...result,
        ];
      }
    },
  },
  created() {
    this.getSelect();
    this.getColTypes("Vehicles");
  },
  watch: {
    "$i18n.locale"(to, from) {
      this.getSelect();
      this.getColTypes("Vehicles");
    },
    dataForm(newVal) {
      if (newVal && newVal.ID[1]) {
        // this.dataTable = []
        this.getDataVehicle(newVal.ID[1]);
      }
    },
    
  },
  methods: {
    getSelect() {
      nplAPI
        .getUserList()
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            const dataIsActive = data.filter((item) => item.IsActive == 1);
            dataIsActive.forEach((item) => {
              const obj = {
                text: item.UserFullName,
                value: item.UserID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            UserID: newArr,
          };
          // this.dataFormOptions.UserID = newArr
        })
        .catch((err) => console.log(err));
    },
    getDataVehicle(id) {
      let body = {
        TeamVehicleID: id,
      };
      nplAPI
        .getByTeamVehicleID(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          arr.forEach((item) => {
            item.IsSelected = item.IsSelected == true ? 1 : 0;
          });
          this.dataTable = [...arr];

          if (this.dataTable.length) {
            this.objectKeys = Object.keys(this.dataTable[0]);
          } else {
            this.objectKeys = [];
          }
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
    changeChoose(value, item) {
      let body = {
        GeoCode: 'TeamVehicle',
        GroupID: this.dataForm.ID[1],
        IsRight: value,
        StationID: item.ID.toString(),
      };
      systemAPI
        .editStationRights(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataVehicle(this.dataForm.ID[1])
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
            this.getDataVehicle(this.dataForm.ID[1])
          }
        })
        .catch((err) => console.log(err));
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss">
  .npl-table-basic-form {
    &.b-table-sticky-header {
      margin-bottom: 0
    }
  }
</style>
