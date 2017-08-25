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
      // console.log(this.$store.getters.doneTodos)
  },
  components:{
    XHeader,
    LeftMenu,
    XMain
  }
}
</script>
