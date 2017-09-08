<template>
    <section class="AdminGroupController">
        <!--主界面-->
        <section :class="{minBox: isdisplayMain}">
            <!--工具条，新增-->
            <el-button type="primary" @click="addAdminGroup" :disabled="addDisabled">添加管理组</el-button>
            <!--列表-->
            <el-table :data="AdminGroupList" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="name" label="管理组名称"></el-table-column>
                <el-table-column prop="createTime" label="添加时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="operates" label="操作">
                    <template scope="scope">
                        <el-button type="danger" @click="deleted(scope.$index, scope.row)"
                                   size="small" :disabled="deleteDisabled">删除
                        </el-button>
                        <el-button type="info" @click="modify(scope.$index, scope.row)"
                                   size="small" :disabled="modifyDisabled">编辑
                        </el-button>
                        <el-button type="warning" @click="manage(scope.$index, scope.row)" size="small"
                                   :disabled="manageDisabled">权限管理
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--工具条，分页-->
            <el-pagination @current-change="handleCurrentChange"
                           :current-page.sync="currentPage"
                           layout="prev, pager, next, jumper" :total="total" style="float:right;margin:20px 10px 0;">
            </el-pagination>
        </section>
        <!--TODO 权限管理界面-->
        <section :class="{ manageBox: isdisplayBox }">
            <div class="treeTitle">
                权限管理 --- {{treeTitle}}
                <i class="el-icon-close" @click="manageClose"></i>
            </div>
            <!--权限管理树结构-->
            <el-tree :data="manageList" show-checkbox default-expand-all node-key="id"
                      ref="manageList">
            </el-tree>
            <!--权限管理操作-->
            <el-button type="success" @click="getCheckedKeys">立即提交</el-button>
            <el-button :plain="true" type="success" @click="manageReset">恢复</el-button>
        </section>
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
                        {required: true, message: '请输入管理组名称', trigger: 'blur'}
                    ]
                },

                /*删除*/
                deleteDisabled: true,

                /*编辑*/
                modifyDisabled: true,
                editAdminGroup: false,
                editAdminGroupForm: {
                    name: ''
                },
                editAdminGroupRules: {
                    name: [
                        {required: true, message: '请输入管理组名称', trigger: 'blur'}
                    ]
                },

                formLabelWidth: '120px',

                /*权限管理*/
                manageDisabled: true,
                isdisplayMain: false,
                isdisplayBox: true,
                groupId: '',

                /*权限列表*/
                manageList: [],
                checkedList: [],
                treeTitle: '',

                /*分页*/
                currentPage: 1,
                total: 0,
                pageNum: 1,
            }
        },
        methods: {
            /*获取列表信息*/
            getList() {
                this.$DB.AdminGroup.list({
                    pageNum: this.pageNum,
                    pageSize: '10'
                }).then(result => {
                    /*权限判断，实现按钮是否可执行。*/
                    if (result.operates.includes("添加")) {
                        this.addDisabled = false;
                    }
                    if (result.operates.includes("删除")) {
                        this.deleteDisabled = false;
                    }
                    if (result.operates.includes("修改")) {
                        this.modifyDisabled = false;
                    }
                    if (result.operates.includes("权限管理")) {
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
                    if (data.code == 3304) {
                        window.location.href = '#/login';
                    }
                })
            },
            /*重置*/
            AdminGroupReset() {
                this.addAdminGroupForm.name = '';
                this.editAdminGroupForm.name = '';
            },
            /*显示新增对话框页面*/
            addAdminGroup() {
                this.addAdminGroupVisible = true;
            },

            /*新增*/
            addAdminGroupSub() {
                this.$refs.addAdminGroupForm.validate((valid) => {
                    if (valid) {
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
            },

            /*编辑*/
            editAdminGroupSub() {
                this.$refs.editAdminGroupForm.validate((valid) => {
                    if (valid) {
                        this.$DB.AdminGroup.modify({
                            id: this.editAdminGroupForm.id,
                            name: this.editAdminGroupForm.name
                        }).then(result => {
                            this.editAdminGroup = false;
                            this.getList();
                        }, data => {
                            this.$message({
                                type: 'warning',
                                message: data.msg
                            });
                        });
                    }
                });
            },

            /*分页跳转到输入的页面*/
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getList();
            },
            /*权限管理树结构的children*/
            submodules(item){    //tree2
                const result = [];
                const tree2 = item.map((itm,index)=>{
                    const tree2Object = {
                        label:itm.name,
                        children:this.operate(itm.operate)
                    };
                    result.push(tree2Object);
                });
                return result;
            },
            operate(item){     //tree3
                const result = [];
                const tree3 = item.map(itm =>{
                    if(itm.status){
                        this.checkedList.push(itm.id);
                    }
                    const tree3Object = {
                        label: itm.name,
                        id: itm.id,
                    };
                    result.push(tree3Object)
                });
                return result;
            },
            /*权限管理*/
            manage(index, row) {
                this.isdisplayMain = true;
                this.isdisplayBox = false;
                this.treeTitle = row.name;
                this.groupId = row.id;
                this.$DB.AdminGroup.manage({
                    adminGroupId: this.groupId
                }).then(result => {
                    result.map(async (item,index) => {
                        let tree1 = {
                            label: item.module,
                            children: this.submodules(item.submodules)
                        };
                        /*只有在async方法里面才能使用await操作符。等待push之后再设置选中的节点*/
                        await this.manageList.push(tree1);
                        /*设置选中的节点*/
                        this.$refs.manageList.setCheckedKeys(this.checkedList);
                    });
                }, data => {
                    console.log(data)
                })
            },
            /*权限管理界面关闭*/
            manageClose(){
                this.isdisplayMain = false;
                this.isdisplayBox = true;
                this.manageList = [];
            },
            /*权限修改提交*/
            getCheckedKeys(){
                /*获取被选中的节点*/
                const getChecked = this.$refs.manageList.getCheckedKeys();
                this.$DB.AdminGroup.modifyManage({
                    adminGroupId: this.groupId,
                    permissionIds: getChecked,
                }).then(result => {
                    this.checkedList = getChecked;
                    this.$message({
                        showClose: true,
                        message: '权限更新成功',
                        type: 'success'
                    });
                },data => {
                    console.log('失败',data);
                })
            },
            /*恢复页面*/
            manageReset(){
                this.$refs.manageList.setCheckedKeys(this.checkedList);
            }
        },
        mounted() {
            this.getList();
        },
    }
</script>
<style lang="css">
</style>