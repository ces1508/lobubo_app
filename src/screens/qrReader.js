import React, { PureComponent } from 'react'
import { StyleSheet, Alert } from 'react-native'
import QR from 'react-native-qrcode-scanner'
import Api from '../api'
import { connect } from 'react-redux'
import { getShoppingCar } from '../ducks/shoppingCart'
const mapStateToProps = state => ({ token: state.user.token })
const mapDispatchToProps = { getShoppingCar }

class QrReaderScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.renderAlert = this.renderAlert.bind(this)
    this._handleReader = this._handleReader.bind(this)
  }

  componentWillMount () {
    if (!this.props.token) {
      this.props.navigation.navigate('login')
    }
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
    let addProduct = await Api.addProductToCart(productToAdd)
    if (!addProduct.error) {
      this.props.getShoppingCar()
      this.renderAlert('Felicidades', `se han agreado ${productToAdd.quantity} ${product.data.data.attributes.name}  al carro de compras`)
      return this.props.navigation.navigate('home')
    }
    this.renderAlert('Ups', 'estamos presentando problemas, por favor intenta mas tarde')
  }
  renderAlert (title, message) {
    return Alert.alert(title, message)
  }
  render () {
    return (
      <QR
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
