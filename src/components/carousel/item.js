import React from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Theme from '../../Theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Price from '../price'

const CarouselItem = props => {
  let { price, name, distance, brand, image } = props
  console.log(props)
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground resizeMode='stretch' source={{ uri: image.original.url }} style={styles.image}>
        <View style={styles.containerDistance}>
          <Icons name='car' color='#fff' size={20} />
          <Text style={[styles.distance, styles.textColor]}>
            a {Math.round(distance)} kilometros de ti
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={[styles.price, styles.textColor]}>
            Desde <Price value={price} />
          </Text>
          <Text style={[styles.title, styles.textColor]} numberOfLines={3}>{name}</Text>
          <Text style={[styles.textColor, styles.brand]} numberOfLines={3}>
            por {brand.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 5,
    width: '99%'
  },
  containerDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary,
    paddingLeft: 5
  },
  image: {
    overflow: 'hidden',
    paddingLeft: 15,
    paddingVertical: 15,
    height: 200,
    borderRadius: 5,
    width: '100%'
  },
  textColor: {
    color: Theme.colors.white
  },
  distance: {
    fontSize: 14,
    marginLeft: 7
  },
  price: {
    fontSize: 17
  },
  title: {
    width: '85%',
    marginTop: 5,
    fontSize: 25
  },
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  brand: {
    marginTop: 10
  }
})

CarouselItem.propTypes = {
  price: PropTypes.number,
  distance: PropTypes.number,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
}
CarouselItem.defaultProps = {
  handleClick: () => console.warn('please send prop handleClick to overwrite this behavior')
}

export default CarouselItem
