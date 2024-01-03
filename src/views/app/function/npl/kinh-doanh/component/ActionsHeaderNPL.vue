<template>
  <div>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex <= 0 ? true : false"
      @click="emitIndex(0)"
      ><i class="fas fa-chevron-double-left"></i
    ></b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex <= 0 ? true : false"
      @click="emitIndex(currentIndex - 1)"
    >
      <i class="fas fa-chevron-left"></i
    ></b-button>
    <b-button v-if="sIndex" squared variant="outline-secondary" class="mb-1">
      <b>{{ currentIndex + 1 }} / {{ total }}</b>
    </b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex === total - 1 ? true : false"
      @click="emitIndex(currentIndex + 1)"
    >
      <i class="fas fa-chevron-right"></i
    ></b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex === total - 1 ? true : false"
      @click="emitIndex(total - 1)"
      ><i class="fas fa-chevron-double-right"> </i
    ></b-button>
    <template v-if="currentUser?.IsITSupport == 0">
      <b-button
        squared
        variant="success"
        class="mb-1"
        :disabled="isPermission ? (isDisabledAdd ? true : false) : true"
        @click="changeAction('add')"
      >
        <i class="fas fa-plus mr-1"></i>
        <b>{{ $t("action.add") }}</b>
      </b-button>
      <b-button
        v-if="sEdit"
        squared
        variant="warning"
        class="mb-1"
        :disabled="statusLock === 'notLock' ? (isPermission ? (isDisabledEdit ? true : false) : true) : true"
        @click="changeAction('edit')"
      >
        <i class="fas fa-edit mr-1"></i>
        <b>{{ $t("action.edit") }}</b>
      </b-button>
      <b-button
        v-if="sDelete"
        squared
        variant="danger"
        class="mb-1"
        :disabled="statusLock === 'notLock' ? (isPermission ? (isDisabledDelete ? true : false) : true) : true"
        @click="changeAction('delete')"
      >
        <i class="fas fa-trash-alt mr-1"></i>
        <b>{{ $t("action.delete") }}</b>
      </b-button>
      <b-button
        v-if="sSave"
        squared
        variant="primary"
        class="mb-1"
        :disabled="isPermission ? (isDisabledSave ? true : false) : true"
        @click="changeAction('save')"
      >
        <i class="fas fa-save mr-1"></i>
        <b>{{ $t("action.save") }}</b>
      </b-button>
      <b-button
        v-if="sCancel"
        squared
        class="mb-1"
        :disabled="isPermission ? (isDisabledCancel ? true : false) : true"
        @click="changeAction('cancel')"
      >
        <i class="fas fa-undo-alt mr-1"></i>
        <b>{{ $t("action.cancel") }}</b>
      </b-button>
      <b-button
        v-if="sBlock"
        squared
        variant="outline-danger"
        class="mb-1"
        :disabled="statusLock === 'notLock' ? (isPermission ? (isDisabledLock ? true : false) : true) : true"
        @click="changeAction('lock')"
      >
        <i class="fas fa-lock-alt mr-1"></i>
        <b>{{ $t("action.lock") }}</b>
      </b-button>
      <b-button 
        v-if="sCopy"
        squared 
        variant="outline-info"
        class="mb-1"
        :disabled="isPermission ? (isDisabledCopy ? true : false) : true"
        @click="changeAction('copy')"
      >
        <i class="fas fa-copy mr-1"></i>
        <b>{{$t("action.copy")}}</b>
      </b-button>
      <b-button
        v-if="sAttachFile"
        squared
        variant="outline-secondary"
        class="mb-1"
        :disabled="statusLock === 'notLock' ? (isPermission ? (isDisabledAttachFile ? true : false) : true) : true"
        @click="changeAction('attachFile')"
      >
        <i class="fas fa-upload mr-1"></i>
        <b>{{ $t("action.attach-file") }}</b>
      </b-button>
      <b-button
        v-if="sImportExcel"
        squared
        variant="outline-secondary"
        class="mb-1"
        :disabled="isPermission ? (isDisabledImportExcel ? true : false) : true"
        @click="changeAction('importExcel')"
      >
        <i class="fas fa-file-arrow-up mr-1"></i>
        <b>{{ $t("action.import-excel") }}</b>
      </b-button>
    </template>
    <template v-else-if="currentUser?.IsITSupport == 1">
      <b-button
        squared
        variant="success"
        class="mb-1"
        disabled
      >
        <i class="fas fa-plus mr-1"></i>
        <b>{{ $t("action.add") }}</b>
      </b-button>
      <b-button
        v-if="sEdit"
        squared
        variant="warning"
        class="mb-1"
        disabled
      >
        <i class="fas fa-edit mr-1"></i>
        <b>{{ $t("action.edit") }}</b>
      </b-button>
      <b-button
        v-if="sDelete"
        squared
        variant="danger"
        class="mb-1"
        disabled
      >
        <i class="fas fa-trash-alt mr-1"></i>
        <b>{{ $t("action.delete") }}</b>
      </b-button>
      <b-button
        v-if="sSave"
        squared
        variant="primary"
        class="mb-1"
        disabled
      >
        <i class="fas fa-save mr-1"></i>
        <b>{{ $t("action.save") }}</b>
      </b-button>
      <b-button
        v-if="sCancel"
        squared
        class="mb-1"
        disabled
      >
        <i class="fas fa-undo-alt mr-1"></i>
        <b>{{ $t("action.cancel") }}</b>
      </b-button>
      <template v-if="statusLock === 'notLock' ">
        <b-button
          v-if="sBlock"
          squared
          variant="outline-danger"
          class="mb-1"
          disabled
        >
          <i class="fas fa-lock-alt mr-1"></i>
          <b>{{ $t("action.lock") }}</b>
        </b-button>
      </template>
      <template v-else-if="statusLock === 'locked' ">
        <b-button
          v-if="sBlock"
          squared
          variant="outline-danger"
          class="mb-1"
          @click="changeAction('lock')"
        >
          <i class="fas fa-lock-alt mr-1"></i>
          <b>{{ $t("action.un-lock") }}</b>
        </b-button>
      </template>
      <b-button 
        v-if="sCopy"
        squared 
        variant="outline-info"
        class="mb-1"
        disabled
      >
        <i class="fas fa-copy mr-1"></i>
        <b>{{$t("action.copy")}}</b>
      </b-button>
      <b-button
        v-if="sAttachFile"
        squared
        variant="outline-secondary"
        class="mb-1"
        disabled
      >
        <i class="fas fa-upload mr-1"></i>
        <b>{{ $t("action.attach-file") }}</b>
      </b-button>
      <b-button
        v-if="sImportExcel"
        squared
        variant="outline-secondary"
        class="mb-1"
        disabled
      >
        <i class="fas fa-file-arrow-up mr-1"></i>
        <b>{{ $t("action.import-excel") }}</b>
      </b-button>
    </template>
    <b-button
      v-if="sPrint"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="isDisabledPrint"
      @click="changeAction('print')"
    >
      <i class="fas fa-print mr-1"></i>
      <b>{{ $t("action.print") }}</b>
    </b-button>
    <b-button
      v-if="sFind"
      squared
      variant="outline-info"
      class="mb-1"
      :disabled="isDisabledSearch"
      @click="changeAction('find')"
    >
      <i class="fas fa-search mr-1"></i>
      <b>{{ $t("action.search") }}</b>
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: [
    "currentIndex",
    "isAdd",
    "isEdit",
    "isDelete",
    "showAdd",
    "showEdit",
    "showDelete",
    "showSave",
    "showCancel",
    "showBlock",
    "showPrint",
    "showImportExcel",
    "showAttachFile",
    "showFind",
    "showIndex",
    "total",
    "isPermission",
    "isDisabledAdd",
    "isDisabledEdit",
    "isDisabledDelete",
    "isDisabledSave",
    "isDisabledCancel",
    "isDisabledLock",
    "isDisabledCopy",
    "isDisabledAttachFile",
    "isDisabledPrint",
    "isDisabledImportExcel",
    "isDisabledSearch",
    "statusLock",
  ],
  data() {
    return {
      sIndex: this.showIndex ?? true,
      sAdd: this.showAdd ?? true,
      sEdit: this.showEdit ?? true,
      sDelete: this.showDelete ?? true,
      sSave: this.showSave ?? true,
      sCancel: this.showCancel ?? true,
      sBlock: this.showBlock ?? true,
      sCopy: this.showCopy ?? true,
      sPrint: this.showPrint ?? true,
      sAttachFile: this.showAttachFile ?? true,
      sImportExcel: this.showImportExcel ?? true,
      sFind: this.showFind ?? true,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),

  },
  methods: {
    /////
    emitIndex(index) {
      if (index >= 0 && index < this.total) {
        // console.log('change-index', index);
        this.$emit("change-index", index);
      }
      // else {
      //   console.log(index);
      //   this.$emit('change-tab', 1)
      // }
    },
    changeAction(type) {
      this.$emit("change-action", type);
    },
  },
};
</script>

<style lang="scss" scoped></style>
