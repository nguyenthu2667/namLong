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
      id="modal-detail-npl"
      class="modal-detail-npl"
      v-if="dataModal"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <!-- npl -->
      <template v-if="dataModal.type.toUpperCase() === 'TRUCK'">
        <TruckDetail :dataParent="dataModal"></TruckDetail>
      </template>
      <!-- end-npl -->
    </b-modal>
    <b-modal
      id="modal-detail-npl-gray"
      class="modal-detail-npl-gray"
      v-if="dataModal"
      size="md"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
    >
      <div>
        <b-row>
          <b-col lg="12">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>THÔNG TIN XE </strong>
              <hr class="m-0" />
            </div>
            <b-form-group label="Biển Số Xe">
              <b-form-input
                v-model="dataModal.StationName"
                disabled
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Tài Xế">
              <b-form-input value="Nguyễn Văn A" disabled></b-form-input>
            </b-form-group>
            <b-form-group label="Thời Gian Hoạt Động">
              <b-form-input value="5 giờ" disabled></b-form-input>
            </b-form-group>
            <b-form-group label="Doanh Thu">
              <b-form-input value="10,000,000" disabled></b-form-input>
            </b-form-group>
            <b-form-group label="Trạng Thái">
              <b-form-input value="Xe Đang Trống " disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
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
import mapAPI from "@/api/modules/mapAPI";
import systemAPI from "@/api/modules/systemAPI.js";
import MenuRight from "./component/MenuRightNPL.vue";
import ChilrenList from "./component/ChilrenList.vue";
import { mapGetters } from "vuex";
// import TreeTeaToggle from "./component/TreeTeaToggle.vue";
import Status from "@/components/Badges/StatusColor.vue";
//modules
import TruckDetail from "./popup-modals/TruckDetail.vue";

export default {
  components: {
    // "tree-tea": TreeTeaToggle,
    "menu-right": MenuRight,
    "chilren-list": ChilrenList,
    TruckDetail,
    Status,
  },
  data() {
    return {
      timer: 500,
      typeMap: "GG",
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
      console.log(1, "handleReload", modul);
    },
    showMenuChilren(bol) {
      this.isShowChilrenList = bol;
    },
    resetModal() {
      this.dataModal = null;
    },
    flyToPoint(item) {
      this.map.flyTo([item.lat, item.lng], 19, {
        animate: true,
        duration: 2,
      });
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
            title: "Xe Điều Độ",
            code: "TRUCK",
            data: [],
          },
        ];
      }
      this.dataMapNow = [
        {
          DataTypeName: "TRUCK",
          DataProperties: [
            {
              StationID: "X001",
              StationName: "59P1-12345",
              StationAddress: "12 Cát Lái, Quận 2, Hồ Chí Minh",
              UpdateTime: "10:00 21/11/2022",
              StatusName: "Đang đóng hàng",
              StatusColor: "orange",
              StationImage:
                "https://xetaicenter.com/wp-content/uploads/2021/03/xe-dau-keo-daewoo.png",
              Lat: 10.766028692333537,
              Long: 106.79540946731841,
              VanDon: "VD001",
            },
            {
              StationID: "X002",
              StationName: "59P1-12366",
              StationAddress: "43R Hồ Văn Huê, Phú Nhuận, Hồ Chí Minh",
              UpdateTime: "09:00 21/11/2022",
              StatusName: "Đang đi giao",
              StatusColor: "blue",
              StationImage:
                "https://thegioidecal.com/wp-content/uploads/decal-namcham-xetai.jpg",
              Lat: 10.7941878,
              Long: 106.6724396,
              VanDon: "VD002",
            },
            {
              StationID: "X003",
              StationName: "59P1-12366",
              StationAddress: "18 Cát Lái, Quận 2, Hồ Chí Minh",
              UpdateTime: "09:00 21/11/2022",
              StatusName: "Đang hạ rỗng",
              StatusColor: "green",
              StationImage:
                "https://thegioidecal.com/wp-content/uploads/decal-namcham-xetai-3.jpg",
              Lat: 10.766028692333537,
              Long: 106.75540946731841,
              VanDon: "VD003",
            },
            {
              StationID: "X004",
              StationName: "59P1-12366",
              StationAddress: "79 Phú Định, Bình Tân, Hồ Chí Minh",
              UpdateTime: "09:00 21/11/2022",
              StatusName: "Xe đang trống",
              StatusColor: "gray",
              StationImage:
                "https://vantailogivan.com/wp-content/uploads/2020/02/hinh-tam-giac-dau-xe-container.jpg",
              Lat: 10.7291665,
              Long: 106.6289407,
              VanDon: "",
            },
          ],
        },
      ];
      this.removeLayerAll();
      this.dataMapNow.forEach((modul) => {
        this.handleAddLayersModule(modul, modul.DataProperties);
      });
      // let body = {
      //   DataCode: this.layers.join(";"),
      // };
      // mapAPI
      //   .mapNowByCode(body)
      //   .then((val) => {
      //     console.log(1, "val", val);
      //     this.listShow = [
      //       {
      //         title: "Xe Điều Độ",
      //         code: "TRUCK",
      //         data: [],
      //       },
      //     ];
      //      this.dataMapNow = val.status ? val.data : null;
      //     this.removeLayerAll();
      //     this.dataMapNow.forEach((modul) => {
      //       this.handleAddLayersModule(modul, modul.DataProperties);
      //     });
      //   })
      //   .catch((err) => console.log(err));
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