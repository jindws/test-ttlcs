<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup">添加管理组</el-button>
        <el-table :data="AdminGroupList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="管理组名称" width="300"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" width="500"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button type="danger" @click="deleted" size="small">删除</el-button>
                    <el-button type="info" @click="modify" size="small">编辑</el-button>
                    <el-button type="warning" @click="manage" size="small">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import {Button,Table,TableColumn} from 'element-ui'
    export default {
        data() {
            return {
                AdminGroupList: [{
                    id: '',
                    name: '',
                    createTime: '',
                    operates: ''
                }]
            }
        },
        methods: {
            addAdminGroup(){
                /*this.$DB.AdminGroup.AdminGroup({
                }).then(async re=>{
                    console.log('成功',re)
                },async data=>{
                    console.log('失败',data)
                })*/
            },
            deleted(){

            },
            modify(){

            },
            manage(){

            }
        },
        components: {
            'el-button': Button,
            'el-table': Table,
            'el-table-column': TableColumn
        },
        mounted(){
            this.$DB.AdminGroup.list({
                pageNum: '1',
                pageSize: '10'
            }).then(result=>{
                for(let cell = 0; cell < result.pageList.length; cell++){
                    this.AdminGroupList.name = result.pageList[cell].name;
                }
                console.log('成功',result)
            },data=>{
                console.log('失败',data)
            })
        }
    }
</script>

<style lang="css">
</style>
