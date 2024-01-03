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
      ></b-modal>
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
              v-for="(items, index) in Object.keys(dataForm)"
              v-if="Object.keys(dataForm).length > 0"
            >
              <template
                v-if="
                  items.toUpperCase().search('NOTE') === -1 &&
                  items.toUpperCase().search('DESCRIPTION') === -1
                "
              >
                <b-colxx :key="index" md="6">
                  <template
                    v-if="
                      dataForm[items][2].toUpperCase() === 'BIT' ||
                      dataForm[items][2].toUpperCase() === 'MUTEDBIT'
                    "
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <b-form-checkbox
                        id="cus-checkbox"
                        v-model="dataForm[items][1]"
                        switch
                        size="md"
                      >
                        <template v-if="items === 'HasMarker'">
                          <template v-if="dataForm[items][1] === true">
                            {{ $t("template.yes") }}
                          </template>
                          <template v-else>
                            {{ $t("template.no") }}
                          </template>
                        </template>
                        <template v-else-if="items === 'SideType'">
                          <template v-if="dataForm[items][1] === true">
                            Bên phải
                          </template>
                          <template v-else> Bên trái </template>
                        </template>
                        <template v-else>
                          <template
                            v-if="
                              dataForm[items][4] &&
                              dataForm[items][4] ===
                                'IsScheduleInternalNotifications'
                            "
                          ></template>
                          <template v-else-if="dataForm[items][1] === true">
                            {{ $t("status.active") }}
                          </template>
                          <template v-else>
                            {{ $t("status.non-active") }}
                          </template>
                        </template>
                      </b-form-checkbox>
                      <template
                        v-if="
                          dataForm[items][4] &&
                          dataForm[items][4] ===
                            'IsScheduleInternalNotifications'
                        "
                      >
                        <template v-if="dataForm[items][1] === true">
                          <b-row>
                            <b-col lg="12" class="mb-2">
                              <b-form-timepicker
                                id="cus-timepicker"
                                class="cus-form-group"
                                v-model="time"
                                :locale="locale"
                              ></b-form-timepicker>
                            </b-col>
                            <b-col lg="12">
                              <b-form-datepicker
                                id="cus-datepicker"
                                class="cus-form-group"
                                size="sm"
                                :locale="locale"
                                v-model="date"
                              ></b-form-datepicker>
                            </b-col>
                          </b-row>
                        </template>
                      </template>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'COLOR'"
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <color-picker
                        v-model="dataForm[items][1]"
                        @change="changeColor"
                      ></color-picker>
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
                        :locale="locale"
                        v-model="dataForm[items][1]"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="
                      dataForm[items][2].toUpperCase() === 'MUTEDNUMBER'
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
                        v-model.number="dataForm[items][1]"
                        :state="stateForm[items]"
                        type="number"
                        min="1"
                      ></b-form-input>
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="dataForm[items][2].toUpperCase() === 'SELECT'"
                  >
                    <template
                      v-if="
                        dataForm[items][5] &&
                        dataForm[items][5] == 'COLORWARNING'
                      "
                    >
                      <div class="d-flex">
                        <div style="width: 100%">
                          <b-form-group :label="dataForm[items][0] + ':'">
                            <b-form-select
                              :disabled="
                                dataForm[items][4] == 'DISABLED' ? true : false
                              "
                              v-model="dataForm[items][1]"
                              :options="dataFormOption[items]"
                              size="sm"
                              @change="
                                handleChange(
                                  dataForm[items],
                                  dataFormOption[items]
                                )
                              "
                            ></b-form-select>
                          </b-form-group>
                        </div>
                        <div
                          :style="`
                            width: 40px;
                            margin-top: 27px;
                            height: 40px;
                            margin-left: 5px;
                            background: ${colorWarning};
                          `"
                        ></div>
                      </div>
                    </template>
                    <template v-else>
                      <b-form-group :label="dataForm[items][0] + ':'">
                        <b-form-select
                          :disabled="
                            disabledSELECT || dataForm[items][4] == 'DISABLED'
                              ? true
                              : false
                          "
                          v-model="dataForm[items][1]"
                          :options="dataFormOption[items]"
                          size="sm"
                          @change="
                            handleChange(dataForm[items], dataFormOption[items])
                          "
                        ></b-form-select>
                      </b-form-group>
                    </template>
                  </template>
                  <template
                    v-else-if="
                      dataForm[items][2].toUpperCase() === 'SELECT-TREE'
                    "
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <treeselect
                        name="tree-select-input"
                        :searchable="searchable"
                        :close-on-select="closeOnSelect"
                        :options="dataFormOption[items]"
                        :max-height="500"
                        :placeholder="placeholder"
                        :default-expand-level="keyShow"
                        :no-results-text="noResultsText"
                        v-model="dataForm[items][1]"
                        class="zindex-treeselect"
                      />
                    </b-form-group>
                  </template>
                  <template
                    v-else-if="
                      dataForm[items][2].toUpperCase() === 'SELECT-MULTI'
                    "
                  >
                    <b-form-group :label="dataForm[items][0] + ':'">
                      <treeselect
                        name="tree-select-multi-input"
                        :searchable="searchable"
                        :close-on-select="closeOnSelect"
                        :max-height="500"
                        :placeholder="placeholder"
                        :default-expand-level="keyShow"
                        :no-results-text="noResultsText"
                        :options="dataFormOption[items]"
                        v-model="dataForm[items][1]"
                        :multiple="true"
                        :limit="2"
                      />
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
                <template v-if="typeLayer">
                  <location-component
                    ref="formMapCustom"
                    :popup-location="true"
                    :type-item="typeLayer"
                    :lat-item="returnLocationLat"
                    :lng-item="returnLocationLng"
                  ></location-component>
                </template>
                <template v-else>
                  <location-component
                    ref="formMapCustom"
                    :popup-location="true"
                    :lat-item="returnLocationLat"
                    :lng-item="returnLocationLng"
                  ></location-component>
                </template>
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
import handling from "@/constants/handling";
import GlideComponent from "@/components/Carousel/GlideComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ImageCard from "@/components/Cards/ImageCard";
import LocationComponent from "@/components/Map/LocationComponent";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import systemAPI from "@/api/modules/systemAPI";
import moment from "moment";

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
    "bodyFormDefault",
    "dataForm",
    "dataFormOption",
    "stateForm",
    "apiForm",
    "typeForm",
    "keyShow",
    "maxImage",
    "typeLayer",
    "disabledSELECT",
  ],
  data() {
    return {
      color: null,
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("other.find"),
      noResultsText: this.$t("data.no-result"),
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
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      time: moment().format("HH:mm"),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      date: moment().format("YYYY-MM-DD"),
      //custom-bodyRequest
      geoCodeBySelected: null,
    };
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
    colorWarning() {
      if (
        this.dataFormOption.LevelCode &&
        this.dataFormOption.LevelCode.length > 0 &&
        this.dataForm.LevelCode
      ) {
        let option = this.dataFormOption.LevelCode;
        if (this.dataForm.LevelCode[1]) {
          let result = option.find(
            (el) => el.value == this.dataForm.LevelCode[1]
          );
          return result.statusColor;
        } else {
          return option[0].statusColor;
        }
      } else {
        return "gray";
      }
    },
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
    changeColor(e) {},
    handleChange(item, option) {
      let result = option.find((el) => el.value == item[1]);
      if (result) {
        this.geoCodeBySelected = result.geoCode;
        this.colorWarning = result.statusColor;
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
      return handling.convertDate(string);
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
            this.dataForm[key][2].toUpperCase() !== "SELECT-MULTI" &&
            this.dataForm[key][2].toUpperCase() !== "DATE" &&
            this.dataForm[key][2].toUpperCase() !== "BIT" &&
            this.dataForm[key][2].toUpperCase() !== "MUTEDBIT" &&
            this.dataForm[key][2].toUpperCase() !== "KEY" &&
            this.dataForm[key][2].toUpperCase() !== "IMAGE" &&
            this.dataForm[key][2].toUpperCase() !== "AVATAR" &&
            this.dataForm[key][2].toUpperCase() !== "COLOR"
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
            // }
            if (
              // this.dataForm[key][2].toUpperCase() === 'EMAIL' ||
              this.dataForm[key][2].toUpperCase() === "PHONE"
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
    convertBody(body) {
      if (body.hasOwnProperty("IsSale")) {
        body.IsSale = handling.convertBooleanToBit(body.IsSale);
      }
      if (body.hasOwnProperty("HasMarker")) {
        body.HasMarker = handling.convertBooleanToBit(body.HasMarker);
      }
      if (body.hasOwnProperty("SideType")) {
        body.SideType = handling.convertBooleanToBit(body.SideType);
      }
      if (body.hasOwnProperty("Note") && body.Note == null) {
        body.Note = "";
      }
      if (body.hasOwnProperty("IsSchedule")) {
        if (
          body.IsSchedule === false ||
          body.IsSchedule == 0 ||
          body.IsSchedule === null
        ) {
        } else {
          body.ScheduleDate = this.date + " " + this.time;
        }
        body.IsSchedule = handling.convertBooleanToBit(body.IsSchedule);
      }
      if (body.hasOwnProperty("DataKey")) {
        body.DataKey = body.DataKey.toString();
      }
      // if (body.hasOwnProperty('LevelCode')) {
      //   body.LevelCode = body.LevelCode.toString()
      // }
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
    handleModal(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidityModal()) {
        return;
      }
      let body = this.bodyFormDefault;
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
            let isType = arr.some((item) => item.Type == 1); // check co 1true
            if (isType == true) {
              if (arr.length > 1) {
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].Images) {
                    let base64String = arr[i].Images.split(",")[1];
                    if (base64String) {
                      string = string + base64String;
                    } else {
                      string = string + arr[i].Images;
                    }
                  }
                }
              }
              if (arr.length == 1) {
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].Image) {
                    let base64String = arr[i].Image.split(",")[1];
                    if (base64String) {
                      string = string + base64String;
                    } else {
                      string = string + arr[i].Image;
                    }
                  }
                }
              }
            } else {
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
      this.convertBody(body);
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit", val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.zindex-treeselect .vue-treeselect__menu-container {
  z-index: 9999 !important;
}
</style>
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
<style>
.cus-form-group {
  /* border-top-left-radius: 50px;
  border-bottom-left-radius: 50px; */
}
.cus-form-group button {
  /* background: #c8ced3; */
  padding-left: 15px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.cus-form-group label {
  text-align: center;
}
.vue-treeselect__control {
  padding: 5px;
}
</style>
<style>
.one-colorpicker {
  width: 100% !important;
}
.color-block {
  width: 100% !important;
}
.modal-dialog-scrollable .modal-body {
  overflow-y: unset;
  overflow: auto;
}
.one-colorpicker .one-colorpanel {
  top: -125px !important;
  left: 50px !important;
}
</style>
