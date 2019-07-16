import React, { Component } from 'react'
import { View } from 'react-native'
import list from '../components/list'
import Item from '../components/product'
import { connect } from 'react-redux'
import { getServices } from '../ducks/services'
import Carousel from '../components/carousel'

const mapStateToProps = state => ({ data: state.services.data, isLoading: state.services.isLoading })
const mapDispatchToProps = {
  getServices
}

class ServicesScreen extends Component {
  componentWillMount () {
    this.props.getServices({})
  }
  render () {
    console.log('propierties ', this.props)
    let ListServices = list(() => this.props.getServices({}))
    return (
      <ListServices
        ListHeaderComponent={() => <View style={{ paddingHorizontal: 10 }}><Carousel /></View>}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}
        numColumns={2}
        renderItem={({ item }) => <Item {...item} full={item} navigation={this.props.navigation} />}
        data={this.props.data}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen)
