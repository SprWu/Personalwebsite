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
    <el-switch
      style="display: block"
      v-model="selectVal"
      active-color="#13ce66"
      inactive-color="#409eff"
      active-text="普通编辑"
      inactive-text="Markdown编辑"
    ></el-switch>
    <div class="edit-container" v-if="selectVal">
      <quill-editor v-model="message" ref="quillEditor" :options="editorOption"></quill-editor>
    </div>
    <div class="mavon-editor-container" v-else>
      <mavon-editor
        :toolbars="mavon_toolbars"
        :ishljs="true"
        v-model="message"
        @change="clickSave = false"
        @save="save"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import { submitMsg } from "@/api/message";
import { setTimeout } from "timers";

export default {
  name: "msgEditor",
  data() {
    return {
      title: "",
      imgurl: "",
      summary: "",
      message: "",
      markdownVal: "",
      clickSave: false,
      selectVal: true,
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
      },
      mavon_toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    submit() {
      switch (this.selectVal) {
        case true:
          if (
            this.title == "" ||
            this.imgurl == "" ||
            this.summary == "" ||
            this.message == ""
          ) {
            this.$message.error("请填写完整");
            return false;
          }
          let data = {
            title: this.title,
            imgurl: this.imgurl,
            summary: this.summary,
            message: this.message
          };
          submitMsg(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "发表成功！",
                type: "success"
              });
              this.$router.push({ name: "message/index" });
            }
          });
          break;
        case false:
          if (!this.clickSave || this.markdownVal == "") {
            this.$message.error("请确保存在内容并且点击保存按钮转化内容！");
            break;
          }
          if (this.title == "" || this.imgurl == "" || this.summary == "") {
            this.$message.error("请填写完整");
            break;
          }
          let markdownData = {
            title: this.title,
            imgurl: this.imgurl,
            summary: this.summary,
            message: this.markdownVal
          };
          submitMsg(markdownData).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "发表成功！",
                type: "success"
              });
              this.$router.push({ name: "message/index" });
            }
          });
          break;
      }
    },
    save(value, render) {
      this.markdownVal = render;
      this.clickSave = true;
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
  .mavon-editor-container {
    margin-top: 30px;
  }
  .ql-editor {
    height: 300px !important;
  }
}
</style>

