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
import SideMenu from '../components/sideMenu'

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
      title: 'Carrito de Compras'
    }
  },
  qrReader: {
    screen: QrReaderScreen,
    navigationOptions: {
      title: 'Scannear'
    }
  },
  favorites: {
    screen: FavoriteStack,
    navigationOptions: {
      title: 'Mis Favoritos'
    }
  },
  login: {
    screen: LoginScreen
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
  }
}, {
  drawerPosition: 'left',
  drawerType: 'slide',
  contentComponent: SideMenu
})

export default createAppContainer(Drawer)
