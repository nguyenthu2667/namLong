<template>
  <div class="box-detail-modal">
    <template v-if="dataParent && dataParent.statusColor != 'gray'">
      <b-tabs v-model="currentTab" nav-class="d-none">
        <b-tab>
          <div class="box-content">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>VẬN ĐƠN </strong>

              <hr class="m-0" />
            </div>
            <DetailDH :mt4="'mt-4'" :type="'HR'"></DetailDH>
          </div>
        </b-tab>
        <b-tab>
          <div class="box-content">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>LỊCH SỬ THAO TÁC </strong>

              <hr class="m-0" />
            </div>
            <table-history
              v-if="dataHisAction && dataHisAction.length > 0"
              :fields="fieldsHisAction"
              :items="dataHisAction"
            ></table-history>
            <div v-else class="mt-4 text-center text-muted font-weight-bold">
              Không tồn tại dữ liệu !
            </div>
          </div>
        </b-tab>
        <b-tab>
          <div class="box-content">
            <div
              style="font-size: 16px; background: #d7d7d7; color: #005aab"
              class="text-center pt-1 mb-1"
            >
              <strong>DANH SÁCH FILE</strong>

              <hr class="m-0" />
            </div>
            <table-list-file></table-list-file>
          </div>
        </b-tab>
      </b-tabs>
      <ActionsFooterNPL
        :activeFocus="currentTab"
        @change-tab="updateTab"
      ></ActionsFooterNPL>
    </template>
    <template v-else>
      <div class="box-content">
        <div class="text-center text-muted mt-5">Không tồn tại dữ liệu !</div>
      </div>
    </template>
  </div>
</template>

<script>
import DetailDH from "../../function/npl/dieu-do/component/theo-doi-van-don/DetailDH.vue";
import ActionsFooterNPL from "../component/npl/ActionsFooterModalDetailNPL.vue";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  props: ["dataParent"],
  components: {
    DetailDH,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    Status,
  },
  data() {
    return {
      currentTab: 0,
      //history-actions
      fieldsHisAction: [
        {
          key: "dateTime",
          label: "Thời gian",
        },
        {
          key: "userName",
          label: "Người thực hiện",
        },
        {
          key: "typeAction",
          label: "Thao tác",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
      ],
      dataHisAction: [
        {
          dateTime: "13:10 10-11-2022",
          userName: "Trần Văn A",
          typeAction: "add",
          note: "",
        },
        {
          dateTime: "15:10 10-11-2022",
          userName: "Trần Văn B",
          typeAction: "edit",
          note: "phát sinh abc...",
        },
        {
          dateTime: "12:10 11-11-2022",
          userName: "Trần Văn C",
          typeAction: "delete",
          note: "Không đủ xe vận tải",
        },
      ],
    };
  },
  methods: {
    //tab
    updateTab(value) {
      this.currentTab = value;
    },
    //
  },
};
</script>

<style lang="scss" scoped>
.box-detail-modal {
  width: 100%;
}
.box-content {
  height: calc(100vh - 280px);
  overflow: auto;
  overflow-x: hidden;
}
</style>
