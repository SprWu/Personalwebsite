<template>
  <div class="mnovel-box" ref="mnovelBox">
    <div class="toolbar">
      <img src="@/assets/images/mback.png" class="back" @click="back" />
      <a class="logout" @click="logout">退出</a>
    </div>
    <div class="body-box">
      <div class="novel-box" v-for="anovel in novelData" :key="anovel.id" @click="gotoCatalog(anovel)">
        <img :src="anovel.imgUrl" class="mnovel-img" />
        <div class="novel-info">
          <div class="novel-name">{{ anovel.name }}</div>
          <div class="novel-auther">{{ anovel.auther }}</div>
          <div class="novel-summary">举头三尺无神明，掌心三寸是人间。这是耳这是耳这是耳这是耳根继《仙逆》《求魔》《我欲封天》《一念永恒》后，创作的第五部长篇小说《三寸人间》</div>
          <div class="novel-number">共{{ anovel.CatalogCount }}章</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllNovel } from "@/api/novel";

export default {
    name: 'mnovel',
  data() {
    return {
      novelData: [{imgUrl: '#', name: "暂无数据", auther: "暂无数据", summary: "暂无数据", CatalogCount: 0}]
    };
  },
  methods: {
    init() {
      getAllNovel().then(res => {
        if (res.data.code === 200) {
          this.novelData = res.data.data;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    logout() {
      let flag = confirm("确定要退出？");
      if (flag) {
        localStorage.clear();
        window.location.reload();
      }
    },
    gotoCatalog(info) {
      this.$router.push({name: 'mtext', query: {name: info.name, number: info.CatalogCount, id: 1}})
    }
  },
  created() {
      this.init()
  },
  mounted() {
    this.$refs.mnovelBox.style.width = window.screen.width + "px";
    this.$refs.mnovelBox.style.height = window.screen.height + "px";
    this.$refs.mnovelBox.style.fontSize = window.screen.width / 23 + "px";
  }
};
</script>

<style lang="scss" scoped>
.mnovel-box {
  overflow: hidden;
  overflow-x: hidden;
  text-align: left;
  .toolbar {
    width: 100vw;
    height: 7vh;
    background-color: #66ccff;
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
  .body-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    width: 98vw;
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1vh 1vw;
    background-color: beige;
    .novel-box {
      width: 45vw;
      padding: 1vw;
      height: 18vh;
      border: 0.5px solid #ccc;
      margin-bottom: 1vh;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .mnovel-img {
        width: 40%;
        height: 90%;
        float: left;
      }
      .novel-info {
        width: 55%;
        height: 100%;
        float: left;
      }
      .novel-name {
        width: 100%;
        height: 10%;
        font-size: 0.6em;
        font-weight: 700;
      }
      .novel-auther {
        width: 100%;
        height: 10%;
        font-family: Source Han Sans CN;
        font-size: 0.5em;
        text-align: right;
        color: #666;
      }
      .novel-summary {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        width: 100%;
        height: 66%;
        overflow: hidden;
        font-family: Source Han Sans CN;
        line-height: 2vh;
        text-align: left;
        font-size: 0.5em;
        text-indent: 1em;
      }
      .novel-number {
        width: 100%;
        height: 10%;
        margin-top: 6%;
        color: #999;
        text-align: right;
        font-size: 0.5em;
      }
    }
  }
  .body-box:after {
    content: "";
    width: 45vw;
    padding: 1vw;
  }
}
</style>