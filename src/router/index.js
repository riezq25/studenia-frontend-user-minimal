import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import authRoute from '@/router/auth/index'
import usersRoute from '@/router/users/index'
import manajemenSoal from '@/router/bank-soal/index'
import accessControl from '@/router/access-control'
import paketTryout from '@/router/manajemen-try-out'

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
      name: 'home',
      component: () => import('@/views/dashboard/Home.vue'),
      meta: {
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    ...authRoute,
    ...usersRoute,
    ...manajemenSoal,
    ...accessControl,
    ...paketTryout,
    // {
    //   path: '/reg',
    //   name: 'reg',
    //   component: () => import('@/views/auth/Register.vue'),
    //   meta: {
    //     layout: 'full',
    //   },
    // },
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

router.beforeEach((to, _, next) => {
  const isLogin = store.state.auth.isLogin
  const user = store.state.auth.user
  const permissions = user ? user.permissions : null

  if (to.path == '/register') {
    next()
  }

  // if (to.path == '/login' && isLogin) {
  //   next('/')
  // }

  // if (to.path != '/login' && (!isLogin || !permissions)) {
  //   next('/login')
  // }

  next()
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
