import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datas: JSON.parse(localStorage.getItem("datas")) || [],
    favDatas: JSON.parse(localStorage.getItem("favDatas")) || [],
  },
  getters: {
    getNextId(state) {
      return Object.keys(state.datas).length++ || 0;
    },
  },
  mutations: {
    addData(state, data) {
      state.datas.push(data);
    },

    addFavData(state, favData) {
      state.favDatas.push(favData);
    },

    deleteAllData(state) {
      state.datas = [];
      state.favDatas = [];
    },

    deleteDataById(state, id) {
      state.datas = state.datas.filter((item) => {
        return item.id !== id;
      });
    },

    deleteFavDataById(state, favId) {
      state.favDatas = state.favDatas.filter((item) => {
        return item.id !== favId;
      });
    },
  },
  actions: {
    add({ commit, state, getters }, data) {
      data.id = getters.getNextId;
      commit("addData", data);
      localStorage.setItem("datas", JSON.stringify(state.datas));
    },

    deleteData({ commit, state }, id) {
      commit("deleteDataById", id);
      localStorage.setItem("datas", JSON.stringify(state.datas));
    },

    addFav({ commit, state }, favId) {
      const favData = state.datas.filter((item) => {
        return item.id === favId;
      });
      const isFavDataExist = state.favDatas.some((item) => item.id === favId);
      if (!isFavDataExist) commit("addFavData", favData[0]);
      localStorage.setItem("favDatas", JSON.stringify(state.favDatas));
    },

    deleteFavData({ commit, state }, favId) {
      commit("deleteFavDataById", favId);
      localStorage.setItem("favDatas", JSON.stringify(state.favDatas));
    },

    update({ commit, state }, data) {
      commit("deleteDataById", data.id);
      commit("addData", data);
      localStorage.setItem("datas", JSON.stringify(state.datas));
    },
  },
  modules: {},
});
