<template>
  <div class="anovel-box" @click="toCatalog">
    <img :src="novelData.imgUrl" class="novel-img" />
    <div class="novel-name">{{ novelData.name }}</div>
    <div class="novel-auther">---{{ novelData.auther }}</div>
    <div class="novel-summary">{{ novelData.summary }}</div>
    <div class="novel-catalog">共{{ novelData.CatalogCount }}章</div>
  </div>
</template>

<script>
export default {
  name: "anovel",
  props: ["novelData"],
  methods: {
    toCatalog() {
      this.$router.push({name: 'novel/catalog',query: {name: this.novelData.name, auther: this.novelData.auther, number: this.novelData.CatalogCount}})
    }
  }
};
</script>

<style lang="scss" scoped>
.anovel-box {
  width: 380px;
  height: 185px;
  padding: 10px;
  text-align: left;
  border: 0.5px solid #ccc;
  background-color: #f7f6f2;
  box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  .novel-img {
    width: 124px;
    height: 180px;
    float: left;
    margin-right: 10px;
    border: 1px solid black;
  }
  .novel-name {
    width: 240px;
    height: 25px;
    text-align: center;
    font-weight: 600;
    float: left;
  }
  .novel-name:hover {
    color: red;
  }
  .novel-auther {
    width: 240px;
    height: 20px;
    float: left;
    font-size: 14px;
    font-family: Source Han Sans CN;
    padding-bottom: 3px;
    border-bottom: 1px dotted #a6d3e8;
    text-align: right;
  }
  .novel-summary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    overflow: hidden;
    width: 228px;
    height: auto;
    min-height: 60px;
    height: 113px;
    padding: 8px 6px 0;
    font-size: 12px;
    line-height: 16px;
    text-indent: 2em;
    float: left;
  }
  .novel-catalog {
    width: 240px;
    height: 12px;
    font-size: 12px;
    text-align: right;
    font-family: Source Han Sans CN;
    color: #bbb;
    float: left;
  }
}
</style>