<template>
<section class='login'>
    <el-form ref="loginForm" :model="login" :rules="rules" class="login-box">
        <p>通通理财后台管理系统</p>
        <el-form-item prop="account">
            <el-input  placeholder="请输入登录账户" v-model="login.account" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password"  placeholder="请输入登录密码" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-switch on-text="" off-text="" v-model="login.remember"></el-switch>
            <span>记住我的登录</span>
        </el-form-item>
        <el-form-item class="btn">
            <el-button type="success" @click="signIn" class="btn-login">登录</el-button>
            <el-button type="info" @click="applyIpWhiteList" class="btn-applyIp">申请ip白名单</el-button>
        </el-form-item>
    </el-form>
</section>
</template>

<script>
    import {Switch,Button,Form,Input,FormItem} from 'element-ui'
    export default {
        data() {
            return {
                login: {
                    account: '15088665843',
                    password: '111111',
                    remember: true,
                },
                rules: {
                    account: [
                        { required: true, message: '必填项不能为空', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '密码必须6到12位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            signIn(){
                this.$refs.loginForm.validate((valid) => {
                    if(valid){
                        this.$DB.HidePermission.signIn({
                            account: this.login.account,
                            password: this.login.password
                        }).then(result=>{
                            console.log('成功',result);
                            window.location.href = '#/'
                        },data=>{
                            console.log('失败',data);
                            this.$message.error('用户名或密码错误！');
                        });
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            applyIpWhiteList(){
                console.log(1)
            }
        },
        components:{
            'el-switch':Switch,
            'el-button':Button,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-input': Input,
        },
        mounted:function(){
            if(localStorage.remember){
                this.login.account = localStorage.login.account;
                this.login.password = localStorage.login.password;
            }
        }
    }
</script>

<style lang="css">
</style>
