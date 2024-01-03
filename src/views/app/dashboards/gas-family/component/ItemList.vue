<template>
  <div>
    <b-card
      no-body
      :id="'modal-detail-' + data.StationID"
      @click="showModal(data)"
    >
      <b-card-body style="padding: 1.25rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-1">
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
                    style="background-color: red !important; font-size: 88%"
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
                style="font-size: 88%"
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
      size="lg"
      @hide="resetModal"
      scrollable
    >
      <gas-family-popup :data-parent="data"></gas-family-popup>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import GasFamilyPopup from "@/views/app/map/popup-modals/GasFamilyDetail";

export default {
  components: {
    "gas-family-popup": GasFamilyPopup,
  },
  props: ["data"],
  data() {
    return {
      timer: 500,
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
<style scoped>
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
