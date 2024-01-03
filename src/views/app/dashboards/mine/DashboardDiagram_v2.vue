<template>
  <div id="map" class="map">
    <div id="menu-left-click">
      <p>
        {{ coordinateClick.lat + ', ' + coordinateClick.lng }}
        <strong>
          <span class="pl-4 float-right">
            <b-link
              @click.prevent.stop="
                copyCoordinate(coordinateClick.lat + ', ' + coordinateClick.lng)
              "
            >
              {{ $t('map.copy') }}
            </b-link>
          </span>
        </strong>
      </p>
      <p>
        <strong>
          {{ coordinateClick.name }}
          <strong>
            <span class="pl-4 float-right">
              <b-link @click.prevent.stop="hidePopup">
                {{ $t('map.hide') }}
              </b-link>
            </span>
          </strong>
        </strong>
      </p>
    </div>
    <b-modal
      id="modal-add-marker"
      name="modal-add-marker"
      hide-header
      size="md"
    >
      <div class="header">
        <h4>
          <strong>{{ $t('mine').toUpperCase() }}</strong>
        </h4>
      </div>
      <div class="content">
        <template v-if="data && data.length > 0">
          <template v-for="(item, i) in data">
            <div style="height: 64px;" class="item" :key="'p' + i">
              <div v-b-toggle="item.StationID" class="info">
                <div class="name">
                  <span class="text-muted">
                    {{ $t('dashboards.station-name') }}:
                    <strong> {{ item.StationName }} </strong>
                  </span>
                </div>
                <div class="address">
                  <span class="text-muted">
                    {{ $t('modal.location-option') }}:
                    <strong>
                      {{ item.StationAddress }}
                    </strong>
                  </span>
                </div>
                <div class="code">
                  <span class="text-muted">
                    Trạng thái:
                    <strong :style="'color:' + item.StatusColor">
                      {{ item.StatusName }}
                    </strong>
                  </span>
                </div>
              </div>
              <div
                v-if="item.StatusID == 0"
                class="action"
                @click="handleAddItem(item)"
              >
                <button class="btn-add">+</button>
              </div>
              <div v-else class="action" @click="modalDelete(item)">
                <button class="btn-delete">-</button>
              </div>
            </div>
            <b-collapse
              :id="item.StationID"
              class="ml-4"
              v-for="(d, key) in item.Details"
              :key="'c' + key"
              visible
            >
              <div class="item">
                <div class="info">
                  <div class="name">
                    <span class="text-muted">
                      Chỉ số:
                      <strong>
                        {{ d.IndicatorCode }}
                      </strong>
                    </span>
                  </div>
                  <div class="code">
                    <span class="text-muted">
                      Trạng thái:
                      <strong :style="'color:' + d.StatusColor">
                        {{ d.StatusName }}
                      </strong>
                    </span>
                  </div>
                </div>
                <div
                  v-if="d.StatusID == 0"
                  class="action"
                  @click="handleAddItem(d)"
                >
                  <button class="btn-add">+</button>
                </div>
                <div v-else class="action" @click="modalDelete(d)">
                  <button class="btn-delete">-</button>
                </div>
              </div>
            </b-collapse>
          </template>
        </template>
        <template v-else>
          <div class="font-italic">{{ $t('cards.no-data') }}</div>
        </template>
      </div>
    </b-modal>
  </div>
</template>

<script>
import L from 'leaflet'
import '@/assets/leaflet/dist/leaflet.css'
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse'
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css'
import {
  getStationLocationMaps,
  addStationLocationMaps,
  deleteStationLocationMaps,
  liveStationLocationMaps,
  checkUserApp,
} from '@/data/modules/mine'
import ImgMap from '@/assets/img/OriginalMap.svg'

