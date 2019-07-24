import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../../Theme'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

const AlertScan = props => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.header, props.type !== 'success' ? props.type === 'error' ? styles.error : styles.notStock : null]}>
        {props.title}
      </Text>
      {props.type !== 'success' ? <Icons name='emoticon-sad-outline' size={200} /> : <Image resizeMode='contain' style={styles.image} source={{ uri: props.image }} />}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => props.navigation.navigate('products')}>
          <Icons name='home' color='#fff' size={20} />
          <Text style={styles.actionTitle}>Volver al Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.rightButton}
          style={[styles.action, { backgroundColor: Theme.colors.secondary }]}>
          <Icons name='qrcode-scan' color='#fff' size={20} />
          <Text style={styles.actionTitle}>Escanear otro codigo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

AlertScan.propTypes = {
  type: PropTypes.oneOf(['success', 'not_found', 'error']).isRequired,
  product: PropTypes.object,
  rightButton: PropTypes.func,
  title: PropTypes.string
}
AlertScan.defaultProps = {
  type: 'success',
  rightButton: () => null
}

export default AlertScan

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.colors.gray,
    borderWidth: 1,
    width: '85%',
    backgroundColor: 'white',
    zIndex: 10
  },
  header: {
    paddingVertical: 15,
    backgroundColor:
    Theme.colors.gray,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
  image: {
    width: 200,
    height: 200
  },
  actions: {
    flexDirection: 'row'
  },
  action: {
    width: '50%',
    backgroundColor: Theme.colors.primary,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionTitle: {
    color: '#fff',
    marginLeft: 8
  },
  notStock: {
    backgroundColor: Theme.colors.info
  },
  error: {
    backgroundColor: Theme.colors.warning
  }
})
