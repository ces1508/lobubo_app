import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getProductsFavorites } from '../../ducks/favorites'
import listHOC from '../../components/list'
import Product from '../../components/product'
import { View } from 'react-native'

const mapStateToProps = state => ({ data: state.favorites.products })
const mapDispatchToProps = {
  getProductsFavorites
}

class ProductFavorites extends PureComponent {
  componentDidMount () {
    this.props.getProductsFavorites()
  }
  render () {
    let ProductList = listHOC(() => this.props.getProductsFavorites({ page: 1 }))
    let data = [...this.props.data.values()]
    console.log(data)
    return (
      <ProductList
        numColumns={2}
        data={data}
        scrollToIndex={7}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={(() => <View style={{ height: 20 }} />)}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        renderItem={({ item }) => <Product {...item} />}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFavorites)
