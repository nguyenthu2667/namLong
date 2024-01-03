<template>
  <div>
    <b-card
      no-body
      :id="'modal-detail-' + data.StationID"
      @click="showModal(data)"
      style="box-shadow: none !important"
      class="header"
    >
      <b-card-body style="padding: 1rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
            <p class="list-item-heading mb-1 truncate">
              {{ data.StationName }}
            </p>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="mb-1 text-small">
              <template v-if="data.UpdateTime">
                {{ convertDateTime(data.UpdateTime) }}
              </template>
              <template v-else>
                {{ convertDateTime(data.Updatetime) }}
              </template>
            </p>
          </b-col>
          <b-col lg="4" md="12" class="text-right">
            <span v-if="data.IsLock">
              <b-badge
                pill
                style="
                  background-color: red !important;
                  font-size: 88%;
                  color: black;
                "
              >
                {{ $t("alert.locked") }} gas
              </b-badge>
            </span>
            <span v-if="parseInt(data.IsDetector) < 0">
              <b-badge
                pill
                style="
                  background-color: red !important;
                  font-size: 88%;
                  color: black;
                "
              >
                {{ $t("form.error-sensor-detector") }}
              </b-badge>
            </span>
            <span v-else>
              <span v-if="parseInt(data.IsDetector) === 1">
                <b-badge
                  pill
                  style="
                    background-color: red !important;
                    font-size: 88%;
                    color: black;
                  "
                >
                  {{ $t("form.detector") }}
                </b-badge>
              </span>
            </span>
            <template
              v-if="data.GasPercent !== null && data.GasPercent !== undefined"
            >
              <template v-if="parseInt(data.GasPercent) < 0">
                <span>
                  <b-badge
                    pill
                    style="
                      background-color: red !important;
                      font-size: 88%;
                      color: black;
                    "
                  >
                    {{ $t("form.error-sensor-gas") }}
                  </b-badge>
                </span>
              </template>
              <template v-else-if="parseInt(data.GasPercent) < 5">
                <span>
                  <b-badge
                    pill
                    style="
                      background-color: rgb(255, 200, 20) !important;
                      color: black;
                      font-size: 88%;
                    "
                  >
                    {{ $t("form.end") }} gas
                  </b-badge>
                </span>
              </template>
              <template
                v-else-if="
                  parseInt(data.GasPercent) >= 5 &&
                  parseInt(data.GasPercent) < 20
                "
              >
                <span>
                  <b-badge
                    pill
                    style="background-color: orange !important; font-size: 88%"
                  >
                    {{ $t("form.little") }} gas {{ parseInt(data.GasPercent) }}%
                  </b-badge>
                </span>
              </template>
              <template v-else>
                <b-badge
                  pill
                  style="background-color: blue !important; font-size: 88%"
                >
                  {{ $t("form.rest") }} {{ parseInt(data.GasPercent) }} % gas
                </b-badge>
              </template>
            </template>
            <span>
              <b-badge
                pill
                :style="{ 'background-color': data.StatusColor + '!important' }"
                style="font-size: 88%; color: black"
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
      :id="modalID"
      centered
      hide-header
      ok-only
      size="xl"
      @hide="resetModal"
      scrollable
    >
      <gas-food-court-popup
        :data-modal="modalDetail"
        @status-edit="lockGasModal"
      ></gas-food-court-popup>
    </b-modal>
    <b-modal
      :id="modalID + 'modal-lock'"
      :ref="modalID + 'modal-lock'"
      :title="$t('dashboards.gas-open-lock-reason')"
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalLock"
      @ok="handleOkLock"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitLock">
        <b-form-group
          :state="lockState"
          :label="$t('dashboards.reason') + ':'"
          label-for="lock-input"
          :invalid-feedback="$t('dashboards.enter-reason')"
        >
          <b-form-input
            id="lock-input"
            v-model="lock"
            :state="lockState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import GasFoodCourt from "@/views/app/map/popup-modals/GasFoodCourtDetail";
import gasFoodCourtAPI from "@/api/modules/gasFoodCourtAPI";

export default {
  components: {
    "gas-food-court-popup": GasFoodCourt,
  },
  props: ["data", "reloadData"],
  data() {
    return {
      timer,
      selectMode: "single",
      lockState: null,
      lock: "",
      lockStation: null,
      selectMode: "single",
      modalDetail: null,
      modalID: null,
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
    handleReload() {
      this.reloadData();
    },
    submitLockOK(note, items) {
      let body = {
        StationID: items.StationID,
        IsLock: handling.convertBooleanToBit(!items.IsLock),
        LockDescription: note,
      };
      gasFoodCourtAPI.gasFoodCourtLock(body).then((val) => {
        if (val.status) {
          this.handleReload();
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        } else {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.lockState = valid;
      return valid;
    },
    handleSubmitLock() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitLockOK(this.lock, this.lockStation);
        this.$bvModal.hide(this.modalID + "modal-lock");
      });
    },
    handleOkLock(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitLock();
    },
    showModal(items) {
      this.modalDetail = items;
      this.modalID = this.modalDetail.StationID;
      setTimeout(() => {
        this.$bvModal.show(this.modalID);
      }, this.timer / 1.5);
    },
    lockGasModal(items) {
      this.lockStation = items;
      setTimeout(() => {
        this.$bvModal.show(this.modalID + "modal-lock");
      }, 200);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    resetModal() {
      this.modalDetail = null;
    },
    resetModalLock() {
      this.lock = "";
      this.lockState = null;
      this.lockStation = null;
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
<style scoped>
.header {
  background: #d7d7d7;
}
.header:hover {
  background: #b3b2b2;
  cursor: pointer;
}
.led-red {
  background-color: #f00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}
.led-green {
  background-color: rgb(60, 250, 50);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
</style>
