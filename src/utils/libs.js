import { AsyncStorage } from 'react-native'

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let { latitude, longitude } = position.coords
      return resolve({ latitude, longitude })
    }, (e) => {
      return resolve({ error: true })
    })
  })
}

export const Save = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value)
    return { status: 'ok', message: `${key} has be saved` }
  } catch (e) {
    return new Error(e)
  }
}

export const getItem = (key) => {
  try {
    return AsyncStorage.getItem(`@${key}`)
  } catch (e) {
    return new Error(e)
  }
}

export const removeItem = key => {
  try {
    return AsyncStorage.removeItem(`@${key}`)
  } catch (e) {
    return new Error(e.message)
  }
}
