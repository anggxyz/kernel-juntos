import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/tailwind.css";

// "false" - to avoid Vue to output a “you’re in development mode” tip in the console.
Vue.config.productionTip = true;

Vue.prototype.ethereum = window.ethereum;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
