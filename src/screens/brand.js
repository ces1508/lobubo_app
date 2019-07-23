import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import Api from '../api'
import Rating from 'react-native-easy-rating'

export default class BrandScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      error: false,
      brand: {}
    }
  }
  async componentDidMount () {
    let { id } = this.props.navigation.getParam('brand')
    let brand = await Api.getBrand(id)
    if (!brand.error) {
      return this.setState({
        brand: brand.data.data,
        isFetching: false,
        error: false
      })
    }
    this.setState({ isFetching: false, error: true })
  }
  render () {
    let { attributes } = this.state.brand
    if (this.state.isFetching) return <ActivityIndicator size='large' />
    if (this.state.error) return null
    return (
      <View>
        <Image
          style={styles.image}
          source={{ uri: attributes.logo.original.url }}
        />
        <Text style={styles.name}>{attributes.name}</Text>
        <Text style={styles.slogan}>{attributes.slogan}</Text>
        <Rating rating={attributes['reviews-score']} editable={false} iconHeight={20} iconWidth={20} />
        <Text>{attributes.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  slogan: {
    fontSize: 13,
    fontWeight: '100'
  }
})
