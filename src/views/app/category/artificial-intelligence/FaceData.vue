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
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="exportModal()"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fas fa-file-download"></i>
                &emsp; {{ $t("report.action.export-file") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fas fa-file-download"></i>
                &emsp; {{ $t("report.action.export-file") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="importModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fas fa-file-upload"></i>
                &emsp;{{ $t("report.action.import-file") }}
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
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      :data-form-option="dataFormOptions"
      :max-image="4"
      @handle-submit="handleSubmit"
    ></custom-form>
    <!-- <b-modal
      id="export-modal"
      :title="titleForm"
      @hidden="resetModal"
      scrollable
      class="text-center"
    >
      <b-row>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.from-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="from"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.to-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="to"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
      </b-row>
      <template #modal-footer="{ cancel }">
        <b-button variant="secondary" @click="handleSubmitExport(0)">
          {{ $t('report.action.export-day') }}
        </b-button>
        <b-button variant="success" @click="handleSubmitExport(1)">
          {{ $t('report.action.export-all') }}
        </b-button>
        <b-button variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal> -->
    <b-modal
      id="import-modal"
      :title="titleForm"
      @hidden="resetModalImport"
      @ok="handleSubmitImport"
      scrollable
      class="text-center"
      size="md"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitImport">
        <b-row>
          <b-colxx md="12">
            <b-form-group
              :label="$t('report.action.file') + ':'"
              :label-for="file + '-input'"
            >
              <b-form-file
                v-model="file"
                :browse-text="$t('report.action.browse')"
              ></b-form-file>
            </b-form-group>
          </b-colxx>
        </b-row>
      </form>
    </b-modal>
    <!-- <template
      v-if="
        (dataNotify.DataDupDB && dataNotify.DataDupDB.length > 0) ||
        (dataNotify.DataDupFile && dataNotify.DataDupFile.length > 0) ||
        (dataNotify.DataErrorFile && dataNotify.DataErrorFile.length > 0)
      "
    >
      {{ abc }}
      <b-modal
        id="notify-modal"
        ref="notify-modal"
        hide-footer
        :title="$t('notify.notification').toUpperCase()"
        @hidden="resetModal"
      >
        <div class="text-center mb-4">
          <b-img
            :src="require('@/assets/img/X.svg')"
            style="height: 100px;"
          ></b-img>
        </div>
        <template
          v-if="dataNotify.DataDupDB && dataNotify.DataDupDB.length > 0"
        >
          <div class="bar error">
            <div class="action" @click="showDataModal(dataNotify.DataDupDB)">
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t('report.view') }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-dup-db') }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-dup-db-valid') }}
            </strong>
          </div>
        </template>
        <template
          v-if="dataNotify.DataDupFile && dataNotify.DataDupFile.length > 0"
        >
          <div class="bar error">
            <div class="action" @click="showDataModal(dataNotify.DataDupFile)">
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t('report.view') }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-dup-file') }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-dup-file-valid') }}
            </strong>
          </div>
        </template>
        <template
          v-if="dataNotify.DataErrorFile && dataNotify.DataErrorFile.length > 0"
        >
          <div class="bar error">
            <div
              class="action"
              @click="showDataModal(dataNotify.DataErrorFile)"
            >
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t('report.view') }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-error-file') }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px;"
            ></b-img>
            <strong>
              {{ $t('notify.data-valid') }}
            </strong>
          </div>
        </template>
      </b-modal>
    </template>
    <template v-else>
      <b-modal
        id="notify-modal"
        ref="notify-modal"
        hide-footer
        :title="$t('notify.notification').toUpperCase()"
        @hidden="resetModal"
        size="md"
      >
        <div class="text-center mb-4">
          <b-img
            :src="require('@/assets/img/V.svg')"
            style="height: 100px;"
          ></b-img>
        </div>
        <strong class="text-center">
          <p class="mb-0">{{ $t('notify.noti-check-2') }}.</p>
          <p class="mb-0">{{ $t('notify.noti-check-3') }}!</p>
        </strong>
      </b-modal>
    </template> -->
    <b-modal
      id="notify-modal"
      ref="notify-modal"
      hide-footer
      :title="$t('notify.notification').toUpperCase()"
      @hidden="resetModal"
      title-class="font-weight-bold"
    >
      <template
        v-if="
          (dataNotify.DataDupDB && dataNotify.DataDupDB.length > 0) ||
          (dataNotify.DataDupFile && dataNotify.DataDupFile.length > 0) ||
          (dataNotify.DataErrorFile && dataNotify.DataErrorFile.length > 0)
        "
      >
        <div class="text-center mb-4">
          <b-img
            :src="require('@/assets/img/X.svg')"
            style="height: 100px"
          ></b-img>
        </div>
        <template
          v-if="dataNotify.DataDupDB && dataNotify.DataDupDB.length > 0"
        >
          <div class="bar error">
            <div class="action" @click="showDataModal(dataNotify.DataDupDB)">
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t("report.view") }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-dup-db") }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-dup-db-valid") }}
            </strong>
          </div>
        </template>
        <template
          v-if="dataNotify.DataDupFile && dataNotify.DataDupFile.length > 0"
        >
          <div class="bar error">
            <div class="action" @click="showDataModal(dataNotify.DataDupFile)">
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t("report.view") }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-dup-file") }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-dup-file-valid") }}
            </strong>
          </div>
        </template>
        <template
          v-if="dataNotify.DataErrorFile && dataNotify.DataErrorFile.length > 0"
        >
          <div class="bar error">
            <div
              class="action"
              @click="showDataModal(dataNotify.DataErrorFile)"
            >
              <strong>
                <i class="fad fa-info-circle"></i>
                {{ $t("report.view") }}
              </strong>
            </div>
            <b-img
              :src="require('@/assets/img/X.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-error-file") }}
            </strong>
          </div>
        </template>
        <template v-else>
          <div class="bar success">
            <b-img
              :src="require('@/assets/img/V.svg')"
              style="height: 15px"
              class="mr-2"
            ></b-img>
            <strong>
              {{ $t("notify.data-valid") }}
            </strong>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="text-center mb-4">
          <b-img
            :src="require('@/assets/img/V.svg')"
            style="height: 100px"
          ></b-img>
        </div>
        <strong class="text-center">
          <p class="mb-0">{{ $t("notify.noti-check-2") }}.</p>
          <p class="mb-0">{{ $t("notify.noti-check-3") }}!</p>
        </strong>
      </template>
    </b-modal>
    <b-modal
      id="detail-modal"
      ref="detail-modal"
      size="xl"
      hide-footer
      :title="titleForm"
    >
      <custom-table
        ref="tableForm"
        :fieldTable="fieldDetails"
        :data-table="dataDetail"
        :access-write="objectData.accessWrite"
        :select-mode="selectMode"
      ></custom-table>
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
import axios, { post } from "axios";
import moment from "moment";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import excelAPI from "@/api/modules/excelAPI";
import artificialIntelligenceAPI from "@/api/modules/artificial-intelligenceAPI";
import { BASE_API } from "@/api/index.js";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },

  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      BASE_API,
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      dataFormOptions: {
        PositionID: [],
      },
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      typeFile: "FACE",
      file: null,
      dataNotify: [],
      dataDetail: [],
      fieldDetails: [
        {
          key: "HoTen",
          label: this.$t("report.station-name"),
        },
        {
          key: "SDT",
          label: this.$t("header.phone"),
        },
        {
          key: "Email",
          label: "Email",
        },
        {
          key: "DiaChi",
          label: this.$t("header.address"),
        },
        {
          key: "Passport",
          label: this.$t("modal.passport"),
        },
      ],
    };
  },
  methods: {
    showDataModal(data) {
      this.titleForm = this.$t("form.title-info").toUpperCase();
      this.dataDetail = data;
      setTimeout(() => {
        this.$bvModal.show("detail-modal");
      }, this.timer);
    },
    exportModal() {
      // this.titleForm = this.$t('report.action.export-file').toUpperCase()
      // setTimeout(() => {
      //   this.$bvModal.show('export-modal')
      // }, this.timer)
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-export") + this.objectData.formName + "?",
          {
            title: this.$t("form.export").toUpperCase(),
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
            this.handleSubmitExport(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    importModal() {
      this.titleForm = this.$t("report.action.import-file").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("import-modal");
      }, this.timer);
    },
    resetModal() {
      this.file = null;
      this.titleForm = null;
      this.dataNotify = [];
    },
    resetModalImport() {
      this.file = null;
      this.titleForm = null;
    },
    handleSubmitExport(value) {
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        // ExportType: this.typeFile,
        IsAll: value,
        FromDate: this.from,
        ToDate: this.to,
      };
      excelAPI
        .exportExcel(body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
            this.$bvModal.show("notify-modal");
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.$bvModal.hide("export-modal");
        })
        .catch((err) => console.log(err));
    },
    handleSubmitImport() {
      this.dataNotify = [];
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      let body = {
        Type: this.typeFile,
        File: this.file,
      };
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      post(this.BASE_API + "/api/ImportExcel/Import", formData)
        .then((val) => {
          spinnerDiv.style.display = "none";
          if (val.status && val.data.ErrorCode == 0) {
            this.dataNotify = val.data.Result;
            if (
              (this.dataNotify.DataDupDB &&
                this.dataNotify.DataDupDB.length > 0) ||
              (this.dataNotify.DataDupFile &&
                this.dataNotify.DataDupFile.length > 0) ||
              (this.dataNotify.DataErrorFile &&
                this.dataNotify.DataErrorFile.length > 0)
            ) {
              this.$bvModal.show("notify-modal");
              this.getData();
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.data.Message
                );
              }, this.timer * 20);
            }
          } else {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.data.Message
              );
            }, this.timer * 20);
          }
          this.titleForm = null;
          this.file = null;
        })
        .catch((err) => {
          setTimeout(() => {
            this.makeToast("danger", this.$t("toast.fail").toUpperCase(), err);
          }, this.timer);
          spinnerDiv.style.display = "none";
          console.log(err);
        });
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/FaceDatas/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("FaceDatas");
          this.getKeyTable();
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
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
        this.getData();
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
    editModal(items) {
      this.getDataByID(items[0].DataID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/FaceDatas/Edit";
        this.bodyFormDefault = {
          DataID: items[0].DataID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].FaceName + "?", {
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
            this.handleSubmitDelete(items[0].DataID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      artificialIntelligenceAPI
        .dataFaceRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("FaceDatas");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.DataID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      artificialIntelligenceAPI
        .dataFaceChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
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
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      sytemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      artificialIntelligenceAPI
        .dataFaceByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      artificialIntelligenceAPI
        .dataFaceList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
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
    getKeyTable() {
      artificialIntelligenceAPI
        .dataFaceList()
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
      sytemAPI
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
    timerLoadDashboard(time) {
      this.getData();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("FaceDatas");
    await this.getKeyTable();
    await this.timerLoadDashboard(this.timer * 120);
    // await this.getData()
    await this.getFormAddShow("FaceDatas");
    await this.getOptionPosition();
  },
  watch: {
    items() {
      this.getColumn("FaceDatas");
      this.getKeyTable();
    },
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
    }, 500);
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
/* THE BASE */
.bar {
  padding: 10px;
  margin: 10px;
  color: #333;
  background: #fafafa;
  border: 1px solid #ccc;
  position: relative;
}

/* THE VARIATIONS */

.success {
  color: #2b7515;
  background: #ecffd6;
  border: 1px solid #617c42;
}
.error {
  color: #ba3939;
  background: #ffe0e0;
  border: 1px solid #a33a3a;
}

div.action {
  position: absolute;
  top: 30%;
  right: 10px;
  color: #888;
  cursor: pointer;
}
#export-modal .modal-dialog-scrollable .modal-body {
  overflow-y: revert;
}
.notify-modal-header {
  font-weight: bold;
}
</style>
