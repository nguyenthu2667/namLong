<template>
  <div class="npl-child-table">
    <template v-if="isShowTotal">
      <div class="d-flex justify-content-between text-info text-uppercase">
        <div>
          <strong>{{ title }}</strong>
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
            :style="{
              visibility:
                currentMode === 'adding' || currentMode === 'editing'
                  ? 'visible'
                  : 'hidden',
            }"
            @click="add"
          >
            <i class="fas fa-plus" /> <b>{{ $t("npl.button.add") }}</b>
          </b-button>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <strong>{{ $t("npl.total") + ":" }}</strong>
          <strong class="ml-1">{{ otherValue }}</strong>
        </div>
      </div>
    </template>
    <div
      v-else-if="!isShowTitleNomal"
      class="text-info text-uppercase"
    >
      <strong>{{ title }}</strong>
      <!-- <template v-if="tableName == 'MaintenanceAllowancesWorks'"> -->
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
        :style="{
          visibility: !hiddenBtnAdd
            ? currentMode === 'adding' || currentMode === 'editing'
              ? 'visible'
              : 'hidden'
            : 'hidden',
        }"
        @click="add"
      >
        <i class="fas fa-plus" /> <b>{{ $t("npl.button.add") }}</b>
      </b-button>
      <!-- </template> -->
      <!-- <template v-else>
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
          :style="{
            visibility:
              currentMode === 'adding' || currentMode === 'editing'
                ? 'visible'
                : 'hidden',
          }"
          @click="add"
        >
          <i class="fas fa-plus"></i> <b>{{ $t("npl.button.add") }}</b>
        </b-button>
      </template> -->
    </div>
    <div v-else class="text-normal">
      <div class="d-flex justify-content-between align-items-center frame-input-special">
        <div>
          <strong>{{ title }}</strong>
          <i class="fas fa-plus btn-add-new" @click="add"></i>
        </div>
        <div
          class="d-flex justify-content-center align-items-center text-danger"
        >
          <strong>{{ $t("npl.other") + ":" }}</strong>
          <b-form-group :invalid-feedback="$t('form.no-blank')">
            <b-form-input
              v-model="otherValue"
              class="ml-2 text-right text-danger"
              :disabled="
                currentMode === 'adding' || currentMode === 'editing'
                  ? false
                  : true
              "
              @change="changeOtherValue"
              @input="changeOtherValue"
              type="number"
              style="width: 60px; border: 1px solid #f3f3f3; padding: 5px"
            />
          </b-form-group>
          <span class="d-inline-block ml-1">/lít</span>
        </div>
      </div>
    </div>
    <template v-if="items.length > 0">
      <b-table
        id="table-child"
        ref="npl-child-table"
        :items="items"
        :fields="modifyFields"
        :bordered="true"
        responsive
        head-variant="light"
        select-mode="single"
        selectable
        sticky-header
        :filter="filter"
        @row-selected="rowSelected"
      >
        <template
          v-for="(field, index) in fields"
          v-slot:[`cell(${field.key})`]="row"
        >
          <template
            v-if="
              field.type.toUpperCase() == 'CURRENCY' ||
              field.type.toUpperCase() == 'MONEY'
            "
          >
            <div :key="index" class="text-right">
              {{ convertCurrency(row.item[field.key]) }}
            </div>
          </template>
          <template v-else-if="field.type.toUpperCase() == 'ACTION'">
            <div :key="index" class="btn-action">
              <i class="fas fa-edit text-black" @click="edit(row.item)"></i>
              <i
                class="fad fa-trash-alt text-danger"
                @click="remove(row.item)"
              ></i>
            </div>
          </template>
          <template v-else>
            {{ row.item[field.key] }}
          </template>
        </template>
      </b-table>
      <!-- <b-pagination
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
      </b-pagination> -->
    </template>
    <template v-else>{{ $t("cards.no-data") }}</template>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "items",
    "fields",
    "tableName",
    "currentMode",
    "formatCurrency",
    "defaultSelect",
    "hiddenBtnAdd",
    "isShowTitleNomal",
    "otherValue",
    "isShowTotal",
  ],
  data() {
    return {
      currentPage: 1,
      filter: "",
    };
  },
  computed: {
    modifyFields() {
      if (this.fields?.length > 0) {
        const arr = [...this.fields];
        const obj = arr.find((item) => item.key == "Action");
        if (this.currentMode === "readOnly") {
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
  watch: {
    items() {
      if (this.tableName == "MaintenanceAllowancesPeriods") {
        setTimeout(() => {
          const table = this.$refs["npl-child-table"];
          if (table) {
            //chọn row đầu tiên cho nó có màu background
            table.selectRow(0);
          }
        }, 50);
      }
    },
  },
  methods: {
    convertCurrency(value) {
      if (!value && value != 0) {
        return "";
      }
      if (this.formatCurrency.toUpperCase() == "VN") {
        return Number(value).toLocaleString("vi-VN");
      } else if (this.formatCurrency.toUpperCase() == "EN") {
        return Number(value).toLocaleString("en-US");
      }
    },
    add() {
      this.$emit("add", this.tableName);
    },
    remove(row) {
      if (this.currentMode === "adding" || this.currentMode === "editing") {
        const obj = {
          item: row,
          tableName: this.tableName,
        };
        this.$emit("remove", obj);
      }
    },
    edit(row) {
      if (this.currentMode === "adding" || this.currentMode === "editing") {
        const obj = {
          item: row,
          tableName: this.tableName,
        };
        this.$emit("edit", obj);
      }
    },
    rowSelected(item) {
      if (item.length > 0) {
        this.$emit("rowSelected", item);
      }
    },
    changeOtherValue(value) {
      const obj = {
        value,
        tableName: this.tableName,
      };
      this.$emit("changeOtherValue", obj);
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
    // width: 30px;
    // height: 30px;
    // margin: auto;
    // line-height: 30px;
    // border-radius: 50%;
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
