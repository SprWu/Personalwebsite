<template>
  <div class="text-box">
    <div class="text-title">{{ info.title }}</div>
    <div class="tool">
      <a class="button" @click.prevent="back" style="marginRight: 60px">返回</a>
      <a class="button" @click="next" v-show="info.id != maxCount">下一章</a>
      <a class="button" @click="pre" v-show="info.id != 1">上一章</a>
    </div>
    <div class="text">
      <p v-for="(text, i) in message" :key="i">{{ text }}</p>
    </div>
    <div class="tool">
      <a class="button" @click="next" v-show="info.id != maxCount" style="marginRight: 60px">下一章</a>
      <a class="button" @click="pre" v-show="info.id != 1">上一章</a>
    </div>
  </div>
</template>

<script>
import { getNovel } from "@/api/novel";
import { baseURL } from "@/api/config"
export default {
  name: "txt",
  data() {
    return {
      info: this.$route.query,
      message: "",
      maxCount: localStorage.getItem("count") || 1
    };
  },
  methods: {
    init() {
      getNovel({ name: this.info.name, number: this.info.id }).then(res => {
        if (res.data.code === 200) {
          let message = this.fix(JSON.parse(JSON.stringify(res.data.data)));
          this.info.title = message.title;
          this.message = message.message;
        }
      });
    },
    fix(data) {
      let title = "",
        arr = "";
      arr = data.split("\n");
      if (arr.length == 1) {
        arr = data.split("<br><br>");
      }
      title = arr.shift();
      return {
        title,
        message: arr
      };
    },
    back() {
      this.$router.go(-1);
    },
    next() {
      this.info.id++;
      location.replace(
        `${baseURL}:8080/#/novel/text?name=${this.info.name}&id=${this.info.id}`
      );
      this.init();
    },
    pre() {
      this.info.id--;
      location.replace(
        `${baseURL}:8080/#/novel/text?name=${this.info.name}&id=${this.info.id}`
      );
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.text-box {
  width: 1300px;
  height: auto;
  background-color: #f6f6f6;
  padding: 10px 30px 0 30px;
  margin: 6px auto;
  .text-title {
    width: 100%;
    height: auto;
    font-weight: 700;
    font-family: 黑体;
    color: #555;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
  }
  .tool {
    width: 100%;
    height: 30px;
    .button {
      display: block;
      float: right;
      float: right;
      border: 1px solid #e0e0e0;
      text-decoration: none;
      font-size: 14px;
      color: #666;
      padding: 0 1em;
      background-color: #eee;
      line-height: 25px;
      margin-right: 10px;
      cursor: pointer;
    }
    .button:hover {
      color: red;
    }
  }
  .text p {
    text-align: left;
    text-indent: 2em;
    line-height: 1.7;
  }
}
</style>