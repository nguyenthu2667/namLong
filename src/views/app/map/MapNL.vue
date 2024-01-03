<template>
  <div id="app-container-map" class="app-container-map">
    <div id="mySidenav" class="sidenav">
      <!--basic-menu-->
      <menu-right
        :listShow="listShow"
        :showNavMap="showNavMap"
        @fly-to="flyToPoint"
        @reloadData="handleReload"
      ></menu-right>
    </div>
    <div id="chilren-list" class="chilren-list">
      <chilren-list
        :listShowChilren="listShowChilren"
        @fly-to="flyToPoint"
        @show-menu="showMenuChilren"
      ></chilren-list>
    </div>
    <div id="map" class="map">
      <div id="menu-left-click">
        <p>
          {{ coordinateClick.lat + ", " + coordinateClick.lng }}
          <strong>
            <span class="pl-4 float-right">
              <b-link
                @click.prevent.stop="
                  copyCoordinate(
                    coordinateClick.lat + ', ' + coordinateClick.lng
                  )
                "
              >
                {{ $t("map.copy") }}
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
                  {{ $t("map.hide") }}
                </b-link>
              </span>
            </strong>
          </strong>
        </p>
      </div>
    </div>
    <b-modal
      id="modal-detail"
      v-if="dataModal"
      :size="'xl'"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <!-- fire -->
      <template v-if="dataModal.type.toUpperCase() === 'FIRE'">
        <fire-detail
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></fire-detail>
      </template>
      <!-- end-fire -->

      <!-- water, air-->
      <template
        v-if="
          dataModal.type.toUpperCase() === 'WATER' ||
          dataModal.type.toUpperCase() === 'AIR'
        "
      >
        <monitoring-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></monitoring-popup>
      </template>
      <!-- end water, air -->

      <!-- gas-restaurant -->
      <template v-if="dataModal.type.toUpperCase() === 'GASRESTAURENT'">
        <gas-restaurant-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        >
        </gas-restaurant-popup>
      </template>
      <!-- end gas-restaurant -->

      <!-- gas-restaurant -->
      <template v-if="dataModal.type.toUpperCase() === 'GASDETECTOR'">
        <gas-detector-popup :data-modal="dataModal"> </gas-detector-popup>
      </template>
      <!-- end gas-restaurant -->

      <!-- gas-family -->
      <template v-if="dataModal.type.toUpperCase() === 'GASFAMILY'">
        <gas-family-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        >
        </gas-family-popup>
      </template>
      <!-- end gas-family -->

      <!-- gas-store -->
      <template v-if="dataModal.type.toUpperCase() === 'GASSTORE'">
        <gas-store-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        >
        </gas-store-popup>
      </template>
      <!--end-gas-store -->

      <!-- waterway-cabinet-->
      <template v-if="dataModal.type.toUpperCase() === 'WATERWAY'">
        <waterway-cabinet-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></waterway-cabinet-popup>
      </template>
      <!-- end waterway-cabinet -->

      <!-- waterway-cabinet-->
      <template v-if="dataModal.type.toUpperCase() === 'WATERWAY-CHIL'">
        <waterway-station-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></waterway-station-popup>
      </template>
      <!-- end waterway-cabinet -->

      <!-- aqua-->
      <template v-if="dataModal.type.toUpperCase() === 'AQUA'">
        <aqua-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></aqua-popup>
      </template>
      <!-- end aqua -->

      <!-- light-cabinet -->
      <template v-if="dataModal.type.toUpperCase() === 'LIGHT'">
        <light-cabinet-popup
          :data-parent="dataModal"
          :dataHistory="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></light-cabinet-popup>
      </template>
      <template v-if="dataModal.type.toUpperCase() === 'LIGHT-CHIL'">
        <light-lamp-popup
          :data-parent="dataModal"
          :dataHistory="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        ></light-lamp-popup>
      </template>
      <!-- end light-cabinet -->

      <!-- radio -->
      <template v-if="dataModal.type.toUpperCase() === 'SMARTRADIO'">
        <radio-popup
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
        >
        </radio-popup>
      </template>
      <!-- end-radio -->

      <!-- led-station -->
      <template v-if="dataModal.type.toUpperCase() === 'SMARTLED'">
        <led-detail :detail="dataModal" :object-data="objectData"> </led-detail>
      </template>
      <!-- end-led-station -->

      <!-- tree -->
      <template v-if="dataModal.type.toUpperCase() === 'TREE'">
        <tree-detail
          :keyComponent="'MAP'"
          :data-parent="dataModal"
          :object-data="objectData"
          :dataMapNow="dataMapNow"
          :name-form="`collect-tree-modal-confirm`"
        >
        </tree-detail>
      </template>
      <!-- end-tree -->
    </b-modal>
  </div>
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
import handling from "@/constants/handling";
import { urlImage } from "@/constants/config";
import {
  defaultRegionCode,
  defaultRegionCenter,
  defaultMapType,
} from "@/constants/config";
import mapAPI from "@/api/modules/mapAPI";
import systemAPI from "@/api/modules/systemAPI.js";
import MenuRight from "./component/MenuRight.vue";
import ChilrenList from "./component/ChilrenList.vue";
import { mapGetters } from "vuex";
// import TreeTeaToggle from "./component/TreeTeaToggle.vue";
//modules
import FireDetail from "./popup-modals/FireDetail.vue";
import EnvironmentPopup from "./popup-modals/Environment";
import WaterWayCabinet from "./popup-modals/WaterwayCabinet";
import WaterwayStation from "./popup-modals/WaterwayStation";
import GasRestaurant from "./popup-modals/GasRestaurantDetail.vue";
import GasDetectorDetail from "./popup-modals/GasDetectorDetail";
import GasFamily from "./popup-modals/GasFamilyDetail.vue";
import GasStore from "./popup-modals/GasStoreDetail.vue";
import Aqua from "./popup-modals/Aqua.vue";
import LightCabinet from "./popup-modals/LightCabinet.vue";
import LightLamp from "./popup-modals/LightLamp.vue";
import RadionDetail from "./popup-modals/RadioDetail.vue";
import LedDetail from "./popup-modals/LedStation2.vue";
import TreeDetail from "./popup-modals/TreeDetail.vue";

