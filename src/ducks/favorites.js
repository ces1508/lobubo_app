import Api from '../api'
const GET_PRODUCTS_FAVORITES = '/favorites/get/products'
const GET_BRANDS_FAVORITES = '/favorites/get/brands'
const SET_MANY_FAVORITES = '/favorites/set/many'
const SET_SINGLE_FAVORITE = '/favorites/set/single'
const REMOVE_SINGLE_FAVORITE = '/favorites/remove/single'
const RESET_FAVORITES  = '/favorites/reset'

const initialState = {
  products: new Map(),
  brands: new Map(),
  currentFavorites: new Map()
}

export default function favoritesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_BRANDS_FAVORITES:
      return {
        ...state,
        brands: new Map(action.data)
      }
    case GET_PRODUCTS_FAVORITES:
      return {
        ...state,
        products: new Map(action.data)
      }
    case SET_MANY_FAVORITES:
      return {
        ...state,
        currentFavorites: buildFavorites(action.favorites, state.currentFavorites)
      }
    case SET_SINGLE_FAVORITE:
      let { favorite } = action
      let key = `${favorite.type}${favorite.id}`
      state.currentFavorites.set(key, !state.currentFavorites.get(key))
      return {
        ...state,
        currentFavorites: new Map(state.currentFavorites)
      }
    case REMOVE_SINGLE_FAVORITE:
      let brands = state.brands
      let products = state.products
      brands.delete(action.key)
      products.delete(action.key)
      return {
        ...state,
        brands: new Map(brands),
        products: new Map(products)
      }
    case RESET_FAVORITES:
      return {
        ...state,
        currentFavorites: new Map(),
        brands: new Map(),
        products: new Map()
      }
    default:
      return state
  }
}

function buildFavorites (array, map) {
  array.forEach(e => map.set(`${e.type}${e.id}`, e))
  return map
}

export const getProductsFavorites = params => {
  return async dispatch => {
    let data = await Api.getFavorites(params)
    let dataMap = new Map()
    data.data.data.forEach(item => dataMap.set(`${item.type}${item.id}`, item))
    dispatch(setManyFavorites(data.data.data))
    return dispatch({ type: GET_PRODUCTS_FAVORITES, data: dataMap })
  }
}

export const getBrandsFavorites = params => {
  return async dispatch => {
    let data = await Api.getBrandsFavorites()
    let dataMap = new Map()
    data.data.data.forEach(item => dataMap.set(`${item.type}${item.id}`, item))
    dispatch(setManyFavorites(data.data.data))
    dispatch({ type: GET_BRANDS_FAVORITES, data: dataMap })
  }
}

export const makeFavorite = (item, isFavorite) => {
  console.log(`item ${item} is Favorite ${isFavorite}`)
  return async dispatch => {
    let handler = null
    dispatch(setSingleFavorite(item))
    if (isFavorite) {
      handler = await Api.removeFavorite(item.type, item.id)
      dispatch(removeFromProductsAndBrands(`${item.type}${item.id}`))
    } else {
      handler = await Api.makeFavorite(item.type, item.id)
    }
    if (handler.error) {
      return dispatch(setSingleFavorite(item))
    }
  }
}
const removeFromProductsAndBrands = key => ({ type: REMOVE_SINGLE_FAVORITE, key })
export const setManyFavorites = favorites => ({ type: SET_MANY_FAVORITES, favorites })
export const setSingleFavorite = favorite => ({ type: SET_SINGLE_FAVORITE, favorite })
export const reset = () => ({ type: RESET_FAVORITES })
