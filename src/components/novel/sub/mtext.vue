<template>
  <div class="catalog-box" ref="catalogBox">
    <div class="toolbar" v-show="toolBarShow">
      <img src="@/assets/images/mback.png" class="back" @click="back" />
      <a class="logout" @click="logout">退出</a>
    </div>
    <div class="bottom-toolbar" v-show="toolBarShow">
      <div class="button" v-show="info.id != 1" @click="toPre">上一章</div>
      <div class="button" @click="showCatalog">目录</div>
      <div class="button" @click="back">返回</div>
      <div class="button" v-show="info.id != info.number" @click="toNext">下一章</div>
    </div>
    <div class="some-info">{{ info.name }}</div>
    <div class="text-container" v-if="startR" @click="showToolBar">
      <h3>{{ messageData.title }}</h3>
      <p v-for="(message, i) in messageData.message" :key="i">{{ message }}</p>
    </div>
    <div class="catalog-list" v-show="catalogShow">
      <div class="header">
        <span>目录</span>
        <span style="color: #999">共{{ info.number }}章</span>
        <span style="float: right;marginRight: 3vw;fontWeight: 700" @click="catalogShow = false">X</span>
      </div>
      <div class="list" ref="list">
        <ul>
          <li
            v-for="item in catalogData"
            :key="item[0]"
            :class="{'selected': item[0] == info.id,'catalog-li': true}"
            @click="topage(item[0])"
          >{{ item[1] }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { getNovelCatalog, getNovel } from "@/api/novel";

export default {
  name: "mtext",
  data() {
    return {
      info: this.$route.query,
      catalogData: [["1", "数据获取中..."]],
      messageData: {},
      toolBarShow: false,
      catalogShow: false,
      startR: false
    };
  },
  methods: {
    init() {
      getNovelCatalog(this.info.name).then(res => {
        if (res.data.code === 200) {
          let arr = res.data.data.split("\n");
          let result = [];
          arr.forEach(item => {
            result.push(item.split("."));
          });
          this.catalogData = result;
        }
      });
    },
    getMessage() {
      getNovel({ name: this.info.name, number: this.info.id }).then(res => {
        if (res.data.code === 200) {
          this.messageData = this.fixMessage(
            JSON.parse(JSON.stringify(res.data.data))
          );
          this.startR = true;
        }
      });
    },
    fixMessage(data) {
      let title = "",
        arr = [];
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
    toNext() {
      this.info.id++;
      location.replace(
        `http://192.168.0.102:8080/#/m.novel/text?name=${this.info.name}&number=${this.info.number}&id=${this.info.id}&s`
      );
      this.getMessage();
    },
    toPre() {
      this.info.id--;
      location.replace(
        `http://192.168.0.102:8080/#/m.novel/text?name=${this.info.name}&number=${this.info.number}&id=${this.info.id}&s`
      );
      this.getMessage();
    },
    logout() {
      let flag = confirm("确定要退出？");
      if (flag) {
        localStorage.clear();
        window.location.reload();
      }
    },
    showToolBar() {
      if (this.catalogShow) this.catalogShow = false;
      else this.toolBarShow = !this.toolBarShow;
    },
    showCatalog() {
      this.toolBarShow = false;
      this.catalogShow = true;
      setTimeout(() => {
        this.$refs.list.scrollTop = 36 * (this.info.id-3);
      }, 0);
    },
    topage(number) {
      this.info.id = number
      location.replace(
        `http://192.168.0.102:8080/#/m.novel/text?name=${this.info.name}&number=${this.info.number}&id=${this.info.id}&goto`
      );
      this.catalogShow = false
      this.getMessage()
    }
  },
  created() {
    this.init();
    this.getMessage();
  },
  mounted() {
    let li = document.querySelector('.catalog-li')
    this.$refs.catalogBox.style.width = window.screen.width + "px";
    this.$refs.catalogBox.style.height = window.screen.height + "px";
    this.$refs.catalogBox.style.fontSize = window.screen.width / 23 + "px";
  }
};
</script>

<style lang="scss" scoped>
.catalog-box {
  overflow: hidden;
  overflow-x: hidden;
  text-align: left;
  .toolbar {
    position: fixed;
    width: 100vw;
    height: 7vh;
    background-color: #66ccff;
    z-index: 999;
    .back {
      margin-top: 1vw;
      width: auto;
      height: 75%;
      float: left;
    }
    .logout {
      display: block;
      line-height: 7vh;
      text-decoration: none;
      color: #666;
      font-size: 1em;
      margin-right: 3vw;
      color: #fff;
      float: right;
    }
  }
  .bottom-toolbar {
    position: fixed;
    display: flex;
    justify-content: space-around;
    width: 96%;
    padding: 2%;
    height: auto;
    background-color: #fff;
    bottom: 0;
    box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
    .button {
      border: 1px solid #333;
      border-radius: 0.3em;
      padding: 2%;
      font-size: 1em;
    }
  }

  .text-container {
    width: 96%;
    height: 96%;
    padding: 2%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f6f6f6;
    h3 {
      text-align: center;
    }
    p {
      text-indent: 2em;
      line-height: 1.7;
    }
  }
  .some-info {
    width: 96%;
    padding-left: 4%;
    height: auto;
    font-size: 0.8em;
    font-weight: 600;
  }
  .catalog-list {
    width: 96%;
    padding: 2% 2% 0 2%;
    height: auto;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
    border: 0.5px solid #ccc;
    background-color: #fff;
    .header {
      height: 3vh;
      padding-bottom: 2%;
      border-bottom: 1px solid #bbb;
    }
    .list {
      height: 30vh;
      max-height: 30vh;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 4vw;
      ul {
        padding: 0;
        margin: 0;
      }
      .catalog-li {
        list-style: none;
        width: 100%;
        height: 30px;
        margin-bottom: 6px;
       // border: 0.5px solid #ccc;
      }
    }
  }
}
.selected {
  color: red;
}
</style>