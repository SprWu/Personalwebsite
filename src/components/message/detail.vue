<template>
  <div>
    <back />
    <h1>{{ message.title }}</h1>
    <div class="time" v-if="!loading">{{ message.time | formatDate }}</div>
    <div class="content" v-loading="loading">
      <pre v-html="message.message"></pre>
    </div>
  </div>
</template>

<script>
import { getMessageDetail } from "@/api/message";
import back from "@/components/base/back";

export default {
  name: "messageDetail",
  data() {
    return {
      message: {},
      loading: true
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
    }
  },
  created() {
    this.fetchMessageDetail();
    //console.log(this.$route.query.id)
  },
  components: {
    back
  }
};
</script>

<style lang="scss" scoped>
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
