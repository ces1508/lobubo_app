import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Dimensions
} from 'react-native'
import Theme from '../../Theme'
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('screen')

export default class QRReader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0)
    }
    this.animation = this.animation.bind(this)
  }
  animation () {
    let { animation } = this.state
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 3500
      }),
      Animated.timing(animation, {
        toValue: 2,
        duration: 3500
      })
    ]).start(() => this.animation())
  }
  componentDidMount () {
    this.animation()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Escanea el Código QR</Text>
        <View style={styles.qrMarker}>
          <Animated.View style={[styles.line, { transform: [{
            translateY: this.state.animation.interpolate({
              inputRange: [0, 1, 1, 2],
              outputRange: [0, 246, 246, 0]
            })
          }] }]} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height,
    width,
    borderTopWidth: (height / 2) - (Header.HEIGHT + 120),
    borderLeftWidth: (width / 2) - 120,
    borderRightWidth: (width / 2) - 120,
    borderBottomWidth: (height / 2) - (Header.HEIGHT + 7),
    borderColor: 'rgba(0, 0, 0, .5)'
  },
  qrMarker: {
    width: 240,
    height: 240,
    // borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Theme.colors.primary,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 5,
    top: -50,
    width: '100%',
    position: 'absolute'
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: Theme.colors.secondary
  }
})
