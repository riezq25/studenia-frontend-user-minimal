import Client from './Clients/AxiosClient'
const resource = '/api/v1/kampus'

export default {
  getKampus() {
    return Client.get(`${resource}`)
  },

  getJurusan(id_kampus) {
    return Client.get(`${resource}/${id_kampus}`)
  },

  getDayaTampung(id_kampus, id_jurusan) {
    return Client.get(`${resource}/${id_kampus}/jurusan/${id_jurusan}`)
  },
}
