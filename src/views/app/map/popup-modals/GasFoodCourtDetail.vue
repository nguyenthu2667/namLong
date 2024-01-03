<template>
  <div>
    <b-row>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx lg="6" md="12">
        <b-alert
          :class="['text-center', 'led-' + dataModal.StatusColor]"
          style="color: white; letter-spacing: 4px;"
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
                class="text-left font-weight-bold"
                show
                style="background-color: rgb(233, 236, 239); color: black;"
              >
                {{ dataModal.StationName.toUpperCase() }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.phone') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black;"
              >
                {{ dataModal.StationPhone }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="3">
            <b-form-group class="mb-0" :label="$t('modal.input-date') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black;"
              >
                {{ convertDate(dataModal.InputDate) }}
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="8">
            <b-form-group class="mb-0" :label="$t('modal.address') + ':'">
              <b-alert
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black;"
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
                class="text-left"
                show
                style="background-color: rgb(233, 236, 239); color: black;"
              >
                {{ dataModal.Long + ', ' + dataModal.Lat }} 
              </b-alert>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="12" class="mb-3 mt-2">
            <span>
              <i class="fas fa-sliders-h mr-2"></i>
              <span class="font-weight-bold mr-2 p-1">
                {{ $t('dashboards.monitoring-parameters').toUpperCase() }}
                <!-- <span class="ml-2 mr-2">-</span>
                {{ $t('map.update-time') + ':' }}
                <span class="text-danger">
                  {{
                    dataModal.UpdateTime
                      ? convertDateTime(dataModal.UpdateTime)
                      : convertDateTime(dataModal.Updatetime)
                  }}
                </span> -->
              </span>
            </span>
          </b-colxx>
          <b-colxx lg="12" class="mb-2 mt-2">
            <span class="font-weight-bold mr-2 pt-2 pb-2">
                  <template v-if="dataModal.IsLock">
                    {{ $t('modal.click-to-here') + ' ' + $t('dashboards.gas-lock-open').toLowerCase() + ': ' }}
                  </template>
                  <template v-else>
                    {{ $t('modal.click-to-here') + ' ' + $t('dashboards.gas-lock').toLowerCase() + ': ' }}
                  </template>
                </span>
                <b-button
                  style="width:30px;height: 30px; border-radius: 4px; padding: 5px 8px;"
                  :variant="
                    dataModal.IsLock ? 'outline-success' : 'outline-danger'
                  "
                  :disabled="accessWrite === false ? true : false"
                  @click="statusEdit(dataModal)"
                >
                  <template v-if="dataModal.IsLock">
                    <i class="fad fa-lock-open" style="font-size: 11px;"></i>
                  </template>
                  <template v-else>
                    <i class="fad fa-lock" style="font-size: 11px;"></i>
                  </template>
                </b-button>
                <template v-if="!dataModal.IsLock">
                    <strong class="text-success" >
                     ({{$t('dashboards.lamp-open')}})
                    </strong>
                  </template>
                  <template v-else>
                    <strong class="text-danger">
                      ({{$t('modal.device-close')}})
                    </strong>
                  </template>
              </span>
          </b-colxx>
          <b-colxx md="12" v-if="dataModal.IsLock">
            <b-alert show variant="danger" >
              <i class="fad fa-ban text-danger "></i>
              <strong>{{ $t('dashboards.gas-lock-reason') + ': ' }}</strong>
              {{ dataModal.LockDescription }}
            </b-alert>
          </b-colxx>
          <b-colxx lg="4" md="6" class="mb-4">
            <b-row>
              <b-colxx lg="12">
                <b-form-group class="mb-0" :label="$t('map.update-time') + ':'">
                  <b-alert
                    class="text-left"
                    show
                    style="background-color: rgb(233, 236, 239); color: black;"
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
              <b-colxx lg="12">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.detected-status') + ': '"
                >
                  <template v-if="dataModal.IsDetector === -1">
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(255, 0, 50); color: black;"
                    >
                      {{ $t('map.error-sensor') }}
                    </b-alert>
                  </template>
                  <template v-else-if="dataModal.IsDetector === 1">
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(255, 225, 50); color: black;"
                    >
                      {{ $t('map.leak-gas').toUpperCase() }}
                    </b-alert>
                  </template>
                  <template v-else>
                    <b-alert
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(60, 250, 50); color: black;"
                    >
                      {{ $t('table.normal').toUpperCase() }}
                    </b-alert>
                  </template>
                </b-form-group>
              </b-colxx>
              
            </b-row>
          </b-colxx>
          <b-colxx lg="4">
            <b-row>
              <b-colxx lg="12">
                <b-form-group
                  class="mb-0 text-left"
                  :label="$t('dashboards.network-connections') + ': '"
                >
                  <b-alert
                    class="text-left"
                    show
                    style="background-color: rgb(233, 236, 239); color: black;"
                  >
                    {{ dataModal.ConnectName }} 
                  </b-alert>
                </b-form-group>
              </b-colxx>
              <b-colxx lg="12">
                <b-form-group
                  class="mb-0"
                  :label="$t('dashboards.use-status') + ': '"
                >
                    <b-alert
                      v-if="dataModal.IsLock"
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(60, 250, 50); color: black;"
                    >
                      {{$t('alert.locked').toUpperCase()}} GAS
                    </b-alert>
                    <b-alert
                      v-else
                      class="text-center text-uppercase font-weight-bold"
                      show
                      style="background-color: rgb(60, 250, 50); color: black;"
                    >
                      {{$t('alert.using').toUpperCase()}}
                    </b-alert>
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-colxx>
          <b-colxx
            lg="4"
            md="6"
            class="text-center mb-4"
            style="margin-top: -20px;"
          >
            <radial-chart-two
              :type-show="1"
              :font-size="20"
              :height="200"
              :data="[parseFloat(dataModal.GasValue)]"
              :label="[`${dataModal.GasValue} m³`]"
            ></radial-chart-two>
            <p
              class="mb-0 font-weight-bold text-muted"
              style="margin-top: -15px;"
            >
              {{$t('alert.clock')}} gas
            </p>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx md="12" class="mt-2">
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="$t('pages.leak-detected').toUpperCase()" active >
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
          <b-tab :title="$t('tabs.title.analysis-chart').toUpperCase()" @click="handleClick" >
            <b-row>
            <b-col md="12">
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs mt-2"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
            </b-col>
            <b-col md="12">
              <apex-column-chart-two v-if="isShow" :data="dataChart" :colors="['#F44336', '#32CD32']" />
              <p v-else class="text-center">Loading...</p>
            </b-col>
            </b-row>
          </b-tab>
           <b-tab :title="$t('list-image').toUpperCase()">
            <b-row v-if="dataImages && dataImages.length > 0">
              <template v-for="(img, index) in dataImages">
                <b-col lg="4" :key="index">
                  <b-img fluid-grow :src="img.ImageLink" alt="Image"></b-img>
                </b-col>
              </template>
            </b-row>
            <template v-else>
              <p class="text-center text-muted text-small font-italic">
                {{ $t('map.no-data') }}
              </p>
            </template>
          </b-tab>
        </b-tabs>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import handling from '@/constants/handling'
import RadialChartApexTwo from '@/components/Charts/RadialChartApexTwo'
import { timer } from '@/constants/config'
import gasFoodCourtAPI from '@/api/modules/gasFoodCourtAPI'
import CustomTables from '@/components/Table/CustomTables'
import gasFamilyAPI from '@/api/modules/gasFamilyAPI'
import ColumnChartApexTwo from '@/components/Charts/ColumnChartApexTwo'
import systemAPI from '@/api/modules/systemAPI'

export default {
  components: {
    'radial-chart-two': RadialChartApexTwo,
    'custom-table': CustomTables,
    'apex-column-chart-two':ColumnChartApexTwo
  },
  props: ['dataModal', 'accessWrite'],
  data() {
    return {
      userID: JSON.parse(localStorage.getItem('user')).UserID,
       keyString: 'FoodCourt',
      isShow:false,
      timer,
      selectMode: 'single',
      logDetected: null,
      leakDetected: null,
      objectKeyDetected: null,
      objectKeyDetectedLeak: null,
      listColumnShowDetected: null,
      listColumnShowDetectedLeak: null,
      dataChart:null,
      selectChartOption:{
          label: this.$t('modal.this-week'),
          value: 'WEEK',
        },
      optionChart: [
        {
          label: this.$t('modal.this-week'),
          value: 'WEEK',
        },
        {
          label: this.$t('modal.this-month'),
          value: 'MONTH',
        },
        {
          label: this.$t('modal.this-year'),
          value: 'YEAR',
        },
      ],
      dataImages: null,

    }
  },
  methods: {
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.dataModal.StationID,
        GeoCode: this.keyString,
      }
      systemAPI.getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : []
        })
        .catch((err) => console.log(err))
    },
    handleClick(){
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 10)
    },
    changeChartOption(item){
      this.selectChartOption=item
      this.getDataChart()
    },
    getDataChart(){
      let body={
        Type:this.selectChartOption.value,
        StationID: this.dataModal.StationID,
      }
      gasFoodCourtAPI.getDataChartByStation(body).then(val=>{
        this.dataChart=val.status ? val.data : []
      }).catch(err=>console.log(err))
    },
    statusEdit(items) {
      this.$emit('status-edit', items, 'FoodCourt')
    },
    getLogDetected(id) {
      let body = {
        StationID: id,
      }
      gasFoodCourtAPI.reportLogDetected(body)
        .then((val) => {
          this.logDetected = val.status ? val.data : null
          this.objectKeyDetected =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : []
        })
        .catch((err) => console.log(err))
    },
    convertDateTime(string) {
      return handling.convertDateTime(string)
    },
    convertDate(string) {
      return handling.convertDate(string)
    },
    getColumnDetected(string) {
      let body = {
        ObjectName: string,
      }
      systemAPI.tableFields(body)
        .then((val) => {
          this.listColumnShowDetected = val.status ? val.data : []
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getColumnDetectedMonitor(string) {
      let body = {
        ObjectName: string,
      }
      systemAPI.tableFields(body)
        .then((val) => {
          this.listColumnShowDetectedLeak = val.status ? val.data : []
        })
        .catch((err) => {
          console.log(err)
        })
    },
    gasDetectorLeak(id) {
      let body = {
        StationID: id,
      }
      gasFamilyAPI.gasDetectorLeak(body)
        .then((val) => {
          this.leakDetected = val.status ? val.data : null
          this.objectKeyDetectedLeak =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : []
        })
        .catch((err) => console.log(err))
    },
    timeLoadData(time) {
      this.getLogDetected(this.dataModal.StationID)
      this.gasDetectorLeak(this.dataModal.StationID)
      this.getDataChart()
      setTimeout(() => {
        this.timeLoadData(time)
      }, time)
    },
  },
  async created() {
    await this.timeLoadData(this.timer * 120)
    await this.getColumnDetected('LogDetected')
    await this.getColumnDetectedMonitor('GasDetectorMonitors')
    await this.getImages()

  },
  computed: {
    fieldDetected: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetected,
        this.listColumnShowDetected,
      )
    },
    fieldDetectedLeak: function () {
      return handling.mergeTableAndData(
        this.objectKeyDetectedLeak,
        this.listColumnShowDetectedLeak,
      )
    },
  },
}
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