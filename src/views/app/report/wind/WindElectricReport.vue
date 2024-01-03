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
                @click="exportModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel-page") }}
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
            <b-colxx lg="6">
              <b-form-group :label="$t('view') + ':'">
                <b-form-select
                  v-model="selectedOption"
                  :options="options"
                  size="sm"
                  @change="
                    changeOption(
                      selectedOption,
                      selectedOptionLocation,
                      from,
                      to
                    )
                  "
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="6">
              <b-form-group :label="$t('report.location') + ':'">
                <b-form-select
                  v-model="selectedOptionLocation"
                  :options="optionsLocation"
                  size="sm"
                  @change="
                    changeOption(
                      selectedOption,
                      selectedOptionLocation,
                      from,
                      to
                    )
                  "
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="6">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="from"
                  required
                  @input="
                    changeOption(
                      selectedOption,
                      selectedOptionLocation,
                      from,
                      to
                    )
                  "
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="6">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="to"
                  required
                  @input="
                    changeOption(
                      selectedOption,
                      selectedOptionLocation,
                      from,
                      to
                    )
                  "
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            :export-status="exportStatus"
            :row-page="10"
          >
            <template #cell(RegionName)="row">
              <div>
                {{ row }}
              </div>
            </template>
          </custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="notify-modal"
      ref="notify-modal"
      hide-footer
      :title="$t('notify.notification').toUpperCase()"
    >
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
    </b-modal>
    <b-modal
      id="export-modal"
      :title="titleForm"
      @hidden="resetModal"
      class="text-center"
    >
      <b-row>
        <b-colxx lg="6">
          <b-form-group :label="$t('report.location') + ':'">
            <b-form-select
              v-model="selectedOptionLocation"
              :options="optionsLocation"
              size="sm"
              @change="
                changeOption(selectedOption, selectedOptionLocation, from, to)
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="6">
          <b-form-group :label="$t('view') + ':'">
            <b-form-select
              v-model="selectedOption"
              :options="options"
              size="sm"
              @change="
                changeOption(selectedOption, selectedOptionLocation, from, to)
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
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
        <b-button variant="success" @click="handleSubmitExport(0)">
          {{ $t("report.action.download-excel") }}
        </b-button>
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import excelAPI from "@/api/modules/excelAPI";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import windAPI from "@/api/modules/windAPI";
import moment from "moment";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      from: handling.convertDateToPicker(handling.getDateSubtract(30)),
      to: handling.convertDateToPicker(handling.getDateNow()),
      exportStatus: "close",
      titleForm: null,
      selectedOption: this.$t("select.camera"),
      selectedOptionLocation: 2,
      options: [
        {
          text: this.$t("select.camera"),
          value: "Camera",
        },
        {
          text: this.$t("select.speaker"),
          value: "Speaker",
        },
      ],
      optionsLocation: [
        // {
        //   text: 'Vị trí 2',
        //   value: 2,
        // },
        // {
        //   text: 'Vị trí 4',
        //   value: 4,
        // },
      ],
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      storeOptions: null,
      storeDefault: null,
      dateType: "Month",
    };
  },
  watch: {
    items() {
      if (this.selectedOption === "Camera") {
        this.getColumn("ReportCameraWinds");
      } else {
        this.getColumn("ReportSpeakerWinds");
      }
    },
    selectedOption(to, from) {
      if (to === "Speaker") {
        this.getColumn("ReportSpeakerWinds");
      } else {
        this.getColumn("ReportCameraWinds");
      }
    },
  },
  methods: {
    resetModal() {
      this.file = null;
      this.titleForm = null;
      this.dataNotify = [];
      // this.from = handling.convertDateToPicker(handling.getDateSubtract(30))
      // this.to = handling.convertDateToPicker(handling.getDateNow())
    },
    exportModal() {
      this.titleForm = this.$t("report.action.download-excel").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("export-modal");
      }, this.timer);
    },
    printExternalExcel(table) {
      this.exportStatus = "open";
      setTimeout(() => {
        handling.printExcel(
          table,
          this.objectData.formName,
          null,
          null,
          this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
        );
        setTimeout(() => {
          this.exportStatus = "close";
        }, 500);
      }, 500);
    },
    changeOption(selected, selectedLocation, from, to) {
      this.getData(selected, selectedLocation, from, to);
      this.getKeyTable(selected, selectedLocation, from, to);
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    getData(selectedOption, selectedOptionLocation, from, to) {
      let body = {
        DateType: this.dateType,
        DataType: selectedOption,
        LocationID: selectedOptionLocation,
        FromDate: from,
        ToDate: to,
      };
      windAPI
        .getReportCameraOrSpeaker(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(selectedOption, selectedOptionLocation, from, to) {
      let body = {
        DateType: this.dateType,
        DataType: selectedOption,
        LocationID: selectedOptionLocation,
        FromDate: from,
        ToDate: to,
      };
      windAPI
        .getReportCameraOrSpeaker(body)
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
    handleSubmitExport(value) {
      let body = {
        StoreID: this.storeDefault,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.selectedOption,
        IsAll: value,
        FromDate: this.from,
        ToDate: this.to,
      };
      excelAPI
        .exportExcel(body)
        .then((val) => {
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getActiveWind() {
      windAPI.getActiveMonitorLocation().then((val) => {
        let data = val.status ? val.data : [];
        this.optionsLocation = data.map((x) => {
          return {
            text: x.LocationName,
            value: x.ID,
          };
        });
      });
    },
  },
  async created() {
    await this.getActiveWind();
    await this.getListMenuRight();
    await this.getColumn("ReportCameraWinds");
    await this.getKeyTable(
      this.selectedOption,
      this.selectedOptionLocation,
      this.from,
      this.to
    );
    await this.getData(
      this.selectedOption,
      this.selectedOptionLocation,
      this.from,
      this.to
    );
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
