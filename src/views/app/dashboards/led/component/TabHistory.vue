<template>
  <div class="popup-led-station-tab-history">
    <div class="tab-history-header d-flex flex-wrap align-items-center">
      <template v-for="(item, index) in watchByType">
        <template v-if="item.key !== 'Date'">
          <div
            :key="index"
            class="watch-by-type"
            :class="selectedTab === item.key && 'active'"
            @click="selectedTab = item.key"
          >
            {{ item.label }}
          </div>
        </template>
        <template v-else>
          <div
            :key="index"
            class="watch-by-type"
            :class="selectedTab === item.key && 'active'"
            :style="{ width: showFromDate && showToDate ? 'auto' : '150px' }"
            @click="selectedTab = item.key"
          >
            <template v-if="showFromDate && showToDate">
              {{ `${item.label}: ${showFromDate} - ${showToDate}` }}
            </template>
            <template v-else>
              {{ item.label }}
            </template>
          </div>
        </template>
      </template>
      <b-button
        v-if="selectedTab === 'Date'"
        size="sm"
        class="btn-choose-range-time"
        @click="openChooseTimeModal"
        >Chọn khoảng thời gian</b-button
      >
    </div>
    <div tab-history-list mt-4>
      <div
        class="d-none d-xl-flex justify-content-center justify-content-sm-between align-items-center border-bottom mt-3"
      >
        <span class="d-none d-sm-block">
          {{ $t('form.total') }}:
          <strong>{{ broadcastHistory.length }}</strong>
          {{ $t('form.result').toLowerCase() }}
        </span>
        <b-pagination
          size="sm"
          :total-rows="broadcastHistory.length"
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
      <template v-if="broadcastHistory && broadcastHistory.length > 0">
        <b-row class="align-items-center">
          <!-- <b-col
            xl="6"
            v-for="(item, index) in renderList"
            :key="index"
            class="mt-3 mt-xl-0"
          > -->
          <b-col
            xl="6"
            v-for="(item, index) in renderList"
            :key="index"
            class="mt-3"
          >
            <div
              class="d-lg-flex align-items-center tab-history-detail-schedule-frame"
            >
              <div class="tab-history-detail-schedule mt-3 mt-lg-0">
                <div class="tab-history-detail-schedule-content">
                  <div
                    v-if="item.LinkType.toUpperCase() === 'TEXT'"
                    class="tab-history-show-text"
                    style="max-height: 190px; overflow: auto; padding: 4px"
                  >
                    {{ item.Link }}
                  </div>
                  <div
                    v-else-if="item.LinkType.toUpperCase() === 'IMAGE'"
                    class="tab-history-show-playing"
                  >
                    <div class="tab-history-show-image">
                      <div class="tab-history-show-image-2">
                        <b-img :src="item.Link"></b-img>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="item.LinkType.toUpperCase() === 'VIDEO'"
                    class="tab-history-show-playing"
                  >
                    <div class="tab-history-show-video">
                      <video controls :src="item.Link"></video>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-history-detail-schedule">
                <div class="tab-history-detail-schedule-content">
                  <div
                    v-for="(field, index) in scheduleFields"
                    :key="index"
                    class="tab-history-detail-schedule-item"
                    :class="index === 0 && 'mt-0'"
                  >
                    <template v-if="field.key == 'OName'">
                      <div class="tab-history-detail-schedule-name">
                        {{ item[field.key] }}
                      </div>
                    </template>
                    <template v-else-if="field.key == 'LinkType'">
                      <span class="tab-history-detail-schedule-badge">
                        <i :class="badgeDetail(item.LinkType).icon"></i>
                        {{ badgeDetail(item.LinkType).text }}
                      </span>
                    </template>
                    <template v-else>
                      <div class="tab-history-detail-schedule-label">
                        {{ field.label }}:
                      </div>
                      <template
                        v-if="
                          field.key == 'FirstTime' || field.key == 'LastTime'
                        "
                      >
                        <div class="tab-history-detail-schedule-value">
                          {{ convertDate(item[field.key]) }}
                        </div>
                      </template>
                      <div class="tab-history-detail-schedule-value" v-else>
                        {{ item[field.key] }}
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="d-flex d-xl-none justify-content-center justify-content-sm-between align-items-center border-top mt-3">
          <span class="d-none d-sm-block">
            {{ $t('form.total') }}:
            <strong>{{ broadcastHistory.length }}</strong>
            {{ $t('form.result').toLowerCase() }}
          </span>
          <b-pagination
            size="sm"
            :total-rows="broadcastHistory.length"
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
      </template>
      <!-- <template v-else>
        <div class="font-italic text-muted w-100 mt-2">
          {{ $t('panel.non-data') }}
        </div>
      </template> -->
    </div>
    <b-modal
      id="range-time-modal"
      :size="'sm'"
      ok-only
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <div
        class="d-flex flex-wrap align-items-center"
        style="min-height: 300px"
      >
        <div class="w-100">
          <div>
            <b-form-group label="Từ ngày">
              <b-form-datepicker
                v-model="fromDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </b-form-group>
          </div>
          <div>
            <b-form-group label="Đến ngày">
              <b-form-datepicker
                v-model="toDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end btn-group-led mt-2">
        <b-button variant="secondary" size="sm" @click="cancelFormRangeTime">
          Đóng
        </b-button>
        <b-button
          variant="primary"
          class="ml-2"
          size="sm"
          @click="chooseRangeTime()"
        >
          Xác nhận
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
// import { ledStationHistory } from '@/data/modules/led'
import ledAPI from '@/api/modules/ledAPI'

