import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputFilter = props => (
  <View style={styles.container}>
    <Icon name='magnify' size={25} style={styles.icon} />
    <TextInput
      clearButtonMode='while-editing'
      {...props}
      style={styles.input} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: '#fbfcfc',
    alignItems: 'center'
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d5dbdb',
    flex: 1,
    paddingLeft: 40
  },
  icon: {
    position: 'absolute',
    left: 20
  }
})

export default InputFilter
