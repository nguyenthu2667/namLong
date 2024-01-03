<template>
  <div>
    <template v-if="typeForm === 'COLLECT-TREE'">
      <b-tabs content-class="mt-1" fill>
        <b-tab
          :title="$t('tabs.title.detailed-review').toUpperCase()"
          active
          v-if="dataForm"
        >
          <b-row>
            <b-col xl="4" class="padding-right-custom">
              <div class="box" style="width: 100%; height: 100%">
                <!-- <div class="fz-large fw-700 mb-2">
                    {{ dataForm.Images[0] + ':' }}
                  </div> -->
                <carousel
                  v-if="
                    isShow &&
                    dataForm.Images[1] &&
                    dataForm.Images[1].length > 0
                  "
                  :autoplay="true"
                  :loop="true"
                  :autoplayLoop="true"
                  :autoplayTimeout="3000"
                  :perPage="1"
                  :navigationEnabled="true"
                  class="custom-tree-navigation"
                  :navigationClickTargetSize="4"
                  navigationNextLabel="⮞"
                  navigationPrevLabel="⮜"
                >
                  <template v-for="(img, i) in dataForm.Images[1]">
                    <slide :key="i" class="slide" navigationNextLabel="->">
                      <div class="container">
                        <b-img
                          :src="img.Image"
                          class="cusimage"
                          style="
                            width: 100% !important;
                            background: #f3f3f3;
                            height: 608px;
                          "
                          @error="loadImgDefault"
                          @click="showWallpaper(dataForm.Images[1], i)"
                        />
                      </div>
                    </slide>
                  </template>
                </carousel>
                <div
                  v-else
                  style="min-height: 608px; background: #dddddd"
                  class="text-center text-muted text-small font-italic pt-4 d-flex justify-content-center align-items-center"
                >
                  <img
                    style="width: 100%; height: 100%"
                    :src="loadImgDefault"
                    alt=""
                    @error="loadImgDefault"
                  />
                </div>
              </div>
            </b-col>
            <b-col xl="8">
              <b-row>
                <b-col xl="6" class="padding-right-custom">
                  <div>
                    <div class="fz-large fw-700" style="margin-bottom: 0.65rem">
                      * Thông tin thực tế
                    </div>
                    <b-row>
                      <b-colxx xl="9" v-if="dataForm.TreeName.length > 0">
                        <b-form-group
                          :label="dataForm.TreeName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="3" v-if="dataForm.TreeNumber.length > 0">
                        <b-form-group
                          :label="dataForm.TreeNumber[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-right"
                            v-model="dataForm.TreeNumber[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <!-- custom CC, DK, tan -->
                      <b-colxx xl="4" v-if="dataForm.TreeHeight.length > 0">
                        <b-form-group
                          :label="dataForm.TreeHeight[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeHeight[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm.TreeWidth.length > 0">
                        <b-form-group
                          :label="dataForm.TreeWidth[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeWidth[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm.FoliageWidth.length > 0">
                        <b-form-group
                          :label="dataForm.FoliageWidth[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FoliageWidth[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <!-- end -->
                      <b-colxx xl="6" v-if="dataForm.PlantingYear.length > 0">
                        <b-form-group
                          :label="dataForm.PlantingYear[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            :value="
                              convertDateTimeYear(dataForm.PlantingYear[1])
                            "
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.Lifespan.length > 0">
                        <b-form-group
                          :label="dataForm.Lifespan[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.Lifespan[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="12" v-if="dataForm.TreeTypeName.length > 0">
                        <b-form-group
                          class="has-float-label"
                          :label="dataForm.TreeTypeName[0] + ':'"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeTypeName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="12"
                        v-if="dataForm.TreeStatusName.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeStatusName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeStatusName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </b-row>
                  </div>
                  <div>
                    <div
                      style="width: 100%"
                      class="d-flex align-items-center mb-2"
                    >
                      <div class="fz-large fw-700">
                        * Thông tin vị trí cây &nbsp;
                      </div>
                      <div>
                        {{
                          " (" +
                          dataForm.Long[1] +
                          " - " +
                          dataForm.Lat[1] +
                          ")"
                        }}
                      </div>
                    </div>
                    <b-row>
                      <b-colxx xl="12" v-if="dataForm.FullAddress.length > 0">
                        <b-form-group
                          :label="dataForm.FullAddress[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FullAddress[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="12">
                        <div
                          v-if="dataForm.Long && dataForm.Lat.length > 0"
                          class="mt-1"
                        >
                          <div class="fz-large fw-700">
                            <div class="map-control">
                              <location-component
                                ref="formMapTree"
                                :lat-item="dataForm.Lat[1]"
                                :lng-item="dataForm.Long[1]"
                                :type-item="'tree'"
                                :popup-location="false"
                              ></location-component>
                            </div>
                          </div>
                        </div>
                      </b-colxx>
                    </b-row>
                  </div>
                </b-col>
                <b-col xl="6">
                  <div>
                    <div class="fz-large fw-700" style="margin-bottom: 0.65rem">
                      * {{ $t("information") }}
                    </div>
                    <b-row>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.TreeCategorieName.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeCategorieName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeCategorieName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.TreeGroupName.length > 0">
                        <b-form-group
                          :label="dataForm.TreeGroupName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeGroupName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <!-- custom CC, DK, tan -->
                      <b-colxx xl="6" v-if="dataForm.CrownName.length > 0">
                        <b-form-group
                          :label="dataForm.CrownName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.CrownName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.LeafName.length > 0">
                        <b-form-group
                          :label="dataForm.LeafName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.LeafName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.ColorLeafName.length > 0">
                        <b-form-group
                          :label="dataForm.ColorLeafName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.ColorLeafName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <!-- end -->
                      <b-colxx
                        xl="6"
                        v-if="dataForm.ColorFlowerName.length > 0"
                      >
                        <b-form-group
                          class="has-float-label"
                          :label="dataForm.ColorFlowerName[0] + ':'"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.ColorFlowerName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.TreeHeightRefer.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeHeightRefer[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeHeightRefer[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.DiameterFoliagesRefer.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.DiameterFoliagesRefer[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-right"
                            v-model="dataForm.DiameterFoliagesRefer[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.DeciduousPeriod.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.DeciduousPeriod[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.DeciduousPeriod[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.FloweringPeriod.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.FloweringPeriod[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FloweringPeriod[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </b-row>
                  </div>
                  <div>
                    <div style="width: 100%" class="fz-large fw-700 mb-2">
                      * Thông tin người thu thập
                    </div>
                    <b-row>
                      <b-colxx xl="6" v-if="dataForm.EmployerName.length > 0">
                        <b-form-group
                          :label="dataForm.EmployerName[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.EmployerName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.UpdateTime.length > 0">
                        <b-form-group
                          :label="dataForm.UpdateTime[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-input
                            class="text-left"
                            :value="convertDateTime(dataForm.UpdateTime[1])"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="12" v-if="dataForm.Note.length > 0">
                        <b-form-group
                          :label="dataForm.Note[0] + ':'"
                          class="has-float-label"
                        >
                          <b-form-textarea
                            class="text-left"
                            v-model="dataForm.Note[1]"
                            disabled
                          ></b-form-textarea>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="12"
                        v-if="dataForm.ProcessID.length > 0"
                        class="mt-4"
                      >
                        <template v-if="dataForm.ProcessID[1] < 3">
                          <b-form-group>
                            <b-row>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkred;
                                    border-radius: 0;
                                  "
                                  @click="acceptModal(dataForm, false)"
                                >
                                  <strong>
                                    <i class="fad fa-undo-alt mr-2"></i>
                                    {{ $t("pages.non-confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkblue;
                                    border-radius: 0;
                                  "
                                  @click="acceptModal(dataForm, true)"
                                >
                                  <strong>
                                    <i class="fad fa-check mr-2"></i>
                                    {{ $t("pages.confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                            </b-row>
                          </b-form-group>
                        </template>
                        <template v-else>
                          <b-form-group :label="dataForm.ProcessID[0] + ':'">
                            <b-row>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkred;
                                    border-radius: 0;
                                  "
                                  disabled
                                >
                                  <strong>
                                    <i class="fad fa-undo-alt mr-2"></i>
                                    {{ $t("pages.non-confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkblue;
                                    border-radius: 0;
                                  "
                                  disabled
                                >
                                  <strong>
                                    <i class="fad fa-check mr-2"></i>
                                    {{ $t("pages.confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                            </b-row>
                          </b-form-group>
                        </template>
                      </b-colxx>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('tabs.title.process').toUpperCase()" v-if="dataForm">
          <b-row>
            <template v-if="dataForm['ProcessName'].length > 0">
              <b-col md="12" class="mb-2">
                <h3
                  class="font-weight-bold"
                  :style="{
                    color: dataForm['StatusColor'],
                  }"
                >
                  {{ dataForm["ProcessName"][1] }}
                </h3>
                <p class="font-italic">
                  {{ $t("modal.at") }}:
                  <strong>
                    {{ convertDateTime(dataForm["UpdateTime"][1]) }}
                  </strong>
                </p>
              </b-col>
              <b-col md="12">
                <template v-if="custom">
                  <ol class="numbered" :style="custom">
                    <template v-for="(item, index) in dataForm['Process']">
                      <li :key="index">
                        <p
                          class="ont-weight-bold mb-2"
                          :style="{
                            color:
                              item.StatusID === 5
                                ? 'red'
                                : item.StatusID === 4
                                ? 'green'
                                : 'black',
                          }"
                        >
                          {{ item.ProcessName }}
                        </p>
                        <p class="font-italic">
                          {{ item.Note }} -
                          {{ convertDateTime(item.CreateDate) }}
                        </p>
                        <hr />
                      </li>
                    </template>
                  </ol>
                </template>
              </b-col>
            </template>
            <template v-else>
              <b-col md="12">
                <strong class="text-danger font-italic">
                  {{ $t("modal.no-info") }}
                </strong>
              </b-col>
            </template>
          </b-row>
        </b-tab>
      </b-tabs>
    </template>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import GlideComponent from "@/components/Carousel/GlideComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ImageCard from "@/components/Cards/ImageCard";
import LocationComponent from "@/components/Map/LocationComponent";

export default {
  props: [
    "nameForm",
    "titleForm",
    "dataForm",
    "dataFormOption",
    "stateForm",
    "apiForm",
    "idForm",
    "typeForm",
  ],
  components: {
    "glide-component": GlideComponent,
    "custom-carousel-component": BCarouselComponent,
    "image-card": ImageCard,
    "location-component": LocationComponent,
  },
  watch: {
    dataForm() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
  },
  async created() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  data() {
    return {
      isShow: true,
      glideIconsOption: {
        gap: 6,
        perView: 3.2,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1.2,
          },
          575: {
            perView: 1.2,
          },
          1081: {
            perView: 1.7,
          },
          1600: {
            perView: 2.2,
          },
          1800: {
            perView: 2.7,
          },
        },
        hideNav: true,
        autoplay: 4000,
      },
      listImage: null,
      dataFormOptions: {
        CollectTypeID: [],
        RouteID: [],
        TreeID: [],
        GroupID: [],
      },
      dataCollectTreeByID: null,
    };
  },
  computed: {
    custom() {
      return (
        "counter-reset: numbered-list " + (this.dataForm["Process"].length + 1)
      );
    },
  },
  methods: {
    loadImgDefault(e) {
      return (e.target.src =
        "https://static.thenounproject.com/png/586523-200.png");
    },
    showWallpaper(list, key) {
      let result = [];
      list.forEach((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.Image, //img
        };
        result.push(obj);
      });
      // handle image index for click
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });
      this.listImage = result;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
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
    acceptModal(items, accept) {
      this.getOptionUnitManager();
      if (items.TreeTypeID[1] === 1) {
        this.getOptionTreeTypeActive();
        setTimeout(() => {
          this.makeToast(
            "warning",
            this.$t("form.warning").toUpperCase(),
            this.$t("tree-type-not-updated")
          );
        }, this.timer);
      }
      this.accept = accept;
      this.acceptItem = items;
      setTimeout(() => {
        this.$bvModal.show("modal-accept");
      }, 200);
    },
    resetModal() {
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        this.dataForm[Object.keys(this.dataForm)[i]][1] = null;
        this.stateForm[Object.keys(this.dataForm)[i]] = null;
      }
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm DD/MM/YYYY");
    },
    convertDateTimeYear(string) {
      let date = moment(string, "DD-MM-YYYY");
      return date.format("YYYY");
    },
  },
};
</script>
<style scoped>
.padding-right-custom {
  padding-right: 0px !important;
}

.map-control {
  height: 220px;
}

.absolute-div-glide {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 168px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  color: white;
  cursor: pointer;
}

.absolute-div-glide-text {
  margin: 4.5rem auto;
  width: 70%;
  text-align: center;
}

.absolute-div-glide-text p {
  font-size: 30px;
}

#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}

.foliage-width {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-55%, 50%);
}

.tree-width {
  position: absolute;
  top: 45%;
  left: 65%;
  transform: translate(-50%, 20%);
}

.tree-height {
  position: absolute;
  top: 30%;
  left: 90%;
  transform: translate(-20%, -50%);
}

.land-name {
  position: absolute;
  top: 45%;
  left: 20%;
  transform: translate(-50%, -20%);
}

.roots-depth {
  position: absolute;
  top: 60%;
  left: 90%;
  transform: translate(-20%, 0);
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 80%);
  }

  .tree-width {
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-60%, -50%);
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-15%, -50%);
  }

  .land-name {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -70%);
  }

  .roots-depth {
    position: absolute;
    top: 70%;
    left: 90%;
    transform: translate(-15%, -80%);
  }
}

@media screen and (min-width: 576px) and (max-width: 991px) {
  .padding-right-custom {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 50%);
    font-size: 12px;
  }

  .tree-width {
    position: absolute;
    top: 45%;
    left: 65%;
    transform: translate(-40%, -50%);
    font-size: 12px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 12px;
  }

  .land-name {
    position: absolute;
    top: 45%;
    left: 20%;
    transform: translate(-50%, -100%);
    font-size: 12px;
  }

  .roots-depth {
    position: absolute;
    top: 60%;
    left: 90%;
    transform: translate(-20%, -60%);
    font-size: 12px;
  }
}

@media screen and (min-width: 556px) and (max-width: 575px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 30);
    font-size: 12px;
  }

  .tree-width {
    position: absolute;
    top: 45%;
    left: 65%;
    transform: translate(-50%, -20%);
    font-size: 12px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 12px;
  }

  .land-name {
    position: absolute;
    top: 45%;
    left: 20%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }

  .roots-depth {
    position: absolute;
    top: 60%;
    left: 90%;
    transform: translate(-20%, -30%);
    font-size: 12px;
  }
}
/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .padding-right-custom {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
}
@media screen and (max-width: 555px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 30);
    font-size: 10px;
  }

  .tree-width {
    position: absolute;
    top: 40%;
    left: 70%;
    transform: translate(-60%, -40%);
    font-size: 10px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 10px;
  }

  .land-name {
    position: absolute;
    top: 35%;
    left: 20%;
    transform: translate(-40%, 0);
    font-size: 10px;
  }

  .roots-depth {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-30%, -30%);
    font-size: 10px;
  }
}
</style>
<style lang="scss" scoped>
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
  margin: 100px;
  padding: 20px;
}

