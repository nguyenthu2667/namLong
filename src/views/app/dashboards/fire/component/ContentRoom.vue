<template>
  <div class="p-2">
    <template v-if="dataNodes && dataNodes.length > 0">
      <template v-for="(floor, index) in dataNodes">
        <b-row :key="index + 'conten-rom'">
          <b-col lg="6">
            <div class="floors" :style="'background:' + floor.StatusColor">
              <h5 class="text-center">
                <strong>
                  {{ floor.StationName.toUpperCase() }}
                </strong>
              </h5>
            </div>
            <div>
              <div class="mt-1">
                <strong style="color: #7a7777">Tủ cảnh báo tại chỗ</strong>
              </div>
              <div class="mt-2 d-flex" style="flex-wrap: nowrap">
                <template v-for="(speaker, i) in speakers">
                  <div
                    :key="speaker.STT"
                    :id="'t' + speaker.STT"
                    class="rooms text-center p-2"
                    style="width: 38px"
                    :style="
                      i != 3
                        ? 'margin-right: 10px;' +
                          'background:' +
                          speaker.StatusColor
                        : 'background:' + speaker.StatusColor
                    "
                  >
                    <b>{{ speaker.STT }}</b>
                  </div>
                  <b-tooltip
                    :key="speaker.STT + 'bc'"
                    :target="'t' + speaker.STT"
                    triggers="hover focus"
                  >
                    <div
                      style="font-family: Nunito Sans Light"
                      class="text-left"
                    >
                      <div>
                        <strong>
                          Tên:
                          <span style="color: #7a7777">{{
                            speaker.SpeakerName
                          }}</span>
                        </strong>
                      </div>
                      <div>
                        <strong>
                          Vị trí:
                          <span style="color: #7a7777">{{
                            speaker.LocationName
                          }}</span>
                        </strong>
                      </div>
                      <div style="white-space: nowrap">
                        <strong>
                          Thời gian:
                          <span style="color: blue">{{
                            convertDate(speaker.UpdateTime)
                          }}</span>
                        </strong>
                      </div>
                      <div style="white-space: nowrap">
                        <strong>
                          Trạng thái:
                          <span :style="`color: ${speaker.StatusColor}`">{{
                            speaker.StatusName
                          }}</span>
                        </strong>
                      </div>
                    </div>
                  </b-tooltip>
                </template>
              </div>
            </div>
          </b-col>
          <b-col lg="6" class="p-0">
            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs d-flex"
              :settings="{
                suppressScrollX: true,
                wheelPropagation: false,
              }"
              style="
                flex-wrap: wrap;
                height: 99px;
                overflow: auto;
                width: 100%;
                padding: 0;
                margin: 0;
                cursor: pointer;
                jus
              "
            >
              <template v-for="(room, i) in floor.chilrens">
                <div
                  class="mr-1 mb-1 p-2 t-center"
                  :key="i"
                  :style="'background:' + room.StatusColor"
                  @click="emitContentRoom(room)"
                >
                  <b style="white-space: nowrap; color: white">{{
                    room.StationName
                  }}</b>
                </div>
              </template>
            </vue-perfect-scrollbar>
          </b-col>
        </b-row>
        <div
          :key="index + 'b'"
          class="separator mt-2"
          style="border-bottom: 1px solid #bdbcbc; width: 100%; margin-left: 2%"
        ></div>
      </template>
    </template>
    <template v-else>
      <p class="text-muted text-small ml-2">
        {{ $t("map.no-data") }}
      </p>
    </template>
  </div>
</template>

<script>
import handling from "@/constants/handling";

export default {
  props: ["dataNodes", "speakers"],
  methods: {
    emitContentRoom(room) {
      this.$emit("return-room", room);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
.floors {
  height: 30px;
  padding: 5px;
  border: 1px solid grey;
  color: white;
  text-align: center;
}
.rooms {
  padding: 5px;
  border: 1px solid gray;
  color: white;
  cursor: pointer;
}
.bg-focus {
  background: #d3d0d0f7;
}
.crossbar {
  background: #f3f3f3;
  min-height: 30px;
}
</style>
<style>
.t-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>