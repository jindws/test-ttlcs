<template>
<section class='main'>
  <el-tabs :closable='true' type="border-card" @tab-remove="removeTab" :value="activeName" @tab-click="selectNow">
    <el-tab-pane name="home">
        <span slot="label"><i class="el-icon-menu"></i> 我的桌面</span>
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
        this.setActiveName(tab.name)
    },
    ...mapMutations([
        'mainTabRemove',
        'setActiveName'
    ]),
  },
  computed: {
      ...mapGetters([
          'getMainTabs',
          'activeName',
      ])
  },
  // watch:{
  //   getMainTabs(val,oldval){
  //     if(val.length === oldval.length){//add
  //         this.activeName = val[val.length-1].ids
  //     }
  //   }
  // }
}
</script>
