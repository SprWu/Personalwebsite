<template>
  <div class="nav-box">
    <el-menu class="nav" mode="horizontal" :router="true" background-color="#e5e9f2">
      <el-menu-item index="/index" default-active>我的主页</el-menu-item>
      <el-menu-item index="/message/index">我的文章</el-menu-item>
      <el-menu-item index="/note/index" >some笔记</el-menu-item>
      <el-menu-item index="/diary/index">随意日记</el-menu-item>
      <el-menu-item index="#"><a href="http://www.xishupo.cn:8080" target="_blank">聊天室</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-box {
  width: 100%;
  height: 61px;
  background-color: #e5e9f2;
  .nav {
    width: 60vw;
    min-width: 600px;
    position: absolute;
    left: 31vw;
    .el-menu-item {
      width: 5vw;
      margin: 0 2vw 0 2vw;
      text-align: left;
    }
    a {
      text-decoration: none;
    }
  }
}
</style>
