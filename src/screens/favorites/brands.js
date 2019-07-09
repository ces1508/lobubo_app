import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getBrandsFavorites } from '../../ducks/favorites'
import list from '../../components/list'
import { View } from 'react-native'
import Item from '../../components/brandItem'

const mapStateToProps = state => ({
  position: state.position,
  data: state.favorites.brands
})
const mapDispatchToProps = { getBrandsFavorites }

class BrandFavorites extends PureComponent {
  getFavorites () {
    let { getBrandsFavorites, position } = this.props
    getBrandsFavorites({ page: 1, ...position })
  }
  componentDidMount () {
    this.getFavorites()
  }
  render () {
    let FavoriteBrands = list(() => getBrandsFavorites())
    let data = [...this.props.data.values()]
    console.log(data)
    return (
      <View >
        <FavoriteBrands
          data={data}
          numColumns={2}
          ItemSeparatorComponent={(() => <View style={{ height: 20 }} />)}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
          renderItem={({ item, index }) => <Item index={index} {...item} />}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandFavorites)
