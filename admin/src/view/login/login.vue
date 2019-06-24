<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import { all } from 'q';

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      let _this=this;
      this.handleLogin({ userName, password }).then(function(data) {
        console.log(data);
        if (data.code>0) {
          _this.$router.push({
            name: _this.$config.homeName
          });
        }else{
          _this.$Message.info(data.msg)
        }
      });
    }
  }
};
</script>

<style>
</style>
