import React, { PureComponent } from 'react'
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
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
    this.state = {
      similar: [],
      product: {},
      adding: false,
      loading: true,
      error: false
    }
  }
  async componentDidMount () {
    let id = this.props.navigation.getParam('id')
    if (id) {
      let product = await Api.getProduct(id)
      if (product.error) {
        let typeError = product.data.errors[0].status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR'
        return this.setState({
          error: {
            type: typeError
          },
          loading: false
        })
      }
      this.setState({
        loading: false,
        product: product.data.data
      })
    } else {
      this.setState({
        loading: false,
        product: this.props.navigation.getParam('product')
      })
    }
    let similar = await Api.getSimilarProducts(this.state.product.id) // get similar products from server
    // save response from server in local state
    this.setState({ similar: similar.data.data })
  }
  _handleFavorite () {
    if (!this.props.token) return this.props.navigation.navigate('login')
    let product = this.product
    this.props.makeFavorite(product, this.props.favorites.get(`${product.type}${product.id}`))
  }

  /**
   * initialized method addToCart
    * @param product, the param product should be a object
    * this method allow add a single product to shopping cart
  */

  async addToCart (product) {
    if (!this.props.token) return this.props.navigation.navigate('login') // validate if user is logged
    let { adding } = this.state // get adding to local state
    if (!adding) { // validate if already exists a request to add
      // set state adding in true, to can't allow user send another request until server response
      this.setState({ adding: true })
      let add = await Api.addProductToCart(product) // send ajax request to server
      if (add.error) { // validate if server responses with a error
        return this.setState({ addError: true, message: add.error.message, adding: false })
      }
      this.setState({ adding: false }) // set adding in false to allow user send another request to add
    }
  }
  render () {
    let { adding, loading, error, product } = this.state
    if (this.state.loading) return <ActivityIndicator size='large' />
    if (!loading && error) {
      return (
        <View>
          <Text>
            {error.type === 'NOT_FOUND' ? 'No hemos podido encontrar el producto' : 'estamos presentando problemas, por favor intenta mas tarde'}
          </Text>
        </View>
      )
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false} scrollsToTop>
        <Product
          favorites={this.props.favorites}
          handleFavorite={this._handleFavorite}
          product={product}
          adding={adding}
          navigation={this.props.navigation}
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
            renderItem={({ item }) => <ProductItem {...item} full={item} cardType='similar' navigation={this.props.navigation} />}
          />
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
