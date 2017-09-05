<template>
    <section class="AdminController">
        <el-button type="primary" @click="addAdmin = true">添加管理员</el-button>
        <el-table :data="AdminList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="adminGroupName" label="所属管理组"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>
            <el-table-column prop="operates" label="操作">
                <template scope="scope">
                    <el-button type="info" @click="modify" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加管理员" :visible.sync="addAdmin">
            <el-form :model="addAdminForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="addAdminForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input v-model="addAdminForm.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="addAdminForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="所属管理组" :label-width="formLabelWidth">
                    <el-select v-model="selectAdminGroup" placeholder="请选择管理组" >
                        <el-option v-for='item in options' :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAdminReset">重置</el-button>
                <el-button type="success" @click="addAdminSub">立即提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                AdminList: [],
                addAdmin: false,
                addAdminForm: {
                    name: '',
                    phone: '',
                    email: '',
                },
                selectAdminGroup: '',
                formLabelWidth: '120px',
                options: [
                    {value: '1',label: 'label1'},
                    {value: '2',label: 'label2'},
                    {value: '3',label: 'label3'},
                    {value: '4',label: 'label4'}
                ]
            }
        },
        methods: {
            addAdminSub(){
                this.$DB.Admin.Admin({
                    name: this.addAdminForm.name,
                    phone: this.addAdminForm.phone,
                    email: this.addAdminForm.email,
                    adminGroupId: ''
                }).then(result => {
                    let newAdd = Object.assign({}, result, {createTime:
                        moment(result.createTime).format('YYYY-MM-DD HH:mm:ss')});
                    this.AdminGroupList.push(newAdd);
                    this.addAdmin = false;
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                }, data => {
                    if(data.code === 3301){
                        this.$message({
                            type: 'warning',
                            message: data.msg
                        });
                    }
                });
            },
            adminList(){

            },
            addAdminReset(){
                this.addAdminForm = '';
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
                     row[index].id
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
            this.$DB.Admin.list({
                pageNum: '1',
                pageSize: '30'
            }).then(result => {
                this.AdminList = result.pageList.map(item=> {
                    return Object.assign({}, item, {createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')});
                });
            }, data => {
                console.log('失败', data)
            })
        },
    }
</script>
<style lang="css">
</style>