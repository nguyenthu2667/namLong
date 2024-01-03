<template>
  <div class="form-led-stations">
    <b-row>
      <b-col lg="9">
        <div class="frame-form-led">
          <b-form-group
            label="Tên chương trình"
            invalid-feedback="Không được bỏ trống"
            :state="checkIsValid('OName')"
          >
            <b-form-input v-model="formValues.OName" />
          </b-form-group>
        </div>
      </b-col>
      <b-col lg="3" v-if="createOrEdit == 'edit'">
        <div class="frame-form-led">
          <b-form-group label="Mã chương trình">
            <b-form-input
              disabled
              v-model="formValues.OID"
              class="text-center"
            />
          </b-form-group>
        </div>
      </b-col>
      <b-col lg="3" v-else>
        <div class="frame-form-led">
          <b-form-group label="Mã chương trình">
            <b-form-input disabled value="AUTO" class="text-center" />
          </b-form-group>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6">
        <h6 class="small-title-led">Thông tin nguồn phát</h6>
        <div>
          <div>
            <b-form-group>
              <div class="d-flex align-items-center">
                <label class="mb-0">Phát sóng:</label>
                <b-form-radio
                  v-model="formValues.FileType"
                  value="VIDEO"
                  class="ml-2"
                >
                  Video
                </b-form-radio>
                <b-form-radio
                  v-model="formValues.FileType"
                  value="IMAGE"
                  class="ml-3"
                >
                  Hình ảnh
                </b-form-radio>
                <b-form-radio
                  v-model="formValues.FileType"
                  value="TEXT"
                  class="ml-3"
                >
                  Văn bản
                </b-form-radio>
              </div>
            </b-form-group>
          </div>
          <div class="mt-1">
            <div v-if="formValues.FileType.toUpperCase() == 'TEXT'">
              <b-form-group
                invalid-feedback="Không được bỏ trống"
                :state="checkIsValid('SourceText')"
                label=""
              >
                <b-textarea
                  v-model="formValues.SourceText"
                  rows="3"
                  max-rows="6"
                  style="height: 238px"
                  placeholder="Nhập văn bản phát sóng..."
                />
              </b-form-group>
            </div>
            <template v-else-if="formValues.FileType.toUpperCase() == 'IMAGE'">
              <div>
                <b-form-group
                  invalid-feedback="Không được bỏ trống"
                  :state="checkIsHasFile()"
                  label="Chọn file hình ảnh"
                >
                  <b-form-file v-model="file" accept="image/*" />
                </b-form-group>
              </div>
              <div class="show-image-video-2" v-if="base64String">
                <div class="show-image-video-2-2">
                  <b-img :src="base64String"></b-img>
                </div>
              </div>
              <div class="show-image-video-2" v-else-if="urlFile">
                <div class="show-image-video-2-2">
                  <b-img :src="urlFile"></b-img>
                </div>
              </div>
            </template>
            <template v-else-if="formValues.FileType.toUpperCase() == 'VIDEO'">
              <div>
                <b-form-group
                  invalid-feedback="Không được bỏ trống"
                  :state="checkIsHasFile()"
                  label="Chọn file video"
                >
                  <b-form-file
                    v-model="file"
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </b-form-group>
                <div class="loading-video">
                  <b-spinner v-if="showLoadingVideo" variant="primary" />
                </div>
                <div v-if="base64String && !showLoadingVideo">
                  <video
                    width="100%"
                    height="220"
                    controls
                    :src="base64String"
                  ></video>
                </div>
                <div v-else-if="this.urlFile && !showLoadingVideo">
                  <video width="100%" height="220" controls>
                    <source :src="this.urlFile" type="video/mp4" />
                  </video>
                </div>
              </div>
            </template>
          </div>
        </div>
      </b-col>
      <b-col lg="6">
        <div>
          <h6 class="small-title-led">Thông tin lịch phát</h6>
          <div class="d-flex frame-form-led">
            <b-col lg="6" class="pl-0 padding-right-10">
              <div class="frame-form-datepicker">
                <b-form-group
                  label="Từ ngày"
                  invalid-feedback="Không được bỏ trống"
                  :state="checkIsValid('StartDate')"
                >
                  <b-form-datepicker
                    v-model="formValues.StartDate"
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
            </b-col>
            <b-col lg="6" class="pr-0 padding-left-10">
              <div class="frame-form-datepicker">
                <b-form-group
                  label="Đến ngày"
                  invalid-feedback="Không được bỏ trống"
                  :state="checkIsValid('EndDate')"
                >
                  <b-form-datepicker
                    v-model="formValues.EndDate"
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
            </b-col>
          </div>
          <div class="w-100 frame-form-led">
            <div class="d-flex align-items-center">
              <div class="mr-2">Tùy chọn ngày trong tuần:</div>
              <div class="d-flex">
                <div class="frame-choose-all-week" @click="chooseAllWeek">
                  <b-form-checkbox :checked="isChooseAllWeek">
                    Tất cả ngày
                  </b-form-checkbox>
                </div>
              </div>
            </div>
            <div class="choose-day">
              <b-form-group
                invalid-feedback="Chưa chọn ngày trong tuần"
                :state="isCheckIsValid && selectedDay.length === 0 ? false : true"
              >
                <b-form-checkbox-group
                  v-model="selectedDay"
                  :options="dayOptions"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>
          </div>
          <div class="frame-is-all-time">
            <b-form-group>
              <div class="d-flex align-items-center">
                <label class="mb-0">Tùy chọn thời gian phát:</label>
                <b-form-radio
                  v-model="formValues.IsAllTime"
                  :value="true"
                  class="ml-2"
                >
                  24/24
                </b-form-radio>
                <b-form-radio
                  v-model="formValues.IsAllTime"
                  :value="false"
                  class="ml-3"
                >
                  Trong khoảng
                </b-form-radio>
              </div>
            </b-form-group>
            <div class="d-flex">
              <b-col lg="6" class="pl-0 padding-right-10">
                <div class="frame-form-timepicker">
                  <b-form-group
                    label="Thời gian từ"
                    invalid-feedback="Không được bỏ trống"
                    :state="checkIsValid('StartTime')"
                  >
                    <b-form-timepicker
                      v-model="formValues.StartTime"
                      locale="vn"
                      :disabled="formValues.IsAllTime"
                      class="text-center"
                    />
                  </b-form-group>
                </div>
              </b-col>
              <b-col lg="6" class="pr-0 padding-left-10">
                <div class="frame-form-timepicker">
                  <b-form-group
                    label="Thời gian đến"
                    invalid-feedback="Không được bỏ trống"
                    :state="checkIsValid('EndTime')"
                  >
                    <b-form-timepicker
                      v-model="formValues.EndTime"
                      locale="vn"
                      :disabled="formValues.IsAllTime"
                      class="text-center"
                    />
                  </b-form-group>
                </div>
              </b-col>
            </div>
            <b-row
              class="d-flex align-items-center"
              style="white-space: nowrap"
            >
              <b-col lg="6" class="frame-is-loop-time padding-right-10" style="margin-top: 10px">
                <div class="d-flex align-items-center">
                  <b-form-checkbox v-model="isRepeatSlideShow">
                    Phát lặp lại(lần)
                  </b-form-checkbox>
                  <b-form-group
                    label=""
                    invalid-feedback="Không được bỏ trống"
                    :state="checkIsValid('IsLoopTime')"
                  >
                    <b-form-input
                      v-model="formValues.IsLoopTime"
                      :disabled="isRepeatSlideShow ? false : true"
                      class="text-center ml-1"
                      type="number"
                      style="max-width: 100px"
                    />
                  </b-form-group>
                </div>
              </b-col>
              <b-col lg="6" class="frame-run-time padding-left-10" style="margin-top: 10px">
                <div style="margin-top: 3px; margin-right: 3px">
                  Trình chiếu(s)
                </div>
                <b-form-group
                  label=""
                  invalid-feedback="Không được bỏ trống"
                  :state="checkIsValid('RunTime')"
                >
                  <b-form-input
                    v-model="formValues.RunTime"
                    :disabled="formValues.FileType.toUpperCase() === 'IMAGE' ? false : true"
                    class="text-center"
                    type="number"
                    style="max-width: 100px"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div v-if="formValues.FileType.toUpperCase() !== 'TEXT'">
            <label>Ghi chú</label>
            <b-form-textarea
              v-model="formValues.Note"
              placeholder="Nhập ghi chú..."
              rows="2"
              max-rows="6"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="mt-3" v-if="formValues.FileType.toUpperCase() == 'TEXT'">
      <label>Ghi chú</label>
      <b-form-textarea
        v-model="formValues.Note"
        placeholder="Nhập ghi chú..."
        rows="2"
        max-rows="6"
      />
    </div>
    <b-row>
      <b-col lg="12" class="d-flex justify-content-left algin-items-center mb-2 mt-3">
        <h6 class="small-title-led mr-2">Thông tin thiết bị</h6>
        <b-button variant="success" size="sm" @click="showLedModal">
          Chọn thiết bị
        </b-button>
      </b-col>
      <b-col lg="12">
        <led-dynamic-table
          :data-table="selectedLedStation"
          :field-table="newFieldsStationSelect"
          textNoData="Chưa có thiết bị"
          :bordered="true"
          @removeLedStation="removeLedStation"
        ></led-dynamic-table>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-end btn-group-led mt-2">
      <b-button variant="secondary" size="sm" @click="cancelForm">
        Đóng
      </b-button>
      <b-button
        variant="danger"
        class="ml-2"
        size="sm"
        @click="deleteModal(dataByID)"
        v-if="createOrEdit == 'edit'"
      >
        Xóa bỏ
      </b-button>
      <b-button variant="primary" class="ml-2" size="sm" @click="submitData">
        <b-spinner v-if="showLoadingSubmit" variant="light" small />
        Lưu
      </b-button>
    </div>
    <b-modal
      id="led-station-modal"
      size="lg"
      scrollable
      hide-header
      hide-footer
    >
      <form-led-station-list
        @cancelForm="cancelAddLedStations"
        @addLedStations="addLedStations"
        :ledStationList="ledStationsList"
        :selectedLedStation="selectedLedStation"
        :fieldsStationSelect="fieldsStationSelect"
      />
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import FormLedStationList from './FormLedStationList'
import LedDynamicTable from './LedDynamicTable'

