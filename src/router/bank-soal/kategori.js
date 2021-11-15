export default [
  {
    path: '/kategori-soal',
    name: 'kategori-soal',
    meta: {
      pageTitle: "Kategori Soal",
      breadcrumb: [
        {
          text: "Kategori",
          active: true
        },
        {
          text: "Kategori Soal",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/bank-soal/kategori/kategori-soal/index.vue'),
  },
  {
    path: '/kategori-tryout',
    name: 'kategori-tryout',
    meta: {
      pageTitle: "Kategori Tryout",
      breadcrumb: [
        {
          text: "Kategori",
          active: true
        },
        {
          text: "Kategori Tryout",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/bank-soal/kategori/kategori-tryout/index.vue'),
  },
  {
    path: '/mata-pelajaran',
    name: 'mata-pelajaran',
    meta: {
      pageTitle: "Mata Pelajaran",
      breadcrumb: [
        {
          text: "Kategori",
          active: true
        },
        {
          text: "Mata Pelajaran",
          active: true
        },
      ],
    },
    component: () => import('@/views/dashboard/bank-soal/kategori/mata-pelajaran'),
  },
]
