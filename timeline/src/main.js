import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(dayjs);



new Vue({
  render: h => h(App),
}).$mount('#app')
