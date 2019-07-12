import React, { PureComponent } from 'react'
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import CityImage from '../../images/backgroun_city.png'
import Theme from '../../Theme'
import MenuItem from './item'
import { logout } from '../../ducks/user'
import Logo from '../../images/header_logo.svg'

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { logout }

class SideMenu extends PureComponent {
  handleLogout () {
    this.props.logout()
  }
  _handleClick (route = '') {
    let { navigation } = this.props
    navigation.closeDrawer()
    navigation.navigate(route)
  }
  renderContent () {
    if (this.props.user.token) {
      return this.renderWhitLogin()
    }
    return this.renderWithoutLogin()
  }
  renderWithoutLogin () {
    return (
      <View>
        <Text style={styles.registerMessage}>
          Que esperas para obtener los mejores productos, al mejor precio.
          Solo aqui en lobubo, Buscalo, compralo, recibelo y disfrutalo.
        </Text>
        <MenuItem icon='emoticon-excited-outline'title='Has Parte de nuestra comunidad' onPress={() => this._handleClick('login')} />
        <MenuItem customContainerStyle={styles.lastItem} icon='emoticon-excited-outline'title='Entrar' onPress={() => this._handleClick('login')} />
      </View>
    )
  }
  renderWhitLogin () {
    return (
      <View>
        <MenuItem icon='heart-outline' title='Favoritos' onPress={() => this._handleClick('favorites')} />
        <MenuItem title='Perfil' icon='face-profile' />
        <MenuItem title='Salir' icon='close-outline' iconColor='red' customContainerStyle={styles.lastItem} onPress={() => this.handleLogout()} />
      </View>
    )
  }
  render () {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Theme.colors.gray }}>
        <View style={{ flex: 1 }}>
          <ImageBackground style={{ backgroundColor: Theme.colors.gray, width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }} resizeMode='stretch' source={CityImage}>
            <Logo width={50} height={50} />
          </ImageBackground>
          <View style={{ marginTop: -50, marginHorizontal: 10, borderRadius: 10, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {this.renderContent()}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
const styles = StyleSheet.create({
  menuItem: {
    padding: 20,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: Theme.colors.white
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  lastItem: {
    marginBottom: 0
  },
  registerMessage: {
    backgroundColor: Theme.colors.secondary,
    color: Theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'center'
  }
})
