<template>
  <div class="login-box">
    <h2>LOGIN</h2>
    <form>
      <div class="user-box">
        <input type="text" name="" required="" v-model="userText" />
        <label>Username</label>
      </div>
      <div class="user-box">
        <input type="password" name="" required="" v-model="passText" />
        <label>Password</label>
      </div>
      <a class="tai-khoan-moi" href="http://localhost:8080/signup"
        >Tạo tài khoản mới</a
      >
      <br />
      <a @click="login()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "nguyenthu2684",
      pass: "268499",
      userText: null,
      passText: null,
    };
  },
  methods: {
    login() {
      if (this.userText == this.userName && this.passText == this.pass) {
        window.location = "http://localhost:8080/";
      } else {
        alert("error login");
      }
    },
  },
};
</script>

<style scoped>
html {
  height: 100%;
  background-image: url(https://vanhoahoc.vn/wp-content/uploads/hinh-nen-mau-xanh-la-cay.jpg);
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 45%;
  width: 400px;
  padding: 40px;
  transform: translate(-20%, -50%);
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
</style>

<style lang="scss" scoped>
.tai-khoan-moi {
  all: initial !important;
  color: hsl(0, 0, 100) !important;
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
