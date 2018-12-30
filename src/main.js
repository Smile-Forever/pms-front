import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/index.js";

import "./permission.js";
import "./mock/index.js";

import "./styles/index.scss";
import "normalize.css/normalize.css";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as filters from "@/filters/index.js";

// global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
