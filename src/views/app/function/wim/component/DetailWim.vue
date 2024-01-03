<template>
  <div class="detail-vim">
    <b-row>
      <b-col lg="9" class="p-0">
        <b-row>
          <b-col lg="4" class="pl-1 pr-1">
            <div class="box-img">
              <img v-img:group-1 :src="img0" />
              <span class="title">{{ $t('wim.overview-photo') }}</span>
            </div>
          </b-col>
          <b-col lg="4" class="pl-1 pr-1">
            <div class="box-img">
              <img v-img:group-1 :src="img1" />
              <span class="title">{{ $t('wim.forward-photo') }}</span>
            </div>
          </b-col>
          <b-col lg="4" class="pl-1 pr-3 mb-2">
            <div class="box-img">
              <img v-img:group-1 :src="img2" />
              <span class="title">{{ $t('wim.backward-photo') }}</span>
            </div>
          </b-col>
          <b-col lg="6" class="pl-1 pr-1">
            <div class="bg-content p-4">
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.turn') }}</strong>
                </div>
                <div>
                  <b>{{ CodeID }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.time-enter') }}</strong>
                </div>
                <div>
                  <b>{{ convertDateTime(inputDate) }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.time-leave') }}</strong>
                </div>
                <div>
                  <b>{{ convertDateTime(outputDate) }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.classification') }}</strong>
                </div>
                <div>
                  <b>{{ vehicleType }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.lane') }}</strong>
                </div>
                <div>
                  <b>{{ lane }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.speed') }}</strong>
                </div>
                <div>
                  <b>{{ speed }} km/h</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.headway') }}</strong>
                </div>
                <div>
                  <b>{{ vehicleDirection }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.alex') }}</strong>
                </div>
                <div>
                  <b>{{ totalAlex }}</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ $t('wim.total-weight') }}</strong>
                </div>
                <div>
                  <b>{{ weight }} kg</b>
                </div>
              </div>
              <div class="separator mb-4"></div>
            </div>
          </b-col>
          <b-col lg="6" class="p-1 pr-3">
            <div class="d-flex">
              <div style="width: 100%" class="pr-1">
                <div class="bg-content box">
                  <div class="p-2">
                    <strong style="white-space: nowrap"
                      >{{ $t('wim.front-licenseplate') }}
                      <span style="color: gray">{{
                        licenseplate1
                      }}</span></strong
                    >
                  </div>
                  <div class="p-2" style="height: 120px">
                    <img
                      v-img
                      :src="img1Licenseplate"
                      style="width: 100%; height: 100%; background: gray"
                    />
                  </div>
                </div>
              </div>
              <div style="width: 100%" class="pl-1">
                <div class="bg-content box">
                  <div class="p-2">
                    <strong style="white-space: nowrap"
                      >{{ $t('wim.behind-licenseplate') }}
                      <span style="color: gray">{{ licenseplate2 }}</span>
                    </strong>
                  </div>
                  <div class="p-2" style="height: 120px">
                    <img
                      v-img
                      :src="img2Licenseplate"
                      style="width: 100%; height: 100%; background: gray"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="process-bar mt-5 mb-4">
              <div>
                <strong>{{ $t('wim.alex-overload') }} (%)</strong>
                <b-progress
                  height="20px"
                  :value="percentOver"
                  show-value
                ></b-progress>
              </div>
              <div class="mt-4">
                <strong>{{ $t('wim.roads-overload') }} (%) </strong>
                <b-progress
                  height="20px"
                  :value="percentOverBridge"
                  show-value
                ></b-progress>
              </div>
              <div class="mt-4">
                <strong>{{ $t('wim.design-overload') }} (%)</strong>
                <b-progress
                  height="20px"
                  :value="percentOverDesign"
                  show-value
                ></b-progress>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="3" class="pb-2 pl-2 pr-1">
        <div class="header-right d-flex">
          <div class="warning p-2">
            <div>{{ $t('wim.overload') }}</div>
            <div style="color: red">{{ percentOver }}%</div>
          </div>
          <div v-if="isNew == 1" class="btn-create">
            <b-button @click="showModal" size="sm">
              <i class="fas fa-plus-circle"></i>
              {{ $t('wim.create-balance') }}
            </b-button>
          </div>
          <div v-else class="btn-view">
            <b-button @click="showModal" size="sm">
              <i class="far fa-eye"></i>
              {{ $t('wim.watch-balance') }}
            </b-button>
          </div>
        </div>
        <div class="info-right bg-content mt-2 p-2">
          <div style="font-size: 15px">
            <strong>{{ $t('wim.info-alex') }}</strong>
          </div>
          <!--  -->
          <template v-if="axles && axles.length > 0">
            <template v-for="(item, i) in axles">
              <div :key="i" class="item">
                <div class="item-stt">
                  <strong>{{ item.AlexName }}</strong>
                </div>
                <div
                  class="item-info d-flex justify-content-between"
                  :class="i == axles.length - 1 ? 'mt-2 pb-3' : null"
                >
                  <div class="label">
                    <div>{{ $t('wim.weight') }}</div>
                    <div v-if="i != axles.length - 1">
                      {{ $t('wim.gap-axis') }} {{ item.DistanceName }}
                    </div>
                  </div>
                  <div class="value">
                    <div class="text-right">{{ item.AlexWeight }}</div>

                    <div class="text-right" v-if="i != axles.length - 1">
                      {{ item.AlexDistance }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="text-center text-muted p-3 bg-light">
              {{ $t('panel.non-data') }}
            </div>
          </template>
          <!--  -->
        </div>
      </b-col>
    </b-row>
    <b-modal
      :id="`modal-printe-vim-form`"
      centered
      hide-header
      hide-footer
      ok-only
      size="xl"
      @hide="resetModal"
    >
      <printe-vim-form
        v-if="dataSheet"
        :dataForm="dataSheet"
        :p-reference-id="dataSheet.ReferenceID"
        :p-axle-datas="dataSheet.AxleDatas"
        :p-behind-img-licenseplate="dataSheet.Behind_Imglicenseplate"
        :p-front-img-licenseplate="dataSheet.Front_Imglicenseplate"
        :p-time-in="convertTime(dataSheet.InputDate)"
        :p-date-time="convertDate(dataSheet.InputDate)"
        :p-lane="dataSheet.Lane"
        :p-licenseplate="dataSheet.Licenseplate"
        :p-trailer-licenseplate="dataSheet.TrailerLicenseplate"
        :p-total-alex="dataSheet.Total_Alex"
        :p-vehicle-owner-name="dataSheet.Vehicle_OwnerName"
        :p-vehicle-speed="dataSheet.Vehicle_Speed"
        :p-vehicle-type="dataSheet.Vehicle_Type"
        :p-wim-percent-overload="dataSheet.Wim_Percent_Overload"
        :p-length="dataSheet.Wim_Length"
        :p-height="dataSheet.Wim_Height"
        :p-weight="dataSheet.Wim_Weight"
        :p-width="dataSheet.Wim_Width"
        :p-wim-weight-overload="dataSheet.Wim_Weight_Overload"
        :isEdit="isEdit"
        :isNew="isNew"
        @reload-data="reloadParentData"
        :p-driving-license="dataSheet.DrivingLicense"
        :p-goods-percent-overload="dataSheet.Goods_Percent_Overload"
        :p-goods-weight-overload="dataSheet.Goods_Weight_Overload"
        :p-goods-weight="dataSheet.Goods_weight"
        :p-code-id="dataSheet.CodeID"
        :p-trailer-drag-weight-allow="dataSheet.Trailer_Drag_Weight_Allow"
        :p-trailer-height="dataSheet.Trailer_Height"
        :p-trailer-length="dataSheet.Trailer_Length"
        :p-trailer-weight="dataSheet.Trailer_Weight"
        :p-trailer-wheel-base="dataSheet.Trailer_Wheel_Base"
        :p-trailer-width="dataSheet.Trailer_Width"
        :p-vehicle-circulation-license="dataSheet.VehicleCirculationLicense"
        :p-vehicle-color="dataSheet.Vehicle_Color"
        :p-vehicle-drag-height="dataSheet.Vehicle_Drag_Height"
        :p-vehicle-drag-length="dataSheet.Vehicle_Drag_Length"
        :p-vehicle-drag-weight-allow="dataSheet.Vehicle_Drag_Weight_Allow"
        :p-vehicle-drag-width="dataSheet.Vehicle_Drag_Width"
        :p-vehicle-driver-name="dataSheet.Vehicle_DriverName"
        :p-vehicle-height="dataSheet.Vehicle_Height"
        :p-vehicle-is-tank-truck="dataSheet.Vehicle_Is_Tank_Truck"
        :p-vehicle-length="dataSheet.Vehicle_Length"
        :p-vehicle-people-allow="dataSheet.Vehicle_People_Allow"
        :p-vehicle-weight="dataSheet.Vehicle_Weight"
        :p-vehicle-wheel-base="dataSheet.Vehicle_Wheel_Base"
        :p-vehicle-width="dataSheet.Vehicle_Width"
        :p-wim-creator="dataSheet.Wim_Creator"
        :p-wim-drag-height="dataSheet.Wim_Drag_Height"
        :p-wim-drag-length="dataSheet.Wim_Drag_Length"
        :p-wim-drag-width="dataSheet.Wim_Drag_Width"
        :p-bridge-percent-overload="dataSheet.Bridge_Percent_Overload"
        :p-note="this.dataSheet.Note"
      ></printe-vim-form>
    </b-modal>
  </div>
</template>

<script>
import handling from '@/constants/handling'
import wimAPI from '@/api/modules/wimAPI'
// import { wimReportByID } from '@/api/modules/wimAPI'
import PrinteWimForm from '@/views/app/function/wim/component/PrinteWimForm'

export default {
  name: 'detail-vim',
  components: {
    'printe-vim-form': PrinteWimForm,
  },
  props: [
    'dataModal',
    'img0',
    'img1',
    'img1Licenseplate',
    'licenseplate1',
    'licenseplate2',
    'img2Licenseplate',
    'img2',
    'percentOver',
    'percentOverBridge',
    'percentOverDesign',
    'CodeID',
    'ID',
    'inputDate',
    'outputDate',
    'vehicleType',
    'lane',
    'vehicleDirection',
    'totalAlex',
    ' width',
    'height',
    'weight',
    'length',
    'speed',
    'axles',
    'isNew',
    'isEdit',
  ],
  data() {
    return {
      dataSheet: null,
    }
  },
  methods: {
    reloadParentData(val, ID) {
      this.$emit('reload-data', val, ID)
    },
    resetModal() {
      this.dataSheet = null
    },
    getDataByID(ID) {
      let body = {
        ID,
      }
      wimAPI.wimReportByID(body)
        .then((val) => {
          this.dataSheet = val.status ? val.data : []
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showModal() {
      this.getDataByID(this.ID)
      setTimeout(() => {
        if (this.dataSheet === null) {
          this.makeToast(
            'danger',
            this.$t('toast.fail').toUpperCase(),
            this.$t('panel.non-data'),
          )
        } else {
          this.$bvModal.show('modal-printe-vim-form')
        }
      }, 500)
    },
    convertDateTime(string) {
      return handling.convertDateTime(string)
    },
    convertTime(string) {
      return handling.convertTime(string)
    },
    convertDate(string) {
      return handling.convertDate(string)
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      })
    },
  },
}
</script>
<style>
.btn-create,
.btn-view {
  width: 100%;
}
.btn-view button {
  width: 100%;
  background: #004085;
  padding: 9px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}
.btn-view button:hover {
  background: #0460c3;
}

.btn-create button {
  width: 100%;
  background: #008514;
  padding: 9px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}
.btn-create button:hover {
  background: #04a91d;
}
</style>
<style lang="scss" scoped>
.box-img {
  background: gray;
  height: 200px;
}
.box-img img {
  width: 100%;
  height: 100%;
}
.bg-content {
  background: #f7f7f7;
}
.bg-content b {
  color: #0067a0;
}
.box {
  height: 180px;
}
.warning {
  width: 100%;
  border-radius: 20px;
  font-weight: 700;
  font-size: 14px;
  background: linear-gradient(to right, #ff0000, rgba(182, 45, 45, 0.1));
  display: flex;
  justify-content: space-between;
}
.info-right {
  height: 600px;
  overflow: auto;
}

.item {
  margin: 5px 0px;
  padding: 10px 0px;
  background: #fff;
  font-weight: 700;
}
.item-stt {
  width: 50px;
  padding: 0px 3px;
  float: left;
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 13.5px;
  border-right: 1px solid #d7d7d7;
  margin-right: 3px;
}
.item-info {
  padding: 0px 3px;
}
.label {
  white-space: nowrap;
  color: gray;
}
.value {
  color: #0067a0;
  white-space: nowrap;
}
.box-img {
  position: relative;
}
.title {
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid gray;
  background: #000;
  padding: 3px 5px;
  font-weight: 600;
  color: #fff;
}
</style>
<style>
.progress-bar {
  color: #000;
  font-weight: 680;
  background: #eb6161;
}
</style>
<style scoped>
::-webkit-scrollbar {
  width: 2px;
  border-radius: 5px;
  height: 7px;
}

::-webkit-scrollbar-track {
  background: inherit;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #d7d7d7;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>
<style>
.modal-body {
  margin: 5px;
}
</style>

<style lang="scss">
$desktop: 1280px; // xl
$laptop: 1024px; // lg
$tablet: 768px; // md
$mobile: 600px; // sm
@mixin MediaQuery($type) {
  @media screen and (max-width: $type) {
    @content;
  }
}
.pr-3 {
  @include MediaQuery(991px) {
    padding-right: 3px !important;
  }
  @include MediaQuery($mobile) {
    padding-right: 3px !important;
  }
}
.header-right {
  @include MediaQuery($laptop) {
    flex-wrap: wrap-reverse;
  }
}
.item-info {
  @include MediaQuery($laptop) {
    overflow: auto;
  }
}
</style>
