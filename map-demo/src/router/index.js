import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: "/",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MapNT.vue"),
  },

  {
    path: "/sentmess",
    name: "map",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/quanLi/ReadInfMessSent.vue"
      ),
  },

  {
    path: "/addmess",
    name: "map",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/quanLi/FormSendMess.vue"
      ),
  },

  {
    path: "/formfeedback",
    name: "map",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/quanLi/FormFeedback.vue"
      ),
  },

  {
    path: "/changeimfuser",
    name: "map",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/thongTinNguoiDung/ChangeImfUser.vue"
      ),
  },

  {
    path: "/changepassuser",
    name: "map",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/thongTinNguoiDung/ChangePassUser.vue"
      ),
  },

  {
    path: "/signin",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/signin"),
  },

  {
    path: "/signup",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/signup"),
  },

  {
    path: "/test",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/thongTinNguoiDung/test"),
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