export default {
  name: 'TabHistory',
  props: ['stationID'],
  data() {
    return {
      watchByType: [
        { key: 'Day', label: 'Trong ngày' },
        { key: 'Week', label: 'Trong tuần' },
        { key: 'Month', label: 'Trong tháng' },
        { key: 'Year', label: 'Trong năm' },
        { key: 'Date', label: 'Khoảng thời gian' },
      ],
      broadcastHistory: [],
      selectedTab: 'Day',
      fromDate: moment(new Date()).format('YYYY-MMDD'),
      toDate: moment(new Date()).format('YYYY-MMDD'),
      showFromDate: '',
      showToDate: '',
      currentPage: 1,
      perPage: 6,
      renderList: [],
      testHistoryText: {
        OName: 'Văn bản Quảng cái thi công bảng led',
        Link: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.`,
        LinkType: 'Text',
        ViewNo: 28,
        TimeShow: '0g29p',
        FirstTime: '2022-10-28T10:29:54.76',
        LastTime: '2022-10-28T10:30:59.707',
      },
    }
  },
  computed: {
    scheduleFields() {
      return [
        { key: 'OName', label: 'Chương trình' },
        { key: 'LinkType', label: 'Nguồn phát' },
        { key: 'ViewNo', label: 'Số lần phát' },
        { key: 'TimeShow', label: 'Thời gian phát' },
        { key: 'FirstTime', label: 'Phát lần đầu' },
        { key: 'LastTime', label: 'Phát gần đây' },
      ]
    },
  },
  methods: {
    getHistory() {
      let body = {
        View: this.selectedTab,
        StationID: this.stationID,
      }
      if (this.selectedTab === 'Date') {
        body.FromDate = moment(this.fromDate).format('YYYY/MM/DD')
        body.ToDate = moment(this.toDate).format('YYYY/MM/DD')
      }
      ledAPI.ledStationHistory(body)
        .then((val) => {
          this.broadcastHistory = val.status ? val.data : []
          // const arr = val.status ? val.data : []
          // if(arr.length > 0) {
          //   this.broadcastHistory = [...arr, this.testHistoryText]
          // }
          // else {
          //   this.broadcastHistory = arr
          // }
          // this.broadcastHistory = [...arr, this.testHistoryText]
          // const arr = val.status ? val.data : []
          // if(arr.length > 1) {
          //   this.broadcastHistory = [...arr, ...arr,  arr[1], ...arr, arr[1], ...arr, arr[0], arr[1], arr[0]]
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    convertDate(date) {
      if (date) {
        // const customDate = date.slice(0, 19)
        // console.log(customDate);
        // return moment(customDate).format('DD/MM/YYYY, HH:mm:ss')
        return moment(date).format('DD/MM/YYYY, HH:mm:ss')
      }
      return null
    },
    cancelFormRangeTime() {
      this.$bvModal.hide('range-time-modal')
    },
    resetModal() {
      // this.fromDate = null
      // this.toDate = null
    },
    chooseRangeTime() {
      this.$bvModal.hide('range-time-modal')
      this.showFromDate = moment(this.fromDate).format('DD/MM/YYYY')
      this.showToDate = moment(this.toDate).format('DD/MM/YYYY')
      this.getHistory()
    },
    badgeDetail(value) {
      if (value) {
        switch (value.toUpperCase()) {
          case 'TEXT':
            return { text: 'Văn bản', icon: 'fad fa-text' }
          case 'IMAGE':
            return { text: 'Hình ảnh', icon: 'fas fa-image' }
          case 'VIDEO':
            return { text: 'Video', icon: 'fas fa-video' }
          default:
            return { text: '', icon: '' }
        }
      }
      return { text: '', icon: '' }
    },
    openChooseTimeModal() {
      this.$bvModal.show('range-time-modal')
    },
    setRenderList() {
      if (this.broadcastHistory && this.broadcastHistory.length > 0) {
        const arr = [...this.broadcastHistory]
        const start = (this.currentPage - 1) * this.perPage
        const end = this.currentPage * this.perPage
        // console.log(start);
        // console.log(end);
        // console.log(this.broadcastHistory);
        this.renderList = arr.slice(start, end)
        // console.log(this.renderList);
      }
    },
  },
  watch: {
    selectedTab(to) {
      // console.log(to)
      if (to !== 'Date') {
        this.getHistory()
      } else {
        this.fromDate = !this.showFromDate
          ? moment(new Date()).format('YYYY-MM-DD')
          : this.fromDate
        this.toDate = !this.showToDate
          ? moment(new Date()).format('YYYY-MM-DD')
          : this.toDate
      }
    },
    currentPage(to) {
      this.setRenderList()
      // if (this.broadcastHistory && this.broadcastHistory.length > 0) {
      //   const start = (to - 1) * this.perPage
      //   const end = to * this.perPage
      //   this.renderList = this.broadcastHistory.slice(start, end)
      // }
      // function paginate(array, page_size, page_number) {
      //   return array.slice(
      //     (page_number - 1) * page_size,
      //     page_number * page_size,
      //   )
      // }
    },
    broadcastHistory(to) {
      this.setRenderList()
      // this.renderList = [...to, ...to, ...to, ...to]
    },
  },
  created() {
    // console.log('create tab history')
    this.selectedTab = 'Day'
    this.getHistory()
  },
}
</script>

<style lang="scss">
.popup-led-station-tab-history {
  .tab-history-header {
    display: flex;
    align-items: center;
  }
  .watch-by-type {
    width: 150px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #145388;
    margin-right: 5px;
    margin-top: 5px;
    padding: 0 5px;

    color: #145388;
    line-height: 27px;
    font-size: 14px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    transition: 0.3s;
    cursor: pointer;

    &.active {
      color: white;
      background: #145388;
    }
  }

  .tab-history-detail-schedule {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
  }
  .tab-history-detail-schedule-title {
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
  .tab-history-detail-schedule-content {
    // border: 1px solid #eeeeee;
    // border-top: 0;
    margin-right: 10px;
    // padding: 10px;
    @media (max-width: 991px) {
      margin-right: 0;
    }

    // &.remove-border-left {
    //   @media (min-width: 991px) {
    //     border-left: 0;
    //   }
    // }
  }
  .tab-history-detail-schedule-item {
    display: flex;
    flex-wrap: wrap;
    // align-items: flex-end;
    align-items: center;
    margin-top: 5px;

    svg {
      width: 12px;
      height: 12px;
      fill: gray;
    }
    i {
      width: 12px;
      height: 12px;
      color: gray;
    }
  }
  .tab-history-detail-schedule-name {
    color: black;
    font-size: 16px;
    font-weight: 700;
  }
  .tab-history-detail-schedule-label {
    margin-right: 5px;
    white-space: nowrap;
  }
  .tab-history-detail-schedule-value {
    font-weight: 700;
    // font-size: 14px;
  }
  .tab-history-detail-schedule-circle {
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
  // .tab-history-detail-schedule-circle-2 {
  //   width: auto;
  //   height: auto;
  //   padding: 0 5px;
  // }
  .tab-history-show-text {
    margin-top: 10px;
    text-align: justify;
  }
  .tab-history-show-playing {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab-history-show-image {
    width: 100%;
    // margin-top: 5px;
    display: block;
    position: relative;
    padding-top: 75%; //4:3
    // padding-top: 56.25%; //16:9
  }
  .tab-history-show-image-2 {
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
  .tab-history-show-video {
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

  .tab-history-detail-schedule-badge {
    // display: flex;
    // align-items: center;
    // padding: 2px 4px;
    padding: 0 4px;
    height: 18px;
    border-radius: 0.25rem;
    background: gray;

    line-height: 18px;
    color: white;
    white-space: nowrap;
    font-size: 10px;
    i {
      color: white;
    }
    // i{
    //   font-size: 10px;
    // }
  }

  .choose-range-time {
    .b-form-datepicker {
      white-space: nowrap;
    }
  }
  .btn-choose-range-time {
    padding: 4px 8px;
  }

  .tab-history-detail-schedule-frame {
    // min-height: 190px;
    // @media (max-width: 1199px) {
    //   min-height: auto;
    // }
  }
}
</style>
