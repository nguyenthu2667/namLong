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
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-card>
      <dynamic-table
        v-if="items.length > 0"
        style="margin-top: -20px"
        :id="'units-npl'"
        ref="tableDynamic"
        :field-table="fields"
        :data-table="items"
        :access-write="objectData.accessWrite"
        :bordered="true"
        @dbclick="handleDbClick"
        @status-edit="changeStatus"
        :isSearch="true"
      ></dynamic-table>
      <template v-else>
        <div class="text-center font-italic text-muted p-3 bg-light">
          {{ $t("panel.non-data") }}
        </div>
      </template>
    </b-card>
    <b-modal
      :id="idModal"
      :name="idModal"
      :size="sizeModal"
      :title="titleModal"
      ok-only
      scrollable
      class="text-center"
      @hidden="resetModal"
    >
      <b-overlay :show="loadingForm" rounded="sm">
        <form-schedules
          ref="formSchedules"
          :type="idModal"
          :id="idClick"
          :data-form="dataForm"
          @submit="handleSubmit"
        ></form-schedules>
      </b-overlay>
      <template #modal-footer>
        <b-overlay :show="loadingForm" rounded="sm">
          <div class="text-right">
            <b-button
              class="t-btn"
              variant="secondary"
              @click="
                () => {
                  $bvModal.hide(idModal);
                }
              "
            >
              <i class="fas fa-undo"></i>
              {{ $t("npl.button.cancel").toUpperCase() }}
            </b-button>
            <b-button
              v-if="idModal == 'add'"
              class="t-btn"
              variant="success"
              @click.prevent.stop="handleDownTriger('add')"
            >
              <i class="fas fa-plus"></i>
              {{ $t("npl.button.add").toUpperCase() }}
            </b-button>
            <b-button
              v-if="idModal != 'add'"
              class="t-btn"
              variant="danger"
              @click.prevent.stop="handleDownTriger('delete')"
            >
              <i class="fas fa-trash-alt"></i>
              {{ $t("npl.button.delete").toUpperCase() }}
            </b-button>
            <b-button
              v-if="idModal == 'edit'"
              class="t-btn"
              variant="warning"
              @click.prevent.stop="handleDownTriger('edit')"
            >
              <i class="fas fa-edit"></i>
              {{ $t("npl.button.update").toUpperCase() }}
            </b-button>
          </div>
        </b-overlay>
      </template>
    </b-modal>
  </div>
</template>
<script>
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/DynamicTable";
import FormSchedules from "./component/FormSchedules";
import radioAPI from "@/api/modules/radioAPI";
import { mapGetters } from "vuex";

export default {
  components: {
    "dynamic-table": DynamicTable,
    "form-schedules": FormSchedules,
  },
  data() {
    return {
      interval: null,
      loadingForm: false,
      menuRight: [],
      keys: null,
      colTypes: null,
      columnAdd: null,
      idClick: null,
      dataForm: null,
      idModal: null,
      titleModal: null,
      sizeModal: "md",
      items: [],
      keyString: "RadioSchedules",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    fields() {
      let result = handling.mergeKeyDynamic(this.keys, this.colTypes);
      return result;
    },
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          let obj = {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
          return obj;
        }
      }
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColTypes(this.keyString);
    await setTimeout(async () => {
      await this.getData();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    handleDownTriger(keyString) {
      switch (keyString) {
        case "add":
          this.$refs.formSchedules.emitSubmit();
          break;
        case "edit":
          this.$refs.formSchedules.emitSubmit();
          break;
        default:
        case "delete":
          this.$refs.formSchedules.emitSubmitDelete();
          break;
      }
    },
    handleSubmit(dataValue, type, id) {
      this.loadingForm = true;
      if (!this.idModal) return;
      if (type == "add") {
        let body = {};
        for (const key in dataValue) {
          body = { ...body, [key]: dataValue[key] };
        }
        const formData = new FormData();
        for (const key in body) {
          if (key == "LinkNews") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (key == "LinkRecordingFiles") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (key == "LinkTextNewsletter") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (Array.isArray(body[key])) {
            for (const i in body[key]) {
              formData.append(key, body[key][i]);
            }
          } else {
            formData.append(key, body[key]);
          }
        }
        radioAPI
          .radioSchedulesAdd(formData)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "edit" && id) {
        let body = {};
        for (const key in dataValue) {
          body = { ...body, [key]: dataValue[key] };
        }
        const formData = new FormData();
        for (const key in body) {
          if (key == "LinkNews") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (key == "LinkRecordingFiles") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (key == "LinkTextNewsletter") {
            for (const i in body[key]) {
              if (typeof body[key][i] == "object") {
                formData.append(key, body[key][i].BroadcastSource);
              } else {
                formData.append(key, body[key][i]);
              }
            }
          } else if (Array.isArray(body[key])) {
            for (const i in body[key]) {
              formData.append(key, body[key][i]);
            }
          } else {
            formData.append(key, body[key]);
          }
        }
        radioAPI
          .radioSchedulesEdit(formData)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
              this.$bvModal.hide(type);
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else if (type == "delete" && id) {
        let body = {
          ID: id,
        };
        radioAPI.radioSchedulesDelete(body).then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
            this.getData();
            this.$bvModal.hide(this.idModal);
          } else {
            this.makeToast("danger", this.$t("toast.fail"), val.message);
          }
        });
      }
      this.loadingForm = false;
    },
    resetModal() {
      this.idClick = null;
      this.dataForm = null;
    },
    changeStatus(row, key) {
      const id = row.ScheduleID;
      const newStatus = handling.convertBooleanToBit(row.IsActive);
      let body = {
        ID: id,
        IsActive: newStatus,
      };
      radioAPI
        .radioSchedulesChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
          } else {
            this.makeToast("dnager", this.$t("toast.fail"), val.message);
          }
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    getData() {
      radioAPI
        .radioScheduleList()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.items =
            data.length > 0 ? handling.convertDataBitToBoolean([...data]) : [];
          this.keys = data.length > 0 ? Object.keys(data[0]) : null;
        })
        .catch((err) => console.log(err));
    },
    handleDbClick(row) {
      this.idClick = row.ScheduleID;
      let body = {
        ID: row.ScheduleID,
      };
      radioAPI.radioScheduleByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = obj;
          this.dataForm.LinkNews.forEach((e) => {
            e.name = `${e.SourceName}`;
            e.url = e.BroadcastSource;
            e.isPlay = e.isPlay ?? false;
          });
          this.dataForm.LinkRecordingFiles.forEach((e) => {
            e.name = `${e.SourceName}`;
            e.url = e.BroadcastSource;
            e.isPlay = e.isPlay ?? false;
          });
          this.dataForm.LinkTextNewsletter.forEach((e) => {
            e.name = `${e.SourceName}`;
            e.url = e.BroadcastSource;
            e.isPlay = e.isPlay ?? false;
          });
          this.idModal = "edit";
          this.titleModal = this.$t("button.update").toUpperCase();
          this.sizeModal = "xl";
          setTimeout(() => {
            this.$bvModal.show(this.idModal);
          }, 500);
        }
      });
    },
    addModal() {
      this.dataForm = null;
      this.idModal = "add";
      this.titleModal = this.$t("button.create").toUpperCase();
      this.sizeModal = "xl";
      setTimeout(() => {
        this.$bvModal.show(this.idModal);
      }, 500);
    },
    printExternalExcel() {},
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuRight() {
      let body = {
        GroupID: this.currentUser.GroupID,
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

