<template>
  <div class="text-center section">
    <!-- <h4><strong>LỊCH THU THẬP</strong></h4> -->
    <!-- <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p> -->
    <v-calendar
      v-model="myDate"
      class="custom-calendar max-w-full"
      :masks="formatDate"
      :attributes="attributes"
      is-expanded
      show-caps
      :theme-styles="themeStyles"
    >
      <span
        class="cus-date-header"
        slot="header-title"
        slot-scope="{ shortMonthLabel, shortYearLabel }"
      >
        {{ shortYearLabel }}/{{ shortMonthLabel }}
      </span>
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">
            {{ day.day }}
          </span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="d-flex text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['data'],
  created() {
    this.convertDataCustom()
  },
  data() {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    return {
      themeStyles: {
        header({ params }) {
          return {
            fontSize: 'small',
            color: '#495057',
            height: '41px',
            border: '1px solid #f3f3f3',
            background: '#f3f3f3',
          }
        },
      },
      myDate: null,
      formatDate: {
        title: 'MMMM YYYY',
        weekdays: 'W',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'], // Only for `v-date-picker`
        dayPopover: 'L', // Only for `v-date-picker`
        data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'], // For attribute dates
      },
      attributes: [
        // {
        //   key: 1,
        //   customData: {
        //     title: 'TTDL/03032021/0011',
        //     class: 'badge badge-primary mr-1 ml-1',
        //   },
        //   dates: [
        //     new Date(year, month, 1),
        //     new Date(year, month, 2),
        //     '13/01/2022',
        //   ],
        // },
        // {
        //   key: 2,
        //   customData: {
        //     title: 'TTDL/110122/005',
        //     class: 'badge badge-primary mr-1 ml-1',
        //   },
        //   dates: ['13/01/2022'],
        // },
        // {
        //   key: 6,
        //   customData: {
        //     title: 'TTDL/110122/006',
        //     class: 'badge badge-primary mr-1 ml-1',
        //   },
        //   dates: { months: 1, ordinalWeekdays: { 2: 1 } },
        // },
      ],
    }
  },
  methods: {
    convertDataCustom() {
      this.attributes.length = 0
      this.data.forEach((ite) => {
        let obj = {
          key: ite.OID,
          customData: {
            title: ite.OID,
            class: 'badge badge-primary mr-1 ml-1',
          },
          dates: [this.convertDate(ite.CreateDate)],
        }
        this.attributes.push(obj)
      })
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss")
      return date.format('DD/MM/YYYY')
    },
  },
}
</script>
<style scoped>
.cus-date-header {
  border: 1px solid #f3f3f3;
  border-radius: 20px;
  padding: 4px 40px;
}
.cus-date-header:hover {
  background: #dbd9d9;
}
</style>
<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
