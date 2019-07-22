import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Alert, Dimensions } from 'react-native'
import Theme from '../../Theme'
import Price from '../price'
import FavoriteIcon from '../favorite'
import { makeFavorite } from '../../ducks/favorites'
import { connect } from 'react-redux'
import Rating from 'react-native-easy-rating'

const mapDispatchToProps = { makeFavorite }
const mapStateToProps = state => ({ favorites: state.favorites.currentFavorites, token: state.user.token })

const { width } = Dimensions.get('window')

const Product = props => {
  let isFavorite = props.favorites.get(`${props.type}${props.id}`)
  return (
    <TouchableWithoutFeedback
      style={{ position: 'relative', elevation: 6 }}
      onPress={() => props.navigation.push('product', { product: props.full })}>
      <View style={styles.container}>
        <Image
          resizeMode='stretch'
          style={styles.image}
          source={{ uri: props.attributes['image-data'].original.url }} />
        <View style={{ position: 'relative', paddingLeft: 8 }}>
          <Price
            style={styles.price}
            value={props.attributes.price || props.price}
            currency='COP' />
          <Text>{props.attributes.lastPrice}</Text>
          <Rating rating={props.attributes['reviews-score']} editable={false} iconHeight={10} iconWidth={10} />
          <Text>{props.attributes.name}</Text>
          {
            props.cardType !== 'similar'
              ? <Text>
                {`${props.attributes.locations[0].city}, ${props.attributes.locations[0].region}`}
              </Text>
              : null
          }
          <FavoriteIcon
            onPress={() => props.token ? props.makeFavorite(props, isFavorite) : Alert.alert('ups !', 'primero debes inicar sesion')}
            isFavorite={isFavorite}
            style={styles.icon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

Product.defaultProps = {
  price: 0,
  cardType: 'normal'
}
Product.propTypes = {
  cardType: PropTypes.oneOf(['normal', 'similar'])
}

const styles = StyleSheet.create({
  container: {
    width: (width - 30) / 2,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    borderRadius: 3,
    paddingBottom: 10,
    overflow: 'hidden'
  },
  image: {
    height: 180,
    overflow: 'hidden'
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
