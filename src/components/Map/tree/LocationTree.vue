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
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import {
  defaultRegionCode,
  defaultMapType,
  defaultRegionCenter,
} from "@/constants/config";
import { mapGetters } from "vuex";

export default {
  name: "LocationComponent",
  props: [
    "latItem",
    "lngItem",
    "typeItem",
    "pPopupLocation",
    "plistTreeDataCurrent",
    "pidTree",
    "pKeyComponent",
    "pProcessID",
  ],
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
      listTreeDataCurrent: this.plistTreeDataCurrent ?? null,
      idTree: this.pidTree ?? null,
      popupLocation: this.pPopupLocation ?? null,
      keyComponent: this.pKeyComponent ?? null,
      processID: this.pProcessID ?? null,
      markerUpdate: null,
    };
  },
  watch: {
    // latItem(to, from) {
    //   if (to) {
    //     if (to && this.lngItem) {
    //       this.drawMarker(to, this.lngItem);
    //     }
    //   } else {
    //     if (this.marker) {
    //       this.map.removeLayer(this.marker);
    //     }
    //   }
    // },
    // lngItem(to, from) {
    //   if (to) {
    //     if (this.latItem && to) {
    //       this.drawMarker(this.latItem, to);
    //     }
    //   } else {
    //     if (this.marker) {
    //       this.map.removeLayer(this.marker);
    //     }
    //   }
    // },
    // menuClickCount() {
    //   if (this.map) {
    //     this.map.invalidateSize();
    //   }
    // },
  },
  mounted() {
    setTimeout(() => {
      this.map = this.initMap();
      if (this.keyComponent?.toUpperCase() === "MAP") {
        this.drawMarker(this.latItem, this.lngItem);
      } else {
        if (this.processID && this.processID < 3) {
          this.drawMarker(this.latItem, this.lngItem);
          if (this.listTreeDataCurrent?.length > 0) {
            this.drawMarkerListTree();
          }
        } else {
          if (this.latItem && this.lngItem) {
            this.drawMarker(this.latItem, this.lngItem);
          }
          if (this.listTreeDataCurrent?.length > 0) {
            this.drawMarkerListTree();
          }
        }
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
      let urlMap = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
      let mapDefault = L.tileLayer(urlMap, {
        minZoom: 15,
        maxZoom: 21,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      });

      let map = L.map("map-mini", {
        center: locationCenter,
        zoom: 15,
        layers: mapDefault,
        fullscreenControl: true,
      });
      L.control.scale({ position: "bottomright" }).addTo(map);

      if (this.popupLocation) {
        map.addEventListener("click", this.openPoint);
      }

      document
        .querySelector("div.leaflet-control-attribution.leaflet-control")
        .remove();
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
      let context = this;
      let icon;
      if (this.typeItem) {
        icon = new L.divIcon({
          html: `<div><div style="font-size: 12px;
    font-weight: 700;
    color: black; text-align:center">${this.idTree}</div><img class="tree-circle-location" src="https://mediacantho.nlt-group.com/img/Icon/blue_${this.typeItem}.svg" /></div>`,
          iconSize: [30, 30],
          iconAnchor: [10, 25],
          popupAnchor: [0, -40],
          className: "marker-svg-option ",
        });
      }
      if (this.keyComponent?.toUpperCase() != "MAP") {
        let isProcessID = this.processID < 3;
        let marker = L.marker(new L.LatLng(parseFloat(lat), parseFloat(lng)), {
          icon: icon,
          draggable: isProcessID,
        });
        marker.on("dragend", function (e) {
          let position = e.target.getLatLng();
          marker.setLatLng(new L.LatLng(position.lat, position.lng), {
            draggable: isProcessID,
          });
          context.$emit("emitDraggableLatLng", marker.getLatLng());
        });
        if (this.markerUpdate) {
          this.map.removeLayer(this.marker);
        }
        this.markerUpdate = marker;
        setTimeout(() => {
          if (this.map) {
            this.map.addLayer(this.markerUpdate);
            this.flyPoint(lat, lng);
          }
        }, 200);
      } else {
        let marker = L.marker(new L.LatLng(parseFloat(lat), parseFloat(lng)), {
          icon: icon,
        });
        setTimeout(() => {
          if (this.map) {
            this.map.addLayer(marker);
            this.flyPoint(lat, lng);
          }
        }, 200);
      }
    },
    drawMarkerListTree() {
      let listMarkerGroup = this.listTreeDataCurrent.map((tree) => {
        let icon;
        if (this.typeItem) {
          icon = new L.divIcon({
            // iconUrl:
            //   "https://imgsmartcity.namlongtekgroup.com/Icon/blue_" +
            //   this.typeItem +
            //   ".svg",
            html: `<div><div style="font-size: 12px;
    font-weight: 700;
    color: black; text-align:center">${
      "" + tree.TreeNumber
    }</div><img src="https://mediacantho.nlt-group.com/img/Icon/blue_${
              this.typeItem
            }.svg" /></div>`,
            iconSize: [30, 30],
            iconAnchor: [10, 25],
            popupAnchor: [0, -40],
            className: "marker-svg-option",
          });
        }
        let markerGroup = L.marker(
          new L.LatLng(parseFloat(tree.Lat), parseFloat(tree.Long)),
          {
            icon: icon,
          }
        );
        return markerGroup;
      });
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = new L.LayerGroup([...listMarkerGroup]);
      this.map.addLayer(this.marker);
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

<style>
.tree-circle-location {
  color: white;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkGreen 0.5s infinite;
  -moz-animation: blinkGreen 0.5s infinite;
  -ms-animation: blinkGreen 0.5s infinite;
  -o-animation: blinkGreen 0.5s infinite;
  animation: anim-glow 2s infinite;
}

@-webkit-keyframes anim-glow {
  0% {
    box-shadow: 0 0 #add2ad;
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 6px;
  }
}

@-moz-keyframes anim-glow {
  0% {
    box-shadow: 0 0 #add2ad;
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 6px;
  }
}

@-ms-keyframes anim-glow {
  0% {
    box-shadow: 0 0 #add2ad;
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 6px;
  }
}

@-o-keyframes anim-glow {
  0% {
    box-shadow: 0 0 #add2ad;
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 6px;
  }
}

@keyframes anim-glow {
  0% {
    box-shadow: 0 0 white;
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 6px;
  }
}
</style>
