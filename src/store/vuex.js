import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const state = {
  userInfo: {
    name: "*",
    sex: "*",
    work: "*",
    email: "*",
    imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563879232997&di=5f5a4d7fac3a8bb63f9c3aa141a1178c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"
  },
  badge: {
    message: 0,
    note: 0,
    diary: 0
  },
};
const getters = {
  userInfo(state) {
    return state.userInfo;
  },
  badge(state) {
    return state.badge;
  }
};

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  clearUserInfo(state) {
    state.userInfo = {
      name: "*",
      sex: "*",
      work: "*",
      email: "*",
      imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563879232997&di=5f5a4d7fac3a8bb63f9c3aa141a1178c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"
    }
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
});

export default store
