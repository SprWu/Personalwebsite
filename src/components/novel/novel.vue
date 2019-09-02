<template>
  <div class="novel-main-box" v-if="startR">
    <img
      src="@/assets/images/upload.png"
      alt="upload"
      class="upload"
      title="上传小说"
      @click="isShow_info = true"
    />
    <a-novel v-for="novel in novelData" :key="novel.id" :novelData="novel" class="anovel"></a-novel>
    <el-dialog title="上传小说信息" :visible.sync="isShow_info" :close-on-click-modal="false" center>
      <el-form ref="form" :rules="rules" :model="novelInfo" label-width="100px">
        <el-form-item label="小说名字" prop="name">
          <el-input v-model="novelInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="小说作者" prop="auther">
          <el-input v-model="novelInfo.auther"></el-input>
        </el-form-item>
        <el-form-item label="总章节数" prop="CatalogCount">
          <el-input v-model="novelInfo.CatalogCount"></el-input>
        </el-form-item>
        <el-form-item label="小说引言" prop="CatalogCount">
          <el-input v-model="novelInfo.summary"></el-input>
        </el-form-item>
        <el-form-item label="封面链接" prop="imgUrl">
          <el-input v-model="novelInfo.imgUrl"></el-input>
        </el-form-item>
        <center>
          <el-button type="primary" @click="uploadinfo">上传信息</el-button>
          <el-button @click="isShow_info = false">取消</el-button>
        </center>
      </el-form>
    </el-dialog>
    <el-dialog title="上传小说" :visible="isShow_file" :close-on-click-modal="false" center>
      <form
        ref="fileForm"
        action="http://localhost:9000/uploadFile"
        method="POST"
        enctype="multipart/form-data"
        target="_blank"
      >
        <input type="file" ref="file" name="text" multiple />
        <input type="button" value="提交" @click="submit" />
      </form>
    </el-dialog>
  </div>
</template>

<script>
import aNovel from "./sub/aNovel";
import { getAllNovel, uploadInfo } from "@/api/novel";
export default {
  name: "novel",
  data() {
    return {
      novelData: [],
      startR: false,
      isShow_info: false,
      isShow_file: false,
      novelInfo: {
        name: "",
        auther: "",
        CatalogCount: "",
        summary: "",
        imgUrl: ""
      },
      rules: {
        name: [{ required: true, message: "请填写小说名" }],
        auther: [{ required: true, message: "请填写作者名" }],
        CatalogCount: [{ required: true, message: "请填写小说总章节数" }],
        summary: [{required: true, message: "请填写小说概要/引言"}],
        imgUrl: [{ required: true, message: "请填写小说封面链接" }]
      }
    };
  },
  methods: {
    init() {
      getAllNovel().then(res => {
        if (res.data.code === 200) {
          this.novelData = res.data.data;
          this.startR = true;
        }
      });
    },
    uploadinfo() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          uploadInfo(this.novelInfo).then(res => {
            if (res.data.code === 200) {
              this.novelInfo = {
                name: "",
                auther: "",
                CatalogCount: "",
                summary: "",
                imgUrl: ""
              };
              this.$message({
                message: "小说信息上传成功",
                type: "success"
              })
              this.isShow_info = false;
              this.isShow_file = true;
            } else {
              this.$message;
            }
          });
        } else {
          return false;
        }
      });
    },
    submit() {
      if (this.$refs.file.files.length == 0) {
        this.$message.error("请选择文件");
      } else {
        this.$refs.fileForm.submit();
        this.isShow_file = false;
        window.location.reload();
      }
    }
  },
  components: {
    aNovel
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.novel-main-box {
  width: 1235px;
  height: 800px;
  margin: 6px auto;
  padding: 3px 18px 0;
  .anovel {
    float: left;
    margin: 5px;
  }
  .upload {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 6px;
    top: 6px;
    cursor: pointer;
  }
}
</style>
