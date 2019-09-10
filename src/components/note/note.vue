<template>
  <div class="note-main-container">
    <div class="note-box">
      <img src="@/assets/images/report.png" class="report" @click="dialogShow = true" v-if="role" />
      <div class="note" v-for="text in list" :key="text.id">
        <fieldset class="note-item">
          <legend class="auther">{{ text.auther }}</legend>
          <div class="text">{{ text.text }}</div>
        </fieldset>
      </div>
      <el-dialog
        title="新的笔记"
        :visible.sync="dialogShow"
        :modal="false"
        :close-on-click-modal="false"
        center
      >
        <el-input type="textarea" :rows="5" v-model="text" autofocus></el-input>
        <footer style="marginTop: 20px">
          <center>
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="createNote">上传</el-button>
          </center>
        </footer>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllNote, newNote } from "@/api/note";

export default {
  name: "note",
  data() {
    return {
      role: ["A", "B"].includes(this.$store.getters.role),
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
      if (this.text.trim() == "") {
        this.$message.error("请输入内容！");
        return;
      }
      newNote({ text: this.text, auther: localStorage.getItem("name") }).then(
        res => {
          if (res.data.code === 200) {
            this.text = "";
            this.$message({
              message: res.data.data,
              type: "success"
            });
            this.dialogShow = false;
            this.init();
          }
        }
      );
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.note-main-container {
  width: 100%;
  height: auto;
  min-height: 800px;
  // background: url("https://cdn.laod.wang/wp-content/uploads/2018/12/bg.png") repeat top left scroll;
  background: url("../../assets/images/bg.png") repeat top left scroll;
}
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
    .note-item {
      margin-top: 10px;
      .auther {
         font-family: "MicroSoft YaHei";
         font-weight: 400; 
         border: 1px solid black;
         text-align: right;
      }
      .text {
      text-indent: 1em;
      line-height: 3vh;
    }
    }
  }
}
</style>
