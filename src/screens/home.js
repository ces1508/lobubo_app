import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Carousel from '../components/carousel'
import Button from '../components/button'
import Tabs from '../components/tabs'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../Theme'
import Product from '../components/product'
import listHOC from '../components/list'
import Api from '../api'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: ['productos', 'servicios'],
      currentTab: 'productos'
    }
    this.renderListHeader = this.renderListHeader.bind(this)
    this.renderContent = this.renderContent.bind(this)
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
        <Tabs tabs={this.state.tabs} onChange={value => this.setState({ currentTab: value })} value={this.state.currentTab} />
      </View>
    )
  }
  renderContent () {
    let ProductList = listHOC(() => this.state.currentTab === 'productos' ? Api.getProducts({ page: 1 }) : Api.getServices({ page: 1 }))
    return (
      <ProductList
        ListHeaderComponent={this.renderListHeader}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrappedStyle={{ marginHorizontal: 10 }}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => <Product {...item} />}
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
