import userRepository from './UserRepository';
import auth from './auth';
import kategoriSoalRepository from './KategoriSoalRepository';
import kategoriTryoutRepository from './KategoriTryoutRepository';
import paketTryoutRepository from './PaketTryoutRepository';
import soalRepository from './SoalRepository';
import mapelRepository from './MapelRepository';
import paketMapelRepository from './PaketMapelRepository';

const repositories = {
    userRepository,
    auth,
    kategoriSoalRepository,
    soalRepository,
    mapelRepository,
    paketMapelRepository,
    kategoriTryoutRepository,
    paketTryoutRepository

}
export default {
    get: name => repositories[name],
};