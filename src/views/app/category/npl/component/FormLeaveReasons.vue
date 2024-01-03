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
        </b-row>
        <b-row>
          <b-col lg="3">
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
                  :label="dataForm.LeaveDay[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.LeaveDay[3]"
                >
                  <b-form-select
                    v-model="dataForm.LeaveDay[1]"
                    :options="LeaveDayOptions"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="3">
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
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
export default {
  props: ["dataForm", "currentMode"],
  data() {
    return {
      LeaveDayOptions: [
        { text: "0 ngày", value: 0 },
        { text: "1 ngày", value: 1 },
        { text: "2 ngày", value: 2 },
        { text: "3 ngày", value: 3 },
        { text: "4 ngày", value: 4 },
        { text: "5 ngày", value: 5 },
        { text: "6 ngày", value: 6 },
        { text: "7 ngày", value: 7 },
        { text: "8 ngày", value: 8 },
        { text: "9 ngày", value: 9 },
        { text: "10 ngày", value: 10 },
        { text: "11 ngày", value: 11 },
        { text: "12 ngày", value: 12 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
