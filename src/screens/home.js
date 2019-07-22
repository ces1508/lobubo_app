import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Carousel from '../components/carousel'
import Product from '../components/product'
import listHOC from '../components/list'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/products'
import Empty from '../components/emptyList'

const mapStateToProps = state => ({ data: state.products.data, isLoading: state.products.isLoading })
const mapDispatchToProps = { getProducts }
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.renderListHeader = this.renderListHeader.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.data !== this.props.data
  }
  /**
   * this method dispatch to redux a to get products from api
   */
  loadData () {
    // get products from server, if you want set page, send a object with query params
    this.props.getProducts({ page: 1 })
  }
  componentDidMount () {
    this.loadData()
  }
  renderListHeader () {
    return (
      <View style={styles.header}>
        <Carousel />
      </View>
    )
  }
  renderContent () {
    let ProductList = listHOC(this.loadData)
    return (
      <ProductList
        ListEmptyComponent={() => <Empty isLoading={this.props.isLoading} />}
        extraData={this.state}
        ListHeaderComponent={() => this.renderListHeader()}
        style={{ flex: 1 }}
        data={this.props.data}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}
        renderItem={({ item }) => <Product {...item} full={item} navigation={this.props.navigation} />}
      />
    )
  }
  render () {
    return this.renderContent()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 10
  },
  buttonSection: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
