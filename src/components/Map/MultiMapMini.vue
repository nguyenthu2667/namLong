<!--suppress ALL -->
<template>
  <div style="height: 100%">
    <div class="map-mini" id="map-mini"></div>
    <b-modal
      :id="`modal-detail-${idModal}`"
      :name="`modal-detail-${idModal}`"
      v-if="dataModal"
      :size="'xl'"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <!-- radio -->
      <template v-if="dataModal.type.toUpperCase() === 'SMARTRADIO'">
        <radio-detail :data-parent="dataModal" :dataMapNow="dataMapNow">
        </radio-detail>
      </template>
      <!-- end-radio -->
      <!-- light-cabinet -->
      <template v-if="dataModal.type.toUpperCase() === 'LIGHT'">
        <light-cabinet-popup
          :data-parent="dataModal"
          :dataHistory="dataModal"
          :dataMapNow="dataMapNow"
        ></light-cabinet-popup>
      </template>
      <!-- end-light-cabinet -->
      <!-- light-station -->
      <template v-if="dataModal.type.toUpperCase() === 'LIGHT-CHIL'">
        <light-lamp-popup
          :data-parent="dataModal"
          :dataHistory="dataModal"
          :dataMapNow="dataMapNow"
        ></light-lamp-popup>
      </template>
      <!-- end-light-station -->
      <!-- led-station -->
      <template v-if="dataModal.type.toUpperCase() === 'SMARTLED'">
        <light-lamp-popup
          :data-parent="dataModal"
          :dataHistory="dataModal"
          :dataMapNow="dataMapNow"
        ></light-lamp-popup>
      </template>
      <!-- end-led-station -->
      <!-- monitor -->
      <template v-if="dataModal.type.toUpperCase() === 'WATER'">
        <monitoring-popup
          :data-parent="dataModal"
          :dataMapNow="dataMapNow"
        ></monitoring-popup>
      </template>
      <!-- end-monitor -->

      <!-- aqua-->
      <template v-if="dataModal.type.toUpperCase() === 'AQUA'">
        <aqua-popup
          :data-parent="dataModal"
          :dataMapNow="dataMapNow"
          :objectData="objectData"
        ></aqua-popup>
      </template>
      <!-- end aqua -->
      <!-- waterway -->
      <template v-if="dataModal.type.toUpperCase() === 'WATERWAY'">
        <water-way-cabinet-popup
          :data-parent="dataModal"
          :dataMapNow="dataMapNow"
        ></water-way-cabinet-popup>
      </template>
      <!-- end-waterway -->
      <!-- fire -->
      <template v-if="dataModal.type.toUpperCase() === 'FIRE'">
        <fire-popup
          :data-parent="dataModal"
          :dataMapNow="dataMapNow"
        ></fire-popup>
      </template>
      <!-- end-fire -->
    </b-modal>
  </div>
</template>

<script>
import L from "leaflet";
import "@/assets/leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse";
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import {
  urlImage,
  defaultRegionCode,
  defaultMapType,
  defaultRegionCenter,
} from "@/constants/config";
import handling from "@/constants/handling";
import RadioDetail from "@/views/app/map/popup-modals/RadioDetail.vue";
import LightCabinet from "@/views/app/map/popup-modals/LightCabinet.vue";
import LightLamp from "@/views/app/map/popup-modals/LightLamp.vue";
import EnvironmentPopup from "@/views/app/map/popup-modals/Environment";
import Aqua from "@/views/app/map/popup-modals/Aqua.vue";
import WaterwayCabinetPopup from "@/views/app/map/popup-modals/WaterwayCabinet";
import FirePopup from "@/views/app/map/popup-modals/FireDetail.vue";

