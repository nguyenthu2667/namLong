<!--suppress ALL -->
<template>
  <div class="map-mini" id="map-mini"></div>
</template>

<script>
import L from 'leaflet'
import '@/assets/leaflet/dist/leaflet.css'
import '@ansur/leaflet-pulse-icon/src/L.Icon.Pulse'
import '@ansur/leaflet-pulse-icon/src/L.Icon.Pulse.css'
import {
  defaultRegionCode,
  defaultMapType,
  defaultRegionCenter,
} from '@/constants/config'
import { mapGetters } from 'vuex'

export default {
  name: 'MultiLocationComponent',
  props: ['latLng', 'typeItem'],
  data() {
    return {
      map: null,
      marker: null,
      defaultRegionCode,
      defaultMapType,
      defaultRegionCenter,
    }
  },
  watch: {
    latLng(to, from) {
      if (to) {
        this.drawMarker(to)
      } else {
        if (this.marker) {
          this.map.removeLayer(this.marker)
        }
      }
    },
    menuClickCount() {
      if (this.map) {
        this.map.invalidateSize()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.map = this.initMap()
      if (this.latLng) {
        this.drawMarker(this.latLng)
      }
    }, 500)
  },
  computed: {
    ...mapGetters({
      menuClickCount: 'getMenuClickCount',
    }),
  },
  methods: {
    initMap() {
      // let urlMap, mapDefault
      // if ((this.typeItem && this.typeItem === 'kiosk') || (this.typeItem && this.typeItem === 'camerathermal')) {
      //   urlMap = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      //   mapDefault = L.tileLayer(urlMap, {minZoom: 9, maxZoom: 20, subdomains:['mt0', 'mt1', 'mt2', 'mt3']})
      // } else {
      //   urlMap = 'http://map.namlongtekgroup.com/index.php?r=' + this.defaultRegionCode + '&t=' + this.defaultMapType + '&z={z}&x={x}&y={y}&k=namlong_2021'
      //   mapDefault = L.tileLayer(urlMap, {minZoom: 9, maxZoom: 18, transparent: false})
      // }
      let urlMap = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      let mapDefault = L.tileLayer(urlMap, {
        minZoom: 9,
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      })
      let map = L.map('map-mini', {
        center: this.defaultRegionCenter,
        zoom: 10,
        layers: mapDefault,
        zoomControl: false,
      })
      map.invalidateSize()
      return map
    },
    flyPoint(lat, lng) {
      this.map.flyTo([parseFloat(lat), parseFloat(lng)], 18, {
        animate: true,
        duration: 2,
      })
    },
    drawMarker(location) {
      if (location.length > 0) {
        if (this.marker) {
          this.map.removeLayer(this.marker)
        }
        this.marker = new L.LayerGroup()
        for (let i = 0; i < location.length; i++) {
          let icon, marker
          if (location[i].length > 2) {
            if (this.typeItem) {
              icon = new L.Icon({
                iconUrl:
                  'https://imgsmartcity.namlongtekgroup.com/Icon/' +
                  location[i][2] +
                  '_' +
                  this.typeItem +
                  '.svg',
                iconSize: [30, 30],
                iconAnchor: [10, 25],
                popupAnchor: [0, -40],
                className: 'marker-svg-option',
              })
            } else {
              icon = L.icon.pulse({
                iconSize: [30, 30],
                color: 'blue',
                fillColor: 'blue',
              })
            }
            marker = L.marker([location[i][0], location[i][1]], { icon: icon })
          } else {
            if (this.typeItem) {
              icon = new L.Icon({
                iconUrl:
                  'https://imgsmartcity.namlongtekgroup.com/Icon/blue_' +
                  this.typeItem +
                  '.svg',
                iconSize: [30, 30],
                iconAnchor: [10, 25],
                popupAnchor: [0, -40],
                className: 'marker-svg-option',
              })
            } else {
              icon = L.icon.pulse({
                iconSize: [30, 30],
                color: 'blue',
                fillColor: 'blue',
              })
            }
            marker = L.marker(location[i], { icon: icon })
          }
          this.marker.addLayer(marker)
        }
        setTimeout(() => {
          if (this.map) {
            this.map.addLayer(this.marker)
          }
        }, 200)
      }
    },
  },
}
</script>

<style scoped>
#map-mini {
  height: 100%;
  width: 100%;
  background-color: white;
  /*border: 1px solid #d7d7d7;*/
  z-index: 0;
}
</style>
