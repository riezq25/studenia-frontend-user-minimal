import HalamanTryout from '@/views/menu/try-out/index.vue'
import HalamanDetailTryout from '@/views/menu/try-out/detail/DetailTryout.vue'
import HalamanAwalTryout from '@/views/menu/try-out/pengerjaan/HalamanAwalPengerjaan.vue'
import HalamanUjianTryout from '@/views/menu/try-out/pengerjaan/UjianPaketTryout.vue'

export default [
  //try out gratis
  // CAMPURAN
  {
    path: '/try-out/:jenis/:kategori',
    name: 'try-out/gratis/campuran',
    component: HalamanTryout,
  },
  {
    path: '/try-out/gratis/pengerjaan',
    name: 'try-out/gratis/pengerjaan',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  },

  // SAINTEK

  {
    path: '/try-out/gratis/saintek',
    name: 'try-out/gratis/saintek',
    component: HalamanTryout,
  },

  {
    path: '/try-out/gratis/pengerjaan',
    name: 'try-out/gratis/pengerjaan',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  },

  // SOSHUM

  {
    path: '/try-out/gratis/soshum',
    name: 'try-out/gratis/soshum',
    component: HalamanTryout,
  },

  {
    path: '/try-out/gratis/pengerjaan',
    name: 'try-out/gratis/pengerjaan',
    component: () =>
      import('@/views/menu/try-out/try-out-gratis/pengerjaan/Pengerjaan.vue'),
  },

  {
    path: '/try-out/:jenis/:kategori/detail/:id',
    name: 'detail-paket-tryout',
    component: HalamanDetailTryout,
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan',
    name: 'start-paket-tryout',
    component: HalamanAwalTryout,
  },
  {
    path: '/try-out/:jenis/:kategori/start/:id/:id_pengerjaan/:index_paket_kategori/:index_paket_mapel',
    name: 'ujian-paket-tryout',
    component: HalamanUjianTryout,
  },

  //try out premium
  {
    path: '/try-out/premium/campuran',
    name: 'try-out/premium/campuran',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },
  {
    path: '/try-out/premium/saintek',
    name: 'try-out/premium/saintek',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },
  {
    path: '/try-out/premium/soshum',
    name: 'try-out/premium/soshum',
    component: () =>
      import(
        '@/views/menu/try-out/try-out-premium/cooming-soon/cooming-soon.vue'
      ),
  },

  //Selesai
  {
    path: '/try-out/selesai',
    name: 'try-out/selesai',
    component: () => import('@/views/menu/try-out/finish/Finish.vue'),
  },
]
