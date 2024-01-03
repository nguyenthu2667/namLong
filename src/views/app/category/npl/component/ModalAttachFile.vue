<template>
  <b-modal
    id="modal-attach-file"
    :title="$t('modal.attach-file')"
    :ok-title="$t('modal.agree')"
    :cancel-title="$t('modal.cancel')"
    @hidden="hiddenModal"
    @ok="emitData"
  >
    <b-row>
      <b-col lg="12">
        <b-form-group
          :label="$t('title')"
          :invalid-feedback="$t('form.no-blank')"
          :state="checkIsValid('Name')"
        >
          <b-form-input v-model="dataForm.Name"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group
          :label="$t('modal.file-attach')"
          :invalid-feedback="$t('form.no-blank')"
          :state="checkIsValid('File')"
        >
          <b-form-file
            :placeholder="$t('modal.please-choose-file')"
            multiple
            :browse-text="$t('modal.choose-file')"
            v-model="dataForm.File"
          ></b-form-file>
        </b-form-group>
      </b-col>
      <b-col lg="12" v-if="dataForm.ID && LinkFileArr.length > 0" class="mb-2">
        <label class="text-dark">File hiện tại</label>
        <div v-for="(item, index) in LinkFileArr" :key="item.ID">
          <a :href="item.link" download>{{ FileNameArr[index].name }}</a>
          <i
            @click="removeFile(item.ID, FileNameArr[index].name)"
            class="fas fa-trash-alt text-danger ml-2"
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
  </b-modal>
</template>

<script>
export default {
  props: ["show", "formEdit"],
  data() {
    return {
      dataForm: {
        Name: "",
        Note: "",
        File: null,
      },
      isCheckIsValid: false,
      LinkFileArr: [],
      FileNameArr: [],
    };
  },
  methods: {
    hiddenModal() {
      this.dataForm = {
        Name: "",
        Note: "",
        File: null,
      };
      this.isCheckIsValid = false;
      this.$emit("hidden");
    },
    checkIsValid(key) {
      const notRequired = ['ID', 'Note']
      //có bắt đầu kiểm có giá trị
      if (!this.isCheckIsValid) {
        return true;
      }
      if (notRequired.includes(key)) {
        return true;
      }
      if(key === 'File') {
        if(this.dataForm.LinkFile && this.LinkFileArr.length > 0) {
          return true
        }
      }
      const value = this.dataForm[key];
      // console.log(value);
      if (value || value === 0 || value === false) {
        // console.log(key);
        return true;
      } else {
        return false;
      }
    },
    checkFormValidate() {
      let result = true;
      for (const key in this.dataForm) {
        // console.log(key);
        result = this.checkIsValid(key);
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          break;
        }
      }
      return result;
    },
    emitData(bvModalEvent ) {
      bvModalEvent.preventDefault();

      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) return
      const obj = {...this.dataForm}
      if(this.dataForm.ID) {
        obj.OldLinks = this.LinkFileArr.map(item => item.link).join(';')
      }
      this.$emit('submitData', obj)
    },
    removeFile(id, name) {
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-delete")} ${name}?`,
          {
            title: "CẢNH BÁO",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Đồng ý",
            cancelTitle: "Hủy",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
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

<style lang="scss" scoped></style>
