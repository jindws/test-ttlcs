import Vue from 'vue'

if (module.hot) {//热加载
  const api = require('vue-hot-reload-api');
  api.install(Vue);
  module.hot.accept()
}

import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter);
Vue.use(Vuex);

import './base.css'
/*导入小图标*/
import 'font-awesome/css/font-awesome.min.css'

import {Tabs,TabPane,Message,Dialog,Button,Table,TableColumn,Form,FormItem,Switch,Input,Dropdown,DropdownMenu,DropdownItem,MessageBox,Select,Option,Pagination,Tree,Radio,RadioGroup, DatePicker} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
window.$message = Message;
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Tree);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);

//fetch
import 'whatwg-fetch'
import DB from '@/DB'
Object.defineProperty(Vue.prototype,'$DB',{value:DB});

import Login from '../pages/Login'
import Index from '../pages/Index'


import vuexStore from './vuex'
/**
 * vuex
 */
const store = new Vuex.Store(vuexStore);

/**
 * router
 */
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        }, {
            path: '/',
            component: Index
        }
    ]
});

new Vue({router, store}).$mount('#app');
