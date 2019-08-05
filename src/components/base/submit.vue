<template>
  <img src="@/assets/images/submit.png" title="提交" @click="submit" class="submit" />
</template>

<script>
export default {
  name: "submit",
  methods: {
    submit() {
      this.$confirm("确定编辑完成并且提交？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("clicksub");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.submit {
  z-index: 9999;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 5vw;
  cursor: pointer;
}
</style>
