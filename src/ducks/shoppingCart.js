import Api from '../api'
const GET_PRODUCTS_OF_CART = 'GET_PRODUCTS_OF_CART'
const SET_SHOPPING_CART_LOADER = 'SET_SHOPPING_CART_LOADER'
const RESET_SHOPPING_CART = '/shopping_cart/reset'
// const ADD_PRODUCT_TO_SHOPPING_CART = 'shopping_cart/add/product'
const SET_ADDING_TO_SHOPPING_CART = 'shopping_cart/set/add/loader'

const initialState = {
  products: [],
  isLoading: false,
  adding: false,
  lastProductAdded: null
}

export default function shoppingCarReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_OF_CART:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case RESET_SHOPPING_CART: {
      return {
        ...state,
        products: []
      }
    }
    case SET_ADDING_TO_SHOPPING_CART: {
      return {
        ...state,
        adding: action.flag
      }
    }
    default:
      return state
  }
}

function setLoader (flag = true) {
  return { type: SET_SHOPPING_CART_LOADER, loader: flag }
}
export const getShoppingCar = () => {
  return async dispatch => {
    dispatch(setLoader())
    let products = await Api.getProductsCar()
    if (!products.error) {
      dispatch({ type: GET_PRODUCTS_OF_CART, products: products.data.data })
    }
  }
}
export const addProductToCart = (product, type = 'refresh') => {
  return async dispatch => {
    dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: true })
    let add = await Api.addProductToCart(product)
    if (!add.error) {
      if (type === 'refresh') dispatch(getShoppingCar())
    }
    dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
  }
}
export const removeProductToCart = (id, type = 'single') => {
  return async dispatch => {
    dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
    let remove = await Api.removeProduct(id)
    if (!remove.error) {
      dispatch(getShoppingCar())
    }
    dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
  }
}
// function refreshWhitouRequest() {
//   return false
// }
export const reset = () => ({ type: RESET_SHOPPING_CART })
