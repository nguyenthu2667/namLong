<template>
  <b-modal
    id="modal-notify-import-excel"
    :title="$t('modal-notify-import-excel.title')"
    @hidden="hiddenModal"
    size="xl"
  >
    <template v-if="dataNotify">
      <template v-if="dataNotify.DataDupDB.length">
        <strong class="text-uppercase text-danger">{{$t('modal-notify-import-excel.exists-data')}}</strong>
        <b-table 
          :items="dataNotify.DataDupDB"
          bordered
          responsive
          head-variant="light"
        ></b-table>
      </template>
      <template v-if="dataNotify.DataDupFile.length">
        <strong class="text-uppercase text-danger">{{$t('modal-notify-import-excel.duplicate-data')}}</strong>
        <b-table 
          :items="dataNotify.DataDupFile"
          bordered
          responsive
          head-variant="light"
        ></b-table>
      </template>
      <template v-if="dataNotify.DataErrorFile.length">
        <strong class="text-uppercase text-danger">{{$t('modal-notify-import-excel.error-data')}}</strong>
        <b-table 
          :items="dataNotify.DataErrorFile"
          bordered
          responsive
          head-variant="light"
        ></b-table>
      </template>
      <template v-if="dataNotify.DataInsert.length">
        <strong class="text-uppercase text-success">{{$t('modal-notify-import-excel.insert-data')}}</strong>
        <b-table 
          :items="dataNotify.DataInsert"
          bordered
          responsive
          head-variant="light"
        ></b-table>
      </template>
    </template>
    <template #modal-footer>
      <b-button @click="hiddenModal">{{$t('modal.close')}}</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["show", "dataNotify"],
  data() {
    return {};
  },
  methods: {
    hiddenModal() {
      this.$emit("hidden");
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-notify-import-excel");
      } else {
        this.$bvModal.hide("modal-notify-import-excel");
      }
    },
  },
};
</script>

<style lang="scss">
#modal-notify-import-excel {
  th,
  td {
    white-space: nowrap;
  }
}
</style>
