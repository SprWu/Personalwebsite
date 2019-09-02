<template>
  <div class="layout">
    <el-backtop :right="100" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >UP</div>
    </el-backtop>
    <img
      class="operate"
      src="@/assets/images/login.png"
      title="登录"
      @click="dialogShow = true"
      v-if="!isLogin"
    />
    <img class="operate" src="@/assets/images/logout.png" title="退出" @click="logout" v-else />
    <my-nav :islogin="!isLogin"></my-nav>
    <div class="body">
      <person-info style="float: left"></person-info>
      <div class="router">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>

    <el-dialog
      :title="'目前只有站主能登录'"
      :visible.sync="dialogShow"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="460px"
      center
    >
      <el-form :model="form">
        <el-form-item label="账户：" :label-width="'120px'">
          <el-input v-model.trim="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="'120px'">
          <el-input type="password" v-model.trim="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <center>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">登 录</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import myNav from "./nav";
import personInfo from "./personInfo";
import { Login } from "@/api/login";
import { getPersonInfo } from "@/api/person";
import { getToken } from "@/api/token";
import { setTimeout } from "timers";

export default {
  name: "layout",
  data() {
    return {
      isLogin: getToken(),
      dialogShow: false,
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    cancel() {
      this.dialogShow = false;
      this.form.account = "";
      this.form.password = "";
    },
    submit() {
      if (this.form.account.trim() == "" || this.form.password.trim() == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return false;
      }
      Login(this.form)
        .then(res => {
          this.dialogShow = false;
          if (res.data.code === 200) {
            // this.$store.commit("setUserInfo", res.data.data);
            // this.$store.commit("setBadge", res.data.badge);
            this.isLogin = true;
            localStorage.setItem("token", res.data.token);
          }
          //  else if (res.data.code === 0) {
          //   this.$message.error(res.data.data);
          // }
          this.form.account = "";
          this.form.password = "";
          setTimeout(() => window.location.reload(), 500);
        })
        .catch(err => {
          this.form.account = "";
          this.form.password = "";
        });
    },
    logout() {
      this.$confirm("确认退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.isLogin = false;
          this.$store.commit("clearUserInfo");
          localStorage.removeItem("token");
          this.$message({
            message: "您已成功退出",
            type: "success"
          });
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(() => {});
    },
    getUserInfo() {
      getPersonInfo().then(res => {
        if (res.data.code === 200) {
          this.$store.commit("setUserInfo", res.data.data);
          this.$store.commit("setBadge", res.data.badge);
          this.isLogin = true;
        } else {
          localStorage.removeItem("token");
          this.isLogin = false;
        }
      });
    }
  },
  components: {
    myNav,
    personInfo
  },
  mounted() {
    if (this.isLogin) {
      this.getUserInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.operate {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  cursor: pointer;
}
.body {
  margin: 0 auto;
  width: 1900px;
}
.router {
  display: block;
  //width: 1495px;
  position: relative;
  width: 77%;
  min-height: 800px;
  margin: 3px 0 0 0.5%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
