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
            @row-selected="rowSelected"
            select-mode="single"
            :field-table="fields"
            :column-show="listColumnShow"
            @status-edit="statusEdit"
            :access-write="objectData.accessWrite"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import CustomTables from "@/components/Table/CustomTables";
import systemAPI from "@/api/modules/systemAPI";
import waterwayAPI from "@/api/modules/waterwayAPI";
import moment from "moment";

export default {
  name: "CabinetSchedule",
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      bodyFormDefault: null,
      timer,
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      dataForm: null,
      idForm: null,
      typeForm: "",
      stateForm: {
        Name: null,
        NameExtention1: null,
        NameExtention2: null,
        NameExtention3: null,
        NameExtention4: null,
        NameExtention5: null,
        NameExtention6: null,
        NameExtention7: null,
        NameExtention8: null,
        NameExtention9: null,
      },
      dataByID: null,
      columnAdd: null,
      dataFormOptions: {
        SelectID: [],
        CabinetID: [],
      },
      typeDay: null,
      isDisabled: true,
      days: [],
      T2: 0,
      T3: 0,
      T4: 0,
      T5: 0,
      T6: 0,
      T7: 0,
      CN: 0,
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
  },
  methods: {
    rowSelected(data) {
      this.selectedItems = data;
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
      waterwayAPI
        .waterWayCabinetSchedulesList()
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
    getDataByID(id) {
      let body = {
        ID: id,
      };
      waterwayAPI
        .waterWayCabinetSchedulesByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      waterwayAPI
        .waterWayCabinetSchedulesList()
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
        ScheduleID: data.ScheduleID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayCabinetSchedulesChangeStatus(body)
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
      this.bodyFormDefault = {
        UserIDCurent: this.userID,
      };
      this.typeDay = this.dataForm.SelectID[1];
      this.dataForm.Time = [
        this.$t("modal.time"),
        moment(new Date()).format("H:mm"),
        "TIME",
      ];
      this.clearDayChk();
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/WaterwaySchedules/Add";
      if (this.dataForm.CabinetStatus) {
        this.dataForm.CabinetStatus[1] = false;
      }
      this.dataForm.SelectID.push("SelectID");
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("WaterwaySchedules");
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
      this.idForm = null;
      this.typeForm = "";
      this.isDisabled = true;
    },
    editModal(items) {
      this.getDataByID(items[0].ScheduleID);
      setTimeout(() => {
        this.T2 = this.dataByID.T2;
        this.T3 = this.dataByID.T3;
        this.T4 = this.dataByID.T4;
        this.T5 = this.dataByID.T5;
        this.T6 = this.dataByID.T6;
        this.T7 = this.dataByID.T7;
        this.CN = this.dataByID.CN;
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.typeDay = this.dataForm.SelectID[1];
        if (this.dataForm.SelectID[1] === 3) {
          this.isDisabled = false;
        }
        this.dataForm.Time = [
          this.$t("modal.time"),
          this.dataByID.Hour + ":" + this.dataByID.Minute,
          "TIME",
        ];
        this.clearDayChk();
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/WaterwaySchedules/Edit";
        this.idForm = items[0].ScheduleID;
        this.dataForm.SelectID.push("SelectID");
        this.dataForm.CabinetStatus[1] = handling.convertBitToBoolean(
          this.dataForm.CabinetStatus[1]
        );
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].ScheduleID + "?", {
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
            this.handleSubmitDelete(items[0].ScheduleID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ScheduleID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayCabinetSchedulesRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("WaterwaySchedules");
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
    clearDayChk() {
      for (let i = 0; i < this.days[2].option.length; i++) {
        this.days[2].option[i].value = false;
      }
    },
    getOptionSelectType() {
      waterwayAPI
        .waterWayCabinetSchedulesSelectTable()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.SelectID = [];
              let array = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].SelectName,
                  value: val.data[i].SelectID,
                };
                array.push({
                  id: val.data[i].SelectID,
                  enable: val.data[i].SelectEnable,
                  option: val.data[i].SelectOption,
                });
                this.dataFormOptions.SelectID.push(obj);
              }
              this.days = array;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOptionCabinetID() {
      waterwayAPI
        .waterWayCabinetList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CabinetID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].CabinetName,
                  value: val.data[i].CabinetID,
                };
                this.dataFormOptions.CabinetID.push(obj);
              }
            }
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("WaterwaySchedules");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("WaterwaySchedules");
    await this.getOptionSelectType();
    await this.getOptionCabinetID();
  },
};
</script>

<style></style>
