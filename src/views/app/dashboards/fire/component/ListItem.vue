<template>
  <div>
    <b-card
      v-b-toggle="`id-${data.ID}`"
      :class="isFocus ? 'bg-focus' : 'bg-focus' + ' list-item'"
      no-body
      :id="'modal-detail-' + data.ID"
      @dblclick="showModalDetail(data.ID)"
      @click="emitFlyFireDashboard(data)"
    >
      <b-card-body style="padding: 1rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-2">
            <b class="list-item-heading mb-1 truncate text-small">
              {{ data.StationName.toUpperCase() }}
              <span v-if="data.IsClose" class="text-danger">
                <!-- ({{ data.CloseDescription.toUpperCase() }}) -->
              </span>
              <span v-else class="text-success">
                <!-- ({{ data.CloseDescription.toUpperCase() }}) -->
              </span>
            </b>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="mb-1 text-small" style="color: #7a7777">
              <b>{{ data.StationAddress }}</b>
            </p>
            <span class="text-muted">
              {{ convertDateTime(data.UpdateTime) }}
            </span>
          </b-col>
          <b-col lg="4" md="12" class="text-right pt-2">
            <b-badge
              pill
              :style="
                'font-size: 90%; color: black; border: 1px solid #d3d0d0f7;background-color:' +
                data.StatusColor.toLowerCase() +
                '!important;'
              "
            >
              <span :style="'color:white'">
                {{ data.StatusName }}
              </span>
            </b-badge>
          </b-col>

          <b-col class="my-3">
            <div
              class="title-card text-leaft mb-2 fz-title"
              style="margin-bottom: 8px !important"
            >
              <strong>{{ $t("fire.information-site-cabinet") }}</strong>
            </div>
            <div
              class="d-flex justify-content-between flex-wrap flex-lg-nowrap"
            >
              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="
                      require('@/assets/img/fire-icon/firespeakerRooms.png')
                    "
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.total-position") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SpeakerRooms }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="
                      require('@/assets/img/fire-icon/firespeakerCount.png')
                    "
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.total-equipment-v2") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SpeakerCount }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firespeakerPin.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.low-battery") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SpeakerPin }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="
                      require('@/assets/img/fire-icon/firespeakerError.png')
                    "
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.reporting-error") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SpeakerError }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firespeakerFire.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.fire-alarm") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SpeakerFire }}
                </div>
              </div>
            </div>
          </b-col>

          <b-col lg="12" class="mt-1">
            <div
              class="title-card text-leaft mb-2 fz-title"
              style="margin-bottom: 8px !important"
            >
              <strong>{{ $t("fire.information-equipment-fire") }}</strong>
            </div>
            <div
              class="d-flex justify-content-between flex-wrap flex-lg-nowrap"
            >
              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firesensorRooms.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.total-position") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SensorRooms }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firesensorCount.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.total-equipment-v2") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SensorCount }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firesensorPin.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.low-battery") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SensorPin }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firesensorError.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.reporting-error") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SensorError }}
                </div>
              </div>

              <div
                class="fire-responsive-list-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center">
                  <b-img
                    :src="require('@/assets/img/fire-icon/firesensorFire.png')"
                    style="height: 30px; width: 30px"
                  ></b-img>
                  <span class="fz-md">{{ $t("fire.fire-alarm") }}</span>
                </div>
                <div class="fz-small-icon">
                  {{ data.SensorFire }}
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-modal
      id="modal-detail-room"
      ref="modal-detail-room"
      :title="titleForm"
      @hidden="resetModalRoom"
      v-if="dataForm"
      scrollable
      class="text-center modal-detail-room"
      size="lg"
      hide-footer
      centered
    >
      <b-tabs content-class="mt-1" fill>
        <b-tab title="THÔNG TIN THIẾT BỊ" active style="height: 100vh">
          <b-row>
            <b-col lg="12">
              <div class="mt-2">
                <b>DANH SÁCH THIẾT BỊ</b>
                <template v-for="(sensor, i) in dataForm.ListSensor">
                  <div
                    :key="i"
                    class="d-flex justify-content-between p-2 mb-1"
                    style="background: #f1f1f1 !important"
                  >
                    <span class="text-muted w-50">
                      Vị trí lắp đặt:
                      <b>{{ sensor.NodeName }}</b>
                    </span>
                    <span class="text-muted w-25">
                      Pin:
                      <b>{{ sensor.Pin }} %</b>
                    </span>
                    <span class="text-muted w-25">
                      <b>
                        <i
                          :style="'color:' + sensor.StatusColor"
                          class="fas fa-circle mr-2"
                        ></i>
                        {{ sensor.StatusName }}
                      </b>
                    </span>
                  </div>
                </template>
              </div>
            </b-col>
            <b-col lg="12" class="mt-2">
              <div>
                <div class="d-flex justify-content-between">
                  <b style="margin-top: 4px">BÁO CÁO LỊCH SỬ</b>
                  <b-form-radio-group
                    id="radio-type-fire"
                    v-model="typed"
                    :options="options"
                    name="radio-options-type-fire"
                  />
                </div>
                <dynamic-table
                  :data-table="items"
                  :field-table="fields"
                ></dynamic-table>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="HÌNH ẢNH LẮP ĐẶT" style="height: 100vh">
          <b-row v-if="images && images.length > 0">
            <template v-for="(img, index) in images">
              <b-col :key="index" lg="4" class="p-2 pos-parent">
                <b-img
                  v-img
                  class="h-100 w-100"
                  :src="img.ImageLink"
                  alt="image"
                ></b-img>
                <span class="pos-chilren-title">
                  <b>{{ img.NodeName }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("panel.non-data") }}
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
    <b-modal
      :id="idModal"
      :name="idModal"
      v-if="data"
      hide-header
      size="xl"
      ok-only
      centered
      scrollable
      hide-footer
      @hide="resetModal"
    >
      <fire-popup
        :data-parent="data"
        :object-data="objectData"
        :module="'dashboard'"
      ></fire-popup>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import DynamicTables from "@/components/Table/DynamicTable";
