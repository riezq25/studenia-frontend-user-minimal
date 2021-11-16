import Client from './Clients/AxiosClient'
const resource = '/api/indonesia/provinsi'

export default {
  get() {
    return Client.get(`${resource}`)
  },
}
