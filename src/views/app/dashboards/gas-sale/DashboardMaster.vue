<template>
  <div>
    <div v-if="dataFollow && dataFollow.length>0"  class="mb-2">
        <b-dropdown
          id="dropdown-form"
          ref="dropdown"
          left
          variant="empty"
          toggle-class="p-0"
          no-caret
          class="pb-1"
        >
          <template slot="button-content">
            <span v-b-toggle.collapse-header>
              <i class="fad fa-cog" style="font-size: 18px;"></i>
            </span>
          </template>
          <b-dropdown-form>
            <b-form-input
              class="mt-1"
              id="search-input"
              type="search"
              size="sm"
              v-model="searchText"
              :placeholder="$t('panel.search-input-monitor')"
              style="min-width: 200px;"
            ></b-form-input>
            <template v-if="searchText && searchText !== ''">
              <template v-if="optionSearch(searchText).length > 0">
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t('panel.total') }}
                  {{ optionSearch(searchText).length }}
                  {{ $t('panel.result') }}
                </p>
              </template>
              <template v-else>
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t('panel.non-data') }}
                </p>
              </template>
            </template>
            <template v-else>
              <p class="mt-3 mb-0 text-muted font-italic text-small">
                {{ $t('panel.total') }} {{ dataFollow.length }}
                {{ $t('panel.result') }}
              </p>
            </template>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <vue-perfect-scrollbar
            class="list-item-station-option"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
          >
            <template v-if="searchText && searchText !== ''">
              <b-dropdown-item
                v-for="(station, index) in optionSearch(searchText)"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">
                  {{ station.StoreName }}
                </span>
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item
                v-for="(station, index) in dataFollow"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">
                  {{ station.StoreName }}
                </span>
              </b-dropdown-item>
            </template>
          </vue-perfect-scrollbar>
        </b-dropdown>
        <template v-if="selectedData">
          <span class="ml-2 h5 text-muted">
            <strong>{{ selectedData.StoreName }}</strong>
          </span>
        </template>
      </div>
  
  
  <b-row class="mb-2">
      <b-col>
        <b-row v-if="data && data.Orders[0]">
          <b-col lg="12" style="white-space: nowrap;">
            <h3><strong>THỐNG KÊ ĐƠN ĐẶT HÀNG</strong></h3>
          </b-col>
          <b-col lg="12">
            <b-card style="height: 410px;" class="p-2" no-body>
              <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-ballot mr-2"></i>
                  <h4><strong>
                    {{data.Orders[0].TotalOrdersNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Orders[0].TotalOrders}}
                  </h2>
              </div>
              <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-spinner-third mr-2"></i>
                  <h4><strong>
                    {{data.Orders[0].OrdersPendingNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Orders[0].OrdersPending}}
                  </h2>
              </div>
              <div class="cus-card-2 ">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fas fa-ban mr-2"></i>
                  <h4><strong>
                    {{data.Orders[0].OrdersCancelledNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Orders[0].OrdersCancelled}}
                  </h2>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row v-if="data && data.Sales[0]">
          <b-col lg="12" style="white-space: nowrap;">
            <h3><strong>THỐNG KÊ PHIẾU BÁN HÀNG</strong></h3>
          </b-col>
          <b-col lg="12">
            <b-card style="height: 410px;" class="p-2" no-body>
              <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-ballot mr-2"></i>
                  <h4><strong>
                    {{data.Sales[0].TotalSaleNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Sales[0].TotalSales}}
                  </h2>
              </div>
              <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-spinner-third mr-2"></i>
                  <h4><strong>
                    {{data.Sales[0].SalesPendingNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Sales[0].SalesPending}}
                  </h2>
              </div>
              <div class="cus-card-2 ">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fas fa-ban mr-2"></i>
                  <h4><strong>
                    {{data.Sales[0].SalesCancelledNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{data.Sales[0].SalesCancelled}}
                  </h2>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row v-if="data && data.Deliveries[0]">
          <b-col lg="12" style="white-space: nowrap;" >
            <h3><strong>THỐNG KÊ GIAO HÀNG</strong></h3>
          </b-col>
          <b-col lg="12">
            <b-card style="height: 410px;" class="p-2" no-body>
              <div class="cus-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-ballot mr-2"></i>
                  <h4><strong>
                    {{ data.Deliveries[0].TotalDeliverieNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                  <h2 class="text-right">
                    <strong>{{data.Deliveries[0].TotalDeliveries}}</strong>
                  </h2>
                </div>
              </div>
              <div class="cus-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-truck mr-2"></i>
                  <h4><strong>
                    {{ data.Deliveries[0].DeliveringNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                  <h2 class="text-right">
                    <strong>{{data.Deliveries[0].Delivering}}</strong>
                  </h2>
                </div>
              </div>
              <div class="cus-card mb-3">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-spinner-third mr-2"></i>
                  <h4><strong>
                    {{ data.Deliveries[0].DeliveriesPendingNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                  <h2 class="text-right">
                    <strong>{{data.Deliveries[0].DeliveriesPending}}</strong>
                  </h2>
                </div>
              </div>
              <div class="cus-card ">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fas fa-ban mr-2"></i>
                  <h4><strong>
                    {{ data.Deliveries[0].DeliveriesCancelled1.toUpperCase()}}
                    </strong></h4>
                  </div>
                  <h2 class="text-right">
                    <strong>{{data.Deliveries[0].DeliveriesCancelled}}</strong>
                  </h2>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row v-if="dataRevenues && dataRevenues.length > 0">
          <b-col lg="12" style="white-space: nowrap;" >
            <h3><strong>THỐNG KÊ DOANH THU</strong></h3>
          </b-col>
          <b-card  style="width:96%;height: 410px;" class="p-2" no-body>
            <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-usd-circle mr-2"></i>
                  <h4><strong>
                    {{dataRevenues[0].Today_AmntNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{convertFloat(dataRevenues[0].Today_Amnt)}}
                  </h2>
              </div>
              <div class="cus-card-2 mb-4">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-usd-circle mr-2"></i>
                  <h4><strong>
                    {{dataRevenues[0].SevenDaysAgo_AmntNote.toUpperCase() }}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{convertFloat(dataRevenues[0].SevenDaysAgo_Amnt)}}
                  </h2>
              </div>
              <div class="cus-card-2 ">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <i style="font-size:24px" class="fad fa-usd-circle mr-2"></i>
                  <h4><strong>
                    {{dataRevenues[0].ThirtyDaysAgo_AmntNote.toUpperCase()}}
                    </strong></h4>
                  </div>
                </div>
                  <h2 class="text-right">
                    {{convertFloat(dataRevenues[0].ThirtyDaysAgo_Amnt)}}
                  </h2>
              </div>
            </b-card>
          </b-card>
        </b-row>
      </b-col>
    </b-row>
  <b-row>
      <b-col lg="6" class="mb-2">
        <b-card style="height:300px;" no-body>
          <h4 class="p-2 pb-0 m-0"><strong>LỊCH SỬ</strong></h4>
          <b-table
          v-if="dataHistory"
            :responsive="true"
            :sticky-header="true"
            :no-border-collapse="true"
            :bordered="true"
            :hover="true"
            :items="dataHistory"
            :fields="fieldsHis"
            head-variant="light"
            class="text-center text-small mb-0"
          ></b-table>
          <template v-else>
              <b-col lg="12" class="mb-4">
                <p class="text-muted text-small font-italic">
                  {{ $t('map.no-data') }}
                </p>
              </b-col>
            </template>
        </b-card>
      </b-col>
      <b-col lg="6">
        <template v-if="dataWeather[0]">
          <weather :label="'HỒ CHÍ MINH CITY'" :date="dataWeather[0].Date" :typeIcon="dataWeather[0].Day.Icon" :valueCurrent="dataWeather[0].Temperature.Maximum.Value" :note="dataWeather[0].Day.IconPhrase" :valueLow="dataWeather[0].Temperature.Minimum.Value"
            :bgColor="['#73e9e8','#73b4ff']"
            />
      </template>
      <template v-else>
        <weather :label="'HỒ CHÍ MINH CITY'" :date="'2022/02/21'" :typeIcon="2" :valueCurrent="86" :note="'Nắng nhẹ'" :valueLow="79"
            :bgColor="['#73e9e8','#73b4ff']"
            />
      </template>
      </b-col>
  </b-row>
  <b-row>
      <b-col class="text-left mt-2 mb-2 ">
        <b-card class="pt-2" no-body style="border-radius:5px;">
      <h4 class="ml-2" ><strong>THỐNG KÊ BÁN HÀNG</strong></h4>
      </b-card>
      </b-col>
  </b-row>
  <b-row>
      <b-col lg="6" class="mb-2">
        <b-card style="height: 450px;" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">Số lượng</h5>
              </div>
            </div>
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelDateOrders"
                :data="dataChartOrders.items"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t('cards.no-data') }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6" class="mb-2">
        <b-card style="height: 450px;" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h5 class="d-inline">Doanh thu</h5>
              </div>
            </div>
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelDateOrders"
                :data="dataTotalAmntOrders"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t('cards.no-data') }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
  </b-row>
  <b-row>
      <b-col class="text-left mt-2 mb-2 ">
        <b-card class="pt-2" no-body style="border-radius:5px;">
      <h4 class="ml-2" ><strong>THỐNG KÊ ĐẶT HÀNG</strong></h4>
      </b-card>
      </b-col>
  </b-row>
  <b-row>
    <b-col lg="6" class="mb-2">
        <b-card style="height: 450px;" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h4 class="d-inline">Số lượng</h4>
              </div>
            </div>
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelDateContracts"
                :data="dataChartContracts.items"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t('cards.no-data') }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6" class="mb-2">
        <b-card style="height: 450px;" no-body>
          <b-card-body>
            <div class="float-left float-none-xs">
              <div class="d-inline-block">
                <h4 class="d-inline">Doanh thu</h4>
              </div>
            </div>
            <b-dropdown
              :text="selectChartOption.label"
              size="xs"
              variant="outline-secondary"
              class="float-right float-none-xs"
            >
              <b-dropdown-item
                v-for="(item, index) in optionChart"
                @click="changeChartOption(item)"
                :key="index"
              >
                {{ item.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-card-body>
          <div class="chart card-body pt-0">
            <template v-if="showChart">
              <multi-area-shadow-chart
                :labelDate="labelDateContracts"
                :data="dataTotalAmntContracts"
                :height="340"
              />
            </template>
            <template v-else>
              <p class="font-italic mt-4">{{ $t('cards.no-data') }}</p>
            </template>
          </div>
        </b-card>
      </b-col>
  </b-row>
  </div>
</template>

<script>
import { timer } from '@/constants/config'
import gasSalesAPI from '@/api/modules/gasSalesAPI'
import systemAPI from '@/api/modules/systemAPI'
import MultiAreaShadowChart from '@/components/Charts/MultiAreaShadow'
import handling from '@/constants/handling'
import { ThemeColors } from '@/utils'
import Card from '@/components/Cards/CardDoupleValue'
import Weather from '@/components/Other/Weather'

const colors = ThemeColors()

export default {
  components: {
    card: Card,
    'multi-area-shadow-chart': MultiAreaShadowChart,
    'weather':Weather
  },
  data() {
    return {
      apikey:'gHuEn9ghiy20CHSHAJ4ccgWcdU0XWkGS',
      city_key:353981,//hcm
      dataWeather:[],
      timer,
      menuRight: [],
      data: null,
      selectChartOption: {
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
      showChart: false,
      dataChartContracts: null,
      labelDateContracts: null,
      dataChartOrders: null,
      labelDateOrders: null,
      dataTotalAmntContracts: null,
      dataTotalAmntOrders: null,
      //
      dataRevenues: null,
      dataHistory:null,
      fieldsHis: [
        {
          key: 'StatusName',
          label: 'Trạng thái',
        },
        {
          key: 'OID',
          label: 'Lệnh',
        },
        {
          key: 'StationName',
          label: 'Khách hàng',
        },
        {
          key: 'UserFullName',
          label: 'Nhân viên',
        },
        {
          key: 'Statustime',
          label: 'Cập nhật',
          formatter: (value, key, item) => {
            return this.convertDateTime(value)
          },
        },
        
      ],
      dataFollow: null,
      selectedData: null,
      searchText: '',
      search: '',
    }
  },
  methods: {
    changeStation(station) {
      this.selectedData = station
      this.getData(this.selectedData)
      if (this.selectChartOption && this.selectedData) {
             this.getDataChart()
      }
    },
    optionSearch(text) {
      if (text && text !== '') {
        let array = []
        let regex = new RegExp(text, 'i')
        this.dataFollow.forEach((val) => {
          if (val.StoreName.search(regex) !== -1) {
            array.push(val)
          }
        })
        return array
      } else {
        return []
      }
    },
    getOption() {
      gasSalesAPI.getStoreList()
        .then((val) => {
          this.dataFollow = val.status ? val.data : []
          if (!this.selectedData) {
            this.selectedData = this.dataFollow[0]
          }
          this.getData(this.selectedData)
          if (this.selectChartOption && this.selectedData) {
             this.getDataChart()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    convertFloat(n) {
      return handling.convertFloat(n)
    },
    changeChartOption(item) {
      this.selectChartOption = item
      this.showChart = false
      this.labelDateContracts = []
      this.labelDateOrders = []
      this.dataChartContracts = []
      this.dataChartOrders = []
      this.dataTotalAmntContracts = null
      this.dataTotalAmntOrders = null
      this.getDataChart()
    },
    getDataChart() {
      let body = {
        StoreID:this.selectedData.StoreID,
        Type: this.selectChartOption.value,
      }
      gasSalesAPI.getChartByID(body)
        .then((val) => {
          if (val.data && val.data.Contracts) {
            let itemTotalAmtContracts = [
              {
                label: 'VNĐ',
                borderColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                pointHoverBackgroundColor: '#05CBE1',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
            ]
            this.dataTotalAmntContracts = itemTotalAmtContracts
            let items = [
              {
                label: 'Tổng (đơn)',
                borderColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                pointHoverBackgroundColor: '#05CBE1',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: 'Phê duyệt (đơn)',
                borderColor: '#ffcb80',
                pointBorderColor: '#ffcb80',
                pointHoverBackgroundColor: '#ffcb80',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#ffcb80',
                pointBorderColor: '#ffcb80',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: 'Huỷ (đơn)',
                borderColor: '#FC2525',
                pointBorderColor: '#FC0000',
                pointHoverBackgroundColor: '#FC0000',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#FC0000',
                pointBorderColor: '#FC0000',
                borderWidth: 2,
                backgroundColor: this.gradient,
                data: [],
              },
            ]
            this.dataChartContracts = this.convertDataChartMultiAreaShadow(
              val.data.Contracts,
              items,
              'Contracts',
            )
            this.labelDateContracts = this.dataChartContracts.labelDate
          }
          if (val.data && val.data.Orders) {
            let itemTotalAmtOrders = [
              {
                label: 'VNĐ',
                borderColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                pointHoverBackgroundColor: '#05CBE1',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
            ]
            this.dataTotalAmntOrders = itemTotalAmtOrders
            let items = [
              {
                label: 'Tổng (đơn)',
                borderColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                pointHoverBackgroundColor: '#05CBE1',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#05CBE1',
                pointBorderColor: '#05CBE1',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: 'Đơn giao (đơn)',
                borderColor: '#ffcb80',
                pointBorderColor: '#ffcb80',
                pointHoverBackgroundColor: '#ffcb80',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#ffcb80',
                pointBorderColor: '#ffcb80',
                borderWidth: 2,
                backgroundColor: this.gradient2,
                data: [],
              },
              {
                label: 'Huỷ (đơn)',
                borderColor: '#FC2525',
                pointBorderColor: '#FC0000',
                pointHoverBackgroundColor: '#FC0000',
                pointHoverBorderColor: 'black',
                pointBackgroundColor: '#FC0000',
                pointBorderColor: '#FC0000',
                borderWidth: 2,
                backgroundColor: this.gradient,
                data: [],
              },
            ]
            this.dataChartOrders = this.convertDataChartMultiAreaShadow(
              val.data.Orders,
              items,
              'Orders',
            )
            this.labelDateOrders = this.dataChartOrders.labelDate
          }
          setTimeout(() => {
            this.showChart = true
          }, 50)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    convertDataChartMultiAreaShadow(data, items, key) {
      //contructor
      let result = { items, labelDate: [] }
      //data-custom
      if (key.toUpperCase() === 'CONTRACTS') {
        data.forEach((item) => {
          result.labelDate.push(item.ItemHH.split('-')[1])
          for (const key in item) {
            if (key === 'ContractTotal') {
              result.items[0].data.push(item[key])
            }
            if (key === 'ContractApproval') {
              result.items[1].data.push(item[key])
            }
            if (key === 'ContractCancel') {
              result.items[2].data.push(item[key])
            }
            if (key === 'Total_Amnt') {
              this.dataTotalAmntContracts[0].data.push(item[key])
            }
          }
        })
      }
      if (key.toUpperCase() === 'ORDERS') {
        data.forEach((item) => {
          result.labelDate.push(item.ItemHH.split('-')[1])
          for (const key in item) {
            if (key === 'OrderTotal') {
              result.items[0].data.push(item[key])
            }
            if (key === 'OrderDelivery') {
              result.items[1].data.push(item[key])
            }
            if (key === 'OrderCancel') {
              result.items[2].data.push(item[key])
            }
            if (key === 'Total_Amnt') {
              this.dataTotalAmntOrders[0].data.push(item[key])
            }
          }
        })
      }
      return result
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      })
    },
    convertDateTime(string) {
      return handling.convertDateTime(string)
    },
    getData(item) {
      let body ={
        StoreID:item.StoreID
      }
      gasSalesAPI.getDashboard(body)
        .then((val) => {
          this.data = val.status ? val.data : []
          this.dataRevenues = this.data.Revenues ? this.data.Revenues : []
          this.dataHistory = this.data.Histories ? this.data.Histories : []
        })
        .catch((err) => {
          console.log(err)
        })
    },
   async getDataWeather(){
      let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + this.city_key;
      let param = '?language=vi&apikey=' + this.apikey;
      await fetch(url + param)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if(res.DailyForecasts){
            this.dataWeather = res.DailyForecasts;
          }
    })
    .catch(res => {
      console.log('Faild fetch data ',res);
    })
    },
    timerLoadDashboard(time) {
      this.getOption()
      
      setTimeout(() => {
        this.timerLoadDashboard(time)
      }, time)
    },
    getListMenuRight() {
       let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
systemAPI.getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : []
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  async created() {
    await this.getListMenuRight()
    await this.timerLoadDashboard(this.timer * 60)
  },
  mounted(){
    this.getDataWeather()
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite,
            ),
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.cus-card{
  color: white;
  height: 90px;
 background: linear-gradient(45deg, #73e9e8, #73b4ff);
  padding: 5% 10px ;
  border-radius: 5px;
}
.cus-card-2{
  width: 100%;
  color: white;
  height: 115px;
 background: linear-gradient(45deg, #73e9e8, #73b4ff);
  padding: 5% 10px ;
  border-radius: 5px;
}
</style>
