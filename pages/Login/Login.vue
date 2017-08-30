<template>
<section class='login'>
    <el-form ref="form" :model="login" class="login-box">
        <p>通通理财后台管理系统</p>
        <el-form-item>
            <el-input v-model="login.account" placeholder="请输入登录账户"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="login.password" placeholder="请输入登录账户"></el-input>
        </el-form-item>
        <el-form-item>
            <el-switch on-text="" off-text="" v-model="login.remember"></el-switch>
            <span>记住我的登录</span>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="signIn" class="btn-login">登录</el-button>
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
                }
            }
        },
        methods:{
            signIn(){
                this.$DB.HidePermission.signIn({
                    account: this.login.account,
                    password: this.login.password
                }).then(result=>{
                    console.log('成功',result)
                    window.location.href = '#/'
                },data=>{
                    console.log('失败',data)
                })
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
                this.username = localStorage.username
            }
        }
    }
</script>

<style lang="css">
</style>
