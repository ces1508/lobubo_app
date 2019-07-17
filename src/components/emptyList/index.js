import React from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import Theme from '../../Theme'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const EmptyComponent = props => {
  if (props.isLoading) {
    return (
      <View>
        <ActivityIndicator size='large' color={Theme.colors.primary} />
      </View>
    )
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Icon name='package-variant' size={100} />
      <Text>no hemos obtenido resultados :'(</Text>
    </View>
  )
}

export default EmptyComponent

EmptyComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
EmptyComponent.defaultProps = {
  isLoading: true
}
