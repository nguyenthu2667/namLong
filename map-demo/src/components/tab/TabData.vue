<template>
  <div name="uesr-imf">
    <div v-for="(item, index) in user" :key="index">
      <tab-com userName="Nguyễn Thư" :userImg="item.userImg">
        <template #tab-content>
          <div class="tab-flex">
            <div class="tab-col">
              <ul class="tab-parent">
                <li
                  v-for="(item, index) in tabParent"
                  :key="index"
                  v-on:click="setActive(index)"
                  class="border-bottom"
                >
                  <div v-if="index === 0">
                    <router-link to="/">
                      <ion-icon :name="item.icon"></ion-icon>
                      <br />
                      {{ item.text }}
                    </router-link>
                  </div>

                  <div v-else-if="index > 0">
                    <ion-icon :name="item.icon"></ion-icon>
                    <br />
                    {{ item.text }}
                  </div>
                </li>
              </ul>
            </div>

            <div class="tab-child-div" id="tab-par">
              <ul
                class="tab-child"
                v-for="(item, index) in tabParent"
                :key="index"
              >
                <!-- <div v-if="(tapActive === index && tapActive === 0)">
                            <router-link to="/"></router-link> 
                        </div> -->
                <div
                  v-if="tapActive === index && tapActive > 0 && tapActive < 3"
                >
                  <div
                    v-for="(item2, index2) in item.tabChild"
                    :key="index2"
                    class="border-bottom"
                  >
                    <router-link :to="item2.path">
                      <li>
                        <ion-icon :name="item2.icon"></ion-icon>
                        <br />
                        {{ item2.text }}
                      </li>
                    </router-link>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </template>
      </tab-com>
    </div>
  </div>
</template>

<script>
import TabCom from "../tab/TabCom.vue";

export default {
  components: { TabCom },
  name: "tab-data",
  data() {
    return {
      user: [
        {
          userImg: "userimage1.jpg",
          userName: "user 1",
        },
      ],

      tabParent: [
        {
          icon: "map-outline",
          text: "Map",
          tabChild: [{ icon: " ", text: "Tìm kiếm", path: "/" }],
        },
        {
          icon: "mail-outline",
          text: "Quản lý góp ý",
          tabChild: [
            { icon: " ", text: "Góp ý đã gửi", path: "/sentmess" },
            { icon: " ", text: "Gửi góp ý mới", path: "/addmess" },
            { icon: " ", text: "Phản hồi", path: "/formfeedback" },
          ],
        },
        {
          icon: "person-outline",
          text: "Thông tin người dùng",
          tabChild: [
            { icon: " ", text: "Thông tin người dùng", path: "/changeimfuser" },
            { icon: " ", text: "Đổi mật khẩu", path: "/changepassuser" },
          ],
        },
        {
          icon: "log-out-outline",
          text: "Logout",
          tabChild: [
            { icon: " ", text: "singin", path: "/signin" },
            { icon: " ", text: "singup", path: "/signup" },
            { icon: " ", text: "test", path: "/test" },
          ],
        },
      ],
      tapActive: 0,
    };
  },

  methods: {
    setActive(index) {
      this.tapActive = index;
      if (index == 3) {
        window.location = "http://localhost:8080/signin";
      }
    },
  },

  // created() {
  //         this.$root.$refs.tabData = this;
  //     }
};
</script>

<style scoped>
.tab-parent,
.tab-child {
  list-style-type: none;
  text-align: center;
  padding: 10px 0;
  width: 100px;
}
.tab-parent > li {
  padding: 10px;
}
.tab-parent > li:hover {
  background: gray;
  color: cornsilk;
}
.tab-flex {
  display: flex;
}

a {
  color: #2c3e50;
}

a:hover {
  text-decoration: none;
  color: cornsilk;
}
li {
  color: #2c3e50;
}
li:hover {
  background: gray;
  color: cornsilk;
}
.tab-col {
  height: 90vh;
  box-sizing: border-box;
  box-shadow: -5px 5px 5px rgb(0 0 0 / 40%);
}
</style>
