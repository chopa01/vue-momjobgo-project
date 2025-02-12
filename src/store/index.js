import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    page,
    user
  },
  plugins : [createPersistedState({
    paths : ["user"],
    storage : {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
  })]
})
