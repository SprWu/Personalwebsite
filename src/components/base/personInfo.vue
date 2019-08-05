<template>
  <div class="person-info-box">
    <img :src="userInfo.imgSrc" class="person-img" />
    <div class="person-info">
      <ul>
        <li>昵称： <span style="color:rgba(16,16,16,1);">{{ userInfo.name }}</span></li>
        <li>性别： <span style="color:rgba(16,16,16,1);">{{ userInfo.sex }}</span></li>
        <li>从事： <span style="color:rgba(16,16,16,1);">{{ userInfo.work }}</span></li>
        <li>邮箱： <span style="color:rgba(16,16,16,1);">{{ userInfo.email }}</span></li>
      </ul>
    </div>
    <div class="contact">
      <img class="contact-logo" src="@/assets/images/wx.png" title="微信">
      <img class="contact-logo" src="@/assets/images/qq.png" title="QQ">
      <img class="contact-logo" src="@/assets/images/weibo.png" title="微博">
    </div>
    <div class="tag">
      <el-badge :value="badge.message" class="item" type="primary">
        <el-tag>文章</el-tag>
      </el-badge>
      <el-badge :value="badge.note" class="item" type="primary">
        <el-tag>笔记</el-tag>
      </el-badge>
      <el-badge :value="badge.diary" class="item" type="primary">
        <el-tag>日记</el-tag>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'badge'
    ])
  }
};
</script>

<style lang="scss" scoped>
.person-info-box {
  width: 400px;
  height: 800px;
  margin: 3px 0 0 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .person-img {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    margin-top: -30px;
  }

  .tag {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    margin-top: 300px;
    text-align: left;

    .item {
        margin-top: 10px;
    }
  }

  .person-info {
    position: relative;
    width: 230px;
    height: auto;
    margin: 60px 0 0 106px;
    z-index: 999;
    ul {
      padding: 0;
      border: 0;
      margin: 0;
    }
    li {
      text-align: left;
      list-style-type: none;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ccc;
      height: 30px;
      line-height: 30px;
    }
  }
  .contact {
    width: auto;
    height: 50px;
    margin: 20px 0 0 106px;
    float: left;

    .contact-logo {
      float: left;
      margin-right: 30px;
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
}
</style>
