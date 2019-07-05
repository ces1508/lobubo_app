import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import QR from 'react-native-qrcode-scanner'
import Api from '../api'
import { connect } from 'react-redux'

class QrReaderScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.renderAlert = this.renderAlert.bind(this)
    this._handleReader = this._handleReader.bind(this)
  }

  async _handleReader (data) {
    data = JSON.parse(data)
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
      <View>
        <TouchableOpacity onPress={this._handleReader} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
        {/* <QR
          onRead={this._handleReader}
          topContent={
            <Text style={styles.centerText}>
              Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
              on your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity onPress={this._handleReader} style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        /> */}
      </View>
    )
  }
}

export default connect()(QrReaderScreen)

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
})
