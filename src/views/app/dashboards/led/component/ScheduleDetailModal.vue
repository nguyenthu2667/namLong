<template>
  <div v-if="scheduleDetail" class="detail-schedule-frame positive-relative">
    <!-- <button
      type="button"
      aria-label="Close"
      class="close position-absolute"
      @click="closeForm"
      style="top: 0; right: 10px;"
    >
      ×
    </button> -->
    <div class="d-lg-flex">
      <div class="detail-schedule">
        <div class="detail-schedule-title add-border-right">
          Thông tin phát sóng
        </div>
        <div class="detail-schedule-content">
          <div
            v-for="(item, index) in scheduleFields"
            :key="index"
            class="detail-schedule-item"
            :class="index === 0 && 'mt-0'"
          >
            <div class="detail-schedule-label">{{ item.label }}:</div>
            <template v-if="item.key.toUpperCase() == 'FILETYPE'">
              <span class="badge-dashboard-led bg-primary">
                <i :class="badgeDetail().icon"></i>
                {{ badgeDetail().text }}
              </span>
            </template>
            <template v-else-if="item.key.toUpperCase() == 'DATEDESCRIPTION'">
              <div class="detail-schedule-circle bg-primary">
                {{ scheduleDetail.DateDescription }}
              </div>
            </template>
            <template v-else-if="item.key.toUpperCase() == 'OPTIONDAY'">
              <div class="d-flex">
                <template v-for="(day, index) in dayOfWeek">
                  <div v-if="index == dayOfWeek.length - 1" :key="index">
                    {{ day }}
                  </div>
                  <div v-else :key="index" class="mr-1">
                    {{ `${day},` }}
                  </div>
                </template>
              </div>
            </template>
            <template v-else-if="item.key.toUpperCase() == 'CREATEDATE'">
              <div class="detail-schedule-value">
                {{ convertDate(scheduleDetail[item.key]) }}
              </div>
            </template>
            <div class="detail-schedule-value" v-else>
              {{ scheduleDetail[item.key] }}
            </div>
          </div>
        </div>
      </div>
      <div class="detail-schedule mt-3 mt-lg-0">
        <div class="detail-schedule-title">
          {{ `${scheduleDetail.FileType} phát sóng` }}
        </div>
        <div class="detail-schedule-content remove-border-left">
          <div
            v-if="scheduleDetail.FileTypeHide.toUpperCase() === 'TEXT'"
            class="session-3-show-text"
          >
            {{ scheduleDetail.SourceFile }}
          </div>
          <div
            v-else-if="scheduleDetail.FileTypeHide.toUpperCase() === 'IMAGE'"
            class="session-3-show-playing"
          >
            <div class="session-3-show-image">
              <div class="session-3-show-image-2">
                <b-img :src="scheduleDetail.SourceFile"></b-img>
              </div>
            </div>
          </div>
          <div
            v-else-if="scheduleDetail.FileTypeHide.toUpperCase() === 'VIDEO'"
            class="session-3-show-playing"
          >
            <div class="session-3-show-video">
              <video controls :src="scheduleDetail.SourceFile"></video>
            </div>
          </div>
          <div v-else class="mt-2" style="padding-left: 10px">
            Không có dữ liệu
          </div>
        </div>
      </div>
    </div>
    <div class="detail-schedule-table mt-4" v-if="isShowLedStaionList">
      <h6 class="text-muted">
        <strong> Thiết bị phát sóng </strong>
      </h6>
      <b-table
        hover
        :current-page="currentPage"
        :per-page="perPage"
        :fields="ledStaionFields"
        :items="ledStationList"
        responsive
        bordered
        head-variant="light"
        show-empty
      >
        <template #empty>
          <div class="text-center font-italic text-muted">
            {{ $t("panel.non-data") }}
          </div>
        </template>
        <template #emptyfiltered>
          <div class="text-center font-italic text-muted">
            {{ $t("panel.non-result") }}
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-between align-items-center">
        <span>
          {{ $t("form.total") }}:
          <strong>{{ ledStationList.length }}</strong>
          {{ $t("form.result").toLowerCase() }}
        </span>
        <b-pagination
          size="sm"
          :total-rows="ledStationList.length"
          :per-page="perPage"
          v-model="currentPage"
          style="margin-bottom: 0"
        >
          <template v-slot:next-text>
            <i class="simple-icon-arrow-right" />
          </template>
          <template v-slot:prev-text>
            <i class="simple-icon-arrow-left" />
          </template>
          <template v-slot:first-text>
            <i class="simple-icon-control-start" />
          </template>
          <template v-slot:last-text>
            <i class="simple-icon-control-end" />
          </template>
        </b-pagination>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-3">
      <b-button variant="primary" size="sm" @click="closeForm"> Đóng </b-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ScheduleDetailModal",
  props: [
    "scheduleDetail",
    "scheduleColumnShow",
    "ledStaionFields",
    "ledStationList",
    "isShowLedStaionList",
  ],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    scheduleFields() {
      if (
        this.scheduleColumnShow &&
        this.scheduleColumnShow.length > 0 &&
        this.scheduleDetail
      ) {
        const arr = [];
        for (const key in this.scheduleDetail) {
          if (key !== "IsActive") {
            const obj = this.scheduleColumnShow.find(
              (item) => item.ClName == key
            );
            if (obj) {
              arr.push({
                key,
                label: obj.ShwName,
              });
            }
          }
        }
        return arr;
        // const objectKey = Object.keys(this.scheduleDetail)
        // this.scheduleColumnShow.forEach(item => {
        //   if(item.ClName == )
        // })
      }
      return [];
      // return [
      //   { key: 'OID', label: 'Chương trình số' },
      //   { key: 'OName', label: 'Chương trình phát sóng' },
      //   { key: 'FileType', label: 'Phương thức trình chiếu' },
      //   { key: 'LoopType', label: 'Lặp lại' },
      //   { key: 'DateDescription', label: 'Ngày phát' },
      //   { key: 'TimeDescription', label: 'Thời gian phát' },
      //   { key: 'RunTime', label: 'Thời gian trình chiếu(giây)' },
      //   { key: 'CreateDate', label: 'Ngày tạo' },
      //   { key: 'Note', label: 'Ghi chú' },
      // ]
    },
    slideShowType() {
      if (this.scheduleDetail) {
        switch (this.scheduleDetail.FileTypeHide.toUpperCase()) {
          case "TEXT":
            return "Văn bản trình chiếu";
          case "IMAGE":
            return "Hình ảnh trình chiếu";
          case "VIDEO":
            return "Video trình chiếu";
          default:
            break;
        }
      }
      return "";
    },
    dayOfWeek() {
      if (this.scheduleDetail && this.scheduleDetail.OptionDay) {
        const arr = this.scheduleDetail.OptionDay.split(",");
        const newArr = [];
        arr.forEach((item) => {
          if (item) {
            newArr.push(item);
          }
        });
        return newArr;
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
    cancelForm() {
      this.$emit("cancelForm");
    },
    rowDblclicked(row) {
      this.scheduleDetail = row;
    },
    resetModal() {
      this.scheduleDetail = null;
    },
    closeForm() {
      this.$emit("closeForm");
    },
    getColumnShowName(key) {
      if (key) {
        const obj = this.scheduleColumnShow.find((item) => item.ClName === key);
        return obj ? obj.ShwName : "";
      }
      return "";
    },
    badgeDetail() {
      if (this.scheduleDetail) {
        switch (this.scheduleDetail.FileTypeHide.toUpperCase()) {
          case "TEXT":
            return { text: "Văn bản", icon: "fad fa-text" };
          case "IMAGE":
            return { text: "Hình ảnh", icon: "fas fa-image" };
          case "VIDEO":
            return { text: "Video", icon: "fas fa-video" };
          default:
            break;
        }
      }
      return { text: "", icon: "" };
    },
  },
};
</script>

