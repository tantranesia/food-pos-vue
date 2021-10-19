import { getField, updateField } from 'vuex-map-fields'

const cart = {
  state: {
    cartItems: [],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    setCartItems(state, payload) {
      state.cartItems = payload
    },
    setAddCartItem(state, payload) {
      state.cartItems.push(payload)
    },

  },
  actions: {

    addCartItem(context, payload) {
      context.commit('setAddCartItem', payload)
    },

  },
  namespaced: true,
}

export default cart
