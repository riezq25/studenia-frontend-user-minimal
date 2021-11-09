import manajemenSoal from './manajemen-soal.js'
import kategori from './kategori.js'
import manajemenPaket from './manajemen-paket.js'

const bankSoal = [...manajemenPaket, ...kategori, ...manajemenSoal]

export default bankSoal
