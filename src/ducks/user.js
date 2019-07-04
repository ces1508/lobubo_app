import { Save } from '../utils/libs'
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
export const setUserProfile = profile => ({ type: SAVE_USER_PROFILE, profile })
