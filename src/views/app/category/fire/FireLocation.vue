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
              <!-- <b-dropdown-item
                @click="fireStation(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sensor-fire"></i>
                &emsp;{{ $t('dropdown.fire-station') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sensor-fire"></i>
                &emsp;{{ $t('dropdown.fire-station') }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="fireDetail(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-fire"></i>
                &emsp;{{ $t('dropdown.fire-location') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-fire"></i>
                &emsp;{{ $t('dropdown.fire-location') }}
              </b-dropdown-item> -->
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
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          Đang chọn:
          <strong>{{
            selectedItems.length > 0 ? selectedItems[0].FireLocationName : null
          }}</strong>
          <custom-table
            ref="tableForm"
            :data-table="itemsCollapse"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @row-clicked="rowClicked"
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
      :type-layer="'fire-alarm'"
      @handle-submit="handleSubmit"
      :data-form-option="dataFormOptions"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="modal-fire-station"
      size="xl"
      hide-header
      scrollable
      ok-only
    >
      <template v-if="selectedItems.length === 1">
        <fire-station :data="selectedItems[0]"></fire-station>
      </template>
    </b-modal>
    <b-modal
      class="text-center"
      centered
      id="modal-fire-detail"
      size="xl"
      hide-header
      scrollable
      ok-only
    >
      <template v-if="selectedItems.length === 1">
        <fire-detail :data="selectedItems[0]"></fire-detail>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import fireAPI from "@/api/modules/fireAPI";
import FireDetail from "../../map/popup-modals/FireDetail.vue";
import FireStation from "./component/FireStation.vue";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "fire-detail": FireDetail,
    "fire-station": FireStation,
  },
  data() {
    return {
      timer: 500,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      itemsCollapse: [],
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      tmpSelected: null,
      isCollapse: false,
      optionLocation: null,
      dataFormOptions: {
        ParentID: [],
      },
    };
  },
  methods: {
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    fireDetail() {
      setTimeout(() => {
        this.$bvModal.show("modal-fire-detail");
      }, this.timer);
    },
    fireStation() {
      setTimeout(() => {
        this.$bvModal.show("modal-fire-station");
      }, this.timer);
    },
    showDataFormOptionParentLocation(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID !== id && x.ID !== id);
      } else {
        _array = array;
      }
      let newArray = [];
      this.recursiveTreeSelectParentLocation(_array, 0, newArray, 0);
      let obj = {
        id: 0,
        key: -1,
        label: "Không có nhóm cha",
        parent: -1,
      };
      newArray.push(obj);
      this.dataFormOptions.ParentID = newArray;
    },
    recursiveTreeSelectParentLocation(a, i, r, c) {
      if (!a) return;
      a.forEach((element) => {
        if (element["ParentID"] != i || element["IsActive"] == false) return;
        let n = [];
        this.recursiveTreeSelectParentLocation(a, element["ID"], n, c + 1);
        if (n.length > 0) {
          r.push({
            id: element["ID"],
            label: element["FireLocationName"],
            parent: element["ParentID"],
            key: c,
            children: n,
          });
        } else {
          r.push({
            id: element["ID"],
            label: element["FireLocationName"],
            parent: element["ParentID"],
            key: c,
          });
        }
      });
    },
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.showDataFormOptionParentLocation(this.optionLocation);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/fireAPI.fireLocationActive/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("fireAPI.fireLocationActive");
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
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].ID);
      this.showDataFormOptionParentLocation(this.optionLocation);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/fireAPI.fireLocationActive/Edit";
        this.bodyFormDefault = {
          ID: items[0].ID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].FireLocationName + "?",
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
      fireAPI
        .fireLocationRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("fireAPI.fireLocationActive");
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
    rowClicked(data) {
      data.isParentCollapse = !data.isParentCollapse;
      let id = data.ID;
      if (data.isParentCollapse) {
        this.items.forEach((e) => {
          if (e.ParentID == id) {
            e.isCollapse = true;
            // chil
            this.items.forEach((c) => {
              if (c.ParentID == e.ID) {
                c.isCollapse = true;
              }
            });
            //
          }
        });
        this.itemsCollapse = this.items.filter((e) => e.isCollapse === false);
      } else {
        this.items.forEach((e) => {
          if (e.ParentID == id) {
            e.isCollapse = false;
            // chil
            this.items.forEach((c) => {
              if (c.ParentID == e.ID) {
                c.isCollapse = false;
              }
            });
            //
          }
        });
        this.itemsCollapse = this.items.filter((e) => e.isCollapse === false);
      }
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      let body = {
        ID: data.ID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      fireAPI
        .fireLocationChangeStatus(body)
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
    getDataByID(id) {
      let body = {
        ID: id,
      };
      fireAPI
        .fireLocationByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, ParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != ParentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          ParentID: item["ParentID"],
          FireLocationName: item["FireLocationName"],
          Address: item["Address"],
          Lat: item["Lat"],
          Long: item["Long"],
          Note: item["Note"],
          IsActive: item["IsActive"],
          Sort: item["Sort"],
          Level: item["Level"],
          Key: i,
          isCollapse: false,
          isParentCollapse: false,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    getData() {
      fireAPI
        .fireLocationGet()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, "0", arrTable, 0);
            this.items = arrTable;
          } else {
            this.items = [];
          }
          this.itemsCollapse = this.items.map((item) => item);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      fireAPI
        .fireLocationGet()
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
    getFireLocations() {
      fireAPI
        .fireLocationActive()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 0, arrTable, 0);
            this.optionLocation = arrTable;
          } else {
            this.optionLocation = [];
          }
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
    await this.getColumn("fireAPI.fireLocationActive");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("fireAPI.fireLocationActive");
    await this.getFireLocations();
  },
  watch: {
    items() {
      this.getColumn("fireAPI.fireLocationActive");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      let field = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      return field;
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
