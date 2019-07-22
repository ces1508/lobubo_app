import React, { Component } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import Input from '../components/input'
import Button from '../components/button'
import { connect } from 'react-redux'
import Api from '../api'
import { setUserProfile, setUserToken } from '../ducks/user'
import { getProducts } from '../ducks/products'
import { getShoppingCar } from '../ducks/shoppingCart'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../Theme'

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { setUserProfile, setUserToken, getProducts, getShoppingCar }

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordFocus: false,
      secureText: true
    }
    this.signIn = this.signIn.bind(this)
  }

  /**
    * initialize method signIn
    * this method allow start a session
    * this method get a token and save in phone through AsyncStorage
 */

  async signIn () {
    let { email, password } = this.state // get user information from local state
    if (email && password) { // validate if exits email and password
      let data = await Api.signIn({ email, password }) // send request to sever
      if (!data.error) { // validate if server response with a error
        // set userProfile in redux store
        this.props.setUserProfile({ ...data.data.data.attributes, ...data.data.data.subscriber_data })
        this.props.setUserToken(data.data.meta.authentication_token) // set auth token in redux store
        // get list of products, this is for refresh list of products with favorites
        this.props.getProducts({ page: 1 })
        this.props.getShoppingCar() // get shopping cart for current user
        return this.props.navigation.goBack() // send user to previous screen
      }
      // send information error sended from server
      return Alert.alert(
        'Error !',
        data.data.errors[0].detail || data.data.errors[0].details
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
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
            leftIcon={<Icons name='account' size={23} style={styles.icon} />}
            onChangeText={text => this.setState({ email: text })} />
          <Input
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholderTextColor='white'
            textContentType='password'
            placeholder='contraseña'
            secureTextEntry={this.state.secureText}
            leftIcon={<Icons name='key' size={20} style={styles.icon} />}
            rightIcon={<Icons style={styles.icon} name={this.state.secureText ? 'eye' : 'eye-off'} size={25} onPress={() => this.setState({ secureText: !this.state.secureText })} />} />
          <Button text='Ingresar' onPress={this.signIn} containerCustomStyle={{ borderRadius: 50, width: '100%' }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: Theme.colors.gray
  },
  form: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 15,
    elevation: 9
  },
  icon: {
    paddingHorizontal: 8
  }
})