export default {
  props: [
    'createOrEdit',
    'ledStationsList',
    'dataByID',
    'fieldsStationSelect',
    'showLoadingSubmit',
  ],
  components: {
    'form-led-station-list': FormLedStationList,
    'led-dynamic-table': LedDynamicTable,
  },
  data() {
    return {
      isCheckIsValid: false,
      notRequired: ['OID', 'Note', 'Details'],
      formValues: {
        OID: null,
        OName: null,
        FileType: 'VIDEO', //TEXT/IMAGE/VIDEO, chọn TEXT -> SourceFile: null, chọn IMAGE/VIDEO -> SourceText: null
        SourceFile: null,
        SourceText: null,
        IsLoopTime: 0, //số lần phát lặp lại, không còn là true false nữa
        // IsLoopTime: false, //0: false, 1: true
        T2: false, //bắt buộc chọn 1 thứ
        T3: false,
        T4: false,
        T5: false,
        T6: false,
        T7: false,
        CN: false,
        StartDate: null, //example: 2022/10/12
        EndDate: null,
        IsAllTime: true, //0: false, 1: true
        StartTime: null, //example: 00:00, default 08:00
        EndTime: null, //default 22:00
        Note: null,
        Details: null, //example: 2201|2202
        RunTime: 0, //thời gian trình chiếu hình ảnh
      },
      dayOptions: [
        {
          text: 'T2',
          value: 'T2',
        },
        {
          text: 'T3',
          value: 'T3',
        },
        {
          text: 'T4',
          value: 'T4',
        },
        {
          text: 'T5',
          value: 'T5',
        },
        {
          text: 'T6',
          value: 'T6',
        },
        {
          text: 'T7',
          value: 'T7',
        },
        {
          text: 'CN',
          value: 'CN',
        },
      ],
      selectedDay: [],
      file: null,
      base64String: null,
      ledStationsFields: [
        { key: 'StationName', label: 'Tên' },
        { key: 'StationAddress', label: 'Địa chỉ' },
        { key: 'Remove', label: 'Xóa' },
      ],
      // ledStationList: [],
      selectedLedStation: [],
      tailImage: ['png', 'jpeg', 'gif', 'jpg', 'svg', 'gif', 'jfif'],
      urlFile: null,
      isSelectImage: false,
      // selectedFileType: 'VIDEO',
      showLoadingVideo: false,
      isRepeatSlideShow: false,
    }
  },
  computed: {
    isChooseAllWeek() {
      return this.selectedDay.length === this.dayOptions.length ? true : false
    },
    newFieldsStationSelect() {
      if (this.fieldsStationSelect) {
        const arr = [...this.fieldsStationSelect]
        arr.forEach((item) => {
          item.tdClass = 'text-left pt-3'
        })
        const newObj = {
          key: 'Delete',
          label: 'Xóa',
          tdClass: 'text-center',
          thClass: 'text-center',
          typeCol: 'Delete',
          // sortNum: 0
          // sortable: false
        }
        return [...arr, newObj]
      }
      return []
    },
  },
  methods: {
    checkIsValid(key) {
      if (this.isCheckIsValid) {
        //có bắt đầu kiểm có giá trị
        if (!this.notRequired.includes(key)) {
          if (key == 'SourceFile' && this.formValues.FileType.toUpperCase() == 'TEXT') {
            return true
          }
          if(key == 'SourceText' && this.formValues.FileType.toUpperCase() != 'TEXT') {
            return true
          }
          if((key == 'StartTime' || key == 'EndTime') && this.formValues.IsAllTime) {
            return true
          }
          if(key == 'RunTime' && this.formValues.FileType.toUpperCase() != 'IMAGE') {
            return true
          }

          const value = this.formValues[key]
          // console.log(value);
          if (value || value === 0 || value === false) {
            // console.log(key);
            return true
          } else {
            return false
          }
        }
        return true
      }
      return true
    },
    cancelForm() {
      this.$emit('cancelForm')
    },
    checkFormValidate() {
      let result = true
      for (const key in this.formValues) {
        // console.log(key);
        result = this.checkIsValid(key)
        // console.log(result);
        if (!result) {
          console.log('invaildKey:', key)
          break
        }
      }
      return result
    },
    submitData() {
      if (this.selectedLedStation.length == 0) {
        return this.makeToast(
          'danger',
          this.$t('toast.fail').toUpperCase(),
          'Chưa chọn thiết bị',
        )
      }
      this.isCheckIsValid = true

      if (this.selectedDay.length === 0) {
        return 
        // return this.makeToast(
        //   'danger',
        //   this.$t('toast.fail').toUpperCase(),
        //   'Chưa chọn ngày trong tuần',
        // )
      }

      if (this.checkFormValidate()) {
        const newObj = { ...this.formValues }
        for (const key in newObj) {
          if (newObj[key] === true) {
            newObj[key] = 1
          } else if (newObj[key] === false) {
            newObj[key] = 0
          } else if (key == 'StartDate' || key == 'EndDate') {
            if (newObj[key]) {
              newObj[key] = moment(newObj[key]).format('YYYY/MM/DD')
            } else {
              newObj[key] = ''
            }
          } else if (newObj[key] === null) {
            newObj[key] = ''
          }
        }
        // console.log(newObj)
        this.$emit('submitData', newObj)
      }
    },
    deleteModal(item) {
      this.$bvModal
        .msgBoxConfirm(this.$t('form.question') + item.OName + '?', {
          title: this.$t('form.warning').toUpperCase(),
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: this.$t('form.yes'),
          cancelTitle: this.$t('form.no'),
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.$emit('deleteData', item.OID)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    chooseAllWeek() {
      if (this.selectedDay.length !== this.dayOptions.length) {
        this.selectedDay = this.dayOptions.map((item) => item.value)
      } else {
        this.selectedDay = []
      }
    },
    generateBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = (error) => reject(error)
      })
    },
    async getBase64String(file) {
      // if (this.selectedFileType == 'VIDEO') {
      //   this.showLoadingVideo = true
      // } else {
      //   this.showLoadingVideo = false
      // }

      const base64 = await this.generateBase64(file)
      this.showLoadingVideo = false
      if (base64.includes('image') || base64.includes('video')) {
        this.base64String = base64
        // console.log('this.base64String', this.base64String)
      } else {
        this.file = null
        this.makeToast(
          'danger',
          this.$t('toast.fail').toUpperCase(),
          'Chọn file hình ảnh hoặc video',
        )
      }
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 2000,
      })
    },
    showLedModal() {
      this.$bvModal.show('led-station-modal')
    },
    cancelAddLedStations() {
      this.$bvModal.hide('led-station-modal')
    },
    addLedStations(value) {
      console.log(value)
      const arr = []
      console.log(this.ledStationsList)
      this.ledStationsList.forEach((item) => {
        if (value.includes(item.StationID)) {
          arr.push(item)
        }
      })
      this.selectedLedStation = arr
      this.$bvModal.hide('led-station-modal')
    },
    removeLedStation(value) {
      this.selectedLedStation = this.selectedLedStation.filter(
        (item) => item.StationID != value,
      )
    },
    checkTailImage(url) {
      if (url) {
        const index = url.lastIndexOf('.')
        const tail = url.slice(index + 1)
        // console.log(tail);
        return this.tailImage.includes(tail) ? true : false
      }
      return null
    },
    checkIsHasFile() {
      if(this.isCheckIsValid) {
        return this.formValues.SourceFile ? true : false
      }
      return true
    },
    convertDate(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD')
      }
    },
  },
  watch: {
    file(to) {
      // console.log(to)
      if (to) {
        this.base64String = null
        this.getBase64String(to)
        this.formValues.SourceFile = to

        if (this.formValues.FileType.toUpperCase() == 'VIDEO') {
          this.showLoadingVideo = true
        } else {
          this.showLoadingVideo = false
        }
      }
    },
    'formValues.FileType'(to) {
      this.file = null
      this.base64String = null
      this.showLoadingVideo = false

      if (to === 'TEXT') {
        this.file = null
        this.formValues.SourceFile = null
      } else if (to === 'IMAGE' || to === 'VIDEO') {
        this.formValues.SourceText = null
      }

      if (this.createOrEdit == 'edit') {
        if(to == 'IMAGE' || to == 'VIDEO') {
          if(to.toUpperCase() == this.dataByID.FileType.toUpperCase()) {
            this.urlFile = this.dataByID.Source
          }
          else {
            this.urlFile = null
          }
        }
        else if(to == 'TEXT') {
          if(to.toUpperCase() == this.dataByID.FileType.toUpperCase()) {
            this.formValues.SourceText = this.dataByID.Source
          }
        }
      }

      if (to == 'IMAGE') {
        this.formValues.RunTime = 60
      } else {
        this.formValues.RunTime = 0
      }
    },
    // 'formValues.IsLoopTime'(to) {
    //   if (!to) {
    //     this.selectedDay = []
    //     this.formValues.StartDate = this.convertDate(new Date())
    //     this.formValues.EndDate = this.convertDate(new Date())
    //   } else {
    //     this.formValues.StartDate = null
    //     this.formValues.EndDate = null
    //   }
    // },
    'formValues.IsAllTime'(to) {
      if (to) {
        this.formValues.StartTime = null
        this.formValues.EndTime = null
      } else {
        this.formValues.StartTime = '08:00:00'
        this.formValues.EndTime = '22:00:00'
      }
    },
    selectedDay(to) {
      this.dayOptions.forEach((item) => {
        if (to.includes(item.value)) {
          this.formValues[item.value] = true
        } else {
          this.formValues[item.value] = false
        }
      })
    },
    selectedLedStation(to) {
      // console.log(to);
      const newArr = to.map((item) => item.StationID)
      this.formValues.Details = newArr.join('|')
    },
    isRepeatSlideShow(to) {
      if (!to) {
        this.formValues.IsLoopTime = 0
      } 
    },
  },
  created() {
    if (this.dataByID) {
      const newObj = { ...this.dataByID }
      const newDayOptions = this.dayOptions.map(item => item.value)
      for(const key in newObj) {
        if(newDayOptions.includes(key)) {
          //set các thứ được chọn
          if(newObj[key] == 1) {
            this.selectedDay.push(key)
          }
        }
        else if(key == 'IsAllTime') {
          newObj[key] = newObj[key] == 1 ? true : false
        }
        else if(key == 'FileType') {
          newObj[key] = newObj[key].toUpperCase()
        }
        else if(key == 'Source') {
          switch (newObj.FileType.toUpperCase()) {
            case 'TEXT':
              newObj.SourceText = newObj[key]
              break;
            case 'IMAGE':
            case 'VIDEO':
              newObj.SourceFile = newObj[key]
              this.urlFile = newObj[key]
              break;
          
            default:
              break;
          }
        }
        else if(key == 'Details') {
          const arr = []
          newObj[key].forEach(item => {
            arr.push({
              ...item,
              StationName: item.StationName || item.DeviceName,
              StationAddress: item.StationAddress || item.DeviceAddress,
              ConnectTypeName: item.ConnectTypeName || item.ConnectName,
            })
            this.selectedLedStation = arr
          })
        }
      }
      // console.log(newObj)
      this.formValues = {...newObj}
    } else {
      this.formValues.StartDate = this.convertDate(new Date())
      this.formValues.EndDate = this.convertDate(new Date())
    }
  },
}
</script>

