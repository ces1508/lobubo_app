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
  // method to handle input
  handleTextChange (value) {
    this.setState({ word: value }) // save input value in local state
    if (!this.state.isSearching) {
      this.getResults()
    }
  }

  // function to make request
  async getResults () {
    this.setState({ isSearching: true, q: this.state.word }) // set local state to don't have more than one request
    let data = await Api.filter(this.state.q)
    if (!data.error) { // validate if server doesn't response with a error
      if (data.data.data) { // validate if sever response with a valid data
        // save server response in local state, and when state will be saved call method to apply filters
        this.setState({ isSearching: false, data: data.data.data }, this.applyFilters)
        if (this.state.q !== this.state.word) { // validate if word sended to server is different to word in current state
          return this.getResults() // call it self
        }
      }
      this.setState({ isSearching: false })
    } else {
      /*
        make local state q equal to  local state word.
        local state q will be send to server to get results from that letter or word
      */
      this.setState({ isSearching: false, q: this.state.word }) // set new searching and q
      return Alert.alert('Upps :/', 'we sorry, we have errors') // send alert when server response with a error
    }
  }
  renderItem ({ item }) {
    if (item.type === 'locations') { // validate if item to render is a location if is a location, render component Location
      return <Location location={item} navigation={this.props.navigation} />
    }
    return <Product {...item} navigation={this.props.navigation} /> // render component Product
  }

  applyFilters () {
    let { filters, data } = this.state // get  current filters, and data from local state
    // apply filters to and saved results in local state, this results will be rendered in screen
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
