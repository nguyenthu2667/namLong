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
              <b-dropdown-item
                @click="handleStationLinks()"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("report.action.equipment-manager") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("report.action.equipment-manager") }}
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
            @row-selected="rowSelected"
            :select-mode="selectMode"
            :field-table="fields"
            :column-show="listColumnShow"
            @status-edit="statusEdit"
            :access-write="objectData.accessWrite"
            :row-page="10"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :data-form-option="dataFormOptions"
      :state-form="stateForm"
      :type-form="typeForm"
      :body-form-default="bodyFormDefault"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      v-if="selectedItems.length > 0"
      :id="`modal-location-${selectedItems[0].ID}`"
      centered
      hide-header
      ok-only
      size="xl"
    >
      <monitor-locations-popup
        :data-camera="dataCamera"
        :fields-camera="fieldsCamera"
        :list-column-show-camera="listColumnShowCamera"
        :data-speaker="dataSpeaker"
        :fields-speaker="fieldsSpeaker"
        :list-column-show-speaker="listColumnShowSpeaker"
        :data-link="dataLink"
        :fields-link="fieldsLink"
        :list-column-show-link="listColumnShowLink"
        :select-mode="selectMode"
        :selected-items="selectedItems"
        @handle-submit-detail="handleSubmitDetail"
      ></monitor-locations-popup>
    </b-modal>
  </div>
</template>

<script>
import MonitorLocationsPopup from "@/views/app/category/monitor/locations/MonitorLocationsPopup";
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import { timer } from "@/constants/config";

import systemAPI from "@/api/modules/systemAPI.js";
import monitorAPI from "@/api/modules/monitorAPI.js";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "monitor-locations-popup": MonitorLocationsPopup,
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
      selectedLamp: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      stationByID: null,
      columnAdd: null,
      dataFormOptions: {},
      regionOption: null,
      dataLamps: [],
      keyLamp: [],
      columnAddStation: [],
      listColumnShowCamera: null,
      listColumnShowSpeaker: null,
      listColumnShowLink: null,
      dataCamera: null,
      objectKeysCamera: null,
      dataSpeaker: null,
      objectKeysSpeaker: null,
      dataLink: null,
      objectKeysLink: null,
    };
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
    fieldsCamera() {
      if (this.objectKeysCamera && this.objectKeysCamera.length > 0) {
        return handling.mergeTableAndData(
          this.objectKeysCamera,
          this.listColumnShowCamera
        );
      }
      this.objectKeysCamera = ["ID", "StationDeviceName", "Channel"];
      return handling.mergeTableAndData(
        this.objectKeysCamera,
        this.listColumnShowCamera
      );
    },
    fieldsSpeaker() {
      if (this.objectKeysSpeaker && this.objectKeysSpeaker.length > 0) {
        return handling.mergeTableAndData(
          this.objectKeysSpeaker,
          this.listColumnShowSpeaker
        );
      }
      this.objectKeysSpeaker = ["ID", "StationSpeakerName"];
      return handling.mergeTableAndData(
        this.objectKeysSpeaker,
        this.listColumnShowSpeaker
      );
    },
    fieldsLink() {
      if (this.objectKeysLink && this.objectKeysLink.length > 0) {
        return handling.mergeTableAndData(
          this.objectKeysLink,
          this.listColumnShowLink
        );
      }
      this.objectKeysLink = ["ID", "StationName"];
      return handling.mergeTableAndData(
        this.objectKeysLink,
        this.listColumnShowLink
      );
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
  methods: {
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          IsActive: item["IsActive"],
          Note: item["Note"],
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
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
    getKeyTable() {
      monitorAPI
        .monitorLocationList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
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
    getData() {
      monitorAPI
        .monitorLocationList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    statusEdit(data) {
      let body = {
        ID: data.ID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      monitorAPI
        .monitorLocationChangeStatus(body)
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
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/MonitorLocations/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("MonitorLocations");
          this.getKeyTable();
          this.getData();
          this.getDataStationCamera(id);
          this.getKeyTableCamera(id);
          this.getDataStationSpeaker(id);
          this.getKeyTableSpeaker(id);
          this.getDataStationLink(id);
          this.getKeyTableLink(id);
          this.getColumnCamera("StationDeviceLinks");
          this.getColumnSpeaker("StationSpeakerLinks");
          this.getColumnLink("StationLinks");
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("MonitorLocations");
          this.getKeyTable();
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
      this.dataCamera = null;
      this.dataSpeaker = null;
      this.dataLink = null;
    },
    handleSubmitDetail(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("MonitorLocations");
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
          let id = this.selectedItems[0].ID;
          this.getDataStationCamera(id);
          this.getKeyTableCamera(id);
          this.getDataStationSpeaker(id);
          this.getKeyTableSpeaker(id);
          this.getDataStationLink(id);
          this.getKeyTableLink(id);
          this.getColumnCamera("StationDeviceLinks");
          this.getColumnSpeaker("StationSpeakerLinks");
          this.getColumnLink("StationLinks");
          this.$bvModal.hide("modal-location-detail");

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
      this.dataCamera = null;
      this.dataSpeaker = null;
      this.dataLink = null;
    },
    editModal(items) {
      this.getDataByID(items[0].ID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/MonitorLocations/Edit";
        this.bodyFormDefault = {
          ID: items[0].ID,
          MenuIDCurent: this.objectData.menuIDCurrent,
          UserIDCurent: this.userID,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].LocationName + "?", {
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
            this.handleSubmitDelete(items[0].ID);
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
        UserIDCurent: this.userID,
      };
      monitorAPI
        .monitorLocationRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("MonitorLocations");
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
    rowSelectLamp(data) {
      this.selectedLamp = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataByID(id) {
      let body = {
        ID: id,
        UserIDCurent: this.userID,
      };
      monitorAPI
        .monitorLocationByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async handleStationLinks() {
      let id = this.selectedItems[0].ID;
      await this.getDataStationCamera(id);
      await this.getKeyTableCamera(id);
      await this.getDataStationSpeaker(id);
      await this.getKeyTableSpeaker(id);
      await this.getDataStationLink(id);
      await this.getKeyTableLink(id);

      setTimeout(() => {
        this.$bvModal.show(`modal-location-${id}`);
      }, this.timer);
    },
    getColumnCamera(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowCamera = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnSpeaker(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowSpeaker = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnLink(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowLink = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Camera
    getDataStationCamera(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .cameraStationsByID(body)
        .then((val) => {
          this.dataCamera = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableCamera(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .cameraStationsByID(body)
        .then((val) => {
          this.objectKeysCamera =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Speaker
    getDataStationSpeaker(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .speakerStationsByID(body)
        .then((val) => {
          this.dataSpeaker = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableSpeaker(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .speakerStationsByID(body)
        .then((val) => {
          this.objectKeysSpeaker =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Link
    getDataStationLink(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .linkStationsByID(body)
        .then((val) => {
          this.dataLink = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableLink(id) {
      let body = {
        LocationID: id,
      };
      monitorAPI
        .linkStationsByID(body)
        .then((val) => {
          this.objectKeysLink =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("MonitorLocations");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("MonitorLocations");
    await this.getColumnCamera("StationDeviceLinks");
    await this.getColumnSpeaker("StationSpeakerLinks");
    await this.getColumnLink("StationLinks");
  },
  watch: {
    items() {
      this.getColumn("MonitorLocations");
      this.getKeyTable();
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 1rem !important;
}
</style>
