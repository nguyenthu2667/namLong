<template>
  <!-- <div> -->
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="2"> <tab-data-vue></tab-data-vue></b-col>
      <b-col cols="10">
        <h1>THÔNG TIN NGƯỜI DÙNG</h1>

        <b-container class="row-change-imf-user">
          <b-row class="text-center">
            <b-col cols="10">
              <div class="imf-text" v-for="(item, index) in user" :key="index">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form inline class="full-birth">
                    <b-form-group class="fullname">
                      <b-input-group prepend="Họ và tên" class="mb-2">
                        <b-form-input
                          aria-label="First name"
                          v-model="item.firtName"
                        ></b-form-input>
                        <b-form-input
                          aria-label="Last name"
                          v-model="item.lastName"
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group
                      id="input-group-birthday"
                      label="Ngày sinh:"
                      label-for="input-birthday"
                    >
                      <b-form-datepicker
                        id="input-birthday"
                        type="date"
                        v-model="item.ngaysinh"
                        :date-format-options="{
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }"
                        required
                      ></b-form-datepicker>
                    </b-form-group>

                    <!-- <b-form inline>
                                <b-form-group
                                id="input-group-firtname"
                                label="Họ:"
                                label-for="input-firtname"
                                >
                                    <b-form-input
                                    id="inline-form-input-firtname"
                                  class="mb-2 mr-sm-2 mb-sm-0"
                                    >{{item.firtName}} </b-form-input>
                                </b-form-group>
                              
                                <b-form-group
                                id="input-group-lastname"
                                label="Tên:"
                                label-for="input-lastname"
                                >
                                    <b-form-input
                                    id="inline-form-input-lastname"
                                  class="mb-2 mr-sm-2 mb-sm-0"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                id="input-group-birthday"
                                label="Ngày sinh:"
                                label-for="input-birthday"
                                >
                                <b-form-input id="type-date" type="date"></b-form-input>
                                </b-form-group>

                            </b-form> -->
                  </b-form>

                  <div
                    class="address"
                    v-for="(item, index) in user"
                    :key="index"
                  >
                    <CompoSelectCountryVue
                      :selectTinh="item.selectTinh"
                      :selectXa="item.selectedXa"
                      :soNha="item.soNha"
                    ></CompoSelectCountryVue>
                  </div>

                  <div class="phoneAndEmail">
                    <b-form inline>
                      <b-form-group
                        id="input-group-email"
                        label="Email:"
                        label-for="input-email"
                      >
                        <b-form-input
                          id="input-email"
                          type="email"
                          v-model="item.email"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-phone"
                        label="Số điện thoại:"
                        label-for="input-phone"
                      >
                        <b-form-input
                          id="input-phone"
                          v-model="item.phone"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </b-form>
                  </div>

                  <div class="button-form">
                    <b-button type="submit" variant="primary" class="sub"
                      >Lưu</b-button
                    >
                  </div>
                </b-form>
              </div>
            </b-col>

            <b-col cols="2">
              <div
                class="userChange"
                v-for="(item, index) in user"
                :key="index"
              >
                <img
                  class="imageUser"
                  :src="require(`@/assets/${item.userImg}`)"
                  ref="#"
                />
                <span class="btn-ava">Thay đổi ảnh đại diện</span>

                <b-form inline>
                  <b-form-group
                    id="input-group-username"
                    label="Username:"
                    label-for="input-username"
                  >
                    <span>{{ item.userName }}</span>
                  </b-form-group>
                </b-form>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
  <!-- </div> -->
</template>

