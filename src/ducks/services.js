import Api from '../api'
import { setManyFavorites } from './favorites'
const GET_SERVICES = '/favorites/get'
const RESET_SERVICES_LIST = '/favorites/rest'

const initialState = {
  data: [],
  error: null,
  isLoading: false
}

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        data: action.services
      }
    case RESET_SERVICES_LIST:
      return {
        ...state,
        data: []
      }
    default:
      return state
  }
}

// actions

export const getServices = params => {
  return async dispatch => {
    let services = await Api.getServices(params)
    if (!services.error) {
      let favorites = []
      services.data.data.forEach(item => {
        if (item.attributes['is-favorite']) favorites.push(item)
      })
      dispatch(setManyFavorites(favorites))
      return dispatch({ type: GET_SERVICES, services: services.data.data })
    }
    return dispatch({ type: GET_SERVICES, services: [], error: true })
  }
}

export function reset () {
  return { type: RESET_SERVICES_LIST }
}
