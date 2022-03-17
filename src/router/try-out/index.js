import HalamanTryout from '@/views/menu/try-out/index.vue'
import HalamanDetailTryout from '@/views/menu/try-out/detail/DetailTryout.vue'
import HalamanAwalTryout from '@/views/menu/try-out/pengerjaan/HalamanAwalPengerjaan.vue'
import HalamanUjianTryout from '@/views/menu/try-out/pengerjaan/UjianPaketTryout.vue'

// import { useRouter } from '@core/utils/utils'
// const { route } = useRouter()

export default [
  //TRY OUT GRATIS
  // CAMPURAN
  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-gratis-campuran',
    component: HalamanTryout,
   
  },

  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-gratis-saintek',
    component: HalamanTryout,
   
  },

  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-gratis-soshum',
    component: HalamanTryout,
   
  },

  //TRY OUT PREMIUM
  // CAMPURAN
  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-premium-campuran',
    component: HalamanTryout,
   
  },

  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-premium-saintek',
    component: HalamanTryout,
   
  },

  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out-premium-soshum',
    component: HalamanTryout,
   
  },

  // Halaman Hasil

  {
    path: '/try-out/:jenis/:kategori/:id_tryout/hasil',
    name: 'try-out/hasil',
    component: () => import('@/views/menu/hasil/Pembahasan.vue'),
    meta: {
      notRequiredWA : true
    },
  },

  {
    path: '/try-out/:jenis/:kategori/detail/:id',
    name: 'detail-paket-tryout',
    component: HalamanDetailTryout,
    meta: {
      notRequiredWA : true
    },
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan',
    name: 'start-paket-tryout',
    component: HalamanAwalTryout,
    meta: {
      notRequiredWA : true
    },
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan/:index_paket_kategori/:index_paket_mapel',
    name: 'ujian-paket-tryout',
    component: HalamanUjianTryout,
    meta: {
      notRequiredWA : true
    },
  },

  //Selesai
  {
    path: '/try-out/selesai',
    name: 'try-out/selesai',
    component: () => import('@/views/menu/try-out/finish/Finish.vue'),
    meta: {
      notRequiredWA : true
    },
  },

  // history
  {
    path: '/history/tryout/:id_paket_tryout',
    name: 'halaman-history-tryout',
    meta: {
      pageTitle: 'Riwayat',
      breadcrumb: [
        {
          text: 'Tryout',
          active: true,
        },
        {
          text: 'Riwayat',
          active: true,
        },
      ],
      notRequiredWA : true
    },
    component: () => import('@/views/menu/try-out/history/HalamanHistoryTryout.vue'),
  },

  // Review
  {
    path: '/review/tryout/:id_pengerjaan',
    name: 'halaman-awal-review-tryout',
    meta: {
      pageTitle: 'Review',
      breadcrumb: [
        {
          text: 'Tryout',
          active: true,
        },
        {
          text: 'Review',
          active: true,
        },
      ],
      notRequiredWA : true
    },
    component: () => import('@/views/menu/try-out/review/HalamanAwalReviewTryout.vue'),
  },

  {
    path: '/review/tryout/:id_pengerjaan/:index_paket_kategori/:index_paket_mapel',
    name: 'halaman-review-tryout',
    meta: {
      pageTitle: 'Pembahasan',
      breadcrumb: [
        {
          text: 'Tryout',
          active: true,
        },
        {
          text: 'Review',
          active: true,
        },
        {
          text: 'Pembahasan',
          active: true,
        },
      ],
      notRequiredWA : true
    },
    component: () => import('@/views/menu/try-out/review/HalamanReviewTryout.vue'),
  },

  // Hasil
  {
    path: '/review/tryout/hasil/:id_pengerjaan',
    name: 'halaman-hasil-tryout',
    meta: {
      pageTitle: 'Pembahasan',
      breadcrumb: [
        {
          text: 'Tryout',
          active: true,
        },
        {
          text: 'Review',
          active: true,
        },
        {
          text: 'Hasil',
          active: true,
        },
      ],
      notRequiredWA : true
    },
    component: () => import('@/views/menu/try-out/hasil/Pembahasan.vue'),
  },

  // Hasil Rasionalisasi
  {
    path: '/review/tryout/hasil/:id_pengerjaan/rasionalisasi/:id_rasionalisasi',
    name: 'halaman-rasionalisasi',
    meta: {
      pageTitle: 'Pembahasan',
      breadcrumb: [
        {
          text: 'Tryout',
          active: true,
        },
        {
          text: 'Review',
          active: true,
        },
        {
          text: 'Hasil',
          active: true,
        },
      ],
      notRequiredWA : true
    },
    component: () => import('@/views/menu/try-out/hasil/Rasionalisasi.vue'),
  },
]
