import React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import Theme from '../../Theme'
import FavoriteIcon from '../favorite'
import { makeFavorite } from '../../ducks/favorites'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')
const mapDispatchToProps = { makeFavorite }
const mapStateToProps = state => ({ favorites: state.favorites.currentFavorites, token: state.user.token })

const BrandItem = props => {
  let { attributes } = props
  let isFavorite = props.favorites.get(`${props.type}${props.id}`)
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode='stretch'
        source={{ uri: attributes.logo.original.url }} />
      <View style={styles.information}>
        <FavoriteIcon
          style={{ top: -15, right: 0, position: 'absolute', zIndex: 10 }}
          onPress={() => props.makeFavorite(props, isFavorite)}
          isFavorite={isFavorite}
        />
        <Text numberOfLines={1} style={styles.name}>{attributes.name}</Text>
        <Text style={styles.address}>{attributes.region}/{attributes.city}</Text>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandItem)

const styles = StyleSheet.create({
  container: {
    width: (width - 30) / 2,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    borderRadius: 3,
    paddingBottom: 10,
    overflow: 'hidden'
  },
  logo: {
    height: 180
  },
  information: {
  },
  name: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  address: {
    fontWeight: '100'
  }
})
