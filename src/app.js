import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)

import './base.scss'

import {Tabs,TabPane} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)

const Login = r => require.ensure([], () => r(require('../pages/Login')), 'login');
const Index = r => require.ensure([], () => r(require('../pages/Index')), 'index');

/**
 * vuex
 */
const store = new Vuex.Store({
    state: {
        headerName: 'jiekuan',
        mainTab:[],
    },
    mutations: {
        select(state, sele) {
            if (state.headerName !== sele) {
                state.headerName = sele
            }
        },
        mainTabAdd(state,tab){
          if(!state.mainTab.includes(tab)){
            state.mainTab.push(tab)
          }
        },
        mainTabRemove(state,targetName){
            state.mainTab = state.mainTab.filter(itm=>itm.ids!==targetName)
        }
    },
    getters: {
        headName: state => state.headerName,
        getMainTabs:state=>state.mainTab,
      }
})

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
})

new Vue({router, store}).$mount('#app')
