import Vue from "vue";
import App from "./App";

// BootstrapVue add
import BootstrapVue from "bootstrap-vue";
// Router & Store add
import router from "./router";
import store from "./store";
// Multi Language Add
import en from "./locales/en.json";
import vn from "./locales/vn.json";
import VueI18n from "vue-i18n";
import { firebaseConfig } from "./constants/config";
// Notification Component Add
import Notifications from "./components/Common/Notification";
// Breadcrumb Component Add
import Breadcrumb from "./components/Common/Breadcrumb";
// RefreshButton Component Add
import RefreshButton from "./components/Common/RefreshButton";
// Colxx Component Add
import Colxx from "./components/Common/Colxx";
// Perfect Scrollbar Add
import vuePerfectScrollbar from "vue-perfect-scrollbar";
import contentmenu from "v-contextmenu";
import VueLineClamp from "vue-line-clamp";
import VueScrollTo from "vue-scrollto";
import firebase from "firebase/app";
// import 'firebase/auth'
import { getCurrentLanguage } from "./utils";
import VueImg from "v-img";
import Datepicker from "vuejs-datepicker";
import { ColorPicker, ColorPanel } from "one-colorpicker";
import VueCarousel from "vue-carousel";
import AudioPlayer from "@liripeng/vue-audio-player";
import VirtualList from "vue-virtual-scroll-list";
import PrimeVue from 'primevue/config';

Vue.use(PrimeVue, { ripple: true });
Vue.component("virtual-list", VirtualList);
Vue.use(AudioPlayer);
Vue.use(VueCarousel);
Vue.use(VueImg);
Vue.use(Datepicker);
Vue.use(ColorPanel);
Vue.use(ColorPicker);
Vue.use(BootstrapVue);
Vue.use(VueI18n);
const messages = { en: en, vn: vn };
const locale = getCurrentLanguage();
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: "vn",
  messages,
});
Vue.use(Notifications);
Vue.use(require("vue-shortkey"));
Vue.use(contentmenu);
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true,
});

Vue.component("piaf-breadcrumb", Breadcrumb);
Vue.component("b-refresh-button", RefreshButton);
Vue.component("b-colxx", Colxx);
Vue.component("vue-perfect-scrollbar", vuePerfectScrollbar);
Vue.component("datepicker", Datepicker);

firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false;

export default new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
