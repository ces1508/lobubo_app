import Api from '../api'
const GET_CAROUSEL_PRODUCTS = 'GET_CAROUSEL_PRODUCTS'
const GET_PRODUCTS = 'GET_PRODUCTS'
const MAKE_PRODUCT_FAVORITE = 'MAKE_PRODUCT_FAVORITE'
const RESET_PRODUCTS_LIST = 'RESET_PRODUCTS_LIST'

const initialState = {
  carousel: [],
  data: [],
  favorites: new Map()
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
        favorites: action.favorites
      }
    case MAKE_PRODUCT_FAVORITE:
      let favorites = new Map(state.favorites)
      favorites.set(action.id, !favorites.get(action.id))
      return {
        ...state,
        favorites
      }
    case RESET_PRODUCTS_LIST:
      return {
        ...state,
        data: [],
        favorites: new Map()
      }
    default:
      return state
  }
}

// actions

export const loadCarouselProducts = (latitude, longitude, radius = 1000) => {
  return async dispatch => {
    let products = await Api.getProductsCarousel({ latitude, longitude, radius })
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
    dispatch(reset())
    if (resource === 'products') {
      products = await Api.getProducts(params)
    } else {
      products = await Api.getServices(params)
    }
    if (!products.error) {
      let favorites = new Map()
      products.data.data.forEach(item => { favorites.set(item.id, item.attributes['is-favorite']) })
      return dispatch({ type: GET_PRODUCTS, products: products.data.data, favorites })
    }
    return dispatch({ type: GET_PRODUCTS, products: [], favorites: new Map() })
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

export const makeFavorite = (id, isFavorite) => {
  return async dispatch => {
    let handler = null
    dispatch(handleFavorite(id))
    if (isFavorite) {
      handler = await Api.removeFavorite('products', id)
    } else {
      handler = await Api.makeFavorite('products', id)
    }
    if (handler.error) {
      return dispatch(handleFavorite(id))
    }
  }
}

function handleFavorite (id) {
  return { type: MAKE_PRODUCT_FAVORITE, id }
}
