import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  View,
  FlatList
} from 'react-native'
import Theme from '../../Theme'

export default function List (refreshData, newData) {
  return class List extends PureComponent {
    constructor (props) {
      super(props)
      this.state = {
        isLoading: true,
        loadingMore: false,
        refreshing: false,
        error: false
      }
      this._renderFooter = this._renderFooter.bind(this)
      this._handlePaginate = this._handlePaginate.bind(this)
      this._handleRefresh = this._handleRefresh.bind(this)
    }
    _renderFooter () {
      let { loadingMore } = this.state
      if (loadingMore) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='small' color={Theme.colors.primary} />
          </View>
        )
      }
      return null
    }
    _handlePaginate () {
      if (this.state.pages > 0 && typeof newData === 'function') {
        return newData()
      }
    }
    async _handleRefresh () {
      this.setState({ refreshData: true })
      let data = await refreshData()
      if (!data.error) {
        return this.setState({ data, refreshData: false })
      }
      this.setState({ error: true, refreshData: false })
    }
    render () {
      // if (this.state.isLoading) {
      //   return (
      //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      //       <ActivityIndicator size='large' color={Theme.colors.primary} />
      //     </View>
      //   )
      // }
      return (
        <FlatList
          keyExtractor={item => item.id}
          onEndReached={this._handlePaginate}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._renderFooter}
          {...this.props} />
      )
    }
  }
}
