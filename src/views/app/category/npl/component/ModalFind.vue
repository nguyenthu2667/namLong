<template>
  <b-modal
    id="modal-find-advance"
    :title="$t('modal-find.title')"
    size="lg"
    @ok="search"
    @cancel="resetSearch"
    @hidden="hiddenModal"
    cancel-variant="outline-danger"
    :ok-title="$t('menu.search')"
    :cancel-title="$t('modal-find.reset')"
  >
    <template v-for="(field, i) in dataSearch">
      <b-row
        :key="i"
        class="justify-content-between align-items-center mb-1"
      >
        <template v-if="field.Name.toUpperCase() === 'ISACTIVE' || field.Name.toUpperCase() === 'ISATTACHFILE'">
          <b-col lg="6">
            <b-row class="align-items-center">
              <b-col lg="6">
                <strong>{{ field.Label }}</strong>
              </b-col>
              <b-col lg="6" class="pr-0">
                <div
                  style="width: 100%; white-space: nowrap"
                  class="text-right"
                >
                  <span style="color: #145388">
                    <b>
                      {{
                        field.OperatorDescription ||
                        $t("modal.choose-type-search")
                      }}
                    </b>
                  </span>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="6">
            <div>{{$t('modal-find.value1')}}</div>
            <b-form-select
              :options="field.SearchOption"
              v-model="field.Param1"
            ></b-form-select>
          </b-col>
        </template>
        <template v-else>
          <b-col lg="6">
            <b-row class="align-items-center">
              <b-col lg="6">
                <strong>{{ field.Label }}</strong>
              </b-col>
              <b-col lg="6" class="pr-0">
                <div
                  style="width: 100%; white-space: nowrap"
                  class="text-right"
                >
                  <span style="color: #145388"
                    ><b>{{
                      field.OperatorDescription ||
                      $t("modal.choose-type-search")
                    }}</b></span
                  >
                  <b-dropdown
                    class="title-dropdown ml-1"
                    variant="link"
                    toggle-class="text-decoration-none"
                  >
                    <b-dropdown-item
                      v-for="(option, index2) in field.SearchOption"
                      :key="index2"
                      @click="changeTypeSearch(option, field.Name)"
                    >
                      {{ option.text }}</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            lg="6"
            class="d-flex"
            v-if="field.Type.toUpperCase() == 'DATE'"
          >
            <div class="w-100">
              <div>{{$t('modal-find.value1')}}</div>
              <datepicker
                :language="locale"
                :format="datePickerFormat"
                :bootstrap-styling="true"
                :placeholder="$t('modal.day-select')"
                v-model="field.Param1"
                @input="formatDateToServer(field.Param1, field)"
              ></datepicker>
            </div>
            <div v-if="field.Operator === 'between'" class="w-100 ml-2">
              <div>{{$t('modal-find.value2')}}</div>
              <datepicker
                :language="locale"
                :placeholder="$t('modal.day-select')"
                :format="datePickerFormat"
                :bootstrap-styling="true"
                v-model="field.Param2"
                @input="formatDateToServer(field.Param2, field)"
              ></datepicker>
            </div>
          </b-col>
          <b-col lg="6" class="d-flex" v-else>
            <div class="w-100">
              <div>{{$t('modal-find.value1')}}</div>
              <b-form-input v-model="field.Param1"></b-form-input>
            </div>
            <div v-if="field.Operator === 'between'" class="w-100 ml-2">
              <div>{{$t('modal-find.value2')}}</div>
              <b-form-input v-model="field.Param2"></b-form-input>
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
  props: [
    "show",
    "methodsSearch",
    "dataSearch",
  ],
  mixins: [datepickerMixin],
  methods: {
    changeTypeSearch(option, name) {
      const obj = this.dataSearch.find((item) => item.Name === name);
      obj.Operator = option.value;
      obj.OperatorDescription = option.text;
    },
    hiddenModal() {
      this.$emit("hidden");
    },
    search() {
      this.$emit("search", this.dataSearch);
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
        this.$bvModal.show("modal-find-advance");
      } else {
        this.$bvModal.hide("modal-find-advance");
      }
    },
  },
};
</script>

<style lang="scss">
#modal-find-advance {
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
