<template>
    <section class='IpWhiteListController'>
        <!--主界面-->
        <el-button type="primary" @click="addIpWhiteList" :disabled="addDisabled">添加公共Ip白名单</el-button>
        <!--列表-->
        <el-table :data="IpWhiteList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="70"></el-table-column>
            <el-table-column prop="type" label="ip白名单类型"></el-table-column>
            <el-table-column prop="ip" label="允许的ip"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column prop="createName" label="创建者"></el-table-column>
            <el-table-column prop="updateName" label="修改者"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="operates" label="操作" width="200">
                <template scope="scope">
                    <el-button type="danger" @click="deleted(scope.$index, scope.row)"
                               size="small" :disabled="deleteDisabled">删除
                    </el-button>
                    <el-button type="info" @click="modify(scope.$index, scope.row)" size="small"
                               :disabled="modifyDisabled">编辑
                    </el-button>
                    <el-button type="warning" @click="approve(scope.$index, scope.row)" size="small"
                               :disabled="approveDisabled">审批
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条，分页-->
        <el-pagination @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       layout="prev, pager, next, jumper" :total="total" style="float:right;margin:20px 10px 0;">
        </el-pagination>
        <!--新增界面-->
        <el-dialog title="添加公共ip白名单" :visible.sync="addIpWhiteListVisible" :close-on-click-modal="false"
                   @close="IpWhiteListCloseReset('addIpWhiteListForm')">
            <el-form :model="addIpWhiteListForm" :rules="addIpWhiteListRules" ref="addIpWhiteListForm">
                <el-form-item label="公共白名单ip" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="addIpWhiteListForm.ip" auto-complete="off"
                              placeholder="请输入公共白名单ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="IpWhiteListCloseReset('addIpWhiteListForm')">重置</el-button>
                <el-button type="success" @click="addIpWhiteListpSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!-- 编辑界面-->
        <el-dialog title="编辑公共ip白名单" :visible.sync="editIpWhiteListVisible" :close-on-click-modal="false"
                   @close="IpWhiteListCloseReset('editIpWhiteListForm')">
            <el-form :model="editIpWhiteListForm" :rules="editIpWhiteListRules" ref="editIpWhiteListForm">
                <el-form-item label="公共白名单ip" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="editIpWhiteListForm.ip" auto-complete="off"
                              placeholder="请输入公共白名单ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editIpWhiteListCloseReset">重置</el-button>
                <el-button type="success" @click="editIpWhiteListpSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!--TODO 审批界面-->
        <el-dialog title="审批" :visible.sync="approveIpWhiteListVisible" :close-on-click-modal="false"
                   @close="approveIpWhiteListCloseReset">
            <el-form :model="approveIpWhiteList" ref="approveIpWhiteList" style="margin-bottom: -24px;">
                <el-form-item label="是否同意">
                    <el-radio-group v-model="approveIpWhiteList.radio">
                        <el-radio class="radio" label="AGREE" style="margin-left:20px">
                            同意</el-radio>
                        <el-radio class="radio" label="DISAGREE">不同意</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="approveIpWhiteListpSub">立即提交</el-button>
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
                IpWhiteList: [],
                deletedType: '',
                /*新增*/
                addDisabled: true,
                addIpWhiteListVisible: false,
                addIpWhiteListForm: {
                    ip: ''
                },
                addIpWhiteListRules: {
                    ip: [{required: true, message: '公共白名单ip不能为空', trigger: 'blur'}]
                },
                /*删除*/
                deleteDisabled: true,
                /*编辑*/
                modifyDisabled: true,
                editIpWhiteListVisible: false,
                editIpWhiteListForm: {
                    ip: ''
                },
                editIpWhiteListRules: {
                    ip: [{required: true, message: '公共白名单ip不能为空', trigger: 'blur'}]
                },
                /*审批*/
                approveDisabled: true,
                approveIpWhiteListVisible: false,
                approveIpWhiteList: {
                    radio: ''
                },
                /*分页*/
                currentPage: 1,
                total: 0,
                pageNum: 1,
                /*对话框表单宽度*/
                formLabelWidth: '120px',
            }
        },
        methods: {
            /*列表*/
            getList() {
                this.$DB.IpWhiteList.list({
                    pagesize: '10',
                    pageNum: this.pageNum,
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
                    if (result.operates.includes("审批")) {
                        this.approveDisabled = false;
                    }
                    /*工具栏，分页*/
                    this.total = result.total;
                    /!*列表展示，时间格式转换 *!/
                    this.IpWhiteList = result.pageList.map(item => {
                        this.deletedType = item.type;
                        return Object.assign({}, item, {
                            startTime: moment(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
                            endTime: moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')
                        });
                    });
                }, data => {
                    console.log('失败', data);
                });
            },
            /*新增公共ip白名单对话框*/
            addIpWhiteList() {
                this.addIpWhiteListVisible = true;
            },
            /*关闭对话框，重置对话框*/
            IpWhiteListCloseReset(formName) {
                this.$refs[formName].resetFields();
            },
            /*新增公共白名单ip提交*/
            addIpWhiteListpSub() {
                this.$refs.addIpWhiteListForm.validate((valid) => {
                    if (valid) {
                        this.$DB.IpWhiteList.add({
                            ip: this.addIpWhiteListForm.ip
                        }).then(result => {
                            this.getList();
                            this.addIpWhiteListVisible = false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        }, data => {
                            if (data.code == 3304) {
                                window.location.href = '#/login';
                            }
                            console.log('失败', data)
                        })
                    }
                });
            },
            /* 删除*/
            deleted(index, row) {
                this.$confirm('确定做删除操作吗?', '提示信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$DB.IpWhiteList.deleted({
                        id: row.id
                    }).then(result => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, data => {
                        if (data.code == 3304) {
                            window.location.href = '#/login';
                        }
                        console.log('失败', data);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /* 编辑对话框*/
            modify(index, row) {
                this.editIpWhiteListVisible = true;
                this.editIpWhiteListForm.ip = row.ip;
                this.editIpWhiteListForm.id = row.id;
            },
            /* 编辑重置*/
            editIpWhiteListCloseReset() {
                this.editIpWhiteListForm = {ip: ''};
                this.$refs.editIpWhiteListForm.resetFields();
            },
            /* 编辑提交*/
            editIpWhiteListpSub() {
                this.$refs.editIpWhiteListForm.validate((valid) => {
                    if (valid) {
                        this.$DB.IpWhiteList.modify({
                            id: this.editIpWhiteListForm.id,
                            ip: this.editIpWhiteListForm.ip
                        }).then(result => {
                            this.editIpWhiteListVisible = false;
                            this.getList();
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        },data => {
                            console.log('失败',data)
                        })
                    }
                })
            },
            /*TODO 审批*/
            approve(index, row) {
                this.approveIpWhiteListVisible = true;
                this.approveIpWhiteList.id = row.id;
            },
            /*TODO 审批成功*/
            approveIpWhiteListpSub(){
                this.$DB.IpWhiteList.approve({
                    id: this.approveIpWhiteList.id,
                    opinion: this.approveIpWhiteList.radio
                }).then(result => {
                    this.getList();
                    this.approveIpWhiteListVisible = false;
                    this.$message({
                        type: 'success',
                        message: '审批成功'
                    });
                },data => {
                    console.log('失败',data)
                });
            },
            /*TODO 审批关闭，重置界面*/
            approveIpWhiteListCloseReset(){
                this.approveIpWhiteList.radio = '';
            },
            /*分页跳转到输入的页面*/
            handleCurrentChange(val){
                this.pageNum = val;
                this.getList();
            },
        },
        mounted() {
            /*列表*/
            this.getList();
            console.log(this.deletedType)
        }
    }
</script>
<style lang="css">
</style>
