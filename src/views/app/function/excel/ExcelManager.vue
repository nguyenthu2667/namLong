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
          <template v-if="items && items.length > 0">
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
          </template>
          <template v-else>
            <p class="p-3 text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import axios, { post } from "axios";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer, BASE_API } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import excelAPI from "@/api/modules/excelAPI";
export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer,
      BASE_API,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      titleForm: null,
      defaultValueFile: null,
      typeFile: null,
      file: null,
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  computed: {
    fields: function () {
      let fields = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      return fields;
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
  watch: {
    items() {
      this.getColumn("ExportDatas");
      this.getKeyTable(this.fromDateDefault, this.toDateDefault);
    },
  },
  methods: {
    selectOption(from, to) {
      this.getData(from, to);
    },
    dowloadFile(item) {
      const url = item[0].Link;
      window.location.href = url;
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") +
            this.objectData.formName.toLowerCase() +
            " " +
            items[0].ExportName +
            "?",
          {
            title: this.$t("form.warning").toUpperCase(),
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
            this.handleSubmitDelete(items[0].DataID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        DataID: id,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      excelAPI
        .excelManagerRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("ExportDatas");
              this.getKeyTable(this.fromDateDefault, this.toDateDefault);
              this.getData(this.fromDateDefault, this.toDateDefault);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData(this.fromDateDefault, this.toDateDefault);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData(this.fromDateDefault, this.toDateDefault);
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
        UserIDCurent: this.userID,
      };
      excelAPI
        .excelTemplateChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData(this.fromDateDefault, this.toDateDefault);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData(this.fromDateDefault, this.toDateDefault);
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
    getData(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
      };
      excelAPI
        .listExportExcelManager(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          // this.items.forEach((item) => {
          //   item.CreateTime = this.convertDateTime(item.CreateTime)
          // })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
      };
      excelAPI
        .listExportExcelManager(body)
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
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ExportDatas");
    await this.getKeyTable(this.fromDateDefault, this.toDateDefault);
    await this.getData(this.fromDateDefault, this.toDateDefault);
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
