<template>
  <div>
    <b-table thead-class="bg-primary" :fields="fields" :items="items" bordered>
      <template #cell(info)="row">
        <div>
          <div>
            ID: <b>{{ data.ScheduleID }}</b>
          </div>
          <div>
            Chương trình: <b>{{ data.ScheduleName }}</b>
          </div>
          <div>
            Nguồn phát:
            <b>
              <b-badge
                :style="'background:#d7d7d7!important;font-size:88%;color:black'"
              >
                {{ data.BroadcastName }}
              </b-badge>
            </b>
          </div>
          <div>
            Lặp lại: <b>{{ data.ReplayName }}</b>
          </div>
          <div>
            Thời gian phát:
            <b>
              {{ data.Time }}
            </b>
          </div>
          <div>
            Tùy chọn ngày:
            <b>
              {{ data.DateDescription }}
            </b>
          </div>
          <div>
            Trạng thái:
            <b>
              {{ data.PlaybackStateName }}
            </b>
          </div>
          <div>
            Ghi chú: <b>{{ data.Note }}</b>
          </div>
          <!-- <div>Cập nhật lúc:<b>10</b></div> -->
        </div>
      </template>
      <template #cell(control)="row">
        <div>
          <AudioPlayerList :height="'180px'"> </AudioPlayerList>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import AudioPlayerList from '@/components/Audio/AudioPlaylist.vue'

export default {
  props: ['data'],
  components: {
    AudioPlayerList,
  },
  created() {
    console.log(1, 'created', this.data)
  },
  data() {
    return {
      fields: [
        {
          key: 'info',
          label: 'Thông tin phát',
        },
        {
          key: 'control',
          label: 'Audio phát sóng',
        },
      ],
      items: [
        {
          info: 'custom-info',
          control: 'custom-control',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>