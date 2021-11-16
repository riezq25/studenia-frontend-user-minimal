import Client from './Clients/AxiosClient'
const resource = '/api/indonesia/kota/kecamatan'

export default {
  get(kota_id) {
    return Client.get(`${resource}/${kota_id}`)
  },
}
