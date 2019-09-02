<template>
  <div class="note-box">
    <img src="@/assets/images/report.png" class="report" @click="dialogShow = true" v-if="isLogin" />
    <div class="note" v-for="text in list" :key="text.id">
      <p>{{ text.text }}</p>
    </div>
    <el-dialog title="新的笔记" :visible.sync="dialogShow" :modal="false" :close-on-click-modal="false" center>
      <el-input type="textarea" :rows="5" v-model="text" autofocus></el-input>
      <center>
                  <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="createNote">上传</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import { getAllNote, newNote } from "@/api/note";

export default {
  name: "note",
  data() {
    return {
      isLogin: localStorage.getItem("token") != null,
      dialogShow: false,
      text: "",
      list: [{ id: 0, text: "暂无笔记！" }]
    };
  },
  methods: {
    init() {
      getAllNote().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data.reverse();
        }
      });
    },
    createNote() {
     if(this.text.trim() == "") {
         this.$message.error("请输入内容！")
         return
     }
      newNote({text: this.text}).then(res => {
        if (res.data.code === 200) {
          this.text = "";
          this.$message({
            message: res.data.data,
            type: "success"
          });
          this.dialogShow = false
          this.init()
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.note-box {
  width: 1200px;
  min-height: 300px;
  max-height: 1500px;
  overflow: hidden;
  margin: 0px auto;
  .report {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 6px;
    top: 6px;
    cursor: pointer;
  }
  .note {
    width: 100%;
    height: auto;
    padding: 0 0 0 10px;
    border-left: 3px solid #ccc;
    border-bottom: 3px solid #ccc;
    p {
      text-indent: 2em;
      line-height: 3vh;
    }
  }
}
</style>
