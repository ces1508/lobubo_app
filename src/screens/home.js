import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Carousel from '../components/carousel'
import Product from '../components/product'
import listHOC from '../components/list'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/products'

const mapStateToProps = state => ({ data: state.products.data })
const mapDispatchToProps = { getProducts }
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.renderListHeader = this.renderListHeader.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.loadData = this.loadData.bind(this)
    this._handleTabChange = this._handleTabChange.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.data !== this.props.data
  }
  loadData () {
    this.props.getProducts({ page: 1 })
  }
  _handleTabChange (value) {
    this.setState({ currentTab: value }, () => this.loadData())
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
