<template>
  <div
    class="position-relative d-flex flex-row mb-3"
    @click="flyToPoint(value)"
  >
    <span class="d-block position-relative">
      <div style="width: 125px !important; height: 85px">
        <b-img
          :src="value.StationImage"
          :alt="'image_' + value.StationID"
          fluid
          class="list-thumbnail border-0"
          style="width: 100% !important; height: 100% !important"
        />
      </div>
    </span>
    <div class="pl-3 pr-2 pb-2">
      <span>
        <p
          style="width: 270px; overflow: hidden; text-overflow: ellipsis"
          class="list-item-heading mb-0"
        >
          {{ value.StationName }}
        </p>

        <p class="text-small text-muted">{{ value.StationAddress }}</p>
        <div class="pr-4">
          <p class="text-muted mb-1 text-small">
            {{ value.DescriptionWarning }}
          </p>
        </div>
        <div
          class="text-small font-weight-medium d-none d-sm-block"
          :style="{ color: value.StatusColor }"
        >
          {{ value.UpdateTime }}
        </div>
      </span>
    </div>
    <strong
      @click="handleDetail(value)"
      class="position-absolute r-0 text-danger"
    >
      <u>Xem chi tiết</u>
    </strong>

    <b-modal
      id="modal-detail"
      ref="modal-detail"
      hide-header
      v-if="dataForm"
      @hidden="resetChartDetail"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <popup
        :rangeColorValues="rangeColorValues"
        :dataModal="dataForm"
        :objectData="objectData"
        @reload-data="handleReloadData"
      />
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import mapAPI from "@/api/modules/mapAPI";
import PopupDetailAqua from "@/views/app/dashboards/aquaculture/component/Aqua.vue";

export default {
  components: {
    popup: PopupDetailAqua,
  },
  watch: {
    value(to, from) {
      this.getMapNowByCode();
      this.isShow = false;
      setTimeout(() => {
        if (this.dataForm) {
          if (
            this.dataMapNow &&
            this.dataMapNow[0].DataProperties &&
            this.dataMapNow[0].DataProperties.length > 0
          ) {
            this.dataForm = this.dataMapNow[0].DataProperties.find(
              (el) => el.StationID == this.value.StationID
            );
          }
        }
        this.isShow = true;
      }, 700);
    },
  },
  props: ["value", "objectData", "rangeColorValues"],
  data() {
    return {
      isShow: false,
      timer,
      dataForm: null,
      typeLoadData: "DAY",
      dataChartStation: null,
      dataChartNode: [],
      dataMapNow: null,
      keyString: "Aqua;",
    };
  },
  methods: {
    handleReloadData() {
      this.$emit("get-data-dashboard");
    },
    flyToPoint(items) {
      this.$emit("fly-to-point", items);
    },
    handleDetail(item) {
      if (
        this.dataMapNow &&
        this.dataMapNow[0].DataProperties &&
        this.dataMapNow[0].DataProperties.length > 0
      ) {
        this.dataForm = this.dataMapNow[0].DataProperties.find(
          (data) => data.StationID == item.StationID
        );
      }
      if (this.dataForm) {
        setTimeout(() => {
          this.$bvModal.show("modal-detail");
        }, this.timer);
      }
    },
    getMapNowByCode() {
      let body = {
        DataCode: this.keyString,
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.dataMapNow = val.status ? val.data : null;
        })
        .catch((err) => console.log(err));
    },
    resetChartDetail() {
      this.typeLoadData = "DAY";
      this.dataForm = null;
      this.dataChartStation = null;
      this.dataChartNode = null;
    },
  },
  created() {
    this.getMapNowByCode();
  },
};
</script>
