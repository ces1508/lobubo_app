import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login'
import QrReaderScreen from '../screens/qrReader'
import DrawerIcon from '../components/drawerIcon'

const Stack = createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <DrawerIcon navigation={navigation} />
    })
  },
  qrReader: QrReaderScreen
},
{
  initialRouteName: 'home'
})
const Drawer = createDrawerNavigator({
  home: {
    screen: Stack,
    navigationOptions: {
      drawerLabel: 'home'
    }
  },
  qrReader: {
    screen: QrReaderScreen,
    navigationOptions: {
      drawerLabel: 'Scannear'
    }
  },
  login: {
    screen: LoginScreen,
    navigationOptions: {
      drawerLabel: 'Entrar'
    }
  }
}, {
  drawerPosition: 'left',
  drawerType: 'slide'
})

export default createAppContainer(Drawer)
