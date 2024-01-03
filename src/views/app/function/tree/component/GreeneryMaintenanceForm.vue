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
        size="xl"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col lg="4">
              <b-col lg="12">
                <b-form-group :label="dataForm['OID'][0] + ':'">
                  <b-form-input
                    class="text-center"
                    v-model="dataForm['OID'][1]"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group :label="dataForm['FromDate'][0] + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="dataForm['FromDate'][1]"
                    required
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group :label="dataForm['ToDate'][0] + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="dataForm['ToDate'][1]"
                    required
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="12" style="margin-top: 25px">
                <div
                  v-show="tableListItem && tableListItem.length > 0 && isShow"
                  class="d-flex justify-content-between"
                >
                  <h5 class="text-muted mt-1">
                    <strong> CHỌN CÂY </strong>
                  </h5>
                  <div>
                    <b-button
                      variant="empty"
                      class="pt-0 pl-0 d-inline-block d-md-none"
                      v-b-toggle.displayOptions
                    >
                      <i class="simple-icon-arrow-down align-middle" />
                    </b-button>
                    <div class="d-block d-md-inline-block">
                      <div
                        class="search-sm d-inline-block float-md-left align-top"
                      >
                        <b-input
                          :placeholder="$t('form.customer-name')"
                          v-model="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-col>
            <b-col lg="4">
              <b-col lg="12">
                <b-form-group :label="dataForm['TreeRouteID'][0] + ':'">
                  <treeselect
                    name="tree-select-input"
                    :searchable="true"
                    :close-on-select="true"
                    :placeholder="$t('form.find')"
                    :no-results-text="$t('form.no-result')"
                    :options="dataFormOption['TreeRouteID']"
                    v-model="dataForm['TreeRouteID'][1]"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group :label="dataForm['GroupEmployerID'][0] + ':'">
                  <b-form-select
                    class="text-left"
                    v-model="dataForm['GroupEmployerID'][1]"
                    :options="dataFormOption['GroupEmployerID']"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group
                  :label="dataForm['MaintenanceDescription'][0] + ':'"
                >
                  <b-form-textarea
                    class="text-left"
                    v-model="dataForm['MaintenanceDescription'][1]"
                    rows="3"
                    max-rows="6"
                    style="height: 100px"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-col>
            <b-col lg="4">
              <b-col lg="12">
                <b-form-group :label="dataForm['MaintenanceAreaID'][0] + ':'">
                  <b-form-select
                    class="text-left"
                    v-model="dataForm['MaintenanceAreaID'][1]"
                    :options="dataFormOption['MaintenanceAreaID']"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group
                  :label="dataForm['MaintenanceRequestTypeID'][0] + ':'"
                >
                  <b-form-select
                    class="text-left"
                    v-model="dataForm['MaintenanceRequestTypeID'][1]"
                    :options="dataFormOption['MaintenanceRequestTypeID']"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <b-col lg="12">
                <b-form-group :label="dataForm['Note'][0] + ':'">
                  <b-form-textarea
                    class="text-left"
                    v-model="dataForm['Note'][1]"
                    rows="3"
                    max-rows="6"
                    style="height: 100px"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-col>
            <b-col md="12">
              <!-- <b-overlay :show="!isShow" rounded="sm"> -->
              <b-table
                v-show="isShow"
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
                head-variant="light"
                class="text-center mb-0"
                style="max-height: 220px"
                :current-page="currentPage"
                :per-page="perPage"
                @filtered="onFiltered"
                :filter="search"
              >
                <template v-slot:cell(Actions)="row">
                  <b-form-checkbox
                    v-model="row.item.IsSelected"
                    @change="handleChangeIsSelect(row.item)"
                    size="md"
                  ></b-form-checkbox>
                </template>
              </b-table>
              <b-pagination
                v-show="isShow"
                size="sm"
                align="center"
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
                class="m-0"
                v-if="tableListItem && tableListItem.length > 0"
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
              <p
                v-else
                class="text-center text-muted text-small font-italic mt-2"
              >
                {{ $t("map.no-data") }}
              </p>
              <!-- </b-overlay> -->
            </b-col>
          </b-row>
        </form>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-between">
            <div class="d-flex">
              <b-form-checkbox v-model="isSelectAll" size="md">
                <b>{{ $t("all").toUpperCase() }}</b>
              </b-form-checkbox>
              <h6 style="margin-top: 2px" class="ml-2">
                <i>
                  Số lượng đã chọn:
                  <b>{{ totalSelect }}</b>
                </i>
              </h6>
            </div>
            <div>
              <b-button
                variant="primary"
                class="float-right ml-2"
                @click="handleModal"
              >
                <template v-if="typeForm == 'ADD'">
                  {{ $t("pages.adds") }}
                </template>
                <template v-else>
                  {{ $t("table.time") }}
                </template>
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
import treeAPI from "@/api/modules/treeAPI";

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
    "selectTotal",
  ],
  data() {
    return {
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      avatar: null,
      avatarBase64: null,
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
      tableListItem: [],
      tableField: [
        {
          key: "Actions",
          label: this.$t("select-field"),
          tdClass: "text-center p-1",
        },
        {
          key: "TreeName",
          label: "Tên",
          tdClass: "text-left p-1",
          sortable: true,
          formatter: (value, key, item) => {
            return "(" + item.TreeNumber + ") " + value;
          },
        },
        {
          key: "FullAddress",
          label: this.$t("report.address"),
          tdClass: "text-left p-1",
          sortable: true,
        },
        {
          key: "TreeStatusName",
          label: "Trạng thái",
          tdClass: "text-left p-1",
          sortable: true,
        },
      ],
      isSelectAll: false,
      totalSelect: this.selectTotal ?? 0,
      search: "",
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      search_title: this.$t("form.search-invalid"),
      lag: false,
    };
  },
  watch: {
    "dataForm.MaintenanceAreaID"() {
      if (
        this.dataForm.MaintenanceAreaID[1] &&
        this.dataForm.MaintenanceAreaID[1] == 1
      ) {
        this.isShow = false;
        this.dataForm.Details = [];
        this.isSelectAll = true; // !!!! bug
        // if (this.tableListItem && this.tableListItem.length > 0) {
        //   this.tableListItem.forEach((e) => {
        //     this.add(e)
        //   }) //fix conlif isShow
        // } else {
        //   this.dataForm.Details = []
        // }
      } else {
        this.isShow = true;
        this.dataForm.Details = [];
        this.totalSelect = 0;
        this.isSelectAll = false;
        if (this.tableListItem && this.tableListItem.length > 0) {
          this.tableListItem.forEach((e) => {
            e.IsSelected = false;
          });
        }
      }
    },
    "dataForm.TreeRouteID"() {
      if (this.dataForm.TreeRouteID && this.dataForm.TreeRouteID[1]) {
        this.getDataTable(this.dataForm.TreeRouteID[1]);
        setTimeout(() => {
          if (this.tableListItem && this.tableListItem.length > 0) {
            if (
              this.dataForm.MaintenanceAreaID[1] &&
              this.dataForm.MaintenanceAreaID[1] == 1
            ) {
              this.isShow = false;
              this.dataForm.Details = [];
              this.tableListItem.forEach((e) => {
                this.add(e);
              });
            } else {
              this.isShow = true;
              //this.dataForm.Details = []
              this.tableListItem.forEach((e) => {
                e.IsSelected = false;
              });
            }
          } else {
            this.dataForm.Details = [];
          }
        }, 500);
      }
    },
    isSelectAll() {
      this.isShow = false;
      setTimeout(() => {
        if (this.isSelectAll == true) {
          this.dataForm.Details = [];
          this.tableListItem.forEach((detail) => {
            // if (detail.IsSelected == false) {
            detail.IsSelected = true;
            this.add(detail);
            // }
          });
        } else {
          this.dataForm.Details = [];
          this.totalSelect = 0;
          this.tableListItem.forEach((detail) => {
            detail.IsSelected = false;
          });
        }
        this.isShow = true;
      }, 1);
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    add(item) {
      this.dataForm.Details.push(item.ID);
      this.totalSelect = this.dataForm.Details.length;
    },
    remove(item) {
      const index = this.dataForm.Details.filter((id) => id == item.ID);
      this.dataForm.Details = this.dataForm.Details.filter((id) => id != index);
      this.totalSelect = this.dataForm.Details.length;
    },
    handleChangeIsSelect(item) {
      if (item.IsSelected == true) {
        this.add(item);
      } else {
        this.remove(item);
      }
      const beforeLength = this.dataForm.Details.length;
      if (beforeLength == this.tableListItem.length) {
        this.isSelectAll = true;
      }
    },
    getDataTable(id) {
      let body = {
        RouteID: id,
      };
      treeAPI
        .treeDataByRouteID(body)
        .then((val) => {
          this.tableListItem = val.status ? val.data : [];
          if (this.tableListItem) {
            this.tableListItem.forEach((e) => {
              e.IsSelected = false;
            });
          }
          if (
            this.typeForm == "EDIT" &&
            this.dataForm.tempDetails &&
            this.dataForm.tempDetails.length > 0
          ) {
            if (this.tableListItem && this.tableListItem.length > 0) {
              if (
                this.dataForm.tempDetails.length == this.tableListItem.length
              ) {
                this.dataForm.tempDetails.length = 0;
                this.isSelectAll = true;
              } else {
                this.dataForm.tempDetails.forEach((id) => {
                  this.tableListItem.forEach((item) => {
                    if (item.ID == id) {
                      item.IsSelected = true;
                      this.add(item);
                    }
                  });
                });
                this.dataForm.tempDetails.length = 0;
              }
            }
          }
        })
        .catch((err) => console.log(err));
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    resetModal() {
      this.dataForm = null;
      this.tableListItem = null;
      this.isSelectAll = false;
      this.totalSelect = 0;
      this.selectTotal = 0;
    },
    convertBody(body) {
      if (body.Details.length == 0) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          "Không có cây được chọn!"
        );
        return false;
      }
      if (
        (body.hasOwnProperty("MaintenanceAreaID") &&
          body.MaintenanceAreaID == null) ||
        (body.hasOwnProperty("MaintenanceAreaID") &&
          body.MaintenanceAreaID == "")
      ) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          "Phạm vi duy tu " + this.$t("dashboards.cannot-be-left-blank")
        );
        return false;
      }
      if (
        (body.hasOwnProperty("MaintenanceDescription") &&
          body.MaintenanceDescription == null) ||
        (body.hasOwnProperty("MaintenanceDescription") &&
          body.MaintenanceDescription == "")
      ) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          "Mô tả yêu cầu duy tu " + this.$t("dashboards.cannot-be-left-blank")
        );
        return false;
      }
      if (
        (body.hasOwnProperty("MaintenanceRequestTypeID") &&
          body.MaintenanceRequestTypeID == null) ||
        (body.hasOwnProperty("MaintenanceRequestTypeID") &&
          body.MaintenanceRequestTypeID == "")
      ) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          "Loại duy tu " + this.$t("dashboards.cannot-be-left-blank")
        );
        return false;
      }
      if (
        (body.hasOwnProperty("TreeRouteID") && body.TreeRouteID == null) ||
        (body.hasOwnProperty("TreeRouteID") && body.TreeRouteID == "")
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
        if (key == "Details") {
          body[key] = this.dataForm[key];
        } else {
          body[key] = this.dataForm[key][1];
        }
      }
      if (this.typeForm == "ADD") {
        delete body.OID;
      }
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
        autoHideDelay: 3000,
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
</style>
