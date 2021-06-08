import Vue from "vue";
import App from "./App.vue";
import { decode } from "./plugins/filters.js";

Vue.config.productionTip = false;

Vue.filter("decode", decode);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
