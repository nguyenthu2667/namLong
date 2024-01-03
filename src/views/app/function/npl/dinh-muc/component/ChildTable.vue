<template>
  <div class="npl-child-table">
    <div class="text-info text-uppercase">
      <strong>{{ title }}</strong>
      <template>
        <b-button
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
          :disabled="!disableAdd"
          @click="add"
        >
          <i class="fas fa-plus"></i> <b>{{ $t("npl.button.add") }}</b>
        </b-button>
      </template>
    </div>
    <template v-if="items?.length > 0">
      <b-table
        id="table-child"
        ref="npl-child-table"
        :items="items"
        :fields="modifyFields"
        :bordered="true"
        responsive
        head-variant="light"
        select-mode="single"
        hover
      >
        <template
          v-for="(field, index) in fields"
          v-slot:[`cell(${field.key})`]="row"
        >
          <template
            v-if="
              field?.typeCol?.toUpperCase() == 'CURRENCY' ||
              field?.typeCol?.toUpperCase() == 'MONEY'
            "
          >
            <div :key="index" class="text-right">
              {{ convertCurrency(row.item[field.key]) }}
            </div>
          </template>

          <template v-else-if="field?.typeCol?.toUpperCase() == 'ACTION'">
            <div :key="index" class="btn-action">
              <i class="fas fa-edit text-black" @click="edit(row)"></i>
              <i
                class="fad fa-trash-alt text-danger"
                @click="remove(row, index)"
              ></i>
            </div>
          </template>
          <template v-else>
            {{ row.item[field.key] }}
          </template>
        </template>
      </b-table>
      <b-pagination
        align="center"
        :total-rows="items.length"
        :per-page="10"
        v-model="currentPage"
        size="sm"
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
      </b-pagination>
    </template>
    <template v-else>{{ $t("cards.no-data") }}</template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    pDataCurrency: {
      type: Object,
      default: () => {},
    },
    disableAdd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },

  computed: {
    modifyFields() {
      if (this.fields?.length > 0) {
        const arr = [...this.fields];
        const obj = arr.find((item) => item.key == "Action");
        if (!this.disableAdd) {
          obj.thClass = "d-none";
          obj.tdClass = "d-none";
        } else {
          obj.thClass = "text-center";
          obj.tdClass = "text-center";
        }
        return [...arr, obj];
      }
      return [];
    },
  },
  methods: {
    convertCurrency(value) {
      if (!value && value != 0) {
        return "";
      }
      if (this.pDataCurrency.currency.toUpperCase() == "VN") {
        return Number(value).toLocaleString("vi-VN");
      } else if (this.pDataCurrency.currency.toUpperCase() == "EN") {
        return Number(value).toLocaleString("en-US");
      }
    },
    add() {
      this.$emit("add");
    },
    remove(row) {
      this.$emit("remove", row);
    },
    edit(row) {
      this.$emit("edit", row);
    },
    rowSelected(item) {
      if (item.length > 0) {
        this.$emit("rowSelected", item);
      }
    },
    chagneOtherValue(value) {
      const obj = {
        value,
      };
      this.$emit("chagneOtherValue", obj);
    },
  },
};
</script>

<style lang="scss">
.npl-child-table {
  #table-child {
    th,
    td {
      vertical-align: middle;
    }
  }
  .btn-remove {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f5f5f5;
      opacity: 0.7;
    }
  }
  .btn-action {
    i {
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: #f5f5f5;
        opacity: 0.7;
      }
    }
  }
  .text-normal {
    color: black;
    font-size: 13px;
  }
  .btn-add-new {
    font-size: 11px;
    transition: 0.3;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }

  .frame-input-special {
    .form-control {
      border: none;
      padding: 0;
    }
    .form-control:disabled {
      background-color: white;
    }
    .form-group {
      margin-bottom: 0;
    }
  }
}
</style>
