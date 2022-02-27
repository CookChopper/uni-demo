import Vue from 'vue'
import Vuex from 'vuex'
import ModuleCart from './cart.js'
import ModuleUser from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    'm_cart': ModuleCart,
    'm_user': ModuleUser
  }
})

export default store