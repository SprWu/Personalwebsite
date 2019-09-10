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
        <el-form-item label="用户名：" :label-width="'120px'">
          <el-input v-model.trim="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密　码：" :label-width="'120px'">
          <el-input type="password" v-model.trim="form.password" @keydown.enter.native="submit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <center>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" >登 录</el-button>
        <div class="tip">
          还没注册？
          <a href="#" @click.prevent="toRegister">点我加入</a>
        </div>
      </center>
    </el-dialog>
    <el-dialog
      :title="'目前只限QQ邮箱注册'"
      :visible.sync="registerShow"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="560px"
    >
      <el-form :model="registerFrom" :rules="rules" ref="register">
        <el-form-item label="用户名：" :label-width="'120px'" prop="username">
          <el-input
            v-model.trim="registerFrom.username"
            autocomplete="off"
            :maxlength="12"
            :minlength="12"
            @keyup="value=value.replace(/\s+/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="'120px'" prop="password">
          <el-input type="password" v-model.trim="registerFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="'120px'" prop="confirm">
          <el-input type="password" v-model.trim="registerFrom.confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="'120px'">
          <el-radio-group v-model="registerFrom.sex">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
            <el-radio :label="'保密'">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位：" :label-width="'120px'">
          <el-input v-model.trim="registerFrom.work" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像：" :label-width="'120px'">
          <el-input
            v-model.trim="registerFrom.imgSrc"
            autocomplete="off"
            placeholder="填写头像imgsrc，目前不支持图片上传"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ邮箱：" :label-width="'120px'" prop="email">
          <el-input
            v-model.trim="registerFrom.email"
            autocomplete="off"
            :maxlength="17"
            @keyup="value=value.replace(/\s+/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：" :label-width="'120px'" prop="reg">
          <el-input
            v-model.trim="registerFrom.reg"
            style="width: 100px"
            :maxlength="4"
            :minlength="4"
            placeholder="4位验证码"
          ></el-input>
          <el-button type="primary" @click="send" :disabled="canSend">{{ buttonText }}</el-button>
        </el-form-item>
      </el-form>
      <center>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="register" :disabled="canRegister">注 册</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import myNav from "./nav";
import personInfo from "./personInfo";
import { Login, Register, sendReg } from "@/api/login";
import { getPersonInfo, getRole, getUserImg } from "@/api/person";
import { getToken } from "@/api/token";
import { setTimeout } from "timers";
import { baseURL } from "@/api/config"

export default {
  name: "layout",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerFrom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var emailReg = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入QQ邮箱"));
      } else if (!/[1-9]\d{4,10}@qq.com/.test(value)) {
        callback(new Error("邮箱不正确"));
      } else {
        callback();
      }
    };
    var nameReg = (rule, value, callback) => {
      if(value == "") {
        callback(new Error("用户名不能为空！"))
      } else if(!/\D/.test(value)) {
        callback(new Error("用户名仅支持中英文、数字和下划线,且不能为纯数字"))
      } else if(/[^\u4E00-\u9FA5\w]/.test(value)) {
        callback(new Error("用户名仅支持中英文、数字和下划线,且不能为纯数字"))
      } else {
        callback()
      }
    }
    return {
      isLogin: getToken(),
      dialogShow: false,
      registerShow: false,
      canRegister: true,
      canSend: false,
      buttonText: "发送验证码到邮箱",
      form: {
        username: "",
        password: ""
      },
      registerFrom: {
        username: "",
        password: "",
        confrim: "",
        sex: "保密",
        work: "",
        email: "",
        imgSrc: "",
        reg: ""
      },
      rules: {
        username: [{ validator: nameReg,  required: true }],
        password: [{ required: true, message: "密码不能为空" }],
        confirm: [{ validator: validatePass2,  required: true }],
        email: [{ validator: emailReg,  required: true }]
      }
    };
  },
  methods: {
    cancel() {
      this.dialogShow = false;
      this.registerShow = false;
      this.form.account = "";
      this.form.password = "";
      this.registerFrom = {
        username: "",
        password: "",
        confrim: "",
        sex: "保密",
        work: "",
        email: "",
        imgSrc: "",
        reg: ""
      };
    },
    toRegister() {
      this.dialogShow = false;
      this.registerShow = true;
    },
    send() {
      this.$refs["register"].validate(valid => {
        if (valid) {
          sendReg({
            email: this.registerFrom.email.replace(/\s+/g, ""),
            username: this.registerFrom.username
          }).then(res => {
            if (res.data.code === 200) {
              this.canSend = true;
              this.canRegister = false;
              this.$message({
                dangerouslyUseHTMLString: true,
                message: `发送成功，去<a href="https://mail.qq.com/" target="_blank">邮箱</a>查看`
              });
              this.countDown(60);
            }
          });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs["register"].validate(valid => {
        if (valid) {
          if (this.registerFrom.reg == "") {
            this.$message.error("验证码不能为空！");
            return false;
          }
          Register(this.registerFrom).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "注册成功，快去登录吧！",
                type: "success"
              });
              (this.registerFrom = {
                username: "",
                password: "",
                confrim: "",
                sex: "保密",
                work: "",
                email: "",
                imgSrc: "",
                reg: ""
              }),
                (this.registerShow = false);
              //this.dialogShow = true;
            } else {
              this.$message.error(res.data.data);
            }
          });
        } else {
          return false;
        }
      });
    },
    submit() {
      if (this.form.username.trim() == "" || this.form.password.trim() == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return false;
      }
      Login(this.form)
        .then(res => {
          if (res.data.code === 200) {
            // this.$store.commit("setUserInfo", res.data.data);
            // this.$store.commit("setBadge", res.data.badge);
            this.isLogin = true;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.username);
            this.form.username = "";
            this.form.password = "";
            setTimeout(() => window.location.reload(), 500);
          }
        })
        .catch(err => {
          this.form.username = "";
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
          //localStorage.removeItem("token");
          localStorage.clear()
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
          let result = Object.assign({imgSrc: `${baseURL}:9000/getUserImg?username=${res.data.data.name}`},res.data.data)
          this.$store.commit("setUserInfo", result);
          this.isLogin = true;
        } else {
          localStorage.removeItem("token");
          this.isLogin = false;
        }
      });
      getRole().then(res => {
        if(res.data.code === 200) {
          this.$store.commit("setRole", res.data.data)
        }
      })
    },
    countDown(index) {
      if (index != 0) {
        this.buttonText = `重新发送(${index}秒)`;
        setTimeout(() => this.countDown(index - 1), 1000);
      } else {
        this.buttonText = "发送验证码到邮箱";
        this.canSend = false;
      }
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
.tip {
  width: 100%;
  margin: 6px auto;
  text-align: center;
}
</style>
