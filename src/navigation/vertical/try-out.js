export default [
  {
    header: 'Try Out',
  },
  {
    title: 'Try Out Gratis',
    icon: 'MenuIcon',
    children: [
      {
        title: 'TO Campuran',
        // route: 'user/try-out/gratis/pengerjaan',
        route: {
          name: 'user/try-out/gratis',
          params: { jenis: 'campuran' },
        },
      },
      {
        title: 'TO Saintek',
        route: {
          name: 'user/try-out/gratis/saintek',
          params: { jenis: 'saintek' },
        },
      },
      {
        title: 'TO Soshum',
        route: 'admin/manajemen-try-out/gratis/soshum',
      },
    ],
  },
  {
    title: 'Try Out Premium',
    icon: 'MenuIcon',
    children: [
      {
        title: 'TO Campuran',
        route: 'admin/manajemen-try-out/premium/campuran',
        // params: { id },
        // route: {
        //   name: 'admin/manajemen-try-out/premium/:campuran',
        //   params: { campuran },
        // },
        // <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
      },
      {
        title: 'TO Saintek',
        route: 'admin/manajemen-try-out/premium/saintek',
      },
      {
        title: 'TO Soshum',
        route: 'admin/manajemen-try-out/premium/soshum',
      },
    ],
  },
]
