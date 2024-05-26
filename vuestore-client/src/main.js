import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faArrowLeft, faArrowRight);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
