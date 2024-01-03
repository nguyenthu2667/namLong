<template>
  <b-modal
    id="modal-print-special"
    :title="$t('modal-print.title')"
    size="md"
    hide-footer
    @hidden="hiddenModal"
  >
    <b-table
      v-if="dataPrint && dataPrint.length > 0"
      select-mode="single"
      bordered
      :items="dataPrint"
      :fields="fieldsPrint"
      selectable
      @row-clicked="rowClicked"
    >
      <template #cell(Download)>
        <i class="fas fa-download text-info"></i>
      </template>
    </b-table>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["show", "dataPrint"],
  data() {
    return {
      fieldsPrint: [
        {
          key: "FormPrintName",
          label: "File",
        },
        {
          key: "Download",
          label: "Download",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  methods: {
    hiddenModal() {
      this.$emit("hidden");
    },
    rowClicked(item) {
      this.$emit("formPrint", item);
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-print-special");
      } else {
        this.$bvModal.hide("modal-print-special");
      }
    },
  },
};
</script>
