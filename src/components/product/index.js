import React from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Theme from '../../Theme'
import Price from '../price'
import FavoriteIcon from '../favorite'

const Product = props => (
  <TouchableWithoutFeedback style={{ position: 'relative' }}>
    <View style={styles.container}>
      <Image
        resizeMode='stretch'
        style={styles.image}
        source={{ uri: props.attributes['image-data'].original.url }} />
      <View style={{ position: 'relative', paddingLeft: 8 }}>
        <Price
          style={styles.price}
          value={props.attributes.price}
          currency='COP' />
        <Text>{props.attributes.lastPrice}</Text>
        <Text>{props.attributes.name}</Text>
        <Text>{props.attributes.location}</Text>
        <FavoriteIcon isFavorite style={styles.icon} />
      </View>
    </View>
  </TouchableWithoutFeedback>
)

export default Product

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    borderRadius: 3,
    overflow: 'hidden',
    paddingBottom: 10,
    flex: 1,
    margin: 10
  },
  image: {
    height: 180,
    width: '100%'
  },
  price: {
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    top: -15,
    right: 5,
    borderWidth: 1,
    borderColor: 'gray'
  }
})
