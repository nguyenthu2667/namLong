<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="updateFaceData(selectedItems)"
                v-if="
                  selectedItems.length > 0 &&
                  selectedItems.length < 5 &&
                  objectData.accessWrite === true
                "
              >
                <i class="fad fa-save"></i>
                &emsp; Cập nhật
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-save"></i>
                &emsp; Cập nhật
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
          <b-row>
            <!--            <b-colxx xl="3" lg="6">-->
            <!--              <b-form-group :label="$t('modal.view-mode') + ':'">-->
            <!--                <b-form-select-->
            <!--                  v-model="selectedType"-->
            <!--                  :options="optionType"-->
            <!--                  size="sm"-->
            <!--                ></b-form-select>-->
            <!--              </b-form-group>-->
            <!--            </b-colxx>-->
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.device-option') + ':'">
                <b-form-select
                  v-model="selectedKiosk"
                  :options="optionKiosk"
                  size="sm"
                  @change="changeOption(selectedKiosk, from, to)"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="from"
                  required
                  @input="changeOption(selectedKiosk, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="to"
                  required
                  @input="changeOption(selectedKiosk, from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <custom-table
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="modal-add"
      ref="modal-add"
      title="CẬP NHẬT DANH TÍNH"
      @hidden="resetModal"
      @ok="handleModal"
      scrollable
      class="text-center"
      size="lg"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-colxx md="6">
            <b-form-group
              :label="$t('modal.full-name') + ':'"
              :invalid-feedback="
                $t('form.please-invalid') + $t('modal.full-name').toLowerCase()
              "
              :state="stateForm.FaceName"
            >
              <b-form-input
                class="text-left"
                id="face-name-input"
                v-model="dataForm.FaceName"
                :state="stateForm.FaceName"
                required
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx md="6">
            <b-form-group :label="$t('modal.position') + ':'">
              <b-form-select
                v-model="dataForm.PositionID"
                :options="dataFormOptions.PositionID"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-colxx>
          <b-colxx md="6">
            <b-form-group
              :label="$t('modal.phone') + ':'"
              :invalid-feedback="
                $t('form.please-invalid') + $t('modal.phone').toLowerCase()
              "
              :state="stateForm.Phone"
            >
              <b-form-input
                class="text-left"
                v-model="dataForm.Phone"
                :state="stateForm.Phone"
                required
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx md="6">
            <b-form-group
              :label="$t('modal.email') + ':'"
              :invalid-feedback="
                $t('form.please-invalid') + $t('modal.email').toLowerCase()
              "
            >
              <b-form-input
                class="text-left"
                id="email-input"
                v-model="dataForm.Email"
                required
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx md="6">
            <b-form-group
              :label="$t('modal.passport') + ':'"
              :invalid-feedback="
                $t('form.please-invalid') + $t('modal.passport').toLowerCase()
              "
              :state="stateForm.Passport"
            >
              <b-form-input
                class="text-left"
                id="passport-input"
                v-model="dataForm.Passport"
                :state="stateForm.Passport"
                required
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx md="6">
            <b-form-group
              :label="$t('modal.address') + ':'"
              :invalid-feedback="
                $t('form.please-invalid') + $t('modal.address').toLowerCase()
              "
              :state="stateForm.Address"
            >
              <b-form-input
                class="text-left"
                id="address-input"
                v-model="dataForm.Address"
                :state="stateForm.Address"
                required
              ></b-form-input>
            </b-form-group>
          </b-colxx>
          <b-colxx md="12">
            <b-form-group :label="$t('modal.image-max-four') + ':'">
              <b-row>
                <template v-if="dataForm.Images.length > 0">
                  <template v-for="(item, index) in dataForm.Images">
                    <b-colxx md="3">
                      <b-img
                        :key="index"
                        :src="item"
                        fluid
                        alt="face_image"
                        style="height: 200px; width: 100%"
                      ></b-img>
                    </b-colxx>
                  </template>
                </template>
              </b-row>
            </b-form-group>
          </b-colxx>
        </b-row>
      </form>
    </b-modal>
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
import CustomTables from "@/components/Table/CustomTables";
import CustomTableReports from "@/components/Table/CustomTableReports";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import thermalAPI from "@/api/modules/thermalAPI";
import artificialIntelligenceAPI from "@/api/modules/artificial-intelligenceAPI";
import moment from "moment";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-table-report": CustomTableReports,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer,
      selectMode: "multi",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      selectedKiosk: null,
      optionKiosk: [],
      items: null,
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedType: "%",
      optionType: [
        {
          text: this.$t("table.all"),
          value: "%",
        },
        {
          text: this.$t("table.normal"),
          value: 0,
        },
        {
          text: this.$t("table.temperature-warning"),
          value: 1,
        },
      ],
      bodyFormDefault: null,
      dataFormOptions: {
        PositionID: [],
      },
      dataForm: {
        FaceName: null,
        Phone: null,
        Email: null,
        Address: null,
        Passport: null,
        Images: [],
        PositionID: null,
      },
      stateForm: {
        FaceName: null,
        Phone: null,
        Address: null,
        Passport: null,
      },
    };
  },
  watch: {
    items() {
      this.getColumn("ReportNoFace");
    },
    // 'selectedType'(to, from) {
    //   this.getData(this.selectedKiosk, this.from, this.to)
    // }
  },
  methods: {
    resetModal() {
      this.dataForm = {
        FaceName: null,
        Phone: null,
        Email: null,
        Address: null,
        Passport: null,
        Images: [],
      };
      if (this.dataFormOptions.PositionID.length > 0) {
        this.dataForm.PositionID = this.dataFormOptions.PositionID[0].value;
      }
      this.stateForm = {
        FaceName: null,
        Phone: null,
        Address: null,
        Passport: null,
      };
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      let pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (
        !pattern.test(this.dataForm.Phone) ||
        this.dataForm.Phone.length !== 10
      ) {
        valid = false;
        this.stateForm.Phone = false;
      } else {
        this.stateForm.Phone = true;
      }
      this.stateForm.FaceName = document
        .getElementById("face-name-input")
        .checkValidity();
      this.stateForm.Passport = document
        .getElementById("passport-input")
        .checkValidity();
      this.stateForm.Address = document
        .getElementById("address-input")
        .checkValidity();
      return valid;
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let body = {
        FaceName: this.dataForm.FaceName,
        Phone: this.dataForm.Phone,
        Email: this.dataForm.Email,
        Address: this.dataForm.Address,
        Passport: this.dataForm.Passport,
        Images: null,
        PositionID: this.dataForm.PositionID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      if (this.dataForm.Images.length > 0) {
        let string = "";
        this.dataForm.Images.forEach((val) => {
          string = string + val + ";";
        });
        body.Images = string;
      }
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData("/api/FaceDatas/Add", body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          if (val.status) {
            if (val.data || val.data.length > 0) {
              this.$bvModal.hide("modal-add");
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.$bvModal.hide("modal-add");
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.$bvModal.hide("modal-add");
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    updateFaceData(selected) {
      if (this.dataFormOptions.PositionID.length > 0) {
        this.dataForm.PositionID = this.dataFormOptions.PositionID[0].value;
      }
      if (selected.length > 0) {
        let array = [];
        selected.forEach((val) => {
          array.push(val.DataImage);
        });
        this.dataForm.Images = array;
      }
      setTimeout(() => {
        this.$bvModal.show("modal-add");
      }, this.timer);
    },
    changeOption(select, from, to) {
      this.getData(select, from, to);
      this.getKeyTable(select, from, to);
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    getList() {
      thermalAPI
        .thermalKioskReportList()
        .then((val) => {
          let result = val.status ? val.data : [];
          let array = [];
          if (result.length > 0) {
            result.forEach((_val) => {
              let obj = {
                text: _val.KioskCameraName,
                value: _val.SerialNumber,
              };
              array.push(obj);
            });
            this.optionKiosk = array;
            this.selectedKiosk = this.optionKiosk[0].value;
            setTimeout(() => {
              this.getData(this.selectedKiosk, this.from, this.to);
              this.getKeyTable(this.selectedKiosk, this.from, this.to);
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(select, from, to) {
      let body = {
        SerialNumber: select,
        FromDate: from,
        ToDate: to,
      };
      thermalAPI
        .thermalKioskReportNoData(body)
        .then((val) => {
          this.items = val.status ? val.data : [];
          // let result = val.status ? val.data : []
          // if (this.selectedType === '%') {
          //   this.items = result.filter(x => x.FaceID)
          // } else {
          //   this.items = result.filter(x => x.IsWarning === this.selectedType && x.FaceID)
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(select, from, to) {
      let body = {
        SerialNumber: select,
        FromDate: from,
        ToDate: to,
      };
      thermalAPI
        .thermalKioskReportNoData(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionPosition() {
      artificialIntelligenceAPI
        .dataPosition()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.PositionID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].PositionName,
                    value: val.data[i].PositionID,
                  };
                  this.dataFormOptions.PositionID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDashboard(time) {
      this.getList();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.timerLoadDashboard(this.timer * 40);
    await this.getListMenuRight();
    await this.getColumn("ReportNoFace");
    await this.getOptionPosition();
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
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
};
</script>
<style scoped>
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
