import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import authRoute from '@/router/auth/index'
import tryOutRoute from '@/router/try-out'
import drillingSoalRoute from '@/router/drilling-soal'
import kelasOnlineRoute from '@/router/kelas-online'
import materiRoute from '@/router/materi'
import kontribusiPengguna from '@/router/kontribusi-pengguna'
import othersRoute from '@/router/others'

import repository from "@repofactory";
const authRepo = repository.get("auth");

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
      component: () => import('@/views/menu/dashboard/Ecommerce.vue'),
      meta: {
        pageTitle: 'Dashboard',
      },
    },
    ...authRoute,
    ...tryOutRoute,
    ...drillingSoalRoute,
    ...kelasOnlineRoute,
    ...materiRoute,
    ...kontribusiPengguna,
    ...othersRoute,
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

router.beforeEach(async (to, from, next) => {
  const isLogin = store.state.auth.isLogin
  const user = store.state.auth.user
  const permissions = user ? user.permissions : null

  if (!isLogin && localStorage.getItem('token')) {
    authRepo.user()
      .then((response) => {
        store.state.auth.isLogin = true;
        store.state.auth.token = localStorage.getItem('token')
        store.state.auth.user = response.data.user;
        store.state.auth.permissions = response.data.user.permissions;

        if (to.name != 'login') {
          next(to.path)
        }
      })

  }

  console.log('from', from)
  console.log('to', to)

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
