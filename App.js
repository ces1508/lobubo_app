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
import { getCurrentPosition, getItem } from './src/utils/libs'
import { getShoppingCar } from './src/ducks/shoppingCart'
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
      store.dispatch(getShoppingCar())
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
