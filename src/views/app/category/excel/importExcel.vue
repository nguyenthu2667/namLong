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
                @click="dowloadFile(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fas fa-file-download"></i>
                &emsp;{{ $t("pages.download") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fas fa-file-download"></i>
                &emsp;{{ $t("pages.download") }}
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
    <b-modal
      :id="nameForm"
      :ref="nameForm"
      :title="titleForm"
      @hidden="resetModal"
      @ok="handleModal"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
    >
      <form ref="form" @submit.stop.prevent="handleModal">
        <b-row>
          <template
            v-for="items in Object.keys(dataForm)"
            v-if="Object.keys(dataForm).length > 0"
          >
            <template
              v-if="
                items.toUpperCase().search('NOTE') === -1 &&
                items.toUpperCase().search('DESCRIPTION') === -1
              "
            >
              <template v-if="dataForm[items][2].toUpperCase() === 'FILE'">
                <b-colxx md="12">
                  <b-form-group
                    :label="dataForm[items][0] + ':'"
                    :label-for="items + '-input'"
                    :invalid-feedback="
                      $t('form.please-invalid') +
                      dataForm[items][0].toLowerCase()
                    "
                    :state="stateForm[items]"
                  >
                    <b-form-file
                      v-model="dataForm[items][1]"
                      browse-text="Chọn tệp"
                      :placeholder="defaultValueFile ? defaultValueFile : null"
                    ></b-form-file>
                  </b-form-group>
                </b-colxx>
              </template>
              <template v-else>
                <b-colxx md="6">
                  <b-form-group
                    :label="dataForm[items][0] + ':'"
                    :label-for="items + '-input'"
                    :invalid-feedback="
                      $t('form.please-invalid') +
                      dataForm[items][0].toLowerCase()
                    "
                    :state="stateForm[items]"
                  >
                    <b-form-input
                      class="text-left"
                      :id="items + '-input'"
                      v-model="dataForm[items][1]"
                      :state="stateForm[items]"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-colxx>
              </template>
            </template>
            <template v-else>
              <b-colxx md="12">
                <b-form-group :label="dataForm[items][0] + ':'">
                  <b-form-textarea
                    class="text-left"
                    v-model="dataForm[items][1]"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-colxx>
            </template>
          </template>
        </b-row>
      </form>
    </b-modal>
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
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      defaultValueFile: null,
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
      this.getColumn("ExcelTemplates");
      this.getKeyTable();
    },
  },
  methods: {
    dowloadFile(item) {
      const url = item[0].Link;
      window.location.href = url;
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      let pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (
          key.toUpperCase().search("NOTE") === -1 &&
          key.toUpperCase().search("DESCRIPTION") === -1
        ) {
          if (
            this.dataForm[key][2].toUpperCase() !== "SELECT" &&
            this.dataForm[key][2].toUpperCase() !== "SELECT-TREE" &&
            this.dataForm[key][2].toUpperCase() !== "DATE" &&
            this.dataForm[key][2].toUpperCase() !== "BIT" &&
            this.dataForm[key][2].toUpperCase() !== "KEY" &&
            this.dataForm[key][2].toUpperCase() !== "IMAGE" &&
            this.dataForm[key][2].toUpperCase() !== "AVATAR"
          ) {
            if (this.dataForm[key][2].toUpperCase() === "PHONE") {
              if (
                !pattern.test(this.dataForm[key][1]) ||
                this.dataForm[key][1].length !== 10
              ) {
                valid = false;
                this.stateForm[key] = false;
              } else {
                this.stateForm[key] = true;
              }
            } else {
              this.stateForm[key] = document
                .getElementById(key + "-input")
                .checkValidity();
            }
          }
        }
      }
      return valid;
    },
    resetModal() {
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.typeForm = "";
      this.bodyFormDefault = null;
      this.defaultValueFile = null;
    },
    handleModal() {
      let body = this.bodyFormDefault;
      let obj = {};
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        obj[key] = this.dataForm[key][1];
      }
      Object.assign(body, obj);
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      post(this.BASE_API + this.apiForm, formData)
        .then((val) => {
          if (val.status && val.data.ErrorCode == 0) {
            this.$bvModal.hide(this.nameForm);
            this.getColumn("ExcelTemplates");
            this.getKeyTable();
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.data.Message
              );
            }, this.timer);
          } else {
            this.$bvModal.hide(this.nameForm);
            this.getColumn("ExcelTemplates");
            this.getKeyTable();
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.data.Message
              );
            }, this.timer);
          }
          this.nameForm = null;
          this.titleForm = null;
          this.apiForm = null;
          this.typeForm = "";
          this.bodyFormDefault = null;
          this.defaultValueFile = null;
        })
        .catch((err) => console.log(err));
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/ExcelTemplates/AddImportExcelTemplates";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    editModal(items) {
      this.getDataByID(items[0].ExcelID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/ExcelTemplates/EditExcelTemplate";
        this.bodyFormDefault = {
          ID: items[0].ExcelID,
          MenuIDCurent: this.objectData.menuIDCurrent,
          UserIDCurent: this.userID,
          ExcelType: "Import",
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getDataByID(id) {
      let body = {
        ID: id,
        UserIDCurent: this.userID,
      };
      excelAPI
        .excelTemplateByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
          this.defaultValueFile = this.dataByID.Link.split("/");
          this.defaultValueFile =
            this.defaultValueFile[this.defaultValueFile.length - 1];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") +
            this.objectData.formName.toLowerCase() +
            " " +
            items[0].ExcelName +
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
            this.handleSubmitDelete(items[0].ExcelID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ID: id,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      excelAPI
        .excelTemplateRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("ExcelTemplates");
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
        ID: data.ExcelID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      excelAPI
        .excelTemplateChangeStatus(body)
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
    getData() {
      excelAPI
        .importExcelTemplateList()
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
      excelAPI
        .importExcelTemplateList()
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
    await this.getColumn("ExcelTemplates");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("ExcelTemplates");
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