<style lang="scss">
.detail-schedule-frame {
  .detail-schedule {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
  }
  .detail-schedule-title {
    width: 100%;
    // max-width: 300px;
    background: #145388;
    padding: 5px 10px;
    // margin-bottom: 5px;

    color: white;
    // font-weight: 700;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;

    &.add-border-right {
      @media (min-width: 991px) {
        border-right: 1px solid #eeeeee;
      }
    }
  }
  .detail-schedule-content {
    border: 1px solid #eeeeee;
    border-top: 0;
    flex-grow: 1;
    padding: 10px;

    &.remove-border-left {
      @media (min-width: 991px) {
        border-left: 0;
      }
    }
  }
  .detail-schedule-item {
    display: flex;
    flex-wrap: wrap;
    // align-items: flex-end;
    align-items: center;
    margin-top: 10px;
  }
  .detail-schedule-label {
    margin-right: 5px;
    white-space: nowrap;
  }
  .detail-schedule-value {
    font-weight: 700;
    font-size: 14px;
  }
  .detail-schedule-circle {
    // width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    // margin-right: 5px;
    padding: 0 5px;
    color: white;
    text-align: center;
    font-size: 12px;
  }
  // .detail-schedule-circle-2 {
  //   width: auto;
  //   height: auto;
  //   padding: 0 5px;
  // }
  .session-3-show-text {
    margin-top: 10px;
    text-align: justify;
  }
  .session-3-show-playing {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .session-3-show-image {
    width: 100%;
    // margin-top: 5px;
    display: block;
    position: relative;
    padding-top: 75%; //4:3
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
    white-space: nowrap;
  }

  .detail-schedule-table {
    .table-responsive {
      margin-bottom: 0;
    }
  }
}
</style>
