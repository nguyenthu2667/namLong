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
            @row-dblclicked="handleDbClick"
            select-mode="single"
            :field-table="fields"
            :column-show="listColumnShow"
            @status-edit="statusEdit"
            :access-write="objectData.accessWrite"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      :id="typeForm"
      :title="titleForm"
      @hidden="resetModal"
      ok-only
      scrollable
      class="text-center"
      size="lg"
    >
      <b-overlay :show="loadingForm" rounded="sm">
        <modal-schedules
          ref="formSchedules"
          :dataForm="dataForm"
          :typeForm="typeForm"
          :LightID="dataFormOptions.LightID"
          :ActionID="dataFormOptions.ActionID"
          :CustomAction="dataFormOptions.CustomAction"
          :isPagination="true"
          @submit="handleSubmit"
        ></modal-schedules>
      </b-overlay>
      <template #modal-footer>
        <b-overlay :show="loadingForm" rounded="sm">
          <div class="text-right">
            <b-button
              class="t-btn"
              variant="secondary"
              @click="
                () => {
                  $bvModal.hide(typeForm);
                }
              "
            >
              <i class="fas fa-undo"></i>
              {{ $t("npl.button.cancel").toUpperCase() }}
            </b-button>
            <b-button
              v-if="typeForm == 'ADD'"
              class="t-btn"
              variant="success"
              @click.prevent.stop="handleDownTriger('add')"
            >
              <i class="fas fa-plus"></i>
              {{ $t("npl.button.add").toUpperCase() }}
            </b-button>
            <b-button
              v-if="typeForm != 'ADD'"
              class="t-btn"
              variant="danger"
              @click.prevent.stop="handleDownTriger('delete')"
            >
              <i class="fas fa-trash-alt"></i>
              {{ $t("npl.button.delete").toUpperCase() }}
            </b-button>
            <b-button
              v-if="typeForm == 'EDIT'"
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
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import CustomTables from "@/components/Table/CustomTables";
import ModalSchedules from "./component/ModalSchedules.vue";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";

export default {
  name: "CabinetSchedule",
  components: {
    "custom-table": CustomTables,
    "modal-schedules": ModalSchedules,
  },
  data() {
    return {
      idClick: null,
      timer,
      listColumnShow: null,
      listColumnShowTable: null,
      objectKey: null,
      objectKeyTable: null,
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
        ActionID: [],
        LightID: [],
        SelectID: [],
        CustomAction: [],
      },
      isDisabled: true,
      days: [],
      T2: 0,
      T3: 0,
      T4: 0,
      T5: 0,
      T6: 0,
      T7: 0,
      CN: 0,
      showSelectID: false,
      CustomActionValue: 1,
      loadingForm: false,
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
    handleDbClick(row) {
      this.idClick = row.ScheduleID;
      let body = {
        ID: row.ScheduleID,
      };
      lightAPI.lightCabinetSchedulesByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = obj;
          this.typeForm = "EDIT";
          this.titleForm = this.$t("button.update").toUpperCase();
          this.sizeModal = "xl";
          setTimeout(() => {
            this.$bvModal.show(this.typeForm);
          }, 500);
        }
      });
    },
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
          this.$refs.formSchedules.emitSubmit("delete");
          break;
      }
    },
    resetModal() {
      this.idClick = null;
      this.dataForm = null;
    },
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
    getColumnTable(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowTable = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      lightAPI
        .lightCabinetSchedulesList()
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
      lightAPI
        .lightCabinetSchedulesByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      lightAPI
        .lightCabinetSchedulesList()
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
      };
      lightAPI
        .lightCabinetSchedulesChangeStatus(body)
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
      this.dataForm = null;
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      setTimeout(() => {
        this.$bvModal.show(this.typeForm);
      }, this.timer);
    },
    handleSubmit(dataValue, type, id) {
      if (type.toUpperCase() === "ADD") {
        let body = {};
        body = { ...body, ...dataValue };
        lightAPI
          .lightCabinetSchedulesAdd(body)
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
      } else if (type.toUpperCase() === "EDIT") {
        let body = {};
        delete dataValue.Properties;
        body = { ...body, ...dataValue };
        lightAPI.lightCabinetSchedulesEdit(body).then((val) => {
          if (val.status) {
            this.makeToast("success", this.$t("toast.success"), val.message);
            this.getData();
            this.$bvModal.hide(type);
          } else {
            this.makeToast("danger", this.$t("toast.fail"), val.message);
          }
        });
      } else {
        this.$bvModal
          .msgBoxConfirm(this.$t("form.question") + this.idClick + " ?", {
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
              let body = {
                ScheduleID: this.idClick,
              };
              lightAPI.lightCabinetSchedulesRemove(body).then((val) => {
                if (val.status) {
                  this.makeToast(
                    "success",
                    this.$t("toast.success"),
                    val.message
                  );
                  this.getData();
                  this.$bvModal.hide("EDIT");
                } else {
                  this.makeToast("danger", this.$t("toast.fail"), val.message);
                }
              });
            }
          });
      }
    },
    getOptionSelectType() {
      lightAPI
        .lightCabinetSchedulesSelectTable()
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
    getOptionActionType() {
      lightAPI
        .lightCabinetActionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ActionID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ActionName,
                  value: val.data[i].ID,
                };
                // if (obj.value !== 5) {
                //ẩn-1option
                this.dataFormOptions.ActionID.push(obj);
                // }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionLightType() {
      lightAPI
        .lightLevelList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LightID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LightName,
                    value: val.data[i].LightID,
                  };
                  this.dataFormOptions.LightID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionSchedule() {
      lightAPI
        .scheduleOptionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CustomAction = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ScheduleOptionName,
                  value: val.data[i].ScheduleOptionID,
                };
                this.dataFormOptions.CustomAction.push(obj);
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
    await this.getColumn("CabinetSchedules");
    await this.getColumnTable("SLCabinetActives");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("CabinetSchedules");
    await this.getOptionActionType();
    await this.getOptionLightType();
    await this.getOptionSelectType();
    await this.getOptionSchedule();
  },
};
</script>

<style></style>
