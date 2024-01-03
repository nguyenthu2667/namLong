<template>
  <div v-if="objectData">
    <h1>
      <strong>{{ objectData.formName }}</strong>
    </h1>
    <div class="separator mb-5"></div>
    <b-card no-body>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="wim-tab-check">
            <b-row class="mb-1">
              <b-colxx>
                <b-form-group :label="$t('wim.lane') + ':'">
                  <b-form-select
                    size="sm"
                    v-model="selectedLane"
                    :options="laneOptions"
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
                    size="sm"
                    v-model="selectedType"
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
                    :options="optionType"
                  ></b-form-select>
                </b-form-group>
              </b-colxx>
              <b-colxx>
                <b-form-group :label="$t('wim.front-licenseplate') + ':'">
                  <b-form-input
                    size="sm"
                    v-model="selectedBefore"
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
                    size="sm"
                    @keyup.enter="handleSearch"
                    v-model="selectedAfter"
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
                    required
                    v-model="from"
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
                    required
                    v-model="to"
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
            <b-row class="mt-3">
              <b-colxx xxs="12" class="mb-4">
                <template v-if="data.length > 0">
                  <dynamic-table
                    style="margin-top: -30px"
                    v-if="data.length > 0"
                    :id="'overload'"
                    :bordered="true"
                    :data-table="data"
                    :field-table="fields"
                    @dbclick="rowDoubleClick"
                    :access-write="objectData.accessWrite"
                    :isPagination="false"
                    :isSearch="false"
                    :pTotalRows="data.length"
                    :pCurrentPage="pCurrentPage"
                  ></dynamic-table>
                </template>
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
              </b-colxx>
            </b-row>
          </b-card>
        </b-colxx>
      </b-row>
    </b-card>
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
        :CodeID="dataModal.CodeID"
        :ID="dataModal.ID"
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
import wimAPI from "@/api/modules/wimAPI";
// import {
//   wimOverload,
//   getLanes,
//   wimByID,
//   getVehicleTypeActive,
// } from '@/api/modules/wimAPI'
import handling from "@/constants/handling";

// import DynamicTable from '@/components/Table/DynamicTable'
import DynamicTable from "@/components/Table/DynamicTable";
import { timer } from "@/constants/config";
import DetailWim from "@/views/app/function/wim/component/DetailWim";

export default {
  components: {
    "dynamic-table": DynamicTable,
    "detail-wim": DetailWim,
  },
  data() {
    return {
      timer,
      data: [],
      menuRight: [],
      objectKey: null,
      listColumnShow: null,
      selectedLane: -1,
      selectedType: -1,
      selectedBefore: "",
      selectedAfter: "",
      from: moment().format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
      laneOptions: [],
      dataByID: "",
      dataModal: null,
      selectedItem: {},
      pTotalRows: null,
      pCurrentPage: 1,
      pPerPage: 1,
      optionType: [],
      isEdit: null,
      isNew: null,
    };
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
  methods: {
    async reloadData(val, ID) {
      if (val.status) {
        if (!this.data || this.data.length === 0) {
          this.getColumn("WimDatas");
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
    handleSearch() {
      this.pCurrentPage = 1;
      this.getData();
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
        .wimOverload(body)
        .then((val) => {
          if (val.status && val.data) {
            this.data = val.data.List100 || [];
            this.pTotalRows = val.data.PageNumber?.TotalPages || 1;
            this.objectKey =
              val.data.List100?.length > 0
                ? Object.keys(val.data.List100[0])
                : [];
          }
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
    getLaneList() {
      wimAPI
        .getLanes()
        .then((val) => {
          if (val.status) {
            const arr = [];
            val.data.forEach((element) => {
              const obj = {
                value: element.LaneNumber,
                text: element.LaneName,
              };
              arr.push(obj);
            });
            this.laneOptions = arr;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeOption(lane, type, before, after, from, to) {
      this.selectedLane = lane;
      this.selectedType = type;
      this.selectedBefore = before.trim() ? before.trim() : "";
      this.selectedAfter = after.trim() ? after.trim() : "";
      this.from = from;
      this.to = to;
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
    rowDoubleClick(item) {
      this.getDetailByID(item.ID);
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
    handleChangePage(page) {
      this.pCurrentPage = page;
      this.getData();
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
  async created() {
    await this.getListMenuRight();
    await this.getColumn("WimDatas");
    await this.getLaneList();
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
