export default [
  {
    header: 'Try Out',
  },
  {
    title: 'Try Out Gratis',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'TO Campuran',
        route: {
          name: 'try-out-gratis-campuran',
          params: { jenis: 'gratis', kategori: 'campuran' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
      {
        title: 'TO Saintek',
        route: {
          name: 'try-out-gratis-saintek',
          params: { jenis: 'gratis', kategori: 'saintek' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
      {
        title: 'TO Soshum',
        route: {
          name: 'try-out-gratis-soshum',
          params: { jenis: 'gratis', kategori: 'soshum' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
    ],
  },
  {
    title: 'Try Out Premium',
    icon: 'FilePlusIcon',
    children: [
      {
        title: 'TO Campuran',
        route: {
          name: 'try-out-premium-campuran',
          params: { jenis: 'premium', kategori: 'campuran' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
      {
        title: 'TO Saintek',
        route: {
          name: 'try-out-premium-saintek',
          params: { jenis: 'premium', kategori: 'saintek' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
      {
        title: 'TO Soshum',
        route: {
          name: 'try-out-premium-soshum',
          params: { jenis: 'premium', kategori: 'soshum' },
        },
        icon: 'Edit3Icon',
        meta: {
          pageTitle: 'Basir'
        },
      },
    ],
  },
]
