import axios from 'axios'

class Api {
  async makeRequest (url, method = 'GET', body = {}, params = {}, headers = {}) {
    try {
      let request = await axios({
        url,
        method,
        body,
        params,
        headers
      })
      if (request.status === 401 || request.status === 413) {
        // here login when user no is valid o not are authenticate
      }
      console.log(request)
      return { data: request.data }
    } catch (e) {
      return { error: e.message }
    }
  }
  async getProducts (params) {
    let products = await this.makeRequest('https://lobubo.com/api/app/products/find_all', 'GET', null, params)
    return products.data.data
  }
  async getServices (params) {
    let services = await this.makeRequest('https://lobubo.com/api/app/services/find_all', 'GET', null, params)
    return services.data.data
  }
  getProductsCarousel (params) {
    return this.makeRequest('https://lobubo.com/api/app/locations/find_location_products', 'GET', null, params)
  }
}

export default new Api()
