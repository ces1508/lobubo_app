import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
// import QR from 'react-native-qrcode-scanner'
import Api from '../api'
import { connect } from 'react-redux'
import { getShoppingCar } from '../ducks/shoppingCart'
import AlertScan from '../components/alertScan'
import QrScan from '../components/qrReader'
import { RNCamera } from 'react-native-camera'
import { withNavigationFocus } from 'react-navigation'

const mapStateToProps = state => ({ token: state.user.token })
const mapDispatchToProps = { getShoppingCar }
class QrReaderScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: null,
      scanned: false,
      alert: {
        title: 'success',
        type: 'success',
        image: ''
      },
      showAlert: false
    }
    this._handleReader = this._handleReader.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.addToShoppingCart = this.addToShoppingCart.bind(this)
    this.sendAlert = this.sendAlert.bind(this)
    this.camera = null
  }

  _handleReader (qr) {
    let { scanned } = this.state
    this.camera.reactivate()
    if (!scanned) {
      let data = JSON.parse(qr.data.trim())
      this.setState({ scanned: true })
      this.getProduct(data)
    }
  }
  async getProduct (data) {
    let product = await Api.getProduct(data.id)
    if (product.error) {
      if (product.data.errors[0].status >= 404) {
        return this.setState({ alert: { type: 'not_found', title: 'Ups, no hemos encontrado el producto :/' } })
      } else {
        return this.setState({ alert: { type: 'error', title: 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/' } })
      }
    }
    if (this.props.token) return this.addToShoppingCart(data, product)
    return this.sendAlert('warning', 'Para Agregar Al carrito primero debes inicar sesion')
  }
  async addToShoppingCart (data, product) {
    let productToAdd = {
      quantity: data.quantity || 1,
      product_id: data.id || 17,
      material: data.material || null,
      size: data.size || null,
      color: data.color || null,
      talla: data.talla || null
    }
    if (product.quantity > 1) {
      return this.sendAlert('out_stock', 'lo sentimos, ya se nos agotaron :/')
    }
    let addProduct = await Api.addProductToCart(productToAdd)
    if (!addProduct.error) {
      this.props.getShoppingCar()
      return this.sendAlert(
        'success',
        `se ha agregado ${product.attributes.name} X ${productToAdd.quantity}`,
        product.attributes['image-data'].original.url
      )
    }
    return this.sendAlert('error', 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/')
  }
  sendAlert (type, title, image) {
    console.log('send alert')
    this.setState({
      showAlert: true,
      alert: {
        type,
        title,
        image
      }
    })
  }
  render () {
    console.log('state ', this.state)
    const isFocused = this.props.navigation.isFocused()
    console.log('estamos en la vista esta de laa camara')
    if (isFocused) {
      return (
        <RNCamera
          onBarCodeRead={this._handleReader}
          ref={ref => {
            this.camera = ref
          }}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Necesitamos tu permiso para poder leer los codigos :D',
            buttonPositive: 'Aceptar',
            buttonNegative: 'Cancelar'
          }}
          style={[styles.camera, this.state.scanned ? { justifyContent: 'center', alignItems: 'center' } : null]}>
          {
            !this.state.scanned
              ? <QrScan />
              : this.state.showAlert
                ? <AlertScan {...this.state.alert} navigation={this.props.navigation} rightButton={() => this.setState({ scanned: false })} />
                : null
          }
        </RNCamera>
      )
    }
    return null
  }
}

const ViewWhiteFocus = withNavigationFocus(QrReaderScreen)
export default connect(mapStateToProps, mapDispatchToProps)(ViewWhiteFocus)

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
})
