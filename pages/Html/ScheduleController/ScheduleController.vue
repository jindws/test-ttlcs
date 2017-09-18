<template>
    <section class='ScheduleController'>
        <!-- 工具栏，增加操作-->
        <el-button type="primary" @click="addScheduleController" :disabled="addDisabled">添加</el-button>
        <!-- 列表-->
        <el-table :data="ScheduleList" style="width: 100%" border>
            <el-table-column prop="id" label="ID" width="70"></el-table-column>
            <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
            <el-table-column prop="beanName" label="string bean名称"></el-table-column>
            <el-table-column prop="methodName" label="方法名称"></el-table-column>
            <el-table-column prop="cron" label="cron表达式"></el-table-column>
            <el-table-column prop="updateId" label="最近一次更新管理员id"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="deleted(scope.$index, scope.row)" :disabled="deleteDisabled">删除</el-button>
                    <el-button size="small" type='info' @click="modify(scope.$index, scope.row)" :disabled="modifyDisabled">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--TODO 新增对话框-->
        <el-dialog title="添加" :visible.sync="addScheduleVisible">
            <el-form :model="addScheduleForm" :rules="addScheduleFormRules">
                <el-form-item label="定时任务名字" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addScheduleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="bean的名字" :label-width="formLabelWidth" prop="beanName">
                    <el-input v-model="addScheduleForm.beanName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="方法名" :label-width="formLabelWidth" prop="methodName">
                    <el-input v-model="addScheduleForm.methodName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="cron表达式" :label-width="formLabelWidth" prop="cron">
                    <el-input v-model="addScheduleForm.cron" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ScheduleResetClose('addScheduleForm')">重置</el-button>
                <el-button type="success" @click="addScheduleSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!--分页-->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                layout="prev, pager, next, jumper" :total="total" style="float:right;margin:20px 10px 0;">
        </el-pagination>
    </section>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                /*列表*/
                ScheduleList: [],
                /*新增界面*/
                addDisabled: true,
                addScheduleVisible: false,
                addScheduleForm: {
                    name: '',
                    beanName: '',
                    methodName: '',
                    cron: ''
                },
                addScheduleFormRules:{
                    name: [{required: true, message: '请输入定时任务名字', trigger: 'blur'}],
                    beanName: [{required: true, message: '请输入bean的名字', trigger: 'blur'}],
                    methodName: [{required: true, message: '请输入方法名', trigger: 'blur'}],
                    cron: [{required: true, message: '请输入cron表达式', trigger: 'blur'}]
                },
                /*删除*/
                deleteDisabled: true,
                /*修改*/
                modifyDisabled: true,
                /*对话框*/
                formLabelWidth: '120px',
                /*分页*/
                currentPage: 1,
                total: 0,
            }
        },
        methods: {
            /*列表*/
            getList(){
                this.$DB.Schedule.list({
                    pageSize: '10',
                    pageNum: this.currentPage
                }).then(result => {
                    /*分页*/
                    this.total = result.total;
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
                    /*列表*/
                    this.ScheduleList = result.pageList.map(item => {
                        return Object.assign({},item,{
                            updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                        })
                    });
                });
            },
            /*新增定时任务对话框*/
            addScheduleController(){
                this.addScheduleVisible = true;
            },
            /*TODO 新增提交*/
            addScheduleSub(){

            },
            /*新增重置*/
            ScheduleResetClose(formName) {
                this.$refs[formName].resetFields();
            },
            /*TODO 删除*/
            deleted(index,row){

            },
            /*TODO 编辑*/
            modify(index,row){

            },
            /*分页*/
            handleCurrentChange(val){
                this.currentPage = val;
                this.getList();
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>
