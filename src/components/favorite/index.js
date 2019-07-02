import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../../Theme'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

const FavoriteIcon = props => (
  <TouchableWithoutFeedback>
    <View
      style={[
        styles.container,
        props.style,
        props.isFavorite ? styles.isFavorite : {}
      ]}>
      <Icons name='heart' size={12} color={Theme.colors.white} />
    </View>
  </TouchableWithoutFeedback>
)

export default FavoriteIcon

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  isFavorite: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary
  }
})
