import Api from '../api'
import { setManyFavorites } from './favorites'
const GET_CAROUSEL_PRODUCTS = 'GET_CAROUSEL_PRODUCTS'
const GET_PRODUCTS = 'GET_PRODUCTS'
const RESET_PRODUCTS_LIST = 'RESET_PRODUCTS_LIST'
const SET_LOADER = '/products/set/loader'

const initialState = {
  carousel: [], // this array will be rendered in products tab and services tab
  data: [], // products get from server
  isLoading: true // flag to handle loaders
}

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CAROUSEL_PRODUCTS:
      return {
        ...state,
        carousel: [...action.data]
      }
    case GET_PRODUCTS:
      return {
        ...state,
        data: action.products,
        isLoading: false
      }
    case RESET_PRODUCTS_LIST:
      return {
        ...state,
        data: []
      }
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.flag
      }
    default:
      return state
  }
}

// actions

// get products for carousel or slider
export const loadCarouselProducts = (latitude, longitude, radius = 1000) => {
  return async dispatch => {
    let products = await Api.getProductsCarousel({ latitude, longitude, radius }) // make request to get products
    if (!products.error) {
      let data = products.data.included.map(item => {
        let distance = products.data.data.find(d => d.attributes['brand-id'] === item.attributes['brand-id']).attributes.distance
        return {
          id: item.id,
          distance,
          price: item.attributes.price,
          brand: item.attributes.brand,
          name: item.attributes.name,
          image: item.attributes['slider-image-data']
        }
      })
      return dispatch({ type: GET_CAROUSEL_PRODUCTS, data })
    }
    return dispatch({ type: GET_CAROUSEL_PRODUCTS, data: [] })
  }
}

const loadProducts = (resource, params) => {
  return async dispatch => {
    let products = null
    dispatch(reset()) // reset array of products
    dispatch(setLoading()) // set loading in true
    if (resource === 'products') { // validate resource (product, service)
      products = await Api.getProducts(params)
    } else {
      products = await Api.getServices(params)
    }
    if (!products.error) {
      let favorites = []
      // build array of only products/services favorites
      products.data.data.forEach(item => {
        if (item.attributes['is-favorite']) favorites.push(item)
      })
      dispatch(setManyFavorites(favorites)) // save favorites in reducer of favorites
      return dispatch({ type: GET_PRODUCTS, products: products.data.data }) // save products on redux state
    }
    return dispatch({ type: GET_PRODUCTS, products: [] })
  }
}

export function getProducts (params) {
  return loadProducts('products', params)
}

export function getServices (params) {
  return loadProducts('services', params)
}

export function reset () {
  return { type: RESET_PRODUCTS_LIST }
}
function setLoading (flag = true) {
  return { type: SET_LOADER, flag }
}
