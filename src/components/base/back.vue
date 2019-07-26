<template>
    <img src="@/assets/images/back.png" class="back" @click="goBack" title="返回">
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.back {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 6vw;
    cursor: pointer;
}
</style>

