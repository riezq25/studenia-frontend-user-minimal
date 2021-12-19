export default [
  {
    path: '/kelas-online/video-belajar',
    name: 'kelas-online/video-belajar',
    component: () => import('@/views/menu/kelas-online/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/kelas-online/kelas-live',
    name: 'kelas-online/kelas-live',
    component: () => import('@/views/menu/kelas-online/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
