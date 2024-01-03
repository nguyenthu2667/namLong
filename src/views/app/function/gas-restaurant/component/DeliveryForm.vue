<template>
  <div>
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
      :hide-footer="typeForm === 'INFO' ? true : false"
    >
      delivery
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col md="6">
            <b-form-group :label="$t('modal.delivery-code') + ':'">
              <b-form-input
                class="text-center"
                v-model="dataForm['OID']"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.delivery-date') + ':'">
              <b-form-datepicker
                :locale="locale"
                v-model="dataForm['Odate']"
                required
                :disabled="typeForm === 'INFO' ? true : false"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              :state="stateForm['StoreID']"
              :invalid-feedback="
                $t('form.please-select') + ' ' + $t('modal.choose-warehouse')
              "
              :label="$t('modal.choose-warehouse') + ':'"
            >
              <template v-if="typeForm !== 'INFO'">
                <!-- <b-form-select
                  v-model="dataForm['StoreID']"
                  :options="dataFormOption['StoreID']"
                  @change="chooseStore(dataForm['StoreID'])"
                  size="sm"
                ></b-form-select> -->
                <treeselect
                  name="tree-select-input"
                  :searchable="searchable"
                  :options="dataFormOption['StoreID']"
                  :max-height="300"
                  :placeholder="placeholder"
                  :no-results-text="noResultsText"
                  :clearable="false"
                  v-model="dataForm['StoreID']"
                  @input="chooseStore(dataForm['StoreID'])"
                  :state="stateForm['StoreID']"
                  required
                />
              </template>
              <template v-else>
                <b-form-input
                  class="text-left"
                  :value="
                    dataForm &&
                    dataFormOption['StoreID'].length > 0 &&
                    dataFormOption['StoreID'].filter(
                      (x) => x.id === dataForm['StoreID']
                    )[0].label
                  "
                  disabled
                ></b-form-input>
              </template>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('modal.choose-shipper') + ':'">
              <template v-if="typeForm !== 'INFO'">
                <template v-if="dataFormOption['EmployerID'].length > 0">
                  <b-form-select
                    v-model="dataForm['EmployerID']"
                    :options="dataFormOption['EmployerID']"
                    size="sm"
                    :disabled="typeForm === 'INFO' ? true : false"
                  ></b-form-select>
                </template>
                <template v-else>
                  <b-form-input
                    class="text-left"
                    :value="$t('modal.no-delivery-staff')"
                    disabled
                  ></b-form-input>
                </template>
              </template>
              <template v-else>
                <b-form-input
                  class="text-left"
                  :value="
                    dataForm &&
                    dataFormOption['EmployerID'].length > 0 &&
                    dataFormOption['EmployerID'].filter(
                      (x) => x.value === dataForm['EmployerID']
                    )[0].text
                  "
                  disabled
                ></b-form-input>
              </template>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group :label="$t('modal.description') + ':'">
              <b-form-textarea
                class="text-left"
                v-model="dataForm['Note']"
                rows="3"
                max-rows="6"
                :disabled="typeForm === 'INFO' ? true : false"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col md="12" v-if="typeForm !== 'INFO'">
            <b-form-group :label="$t('modal.order-list') + ':'">
              <template v-if="tableListItem.length > 0">
                <b-table
                  ref="itemTable"
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="tableListItem"
                  :fields="tableField"
                  selectable
                  selectedVariant="primary"
                  select-mode="multi"
                  @row-selected="rowSelected"
                  head-variant="light"
                  class="text-center mb-0"
                  style="max-height: 300px"
                ></b-table>
              </template>
              <template v-else>
                <strong class="font-italic text-danger">
                  ({{ $t("modal.no-order") }})
                </strong>
              </template>
            </b-form-group>
          </b-col>
          <template v-if="convertDetail.length > 0">
            <!-- <b-col md="12">
              <b-alert show variant="success" class="text-center"
                ><strong>{{$t('modal.delivery-orders').toUpperCase()}}</strong></b-alert
              >
            </b-col> -->
            <b-col md="12" class="mb-2">
              <span class="text-danger">
                <i class="fad fa-clipboard-list-check mr-2 mt-2"></i>
                <span class="font-weight-bold mr-2 p-1">
                  {{ $t("modal.delivery-orders").toUpperCase() }}
                </span>
              </span>
              <span class="float-right">
                <i class="fad fa-truck-couch"></i>
                <span class="font-weight-bold mr-2 p-1">
                  {{ $t("modal.total-money") }}:
                  <span class="text-danger" style="font-size: 18px">
                    {{ convertDetail.length }}
                  </span>
                  {{ $t("modal.orders").toLowerCase() }}
                </span>
              </span>
            </b-col>
            <!-- <b-col md="12" class="mb-2"> -->
            <!-- <span class="float-right">
              <i class="fad fa-truck-couch"></i>
              <span class="font-weight-bold mr-2 p-1">
                {{ $t("modal.total") }}:
                <span class="text-danger" style="font-size: 18px">{{
                  convertDetail.length
                }}</span>
                {{ $t("modal.orders").toLowerCase() }}
              </span>
            </span> -->
            <!-- </b-col> -->
            <template v-for="(item, index) in convertDetail">
              <b-col md="12" class="mb-2">
                <span class="font-weight-bold mr-2 pt-1 pb-1">
                  {{ index + 1 }}. {{ item.ReferenceID }}
                </span>
                <b-button
                  style="
                    width: 25px;
                    height: 25px;
                    border-radius: 3px;
                    padding: 3px 6px;
                  "
                  variant="danger"
                  class="mr-2 mb-2 mt-1"
                  @click="removeItem(item)"
                  v-if="typeForm !== 'INFO'"
                >
                  <i class="fas fa-times" style="font-size: 10px"></i>
                </b-button>
                <b-button
                  style="
                    width: 25px;
                    height: 25px;
                    border-radius: 3px;
                    padding: 3px 6px;
                  "
                  variant="info"
                  class="mb-2 mt-1"
                  @click="
                    typeForm === 'INFO' && item.StatusID > 1
                      ? fullInfoItem(dataForm['OID'], item.ReferenceID)
                      : infoItem(item.ReferenceID)
                  "
                >
                  <i class="fas fa-info" style="font-size: 10px"></i>
                </b-button>
                <span
                  class="float-right pt-1 pb-1 pl-2 pr-2"
                  :style="{ 'background-color': item.StatusColor }"
                  v-if="typeForm === 'INFO'"
                >
                  <strong>{{ item.StatusName }}</strong>
                  - {{ $t("modal.at") }}:
                  <strong>{{ convertDateTime(item.StatusTime) }}</strong>
                </span>
              </b-col>
              <b-col md="6">
                <b-form-group :label="$t('modal.store-order') + ':'">
                  <b-form-input
                    class="text-left"
                    v-model="item.StationName"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group :label="$t('modal.order-date') + ':'">
                  <b-form-input
                    class="text-right"
                    :value="convertDate(item.ReferenceDate)"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group :label="$t('modal.total-payment') + ' (VNĐ):'">
                  <b-form-input
                    class="text-right"
                    id="Total_Amnt-input"
                    :value="convertFloat(item.Total_Amnt)"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group :label="$t('modal.phone') + ':'">
                  <b-form-input
                    class="text-left"
                    v-model="item.StationPhone"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="9">
                <b-form-group :label="$t('modal.address') + ':'">
                  <b-form-input
                    class="text-left"
                    v-model="item.StationAddress"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <b-form-input
                    v-model="item.Note"
                    :placeholder="$t('modal.description') + '...'"
                    :disabled="typeForm === 'INFO' ? true : false"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <!-- <b-col md="12" v-if="typeForm === 'INFO'">
                <b-alert
                  show
                  :style="{
                    'background-color': item.StatusColor,
                    color: 'black'
                  }"
                  class="text-center"
                >
                  <strong>{{ item.StatusName }}</strong>
                  - {{ $t("modal.at") }}:
                  <strong>{{ convertDateTime(item.Statustime) }}</strong>
                </b-alert>
              </b-col> -->
            </template>
          </template>
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
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";

