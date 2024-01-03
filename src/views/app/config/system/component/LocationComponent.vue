<!--suppress ALL -->
<template>
  <div class="map-mini" id="map-mini">
    <div id="menu-left-click">
      <p>{{ coordinateClick.lat + ", " + coordinateClick.lng }}</p>
      <p>
        <strong>
          <span class="float-left">
            <b-link
              @click.prevent.stop="
                copyCoordinate(coordinateClick.lat + ', ' + coordinateClick.lng)
              "
            >
              {{ $t("map.copy") }}
            </b-link>
          </span>
          <span class="float-right">
            <b-link @click.prevent.stop="hidePopup">
              {{ $t("map.hide") }}
            </b-link>
          </span>
        </strong>
      </p>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "@/assets/leaflet/dist/leaflet.css";
import "@ansur/leaflet-pulse-icon/src/L.Icon.Pulse";
import "@ansur/leaflet-pulse-icon/src/L.Icon.Pulse.css";
import {
  defaultRegionCode,
  defaultMapType,
  defaultRegionCenter,
} from "@/constants/config";
import { mapGetters } from "vuex";

export default {
  name: "LocationComponent",
  props: ["latItem", "lngItem", "typeItem", "popupLocation"],
  data() {
    return {
      map: null,
      marker: null,
      defaultRegionCode,
      defaultMapType,
      defaultRegionCenter,
      coordinateClick: {
        lat: null,
        lng: null,
        name: null,
      },
    };
  },
  watch: {
    latItem(to, from) {
      if (to) {
        if (to && this.lngItem) {
          this.drawMarker(to, this.lngItem);
        }
      } else {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
      }
    },
    lngItem(to, from) {
      if (to) {
        if (this.latItem && to) {
          this.drawMarker(this.latItem, to);
        }
      } else {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
      }
    },
    menuClickCount() {
      if (this.map) {
        this.map.invalidateSize();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.map = this.initMap();
      if (this.latItem && this.lngItem) {
        this.drawMarker(this.latItem, this.lngItem);
      }
    }, 500);
  },
  computed: {
    ...mapGetters({
      menuClickCount: "getMenuClickCount",
    }),
  },
  methods: {
    initMap() {
      let locationCenter;
      if (this.latItem && this.lngItem) {
        locationCenter = new L.LatLng(
          parseFloat(this.latItem),
          parseFloat(this.lngItem)
        );
      } else {
        locationCenter = this.defaultRegionCenter;
      }
      // let urlMap, mapDefault
      // if ((this.typeItem && this.typeItem === 'kiosk') || (this.typeItem && this.typeItem === 'camerathermal')) {
      //   urlMap = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      //   mapDefault = L.tileLayer(urlMap, {minZoom: 15, maxZoom: 20, subdomains:['mt0', 'mt1', 'mt2', 'mt3']})
      // } else {
      //   urlMap = 'http://map.namlongtekgroup.com/index.php?r=' + this.defaultRegionCode + '&t=' + this.defaultMapType + '&z={z}&x={x}&y={y}&k=namlong_2021'
      //   mapDefault = L.tileLayer(urlMap, {minZoom: 15, maxZoom: 18, transparent: false})
      // }
      let urlMap = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      let mapDefault = L.tileLayer(urlMap, {
        minZoom: 15,
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      });
      let map = L.map("map-mini", {
        center: locationCenter,
        zoom: 15,
        layers: mapDefault,
      });
      if (this.popupLocation) {
        map.addEventListener("click", this.openPoint);
      }
      map.invalidateSize();
      return map;
    },
    openPoint(e) {
      let latitude = parseFloat(e.latlng.lat).toFixed(7);
      let longitude = parseFloat(e.latlng.lng).toFixed(7);
      this.handleClick(latitude, longitude);
    },
    handleClick(lat, lng) {
      let context = document.getElementById("menu-left-click");
      if (
        lat !== this.coordinateClick.lat ||
        lng !== this.coordinateClick.lng
      ) {
        if (
          this.coordinateClick.lat === null &&
          this.coordinateClick.lng === null
        ) {
          context.style.display = "block";
          this.coordinateClick = {
            lat: lat,
            lng: lng,
            name: this.$t("map.no-result"),
          };
        } else {
          context.style.display = "none";
          this.coordinateClick = {
            lat: null,
            lng: null,
            name: null,
          };
        }
      }
    },
    copyCoordinate(text) {
      const el = document.createElement("textarea");
      el.value = text;
      document.getElementById("map-mini").appendChild(el);
      el.select();
      document.execCommand("copy");
      document.getElementById("map-mini").removeChild(el);
    },
    hidePopup(e) {
      e.preventDefault();
      document.getElementById("menu-left-click").style.display = "none";
      this.coordinateClick = {
        lat: null,
        lng: null,
        name: null,
      };
    },
    flyPoint(lat, lng) {
      this.map.flyTo([parseFloat(lat), parseFloat(lng)], 18, {
        animate: true,
        duration: 2,
      });
    },
    drawMarker(lat, lng) {
      let icon;
      if (this.typeItem) {
        icon = new L.Icon({
          iconUrl:
            "https://imgsmartcity.namlongtekgroup.com/Icon/blue_" +
            this.typeItem +
            ".svg",
          iconSize: [30, 30],
          iconAnchor: [10, 25],
          popupAnchor: [0, -40],
          className: "marker-svg-option",
        });
      } else {
        icon = new L.icon.pulse({
          iconSize: [20, 20],
          color: "blue",
          fillColor: "blue",
        });
      }
      let marker = L.marker(new L.LatLng(parseFloat(lat), parseFloat(lng)), {
        icon: icon,
      });
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = new L.LayerGroup();
      this.marker.addLayer(marker);
      setTimeout(() => {
        if (this.map) {
          this.map.addLayer(this.marker);
          this.flyPoint(lat, lng);
        }
      }, 200);
    },
  },
};
</script>

<style scoped>
#map-mini {
  height: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid #d7d7d7;
}

#menu-left-click {
  display: none;
  position: absolute;
  z-index: 100000;
  width: auto;
  padding: 7px;
  left: 50%;
  bottom: 2%;
  background-color: white;
  border: 1px solid #d7d7d7;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(0);
}

#menu-left-click p {
  margin-bottom: 0;
  font-size: 12px;
}
</style>
