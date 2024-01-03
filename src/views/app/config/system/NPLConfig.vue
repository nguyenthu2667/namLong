<template>
  <div id="app-content-full" class="npl-config">
    <b-card class="h-100" style="overflow: auto">
      <div v-if="objectData">
        <b-row>
          <b-colxx xxs="12">
            <h1 class="custom-h1">
              <strong>{{ objectData.formName }}</strong>
            </h1>
            <div class="top-right-button-container" @click="handleUpdate">
              <div class="top-right-button-container">
                <b-button variant="primary">{{ $t("button.save") }}</b-button>
              </div>
            </div>
            <div class="mb-lg-2 mt-2"></div>
            <div class="separator mb-2 mb-lg-3"></div>
          </b-colxx>
        </b-row>
      </div>
      <b-row v-if="dataForm">
        <b-col lg="8">
          <strong class="text-info text-uppercase">{{
            $t("config.company-info")
          }}</strong>
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="dataForm.Name[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Name[3]"
              >
                <b-form-input v-model="dataForm.Name[1]"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-form-group
                :label="dataForm.Address[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Address[3]"
              >
                <b-form-input v-model="dataForm.Address[1]"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="dataForm.NameExtention1[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.NameExtention1[3]"
              >
                <b-form-input
                  v-model="dataForm.NameExtention1[1]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-form-group
                :label="dataForm.AddressExtention1[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.AddressExtention1[3]"
              >
                <b-form-input
                  v-model="dataForm.AddressExtention1[1]"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.TaxCode[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.TaxCode[3]"
              >
                <b-form-input
                  v-model="dataForm.TaxCode[1]"
                  class="text-right"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.Phone[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Phone[3]"
              >
                <b-form-input
                  v-model="dataForm.Phone[1]"
                  class="text-right"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.Email[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Email[3]"
              >
                <b-form-input v-model="dataForm.Email[1]"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.Website[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Website[3]"
              >
                <b-form-input v-model="dataForm.Website[1]"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.Logo[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.Logo[3]"
              >
                <b-form-file
                  :placeholder="$t('modal.please-choose-file')"
                  :browse-text="$t('modal.choose-file')"
                  v-model="file"
                ></b-form-file>
              </b-form-group>
              <div class="show-image-video-2" v-if="base64String">
                <div class="show-image-video-2-2">
                  <b-img :src="base64String"></b-img>
                </div>
              </div>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.FormatCurrency[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.FormatCurrency[3]"
              >
                <b-form-select
                  v-model="dataForm.FormatCurrency[1]"
                  :options="[
                    { text: 'VN', value: 'VN' },
                    { text: 'EN', value: 'EN' },
                  ]"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="dataForm.FormatDecimal[0]"
                :invalid-feedback="$t('form.no-blank')"
                :state="dataForm.FormatDecimal[3]"
              >
                <b-form-select
                  v-model="dataForm.FormatDecimal[1]"
                  :options="[
                    { text: '0', value: '0' },
                    { text: '1', value: '1' },
                    { text: '2', value: '2' },
                    { text: '3', value: '3' },
                  ]"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row> </b-row>
        </b-col>
        <b-col lg="4">
          <strong class="text-info text-uppercase">
            {{ $t("config.auto-approval") }}
          </strong>
          <b-row>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.ApprovalOrder[0] + ":" }}
                </label>
                <b-form-radio
                  v-model="dataForm.ApprovalOrder[1]"
                  :value="1"
                  class="ml-2"
                >
                  {{ $t("config.yes") }}
                </b-form-radio>
                <b-form-radio
                  v-model="dataForm.ApprovalOrder[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.TimeApprovalIncurredFee[0] + ":" }}
                </label>
                <b-form-select
                  class="ml-2"
                  style="max-width: 60px"
                  v-model="dataForm.TimeApprovalIncurredFee[1]"
                  :options="[
                    { text: '5', value: '5' },
                    { text: '10', value: '10' },
                    { text: '15', value: '15' },
                    { text: '20', value: '20' },
                    { text: '25', value: '25' },
                    { text: '30', value: '30' },
                    { text: '35', value: '35' },
                  ]"
                ></b-form-select>
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.ApprovalIncurredFee[0] + ":" }}
                </label>
                <b-form-radio
                  v-model="dataForm.ApprovalIncurredFee[1]"
                  :value="1"
                  class="ml-2"
                >
                  {{ $t("config.yes") }}
                </b-form-radio>
                <b-form-radio
                  v-model="dataForm.ApprovalIncurredFee[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2 frame-form-timepicker">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.TimeBeforeApprovingIncurredFee[0] + ":" }}
                </label>
                <b-form-timepicker
                  v-model="startTime"
                  class="ml-2"
                  :locale="locale"
                ></b-form-timepicker>
                <b-form-timepicker
                  v-model="endTime"
                  class="ml-2"
                  :locale="locale"
                ></b-form-timepicker>
              </div>
            </b-col>
          </b-row>
          <strong class="text-info text-uppercase mt-4 d-block">
            {{ $t("config.warning") }}
          </strong>
          <b-row>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.RemindJob[0] + ":" }}
                </label>
                <b-form-radio
                  v-model="dataForm.RemindJob[1]"
                  :value="1"
                  class="ml-2"
                >
                  {{ $t("config.yes") }}
                </b-form-radio>
                <b-form-radio
                  v-model="dataForm.RemindJob[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.CycleRemindJob[0] + ":" }}
                </label>
                <b-form-select
                  class="ml-2"
                  style="max-width: 60px"
                  v-model="dataForm.CycleRemindJob[1]"
                  :options="[
                    { text: '5', value: '5' },
                    { text: '10', value: '10' },
                    { text: '15', value: '15' },
                    { text: '20', value: '20' },
                    { text: '25', value: '25' },
                    { text: '30', value: '30' },
                    { text: '35', value: '35' },
                  ]"
                ></b-form-select>
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.WrongRoutesAlert[0] + ":" }}
                </label>
                <b-form-radio
                  v-model="dataForm.WrongRoutesAlert[1]"
                  :value="1"
                  class="ml-2"
                >
                  {{ $t("config.yes") }}
                </b-form-radio>
                <b-form-radio
                  v-model="dataForm.WrongRoutesAlert[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-col>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.RadiusWrongRoutesAlert[0] + "(m):" }}
                </label>
                <b-form-input
                  style="max-width: 60px"
                  class="ml-2"
                  v-model="dataForm.RadiusWrongRoutesAlert[1]"
                ></b-form-input>
              </div>
            </b-col>
          </b-row>
          <strong class="text-info text-uppercase">
            {{ $t("config.other") }}
          </strong>
          <b-row>
            <b-col lg="12">
              <div class="d-flex align-items-center mb-2">
                <label style="white-space: nowrap; margin-bottom: 0">
                  {{ dataForm.DriverRejectOrder[0] + ":" }}
                </label>
                <b-form-radio
                  v-model="dataForm.DriverRejectOrder[1]"
                  :value="1"
                  class="ml-2"
                >
                  {{ $t("config.yes") }}
                </b-form-radio>
                <b-form-radio
                  v-model="dataForm.DriverRejectOrder[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("config.no") }}</b-form-radio
                >
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";

