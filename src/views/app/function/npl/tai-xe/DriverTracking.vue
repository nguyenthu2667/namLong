<template>
  <div id="app-content-full" class="form-npl-driver-tracking">
    <b-card>
      <TabHeader :activeFocus="currentTab" @change-tab="updateTab"></TabHeader>
      <component :is="renderComponent"></component>
    </b-card>
  </div>
</template>

<script>
import TabHeader from "./component/TabHeader.vue";
import AccidentReport from "./component/AccidentReport.vue";
import PourOil from "./component/PourOil.vue";
import OtherRequest from "./component/OtherRequest.vue";

export default {
  components: {
    TabHeader,
    AccidentReport,
    PourOil,
    OtherRequest,
  },
  data() {
    return {
      //tab-header
      currentTab: 0,
      renderComponent: "AccidentReport",
    };
  },
  methods: {
    updateTab(value) {
      this.currentTab = value;
      switch (value) {
        case 0:
          this.renderComponent = "AccidentReport";
          break;
        case 1:
          this.renderComponent = "PourOil";
          break;
        case 2:
          this.renderComponent = "OtherRequest";
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.form-npl-driver-tracking {
  th {
    white-space: nowrap;
  }
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
  .box-content {
    padding-bottom: 15px;
  }
}
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
