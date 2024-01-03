<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>THIẾT LẬP CẢNH BÁO</strong>
        </h1>
        <div class="d-flex justify-content-between">
          <div></div>
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
              <!-- <b-dropdown-item
                @click="indicatorModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t('form.indicator-warning-index') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t('form.indicator-warning-index') }}
              </b-dropdown-item> -->
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
      @handle-submit="handleSubmit"
    ></custom-form>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";

import systemAPI from "@/api/modules/systemAPI.js";
import warningAPI from "@/api/modules/warningAPI";
import indicatorAPI from "@/api/modules/indicatorAPI";

export default {
  props: ["geoCode", "objectData", "StationID"],
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer,
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
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      dataFormOptions: {
        LevelCode: [],
        IndicatorCode: [],
      },
      colors: [],
    };
  },
  methods: {
    getData() {
      let body = {
        StationID: this.StationID,
      };
      indicatorAPI
        .getIndicatorWarningByStations(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("IndicatorWarning_ByStations");
          this.getKeyTable();
          this.getData();
          if (this.selectedItems.length > 0) {
            this.getData();
          }
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
          if (this.selectedItems.length > 0) {
            this.getData();
          }
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
            "success",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.typeForm = "";
      this.bodyFormDefault = null;
    },
    async addModal() {
      await this.getOptionLevelWarning();
      await this.getOptionIndicator();
      // this.dataFormOptions.LevelCode = [{ text: 'text', value: 1 }]
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = this.objectData.menuIDCurrent + "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/IndicatorWarningByStations/Add";
      this.bodyFormDefault = {
        StationID: this.StationID,
        // MenuIDCurent: this.objectData.menuIDCurrent,
        GeoCode: this.geoCode,
      };
      this.dataForm.LevelCode[5] = "COLORWARNING";
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    async editModal(items) {
      await this.getOptionLevelWarning();
      await this.getOptionIndicator();
      this.getIndicatorWarningByStationsByID(items[0].IndicatorWarningID); //bug
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = this.objectData.menuIDCurrent + "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/IndicatorWarningByStations/Edit";
        this.bodyFormDefault = {
          StationID: this.StationID,
          // MenuIDCurent: this.objectData.menuIDCurrent,
          GeoCode: this.geoCode,
        };
        this.dataForm.FromValue[4] = "DISABLED";
        this.dataForm.LevelCode[4] = "DISABLED";
        this.dataForm.LevelCode[5] = "COLORWARNING";
        this.dataForm.IndicatorCode[4] = "DISABLED";
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getIndicatorWarningByStationsByID(id) {
      let body = {
        ID: id,
      };
      indicatorAPI
        .getIndicatorWarningByStationsByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].IndicatorName + "?",
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
            this.handleSubmitDelete(items[0].IndicatorWarningID);
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
      indicatorAPI.removeIndicatorWarningByStation(body).then((val) => {
        if (val.status) {
          if (this.items.length === 1) {
            this.getColumn("IndicatorWarning_ByStations");
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
      });
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.IndicatorWarningID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      indicatorAPI
        .changeStatusIndicatorWarningByStation(body)
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
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionIndicator() {
      let body = {
        GeoCode: this.geoCode,
      };
      indicatorAPI
        .indicatorListActive(body)
        .then((val) => {
          if (val.status) {
            if (val.data.length) {
              this.dataFormOptions.IndicatorCode = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].IndicatorName,
                  value: val.data[i].IndicatorCode,
                };
                this.dataFormOptions.IndicatorCode.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionLevelWarning() {
      let body = {
        GeoCode: this.geoCode,
      };
      warningAPI
        .levelWarningListActive(body)
        .then((val) => {
          if (val.status) {
            if (val.data.length) {
              this.dataFormOptions.LevelCode = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].LevelWarningName,
                  value: val.data[i].LevelWarningID,
                  statusColor: val.data[i].StatusColor,
                };
                this.dataFormOptions.LevelCode.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      let body = {
        StationID: this.StationID,
      };
      indicatorAPI
        .getIndicatorWarningByStations(body)
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
  },
  async created() {
    await this.getData();
    await this.getFormAddShow("IndicatorWarning_ByStations");
    await this.getOptionLevelWarning();
    await this.getOptionIndicator();
  },
  watch: {
    items() {
      this.getColumn("IndicatorWarning_ByStations");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
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
