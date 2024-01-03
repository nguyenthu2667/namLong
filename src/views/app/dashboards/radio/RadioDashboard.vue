<template>
  <div>
    <b-row>
      <template v-if="data">
        <b-col lg="3" class="mb-3">
          <b-card no-body style="min-height: 214px" class="p-3">
            <div class="title-card text-center mb-2" style="font-size: 14px">
              <strong>Tổng hợp thiết bị</strong>
            </div>
            <div class="item-card mb-3">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-receipt mr-2"></i>
                  {{ data.TotalDevice_Description }}
                </div>
                <div>
                  {{ data.TotalDevice }}
                </div>
              </div>
              <b-progress :value="30" :max="100"></b-progress>
            </div>
            <div class="item-card mb-3">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-check-circle mr-2"></i>
                  {{ data.TotalOnline_Description }}
                </div>
                <div>{{ data.TotalOnline }}/{{ data.TotalDevice }}</div>
              </div>
              <b-progress
                variant="success"
                :value="
                  (data.TotalOnline * data.TotalDevice) / data.TotalDevice
                "
                :max="data.TotalDevice"
              ></b-progress>
            </div>
            <div class="item-card mb-3">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-exclamation-circle mr-2"></i>
                  {{ data.TotalOffline_Description }}
                </div>
                <div>{{ data.TotalOffline }}/{{ data.TotalDevice }}</div>
              </div>
              <b-progress
                variant="danger"
                :value="
                  (data.TotalOffline * data.TotalDevice) / data.TotalDevice
                "
                :max="data.TotalDevice"
              ></b-progress>
            </div>
          </b-card>
        </b-col>
        <b-col lg="9" class="mb-3">
          <b-card no-body style="min-height: 214px" class="p-3">
            <div class="title-card text-center mb-2" style="font-size: 14px">
              <strong>Tổng hợp lịch phát</strong>
            </div>
            <b-row>
              <b-col lg="6">
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <i class="fas fa-check-square mr-2"></i>
                      {{ data.TotalApproval_Description }}
                    </div>
                    <div>
                      {{ data.TotalApproval }}
                    </div>
                  </div>
                  <b-progress
                    variant="success"
                    :value="100"
                    :max="100"
                  ></b-progress>
                </div>
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <i class="far fa-newspaper mr-2"></i>
                      {{ data.TotalNews_Description }}
                    </div>
                    <div>{{ data.TotalNews }}</div>
                  </div>
                  <b-progress
                    :value="
                      (data.TotalNews * data.TotalApproval) / data.TotalApproval
                    "
                    :max="data.TotalApproval"
                  ></b-progress>
                </div>
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <i class="fas fa-broadcast-tower mr-2"></i>
                      {{ data.TotalRelay_Description }}
                    </div>
                    <div>{{ data.TotalRelay }}</div>
                  </div>
                  <b-progress
                    :value="
                      (data.RunningRelay * data.TotalApproval) /
                      data.TotalApproval
                    "
                    :max="data.TotalApproval"
                  ></b-progress>
                </div>
              </b-col>
              <b-col lg="6">
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <i class="fad fa-radio-alt mr-2"></i>
                      {{ data.TotalFMTransceiver_Description }}
                    </div>
                    <div>
                      {{ data.TotalFMTransceiver }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (data.TotalFMTransceiver * data.TotalApproval) /
                      data.TotalApproval
                    "
                    :max="data.TotalApproval"
                  ></b-progress>
                </div>
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <i class="fas fa-microphone mr-2"></i>
                      {{ data.TotalRecordingFiles_Description }}
                    </div>
                    <div>
                      {{ data.TotalRecordingFiles }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (data.TotalRecordingFiles * data.TotalApproval) /
                      data.TotalApproval
                    "
                    :max="data.TotalApproval"
                  ></b-progress>
                </div>
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <i class="fas fa-print mr-2"></i>
                      {{ data.TotalTextNewsletter_Description }}
                    </div>
                    <div>
                      {{ data.TotalTextNewsletter }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (data.RunningTextNewsletter * data.TotalApproval) /
                      data.TotalApproval
                    "
                    :max="data.TotalApproval"
                  ></b-progress>
                </div>
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <i class="far fa-stop-circle mr-2"></i>
                      {{ data.TotalFinal_Description }}
                    </div>
                    <div>
                      {{ data.TotalFinal }}
                    </div>
                  </div>
                  <b-progress :value="100" :max="100"></b-progress>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </template>
      <b-col lg="3" class="mb-4">
        <b-card no-body style="height: 350px" class="pl-1 pr-1">
          <div class="title-card text-center mt-2 mb-2" style="font-size: 14px">
            <strong>Tổng hợp khu vực</strong>
          </div>
          <template v-if="optionTreeRegion && optionTreeRegion.length > 0">
            <treeselect
              class="tree-select-radio"
              :options="optionTreeRegion"
              v-model="arrValueSelectree"
              placeholder="Tìm kiếm..."
              :max-height="null"
              :hide-control="false"
              :dropdownpopover="false"
              :multiple="true"
              :collapse-menu-padding="true"
              :show-count="true"
              :defaultExpandLevel="2"
              :alwaysOpen="true"
            >
              <label
                slot="option-label"
                slot-scope="{ node, labelClassName }"
                :class="labelClassName"
              >
                <strong style="color: #6e6e6e">
                  {{ node.label }}
                  <span> ({{ node.raw.ValueCount }}) </span>
                </strong>
              </label>
            </treeselect>
          </template>
          <template v-else>
            <p class="p-3 text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </template>
        </b-card>
      </b-col>
      <b-col lg="4" class="mb-4">
        <b-card no-body style="height: 350px; overflow: auto">
          <div class="title-card text-center mt-2" style="font-size: 14px">
            <strong>Vị trí loa theo khu vực</strong>
          </div>
          <template v-if="dataTableStation && dataTableStation.length > 0">
            <b-table
              :responsive="true"
              :sticky-header="true"
              :no-border-collapse="true"
              :bordered="true"
              :hover="true"
              :items="dataTableStation"
              :fields="fieldsTableStation"
              head-variant="light"
              class="mini-table text-center text-small mt-2 pl-1 pr-1"
              style="max-height: 320px"
              @row-clicked="flyToMiniMap"
            >
              <template #cell(StatusID)="row">
                <div>
                  <b-badge
                    :style="`
                  font-size: 90%;
                  color: #fff;
                  border: 1px solid #d3d0d0f7;background:${row.item.StatusColor} !important`"
                  >
                    {{ row.item.StatusName }}
                  </b-badge>
                </div>
              </template>
            </b-table>
          </template>
          <template v-else>
            <div class="text-center text-muted mt-4">
              <strong> {{ $t("panel.non-data") }} !</strong>
            </div>
          </template>
        </b-card>
      </b-col>
      <b-col lg="5" class="mb-4">
        <b-card no-body style="height: 350px">
          <multi-map-mini
            ref="multiMapMini"
            :data-map-now="dataMapNow"
            :type="'SmartRadio'"
          ></multi-map-mini>
        </b-card>
      </b-col>
      <b-col lg="12">
        <b-row class="mb-2">
          <b-col>
            <h5 class="text-muted mb-0">
              <strong> DANH SÁCH LỊCH PHÁT </strong>
            </h5>
          </b-col>
        </b-row>
        <div class="separator mb-2" />
        <b-card>
          <b-row>
            <b-col lg="3" v-if="data">
              <div class="title-card text-center mb-2" style="font-size: 14px">
                <strong>Lịch phát hiện tại</strong>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <i class="far fa-play-circle mr-2"></i>
                    {{ data.TotalRunning_Description }}
                  </div>
                  <div>
                    {{ data.TotalRunning }}
                  </div>
                </div>
                <b-progress variant="info" :value="100" :max="100"></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <i class="fad fa-spinner-third mr-2"></i>
                    {{ data.TotalWaitApproval_Description }}
                  </div>
                  <div>
                    {{ data.TotalWaitApproval }}
                  </div>
                </div>
                <b-progress
                  variant="warning"
                  :value="100"
                  :max="100"
                ></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="text-eclipse">
                    <i class="far fa-newspaper mr-2"></i>
                    {{ data.RunningNews_Description }}
                  </div>
                  <div>{{ data.RunningNews }}</div>
                </div>
                <b-progress
                  :value="
                    (data.RunningNews * data.TotalRunning) / data.TotalRunning
                  "
                  :max="data.TotalRunning"
                ></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="text-eclipse">
                    <i class="fas fa-broadcast-tower mr-2"></i>
                    {{ data.RunningRelay_Description }}
                  </div>
                  <div>{{ data.RunningRelay }}</div>
                </div>
                <b-progress
                  :value="
                    (data.RunningRelay * data.TotalRunning) / data.TotalRunning
                  "
                  :max="data.TotalRunning"
                ></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="text-eclipse">
                    <i class="fad fa-radio-alt mr-2"></i>
                    {{ data.RunningFMTransceiver_Description }}
                  </div>
                  <div>
                    {{ data.RunningFMTransceiver }}
                  </div>
                </div>
                <b-progress
                  :value="
                    (data.RunningFMTransceiver * data.TotalRunning) /
                    data.TotalRunning
                  "
                  :max="data.TotalRunning"
                ></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="text-eclipse">
                    <i class="fas fa-microphone mr-2"></i>
                    {{ data.RunningRecordingFiles_Description }}
                  </div>
                  <div>
                    {{ data.RunningRecordingFiles }}
                  </div>
                </div>
                <b-progress
                  :value="
                    (data.RunningRecordingFiles * data.TotalRunning) /
                    data.TotalRunning
                  "
                  :max="data.TotalRunning"
                ></b-progress>
              </div>
              <div class="item-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="text-eclipse">
                    <i class="fas fa-print mr-2"></i>
                    {{ data.RunningTextNewsletter_Description }}
                  </div>
                  <div>
                    {{ data.RunningTextNewsletter }}
                  </div>
                </div>
                <b-progress
                  :value="
                    (data.RunningTextNewsletter * data.TotalRunning) /
                    data.TotalRunning
                  "
                  :max="data.TotalRunning"
                ></b-progress>
              </div>
            </b-col>
            <b-col lg="9">
              <dynamic-table
                v-if="dataTableList.length > 0"
                style="margin-top: -20px"
                ref="tableDynamic"
                :field-table="fieldsTableList"
                :data-table="dataTableList"
                :bordered="true"
                :isSearch="true"
                :pPerPage="3"
                @change-playback="changePlayback"
                @change-vocal="changeVocal"
                @dbclick="handleDbclick"
              ></dynamic-table>
              <template v-else>
                <div class="text-center text-muted">
                  <strong> {{ $t("panel.non-data") }}</strong>
                </div>
              </template>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="modal-detail"
      name="modal-detail"
      :size="'xl'"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <form-schedules
        ref="formSchedules"
        :type="idModal"
        :id="idClick"
        :data-form="dataForm"
        @submit="handleSubmit"
      ></form-schedules>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import DynamicTable from "@/components/Table/radio/DynamicTableRadio";
import systemAPI from "@/api/modules/systemAPI";
import MultiMapMini from "@/components/Map/MultiMapMini.vue";
import mapAPI from "@/api/modules/mapAPI";
import radioAPI from "@/api/modules/radioAPI";
import IconCardTitle from "@/components/Cards/IconCardTitle.vue";
import RadioDetail from "@/views/app/map/popup-modals/RadioDetail.vue";
import FormSchedules from "../../function/radio/component/FormSchedules.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";

export default {
  components: {
    Treeselect,
    card: IconCardTitle,
    "multi-map-mini": MultiMapMini,
    "radio-detail": RadioDetail,
    "dynamic-table": DynamicTable,
    "form-schedules": FormSchedules,
  },
  data() {
    return {
      timer: 500,
      interval: null,
      geoCode: "SmartRadio",
      data: null,
      //modal
      dataModal: null,
      //map
      dataMaps: null,
      dataMapNow: [],
      //region
      arrValueSelectree: [],
      optionTreeRegion: [],
      //station
      dataTableStation: [],
      fieldsTableStation: [
        {
          key: "StationName",
          label: this.$t("dashboards.station-name"),
          tdClass: "text-left",
        },
        {
          key: "UpdateTime",
          label: "Cập nhật lúc",
          tdClass: "text-primary",
          // formatter: (value, key, item) => {
          //   return this.convertDateTime(value);
          // },
        },
        {
          key: "StatusID",
          label: "Trạng thái",
        },
      ],
      // table-list
      dataTableList: [],
      keyStringTableList: "RadioSchedules",
      keysTableList: null,
      colTypes: null,
      //info
      idClick: null,
      dataForm: null,
      idModal: null,
    };
  },
  computed: {
    fieldsTableList() {
      let result = handling.mergeKeyDynamic(this.keysTableList, this.colTypes);
      return result;
    },
  },
  watch: {
    arrValueSelectree(arr) {
      this.getStationByID(arr);
    },
  },
  async created() {
    await this.getColTypes(this.keyStringTableList);
    await this.getData();
    setTimeout(() => {
      this.arrValueSelectree = this.optionTreeRegion.map((e) => e.id);
    }, 500);
    this.interval = setInterval(async () => {
      await this.getData();
      await this.getStationByID(this.arrValueSelectree);
    }, 10000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit");
    },
    handleDbclick(row) {
      console.log(1, "row", row);
      this.idClick = row.ScheduleID;
      let body = {
        ID: row.ScheduleID,
      };
      radioAPI
        .radioScheduleByID(body)
        .then((val) => {
          if (val.status) {
            let obj = val.data ? val.data : null;
            this.dataForm = obj;
            this.dataForm.LinkNews.forEach((e) => {
              console.log(1, "e", e);
              e.name = `${e.SourceName}`;
              e.url = e.BroadcastSource;
              e.isPlay = e.isPlay ?? false;
            });
            this.dataForm.LinkRecordingFiles.forEach((e) => {
              e.name = `${e.SourceName}`;
              e.url = e.BroadcastSource;
              e.isPlay = e.isPlay ?? false;
            });
            this.dataForm.LinkTextNewsletter.forEach((e) => {
              e.name = `${e.SourceName}`;
              e.url = e.BroadcastSource;
              e.isPlay = e.isPlay ?? false;
            });
            this.idModal = "edit";
            this.titleModal = this.$t("button.update").toUpperCase();
            this.sizeModal = "xl";
            setTimeout(() => {
              this.$bvModal.show("modal-detail");
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    },
    changeVocal(item, value) {
      let body = {
        ID: item.ScheduleID,
        PlaybackState: item.PlaybackState,
        VocalStrength: value,
      };
      this.updatePlaybackAndVocal(body);
    },
    changePlayback(item, action) {
      let body = {
        ID: item.ScheduleID,
        PlaybackState: item.PlaybackState,
        VocalStrength: item.VocalStrength,
      };
      if (action == "ON") {
        body.PlaybackState = 1;
      }
      if (action == "OFF") {
        body.PlaybackState = 0;
      }
      if (action == "PAUSE") {
        body.PlaybackState = 2;
      }
      this.updatePlaybackAndVocal(body);
    },
    updatePlaybackAndVocal(body) {
      radioAPI
        .changePlaybackAndVocal(body)
        .then((val) => {
          if (val.status) {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    },
    getStationByID(arr) {
      if (arr?.length > 0) {
        let body = {
          ListRegions: arr.join(","),
        };
        radioAPI
          .radioStationByID(body)
          .then((val) => {
            this.dataTableStation = val.status ? val.data : [];
            this.dataMapNow = [
              {
                DataTypeName: "SMARTRADIO",
                DataProperties: this.dataTableStation,
              },
            ];
          })
          .catch((err) => console.log(err));
      } else {
        this.dataTableStation = [];
        this.dataMapNow = [];
      }
    },
    flyToMiniMap(item) {
      this.$refs.multiMapMini.flyToPoint(item);
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
    resetModal() {
      this.dataModal = null;
      this.dataForm = null;
    },
    rowDbclickHistory(row) {
      this.dataModal = row;
      this.dataModal.moduleType = this.geoCode;
      this.dataModal.lat = row.Lat;
      this.dataModal.lng = row.Long;
      this.$refs.multiMapMini.flyToPoint(this.dataModal);
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, 500);
    },
    recursiveDataRegion(arr, parentID, result) {
      if (!arr) return;
      arr.forEach((item) => {
        if (item["RegionParentID"] !== parentID) return;
        let n = [];
        this.recursiveDataRegion(arr, item["RegionID"], n);
        if (n.length > 0) {
          result.push({
            id: item["RegionID"],
            label: item["RegionName"],
            StationID: item["RegionID"],
            StationName: item["RegionName"],
            ValueCount: item["ValueCount"],
            PropertiesStations: item["PropertiesStations"],
            children: n,
          });
        } else {
          result.push({
            id: item["RegionID"],
            label: item["RegionName"],
            StationID: item["RegionID"],
            StationName: item["RegionName"],
            ValueCount: item["ValueCount"],
            PropertiesStations: item["PropertiesStations"],
          });
        }
      });
    },
    getData() {
      let body = {
        DataCode: this.geoCode,
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          let res = val.status ? val.data[0].DataProperties : null;
          if (!res) return;
          this.data = res.Dashboards?.length > 0 ? res.Dashboards[0] : null;
          //map
          this.dataMaps = res.Mapnows?.length > 0 ? res.Mapnows : null;
          //region
          if (this.dataMaps?.length > 0) {
            this.optionTreeRegion = [];
            this.recursiveDataRegion(this.dataMaps, 0, this.optionTreeRegion);
          }
          //  table-list
          this.dataTableList =
            this.data.PropertiesSchedule?.length > 0
              ? this.data.PropertiesSchedule
              : [];
          this.keysTableList =
            this.dataTableList.length > 0
              ? Object.keys(this.dataTableList[0])
              : null;
        })
        .catch((err) => console.log(err));
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 3000,
      });
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
</script>
<style scoped>
.text-eclipse {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
</style>
<style>
.tree-select-radio .vue-treeselect__menu-container .vue-treeselect__menu {
  margin-top: 5px;
  border: none;
}
.tree-select-radio .vue-treeselect__control {
  padding: 5px 10px;
}
.tree-select-radio .vue-treeselect__checkbox--checked,
.tree-select-radio .vue-treeselect__checkbox--indeterminate {
  border: 1px solid gray;
  background: #455a64;
}
</style>
<style>
.mini-table .table th {
  white-space: nowrap;
}
</style>
