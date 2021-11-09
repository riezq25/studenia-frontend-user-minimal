export default [
  {
    path: '/admin/manajemen-try-out/gratis/campuran',
    name: 'admin/manajemen-try-out/gratis/campuran',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-gratis/to-campuran/Todo.vue'
      ),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
  {
    path: '/admin/manajemen-try-out/gratis/saintek',
    name: 'admin/manajemen-try-out/gratis/saintek',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-gratis/to-campuran/Todo.vue'
      ),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
  {
    path: '/admin/manajemen-try-out/gratis/soshum',
    name: 'admin/manajemen-try-out/gratis/soshum',
    component: () =>
      import(
        '@/views/admin/manajemen-try-out/try-out-gratis/to-campuran/Todo.vue'
      ),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
]
