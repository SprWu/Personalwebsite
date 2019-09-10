<template>
  <div class="person-info-box">
    <img
      src="@/assets/images/setting.png"
      class="update"
      @click="showDialog"
      v-if="userInfo.name != '*'"
    />
    <el-popover trigger="click" :disabled="unLogin">
      <el-button
        style="marginLeft: 16%"
        size="middle"
        type="primary"
        @click="showUpdate"
      >更换头像</el-button>
      <img :src="userInfo.imgSrc" class="person-img" slot="reference" />
    </el-popover>
    <div class="person-info">
      <ul>
        <li>
          昵称：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.name }}</span>
        </li>
        <li>
          性别：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.sex }}</span>
        </li>
        <li>
          从事：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.work }}</span>
        </li>
        <li>
          邮箱：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.email }}</span>
        </li>
        <li>
          微信：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.weixin }}</span>
        </li>
        <li>
          QQ：
          <span style="color:rgba(16,16,16,1);">{{ userInfo.qq }}</span>
        </li>
      </ul>
    </div>
    <div class="contact">
      <img class="contact-logo" src="@/assets/images/weibo.png" title="微博" @click="gotoWeibo" />
    </div>
    <!-- <div class="tag">
      <el-badge :value="badge.message" class="item" type="primary">
        <el-tag>文章</el-tag>
      </el-badge>
      <el-badge :value="badge.note" class="item" type="primary">
        <el-tag>笔记</el-tag>
      </el-badge>
      <el-badge :value="badge.diary" class="item" type="primary">
        <el-tag>日记</el-tag>
      </el-badge>
    </div> -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      width="500px"
    >
      <footer>
        <center>
          <el-form :model="newInfo" label-position="left">
            <el-form-item label="性别：" :label-width="'60px'">
              <el-radio-group v-model="newInfo.sex">
                <el-radio :label="'男'">男</el-radio>
                <el-radio :label="'女'">女</el-radio>
                <el-radio :label="'保密'">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="从事：" :label-width="'60px'">
              <el-input v-model="newInfo.work"></el-input>
            </el-form-item>
            <el-form-item label="微信：" :label-width="'60px'">
              <el-input v-model="newInfo.weixin"></el-input>
            </el-form-item>
            <el-form-item label="QQ：" :label-width="'60px'">
              <el-input v-model="newInfo.qq"></el-input>
            </el-form-item>
            <el-form-item label="微博：" :label-width="'60px'">
              <el-input v-model="newInfo.weibo"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo">更 新</el-button>
        </center>
      </footer>
    </el-dialog>
    <el-dialog title="更换头像" :visible.sync="updateShow" width="270px" :close-on-click-modal="false" center>
      <el-upload
        class="avatar-uploader"
        :action="imgUrl"
        :headers="header"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateInfo } from "@/api/person";
import { setTimeout } from "timers";
import { baseURL } from "@/api/config";

export default {
  data() {
    return {
      unLogin: localStorage.getItem('token') == null? true: false,
      dialogShow: false,
      updateShow: false,
      newInfo: {
        sex: ""
      },
      imgUrl: `${baseURL}:9000/updateUserImg`,
      header: { token: localStorage.getItem("token") || "null" },
      imageUrl: ""
    };
  },
  methods: {
    gotoWeibo() {
      if (this.userInfo.weibo != "*") {
        window.open(this.userInfo.weibo);
      } else {
        this.$message({
          message: "该用户未设置微博"
        });
      }
    },
    showDialog() {
      this.newInfo = JSON.parse(JSON.stringify(this.userInfo));
      this.dialogShow = true;
    },
    showUpdate() {
      this.imageUrl = this.userInfo.imgSrc
      this.updateShow = true
    },
    updateInfo() {
      updateInfo(this.newInfo).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: "success"
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if(res.code === 200) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          message: res.data,
          type: 'success'
        })
        setTimeout(() => {
          this.updateShow = false
          this.userInfo.imgSrc = this.imageUrl // imageUrl 为图片上传成功后的返回
          //this.userInfo.imgSrc = `${baseURL}:9000/getUserImg?username=${this.userInfo.name}`
        }, 1000)
      } else {
        this.$message.error(res.data)
      }
    },
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  computed: {
    ...mapGetters(["userInfo", "badge"])
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.person-info-box {
  width: 400px;
  height: 800px;
  position: relative;
  margin: 3px 0 0 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .update {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 6px;
    top: 6px;
    cursor: pointer;
  }
  .person-img {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    margin-top: -30px;
    margin-left: 85px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  }

  .tag {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    margin-top: 300px;
    text-align: left;

    .item {
      margin-top: 10px;
    }
  }

  .person-info {
    position: relative;
    width: 230px;
    height: auto;
    margin: 60px 0 0 106px;
    z-index: 999;
    ul {
      padding: 0;
      border: 0;
      margin: 0;
    }
    li {
      text-align: left;
      list-style-type: none;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ccc;
      height: 30px;
      line-height: 30px;
    }
  }
  .contact {
    width: auto;
    height: 50px;
    margin: 20px 0 0 106px;
    float: left;

    .contact-logo {
      float: left;
      margin-right: 30px;
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
}
</style>
