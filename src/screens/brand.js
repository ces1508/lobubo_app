import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native'
import Api from '../api'
import Rating from 'react-native-easy-rating'
import ViewAnimatedWrapper from '../components/ViewWithNavbarAnimated'
import ProductItem from '../components/product'
import ShareIcon from '../components/share'

export default class BrandScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      error: false,
      brand: {}
    }
    this.buildItem = this.buildItem.bind(this)
  }
  async componentDidMount () {
    let id = this.props.navigation.getParam('id')
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
  buildItem ({ item }) {
    item = {
      id: item.id,
      attributes: {
        ...item,
        brand: {
          ...this.state.brand.attributes
        },
        'image-data': {
          original: { url: item['image_data'].url },
          ...item['image_data']
        }
      }
    }
    console.log(item)
    return <ProductItem
      {...item}
      cardType='similar'
      full={item}
      showFavoriteIcon={false}
      navigation={this.props.navigation} />
  }
  render () {
    let { attributes } = this.state.brand
    if (this.state.isFetching) return <ActivityIndicator size='large' />
    if (this.state.error) return null
    let optionsToShare = {
      title: attributes.name,
      message: attributes.slogan,
      url: `https://lobubo.com/store/${this.state.brand.id}`
    }
    return (
      <ViewAnimatedWrapper rightIcon={<ShareIcon options={optionsToShare} />} navigation={this.props.navigation}>
        <Image
          style={styles.image}
          source={{ uri: attributes.logo.original.url }}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.name}>{attributes.name}</Text>
          <Text style={styles.slogan}>{attributes.slogan}</Text>
          <Rating rating={attributes['reviews-score']} editable={false} iconHeight={20} iconWidth={20} />
          <Text>{attributes.description}</Text>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Productos En venta</Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View width={10} />}
            style={{ padding: 10 }}
            data={attributes['on-sale-products']}
            renderItem={this.buildItem}
          />
        </View>
      </ViewAnimatedWrapper>
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
