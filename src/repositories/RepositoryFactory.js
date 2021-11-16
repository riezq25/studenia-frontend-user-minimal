import userRepository from './UserRepository'
import auth from './auth'
import kategoriSoalRepository from './KategoriSoalRepository'
import kategoriTryoutRepository from './KategoriTryoutRepository'
import paketTryoutRepository from './PaketTryoutRepository'
import soalRepository from './SoalRepository'
import mapelRepository from './MapelRepository'
import paketMapelRepository from './PaketMapelRepository'

//Daerah
import ProvinsiRepository from './ProvinsiRepository'
import KotaRepository from './KotaRepository'
import KecamatanRepository from './KecamatanRepository'

const repositories = {
  userRepository,
  auth,
  kategoriSoalRepository,
  soalRepository,
  mapelRepository,
  paketMapelRepository,
  kategoriTryoutRepository,
  paketTryoutRepository,
  ProvinsiRepository,
  KotaRepository,
  KecamatanRepository,
}
export default {
  get: (name) => repositories[name],
}
