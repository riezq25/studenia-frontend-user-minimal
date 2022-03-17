import Client from './Clients/AxiosClient'
const resource = '/api/v1/payment'

export default {
  channels() {
    return Client.get(`${resource}/channels`)
  },
  reference(kode_reference) {
    return Client.get(`${resource}/detail/${kode_reference}`)
  },
  hitung(payload) {
    return Client.post(`${resource}/hitung`, payload)
  },
  bayar(payload) {
    return Client.post(`${resource}/bayar`, payload)
  },
}
