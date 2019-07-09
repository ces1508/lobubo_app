import { Save, removeItem } from '../utils/libs'
import { reset as resetFavorites } from './favorites'
import { reset as resetProducts, getProducts, getServices } from './products'
import { reset as resetShoppingCart } from './shoppingCart'
const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN'
const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE'

const initialState = {
  token: null,
  profile: {}
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case SAVE_USER_PROFILE:
      return {
        ...state,
        profile: { ...action.profile }
      }
    default:
      return state
  }
}

export const setUserToken = token => {
  return async dispatch => {
    await Save('token', token)
    dispatch({ type: SAVE_USER_TOKEN, token })
  }
}

export const logout = () => {
  return async dispatch => {
    await removeItem('token')
    dispatch({ type: SAVE_USER_TOKEN, token: null })
    dispatch(resetFavorites())
    dispatch(resetShoppingCart())
    dispatch(resetProducts())
    dispatch(getProducts())
    dispatch(getServices())
  }
}

export const setUserProfile = profile => ({ type: SAVE_USER_PROFILE, profile })
