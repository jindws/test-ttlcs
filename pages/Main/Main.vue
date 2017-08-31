<template>
<section class='main'>
  <el-tabs :closable='true' type="border-card" @tab-remove="removeTab" v-model="activeName" @tab-click="selectNow">
    <el-tab-pane name="home">
        <span slot="label"><i class="el-icon-menu"></i> 用户管理</span>
      我的桌面
    </el-tab-pane>
    <el-tab-pane v-for='itm in getMainTabs' :name="itm.ctrlName"  :key='itm.ctrlName' >
      <span slot="label"><i class="el-icon-document"></i> {{itm.name}}</span>
      <XHtml :temp='itm.ctrlName'></XHtml>
    </el-tab-pane>
  </el-tabs>
</section>
</template>

<script>
import {
    mapGetters,
    mapMutations,
} from 'vuex'

import XHtml from '../Html'


export default {
  data(){
    return{
        activeName:'home',
    }
  },
  components:{
    XHtml
  },
  methods:{
    removeTab(targetName){
        this.mainTabRemove(targetName)
    },
    selectNow(tab, event){
      this.activeName = tab.name;
    },
    ...mapMutations([
        'mainTabRemove'
    ]),
  },
  computed: {
      ...mapGetters([
          'getMainTabs',
      ])
  },
  watch:{
    getMainTabs(val,oldval){
      if(val.length === oldval.length){//add
          this.activeName = val[val.length-1].ids
      }
    }
  }
}
</script>
