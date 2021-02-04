import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/global.css";
import vueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "animate.css";
import VueApexCharts from "vue-apexcharts";
import VueSweetalert2 from "vue-sweetalert2";
import store from "./store";
import axios from "axios";
import JwPagination from "jw-vue-pagination";

require("./store/subscriber");

export const eventBus = new Vue();
axios.defaults.baseURL = "https://localhost:44397/api/";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(vueMaterial);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.component("jw-pagination", JwPagination);
Vue.use(VueSweetalert2);

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
