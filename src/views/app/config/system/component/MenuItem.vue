<template>
  <div v-if="subs">
    <menu-list-item
      :type="type"
      :data="subs"
      :selected-items="selectedItems"
      :access-write="accessWrite"
      @toggle-item="toggleItem"
      @check-active="checkActive"
    ></menu-list-item>
  </div>
</template>

<script>
import MenuListItem from "./MenuListItem";
export default {
  props: ["subs", "selectedItems", "accessWrite", "type"],
  components: {
    "menu-list-item": MenuListItem,
  },
  methods: {
    toggleItem(event, item) {
      this.$emit("toggle-item", event, item);
    },
    checkActive(data) {
      this.$emit("check-active", data);
    },
  },
};
</script>
