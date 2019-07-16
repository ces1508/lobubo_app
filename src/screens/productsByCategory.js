import React, { Component } from 'react'
import { View } from 'react-native'
import list from '../components/list'
import Api from '../api'
import Product from '../components/product'

class ProductsByCategory extends Component {
  constructor () {
    super()
    this.state = { data: [] }
    this.getProducts = this.getProducts.bind(this)
  }
  async getProducts () {
    let { routeName } = this.props.navigation.state
    let { id } = this.props.navigation.getParam('category')
    let products = await Api.getProductsByCategory(id, { page: 1 }, routeName === 'productsByCategory' ? 'products' : 'services')
    this.setState({ data: products.data.data })
  }
  componentDidMount () {
    this.getProducts()
  }
  render () {
    const List = list(() => this.getProducts())
    return (
      <List
        data={this.state.data}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}
        renderItem={({ item }) => <Product {...item} full={item} navigation={this.props.navigation} />}
      />
    )
  }
}

export default ProductsByCategory
