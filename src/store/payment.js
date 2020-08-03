
export default {
    namespaced: true,
    // state
    state: {
      totalForPay: 0
    },
  
    // getters
    getters: {
        totalForPay: state => state.totalForPay
    },
  
    // mutations
    mutations: {
      SET_TOTAL (state, totalForPay) {
        state.totalForPay = totalForPay
      }
    },
  
    // actions
    actions: {
      savetotalForPay ({ commit }, { totalForPay}) {
        commit('SET_TOTAL', totalForPay)
      }
    }
  }
  