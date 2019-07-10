import React, { PureComponent } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import Numeric from 'react-native-numeric-input'
import Price from '../components/price'
import Button from '../components/button'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Rating from 'react-native-easy-rating'
import Theme from '../Theme'
import Api from '../api'
import ProductItem from '../components/product'

export default class ProductScreen extends PureComponent {
  state = {
    similar: [],
    quantity: 1
  }
  async componentDidMount () {
    let { id } = this.props.navigation.getParam('product')
    let similar = await Api.getSimilarProducts(id)
    this.setState({ similar: similar.data.data })
  }
  render () {
    let product = this.props.navigation.getParam('product')
    return (
      <ScrollView showsVerticalScrollIndicator={false} scrollsToTop>
        <Image resizeMode='stretch' source={{ uri: product.attributes['image-data'].original.url }} style={{ height: 300 }} />
        <View style={styles.container}>
          <View style={[styles.sectionTitle, styles.section]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textEmphasis}>{product.attributes.name}</Text>
              <Rating rating={product.attributes['reviews-score']} editable={false} iconHeight={10} iconWidth={10} />
              <Text>By: {product.attributes.brand.name}</Text>
              <Price style={[styles.textEmphasis, styles.price]} value={product.attributes.price} />
            </View>
            <Icons name='heart' size={30} />
          </View>
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Numeric totalWidth={200} totalHeight={50} rounded onChange={value => this.setState({ quantity: value })} minValue={1} value={this.state.quantity} maxValue={product.attributes.quantity} />
          </View>
          <Button text='AGREGAR AL CARRITO' />
          <View style={styles.section}>
            <Text>{product.attributes.description}</Text>
          </View>
        </View>
        <View style={[styles.section, { paddingHorizontal: 10 }]}>
          <Text style={[styles.textEmphasis, { marginBottom: 15 }]}>Quizas te pueda interesar</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            data={this.state.similar}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductItem {...item} full={item} type='similar' navigation={this.props.navigation} />}
          />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  textEmphasis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  name: {
  },
  price: {
    color: Theme.colors.secondary
  },
  section: {
    paddingVertical: 20
  },
  sectionTitle: {
    flexDirection: 'row',
    paddingBottom: 0
  }
})