export default {
  data() {
    return {
      interval: null,
      map: null,
      imageUrl: ImgMap,
      imageBounds: [
        [40.799311, -74.118464],
        [40.68202047785919, -74.33],
      ],
      coordinateClick: {
        lat: null,
        lng: null,
        name: null,
      },
      form: {
        name: null,
        station: null,
        latLng: null,
        note: '',
      },
      data: [],
      dataLive: [],
      lated: null,
      lnged: null,
      isCheckAuthen: false,
    }
  },
  async created() {
    if (this.$route.query && this.$route.query.user) {
      await this.checkAuth(this.$route.query.user)
      setTimeout(async () => {
        if (this.isCheckAuthen) {
          await this.getData()
          this.interval = setInterval(async () => {
            await this.getData()
          }, 30000)
        } else {
          this.$router.push('/err')
        }
      }, 500)
    } else {
      this.$router.push('/err')
    }
  },
  mounted() {
    this.initMap()
    this.refeshUImap()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    checkAuth(id) {
      let body = {
        UserID: id,
      }
      checkUserApp(body)
        .then((val) => {
          let result = val.status ? val.data[0] : null
          if (result.Validate === true) {
            this.isCheckAuthen = true
          } else {
            this.isCheckAuthen = false
          }
        })
        .catch((err) => {
          this.isCheckAuthen = false
          console.log(err)
        })
    },
    handleSubmitREMOVE(item) {
      let body = {
        StationID: item.StationID,
        IndicatorIndex: item.IndicatorIndex,
      }
      deleteStationLocationMaps(body)
        .then((val) => {
          this.getData()
          this.$bvModal.hide('modal-add-marker')
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                'success',
                this.$t('toast.success').toUpperCase(),
                val.message,
              )
            }, 500)
          } else {
            setTimeout(() => {
              this.makeToast(
                'danger',
                this.$t('toast.fail').toUpperCase(),
                val.message,
              )
            }, 500)
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.makeToast('danger', this.$t('toast.fail').toUpperCase(), err)
          }, 500)
        })
    },
    handleSubmitADD(item) {
      let body = {
        StationID: item.StationID,
        PointX: this.lated,
        PointY: this.lnged,
        IndicatorIndex: item.IndicatorIndex,
      }
      addStationLocationMaps(body)
        .then((val) => {
          this.getData()
          this.$bvModal.hide('modal-add-marker')
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                'success',
                this.$t('toast.success').toUpperCase(),
                val.message,
              )
            }, 500)
          } else {
            setTimeout(() => {
              this.makeToast(
                'danger',
                this.$t('toast.fail').toUpperCase(),
                val.message,
              )
            }, 500)
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.makeToast('danger', this.$t('toast.fail').toUpperCase(), err)
          }, 500)
        })
    },
    handleAddItem(item) {
      this.$bvModal
        .msgBoxConfirm('Bạn muốn thêm vào bản đồ ?', {
          title: this.$t('notify.notification').toUpperCase(),
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
            this.handleSubmitADD(item)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDataLive() {
      liveStationLocationMaps()
        .then((val) => {
          this.dataLive = val.status ? val.data : []
          this.pushMarkers(this.dataLive)
        })
        .catch((err) => console.log(err))
    },
    getData() {
      getStationLocationMaps()
        .then((val) => {
          this.data = val.status ? val.data : []
          this.removeLayerMarkerAll()
          this.getDataLive()
        })
        .catch((err) => console.log(err))
    },
    pushMarkers(arr) {
      arr.forEach((m) => {
        let obj = this.data.find((e) => e.StationID === m.StationID)
        m = { ...obj, ...m }
        // let pulsingIcon = L.icon.pulse({
        //   iconSize: [12, 12],
        //   color: m.StatusColor ?? 'blue',
        //   fillColor: m.StatusColor ?? 'blue',
        // })
        let icon = L.icon({
          iconUrl: `https://imgsmartcity.namlongtekgroup.com/Icon/${m.StatusColor.toLowerCase()}_light.svg`,
          iconSize: [24, 24],
        })
        let templateHTML = this.customHTML(m, 'PARENT')
        let tooltip = L.tooltip({
          // sticky: true,
          className: 'cusTooltip',
          // permanent: true,
          offset: [9, 0],
        }).setContent(templateHTML)

        let marker = L.marker([m.PointX, m.PointY], {
          type: 'MARKER',
          icon: icon,
          id: m.StationID,
          status: m.StatusID,
          statusName: m.StatusName,
        })
          .on('click', () => this.modalDelete(m))
          .addTo(this.map)
          .bindTooltip(tooltip)
        //chilren
        if (m.Details?.length > 0) {
          let details = m.Details
          details.forEach((d) => {
            if (d.PointX && d.PointX) {
              if (d.PointX != 0 && d.PointX) {
                let pulsingIconItem = L.icon.pulse({
                  iconSize: [8, 8],
                  color: d.WarningColor ?? 'blue',
                  fillColor: d.WarningColor ?? 'blue',
                })
                let templateHTML = this.customHTML(d, 'CHILREN')
                let tooltip = L.tooltip({
                  //sticky: true,
                  className: 'cusTooltip',
                  permanent: true,
                  offset: [9, 0],
                }).setContent(templateHTML)
                let marker = L.marker([d.PointX, d.PointY], {
                  type: 'MARKER',
                  icon: pulsingIconItem,
                  id: d.StationID,
                  status: d.PointX == 0 ? 0 : 1,
                  statusName: d.WarningColor,
                })
                  .on('click', () => this.modalDelete(d))
                  .addTo(this.map)
                  .bindTooltip(tooltip)
                  .openTooltip()
              }
            }
          })
        }
      })
    },
    customHTML(marker, type) {
      let html = ``
      if (type === 'PARENT') {
        if (marker.Infos?.length > 0) {
          html =
            '<div style="font-family: Merienda;background:#404040;color:white;padding:4px !important;margin:0 !important;">'
          marker.Infos.map((d) => {
            html +=
              '<div style="width:100%;display:flex;justify-content: space-between;">' +
              "<div style='font-weight:600;'>" +
              d.InfoCode +
              ':</div> <div><b style="color:' +
              d.StatusColor +
              '">' +
              d.InfoValue +
              '</b></div></div>'
          })
          html += '</div>'
        } else {
          html = `${this.$t('panel.non-data')}`
        }
      } else {
        if (marker) {
          html =
            '<div style="font-family: Merienda;background:#404040;color:white;padding:4px !important;margin:0 !important;">'
          html +=
            '<div style="width:100%;display:flex;justify-content: space-between;">' +
            "<div style='font-weight:600;'>" +
            marker.IndicatorCode +
            ':</div> <div><b style="color:' +
            marker.WarningColor1 +
            '">' +
            marker.IndicatorValue +
            '</b></div></div>'
          html += '</div>'
        } else {
          html = `${this.$t('panel.non-data')}`
        }
      }

      return html
    },
    modalDelete(item) {
      if (this.$route.query.action.toUpperCase() !== 'EDIT') return
      let name = item.StationName ?? item.IndicatorCode
      this.$bvModal
        .msgBoxConfirm('Bạn muốn xoá ' + name + '?', {
          title: this.$t('report.warning').toUpperCase(),
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
            this.handleSubmitREMOVE(item)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    removeLayerMarkerAll() {
      this.map.eachLayer((l) => {
        if (l.options.type === 'MARKER') {
          this.map.removeLayer(l)
        }
      })
    },
    initMap() {
      this.map = L.map('map', {
        center: [40.74, -74.225],
        zoom: 13,
        minZoom: 13,
        maxZoom: 15,
      })
      this.map.addEventListener('click', this.openPoint)
      L.imageOverlay(this.imageUrl, this.imageBounds).addTo(this.map)
    },
    refeshUImap() {
      this.map.invalidateSize()
    },
    showModalAddMarker(lat, lng) {
      this.lated = lat
      this.lnged = lng
      setTimeout(() => {
        this.$bvModal.show('modal-add-marker')
      }, 500)
    },
    openPoint(e) {
      let latitude = parseFloat(e.latlng.lat).toFixed(7)
      let longitude = parseFloat(e.latlng.lng).toFixed(7)
      if (this.$route.query.action.toUpperCase() === 'EDIT') {
        this.handleClick(latitude, longitude)
      }
    },
    handleClick(lat, lng) {
      this.showModalAddMarker(lat, lng)
      let context = document.getElementById('menu-left-click')
      if (
        lat !== this.coordinateClick.lat ||
        lng !== this.coordinateClick.lng
      ) {
        if (
          this.coordinateClick.lat === null &&
          this.coordinateClick.lng === null
        ) {
          context.style.display = 'block'
          this.coordinateClick = {
            lat: lat,
            lng: lng,
            name: this.$t('map.no-result'),
          }
        } else {
          context.style.display = 'none'
          this.coordinateClick = {
            lat: null,
            lng: null,
            name: null,
          }
        }
      }
    },
    copyCoordinate(text) {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    hidePopup(e) {
      e.preventDefault()
      document.getElementById('menu-left-click').style.display = 'none'
      this.coordinateClick = {
        lat: null,
        lng: null,
        name: null,
      }
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

<style lang="scss" scoped>
#map {
  width: 100%;
  height: calc(100vh - 0px);
  background: white;
  cursor: pointer;
  z-index: 0 !important;
}
#menu-left-click {
  display: none;
  position: absolute;
  z-index: 100000;
  width: auto;
  padding: 10px;
  left: 50%;
  bottom: 2%;
  background-color: white;
  border: 1px solid #d7d7d7;
  box-shadow: 0 1px 15px rgbr(0 0 0 / 4%), 0 1px 6px rgbr(0 0 0 / 4%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(0);
}

#menu-left-click p {
  margin-bottom: 0;
}
.content {
  height: calc(100vh - 315px);
  overflow: auto;
}
.item {
  overflow: auto;
  display: flex;
  height: 50px;
  background: #f7f7f7;
  padding: 5px;
  margin: 3px 0;
  & .info {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 5px;
  }
  & .action {
    background: lightcoral;
    width: 10%;
    height: 100%;
    & .btn-add {
      width: 100%;
      height: 100%;
      border: 1px solid #d7d7d7;
      background: lightgreen;
    }
    & .btn-delete {
      width: 100%;
      height: 100%;
      border: 1px solid #d7d7d7;
      background: lightcoral;
    }
  }
}
.btn-add:hover {
  background: rgb(70, 173, 70) !important;
  color: white;
}
.btn-delete:hover {
  background: rgb(238, 99, 99) !important;
  color: white;
}
.info:hover {
  background: #e7e6e6;
  cursor: pointer;
}
</style>
<style>
.cusTooltip {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
