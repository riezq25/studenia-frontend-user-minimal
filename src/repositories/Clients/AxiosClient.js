import axios from 'axios'

// const baseDomain = "http://api.studenia.test";
const baseDomain = 'http://admin.studenia.6digitkode.my.id/'
const baseURL = `${baseDomain}` // Incase of /api/v1;

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

// ALL DEFUALT CONFIGURATION HERE

export default axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
