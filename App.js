/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import Navigation from './src/navigation'
import { Provider } from 'react-redux'
import store from './src/store'
import { setPosition } from './src/ducks/position'
import { getCurrentPosition, getItem, Save } from './src/utils/libs'
import { getShoppingCar, setItemsInShoppingCart } from './src/ducks/shoppingCart'
import { setUserToken } from './src/ducks/user'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasPosition: false
    }
  }
  async componentDidMount () {
    this.validateExitsToken()
    try {
      let position = await getCurrentPosition()
      store.dispatch(setPosition(position))
    } catch (e) {
      console.warn('error getting position ', e.message)
    }
    this.setState({ hasPosition: true })
  }
  async validateExitsToken () {
    let token = await getItem('token')
    if (token) {
      store.dispatch(setUserToken(token))
    }
    this.setShoppingCart(token)
  }
  async setShoppingCart (token) {
    if (token) {
      return store.dispatch(getShoppingCar())
    }
    let shoppingCartLocal = await getItem('@shoppingCart')
    if (shoppingCartLocal) {
      return store.dispatch(setItemsInShoppingCart(JSON.parse(shoppingCartLocal)))
    }
    await Save('@shoppingCart', JSON.stringify([]))
  }
  render () {
    if (this.state.hasPosition) {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      )
    }
    return null
  }
}
