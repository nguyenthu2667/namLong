<!--suppress ALL -->
<template>
  <div>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card class="custom-card-stream">
          <b-row>
            <span class="ml-3 mb-2">
              <a class="mr-2 view-icon" @click="typeGrid('single')">
                <i
                  class="fas fa-stop"
                  :class="{ 'grid-active': grid === 'single' }"
                ></i>
              </a>
              <a class="mr-2 view-icon" @click="typeGrid('multi-four')">
                <i
                  class="fas fa-th-large"
                  :class="{ 'grid-active': grid === 'multi-four' }"
                ></i>
              </a>
              <a class="mr-2 view-icon" @click="typeGrid('multi-nine')">
                <i
                  class="fas fa-th"
                  :class="{ 'grid-active': grid === 'multi-nine' }"
                ></i>
              </a>
              <a
                class="mr-2 view-icon"
                @click="mobileShow = !mobileShow"
                v-if="windowWidth < 767"
              >
                <i
                  class="fad fa-cctv"
                  :class="{ 'grid-active': !mobileShow }"
                ></i>
              </a>
            </span>
          </b-row>
          <template v-if="grid === 'single'">
            <b-row>
              <b-col md="4" lg="3" :class="{ 'd-none': mobileShow }">
                <vue-perfect-scrollbar
                  class="scroll slide-stream border mb-4"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <p>
                    <strong>{{ $t("cards.list") }} camera:</strong>
                  </p>
                  <template v-for="(item, k) in cameraList">
                    <span :key="k" @click.prevent="checkCamera(item.ID)">
                      <b-form-checkbox
                        class="ml-3 mb-2"
                        :checked="checkedCamera.includes(item.ID)"
                      >
                        <span>{{ item.CameraName }}</span>
                        <i
                          class="fad fa-cctv ml-2 grid-active"
                          v-if="checkedCamera[0] === item.ID"
                        ></i>
                      </b-form-checkbox>
                    </span>
                  </template>
                </vue-perfect-scrollbar>
              </b-col>
              <b-col md="8" lg="9">
                <div class="display-stream border mb-4" id="main-stream">
                  <div
                    class="absolute-default-item text-center"
                    id="absolute-default-item"
                  >
                    <p class="mb-0">
                      <i class="fad fa-video-slash" style="font-size: 40px"></i>
                    </p>
                    <p class="mb-0" style="font-size: 20px">
                      No connected camera
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </template>
          <template v-if="grid === 'multi-four'">
            <b-row>
              <b-col md="4" lg="3" :class="{ 'd-none': mobileShow }">
                <vue-perfect-scrollbar
                  class="scroll slide-stream border mb-4"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <p>
                    <strong>{{ $t("cards.list") }} camera:</strong>
                  </p>
                  <template v-for="(item, k) in cameraList">
                    <span :key="k" @click.prevent="checkFourCamera(item.ID)">
                      <b-form-checkbox
                        class="ml-3 mb-2"
                        :checked="checkedFourCamera.includes(item.ID)"
                        :disabled="
                          !checkedFourCamera.includes(item.ID) &&
                          checkedFourCamera.length > 3
                            ? true
                            : false
                        "
                      >
                        <span>{{ item.CameraName }}</span>
                        <i
                          class="fad fa-cctv ml-2 grid-active"
                          v-if="checkedFourCamera.includes(item.ID)"
                        ></i>
                      </b-form-checkbox>
                    </span>
                  </template>
                </vue-perfect-scrollbar>
              </b-col>
              <b-col md="8" lg="9">
                <b-row>
                  <b-col md="6" lg="6" class="col-four-camera-1">
                    <div
                      class="list-four-camera-default border"
                      id="main-four-stream-1"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-four-default-item-1"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                      <!--                      -->
                      <!--                      <div class="absolute-toggle-item text-right" id="absolute-four-toggle-item-1">-->
                      <!--                        <b-form-checkbox :checked="checkedFourFullHD.includes('main-four-stream-1')" name="check-button" switch size="sm" @change="checkFourFullHD('main-four-stream-1')">-->
                      <!--                          <span class="text-muted font-weight-bold">HD</span>-->
                      <!--                        </b-form-checkbox>-->
                      <!--                      </div>-->
                      <!--                      -->
                    </div>
                  </b-col>
                  <b-col md="6" lg="6" class="col-four-camera-2">
                    <div
                      class="list-four-camera-default border"
                      id="main-four-stream-2"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-four-default-item-2"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                      <!--                      -->
                      <!--                      <div class="absolute-toggle-item text-right" id="absolute-four-toggle-item-2">-->
                      <!--                        <b-form-checkbox :checked="checkedFourFullHD.includes('main-four-stream-2')" name="check-button" switch size="sm" @change="checkFourFullHD('main-four-stream-2')">-->
                      <!--                          <span class="text-muted font-weight-bold">HD</span>-->
                      <!--                        </b-form-checkbox>-->
                      <!--                      </div>-->
                      <!--                      -->
                    </div>
                  </b-col>
                  <b-col md="6" lg="6" class="col-four-camera-3">
                    <div
                      class="list-four-camera-default border"
                      id="main-four-stream-3"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-four-default-item-3"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                      <!--                      -->
                      <!--                      <div class="absolute-toggle-item text-right" id="absolute-four-toggle-item-3">-->
                      <!--                        <b-form-checkbox :checked="checkedFourFullHD.includes('main-four-stream-3')" name="check-button" switch size="sm" @change="checkFourFullHD('main-four-stream-3')">-->
                      <!--                          <span class="text-muted font-weight-bold">HD</span>-->
                      <!--                        </b-form-checkbox>-->
                      <!--                      </div>-->
                      <!--                      -->
                    </div>
                  </b-col>
                  <b-col md="6" lg="6" class="col-four-camera-4 mb-4">
                    <div
                      class="list-four-camera-default border"
                      id="main-four-stream-4"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-four-default-item-4"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                      <!--                      -->
                      <!--                      <div class="absolute-toggle-item text-right" id="absolute-four-toggle-item-4">-->
                      <!--                        <b-form-checkbox :checked="checkedFourFullHD.includes('main-four-stream-4')" name="check-button" switch size="sm" @change="checkFourFullHD('main-four-stream-4')">-->
                      <!--                          <span class="text-muted font-weight-bold">HD</span>-->
                      <!--                        </b-form-checkbox>-->
                      <!--                      </div>-->
                      <!--                      -->
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </template>
          <template v-if="grid === 'multi-nine'">
            <b-row>
              <b-col md="4" lg="3" :class="{ 'd-none': mobileShow }">
                <vue-perfect-scrollbar
                  class="scroll slide-stream border mb-4"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <p>
                    <strong>{{ $t("cards.list") }} camera:</strong>
                  </p>
                  <template v-for="(item, k) in cameraList">
                    <span :key="k" @click.prevent="checkNineCamera(item.ID)">
                      <b-form-checkbox
                        class="ml-3 mb-2"
                        :checked="checkedNineCamera.includes(item.ID)"
                        :disabled="
                          !checkedNineCamera.includes(item.ID) &&
                          checkedNineCamera.length > 8
                            ? true
                            : false
                        "
                      >
                        <span>{{ item.CameraName }}</span>
                        <i
                          class="fad fa-cctv ml-2 grid-active"
                          v-if="checkedNineCamera.includes(item.ID)"
                        ></i>
                      </b-form-checkbox>
                    </span>
                  </template>
                </vue-perfect-scrollbar>
              </b-col>
              <b-col md="8" lg="9">
                <b-row>
                  <b-col md="4" lg="4" class="col-nine-camera-1">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-1"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-1"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-2">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-2"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-2"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-3">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-3"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-3"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-4">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-4"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-4"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-5">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-5"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-5"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-6">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-6"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-6"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-7">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-7"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-7"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-8">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-8"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-8"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4" lg="4" class="col-nine-camera-9 mb-4">
                    <div
                      class="list-nine-camera-default border"
                      id="main-nine-stream-9"
                    >
                      <div
                        class="absolute-default-item text-center"
                        id="absolute-nine-default-item-9"
                      >
                        <p class="mb-0">
                          <i
                            class="fad fa-video-slash"
                            style="font-size: 40px"
                          ></i>
                        </p>
                        <p class="mb-0" style="font-size: 20px">
                          No connected camera
                        </p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
    <div id="custom-spinner-load-camera">
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
import cameraAPI from "@/api/modules/cameraAPI";
import handling from "@/constants/handling";

