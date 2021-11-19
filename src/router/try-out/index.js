export default [
  //try out gratis

  {
    path: '/user/try-out/gratis/campuran',
    name: 'user/try-out/gratis',
    component: () => import('@/views/try-out/try-out-gratis/index.vue'),
  },
  {
    path: '/user/try-out/gratis/campuran/detail-try-out',
    name: 'user/try-out/gratis/campuran/detail-try-out',
    component: () =>
      import('@/views/try-out/try-out-gratis/detail-try-out.vue'),
  },
  {
    path: '/user/try-out/gratis/campuran/detail',
    name: 'user/try-out/gratis/campuran/detail',
    component: () => import('@/views/try-out/try-out-gratis/detail.vue'),
  },
  {
    path: '/user/try-out/gratis/pengerjaan-beta',
    name: 'user/try-out/gratis/pengerjaan-beta',
    component: () =>
      import('@/views/try-out/try-out-gratis/pengerjaan/InvoiceEdit.vue'),
  },
  {
    path: '/user/try-out/gratis/pengerjaan',
    name: 'user/try-out/gratis/pengerjaan',
    component: () =>
      import('@/views/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  },
]
