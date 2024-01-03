<template>
  <div>
    <b-row>
      <b-col lg="2">
        <b-form-group
          :label="dataForm.LemonID[0]"
          :invalid-feedback="$t('form.no-blank')"
          :state="dataForm.LemonID[3]"
        >
          <b-form-input v-model="dataForm.LemonID[1]"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="4" v-if="type == 'edit'">
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
        <b-row>
          <b-col lg="12">
            <b-form-group
              :label="dataForm.Name[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Name[3]"
            >
              <b-form-input v-model="dataForm.Name[1]"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
              :label="dataForm.NameExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.NameExtention1[3]"
            >
              <b-form-input v-model="dataForm.NameExtention1[1]"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6">
        <b-form-group :label="dataForm.Note[0]">
          <b-form-textarea
            v-model="dataForm.Note[1]"
            rows="2"
            max-rows="6"
            style="height: 113px"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import dataFormOptions from "@/views/app/category/npl/mixin/dataFormOptionsMixin";

export default {
  props: ["dataForm", "type"],
  mixins: [dataFormOptions],
  created() {
    this.getSelect("ChargeJobs", "ChargeJobsName", "ChargeJobID");
  },
};
</script>

<style lang="scss">
.custom-select {
  height: 36px;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
}
</style>
