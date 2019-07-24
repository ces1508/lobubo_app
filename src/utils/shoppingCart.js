import { getItem, Save } from './libs'
import Api from '../api'

export const syncShoppingCart = async () => {
  let localShoppingCart = await getItem('@shoppingCart')
  localShoppingCart = JSON.parse(localShoppingCart)
  if (localShoppingCart.length > 0) {
    let request = []
    for (let i = 0; i <= 1; i++) {
      let item = localShoppingCart[i]
      if (item) {
        let product = {
          product_id: item.id,
          talla: item.attributes.talla,
          color: item.attributes.color,
          size: item.attributes.size,
          material: item.attributes.material,
          quantity: item.attributes.quantity
        }
        request.push(Api.addProductToCart(product))
        localShoppingCart.splice(i, 1)
      }
    }
    if (request.length > 0) {
      try {
        await Promise.all(request)
        for (let i = 0; i < request.length; i++) {
          localShoppingCart.splice(i, 1)
        }
        await Save('@shoppingCart', JSON.stringify(localShoppingCart))
        syncShoppingCart()
      } catch (e) {
        return { sync: false, error: e.message }
      }
    } else {
      return { sync: true }
    }
  }
  return { sync: true }
}
