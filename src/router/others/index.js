export default [
  {
    path: '/others/profile',
    name: 'others/profile',
    component: () => import('@/views/menu/others/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/cooming-soon',
    name: 'cooming-soon',
    component: () => import('@/views/menu/others/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
