import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
//import "@fortawesome/fontawesome-free/js/all.js";
import "./assets/sass/index.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