import FirePopup from "@/views/app/map/popup-modals/FireDetail.vue";
import ContentRoom from "./ContentRoom.vue";

export default {
  async created() {
    await this.getColorStatus();
  },
  props: [
    "data",
    "selected-data",
    "accessWrite",
    "statusEdit",
    "handleDataModal",
    "objectData",
  ],
  components: {
    "dynamic-table": DynamicTables,
    "fire-popup": FirePopup,
    "content-room": ContentRoom,
  },
  data() {
    return {
      isFocus: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer: 500,
      selectMode: "single",
      itemsTable: null,
      keysTable: null,
      statusColors: [],
      images: [],
      listImage: null,
      dataForm: null,
      titleForm: "",
      typed: "FIRE",
      items: [],
      fields: [
        {
          key: "NodeName",
          label: "Vị trí lắp đặt",
          tdClass: "text-left",
        },
        {
          key: "StartTime",
          label: "Bắt đầu",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          key: "FinishTime",
          label: "Kết thúc",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      options: [
        { text: "Báo cháy", value: "FIRE" },
        { text: "Báo lỗi", value: "ERROR" },
      ],
      images: [],
      idModal: null,
      dataModal: null,
    };
  },
  watch: {
    typed() {
      if (this.dataForm) {
        if (this.typed == "FIRE") {
          this.items = this.dataForm.ListFireHistories;
        } else {
          this.items = this.dataForm.ListErrorHistories;
        }
      } else {
        this.items = [];
      }
    },
  },
  computed: {
    speakers() {
      let arr = [];
      this.data.Stations.map((room) => {
        if (room.Speakers?.length > 0) {
          room.Speakers.forEach((p) => {
            arr.push(p);
          });
        }
      });
      return arr;
    },
    dataNodes() {
      let result = [];
      if (this.data && this.data.Nodes?.length > 0) {
        this.data.Nodes.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.data.Nodes.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
  },
  methods: {
    emitFlyFireDashboard(data) {
      this.$emit("emitFlyFireDashboard", data);
    },
    resetModal() {
      this.dataModal = null;
      this.idModal = null;
    },
    showModalDetail() {
      this.dataModal = this.data;
      this.idModal = `modal-${this.data.ID}`;
      setTimeout(() => {
        this.$bvModal.show(this.idModal);
      }, 1000);
    },
    resetModalRoom() {
      this.dataForm = null;
    },
    handleRoomClick(room) {
      let body = {
        LocationID: room.ID,
      };
      fireAPI
        .getRoomByID(body)
        .then((val) => {
          this.dataForm = val.status ? val.data : null;
          this.typed = "FIRE";
          this.items = this.dataForm.ListFireHistories;
          this.images = this.dataForm.ListImages;
        })
        .catch((err) => console.log(err));
      this.titleForm = "THÔNG TIN PHÒNG " + room.StationName.toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("modal-detail-room");
      }, 500);
    },
    getColorStatus() {
      fireAPI
        .getStatusColors()
        .then((val) => {
          let result = val.status ? val.data : [];
          this.statusColors = [];
          result.forEach((e) => {
            let obj = {
              id: e.StatusID,
              color: e.StatusColor,
              label: e.StatusName,
            };
            this.statusColors.push(obj);
          });
        })
        .catch((err) => console.log(err));
    },
    handleClick(data) {
      this.handleDataModal([data]);
    },
    handleStatus(data) {
      this.$bvModal
        .msgBoxConfirm(
          !data.IsClose
            ? this.$t("dashboards.want-to-close-order") + "?"
            : this.$t("dashboards.want-to-open-order") + "?",
          {
            title: this.$t("modal.change").toUpperCase(),
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
            this.statusEdit([data]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
  },
};
</script>
<style scoped>
.fz-md {
  font-size: 14px;
  font-weight: 600;
}

.fz-small-icon {
  font-size: 16px;
  font-weight: 700;
}

.fz-title {
  font-size: 15px;
  font-weight: 700;
}

.fire-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.pos-parent {
  position: relative;
  height: 200px;
  cursor: pointer;
}
.pos-chilren-title {
  position: absolute;
  color: white;
  background: black;
  z-index: 2;
  right: 5px;
  bottom: 10px;
  padding: 5px;
}
.crossbar {
  background: #f3f3f3;
  min-height: 30px;
}
/* .bg-color-khaki {
  background: khaki !important;
}
.bg-color-green {
  background: lightgreen !important;
} */
.list-item {
  transition: all 0.3s linear;
}

.list-item:hover {
  cursor: pointer;
  background: #c7c2c2;
}
.fire-responsive-list-item {
  flex: 1;
  max-width: 100%;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .fire-responsive-list-item {
    width: 50%;
    flex: unset;
  }
}

/* Tablet: width >= 740px and width < 1024px  */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .fire-responsive-list-item {
    width: 50%;
    flex: unset;
  }
}
</style>
<style>
.card-content .card-body {
  padding-top: 10px !important;
}
.modal .modal-body {
  padding: 10px 15px !important;
}
</style>
