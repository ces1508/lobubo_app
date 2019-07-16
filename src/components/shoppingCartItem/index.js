import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import Theme from '../../Theme'
import Price from '../price'
import Numeric from 'react-native-numeric-input'
import { connect } from 'react-redux'
import { addProductToCart, removeProductToCart } from '../../ducks/shoppingCart'

const mapStateToProps = state => ({ adding: state.shoppingCart.adding })
const mapDispatchToProps = { addProductToCart, removeProductToCart }

class ShoppingCarItem extends PureComponent {
  _handleChange = value => {
    console.log('value changed', value)
    let { item } = this.props
    if (value > item.attributes.quantity) {
      let product = {
        product_id: item.attributes.product.id,
        quantity: 1,
        size: item.size || null,
        color: item.color || null,
        talla: item.talla || null,
        material: item.material || null

      }
      this.props.addProductToCart(product)
    } else {
      let orderItemId = item.id
      this.props.removeProductToCart(orderItemId)
    }
  }
  render () {
    let { item } = this.props
    return (
      <View style={styles.product}>
        <Image
          source={{ uri: item.attributes.product.image_data.url }}
          style={{ width: 110, height: 110 }} />
        <View style={styles.productDescription}>
          <Text
            numberOfLines={2}
            accessibilityRole='text'
            ellipsizeMode='tail'
            style={styles.productTitle}>
            {item.attributes.product.name}
          </Text>
          <Price value={item.attributes.quantity * item.attributes.product.price} style={styles.productPrice} />
          { this.props.adding
            ? <Text>... Cargando</Text>
            : <Numeric
              validateOnBlur
              editable={false}
              initValue={item.attributes.quantity}
              onChange={this._handleChange}
              totalHeight={35}
              limit={item.attributes.product.quantity} />
          }
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCarItem)

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Theme.colors.gray,
    overflow: 'hidden'
  },
  productTitle: {
    fontSize: 18,
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  productQuantity: {
    fontSize: 20
  },
  productDescription: {
    flex: 1,
    paddingHorizontal: 5
  },
  productPrice: {
    color: Theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'right'
  }
})
