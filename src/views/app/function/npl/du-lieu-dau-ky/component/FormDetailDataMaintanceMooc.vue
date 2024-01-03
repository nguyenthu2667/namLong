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
              <!-- <b-col lg="5">
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
                      class="ml-2"
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
                      class="ml-2"
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
                  <b-form-input 
                    v-model="dataForm.LicensePlates[1]"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.MaintenanceLastKm[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.MaintenanceLastKm[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input 
                    v-model="dataForm.MaintenanceLastKm[1]"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.MaintenanceCycle[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.MaintenanceCycle[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input 
                    v-model="dataForm.MaintenanceCycle[1]"
                  />
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
export default {
  props:  ["dataForm", "currentMode"],
  data() {
    return {};
  },
   methods: {
  },
};
</script>

<style lang="scss" scoped></style>
