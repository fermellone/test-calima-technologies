import Vue from "vue";
import App from "./App.vue";
import { decode } from "./plugins/filters.js";
import VueTailwind from "vue-tailwind";
import tailwindSettings from "@/plugins/tailwindSettings.js";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

Vue.filter("decode", decode);

Vue.use(VueTailwind, tailwindSettings);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
