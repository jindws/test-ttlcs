<template>
    <section class="AdminGroupController">
        <el-button type="primary" @click="addAdminGroup = true">添加管理组</el-button>
        <el-table :data="AdminGroupList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="管理组名称" width="300"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" width="500"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button type="danger" @click.native.prevent="deleted(scope.$index, AdminGroupList)" size="small">删除</el-button>
                    <el-button type="info" @click="modify" size="small">编辑</el-button>
                    <el-button type="warning" @click="manage" size="small">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加管理员组" :visible.sync="addAdminGroup">
            <el-form :model="addAdminGroupForm">
                <el-form-item label="管理组名称" :label-width="formLabelWidth">
                    <el-input v-model="addAdminGroupForm.name" auto-complete="off" placeholder="请输入管理组名称"></el-input>
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
                    let newAdd = Object.assign({}, result, {createTime:
                        moment(result.createTime).format('YYYY-MM-DD HH:mm:ss')});
                    this.AdminGroupList.push(newAdd);
                    this.addAdminGroup = false;
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                }, data => {
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    });
                });
            },
            adminGroupList(){

            },
            addAdminGroupReset(){
                this.addAdminGroupForm.name = '';
            },
            deleted(index,row) {
                this.$confirm('确定做删除操作吗?', '提示信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        url: "/ttl-web-systemttl-web-system/AdminGroup/"+row[index].id,
                        type: "DELETE",
                        data: {},
                        success: function(result){
                            row.splice(index, 1);
                        },
                        error: function(data){
                            if(data.code == 3302){
                                this.$message({
                                    type: 'warning',
                                    message: data.msg
                                });
                            }
                        }
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                /*this.$DB.AdminGroup.deleted({
                    id: row[index].id
                }).then(result => {
                    console.log(resule);
                }, data => {
                    /!*code=3302对不起你没有相应的权限*!/
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    });
                });*/
            },
            modify() {

            },
            manage() {

            }
        },
        mounted() {
            this.$DB.AdminGroup.list({
                pageNum: '1',
                pageSize: '30'
            }).then(result => {
                this.AdminGroupList = result.pageList.map(item=> {
                    return Object.assign({}, item, {createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')});
                });
            }, data => {
                console.log('失败', data)
            })
        }
    }
</script>

<style lang="css">
</style>
