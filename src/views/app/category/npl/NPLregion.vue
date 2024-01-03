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
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            ref="tableForm"
            :data-table="itemsCollapse"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            :data-form-option="dataFormOptions"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
            @row-clicked="rowClicked"
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
      :key-show="keyShow"
      @handle-submit="handleSubmit"
    ></custom-form>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import shareAPI from "@/api/modules/shareAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
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
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      dataFormOptions: {
        ParentID: [],
      },
      keyShow: 0,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      itemsCollapse: [],
    };
  },
  methods: {
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
                //chil-chil
                this.items.forEach((a) => {
                  if (a.ParentID == c.ID) {
                    a.isCollapse = true;
                    //3-chil
                    this.items.forEach((aa) => {
                      if (aa.ParentID == a.ID) {
                        aa.isCollapse = true;
                      }
                    });
                    //
                  }
                });
                //
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
                //chil-chil
                this.items.forEach((a) => {
                  if (a.ParentID == c.ID) {
                    a.isCollapse = false;
                    //3-chil
                    this.items.forEach((aa) => {
                      if (aa.ParentID == a.ID) {
                        aa.isCollapse = false;
                      }
                    });
                    //
                  }
                });
                //
              }
            });
            //
          }
        });
        this.itemsCollapse = this.items.filter((e) => e.isCollapse === false);
      }
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
      this.showDataFormOptionRoute(this.items);
      console.log('kkkk');
      console.log(this.columnAdd);
      console.log(this.dataFormOptions);
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      console.log('aaaaaaa', this.dataForm);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/nPLRegions/Add";
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
          this.getColumn("nPLRegions");
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
      this.showDataFormOptionRoute(this.items, items[0].ID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].ID === items[0].ID) {
            this.keyShow = this.items[i].Key;
          }
        }
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/nPLRegions/Edit";
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
          this.$t("form.question") + items[0].nPLRegionsName + "?",
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
      shareAPI
        .shareRegionRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("nPLRegions");
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
        ID: data.ID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      shareAPI
        .shareRegionChangeStatus(body)
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
        UserIDCurent: this.userID,
      };
      shareAPI
        .shareRegionByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
          //fix sai chính tả ParentID nên k nhân target EDIT
          // this.dataByID.ParentID = this.dataByID.ParentID + ''
          // delete this.dataByID.ParentID
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] !== parentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          nPLRegionsName: item["nPLRegionsName"],
          ParentID: item["ParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
          isCollapse: false,
          isParentCollapse: false,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    showDataFormOptionRoute(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID !== id && x.ID !== id);
      } else {
        _array = array;
      }
      let newArray = [
        {
          id: 0,
          key: 0,
          label: this.$t("form.not-available"),
          parent: 0,
        },
      ];
      this.recursiveRegionParent(_array, 0, newArray, 0);
      this.dataFormOptions.ParentID = newArray;
    },
    recursiveRegionParent(a, i, r, c) {
      if (!a) return;
      a.forEach((element) => {
        if (element["ParentID"] !== i || element["IsActive"] === false) return;
        let n = [];
        this.recursiveRegionParent(a, element["ID"], n, c + 1);
        if (n.length > 0) {
          r.push({
            id: element["ID"],
            label: element["nPLRegionsName"],
            parent: element["ParentID"],
            key: c,
            children: n,
          });
        } else {
          r.push({
            id: element["ID"],
            label: element["nPLRegionsName"],
            parent: element["ParentID"],
            key: c,
          });
        }
      });
    },
    getData() {
      nplAPI
        .getRegionList()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 0, arrTable, 0);
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
      nplAPI
        .getRegionList()
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
    await this.getColumn("nPLRegions");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow('nPLRegions')
  },
  watch: {
    items() {
      this.getColumn("nPLRegions");
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
