export default [
  {
    path: '/bank-soal',
    name: 'bank-soal',
    meta: {
      pageTitle: "Bank Soal",
      breadcrumb: [
        {
          text: "Bank Soal",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/bank-soal/manajemen-soal/bank-soal/index.vue'),
  },

]
