import Api from '../api'
const GET_PRODUCTS_OF_CART = 'GET_PRODUCTS_OF_CART'
const SET_SHOPPING_CART_LOADER = 'SET_SHOPPING_CART_LOADER'
const RESET_SHOPPING_CART = '/shopping_cart/reset'

const initialState = {
  products: [],
  isLoading: false,
  adding: false
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

export const reset = () => ({ type: RESET_SHOPPING_CART })
