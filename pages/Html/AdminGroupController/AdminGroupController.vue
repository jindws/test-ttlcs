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
                AdminGroupList: []
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
                // for(let cell = 0; cell < result.pageList.length; cell++){
                //     this.AdminGroupList.name = result.pageList[cell].name;
                // }
                this.AdminGroupList = result.pageList
                console.log('成功',result)
            },data=>{
                console.log('失败',data)
                // const a = {"code":0,"msg":"操作成功","data":{"total":3,"operates":[],"pageSize":3,"pageList":[{"id":2,"name":"无","fatherId":1,"createId":1,"updateId":1,"createTime":1504318057000,"updateTime":1504338087000},{"id":3,"name":"jiang","fatherId":1,"createId":1,"updateId":1,"createTime":1504319771000,"updateTime":1504319771000},{"id":4,"name":"dd","fatherId":1,"createId":1,"updateId":1,"createTime":1504321079000,"updateTime":1504321079000}],"pageNum":1}}
                // console.log(a.data)
                // this.AdminGroupList = a.data.pageList
            })
        }
    }
</script>

<style lang="css">
</style>
