export default [
  {
    path: '/manajemen-paket',
    name: 'manajemen-paket',
    meta: {
      pageTitle: "Manajemen Paket",
      breadcrumb: [
        {
          text: "Bank Soal",
          active: true
        },
        {
          text: "Manajemen Paket",
          active: true
        },
      ],
    },
    component: () => import('@/views/dashboard/bank-soal/paket-mapel/index.vue'),
  },
]
