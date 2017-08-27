<template>
<section class='leftmenu'>
    <dl>
        <!-- <dd v-for='itm in lists' :class='{on:select==itm.ids}' @click='select=itm.ids'>{{itm.name}}</dd>-->
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
            // lists:[{
            //   name:'所有借款列表',
            //   ids:'alllists',
            // },{
            //   name:'待提交列表',
            //   ids:'waitlist',
            // }]
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
