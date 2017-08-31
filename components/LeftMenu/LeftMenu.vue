<template>
<section class='leftmenu' :style='{width:width+"px"}'>
    <i class='el-icon-caret-right' :style='{display:width?"none":""}' @click='openMenu'></i>
    <dl>
        <i @click='hideMenu' class="el-icon-more"></i>
        <dd v-for='itm in lists[$store.getters.headName]' :class='{on:select==itm.ids}' @click='selectNow(itm)'>{{itm.name}}</dd>
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
            lists: {
                jiekuan: [{
                    name: '所有借款列表',
                    ids: 'alllists',
                    temp:'A1',
                }, {
                    name: '待提交列表',
                    ids: 'waitlist',
                    temp:'A2',
                }],
                zijin: [{
                        name: '所有借款列表2',
                        ids: 'aa',
                        temp:'B1',

                    },
                    {
                        name: '待提交列表2',
                        ids: 'bb',
                        temp: 'B2'
                    }
                ],
                shenhe: [{
                    name: 'shenhe',
                    ids: 'cc',
                }, {
                    name: 'shenhe2',
                    ids: 'dd',
                }]
            }
        }
    },
    methods:{
      selectNow(itm){
          this.select=itm.ids;
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
        ])
    },
    mounted(){
      // this.lists = data.list;
    }
}
</script>
