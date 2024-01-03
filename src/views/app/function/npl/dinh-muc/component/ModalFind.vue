<template>
  <b-modal
    id="modal-find-advance-tree"
    :title="$t('modal-find.title')"
    size="lg"
    @ok="search"
    @cancel="resetSearch"
    @hidden="hiddenModal"
    cancel-variant="outline-danger"
    :ok-title="$t('menu.search')"
    :cancel-title="$t('modal-find.reset')"
  >
    <template v-for="(field, i) in filteredSearch">
      <b-row :key="i" class="justify-content-between align-items-center mb-1">
        <template>
          <b-col lg="4">
            <strong>{{ field.label }}</strong>
          </b-col>
          <b-col lg="8">
            <div class="d-flex gap-8">
              <div
                style="color: #145388; white-space: nowrap"
                class="w-40 mt-2 text-right"
              >
                <template v-if="field.typeCol?.toUpperCase() === 'BIT'">
                  <b>{{
                    field.OperatorDescription || $t("modal.choose-type-search")
                  }}</b>
                </template>
                <template
                  v-else-if="field.typeCol?.toUpperCase() === 'ISCHECK'"
                >
                  <b>{{
                    field.OperatorDescription || $t("modal.choose-type-search")
                  }}</b>
                </template>
                <template v-else>
                  <b>{{
                    field.OperatorDescription || $t("modal.choose-type-search")
                  }}</b>
                  <b-dropdown
                    class="title-dropdown ml-1"
                    variant="link"
                    toggle-class="text-decoration-none"
                  >
                    <b-dropdown-item
                      v-for="(option, index2) in field.SearchOption"
                      :key="index2"
                      @click="changeTypeSearch(option, field.key)"
                    >
                      {{ option.text }}</b-dropdown-item
                    >
                  </b-dropdown>
                </template>
              </div>
              <template v-if="field.typeCol?.toUpperCase() === 'BIT'">
                <div class="w-100">
                  <div>{{ $t("modal-find.value1") }}</div>
                  <b-form-select
                    :options="field.SearchOption"
                    v-model="field.Param1"
                  ></b-form-select>
                </div>
              </template>
              <template v-else-if="field.typeCol?.toUpperCase() === 'ISCHECK'">
                <div class="w-100">
                  <div>{{ $t("modal-find.value1") }}</div>
                  <b-form-select
                    :options="field.SearchOption"
                    v-model="field.Param1"
                  ></b-form-select>
                </div>
              </template>
              <template v-else>
                <div class="w-100">
                  <div>{{ $t("modal-find.value1") }}</div>
                  <b-form-input v-model="field.Param1"></b-form-input>
                </div>
                <div v-if="field.Operator === 'between'" class="w-100 ml-2">
                  <div>{{ $t("modal-find.value2") }}</div>
                  <b-form-input v-model="field.Param2"></b-form-input>
                </div>
              </template>
            </div>
          </b-col>
        </template>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
import moment from "moment";
import datepickerMixin from "@/views/app/category/npl/mixin/datepickerMixin";

export default {
  props: ["fields", "show", "filteredSearch"],
  mixins: [datepickerMixin],
  methods: {
    changeTypeSearch(option, key) {
      const obj = this.filteredSearch.find((item) => item.key === key);
      obj.Operator = option.value;
      obj.OperatorDescription = option.text;
    },
    hiddenModal() {
      this.$emit("hidden");
    },
    search() {
      this.$emit("search", this.filteredSearch);
    },
    resetSearch(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.$emit("resetSearch");
    },
    formatDateToServer(value, field) {
      const obj = this.dataSearch.find((item) => item.Name == field.Name);
      if (obj.Param1) {
        obj.Param1 = moment(obj.Param1).format("YYYY-MM-DD");
      }
      if (obj.Param2) {
        obj.Param2 = moment(obj.Param2).format("YYYY-MM-DD");
      }
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-find-advance-tree");
      } else {
        this.$bvModal.hide("modal-find-advance-tree");
      }
    },
  },
};
</script>

<style lang="scss">
#modal-find-advance-tree {
  .title-dropdown button {
    font-size: 20px;
    padding: 0;
  }
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  .vdp-datepicker {
    .form-control[readonly] {
      background: none;
    }
  }
}
</style>
<style scoped>
.gap-8 {
  gap: 20px;
}
</style>
