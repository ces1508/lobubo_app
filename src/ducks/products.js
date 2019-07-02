import Api from '../api'
const GET_CAROUSEL_PRODUCTS = 'GET_CAROUSEL_PRODUCTS'

const initialState = {
  carousel: []
}

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CAROUSEL_PRODUCTS:
      return {
        ...state,
        carousel: [...action.data]
      }
    default:
      return state
  }
}

// actions

export const loadCarouselProducts = (latitude, longitude, radius = 1000) => {
  return async dispatch => {
    let products = await Api.getProductsCarousel({ latitude, longitude, radius })
    if (!products.error) {
      let data = products.data.included.map(item => {
        let distance = products.data.data.find(d => d.attributes['brand-id'] === item.attributes['brand-id']).attributes.distance
        return {
          id: item.id,
          distance,
          price: item.attributes.price,
          brand: item.attributes.brand,
          name: item.attributes.name,
          image: item.attributes['slider-image-data']
        }
      })
      return dispatch({ type: GET_CAROUSEL_PRODUCTS, data })
    }
    console.log(products)
    return dispatch({ type: GET_CAROUSEL_PRODUCTS, data: [] })
  }
}
