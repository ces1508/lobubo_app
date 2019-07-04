import axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import { getItem, removeItem, Save } from '../utils/libs'

axios.defaults.headers.common['X-Device-ID'] = DeviceInfo.getUniqueID()

axios.interceptors.request.use(async (config) => {
  let customHeaders = {}
  let token = await getItem('token')
  if (token) customHeaders['Authorization'] = `Bearer ${token}`
  config.headers = { ...config.headers, ...customHeaders, 'Accept-Language': 'es' }
  return config
})

// in each request verify if server send a new token, if did send, update the token from redux, and asyncstorage

axios.interceptors.response.use(async response => {
  let { data } = response
  if (Object.prototype.hasOwnProperty.call(data, 'meta')) {
    if (data.meta.authentication_token) {
      await Save('token', data.meta.authentication_token)
      // store.dispatch(setUserToken(data.meta.authentication_token))
    }
  }
  return response
}, async err => {
  if (err.response.status === 401) {
    await removeItem('token')
  }
  return Promise.reject(err)
})
class Api {
  async makeRequest (url, method = 'GET', data = {}, params = {}, headers = {}) {
    try {
      let request = await axios({
        url,
        method,
        data,
        params,
        headers
      })
      console.log(request)
      return { data: request.data }
    } catch (e) {
      console.log(e.response)
      return { error: e.message, data: e.response.data }
    }
  }
  getProducts (params) {
    return this.makeRequest('https://lobubo.com/api/app/products/find_all', 'GET', null, params)
  }
  getServices (params) {
    return this.makeRequest('https://lobubo.com/api/app/services/find_all', 'GET', null, params)
  }
  getProductsCarousel (params) {
    return this.makeRequest('https://lobubo.com/api/app/locations/find_location_products', 'GET', null, params)
  }
  signIn (data) {
    let parseBody = {
      data: {
        attributes: {
          ...data
        }
      }
    }
    return this.makeRequest('https://lobubo.com/api/users/sign_in', 'POST', parseBody)
  }
  makeFavorite (path, id) {
    return this.makeRequest(`https://lobubo.com/api/app/${path}/${id}/add_to_favorites`, 'POST')
  }
  removeFavorite (path, id) {
    return this.makeRequest(`https://lobubo.com/api/app/${path}/${id}/remove_from_favorites`, 'POST')
  }
}

export default new Api()
