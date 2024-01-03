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
        size="xl"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-colxx md="6">
              <b-form-group :label="dataForm.TreeID[0] + ':'">
                <b-form-select
                  v-model="dataForm.TreeID[1]"
                  :options="dataFormOption['TreeID']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.TreeNumber[0] + ':'"
                label-for="TreeNumber-input"
                :invalid-feedback="
                  $t('form.please-invalid') +
                  dataForm.TreeNumber[0].toLowerCase()
                "
                :state="stateForm.TreeNumber"
              >
                <b-form-input
                  class="text-right"
                  id="TreeNumber-input"
                  v-model="dataForm.TreeNumber[1]"
                  :state="stateForm.TreeNumber"
                  type="text"
                  min="0"
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.FullAddress[0] + ':'"
                label-for="FullAddress-input"
                :invalid-feedback="
                  $t('form.please-invalid') +
                  dataForm.FullAddress[0].toLowerCase()
                "
                :state="stateForm.FullAddress"
              >
                <b-form-input
                  class="text-left"
                  id="FullAddress-input"
                  v-model="dataForm.FullAddress[1]"
                  :state="stateForm.FullAddress"
                  required
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group :label="dataForm.TreeTypeID[0] + ':'">
                <b-form-select
                  v-model="dataForm.TreeTypeID[1]"
                  :options="dataFormOption['TreeTypeID']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.Lifespan[0] + ':'"
                label-for="Lifespan-input"
                :invalid-feedback="
                  $t('form.please-invalid') + dataForm.Lifespan[0].toLowerCase()
                "
                :state="stateForm.Lifespan"
              >
                <b-form-input
                  class="text-left"
                  id="Lifespan-input"
                  v-model="dataForm.Lifespan[1]"
                  :state="stateForm.Lifespan"
                  required
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group :label="dataForm.ManagementUnitID[0] + ':'">
                <b-form-select
                  v-model="dataForm.ManagementUnitID[1]"
                  :options="dataFormOption['ManagementUnitID']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group :label="dataForm.RouteID[0] + ':'">
                <treeselect
                  name="tree-select-input"
                  :searchable="searchable"
                  :close-on-select="closeOnSelect"
                  :options="dataFormOption['RouteID']"
                  :max-height="500"
                  :placeholder="placeholder"
                  :default-expand-level="keyShow"
                  :no-results-text="noResultsText"
                  v-model="dataForm.RouteID[1]"
                  :disable-branch-nodes="true"
                />
              </b-form-group>
              <b-form-group
                :label="dataForm.Long[0] + ':'"
                label-for="Long-input"
                :invalid-feedback="
                  $t('form.please-invalid') + dataForm.Long[0].toLowerCase()
                "
                :state="stateForm.Long"
              >
                <b-form-input
                  class="text-left"
                  id="Long-input"
                  v-model="dataForm.Long[1]"
                  :state="stateForm.Long"
                  required
                  type="text"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :label="dataForm.Lat[0] + ':'"
                label-for="Lat-input"
                :invalid-feedback="
                  $t('form.please-invalid') + dataForm.Lat[0].toLowerCase()
                "
                :state="stateForm.Lat"
                type="text"
              >
                <b-form-input
                  class="text-left"
                  id="Lat-input"
                  v-model="dataForm.Lat[1]"
                  :state="stateForm.Lat"
                  required
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6 p-3" class="map-control">
              <location-tree
                class="mt-2"
                ref="formMapTree"
                :lat-item="dataForm.Lat[1]"
                :lng-item="dataForm.Long[1]"
                :type-item="'tree'"
                :pidTree="dataForm.TreeNumber[1]"
                @emitDraggableLatLng="getLatLng"
              ></location-tree>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.TreeHeight[0] + ':'"
                label-for="TreeHeight-input"
                :invalid-feedback="
                  $t('form.please-invalid') +
                  dataForm.TreeHeight[0].toLowerCase()
                "
                :state="stateForm.TreeHeight"
              >
                <b-form-input
                  class="text-left"
                  id="TreeHeight-input"
                  v-model="dataForm.TreeHeight[1]"
                  :state="stateForm.TreeHeight"
                  required
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.TreeWidth[0] + ':'"
                label-for="TreeWidth-input"
                :invalid-feedback="
                  $t('form.please-invalid') +
                  dataForm.TreeWidth[0].toLowerCase()
                "
                :state="stateForm.TreeWidth"
              >
                <b-form-input
                  class="text-left"
                  id="TreeWidth-input"
                  v-model="dataForm.TreeWidth[1]"
                  :state="stateForm.TreeWidth"
                  required
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group
                :label="dataForm.FoliageWidth[0] + ':'"
                label-for="FoliageWidth-input"
                :invalid-feedback="
                  $t('form.please-invalid') +
                  dataForm.FoliageWidth[0].toLowerCase()
                "
                :state="stateForm.FoliageWidth"
              >
                <b-form-input
                  class="text-left"
                  id="FoliageWidth-input"
                  v-model="dataForm.FoliageWidth[1]"
                  :state="stateForm.FoliageWidth"
                  required
                ></b-form-input>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group :label="dataForm.TreeStatusID[0] + ':'">
                <b-form-select
                  v-model="dataForm.TreeStatusID[1]"
                  :options="dataFormOption['TreeStatusID']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-colxx>
            <!-- <b-colxx md="6">
              <b-form-group :label="dataForm.LinkAvatar[0] + ':'">
                <b-form-file v-model="avatar" plain></b-form-file>
              </b-form-group>
            </b-colxx> -->
            <b-colxx md="6">
              <b-form-group :label="dataForm.Images[0] + ':'">
                <b-form-file v-model="listImage" plain multiple></b-form-file>
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group>
                <template v-if="avatarBase64">
                  <b-img
                    :src="avatarBase64"
                    fluid
                    alt="avatar-image"
                    style="height: 160px"
                  ></b-img>
                </template>
                <!-- <template v-else>
                  <template v-if="dataForm.LinkAvatar[1]">
                    <b-img
                      :src="dataForm.LinkAvatar[1]"
                      fluid
                      alt="avatar-image"
                      style="height: 160px;"
                    ></b-img>
                  </template>
                </template> -->
              </b-form-group>
            </b-colxx>
            <b-colxx md="6">
              <b-form-group>
                <template v-if="listImageBase64 && listImageBase64.length > 0">
                  <template
                    v-if="dataForm.Images[1] && dataForm.Images[1].length > 0"
                  >
                    <div
                      class="absolute-div-glide"
                      @click="
                        showWallpaper(
                          listImageBase64.concat(dataForm.Images[1])
                        )
                      "
                    >
                      <div class="absolute-div-glide-text">
                        <p>
                          +
                          {{
                            listImageBase64.concat(dataForm.Images[1]).length
                          }}
                          {{ $t("modal.image") }}
                        </p>
                      </div>
                    </div>
                    <glide-component :settings="glideIconsOption">
                      <template
                        v-for="(item, index) in listImageBase64.concat(
                          dataForm.Images[1]
                        )"
                      >
                        <image-card
                          :id-image="'image-station' + index"
                          :src-image="item.Image"
                          :alt-image="'image-gallery' + index"
                          :height="'160px'"
                          :width="'100%'"
                        ></image-card>
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
                          + {{ listImageBase64.length }} {{ $t("modal.image") }}
                        </p>
                      </div>
                    </div>
                    <glide-component :settings="glideIconsOption">
                      <template v-for="(item, index) in listImageBase64">
                        <image-card
                          :id-image="'image-station' + index"
                          :src-image="item.Image"
                          :alt-image="'image-gallery' + index"
                          :height="'160px'"
                          :width="'100%'"
                        ></image-card>
                      </template>
                    </glide-component>
                  </template>
                </template>
                <template v-else>
                  <template
                    v-if="dataForm.Images[1] && dataForm.Images[1].length > 0"
                  >
                    <div
                      class="absolute-div-glide"
                      @click="showWallpaper(dataForm.Images[1])"
                    >
                      <div class="absolute-div-glide-text">
                        <p>
                          + {{ dataForm.Images[1].length }}
                          {{ $t("modal.image") }}
                        </p>
                      </div>
                    </div>
                    <glide-component :settings="glideIconsOption">
                      <template v-for="(items, key) in dataForm.Images[1]">
                        <image-card
                          :id-image="'image-station' + key"
                          :src-image="items.Image"
                          :alt-image="'image-gallery' + key"
                          :height="'160px'"
                          :width="'100%'"
                        ></image-card>
                      </template>
                    </glide-component>
                  </template>
                </template>
              </b-form-group>
            </b-colxx>
            <b-colxx md="12">
              <b-form-group :label="dataForm.Note[0] + ':'">
                <b-form-textarea
                  class="text-left"
                  v-model="dataForm.Note[1]"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-colxx>
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
    <div id="custom-spinner-load-tree">
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
import GlideComponent from "@/components/Carousel/GlideComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ImageCard from "@/components/Cards/ImageCard";
import LocationTree from "@/components/Map/tree/LocationTree";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import wfs from "@/constants/wfs";
import systemAPI from "@/api/modules/systemAPI";

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
    "menuCurrent",
    "keyShow",
  ],
  components: {
    Treeselect,
    "glide-component": GlideComponent,
    "custom-carousel-component": BCarouselComponent,
    "image-card": ImageCard,
    "location-tree": LocationTree,
  },
  data() {
    return {
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
      latLngState: null,
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
          let reader = new FileReader();
          reader.readAsDataURL(to[i]);
          setTimeout(() => {
            this.listImageBase64.push({
              ID: to[i].lastModified + i,
              Image: reader.result,
            });
          }, 500);
        }
      }
    },
  },
  methods: {
    getLatLng(v) {
      this.$emit("getLatLng", v);
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
      if (this.dataForm.Images[1] && this.dataForm.Images[1].length > 0) {
        this.dataForm.Images[1] = this.dataForm.Images[1].filter(
          (x) => x.ID.toString() !== imgDivName.id.toString()
        );
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
      this.latLngState = null;
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
            this.dataForm[key][2].toUpperCase() !== "STRING-TREE" &&
            this.dataForm[key][2].toUpperCase() !== "MUTEDNUMBER" &&
            this.dataForm[key][2].toUpperCase() !== "LOCATION-LNG" &&
            this.dataForm[key][2].toUpperCase() !== "MUTEDSTRINGCENTER" &&
            this.dataForm[key][2].toUpperCase() !== "DATETIME" &&
            this.dataForm[key][2].toUpperCase() !== "LONG" &&
            this.dataForm[key][2].toUpperCase() !== "STRING" &&
            this.dataForm[key][2].toUpperCase() !== "COLOR"
          ) {
            if (this.dataForm[key][2].toUpperCase() === "PHONE") {
              if (
                !pattern.test(this.dataForm[key][1]) ||
                this.dataForm[key][1].length !== 10
              ) {
                valid = false;
                this.stateForm[key] = false;
              } else {
                this.stateForm[key] = true;
              }
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
      let body;
      if (this.typeForm === "ADD") {
        body = {
          MenuIDCurent: this.menuCurrent,
        };
      } else if (this.typeForm === "EDIT") {
        body = {
          ID: this.idForm,
          MenuIDCurent: this.menuCurrent,
        };
      }
      let treeNumber, treeName;
      switch (this.dataForm.TreeNumber[1].toString().length) {
        case 1:
          treeNumber = "00" + this.dataForm.TreeNumber[1].toString();
          break;
        case 2:
          treeNumber = "0" + this.dataForm.TreeNumber[1].toString();
          break;
        case 3:
          treeNumber = this.dataForm.TreeNumber[1].toString();
          break;
        default:
          treeNumber = this.dataForm.TreeNumber[1].toString();
          break;
      }
      if (this.dataFormOption["TreeID"]) {
        let _dataOption = this.dataFormOption["TreeID"].filter(
          (x) => x["value"] === this.dataForm.TreeID[1]
        );
        if (_dataOption) {
          treeName = _dataOption[0]["text"];
        } else {
          treeName = "";
        }
      }
      let dataFormWFS = {
        StationID: [
          "",
          parseInt(this.dataForm.TreeID[1].toString() + treeNumber),
          "",
        ],
        StationLat: this.dataForm.Lat,
        StationLong: this.dataForm.Long,
        Name: ["", treeName, ""],
        Address: this.dataForm.FullAddress,
      };
      let objectDataWFS = wfs.getDataTypeForm(dataFormWFS, "Tree");
      let obj = {};
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (key === "Images") {
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
              let base64String = arr[i].Image.split(",")[1];
              if (base64String) {
                string = string + base64String + ";";
              } else {
                string = string + arr[i].Image + ";";
              }
            }
            obj[key] = string;
          } else {
            obj[key] = "";
          }
        } else if (key === "LinkAvatar") {
          let stringAva;
          if (this.avatarBase64) {
            stringAva = this.avatarBase64.split(",")[1];
          } else {
            stringAva = this.dataForm[key][1];
          }
          if (stringAva) {
            obj[key] = stringAva;
          } else {
            obj[key] = this.dataForm[key][1];
          }
        } else if (key === "TreeNumber" || key === "RouteID") {
          obj[key] = this.dataForm[key][1].toString();
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
      let spinnerDiv = document.getElementById("custom-spinner-load-tree");
      spinnerDiv.style.display = "block";
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit", val, objectDataWFS);
        })
        .catch((err) => {
          console.log(err);
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
<style scoped>
.map-control {
  height: 248px;
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

#custom-spinner-load-tree {
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
