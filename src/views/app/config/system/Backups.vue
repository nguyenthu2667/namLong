<template>
  <div v-if="objectData">
    <div v-if="data">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="custom-h1">
            <strong>{{ objectData.formName }}</strong>
          </h1>
          <div class="top-right-button-container" @click="handleUpdate">
            <div class="top-right-button-container">
              <b-button variant="primary">Save</b-button>
            </div>
          </div>
          <div class="mb-lg-2 mt-2"></div>
          <div class="separator mb-2 mb-lg-3"></div>
        </b-colxx>
      </b-row>
      <b-row>
        <b-card style="width: 100%">
          <b-row>
            <b-col cols="12" lg="6">
              <div class="d-flex flex-column">
                <b-form-checkbox
                  v-model="data.Total.IsBackUp"
                  name="checkbox-1"
                  class="mb-1 mb-lg-3"
                >
                  <span class="ml-2 text-lg text-muted">
                    <strong
                      >{{
                        data.Total.IsBackUp
                          ? $t("template.yes")
                          : $t("template.no")
                      }}
                      {{ $t("dashboards.data-backup") }}
                    </strong>
                  </span>
                </b-form-checkbox>
                <div class="margin-left-10" v-if="data.Total.IsBackUp">
                  <div
                    class="d-flex justify-content-between align-items-center mb-2 mb-lg-4"
                  >
                    <div class="text-md">
                      {{ $t("dashboards.hosted-at-the-server") }}
                      <span class="text-lowercase"
                        >({{ $t("form.days") }}) :</span
                      >
                    </div>
                    <div class="w-20 w-lg-10">
                      <b-form-input
                        v-model.number="data.Total.BackupDays"
                        type="number"
                        min="0"
                      ></b-form-input>
                    </div>
                  </div>
                  <div class="">
                    <b-form-checkbox
                      v-model="data.Total.IsCloud"
                      name="checkbox-1"
                      class="mb-1 mb-lg-3"
                    >
                      <span class="ml-2 text-lg text-muted">
                        <strong>
                          {{ $t("dashboards.hosted-at-FTP") }}
                        </strong>
                      </span>
                    </b-form-checkbox>
                    <b-row class="d-flex flex-column margin-left-10">
                      <b-col cols="12" lg="12">
                        <div
                          class="d-flex align-items-center gap-5 mb-2 mb-lg-4"
                        >
                          <div class="text-md w-35 w-lg-30">Server</div>
                          <div class="w-65 w-lg-70">
                            <b-form-input
                              v-model="data.Total.CloudFtp"
                              type="text"
                              :disabled="!data.Total.IsCloud"
                            ></b-form-input>
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-center gap-5 mb-2 mb-lg-4"
                        >
                          <div class="text-md w-35 w-lg-30">User</div>
                          <div class="w-65 w-lg-70">
                            <b-form-input
                              v-model="data.Total.CloudUser"
                              type="text"
                              :disabled="!data.Total.IsCloud"
                            ></b-form-input>
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-center gap-5 mb-2 mb-lg-4"
                        >
                          <div class="text-md w-35 w-lg-30">Password</div>
                          <div class="w-65 w-lg-70">
                            <b-input-group>
                              <b-form-input
                                v-model="data.Total.CloudPassword"
                                :type="typePassword"
                                :disabled="!data.Total.IsCloud"
                              ></b-form-input>

                              <b-input-group-append style="cursor: pointer">
                                <b-input-group-text>
                                  <i
                                    :class="`fad fa-eye${iconPassword}`"
                                    @click="togglePassword"
                                  ></i>
                                </b-input-group-text>
                              </b-input-group-append>
                            </b-input-group>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" lg="6" v-if="data.Total.IsBackUp">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="ml-2 text-lg text-muted">
                    <strong>
                      {{ $t("dashboards.details-of-backup-times") }} /
                      {{ $t("form.days") }}
                    </strong>
                  </div>
                  <div style="cursor: pointer" @click="addModal">
                    <i class="fad fa-plus"></i>
                    &emsp;{{ $t("pages.add") }}
                  </div>
                </div>
                <div>
                  <b-table
                    hover
                    :items="data.Details"
                    :fields="fields"
                    class="table-condensed"
                  >
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell(HourCustom)="data">
                      {{ data.item.Hour }} : {{ data.item.Minute }}
                    </template>
                    <template #cell(Action)="data">
                      <div
                        class="text-lg"
                        @click="deleteModal(data.item, data.index)"
                        style="cursor: pointer"
                      >
                        <i class="fad fa-minus-circle"></i>
                      </div>
                    </template>
                  </b-table>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-modal
        :id="nameForm"
        :ref="nameForm"
        :title="titleForm"
        @ok="handleModal"
        @hidden="resetModal"
        v-if="dataForm"
        scrollable
        class="text-center"
        size="lg"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col lg="12">
              <b-form-group
                :label="dataForm['Time'][0]"
                :label-for="'time' + '-input'"
              >
                <b-form-timepicker
                  class="cus-form-group"
                  v-model="dataForm['Time'][1]"
                  locale="vi"
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="dataForm['Note'][0] + ':'">
                <b-form-textarea
                  class="text-left"
                  v-model="dataForm['Note'][1]"
                  rows="3"
                  max-rows="6"
                  size="sm"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </div>
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
import moment from "moment";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";

