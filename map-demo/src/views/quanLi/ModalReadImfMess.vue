<template>
  <div>
    <!-- modal imformation -->
    <b-modal
      id="modal-scrollable"
      scrollable
      ref="my-modal"
      hide-footer
      :title="cate_feedback"
    >
      <div class="d-block text-center">
        <h4>NỘI DUNG:</h4>
        <p class="my-4">{{ con_compact }}</p>
        <!-- <img :src="require(`@/assets/${modalImg}`)" alt="" class="img-modal" /> -->
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteModal"
        >Xóa</b-button
      >
      <b-button
        class="mt-2"
        variant="outline-warning"
        block
        @click="recallModal"
        >Thu hồi</b-button
      >
    </b-modal>

    <!-- modal delete -->
    <b-modal
      id="modal-scrollable"
      scrollable
      ref="delete-modal"
      hide-footer
      title="Xóa thư"
    >
      <div class="d-block text-center">
        <p class="my-4">Bạn có chắc muốn xóa thư góp ý này</p>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalDe"
        >Đồng ý</b-button
      >
      <b-button
        class="mt-2"
        variant="outline-warning"
        block
        @click="toggleModalDe"
        >Hủy</b-button
      >
    </b-modal>

    <!-- modal recall -->
    <b-modal
      id="modal-scrollable"
      scrollable
      ref="recall-modal"
      hide-footer
      title="Thu hồi thư"
    >
      <div class="d-block text-center">
        <p class="my-4">Bạn có chắc muốn thu hồi thư góp ý này</p>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalRe"
        >Đồng ý</b-button
      >
      <b-button
        class="mt-2"
        variant="outline-warning"
        block
        @click="toggleModalRe"
        >Hủy</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "modal-imf",
  props: {
    // id_send: Intl,
    cate_feedback: String,
    con_compact: String,
    modalImg: String,
  },
  methods: {
    //hiển thị modal
    showModal() {
      this.$refs["my-modal"].show();
    },

    //Xóa  modal
    deleteModal() {
      this.$refs["delete-modal"].show();
    },

    //thu hồi
    recallModal() {
      this.$refs["recall-modal"].show();
    },

    //đồng ý delete
    hideModalDe() {
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.$refs["delete-modal"].toggle("#toggle-btn");
    },

    //đồng ý recall
    hideModalRe() {
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.$refs["recall-modal"].toggle("#toggle-btn");
    },

    //hủy delete
    toggleModalDe() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.$refs["delete-modal"].toggle("#toggle-btn");
    },

    //hủy recall
    toggleModalRe() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.$refs["recall-modal"].toggle("#toggle-btn");
    },
  },
  created() {
    this.$root.$refs.modalRead = this;
  },
};
</script>
