<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <div class="d-md-flex align-items-end">
            <b-row style="flex: 1 1 100%">
              <b-col cols="12" md="3">
                <b-form-group :label="$t('menu.search') + ':'">
                  <b-form-input
                    v-model="inputSearch"
                    size="sm"
                    :placeholder="$t('menu.search') + '...'"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group :label="$t('wim.lane') + ':'">
                  <b-form-select
                    v-model="selectedLane"
                    :options="optionLane"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group :label="$t('wim.classification') + ':'">
                  <b-form-select
                    v-model="selectedType"
                    :options="optionType"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group :label="$t('wim.overload') + ':'">
                  <b-form-select
                    v-model="selectedOverLoad"
                    :options="optionOverload"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- <b-col cols="12" md="3" class="mb-4"> -->
            <div
              class="pl-md-3 d-flex justify-content-end"
              style="margin-bottom: 18px"
            >
              <button
                style="
                  height: 40px;
                  border: 1px solid gray;
                  background: #004085;
                  color: #fff;
                  float: left;
                "
                @click="handleSearch"
                class="mt-md-4"
              >
                <i style="padding: 5px" class="fas fa-search"></i>
              </button>
            </div>
            <!-- </b-col> -->
          </div>
          <dynamic-table
            style="margin-top: -20px"
            v-if="data && data.length > 0"
            ref="tableForm"
            :data-table="data"
            :field-table="fields"
            :select-mode="selectMode"
            :column-show="listColumnShow"
            @dbclick="handleDbClick"
            :bordered="true"
            :isPagination="false"
            :pTotalRows="data.length"
            :filter="inputSearch"
            :isSearch="false"
          ></dynamic-table>
          <template v-else>
            <div class="text-center font-italic text-muted p-3 bg-light">
              {{ $t("panel.non-data") }}
            </div>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      :id="`modal-detail-wim`"
      centered
      hide-header
      hide-footer
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
        :licenseplate2="dataModal.Behind_licenseplate"
        :percent-over="dataModal.Total_Percent_Overload"
        :percent-over-bridge="dataModal.Total_Percent_OverloadBR"
        :percent-over-design="dataModal.Total_Percent_OverloadDS"
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
import wimAPI from "@/api/modules/wimAPI";
// import {
//   wimDatas,
//   wimByID,
//   wimDatasMore,
//   getLanes,
//   getVehicleTypeActive,
// } from '@/api/modules/wimAPI'

import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
// import DynamicTable from '@/views/app/function/wim/component/MonitorTable'
import DynamicTable from "@/components/Table/DynamicTable";
import DetailWim from "@/views/app/function/wim/component/DetailWim";

export default {
  components: {
    "dynamic-table": DynamicTable,
    "detail-wim": DetailWim,
  },
  async created() {
    await this.getOptionLane();
    await this.getOptionVehicleType();
    await this.getColumn("WimDatas");
    await this.getListMenuRight();
    setTimeout(async () => {
      await this.getKeyTable();
      await this.getWimDatas();
    }, 500);
    this.interval = setInterval(async () => {
      await this.getWimDatasMore();
    }, 3000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  data: function () {
    return {
      interval: null,
      timer,
      objectKey: null,
      listColumnShow: [],
      menuRight: [],
      data: null,
      dataModal: null,
      selectMode: "single",
      lastObject: {},
      selectedLane: null,
      optionLane: [],
      selectedType: null,
      optionType: [],
      selectedOverLoad: 0,
      optionOverload: [
        { text: this.$t("modal.view-all"), value: 0 },
        { text: this.$t("wim.overload"), value: 1 },
      ],
      inputSearch: "",
    };
  },
  methods: {
    async reloadData(val, ID) {
      if (val.status) {
        if (!this.data || this.data.length === 0) {
          this.getColumn("WimDatas");
          this.getKeyTable();
          this.getWimDatas();
          await this.getDetailByID(ID);
        } else {
          this.getWimDatas();
          await this.getDetailByID(ID);
        }
      } else {
        this.getWimDatas();
        await this.getDetailByID(ID);
      }
      // xữ lí isEdit.isNew tại đây
    },
    handleSearch() {
      this.getWimDatas();
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
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
    getWimDatas() {
      let body = {
        LaneNumber: this.selectedLane,
        VehicleType: this.selectedType,
        IsOverLoad: this.selectedOverLoad,
      };
      wimAPI
        .wimDatas(body)
        .then((val) => {
          this.data = val.status ? val.data.List30 : [];
          this.lastObject = val.status ? val.data.LastID : {};
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWimDatasMore() {
      let ID = this.lastObject.ID;
      let body = {
        ID,
        LaneNumber: this.selectedLane,
        VehicleType: this.selectedType,
        IsOverLoad: this.selectedOverLoad,
      };
      wimAPI
        .wimDatasMore(body)
        .then((val) => {
          this.lastObject = val.data.LastID ? { ...val.data.LastID } : {};
          let data = val.data.List30;
          data.forEach((x) => {
            if (!this.data.some((y) => x.CodeID === y.CodeID)) {
              this.data.unshift(x);
              if (this.data.length >= 301) {
                this.data.pop();
              }
            }
          });
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
    getKeyTable() {
      let body = {
        LaneNumber: this.selectedLane,
        VehicleType: this.selectedType,
        IsOverLoad: this.selectedOverLoad,
      };
      wimAPI
        .wimDatas(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.List30.length > 0
              ? Object.keys(val.data.List30[0])
              : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    fields: function () {
      return handling.mergeKeyDynamic(this.objectKey, this.listColumnShow);
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
};
</script>

<style lang="scss" scoped></style>
