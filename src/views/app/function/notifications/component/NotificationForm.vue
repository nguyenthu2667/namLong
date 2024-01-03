<template>
  <div>
    <template v-if="typeForm === 'INFO'">
      <b-modal
        class="text-center"
        :id="nameForm"
        :title="titleForm"
        ok-only
        @hidden="resetModal"
        scrollable
        size="lg"
      ></b-modal>
    </template>
    <template v-else>
      <b-modal
        :id="nameForm"
        :ref="nameForm"
        :title="titleForm"
        @hidden="resetModal"
        @ok="handleModal"
        v-if="dataForm"
        scrollable
        class="text-center"
        size="lg"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col lg="12">
              <b-form-group :label="dataForm['Title'][0] + ':'">
                <b-form-input
                  class="text-left"
                  v-model="$v.form.title.$model"
                  :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.title.required">
                  {{ $t("dashboards.cannot-be-left-blank") }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['TitleExtention1'][0] + ':'">
                <b-form-input
                  class="text-left"
                  v-model="$v.form.titleExtention1.$model"
                  :state="!$v.form.titleExtention1.$error"
                ></b-form-input>
                <b-form-invalid-feedback
                  v-if="!$v.form.titleExtention1.required"
                >
                  {{ $t("dashboards.cannot-be-left-blank") }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['Body'][0] + ':'">
                <b-form-textarea
                  class="text-left"
                  v-model="$v.form.body.$model"
                  :state="!$v.form.body.$error"
                ></b-form-textarea>
                <b-form-invalid-feedback v-if="!$v.form.body.required">
                  {{ $t("dashboards.cannot-be-left-blank") }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['BodyExtention1'][0] + ':'">
                <b-form-textarea
                  class="text-left"
                  v-model="$v.form.bodyExtention1.$model"
                  :state="!$v.form.bodyExtention1.$error"
                ></b-form-textarea>
                <b-form-invalid-feedback
                  v-if="!$v.form.bodyExtention1.required"
                >
                  {{ $t("dashboards.cannot-be-left-blank") }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group :label="dataForm['DataKey'][0] + ':'">
                <treeselect
                  name="tree-select-multi-input"
                  :searchable="searchable"
                  :close-on-select="closeOnSelect"
                  :max-height="500"
                  :placeholder="placeholder"
                  :default-expand-level="keyShow"
                  :no-results-text="noResultsText"
                  :options="dataFormOption['DataKey']"
                  v-model="dataForm['DataKey'][1]"
                  :multiple="true"
                  :limit="2"
                  @input="handleInputTreeSelect(dataForm['DataKey'][1])"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group :label="dataForm['IsSchedule'][0] + ':'">
                <b-form-checkbox
                  id="cus-checkbox"
                  v-model="dataForm['IsSchedule'][1]"
                  switch
                  size="md"
                >
                  <template
                    v-if="
                      dataForm['IsSchedule'][4] &&
                      dataForm['IsSchedule'][4] ===
                        'IsScheduleInternalNotifications'
                    "
                  ></template>
                  <template v-else-if="dataForm['IsSchedule'][1] === true">
                    {{ $t("status.active") }}
                  </template>
                  <template v-else>
                    {{ $t("status.non-active") }}
                  </template>
                </b-form-checkbox>
                <template
                  v-if="
                    dataForm['IsSchedule'][4] &&
                    dataForm['IsSchedule'][4] ===
                      'IsScheduleInternalNotifications'
                  "
                >
                  <template v-if="dataForm['IsSchedule'][1] === true">
                    <b-row>
                      <b-col lg="12" class="mb-2">
                        <b-form-timepicker
                          id="cus-timepicker"
                          class="cus-form-group"
                          v-model="time"
                          :locale="locale"
                        ></b-form-timepicker>
                      </b-col>
                      <b-col lg="12">
                        <b-form-datepicker
                          id="cus-datepicker"
                          class="cus-form-group"
                          size="sm"
                          :locale="locale"
                          v-model="date"
                        ></b-form-datepicker>
                      </b-col>
                    </b-row>
                  </template>
                </template>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['Note'][0] + ':'">
                <b-form-textarea
                  class="text-left"
                  v-model="dataForm['Note'][1]"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['Image'][0] + ':'">
                <b-form-file v-model="avatar" plain></b-form-file>
                <b-row class="mt-2">
                  <b-colxx md="12">
                    <b-form-group>
                      <template v-if="avatarBase64">
                        <b-img
                          :src="avatarBase64"
                          fluid
                          alt="avatar-image"
                          style="height: 160px"
                        ></b-img>
                      </template>
                      <template v-else>
                        <b-img
                          v-if="dataForm['Image'][1]"
                          :src="dataForm['Image'][1][0].Image"
                          fluid
                          alt="avatar-image"
                          style="height: 160px"
                        ></b-img>
                      </template>
                    </b-form-group>
                  </b-colxx>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </template>
    <div id="custom-spinner-load-submit">
      <div class="form-spinner">
        <div class="spinner">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="text-spinner">
          <p>{{ $t("cards.loading") }} ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import systemAPI from "@/api/modules/systemAPI";
import moment from "moment";
import { validationMixin } from "vuelidate";
const { required, maxLength, minLength } = require("vuelidate/lib/validators");

export default {
  components: {
    Treeselect,
  },
  props: [
    "nameForm",
    "titleForm",
    "bodyFormDefault",
    "dataForm",
    "dataFormOption",
    "stateForm",
    "apiForm",
    "typeForm",
    "keyShow",
    "maxImage",
    "typeLayer",
    "disabledSELECT",
    "formProps",
  ],
  mixins: [validationMixin],
  data() {
    return {
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      avatar: null,
      avatarBase64: null,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      time: moment().format("HH:mm"),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      date: moment().format("YYYY-MM-DD"),
      form: this.formProps,
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      titleExtention1: {
        required,
      },
      body: {
        required,
      },
      bodyExtention1: {
        required,
      },
    },
  },
  watch: {
    avatar(to, from) {
      if (to) {
        this.avatarBase64 = null;
        let reader = new FileReader();
        reader.readAsDataURL(to);
        setTimeout(() => {
          this.avatarBase64 = reader.result;
        }, 500);
      }
    },
  },
  methods: {
    //handle-tree-select-with-condition
    handleInputTreeSelect(selecteds) {
      const isAll = this.checkSelectAllDataKeyOption(selecteds);
      if (isAll == true) {
        let result = this.dataFormOption.DataKey.find(
          (e) => e.keyString == "all"
        ).id;
        this.dataForm.DataKey[1] = [result];
      } else {
        let optionNotALL = this.dataFormOption.DataKey.filter(
          (e) => e.keyString != "all"
        );
        let result = [];
        optionNotALL.forEach((o) => {
          selecteds.forEach((s) => {
            if (s == o.id) {
              result.push(o.id);
            }
          });
        });
        this.dataForm.DataKey[1] = result;
      }
    },
    checkSelectAllDataKeyOption(selecteds) {
      let result = false;
      selecteds.forEach((eID) => {
        this.dataFormOption.DataKey.forEach((o) => {
          if (o.id == eID) {
            if (o.keyString && o.keyString == "all") {
              result = true;
            }
          }
        });
      });
      return result;
    },
    //
    convertDate(string) {
      return handling.convertDate(string);
    },
    resetModal() {
      this.dataForm = null;
      this.avatar = null;
      this.avatarBase64 = null;
    },
    convertBody(body) {
      if (
        (body.hasOwnProperty("DataKey") && body.DataKey == null) ||
        (body.hasOwnProperty("DataKey") && body.DataKey == "")
      ) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("dashboards.cannot-be-left-blank")
        );
        return false;
      }
      if (body.hasOwnProperty("DataKey")) {
        body.DataKey = body.DataKey.join(",");
      }
      if (body.hasOwnProperty("Image")) {
        if (this.avatarBase64 == null) {
          if (body.Image) {
            body.Image = body.Image[0].Image;
          } else {
            body.Image = "";
          }
        } else if (this.avatarBase64) {
          body.Image = this.avatarBase64.split("base64,")[1];
          // body.Image = this.avatarBase64.replace(
          //   'data:image/' + png + ';base64,',
          //   '',
          // )
        } else {
          body.Image = this.dataForm.Image[1][0].Image;
        }
      }
      if (body.hasOwnProperty("IsSchedule")) {
        if (
          body.IsSchedule === false ||
          body.IsSchedule == 0 ||
          body.IsSchedule === null
        ) {
          body.ScheduleDate = this.date + " " + this.time;
        } else {
          body.ScheduleDate = this.date + " " + this.time;
        }
        body.IsSchedule = handling.convertBooleanToBit(body.IsSchedule);
      }
      return true;
    },
    assignValidationsBody(body) {
      if (body.hasOwnProperty("Title")) {
        body.Title = this.form.title;
      }
      if (body.hasOwnProperty("TitleExtention1")) {
        body.TitleExtention1 = this.form.titleExtention1;
      }
      if (body.hasOwnProperty("Body")) {
        body.Body = this.form.body;
      }
      if (body.hasOwnProperty("BodyExtention1")) {
        body.BodyExtention1 = this.form.bodyExtention1;
      }
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      let body = this.bodyFormDefault;
      let obj = {};
      Object.assign(body, obj);
      for (const key in this.dataForm) {
        body[key] = this.dataForm[key][1];
      }
      this.assignValidationsBody(body);
      let isSubmit = this.convertBody(body);
      if (isSubmit == false) {
        return;
      }
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit", val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
  },
};
</script>
<style scoped>
.map-control {
  height: 400px;
}

.absolute-div-glide {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
}

.absolute-div-glide-text {
  margin: 4.5rem auto;
  width: 70%;
  text-align: center;
}

.absolute-div-glide-text p {
  font-size: 30px;
}

#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-trash-wallpaper {
  position: absolute;
  top: 3.3rem;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-trash-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}

#custom-spinner-load-submit {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form-spinner {
  --size: 80px;

  width: var(--size);
  height: var(--size);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-spinner p {
  font-weight: bold;
  color: white;
}

.spinner {
  --size: 62px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  perspective: 800px;

  margin-bottom: 10px;
  /*margin-left: 10px;*/
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #2cfffe;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #fcc10f;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #ec1b60;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
<style>
.cus-form-group {
  /* border-top-left-radius: 50px;
  border-bottom-left-radius: 50px; */
}
.cus-form-group button {
  /* background: #c8ced3; */
  padding-left: 15px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.cus-form-group label {
  text-align: center;
}
.vue-treeselect__control {
  padding: 5px;
}
</style>
