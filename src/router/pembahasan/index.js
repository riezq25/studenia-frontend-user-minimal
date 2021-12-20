export default [
  {
    path: '/pembahasan/try-out',
    name: 'pembahasan/try-out',
    component: () => import('@/views/menu/try-out/hasil/Pembahasan.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
