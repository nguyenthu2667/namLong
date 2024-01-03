<template>
  <div>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitFirstIndex"
      ><i class="fas fa-chevron-double-left"></i
    ></b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitPreIndex"
    >
      <i class="fas fa-chevron-left"></i
    ></b-button>
    <b-button v-if="sIndex" squared variant="outline-secondary" class="mb-1">
      <b>{{ currentIndex + 1 }}</b>
    </b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitNextIndex"
    >
      <i class="fas fa-chevron-right"></i
    ></b-button>
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitLastIndex"
      ><i class="fas fa-chevron-double-right"> </i
    ></b-button>
    <b-button
      v-if="sAdd"
      squared
      variant="success"
      class="mb-1"
      :disabled="isAdd"
      @click="emitChangeActions(isAdd, 'add')"
      ><i class="fas fa-plus mr-1"></i><b>Thêm</b>
    </b-button>
    <b-button
      v-if="sEdit"
      squared
      variant="warning"
      class="mb-1"
      :disabled="isEdit"
      @click="emitChangeActions(isEdit, 'edit')"
      ><i class="fas fa-edit mr-1"></i><b>Sửa </b>
    </b-button>
    <b-button
      v-if="sDelete"
      squared
      variant="danger"
      class="mb-1"
      :disabled="isDelete"
      @click="emitChangeActions(isDelete, 'delete')"
      ><i class="fas fa-trash-alt mr-1"></i><b>Xóa</b>
    </b-button>
    <b-button
      v-if="sSave"
      squared
      variant="primary"
      class="mb-1"
      :disabled="!isEdit"
      @click="emitChangeActions(isEdit, 'save')"
      ><i class="fas fa-save mr-1"></i><b>Lưu</b>
    </b-button>
    <b-button
      v-if="sCancel"
      squared
      class="mb-1"
      :disabled="!isEdit"
      @click="emitChangeActions(isEdit, 'cancel')"
      ><i class="fas fa-undo-alt mr-1"></i><b>Hủy</b>
    </b-button>
    <b-button v-if="sBlock" squared variant="outline-danger" class="mb-1"
      ><i class="fas fa-lock-alt mr-1"></i><b>Khóa</b>
    </b-button>
    <b-button v-if="sCopy" squared variant="outline-info" class="mb-1"
      ><i class="fas fa-copy mr-1"></i><b>Sao chép</b>
    </b-button>
    <b-button
      v-if="sPrint"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitChangeActions(false, 'print')"
      ><i class="fas fa-print mr-1"></i><b>In file</b></b-button
    >
    <b-button
      v-if="sImport"
      squared
      variant="outline-secondary"
      class="mb-1"
      @click="emitChangeActions(false, 'import')"
      ><i class="fas fa-upload mr-1"></i><b>Đ.kèm file</b></b-button
    >
    <b-button
      v-if="sFind"
      squared
      variant="outline-info"
      class="mb-1"
      @click="emitChangeActions(false, 'find')"
      ><i class="fas fa-search mr-1"></i><b>Tìm kiếm</b>
    </b-button>
  </div>
</template>

<script>
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
    "showCopy",
    "showPrint",
    "showImport",
    "showFind",
    "showIndex",
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
      sImport: this.showImport ?? true,
      sFind: this.showFind ?? true,
    };
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
</style>