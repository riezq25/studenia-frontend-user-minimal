export default [
  {
    path: '/tryout/gratis/saintek',
    name: 'to-gratis-saintek',
    meta: {
      tryout: {
        kategori: 'saintek',
        jenis: 'gratis'
      },
      pageTitle: "Saintek",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Gratis",
          active: true
        },
        {
          text: "Saintek",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },
  {
    path: '/tryout/gratis/soshum',
    name: 'to-gratis-soshum',
    meta: {
      tryout: {
        kategori: 'soshum',
        jenis: 'gratis'
      },
      pageTitle: "Soshum",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Gratis",
          active: true
        },
        {
          text: "Soshum",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },
  {
    path: '/tryout/gratis/campuran',
    name: 'to-gratis-campuran',
    meta: {
      tryout: {
        kategori: 'campuran',
        jenis: 'gratis'
      },
      pageTitle: "Campuran",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Gratis",
          active: true
        },
        {
          text: "Campuran",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },

  {
    path: '/tryout/premium/campuran',
    name: 'to-premium-campuran',
    meta: {
      tryout: {
        kategori: 'campuran',
        jenis: 'premium'
      },
      pageTitle: "Campuran",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Premium",
          active: true
        },
        {
          text: "Campuran",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },
  {
    path: '/tryout/premium/soshum',
    name: 'to-premium-soshum',
    meta: {
      tryout: {
        kategori: 'soshum',
        jenis: 'premium'
      },
      pageTitle: "Soshum",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Premium",
          active: true
        },
        {
          text: "Soshum",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },
  {
    path: '/tryout/premium/saintek',
    name: 'to-premium-saintek',
    meta: {
      tryout: {
        kategori: 'saintek',
        jenis: 'premium'
      },
      pageTitle: "Saintek",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Premium",
          active: true
        },
        {
          text: "Saintek",
          active: true
        },
      ],
    },
    component: () =>
      import('@/views/dashboard/manajemen-try-out/index.vue'),
  },
]
