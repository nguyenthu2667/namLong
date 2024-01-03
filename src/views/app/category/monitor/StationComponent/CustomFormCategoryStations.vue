<template>
  <div>
    <template v-if="typeForm === 'INFO'">
      <b-modal
        class="text-center"
        :id="nameForm"
        :title="titleForm"
        ok-only
        @hidden="resetModal"
        scrollable
        size="lg"
      >
        <b-row>
          <template
            v-for="items in Object.keys(dataForm)"
            v-if="Object.keys(dataForm).length > 0"
          >
            <template v-if="dataForm[items][2].toUpperCase() === 'ALERT'">
              <b-colxx md="12">
                <b-alert
                  class="text-center font-italic"
                  variant="success"
                  v-if="dataForm[items][1] === true"
                  show
                >
                  <strong>{{ $t("form.closed") }}</strong>
                </b-alert>
                <b-alert
                  class="text-center font-italic"
                  variant="danger"
                  v-else
                  show
                >
                  <strong>{{ $t("form.not-closed") }}</strong>
                </b-alert>
              </b-colxx>
            </template>
            <template v-else>
              <template
                v-if="
                  items.toUpperCase().search('NOTE') === -1 &&
                  items.toUpperCase().search('DESCRIPTION') === -1
                "
              >
                <b-colxx md="6">
                  <template v-if="dataForm[items][2].toUpperCase() === 'BIT'">
                    <b-form-group :label="dataForm[items][0]">
                      <b-form-checkbox
                        v-model="dataForm[items][1]"
                        switch
                        size="md"
                        disabled
                      >
                        <template v-if="dataForm[items][1] === true">
                          {{ $t("status.active") }}
                        </template>
                        <template v-else>
                          {{ $t("status.non-active") }}
                        </template>
                      </b-form-checkbox>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'DATE'"
                  >
                    <b-form-group :label="dataForm[items][0]">
                      <b-form-input
                        class="text-left"
                        :value="convertDate(dataForm[items][1])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <template v-else>
                    <template
                      v-if="
                        dataForm[items][2].toUpperCase().search('NUMBER') > -1
                      "
                    >
                      <b-form-group :label="dataForm[items][0]">
                        <b-form-input
                          class="text-right"
                          v-model="dataForm[items][1]"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </template>
                    <template v-else>
                      <b-form-group :label="dataForm[items][0]">
                        <b-form-input
                          class="text-left"
                          v-model="dataForm[items][1]"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </template>
                  </template>
                </b-colxx>
              </template>
              <template v-else>
                <b-colxx md="12">
                  <b-form-group :label="dataForm[items][0]">
                    <b-form-textarea
                      class="text-left"
                      v-model="dataForm[items][1]"
                      rows="3"
                      max-rows="6"
                      disabled
                    ></b-form-textarea>
                  </b-form-group>
                </b-colxx>
              </template>
            </template>
          </template>
        </b-row>
      </b-modal>
    </template>
    <template v-else>
      <b-modal
        :id="nameForm"
        :ref="nameForm"
        :title="titleForm"
        @hidden="resetModal"
        @ok="handleModal"
        v-if="dataForm"
        scrollable
        class="text-center"
        size="lg"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <template
              v-for="items in Object.keys(dataForm)"
              v-if="Object.keys(dataForm).length > 0"
            >
              <template
                v-if="
                  items.toUpperCase().search('NOTE') === -1 &&
                  items.toUpperCase().search('DESCRIPTION') === -1
                "
              >
                <b-colxx md="6">
                  <template v-if="dataForm[items][2].toUpperCase() === 'BIT'">
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-checkbox
                        v-model="dataForm[items][1]"
                        switch
                        size="md"
                      >
                        <template v-if="dataForm[items][1] === true">
                          {{ $t("status.active") }}
                        </template>
                        <template v-else>
                          {{ $t("status.non-active") }}
                        </template>
                      </b-form-checkbox>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'KEY'"
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-input
                        class="text-center"
                        v-model="dataForm[items][1]"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'DATE'"
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-datepicker
                        locale="vi"
                        v-model="dataForm[items][1]"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'SELECT'"
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-select
                        v-model="dataForm[items][1]"
                        :options="dataFormOption[items]"
                        size="sm"
                        @change="
                          handleChange(dataForm[items], dataFormOption[items])
                        "
                      ></b-form-select>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'EMAIL'"
                  >
                    <b-form-group
                      :label="dataForm[items][0] + ':'"
                      :label-for="items + '-input'"
                      :invalid-feedback="
                        $t('form.please-invalid') +
                        dataForm[items][0].toLowerCase()
                      "
                      :state="stateForm[items]"
                    >
                      <b-form-input
                        class="text-left"
                        :id="items + '-input'"
                        v-model="dataForm[items][1]"
                        :state="stateForm[items]"
                        type="email"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="
                      dataForm[items][2].toUpperCase().search('NUMBER') > -1
                    "
                  >
                    <b-form-group
                      :label="dataForm[items][0] + ':'"
                      :label-for="items + '-input'"
                      :invalid-feedback="
                        $t('form.please-invalid') +
                        dataForm[items][0].toLowerCase()
                      "
                      :state="stateForm[items]"
                    >
                      <b-form-input
                        class="text-right"
                        :id="items + '-input'"
                        v-model="dataForm[items][1]"
                        :state="stateForm[items]"
                        type="number"
                        min="0"
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'AVATAR'"
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-file v-model="avatar" plain></b-form-file>
                      <b-row class="mt-2">
                        <b-colxx md="12">
                          <b-form-group>
                            <template v-if="avatarBase64">
                              <b-img
                                :src="avatarBase64"
                                fluid
                                alt="avatar-image"
                                style="height: 160px"
                              ></b-img>
                            </template>
                            <template v-else>
                              <template v-if="dataForm[items][1]">
                                <b-img
                                  :src="dataForm[items][1]"
                                  fluid
                                  alt="avatar-image"
                                  style="height: 160px"
                                ></b-img>
                              </template>
                            </template>
                          </b-form-group>
                        </b-colxx>
                      </b-row>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'IMAGE'"
                  >
                    <template v-if="maxImage">
                      <b-form-group
                        :label="
                          dataForm[items][0] +
                          ': (' +
                          $t('form.maximum') +
                          ' ' +
                          maxImage +
                          ' ' +
                          $t('form.image').toLowerCase() +
                          ')'
                        "
                      >
                        <b-form-file
                          v-model="listImage"
                          plain
                          multiple
                        ></b-form-file>
                        <b-row class="mt-2">
                          <b-colxx md="12">
                            <b-form-group>
                              <template
                                v-if="
                                  listImageBase64 && listImageBase64.length > 0
                                "
                              >
                                <template
                                  v-if="
                                    dataForm[items][1] &&
                                    dataForm[items][1].length > 0
                                  "
                                >
                                  <div
                                    class="absolute-div-glide"
                                    @click="
                                      showWallpaper(
                                        listImageBase64.concat(
                                          dataForm[items][1]
                                        )
                                      )
                                    "
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        +
                                        {{
                                          listImageBase64.concat(
                                            dataForm[items][1]
                                          ).length
                                        }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(
                                        item, index
                                      ) in listImageBase64.concat(
                                        dataForm[items][1]
                                      )"
                                    >
                                      <template v-if="item.Image">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Image"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="item.Images">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Images"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                                <template v-else>
                                  <div
                                    class="absolute-div-glide"
                                    @click="showWallpaper(listImageBase64)"
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        + {{ listImageBase64.length }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(item, index) in listImageBase64"
                                    >
                                      <template v-if="item.Image">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Image"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="item.Images">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Images"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                              </template>
                              <template v-else>
                                <template
                                  v-if="
                                    dataForm[items][1] &&
                                    dataForm[items][1].length > 0
                                  "
                                >
                                  <div
                                    class="absolute-div-glide"
                                    @click="showWallpaper(dataForm[items][1])"
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        + {{ dataForm[items][1].length }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(items, key) in dataForm[items][1]"
                                    >
                                      <template v-if="items.Image">
                                        <image-card
                                          :id-image="'image-station' + key"
                                          :src-image="items.Image"
                                          :alt-image="'image-gallery' + key"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="items.Images">
                                        <image-card
                                          :id-image="'image-station' + key"
                                          :src-image="items.Images"
                                          :alt-image="'image-gallery' + key"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                              </template>
                            </b-form-group>
                          </b-colxx>
                        </b-row>
                      </b-form-group>
                    </template>
                    <template v-else>
                      <b-form-group :label="dataForm[items][0] + ':'">
                        <b-form-file
                          v-model="listImage"
                          plain
                          multiple
                        ></b-form-file>
                        <b-row class="mt-2">
                          <b-colxx md="12">
                            <b-form-group>
                              <template
                                v-if="
                                  listImageBase64 && listImageBase64.length > 0
                                "
                              >
                                <template
                                  v-if="
                                    dataForm[items][1] &&
                                    dataForm[items][1].length > 0
                                  "
                                >
                                  <div
                                    class="absolute-div-glide"
                                    @click="
                                      showWallpaper(
                                        listImageBase64.concat(
                                          dataForm[items][1]
                                        )
                                      )
                                    "
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        +
                                        {{
                                          listImageBase64.concat(
                                            dataForm[items][1]
                                          ).length
                                        }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(
                                        item, index
                                      ) in listImageBase64.concat(
                                        dataForm[items][1]
                                      )"
                                    >
                                      <template v-if="item.Image">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Image"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="item.Images">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Images"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                                <template v-else>
                                  <div
                                    class="absolute-div-glide"
                                    @click="showWallpaper(listImageBase64)"
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        + {{ listImageBase64.length }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(item, index) in listImageBase64"
                                    >
                                      <template v-if="item.Image">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Image"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="item.Images">
                                        <image-card
                                          :id-image="'image-station' + index"
                                          :src-image="item.Images"
                                          :alt-image="'image-gallery' + index"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                              </template>
                              <template v-else>
                                <template
                                  v-if="
                                    dataForm[items][1] &&
                                    dataForm[items][1].length > 0
                                  "
                                >
                                  <div
                                    class="absolute-div-glide"
                                    @click="showWallpaper(dataForm[items][1])"
                                  >
                                    <div class="absolute-div-glide-text">
                                      <p>
                                        + {{ dataForm[items][1].length }}
                                        {{ $t("modal.image") }}
                                      </p>
                                    </div>
                                  </div>
                                  <glide-component :settings="glideIconsOption">
                                    <template
                                      v-for="(items, key) in dataForm[items][1]"
                                    >
                                      <template v-if="items.Image">
                                        <image-card
                                          :id-image="'image-station' + key"
                                          :src-image="items.Image"
                                          :alt-image="'image-gallery' + key"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                      <template v-else-if="items.Images">
                                        <image-card
                                          :id-image="'image-station' + key"
                                          :src-image="items.Images"
                                          :alt-image="'image-gallery' + key"
                                          :height="'160px'"
                                          :width="'100%'"
                                        ></image-card>
                                      </template>
                                    </template>
                                  </glide-component>
                                </template>
                              </template>
                            </b-form-group>
                          </b-colxx>
                        </b-row>
                      </b-form-group>
                    </template>
                  </template>
                  <template v-else>
                    <b-form-group
                      :label="dataForm[items][0] + ':'"
                      :label-for="items + '-input'"
                      :invalid-feedback="
                        $t('form.please-invalid') +
                        dataForm[items][0].toLowerCase()
                      "
                      :state="stateForm[items]"
                    >
                      <b-form-input
                        class="text-left"
                        :id="items + '-input'"
                        v-model="dataForm[items][1]"
                        :state="stateForm[items]"
                        required
                        :disabled="
                          dataForm[items][4] &&
                          dataForm[items][4].toUpperCase() === 'DISABLED'
                            ? true
                            : false
                        "
                      ></b-form-input>
                    </b-form-group>
                  </template>
                </b-colxx>
              </template>
              <template v-else>
                <b-colxx md="12">
                  <b-form-group :label="dataForm[items][0] + ':'">
                    <b-form-textarea
                      class="text-left"
                      v-model="dataForm[items][1]"
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </b-form-group>
                </b-colxx>
              </template>
            </template>
            <template v-if="returnLocationState(dataForm)">
              <b-colxx md="12 mb-4" class="map-control">
                <p class="mb-1">{{ $t("form.map") }}:</p>
                <location-component
                  ref="formMapCustom"
                  :popup-location="true"
                  :lat-item="returnLocationLat"
                  :lng-item="returnLocationLng"
                ></location-component>
              </b-colxx>
            </template>
          </b-row>
        </form>
      </b-modal>
    </template>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="button-trash-wallpaper m-3">
        <b-button variant="outline-primary" @click="removeItemWallpaper">
          <i class="fas fa-trash"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImageGlide"
        ></custom-carousel-component>
      </div>
    </div>
    <div id="custom-spinner-load-submit">
      <div class="form-spinner">
        <div class="spinner">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="text-spinner">
          <p>{{ $t("cards.loading") }} ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import wfs from "@/constants/wfs";
import handling from "@/constants/handling";
import GlideComponent from "@/components/Carousel/GlideComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ImageCard from "@/components/Cards/ImageCard";
import LocationComponent from "@/components/Map/LocationComponent";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import systemAPI from "@/api/modules/systemAPI";

export default {
  components: {
    Treeselect,
    "glide-component": GlideComponent,
    "custom-carousel-component": BCarouselComponent,
    "image-card": ImageCard,
    "location-component": LocationComponent,
  },
  props: [
    "nameForm",
    "titleForm",
    "dataForm",
    "dataFormOption",
    "stateForm",
    "apiForm",
    "bodyFormDefault",
    "typeForm",
    "keyShow",
    "maxImage",
  ],
  data() {
    return {
      dataTypeOption: null,
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("form.find"),
      noResultsText: this.$t("form.no-result"),
      avatar: null,
      listImage: null,
      avatarBase64: null,
      listImageBase64: [],
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
      listImageGlide: null,
      //custom-bodyRequest
      geoCodeBySelected: null,
    };
  },
  async created() {
    await this.getDataType();
  },
  watch: {
    avatar(to, from) {
      if (to) {
        this.avatarBase64 = null;
        let reader = new FileReader();
        reader.readAsDataURL(to);
        setTimeout(() => {
          this.avatarBase64 = reader.result;
        }, 500);
      }
    },
    listImage(to, from) {
      if (to && to.length > 0) {
        this.listImageBase64 = [];
        for (let i = 0; i < to.length; i++) {
          if (this.maxImage && i === this.maxImage) {
            return;
          }
          let reader = new FileReader();
          reader.readAsDataURL(to[i]);
          setTimeout(() => {
            this.listImageBase64.push({
              ID: to[i].lastModified + i,
              Images: reader.result,
            });
          }, 500);
        }
      }
    },
  },
  computed: {
    returnLocationLng: function () {
      let key = Object.keys(this.dataForm);
      for (let i = 0; i < key.length; i++) {
        if (
          this.dataForm[key[i]][2].split("-")[1] &&
          this.dataForm[key[i]][2].split("-")[1].toUpperCase() === "LNG"
        ) {
          return this.dataForm[key[i]][1];
        }
      }
    },
    returnLocationLat: function () {
      let key = Object.keys(this.dataForm);
      for (let i = 0; i < key.length; i++) {
        if (
          this.dataForm[key[i]][2].split("-")[1] &&
          this.dataForm[key[i]][2].split("-")[1].toUpperCase() === "LAT"
        ) {
          return this.dataForm[key[i]][1];
        }
      }
    },
  },
  methods: {
    handleChange(item, option) {
      let result = option.find((el) => el.value == item[1]);
      if (result) {
        this.geoCodeBySelected = result.geoCode;
      }
    },
    returnLocationState(array) {
      let state = false;
      let result = Object.keys(array).filter(
        (x) => array[x][2].split("-")[0].toUpperCase() === "LOCATION"
      );
      if (result.length > 0) {
        state = true;
      }
      return state;
    },
    showWallpaper(list) {
      this.listImageGlide = list;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImageGlide = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
    removeItemWallpaper() {
      let imgDivName = document.getElementsByClassName(
        "carousel-item active"
      )[0].firstChild;
      if (this.listImageBase64 && this.listImageBase64.length > 0) {
        this.listImageBase64 = this.listImageBase64.filter(
          (x) => x.ID.toString() !== imgDivName.id.toString()
        );
      }
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (this.dataForm[key][2].toUpperCase() === "IMAGE") {
          if (this.dataForm[key][1] && this.dataForm[key][1].length > 0) {
            this.dataForm[key][1] = this.dataForm[key][1].filter(
              (x) => x.ID.toString() !== imgDivName.id.toString()
            );
          }
        }
      }
      this.hideWallpaper();
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    resetModal() {
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        this.dataForm[Object.keys(this.dataForm)[i]][1] = null;
        this.stateForm[Object.keys(this.dataForm)[i]] = null;
      }
      this.avatar = null;
      this.listImage = null;
      this.avatarBase64 = null;
      this.listImageBase64 = [];
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      let pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (
          key.toUpperCase().search("NOTE") === -1 &&
          key.toUpperCase().search("DESCRIPTION") === -1
        ) {
          if (
            this.dataForm[key][2].toUpperCase() !== "SELECT" &&
            this.dataForm[key][2].toUpperCase() !== "SELECT-TREE" &&
            this.dataForm[key][2].toUpperCase() !== "DATE" &&
            this.dataForm[key][2].toUpperCase() !== "BIT" &&
            this.dataForm[key][2].toUpperCase() !== "KEY" &&
            this.dataForm[key][2].toUpperCase() !== "IMAGE" &&
            this.dataForm[key][2].toUpperCase() !== "AVATAR"
          ) {
            // if (this.dataForm[key][2].toUpperCase() === 'PHONE') {
            //   if (
            //     !pattern.test(this.dataForm[key][1]) ||
            //     this.dataForm[key][1].length !== 10
            //   ) {
            //     valid = false
            //     this.stateForm[key] = false
            //   } else {
            //     this.stateForm[key] = true
            //   }
            // } else {
            //   this.stateForm[key] = document
            //     .getElementById(key + '-input')
            //     .checkValidity()
            // }
            if (
              this.dataForm[key][2].toUpperCase() === "PHONE" ||
              this.dataForm[key][2].toUpperCase() === "EMAIL"
            ) {
            } else {
              this.stateForm[key] = document
                .getElementById(key + "-input")
                .checkValidity();
            }
          }
        }
      }
      return valid;
    },
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let body = this.bodyFormDefault;

      let objectDataWFS;
      if (this.dataTypeOption) {
        let _dataOption = this.dataTypeOption.filter(
          (x) => x["DataTypeID"] === this.dataForm["DataTypeID"][1]
        );
        console.log(
          1,
          "_dataOption",
          this.dataTypeOption,
          this.dataForm["DataTypeID"][1]
        );
        if (_dataOption) {
          objectDataWFS = wfs.getDataTypeForm(
            this.dataForm,
            _dataOption[0]["GeoCode"]
          );
        } else {
          objectDataWFS = null;
        }
      }

      // let obj = {}
      // for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
      //   let key = Object.keys(this.dataForm)[i]
      //   obj[key] = this.dataForm[key][1]
      // }
      // Object.assign(body, obj);
      let obj = {};
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (this.dataForm[key][2].toUpperCase() === "AVATAR") {
          if (this.avatarBase64) {
            obj[key] = this.avatarBase64.split(",")[1];
          }
        } else if (this.dataForm[key][2].toUpperCase() === "IMAGE") {
          let arr = [];
          if (this.listImageBase64 && this.listImageBase64.length > 0) {
            if (this.dataForm[key][1] && this.dataForm[key][1].length > 0) {
              arr = this.listImageBase64.concat(this.dataForm[key][1]);
            } else {
              arr = this.listImageBase64;
            }
          } else {
            arr = this.dataForm[key][1];
          }
          let string = "";
          if (arr && arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].Image) {
                let base64String = arr[i].Image.split(",")[1];
                if (base64String) {
                  string = string + base64String + ";";
                } else {
                  string = string + arr[i].Image + ";";
                }
              } else if (arr[i].Images) {
                let base64String = arr[i].Images.split(",")[1];
                if (base64String) {
                  string = string + base64String + ";";
                } else {
                  string = string + arr[i].Images + ";";
                }
              }
            }
            obj[key] = string;
          } else {
            obj[key] = null;
          }
        } else {
          obj[key] = this.dataForm[key][1];
        }
      }
      Object.assign(body, obj);
      if (!objectDataWFS) {
        this.makeToast(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("form.can-not-add-point-to-layer")
        );
      }
      this.convertBody(body);
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          this.$emit("handle-submit", val, objectDataWFS);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertBody(body) {
      if (body.hasOwnProperty("DataTypeID") && this.dataFormOption.DataTypeID) {
        if (this.geoCodeBySelected == null) {
          body.GeoCode = this.dataFormOption.DataTypeID.find(
            (el) => el.value == body.DataTypeID
          ).geoCode;
        } else {
          body.GeoCode = this.geoCodeBySelected;
        }
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
    getDataType() {
      systemAPI
        .dataTypeListActive()
        .then((val) => {
          this.dataTypeOption = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.map-control {
  height: 400px;
}

.absolute-div-glide {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.8);
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

#fullscreen-wallpaper .button-trash-wallpaper {
  position: absolute;
  top: 3.3rem;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-trash-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
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

#custom-spinner-load-submit {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form-spinner {
  --size: 80px;

  width: var(--size);
  height: var(--size);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-spinner p {
  font-weight: bold;
  color: white;
}

.spinner {
  --size: 62px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  perspective: 800px;

  margin-bottom: 10px;
  /*margin-left: 10px;*/
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #2cfffe;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #fcc10f;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #ec1b60;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
