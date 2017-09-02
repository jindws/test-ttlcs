import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter);
Vue.use(Vuex);

import './base.css'

import {Tabs,TabPane,Message} from 'element-ui'
Vue.prototype.$message = Message;
Vue.use(Tabs);
Vue.use(TabPane);

//fetch
import 'whatwg-fetch'
import DB from '@/DB'
Object.defineProperty(Vue.prototype,'$DB',{value:DB});

import Login from '../pages/Login'
import Index from '../pages/Index'
/**
 * vuex
 */
const store = new Vuex.Store({
    state: {
        headerName: '',
        mainTab:[],
        menus:[],//整个菜单
        leftmenus:[],//左侧菜单
        activeName:'home',//主页面 选中tab的name
    },
    mutations: {
        select(state, index) {
            const XMenu = state.menus.modules[index];
            if (state.headerName !== XMenu.module) {//菜单变化
                state.headerName = XMenu.module
                state.leftmenus = XMenu.submodules//左侧菜单
            }
        },
        mainTabAdd(state,tab){
            if(!state.mainTab.includes(tab)){
                state.mainTab.push(tab)
            }
            state.activeName = tab.ctrlName;//新增tab的时候,设置 activeName
        },
        mainTabRemove(state,targetName){
            state.mainTab = state.mainTab.filter(itm=>itm.ctrlName!==targetName)
        },
        setMenus(state,menus){
            state.menus = menus
        },
        setActiveName(state,activeName){
            state.activeName = activeName
        }
    },
    getters: {
        headerName: state => state.headerName,
        getMainTabs:state=>state.mainTab,
        meuns:state=>state.menus,
        leftmenus:state=>state.leftmenus,
        activeName:state=>state.activeName,
    }
});

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
