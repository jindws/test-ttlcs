<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup">添加管理组</el-button>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="管理组名称" width="300"></el-table-column>
            <el-table-column prop="address" label="添加时间" width="500"></el-table-column>
            <el-table-column prop="address" label="操作"></el-table-column>
        </el-table>
    </section>
</template>

<script>
    import {Button,Table,TableColumn} from 'element-ui'
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            addAdminGroup(){
                alert(1)
                /*this.$DB.AdminGroup.AdminGroup({
                }).then(async re=>{
                    console.log('成功',re)
                },async data=>{
                    console.log('失败',data)
                })*/
            }
        },
        components: {
            'el-button': Button,
            'el-table': Table,
            'el-table-column': TableColumn
        }
    }
</script>

<style lang="css">
</style>
