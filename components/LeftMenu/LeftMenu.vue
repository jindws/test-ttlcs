<template>
<section class='leftmenu' :style='{width:width+"px"}'>
    <i class='el-icon-caret-right' :style='{display:width?"none":""}' @click='openMenu'></i>
    <dl>
        <dt @click='hideMenu'>. . .</dt>
        <dd v-for='itm in leftmenus' :class='{on:select==itm.ctrlName}' @click='selectNow(itm)'>{{itm.name}}</dd>
    </dl>
</section>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex'

export default {
    data() {
        return {
            select: '',
            width:180,
        }
    },
    methods:{
      selectNow(itm){
          this.select=itm.ctrlName;
          this.mainTabAdd(itm)
      },
      hideMenu(){
          if(!this.width)return;
          requestAnimationFrame(()=>{
            this.width-=10;
            this.hideMenu();
          })
      },
      openMenu(){
        if(this.width>=180){
          this.width=180;
          return;
        }
        requestAnimationFrame(()=>{
          this.width+=10;
          this.openMenu();
        })
      },
      ...mapMutations([
          'mainTabAdd',
      ]),
    },
    computed: {
        ...mapGetters([
            'headName',
            'leftmenus',
        ])
    },
}
</script>
