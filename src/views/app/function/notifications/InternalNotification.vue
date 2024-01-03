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
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
            @change-isSend="statusIsSend"
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
      @handle-submit="handleSubmit"
      :data-form-option="dataFormOptions"
      :formProps="formProps"
    ></custom-form>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/NotificationForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import notificationAPI from "@/api/modules/notificationAPI";
import groupAPI from "@/api/modules/groupAPI";

export default {
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
        DataKey: [],
      },
      optionGroup: null,
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
      //validation
      formProps: {
        title: "",
        titleExtention1: "",
        body: "",
        bodyExtention1: "",
      },
    };
  },
  methods: {
    selectOption(from, to) {
      this.getData(from, to);
    },
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      // this.showDataFormOptionParentCustomerGroup(this.optionGroup)
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/InternalNotifications/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      this.dataForm.IsSchedule[4] = "IsScheduleInternalNotifications";
      this.formProps.title = "";
      this.formProps.titleExtention1 = "";
      this.formProps.body = "";
      this.formProps.bodyExtention1 = "";
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("InternalNotifications");
          this.getKeyTable();
          this.getData(this.fromDateDefault, this.toDateDefault);
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
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
        this.$bvModal.hide(this.nameForm);
        this.getData(this.fromDateDefault, this.toDateDefault);
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
      this.getDataByID(items[0].ID);
      // this.showDataFormOptionParentCustomerGroup(this.optionGroup)
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/InternalNotifications/Edit";
        this.bodyFormDefault = {
          ID: items[0].ID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.dataForm.DataKey[1] = this.dataForm.DataKey[1].split(",");
        this.dataForm.IsSchedule[1] = handling.convertBitToBoolean(
          this.dataForm.IsSchedule[1]
        );
        this.dataForm.IsSchedule[4] = "IsScheduleInternalNotifications";
        this.dataForm.Image[1] = [{ Image: this.dataForm.Image[1], Type: 1 }];
        this.formProps.title = this.dataForm["Title"][1];
        this.formProps.titleExtention1 = this.dataForm["TitleExtention1"][1];
        this.formProps.body = this.dataForm["Body"][1];
        this.formProps.bodyExtention1 = this.dataForm["BodyExtention1"][1];
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].TitleName + "?", {
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
      };
      notificationAPI
        .removeInternalNotifications(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("InternalNotifications");
              this.getKeyTable();
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
    statusIsSend(data) {
      let body = {
        ID: data.ID,
      };
      notificationAPI
        .resetSendInternalNotifications(body)
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
    statusEdit(data) {
      let body = {
        ID: data.ID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        // MenuIDCurent: this.objectData.menuIDCurrent,
      };
      notificationAPI
        .changeStatusInternalNotifications(body)
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
      notificationAPI
        .getInternalNotificationsByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(from, to) {
      let body = {
        FromDate: from,
        ToDate: to,
      };
      notificationAPI
        .getInternalNotifications(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      notificationAPI
        .getInternalNotifications()
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
    getOptionGroup() {
      groupAPI
        .recursiveGroupsActiveAll()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            this.dataFormOptions.DataKey = [];
            array.map((item, index) => {
              let obj = {
                id: item.GroupID,
                label: item.GroupName,
                keyString: index == 0 ? "all" : null,
              };
              this.dataFormOptions.DataKey.push(obj);
            });
          } else {
            this.dataFormOptions.DataKey = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // convertKeyTableData(array, ParentID, arrayTable = [], i) {
    //   array.forEach((item) => {
    //     if (item['ParentID'] != ParentID) {
    //       return
    //     }
    //     let obj = {
    //       GroupID: item['GroupID'],
    //       GroupName: item['GroupName'],
    //       ParentID: item['ParentID'],
    //       IsActive: item['IsActive'],
    //       Note: item['Note'],
    //       Key: i,
    //     }
    //     arrayTable.push(obj)
    //     this.convertKeyTableData(array, item['GroupID'], arrayTable, i + 1)
    //   })
    // },
    // showDataFormOptionParentCustomerGroup(array, id) {
    //   let _array = []
    //   if (id) {
    //     _array = array.filter((x) => x.ParentID != id && x.GroupID != id)
    //   } else {
    //     _array = array
    //   }
    //   let newArray = []
    //   handling.recursiveTreeSelectParentCustomerGroup(_array, 0, newArray, 0)
    //   this.dataFormOptions.DataKey = newArray
    // },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("InternalNotifications");
    await this.getKeyTable();
    await this.getData(this.fromDateDefault, this.toDateDefault);
    await this.getFormAddShow("InternalNotifications");
    await this.getOptionGroup();
  },
  watch: {
    items() {
      this.getColumn("InternalNotifications");
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
