<template>
  <!-- <b-modal
    :id="idModal"
    ref="popup-detail-led-station"
    :size="'xl'"
    ok-only
    scrollable
    @hide="resetModal"
    hide-header
    class="popup-detail-led-station"
    body-class="led-station-modal-body-padding"
    footer-class="led-station-modal-footer-padding"
  > -->
  <div
    class="popup-detail-led-station"
    v-if="detail"
    ref="popup-detail-led-station"
    style="min-height: 600px"
  >
    <b-tabs fill>
      <b-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.label"
        @click="selectedTab = item.key"
      />
    </b-tabs>
    <div v-if="selectedTab === 'General'" class="tab-detail mt-4">
      <div class="session-1 text-center d-none d-xl-block">
        <div class="d-flex justify-content-center">
          <div class="led-station-name">
            <p>{{ detail.StationName }}</p>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="d-flex mt-1 mr-5">
            <div class="session-1-icon" :style="{ color: detail.StatusColor }">
              <i class="fas fa-circle"></i>
            </div>
            <span>{{ detail.StatusName }}</span>
          </div>
          <div class="d-flex mt-1 mr-5">
            <div class="session-1-icon">
              <i class="fad fa-map-marker-alt"></i>
            </div>
            <span>{{ detail.StationAddress }}</span>
          </div>
          <div class="d-flex mt-1">
            <div class="session-1-icon">
              <i class="fad fa-calendar"></i>
            </div>
            <span>{{ convertDate(detail.UpdateTimeNoFormat) }}</span>
            <span class="session-1-note">(Thời gian cập nhật)</span>
          </div>
        </div>
      </div>
      <b-row>
        <b-col lg="4" class="d-block d-xl-none">
          <div class="session-1 mt-4 text-center d-block d-xl-none">
            <div class="d-flex">
              <div class="led-station-name">
                <p class="text-left">{{ detail.StationName }}</p>
              </div>
            </div>
            <div>
              <div class="d-flex mt-1">
                <div
                  class="session-1-icon"
                  :style="{ color: detail.StatusColor }"
                >
                  <i class="fas fa-circle"></i>
                </div>
                <span class="text-left">{{ detail.StatusName }}</span>
              </div>
              <div class="d-flex mt-1">
                <div class="session-1-icon">
                  <i class="fad fa-map-marker-alt"></i>
                </div>
                <span class="text-left">{{ detail.StationAddress }}</span>
              </div>
              <div class="d-flex mt-1">
                <div class="session-1-icon">
                  <i class="fad fa-calendar"></i>
                </div>
                <div class="text-left">
                  <span>{{ convertDate(detail.UpdateTimeNoFormat) }}</span>
                  <span class="session-1-note">(Thời gian cập nhật)</span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="8" xl="5" v-if="false">
          <div class="session-3 mt-4">
            <div class="led-station-title">Đang trình chiếu</div>
            <div class="session-3-show-playing">
              <div class="session-3-show-text" v-if="testType === 'TEXT'">
                {{ testText }}
              </div>
              <div
                v-else-if="testType === 'IMAGE'"
                class="session-3-show-image"
              >
                <div class="session-3-show-image-2">
                  <b-img :src="testImage"></b-img>
                </div>
              </div>
              <div
                v-else-if="testType === 'VIDEO'"
                class="session-3-show-video"
              >
                <video controls :src="testVideo"></video>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="8" xl="5">
          <div class="session-3 mt-4">
            <div class="led-station-title">Đang trình chiếu</div>
            <template v-if="detail.PlaySource">
              <div class="session-3-show-playing">
                <div
                  v-if="
                    detail.PlayType.toUpperCase() === 'ẢNH/VIDEO' &&
                    checkTailImage(detail.PlaySource)
                  "
                  class="session-3-show-image"
                >
                  <div class="session-3-show-image-2">
                    <b-img :src="detail.PlaySource"></b-img>
                  </div>
                </div>
                <div
                  v-else-if="
                    detail.PlayType.toUpperCase() === 'ẢNH/VIDEO' &&
                    !checkTailImage(detail.PlaySource)
                  "
                  class="session-3-show-video"
                >
                  <video controls :src="detail.PlaySource"></video>
                </div>
                <div
                  v-if="
                    detail.PlayType.toUpperCase() === 'HÌNH ẢNH' ||
                    detail.PlayType.toUpperCase() === 'ẢNH'
                  "
                  class="session-3-show-image"
                >
                  <div class="session-3-show-image-2">
                    <b-img :src="detail.PlaySource"></b-img>
                  </div>
                </div>
                <div
                  v-else-if="detail.PlayType.toUpperCase() === 'VIDEO'"
                  class="session-3-show-video"
                >
                  <video controls :src="detail.PlaySource"></video>
                </div>
                <div
                  v-else-if="detail.PlayType.toUpperCase() === 'VĂN BẢN'"
                  class="session-3-show-text"
                >
                  {{ detail.PlaySource }}
                </div>
              </div>
            </template>
            <div
              v-else
              class="font-italic text-muted w-100 mt-2"
              style="padding-left: 10px"
            >
              {{ $t("panel.non-data") }}
            </div>
          </div>
        </b-col>
        <b-col xl="7">
          <div class="session-2 mt-4">
            <div class="led-station-title">Chi tiết giám sát</div>
            <div class="d-lg-flex">
              <div class="session-2-table">
                <div
                  class="session-2-item"
                  v-for="(item, index) in technicalFields.slice(0, 5)"
                  :key="index"
                >
                  <div
                    class="session-2-label"
                    :class="
                      index == technicalFields.slice(0, 5).length - 1 &&
                      'remove-border-bottom'
                    "
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="session-2-value"
                    :class="
                      index == technicalFields.slice(0, 5).length - 1 &&
                      'remove-border-bottom'
                    "
                  >
                    {{ detail[item.key] }}
                  </div>
                </div>
              </div>
              <div class="session-2-table table-2">
                <div
                  class="session-2-item"
                  v-for="(item, index) in technicalFields.slice(5)"
                  :key="index"
                >
                  <div class="session-2-label">{{ item.label }}</div>
                  <div class="session-2-value">
                    {{ detail[item.key] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <div class="session-schedule mt-4">
            <ScheduleTable
              tableTitle="Lịch phát sóng"
              :dataTable="scheduleList"
              :fieldTable="scheduleFields"
              :scheduleColumnShow="scheduleColumnShow"
              :perPage="10"
              headVariant="light"
              idModalDetail="modal-detail"
            />
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else-if="selectedTab === 'History'" class="mt-4">
      <TabHistory :stationID="detail.StationID" />
    </div>
    <div v-else>
      <b-row v-if="dataImages && dataImages.length > 0">
        <template v-for="(img, index) in dataImages">
          <b-col lg="4" :key="index" style="margin-top: 30px">
            <div style="height: 250px; cursor: pointer">
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
    </div>
    <div id="fullscreen-wallpaper-light">
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
    <!-- <div class="d-flex justify-content-end mt-3" v-if="showBtnClose">
        <b-button variant="primary" size="sm" @click="closeForm">
          Đóng
        </b-button>
      </div> -->
  </div>
  <!-- </b-modal> -->
</template>

<script>
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ScheduleTable from "@/views/app/dashboards/led/component/ScheduleTable";
import TabHistory from "@/views/app/dashboards/led/component/TabHistory";

export default {
  name: "PopupLedStation",
  props: ["detail", "openForm", "showBtnClose"],
  components: {
    ScheduleTable,
    TabHistory,
    "custom-carousel-component": BCarouselComponent,
  },
  data() {
    return {
      technicalFields: [
        { key: "CpuPerformance", label: "Hoạt động CPU (%)" },
        { key: "CpuTemperature", label: "Nhiệt độ CPU (℃)" },
        { key: "Memory", label: "RAM" },
        { key: "Storage", label: "Bộ nhớ" },
        { key: "Resolution", label: "Độ phân giải" },
        { key: "SessionData", label: "Chu kỳ dữ liệu" },
        { key: "Signal4G", label: "Tín hiệu 4G" },
        { key: "Amperage_mA", label: "Cường độ dòng điện" },
        { key: "Voltage_V", label: "Hiệu điện thế" },
        { key: "Uptime", label: "Thời gian hoạt động" },
      ],
      scheduleList: [],
      scheduleColumnShow: [],
      tabList: [
        { key: "General", label: "THÔNG TIN CHI TIẾT" },
        { key: "History", label: "LỊCH SỬ PHÁT SÓNG" },
        { key: "Photos", label: "HÌNH ẢNH THIẾT BỊ" },
      ],
      selectedTab: "General",
      heightAllTab: "",
      idModal: "",
      dataImages: [],
      listImage: null,
      testType: "IMAGE",
      testText: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source`,
      testImage:
        "https://media.baobinhphuoc.com.vn/upload/news/8_2022/65af75486bf11e6f3b3efa87b51bf0d1.jpg",
      testVideo:
        "https://assets.mixkit.co/video-templates/preview/mixkit-quick-type-title-547-large.mp4",
    };
  },
  computed: {
    scheduleFields: function () {
      if (this.scheduleList && this.scheduleList.length > 0) {
        const objectKey = Object.keys(this.scheduleList[0]);
        const arr = handling.mergeKeyDynamic(
          objectKey,
          this.scheduleColumnShow
        );
        const notDisplay = ["Note", "CreateDate", "IsActive"];
        const newArr = [];
        arr.forEach((item) => {
          if (!notDisplay.includes(item.key)) {
            newArr.push({
              key: item.key,
              label: item.label,
            });
          }
        });
        const obj = { key: "Detail", label: "" };
        return [...newArr, obj];
      }
      return [];
    },
  },
  methods: {
    convertDate(date) {
      if (date) {
        return moment(date).format("DD/MM/YYYY, HH:mm:ss");
      }
      return null;
    },
    checkTailImage(url) {
      if (url) {
        const tailImage = ["png", "jpeg", "gif", "jpg", "svg", "gif", "jfif"];
        const index = url.lastIndexOf(".");
        const tail = url.slice(index + 1);
        // console.log(tail);
        return tailImage.includes(tail) ? true : false;
      }
      return null;
    },
    closeForm() {
      this.$bvModal.hide("popup-detail-led-station");
      this.$emit("closeForm");
    },
    resetModal() {
      // this.scheduleDetail = null
      this.$emit("closeForm");
    },
    cancelFormDetailSchedule() {
      this.$bvModal.hide("modal-detail-schedule");
    },
    // getScheduleByID(id) {
    //   let body = {
    //     OID: id.toString(),
    //   }
    //   scheduleByID(body)
    //     .then((val) => {
    //       this.scheduleDetail = val.status ? val.data : null
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    getColumnSchedule(string) {
      // console.log('getColumnSchedule');
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.scheduleColumnShow = val.status ? val.data : [];
          // console.log('this.scheduleColumnShow', this.scheduleColumnShow);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getImages() {
      let body = {
        GeoCode: "SmartLed",
        StationID: this.detail.StationID,
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    //module-img
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
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper-light");
      targetDiv.style.display = "none";
    },
  },
  watch: {
    detail(to) {
      if (to) {
        console.log("watch detail");
        this.scheduleList = this.detail?.PropertiesSchedule || [];
        this.selectedTab = "General";
        this.idModal = `popup-detail-led-station-${this.detail.StationID}`;

        // setTimeout(() => {
        //   this.$bvModal.show('popup-detail-led-station')
        // }, 500)
      }
    },
    // openForm(to) {
    //   if (to) {
    //     this.selectedTab = 'General'
    //     this.$bvModal.show('popup-detail-led-station')
    //   } else {
    //     this.selectedTab = 'General'
    //     this.$bvModal.hide('popup-detail-led-station')
    //   }
    // },
    // idModal(to) {
    //   this.$bvModal.show(to)
    // },
  },
  // updated() {
  //   setTimeout(() => {
  //     // const a = this.$refs['popup-detail-led-station']
  //     const a = this.$refs['popup-detail-led-station']
  //     const bodyModal = a.$refs.body
  //     if (bodyModal) {
  //       bodyModal.style.minHeight = `${bodyModal.offsetHeight}px`
  //     }
  //   }, 300)
  // },
  // updated() {
  //   setTimeout(() => {
  //     const a = this.$refs['popup-detail-led-station']
  //     console.log(a);
  //   }, 300)
  // },
  created() {
    if (this.detail) {
      this.scheduleList = this.detail?.PropertiesSchedule || [];
      this.selectedTab = "General";
      // this.idModal = `popup-detail-led-station-${this.detail.StationID}`
      // setTimeout(() => {
      //   this.$bvModal.show('popup-detail-led-station')
      // }, 500)

      // this.$bvModal.show('popup-detail-led-station')
    }
    // console.log('getColumnSchedule');
    this.getColumnSchedule("ScheduleSlideShows");
    this.getImages();
  },
};
</script>

<style lang="scss">
.popup-detail-led-station {
  position: relative;
  // font-size: 14px;
  .led-station-name {
    position: relative;
    display: flex;

    p {
      margin-bottom: 0;
      color: black;
      font-weight: 700;
      font-size: 1.2rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  .session-1-status {
    display: flex;
    align-items: flex-end;

    position: absolute;
    bottom: 0;
    left: calc(100% + 10px);

    span {
      white-space: nowrap;
      font-style: italic;
      color: #878787;
    }
  }
  .session-1-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-bottom: 6px;
    margin-right: 3px;
  }
  .led-station-title {
    width: 100%;
    // max-width: 340px;
    background: #145388;
    padding: 5px 10px;
    // margin-bottom: 5px;

    color: white;
    // font-weight: 700;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }
  .session-1-icon {
    width: 15px;
    margin-right: 5px;
    text-align: center;
  }
  .session-1-note {
    font-style: italic;
    color: #878787;
    display: inline-block;
    margin-left: 5px;
  }

  .session-3-show-playing {
    border: 1px solid #eeeeee;
    border-top: none;
    padding: 10px;
  }
  .session-3-show-text {
    // margin-top: 10px;
    text-align: justify;
  }

  .session-3-show-image {
    width: 100%;
    // margin-top: 5px;
    display: block;
    position: relative;
    // padding-top: 75%; //4:3
    padding-top: 56.25%; //16:9
  }
  .session-3-show-image-2 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .session-3-show-video {
    width: 100%;
    // max-width: 300px;
    padding-top: 56.25%; //16:9
    position: relative;

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .badge-dashboard-led {
    padding: 4px 8px;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
  }

  .sesstion-schedule-table {
    border-top: 1px solid #eeeeee;
  }

  .session-schedule-item {
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;

    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
  .session-schedule-name {
    font-size: 14px;
    // flex-grow: 1;
    flex: 1 1 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  .session-schedule-btn {
    padding: 4px 8px;
    border-radius: 0.25rem;
    // width: 120px;
    // height: 25px;

    // line-height: 25px;
    font-weight: bold;
    white-space: nowrap;
    color: white;
    text-align: center;
    cursor: pointer;
  }

  .session-2-table {
    border-left: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    flex: 1 1 50%;

    &.table-2 {
      @media (min-width: 992px) {
        border-left: 0px;
      }
    }
  }
  .session-2-item {
    display: flex;
  }
  .session-2-label {
    // width: 100%;
    // max-width: 320px;
    flex: 1 1 42%;
    background: #f7f7f7;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 5px 15px 5px;

    color: black;
    font-weight: 600;
    font-size: 12px;
  }
  .session-2-value {
    // width: 100%;
    flex: 1 1 58%;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 5px 15px 5px;
    font-size: 12px;
  }
  .remove-border-bottom {
    @media (max-width: 991px) {
      border-bottom: 0;
    }
  }
}
.led-station-modal-body-padding {
  padding: 1.75rem !important;
  padding-bottom: 0 !important;
}
.led-station-modal-footer-padding {
  border-top: 0 !important;
  padding: 1.75rem !important;
  padding-top: 0 !important;
}
.popup-detail-led-station {
  .modal-body {
    padding: 1.75rem;
    padding-bottom: 0;
  }
  .modal-footer {
    border-top: 0;
    padding: 1.75rem;
    padding-top: 0;
  }
}

// #popup-detail-led-station {
//   .modal-body {
//     padding: 1.75rem;
//     padding-bottom: 0;
//   }
//   .modal-footer {
//     border-top: 0;
//     padding: 1.75rem;
//     padding-top: 0;
//   }
// }
</style>

<style scoped>
/* module-img */
#fullscreen-wallpaper-light {
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

#fullscreen-wallpaper-light .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper-light .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper-light .button-close-wallpaper .btn i {
  font-size: 20px;
}
</style>
