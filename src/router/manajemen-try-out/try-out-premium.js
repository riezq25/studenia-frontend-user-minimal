export default [
  // Try Out Campuran
  {
    path: '/admin/manajemen-try-out/premium/campuran',
    name: 'admin/manajemen-try-out/premium/campuran',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/index.vue'
      ),
  },
  // {
  //   path: '/admin/manajemen-try-out/premium/campuran:id',
  //   name: 'admin/manajemen-try-out/premium/campuran',
  //   component: () =>
  //     import(
  //       '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/index.vue'
  //     ),
  // },
  {
    path: '/admin/manajemen-try-out/premium/campuran/:id',
    name: 'admin/manajemen-try-out/premium/campuran/to-mapel',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/to-mapel/index.vue'
      ),
  },
  {
    path: '/admin/manajemen-try-out/premium/campuran/:id/:id',
    name: 'admin/manajemen-try-out/premium/campuran/to-mapel/to-soal',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/to-mapel/to-soal/index.vue'
      ),
  },
  // {
  //   path: '/admin/manajemen-try-out/premium/campuran/selanjutnya',
  //   name: 'admin/manajemen-try-out/premium/campuran/selanjutnya',
  //   component: () =>
  //     import(
  //       '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/selanjutnya/UsersList.vue'
  //     ),
  // },
  // {
  //   path: '/admin/manajemen-try-out/premium/saintek',
  //   name: 'admin/manajemen-try-out/premium/saintek',
  //   component: () =>
  //     import(
  //       '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/selanjutnya/UsersList.vue'
  //     ),
  // },
  // {
  //   path: '/admin/manajemen-try-out/premium/soshum',
  //   name: 'admin/manajemen-try-out/premium/soshum',
  //   component: () =>
  //     import(
  //       '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/selanjutnya/UsersList.vue'
  //     ),
  // },
]
