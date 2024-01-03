<template>
  <div>
    <b-table
      id="npl-table-list-file"
      class="npl-table-list-file"
      :fields="fields"
      :items="items"
      bordered
      responsive
      show-empty
      head-variant="light"
    >
      <template #cell(LinkFile)="row">
        <div v-for="(item, index) in row.item.LinkFile.split(';')" :key="index">
          <a :href="item" target="_blank" download>{{ row.item.FileName.split(',')[index] }}</a>
        </div>
      </template>
      <template #cell(Action)="row">
        <div class="text-center" style="cursor: pointer">
          <i
            @click="removeFile(row.item)"
            class="fas fa-trash-alt text-danger mr-2"
          ></i>
          <i @click="editFile(row.item)" class="fas fa-edit mr-2"></i>
        </div>
      </template>
    </b-table>
    <!-- <b-pagination
      align="center"
      :total-rows="totalRows"
      :per-page="perPage"
      v-model="currentPage"
    >
      <template v-slot:next-text>
        <i class="simple-icon-arrow-right" />
      </template>
      <template v-slot:prev-text>
        <i class="simple-icon-arrow-left" />
      </template>
      <template v-slot:first-text>
        <i class="simple-icon-control-start" />
      </template>
      <template v-slot:last-text>
        <i class="simple-icon-control-end" />
      </template>
    </b-pagination> -->
  </div>
</template>

<script>
export default {
  props: ["fields", "items"],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
  methods: {
    removeFile(item) {
      this.$bvModal
        .msgBoxConfirm(this.$t("modal.confirm-delete") + " ?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$emit("removeFile", item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editFile(item) {
      this.$emit("editFile", item);
    }
  },
};
</script>

<style lang="scss" scoped></style>