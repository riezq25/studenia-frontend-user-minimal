import axios from 'axios'

// const baseDomain = "http://api.studenia.test";
const baseDomain = 'https://api.studenia.dosendeso.com/'
const baseURL = `${baseDomain}` // Incase of /api/v1;

// ALL DEFUALT CONFIGURATION HERE

const ajax = axios.create({
  baseURL,
})

ajax.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default ajax
