<template>
  <div>
    <b-card
      v-b-toggle="`id-${data.MaintenanceID}`"
      :class="isFocus ? 'bg-focus' : null + ' list-item'"
      no-body
      :id="'modal-detail-' + data.MaintenanceID"
      @click="changeSelected(data.MaintenanceID, data.IsStart)"
    >
      <b-card-body style="padding: 1rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-2">
            <b class="list-item-heading mb-1 truncate text-small">
              {{ data.MaintenanceID }}
              <span v-if="data.IsClose" class="text-danger">
                ({{ data.IsCloseDescription.toUpperCase() }})
              </span>
              <span v-else class="text-success">
                ({{ data.IsCloseDescription.toUpperCase() }})
              </span>
            </b>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="text-muted mb-1 text-small">
              <b>{{ data.RegionName }}</b>
            </p>
            <span class="text-muted">
              {{ convertDate(data.FromDate) }} -
              {{ convertDate(data.ToDate) }}
            </span>
          </b-col>
          <b-col lg="4" md="12" class="text-right pt-2">
            <b-badge
              pill
              style="font-size: 90%; color: black; border: 1px solid #d3d0d0f7"
              :class="'bg-color-' + data.RemainColor.toLowerCase()"
            >
              <span
                :class="
                  data.CompletePercent < 100 ? 'text-danger' : 'text-success'
                "
              >
                {{ data.MaintenanceCompletePercent }} /
                {{ data.MaintenanceTotal }}
              </span>
              {{ data.RemainTime }}
            </b-badge>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse :id="`id-${data.MaintenanceID}`">
      <b-card style="box-shadow: none !important">
        <b-row class="mb-4">
          <b-col>
            <template v-if="!data.IsClose">
              <b-button
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 4px;
                  padding: 5px 8px;
                "
                variant="outline-success"
                :disabled="accessWrite === false ? true : false"
                @click="handleStatus(data)"
                class="mr-2"
              >
                <i class="fad fa-lock-open" style="font-size: 11px"></i>
              </b-button>
              {{ $t("dashboards.click-close-order") }}
            </template>
            <template v-else>
              <b-button
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 4px;
                  padding: 5px 8px;
                "
                variant="outline-danger"
                :disabled="accessWrite === false ? true : false"
                @click="handleStatus(data)"
                class="mr-2"
              >
                <i class="fad fa-lock" style="font-size: 11px"></i>
              </b-button>
              {{ $t("dashboards.click-open-order") }}
            </template>
          </b-col>
          <b-col class="text-right">
            <strong
              style="cursor: pointer; color: red"
              @click="handleClick(data)"
            >
              <u>{{ $t("dashboards.view-detail") }}</u>
            </strong>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/tree-icon/tongthuthap.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceTotal }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceTotal1 }}
            </p>
          </b-col>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/tree-icon/nguoithuthap.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.EmployerNumber }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.EmployerNumberDescription }}
            </p>
          </b-col>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/tree-icon/tientrinh.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceCompletePercent }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceCompletePercentDescription }}
            </p>
          </b-col>

          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/light-icon/capnhat.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceUpdate }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceUpdateDescription }}
            </p>
          </b-col>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/light-icon/daduyet.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceApproval }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceApprovalDescription }}
            </p>
          </b-col>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/light-icon/choduyet.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceComplete }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceCompleteDescription }}
            </p>
          </b-col>
          <b-col class="text-center">
            <div style="height: 115px; color: #2a93d5">
              <b-img
                :src="require('@/assets/img/light-icon/trave.png')"
                style="height: 80px"
              ></b-img>
              <div>
                <strong style="font-size: 22px; font-weight: 700; color: black">
                  {{ data.MaintenanceReturn }}
                </strong>
              </div>
            </div>
            <p class="text-small text-muted font-weight-bold">
              {{ data.MaintenanceReturnDescription }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-progress class="mt-2" :max="100" show-value height="30px">
              <template v-for="(item, index) in data.Employer">
                <b-progress-bar
                  :key="index"
                  :value="item.PercentUser"
                  :style="'background: ' + item.color + ';'"
                >
                  <strong class="pl-2" style="color: black">
                    <!-- {{ item.PercentComptete }} % -->
                  </strong>
                </b-progress-bar>
              </template>
            </b-progress>
            <div class="text-center mt-3">
              <template v-if="data.Employer && data.Employer.length > 0">
                <template v-for="(item, index) in data.Employer">
                  <strong :key="index" class="mr-1">
                    <i :style="'color:' + item.color" class="fas fa-circle"></i>
                    {{ item.EmployerName }}
                    {{ item.PercentUser }}
                  </strong>
                </template>
              </template>
              <template v-else>
                <span class="font-italic">{{ $t("cards.no-data") }}</span>
              </template>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import { lightcolors } from "@/constants/config";
import CusCirlePieSemi from "@/components/Charts/CusCirlePieSemi";

export default {
  props: [
    "data",
    "selected-data",
    "accessWrite",
    "statusEdit",
    "handleDataModal",
  ],
  components: {
    "cus-cirle-pie-semi": CusCirlePieSemi,
  },
  data() {
    return {
      isFocus: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      lightcolors,
      preColor: "pink",
      itemsTable: null,
      keysTable: null,
    };
  },
  computed: {},
  created() {
    if (this.data && this.data.Employer) {
      this.data.Employer.forEach((ite) => {
        let color = this.returnRandomColor(this.preColor);
        ite.color = color;
      });
    }
  },
  methods: {
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
    returnRandomColor(notColor) {
      let result =
        this.lightcolors[Math.floor(Math.random() * this.lightcolors.length)];
      if (result === notColor) {
        this.returnRandomColor(result);
      } else {
        this.preColor = result;
        return result;
      }
    },
    changeSelected(value, IsStart) {
      this.isFocus = !this.isFocus;
      if (this.isFocus) {
        this.selectedData(value, IsStart);
      } else {
        this.selectedData(null);
      }
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    randomColor() {
      return Math.floor(Math.random() * 16777215).toString(16);
    },
    formatPercentMaintenance(str, start, end) {
      const arrStr = str.split(")");
      return arrStr[0].slice(start, end);
    },
  },
};
</script>
<style scoped>
.bg-focus {
  background: #d3d0d0f7;
}
.crossbar {
  background: #f3f3f3;
  min-height: 30px;
}
.bg-color-khaki {
  background: khaki !important;
}
.bg-color-green {
  background: lightgreen !important;
}
.list-item:hover {
  cursor: pointer;
  background: #c7c2c2;
}
</style>
