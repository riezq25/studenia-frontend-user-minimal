export default [
  {
    path: '/materi/ringkasan-materi',
    name: 'materi/ringkasan-materi',
    component: () => import('@/views/menu/materi/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/materi/materi-ebook',
    name: 'materi/materi-ebook',
    component: () => import('@/views/menu/materi/cooming-soon/cooming-soon.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
