export default {
  namespaced: true,
  state: {
    ajaxState: 0,
    currentRouter: '/',
    ifAjax: false
  },
  mutations: {
    update (state, data) {
      if (Object.keys(data)[0] === 'ajaxState') {
        if (data.ajaxState === 0) {
          state.ajaxState = 0
        } else {
          state.ajaxState += data.ajaxState
        }
      } else {
        Object.assign(state, data)
      }
    }
  }
}