ol.numbered {
  $bullet-line-width: 3px;
  $bullet-color: grey;
  $bullet-border-width: $bullet-line-width;
  $bullet-background-color: white;
  $bullet-size: 25px;
  border-left: $bullet-line-width solid $bullet-color;
  // counter-reset: numbered-list;
  margin-left: 10px;
  position: relative;
  list-style-type: none;

  li {
    font-size: 13px;
    line-height: 1.2;
    margin-bottom: 15px;
    padding-left: 30px;
    &:last-child {
      border-left: $bullet-line-width solid $bullet-background-color;
      margin-left: -$bullet-line-width;
    }

    &:before {
      $half-of-font-size: -0.5em;
      background-color: $bullet-color;
      border: $bullet-border-width solid $bullet-background-color;
      border-radius: 50%;
      color: $bullet-background-color;
      content: counter(numbered-list, decimal);
      counter-increment: numbered-list -1;
      display: block;
      font-weight: bold;
      width: $bullet-size + 5px;
      height: $bullet-size + 5px;
      margin-top: $half-of-font-size;
      line-height: $bullet-size;
      position: absolute;
      left: -$bullet-size / 2 - $bullet-line-width / 2 - $bullet-border-width;
      text-align: center;
    }
  }
}
.custom-image {
  border: 1px solid #d7d7d7;
  height: 150px;
  width: 100%;
}
</style>
<style scoped>
.fz-large {
  font-size: 14px;
}

.fw-700 {
  font-weight: 700;
}

.container {
  width: 100%;
  padding: 0;
  position: relative;
}
.label-img {
  position: absolute;
  z-index: 99999;
  top: 80px;
  left: 320px;
  font-size: 19px;
  font-weight: 700;
  width: 100%;
}
.cusimage {
  width: 100%;
}
.container .cusimage {
  /* opacity: 0.3; */
}
</style>
<style>
.header-custom-tree-modal {
  padding: 0.5rem 0.75rem !important;
}

.custom-tree-navigation {
  cursor: grab;
}

.custom-tree-navigation:active {
  cursor: grabbing;
}

.custom-tree-navigation:hover
  .VueCarousel-navigation
  .VueCarousel-navigation-button {
  opacity: 1;
}
.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-prev {
  left: 25px !important;
}

.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-next {
  right: 25px !important;
}

.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-button {
  color: white !important;
  background-color: black !important;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3 linear;
}

.box .VueCarousel-pagination {
  display: none;
}
</style>
