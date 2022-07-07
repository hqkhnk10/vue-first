import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './routes'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



