export default [
  {
    path: '/pembahasan/try-out',
    name: 'pembahasan/try-out',
    component: () => import('@/views/menu/hasil/Pembahasan.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
