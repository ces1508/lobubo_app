import Api from '../api'
import { setManyFavorites } from './favorites'
const GET_SERVICES = '/services/get/list'
const SET_LOADER = 'services/set/loader'
const RESET_SERVICES_LIST = '/services/rest/list'

const initialState = {
  data: [],
  error: null,
  isLoading: true
}

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        data: action.services,
        isLoading: false
      }
    case RESET_SERVICES_LIST:
      return {
        ...state,
        data: []
      }
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.flag
      }
    default:
      return state
  }
}

// actions

export const getServices = params => {
  return async dispatch => {
    dispatch(setLoader())
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
function setLoader (flag = true) {
  return { type: SET_LOADER, flag }
}
