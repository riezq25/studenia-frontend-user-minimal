import Client from './Clients/AxiosClient'
const resource = '/api/v1/payment/riwayat'

export default {
  get(page) {
    return Client.get(`${resource}?page=${page}`)
  },
  search(payment_method, reference, status) {
    let query_params = ''
    if (payment_method) {
      query_params += 'payment_method=' + payment_method + '&'
    }
    if (reference) {
      query_params += 'reference=' + reference + '&'
    }
    if (status) {
      query_params += 'status=' + status
    }

    return Client.get(`${resource}?${query_params}`)
  },
  show(kode_reference) {
    return Client.get(`/api/v1/payment/detail/${kode_reference}`)
  },
}
