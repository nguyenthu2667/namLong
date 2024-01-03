<template>
  <b-modal
    id="modal-attach-file"
    :title="$t('modal.attach-file')"
    :ok-title="$t('modal.agree')"
    :cancel-title="$t('modal.cancel')"
    @hidden="hiddenModal"
    @ok="handleOk"
  >
    <form ref="formAttach" @submit.stop.prevent="emitSubmit">
      <b-row>
        <b-col lg="12">
          <b-form-group
            :label="$t('title')"
            :invalid-feedback="$t('form.no-blank')"
            :state="stateForm.Name"
            label-for="Name-input-attach"
          >
            <b-form-input
              class="text-left"
              type="text"
              v-model="dataForm.Name"
              id="Name-input-attach"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group
            :label="$t('modal.file-attach')"
            :invalid-feedback="$t('form.no-blank')"
            :state="LinkFileArr.length > 0 ? true : stateForm.File"
            label-for="File-input-attach"
          >
            <b-form-file
              :placeholder="$t('modal.please-choose-file')"
              multiple
              :browse-text="$t('modal.choose-file')"
              v-model="dataForm.File"
              id="File-input-attach"
              required
            ></b-form-file>
          </b-form-group>
        </b-col>
        <b-col
          lg="12"
          v-if="dataForm.ID && LinkFileArr.length > 0"
          class="mb-2"
        >
          <label class="text-dark">File hiện tại</label>
          <div
            v-for="(item, index) in LinkFileArr"
            :key="item.ID"
            class="d-flex align-items-center justify-content-between"
          >
            <a :href="item.link" download>{{ FileNameArr[index].name }}</a>
            <i
              @click="removeFile(item.ID, FileNameArr[index].name)"
              class="fas fa-trash-alt text-danger ml-2 trash"
            ></i>
          </div>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="$t('note')">
            <b-form-textarea
              rows="2"
              max-rows="6"
              v-model="dataForm.Note"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    formEdit: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataForm: {
        Name: "",
        Note: "",
        File: null,
      },
      stateForm: {
        Name: null,
        Note: null,
        File: null,
      },
      LinkFileArr: [],
      FileNameArr: [],
    };
  },
  methods: {
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.emitSubmit();
    },
    hiddenModal() {
      this.dataForm = {
        Name: "",
        Note: "",
        File: null,
      };
      this.stateForm = {
        Name: null,
        Note: null,
        File: null,
      };
      this.$emit("hidden");
    },
    checkFormValidity() {
      let valid = this.$refs.formAttach.checkValidity();
      this.stateForm.Name = document
        .getElementById("Name-input-attach")
        .checkValidity();
      this.stateForm.File = document
        .getElementById("File-input-attach")
        .checkValidity();
      return valid;
    },
    emitSubmit() {
      if (!this.LinkFileArr.length > 0) {
        if (!this.checkFormValidity()) return;
      }
      const obj = { ...this.dataForm };
      if (this.dataForm.ID) {
        obj.OldLinks = this.LinkFileArr.map((item) => item.link).join(";");
      }

      this.$emit("submitData", obj);
    },
    removeFile(id, name) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-delete")}  ?`, {
          title: "CẢNH BÁO",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Đồng ý",
          cancelTitle: "Hủy",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.LinkFileArr = this.LinkFileArr.filter(
              (item) => item.ID !== id
            );
            this.FileNameArr = this.FileNameArr.filter(
              (item) => item.ID !== id
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-attach-file");
      } else {
        this.$bvModal.hide("modal-attach-file");
      }
    },
    formEdit(newVal) {
      if (newVal) {
        this.dataForm = {
          ...this.dataForm,
          ...newVal,
        };
        this.LinkFileArr = newVal.LinkFile.split(";").map((item, index) => ({
          ID: index,
          link: item,
        }));

        this.FileNameArr = newVal.FileName.split(",").map((item, index) => ({
          ID: index,
          name: item,
        }));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.trash {
  cursor: pointer;
  opacity: 1;
  transition: 0.3s linear all;
}
.trash:hover {
  opacity: 0.8;
}
</style>