<script>
import TabDataVue from "@/components/tab/TabData.vue";
import CompoSelectCountryVue from "@/views/thongTinNguoiDung/CompoSelectCountry.vue";
export default {
  components: {
    CompoSelectCountryVue,
    TabDataVue,
  },
  name: "change-imformation-view",
  data() {
    return {
      test: 10,
      selected: null,
      user: [
        {
          userImg: "userimage1.jpg",
          userName: "user 1",
          firtName: "Nguyễn",
          lastName: "Thư",
          birthday: "1991/06/02",
          email: "shukem0202@gmail.com",
          phone: "0338499514",
          selectTinh: "Tỉnh Nghệ An",
          selectedXa: "Huyện Diễn Châu",
          soNha: "Đội 7, xóm 4, Xã Diễn Trường",
          ngaysinh: "1991-06-02",
        },
      ],
      form: { tên: "", name: "", cate: null },
      show: true,

      Tinh: [
        { value: null, text: "" },
        { value: 1, text: "Thành phố Hà Nội" },
        { value: 37, text: "Tỉnh Nghệ An" },
      ],
      xa: [
        {
          maTinh: 1,
          ten: [
            { value: 1, text: "Quận Ba Đình" },
            { value: 2, text: "Quận Hoàn Kiếm" },
            { value: 3, text: "Quận Tây Hồ" },
            { value: 4, text: "Quận Long Biên" },
            { value: 5, text: "Quận Cầu Giấy" },
            { value: 6, text: "Quận Đống Đa" },
            { value: 7, text: "Quận Hai Bà Trưng" },
            { value: 8, text: "Quận Hoàng Mai" },
            { value: 9, text: "Quận Thanh Xuân" },
            { value: 10, text: "Huyện Sóc Sơn" },
            { value: 11, text: "Quận Nam Từ Liêm" },
          ],
        },

        {
          maTinh: 37,
          ten: [
            { value: 1, text: "Thành phố Vinh" },
            { value: 2, text: "Thị xã Cửa Lò" },
            { value: 3, text: "Thị xã Thái Hoà" },
            { value: 4, text: "Huyện Quế Phong" },
            { value: 5, text: "Huyện Quỳ Châu" },
            { value: 6, text: "Huyện Kỳ Sơn" },
            { value: 7, text: "Huyện Tương Dương" },
            { value: 8, text: "Huyện Nghĩa Đàn" },
            { value: 9, text: "Huyện Quỳ Hợp" },
            { value: 10, text: "Huyện Quỳnh Lưu" },
            { value: 11, text: "Huyện Con Cuông" },
            { value: 12, text: "Huyện Tân Kỳ" },
            { value: 13, text: "Huyện Anh Sơn" },
            { value: 14, text: "Huyện Diễn Châu" },
            { value: 15, text: "Huyện Yên Thành" },
            { value: 16, text: "Huyện Đô Lương" },
            { value: 17, text: "Huyện Thanh Chương" },
            { value: 18, text: "Huyện Nghi Lộc" },
            { value: 19, text: "Huyện Nam Đàn" },
            { value: 20, text: "Huyện Hưng Nguyên" },
            { value: 21, text: "Thị xã Hoàng Mai" },
          ],
        },
      ],

      isIndex: 0,
      isMaTinh: 0,
    };
  },
  // computed() {

  // },
  // created() {

  // },
  methods: {
    changeHuyen(index) {
      return (this.isIndex = index);
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
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
.userChange,
.fullName,
.address,
.full-birth {
  padding-bottom: 50px;
}
.sub {
  margin-right: 20px;
}
#input-group-firtname,
#input-group-lastname,
#input-group-address-tinh {
  margin-right: 50px;
}
#input-email {
  margin-right: 285px;
}
.phoneAndEmail {
  margin-bottom: 50px;
}

.imageUser {
  margin-top: 5px;
  width: 155px;
  height: 155px;
}
</style>
<style>
label {
  margin-right: 20px;
}
.fullname {
  margin-right: 40px;
  width: 550px;
}
H1 {
  margin: 40px 0;
  font-family: "Trirong", serif;
  font-weight: 600;
}
#input-birthday {
  width: 50px;
}
#input-birthday__value_ {
  width: 140px;
}
.btn-ava {
  background: #a09e9b;
  padding: 5px 3px;
  color: #fff;
  margin-bottom: 50px;
}
#input-group-username {
  margin-top: 20px;
  margin: 20px auto;
}
.sub {
  color: #fff !important;
  background: #5d5e83fb !important;
  width: 80px !important;
  height: 40px !important;
  border: none;
}
.sub:hover {
  color: #fff !important;
  background: #5d5d5d !important;
  width: 80px !important;
  height: 40px !important;
}
</style>
