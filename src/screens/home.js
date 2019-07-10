import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Carousel from '../components/carousel'
import Button from '../components/button'
import Tabs from '../components/tabs'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../Theme'
import Product from '../components/product'
import listHOC from '../components/list'
import { connect } from 'react-redux'
import { getProducts, getServices } from '../ducks/products'

const mapStateToProps = state => ({ data: state.products.data })
const mapDispatchToProps = { getProducts, getServices }
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: ['productos', 'servicios'],
      currentTab: 'productos'
    }
    this.renderListHeader = this.renderListHeader.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.loadData = this.loadData.bind(this)
    this._handleTabChange = this._handleTabChange.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.data !== this.props.data
  }
  loadData () {
    let { getProducts, getServices } = this.props
    let { currentTab } = this.state
    if (currentTab === 'productos') {
      return getProducts({ page: 1 })
    }
    getServices({ page: 1 })
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
        <View style={styles.buttonSection}>
          <Button text='Categorias' width='47%'>
            <Icons name='format-line-style' size={20} style={{ marginRight: 10 }} color='#fff' />
          </Button>
          <Button text='Localizar tienda' width='48%' height={50} color={Theme.colors.secondary}>
            <Icons name='map-marker' size={20} color='#fff' style={{ marginRight: 10 }} />
          </Button>
        </View>
        <Tabs tabs={this.state.tabs} onChange={this._handleTabChange} value={this.state.currentTab} />
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
