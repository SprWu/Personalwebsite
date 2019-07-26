<template>
  <div class="message-box">
    <img
      class="photo"
      :src="message.imgurl"
    />
    <div class="title-box">
      <b class="title" @click="enterDetail">{{ message.title }}</b>
    </div>
    <div class="content">{{ message.summary }}</div>
    <div class="time">{{ message.time | formatDate }}</div>
  </div>
</template>

<script>
import { formatTime } from "@/mixin/mixinTime"

export default {
  name: "msgbox",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    enterDetail() {
      this.$router.push({name: 'message/detail', query: {id: this.message.id}})
    }
  },
 // mixins: [formatTime]
};
// https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563944454261&di=5b5d2c8cbe391b9f000eea321721ad49&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F161122%2F330846-161122230S845.jpg
</script>

<style lang="scss" scoped>
.message-box {
  width: 910px;
  height: 140px;
  border: 1px solid #ddd;
  padding: 3px 0 0.6% 0.6%;
  font-family: Source Han Sans CN;

  .photo {
    width: 220px;
    height: 140px;
    float: left;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  }

  .title-box {
    width: 650px;
    height: 20px;
    margin-left: 30px;
    line-height: 20px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
  .content {
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
    width: 650px;
    height: 80px;
    margin-top: 5px;
    margin-left: 30px;
    line-height: 25px;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-indent: 2em;
    float: left;
  }
  .title {
    cursor: pointer;
  }
  .title:hover {
    color: rgb(121, 187, 255);
  }
  .time {
    width: auto;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    margin-right: 30px;
    color: #ccc;
    float: right;
  }
}
</style>

