<template>
  <div id="app-content-full" class="form-npl-bao-tri">
    <b-card>
      <TabNghiepVu
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></TabNghiepVu>
      <b-tabs v-model="currentTab" nav-class="d-none">
        <b-tab>
          <TheoDoi />
        </b-tab>
        <b-tab>
          <GiaHanGiayTo />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TabNghiepVu from "./component/TabNghiepVu.vue";
import TheoDoi from "./TheoDoi";
import GiaHanGiayTo from "./GiaHanGiayTo.vue";

export default {
  components: {
    TabNghiepVu,
    TheoDoi,
    GiaHanGiayTo,
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    updateTab(value) {
      this.currentTab = value;
    },
  },
};
</script>