export default {
  data() {
    return {
      menuRight: [],
      dataForm: null,
      base64String: null,
      file: null,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      startTime: "",
      endTime: "",
    };
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  created() {
    this.getListMenuRight();
    this.getData();
  },
  watch: {
    file(newVal) {
      this.getBase64String(newVal);
    },
    dataForm(newVal) {
      if (newVal) {
        if (newVal.Logo) {
          this.base64String = newVal.Logo[1];
        }
        if (newVal.TimeBeforeApprovingIncurredFee) {
          const stringTime = newVal.TimeBeforeApprovingIncurredFee[1];
          this.startTime = stringTime.slice(0, 5);
          this.endTime = stringTime.slice(6, 11);
        }
      }
    },
  },
  methods: {
    getListMenuRight() {
      let body = {};
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      nplAPI
        .getCompanyConfig()
        .then((val) => {
          const data = val.status ? val.data : null;
          if (data.Properties?.length) {
            const obj = data.CompanyInfo[0];
            let newObj = {};
            data.Properties.forEach((item) => {
              if (item.IsHide === 0) {
                newObj = {
                  ...newObj,
                  [item.ClName]: [
                    item.ShwName,
                    obj[item.ClName],
                    item.TypeCol,
                    null,
                  ],
                };
              }
            });
            this.dataForm = {
              ...newObj,
              ID: ["ID", obj.ID, "ID", null],
            };
          } else {
            this.dataForm = null;
          }
        })
        .catch((err) => console.log(err));
    },
    handleUpdate() {
      let body = {};
      for (let key in this.dataForm) {
        let value = this.dataForm[key][1];
        if (key === "TimeBeforeApprovingIncurredFee") {
          if (this.startTime && this.endTime) {
            body = {
              ...body,
              [key]: `${this.startTime.slice(0, 5)}-${this.endTime.slice(
                0,
                5
              )}`,
            };
          }
        } else {
          body = {
            ...body,
            [key]: value.toString(),
          };
        }
        // if (key === "FormatDecimal") {
        //   body = {
        //     ...body,
        //     [key]: value.toString(),
        //   };
        // } else {
        //   body = {
        //     ...body,
        //     [key]: value,
        //   };
        // }
      }
      nplAPI
        .editCompanyConfig(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getData();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },
    generateBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });
    },
    async getBase64String(file) {
      // console.log(file);
      const base64 = await this.generateBase64(file);
      if (base64.includes("image")) {
        this.base64String = base64;
        // console.log('this.base64String', this.base64String)
        // const arr = (this.dataForm.Logo[1] = base64);
        this.dataForm.Logo[1] = base64
        // console.log(this.dataForm.Logo[1]);
      } else {
        this.base64String = null;
        this.showNotify(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t('choose-file-image')
        );
      }
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
.npl-config {
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  .custom-file-label {
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    &::after {
      height: calc(1.5em + 0.75rem);
      padding: 0.375rem 0.75rem;
    }
  }
  .show-image-video-2 {
    margin-top: 5px;
    display: block;
    position: relative;
    // padding-top: 75%;
    padding-top: 56.25%; //16:9
  }
  .show-image-video-2-2 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .frame-form-timepicker {
    .b-form-timepicker {
      max-width: 100px;
    }
    .btn {
      padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    }
    .form-control {
      padding-left: 0;
    }
    label {
      padding-top: 10px;
    }
  }
}
</style>
