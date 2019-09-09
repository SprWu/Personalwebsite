<template>
    <div class="middle">
        <el-input placeholder="请输入验证名" v-model="name"></el-input><br><br>
        <el-input type="password" placeholder="请输入验证密码" v-model="password"></el-input><br><br>
        <center><el-button type="primary" @click="reg">确定</el-button></center>
    </div>
</template>


<script>
import { regMiddle } from "@/api/manage"

export default {
    data() {
        return {
            name: "",
            password: ""
        }
    },
    methods: {
        reg() {
            if(this.name.trim() == "" || this.password.trim() == "") return
            regMiddle({name: this.name, password: this.password}).then(res => {
                if(res.data.code == "0411") {
                    this.$router.push({name: 'manage/manage'})
                } else {
                    this.$message.error(res.data.data)
                }
            })
        }
    },
    created() {
        if(this.$store.getters.role != 'A') this.$router.push({name: 'index'})
    },
}
</script>

<style lang="scss" scoped>
    .middle {
        width: 500px;
        height: auto;
        margin: 60px auto;
    }
</style>