<template>
  <div>
    <b-row class="m-0">
      <template v-if="listShow && listShow.length > 0">
        <b-colxx md="12">
          <vue-perfect-scrollbar
            class="scroll"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
            style="cursor: pointer; width: 100%"
          >
            <template v-for="(modul, index) in listShow">
              <div
                v-if="modul.data && modul.data.length > 0"
                :key="modul.code + 'a' + index"
                class="mb-1 mt-2 d-flex justify-content-between"
              >
                <div>
                  <span v-b-toggle="`collapse-${modul.code}`">
                    <i class="fas fa-sort-alt tcollapse mr-1"></i>
                  </span>
                  <strong>
                    {{ modul.title.toUpperCase() }}
                  </strong>
                  <span class="text-muted font-italic text-small ml-1">
                    ( {{ modul.data.length }} {{ $t("map.result") }} )
                  </span>
                </div>
                <div>
                  <i
                    @click="showModalFilter(modul.code)"
                    class="fillter fas fa-filter font-weight-bold"
                  ></i>
                </div>
              </div>
              <!-- search-modul -->
              <b-collapse
                :key="'collapse' + index"
                visible
                :id="`collapse-${modul.code}`"
              >
                <div
                  :key="'s' + index"
                  class="search mt-1 mb-2"
                  v-if="modul.code == 'TREE' && modul.data.length > 0"
                >
                  <b-form-input
                    id="search-input"
                    type="search"
                    size="sm"
                    v-model="searchTree"
                    :placeholder="$t('panel.search-input-map')"
                  ></b-form-input>
                </div>
                <div
                  :key="'s' + index"
                  class="search mt-1 mb-2"
                  v-if="modul.code == 'LIGHT' && modul.data.length > 0"
                >
                  <b-form-input
                    id="search-input"
                    type="search"
                    size="sm"
                    v-model="searchLight"
                    :placeholder="$t('panel.search-input-map')"
                  ></b-form-input>
                </div>
                <!-- data-modul -->
                <template
                  v-if="searchTree && modul.code.toUpperCase() == 'TREE'"
                >
                  <template v-for="(value, index) in finalDataTree">
                    <div
                      :class="{
                        'd-flex': true,
                        'flex-row': true,
                        'load-item-custom': true,
                        'mb-2': true,
                      }"
                      :key="modul.code + index"
                      @click="emitFlyToPoint(value)"
                    >
                      <span class="d-block position-relative">
                        <template v-if="value.img">
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="value.img"
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="
                                urlStatic +
                                value.folder +
                                '/' +
                                value.id +
                                '.jpg'
                              "
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                      </span>
                      <div class="load-text-custom pl-2" style="width: 100%">
                        <span>
                          <div
                            class="load-text-custom-over"
                            style="
                              overflow: hidden;
                              width: 180px;
                              white-space: nowrap;
                              text-overflow: ellipsis;
                              font-weight: 600;
                            "
                          >
                            {{ value.name }}
                          </div>
                          <div>
                            <p
                              class="
                                load-text-custom-over
                                text-muted
                                mb-1
                                text-small
                              "
                              style="
                                overflow: hidden;
                                width: 178px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                              "
                            >
                              {{ value.address }}
                            </p>
                          </div>
                          <div
                            class="
                              load-text-custom-over
                              text-primary text-small
                              font-weight-medium
                              d-none d-sm-block
                            "
                          >
                            {{ value.datetime }}
                          </div>
                          <div v-if="value.statusName">
                            <b-badge
                              variant="primary"
                              :style="
                                'font-weight: 600;background:' +
                                value.statusColor +
                                '!important'
                              "
                            >
                              {{ value.statusName }}
                            </b-badge>
                          </div>
                        </span>
                      </div>
                    </div>
                  </template>
                </template>
                <template
                  v-else-if="searchLight && modul.code.toUpperCase() == 'LIGHT'"
                >
                  <template v-for="(value, index) in finalDataLight">
                    <div
                      :class="{
                        'd-flex': true,
                        'flex-row': true,
                        'load-item-custom': true,
                        'mb-2': true,
                      }"
                      :key="modul.code + index"
                      @click="emitFlyToPoint(value)"
                    >
                      <span class="d-block position-relative">
                        <template v-if="value.img">
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="value.img"
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="
                                urlStatic +
                                value.folder +
                                '/' +
                                value.id +
                                '.jpg'
                              "
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                      </span>
                      <div class="load-text-custom pl-2" style="width: 100%">
                        <span>
                          <div
                            class="load-text-custom-over"
                            style="
                              overflow: hidden;
                              width: 180px;
                              white-space: nowrap;
                              text-overflow: ellipsis;
                              font-weight: 600;
                            "
                          >
                            {{ value.name }}
                          </div>
                          <div>
                            <p
                              class="
                                load-text-custom-over
                                text-muted
                                mb-1
                                text-small
                              "
                              style="
                                overflow: hidden;
                                width: 178px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                              "
                            >
                              {{ value.address }}
                            </p>
                          </div>
                          <div
                            class="
                              load-text-custom-over
                              text-primary text-small
                              font-weight-medium
                              d-none d-sm-block
                            "
                          >
                            {{ value.datetime }}
                          </div>
                          <div v-if="value.statusName">
                            <b-badge
                              variant="primary"
                              :style="
                                'font-weight: 600;background:' +
                                value.statusColor +
                                '!important'
                              "
                            >
                              {{ value.statusName }}
                            </b-badge>
                          </div>
                        </span>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <template v-for="(value, index) in modul.data">
                    <div
                      :class="{
                        'd-flex': true,
                        'flex-row': true,
                        'load-item-custom': true,
                        'mb-2': true,
                      }"
                      :key="modul.code + index"
                      @click="emitFlyToPoint(value)"
                    >
                      <span class="d-block position-relative">
                        <template v-if="value.img">
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="value.img"
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div style="width: 80px; height: 80px">
                            <b-img
                              :src="
                                urlStatic +
                                value.folder +
                                '/' +
                                value.id +
                                '.jpg'
                              "
                              style="
                                height: 100%;
                                width: 100%;
                                background: gray;
                              "
                              onerror="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                            />
                          </div>
                        </template>
                      </span>
                      <div class="load-text-custom pl-2" style="width: 100%">
                        <span>
                          <div
                            class="load-text-custom-over"
                            style="
                              overflow: hidden;
                              width: 180px;
                              white-space: nowrap;
                              text-overflow: ellipsis;
                              font-weight: 600;
                            "
                          >
                            {{ value.name }}
                          </div>
                          <div>
                            <p
                              class="
                                load-text-custom-over
                                text-muted
                                mb-1
                                text-small
                              "
                              style="
                                overflow: hidden;
                                width: 178px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                              "
                            >
                              {{ value.address }}
                            </p>
                          </div>
                          <div
                            class="
                              load-text-custom-over
                              text-primary text-small
                              font-weight-medium
                              d-none d-sm-block
                            "
                          >
                            {{ value.datetime }}
                          </div>
                          <div v-if="value.statusName">
                            <b-badge
                              variant="primary"
                              :style="
                                'font-weight: 600;background:' +
                                value.statusColor +
                                '!important'
                              "
                            >
                              {{ value.statusName }}
                            </b-badge>
                          </div>
                        </span>
                      </div>
                    </div>
                  </template>
                </template>
              </b-collapse>
            </template>
          </vue-perfect-scrollbar>
        </b-colxx>
      </template>
    </b-row>
    <b-modal
      :id="idModalFilter"
      title="TÌM, LỌC DỮ LIỆU"
      size="lg"
      centered
      @ok="submitContent"
    >
      <div class="box-filter">
        <template v-if="codeFilter.toUpperCase() == 'TREE'">
          <template v-if="codeFilter.toUpperCase() == 'TREE'">
            <FormFilterTree
              ref="formFilterTree"
              :data="dataForm"
              @reloadData="handleReload"
              @flyToRegion="handleFlyToRegion"
              @drawPolyGonWithin="handleDraw"
            ></FormFilterTree>
          </template>
          <template v-else>
            <div
              style="height: 300px"
              class="text-center text-muted font-weight-600 pt-4"
            >
              Tính nâng đang phát triễn !
            </div>
          </template>
        </template>
        <template v-if="codeFilter.toUpperCase() == 'LIGHT'">
          <template v-if="codeFilter.toUpperCase() == 'LIGHT'">
            <FormFilterLight
              ref="formFilterLight"
              :data="dataForm"
              :code="codeFilter"
              @reloadData="handleReload"
              @flyToRegion="handleFlyToRegion"
              @drawPolyGonWithin="handleDraw"
            ></FormFilterLight>
          </template>
          <template v-else>
            <div
              style="height: 300px"
              class="text-center text-muted font-weight-600 pt-4"
            >
              Tính nâng đang phát triễn !
            </div>
          </template>
        </template>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { urlImage } from "@/constants/config";
