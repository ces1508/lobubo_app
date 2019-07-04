import React from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import Theme from '../../Theme'
import Price from '../price'
import FavoriteIcon from '../favorite'
import { makeFavorite } from '../../ducks/products'
import { connect } from 'react-redux'

const mapDispatchToProps = { makeFavorite }
const mapStateToProps = state => ({ favorites: state.products.favorites, token: state.user.token })

const Product = props => (
  <TouchableWithoutFeedback style={{ position: 'relative', elevation: 6 }}>
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
        <Text>
          {`${props.attributes.locations[0].city}, ${props.attributes.locations[0].region}`}
        </Text>
        <FavoriteIcon
          onPress={() => props.token ? props.makeFavorite(props.id, props.favorites.get(props.id)): Alert.alert('ups !', 'primero debes inicar sesion')}
          isFavorite={props.favorites.get(props.id)}
          style={styles.icon} />
      </View>
    </View>
  </TouchableWithoutFeedback>
)

export default connect(mapStateToProps, mapDispatchToProps)(Product)

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    borderRadius: 3,
    paddingBottom: 10,
    flex: 1,
    margin: 10,
    overflow: 'hidden'
  },
  image: {
    height: 180,
    overflow: 'hidden',
    width: '100%'
  },
  price: {
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    top: -15,
    right: 5
  }
})
