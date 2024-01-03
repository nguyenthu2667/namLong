<template>
  <div v-if="data">
    <b-card
      class="header"
      v-b-toggle="`id-${data.StationID}`"
      no-body
      :id="'modal-detail-' + data.StationID"
      style="
        border-bottom: 1px solid #80808012 !important;
        box-shadow: none !important;
      "
      @click="showModal(data)"
    >
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left">
            <p class="list-item-heading mb-1 truncate">
              {{ data.StationName }}
            </p>
          </b-col>
          <b-col lg="2" md="6" class="text-left pt-1">
            <p class="text-muted mb-1 text-small">
              <template v-if="data.UpdateTime">
                {{ convertDateTime(data.UpdateTime) }}
              </template>
              <template v-else>
                {{ convertDateTime(data.Updatetime) }}
              </template>
            </p>
          </b-col>
          <b-col lg="6" md="12" class="text-right">
            <span v-if="data.IsLock">
              <b-badge
                pill
                style="background-color: red !important; font-size: 88%"
              >
                {{ data.GasUsingStatus }}
              </b-badge>
            </span>
            <span v-if="parseInt(data.IsDetector) < 0">
              <b-badge
                pill
                style="background-color: red !important; font-size: 88%"
              >
                {{ $t("form.error-sensor-detector") }}
              </b-badge>
            </span>
            <span v-else>
              <span v-if="parseInt(data.IsDetector) === 1">
                <b-badge
                  pill
                  style="background-color: red !important; font-size: 88%"
                >
                  {{ data.DetectorWarning }}
                </b-badge>
              </span>
            </span>
            <span v-if="data.GasEnd !== '0'">
              <b-badge
                pill
                style="
                  color: black;
                  background-color: rgb(255, 200, 0) !important;
                  font-size: 88%;
                "
              >
                {{ data.GasUsingWarning }}
              </b-badge>
            </span>
            <span>
              <b-badge
                :style="{
                  'background-color': data.StatusColor + '!important',
                  'font-size': '88%',
                }"
                pill
              >
                {{ data.StatusName }}
              </b-badge>
            </span>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-modal
      v-if="modalDetail"
      :id="modalDetail.StationID"
      centered
      hide-header
      ok-only
      size="xl"
      @hide="resetModal"
      scrollable
    >
      <gas-restaurant-popup
        :data-parent="data"
        :object-data="objectData"
        @status-edit="statusEdit"
        @handle-submit="handleSubmit"
      ></gas-restaurant-popup>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import GasRestaurantPopup from "@/views/app/map/popup-modals/GasRestaurantDetail";

export default {
  components: {
    "gas-restaurant-popup": GasRestaurantPopup,
  },
  props: ["data", "objectData"],
  data() {
    return {
      timer,
      selectMode: "single",
      modalDetail: null,
    };
  },
  watch: {
    data(to, from) {
      if (to && this.modalDetail) {
        this.modalDetail = to;
      }
    },
  },
  methods: {
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    handleSubmit(val) {
      if (val.status) {
        setTimeout(() => {
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        }, this.timer);
      } else {
        setTimeout(() => {
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
    },
    statusEdit(items) {
      this.$emit("status-edit", items);
    },
    showModal(items) {
      this.modalDetail = items;
      setTimeout(() => {
        this.$bvModal.show(this.modalDetail.StationID);
      }, this.timer / 1.5);
    },
    resetModal() {
      this.modalDetail = null;
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    durationDay(string) {
      return handling.durationDay(new Date(), string);
    },
  },
};
</script>
<style scoped></style>
