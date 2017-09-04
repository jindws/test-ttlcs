import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter);
Vue.use(Vuex);

import './base.css'

import {Tabs,TabPane,Message,Dialog,Button,Table,TableColumn,Form,FormItem,Switch,Input,Dropdown,DropdownMenu,DropdownItem,MessageBox} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
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
        /*主界面增加tab*/
        mainTabAdd(state,tab){
            const ctrName = [];
            state.mainTab.push(tab);
            state.mainTab = state.mainTab.filter(({ctrlName})=>{
                if(!ctrlNames.includes(ctrlName)){
                    ctrlNames.push(ctrlName)
                    return true;
                }
                return false;
            })
            state.activeName = tab.ctrlName;//新增tab的时候,设置 activeName
        },
        mainTabRemove(state,targetName){
            const mainTab =  [...state.mainTab];

            state.mainTab = state.mainTab.filter((itm,index)=>{
              if(itm.ctrlName!==targetName){
                return true;
              }else if(itm.ctrlName!==state.activeName){
                return false;
              }else if(index<mainTab.length-1){
                state.activeName = mainTab[index+1].ctrlName
              }else if(index){//关闭 最后一项,但关后至少有2个tab
                  state.activeName = mainTab[index-1].ctrlName
              }else{//全部关闭,除了 我的
                  state.activeName = 'home'
              }
            })
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
