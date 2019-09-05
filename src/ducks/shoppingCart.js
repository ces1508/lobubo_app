import Api from '../api'
import { Save, getItem } from '../utils/libs'
const GET_PRODUCTS_OF_CART = 'GET_PRODUCTS_OF_CART'
const SET_SHOPPING_CART_LOADER = 'SET_SHOPPING_CART_LOADER'
const RESET_SHOPPING_CART = '/shopping_cart/reset'
// const ADD_PRODUCT_TO_SHOPPING_CART = 'shopping_cart/add/product'
const SET_ADDING_TO_SHOPPING_CART = 'shopping_cart/set/add/loader'
const SET_ITEMS_IN_SHOPPING_CART = 'shopping_cart_set/items' // this will be use when user doesn't have signing

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
    case RESET_SHOPPING_CART:
      return {
        ...state,
        products: []
      }
    case SET_ADDING_TO_SHOPPING_CART:
      return {
        ...state,
        adding: action.flag
      }
    case SET_ITEMS_IN_SHOPPING_CART:
      return {
        ...state,
        products: [...action.items]
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
export const addProductToCart = (product, userIsLogin = true) => {
  return async dispatch => {
    if (userIsLogin) {
      return addToRemoteServer(product, dispatch)
    }
    addToLocalDatabase(product, dispatch)
  }
}

async function addToLocalDatabase (product, dispatch) {
  let shoppingCart = await getItem('@shoppingCart')
  if (shoppingCart) {
    shoppingCart = JSON.parse(shoppingCart)
  } else {
    shoppingCart = []
  }
  let alreadyInCart = shoppingCart.find(item => {
    return item.product_id === product.product_id &&
      item.attributes.material === product.attributes.material &&
      item.attributes.size === product.attributes.size &&
      item.attributes.color === product.attributes.color &&
      item.attributes.talla === product.attributes.talla
  })
  if (alreadyInCart) {
    alreadyInCart.attributes.quantity += product.attributes.quantity
  } else {
    shoppingCart.push(product)
  }
  await Save('@shoppingCart', JSON.stringify([...shoppingCart]))
  dispatch(setItemsInShoppingCart(shoppingCart))
}

/**
 *
 * @param {string} id, id of product to remove
 * @param {boolean} type should be single or all
 * @param {any} userIsLogin
 *
 * when user is singed this method will send a request to remote server,
 * and quantities are be handle by remote server
 *
 * if user is not singed
 *  if quantity is equal to 1 or type is equal to all
 *    this method remove item from local array
 *  else
 *  only decrease one to quantity
 *
 */

export const removeProductToCart = (id, type = 'single', userIsLogin = true) => {
  return async dispatch => {
    if (userIsLogin) {
      dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
      let remove = await Api.removeProduct(id, type)
      if (!remove.error) {
        dispatch(getShoppingCar())
      }
      dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
    } else {
      let products = await getItem('@shoppingCart')
      products = JSON.parse(products)
      let product = products.find(item => {
        return item.id === id
      })
      if (product.attributes.quantity === 1 || type !== 'single') {
        products = removeItemFromLocalStorage(products, id)
      } else {
        --product.attributes.quantity
      }
      await Save('@shoppingCart', JSON.stringify(products))
      dispatch(setItemsInShoppingCart(products))
    }
  }
}

async function addToRemoteServer (product, dispatch) {
  dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: true })
  let add = await Api.addProductToCart(product)
  if (!add.error) {
    dispatch(getShoppingCar())
  }
  dispatch({ type: SET_ADDING_TO_SHOPPING_CART, flag: false })
}

function removeItemFromLocalStorage (items, item) {
  let index = items.findIndex(i => i.id === item.id)
  items.splice(index, 1)
  return items
}

export const setItemsInShoppingCart = items => ({ type: SET_ITEMS_IN_SHOPPING_CART, items })

export const reset = () => ({ type: RESET_SHOPPING_CART })
