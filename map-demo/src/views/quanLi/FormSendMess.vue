<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="2"> <tab-data-vue></tab-data-vue></b-col>
      <b-col cols="6">
        <h1>GỬI GÓP Ý</h1>
        <!-- form -->
        <div class="sent-mess">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <div class="userSend" v-for="(item, index) in user" :key="index">
              <b-form-group
                id="input-group-user"
                label="User người dùng:"
                label-for="input-conten"
              >
                <b-form-input
                  id="input-user"
                  type="text"
                  required
                  :placeholder="item.userName"
                  readonly
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="selectCate">
              <b-form-group
                id="input-group-cate"
                label="Chọn danh mục:"
                label-for="input-cate"
              >
                <b-form-select
                  id="input-cate"
                  v-model="form.cate"
                  :options="cates"
                  required
                ></b-form-select>
              </b-form-group>
            </div>

            <div class="form-khac">
              <div v-if="form.cate === 'khác'">
                <b-form-group id="input-group-khac" label-for="input-khac">
                  <b-form-input
                    id="input-khac"
                    v-model="form.content_feetback"
                    type="text"
                    placeholder="Nội dung khác..."
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div v-else></div>
            </div>

            <div class="writeContent">
              <b-form-group
                id="input-group-conten"
                label="Nội dung phản ánh:"
                label-for="input-conten"
              >
                <b-form-textarea
                  id="textarea-formatter"
                  v-model="text1"
                  placeholder="Hãy nhập nội dung bạn muốn phản ánh cùng vị trí"
                  :formatter="formatter"
                ></b-form-textarea>
              </b-form-group>
            </div>

            <div class="chooseImage">
              <b-form-file
                v-model="file1"
                :state="Boolean(file1)"
                placeholder="Hãy chọn một bức ảnh"
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <!-- <div class="mt-3">Chọn ảnh để phản ánh: {{ file1 ? file1.name : '' }}</div> -->

              <!-- Plain mode -->
              <!-- <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
              <div class="mt-3">Tệp đã nhận đc: {{ file2 ? file2.name : '' }}</div> -->
            </div>

            <div class="button-form">
              <b-button type="submit" variant="primary" class="sub"
                >Gửi</b-button
              >
              <b-button type="reset" variant="danger" class="res"
                >Tạo lại</b-button
              >
            </div>
          </b-form>

          <!-- <b-card class="mt-3" header="Dữ hiệu đã gửi">
            <pre class="m-0">{{ form }}</pre>
            </b-card> -->
          <compo-user-vue></compo-user-vue>
        </div>
      </b-col>
      <b-col cols="4"> <com-imf-coso></com-imf-coso></b-col>
    </b-row>
  </b-container>
</template>

<script>
import TabDataVue from "@/components/tab/TabData.vue";
import CompoUserVue from "@/components/user/CompoUser.vue";
import ComImfCoso from "@/views/quanLi/ComInfCoso.vue";
export default {
  components: {
    CompoUserVue,
    TabDataVue,
    ComImfCoso,
  },
  mounted() {
    this.$root.$refs.compData.userName();
    console.log("log2", this.$root.$refs.compData.userName());
  },
  data() {
    return {
      user: [
        {
          userImg: "userimage1.jpg",
          userName: "user 1",
        },
      ],
      file1: null,
      file2: null,
      form: {
        tên: "",
        name: "",
        cate: null,
      },
      cates: [
        { text: "Chọn danh mục góp ý", value: null },
        "Trồng cây xanh đường phố",
        "Cắt tỉa cây",
        "Cây nguy hiểm",
        "Chặt hạ, di chuyển cây xanh",
        "khác",
      ],
      show: true,
      userName: " ",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      console.log("log", this.$root.$refs.compData.userName());
      event.preventDefault();
      // Reset our form values
      this.form.content_feetback = "";
      this.form.name = "";
      this.form.cate = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.selectCate,
.writeContent,
.chooseImage {
  padding-bottom: 20px;
}
.sub {
  margin: 10px 100px;
}
h1 {
  margin: 40px 0;
  font-family: "Trirong", serif;
  font-weight: 600;
}
.sent-mess {
  text-align: left;
  width: 500px;
  margin: 0 20%;
}
.sub,
.res {
  color: #fff !important;
  background: #5d5e83fb !important;
  width: 80px !important;
  height: 40px !important;
  border: none;
}
.sub:hover,
.res:hover {
  color: #fff !important;
  background: #5d5d5d !important;
  width: 80px !important;
  height: 40px !important;
}
</style>
