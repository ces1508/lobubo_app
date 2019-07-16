import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Input from '../components/input'

export default class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      word: ''
    }
  }
  render () {
    return (
      <View>
        <Input onChangeText={text => this.setState({ word: text })} value={this.state.word} />
        <Text>this view is  still under construction </Text>
      </View>
    )
  }
}
