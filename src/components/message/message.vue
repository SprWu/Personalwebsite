<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" @click="editMessage" v-if="role" plain circle></el-button>
        <div>
            <msg-box v-for="item in message" :message="item" :key="item.id"></msg-box>
        </div>
    </div>
</template>

<script>
import msgBox from "@/components/component/messageBox"
import { getMessage } from "@/api/message"

export default {
    name: 'message',
    data() {
        return {
            message: [],
            role: ['A','B'].includes(this.$store.getters.role)
        }
    },
    methods: {
        fetchMessage() {
            getMessage().then( res => {
                if(res.data.code === 200) {
                    this.message = res.data.data
                }
            })
        },
        editMessage() {
            this.$router.push({name: 'message/editor', params: 'message'})
        }
    },
    components: {
        msgBox,
    },
    created() {
        this.fetchMessage();
    }
}
</script>

<style lang="scss" scoped>
.el-button {
    position: absolute;
    right: 3vw;
}
.message-box {
    margin: 6px auto;
}
</style>