export default {
  props: ["type", "dataMapNow", "objectData"],
  components: {
    "radio-detail": RadioDetail,
    "light-cabinet-popup": LightCabinet,
    "light-lamp-popup": LightLamp,
    "monitoring-popup": EnvironmentPopup,
    "aqua-popup": Aqua,
    "water-way-cabinet-popup": WaterwayCabinetPopup,
    "fire-popup": FirePopup,
  },
  data() {
    return {
      timer: 500,
      keyString: null,
      map: null,
      marker: null,
      urlStatic: urlImage,
      defaultRegionCode,
      defaultMapType,
      defaultRegionCenter,
      dataModal: null,
      idModal: null,
    };
  },
  mounted() {
    this.map = this.initMap();
    setTimeout(() => {
      this.removeLayerAll();
      this.renderLayers(this.dataMapNow);
      this.map.invalidateSize();
    }, 2000);
  },
  watch: {
    async dataMapNow(newData) {
      await this.removeLayerAll();
      await this.renderLayers(newData);
    },
  },
  methods: {
    resetModal() {
      this.dataModal = null;
    },
    showModal(obj) {
      this.dataModal = obj;
      this.dataModal.type = obj.moduleType;
      this.idModal = obj.StationID;
      setTimeout(() => {
        this.$bvModal.show(`modal-detail-${this.idModal}`);
      }, 500);
    },
    renderLayers(arr) {
      if (arr?.length <= 0) return;
      arr.forEach((modul) => {
        if (modul.DataTypeName.toUpperCase() == "SMARTRADIO") {
          this.handleAddLayersModule(modul, modul.DataProperties);
        } else {
          this.handleAddLayersModule(modul, modul.DataProperties);
        }
      });
    },
    handleAddLayersModule(modul, arrOBJ) {
      arrOBJ.forEach((item) => {
        let obj = this.returnModuleData(item, modul);
        let icon = this.customIcon(obj, obj.moduleType);
        let temlatePopup = this.customHTML(obj, obj.moduleType);
        let groupMarker = L.markerClusterGroup({
          type: "MARKER",
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false,
          disableClusteringAtZoom: 18,
        });
        let marker = new L.marker(new L.LatLng(obj.lat, obj.lng), {
          icon: icon,
        });
        let popup = L.popup({
          closeButton: false,
        }).setContent(temlatePopup);
        marker.bindPopup(popup);
        marker.on("mouseover", function (e) {
          marker.openPopup();
        });
        marker.on("mouseout", function (e) {
          marker.closePopup();
        });
        marker.on("click", () => this.showModal(obj));
        groupMarker.addLayer(marker);
        //MODULES-CHILREN
        if (modul.DataTypeName.toUpperCase() == "LIGHT") {
          if (item.LampProperties?.length > 0) {
            let arr = item.LampProperties;
            arr.forEach((chil) => {
              let obj = this.returnModuleData(chil, modul, "light-chil");
              let icon = this.customIcon(obj, modul.DataTypeName, "light-chil");
              let temlatePopup = this.customHTML(obj, obj.moduleType);
              let marker = new L.marker(new L.LatLng(obj.lat, obj.lng), {
                icon: icon,
              });
              let popup = L.popup({
                closeButton: false,
              }).setContent(temlatePopup);
              marker.bindPopup(popup);
              marker.on("mouseover", function (e) {
                marker.openPopup();
              });
              marker.on("mouseout", function (e) {
                marker.closePopup();
              });
              marker.on("click", () => this.showModal(obj));
              groupMarker.addLayer(marker);
            });
          }
        }
        //ADD-TO-MAP
        this.map.addLayer(groupMarker);
      });
    },
    returnModuleData(item, modul, keyChil) {
      let obj = {
        ...item,
        moduleType: modul.DataTypeName,
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
      if (modul.DataTypeName.toUpperCase() == "WATER") {
        obj.lat = item.StationLat;
        obj.lng = item.StationLong;
      }
      if (modul.DataTypeName.toUpperCase() == "AQUA") {
        obj.lat = item.StationLat;
        obj.lng = item.StationLong;
      }
      if (modul.DataTypeName.toUpperCase() == "FIRE") {
        obj.name = item.StationName;
      }
      if (modul.DataTypeName.toUpperCase() == "AIR") {
        obj.img = item.StationImage;
      }
      if (modul.DataTypeName.toUpperCase() == "LIGHT") {
        if (keyChil == "light-chil") {
          obj.moduleType = keyChil;
        }
      }
      if (modul.DataTypeName.toUpperCase() == "WATERWAY") {
        if (keyChil == "waterway-chil") {
          obj.moduleType = keyChil;
        }
      }
      return obj;
    },
    customIcon(obj, moduleType, keyChil) {
      let urlIconModule = `${this.urlStatic}Icon/${obj.statusColor}_${obj.moduleType}.svg`;
      let borderColor = null;
      if (
        moduleType.toUpperCase() == "AIR" ||
        moduleType.toUpperCase() == "WATER"
      ) {
        if (
          obj.statusColor.toUpperCase() == "BLUE" ||
          obj.statusColor.toUpperCase() == "RED" ||
          obj.statusColor.toUpperCase() == "GREEN" ||
          obj.statusColor.toUpperCase() == "GRAY"
        ) {
        } else {
          obj.statusColor = "orange";
          urlIconModule = `${this.urlStatic}Icon/${obj.statusColor}_${obj.moduleType}.svg`;
        }
      }
      if (keyChil == "light-chil") {
        urlIconModule = `${this.urlStatic}Icon/${obj.statusColor}_${moduleType}_lamp.svg`;
      }
      if (keyChil == "waterway-chil") {
        urlIconModule = obj.StationIcon;
        borderColor = obj.StatusLampColor;
      }
      let icon = L.icon({
        iconUrl: urlIconModule,
        iconSize: [30, 30],
        iconAnchor: [10, 25],
        popupAnchor: [0, -40],
        className: borderColor
          ? `marker-svg-option circle-led-${borderColor.toLowerCase()}`
          : `marker-svg-option`,
      });
      return icon;
    },
    customHTML(obj, moduleType) {
      let html = ``;
      html = `<div style="display: flex; width: 300px;font-family:'Nunito', sans-serif !important;">
              <img
                style="width: 150px; height: 200px;"
                src="${obj.img}"
              />
              <div style="background:#f7f7f7" class="pl-2">
                <p  style="font-size: 15px;line-height:1.2;">
                  <strong>${obj.name.toUpperCase()}</strong>
                </p>
                <p
                  class="font-italic"
                  style="font-size: 12px; margin-top: -10px;"
                >
                  ${obj.address}
                </p>
                <p
                  class="pl-3 pr-3 font-italic"
                  style="font-size: 12px; margin-top: -10px;"
                >
                  <div><strong class="text-muted">Cập nhật lúc:</strong></div>
                  <span class="text-primary font-weight-bold">${
                    obj.datetime
                  }</span>
                </p>
              </div>
            </div>`;
      return html;
    },
    removeLayerAll() {
      this.map.eachLayer((l) => {
        if (l.options.type !== "MAP") {
          this.map.removeLayer(l);
        }
      });
    },
    initMap() {
      let urlMap = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      let mapDefault = L.tileLayer(urlMap, {
        type: "MAP",
        minZoom: 1,
        maxZoom: 21,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      });
      let map = L.map("map-mini", {
        center: this.defaultRegionCenter,
        zoom: 11,
        layers: mapDefault,
        fullscreenControl: true,
      });
      map.invalidateSize();
      return map;
    },
    flyToPoint(item) {
      if (item.Lat && item.Long) {
        item.lat = item.Lat;
        item.lng = item.Long;
      }
      this.map.flyTo([item.lat, item.lng], 18, {
        animate: true,
        duration: 2,
      });
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
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
#map-mini {
  height: 100%;
  width: 100%;
  background-color: white;
  /*border: 1px solid #d7d7d7;*/
  z-index: 0;
}
</style>
