/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import HomeScreen from './src/screens/home'
import { Provider } from 'react-redux'
import store from './src/store'
import { setPosition } from './src/ducks/position'
import { getCurrentPosition } from './src/utils/libs'

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
    } catch (e) {
      console.warn('error getting position ', e.message)
    }
    this.setState({ hasPosition: true })
  }
  render () {
    if (this.state.hasPosition) {
      return (
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      )
    }
    return null
  }
}
