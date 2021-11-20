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
          name: 'try-out/gratis/campuran',
        },
      },
      {
        title: 'TO Saintek',
        route: {
          name: 'try-out/gratis/saintek',
        },
      },
      {
        title: 'TO Soshum',
        route: {
          name: 'try-out/gratis/soshum',
        },
      },
    ],
  },
  {
    title: 'Try Out Premium',
    icon: 'MenuIcon',
    children: [
      {
        title: 'TO Campuran',
        route: 'try-out/premium/campuran',
      },
      {
        title: 'TO Saintek',
        route: 'try-out/premium/saintek',
      },
      {
        title: 'TO Soshum',
        route: 'try-out/premium/soshum',
      },
    ],
  },
]
