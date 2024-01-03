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
          <b-col lg="4" v-if="dataForm.IsActive" class="d-flex">
            <b-form-group
              :label="dataForm.IsActive[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsActive[3]"
              class="mr-5"
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
            <b-form-group
              :label="dataForm.IsSale[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsSale[3]"
              v-if="dataForm.IsSale && !hideIsSale"
            >
              <div class="d-flex">
                <b-form-radio
                  v-model="dataForm.IsSale[1]"
                  :value="1"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("config.yes") }}</b-form-radio
                >
                <b-form-radio
                  v-model="dataForm.IsSale[1]"
                  :value="0"
                  class="ml-2"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b-form-group
              :label="dataForm.UserFullName[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.UserFullName[3]"
            >
              <b-form-input
                v-model="dataForm.UserFullName[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group
              :label="dataForm.UserAddress[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.UserAddress[3]"
            >
              <b-form-input
                v-model="dataForm.UserAddress[1]"
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
          <b-col lg="2">
            <b-form-group
              :label="dataForm.UserPhone[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.UserPhone[3]"
            >
              <b-form-input
                v-model="dataForm.UserPhone[1]"
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
              :label="dataForm.UserEmail[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.UserEmail[3]"
            >
              <b-form-input
                v-model="dataForm.UserEmail[1]"
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
              :label="dataForm.UserName[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.UserName[3]"
            >
              <b-form-input
                v-model="dataForm.UserName[1]"
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
        </b-row>
        <b-row> </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group :label="dataForm.UserDescription[0]">
              <b-form-textarea
                v-model="dataForm.UserDescription[1]"
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
        <b-row>
          <b-col lg="3"> </b-col>
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

export default {
  props: ["dataForm", "currentMode"],
  data() {
    return {
      dataFormOptions: {
        GroupID: [],
      },
      hideIsSale: false
    };
  },
  created() {
    this.getGroupUserActive();
    if(window.location.hostname.includes('npl')) {
      this.hideIsSale = true
    }
    else {
      this.hideIsSale = false
    }
  },
  methods: {
    getGroupUserActive() {
      groupAPI
        .groupUserListActive()
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                text: item.GroupName,
                value: item.GroupID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            GroupID: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    resetPassModal() {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-pass").toUpperCase() +
            this.dataForm.UserFullName[1] +
            "?",
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
      userAPI
        .userResetPassword(body)
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
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
