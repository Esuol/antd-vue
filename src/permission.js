import router from './router'
import { getToken, setToken } from './utils/token'
import getUrlKey from './utils/getUrlKey'
import store from './store'

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  // 添加带token信息登录模式
  if (to.path === '/Dashboard/index') {
    if (!getToken()) setToken(getUrlKey('token'))
    next()
  }
  if (getToken()) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      await store.dispatch('user/logout')
      // next({ path: '/login' })
      next()
    }
  }
})
