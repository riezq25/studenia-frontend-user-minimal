import userRepository from './UserRepository'
import auth from './auth'
import kategoriSoalRepository from './KategoriSoalRepository'
import kategoriTryoutRepository from './KategoriTryoutRepository'
import paketTryoutRepository from './PaketTryoutRepository'
import soalRepository from './SoalRepository'
import mapelRepository from './MapelRepository'
import paketMapelRepository from './PaketMapelRepository'
import tryoutRepository from './TryoutRepository'
import pengerjaanTryoutRepository from './PengerjaanTryoutRepository'
import HasilTryOutRepository from './HasilTryOutRepository'
import KampusJurusanRepository from './KampusJurusanRepository'

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
  tryoutRepository,
  pengerjaanTryoutRepository,
  HasilTryOutRepository,
  KampusJurusanRepository,
}
export default {
  get: (name) => repositories[name],
}
