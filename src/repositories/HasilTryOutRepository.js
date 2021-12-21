import Client from './Clients/AxiosClient'
const resource = '/api/v1/user/hasil-tryout'

// http://backend_server/api/v1/user/hasil-tryout/id_pengerjaan

export default {
  get(id_pengerjaan) {
    return Client.get(`${resource}/${id_pengerjaan}`)
  },
}
