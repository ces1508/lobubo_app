import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

import Theme from '../../Theme'
const { width } = Dimensions.get('window')
const LocationItem = props => {
  return (
    <View style={styles.location}>
      <Image
        style={styles.image}
        source={{ uri: props.location.attributes['brand-logo'].original.url }} />
      <Text>{props.location.attributes.name}</Text>
      <Text numberOfLines={3}>{props.location.attributes.description}</Text>
    </View>
  )
}

export default LocationItem

const styles = StyleSheet.create({
  location: {
    width: (width - 30) / 2,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    borderRadius: 3,
    paddingBottom: 10,
    overflow: 'hidden'
  },
  image: {
    height: 180
  }
})
