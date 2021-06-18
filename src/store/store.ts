import { createStore } from 'vuex'
import { RouteLocationNormalized } from 'vue-router'
import { Affiliate } from '../services/api/services/affiliate.service'

export default createStore({
  state: {
    affiliate: null as null | Affiliate,
    continueToRoute: null as null | RouteLocationNormalized,
  },
  mutations: {
    setAffiliate(state, value) {
      state.affiliate = value
    },
    setContinueToRoute(state, value) {
      state.continueToRoute = value
    },
  },
})
