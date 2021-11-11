export default [
  {
    path: '/admin/tryout/gratis/saintek',
    name: 'manajementryout',
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
      import(
        '@/views/admin/manajemen-try-out/try-out-premium/to-campuran/index.vue'
      ),
  }

]
