import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Api from '../api'
import SvgUri from 'react-native-svg-uri'
import Theme from '../Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('productsByCategory', { category: item })}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
            <View style={{ backgroundColor: Theme.colors.primary, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
              <SvgUri
                width='25'
                height='25'
                fill='#fff'
                fillAll
                svgXmlData={item.attributes.icon.raw} />
            </View>
            <Text style={{ marginLeft: 10, flex: 1 }}>
              {item.attributes.name}
            </Text>
            <Icon name='chevron-right' size={30} />
          </TouchableOpacity>)}
        data={this.state.categories}
      />
    )
  }
}
