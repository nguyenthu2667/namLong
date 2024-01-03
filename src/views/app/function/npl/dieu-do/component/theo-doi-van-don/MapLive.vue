
<template>
  <div class="box-map">
    <div class="map" id="map-live"></div>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse";
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet.locatecontrol";
import "lrm-google";
import "leaflet-control-geocoder";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "map-main",
  data() {
    return {
      map: null,
      intervalMAP: null,
      myLocate: {
        currentPosition: { lat: 0, lng: 0 },
      },
      myRouteControl: null,
      lLocate: null,
      lScale: null,
      lTinerary: null,
      lGeocoder: L.Control.Geocoder.nominatim(),
      //
      selectedRoute: null,
      routes: null,
    };
  },
  async mounted() {
    // await this.myposition();
    await this.initMap("GG");
    await setTimeout(() => {
      this.addLayerWaypoints();
    }, 2000);
    this.intervalMAP = setInterval(() => {
      this.map.invalidateSize();
    }, 3000);
  },
  destroyed() {
    clearInterval(this.intervalMAP);
  },
  watch: {
    "myLocate.currentPosition.lat"() {
      if (this.myRouteControl) {
        let newLat = this.myLocate.currentPosition.lat;
        let newLng = this.myLocate.currentPosition.lng;
        this.myRouteControl.setWaypoints([
          L.latLng(newLat, newLng),
          this.myRouteControl.options.waypoints[1],
        ]);
        this.map.invalidateSize();
      }
    },
    "myLocate.currentPosition.lng"() {
      if (this.myRouteControl) {
        let newLat = this.myLocate.currentPosition.lat;
        let newLng = this.myLocate.currentPosition.lng;
        this.myRouteControl.setWaypoints([
          L.latLng(newLat, newLng),
          this.myRouteControl.options.waypoints[1],
        ]);
        this.map.invalidateSize();
      }
    },
  },

  methods: {
    log3() {
      alert("alerss");
    },
    log2() {
      if (this.myRouteControl) {
        // this.myRouteControl.options.waypoints[0].lat = 9.7909411;
        // this.myRouteControl.options.waypoints[0].lng = 105.6335449;
        if (this.myRouteControl) {
          let newLat = 9.7909411;
          let newLng = 105.6335449;
          this.myRouteControl.setWaypoints([
            L.latLng(newLat, newLng),
            this.myRouteControl.options.waypoints[1],
          ]);
        }
        this.map.invalidateSize();
      }
    },
    initMap(type) {
      let mapDefault, urlMap;
      switch (type) {
        case "2D":
          console.log("loading..2D");
          break;
        default:
          urlMap = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
          mapDefault = L.tileLayer(urlMap, {
            type: "MAP",
            minZoom: 1,
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          });
          break;
      }
      this.map = L.map("map-live", {
        tap: false,
        center: [10.7941878, 106.6724396],
        zoom: 10.5,
        layers: mapDefault,
        fullscreenControl: true,
      });

      this.lScale = L.control
        .scale({ position: "bottomright" })
        .addTo(this.map);

      this.lLocate = L.control
        .locate({
          showCompass: true,
          strings: { title: "Vị trí của bạn !" },
          icon: "fas fa-map-marker-alt",
          locateOptions: {
            enableHighAccuracy: true,
            flyTo: true,
            maxZoom: 19,
          },
        })
        .addTo(this.map);

      this.map.invalidateSize();
    },

    removeLayerWaypoints() {
      if (this.myRouteControl) {
        this.map.removeLayer(this.myRouteControl);
        this.myRouteControl = null;
      }
    },
    addLayerWaypoints() {
      this.removeLayerWaypoints();
      var myIcon1 = L.icon({
        iconUrl: "https://img.icons8.com/color/96/interstate-truck.png",
        iconSize: [25, 25],
      });
      var myIcon2 = L.icon({
        iconUrl:
          "https://img.icons8.com/external-prettycons-lineal-color-prettycons/98/external-warehouse-delivery-prettycons-lineal-color-prettycons-2.png",
        iconSize: [20, 20],
      });
      var myIcon3 = L.icon({
        iconUrl:
          "https://img.icons8.com/external-line-colors-royyan-wijaya/128/external-athlete-sportify-color-line-colors-royyan-wijaya-2.png",
        iconSize: [20, 20],
      });
      this.myRouteControl = L.Routing.control({
        type: "MARKER",
        fitSelectedRoutes: false,
        show: false,
        summaryTemplate:
          "<h2><strong> {name}</strong></h2><h3>Khoảng cách: <b style='color:#e74c3c'>{distance}</b> Thời gian: <b  style='color:#9b59b6'>{time}</b></h3>",
        waypoints: [
          //   L.latLng(
          //     this.myLocate.currentPosition.lat,
          //     this.myLocate.currentPosition.lng
          //   ), //current
          L.latLng(10.7999878, 106.6994396),
          L.latLng(10.7941878, 106.6724396), //from
          L.latLng(10.7391665, 106.6489407), //to
        ],
        geocoder: this.lGeocoder,
        lineOptions: {
          styles: [
            { color: "black", opacity: 0.3, weight: 11 },
            { color: "white", opacity: 0.9, weight: 9 },
            { color: "#e74c3c", opacity: 1, weight: 3 },
          ],
          addWaypoints: false,
        },
        createMarker: function (i, wp, nWps) {
          if (i == 0) {
            return L.marker(wp.latLng, {
              icon: myIcon2,
            });
          } else if (i == 1) {
            return L.marker(wp.latLng, {
              icon: myIcon1,
            });
          } else {
            return L.marker(wp.latLng, {
              icon: myIcon3,
            });
          }
        },
      }).addTo(this.map);
    },
    removeLayerAll() {
      this.map.eachLayer((l) => {
        if (l.options.type !== "MAP") {
          this.map.removeLayer(l);
        }
      });
    },
    customIcon(obj, typeMarker) {
      let icon = L.icon({
        iconUrl: "https://img.icons8.com/material-rounded/344/marker.png",
        iconSize: [30, 40],
      });
      return icon;
    },
    customHTML(obj, typeMarker) {
      let html = ``;
      return html;
    },
    myposition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          this.successPosition,
          this.failurePosition,
          {
            enableHighAccuracy: false,
            timeout: 3000,
            maximumAge: 4000,
          }
        );
      } else {
        document.getElementById("resulttest").innerHTML =
          "Trình duyệt của bạn không hỗ trợ API vị trí địa lý !!!";
      }
    },
    successPosition: function (position) {
      this.myLocate.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    },
    failurePosition: function (err) {
      alert("Error Code: " + err.code + " Error Message: " + err.message);
    },
  },
};
</script>
<style>
/* .leaflet-routing-container {
  display: none;
} */
.leaflet-routing-container-hide .leaflet-routing-collapse-btn {
  left: 1px;
  top: -1px;
}
</style>
<style>
td,
h2,
h3,
input {
  /* font-family: "Merienda" !important; */
}
.leaflet-routing-geocoders button {
  display: none;
}
</style>
<style lang="scss" scoped>
.box-map {
  height: 100%;
}
#map {
  width: 100%;
  height: "auto";
  background-color: gray;
}
.map {
  height: 100%;
}
</style>
<style>
.vm--overlay {
  width: 0;
  height: 0;
}
.vm--container {
  width: 0;
  height: 0;
}
</style>