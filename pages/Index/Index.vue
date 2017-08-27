<template>
<section class='index'>
    <XHeader/>
    <section>
        <LeftMenu/>
        <XMain/>
    </section>
</section>
</template>

<script>
import XHeader from '@/Header'
import LeftMenu from '@/LeftMenu'

import XMain from '../Main'

import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters([
      'doneTodos',
    ])
  },
  mounted(){
    this.$DB.Test.list({
      name:1,
    }).then(re=>{
      console.log('成功',re)
    },data=>{
      console.log('失败',data)
    })
  },
  components:{
    XHeader,
    LeftMenu,
    XMain
  }
}
</script>
