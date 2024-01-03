<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1 class="mb-0">
          <strong class="mr-1">{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container"></div>
        <div class="mb-2">
          <div class="mt-1">
            <b-row>
              <b-colxx lg="4">
                <label style="margin-bottom: 0">{{ $t("view") + ":" }}</label>
                <b-form-select
                  v-model="selectedOption"
                  :options="typeOptions"
                  size="sm"
                ></b-form-select>
              </b-colxx>
              <b-col lg="5" v-if="options">
                <span class="text-small">Chọn:</span>
                <treeselect
                  class="report-treeselect"
                  :multiple="true"
                  :options="options"
                  :placeholder="placeholder"
                  v-model="selected"
                  @input="handleSelected"
                  :max-height="200"
                />
              </b-col>
              <b-col></b-col>
              <b-col class="text-right">
                <b-button-group>
                  <b-dropdown
                    right
                    :text="$t('dropdown.action')"
                    variant="primary"
                  >
                    <b-dropdown-item
                      @click="printExternalExcel('custom-table')"
                      v-if="
                        items &&
                        items.length > 0 &&
                        objectData.accessWrite === true
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
              </b-col>
            </b-row>
          </div>
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
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>

    <!-- <b-modal id="export-modal" :title="titleForm" class="text-center">
      <template #modal-footer="{ cancel }">
        <b-button variant="success" @click="handleSubmitExport(0)">
          {{ $t('report.action.download-excel') }}
        </b-button>
        <b-button variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal> -->
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
  </div>
</template>

<script>
import excelAPI from "@/api/modules/excelAPI";
// import CustomTables from '@/components/Table/CustomTables'
import CustomTables from "./components/CustomTables";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import treeAPI from "@/api/modules/treeAPI";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
export default {
  components: {
    "custom-table": CustomTables,
    Treeselect,
  },
  data() {
    return {
      timer,
      placeholder: this.$t("form.find"),
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      titleForm: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      options: null,
      selected: [],
      stringIDs: "",
      selectedOption: "Total",
      typeOptions: [
        {
          text: this.$t("select.total"),
          value: "Total",
        },
        {
          text: this.$t("detail"),
          value: "Details",
        },
      ],
    };
  },
  methods: {
    handleSelected(value) {
      if (value.includes("#")) {
        this.selected = [this.options[0].id];
        this.stringIDs = "#";
        this.getData(this.stringIDs);
      } else {
        let arr = value.filter((id) => id != "#");
        this.selected = arr;
        this.stringIDs = "";
        this.selected.forEach((id) => {
          this.stringIDs += "|" + id;
        });
        this.getData(this.stringIDs);
      }
    },
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
    exportModal() {
      this.titleForm = this.$t("report.action.download-excel").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("export-modal");
      }, this.timer);
    },
    handleSubmitExport(value) {
      let body = {
        StoreID: this.selected,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.typeFile,
        IsAll: value,
        FromDate: this.fromDateDefault,
        ToDate: this.toDateDefault,
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
    getOption() {
      treeAPI
        .treeManagementListActive()
        .then((val) => {
          let options = val.status ? val.data : null;
          if (options?.length > 0) {
            let array = [
              {
                id: "#",
                label: "Tất cả",
              },
            ];
            options.forEach((ele, index) => {
              let obj = {
                id: ele.ManagementUnitID,
                label: ele.ManagementUnitName,
                key: index,
                isDisabled: false,
              };
              array.push(obj);
            });
            this.options = array;
            this.selected =
              this.options?.length > 0 ? [this.options[0].id] : null;
            this.stringIDs = "#";
            this.getData(this.stringIDs);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getData(stringIDs) {
      // let body = {
      //   List: stringIDs,
      // }
      let body = {
        List: this.selected.join("|"),
        Type: this.selectedOption,
      };
      treeAPI
        .reportTreeManagement(body)
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];

          if (array.length > 0) {
            let arrTable = [];
            this.newConvertKeyTableData(array, "", arrTable, 0);
            this.items = arrTable;
          } else {
            this.items = [];
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
    //       ID: item['ID'],
    //       ParentID: item['ParentID'],
    //       TreeCategoryName: item['TreeCategoryName'],
    //       Sort: item['Sort'],
    //       Level: item['Level'],
    //       ValueCount: item['ValueCount'],
    //       Key: i,
    //     }
    //     arrayTable.push(obj)
    //     this.convertKeyTableData(array, item['ID'], arrayTable, i + 1)
    //   })
    // },
    newConvertKeyTableData(array, otherParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != otherParentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          ParentID: item["ParentID"],
          Key: i,
          ...item,
        };
        arrayTable.push(obj);
        this.newConvertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    getKeyTable(stringIDs) {
      // let body = {
      //   List: stringIDs,
      // }
      let body = {
        List: this.selected.join("|"),
        Type: this.selectedOption,
      };
      treeAPI
        .reportTreeManagement(body)
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
    timerLoadDashboard(time) {
      this.getData(this.stringIDs);
      this.getKeyTable("#");
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getOption();
    await this.getListMenuRight();
    // await this.getColumn('ReportTreeCategories')
    await this.getColumn("ReportTree");
    await this.getKeyTable("#");
    setTimeout(async () => {
      await this.timerLoadDashboard(this.timer * 120);
    }, 500);
  },
  watch: {
    items() {
      // this.getColumn('ReportTreeCategories')
      this.getColumn("ReportTree");
      this.getKeyTable("#");
    },
    selectedOption() {
      this.getData();
      this.getKeyTable("#");
    },
    selected(to) {
      // console.log(this.selected);
      this.stringIDs = this.selected.join("|");
    },
  },
  computed: {
    fields: function () {
      let arr = [];
      if (this.items?.length > 0) {
        const notIncludedArr = ["ID", "ParentID", "SortID", "LevelID", "Key"];

        const newObjKey = Object.keys(this.items[0]);
        newObjKey.forEach((key) => {
          if (notIncludedArr.includes(key)) {
            arr.push({
              key,
              thClass: "d-none",
              tdClass: "d-none",
            });
          } else {
            if (key.toUpperCase() == "DATANAME") {
              const nameData = this.listColumnShow.find(
                (item) => item.ClName.toUpperCase() == key.toUpperCase()
              );
              arr.push({
                key,
                label: nameData ? nameData.ShwName : "Dữ liệu",
                tdClass: "text-left",
              });
            } else {
              arr.push({
                key,
                label: key,
                tdClass: "text-center",
              });
            }
          }
        });
      }
      return arr;
    },
    // fields: function() {
    //   return handling.mergeTableAndData(this.objectKey, this.listColumnShow)
    // },
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.report-treeselect .vue-treeselect__control {
  padding: 0;
  padding-left: 10px;
}
.report-treeselect .vue-treeselect__control {
  height: 42px;
}
</style>
