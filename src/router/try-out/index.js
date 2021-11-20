export default [
  //try out gratis
  {
    path: '/try-out/gratis/:jenis',
    name: 'try-out/gratis',
    component: () => import('@/views/menu/try-out/try-out-gratis/index.vue'),
  },
  {
    path: '/try-out/gratis/campuran/detail-try-out',
    name: 'try-out/gratis/campuran/detail-try-out',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/detail-try-out.vue'),
  },
  {
    path: '/try-out/gratis/campuran/detail',
    name: 'try-out/gratis/campuran/detail',
    component: () => import('@/views/menu/try-out/try-out-gratis/detail.vue'),
  },
  {
    path: '/try-out/gratis/pengerjaan-beta',
    name: 'try-out/gratis/pengerjaan-beta',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/pengerjaan/InvoiceEdit.vue'),
  },
  {
    path: '/try-out/gratis/pengerjaan',
    name: 'try-out/gratis/pengerjaan',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  },

  //try out premium
  {
    path: '/try-out/premium/campuran',
    name: 'try-out/premium/campuran',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },
  {
    path: '/try-out/premium/saintek',
    name: 'try-out/premium/saintek',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },
  {
    path: '/try-out/premium/soshum',
    name: 'try-out/premium/soshum',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },
]
