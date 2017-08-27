<template>
<section class='login'>
  <div class="login__main">
      <p>通通理财后台管理系统</p>
      <form action="">
          <div class="form-item">
              <input v-model="username" type="text" name="" placeholder='请输入登录账号'>
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
        username:''
    }
  },
  methods:{
      login(){
//          location.hash='/'
          this.signIn();
      },
      signIn(){
          this.$DB.HidePermission.signIn({
              username:this.username,

          }).then(data=>{
              console.log('success')
              location.hash='/'
          },data=>{
              console.log(data)
              layer.open({
                  content: "亲，您已完成注册，是否安装通通理APP！",
                  btn: ["安装","取消"],
                  yes: function(index){
                      window.location.href =
                          "https://down-cdn.007fenqi.com/app/family/homepage/index.html#/app/ttl";
                      layer.close(index);
                  }
              });
          })
      }
  },
  components:{
    'el-switch':Switch,
    'el-button':Button
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
