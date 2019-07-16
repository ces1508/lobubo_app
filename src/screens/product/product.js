import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import Price from '../../components/price'
import Theme from '../../Theme'
import Rating from 'react-native-easy-rating'
import Numeric from 'react-native-numeric-input'
import Button from '../../components/button'
import ProductOption from './options'
// this component will be rendered in productScreen

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quantity: 1,
      sizeSelected: Array.isArray(this.props.product.attributes.sizes) ? this.props.product.attributes.sizes[0] : {},
      colorSelected: Array.isArray(this.props.product.attributes.colors) ? this.props.product.attributes.colors[0] : {},
      tallaSelected: Array.isArray(this.props.product.attributes.tallas) ? this.props.product.attributes.tallas[0] : {},
      materialSelected: Array.isArray(this.props.product.attributes.materials) ? this.props.product.attributes.materials[0] : {}
    }
  }
  buildOptions (options) {
    return options.map(option => {
      if (Array.isArray(option.list)) {
        return <ProductOption {...option} key={option.itemKey} />
      }
    })
  }
  _handleAddToCart = () => {
    let { product } = this.props
    let productToAdd = {
      product_id: product.id,
      quantity: this.state.quantity,
      color: this.state.colorSelected.name || null,
      material: this.state.materialSelected.material || null,
      size: this.state.sizeSelected.size || null,
      talla: this.state.tallaSelected.talla || null
    }
    this.props.handleAddToCart(productToAdd)
  }
  renderProductOptions () {
    let { attributes } = this.props.product
    let options = [{ list: attributes.sizes,
      title: 'Tamaño',
      itemKey: 'size',
      selected: this.state.sizeSelected,
      onChange: (value) => this.setState({ sizeSelected: value })
    },
    {
      list: attributes.tallas,
      title: 'Talla',
      itemKey: 'talla',
      selected: this.state.tallaSelected,
      onChange: (value) => this.setState({ tallaSelected: value })
    },
    {
      list: attributes.matarials,
      title: 'Material',
      itemKey: 'material',
      selected: this.state.materialSelected,
      onChange: (value) => this.setState({ materialSelected: value })
    },
    {
      list: attributes.colors,
      title: 'Color',
      itemKey: 'name',
      selected: this.state.colorSelected,
      type: 'color',
      onChange: (value) => this.setState({ colorSelected: value })
    }]
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        {this.buildOptions(options)}
      </View>
    )
  }
  render () {
    let { product, favorites, adding } = this.props
    return (
      <View>
        <Image resizeMode='stretch' source={{ uri: product.attributes['image-data'].original.url }} style={{ height: 300 }} />
        <View style={styles.container}>
          <View style={[styles.sectionTitle, styles.section]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textEmphasis}>{product.attributes.name}</Text>
              <Rating rating={product.attributes['reviews-score']} editable={false} iconHeight={10} iconWidth={10} />
              <Text>By: {product.attributes.brand.name}</Text>
              <Price style={[styles.textEmphasis, styles.price]} value={product.attributes.price} />
            </View>
            <Icons
              onPress={this.props.handleFavorite}
              name='heart'
              size={30}
              color={favorites.get(`${product.type}${product.id}`) ? Theme.colors.primary : 'gray'}
            />
          </View>
          {
            product.attributes.quantity >= 1
              ? <View>
                <View style={[styles.section, { alignItems: 'center' }]}>
                  {this.renderProductOptions()}
                  <Numeric totalWidth={200} totalHeight={50} rounded onChange={value => this.setState({ quantity: value })} minValue={1} value={this.state.quantity} maxValue={product.attributes.quantity} />
                </View>
                <Button text={adding ? 'AGREGANDO PRODUCTO ...' : 'AGREGAR AL CARRITO'} onPress={this._handleAddToCart} />
              </View>
              : <Text style={styles.textEmphasis}>Éste Producto se está agotado</Text>
          }
          <View style={styles.section}>
            <Text>{product.attributes.description}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Product

Product.defaultProps = {
  product: { attributes: {} }
}
