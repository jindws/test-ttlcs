<template>
    <section class="AdminGroupController">
        <!--工具条，新增-->
        <el-button type="primary" @click="addAdminGroup" :disabled="addDisabled">添加管理组</el-button>
        <!--列表-->
        <el-table :data="AdminGroupList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="管理组名称" width="300"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" width="300"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="300"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button type="danger" @click="deleted(scope.$index, scope.row)"
                               size="small" :disabled="deleteDisabled">删除
                    </el-button>
                    <el-button type="info" @click="modify(scope.$index, scope.row)"
                               size="small" :disabled="modifyDisabled">编辑
                    </el-button>
                    <el-button type="warning" @click="manage" size="small" :disabled="manageDisabled">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条，分页-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       layout="prev, pager, next, jumper" :total="total" style="float:right;margin:
                       20px 10px 0;">
        </el-pagination>
        <!--新增界面-->
        <el-dialog title="添加管理员组" :visible.sync="addAdminGroupVisible" :close-on-click-modal="false">
            <el-form :model="addAdminGroupForm" :rules="addAdminGroupRules" ref="addAdminGroupForm">
                <el-form-item label="管理组名称" :label-width="formLabelWidth" prop="name">
                    <el-input ref="name" v-model="addAdminGroupForm.name" auto-complete="off"
                              placeholder="请输入管理组名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AdminGroupReset">重置</el-button>
                <el-button type="success" @click="addAdminGroupSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="编辑管理员组" :visible.sync="editAdminGroup" :close-on-click-modal="false">
            <el-form :model="editAdminGroupForm" :rules="editAdminGroupRules" ref="editAdminGroupForm">
                <el-form-item label="管理组名称" :label-width="formLabelWidth" prop="name">
                    <el-input ref="name" v-model="editAdminGroupForm.name" auto-complete="off"
                              placeholder="请输入管理组名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AdminGroupReset">重置</el-button>
                <el-button type="success" @click="editAdminGroupSub">立即提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                /*列表*/
                AdminGroupList: [],

                /*新增页面*/
                addDisabled: true,
                addAdminGroupVisible: false,
                addAdminGroupForm: {
                    name: ''
                },
                addAdminGroupRules: {
                    name: [
                        { required: true, message: '请输入管理组名称',trigger: 'blur' }
                    ]
                },

                /*删除*/
                deleteDisabled: true,

                /*编辑页面*/
                editAdminGroup: false,
                editAdminGroupForm: {
                    name: ''
                },
                editAdminGroupRules: {
                    name: [
                        { required: true, message: '请输入管理组名称', trigger: 'blur' }
                    ]
                },

                formLabelWidth: '120px',

                modifyDisabled: true,
                manageDisabled: true,

                /*分页*/
                currentPage: 1,
                total: 0,
                pageNum: 1,
            }
        },
        methods: {
            /*获取列表信息*/
            getList(){
                this.$DB.AdminGroup.list({
                    pageNum: this.pageNum,
                    pageSize: '10'
                }).then(result => {
                    /*权限判断，实现按钮是否可执行。*/
                    if (result.operates.indexOf("添加") >= 0) {
                        this.addDisabled = false;
                    }
                    if (result.operates.indexOf("删除") >= 0) {
                        this.deleteDisabled = false;
                    }
                    if(result.operates.indexOf("修改") >= 0){
                        this.modifyDisabled = false;
                    }
                    if(result.operates.indexOf("权限管理") >= 0 ){
                        this.manageDisabled = false;
                    }
                    /*工具栏，分页*/
                    this.total = result.total;
                    /*列表展示，时间格式转换 */
                    this.AdminGroupList = result.pageList.map(item => {
                        return Object.assign({}, item, {
                            createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
                            updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                        });
                    });
                }, data => {
                    console.log('失败', data)
                })
            },
            /*重置*/
            AdminGroupReset() {
                this.addAdminGroupForm.name = '';
                this.editAdminGroupForm.name = '';
            },
            /*显示新增对话框页面*/
            addAdminGroup(){
                this.addAdminGroupVisible = true;
                this.addAdminGroupForm.name = '';
            },

            /*新增页面*/
            addAdminGroupSub() {
                this.$refs.addAdminGroupForm.validate((valid) => {
                    if(valid){
                        this.$DB.AdminGroup.add({
                            name: this.addAdminGroupForm.name
                        }).then(result => {
                            this.getList();
                            this.addAdminGroupVisible = false;
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
                    }
                });
            },

            /*删除*/
            deleted(index, row) {
                this.$confirm('确定做删除操作吗?', '提示信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$DB.AdminGroup.deleted({
                        id: row.id
                    }).then(result => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, data => {
                        /*3302对不起你没有相应的权限,3309还存在子管理组和子管理员*/
                        this.$message({
                            type: 'warning',
                            message: data.msg
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            /*显示编辑界面对话框*/
            modify(index, row) {
                this.editAdminGroup = true;
                this.editAdminGroupForm.name = row.name;
                this.editAdminGroupForm.id = row.id;
                /*this.editAdminGroupForm = Object.assign({}, row);
                console.log(this.editAdminGroupForm)*/
            },

            /*编辑*/
            editAdminGroupSub(){
                /*$.ajax({
                    url:  "/ttl-web-systemttl-web-system/AdminGroup/"+this.editAdminGroupForm.id+'?name='+this.editAdminGroupForm.name,
                    type: "PUT",
                    async: true,
                    data: {
                    },
                    cache: true,
                    dataType: "json",
                    success: function (result) {
                        console.log(result)
                        /!*this.editAdminGroup = false;
                        this.getList();*!/
                    },
                    error: function () {
                    }
                });*/
                this.$refs.editAdminGroupForm.validate((valid) => {
                    if(valid){
                        this.$DB.AdminGroup.modify({
                            id: this.editAdminGroupForm.id,
                            name: this.editAdminGroupForm.name
                        }).then(result => {
                           console.log(result)
                        }, data => {
                            this.$message({
                                type: 'warning',
                                message: data.msg
                            });
                        });
                    }
                });
            },

            /*跳转到输入的页面*/
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getList();
            },
            handleSizeChange(){

            },
            adminGroupList() {

            },

            manage() {

            },
        },
        mounted() {
            this.getList();
        },
    }
</script>
<style lang="css">
</style>