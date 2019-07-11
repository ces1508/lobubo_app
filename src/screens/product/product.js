import React from 'react'
import { View, Text, Image } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import Price from '../../components/price'
import Theme from '../../Theme'
import Rating from 'react-native-easy-rating'
import Numeric from 'react-native-numeric-input'
import Button from '../../components/button'

const Product = props => {
  let { product, favorites, adding, quantity } = props
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
            onPress={props.handleFavorite}
            name='heart'
            size={30}
            color={favorites.get(`${product.type}${product.id}`) ? Theme.colors.primary : 'gray'}
          />
        </View>
        {
          product.attributes.quantity >= 1
            ? <View>
              <View style={[styles.section, { alignItems: 'center' }]}>
                <Numeric totalWidth={200} totalHeight={50} rounded onChange={props.handleQuantity} minValue={1} value={quantity} maxValue={product.attributes.quantity} />
              </View>
              <Button text={adding ? 'AGREGANDO PRODUCTO ...' : 'AGREGAR AL CARRITO'} onPress={props.handleAddToCart} />
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

export default Product
