import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login'
import ShoppingCartScreen from '../screens/shoppingCart'
import QrReaderScreen from '../screens/qrReader'
import DrawerIcon from '../components/drawerIcon'
import ShoppingCartIcon from '../components/shoppingCartIcon'

const Stack = createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <DrawerIcon navigation={navigation} />,
      headerRight: <ShoppingCartIcon navigation={navigation} />
    })
  },
  shoppingCart: {
    screen: ShoppingCartScreen,
    navigationOptions: {
      drawerLabel: 'Carrito de Compras'
    }
  },
  qrReader: {
    screen: QrReaderScreen,
    navigationOptions: {
      drawerLabel: 'Scannear'
    }
  }
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
  },
  shoppingCart: {
    screen: ShoppingCartScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Carrito de Compras'
      // drawerIcon: <ShoppingCartIcon navigation={navigation} />
    })
  }
}, {
  drawerPosition: 'left',
  drawerType: 'slide'
})

export default createAppContainer(Drawer)
