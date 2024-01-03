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
              <b-col lg="3">
                <b-form-group label="ID">
                  <b-form-input
                    class="text-center"
                    :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
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
              </b-col>
              <b-col 
                lg="12"
              />
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.Name[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Name[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input 
                    v-model="dataForm.Name[1]"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  :label="dataForm.NameExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.NameExtention1[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input
                    v-model="dataForm.NameExtention1[1]"
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
  // props:  {
  //   dataForm:{
  //     type:Object,
  //     default:null
  //   },
  //   currentMode:{
  //     type:String,
  //     default:null
  //   },
  // },
  data() {
    return {};
  },
   methods: {
  },
};
</script>

<style lang="scss" scoped></style>
