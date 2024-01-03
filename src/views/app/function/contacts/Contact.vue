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
                @click="infoModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
              <!-- <b-dropdown-item
                @click="resetSystemModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-undo"></i>
                &emsp;{{ $t('pages.reset-kiosk') }} 
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-undo"></i>
                &emsp;{{ $t('pages.reset-kiosk') }}
              </b-dropdown-item> -->
              <!-- <b-dropdown-item
                @click="updateDataModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.update-kiosk') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.update-kiosk') }}
              </b-dropdown-item> -->
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2">
          <span v-b-toggle.header-options variant="primary">
            <i class="fad fa-cog mr-2" style="font-size: 15px"></i>
            <strong>
              {{ $t("dashboards.from-date") }}:
              {{ convertPickerToDate(fromDateDefault) }} -
              {{ $t("dashboards.to-date") }}:
              {{ convertPickerToDate(toDateDefault) }}
            </strong>
          </span>
          <b-collapse id="header-options">
            <div class="mt-1">
              <b-row>
                <b-colxx xl="3">
                  <span class="text-small">
                    {{ $t("dashboards.from-date") }}:
                  </span>
                  <b-form-datepicker
                    size="sm"
                    :locale="locale"
                    v-model="fromDateDefault"
                    @input="selectOption(fromDateDefault, toDateDefault)"
                  ></b-form-datepicker>
                </b-colxx>
                <b-colxx xl="3">
                  <span class="text-small">
                    {{ $t("dashboards.to-date") }}:
                  </span>
                  <b-form-datepicker
                    size="sm"
                    :locale="locale"
                    v-model="toDateDefault"
                    @input="selectOption(fromDateDefault, toDateDefault)"
                  ></b-form-datepicker>
                </b-colxx>
              </b-row>
            </div>
          </b-collapse>
        </div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
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
      hide-header
      id="modal-item"
      v-if="dataModal"
      :title="titleForm"
      size="lg"
      ok-only
      centered
      scrollable
      @hide="resetModal"
    >
      <b-row>
        <b-col lg="12">
          <b-alert
            class="text-center"
            :style="'color: black; background:' + dataModal.StatusColor"
            show
          >
            <strong>{{ dataModal.StatusName.toUpperCase() }}</strong>
            <div>
              <i>{{ $t("map.update-time") }}:</i>
              <i>{{ convertDateTime(dataModal.ChangeDate) }}</i>
            </div>
          </b-alert>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="$t('label.customer')">
            <b-form-input
              class="text-left"
              v-model="dataModal.CusFullName"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="$t('label.time-contact')">
            <b-form-input
              class="text-left"
              disabled
              :value="convertDateTime(dataModal.CreateDate)"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="$t('modal.phone')">
            <b-form-input
              class="text-left"
              v-model="dataModal.CusPhone"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="'Email'">
            <b-form-input
              class="text-left"
              v-model="dataModal.CusEmail"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="$t('menu.content')">
            <b-form-textarea
              class="text-left"
              v-model="dataModal.CusContent"
              disabled
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="$t('dashboards.note')">
            <b-form-textarea
              class="text-left"
              v-model="dataModal.Note"
              :disabled="dataModal.IsApproval == 0 ? false : true"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col v-show="dataModal.IsApproval == 1" lg="12">
          <b-form-group :label="$t('label.result-handle')">
            <b-form-textarea
              class="text-left"
              v-model="dataModal.Result"
              disabled
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer="{ cancel }">
        <div class="w-100">
          <b-button class="float-right ml-2" @click="cancel()">
            {{ $t("modal.close") }}
          </b-button>
          <b-button
            v-show="dataModal.IsApproval == 0"
            variant="primary"
            class="float-right ml-2"
            @click="handleUpdate"
          >
            {{ $t("button.save-info") }}
          </b-button>
          <b-button
            v-show="dataModal.IsApproval == 0"
            variant="success"
            class="float-right ml-2"
            @click="openModalApproval"
          >
            {{ $t("button.handle-update") }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="modal-approval"
      ref="modal-approval"
      :title="$t('label.input-result-handle').toUpperCase()"
      ok-only
      @ok="handleOkLock"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitApproval">
        <b-form-group
          :state="stateValid"
          label-for="result-input"
          :invalid-feedback="$t('dashboards.enter-reason')"
        >
          <b-form-textarea
            id="result-input"
            v-model="result"
            :state="stateValid"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import contactAPI from "@/api/modules/contactAPI";

export default {
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      dataMapNow: null,
      dataModal: null,
      titleForm: null,
      result: null,
      stateValid: null,
      //date
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  watch: {
    items() {
      this.getColumn("Contacts");
      this.getKeyTable();
    },
  },
  methods: {
    selectOption(from, to) {
      this.getData(from, to);
    },
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.stateValid = valid;
      return valid;
    },
    openModalApproval() {
      setTimeout(() => {
        this.$bvModal.show("modal-approval");
      }, 500);
    },
    handleOkLock(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitApproval();
    },
    handleSubmitApproval() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.handleApproval();
        this.result = "";
        this.$bvModal.hide("modal-approval");
      });
    },
    handleApproval() {
      let body = {
        ID: this.dataModal.ID,
        Result: this.result,
      };
      contactAPI
        .updateApproval(body)
        .then((val) => {
          this.getData(this.fromDateDefault, this.toDateDefault);
          this.$bvModal.hide("modal-item");
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => console.log(err));
    },
    handleUpdate() {
      let body = {
        ID: this.dataModal.ID,
        Note: this.dataModal.Note,
      };
      contactAPI
        .updateNote(body)
        .then((val) => {
          this.getData(this.fromDateDefault, this.toDateDefault);
          this.$bvModal.hide("modal-item");
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => console.log(err));
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
      this.dataModal = null;
      this.result = "";
      this.stateValid = null;
      this.getData(this.fromDateDefault, this.toDateDefault);
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      contactAPI
        .getContactByID(body)
        .then((val) => {
          this.dataModal = val.status ? val.data[0] : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    infoModal(items) {
      this.getDataByID(items[0].ID);
      setTimeout(() => {
        this.titleForm = this.$t("dropdown.details").toUpperCase();
        this.$bvModal.show("modal-item");
      }, 500);
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    timeLoadData(time) {
      this.getData(this.fromDateDefault, this.toDateDefault);
      setTimeout(() => {
        this.timeLoadData(time);
      }, time);
    },
    getData(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
      };
      contactAPI
        .getContacts(body)
        .then((val) => {
          this.items = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      contactAPI
        .getContacts()
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("Contacts");
    await this.getKeyTable();
    await this.timeLoadData(this.timer * 120);
  },
  computed: {
    fields: function () {
      let newFields = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      // if (newFields && newFields.length > 0) {
      //   newFields.forEach((item) => {
      //     if (
      //       item.key === 'StationMoved' ||
      //       item.key === 'StationError' ||
      //       item.key === 'StationDisconnect' ||
      //       item.key === 'StationLowPin' ||
      //       item.key === 'StationTotal'
      //     ) {
      //       item.tdClass = 'text-right pt-3'
      //     }
      //   })
      // }
      return newFields;
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
.led-red {
  background-color: #f00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}

.custom-checkbox {
  position: absolute;
  top: -3px;
  left: 120px;
  padding-right: 15px;
  z-index: 99999;
}
</style>
