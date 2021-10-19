import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import cart from './modules/cart.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appConfig: appConfigStoreModule,
    app,
    cart,
  },
})
