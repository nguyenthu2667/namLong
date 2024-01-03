<template>
  <div class="action-header-tree">
    <b-button
      v-if="showIndex"
      @click="emitFirstIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      ><i class="fas fa-chevron-double-left"></i
    ></b-button>
    <b-button
      v-if="showIndex"
      @click="emitPreIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
    >
      <i class="fas fa-chevron-left"></i
    ></b-button>
    <b-button v-if="showIndex" squared variant="outline-secondary" class="mb-1">
      <b>{{ currentIndex + 1 }} / {{ currentTotalIndex }}</b>
    </b-button>
    <b-button
      v-if="showIndex"
      @click="emitNextIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
    >
      <i class="fas fa-chevron-right"></i
    ></b-button>
    <b-button
      v-if="showIndex"
      @click="emitLastIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      ><i class="fas fa-chevron-double-right"> </i
    ></b-button>
    <b-button
      v-if="showAdd"
      :disabled="disableAdd"
      @click="emitChangeActions(disableAdd, 'add')"
      squared
      variant="success"
      class="mb-1"
      ><i class="fas fa-plus mr-2"></i><b>Thêm</b>
    </b-button>
    <b-button
      v-if="showEdit"
      :disabled="disableEdit || currentTotalIndex == 0"
      @click="emitChangeActions(disableEdit, 'edit')"
      squared
      variant="warning"
      class="mb-1"
      ><i class="fas fa-edit mr-2"></i><b>Sửa </b>
    </b-button>
    <b-button
      v-if="showDelete"
      :disabled="disableDelete || currentTotalIndex == 0"
      @click="emitChangeActions(disableDelete, 'delete')"
      squared
      variant="danger"
      class="mb-1"
      ><i class="fas fa-trash-alt mr-2"></i><b>Xóa</b>
    </b-button>
    <b-button
      v-if="showSave"
      :disabled="disableSave"
      @click="emitChangeActions(disableSave, 'save')"
      squared
      variant="primary"
      class="mb-1"
      ><i class="fas fa-save mr-2"></i><b>Lưu</b>
    </b-button>
    <b-button
      v-if="showCancel"
      :disabled="disableCancel"
      @click="emitChangeActions(disableCancel, 'cancel')"
      squared
      class="mb-1"
      ><i class="fas fa-undo-alt mr-2"></i><b>Hủy</b>
    </b-button>
    <b-button
      v-if="showBlock"
      :disabled="disableBlock"
      @click="emitChangeActions(disableCancel, 'block')"
      squared
      variant="outline-danger"
      class="mb-1"
      ><i class="fas fa-lock-alt mr-2"></i><b>Khóa</b>
    </b-button>
    <b-button
      v-if="showCopy"
      :disabled="disableCopy"
      @click="emitChangeActions(disableCancel, 'copy')"
      squared
      variant="outline-info"
      class="mb-1"
      ><i class="fas fa-copy mr-2"></i><b>Sao chép</b>
    </b-button>
    <b-button
      v-if="showAttachFile"
      :disabled="disableAttachFile || currentTotalIndex == 0"
      @click="emitChangeActions(false, 'attachFile')"
      squared
      variant="outline-secondary"
      class="mb-1"
      ><i class="fas fa-upload mr-2"></i><b>Đ.kèm file</b></b-button
    >
    <b-button
      v-if="showImport"
      :disabled="disableImport"
      @click="emitChangeActions(false, 'import')"
      squared
      variant="outline-secondary"
      class="mb-1"
      ><i class="fas fa-upload mr-2"></i><b>Nhập file excel</b></b-button
    >
    <b-button
      v-if="showPrint"
      :disabled="disablePrint"
      @click="emitChangeActions(false, 'print')"
      squared
      variant="outline-secondary"
      class="mb-1"
      ><i class="fas fa-print mr-2"></i><b>In file</b></b-button
    >
    <b-button
      v-if="showFind"
      :disabled="disableFind"
      @click="emitChangeActions(false, 'find')"
      squared
      variant="outline-info"
      class="mb-1"
      ><i class="fas fa-search mr-2"></i><b>Tìm kiếm</b>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    // <-- Show -->
    currentIndex: {
      type: Number,
      default: 0,
    },
    currentTotalIndex: {
      type: Number,
      default: 0,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    showAdd: {
      type: Boolean,
      default: true,
    },
    showEdit: {
      type: Boolean,
      default: true,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    showSave: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showBlock: {
      type: Boolean,
      default: true,
    },
    showCopy: {
      type: Boolean,
      default: true,
    },
    showAttachFile: {
      type: Boolean,
      default: true,
    },
    showPrint: {
      type: Boolean,
      default: true,
    },
    showImport: {
      type: Boolean,
      default: true,
    },
    showFind: {
      type: Boolean,
      default: true,
    },
    // <-- End show -->

    // <-- Disabled -->
    disableAdd: {
      type: Boolean,
      default: false,
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
    disableDelete: {
      type: Boolean,
      default: false,
    },
    disableSave: {
      type: Boolean,
      default: true,
    },
    disableCancel: {
      type: Boolean,
      default: true,
    },
    disableBlock: {
      type: Boolean,
      default: false,
    },
    disableCopy: {
      type: Boolean,
      default: false,
    },
    disableAttachFile: {
      type: Boolean,
      default: false,
    },
    disablePrint: {
      type: Boolean,
      default: false,
    },
    disableImport: {
      type: Boolean,
      default: false,
    },
    disableFind: {
      type: Boolean,
      default: false,
    },
    // <-- End disabled -->
  },
  methods: {
    emitFirstIndex() {
      this.$emit("first-index");
    },
    emitPreIndex() {
      this.$emit("pre-index");
    },
    emitNextIndex() {
      this.$emit("next-index");
    },
    emitLastIndex() {
      this.$emit("last-index");
    },
    emitChangeActions(bol, key) {
      this.$emit("change-actions", bol, key);
    },
  },
};
</script>

<style lang="scss" scoped>
.action-header-tree {
  .card {
    height: 100%;
  }
  .card-body {
    height: 100%;
  }
  .box-content {
    overflow: auto;
  }
  .btn-warning.disabled {
    color: white;
  }
  .btn-outline-danger.disabled {
    &:hover {
      color: #dc3545;
    }
  }
  .btn-outline-secondary.disabled {
    color: #2a93d5;
    &:hover {
      color: #2a93d5;
      background-color: transparent !important;
    }
  }
  .btn-outline-info.disabled {
    &:hover {
      color: #17a2b8;
      background-color: transparent !important;
    }
  }
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  td {
    vertical-align: middle;
  }
}
</style>
