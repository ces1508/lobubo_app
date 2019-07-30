import React, { PureComponent } from 'react'
import {
  Text,
  Animated,
  Platform,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Header } from 'react-navigation'

export default class Base extends PureComponent {
  componentWillMount () {
    let { startAnimationAt, endAnimationAt, startColor, endColor } = this.props
    // create animations
    let position = this.props.position // this var get position on eje Y of screen
    // animate color of bar
    this.animatedHeight = position.interpolate({
      inputRange: [startAnimationAt, endAnimationAt],
      outputRange: [Header.HEIGHT, 0],
      extrapolate: 'clamp'
    })
    this.animateColor = position.interpolate({
      inputRange: [startAnimationAt, endAnimationAt],
      outputRange: [startColor, endColor],
      extrapolate: 'clamp'
    })
    this.animatedShadow = position.interpolate({
      inputRange: [startAnimationAt, endAnimationAt],
      outputRange: [0, 4],
      extrapolate: 'clamp'
    })
  }
  _renderLeftIcon () {
    if (this.props.leftIcon) {
      return typeof this.props.leftIcon === 'function' ? this.props.leftIcon() : this.props.leftIcon
    }
    if (!this.props.navigation.isFirstRouteInParent()) {
      return <Icon
        name='arrow-left'
        size={30}
        style={styles.leftIcon}
        onPress={() => this.props.navigation.goBack()} />
    }
  }
  render () {
    let { type } = this.props
    let isNormal = type === 'normal'
    return (
      <Animated.View style={[styles.container, {
        backgroundColor: isNormal ? this.animateColor : '#fff',
        position: isNormal ? 'absolute' : 'relative',
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0,0,0, .25)',
            shadowOffset: { height: isNormal ? this.animatedShadow : 4, width: isNormal ? this.animatedShadow : 4 },
            shadowOpacity: 1,
            shadowRadius: 2
          },
          android: {
            elevation: isNormal ? this.animatedShadow : 4
          }
        })
      }]}>
        <Animated.View
          style={[styles.bar, type === 'hide' ? { height: this.animatedHeight } : null]}>
          {this._renderLeftIcon()}
          <Text style={styles.text}>{this.props.title}</Text>
          {this.props.rightIcon}
        </Animated.View>
        {
          type === 'hide' ? this.props.navBarChildren : null
        }
      </Animated.View>
    )
  }
}

Base.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  rightIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  startAnimationAt: PropTypes.number.isRequired,
  endAnimationAt: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['normal', 'hide'])
}
Base.defaultProps = {
  startAnimationAt: 0,
  endAnimationAt: 120,
  startColor: 'rgba(0, 0, 0, 0)',
  endColor: '#fff',
  type: 'normal'
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
    height: Header.HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
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
