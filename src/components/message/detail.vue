<template>
  <div class="detail-box">
    <back></back>
    <img src="@/assets/images/delete.png" class="delete" title="删除这篇文章" v-if="role" @click="deletemsg">
    <h1>{{ message.title }}</h1>
    <div class="time" v-if="!loading">{{ message.time | formatDate }}</div>
    <div class="content" v-loading="loading">
      <pre v-html="message.message"></pre>
    </div>
  </div>
</template>

<script>
import { getMessageDetail, deleteMsg } from "@/api/message";

export default {
  name: "messageDetail",
  data() {
    return {
      message: {},
      loading: true,
      role: this.$store.getters.role == 'A'
    };
  },
  methods: {
    fetchMessageDetail() {
      getMessageDetail(this.$route.query.id).then(res => {
        this.loading = false;
        if (res.data.code === 200) {
          this.message = res.data.data[0];
        }
      });
    },
    deletemsg() {
      this.$confirm("确定删除这篇文章？","提示", {
         confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
          deleteMsg(this.$route.query.id).then( res=> {
            if(res.data.code === 200) {
              this.$message({
                message: "删除成功",
                type: 'success'
              })
              this.$router.push({name: "message/index"})
            }
          })
      }).catch(()=>{})
    }
  },
  created() {
    this.fetchMessageDetail();
    //console.log(this.$route.query.id)
  }
};
</script>

<style lang="scss" scoped>
.detail-box {
  text-align: center;
}
.delete {
  position: absolute;
  width: 36px;
  height: 36px;
  left: 1vw;
  cursor: pointer;
}
.time {
  width: auto;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  margin-right: 30px;
  color: #ccc;
}
.content {
  width: auto;
  min-width: 1000px;
  max-width: 1200px;
  min-height: 760px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  padding: 1%;

  pre {
    width: 100%;
    text-indent: 2em;
    line-height: 30px;
    text-align: left;
    font-weight: 400;
    word-wrap: break-word; // 使文本内容保留预留空白符但正常换行
    white-space: pre-wrap;
  }
  
}
</style>
