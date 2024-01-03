<template>
  <div>
    <div>
      <div>
        <b-row>
          <b-colxx xxs="12">
            <div
              class="d-flex justify-content-lg-between align-items-center pb-2"
            >
              <div class="text-capitalize" style="font-size: 1.15rem">
                <strong>{{ $t("form.color-management") }}</strong>
              </div>
              <b-button-group>
                <b-dropdown
                  right
                  :text="$t('dropdown.action')"
                  variant="primary"
                >
                  <b-dropdown-item @click="addModalColor()">
                    <i class="fad fa-plus"></i>
                    &emsp;{{ $t("pages.add") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="editModalColor(selectedItemsColor)"
                    v-if="selectedItemsColor.length === 1"
                  >
                    <i class="fad fa-edit"></i>
                    &emsp;{{ $t("pages.edit") }}
                  </b-dropdown-item>
                  <b-dropdown-item v-else disabled>
                    <i class="fad fa-edit"></i>
                    &emsp;{{ $t("pages.edit") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="deleteModal(selectedItemsColor)"
                    v-if="selectedItemsColor.length === 1"
                  >
                    <i class="fad fa-trash-alt"></i>
                    &emsp;{{ $t("pages.delete") }}
                  </b-dropdown-item>
                  <b-dropdown-item v-else disabled>
                    <i class="fad fa-trash-alt"></i>
                    &emsp;{{ $t("pages.delete") }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-button-group>
            </div>
            <div class="mb-2 mt-2"></div>
            <div class="separator mb-5"></div>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx xxs="12" class="mb-4">
            <b-card>
              <custom-table
                ref="tableForm"
                :data-table="dataIndicator"
                :select-mode="selectMode"
                :field-table="fieldsIndicator"
                :column-show="listColumnShowIndicator"
                :row-page="8"
                @row-selected="rowSelectedColor"
              ></custom-table>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
    </div>
    <div>
      <custom-form
        :name-form="nameForm"
        :title-form="titleForm"
        :api-form="apiForm"
        :data-form="dataFormColor"
        :type-form="typeForm"
        :state-form="stateForm"
        :body-form-default="bodyFormDefault"
        @handle-submit="handleSubmit"
      ></custom-form>
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
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import CustomTables from "./CustomTables.vue";
import CustomForm from "./CustomForm.vue";
import indicatorAPI from "@/api/modules/indicatorAPI";
export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  props: ["selectMode", "selectedItems", "selectedGeoCode"],
  data() {
    return {
      timer: 500,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      dataDetailDevice: [],
      dataSelectChange: [],
      apiForm: "",
      typeTable: "",
      titleTable: "",
      dataCheckOk: [],
      selectedItemsColor: [],
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataFormColor: null,
      typeForm: null,
      stateForm: null,
      // colorPopup
      columnAdd: null,
      listColumnShowIndicator: null,
      objectKeysIndicator: null,
      dataIndicator: null,
      dataByID: null,
      indicatorShare: null,
    };
  },
  computed: {
    fieldsIndicator() {
      return handling.mergeTableAndData(
        this.objectKeysIndicator,
        this.listColumnShowIndicator
      );
    },
  },
  async created() {
    const { IndicatorCode, InfoCode } = this.selectedItems[0];
    this.indicatorShare = InfoCode ? InfoCode : IndicatorCode;
    let body = {
      GeoCode: this.selectedGeoCode,
      IndicatorCode: this.indicatorShare,
    };

    await this.getDataIndicator(body);
    await this.getKeyTableIndicator(body);
    await this.getColumnIndicator("IndicatorRanges");
    await this.getFormAddShowIndicator("IndicatorRanges");
  },
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 1000);
  },
  methods: {
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataByID(body) {
      indicatorAPI
        .indicatorByIDRange(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataIndicator(body) {
      indicatorAPI
        .indicatorListRange(body)
        .then((val) => {
          this.dataIndicator = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableIndicator(body) {
      indicatorAPI
        .indicatorListRange(body)
        .then((val) => {
          this.objectKeysIndicator =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnIndicator(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowIndicator = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFormAddShowIndicator(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowSelectedColor(data) {
      this.selectedItemsColor = data;
    },
    resetTable() {
      this.dataSelectChange = [];
      this.dataDetailDevice = [];
      this.apiForm = "";
      this.dataCheckOk = [];
    },
    handleCheckSelect(item) {
      if (item.IsCheck === true) {
        this.add(item);
      } else {
        this.remove(item);
      }
    },
    addModalColor() {
      this.dataFormColor = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add-color";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/Indicators/AddIndicatorRanges";
      this.bodyFormDefault = {
        UserIDCurent: this.userID,
        GeoCode: this.selectedGeoCode,
        IndicatorCode: this.indicatorShare,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer + 1000);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + this.indicatorShare + "?", {
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
            this.handleSubmitDelete(items);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editModalColor(items) {
      const { Color, FromValue, IndicatorCode, ToValue } = items[0];
      let body = {
        Color,
        FromValue,
        GeoCode: this.selectedGeoCode,
        IndicatorCode: this.indicatorShare,
        ToValue,
      };
      indicatorAPI
        .indicatorByIDRange(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
          this.dataFormColor = handling.showExtensionFormEdit(this.dataByID);
          this.nameForm = "modal-edit-color";
          this.titleForm = this.$t("form.title-edit").toUpperCase();
          this.typeForm = "EDIT";
          this.apiForm = "/api/Indicators/EditIndicatorRanges";
          this.bodyFormDefault = {
            UserIDCurent: this.userID,
            IndicatorCode: this.indicatorShare,
            GeoCode: this.selectedGeoCode,
          };
          this.dataFormColor.FromValue[4] = "DISABLED";
          setTimeout(() => {
            this.$bvModal.show(this.nameForm);
          }, this.timer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(items) {
      const { FromValue, IndicatorCode } = items[0];
      let body = {
        FromValue,
        GeoCode: this.selectedGeoCode,
        IndicatorCode: this.indicatorShare,
      };
      indicatorAPI
        .indicatorRemoveRanges(body)
        .then((val) => {
          let bodyFormDefault = {
            GeoCode: this.selectedGeoCode,
            IndicatorCode: this.indicatorShare,
          };
          if (val.status) {
            if (this.dataIndicator.length === 1) {
              this.getFormAddShowIndicator("IndicatorRanges");
              this.getKeyTableIndicator(bodyFormDefault);
              this.getDataIndicator(bodyFormDefault);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getDataIndicator(bodyFormDefault);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getDataIndicator(bodyFormDefault);
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSubmit(val) {
      const { IndicatorCode } = this.selectedItems[0];
      let body = {
        GeoCode: this.selectedGeoCode,
        IndicatorCode: this.indicatorShare,
      };
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getFormAddShowIndicator("IndicatorRanges");
          this.getKeyTableIndicator(body);
          this.getDataIndicator(body);
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getDataIndicator(body);
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
        this.getDataIndicator(body);
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
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
  },
};
</script>

<style lang="scss" scoped>
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
