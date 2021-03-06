import { combineReducers } from 'redux'
import products from '../ducks/products'
import position from '../ducks/position'
import user from '../ducks/user'
import shoppingCart from '../ducks/shoppingCart'
import favorites from '../ducks/favorites'
import services from '../ducks/services'

export default combineReducers({
  products,
  position,
  user,
  shoppingCart,
  favorites,
  services
})
