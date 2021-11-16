import Request from '../Clients/AxiosReq'
const resource = '/api/v1/auth'

export default {
  login(payload) {
    return Request.post(`${resource}/login`, payload)
  },
  signup(payload) {
    return Request.post(`${resource}/register`, payload)
  },
  logout() {
    return Request.post(`${resource}/logout`)
  },
  user() {
    return Request.get(`${resource}/user`)
  },
}
