<template>
  <div class="child-table-part">
    <div class="text-info text-uppercase">
      <strong>{{ title }}</strong>
      <b-button
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
      </b-button>
    </div>
    <b-table
      v-if="items.length > 0"
      :items="items"
      :fields="fieldsCustom"
      :bordered="true"
      show-empty
      head-variant="light"
      id="table-child"
      sticky-header
      style="max-height: 300px;"
      class="border-bottom"
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
            class="fas fa-trash-alt text-danger mr-2"
          ></i>
          <i @click="edit(row.item)" class="fas fa-edit"></i>
        </div>
      </template>
      <template #cell(PhoneNumber)="row">
        <div class="text-right">{{ row.item.PhoneNumber }}</div>
      </template>
      <template #cell(TaxCode)="row">
        <div class="text-right">{{ row.item.TaxCode }}</div>
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
  props: ["fields", "items", "tableName", "title", "readOnly"],
  components: { Status },
  computed: {
    fieldsCustom() {
      if(this.fields) {
        let newFields = [...this.fields]
        if(!this.readOnly) {
          newFields.push({ key: "Action", label: "Thao tác" })
        }
        return newFields
      }
    }
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
}
</style>
