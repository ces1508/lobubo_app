import React, { PureComponent } from 'react'
import { StyleSheet, Alert } from 'react-native'
import QR from 'react-native-qrcode-scanner'
import Api from '../api'
import { connect } from 'react-redux'

class QrReaderScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.renderAlert = this.renderAlert.bind(this)
    this._handleReader = this._handleReader.bind(this)
  }

  async _handleReader (qr) {
    let data = JSON.parse(qr.data.trim())
    let product = {
      quantity: data.quantity || 1,
      product_id: data.id || 17,
      material: data.material || null,
      size: data.size || null,
      color: data.color || null,
      talla: data.talla || null
    }
    let addProduct = await Api.addProductToCart(product)
    if (!addProduct.error) {
      return this.renderAlert('Felicidades', 'el producto se ha agregado   satisfatoriamente')
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

export default connect()(QrReaderScreen)

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
})