<style lang="scss">
.form-led-stations {
  label {
    margin-bottom: 0;
  }
  .form-group {
    margin-bottom: 0;
  }
  .frame-form-led {
    margin-bottom: 10px;
  }
  .show-image-video {
    display: flex;
    justify-content: left;
  }
  .frame-choose-all-week {
    position: relative;
    cursor: pointer;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .btn-remove-led-station {
    display: flex;
    justify-content: center;

    div {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
  .col-form-label {
    padding-bottom: 0;
  }
  .small-title-led {
    margin-top: 10px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  .choose-day {
    .custom-control-inline {
      margin-right: 10px;
    }
  }
  .frame-form-datepicker,
  .frame-form-timepicker {
    .btn {
      padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    }
    .form-control {
      padding-left: 0;
    }
  }
  .show-image-video-2 {
    margin-top: 5px;
    display: block;
    position: relative;
    // padding-top: 75%;
    padding-top: 56.25%; //16:9
  }
  .show-image-video-2-2 {
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
  .btn-group-led {
    .btn-secondary {
      background-color: #6c757d;
      border: 1px solid #6c757d;
    }
  }
  .loading-video {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  .frame-run-time {
    display: flex;
    align-items: center;
  }
  .padding-left-10 {
    padding-left: 7px;
  }
  .padding-right-10 {
    padding-right: 7px;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
