import Client from './Clients/AxiosClient'
const resource = '/api/v1/user/cart'

export default {
  get() {
    return Client.get(`${resource}`)
  },
  show(id) {
    return Client.get(`${resource}/${id}`)
  },
  create(payload) {
    return Client.post(`${resource}`, payload)
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`)
  },
}
