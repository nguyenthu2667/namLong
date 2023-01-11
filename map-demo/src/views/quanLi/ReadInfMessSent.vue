<template>
  <!-- <div class="fage-read-mess"> -->
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="2"> <tab-data-vue></tab-data-vue></b-col>
      <b-col cols="10">
        <h1 class="title">DANH SÁCH TOÀN BỘ GÓP Ý BẠN ĐÃ GỬI</h1>

        <div class="thao-tac">
          <span>Thao tác: </span>
          <div class="selectAll">
            <span class="px-2 py-2" @click="clickThuHoi()">Thu hồi</span> |
            <span class="px-2 py-2" @click="clickXoa()">Xóa </span> |
            <category-filter-vue></category-filter-vue>
            <modal-read-imf-mess-vue></modal-read-imf-mess-vue>
          </div>
        </div>
        <div class="bang-du-lieu">
          <table-read-messth-table-vue></table-read-messth-table-vue>
          <!-- <table-read-messb-table-vue></table-read-messb-table-vue> -->
        </div>
        <div class="table-read"></div>
      </b-col>
    </b-row>
  </b-container>
  <!-- </div> -->
</template>

<script>
import TabDataVue from "@/components/tab/TabData.vue";
// import TableReadMessbTableVue from '@/components/TableReadMessb-table.vue';
import TableReadMessthTableVue from "@/components/table/TableReadMessth-table.vue";
import CategoryFilterVue from "@/components/filler/CategoryFilter.vue";
import ModalReadImfMessVue from "@/views/quanLi/ModalReadImfMess.vue";
export default {
  name: "read-inf-mess-sent",

  components: {
    CategoryFilterVue,
    TableReadMessthTableVue,
    ModalReadImfMessVue,
    TabDataVue,
    // TableReadMessbTableVue,
  },
  methods: {
    clickThuHoi() {
      alert("Bạn đã thu hồi góp ý ");
    },
    clickXoa() {
      alert("Bạn đã xóa góp ý ");
    },
  },
};
</script>

<style scoped>
.thao-tac {
  display: flex;
  align-items: center;
}

.selectAll {
  display: flex;
  align-items: center;
}
h1 {
  margin: 40px 0;
  font-family: "Trirong", serif;
  font-weight: 600;
}
</style>
