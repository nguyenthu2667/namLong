<template>
  <div>
    <template v-if="dataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="2" xl="1">
            <b-form-group label="ID">
              <b-form-input
                :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2" xl="1">
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
          <b-col lg="2">
            <b-form-group
              :label="dataForm.LicensePlates[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.LicensePlates[3]"
            >
              <b-form-input
                v-model="dataForm.LicensePlates[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4" xl="4">
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
          <b-col lg="2">
            <b-form-group
              :label="dataForm.SMRMTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.SMRMTypeID[3]"
            >
              <b-form-select
                v-model="dataForm.SMRMTypeID[1]"
                :options="dataFormOptions.SMRMTypeID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.VehicleProducerID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.VehicleProducerID[3]"
            >
              <b-form-select
                v-model="dataForm.VehicleProducerID[1]"
                :options="dataFormOptions.VehicleProducerID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.ProductionYear[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.ProductionYear[3]"
            >
              <b-form-input
                v-model="dataForm.ProductionYear[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.ExpiryDate[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.ExpiryDate[3]"
            >
              <b-form-input
                v-model="dataForm.ExpiryDate[1]"
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
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.ChassisNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ChassisNumber[3]"
                >
                  <b-form-input
                    v-model="dataForm.ChassisNumber[1]"
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
                  :label="dataForm.TyresNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.TyresNumber[3]"
                >
                  <b-form-select
                    v-model="dataForm.TyresNumber[1]"
                    :options="tyresNumberOption"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.VehicleTyreID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.VehicleTyreID[3]"
                >
                  <b-form-select
                    v-model="dataForm.VehicleTyreID[1]"
                    :options="dataFormOptions.VehicleTyreID"
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
          <b-col lg="4">
            <b-form-group
              :label="dataForm.KerbMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.KerbMass[3]"
            >
              <b-form-input
                v-model="dataForm.KerbMass[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group
              :label="dataForm.DesignTotalMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.DesignTotalMass[3]"
            >
              <b-form-input
                v-model="dataForm.DesignTotalMass[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.TowedMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.TowedMass[3]"
            >
              <b-form-input
                v-model="dataForm.TowedMass[1]"
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
          </b-col>
          <b-col lg="2">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-textarea
                v-model="dataForm.Note[1]"
                rows="2"
                max-rows="6"
                style="height: 113px"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col lg="2">
            <b-row>
              
            </b-row>
          </b-col>
          
        </b-row>
        <b-row>
          <b-col lg="4"> </b-col>
        </b-row>
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import nplAPI from "@/api/modules/nplAPI";
import dataFormOptions from "../mixin/dataFormOptionsMixin";

export default {
  props: ["dataForm", "currentMode", "CategoryType"],
  mixins: [dataFormOptions],
  data() {
    return {
      tyresNumberOption: [
        { text: "4 bánh", value: '4' },
        { text: "6 bánh", value: '6' },
        { text: "8 bánh", value: '8' },
        { text: "10 bánh", value: '10' },
        { text: "12 bánh", value: '12' },
        { text: "14 bánh", value: '14' },
        { text: "16 bánh", value: '16' },
        { text: "18 bánh", value: '18' },
        { text: "20 bánh", value: '20' },
        // { text: "22 bánh", value: '22' },
        // { text: "24 bánh", value: '24' },
        // { text: "26 bánh", value: '26' },
      ]
    }
  },
  created() {
    this.getSelect("SMRMTypes", "SMRMTypesName", "SMRMTypeID");
    this.getSelect("VehicleTires", "VehicleTiresName", "VehicleTyreID");
    this.getSelect(
      "VehicleProducers",
      "VehicleProducersName",
      "VehicleProducerID"
    );

    // this.getDriveHelpers();
  },
  methods: {
    // getDriveHelpers() {
    //   nplAPI
    //     .getDriveHelperActive()
    //     .then((val) => {
    //       if (val.status && val.data?.length > 0) {
    //         let data = val.status ? val.data : [];
    //         let newArr = [];
    //         if (data.length > 0) {
    //           data.forEach((item) => {
    //             const obj = {
    //               text: item.nPLDriveHelpersName,
    //               value: item.ID,
    //             };
    //             newArr.push(obj);
    //           });
    //         }
    //         this.dataFormOptions = {
    //           ...this.dataFormOptions,
    //           DriveHelperID: newArr,
    //         };
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>

<style lang="scss" scoped></style>
