<template>
  <div>
    <b-card
      v-b-toggle="`id-${data.ID}`"
      :class="
        isFocus ? 'bg-focus' + ' cross-bar p-2' : 'bg-focus' + ' cross-bar p-2'
      "
      no-body
      :id="'modal-detail-' + data.ID"
      @click="changeSelected(data.ID)"
    >
      <b-row>
        <b-col lg="4" md="6" class="text-left pt-2">
          <b class="list-item-heading mb-1 truncate text-small">
            {{ data.Name.toUpperCase() }}
          </b>
        </b-col>
        <b-col lg="4" md="6" class="text-center pt-1">
          <p class="mb-1 text-small" style="color: #7a7777">
            <b>{{ data.ReplayType }}</b>
          </p>
          <p class="mb-1 text-small" style="color: #7a7777">
            <b>({{ data.TimeDescription }})</b>
          </p>
          <span class="text-muted">
            {{ convertDateTime(data.CreateDate) }}
          </span>
        </b-col>
        <b-col lg="4" md="12" class="text-right pt-2">
          <b-badge
            :style="'font-size: 90%; color: black; border: 1px solid #d3d0d0f7;'"
            variant="light"
          >
            <span v-if="data.IsNews == 1">
              <strong> <i class="far fa-newspaper mr-2"></i> bản tin </strong>
            </span>
            <span v-else-if="data.IsRelay == 1">
              <strong>
                <i class="fas fa-broadcast-tower mr-2"></i> tiếp sóng
              </strong>
            </span>
            <span v-else-if="data.IsFMTransceiver == 1">
              <strong> <i class="fad fa-radio-alt mr-2"></i> FM </strong>
            </span>
            <span v-else-if="data.IsRecordingFiles == 1">
              <strong> <i class="fas fa-microphone mr-2"></i> ghi âm </strong>
            </span>
            <span v-else>
              <strong> <i class="fas fa-print mr-2"></i> văn bản </strong>
            </span>
          </b-badge>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";

export default {
  props: ["data"],
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    changeSelected(value) {
      this.isFocus = !this.isFocus;
      //   if (this.isFocus) {
      //     this.selectedData(value)
      //   } else {
      //     this.selectedData(null)
      //   }
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

<style lang="scss" scoped>
.cross-bar:hover {
  cursor: pointer;
  background: #c7c2c2;
}
</style>
