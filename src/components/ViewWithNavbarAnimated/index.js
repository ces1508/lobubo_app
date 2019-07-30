import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Animated
} from 'react-native'
import Navbar from './bars/base'

export default class Page extends PureComponent {
  constructor () {
    super()
    this.scrollY = new Animated.Value(0)
  }
  render () {
    return (
      <View>
        <Navbar
          position={this.scrollY}
          {...this.props} />
        <ScrollView
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: { y: this.scrollY }
              }
            }])}>
          {this.props.children}
        </ScrollView>
      </View>
    )
  }
}
