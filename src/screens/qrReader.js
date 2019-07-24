import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Api from '../api'
import { connect } from 'react-redux'
import { getShoppingCar, setItemsInShoppingCart, addProductToCart } from '../ducks/shoppingCart'
import AlertScan from '../components/alertScan'
import QrScan from '../components/qrReader'
import { RNCamera } from 'react-native-camera'
import { withNavigationFocus } from 'react-navigation'

const mapStateToProps = state => ({ token: state.user.token })
const mapDispatchToProps = { getShoppingCar, setItemsInShoppingCart, addProductToCart }
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
    this.saveProductInLocal = this.saveProductInLocal.bind(this)
    this.camera = null
  }

  /**
   *  initialized method _handleReader
   * this method get qr information, note: qr data should be a object
   * @param {qr} object
   *
   * param qr is object, it is necessary that he has the property data
   * @param {qr.data} string
   * qr.data is a string, you need convert this is a object, you can used JSON.parse

   */

  _handleReader (qr) {
    let { scanned } = this.state // validate if already scanned
    if (!scanned) {
      let data = JSON.parse(qr.data)
      this.setState({ scanned: true }) // set scanned in true, this var allow to know is already exits a request to decode a qr code
      this.getProduct(data) // send qr data to method get Product
    }
  }

  /**
   *  initialize method getProduct
   *  this product get product from server
   * @param {json} data
   * data should have next structure
   *  {
   *    id: product id.
   *    quantity: number of products to add,
   *    material: a valid material from product,
   *    color: a valid color from product,
   *    talla: a valid talla from product
   * }
   */
  async getProduct (data) {
    let product = await Api.getProduct(data.id) // send request to server
    if (product.error) { // validate if server response with a error
      if (product.data.errors[0].status >= 404) { // validate if product doesn't exists
        // change state to render alert with custom message from error 404
        return this.setState({ alert: { type: 'not_found', title: 'Ups, no hemos encontrado el producto :/' } })
      } else {
        // change state to render alert with custom message
        return this.setState({ alert: { type: 'error', title: 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/' } })
      }
    }
    return this.addToShoppingCart(data, product.data.data)
    // return this.sendAlert('warning', 'Para Agregar Al carrito primero debes inicar sesion')
  }
  /**
   *  initialized method addToShoppingCart
   * @param {json} data
   * @param {json} product
   *
   * this method build a object for send in a request to server and
   * render response to user
   *
   */
  async addToShoppingCart (data, product) {
    console.log('data', data)
    console.log('product', product)
    let productToAdd = { // build right format to send as request
      quantity: data.quantity || 1,
      product_id: product.id,
      material: data.material || null,
      size: data.size || null,
      color: data.color || null,
      talla: data.talla || null
    }
    if (product.quantity > 1) { // validate if product has stock to before add to shopping cart
      return this.sendAlert('out_stock', 'lo sentimos, ya se nos agotaron :/') // render alert if product doesn't exits
    }
    if (this.props.token) { // validate if exits token, to  send request to save item in cloud server
      let addProduct = await Api.addProductToCart(productToAdd) // send request to API to add product to shopping cart
      if (!addProduct.error) { // validate if server response with  error
        this.props.getShoppingCar() // dispatch redux action to get all products in shopping cart
        return this.sendAlert( // render alert. this alert show product name, product image, and quantity added
          'success',
          `se ha agregado ${product.attributes.name} X ${productToAdd.quantity}`,
          product.attributes['image-data'].original.url
        )
      }
      return this.sendAlert('error', 'Lo sentimos, estamos presentando problemas, intenta mas tarde :/')
    }
    this.saveProductInLocal(product, productToAdd) // save shoppingCart in local database
  }

  saveProductInLocal (product, productToAdd) {
    let formatProduct = {
      id: product.id,
      attributes: {
        ...productToAdd,
        product: {
          ...product.attributes,
          'image_data': {
            url: product.attributes['image-data'].original.url
          }
        }
      }
    }
    this.props.addProductToCart(formatProduct, false)
    return this.sendAlert( // render alert. this alert show product name, product image, and quantity added
      'success',
      `se ha agregado ${product.attributes.name} X ${formatProduct.attributes.quantity}`,
      product.attributes['image-data'].original.url
    )
  }
  sendAlert (type, title, image) {
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
    const isFocused = this.props.navigation.isFocused()
    if (isFocused) {
      return (
        <RNCamera
          autoFocus
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

// inject props focused, this is for fix bug camera black screen when change tab
const ViewWhiteFocus = withNavigationFocus(QrReaderScreen)
export default connect(mapStateToProps, mapDispatchToProps)(ViewWhiteFocus)

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
})
