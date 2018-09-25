import Vue from 'vue'
import Vuex from 'vuex'

import sentiment from './sentiment/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    sentiment: sentiment
  }
})
