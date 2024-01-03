<!--suppress ALL -->
<template>
  <div id="app-container-map">
    <div id="map" class="map">
      <div id="left-description">
        <template v-if="layerTitle && layerTitle.toUpperCase() === 'SALINITY'">
          <p>
            <strong>{{ $t("map.salinity") }}</strong>
          </p>
          <p>
            <b-button
              disabled
              size="sm"
              class="mr-2"
              style="background-color: #00b3ff; border: none"
            ></b-button>
            <span>0 - 4</span>
          </p>
          <p>
            <b-button
              disabled
              size="sm"
              class="mr-2"
              style="background-color: #adff2f; border: none"
            ></b-button>
            <span>4 - 8</span>
          </p>
          <p>
            <b-button
              disabled
              size="sm"
              class="mr-2"
              style="background-color: #ffff00; border: none"
            ></b-button>
            <span>8 - 10</span>
          </p>
          <p>
            <b-button
              disabled
              size="sm"
              class="mr-2"
              style="background-color: #ffa500; border: none"
            ></b-button>
            <span>10 - 16</span>
          </p>
          <p>
            <b-button
              disabled
              size="sm"
              class="mr-2"
              style="background-color: #ff0000; border: none"
            ></b-button>
            <span>> 16</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
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
import { mapGetters } from "vuex";
import {
  defaultRegionCode,
  defaultRegionCenter,
  defaultMapType,
} from "@/constants/config";

export default {
  name: "Forecast",
  data() {
    return {
      timer: 500,
      defaultRegionCode,
      defaultRegionCenter,
      defaultMapType: "2D",
      map: null,
      dataMapNow: null,
      layerAction: null,
      coordinateClick: {
        lat: null,
        lng: null,
        name: null,
      },
      dataModal: null,
      animated: true,
      layerTitle: null,
    };
  },
  computed: {
    ...mapGetters({
      menuClickCount: "getMenuClickCount",
    }),
  },
  watch: {
    menuClickCount() {
      if (this.map) {
        this.map.invalidateSize();
      }
    },
    $route(to, from) {
      if (to.query.type) {
        if (to.query.type !== from.query.type) {
          if (this.map) {
            this.map.remove();
          }
          this.map = this.initMap(to.query.type);
        }
      }
      if (to.query.forecast) {
        if (to.query.forecast !== from.query.forecast) {
          if (this.layerAction) {
            this.map.removeLayer(this.layerAction);
          }
          this.openBounding(to.query.forecast);
        }
      } else {
        if (this.layerAction) {
          this.map.removeLayer(this.layerAction);
        }
      }
    },
  },
  created() {
    if (!this.$route.query.type) {
      this.$router.push({
        path: this.$route.fullPath,
        query: { type: this.defaultRegionCode + this.defaultMapType },
      });
    }
  },
  mounted() {
    this.map = this.initMap(this.$route.query.type);
    setTimeout(() => {
      if (this.$route.query.forecast) {
        this.openBounding(this.$route.query.forecast);
      }
    }, this.timer);
  },
  methods: {
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    initMap(type) {
      let mapDefault;
      if (type) {
        let string = "";
        for (let i = 0; i < type.length - 2; i++) {
          string = string + type[i];
        }
        let urlMap =
          "http://map.namlongtekgroup.com/index.php?r=" +
          string +
          "&t=" +
          type.split(string)[1] +
          "&z={z}&x={x}&y={y}&k=namlong_2021";
        mapDefault = L.tileLayer(urlMap, {
          minZoom: 1,
          maxZoom: 18,
          transparent: false,
        });
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
    addLayerStyle(type) {
      let string = "";
      if (this.$route.query.type) {
        for (let i = 0; i < this.$route.query.type.length - 2; i++) {
          string = string + this.$route.query.type[i];
        }
      }
      this.layerTitle = type.split("-")[0];
      if (this.layerAction) {
        this.map.removeLayer(this.layerAction);
      }
      let storeLayer = "NLG-" + string;
      let urlLayer =
        "http://tomcat.namlongtekgroup.com/geoserver/" +
        storeLayer +
        "/wms?services=WMS&version=1.1.1&request=GetMap";
      this.layerAction = L.tileLayer.wms(urlLayer, {
        layers: storeLayer + ":" + type,
        format: "image/png",
        transparent: true,
      });
      this.map.addLayer(this.layerAction);
    },
    openBounding(layers) {
      if (typeof layers === "string") {
        this.addLayerStyle(layers);
      } else {
        for (let i = 0; i < layers.length; i++) {
          this.addLayerStyle(layers[i]);
        }
      }
    },
  },
};
</script>

<style scoped>
#app-container-map {
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
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

#map {
  height: 100%;
  z-index: 0;
  background-color: white;
}

#left-description {
  display: block;
  position: absolute;
  z-index: 100000;
  width: auto;
  padding: 10px;
  left: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

#left-description p {
  margin-bottom: 5px;
}
</style>
<style>
.leaflet-control-attribution a {
  display: none;
}
</style>