export default {
    state: {
        headerName: '',
        mainTab:[],
        menus:[],//整个菜单
        leftmenus:[],//左侧菜单
        activeName:'home',//主页面 选中tab的name
        refreshing:false,//我在刷新
    },
    mutations: {
        select(state, index) {
            const XMenu = state.menus.modules[index];
            if (state.headerName !== XMenu.module) {//菜单变化
                state.headerName = XMenu.module;
                state.leftmenus = XMenu.submodules//左侧菜单
            }
        },
        /*主界面增加tab*/
        mainTabAdd(state,tab){
            const ctrlNames = []
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
        /*刷新*/
        refeshNow(state){
            state.refreshing = true;
            setTimeout(()=>state.refreshing = false,1000);
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
        mainTabRemoveAll(state){
            state.mainTab=[]
            state.activeName = 'home'
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
        refreshing:state=>state.refreshing
    }
}
