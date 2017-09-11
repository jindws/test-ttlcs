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
            <el-table-column prop="operates" label="操作">
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
        <!--TODO 新增界面-->
        <el-dialog title="添加公共ip白名单" :visible.sync="addIpWhiteListVisible" :close-on-click-modal="false"
                   @close="closeIpWhiteList('addIpWhiteListForm')">
            <el-form :model="addIpWhiteListForm" :rules="addIpWhiteListRules" ref="addIpWhiteListForm">
                <el-form-item label="公共白名单ip" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="addIpWhiteListForm.ip" auto-complete="off"
                              placeholder="请输入公共白名单ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="IpWhiteListReset">重置</el-button>
                <el-button type="success" @click="addIpWhiteListpSub">立即提交</el-button>
            </div>
        </el-dialog>
        <!--TODO 编辑界面-->
        <!--TODO 审批界面-->
    </section>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                /*列表*/
                IpWhiteList: [],
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
                /*审批*/
                approveDisabled: true,
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
            getList(){
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
                         return Object.assign({}, item, {
                             startTime: moment(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
                             endTime: moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')
                         });
                     });
                },data => {
                    console.log('失败',data);
                })

            },
            /*TODO 新增公共ip白名单*/
            addIpWhiteList(){
                this.addIpWhiteListVisible = true;
            },
            IpWhiteListReset(){

            },
            addIpWhiteListpSub(){

            },
            /*TODO 关闭新增对话框*/
            closeIpWhiteList(){

            },
            /*TODO 删除*/
            deleted(index,row){

            },
            /*TODO 编辑*/
            modify(index,row){

            },
            /*TODO 审批*/
            approve(index,row){

            },
            /*分页*/
            handleCurrentChange(val){
                /*当前第几页*/
                this.pageNum = val;
                this.getList();
            }
        },
        mounted()  {
            /*列表*/
            this.getList();
        }
    }
</script>
<style lang="css">
</style>