export default {
  async created() {
    await this.getListMenuRight();
    await this.getDataBackUps();
  },
  data() {
    return {
      timer: 500,
      typePassword: "password",
      iconPassword: "-slash",
      menuRight: [],
      data: null,
      fields: [
        {
          key: "index",
          label: "Chỉ số",
        },
        {
          key: "HourCustom",
          label: "Giờ",
        },
        {
          key: "Note",
          label: "Ghi Chú",
        },
        {
          key: "Action",
          label: "Action",
        },
      ],
      dataForm: null,
      nameForm: null,
      titleForm: null,
      typeForm: null,
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
  methods: {
    togglePassword() {
      this.typePassword =
        this.typePassword === "password" ? "text" : "password";
      this.iconPassword = this.iconPassword === "-slash" ? "" : "-slash";
    },
    resetModal() {
      this.dataForm = null;
      this.nameForm = null;
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleUpdate() {
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      let changeIs = {
        IsBackUp: this.data.Total.IsBackUp ? 1 : 0,
        IsCloud: this.data.Total.IsCloud ? 1 : 0,
      };
      let objectResult = { ...this.data.Total, ...changeIs };
      let changeDetail = this.data.Details.map((x) => {
        return {
          Hour: x.Hour,
          Minute: x.Minute,
          Note: x.Note,
        };
      });
      let body = {
        Details: changeDetail,
        ...objectResult,
      };
      systemAPI.updateBackups(body).then((val) => {
        spinnerDiv.style.display = "none";
        if (val.status) {
          if (!this.items || this.items.length === 0) {
            this.$bvModal.hide(this.nameForm);
            this.getDataBackUps();
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            this.$bvModal.hide(this.nameForm);
            this.getDataBackUps();
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getDataBackUps();
          setTimeout(() => {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
        this.nameForm = null;
        this.titleForm = null;
        this.typeForm = "";
      });
    },
    handleSubmit() {
      let Hour = +this.dataForm.Time[1].split(":")[0];
      let Minute = +this.dataForm.Time[1].split(":")[1];
      let Note = this.dataForm.Note[1];
      let body = {
        Hour,
        Minute,
        Note,
      };
      this.data.Details.push(body);

      setTimeout(() => {
        this.makeToast(
          "success",
          this.$t("toast.success").toUpperCase(),
          this.$t("dashboards.handle-success")
        );
      }, this.timer);

      setTimeout(() => {
        this.$bvModal.hide(this.nameForm);
      }, this.timer);
    },
    deleteModal(items, index) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + (index + 1) + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(index);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      setTimeout(() => {
        this.makeToast(
          "success",
          this.$t("toast.success").toUpperCase(),
          this.$t("dashboards.handle-success")
        );
      }, this.timer);
      this.data.Details = this.data.Details.filter((x, i) => i !== id);
    },
    addModal() {
      this.dataForm = {
        Time: [
          this.$t("modal.time"),
          moment(new Date()).format("H:mm"),
          "TIME",
        ],
        Note: [this.$t("dashboards.note"), null, "MutedString", null],
      };
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    getDataBackUps() {
      systemAPI
        .getBackups()
        .then((val) => {
          this.data = val.status ? val.data : {};
          let changeIs = {
            IsBackUp: !!this.data.Total.IsBackUp,
            IsCloud: !!this.data.Total.IsCloud,
          };
          this.data.Total = { ...this.data.Total, ...changeIs };
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

<style lang="scss" scoped>
.text-md {
  font-size: 14px;
}
.text-lg {
  font-size: 18px;
}

.width-10 {
  width: 10%;
}

.width-50 {
  width: 50%;
}

.margin-left-10 {
  margin-left: 10%;
}

.gap-5 {
  gap: 20px;
}

.table-condensed {
  font-size: 14px;
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

.w-35 {
  width: 35% !important;
}

.w-65 {
  width: 65% !important;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .gap-5 {
    gap: 12px;
  }

  .text-md {
    font-size: 12px;
  }

  .text-lg {
    font-size: 14px;
  }

  .margin-left-10 {
    margin-left: 5%;
  }

  .top-right-button-container {
    float: right !important;
  }

  .table-condensed {
    font-size: 12px;
  }

  .custom-h1 {
    font-size: 1rem;
    padding-top: 0.5rem;
  }
}

/* Tablet: width >= 740px and width < 1024px  */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .gap-5 {
    gap: 12px;
  }
}
</style>
