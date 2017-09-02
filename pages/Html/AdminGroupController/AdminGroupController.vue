<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup">添加管理组</el-button>
    </section>
</template>

<script>
    import {Button} from 'element-ui'
    export default {
        data() {
            return {}
        },
        methods: {
            addAdminGroup(){
                this.$DB.AdminGroup.AdminGroup({
                }).then(async re=>{
                    console.log('成功',re)
                },async data=>{
                    console.log('失败',data)
                    if(data.code == 3304 ){
                        window.location.href = '#/login';
                    }
                })
            }
        },
        components: {
            'el-button': Button
        }
    }
</script>

<style lang="css">
</style>
