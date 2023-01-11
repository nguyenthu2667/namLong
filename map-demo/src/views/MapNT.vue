<template>
  <!-- <div> -->
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="2"><tab-data-vue></tab-data-vue></b-col>
      <b-col cols="2"
        ><div class="input-group">
          <b-form-input
            v-model="text"
            placeholder="Tìm kiếm ..."
            class="search-box"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-primary" id="hide-re-pasnow"
              ><ion-icon name="search-outline"></ion-icon
            ></b-button>
          </b-input-group-append>
        </div>
        <div class="mt-2 value-serch">Value: {{ text }}</div>
      </b-col>

      <b-col cols="8">
        <div id="map"></div>
      </b-col>
    </b-row>
  </b-container>
  <!-- </div> -->
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TabDataVue from "@/components/tab/TabData.vue";
export default {
  components: {
    TabDataVue,
  },
  data() {
    return {
      // key: value,
      map: null,
      text: "",
    };
  },
  mounted() {
    var mapOptions = {
      center: [10.802440482709699, 106.67622267291574],
      zoom: 15,
    };
    var map = new L.map("map", mapOptions);

    var layer = new L.TileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    map.addLayer(layer);

    // let googleStreetsLayer = L.tileLayer(
    //   "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    //   {
    //     type: "MAP",
    //     minZoom: 1,
    //     maxZoom: 21,
    //     subdomains: ["mt0", "mt1", "mt2", "mt3"],
    //   }
    // );
    // var map = L.map("map", {
    //   center: [10.802440482709699, 106.67622267291574],
    //   zoom: 15,
    //   layers: [googleStreetsLayer],
    // });

    // L.marker([51.5, -0.09])
    //   .addTo(map)
    //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    //   .openPopup();
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
.value-serch {
  width: 210px;
  height: 210px;
  box-sizing: border-box;
  box-shadow: 0 5px 10px rgb(0 0 0 / 60%);
  border-radius: 10px;
  margin-left: 25px;
  margin-top: 150px !important;
}
.search-box {
  width: 150px;
  margin-left: 25px;
}
</style>
