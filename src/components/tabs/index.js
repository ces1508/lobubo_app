import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Theme from '../../Theme'
import PropTypes from 'prop-types'

export default class Tabs extends Component {
  constructor (props) {
    super(props)
    this._renderHeader = this._renderHeader.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }
  _handleChange (tab) {
    this.setState({ currentTab: tab }, this.props.onChange(tab))
  }
  _renderHeader () {
    let { value } = this.props
    return this.props.tabs.map(tab => (
      <TouchableOpacity style={styles.tabContainer} key={tab} onPress={() => this._handleChange(tab)}>
        <View style={styles.tab}>
          <Text
            style={[
              styles.tabText,
              value === tab ? styles.tabActive : null
            ]}>{tab.toUpperCase()}</Text>
          <View style={[styles.seeker, value === tab ? styles.seekerActive : {}
          ]} />
        </View>
      </TouchableOpacity>
    ))
  }
  render () {
    return (
      <View>
        <View style={styles.header}>
          {this._renderHeader()}
        </View>
      </View>
    )
  }
}

Tabs.propsTypes = {
  tabs: PropTypes.array.isRequired,
  onChange: PropTypes.func
}
Tabs.defaultProps = {
  onChange: () => null,
  tabs: []
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 2,
    height: 50
  },
  tabContainer: {
    width: '50%'
  },
  tab: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seeker: {
    position: 'absolute',
    width: 0,
    bottom: -3,
    height: 4
  },
  tabText: {
    color: Theme.colors.gray,
    fontSize: 12,
    letterSpacing: 1.2
  },
  tabActive: {
    fontSize: 15,
    color: Theme.colors.primary
  },
  seekerActive: {
    width: 30,
    backgroundColor: Theme.colors.primary
  }
})
