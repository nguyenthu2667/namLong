<template>
  <div v-if="data">
    <b-row>
      <b-col lg="12">
        <b-alert class="text-center text-dark" show>
          <strong>
            {{ $t("maintenance").toUpperCase() }}
            {{ data.TreeName.toUpperCase() }} ({{ data.TreeNumber }})
            <div>
              <i>{{ data.FullAddress }}</i>
            </div>
          </strong>
        </b-alert>
      </b-col>
      <b-col lg="8" class="mb-2">
        <div class="box box_top">
          <h6>
            <b>1.{{ data.BeforeDescription.toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.current-status") }}:</b>
            {{ data.NoteAccept }}
          </div>
          <div>
            <b>{{ $t("modal.treatment-plan") }}:</b>
            {{ data.NoteSolution }}
          </div>
          <b-overlay :show="!isShow" rounded="sm">
            <carousel
              v-if="isShow && data.BeforeImages && data.BeforeImages.length > 0"
              :navigationEnabled="true"
              :autoplay="true"
              :loop="true"
              :autoplayLoop="true"
              :autoplayTimeout="3000"
              :perPage="3"
            >
              <template v-for="(img, i) in data.BeforeImages">
                <slide :key="i" class="slide">
                  <div class="container">
                    <b-img
                      :src="img.Links"
                      class="cusimage"
                      @click="showWallpaper(data.BeforeImages, i)"
                    />
                    <!-- <div v-show="i == 0" class="label-img">
                      + {{ data.BeforeImages.length }} Images
                    </div> -->
                  </div>
                </slide>
              </template>
            </carousel>
            <div
              v-else
              style="min-height: 200px; background: #dddddd"
              class="text-center text-muted text-small font-italic pt-4"
            >
              {{ $t("map.no-data") }}
            </div>
          </b-overlay>
        </div>
        <div class="box box_center mt-3">
          <h6>
            <b>2.{{ data.AfterDescription.toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.status-after-processing") }}:</b>
            {{ data.NoteResult }}
          </div>
          <b-overlay :show="!isShow" rounded="sm">
            <carousel
              v-if="isShow && data.AfterImages && data.AfterImages.length > 0"
              :navigationEnabled="true"
              :autoplay="true"
              :loop="true"
              :autoplayLoop="true"
              :autoplayTimeout="4000"
              :perPage="3"
            >
              <template v-for="(img, i) in data.AfterImages">
                <slide :key="i" class="slide">
                  <div class="container">
                    <b-img
                      :src="img.Links"
                      class="cusimage"
                      @click="showWallpaper(data.AfterImages, i)"
                    />
                    <!-- <div v-show="i == 0" class="label-img">
                      + {{ data.AfterImages.length }} Images
                    </div> -->
                  </div>
                </slide>
              </template>
            </carousel>
            <div
              v-else
              style="min-height: 200px; background: #dddddd"
              class="text-center text-muted text-small font-italic pt-4"
            >
              {{ $t("map.no-data") }}
            </div>
          </b-overlay>
        </div>
        <div class="box_bottom mt-3">
          <h6>
            <b>3.{{ data.ReturnDescription.toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.description-tree") }}:</b>
            <b-form-textarea
              disabled
              style="height: 100px"
              v-model="data.NoteReturn"
            ></b-form-textarea>
          </div>
        </div>
      </b-col>
      <b-col lg="4">
        <h6>
          <b>4.{{ $t("modal.operation-history").toUpperCase() }}</b>
        </h6>
        <template v-if="data['Histories']">
          <strong style="font-size: 16px">
            {{ data["Histories"][0].StatusName }}
          </strong>
          <p>
            <i>{{ $t("map.update-time") }}:</i>
            <b>{{ convertDateTime(data.StatusTime) }}</b>
          </p>
          <vue-perfect-scrollbar
            class="scroll dashboard-list-with-thumbs p-2"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
            style="height: 500px"
          >
            <ol class="numbered" :style="custom">
              <template v-for="(item, index) in data['Histories']">
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
                    {{ item.StatusName }}
                  </p>
                  <span class="font-italic">
                    {{ convertDateTime(item.CreateDate) }}
                  </span>
                  <br />
                  <span class="font-italic">
                    <b>Nội dung:</b>
                    {{ item.StatusNote }}
                  </span>
                  <hr />
                </li>
              </template>
            </ol>
          </vue-perfect-scrollbar>
        </template>
        <div>
          <b-button
            @click="showModal('modal-accept')"
            variant="success"
            class="cus_btn mb-2"
            :disabled="data.StatusID == 3 ? false : true"
          >
            {{ $t("pages.confirm-tree") }}
          </b-button>

          <b-button
            @click="showModal('modal-return')"
            variant="danger"
            class="cus_btn mb-2"
            :disabled="data.StatusID == 3 ? false : true"
          >
            {{ $t("dashboards.return") }}
          </b-button>
          <b-button @click="$bvModal.hide('modal-detail')" class="cus_btn">
            {{ $t("modal.close") }}
          </b-button>
        </div>
      </b-col>
    </b-row>
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
    <b-modal
      id="modal-accept"
      ref="modal-accept"
      :title="this.$t('form.question-confirm').toUpperCase()"
      ok-only
      @ok="handleApproval"
      @hide="
        () => {
          this.note = '';
        }
      "
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleApproval">
        <b-form-group :label="'Ghi chú xét duyệt (nếu có):'">
          <b-form-input id="note-accept-input" v-model="note"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-return"
      ref="modal-return"
      :title="this.$t('pages.reason-confirm-tree').toUpperCase()"
      ok-only
      @ok="handleReturn"
      @hide="
        () => {
          this.note = '';
        }
      "
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleReturn">
        <b-form-group :label="'Nhập lí do:'">
          <b-form-input id="note-return-input" v-model="note"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import treeAPI from "@/api/modules/treeAPI";

export default {
  props: ["dataModal", "objectData", "reload-data"],
  components: {
    "custom-carousel-component": BCarouselComponent,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      isShow: false,
      listImage: null,
      data: this.dataModal ? this.dataModal[0] : null,
      note: "",
    };
  },
  computed: {
    custom() {
      if (this.data["Histories"]) {
        return (
          "counter-reset: numbered-list " + (this.data["Histories"].length + 1)
        );
      }
    },
  },
  created() {
    this.data.BeforeImages = this.data.BeforeImages
      ? this.handleReturnDataFullImgs(this.data.BeforeImages)
      : this.data.BeforeImages;
    this.data.AfterImages = this.data.AfterImages
      ? this.handleReturnDataFullImgs(this.data.AfterImages)
      : this.data.AfterImages;
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  methods: {
    showModal(idModal) {
      setTimeout(() => {
        this.$bvModal.show(idModal);
      }, 200);
    },
    handleApproval() {
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ID: this.data.ID,
        ReferenceID: this.data.ReferenceID,
        NoteReturn: this.note,
      };
      treeAPI
        .postApproval(body)
        .then((val) => {
          this.note = "";
          if (val.status) {
            this.reloadData();
            this.$bvModal.hide("modal-detail");
            this.$bvModal.hide("modal-table-detail");
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleReturn() {
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ID: this.data.ID,
        ReferenceID: this.data.ReferenceID,
        NoteReturn: this.note,
      };
      treeAPI
        .postReturn(body)
        .then((val) => {
          this.note = "";
          if (val.status) {
            this.reloadData();
            this.$bvModal.hide("modal-detail");
            this.$bvModal.hide("modal-table-detail");
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleReturnDataFullImgs(array) {
      let result = array.map((it) => ({ ...it, ImageLink: it.Links }));
      return result;
    },
    //module-img
    showWallpaper(list, key) {
      let result = [];
      list.map((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.ImageLink, //img
        };
        result.push(obj);
      });
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
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm DD/MM/YYYY");
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
li a {
  min-height: 20px;
}
.box {
  min-height: 200px;
}
.cus_btn {
  display: block;
  width: 100%;
  border-radius: 10px;
  padding: 4px;
}
.slide {
  height: 200px;
  padding: 2px;
}
</style>
<style>
.box .VueCarousel-pagination {
  display: none;
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
  min-height: 30px;
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
</style>

<style scoped>
.rectangle-list li {
  background: whitesmoke;
  padding: 5px;
  margin-bottom: 2px;
}
</style>
<style scoped>
.container {
  height: 200px;
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
  height: 100%;
}
.container .cusimage {
  /* opacity: 0.3; */
}
</style>
