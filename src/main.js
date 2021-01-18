import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import "./style.scss";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/global.css";
import vueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "animate.css";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(vueMaterial);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
