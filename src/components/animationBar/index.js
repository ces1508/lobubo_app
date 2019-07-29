import React, { PureComponent } from 'react'
import {
  Text,
  Animated,
  Platform,
  StyleSheet,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class AnimationBar extends PureComponent {
  _renderLeftIcon () {
    if (this.props.renderLeftIcon) return this.props.leftIcon()
    if (!this.props.navigation.isFirstRouteInParent()) {
      return <Icon
        name='arrow-left'
        size={30}
        style={styles.leftIcon}
        onPress={() => this.props.navigation.goBack()} />
    }
  }
  render () {
    const position = this.props.position
    const shadow = position.interpolate({
      inputRange: [60, 120],
      outputRange: [0, 4],
      extrapolate: 'clamp'
    })
    const color = position.interpolate({
      inputRange: [60, 120],
      outputRange: ['rgba(0, 0, 0, 0)', 'white'],
      extrapolate: 'clamp'
    })
    return (
      <Animated.View style={[styles.container, {
        backgroundColor: color,
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, .25)',
            shadowOffset: { height: shadow, width: shadow },
            shadowOpacity: 1,
            shadowRadius: 2
          },
          android: {
            elevation: shadow
          }
        })
      }]}>
        <View style={styles.bar}>
          {this._renderLeftIcon()}
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    left: 0,
    right: 0,
    zIndex: 20,
    position: 'absolute'

  },
  bar: {
    height: Platform.OS === 'android' ? 50 : 70,
    flexDirection: 'row',
    alignItems: 'center'
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1
  },
  leftIcon: {
    marginRight: 10,
    color: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  text: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  }
})
