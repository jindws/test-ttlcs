<template>
<section class='login'>
  <div class="login__main">
      <p>通通理财后台管理系统</p>
      <form action="">
          <div class="form-item">
              <input type="text" name="" value="" placeholder='请输入登录账号'>
          </div>
          <div class="form-item">
              <input type="password" name="" value="" placeholder='请输入密码'>
          </div>
          <div class="form-item">

          </div>
          <div class="form-item"></div>


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
      </form>
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
  },
  mounted(){
      // console.log(this.remember)
  }
}
</script>

<style lang="css">
</style>
