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
        @ok="handleModal"
        @hidden="resetModal"
        v-if="dataForm"
        scrollable
        class="text-center"
        size="xl"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col lg="4">
              <b-form-group :label="dataForm['OID'][0] + ':'">
                <b-form-input
                  class="text-center"
                  v-model="dataForm['OID'][1]"
                  disabled
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group :label="dataForm['FromDate'][0] + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="dataForm['FromDate'][1]"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group :label="dataForm['ToDate'][0] + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="dataForm['ToDate'][1]"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col lg="8" style="padding: 0px !important">
              <div class="d-flex flex-column flex-lg-row">
                <b-form-group
                  class="region-form"
                  :label="dataForm['RegionID'][0] + ':'"
                >
                  <treeselect
                    name="tree-select-input"
                    :searchable="true"
                    :close-on-select="true"
                    :placeholder="$t('form.find')"
                    :no-results-text="$t('form.no-result')"
                    :options="dataFormOption['RegionID']"
                    v-model="dataForm['RegionID'][1]"
                  />
                </b-form-group>
                <b-form-group
                  class="group-form"
                  :label="dataForm['GroupEmployerID'][0] + ':'"
                >
                  <b-form-select
                    class="text-left"
                    v-model="dataForm['GroupEmployerID'][1]"
                    :options="dataFormOption['GroupEmployerID']"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="d-flex select-maintenance">
                <div
                  class="select-maintenance-title"
                  style="white-space: nowrap"
                >
                  {{ $t("list-of-devices") }}
                </div>
                <div class="search-maintenance">
                  <b-col xl="12">
                    <div class="">
                      <b-button
                        variant="empty"
                        class="pt-0 pl-0 d-inline-block d-md-none"
                        v-b-toggle.displayOptions
                      >
                        <i class="simple-icon-arrow-down align-middle" />
                      </b-button>
                      <b-collapse id="displayOptions" class="d-md-block">
                        <div class="d-block d-md-inline-block w-100">
                          <div
                            class="search-sm d-inline-block float-md-left mr-1 align-top w-100"
                          >
                            <b-input
                              :placeholder="$t('form.customer-name')"
                              v-model="filter"
                            />
                          </div>
                        </div>
                      </b-collapse>
                    </div>
                  </b-col>
                </div>
              </div>
            </b-col>

            <!-- <div class="check-box-light" style="align-items:center">
                <div style="white-space:nowrap">{{ $t('form.filter') }}</div>
                <div
                  style="width: 100%; display: flex; justify-content: space-around;"
                >
                  <div>
                    <b-form-checkbox
                      v-model="isSelectError"
                      size="md"
                      class="ml-3"
                    >
                      <b>{{ $t('table.thead-light.device-error') }}</b>
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                      v-model="isSelectDisconnect"
                      size="md"
                      class="ml-3"
                    >
                      <b>{{ $t('table.thead-light.disconnect') }}</b>
                    </b-form-checkbox>
                  </div>
                </div>
              </div> -->
            <b-col lg="4">
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
            <b-col md="12">
              <b-table
                :responsive="true"
                :sticky-header="true"
                :no-border-collapse="true"
                :bordered="true"
                :hover="true"
                :items="tableListItem"
                :fields="tableField"
                :current-page="currentPage"
                :per-page="perPage"
                selectable
                selectedVariant="primary"
                select-mode="multi"
                head-variant="light"
                class="text-center mb-0"
                style="max-height: 560px"
                show-empty
                :filter="filter"
              >
                <template #empty="scope">
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.non-data") }}
                  </p>
                </template>
                <template #emptyfiltered="scope">
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.non-data") }}
                  </p>
                </template>
                <template v-slot:cell(Actions)="row">
                  <b-form-checkbox
                    v-model="row.item.IsCheck"
                    @change="handleChangeIsSelect(row.item)"
                    size="md"
                  ></b-form-checkbox>
                </template>

                <template v-slot:cell(LampError)="row">
                  <template v-if="row.item.LampError === 0">
                    <span></span>
                  </template>
                  <template v-else>
                    <span>✔️</span>
                  </template>
                </template>
                <template v-slot:cell(IsDisconnected)="row">
                  <template v-if="row.item.IsDisconnected === 0">
                    <span></span>
                  </template>
                  <template v-else>
                    <span>✔️</span>
                  </template>
                </template>
              </b-table>
              <b-pagination
                size="sm"
                align="center"
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
              >
                <template v-slot:next-text>
                  <i class="simple-icon-arrow-right" />
                </template>
                <template v-slot:prev-text>
                  <i class="simple-icon-arrow-left" />
                </template>
                <template v-slot:first-text>
                  <i class="simple-icon-control-start" />
                </template>
                <template v-slot:last-text>
                  <i class="simple-icon-control-end" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </form>
        <template #modal-footer>
          <div
            :class="`w-100 d-flex justify-content-between ${
              tableListItem.length > 0 ? 'flex-md-row' : 'flex-md-row-reverse'
            }`"
          >
            <div
              style="display: flex; gap: 20px"
              v-if="tableListItem && tableListItem.length > 0"
            >
              <div>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                  "
                >
                  <div>
                    <b-form-checkbox v-model="isSelectAll" size="md">
                      <b>{{ $t("all").toUpperCase() }}</b>
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                      v-model="isSelectError"
                      size="md"
                      class="ml-3"
                    >
                      <b>{{ $t("table.thead-light.device-error") }}</b>
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                      v-model="isSelectDisconnect"
                      size="md"
                      class="ml-3"
                    >
                      <b>{{ $t("table.thead-light.disconnect") }}</b>
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
              <div>
                <p style="font-style: italic">
                  {{ $t("form.selected-quantity") }}:
                  <span>{{ totalCheck }}</span>
                </p>
              </div>
            </div>
            <div>
              <b-button
                variant="primary"
                class="float-right ml-2"
                @click="handleModal"
              >
                {{ $t("pages.adds") }}
              </b-button>
              <b-button class="float-right ml-2" @click="resetModal">
                {{ $t("button.cancel") }}
              </b-button>
            </div>
          </div>
        </template>
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
import lightAPI from "@/api/modules/lightAPI";

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
    "dataTableDetail",
  ],
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
      //table-option
      isShow: true,
      tableListItem: null,
      tableListItemOld: null,
      tableField: [
        {
          key: "Actions",
          label: this.$t("select-field"),
          tdClass: "text-center",
        },
        {
          key: "ReferenceName",
          label: this.$t("table.thead-light.device-name"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "ReferenceAddress",
          label: this.$t("table.thead-light.address"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "ReferenceType",
          label: this.$t("table.thead-light.type-of-device"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "LampError",
          label: this.$t("table.thead-light.device-error"),
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "IsDisconnected",
          label: this.$t("table.thead-light.disconnect"),
          tdClass: "text-center",
          sortable: true,
        },
      ],
      isSelectError: false,
      isSelectDisconnect: false,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      notDataSelect: true,
      totalCheck: 0,
      filter: null,
      historyCheck: null,
      historyRegion: null,
      toggleCheckAll: null,
      isSelectAll: null,
      type: null,
      tableListItemOld2: null,
      checkOneOrAll: null,
    };
  },

  watch: {
    "dataForm.RegionID": {
      handler(to, from) {
        if (!this.historyRegion) {
          this.historyRegion = this.dataForm.RegionID[1];
        } else if (this.historyRegion !== this.dataForm.RegionID[1]) {
          this.dataForm.MaintenanceDetails = [];
          this.totalCheck = this.dataForm.MaintenanceDetails.length;
          this.isSelectError = false;
          this.isSelectDisconnect = false;
          this.isSelectAll = null;
          this.historyRegion = this.dataForm.RegionID[1];
        }

        if (this.dataForm.RegionID && this.dataForm.RegionID[1]) {
          this.getDataTable(this.dataForm.RegionID[1]);
        }
      },
      deep: true,
    },
    isSelectAll() {
      if (this.isSelectAll === true) {
        this.tableListItem.forEach((detail) => {
          if (detail.IsCheck === false) {
            detail.IsCheck = true;
            this.add(detail);
          }
        });
      }
      // kieemr tra xem sao no test ko fasle

      if (this.isSelectAll === false) {
        if (this.checkOneOrAll === true) {
          return;
        } else {
          this.dataForm.MaintenanceDetails = [];
          this.tableListItem.forEach((detail) => {
            detail.IsCheck = false;
            this.remove(detail);
          });
        }
      }
    },
    isSelectError() {
      if (
        this.isSelectError === true &&
        this.tableListItem &&
        this.tableListItem.length > 0
      ) {
        this.resetArr();

        this.tableListItem = this.tableListItem.filter(
          (detail) => detail.LampError === 1
        );
      } else if (this.isSelectDisconnect === true) {
        this.resetArr();
        this.tableListItem = this.tableListItemOld.filter(
          (detail) => detail.IsDisconnected === 1
        );
      } else {
        this.resetArr();
        this.tableListItem = this.tableListItemOld2;
      }
    },
    isSelectDisconnect() {
      if (
        this.isSelectDisconnect === true &&
        this.tableListItem &&
        this.tableListItem.length > 0
      ) {
        this.resetArr();
        this.tableListItem = this.tableListItem.filter(
          (detail) => detail.IsDisconnected === 1
        );
      } else if (this.isSelectError === true) {
        this.resetArr();
        this.tableListItem = this.tableListItemOld.filter(
          (detail) => detail.LampError === 1
        );
      } else {
        this.resetArr();
        this.tableListItem = this.tableListItemOld;
      }
    },
  },
  methods: {
    resetArr() {
      this.dataForm.MaintenanceDetails.length = 0;
      this.totalCheck = this.dataForm.MaintenanceDetails.length;
      this.isSelectAll = null;
      this.tableListItem.forEach((x) => (x.IsCheck = false));
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    resetModal() {
      if (this.typeForm === "ADD") {
        this.dataForm = null;
        this.tableListItem = null;
        this.isSelectAll = null;
        this.isSelectError = null;
        this.isSelectDisconnect = null;
        this.totalCheck = 0;
        this.isShow = true;
        this.checkOneOrAll = null;
      } else {
        this.dataForm = null;
        this.tableListItem = null;
        this.isSelectAll = null;
        this.isSelectError = null;
        this.isSelectDisconnect = null;
        this.totalCheck = 0;
        this.isShow = true;
        this.checkOneOrAll = null;
        this.$refs[this.nameForm].hide();
      }
    },
    add(item) {
      this.dataForm.MaintenanceDetails.push({
        ReferenceID: item.ReferenceID,
        ReferenceType: item.ReferenceType,
      });

      // handle when checkboxed full
      if (
        this.tableListItem.length === this.dataForm.MaintenanceDetails.length
      ) {
        this.checkOneOrAll = false;
        this.isSelectAll = true;
      }

      this.totalCheck = this.dataForm.MaintenanceDetails.length;
    },
    remove(item) {
      this.dataForm.MaintenanceDetails =
        this.dataForm.MaintenanceDetails.filter(
          (id) => id.ReferenceID !== item.ReferenceID
        );

      // handle when remove checkboxed
      if (
        this.tableListItem.length !== this.dataForm.MaintenanceDetails.length
      ) {
        this.checkOneOrAll = true;
        this.isSelectAll = false;
      }

      this.totalCheck = this.dataForm.MaintenanceDetails.length;
    },
    handleChangeIsSelect(item) {
      if (item.IsCheck == true) {
        this.type = item.IsCheck;
        this.add(item);
      } else {
        this.type = item.IsCheck;
        this.remove(item, item.IsCheck);
      }
    },
    getDataTable(id) {
      let body = {
        RegionID: id,
      };

      lightAPI
        .lightDataByRegionID(body)
        .then((val) => {
          this.tableListItem = val.status ? val.data : [];
          if (this.tableListItem) {
            this.tableListItem = this.tableListItem.map((e) => ({
              ...e,
              IsCheck: handling.convertBitToBoolean(e.IsCheck),
            }));
          }
          this.tableListItemOld = this.tableListItem;
          this.tableListItemOld2 = this.tableListItem;
          if (
            this.typeForm == "EDIT" &&
            this.dataForm.MaintenanceDetails &&
            this.dataForm.MaintenanceDetails.length > 0 &&
            this.tableListItem.length > 0
          ) {
            this.tableListItem = [...this.dataTableDetail];
            this.dataForm.MaintenanceDetails =
              this.dataForm.MaintenanceDetails.filter(
                (x) => x.IsCheck === 1
              ).map((y) => {
                return {
                  ReferenceID: y.ReferenceID,
                  ReferenceType: y.ReferenceType,
                };
              });
            this.totalCheck = this.dataForm.MaintenanceDetails.length;
            if (this.tableListItem) {
              this.tableListItem = this.tableListItem.map((e) => ({
                ...e,
                IsCheck: handling.convertBitToBoolean(e.IsCheck),
              }));
            }
            this.tableListItem.forEach((x) => {
              if (x.IsCheck === 1) {
                x.IsCheck = true;
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertBody(body) {
      if (body.MaintenanceDetails.length == 0) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          "Không có khu vực/ nhóm!"
        );
        return false;
      }
      if (
        (body.hasOwnProperty("GroupEmployerID") &&
          body.GroupEmployerID == null) ||
        (body.hasOwnProperty("GroupEmployerID") && body.GroupEmployerID == "")
      ) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("dashboards.cannot-be-left-blank")
        );
        return false;
      }
      return true;
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      let body = this.bodyFormDefault;
      let obj = {};
      Object.assign(body, obj);
      for (const key in this.dataForm) {
        if (key == "MaintenanceDetails") {
          body[key] = [...this.dataForm[key]];
        } else {
          body[key] = this.dataForm[key][1];
        }
      }
      if (this.typeForm == "ADD") {
        delete body.OID;

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
      } else {
        let body = this.bodyFormDefault;
        let obj = {};
        Object.assign(body, obj);
        for (const key in this.dataForm) {
          if (key === "MaintenanceDetails") {
            body[key] = JSON.parse(JSON.stringify(this.dataForm[key]));
          } else {
            body[key] = JSON.parse(JSON.stringify(this.dataForm[key][1]));
          }
        }
        // kiểm tra xem tại sao nút checkbox all ko hiện khi chọn all và tại sao khi click all rùi tắt chọn lại nó lại ko có trong body

        body.MaintenanceDetails = body.MaintenanceDetails.map((x) => ({
          ...x,
          IsCheck: handling.convertBooleanToBit(x.IsCheck),
        }));

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
      }
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
  mounted() {
    setTimeout(() => {
      if (this.tableListItem) {
        this.totalRows = this.tableListItem.length;
      }
    }, 500);
  },
  updated() {
    if (this.tableListItem) {
      this.totalRows = this.tableListItem.length;
    }
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
.vue-treeselect__control {
  padding: 10px !important;
}
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

.check-box-light {
  display: flex;
  justify-content: space-between;
}

.region-form {
  width: 50%;
  padding-right: 15px;
  padding-left: 15px;
}

.group-form {
  width: 50%;
  padding-right: 15px;
  padding-left: 15px;
}

.select-maintenance {
  align-items: center;
  padding-left: 15px;
}

.select-maintenance-title {
  width: 20%;
}

.search-maintenance {
  width: 80%;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .region-form {
    width: 100%;
  }

  .group-form {
    width: 100%;
  }
}

/* Tablet: width >= 740px and width < 1024px  */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .region-form {
    width: 100%;
  }

  .group-form {
    width: 100%;
  }
}
</style>
