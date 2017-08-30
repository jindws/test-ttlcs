<template>
    <section class='header'>
        <!--logo区域-->
        <div class="logo">
            <span>通通理财</span>
        </div>
        <!--主菜单区域-->
        <el-tabs v-model="activeName" @tab-click="selectNow">
            <el-tab-pane v-for='itm in mytab' :label="itm.label" :name="itm.name" :key='itm.name'></el-tab-pane>
        </el-tabs>
        <!--头部右侧导航-->

    </section>
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
    }
</script>

<style lang="css">
</style>
