<template>
  <div v-if="objectData" class="report-led-station">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <!-- <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp; {{ $t('pages.add') }}
              </b-dropdown-item> -->
              <!-- <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.edit') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.edit') }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp; {{ $t('dropdown.delete') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp; {{ $t('dropdown.delete') }}
              </b-dropdown-item> -->
              <!-- <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('dropdown.delete') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('dropdown.delete') }}
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="printExternalExcel('dynamic-table')"
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
          <b-row>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.device-option') + ':'">
                <b-form-select
                  v-model="selectedStation"
                  :options="stationOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.from-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="fromDate"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4">
              <b-form-group :label="$t('modal.to-date') + ':'">
                <b-form-datepicker
                  locale="vi"
                  v-model="toDate"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="4"></b-colxx>
          </b-row>
          <b-row>
            <b-col>
              <dynamic-table
                ref="tableForm"
                id="dynamic-table"
                :data-table="items"
                :field-table="fields"
                :column-show="listColumnShow"
                :access-write="objectData.accessWrite"
                :select-mode="selectMode"
              ></dynamic-table>
            </b-col>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import ledAPI from "@/api/modules/ledAPI";
import moment from "moment";

import DynamicTable from "@/components/Table/DynamicTable";

export default {
  components: {
    "dynamic-table": DynamicTable,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      items: [],
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      stationOptions: [],
      selectedStation: "#",
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getData() {
      const body = {
        View: "Date",
        StationID: this.selectedStation,
        FromDate: this.fromDate,
        ToDate: this.toDate,
      };
      ledAPI
        .ledStationReport(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];

          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getKeyTable() {
    //   const body = {
    //     View: 'Date',
    //     StationID: this.selectedStation,
    //     FromDate: this.fromDate,
    //     ToDate: this.toDate,
    //   }
    //   ledStationReport(body)
    //     .then((val) => {
    //       this.objectKey =
    //         val.status && val.data.length > 0 ? Object.keys(val.data[0]) : []
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
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
    getStationOptions() {
      ledAPI
        .getLedStationsListActive()
        .then((val) => {
          if (val.status) {
            const arr = [{ text: "Tất cả", value: "#" }];
            val.data.forEach((item) => {
              arr.push({
                text: item.StationName,
                value: item.StationID,
              });
            });
            this.stationOptions = arr;
          }
        })
        .catch((err) => {
          console.log(err);
          this.showLoadingSubmit = false;
          this.$bvModal.hide("form-led-schedule");
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("SmartLedReport");
    // await this.getKeyTable()
    await this.getData();
    await this.getStationOptions();
  },
  watch: {
    // items() {
    //   this.getColumn('SmartLedReport')
    //   // this.getKeyTable()
    // },
    selectedStation() {
      this.getData();
      // this.getKeyTable()
    },
    fromDate() {
      this.getData();
      // this.getKeyTable()
    },
    toDate() {
      this.getData();
      // this.getKeyTable()
    },
  },
  computed: {
    fields: function () {
      return handling.mergeKeyDynamic(this.objectKey, this.listColumnShow);
    },
    fieldsStationSelect: function () {
      return handling.mergeKeyDynamic(
        this.objectKeyStationSelect,
        this.listColumnShowStationSelect
      );
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
            ByCreen: this.menuRight[i].ByCreen,
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

<style lang="scss">
.report-led-station {
  .b-form-datepicker {
    .btn {
      padding: 0.75rem 1.3rem 0.7rem 1.3rem;
    }
    label {
      padding: 0.8rem 0.75rem 0.7rem 0.25rem;
      // line-height: 1.5;
    }
  }
}
</style>
