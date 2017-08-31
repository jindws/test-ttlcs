<template>
    <section class='header'>
        <!--logo区域-->
        <div class="logo">
            <span>通通理财</span>
        </div>
        <!--主菜单区域-->
        <el-tabs :value="headerName" @tab-click="selectMenu">
            <el-tab-pane v-for='(itm,index) in meuns.modules' :label="itm.module" :name="itm.module" :key='itm.statusLen'></el-tab-pane>
        </el-tabs>
        <!--头部右侧导航-->

    </section>
</template>

<script>
    import { mapGetters,mapMutations } from 'vuex'

    export default {
        data() {
            return {

            };
        },
        methods:{
            selectMenu(tab) {
                this.select(tab.index)//菜单流水号
            },
            ...mapMutations([
                'select' // 映射 this.select() 为 this.$store.commit('select')
            ]),
        },
        computed: {
            ...mapGetters([
                'meuns',
                'headerName'
            ])
        },
        mounted(){
           /* this.$DB.HidePermission.mainpage({
            }).then(re=>{
                console.log('成功',re)
            },data=>{
                console.log('失败',data)
                this.$message({
                    message: '请先登录',
                    type: 'warning'
                });
                /!*window.location.href = '#/login';*!/
            })*/
        },
    }
</script>

<style lang="css">
</style>
