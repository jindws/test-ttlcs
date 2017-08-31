<template>
<section class='leftmenu' :style='{width:width+"px"}'>
    <i class='el-icon-caret-right' :style='{display:width?"none":""}' @click='openMenu'></i>
    <dl>
        <i @click='hideMenu' class="el-icon-more"></i>
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
            width: 200,
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
        if(this.width>=200){
          this.width=200;
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
