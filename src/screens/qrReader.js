import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import QR from 'react-native-qrcode-scanner'
import Api from '../api'
import { connect } from 'react-redux'
import { getShoppingCar } from '../ducks/shoppingCart'
import AlertScan from '../components/alertScan'

const mapStateToProps = state => ({ token: state.user.token })
const mapDispatchToProps = { getShoppingCar }
class QrReaderScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      product: null,
      scanned: false,
      alert: {
        title: 'success',
        type: 'success',
        image: ''
      }
    }
    this._handleReader = this._handleReader.bind(this)
  }

  async _handleReader (qr) {
    let data = JSON.parse(qr.data.trim())
    let productToAdd = {
      quantity: data.quantity || 1,
      product_id: data.id || 17,
      material: data.material || null,
      size: data.size || null,
      color: data.color || null,
      talla: data.talla || null
    }
    let product = await Api.getProduct(data.id)
    if (product.error) {
      if (product.data.errors[0].status >= 404) {
        return this.setState({ alert: { type: 'not_found', title: 'Ups, no hemos encontrado el producto :/' }, scanned: true })
      } else {
        return this.setState({ alert: { type: 'error', title: 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/' }, scanned: true })
      }
    }
    product = product.data.data
    if (product.quantity > 1) {
      return this.setState({ alert: { type: 'out_stock', title: `lo sentimos, ya se nos agotaron :/` }, scanned: true })
    }
    let addProduct = await Api.addProductToCart(productToAdd)
    if (!addProduct.error) {
      this.props.getShoppingCar()
      return this.setState({
        alert: {
          type: 'success',
          title: `se ha agregado ${product.attributes.name} X ${productToAdd.quantity}`,
          image: product.attributes['image-data'].original.url
        },
        scanned: true })
    }
    this.setState({ alert: { type: 'error', title: 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/' }, scanned: true })
  }
  render () {
    return (
      <QR
        ref={scan => { this.scanner = scan }}
        showMarker
        customMarker={this.state.scanned ? <AlertScan {...this.state.alert} navigation={this.props.navigation} rightButton={() => {
          this.setState({ scanned: false })
          this.scanner.reactivate()
        }} /> : null}
        cameraStyle={styles.camera}
        onRead={this._handleReader}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QrReaderScreen)

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
})
