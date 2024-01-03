<template>
  <div v-if="objectData" class="punishment">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-card>
      <b-row>
        <b-colxx>
          <b-form-group :label="$t('wim.lane') + ':'">
            <b-form-select
              v-model="selectedLane"
              :options="optionLane"
              size="sm"
              @change="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx>
          <b-form-group :label="$t('wim.classification') + ':'">
            <b-form-select
              v-model="selectedType"
              :options="optionType"
              size="sm"
              @change="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <b-colxx>
          <b-form-group :label="$t('wim.front-licenseplate') + ':'">
            <b-form-input
              v-model="selectedBefore"
              size="sm"
              @keyup.enter="handleSearch"
              @input="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-input>
          </b-form-group>
        </b-colxx>
        <b-colxx>
          <b-form-group :label="$t('wim.behind-licenseplate') + ':'">
            <b-form-input
              v-model="selectedAfter"
              size="sm"
              @keyup.enter="handleSearch"
              @input="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-input>
          </b-form-group>
        </b-colxx>
        <b-colxx>
          <b-form-group :label="$t('modal.from-date') + ':'">
            <b-form-datepicker
              :locale="$t('wim.datepicker')"
              v-model="from"
              required
              dropleft
              @input="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <b-colxx>
          <b-form-group :label="$t('modal.to-date') + ':'">
            <b-form-datepicker
              :locale="$t('wim.datepicker')"
              v-model="to"
              required
              dropleft
              @input="
                changeOption(
                  selectedLane,
                  selectedType,
                  selectedBefore,
                  selectedAfter,
                  from,
                  to
                )
              "
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <button class="btn-search" @click="handleSearch">
          <i style="padding: 5px" class="fas fa-search"></i>
        </button>
      </b-row>
      <dynamic-table
        style="margin-top: -20px"
        v-if="items.length > 0"
        :id="'pinishment'"
        ref="tableDynamic"
        :field-table="fields"
        :data-table="items"
        :access-write="objectData.accessWrite"
        :bordered="true"
        @dbclick="handleDbClick"
        :isPagination="false"
        :isSearch="false"
        :pTotalRows="items.length"
        :pCurrentPage="pCurrentPage"
      ></dynamic-table>
      <template v-else>
        <div class="text-center font-italic text-muted p-3 bg-light">
          {{ $t("panel.non-data") }}
        </div>
      </template>
      <b-pagination
        align="center"
        :total-rows="pTotalRows"
        :per-page="pPerPage"
        v-model="pCurrentPage"
        @change="handleChangePage"
      >
        <template v-slot:next-text>
          <i class="simple-icon-arrow-right" />
        </template>
        <template v-slot:prev-text>
          <i class="simple-icon-arrow-left" />
        </template>
        <template v-slot:first-text>
          <i class="simple-icon-control-start" />
        </template>
        <template v-slot:last-text>
          <i class="simple-icon-control-end" />
        </template>
      </b-pagination>
    </b-card>
    <b-modal
      :id="`modal-detail-wim`"
      centered
      hide-header
      hide-footer
      ok-only
      size="xl"
    >
      <detail-wim
        v-if="dataModal"
        :data-modal="dataModal"
        :ID="dataModal.ID"
        :CodeID="dataModal.CodeID"
        :input-date="dataModal.InputDate"
        :output-date="dataModal.OutputDate"
        :vehicle-type="dataModal.Vehicle_TypeName"
        :img0="dataModal.Overvie_Img"
        :img1="dataModal.Front_ImgDetect"
        :img1-licenseplate="dataModal.Front_Imglicenseplate"
        :licenseplate1="dataModal.Front_licenseplate"
        :img2="dataModal.Behind_ImgDetect"
        :img2-licenseplate="dataModal.Behind_Imglicenseplate"
        :licenseplate2="dataModal.Front_licenseplate"
        :percent-over="dataModal.Total_Percent_Overload"
        :percent-over-BR="dataModal.Total_Percent_OverloadBR"
        :percent-over-DS="dataModal.Total_Percent_OverloadDS"
        :lane="dataModal.Lane"
        :vehicle-direction="dataModal.Vehicle_Direction"
        :total-alex="dataModal.Total_Alex"
        :width="dataModal.Vehicle_Width"
        :height="dataModal.Vehicle_Height"
        :weight="dataModal.Vehicle_Weight"
        :length="dataModal.Vehicle_Length"
        :speed="dataModal.Vehicle_Speed"
        :axles="dataModal.AlexDatas"
        :is-new="dataModal.IsNew"
        :is-edit="dataModal.IsEdit"
        @reload-data="reloadData"
      ></detail-wim>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/DynamicTable";
