import React, { PureComponent } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import Api from '../../api'
import ProductItem from '../../components/product'
import { connect } from 'react-redux'
import { makeFavorite, setSingleFavorite } from '../../ducks/favorites'
import styles from './styles'
import Product from './product'

const mapStateToProps = state => ({ token: state.user.token, favorites: state.favorites.currentFavorites })
const mapDispatchToProps = { makeFavorite, setSingleFavorite }

class ProductScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this._handleFavorite = this._handleFavorite.bind(this)
    this.product = this.props.navigation.getParam('product')
  }
  state = {
    similar: [],
    adding: false
  }
  async componentDidMount () {
    let similar = await Api.getSimilarProducts(this.product.id)
    this.setState({ similar: similar.data.data })
  }
  _handleFavorite () {
    if (!this.props.token) return this.props.navigation.navigate('login')
    let product = this.product
    this.props.makeFavorite(product, this.props.favorites.get(`${product.type}${product.id}`))
  }
  async addToCart (product) {
    if (!this.props.token) return this.props.navigation.navigate('login')
    let { adding } = this.state
    if (!adding) {
      this.setState({ adding: true })
      let add = await Api.addProductToCart(product)
      if (add.error) {
        return this.setState({ addError: true, message: add.error.message, adding: false })
      }
      this.setState({ adding: false })
    }
  }
  render () {
    let { adding } = this.state
    return (
      <ScrollView showsVerticalScrollIndicator={false} scrollsToTop>
        <Product
          favorites={this.props.favorites}
          handleFavorite={this._handleFavorite}
          product={this.product}
          adding={adding}
          handleAddToCart={this.addToCart}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
