<template>
<section class='login'>
  <div class="login__main">
      <p>XXX管理系统</p>
      <input type="text" name="" value="" placeholder='请输入用户名'>
      <input type="password" name="" value="" placeholder='请输入密码'>
      <div class="login__main__remember">
          <el-switch
            v-model="remember"
            on-text=""
            off-text=""
            :width='40'
            >
          </el-switch>
          <span>记住我的登录</span>
      </div>
      <el-button type="success" @click='login'>登录</el-button>
  </div>
</section>
</template>

<script>
import {Switch,Button} from 'element-ui'
export default {
  data(){
    return{
        remember:true,
    }
  },
  methods:{
      login(){
          location.hash='/'
      }
  },
  components:{
    'el-switch':Switch,
    'el-button':Button
  }
}
</script>

<style lang="css">
</style>