export default {
  components: {
    // "tree-tea": TreeTeaToggle,
    "menu-right": MenuRight,
    "chilren-list": ChilrenList,
    "fire-detail": FireDetail,
    "led-detail": LedDetail,
    "radio-popup": RadionDetail,
    "monitoring-popup": EnvironmentPopup,
    "tree-detail": TreeDetail,
    "light-cabinet-popup": LightCabinet,
    "light-lamp-popup": LightLamp,
    "gas-restaurant-popup": GasRestaurant,
    "gas-detector-popup": GasDetectorDetail,
    "gas-family-popup": GasFamily,
    "gas-store-popup": GasStore,
    "waterway-cabinet-popup": WaterWayCabinet,
    "waterway-station-popup": WaterwayStation,
    "aqua-popup": Aqua,
    // "led-station-popup": LedStation,
  },
  data() {
    return {
      timer: 500,
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
          title: "Mực nước",
          code: "WATER",
          data: [],
        },
        {
          title: "Không khí",
          code: "AIR",
          data: [],
        },
        {
          title: "Cây xanh",
          code: "TREE",
          data: [],
        },
        {
          title: "Báo cháy",
          code: "FIRE",
          data: [],
        },
        {
          title: "Chiếu sáng",
          code: "LIGHT",
          data: [],
        },
        {
          title: "Thủy sản",
          code: "AQUA",
          data: [],
        },
        {
          title: "Phao phân luồng",
          code: "WATERWAY",
          data: [],
        },
        {
          title: "Biển quảng cáo",
          code: "SMARTLED",
          data: [],
        },
        {
          title: "Loa phát thanh",
          code: "SMARTRADIO",
          data: [],
        },
        {
          title: "Gas nhà hàng",
          code: "GASRESTAURENT",
          data: [],
        },
        {
          title: "Gas rò rĩ",
          code: "GASDETECTOR",
          data: [],
        },
        {
          title: "Gas gia đình",
          code: "GASFAMILY",
          data: [],
        },
        {
          title: "Cửa hàng gas",
          code: "GASSTORE",
          data: [],
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
    ...mapGetters(["regionCenter", "typeMap", "layers"]),
    objectData: function () {
      let sliceStringRoute = this.$route.path.split("/").slice(0, 3).join("/");
      for (let i = 0; i < this.menuRight.length; i++) {
        if (sliceStringRoute === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  watch: {
    isShowChilrenList(bol) {
      let el = document.getElementById("chilren-list");
      if (bol == true) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    },
    typeMap(to, from) {
      if (to !== from) {
        this.map.remove();
        this.map = this.initMap();
        this.getDataByCode();
      }
    },
    layers(to) {
      if (to) {
        this.getDataByCode();
      }
    },
  },
  async created() {
    if (this.$router.history._startLocation == "/user/login") {
      this.$router.history._startLocation = "null";
      location.reload();
    }
    await this.getListMenuRight();
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
    handleReload(modul) {
      switch (modul.DataTypeName.toUpperCase()) {
        case "TREE":
          this.listShow.forEach((m) => {
            if (m.code.toUpperCase() == "TREE") {
              m.data = [];
            }
          });
          this.removeLayerByLayer("TREE");
          this.handleAddLayersModule(modul, modul.DataProperties);
          break;
      }
    },
    showMenuChilren(bol) {
      this.isShowChilrenList = bol;
    },
    resetModal() {
      this.dataModal = null;
    },
    flyToPoint(item) {
      if (item?.FilterType?.toUpperCase() == "TREE") {
        this.map.flyTo([item.lat, item.lng], 15, {
          animate: true,
          duration: 2,
        });
      } else {
        this.map.flyTo([item.lat, item.lng], 19, {
          animate: true,
          duration: 2,
        });
      }
    },
    //copy-latlng
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
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
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
    //
    initMap() {
      let mapDefault, urlMap;
      switch (this.typeMap) {
        case "GG":
          urlMap = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
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
      //option layout-map
      let NLTLayer = L.tileLayer(
        "https://map.namlongtekgroup.com/index.php?r=" +
          this.defaultRegionCode +
          "&t=2D&z={z}&x={x}&y={y}&k=namlong_2021",
        {
          type: "MAP",
          minZoom: 1,
          maxZoom: 18,
        }
      );
      let googleStreetsLayer = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          type: "MAP",
          minZoom: 1,
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );
      let googleSatelliteLayer = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          type: "MAP",
          minZoom: 1,
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );
      let baseLayers = {
        "Google Streets": googleStreetsLayer,
        "Google Satellite": googleSatelliteLayer,
        "NLT Map 2D": NLTLayer,
      };
      //option layout-map end

      let map = L.map("map", {
        center: this.defaultRegionCenter,
        zoom: 12,
        //layers: mapDefault,
        layers: [googleStreetsLayer],
        fullscreenControl: true,
      });

      L.control.layers(baseLayers).addTo(map); //add button-control base-layouts

      map.addEventListener("click", this.openPoint);
      L.control.scale({ position: "bottomright" }).addTo(map);
      L.Control.zoomHome = L.Control.extend({
        options: {
          position: "topleft",
          zoomHomeText: '<i class="fa fa-info" style="line-height:1.65;"></i>',
          zoomHomeTitle: "Info",
        },

        onAdd: function (map) {
          var controlName = "gin-control-zoom",
            container = L.DomUtil.create("div", controlName + " leaflet-bar"),
            options = this.options;
          this._zoomHomeButton = this._createButton(
            options.zoomHomeText,
            options.zoomHomeTitle,
            controlName + "-home",
            container,
            this._zoomHome
          );

          return container;
        },
        stateNav(state) {
          if (this.showNavMap === false) {
            document.getElementById("chilren-list").style.left = "301px";
          } else {
            document.getElementById("chilren-list").style.left = "301px";
            document.getElementById("chilren-list").style.display = "none";
          }
          this.showNavMap = state;
          if (this.showNavMap === true) {
            if (window.innerWidth > 355 && window.innerWidth < 385) {
              document.getElementById("mySidenav").style.width = "270px";
              document.getElementById("map").style.marginLeft = "270px";
            } else if (window.innerWidth < 356) {
              document.getElementById("mySidenav").style.width = "235px";
              document.getElementById("map").style.marginLeft = "235px";
            } else {
              document.getElementById("mySidenav").style.width = "300px";
              document.getElementById("map").style.marginLeft = "300px";
            }
          } else {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("map").style.marginLeft = "0";
          }
        },

        _zoomHome: function (e) {
          e.preventDefault();
          this.stateNav(!this.showNavMap);
        },
        _createButton: function (html, title, className, container, fn) {
          var link = L.DomUtil.create("a", className, container);
          link.innerHTML = html;
          link.href = "#";
          link.title = title;

          L.DomEvent.on(link, "mousedown dblclick", L.DomEvent.stopPropagation)
            .on(link, "click", L.DomEvent.stop)
            .on(link, "click", fn, this)
            .on(link, "click", this._refocusOnMap, this);

          return link;
        },
      });
      var zoomHome = new L.Control.zoomHome();
      zoomHome.addTo(map);
      map.invalidateSize();
      return map;
    },
    getDataByCode() {
      if (this.layers?.length <= 0) {
        this.removeLayerAll();
        this.listShow = [
          {
            title: "Mực nước",
            code: "WATER",
            data: [],
          },
          {
            title: "Không khí",
            code: "AIR",
            data: [],
          },
          {
            title: "Cây xanh",
            code: "TREE",
            data: [],
          },
          {
            title: "Báo cháy",
            code: "FIRE",
            data: [],
          },
          {
            title: "Chiếu sáng",
            code: "LIGHT",
            data: [],
          },
          {
            title: "Thủy sản",
            code: "AQUA",
            data: [],
          },
          {
            title: "Phao phân luồng",
            code: "WATERWAY",
            data: [],
          },
          {
            title: "Biển quảng cáo",
            code: "SMARTLED",
            data: [],
          },
          {
            title: "Loa phát thanh",
            code: "SMARTRADIO",
            data: [],
          },
          {
            title: "Gas nhà hàng",
            code: "GASRESTAURENT",
            data: [],
          },
          {
            title: "Gas rò rĩ",
            code: "GASDETECTOR",
            data: [],
          },
          {
            title: "Gas gia đình",
            code: "GASFAMILY",
            data: [],
          },
          {
            title: "Cửa hàng gas",
            code: "GASSTORE",
            data: [],
          },
        ];
        return;
      }
      let body = {
        DataCode: this.layers.join(";"),
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.listShow = [
            {
              title: "Mực nước",
              code: "WATER",
              data: [],
            },
            {
              title: "Không khí",
              code: "AIR",
              data: [],
            },
            {
              title: "Cây xanh",
              code: "TREE",
              data: [],
            },
            {
              title: "Báo cháy",
              code: "FIRE",
              data: [],
            },
            {
              title: "Chiếu sáng",
              code: "LIGHT",
              data: [],
            },
            {
              title: "Thủy sản",
              code: "AQUA",
              data: [],
            },
            {
              title: "Phao phân luồng",
              code: "WATERWAY",
              data: [],
            },
            {
              title: "Biển quảng cáo",
              code: "SMARTLED",
              data: [],
            },
            {
              title: "Loa phát thanh",
              code: "SMARTRADIO",
              data: [],
            },
            {
              title: "Gas nhà hàng",
              code: "GASRESTAURENT",
              data: [],
            },
            {
              title: "Gas rò rĩ",
              code: "GASDETECTOR",
              data: [],
            },
            {
              title: "Gas gia đình",
              code: "GASFAMILY",
              data: [],
            },
            {
              title: "Cửa hàng gas",
              code: "GASSTORE",
              data: [],
            },
          ];
          this.dataMapNow = val.status ? val.data : null;
          this.removeLayerAll();
          this.dataMapNow.forEach((modul) => {
            if (
              modul.DataTypeName.toUpperCase() == "SMARTRADIO" ||
              modul.DataTypeName.toUpperCase() == "SMARTLED"
            ) {
              this.handleAddLayersModule(modul, modul.DataProperties.Mapnows);
            } else {
              this.handleAddLayersModule(modul, modul.DataProperties);
            }
          });
        })
        .catch((err) => console.log(err));
    },
    handleAddLayersModule(modul, arrOBJ) {
      arrOBJ.forEach((item) => {
        let obj = this.returnModuleData(item, modul);
        let icon = this.customIcon(obj, obj.moduleType);
        let temlatePopup = this.customHTML(obj, obj.moduleType);
        let groupMarker = L.markerClusterGroup({
          idGroupLayer: modul.DataTypeName.toUpperCase(),
          layer: modul.DataTypeName.toUpperCase(),
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
        if (modul.DataTypeName.toUpperCase() == "WATERWAY") {
          if (item.StationProperties?.length > 0) {
            let arr = item.StationProperties;
            arr.forEach((chil) => {
              let obj = this.returnModuleData(chil, modul, "waterway-chil");
              let icon = this.customIcon(
                obj,
                modul.DataTypeName,
                "waterway-chil"
              );
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
        this.listShow.forEach((item) => {
          if (item.code.toUpperCase() == modul.DataTypeName.toUpperCase()) {
            item.data.push(obj);
          }
        });
        this.map.addLayer(groupMarker);
      });
    },
    showModal(obj) {
      this.dataModal = obj;
      this.dataModal.type = obj.moduleType;
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
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
      if (modul.DataTypeName.toUpperCase() == "TREE") {
        obj.img = item.TreeImage;
        obj.address = item.FullAddress;
      }
      if (modul.DataTypeName.toUpperCase() == "FIRE") {
        obj.name =
          item.FireLocationName ?? item.LocationName ?? item.StationName;
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
      if (modul.DataTypeName.toUpperCase() == "AQUA") {
        obj.NodeProperties = obj.NodeProperties.map(
          ({ DeviceInfoProperties, ...x }) => {
            DeviceInfoProperties.forEach((y) => {
              x.MonitoringProperties.unshift({
                ...y,
                IndicatorCode: y.InfoCode,
                IndicatorValue: y.InfoValue,
                IndicatorName: y.InfoName,
              });
            });
            return {
              ...x,
            };
          }
        );
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
              <div class="pl-2">
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
      this.map.eachLayer((l) => {
        if (l.options.type !== "MAP") {
          this.map.removeLayer(l);
        }
      });
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
