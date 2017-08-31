<template>
    <section class='header'>
        <!--logo区域-->
        <div class="logo">
            <span>通通理财</span>
        </div>
        <!--主菜单区域-->
        <el-tabs v-model="activeName" @tab-click="selectMenu">
            <el-tab-pane v-for='itm in mytab' :label="itm.label" :name="itm.name" :key='itm.name'></el-tab-pane>
        </el-tabs>
        <!--头部右侧导航-->
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-submenu>
                <template slot="title">我的工作台</template>
                <el-menu-item>选项1</el-menu-item>
                <el-menu-item>选项2</el-menu-item>
                <el-menu-item>选项3</el-menu-item>
            </el-submenu>
            <el-button type="success"></el-button>
        </el-menu>
    </section>
</template>

<script>
    import { mapMutations } from 'vuex'
    import {Menu,Submenu,MenuItem} from 'element-ui'
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
        components:{
            'el-menu':Menu,
            'el-submenu':Submenu,
            'el-menu-item':MenuItem
        },
        methods:{

            selectMenu(tab, event) {
                // console.log(tab, event);
                this.select(tab.name)
            },
            ...mapMutations([
                'select' // 映射 this.select() 为 this.$store.commit('select')
            ]),
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
