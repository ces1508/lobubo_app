import React, { PureComponent } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import Api from '../../api'
import ProductItem from '../../components/product'
import { connect } from 'react-redux'
import { makeFavorite, setSingleFavorite } from '../../ducks/favorites'
import { addProductToCart } from '../../ducks/shoppingCart'
import styles from './styles'
import Product from './product'
import ViewWrapper from '../../components/ViewWithNavbarAnimated'
import ShareIcon from '../../components/share'
import ShoppingCartIcon from '../../components/shoppingCartIcon'

const mapStateToProps = state => ({
  token: state.user.token,
  favorites: state.favorites.currentFavorites,
  adding: state.shoppingCart.adding
})
const mapDispatchToProps = { makeFavorite, setSingleFavorite, addProductToCart }

class ProductScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this._handleFavorite = this._handleFavorite.bind(this)
    this.getSimilar = this.getSimilar.bind(this)
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
      }, this.getSimilar)
    } else {
      this.setState({
        loading: false,
        product: this.props.navigation.getParam('product')
      }, this.getSimilar)
    }
  }
  async getSimilar () {
    let similar = await Api.getSimilarProducts(this.state.product.id) // get similar products from server
    // save response from server in local state
    this.setState({ similar: similar.data.data })
  }
  _handleFavorite () {
    if (!this.props.token) return this.props.navigation.navigate('login')
    let product = this.state.product
    this.props.makeFavorite(product, this.props.favorites.get(`${product.type}${product.id}`))
  }

  /**
   * initialized method addToCart
    * @param product, the param product should be a object
    * this method allow add a single product to shopping cart
  */

  async addToCart (product) {
    // if (!this.props.token) return this.props.navigation.navigate('login') // validate if user is logged
    let { adding } = this.props // get adding to local state
    if (!adding) { // validate if already exists a request to add
      this.props.addProductToCart(product, this.props.token)
    }
  }
  render () {
    let { loading, error, product } = this.state
    if (this.state.loading) return <ActivityIndicator size='large' />
    if (!loading && error) {
      return (
        <View>
          <Text>
            {error.type === 'NOT_FOUND' ? 'No hemos encontrado el producto' : 'estamos presentando problemas, por favor intenta mas tarde'}
          </Text>
        </View>
      )
    }
    let optionsToShare = {
      message: `${this.state.product.attributes.name} $ ${this.state.product.attributes.price}`,
      title: `${this.state.product.attributes.name} $ ${this.state.product.attributes.price}`,
      url: `https://lobubo.com/ecommerce/product/${this.state.product.id}`
    }
    return (
      <ViewWrapper
        navigation={this.props.navigation}
        rightIcon={<View style={{ flexDirection: 'row', marginRight: 5 }}>
          <ShareIcon options={optionsToShare} />
          <ShoppingCartIcon navigation={this.props.navigation} />
        </View>}>
        <Product
          favorites={this.props.favorites}
          handleFavorite={this._handleFavorite}
          product={product}
          adding={this.props.adding}
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
      </ViewWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