import FormFilterTree from "./tree/FormFilterTree.vue";
import FormFilterLight from "./light/FormFilterLight.vue";
import mapAPI from "@/api/modules/mapAPI.js";

export default {
  props: ["showNavMap", "listShow"],
  components: { FormFilterTree, FormFilterLight },
  data() {
    return {
      urlStatic: urlImage,
      //search-modul
      searchTree: "",
      searchLight: "",
      finalDataTree: [],
      finalDataLight: [],
      //option
      dataForm: null,
      idModalFilter: null,
      codeFilter: "",
    };
  },
  watch: {
    searchTree(to, from) {
      if (to && to !== "") {
        let array = [];
        let regex = new RegExp(to, "i");
        this.listShow
          .filter((m) => m.code.toUpperCase() == "TREE")[0]
          .data.forEach((val) => {
            if (
              val.name.search(regex) !== -1 ||
              val.address.search(regex) !== -1
            ) {
              array.push(val);
            }
          });
        this.finalDataTree = array;
      } else {
        this.finalDataTree = [];
      }
      if (to === "" || to === " ") {
        this.finalDataTree = [
          ...this.listShow.filter((m) => m.code.toUpperCase() == "TREE")[0]
            .data,
        ];
      }
    },
    searchLight(to, from) {
      if (to && to !== "") {
        let array = [];
        let regex = new RegExp(to, "i");
        this.listShow
          .filter((m) => m.code.toUpperCase() == "LIGHT")[0]
          .data.forEach((val) => {
            if (
              val.name.search(regex) !== -1 ||
              val.address.search(regex) !== -1
            ) {
              array.push(val);
            }
          });
        this.finalDataLight = array;
      } else {
        this.finalDataLight = [];
      }
      if (to === "" || to === " ") {
        this.finalDataLight = [
          ...this.listShow.filter((m) => m.code.toUpperCase() == "LIGHT")[0]
            .data,
        ];
      }
    },
  },
  methods: {
    handleDraw(modul) {
      if (modul?.length > 0) {
        let setModul = new Set(modul[0].Filters.split(",")); // băm vào địa chỉ cache
        //has lấy chứ ko đi kiếm
        let filterRouteID = this.dataForm[0].filter((obj) =>
          setModul.has(obj.RouteID)
        );
        this.$emit("drawPolyGonWithin", filterRouteID);
      } else {
        this.$emit("drawPolyGonWithin");
      }
    },
    handleFlyToRegion(arr) {
      //bug cần phải chia module
      let item = this.dataForm[0].find((item) => item.RouteID == arr?.id); //tim dc obj.lat obj.lng
      let objNew = {
        ...item,
        lat: item.Lat,
        lng: item.Long,
      };
      this.emitFlyToPoint(objNew);
    },
    handleReload(modul) {
      this.$emit("reloadData", modul);
    },
    submitContent() {
      if (this.codeFilter?.toUpperCase() === "TREE") {
        this.$refs.formFilterTree.handleSubmit();
      }
      if (this.codeFilter?.toUpperCase() === "LIGHT") {
        this.$refs.formFilterLight.handleSubmit();
      }
    },
    async showModalFilter(code) {
      this.idModalFilter = `modal-filter-${code}`;
      this.codeFilter = code;
      await this.geDataFilterByCode(code);
      setTimeout(() => {
        this.$bvModal.show(this.idModalFilter);
      }, 500);
    },
    geDataFilterByCode(code) {
      let body = {
        DataCode: code.toUpperCase(),
      };
      mapAPI
        .getOptionFilterByCode(body)
        .then((val) => {
          this.dataForm = val.status ? val.data : null;
        })
        .catch((err) => console.log(err));
    },
    emitFlyToPoint(obj) {
      this.$emit("fly-to", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
#search-input {
  height: 2rem;
}
#search-input:before {
  background-color: white;
}
.load-item-custom {
  height: 80px;
}
.load-item-custom:hover {
  background-color: #dfdfdf;
}
.fillter:hover {
  transform: scale(1.2);
}
.tcollapse:hover {
  transform: scale(1.2);
}
</style>
