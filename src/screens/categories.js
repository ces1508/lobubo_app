import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import Api from '../api'

export default class CategoriesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = { categories: [], isLoading: true }
  }
  async componentDidMount () {
    let categories = await Api.getCategories()
    this.setState({ categories: categories.data.data })
  }
  render () {
    return (
      <FlatList
        keyExtractor={item => item.id}
        renderItem={({ item }) => <View><Text>{item.attributes.name}</Text></View>}
        data={this.state.categories}
      />
    )
  }
}
