export default [
  {
    header: 'Bank Soal',
  },
  {
    title: 'Manajemen Soal',
    icon: 'MenuIcon',
    children: [
      {
        title: 'Bank Soal',
        route: 'bank-soal',
      },
      {
        title: 'Laporan Soal',
        route: 'laporan-soal',
      },
    ],
  },
  {
    title: 'Kategori',
    icon: 'MenuIcon',
    children: [
      {
        title: 'Kategori Soal',
        route: 'kategori-soal',
      },
      {
        title: 'Mata Pelajaran',
        route: 'mata-pelajaran',
      },
    ],
  },
  {
    title: 'Manajemen Paket',
    route: 'manajemen-paket',
    icon: 'DropletIcon',
  },
]
