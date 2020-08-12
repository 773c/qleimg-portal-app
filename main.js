import Vue from 'vue'
import App from './App'

import CuCustom from 'colorui/components/cu-custom.vue'
import map from './util/map'

Vue.component('cu-custom', CuCustom)

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
