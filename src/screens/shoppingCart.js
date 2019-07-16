import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { getShoppingCar, addProductToCart } from '../ducks/shoppingCart'
import list from '../components/list'
import Price from '../components/price'
import ShoppingCartItem from '../components/shoppingCartItem'
import Theme from '../Theme'

const mapStateToProps = state => ({ data: state.shoppingCart.products, token: state.user.token })
const mapDispatchToProps = { getShoppingCar, addProductToCart }

class ShoppingCartScreen extends PureComponent {
  componentDidMount () {
    if (this.props.token) {
      return this.props.getShoppingCar()
    }
    this.props.navigation.navigate('login')
  }
  calculateTotalPrice () {
    let { data } = this.props
    return data.reduce((prev, current) => {
      return prev + (current.attributes.quantity * current.attributes.product.price)
    }, 0)
  }

  render () {
    let ShoppingCartList = list(() => this.props.getShoppingCar({ page: 1 }))
    let total = this.calculateTotalPrice()
    return (
      <View style={{ flex: 1 }}>
        <ShoppingCartList
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
          data={this.props.data}
          renderItem={item => <ShoppingCartItem item={item.item} index={item.index} />}
        />
        <Text onPress={() => null} style={styles.btnPay}>PAGAR <Price value={total} /></Text>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen)

const styles = StyleSheet.create({

  btnPay: {
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: Theme.colors.secondary,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  }
})
