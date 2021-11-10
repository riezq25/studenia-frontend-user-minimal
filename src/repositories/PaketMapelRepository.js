import Client from './Clients/AxiosClient'
const resource = '/api/v1/paket-mapel'

export default {
  get() {
    return Client.get(`${resource}`)
  },
  show(id) {
    return Client.get(`${resource}/${id}`)
  },
  create(payload) {
    return Client.post(`${resource}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  update(payload, id) {
    return Client.post(`${resource}/${id}?_method=PUT`, payload)
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`)
  },
}
