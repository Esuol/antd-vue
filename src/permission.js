import router from './router'
import { getToken, setToken } from './utils/token'
import getUrlKey from './utils/getUrlKey'

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  // 添加带token信息登录模式
  if (to.path === '/statistics/index') {
    if (!getToken()) setToken(getUrlKey('token'))
    next()
  }
  if (getToken()) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
