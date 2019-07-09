import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login'
import ShoppingCartScreen from '../screens/shoppingCart'
import QrReaderScreen from '../screens/qrReader'
import DrawerIcon from '../components/drawerIcon'
import ShoppingCartIcon from '../components/shoppingCartIcon'
import ProductsFavorites from '../screens/favorites/products'
import BrandFavorites from '../screens/favorites/brands'

const FavoriteStack = createBottomTabNavigator({
  products: ProductsFavorites,
  brands: BrandFavorites
})

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
  // favorites: FavoriteStack
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
  },
  favorites: {
    screen: FavoriteStack,
    navigationOptions: {
      title: 'Tus Favoritos'
    }
  }
}, {
  drawerPosition: 'left',
  drawerType: 'slide'
})

export default createAppContainer(Drawer)
