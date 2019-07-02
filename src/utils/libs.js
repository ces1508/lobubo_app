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
