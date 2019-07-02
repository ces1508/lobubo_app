import { combineReducers } from 'redux'
import products from '../ducks/products'
import position from '../ducks/position'

export default combineReducers({
  products,
  position
})
