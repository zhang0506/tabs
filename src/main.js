import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MtechUI from "@mtech-ui/mtech-ui";

import "@mtech-ui/base/build/esm/bundle.css";
Vue.use(MtechUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
