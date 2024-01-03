<template>
  <div>
    <b-row>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx lg="6" md="12">
        <b-alert
          :class="['text-center', 'led-' + dataModal.StatusColor]"
          style="color: white; letter-spacing: 4px"
          show
        >
          <strong>{{ dataModal.StatusName.toUpperCase() }}</strong>
        </b-alert>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx md="12" class="mt-2">
        <b-row>
          <b-colxx lg="6">
            <b-form-group
              class="mb-0"
              :label="$t('dashboards.station-name') + ':'"
            >
              <b-alert
                class="text-right font-weight-bold"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationName.toUpperCase() }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.phone') + ':'">
              <b-alert
                class="text-right"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationPhone }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.input-date') + ':'">
              <b-alert
                class="text-right"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ convertDate(dataModal.InputDate) }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="8">
            <b-form-group class="mb-0" :label="$t('modal.address') + ':'">
              <b-alert
                class="text-right"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.StationAddress }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="4">
            <b-form-group
              class="mb-0"
              :label="$t('map.lng') + ', ' + $t('map.lat').toLowerCase() + ': '"
            >
              <b-alert
                class="text-right"
                show
                style="background-color: rgb(233, 236, 239); color: black"
              >
                {{ dataModal.Long + ", " + dataModal.Lat }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="12" class="mt-2 mb-3">
            <span>
              <i class="fas fa-sliders-h mr-2"></i>
              <span class="font-weight-bold mr-1">
                {{ $t("dashboards.monitoring-parameters").toUpperCase() }}
              </span>
            </span>
          </b-colxx>
          <b-colxx lg="6" md="6" class="mb-4">
            <b-row>
              <b-colxx lg="12">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.detected-status') + ': '"
                >
                  <template v-if="dataModal.IsDetector === -1">
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(255, 0, 50); color: black"
                    >
                      {{ $t("map.error-sensor") }}
                    </b-alert>
                  </template>
                  <template v-else-if="dataModal.IsDetector === 1">
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(255, 225, 50); color: black"
                    >
                      {{ $t("map.leak-gas").toUpperCase() }}
                    </b-alert>
                  </template>
                  <template v-else>
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(60, 250, 50); color: black"
                    >
                      {{ $t("table.normal").toUpperCase() }}
                    </b-alert>
                  </template>
                </b-form-group>
              </b-colxx>
              <b-colxx lg="12">
                <b-form-group class="mb-0" :label="$t('map.update-time') + ':'">
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <template v-if="dataModal.UpdateTime">
                      {{ convertDateTime(dataModal.UpdateTime) }}
                    </template>
                    <template v-else>
                      {{ convertDateTime(dataModal.Updatetime) }}
                    </template>
                  </b-alert>
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-colxx>
          <b-colxx
            lg="6"
            md="6"
            class="text-center mb-4"
            style="margin-top: -20px"
          >
            <radial-chart-two
              v-if="isShow"
              :type-show="1"
              :font-size="20"
              :height="200"
              :data="[parseFloat(dataModal.GasPercent)]"
              :label="[`${dataModal.GasPercent} (%)`]"
            ></radial-chart-two>
            <p
              class="mb-0 font-weight-bold text-muted"
              style="margin-top: -15px"
            >
              {{ $t("map.gas-percent") }}
            </p>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx md="12" class="mt-2">
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="$t('pages.leak-detected').toUpperCase()" active>
            <b-colxx md="12">
              <custom-table
                :data-table="leakDetected"
                :field-table="fieldDetectedLeak"
                :column-show="listColumnShowDetectedLeak"
                :select-mode="selectMode"
                :row-page="10"
              ></custom-table>
            </b-colxx>
          </b-tab>
          <b-tab :title="$t('modal.detected-history').toUpperCase()">
            <b-colxx md="12">
              <custom-table
                :data-table="logDetected"
                :field-table="fieldDetected"
                :column-show="listColumnShowDetected"
                :select-mode="selectMode"
                :row-page="10"
              ></custom-table>
            </b-colxx>
          </b-tab>
          <b-tab :title="$t('modal.end-gas-history').toUpperCase()">
            <b-colxx md="12">
              <custom-table
                :data-table="logEndGas"
                :field-table="fieldEndGas"
                :column-show="listColumnShowEndGas"
                :select-mode="selectMode"
                :row-page="10"
              ></custom-table>
            </b-colxx>
          </b-tab>
          <b-tab :title="$t('list-image-setting').toUpperCase()">
            <b-row v-if="dataImages && dataImages.length > 0">
              <template v-for="(img, index) in dataImages">
                <b-col lg="6 mb-2" :key="index">
                  <div style="height: 250px">
                    <b-img
                      style="width: 100%; height: 100%"
                      :src="img.ImageLink"
                      alt="Image"
                      @click="showWallpaper(dataImages, index)"
                    ></b-img>
                  </div>
                </b-col>
              </template>
            </b-row>
            <template v-else>
              <p class="text-center text-muted text-small font-italic">
                {{ $t("map.no-data") }}
              </p>
            </template>
          </b-tab>
        </b-tabs>
      </b-colxx>
    </b-row>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import gasFamilyAPI from "@/api/modules/gasFamilyAPI";
import systemAPI from "@/api/modules/systemAPI";
import CustomTables from "@/components/Table/CustomTables";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";

export default {
  components: {
    "radial-chart-two": RadialChartApexTwo,
    "custom-table": CustomTables,
    "custom-carousel-component": BCarouselComponent,
  },
  props: ["dataMapNow", "dataParent", "objectData"],
  name: "GasFamily",
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 100);
  },
  watch: {
    dataParent(val) {
      this.dataModal = { ...val };
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName.toUpperCase() ==
          this.dataParent.moduleType.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.StationID == this.dataParent.StationID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
    dataModal() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    },
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      keyString: "GasFamily",
      timer: 500,
      selectMode: "single",
      logEndGas: null,
      logDetected: null,
      leakDetected: null,
      objectKeyEndGas: null,
      objectKeyDetected: null,
      objectKeyDetectedLeak: null,
      listColumnShowEndGas: null,
      listColumnShowDetected: null,
      listColumnShowDetectedLeak: null,
      dataImages: null,
      listImage: null,
    };
  },
  methods: {
    showWallpaper(list, key) {
      let result = [];
      list.map((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.ImageLink, //img
        };
        result.push(obj);
      });
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });
      this.listImage = result;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.dataModal.StationID,
        GeoCode: this.keyString,
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    getLogEndGas(id) {
      let body = {
        StationID: id,
      };
      gasFamilyAPI
        .gasFamilyLogEndGas(body)
        .then((val) => {
          this.logEndGas = val.status ? val.data : null;
          this.objectKeyEndGas =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    getLogDetected(id) {
      let body = {
        StationID: id,
      };
      gasFamilyAPI
        .gasFamilyLogDetected(body)
        .then((val) => {
          this.logDetected = val.status ? val.data : null;
          this.objectKeyDetected =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    gasDetectorLeak(id) {
      let body = {
        StationID: id,
      };
      gasFamilyAPI
        .gasDetectorLeak(body)
        .then((val) => {
          this.leakDetected = val.status ? val.data : null;
          this.objectKeyDetectedLeak =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => console.log(err));
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    getColumnDetected(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowDetected = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnEndGas(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowEndGas = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnDetectedMonitor(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowDetectedLeak = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timeLoadData(time) {
      this.getLogEndGas(this.dataModal.StationID);
      this.getLogDetected(this.dataModal.StationID);
      this.gasDetectorLeak(this.dataModal.StationID);
      setTimeout(() => {
        this.timeLoadData(time);
      }, time);
    },
  },
  async created() {
    await this.timeLoadData(this.timer * 20);
    await this.getColumnDetected("LogDetected");
    await this.getColumnEndGas("LogEndGas");
    await this.getColumnDetectedMonitor("GasDetectorMonitors");
    await this.getImages();
  },
  computed: {
    fieldDetected: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetected,
        this.listColumnShowDetected
      );
    },
    fieldEndGas: function () {
      return handling.mergeTableAndData(
        this.objectKeyEndGas,
        this.listColumnShowEndGas
      );
    },
    fieldDetectedLeak: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetectedLeak,
        this.listColumnShowDetectedLeak
      );
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
#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}
</style>
