import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import Input from '../components/input'
import Button from '../components/button'
import { connect } from 'react-redux'
import Api from '../api'
import { setUserProfile, setUserToken } from '../ducks/user'
import { getProducts } from '../ducks/products'
import { getShoppingCar } from '../ducks/shoppingCart'
import Theme from '../Theme'

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { setUserProfile, setUserToken, getProducts, getShoppingCar }

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordFocus: false
    }
    this.signIn = this.signIn.bind(this)
  }

  async signIn () {
    let { email, password } = this.state
    if (email && password) {
      let data = await Api.signIn({ email, password })
      if (!data.error) {
        this.props.setUserProfile({ ...data.data.data.attributes, ...data.data.data.subscriber_data })
        this.props.setUserToken(data.data.meta.authentication_token)
        this.props.getProducts({ page: 1 })
        this.props.getShoppingCar()
        return this.props.navigation.goBack()
      }
      return Alert.alert(
        'Error !',
        data.data.errors[0].detail || data.data.errors[0].details
      )
    }
  }

  render () {
    return (
      <View style={{ paddingHorizontal: 15, justifyContent: 'center', flex: 1, backgroundColor: Theme.colors.gray }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 25, borderRadius: 15, backgroundColor: Theme.colors.white, elevation: 9 }}>
          <View>
            <Text>Iniciar Sesion</Text>
            <Text>Hola de nuevo</Text>
          </View>
          <Input
            value={this.state.email}
            placeholder='correo electrónico'
            placeholderTextColor='white'
            textContentType='emailAddress'
            keyboardType='email-address'
            returnKeyType='next'
            onChangeText={text => this.setState({ email: text })} />
          <Input
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholderTextColor='white'
            textContentType='password'
            placeholder='contraseña' secureTextEntry />
          <Button text='Ingresar' onPress={this.signIn} containerCustomStyle={{ borderRadius: 50, width: '100%' }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
