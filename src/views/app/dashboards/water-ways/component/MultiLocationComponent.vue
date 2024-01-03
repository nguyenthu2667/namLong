<!--suppress ALL -->
<template>
  <div style="height: 100%">
    <div class="map-mini" id="map-mini"></div>
    <b-modal
      id="modal-detail"
      ref="modal-detail"
      hide-header
      v-if="dataForm"
      @hidden="resetChartDetail"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <popup :data-parent="dataForm" />
    </b-modal>
  </div>
</template>

<script>
import EnvironmentPopup from "@/views/app/map/popup-modals/WaterwayCabinet";
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
import handling from "@/constants/handling";
import { timer } from "@/constants/config";

export default {
  name: "MultiLocationComponent",
  props: ["latLng", "typeItem", "convertItems", "dataMapNow"],
  components: {
    popup: EnvironmentPopup,
  },
  data() {
    return {
      keyString: null,
      map: null,
      marker: null,
      defaultRegionCode,
      defaultMapType,
      defaultRegionCenter,
      dataForm: null,
      timer,
    };
  },
  watch: {
    latLng(to, from) {
      if (to) {
        this.drawMarker(to);
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
      if (this.latLng) {
        this.drawMarker(this.latLng);
      }
    }, 500);
  },
  computed: {
    ...mapGetters({
      menuClickCount: "getMenuClickCount",
    }),
  },
  methods: {
    resetChartDetail() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
      this.typeLoadData = "DAY";
      this.dataChart = null;
      this.titleForm = null;
      this.dataForm = null;
    },
    async showModal(item) {
      if (this.dataMapNow && this.dataMapNow.length > 0) {
        this.dataForm = this.dataMapNow.find(
          (data) => data.CabinetID == item.CabinetID
        );
      }
      if (this.dataForm) {
        setTimeout(() => {
          this.$bvModal.show("modal-detail");
        }, this.timer);
      }
    },
    initMap() {
      let urlMap = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      let mapDefault = L.tileLayer(urlMap, {
        minZoom: 9,
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      });
      let map = L.map("map-mini", {
        center: this.defaultRegionCenter,
        zoom: 10,
        layers: mapDefault,
        zoomControl: false,
      });
      map.invalidateSize();
      return map;
    },
    flyPoint(lat, lng) {
      this.map.flyTo([parseFloat(lat), parseFloat(lng)], 18, {
        animate: true,
        duration: 2,
      });
    },
    drawMarker(location) {
      if (location.length > 0) {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = new L.LayerGroup();
        for (let i = 0; i < location.length; i++) {
          let icon, marker;
          if (location[i].length > 2) {
            if (this.typeItem) {
              let statusColor = location[i][2];
              if (
                statusColor.toUpperCase() === "RED" ||
                statusColor.toUpperCase() === "BLUE" ||
                statusColor.toUpperCase() === "GRAY"
              ) {
              } else {
                statusColor = "orange";
              }
              icon = new L.Icon({
                iconUrl:
                  "https://imgsmartcity.namlongtekgroup.com/Icon/" +
                  statusColor +
                  "_" +
                  this.typeItem +
                  ".svg",
                iconSize: [30, 30],
                iconAnchor: [10, 25],
                popupAnchor: [0, -40],
                className: "marker-svg-option",
              });
            } else {
              icon = L.icon.pulse({
                iconSize: [30, 30],
                color: "blue",
                fillColor: "blue",
              });
            }
            let contentPopup, urlImage;
            if (this.convertItems[i].StationImage) {
              urlImage = this.convertItems[i].StationImage;
            }

            contentPopup =
              '<div style="display: flex; width: 300px;">' +
              '<img style="width: 150px; height: 200px" src="' +
              urlImage +
              '"/>' +
              "<div>" +
              '<p class="pl-3 pr-3" style="font-size: 15px; line-height: 1.3"><strong>' +
              this.convertItems[i].Name +
              "</strong></p>" +
              '<p class="pl-3 pr-3 font-italic" style="font-size: 12px; margin-top: -10px; line-height: 1.3">' +
              this.convertItems[i].Address +
              "</p>" +
              '<p class="pl-3 pr-3 font-italic" style="font-size: 12px; margin-top: -10px; line-height: 1.3">' +
              this.$t("map.update-time") +
              ": " +
              '<span class="text-danger font-weight-bold">' +
              handling.convertDateTime(this.convertItems[i].UpdateTime) +
              "</span></p>" +
              "</div>";
            ("</div>");
            marker = L.marker([location[i][0], location[i][1]], { icon: icon });
            let popup = L.popup({
              closeButton: false,
            }).setContent(contentPopup);
            marker.bindPopup(popup);
            marker.on("mouseover", function (e) {
              marker.openPopup();
            });
            marker.on("mouseout", function (e) {
              marker.closePopup();
            });
            marker.on("click", () => {
              this.showModal(this.convertItems[i]);
            });
          } else {
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
              icon = L.icon.pulse({
                iconSize: [30, 30],
                color: "blue",
                fillColor: "blue",
              });
            }
            let contentPopup, urlImage;
            if (this.convertItems[i].StationImage) {
              urlImage = this.convertItems[i].StationImage;
            }

            contentPopup =
              '<div style="display: flex; width: 300px;">' +
              '<img style="width: 150px; height: 200px" src="' +
              urlImage +
              '"/>' +
              "<div>" +
              '<p class="pl-3 pr-3" style="font-size: 15px; line-height: 1.3"><strong>' +
              this.convertItems[i].StationName +
              "</strong></p>" +
              '<p class="pl-3 pr-3 font-italic" style="font-size: 12px; margin-top: -10px; line-height: 1.3">' +
              this.convertItems[i].StationAddress +
              "</p>" +
              '<p class="pl-3 pr-3 font-italic" style="font-size: 12px; margin-top: -10px; line-height: 1.3">' +
              this.$t("map.update-time") +
              ": " +
              '<span class="text-danger font-weight-bold">' +
              handling.convertDateTime(this.convertItems[i].UpdateTime) +
              "</span></p>" +
              "</div>";
            ("</div>");
            marker = L.marker([location[i][0], location[i][1]], { icon: icon });
            let popup = L.popup({
              closeButton: false,
            }).setContent(contentPopup);
            marker.bindPopup(popup);
            marker.on("mouseover", function (e) {
              marker.openPopup();
            });
            marker.on("mouseout", function (e) {
              marker.closePopup();
            });
            let t = this.convertItems[i];
            marker.on("click", () => {
              this.showModal(this.convertItems[i]);
            });
          }
          this.marker.addLayer(marker);
        }
        setTimeout(() => {
          if (this.map) {
            this.map.addLayer(this.marker);
          }
        }, 200);
      }
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
};
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