import wimAPI from "@/api/modules/wimAPI";
// import {
//   wimHistory,
//   getLanes,
//   wimByID,
//   getVehicleTypeActive,
// } from '@/api/modules/wimAPI'
import DetailWim from "@/views/app/function/wim/component/DetailWim";
import { timer } from "@/constants/config";

export default {
  name: "punishment",
  components: {
    "dynamic-table": DynamicTable,
    "detail-wim": DetailWim,
  },
  data() {
    return {
      timer,
      interval: null,
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      selectedLane: null,
      optionLane: [],
      selectedType: null,
      optionType: [],
      selectedBefore: "",
      selectedAfter: "",
      selectedDate: null,
      menuRight: [],
      items: [],
      keys: null,
      colTypes: null,
      dataModal: null,
      dataByID: null,
      totalpageNumber: 1,
      currentPage: 1,
      selectedItem: {},
      pTotalRows: null,
      pCurrentPage: 1,
      pPerPage: 1,
      isNew: null,
      isEdit: null,
    };
  },
  computed: {
    fields() {
      let result = handling.mergeKeyDynamic(this.keys, this.colTypes);
      return result;
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
  async created() {
    await this.getListMenuRight();
    await this.getColTypes("WimDatas");
    await this.getOptionLane();
    await this.getOptionVehicleType();
    await setTimeout(async () => {
      await this.getData();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
    }, 60000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async reloadData(val, ID) {
      if (val.status) {
        if (!this.data || this.data.length === 0) {
          this.getColTypes("WimDatas");
          this.getData();
          await this.getDetailByID(ID);
        } else {
          this.getData();
          await this.getDetailByID(ID);
        }
      } else {
        this.getData();
        await this.getDetailByID(ID);
      }
      // xữ lí isEdit.isNew tại đây
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    handleChangePage(page) {
      this.pCurrentPage = page;
      this.getData();
    },
    handleSearch() {
      this.getData();
    },
    getDetailByID(ID) {
      let body = {
        ID,
      };
      wimAPI
        .wimByID(body)
        .then((val) => {
          this.dataModal = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDbClick(row) {
      this.getDetailByID(row.ID);
      setTimeout(() => {
        if (this.dataModal === null) {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            this.$t("panel.non-data")
          );
        } else {
          this.$bvModal.show("modal-detail-wim");
        }
      }, 500);
    },
    changeOption(lane, type, before, after, from, to) {
      this.selectedLane = lane;
      this.selectedType = type;
      this.selectedBefore = before.trim() ? before.trim() : "";
      this.selectedAfter = after.trim() ? after.trim() : "";
      this.from = from;
      this.to = to;
    },
    getData() {
      let body = {
        LaneNumber: this.selectedLane,
        VehicleType: this.selectedType.toString(),
        Front_licenseplate:
          this.selectedBefore == "" ? "%" : this.selectedBefore,
        Behind_licenseplate:
          this.selectedAfter == "" ? "%" : this.selectedAfter,
        FromDate: this.from,
        ToDate: this.to,
        PageNumber: this.pCurrentPage.toString(),
      };
      wimAPI
        .wimHistory(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          this.items = [];
          if (data) {
            this.items = data.List100?.length > 0 ? data.List100 : [];
            this.keys =
              data.List100?.length > 0 ? Object.keys(data.List100[0]) : null;
            this.pTotalRows = data.PageNumber.TotalPages;
          }
        })
        .catch((err) => console.log(err));
    },
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionLane() {
      wimAPI
        .getLanes()
        .then((val) => {
          this.optionLane = [];
          let result = val.status ? val.data : null;
          if (result) {
            result.forEach((e) => {
              let obj = {
                text: e.LaneName,
                value: e.LaneNumber,
              };
              this.optionLane.push(obj);
            });
            this.selectedLane = this.optionLane[0].value;
          }
        })
        .catch((err) => console.log(err));
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
    getOptionVehicleType() {
      wimAPI
        .getVehicleTypeActive()
        .then((val) => {
          this.optionType = [];
          let result = val.status ? val.data : null;
          if (result) {
            result.forEach((e) => {
              let obj = {
                text: e.VehicleTypeName,
                value: e.VehicleTypeID,
              };
              this.optionType.push(obj);
            });
            this.selectedType = this.optionType[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
.b-form-btn-label-control.form-control > .form-control {
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.btn-search {
  height: 40px;
  margin-top: 26px;
  border: 1px solid gray;
  background: #004085;
  color: #fff;
}
.btn-search:hover {
  background: #0460c3;
}
</style>
<style>
.col-form-label {
  white-space: nowrap;
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
