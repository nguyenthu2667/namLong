<template>
  <div class="child-table-part">
    <div class="text-info text-uppercase" style="height: 24px">
      <strong>{{ title }}</strong>
      <!-- <b-button
        v-if="!readOnly"
        class="ml-1 mb-1"
        squared
        :variant="`outline-primary`"
        size="sm"
        style="
          height: 24px;
          padding: 1px;
          padding-left: 3px;
          padding-right: 3px;
        "
        @click="add"
      >
        <i class="fas fa-plus"></i> <b>{{ $t("npl.button.add") }}</b>
      </b-button> -->
    </div>
    <b-table
      v-if="items.length > 0"
      ref="location-table"
      :items="items"
      :fields="fields"
      :bordered="true"
      show-empty
      head-variant="light"
      id="table-child"
      class="border-bottom"
      select-mode="single"
      selectable
      @row-selected="rowSelected"
    >
      <template #cell(Action)="row">
        <div class="d-flex justify-content-center" style="cursor: pointer">
          <i @click="edit(row.item)" class="fas fa-edit btn-opacity"></i>
        </div>
      </template>
      <template #empty>
        {{ $t("cards.no-data") }}
      </template>
    </b-table>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import Status from "@/components/Badges/StatusColor.vue";

export default {
  props: ["fields", "items", "tableName", "title", "readOnly", "showAdd", 'defaultSelect'],
  components: { Status },
  computed: {
    // fieldsCustom() {
    //   if(this.fields) {
    //     let newFields = [...this.fields]
    //     if(!this.readOnly) {
    //       // newFields.push({ key: "Action", label: "Thao tác" })
    //     }
    //     return newFields
    //   }
    // }
  },
  watch: {
    items() {
      setTimeout(() => {
        const table = this.$refs["location-table"];
        if(table) {
          const index = this.items.findIndex(item => item.ID == this.defaultSelect)
          table.selectRow(index)
        }
      }, 50);
    },
  },
  methods: {
    add() {
      this.$emit("add", this.tableName);
    },
    remove(item) {
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
            const obj = {
              item,
              tableName: this.tableName,
            };
            this.$emit("remove", obj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(item) {
      const obj = {
        item,
        tableName: this.tableName,
      };
      this.$emit("edit", obj);
    },
    rowSelected(item) {
      if (item.length > 0) {
        this.$emit("rowSelected", item);
      }
    },
  },
};
</script>

<style lang="scss">
#table-child {
  th {
    // white-space: nowrap;
    vertical-align: middle;
  }
}
.child-table-part {
  .b-table-sticky-header {
    margin-bottom: 0;
  }
  .btn-opacity {
    transition: 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
