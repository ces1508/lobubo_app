import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from 'react-native'
import Theme from '../../Theme'
import Price from '../price'
import Numeric from 'react-native-numeric-input'
import { connect } from 'react-redux'
import { addProductToCart, removeProductToCart } from '../../ducks/shoppingCart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const mapStateToProps = state => ({ adding: state.shoppingCart.adding, token: state.user.token })
const mapDispatchToProps = { addProductToCart, removeProductToCart }

class ShoppingCarItem extends PureComponent {
  _handleChange = value => {
    let { item, token } = this.props
    if (value > item.attributes.quantity) {
      let product = {
        product_id: item.attributes.product.id,
        quantity: 1,
        size: item.attributes.size || null,
        color: item.attributes.color || null,
        talla: item.attributes.talla || null,
        material: item.attributes.material || null

      }
      if (token) {
        this.props.addProductToCart(product)
      } else {
        this.props.addProductToCart({
          ...item,
          attributes: {
            ...item.attributes,
            ...product
          }
        }, false)
      }
    } else {
      let orderItemId = item.id
      this.props.removeProductToCart(orderItemId, 'single', token)
    }
  }

  handleRemoveProduct = (item) => {
    let { token } = this.props
    Alert.alert(
      `vas a eliminar ${item.attributes.product.name}`,
      'estas seguro, esta opción removera todas las cantidades registradas en el carro de compras',
      [
        { text: 'cancel', onPress: () => null },
        { text: 'yes', onPress: () => this.props.removeProductToCart(item.id, 'all', token) }
      ]
    )
  }
  renderOptions = () => {
    let { item } = this.props
    return (
      <View style={{ flexDirection: 'column', flexWrap: 'wrap', marginBottom: 10 }}>
        {item.attributes.color
          ? <View style={{ flexDirection: 'row' }}>
            <Text>Color: {item.attributes.color} </Text>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: item.attributes.product.colors.find(color => color.name === item.attributes.color).value }} />
          </View> : null}
        {item.attributes.size ? <Text>Tamaño: {item.attributes.size} </Text> : null}
        {item.attributes.talla ? <Text>Talla: {item.attributes.talla} </Text> : null}
        {item.attributes.material ? <Text>Material: {item.attributes.material} </Text> : null}
      </View>
    )
  }
  renderRowPrice () {
    let { item } = this.props
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Numeric
          validateOnBlur
          editable={false}
          initValue={item.attributes.quantity}
          onChange={this._handleChange}
          totalHeight={35}
          limit={item.attributes.product.quantity} />
        <Icon onPress={() => this.handleRemoveProduct(item)} name='trash-can-outline' size={30} color='red' style={{ alignSelf: 'flex-end' }} />
      </View>
    )
  }
  render () {
    let { item } = this.props
    return (
      <View style={styles.product}>
        <Image
          source={{ uri: item.attributes.product.image_data.url }}
          style={{ width: 110 }} />
        <View style={styles.productDescription}>
          <Text
            numberOfLines={2}
            accessibilityRole='text'
            ellipsizeMode='tail'
            style={styles.productTitle}>
            {item.attributes.product.name}
          </Text>
          <Price value={item.attributes.quantity * item.attributes.product.price} style={styles.productPrice} />
          {this.renderOptions()}
          { this.props.adding
            ? <Text>... Cargando</Text>
            : this.renderRowPrice()
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
