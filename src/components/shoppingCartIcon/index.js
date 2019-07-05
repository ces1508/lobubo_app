import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import Theme from '../../Theme'
const mapStateToProps = state => ({ products: state.shoppingCart.products })

const ShoppingCartIcon = props => {
  let amount = props.products.reduce((prev, current) => {
    return prev + current.attributes.quantity
  }, 0)
  return (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('shoppingCart')}>
      <View style={styles.icon}>
        <Icons name='cart-outline' size={30} />
        <View style={styles.badgeContainer}>
          <Text style={styles.badge} >{amount}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default connect(mapStateToProps)(ShoppingCartIcon)
const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  },
  badgeContainer: {
    backgroundColor: Theme.colors.secondary,
    position: 'absolute',
    top: -10,
    right: 0,
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    fontSize: 15,
    color: Theme.colors.white,
    textAlignVertical: 'center'
  }
})
