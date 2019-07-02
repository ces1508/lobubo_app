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

export const loadCarouselProducts = async (latitude, longitude, radius = 1000) => {
  let products = await Api.getProductsCarousel({ latitude, longitude, radius })
  if (!products.error) {
    return { type: GET_CAROUSEL_PRODUCTS, data: products.data.data }
  }
}
