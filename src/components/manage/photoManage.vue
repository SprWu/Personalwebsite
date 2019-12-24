<template>
  <div class="photo-manage-box">
    <div class="upload-img">
      <el-button type="primary" @click="messageImg">上传文章图片</el-button>
      <el-button type="primary" @click="novelImg">上传小说图片</el-button>
      <el-button @click="flush">刷新</el-button>
    </div>
    <div class="images-box">
      <div class="img">
        <el-button type="success" class="button" @click="getMessageImg" v-if="mState">获取文章图片</el-button>
        <div>
          <el-image v-for="url in mImg" :key="url" :src="url" class="img-item" @click="urlDialog(url)"></el-image>
        </div>
      </div>
      <div class="img">
        <el-button type="success" class="button" @click="getNovelImg" v-if="nState">获取小说图片</el-button>
        <div v-else>
          <el-image v-for="url in nImg" :key="url" :src="url" class="img-item" @click="urlDialog(url)"></el-image>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogShow"
      :title="`上传 ${selectVal} 图片`"
      width="300px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      center
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        :headers="header"
        :data="data"
        :action="action"
        :file-list="fileList"
        :on-success="uploadSuccess"
        :multiple="true"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <el-dialog
    :visible.sync="urlDialogShow"
    title="图片地址"
    width="300px"
    :show-close="false"
    center>
      <el-input v-model="imgurl" ref="input"></el-input>
      <el-button type="primary" @click="copyUrl" class="copy">复制</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { baseURL } from "@/api/config";
import { getAllImages } from "@/api/manage";

export default {
  data() {
    return {
      dialogShow: false,
      urlDialogShow: false,
      selectVal: "message",
      action: `${baseURL}:9000/updateImg`,
      fileList: [],
      header: { token: localStorage.getItem("token") || "null" },
      data: { url: "message" },
      mState: true,
      nState: true,
      mImg: [],
      nImg: [],
      imgurl: ""
    };
  },
  methods: {
    messageImg() {
      this.selectVal = "文章";
      this.data = { url: "message" };
      this.dialogShow = true;
    },
    novelImg() {
      this.selectVal = "小说";
      this.data = { url: "novel" };
      this.dialogShow = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$message({
          message: `${response.data.message}, 图片地址：${response.data.imgUrl}`,
          type: "success"
        });
        this.dialogShow = false;
      } else {
        this.$message.error(response.data);
      }
    },
    getMessageImg() {
      this.mState = false
      getAllImages({ filename: "message" }).then(res => {
        if (res.data.code === 200) {
          let result = JSON.parse(JSON.stringify(res.data.data));
          result.array.forEach(imgName => {
            this.mImg.push(result.url + imgName);
          });
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    getNovelImg() {
      this.nState = false
      getAllImages({ filename: "novel" }).then(res => {
        if (res.data.code === 200) {
          let result = JSON.parse(JSON.stringify(res.data.data));
          result.array.forEach(imgName => {
            this.nImg.push(result.url + imgName);
          });
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    flush() {
      this.mState = true
      this.nState = true
      this.nImg = []
      this.mImg = []
    },
    urlDialog(url) {
      this.imgurl = url
      this.urlDialogShow = true
    },
    copyUrl() {
      this.$refs.input.select()
      document.execCommand('copy')
      this.$message({
        message: "图片地址复制成功！",
        type: 'success'
      })
      this.urlDialogShow = false
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-manage-box {
  width: 100%;
  height: auto;
  .upload-img {
    width: 360px;
    height: auto;
    margin: 10px 0 0 100px;
  }
  .images-box {
    width: 1310px;
    height: 600px;
    margin: 10px auto;
    .img {
      // display: flex;
      // justify-content: space-around;
      // flex-wrap: wrap;
      // align-content: flex-start;
      width: 645px;
      height: 800px;
      border: 0.5px solid black;
      overflow-x: hidden;
      overflow-y: auto;
      margin-right: 7px;
      float: left;
      .button {
        display: block;
        margin: 0 auto;
      }
      .img-item {
        width: 300px;
        height: 300px;
        margin: 5px 0 5px 10px;
        cursor: pointer;
        float: left;
      }
    }
  }
  .copy {
    display: block;
    margin: 6px auto;
  }
}
</style>