export default {
  props: [
    "nameForm",
    "titleForm",
    "bodyFormDefault",
    "dataForm",
    "dataFormOption",
    "apiForm",
    "typeForm",
    "stationOption",
    "tableListItem",
    "tableField",
  ],
  components: {
    Treeselect,
  },
  data() {
    return {
      searchable: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      history: [],
      detail: [],
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      stateForm: {
        StoreID: null,
      },
    };
  },
  computed: {
    convertDetail: function () {
      let array = [];
      if (this.dataForm) {
        array = this.dataForm.GasDeliveryDetails.concat(this.detail);
      }
      return array;
    },
  },
  methods: {
    chooseStore(id) {
      this.detail = [];
      this.history = [];
      this.dataForm.GasDeliveryDetails = [];
      this.$emit("choose-store", id);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      if (!this.dataForm["StoreID"]) {
        this.stateForm["StoreID"] = false;
      } else {
        this.stateForm["StoreID"] = true;
        if (this.convertDetail.length === 0) {
          valid = false;
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            this.$t("modal.please-order")
          );
        }
      }
      return valid;
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      if (this.dataForm.EmployerID == null) {
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            "Không có nhân viên"
          );
        }, 500);
        return;
      }
      let body = {
        StoreID: this.dataForm.StoreID,
        EmployerID: this.dataForm.EmployerID,
        Odate: this.dataForm.Odate,
        Note: this.dataForm.Note,
        GasDeliveryDetails: [],
      };
      this.convertDetail.forEach((element) => {
        let object = {
          ReferenceID: element.ReferenceID,
          Note: element.Note,
        };
        body.GasDeliveryDetails.push(object);
      });
      Object.assign(body, this.bodyFormDefault);
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
    resetModal() {
      this.detail = [];
      this.history = [];
      this.dataForm.GasDeliveryDetails = [];
      this.stateForm = {
        StoreID: null,
      };
      this.$emit("reset-modal");
    },
    infoItem(id) {
      this.$emit("info-item", id);
    },
    fullInfoItem(oid, id) {
      this.$emit("full-info-item", oid, id);
    },
    removeItem(items) {
      this.history = [];
      if (
        this.tableListItem.findIndex(
          (x) => x.ReferenceID === items.ReferenceID
        ) < 0
      ) {
        this.tableListItem.push(items);
        this.tableListItem.sort(handling.GetSortOrder("ReferenceID"));
        this.history = this.detail.filter(
          (x) => x.ReferenceID !== items.ReferenceID
        );
      } else {
        this.$refs.itemTable.unselectRow(
          this.tableListItem.findIndex(
            (x) => x.ReferenceID === items.ReferenceID
          )
        );
      }
      this.dataForm.GasDeliveryDetails =
        this.dataForm.GasDeliveryDetails.filter(
          (x) => x.ReferenceID !== items.ReferenceID
        );
      this.detail = this.detail.filter(
        (x) => x.ReferenceID !== items.ReferenceID
      );
    },
    rowSelected(data) {
      this.detail = [];
      if (data && data.length > 0) {
        data.forEach((element) => {
          let object = {
            ReferenceID: element.ReferenceID,
            ReferenceDate: element.ReferenceDate,
            StationName: element.StationName,
            StationPhone: element.StationPhone,
            StationAddress: element.StationAddress,
            Total_Amnt: element.Total_Amnt,
            Note: element.Note ? element.Note : "",
            StatusColor: element.StatusColor ? element.StatusColor : null,
            StatusID: element.StatusID ? element.StatusID : null,
            StatusName: element.StatusName ? element.StatusName : null,
            Statustime: element.Statustime ? element.Statustime : null,
          };
          if (
            this.dataForm.GasDeliveryDetails.findIndex(
              (x) => x.ReferenceID === object.ReferenceID
            ) < 0
          ) {
            this.detail.push(object);
          }
        });
      }
      if (this.history.length > 0) {
        this.history.forEach((_element) => {
          this.$refs.itemTable.selectRow(
            this.tableListItem.findIndex(
              (x) => x.ReferenceID === _element.ReferenceID
            )
          );
        });
      }
    },
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
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
