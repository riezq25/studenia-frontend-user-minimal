export default [
  {
    path: '/users',
    name: 'manajemen-users',
    meta: {
      pageTitle: "Manajemen Pengguna",
      breadcrumb: [
        {
          text: "Pengguna",
          active: true,
        },
      ],
    },
    component: () => import('@/views/dashboard/user/users-list/UsersList.vue'),
  },
  {
    path: '/users/:id',
    name: 'manajemen-users-detail',
    meta: {
      pageTitle: "Manajemen Pengguna",
      breadcrumb: [
        {
          text: "Pengguna",
          active: true,
        },
        {
          text: "Detail",
          active: true,
        },
      ],
    },
    component: () => import('@/views/dashboard/user/users-list/detail.vue'),
  },
]
