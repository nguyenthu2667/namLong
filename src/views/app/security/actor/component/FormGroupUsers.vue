<template>
  <div>
    <template v-if="dataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="2">
            <b-form-group label="ID">
              <b-form-input
                :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group
              :label="dataForm.GroupName[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.GroupName[3]"
            >
              <b-form-input
                v-model="dataForm.GroupName[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group :label="dataForm.GroupDescription[0]">
              <b-form-input
                v-model="dataForm.GroupDescription[1]"
                max-rows="6"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" v-if="dataForm.IsActive">
            <b-form-group
              :label="dataForm.IsActive[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsActive[3]"
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
          <b-col lg="4" v-if="this.dataForm.ID">
            <strong class="text-info text-uppercase">{{
              $t("function-and-operation-permissions")
            }}</strong>
            <GroupMenuPermissions :id="this.dataForm.ID[1]" />
          </b-col>
          <b-col lg="3" v-if="this.dataForm.ID">
            <strong class="text-info text-uppercase">{{
              $t("data-permissions")
            }}</strong>
            <NewLayerData
              :id="this.dataForm.ID[1]"
              @changeGeoCode="setNewGeoCode"
              :currentGeoCode="currentGeoCode"
            />
          </b-col>
          <b-col lg="5" v-if="this.dataForm.ID">
            <strong class="text-info text-uppercase">{{
              $t("management-permissions")
            }}</strong>
            <NewInfoMangage
              :id="this.dataForm.ID[1]"
              :currentGeoCode="currentGeoCode"
            />
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
import groupAPI from "@/api/modules/groupAPI";
import userAPI from "@/api/modules/userAPI";
import GroupMenuPermissions from "@/views/app/security/actor/NewGroupMenuPermissions";
import NewLayerData from "@/views/app/security/decen-data/NewLayerData";
import NewInfoMangage from "@/views/app/security/decen-data/NewInfoMangage";
// import GroupMenuPermissions from "@/views/app/security/actor/GroupMenuPermissions"

export default {
  props: ["dataForm", "currentMode"],
  components: {
    GroupMenuPermissions,
    NewLayerData,
    NewInfoMangage,
  },
  data() {
    return {
      // selectedGeoCode: null,
      currentGeoCode: null,
    };
  },
  created() {},
  methods: {
    setNewGeoCode(item) {
      this.currentGeoCode = item;
    },
  },
};
</script>

<style lang="scss" scoped></style>
