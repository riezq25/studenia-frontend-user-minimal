import Client from './Clients/AxiosClient'
const resource = '/api/indonesia/provinsi/kota'

export default {
  get(province_id) {
    return Client.get(`${resource}/${province_id}`)
  },
}
