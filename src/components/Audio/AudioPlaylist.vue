<template>
  <div
    :style="`border: 1px solid #d7d7d7;height:${boxHeightAudio};overflow:auto;`"
    class="mt-1"
  >
    <audio-player
      class="p-3"
      ref="audioPlayer"
      :audio-list="audioList.map((elm) => elm.url)"
      :before-play="handleBeforePlay"
      theme-color="#2c3e50"
    />
    <draggable
      :list="audioList"
      :animation="200"
      ghost-class="moving-card"
      group="users"
      filter=".action-button"
      class="w-full max-w-md mt-2"
      tag="div"
      style="max-height: 115px; overflow: auto"
      v-show="isShowListMenu"
    >
      <template v-if="audioList && audioList.length > 0">
        <b-card
          no-body
          v-for="(audio, i) in audioList"
          :key="i"
          class="mb-2 card-audio"
        >
          <div
            class="
              d-flex
              justify-content-between
              align-items-center
              p-1
              pl-2
              pr-3
            "
            style="font-size: 15px"
          >
            <div class="d-flex info">
              <div
                class="box-img"
                :style="audio.isPlay ? 'border: 1.5px solid #2ecc71;' : null"
                style="width: 30px; heigh: 14px; border-radius: 50%"
              >
                <img
                  style="
                    width: 100%;
                    height: 100%;
                    background: gray;
                    border-radius: 50%;
                  "
                  src="data:image/png;base64,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"
                />
              </div>
              <div class="title ml-2 mt-1">
                <span
                  :style="audio.isPlay ? `color: #2c3e50` : `color: #6a6a6a`"
                  >{{ audio.name }}
                </span>
              </div>
            </div>
            <div v-if="isShow" class="actions" style="color: #2c3e50">
              <i class="play fas fa-arrows-alt mr-2"></i>
              <i
                v-if="audio.isPlay"
                @click.prevent.stop="activeAudio(audio)"
                class="play fas fa-play mr-2"
              ></i>
              <i
                v-else
                @click.prevent.stop="activeAudio(audio)"
                class="play fas fa-stop mr-2"
              ></i>
              <i
                @click.prevent.stop="remove(audio)"
                class="remove fas fa-trash-alt text-danger"
              ></i>
            </div>
          </div>
        </b-card>
      </template>
      <template v-else>
        <b-card no-body>
          <div class="text-center text-muted">
            <strong>Không tồn tại dữ liệu !</strong>
          </div>
        </b-card>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: ["data", "keyString", "dataBase64", "height", "showListMenu"],
  components: {
    draggable,
  },
  data() {
    return {
      isShowListMenu: this.showListMenu ?? true,
      isShow: true,
      boxHeightAudio: this.height ?? "auto",
      audioList:
        this.data?.length > 0
          ? this.data.filter((a) => typeof a == "object")
          : [],
    };
  },
  watch: {
    dataBase64(newArr) {
      if (newArr?.length > 0) {
        let result = [];
        newArr.forEach((a) => {
          result.push(a);
        });
        setTimeout(() => {
          const defaultArr = this.data.filter((a) => typeof a == "object");
          const uniqueSet = new Set(result);
          const final = [...uniqueSet];
          this.audioList = [...defaultArr, ...final];
        }, 500);
      }
    },
    audioList(newArr) {
      newArr.forEach((a, index) => (a.STT = index));
      setTimeout(() => {
        this.$emit("watch-sort", newArr, this.keyString);
      }, 500);
    },
  },
  methods: {
    activeAudio(audio) {
      this.audioList.forEach((a, index) => {
        if (audio.STT == a.STT) {
          this.$refs.audioPlayer.currentPlayIndex = index;
          setTimeout(() => {
            this.$refs.audioPlayer.play();
          }, 1000);
          audio.isPlay = true;
        } else {
          audio.isPlay = false;
        }
      });
    },
    remove(item) {
      const index = this.audioList.findIndex((a) => a.STT == item.STT);
      this.audioList.splice(index, 1);
    },
    handleBeforePlay(next) {
      // Something to do before playing
      if (this.audioList.length < 1) return;
      // There are a few things you can do here...
      this.isShow = false;
      setTimeout(() => {
        this.audioList.forEach((a) => (a.isPlay = false));
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].isPlay = true;
        next(); // Start playing
        this.isShow = true;
      }, 500);
    },
  },
};
</script>
<style scoped>
.card-audio {
  cursor: pointer;
}
.actions .play:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.actions .remove:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.info {
  width: 80%;
}
.actions {
  display: flex;
  justify-content: flex-end;
  width: 20%;
  text-align: right;
}
.title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}
</style>
<style >
.audio__play-volume,
.audio__play-rate__dropdown {
  z-index: 9;
}
</style>