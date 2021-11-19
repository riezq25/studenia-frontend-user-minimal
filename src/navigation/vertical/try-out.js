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
        route: {
          name: 'user/try-out/gratis',
        },
      },
      {
        title: 'TO Saintek',
        route: {
          name: 'user/try-out/gratis/saintek',
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
        route: 'cooming-soon',
      },
      {
        title: 'TO Saintek',
        route: 'cooming-soon',
      },
      {
        title: 'TO Soshum',
        route: 'cooming-soon',
      },
    ],
  },
]
