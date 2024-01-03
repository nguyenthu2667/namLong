<template>
  <div>
    <template v-if="dataForm">
      <b-col
        lg="12"
        class="pl-0"
        style="max-height: calc(100% - 15px); margin-top: -1px"
      >
        <b-row>
          <b-col lg="6">
            <b-row>
              <b-col lg="6">
                <b-form-group label="Mã chứng từ">
                  <b-form-input
                    class="text-center"
                    :value="dataForm.OID ? dataForm.OID[1] : 'AUTO'"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!-- <b-col lg="4">
                <b-form-group
                  v-if="currentMode != `adding`"
                  :label="dataForm.IsActive[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.IsActive[3]"
                >
                  <div class="d-flex">
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="1"
                      class="ml-1"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                    >
                      {{ $t("npl.using") }}
                    </b-form-radio>
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="0"
                      class="ml-1"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                    >
                      {{ $t("npl.not-use") }}
                    </b-form-radio>
                  </div>
                </b-form-group>
              </b-col> -->
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.LicensePlates[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.LicensePlates[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input v-model="dataForm.LicensePlates[1]" />
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.RegisToDate[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.RegisToDate[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <!-- Sử lý datetime -->
                  <datepicker
                    v-if="!dataForm.RegisToDate[1]"
                    v-model="valueRegisToDate"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate((dataForm.RegisToDate[1] = valueRegisToDate))"
                  >
                    <datepicker 
                      v-if="!dataForm.RegisToDate[1]"
                      v-model="dataForm.RegisToDate[1] = valueRegisToDate"
                    />
                    <datepicker 
                      v-else
                      v-model="valueRegisToDate"
                    />
                  </datepicker>
                  <datepicker
                    v-else
                    v-model="dataForm.RegisToDate[1]"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate(dataForm.RegisToDate[1])"
                  />
                  <!-- <b-form-input 
                    v-model="dataForm.RegisToDate[1]"
                  /> -->
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.BankToDate[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.BankToDate[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <!-- Sử lý datetime -->
                  <datepicker
                    v-if="!dataForm.BankToDate[1]"
                    v-model="valueBankToDate"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate((dataForm.BankToDate[1] = valueBankToDate))"
                  >
                    <datepicker 
                      v-if="!dataForm.BankToDate[1]"
                      v-model="dataForm.BankToDate[1] = valueBankToDate"
                    />
                    <datepicker 
                      v-else
                      v-model="valueBankToDate"
                    />
                  </datepicker>
                  <datepicker
                    v-else
                    v-model="dataForm.BankToDate[1]"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate(dataForm.BankToDate[1])"
                  />
                  <!-- <b-form-input v-model="dataForm.BankToDate[1]" /> -->
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.InsureToDate[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.InsureToDate[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <!-- Sử lý datetime -->
                  <datepicker
                    v-if="!dataForm.InsureToDate[1]"
                    v-model="valueInsureToDate"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate((dataForm.InsureToDate[1] = valueInsureToDate))"
                  >
                    <datepicker 
                      v-if="!dataForm.InsureToDate[1]"
                      v-model="dataForm.InsureToDate[1] = valueInsureToDate"
                    />
                    <datepicker 
                      v-else
                      v-model="valueInsureToDate"
                    />
                  </datepicker>
                  <datepicker
                    v-else
                    v-model="dataForm.InsureToDate[1]"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    @input="convertDate(dataForm.InsureToDate[1])"
                  />
                  <!-- <b-form-input v-model="dataForm.InsureToDate[1]" /> -->
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="4">
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
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <div v-if="dataForm.IsActive[1] === 1 || dataForm.IsActive[1] === true">
              <img 
                src="/assets/img/npl/img-lock.png" 
                alt=""  
                style="height: 60px"
              >   
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
import handling from "@/constants/handling.js";
export default {
  props: ["dataForm", "currentMode"],
  data() {
    return {
      valueRegisToDate: new Date(),
      valueBankToDate: new Date(),
      valueInsureToDate: new Date(),
      datePickerFormat: "dd/MM/yyyy",
    };
  },
  methods: {
    convertDate(string) {
      return handling.convertPickerToDate(string);
    },
  },
};
</script>

<style lang="scss" scoped></style>
