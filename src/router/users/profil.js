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
]
