<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup = true">添加管理组</el-button>
        <el-table :data="AdminGroupList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="管理组名称" width="300"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" width="500"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button type="danger" @click="deleted(scope.row.id)" size="small">删除</el-button>
                    <el-button type="info" @click="modify" size="small">编辑</el-button>
                    <el-button type="warning" @click="manage" size="small">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加管理员组" :visible.sync="addAdminGroup">
            <el-form :model="addAdminGroupForm">
                <el-form-item label="管理组名称" :label-width="formLabelWidth">
                    <el-input ref="name" v-model="addAdminGroupForm.name" auto-complete="off" placeholder="请输入管理组名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAdminGroupReset">重置</el-button>
                <el-button type="success" @click="addAdminGroupSub">立即提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                AdminGroupList: [],
                addAdminGroup: false,
                addAdminGroupForm: {
                    name: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            addAdminGroupSub(){
                this.$DB.AdminGroup.AdminGroup({
                    name: this.addAdminGroupForm.name
                }).then(result => {
                    this.AdminGroupList.push(result);
                    this.addAdminGroup = false;
                }, data => {
                    if(data.code === 3301){
                        this.$message({
                            type: 'warning',
                            message: data.msg
                        });
                    }
                });
            },
            addAdminGroupReset(){
                this.addAdminGroupForm.name = '';
            },
            deleted(id) {
                console.log(id)
                this.$DB.AdminGroup.AdminGroup({
                    name: this.addAdminGroupForm.name
                }).then(result => {
                    this.AdminGroupList.push(result);
                    this.addAdminGroup = false;
                }, data => {
                    if(data.code === 3301){
                        this.$message({
                            type: 'warning',
                            message: data.msg
                        });
                    }
                });
            },
            modify() {

            },
            manage() {

            }
        },
        mounted() {
            this.$DB.AdminGroup.list({
                pageNum: '1',
                pageSize: '10'
            }).then(result => {
//                this.AdminGroupList = result.pageList;
                this.AdminGroupList = result.pageList.map(itm=>Object.assign({},itm,{
                    createTime:moment(+(itm.createTime+'000')).format("YYYY-MM-DD HH:mm:ss")
                }))
                console.log('成功', result)

            }, data => {
                console.log('失败', data)
                const list = [
                    {
                        createId:1,
                        createTime:1496739993,
                        fatherId:1,
                        id:2,
                        name:"test",
                        status:0,
                        updateId:1,
                        updateTime:1496739993
                    },
                    {
                        createId:1,
                        createTime:1496739993,
                        fatherId:1,
                        id:21,
                        name:"test2",
                        status:0,
                        updateId:1,
                        updateTime:1496739993
                    },
                ];
                this.AdminGroupList = list.map(itm=>Object.assign({},itm,{
                    createTime:moment(+(itm.createTime+'000')).format("YYYY-MM-DD HH:mm:ss")
                }))



            })
        },
        watch:{
//            addAdminGroup(val,oldval){
//                if(val){
//                    console.log(this.$refs.name)
//                }
//            }
        }
    }
</script>