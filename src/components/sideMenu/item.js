import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import Theme from '../../Theme'

const MenuItem = props => (
  <TouchableOpacity onPress={props.onPress} style={[styles.menuItem, props.customContainerStyle]}>
    {props.iconComponent
      ? props.iconComponent()
      : <Icons
        name={props.icon}
        color={props.iconColor}
        style={props.customIconStyle}
        size={props.iconSize} />
    }
    <Text
      style={[styles.menuItemText, props.customTitleStyle]}>
      {props.title}
    </Text>
  </TouchableOpacity>
)

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconComponent: PropTypes.func
}

MenuItem.defaultProps = {
  onPress: () => null,
  iconSize: 25,
  iconColor: Theme.colors.secondary
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 20,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Theme.colors.white
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default MenuItem
