const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'

const initialState = {
  latitude: '',
  longitude: '',
  radio: 1000
}

export default function positionReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      }
    default:
      return state
  }
}

// actions

export const setPosition = coords => ({ type: SET_CURRENT_POSITION, latitude: coords.latitude, longitude: coords.longitude })
