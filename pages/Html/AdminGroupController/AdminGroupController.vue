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
        <!--权限管理界面-->
        <section :class="{manageBox: isdisplayBox}">
            <!--权限管理树结构-->
            <div v-for="(item,index) in manageList" class="manageList">
                <h2 class="title">【{{item.module}}】</h2>
                <div>
                    <ul>
                        <li>
                            <input type="checkbox" checked>{{item.module}}
                            <dl v-for="(item,index2) in manageList[index].submodules">
                                <input type="checkbox" checked>{{item.name}}
                                <dd v-for="(item,index3) in manageList[index].submodules[index2].operate">
                                    <input type="checkbox" checked>{{item.name}}
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
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

                /*权限列表*/
                manageList: [
                    /*{
                        "module": "借款管理",
                        "submodules": [
                            {
                                "ctrlName": "ProjectController",
                                "htmlName": "Loan_allList",
                                "operate": [
                                    {"ctrlMethod": "listAll", "name": "列表", "id": 1, "status": 1},
                                    {"ctrlMethod": "exportAll", "name": "导出全部", "id": 4, "status": 1},
                                    {"ctrlMethod": "exportFront", "name": "导出当前", "id": 3, "status": 1},
                                    {"ctrlMethod": "detailsAll", "name": "详情", "id": 2, "status": 1}],
                                "name": "所有借款列表",
                                "statusLen": 4
                            },
                            {
                                "ctrlName": "RealNameController",
                                "htmlName": "TEST",
                                "operate": [
                                    {"ctrlMethod": "getBorrowerInfo", "name": "获取借款人", "id": 247, "status": 1},
                                    {"ctrlMethod": "updatePend", "name": "修改", "id": 6, "status": 1},
                                    {"ctrlMethod": "listPend", "name": "列表", "id": 8, "status": 1},
                                ],
                                "name": "待提交列表",
                                "statusLen": 7
                            }
                        ]
                    },
                    {
                        "module": "现金管理",
                        "submodules": [
                            {
                                "ctrlName": "ProjectController",
                                "htmlName": "Loan_allList",
                                "operate": [
                                    {"ctrlMethod": "listAll", "name": "列表", "id": 1, "status": 1},
                                    {"ctrlMethod": "exportAll", "name": "导出全部", "id": 4, "status": 1},
                                    {"ctrlMethod": "exportFront", "name": "导出当前", "id": 3, "status": 1},
                                    {"ctrlMethod": "detailsAll", "name": "详情", "id": 2, "status": 1}],
                                "name": "所有借款列表",
                                "statusLen": 4
                            },
                            {
                                "ctrlName": "RealNameController",
                                "htmlName": "TEST",
                                "operate": [
                                    {"ctrlMethod": "getBorrowerInfo", "name": "获取借款人", "id": 247, "status": 1},
                                    {"ctrlMethod": "updatePend", "name": "修改", "id": 6, "status": 1},
                                    {"ctrlMethod": "listPend", "name": "列表", "id": 8, "status": 1},
                                ],
                                "name": "待提交列表",
                                "statusLen": 7
                            }
                        ]
                    }*/
                ],
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
                    /*var a = {"code":0,"msg":"操作成功","data":{"total":11,"operates":["列表","添加","删除","修改","权限修改","权限管理"],"pageSize":10,"pageList":[{"id":7,"name":"88","fatherId":1,"createId":1,"updateId":1,"createTime":1504347791000,"updateTime":1504347791000},{"id":49,"name":"test","fatherId":1,"createId":1,"updateId":1,"createTime":1504576277000,"updateTime":1504576277000},{"id":52,"name":"yayayyay","fatherId":1,"createId":1,"updateId":1,"createTime":1504607642000,"updateTime":1504609744000},{"id":55,"name":"weisha ","fatherId":1,"createId":1,"updateId":1,"createTime":1504610435000,"updateTime":1504610435000},{"id":61,"name":"777777","fatherId":1,"createId":1,"updateId":1,"createTime":1504662907000,"updateTime":1504667282000},{"id":62,"name":"巍峨剩余费用会是","fatherId":1,"createId":1,"updateId":1,"createTime":1504667575000,"updateTime":1504667575000},{"id":63,"name":"为u由于该","fatherId":1,"createId":1,"updateId":1,"createTime":1504667790000,"updateTime":1504667790000},{"id":64,"name":"hhhhhh对对对","fatherId":1,"createId":1,"updateId":1,"createTime":1504667974000,"updateTime":1504677265000},{"id":67,"name":"546546","fatherId":1,"createId":1,"updateId":1,"createTime":1504677858000,"updateTime":1504684347000},{"id":68,"name":"656565656566","fatherId":1,"createId":1,"updateId":1,"createTime":1504685480000,"updateTime":1504685480000}],"pageNum":1}};*/
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

            /*权限管理*/
            manage(index, row) {
                this.isdisplayMain = true;
                this.isdisplayBox = false;
                this.$DB.AdminGroup.manage({
                    adminGroupId: row.id
                }).then(result => {
                    this.manageList = result;
                    console.log(result)
                }, data => {
                    console.log(data)
                })
            },
        },
        mounted() {
            this.getList();
        },
    }
</script>
<style lang="css">
</style>