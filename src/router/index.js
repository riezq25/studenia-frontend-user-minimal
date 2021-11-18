import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import authRoute from '@/router/auth/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Ecommerce.vue'),
      meta: {
        pageTitle: 'Dashboard',
      },
    },
    ...authRoute,
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLogin = store.state.auth.isLogin
  const user = store.state.auth.user
  const permissions = user ? user.permissions : null

  console.log('from', from.path)
  console.log('to', to.path)

  if (to.path !== '/login' && !isLogin) next({ name: 'login' })
  else next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
