<template>
  <b-modal
    id="modal-print-special"
    title="DANH SÁCH MẪU IN"
    size="lg"
    @ok="handlePrint"
    @hidden="hiddenModal"
  >
    <b-row>
      <b-col lg="12">
        <b-table
          select-mode="single"
          bordered
          :items="dataPrint"
          :fields="fieldsPrint"
          selectable
        >
          <template #cell(actions)>
            <div>
              <b-button size="sm" variant="outline-primary">
                <b>chọn</b>
              </b-button>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      fieldsPrint: [
        {
          key: "name",
          label: "Tên",
        },
      ],
      dataPrint: [
        {
          name: "Mẫu In 1",
        },
        {
          name: "Mẫu In 2",
        },
        {
          name: "Mẫu In 3",
        },
      ],
    };
  },
  methods: {
    hiddenModal() {
      this.$emit("hidden");
    },
    handlePrint() {
      this.$notify("warning", "THÔNG BÁO", "Đang tải xử lí...", {
        duration: 2000,
        permanent: false,
      });
      setTimeout(() => {
        this.$notify("success", "THÔNG BÁO", "In thành công !", {
          duration: 3000,
          permanent: false,
        });
      }, 2000);
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

<style lang="scss" scoped></style>
