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
    this.data = [
      {
        distance: 31,
        name: 'Pañoleta leñador',
        price: 5900,
        image: 'https://fusemall.s3.us-west-2.amazonaws.com/uploads/product/slider_image_data/9/3f900f3d-8e1c-40c3-89ef-6f4c301f7b2f.png'
      },
      {
        distance: 31,
        name: 'Apps móviles',
        price: 30000000,
        image: 'https://fusemall.s3.us-west-2.amazonaws.com/uploads/product/slider_image_data/5/6c387914-46e0-4766-b890-7cf4a075036a.jpeg'
      },
      {
        distance: 21,
        name: 'Mesas de centro',
        price: 231000,
        image: 'https://fusemall.s3.us-west-2.amazonaws.com/uploads/product/slider_image_data/98/3691dc65-f7a1-42a6-bc57-2d9d512c62a7.jpeg'
      }
    ]
    this.renderListHeader = this.renderListHeader.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }
  renderListHeader () {
    return (
      <View style={styles.header}>
        <Carousel data={this.data} />
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
        style={{ marginVertical: 20 }}
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
