<template>
  <div class="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "@/assets/leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import "@/assets/maps/leaflet-draw";
import "@/assets/maps/leaflet-draw/dist/leaflet.draw.css";
import "@/assets/maps/leaflet-measure";
import "@/assets/maps/leaflet-measure/dist/leaflet-measure.css";
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
import handling from "@/constants/handling";
import { urlImage } from "@/constants/config";
import {
  defaultRegionCode,
  defaultRegionCenter,
  defaultMapType,
} from "@/constants/config";
import { mapGetters } from "vuex";
import Status from "@/components/Badges/StatusColor.vue";
//modules

export default {
  components: {
    Status,
  },
  data() {
    return {
      timer: 500,
      typeMap: "GG",
      map: null,
      layers: [],
      dataMapNow: null,
      interval: null,
      intervalMAP: null,
      urlStatic: urlImage,
      defaultRegionCode,
      defaultRegionCenter,
      defaultMapType,
      menuRight: [],
      showNavMap: false,
      isShowChilrenList: false,
      dataModal: null,
      //menu-right
      listShow: [
        {
          title: "Xe Điều Độ",
          code: "TRUCK",
          data: [{}],
        },
      ],
      //chilren-list
      listShowChilren: [],
      //copy-latlng
      coordinateClick: {
        lat: null,
        lng: null,
        name: null,
      },
    };
  },
  computed: {
    ...mapGetters(["regionCenter"]),
  },
  async created() {
    //get-data
    await this.getDataByCode();
    this.interval = setInterval(async () => {
      await this.getDataByCode();
      this.map.invalidateSize();
    }, this.timer * 1200); //10 phút
  },
  mounted() {
    this.map = this.initMap();
    setTimeout(() => {
      this.handleAddLayersModule();
      this.map.invalidateSize();
    }, 2000);
    this.intervalMAP = setInterval(() => {
      this.map.invalidateSize();
    }, 3000);
  },
  destroyed() {
    clearInterval(this.interval);
    clearInterval(this.intervalMAP);
  },
  methods: {
    resetModal() {
      this.dataModal = null;
    },
    flyToPoint(item) {
      this.map.flyTo([item.lat, item.lng], 19, {
        animate: true,
        duration: 2,
      });
    },
    initMap() {
      let mapDefault, urlMap;
      switch (this.typeMap) {
        case "GG":
          urlMap = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
          mapDefault = L.tileLayer(urlMap, {
            type: "MAP",
            minZoom: 1,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          });
          break;
        case "VT":
          urlMap = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
          mapDefault = L.tileLayer(urlMap, {
            type: "MAP",
            minZoom: 1,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          });
          break;
        case "2D":
          urlMap =
            "https://map.namlongtekgroup.com/index.php?r=" +
            this.regionCenter +
            "&t=" +
            this.typeMap +
            "&z={z}&x={x}&y={y}&k=namlong_2021";
          mapDefault = L.tileLayer(urlMap, {
            type: "MAP",
            minZoom: 1,
            maxZoom: 18,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          });
          break;
      }
      let map = L.map("map", {
        center: this.defaultRegionCenter,
        zoom: 11,
        layers: mapDefault,
        fullscreenControl: true,
      });
      L.control.scale({ position: "bottomright" }).addTo(map);

      map.invalidateSize();
      return map;
    },
    getDataByCode() {
      if (this.layers?.length <= 0) {
        this.removeLayerAll();
        this.listShow = [
          {
            title: "Xe Điều Độ",
            code: "TRUCK",
            data: [],
          },
        ];
      }
      this.dataMapNow = [
        {
          DataTypeName: "TRUCK",
          DataProperties: [],
        },
        {
          DataTypeName: "VITRI",
          DataProperties: [],
        },
      ];
    },
    handleAddLayersModule() {
      var pulsingIcon = L.icon.pulse({ iconSize: [12, 12], color: "red" });
      var marker = L.marker([10.7941878, 106.6724396], { icon: pulsingIcon });
      this.map.addLayer(marker);
    },
    showModal(obj) {
      this.dataModal = obj;
      this.dataModal.type = obj.moduleType;
      setTimeout(() => {
        if (this.dataModal.StatusColor.toUpperCase() != "GRAY") {
          this.$bvModal.show("modal-detail-npl");
        } else {
          this.$bvModal.show("modal-detail-npl-gray");
        }
      }, 500);
    },
    returnModuleData(item, modul, keyChil) {
      let obj = {
        ...item,
        moduleType: modul.DataTypeName,
        layer: modul.DataTypeName.toUpperCase(),
        idLayer: modul.DataTypeName.toUpperCase() + item.StationID ?? item.ID,
        type: "MARKER",
        id: item.StationID ?? item.ID,
        name: item.StationName ?? item.Name,
        address: item.StationAddress,
        datetime: item.UpdateTime,
        statusName: item.StatusName,
        statusColor: item.StatusColor,
        img: item.StationImage ?? item.LinkAvatar,
        lat: item.Lat,
        lng: item.Long,
      };
      return obj;
    },
    customIcon(obj, moduleType, keyChil) {
      let urlIconModule = `${this.urlStatic}Icon/${obj.statusColor}_${obj.moduleType}.svg`;
      let borderColor = null;
      let iconSize = [30, 30];
      if (moduleType.toUpperCase() == "TRUCK") {
        if (obj.StatusColor == "gray") {
          urlIconModule = "/assets/img/npl/truck/gray.png";
        }
        if (obj.StatusColor == "blue") {
          urlIconModule = "/assets/img/npl/truck/blue.png";
        }
        if (obj.StatusColor == "orange") {
          urlIconModule = "/assets/img/npl/truck/orange.png";
        }
        if (obj.StatusColor == "green") {
          urlIconModule = "/assets/img/npl/truck/green.png";
        }
        if (obj.StatusColor == "red") {
          urlIconModule =
            "https://img.icons8.com/color/96/interstate-truck.png";
        }
      }
      if (moduleType.toUpperCase() == "KHO") {
        iconSize = [24, 24];
        urlIconModule =
          "https://img.icons8.com/external-prettycons-lineal-color-prettycons/98/external-warehouse-delivery-prettycons-lineal-color-prettycons-2.png";
      }
      let icon;
      if (moduleType.toUpperCase() == "VITRI") {
        icon = L.icon.pulse({ iconSize: [20, 20], color: "red" });
      } else {
        icon = L.icon({
          iconUrl: urlIconModule,
          iconSize: iconSize,
          iconAnchor: [10, 25],
          popupAnchor: [0, -40],
          className: borderColor
            ? `marker-svg-option circle-led-${borderColor.toLowerCase()}`
            : `marker-svg-option`,
        });
      }

      return icon;
    },
    customHTML(obj, moduleType) {
      let html = ``;
      html = `<div style="display: flex; width: 300px;font-family:'Nunito', sans-serif !important;" class="custom-popup">
              <img
                style="width: 150px; height: 200px;"
                src="${obj.img}"
              />
              <div class="pl-2">
                <p  style="font-size: 15px;line-height:1.2;">
                  <strong>${obj.name.toUpperCase()}</strong>
                </p>
                <p
                  class="font-italic"
                  style="font-size: 12px; margin-top: -10px;"
                >
                <i class="fas fa-map-marker-alt"></i>
                  ${obj.address}
                </p>
                <p
                  class=" font-italic"
                  style="font-size: 12px; margin-top: -10px;"
                >
                 <i class="far fa-calendar-alt"></i>
                  <span class="text-primary font-weight-bold">${
                    obj.datetime
                  }</span>
                </p>
                <p>
                <i class="fas fa-circle" style="color:${obj.statusColor}"></i>
                <span>${obj.statusName}</span>
                </p>
              </div>
            </div>`;
      return html;
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeLayerByLayer(layer) {
      this.map.eachLayer((l) => {
        if (l.options.layer) {
          if (l.options.layer.toUpperCase() == layer.toUpperCase()) {
            this.map.removeLayer(l);
          }
        }
      });
    },
    removeLayerAll() {
      if (this.map) {
        this.map.eachLayer((l) => {
          if (l.options.type !== "MAP") {
            this.map.removeLayer(l);
          }
        });
      }
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
  },
};
</script>

<style>
.leaflet-control-attribution a {
  display: none;
}
</style>
<style scoped>
#app-container-map {
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.app-container-map {
  position: relative;
  z-index: 1;
}
#map {
  height: 100%;
  z-index: 0;
  background-color: white;
}

@media screen and (max-width: 575px) {
  #app-container-map {
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (max-width: 767px) {
  #app-container-map {
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  #app-container-map {
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (min-width: 1200px) and (max-width: 1439px) {
  #app-container-map {
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
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
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(0);
}

#menu-left-click p {
  margin-bottom: 0;
}

.sidenav {
  height: calc(100vh - 140px);
  position: absolute;
  z-index: 1;
  width: 0;
  top: 0;
  background-color: white;
  overflow-x: hidden;
  /*transition: 0.5s;*/
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  padding-top: 0.5rem;
}

.chilren-list {
  display: none;
  position: absolute;
  top: 150px;
  left: 301px;
  height: calc(100vh - 290px);
  width: 280px;
  background: white;
  z-index: 9;
}
.toggle-chilren:hover {
  transform: scale(1.2);
}

@media screen and (max-width: 575px) {
  .sidenav {
    height: calc(100vh - 100px);
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (max-width: 767px) {
  .sidenav {
    height: calc(100vh - 100px);
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .sidenav {
    height: calc(100vh - 110px);
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}

@media screen and (min-width: 1200px) and (max-width: 1439px) {
  .sidenav {
    height: calc(100vh - 120px);
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  }
}
</style>
<style>
/* borderColor */
.circle-led-red {
  padding: 3px;
  border: 3px solid #f00;
  border-radius: 20px;
  box-shadow: rgba(250, 249, 249, 0.2) 0 -1px 7px 1px, inset #eccaca 0 -1px 9px,
    rgba(253, 1, 1, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}
.circle-led-green {
  padding: 3px;
  border: 3px solid rgb(60, 250, 50);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.circle-led-blue {
  padding: 3px;
  border: 3px solid rgb(0, 225, 255);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.circle-led-gray {
  padding: 3px;
  border: 3px solid rgb(200, 200, 200);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.circle-led-orange {
  padding: 3px;
  border: 3px solid rgb(255, 200, 0);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
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
@-webkit-keyframes blinkRed {
  from {
  }
  50% {
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

.modal-body {
  padding: 10px 15px !important;
}
</style>
<style >
.leaflet-popup-content {
  margin: 5px;
}
.leaflet-popup-content-wrapper {
  border-radius: 0;
}
</style>
<style>
@media screen and (min-width: 1200px) {
  #modal-detail-npl .modal-dialog .modal-content {
    width: 1380px;
    overflow: auto;
  }
}
</style>