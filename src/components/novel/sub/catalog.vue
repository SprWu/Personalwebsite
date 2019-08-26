<template>
  <div class="catalog-box">
    <div class="head">{{ info.name }}</div>
    <div class="auther">作者：{{ info.auther }}</div>
    <dl class="catalog">
      <dt>
        <span class="zhenwen">正文</span>
        <span class="number">共{{ info.number }}章</span>
        <a class="back" @click="back"><返回</a>
      </dt>
      <dd>
        <a v-for="title in catalogData" :key="title[0]" @click="gotoTxt(title)">{{ title[1] }}</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getNovelCatalog } from "@/api/novel";
export default {
  name: "catalog",
  data() {
    return {
      info: "",
      catalogData: ["暂无数据"]
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
    back() {
      this.$router.push({ name: "novel/index" });
    },
    gotoTxt(info) {
      localStorage.setItem('count', this.info.number)
      this.$router.push({
        name: "novel/text",
        query: { name: this.info.name, title: info[1], id: info[0] }
      });
    }
  },
  created() {
    this.info = this.$route.query;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.catalog-box {
  text-align: center;
  width: 1300px;
  height: auto;
  max-height: 1300px;
  padding-bottom: 30px;
  margin: 6px 0 0 80px;
  background-color: lightcyan;
  .head {
    width: 100%;
    height: auto;
    font-weight: 700;
    font-family: 黑体;
    color: #555;
    font-size: 30px;
    line-height: 50px;
  }
  .auther {
    width: 75%;
    height: auto;
    margin: 0 auto;
    line-height: 30px;
    font-family: Source Han Sans CN;
  }
  .catalog {
    width: 90%;
    height: auto;
    max-height: 1200px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 36px auto;
    padding: 0;
    text-align: left;

    dt {
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
      font-family: "MicroSoft YaHei";
      .zhenwen {
        border-left: 3px solid #f60;
        padding-left: 0.5em;
        font-weight: 600;
      }
      .number {
        color: #999;
        margin-left: 1em;
      }
      .back {
        display: block;
        float: right;
        border: 1px solid #e0e0e0;
        text-decoration: none;
        font-size: 14px;
        color: #666;
        padding: 0 1em;
        background-color: #eee;
        line-height: 25px;
        margin-right: 30px;
        cursor: pointer;
      }
    }
    dd {
      padding: 30px 30px 0 0;
      a {
        display: inline-block;
        width: 200px;
        text-decoration: none;
        color: #666;
        font-size: 14px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 70px;
        border-bottom: 1px dashed #e0e0e0;
        cursor: pointer;
      }
      a:hover {
        color: red;
      }
    }
  }
}
</style>