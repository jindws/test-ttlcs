<template>
<header class='header'>
  <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt="logo">
  <el-tabs v-model="activeName" @tab-click="selectNow">
      <el-tab-pane v-for='itm in mytab' :label="itm.label" :name="itm.name" :key='itm.name'></el-tab-pane>
  </el-tabs>

</header>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
      return {
        mytab:[{
          label:'借款管理',
          name:'jiekuan',
        },{
          label:'资金管理',
          name:'zijin',
        },{
          label:'审核管理',
          name:'shenhe',
        }],
        activeName: 'jiekuan'
      };
  },
  methods:{
      selectNow(tab, event) {
          // console.log(tab, event);
          this.select(tab.name)
      },
      ...mapMutations([
          'select' // 映射 this.select() 为 this.$store.commit('select')
      ]),
  },
  // components:{
  //   'el-tabs':Tabs,
  //   'el-tab-pane':TabPane
  // }
}
</script>

<style lang="css">
</style>
