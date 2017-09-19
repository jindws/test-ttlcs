<template>
    <section class='PermissionController'>
        <!--主界面-->
        <el-button type="primary" @click="addPermission" :disabled="addDisabled">添加模块</el-button>
        <!--列表-->
        <el-table :data="PermissionList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="60"></el-table-column>
            <el-table-column prop="module" label="模块名称"></el-table-column>
            <el-table-column prop="moduleSort" label="模块排序" width="100"></el-table-column>
            <el-table-column prop="submodule" label="子模块名称"></el-table-column>
            <el-table-column prop="submoduleSort" label="子模块排序"></el-table-column>
            <el-table-column prop="operate" label="操作名称"></el-table-column>
            <el-table-column prop="ctrlName" label="控制器名称"></el-table-column>
            <el-table-column prop="ctrlMethod" label="控制器方法"></el-table-column>
            <el-table-column prop="updateName" label="操作人"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
            <el-table-column prop="operates" label="操作" width="160">
                <template scope="scope">
                    <el-button type="danger" @click="deleted(scope.$index, scope.row)"
                               size="small" :disabled="deleteDisabled">删除
                    </el-button>
                    <el-button type="info" @click="modify(scope.$index, scope.row)" size="small"
                               :disabled="modifyDisabled">编辑
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
        <el-dialog title="添加模块" :visible.sync="addPermissionVisible" :close-on-click-modal="false"
                   @close="closeReset('addPermissionForm')">
            <el-form :model="addPermissionForm" :rules="addPermissionRules" ref="addPermissionForm">
                <el-form-item label="模块名称" prop="module" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.module" auto-complete="off" placeholder="请输入模块名称"></el-input>
                </el-form-item>
                <el-form-item label="模块排序" prop="moduleSort" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.moduleSort" auto-complete="off" placeholder="请输入序号"></el-input>
                </el-form-item>
                <el-form-item label="子模块名称" prop="submodule" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.submodule" auto-complete="off" placeholder="请输入子模块"></el-input>
                </el-form-item>
                <el-form-item label="子模块排序" prop="submoduleSort" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.submoduleSort" auto-complete="off"
                              placeholder="请输入子序号"></el-input>
                </el-form-item>
                <el-form-item label="操作名称" prop="operate" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.operate" auto-complete="off"
                              placeholder="请输入操作名称"></el-input>
                </el-form-item>
                <el-form-item label="控制器名称" prop="ctrlName" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.ctrlName" auto-complete="off"
                              placeholder="请输入控制器名称"></el-input>
                </el-form-item>
                <el-form-item label="控制器方法" prop="ctrlMethod" :label-width="formLabelWidth">
                    <el-input v-model="addPermissionForm.ctrlMethod" auto-complete="off"
                              placeholder="请输入控制器名称"></el-input>
                </el-form-item>
                <el-form-item label="显示方式" :label-width="formLabelWidth" >
                    <el-radio-group v-model="addPermissionForm.radio">
                        <el-radio label="HIDE" style="margin-left:20px">隐藏</el-radio>
                        <el-radio label="SHOW">显示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeReset('addPermissionForm')">重置</el-button>
                <el-button type="success" @click="addPermissionSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="编辑模块" :visible.sync="editPermissionVisible" :close-on-click-modal="false"
                   @close="closeReset('editPermissionForm')">
            <el-form :model="editPermissionForm" :rules="editPermissionRules" ref="editPermissionForm">
                <el-form-item label="模块名称" prop="module" :label-width="formLabelWidth">
                    <el-input v-model="editPermissionForm.module" auto-complete="off" placeholder="请输入模块名称"></el-input>
                </el-form-item>
                <el-form-item label="模块排序" prop="moduleSort" :label-width="formLabelWidth">
                    <el-input v-model="editPermissionForm.moduleSort" auto-complete="off" placeholder="请输入序号"></el-input>
                </el-form-item>
                <el-form-item label="子模块名称" prop="submodule" :label-width="formLabelWidth">
                    <el-input v-model="editPermissionForm.submodule" auto-complete="off" placeholder="请输入子模块"></el-input>
                </el-form-item>
                <el-form-item label="子模块排序" prop="submoduleSort" :label-width="formLabelWidth">
                    <el-input v-model="editPermissionForm.submoduleSort" auto-complete="off"
                              placeholder="请输入子序号"></el-input>
                </el-form-item>
                <el-form-item label="操作名称" prop="operate" :label-width="formLabelWidth">
                    <el-input v-model="editPermissionForm.operate" auto-complete="off"
                              placeholder="请输入操作名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeReset('editPermissionForm')">重置</el-button>
                <el-button type="success" @click="editPermissionSub">立即提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            let numberValidate = (rule, value, callback) => {
                if (!/^[0-9]+.?[0-9]*$/.test(value)) {
                    callback(new Error('序号必须是数字'));
                } else {
                    callback();
                }
            };
            return {
                /*列表*/
                PermissionList: [],
                /*新增模块*/
                addDisabled: true,
                addPermissionVisible: false,
                addPermissionForm: {
                    module: '',
                    moduleSort: '',
                    submodule: '',
                    submoduleSort: '',
                    operate: '',
                    ctrlName: '',
                    ctrlMethod: '',
                    radio: 'SHOW',
                },
                addPermissionRules: {
                    module: [{required: true, message: '请输入模块名称', trigger: 'blur'}],
                    moduleSort: [
                        {required: true, message: '请输入模块排序', trigger: 'blur'},
                        {validator: numberValidate, trigger: 'blur'}
                    ],
                    submodule: [{required: true, message: '请输入子模块名称', trigger: 'blur'}],
                    submoduleSort: [
                        {required: true, message: '请输入子模块排序', trigger: 'blur'},
                        {validator: numberValidate, trigger: 'blur'}
                    ],
                    operate: [{required: true, message: '请输入操作名称', trigger: 'blur'}],
                    ctrlName: [{required: true, message: '请输入控制器名称', trigger: 'blur'}],
                    ctrlMethod: [{required: true, message: '请输入控制器方法', trigger: 'blur'}],
                },
                /*删除*/
                deleteDisabled: true,
                /*编辑*/
                modifyDisabled: true,
                editPermissionVisible: false,
                editPermissionForm: {
                    id: '',
                    module: '',
                    moduleSort: '',
                    submodule: '',
                    submoduleSort: '',
                    operate: '',
                },
                editPermissionRules: {
                    module: [{required: true, message: '请输入模块名称', trigger: 'blur'}],
                    moduleSort: [
                        {required: true, message: '请输入模块序号'},
                        {validator: numberValidate, trigger: 'blur'}
                    ],
                    submodule: [{required: true, message: '请输入子模块名称', trigger: 'blur'}],
                    submoduleSort: [
                        {required: true, message: '请输入子模块序号'},
                        {validator: numberValidate, trigger: 'blur'}
                    ],
                    operate: [{required: true, message: '请输入操作名称', trigger: 'blur'}],
                },
                /*分页*/
                currentPage: 1,
                total: 0,
                /*对话框表单宽度*/
                formLabelWidth: '120px',
            }
        },
        methods: {
            /*列表*/
            getList(){
                this.$DB.Permission.list({
                    pagesize: '10',
                    pageNum: this.currentPage,
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
                    /*工具栏，分页*/
                    this.total = result.total;
                    /*列表展示，时间格式转换 */
                    this.PermissionList = result.pageList.map(item => {
                        return Object.assign({}, item, {
                            updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                        });
                    });
                })
            },
            /*新增的对话框*/
            addPermission(){
                this.addPermissionVisible = true;
            },
            /*添加模块立即提交*/
            addPermissionSub(){
                this.$refs.addPermissionForm.validate((valid) => {
                    if(valid){
                        this.$DB.Permission.add({
                            module: this.addPermissionForm.module,
                            submodule: this.addPermissionForm.submodule,
                            operate: this.addPermissionForm.operate,
                            ctrlName: this.addPermissionForm.ctrlName,
                            ctrlMethod: this.addPermissionForm.ctrlMethod,
                            moduleSort: this.addPermissionForm.moduleSort,
                            submoduleSort: this.addPermissionForm.submoduleSort,
                            display: this.addPermissionForm.radio,
                        }).then(result => {
                            this.addPermissionVisible = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.getList();
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: 'error submit!!'
                        });
                        return false;
                    }
                });
            },
            /*删除确认框*/
            deleted(index,row){
                this.$confirm('确定做删除操作吗?', '提示信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$DB.Permission.deleted({
                        id: row.id
                    }).then(result => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*编辑对话框*/
            modify(index,row){
                this.editPermissionForm = {
                    id: row.id,  //要修改的权限id
                    module: row.module,  //模块名称
                    moduleSort: row.moduleSort, //模块排序
                    submodule: row.submodule, //子模块名称
                    submoduleSort: row.submoduleSort,//子模块排序
                    operate: row.operate,//操作名称
                };
                this.editPermissionVisible = true;
            },
            /*编辑提交*/
            editPermissionSub(){
                this.$refs.editPermissionForm.validate((valid) => {
                    if (valid) {
                        this.$DB.Permission.modify({
                            id: this.editPermissionForm.id,
                            module: this.editPermissionForm.module,
                            submodule: this.editPermissionForm.submodule,
                            operate: this.editPermissionForm.operate,
                            moduleSort: this.editPermissionForm.moduleSort,
                            submoduleSort: this.editPermissionForm.submoduleSort,
                        }).then(result => {
                            this.getList();
                            this.editPermissionVisible = false;
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: 'error submit!!'
                        });
                        return false;
                    }
                });
            },
            /*分页跳转到输入的页面*/
            handleCurrentChange(val){
                this.currentPage = val;
                this.getList();
            },
            /*关闭对话框时,重置对话框并消除验证状态。重置操作*/
            closeReset(formName){
                this.$refs[formName].resetFields();
            }
        },
        mounted()  {
            /*列表*/
            this.getList();
        }
    }
</script>

