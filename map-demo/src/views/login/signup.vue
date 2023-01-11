<template>
  <div>
    <div class="login-box">
      <h2>ĐĂNG KÝ</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" />
          <label>Username</label>
        </div>

        <div class="firt-last-name">
          <div class="user-box box-firtname">
            <input type="text" name="" required="" />
            <label>Họ</label>
          </div>
          <div class="user-box box-lastname">
            <input type="text" name="" required="" />
            <label>Tên</label>
          </div>
        </div>

        <div class="phone-email">
          <div class="user-box box-phone">
            <input type="text" name="" required="" />
            <label>Email</label>
          </div>
          <div class="user-box box-email">
            <input type="email" name="" required="" />
            <label>Số điện thoại</label>
          </div>
        </div>

        <div class="user-box">
          <input type="date" name="" required="" />
          <label>Ngày sinh</label>
        </div>

        <div class="user-box">
          <input type="password" name="" required="" />
          <label>Password</label>
        </div>

        <div class="user-box">
          <input type="password" name="" required="" />
          <label>Re-Password</label>
        </div>

        <div class="user-box">
          <div class="lable-address"><label>Địa chỉ</label></div>
          <b-form inline class="select-xa-tinh">
            <b-form-group
              id="input-group-address-tinh"
              label-for="input-address-tinh"
            >
              <b-form-select
                v-model="selected"
                :options="Tinh"
                @change="changeHuyen(selected)"
                class="selectTinh"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-address-xa"
              label-for="input-address-xa"
            >
              <b-form-select
                v-model="selecTinh"
                :options="xa"
                id="p1"
                class="selectTinh"
              ></b-form-select>
              <div v-for="(item, index) in xa" :key="index">
                <div v-if="item.maTinh === isIndex">
                  <b-form-select
                    v-model="selecTinh"
                    :options="item.ten"
                    class="selectTinh"
                  ></b-form-select>
                </div>
              </div>
            </b-form-group>
          </b-form>
        </div>

        <div class="user-box">
          <input type="text" name="" required="" />
          <label>Số nhà</label>
        </div>

        <div><label class="lable-gender">Giới tính</label></div>

        <div class="radio-gender">
          <label class="container rabox"
            >Nam
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container rabox"
            >Nữ
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container rabox"
            >Tùy chọn
            <input type="radio" checked="checked" name="radio" />
            <span class="checkmark"></span>
          </label>
        </div>

        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign UP
        </a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      selecTinh: null,

      diaChiRo: this.soNha,
      Tinh: [
        { value: null, text: "Chọn tỉnh", disabled: true },
        { value: 1, text: "Thành phố Hà Nội" },
        { value: 37, text: "Tỉnh Nghệ An" },
      ],
      xa: [
        { value: null, text: "Chọn tỉnh rồi chọn xã", disabled: true },
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
          disabled: true,
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
          disabled: true,
        },
      ],

      isIndex: 0,
    };
  },
  methods: {
    changeHuyen(index) {
      this.isIndex = index;
      var child = document.getElementById("p1");
      child.parentNode.removeChild(child);
      this.Tinh.splice(0, 1);
    },
  },
};
</script>

<style scoped>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 800px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
.firt-last-name,
.phone-email {
  display: inline-flex;
}
.box-firtname,
.box-phone {
  width: 300px;
  margin-right: 120px;
}
.box-lastname,
.box-email {
  width: 300px;
}
.radio-gender {
  display: flex;
  font-size: 16px;
  color: #fff;
  font-family: sans-serif;
}
.lable-gender {
  display: flex;
  font-size: 16px;
  color: #fff;
  font-family: sans-serif;
}
.rabox {
  border: 1px solid #fff;
  margin: 0 50px;
  padding: 10px 0;
}
input[type="date"]:required:invalid::-webkit-datetime-edit {
  color: transparent;
}
input[type="date"]:focus::-webkit-datetime-edit {
  font-size: 16px;
  color: #fff !important;
  font-family: sans-serif;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  color: #fff !important;
}

.lable-address {
  padding-bottom: 50px;
}

#input-group-address-tinh {
  margin-right: 50px;
}
.selectTinh {
  width: 180px;
  background: none;
  font-size: 16px;
  color: #fff !important;
  font-family: sans-serif;
}
.select-xa-tinh {
  margin-bottom: 20px;
}
</style>
<style>
option {
  background: #243b55;
}
</style>
<style>
html {
  height: 100%;
  background-image: url(https://img6.thuthuatphanmem.vn/uploads/2022/04/19/background-cay-co-dep_084228319.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
