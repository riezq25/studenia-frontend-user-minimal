export default [
  {
    path: '/transaksi/keranjang',
    name: 'transaksi/keranjang',
    component: () => import('@/views/menu/transaksi/keranjang/Index.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/transaksi/invoice',
    name: 'transaksi/invoice',
    component: () => import('@/views/menu/transaksi/invoice/Index.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/transaksi/invoice/:id',
    name: 'transaksi/invoice-detail',
    component: () => import('@/views/menu/transaksi/invoice/Detail.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
]
