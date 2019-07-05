import { combineReducers } from 'redux'
import products from '../ducks/products'
import position from '../ducks/position'
import user from '../ducks/user'
import shoppingCart from '../ducks/shoppingCart'

export default combineReducers({
  products,
  position,
  user,
  shoppingCart
})
