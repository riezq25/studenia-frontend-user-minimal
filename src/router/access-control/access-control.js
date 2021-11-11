export default [
  {
    path: '/acces-control',
    name: 'access-control',
    meta: {
      pageTitle: "Access Control",
      breadcrumb: [
        {
          text: "Access Control",
          active:true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/bank-soal/kategori/kategori-soal/index.vue'),
  },
  
]
