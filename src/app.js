import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)

import './base.css'

import {Tabs,TabPane} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)

//fetch
import 'whatwg-fetch'
import DB from '@/DB'
Object.defineProperty(Vue.prototype,'$DB',{value:DB})

import Login from '../pages/Login'
import Index from '../pages/Index'

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
