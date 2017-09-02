<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup">添加管理组</el-button>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            addAdminGroup(){
                this.$DB.HidePermission.mainpage({
                }).then(async re=>{
                    await this.setMenus(re)
                    this.select(0);
                },async data=>{
                    console.log('失败',data)
                    if(data.code == 3304 ){
                        window.location.href = '#/login';
                    }
                })
            }
        },
    }
</script>

<style lang="css">
</style>
