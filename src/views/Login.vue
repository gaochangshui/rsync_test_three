<script>
export default {
  data() {
    return {
      user: '',
      password: '',
      btntitle:'Sign in'
    };
  },
  methods: {
    login() {
        this.btntitle='Signing'
        this.axios.post('/actionapi/AccountApi/Login', {
            UserCD: this.user,
            Password: this.password
        }).then(e => {
           if(e.data.UserCD){
               this.$router.push(this.$route.query.redirect?this.$route.query.redirect:this.$route.redirectedFrom.fullPath);
           }else{
               this.$message.error('账号或密码错误');
           }
           this.btntitle='Sign in'
        })
    }
  }
};
</script>

<template>
    <div class="login" @keyup.enter="login">
        <div>
            <div class="login-head">Please Sign in</div>
            <el-input class="userInput" 
            v-model="user" 
            placeholder="User Code" 
            style="border-radius: 5px 5px 0 0;"></el-input>
            <el-input class="passeordInput"
             show-password v-model="password" 
             placeholder="LDAP Password" 
             @keyup.enter="login"></el-input>
            <p>
                <a href="http://docs.trechina.cn/docs/ldap_20210622">Forgot Password?</a>
            </p>
            <el-button @click="login"  class="submit" type="primary">{{btntitle}}</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent url('../assets/login.png') center center no-repeat;
    background-attachment:fixed;
    filter: blur(15px);
    z-index: -1;
    background-size: cover;
}
.login > div{
    width: 300px;
    height: 250px;
    margin: 200px auto;
    background-color: #eee;
    padding: 15px;
    border-radius: 5px;
    & > .login-head {
        font-family: 'Microsoft YaHei UI',Helvetica, Arial, Verdana, Tahoma, sans-serif;
        margin-top: 20px;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }
    & > .userInput {
        padding-top:10px;
    }
    & > p {
        text-align:right;
        & > a {
            color: #337ab7;
            text-decoration: none;
            font-size: 14px;
            line-height: 1.42857143;
        }
    }
    & > .submit {
        height:46px;
        width:100%;
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
        font-size: 18px;
        line-height: 1.3333333;
    }
}
::v-deep(.userInput input) {
    line-height: 45px;
    height: 45px;
    border-radius: 5px 5px 0 0;
    
}
::v-deep(.passeordInput input) {
    line-height: 45px;
    height: 45px;
    border-radius: 0px 0px 5px 5px;
}

</style>
