import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { getShoppingCar } from '../ducks/shoppingCart'
import list from '../components/list'
import Price from '../components/price'

const mapStateToProps = state => ({ data: state.shoppingCart.products, token: state.user.token })
const mapDispathToProps = { getShoppingCar }

class ShoppingCartScreen extends PureComponent {
  constructor (props) {
    super(props)

    this._renderItem = this._renderItem.bind(this)
  }
  componentDidMount () {
    if (this.props.token) {
      return this.props.getShoppingCar()
    }
    this.props.navigation.navigate('login')
  }
  _renderItem ({ item }) {
    return (
      <View>
        <Image
          source={{ uri: item.attributes.product.image_data.url }}
          defaultSource={{ uri: item.attributes.product.image_data.thumb.url, width: '100%', height: 200 }} style={{ width: '100%', height: 200 }} />
        <Text style={styles.productTitle}>{item.attributes.product.name}</Text>
        <View style={styles.productDescription}>
          <Text style={styles.productQuantity}>cantidad: {item.attributes.quantity}</Text>
          <Text style={styles.price}>Precio unidad: <Price value={item.attributes.product.price} /></Text>
          <Text>Precio total: <Price value={item.attributes.quantity * item.attributes.product.price} /></Text>
        </View>
      </View>
    )
  }
  render () {
    let ShoppingCartList = list(() => this.props.getShoppingCar({ page: 1 }))
    return (
      <ShoppingCartList
        data={this.props.data}
        renderItem={this._renderItem}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ShoppingCartScreen)

const styles = StyleSheet.create({
  product: {},
  productTitle: {
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 25
  },
  productQuantity: {
    fontSize: 20
  },
  productDescription: {
    paddingHorizontal: 10
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})
