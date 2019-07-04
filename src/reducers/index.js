import { combineReducers } from 'redux'
import products from '../ducks/products'
import position from '../ducks/position'
import user from '../ducks/user'

export default combineReducers({
  products,
  position,
  user
})
