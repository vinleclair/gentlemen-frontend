import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import ApiService from "./common/api.service";

Vue.config.productionTip = false

ApiService.init();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
