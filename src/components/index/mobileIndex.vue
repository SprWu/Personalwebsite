<template>
  <div class="mobileIndex-box" ref="main">
    <div class="login-box">
      <center>
        <span>只有登录之后才能阅读小说哦~</span>
      </center>
      <table class="table">
        <tr>
          <td>用户名：</td>
          <td class="input-box">
            <input type="text" v-model="userName" class="input" />
          </td>
        </tr>
        <tr>
          <td>密　码：</td>
          <td class="input-box">
            <input type="password" v-model="passWord" class="input" />
          </td>
        </tr>
      </table>
      <center> 
        <button class="submit" @click="login">登录</button>
      </center>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/login"
export default {
  name: "mobileIndex",
  data() {
      return {
          userName: "",
          passWord: ""
      }
  },
  methods: {
      login() {
          if(this.userName.trim() ==  '' || this.passWord.trim() == '') {
              alert("请填写完整")
              return
          }
        Login({account: this.userName, password: this.passWord}).then( res => {
            if(res.data.code === 200) {
                localStorage.setItem("token", res.data.token);
                this.$router.push({name: 'm.novel'})
            }
        })
      }
  },
  created() {
    //   let isLogin = localStorage.getItem('token')==null?false:true;
    //   if(isLogin) {
    //       this.$router.push({name: '/mobile/novel/index'})
    //   }
  },
  mounted() {
    this.$refs.main.style.width = window.screen.width + "px";
    this.$refs.main.style.height = window.screen.height + "px";
    this.$refs.main.style.fontSize = window.screen.width / 23 + "px";
  }
};
</script>

<style lang="scss" scoped>
.mobileIndex-box {
  overflow: hidden;
  overflow-x: hidden;
  text-align: left;
  .login-box {
    width: 75vw;
    height: auto;
    padding: 3vh 3vw;
    margin: 30vh auto;
    background-color: #eee;
    font-size: 1em;
    span {
      line-height: 6vh;
    }
    .table {
      margin-top: 1vh;
      padding: 0 0 3vh 5vw;
      tr {
          padding: 30px;
      }
      td {
        display: inline-block;
        height: 3vh;
        margin-bottom: 1vh;
      }
      .input-box {
        background-color: white;
      }
      .input {
        width: 43vw;
        height: 100%;
        background: none;
        border: none;
      }
    }
    .submit {
      width: 25vw;
      height: auto;
      font-size: 1em;
    }
  }
}
</style>