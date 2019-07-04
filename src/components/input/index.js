import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Input = props => (
  <View style={styles.container}>
    {props.icon}
    <TextInput
      ref={props.customRef}
      {...props}
      style={[styles.input, props.customStyle]}
    />
  </View>
)

export default Input

Input.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  label: PropTypes.string,
  customStyle: PropTypes.object

}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    marginVertical: 10
  },
  input: {
    color: 'white'
  }
})
