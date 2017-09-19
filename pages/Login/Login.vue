<template>
    <section class='login'>
        <!--登录的表单-->
        <el-form ref="loginForm" :model="login" :rules="rules" class="login-box">
            <p>通通理财后台管理系统</p>
            <el-form-item prop="account">
                <el-input placeholder="请输入登录账户" v-model="login.account"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入登录密码" v-model="login.password"></el-input>
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
    import Store from '../../src/store.js'
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
                        {required: true, message: '必填项不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '密码必须6到12位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /*登录*/
            signIn() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$DB.HidePermission.signIn({
                            account: this.login.account,
                            password: this.login.password
                        }).then(result => {
                            window.location.href = '#/';
                            Store.save(result);
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: 'error submit!!'
                        });
                        return false;
                    }
                });
            },
            /*申请ip白名单*/
            applyIpWhiteList() {
                this.$DB.HidePermission.applyIpWhiteList({
                    phone: this.login.account
                }).then(result => {
                    this.$message({
                        type: 'success',
                        message: '申请Ip白名单成功'
                    });
                })
            }
        },
        mounted() {
            if (localStorage.remember) {
                this.login.account = localStorage.login.account;
                this.login.password = localStorage.login.password;
            }
        }
    }
</script>

