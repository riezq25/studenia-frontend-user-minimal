import HalamanTryout from '@/views/menu/try-out/index.vue'
import HalamanDetailTryout from '@/views/menu/try-out/detail/DetailTryout.vue'
import HalamanAwalTryout from '@/views/menu/try-out/pengerjaan/HalamanAwalPengerjaan.vue'
import HalamanUjianTryout from '@/views/menu/try-out/pengerjaan/UjianPaketTryout.vue'

// import { useRouter } from '@core/utils/utils'
// const { route } = useRouter()

export default [
  //try out gratis
  // CAMPURAN
  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out/gratis/campuran',
    component: HalamanTryout,
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },

  // Halaman Hasil

  {
    path: '/try-out/:jenis/:kategori/:id_tryout/hasil',
    name: 'try-out/hasil',
    component: () => import('@/views/menu/hasil/Pembahasan.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },

  // {
  //   path: '/try-out/gratis/pengerjaan',
  //   name: 'try-out/gratis/pengerjaan',
  //   component: () => import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  // SAINTEK

  // {
  //   path: '/try-out/gratis/saintek',
  //   name: 'try-out/gratis/saintek',
  //   component: HalamanTryout,
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  // {
  //   path: '/try-out/gratis/pengerjaan',
  //   name: 'try-out/gratis/pengerjaan',
  //   component: () => import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  // SOSHUM

  // {
  //   path: '/try-out/gratis/soshum',
  //   name: 'try-out/gratis/soshum',
  //   component: HalamanTryout,
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  // {
  //   path: '/try-out/gratis/pengerjaan',
  //   name: 'try-out/gratis/pengerjaan',
  //   component: () => import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  {
    path: '/try-out/:jenis/:kategori/detail/:id',
    name: 'detail-paket-tryout',
    component: HalamanDetailTryout,
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan',
    name: 'start-paket-tryout',
    component: HalamanAwalTryout,
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan/:index_paket_kategori/:index_paket_mapel',
    name: 'ujian-paket-tryout',
    component: HalamanUjianTryout,
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },

  //try out premium
  // {
  //   path: '/try-out/premium/campuran',
  //   name: 'try-out/premium/campuran',
  //   component: () => import('@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },
  // {
  //   path: '/try-out/premium/saintek',
  //   name: 'try-out/premium/saintek',
  //   component: () => import('@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },
  // {
  //   path: '/try-out/premium/soshum',
  //   name: 'try-out/premium/soshum',
  //   component: () => import('@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'),
  //   meta: {
  //     pageTitle: '',
  //     requireAuth: true,
  //   },
  // },

  //Selesai
  {
    path: '/try-out/selesai',
    name: 'try-out/selesai',
    component: () => import('@/views/menu/try-out/finish/Finish.vue'),
    meta: {
      pageTitle: '',
      requireAuth: true,
    },
  },

  // history
  {
    path: '/history/tryout/:id_paket_tryout',
    name: 'halaman-history-tryout',
    meta: {
      pageTitle: "Riwayat",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Riwayat",
          active: true
        },
      ],
    },
    component: () => import('@/views/menu/try-out/history/HalamanHistoryTryout.vue'),
  },

  // Review
  {
    path: '/review/tryout/:id_pengerjaan',
    name: 'halaman-awal-review-tryout',
    meta: {
      pageTitle: "Review",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Review",
          active: true
        },
      ],
    },
    component: () => import('@/views/menu/try-out/review/HalamanAwalReviewTryout.vue'),
  },

  {
    path: '/review/tryout/:id_pengerjaan/:index_paket_kategori/:index_paket_mapel',
    name: 'halaman-review-tryout',
    meta: {
      pageTitle: "Pembahasan",
      breadcrumb: [
        {
          text: "Tryout",
          active: true
        },
        {
          text: "Review",
          active: true
        },
        {
          text: "Pembahasan",
          active: true
        },
      ],
    },
    component: () => import('@/views/menu/try-out/review/HalamanReviewTryout.vue'),
  },
]
