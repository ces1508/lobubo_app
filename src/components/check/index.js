import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Check = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View style={[styles.check, props.isChecked ? styles.checked : {}]}>
      {props.isChecked ? <Icon name='check' size={25} color='green' /> : null}
    </View>
    <Text>{props.title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  check: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    borderColor: 'green'
  }
})

Check.propTypes = {
  onPress: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}
Check.defaultProps = {
  isChecked: false
}

export default Check
