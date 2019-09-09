<template>
  <div>
    <el-table :data="userData">
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-tag type="success">{{ characterList[scope.row.role] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="180">
          <template slot-scope="scope">
              <el-select v-model="scope.row.role">
                  <el-option 
                   v-for="(item, i) in roleList"
                   :key="i"
                   :value="item">
                   </el-option>
              </el-select>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="submit(scope.row)" plain>更新</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, updateRole } from "@/api/manage"

export default {
  data() {
    return {
      characterList: {
        'B': "管理员",
        'C':　"普通用户"
      },
      roleList: ["B","C"],
      userData: [{name: "暂无数据"}]
    };
  },
  methods: {
    init() {
      getUserList().then(res => {
        if(res.data.code === 200) {
          this.userData = res.data.data
        }
      })
    },
    submit(data) {
      let obj = Object.assign({character: this.characterList[data.role]}, data)
      updateRole(obj).then(res => {
        if(res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
        } else {
          this.$message.error(res.data.data)
        }
      })
    }
  },
  created() {
    if (this.$store.getters.role != "A") this.$router.push({ name: "index" });
    this.init()
  }
};
</script>

<style lang="scss" scoped>
</style>