import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import auth from './auth'
import tryout from './tryout'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    appConfig,
    tryout,
    verticalMenu,
  },
  strict: process.env.DEV,
})
