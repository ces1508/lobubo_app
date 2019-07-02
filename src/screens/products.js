import React, { PureComponent } from 'react'
import { View } from 'react-native'
import listHOC from '../components/list'
import Api from '../api'
import Product from '../components/product'

export default class ProductListScreen extends PureComponent {
  render () {
    let ProductList = listHOC(() => Api.getProducts({ page: 1 }))
    return (
      <ProductList
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrappedStyle={{ marginHorizontal: 10 }}
        style={{ marginVertical: 20, marginHorizontal: 10 }}
        renderItem={({ item }) => <Product {...item} />}
      />
    )
  }
}
