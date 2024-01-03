<template>
  <div class="child-table-part">
    <div class="text-info text-uppercase">
      <strong>{{ title }}</strong>
      <b-button
        v-if="!readOnly"
        class="ml-1"
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
      </b-button>
    </div>
    <b-table
      ref="fire-station-table"
      v-if="items.length > 0"
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
      <template #cell(IsActive)="row">
        <!-- <div style="max-width: 120px"> -->
        <div style="width: 90px">
          <Status
            :color="row.item.IsActive ? 'green' : 'gray'"
            :label="row.item.IsActive ? $t('npl.using') : $t('npl.not-use')"
            :showCircle="false"
          ></Status>
        </div>
      </template>
      <template #cell(Action)="row">
        <div class="d-flex justify-content-center" style="cursor: pointer">
          <i
            @click="remove(row.item)"
            class="fas fa-trash-alt text-danger mr-2 btn-opacity"
          ></i>
          <i @click="edit(row.item)" class="fas fa-edit btn-opacity"></i>
        </div>
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
  props: [
    "fields",
    "items",
    "tableName",
    "title",
    "readOnly",
    "showAdd",
    'defaultSelect',
  ],
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
        const table = this.$refs["fire-station-table"];
        if(table) {
          const index = this.items.findIndex(item => item.StationID == this.defaultSelect)
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
      // console.log("fire station table", item);
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
  th,
  td {
    padding: 0.3rem 0.5rem;
  }
  .btn-opacity {
    transition: 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
