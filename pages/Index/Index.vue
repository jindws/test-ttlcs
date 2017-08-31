<template>
    <section class='index'>
        <XHeader/>
        <section class='container'>
            <LeftMenu/>
            <div class="mainBox">
                <XMain/>
                <XFooter/>
            </div>
        </section>
    </section>
</template>

<script>
    import XHeader from '@/Header'
    import LeftMenu from '@/LeftMenu'
    import XFooter from '@/Footer'
    import XMain from '../Main'

    import { mapGetters,mapMutations } from 'vuex'

    export default {
        mounted(){
            this.$DB.HidePermission.mainpage({
            }).then(async re=>{
                await this.setMenus(re)
                this.select(0);
            },async data=>{
                console.log('失败',data)
                // var a = {"code":0,"msg":"操作成功","data":{"modules":[{"module":"扩展管理","submodules":[{"ctrlName":"ScheduleController","htmlName":"Ext_Schedule","name":"定时任务"}],"statusLen":0},{"module":"系统管理","submodules":[{"ctrlName":"AdminGroupController","htmlName":"Sys_adminGroup","name":"管理组管理"},{"ctrlName":"AdminController","htmlName":"Sys_admin","name":"管理员管理"},{"ctrlName":"IpWhiteListController","htmlName":"Sys_ipWhiteList","name":"Ip白名单"},{"ctrlName":"PermissionController","htmlName":"Sys_power","name":"权限管理"},{"ctrlName":"OperateLogController","htmlName":"Sys_log","name":"管理员操作日志"}],"statusLen":0}]}}
                // console.log(a.data,'成功')
                // await this.setMenus(a.data)
                // this.select(0);
            })
        },
        methods:{
          ...mapMutations([
              'setMenus',
              'select'
          ]),
        },
        components:{
            XHeader,
            LeftMenu,
            XFooter,
            XMain
        }
    }
</script>
