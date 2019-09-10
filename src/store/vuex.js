import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const state = {
  userInfo: {
    name: "*",
    sex: "*",
    work: "*",
    email: "*",
    weixin: "*",
    qq: "*",
    weibo: "*",
    imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563879232997&di=5f5a4d7fac3a8bb63f9c3aa141a1178c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"
  },
  role: "C"
};
const getters = {
  userInfo(state) {
    return state.userInfo;
  },
  role(state) {
    return state.role;
  }
};

const mutations = {
  setUserInfo(state, data) {
    state.userInfo.name = data.name
    state.userInfo.sex = data.sex==""?"未知":data.sex
    state.userInfo.work = data.work == ""?"未填写":data.work
    state.userInfo.email = data.email
    state.userInfo.weixin = data.weixin == ""?"未填写":data.weixin
    state.userInfo.qq = data.qq == ""?"未填写":data.qq
    state.userInfo.weibo = data.weibo == ""?"未填写":data.weibo
    state.userInfo.imgSrc = data.imgSrc
  },
  clearUserInfo(state) {
    state.userInfo = {
      name: "*",
      sex: "*",
      work: "*",
      email: "*",
      weixin: "*",
      qq: "*",
      weibo: "*",
      imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563879232997&di=5f5a4d7fac3a8bb63f9c3aa141a1178c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"
    }
  },
  setRole(state, data) {
    state.role = data
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
});

export default store
