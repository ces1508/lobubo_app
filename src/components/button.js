import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Theme from '../Theme'

const Button = props => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={[
      styles.container,
      { width: props.width, height: props.height, backgroundColor: props.color },
      { ...props.containerCustomStyle }
    ]}>
    {props.children}
    <Text
      style={[styles.text, props.textCustomStyle]}>
      {props.text}
    </Text>
  </TouchableOpacity>
)
export default Button

Button.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  containerCustomStyle: PropTypes.object,
  textCustomStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired
}
Button.defaultProps = {
  color: Theme.colors.primary,
  onPress: () => null
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Theme.colors.white
  }
})
