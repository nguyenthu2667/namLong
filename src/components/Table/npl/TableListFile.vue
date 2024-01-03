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
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template #cell(Actions)="row">
        <div class="text-center" style="cursor: pointer">
          <i
            @click="remove(row.item)"
            class="fas fa-trash-alt text-danger mr-2"
          ></i>
          <!-- <i @click="handleDownload(row.item)" class="fas fa-download mr-2"></i> -->
          <i @click="editFile(row.item)" class="fas fa-edit mr-2"></i>
        </div>
      </template>
    </b-table>
    <b-pagination
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
    </b-pagination>
  </div>
</template>

<script>
export default {
  // props: ["fields", "items"],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      //static
      fields: [
        {
          key: "dateTime",
          label: "Thời gian",
        },
        {
          key: "userName",
          label: "Người thực hiện",
        },
        { key: "name", label: "Tiêu đề" },
        {
          key: "file",
          label: "File đính kèm",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "Actions",
          label: "Thao tác",
        },
      ],
      items: [
        {
          id: 0,
          dateTime: "13:10 10/11/2022",
          userName: "Trần Thanh Tú",
          name: "Đính kèm số 1",
          file: "Hóa đơn bán hàng",
          note: "...",
        },
        {
          id: 1,
          dateTime: "15:10 10/11/2022",
          userName: "Trần Thanh B",
          name: "Đính kèm số 2",
          file: " Hợp đồng abc",
          note: "...",
        },
        {
          id: 2,
          dateTime: "16:10 12/11/2022",
          userName: "Trần Thanh C",
          name: "Đính kèm số 3",
          file: "Bảng kê abc",
          note: "...",
        },
      ],
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
  methods: {
    remove(row) {
      this.items = this.items.filter((r) => r.id != row.id);
    },
    editFile() {

    },
    handleDownload(row) {
      this.$notify("warning", "THÔNG BÁO", "Đang tải file xuống máy...", {
        duration: 2000,
        permanent: false,
      });
      setTimeout(() => {
        this.$notify("success", "THÔNG BÁO", "Tải xuống thành công !.", {
          duration: 3000,
          permanent: false,
        });
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>