
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {routes,routerJack} from './routes.js';

import App from './App.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({routes})

router.beforeEach(routerJack);

new Vue({
	el: "#app",
	render:function(h){
		return h(App);
	},
	router
})