export default {
  data() {
    return {
      grid: "single",
      cameraList: null,
      player: null,
      playerFour: [],
      playerNine: [],
      checkedCamera: [],
      checkedFourCamera: [],
      checkedNineCamera: [],
      mobileShow: false,
      windowWidth: window.innerWidth,
      historyID: null,
      historyFourID: [],
      historyNineID: [],
      // checkedFullHD: [],
      // checkedFourFullHD: [],
      // checkedNineFullHD: [],
      wsLink: "wss://113.161.210.45:",
      // wsLink: 'ws://localhost:',
      // wsLink: 'ws://noibo.namlongtekgroup.com:',
      // wsLinkTestHD: 'ws://localhost:',
      // wsLinkTestHD: 'ws://noibo.namlongtekgroup.com:'
    };
  },
  watch: {
    grid(to, from) {
      if (to === "single" && this.cameraList.length > 0) {
        if (from === "multi-four") {
          this.resetFour();
        }
        if (from === "multi-nine") {
          this.resetNine();
        }
        // this.checkCamera(this.cameraList[0].ID)
      }
      if (to === "multi-four") {
        if (from === "single") {
          this.resetSingle();
        }
        if (from === "multi-nine") {
          this.resetNine();
        }
      }
      if (to === "multi-nine") {
        if (from === "single") {
          this.resetSingle();
        }
        if (from === "multi-four") {
          this.resetFour();
        }
      }
    },
    windowWidth(to, from) {
      if (to < 767) {
        this.mobileShow = true;
      } else {
        this.mobileShow = false;
      }
    },
  },
  async created() {
    await this.loadCameraSecurityOption();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.playerFour.length > 0) {
      for (let i = 0; i < this.playerFour.length; i++) {
        this.playerFour[i].destroy();
      }
    }
    if (this.playerNine.length > 0) {
      for (let j = 0; j < this.playerNine.length; j++) {
        this.playerNine[j].destroy();
      }
    }
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    typeGrid(string) {
      this.grid = string;
    },
    //
    // changeHD(stringMainID, listCamera) {
    //   let spinnerDiv = document.getElementById('custom-spinner-load-camera')
    //   spinnerDiv.style.display = 'block'
    //   let main = document.getElementById(stringMainID)
    //   let canvas = main.getElementsByTagName('canvas')
    //   if (canvas && canvas.length > 0) {
    //     if (canvas[0].id) {
    //       let idCanvas = canvas[0].id
    //       let hisCanvas = document.getElementById(idCanvas)
    //       main.removeChild(hisCanvas)
    //       let id, index, divNotConnect
    //       switch (this.grid) {
    //         case "single":
    //           id = parseInt(idCanvas.split("canvas-")[1])
    //           index = null
    //           break
    //         case "multi-four":
    //           id = parseInt(idCanvas.split("canvas-list-four-")[1])
    //           index = parseInt(stringMainID.split("main-four-stream-")[1])
    //           break
    //         case "multi-nine":
    //           id = parseInt(idCanvas.split("canvas-list-nine-")[1])
    //           index = parseInt(stringMainID.split("main-nine-stream-")[1])
    //           break
    //       }
    //       let camera = listCamera.filter(x => x.ID === id)
    //       let _canvas = document.createElement('canvas')
    //       _canvas.id = idCanvas
    //       _canvas.style.width = "100%"
    //       _canvas.style.height = "100%"
    //       let ws = this.wsLinkTestHD + (parseInt(camera[0].WsPort) + 50)
    //       let connected = new WebSocket(ws)
    //       setTimeout(() => {
    //         if (connected.readyState === 1) {
    //           connected.close()
    //           spinnerDiv.style.display = 'none'
    //           main.append(_canvas)
    //           let _idCanvas = document.getElementById(idCanvas)
    //           _idCanvas.addEventListener('click', function () {
    //             main.classList.toggle("zoom")
    //           })
    //           let _player = new JSMpeg.Player(ws, {canvas: _idCanvas})
    //           switch (this.grid) {
    //             case "single":
    //               this.player = _player
    //               break
    //             case "multi-four":
    //               this.playerFour[index] = _player
    //               break
    //             case "multi-nine":
    //               this.playerNine[index] = _player
    //               break
    //           }
    //         }
    //       }, 1500)
    //     }
    //   }
    // },
    // changeSD(stringMainID) {
    //   let main = document.getElementById(stringMainID)
    //     let canvas = main.getElementsByTagName('canvas')
    //     if (canvas && canvas.length > 0) {
    //       let idCanvas = 'canvas-list-nine-' + this.historyNineID[j].id}
    // },
    // checkFourFullHD(stringID){
    //   if (!this.checkedFourFullHD.includes(stringID)) {
    //     this.checkedFourFullHD.push(stringID)
    //     this.changeHD(stringID, this.cameraList)
    //   } else {
    //     this.checkedFourFullHD.splice(this.checkedFourFullHD.indexOf(stringID), 1)
    //   }
    // },
    //
    resetNine() {
      if (this.playerNine.length > 0) {
        for (let i = 0; i < this.playerNine.length; i++) {
          this.playerNine[i].destroy();
        }
      }
      for (let j = 0; j < this.historyNineID.length; j++) {
        let main = document.getElementById(
          "main-nine-stream-" + this.historyNineID[j].index
        );
        let canvas = main.getElementsByTagName("canvas");
        if (canvas && canvas.length > 0) {
          let idCanvas = "canvas-list-nine-" + this.historyNineID[j].id;
          if (canvas[0].id === idCanvas) {
            let hisCanvas = document.getElementById(idCanvas);
            main.removeChild(hisCanvas);
          }
          let divNotConnect = document.getElementById(
            "absolute-nine-default-item-" + this.historyNineID[j].index
          );
          divNotConnect.style.display = "block";
        }
      }
      this.playerNine = [];
      this.checkedNineCamera = [];
      this.historyNineID = [];
    },
    resetFour() {
      if (this.playerFour.length > 0) {
        for (let i = 0; i < this.playerFour.length; i++) {
          this.playerFour[i].destroy();
        }
      }
      for (let j = 0; j < this.historyFourID.length; j++) {
        let main = document.getElementById(
          "main-four-stream-" + this.historyFourID[j].index
        );
        let canvas = main.getElementsByTagName("canvas");
        if (canvas && canvas.length > 0) {
          let idCanvas = "canvas-list-four-" + this.historyFourID[j].id;
          if (canvas[0].id === idCanvas) {
            let hisCanvas = document.getElementById(idCanvas);
            main.removeChild(hisCanvas);
          }
          let divNotConnect = document.getElementById(
            "absolute-four-default-item-" + this.historyFourID[j].index
          );
          divNotConnect.style.display = "block";
        }
      }
      this.playerFour = [];
      this.checkedFourCamera = [];
      this.historyFourID = [];
    },
    resetSingle() {
      if (this.player) {
        this.player.destroy();
      }
      let main = document.getElementById("main-stream");
      let canvas = main.getElementsByTagName("canvas");
      if (canvas && canvas.length > 0) {
        let hisCanvas = document.getElementById("canvas-" + this.historyID);
        if (hisCanvas) {
          main.removeChild(hisCanvas);
        }
        let divNotConnect = document.getElementById("absolute-default-item");
        divNotConnect.style.display = "block";
        this.player = null;
        this.checkedCamera = [];
        this.historyID = null;
      }
    },
    checkNineCamera(value) {
      if (!this.checkedNineCamera.includes(value)) {
        if (this.checkedNineCamera.length < 9) {
          this.checkedNineCamera.push(value);
          setTimeout(() => {
            this.addCameraNine(value, this.cameraList);
          }, 200);
        }
      } else {
        this.checkedNineCamera.splice(this.checkedNineCamera.indexOf(value), 1);
        setTimeout(() => {
          this.removeCameraNine(value, this.cameraList);
        }, 200);
      }
    },
    checkFourCamera(value) {
      if (!this.checkedFourCamera.includes(value)) {
        if (this.checkedFourCamera.length < 4) {
          this.checkedFourCamera.push(value);
          setTimeout(() => {
            this.addCameraFour(value, this.cameraList);
          }, 200);
        }
      } else {
        this.checkedFourCamera.splice(this.checkedFourCamera.indexOf(value), 1);
        setTimeout(() => {
          this.removeCameraFour(value, this.cameraList);
        }, 200);
      }
    },
    checkCamera(value) {
      if (!this.checkedCamera.includes(value)) {
        this.checkedCamera = [];
        this.checkedCamera.push(value);
        if (this.grid === "single") {
          setTimeout(() => {
            this.streamCameraSingle(value, this.cameraList);
          }, 200);
        }
      }
    },
    addCameraNine(id, listCamera) {
      let spinnerDiv = document.getElementById("custom-spinner-load-camera");
      spinnerDiv.style.display = "block";
      for (let i = 1; i < 10; i++) {
        let main = document.getElementById("main-nine-stream-" + i);
        let canvas = main.getElementsByTagName("canvas");
        if (!canvas || canvas.length === 0) {
          let divNotConnect = document.getElementById(
            "absolute-nine-default-item-" + i
          );
          let camera = listCamera.filter((x) => x.ID === id);
          let canvas = document.createElement("canvas");
          canvas.id = "canvas-list-nine-" + id;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          let ws = this.wsLink + camera[0].WsPort;
          let connected = new WebSocket(ws);
          setTimeout(() => {
            spinnerDiv.style.display = "none";
            if (connected.readyState === 1) {
              connected.close();
              divNotConnect.style.display = "none";
              main.append(canvas);
              let idCanvas = document.getElementById("canvas-list-nine-" + id);
              idCanvas.addEventListener("click", function () {
                main.classList.toggle("zoom");
              });
              let player = new JSMpeg.Player(ws, { canvas: idCanvas });
              this.playerNine.push(player);
              this.historyNineID.push({
                index: this.playerNine.length,
                id: id,
              });
            }
          }, 1000);
          break;
        }
      }
    },
    removeCameraNine(id, listCamera) {
      for (let i = 1; i < 10; i++) {
        let main = document.getElementById("main-nine-stream-" + i);
        let canvas = main.getElementsByTagName("canvas");
        if (canvas && canvas.length > 0) {
          let idCanvas = "canvas-list-nine-" + id;
          if (canvas[0].id === idCanvas) {
            let hisCanvas = document.getElementById(idCanvas);
            main.removeChild(hisCanvas);
            let indexRemove = this.historyNineID.filter((x) => x.id === id);
            if (indexRemove[0].index === this.playerNine.length) {
              this.playerNine[indexRemove[0].index - 1].destroy();
              this.playerNine.splice(
                this.playerNine.indexOf(indexRemove[0].index - 1),
                1
              );
            }
            let divNotConnect = document.getElementById(
              "absolute-nine-default-item-" + i
            );
            divNotConnect.style.display = "block";
            break;
          }
        }
      }
    },
    addCameraFour(id, listCamera) {
      let spinnerDiv = document.getElementById("custom-spinner-load-camera");
      spinnerDiv.style.display = "block";
      for (let i = 1; i < 5; i++) {
        let main = document.getElementById("main-four-stream-" + i);
        let canvas = main.getElementsByTagName("canvas");
        if (!canvas || canvas.length === 0) {
          let divNotConnect = document.getElementById(
            "absolute-four-default-item-" + i
          );
          //
          // let divToggle = document.getElementById('absolute-four-toggle-item-' + i)
          //
          let camera = listCamera.filter((x) => x.ID === id);
          let canvas = document.createElement("canvas");
          canvas.id = "canvas-list-four-" + id;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          let ws = this.wsLink + camera[0].WsPort;
          let connected = new WebSocket(ws);
          setTimeout(() => {
            spinnerDiv.style.display = "none";
            if (connected.readyState === 1) {
              connected.close();
              divNotConnect.style.display = "none";
              //
              // divToggle.style.display = 'block'
              //
              main.append(canvas);
              let idCanvas = document.getElementById("canvas-list-four-" + id);
              idCanvas.addEventListener("click", function () {
                main.classList.toggle("zoom");
              });
              let player = new JSMpeg.Player(ws, { canvas: idCanvas });
              this.playerFour.push(player);
              this.historyFourID.push({
                index: this.playerFour.length,
                id: id,
              });
            }
          }, 1000);
          break;
        }
      }
    },
    removeCameraFour(id, listCamera) {
      for (let i = 1; i < 5; i++) {
        let main = document.getElementById("main-four-stream-" + i);
        let canvas = main.getElementsByTagName("canvas");
        if (canvas && canvas.length > 0) {
          let idCanvas = "canvas-list-four-" + id;
          if (canvas[0].id === idCanvas) {
            let hisCanvas = document.getElementById(idCanvas);
            main.removeChild(hisCanvas);
            let indexRemove = this.historyFourID.filter((x) => x.id === id);
            if (indexRemove[0].index === this.playerFour.length) {
              this.playerFour[indexRemove[0].index - 1].destroy();
              this.playerFour.splice(
                this.playerFour.indexOf(indexRemove[0].index - 1),
                1
              );
            }
            let divNotConnect = document.getElementById(
              "absolute-four-default-item-" + i
            );
            divNotConnect.style.display = "block";
            //
            // let divToggle = document.getElementById('absolute-four-toggle-item-' + i)
            // divToggle.style.display = 'none'
            //
            break;
          }
        }
      }
    },
    streamCameraSingle(id, listCamera) {
      let spinnerDiv = document.getElementById("custom-spinner-load-camera");
      spinnerDiv.style.display = "block";
      let main = document.getElementById("main-stream");
      let divNotConnect = document.getElementById("absolute-default-item");
      divNotConnect.style.display = "block";
      if (this.historyID) {
        let hisCanvas = document.getElementById("canvas-" + this.historyID);
        if (hisCanvas) {
          main.removeChild(hisCanvas);
        }
      }
      let camera = listCamera.filter((x) => x.ID === id);
      let canvas = document.createElement("canvas");
      canvas.id = "canvas-" + id;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      let ws = this.wsLink + camera[0].WsPort;
      let connected = new WebSocket(ws);
      setTimeout(() => {
        if (this.player) {
          this.player.destroy();
        }
        spinnerDiv.style.display = "none";
        if (connected.readyState === 1) {
          connected.close();
          divNotConnect.style.display = "none";
          main.append(canvas);
          let idCanvas = document.getElementById("canvas-" + id);
          idCanvas.addEventListener("click", function () {
            main.classList.toggle("zoom");
          });
          this.player = new JSMpeg.Player(ws, { canvas: idCanvas });
          this.historyID = id;
        }
      }, 1000);
    },
    loadCameraSecurityOption() {
      let body = {
        GroupID: this.$store.getters.currentUser.GroupID,
      };
      cameraAPI
        .cameraSecurityList(body)
        .then((val) => {
          let result = val.status ? val.data : [];
          this.cameraList = result.sort(handling.GetSortOrder("CameraName"));
          // if (this.cameraList.length > 0) {
          //   this.checkCamera(this.cameraList[0].ID)
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.custom-card-stream .card-body {
  padding-bottom: 0.25rem;
  cursor: pointer;
}

.display-stream {
  background-color: black;
  height: 700px;
  width: 100%;
}

.display-stream .absolute-default-item {
  color: white;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.slide-stream {
  padding: 1rem;
  height: 700px;
  width: 100%;
}

.col-four-camera-1,
.col-four-camera-3 {
  padding-right: 0;
}

.col-four-camera-2,
.col-four-camera-4 {
  padding-left: 0;
}

.col-nine-camera-1,
.col-nine-camera-4,
.col-nine-camera-7 {
  padding-right: 0;
}

.col-nine-camera-2,
.col-nine-camera-5,
.col-nine-camera-8 {
  padding-left: 0;
  padding-right: 0;
}

.col-nine-camera-3,
.col-nine-camera-6,
.col-nine-camera-9 {
  padding-left: 0;
}

@media screen and (max-width: 767px) {
  .display-stream {
    background-color: black;
    height: 250px;
    width: 100%;
  }

  .slide-stream {
    padding: 1rem;
    height: 250px;
    width: 100%;
  }

  .col-four-camera-1,
  .col-four-camera-3 {
    padding-right: 15px;
  }

  .col-four-camera-2,
  .col-four-camera-4 {
    padding-left: 15px;
  }

  .col-nine-camera-1,
  .col-nine-camera-4,
  .col-nine-camera-7 {
    padding-right: 15px;
  }

  .col-nine-camera-2,
  .col-nine-camera-5,
  .col-nine-camera-8 {
    padding-left: 15px;
    padding-right: 15px;
  }

  .col-nine-camera-3,
  .col-nine-camera-6,
  .col-nine-camera-9 {
    padding-left: 15px;
  }

  .list-nine-camera-default {
    height: 350px !important;
  }
}

.list-four-camera-default {
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  background-color: black;
  width: 100%;
  height: 350px;
  position: relative;
}

.list-four-camera-default .absolute-default-item {
  color: white;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.list-four-camera-default .absolute-toggle-item {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.75rem 0.75rem 0.5rem 0.75rem;
  display: none;
}

.list-nine-camera-default {
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  background-color: black;
  width: 100%;
  height: calc(700px / 3);
  position: relative;
}

.list-nine-camera-default .absolute-default-item {
  color: white;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.zoom {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
}

#custom-spinner-load-camera {
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
