<template>
  <div class="edit-box">
    <back />
    <submit @clicksub="submit" />
    <b>标题：</b>
    <el-input
      class="title"
      type="text"
      placeholder="请输入标题"
      v-model="title"
      maxlength="30"
      show-word-limit
    ></el-input>
    <br />
    <br />
    <b>图片地址：</b>
    <el-input class="imgurl" type="text" placeholder="请输入图片地址" v-model="imgurl"></el-input>
    <br />
    <br />
    <p>
      <b>文章概要：</b>
    </p>
    <el-input
      class="summary"
      type="textarea"
      :row="2"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入文章概要"
      maxlength="130"
      v-model="summary"
    ></el-input>
    <br />
    <br />
    <p>
      <b>文章内容：</b>
    </p>
    <div class="edit-container">
      <quill-editor v-model="message" ref="quillEditor" :options="editorOption"></quill-editor>
    </div>
  </div>
</template>

<script>
import { submitMsg } from "@/api/message"
import { setTimeout } from 'timers';

export default {
  name: "msgEditor",
  data() {
    return {
      title: "",
      imgurl: "",
      summary: "",
      message: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ],
          imageResize: {}
        },
        theme: "snow"
      }
    };
  },
  methods: {
    submit() {
      if(this.title == '' || this.imgurl == '' || this.summary == '' || this.message == '') {
        this.$message.error("请填写完整")
        return false;
      }
      let data = {
          title: this.title,
          imgurl: this.imgurl,
          summary: this.summary,
          message: this.message
      };
      submitMsg(data).then( res=> {
        if(res.data.code === 200) {
          this.$message({
            message: "发表成功！",
            type: 'success'
          })
          this.$router.push({name: "message/index"})
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-box {
  width: 1300px;
  height: auto;
  margin: 0 auto;
  text-align: left;
  padding-top: 30px;
  .title {
    width: 600px;
  }
  .imgurl {
    width: 600px;
  }
  .summary {
    width: 1000px;
  }
  .edit-container {
    margin-top: 30px;
  }
  .ql-editor {
    height: 300px !important;
  }
}
</style>

