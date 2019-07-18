import React, { Component } from 'react'
import { View, Text, Alert, FlatList } from 'react-native'
import InputFilter from '../components/inputFilter'
import Api from '../api'
import Product from '../components/product'
import Location from '../components/location'
import Checkbox from '../components/check'

export default class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      word: '',
      q: '',
      isSearching: false,
      results: [],
      data: [],
      filters: {
        products: true,
        locations: true
      }
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.getResults = this.getResults.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.header = this.header.bind(this)
  }
  handleTextChange (value) {
    this.setState({ word: value })
    this.getResults(value)
  }
  async getResults () {
    if (!this.state.isSearching) {
      this.setState({ isSearching: true })
      let data = await Api.filter(this.state.q)
      if (!data.error) {
        if (data.data.data) {
          this.setState({ isSearching: false, data: data.data.data }, this.applyFilters)
          if (this.state.q !== this.state.word) {
            this.setState({ q: this.state.word })
            return this.getResults()
          }
        }
        this.setState({ isSearching: false, q: this.state.word })
      } else {
        this.setState({ isSearching: false, q: this.state.word })
        return Alert.alert('Upps :/', 'we sorry, we have errors')
      }
    }
  }
  renderItem ({ item }) {
    if (item.type === 'locations') {
      return <Location location={item} navigation={this.props.navigation} />
    }
    return <Product {...item} navigation={this.props.navigation} />
  }
  applyFilters () {
    let { filters, data } = this.state
    this.setState({
      results: data.filter(item => {
        if (filters.products && filters.locations) return item
        if (!filters.products && filters.locations) return item.type !== 'products'
        if (!filters.locations && filters.products) return item.type !== 'locations'
        return false
      })
    })
  }
  header () {
    let { filters } = this.state
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <InputFilter value={this.state.word} onChangeText={this.handleTextChange} />
        <Text style={{ alignSelf: 'center', paddingVertical: 10 }}>¿Qué estás buscando?</Text>
        <View style={{ flexDirection: 'row', paddingVertical: 10, marginLeft: 20 }}>
          <Checkbox
            title='Productos'
            isChecked={filters.products}
            onPress={() => this.setState({ filters: { ...filters, products: !filters.products } }, this.applyFilters)} />
          <Checkbox
            title='Lugares'
            isChecked={filters.locations}
            onPress={() => this.setState({ filters: { ...filters, locations: !filters.locations } }, this.applyFilters)} />
        </View>
      </View>
    )
  }

  render () {
    return (
      <FlatList
        style={{ marginBottom: 5 }}
        ListHeaderComponent={this.header}
        stickyHeaderIndices={[0]}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}
        data={this.state.results}
        renderItem={this.renderItem}
      />
    )
  }
}
