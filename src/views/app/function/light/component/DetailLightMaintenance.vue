<template>
  <div v-if="data">
    <b-row>
      <b-col lg="12">
        <b-alert class="text-center text-dark" show>
          <strong>
            {{ $t("maintenance").toUpperCase() }}
            {{ data.ReferenceName.toUpperCase() }} ({{ data.ReferenceID }})
            <div>
              <i>{{ data.ReferenceAddress }}</i>
            </div>
          </strong>
        </b-alert>
      </b-col>
      <b-col lg="8" class="mb-2">
        <div class="box box_top">
          <h6>
            <b>1.{{ $t("modal.processing-confirmation").toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.error-cause") }}:</b>
            {{ data.ErrorName }}
          </div>
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
              v-if="isShow && data.AcceptImages && data.AcceptImages.length > 0"
              :autoplay="true"
              :loop="true"
              :autoplayLoop="true"
              :autoplayTimeout="3000"
              :perPage="
                data.AcceptImages.length < 2
                  ? 1
                  : data.AcceptImages.length < 3
                  ? 2
                  : 3
              "
            >
              <template v-for="(img, i) in data.AcceptImages">
                <slide :key="i" class="slide">
                  <b-img
                    :src="img.ImageLinks"
                    class="list-thumbnail border-0"
                    style="
                      width: 100% !important;
                      height: 200px;
                      background: #f3f3f3;
                    "
                    @click="showWallpaper(data.AcceptImages, i)"
                  />
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
            <b>2.{{ $t("modal.complete-confirmation").toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.status-after-processing") }}:</b>
            {{ data.NoteResult }}
          </div>
          <b-overlay :show="!isShow" rounded="sm">
            <carousel
              v-if="isShow && data.ResultImages && data.ResultImages.length > 0"
              :autoplay="true"
              :loop="true"
              :autoplayLoop="true"
              :autoplayTimeout="4000"
              :perPage="
                data.ResultImages.length < 2
                  ? 1
                  : data.ResultImages.length < 3
                  ? 2
                  : 3
              "
            >
              <template v-for="(img, i) in data.ResultImages">
                <slide :key="i" class="slide">
                  <b-img
                    :src="img.ImageLinks"
                    class="list-thumbnail border-0"
                    style="
                      width: 100% !important;
                      height: 200px;
                      background: #f3f3f3;
                    "
                    @click="showWallpaper(data.ResultImages, i)"
                  />
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
            <b>3.{{ $t("modal.review-completed").toUpperCase() }}</b>
          </h6>
          <div>
            <b>{{ $t("modal.description-tree") }}:</b>
            <b-form-textarea
              disabled
              style="height: 100px"
              v-model="data.NoteResult"
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
                      color: item.StatusColor,
                    }"
                  >
                    {{ item.StatusName }}
                  </p>
                  <p class="font-italic">
                    {{ convertDateTime(item.StatusTime) }}
                  </p>
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
            @click="showModal('modal-accept-light', 1)"
            variant="success"
            class="cus_btn mb-2"
            :disabled="data.IsEditFrontend == 0 ? true : false"
          >
            {{ $t("pages.confirm-tree") }}
          </b-button>
          <b-button
            @click="showModal('modal-accept-light', 0)"
            variant="danger"
            class="cus_btn mb-2"
            :disabled="data.IsEditFrontend == 0 ? true : false"
          >
            {{ $t("dashboards.return") }}
          </b-button>
          <b-button
            @click="$bvModal.hide('modal-detail-light')"
            class="cus_btn"
          >
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
      id="modal-accept-light"
      ref="modal-accept-light"
      :title="titleForm"
      ok-only
      @ok="handleOk"
      @hidden="resetModalAccept"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleApproval">
        <b-form-group
          :invalid-feedback="$t('dashboards.cannot-be-left-blank')"
          :label-for="`note-${status}-input`"
          :state="acceptState"
          :label="
            accept
              ? $t('dashboards.note') +
                '(' +
                $t('dashboards.if-any').toLowerCase() +
                '):'
              : $t('dashboards.reason') +
                '(' +
                $t('dashboards.required').toLowerCase() +
                '):'
          "
        >
          <b-form-input
            :id="`note-${status}-input`"
            :state="acceptState"
            v-model="note"
            :required="accept ? false : true"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import lightAPI from "@/api/modules/lightAPI";

export default {
  props: ["dataModal", "objectData"],
  components: {
    "custom-carousel-component": BCarouselComponent,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      isShow: false,
      listImage: null,
      data: this.dataModal ? this.dataModal : null,
      note: "",
      noteReturn: "",
      // check field empty
      titleForm: "",
      labelForm: "",
      status: "",
      statusApproval: null,
      accept: null,
      acceptState: null,
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
    this.data["Histories"] = this.data["Histories"].reverse();
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  methods: {
    // check field empty
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.acceptState = valid; // thằng này check lỗi
      return valid;
    },
    resetModalAccept() {
      this.accept = null;
      this.acceptState = null;
      this.note = "";
      this.status = "";
    },
    // showmodal
    showModal(idModal, action) {
      if (action === 1) {
        this.titleForm = "Xét duyệt thiết bị";
        this.labelForm = "Ghi chú xét duyệt (nếu có):";
        this.status = "approval";
        this.statusApproval = action;
        this.accept = true;
      } else {
        this.titleForm = "Lí do trả về".toUpperCase();
        this.labelForm = "Nhập lí do:";
        this.status = "return-light";
        this.statusApproval = action;
        this.accept = false;
      }
      setTimeout(() => {
        this.$bvModal.show(idModal);
      }, 200);
    },
    // handle
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleApproval(this.statusApproval);
    },
    handleApproval(IsApproval) {
      if (!this.checkFormValidity()) {
        return;
      }
      let body = {
        ID: this.data.ID,
        StatusNote: this.note,
        IsApproval, // 1 là duyệt 0 là trả về
      };
      lightAPI
        .postApproval(body)
        .then((val) => {
          this.note = "";
          if (val.status) {
            this.$bvModal.hide("modal-detail-light");
            this.$bvModal.hide("modal-table-detail-light");
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
      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail-light");
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
          Image: item.ImageLinks, //img
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
