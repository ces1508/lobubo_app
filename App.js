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
import { getCurrentPosition } from './src/utils/libs'
import { getShoppingCar } from './src/ducks/shoppingCart'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasPosition: false
    }
  }
  async componentDidMount () {
    try {
      let position = await getCurrentPosition()
      store.dispatch(setPosition(position))
      store.dispatch(getShoppingCar())
    } catch (e) {
      console.warn('error getting position ', e.message)
    }
    this.setState({ hasPosition: true })
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
