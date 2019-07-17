import React from 'react'
import HelmetIcon from '../images/icons/HerramientasYConstruccion.svg'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'
import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login'
import ShoppingCartScreen from '../screens/shoppingCart'
import QrReaderScreen from '../screens/qrReader'
import DrawerIcon from '../components/drawerIcon'
import ShoppingCartIcon from '../components/shoppingCartIcon'
import ProductsFavorites from '../screens/favorites/products'
import BrandFavorites from '../screens/favorites/brands'
import ProductScreen from '../screens/product'
import SideMenu from '../components/sideMenu'
import ServicesScreen from '../screens/services'
import SearchScreen from '../screens/search'
import CategoriesScreen from '../screens/categories'
import ProductsByCategory from '../screens/productsByCategory'
import Theme from '../Theme'

// router to handle tabs in favorites
const FavoriteStack = createBottomTabNavigator({
  products: ProductsFavorites,
  brands: BrandFavorites
})

// stack to handle main tabs
const MainTabs = createBottomTabNavigator({
  products: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Productos',
      tabBarIcon: <Icons size={25} name='cube-outline' />
    }
  },
  services: {
    screen: ServicesScreen,
    navigationOptions: {
      tabBarLabel: 'Servicios',
      tabBarIcon: <HelmetIcon width={30} height={25} />
    }
  },
  scanner: {
    screen: QrReaderScreen,
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ focused, tintColor }) => (<Icons name='qrcode-scan' size={25} color='#fff' style={{ padding: 20, backgroundColor: focused ? tintColor : Theme.colors.primary, borderRadius: 50, zIndex: 20 }} />)
    }
  },
  categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      tabBarLabel: 'Categorias',
      tabBarIcon: <Icons name='format-list-bulleted' size={25} color='#000' />
    }
  },
  search: {
    screen: SearchScreen,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Buscar',
      tabBarIcon: <Icons name='magnify' size={25} color='#000' />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Theme.colors.secondary
  }
})

const productsAndServicesByCategory = createMaterialTopTabNavigator({
  productsByCategory: {
    screen: ProductsByCategory,
    navigationOptions: {
      tabBarLabel: 'Productos'
    }

  },
  servicesByCategory: {
    screen: ProductsByCategory,
    navigationOptions: {
      tabBarLabel: 'Servicios'
    }
  }
}, {
  lazy: true
})

// stack to wrapper al routes
const stack = createStackNavigator({
  home: {
    screen: MainTabs,
    navigationOptions: ({ navigation }) => ({
      title: 'Lobubo',
      headerLeft: <DrawerIcon navigation={navigation} />,
      headerRight: <ShoppingCartIcon navigation={navigation} />,
      tabBarLabel: 'productos',
      tabBarIcon: <Icons size={30} name='cube-outline' color='#000' />
    })
  },
  shoppingCart: {
    screen: ShoppingCartScreen,
    navigationOptions: {
      headerMode: 'float',
      title: 'Carrito de Compras'
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
  },
  product: {
    screen: ProductScreen,
    navigationOptions: {
      // headerStyle: { backgroundColor: 'transparent' }
    }
  },
  productsByCategory: {
    screen: productsAndServicesByCategory,
    navigationOptions: ({ navigation }) => {
      let category = navigation.getParam('category')
      return {
        title: category.attributes.name
      }
    }
  }
},
{
  initialRouteName: 'home'
})
const Drawer = createDrawerNavigator({
  home: {
    screen: stack,
    navigationOptions: {
      title: 'Productos'
    }
  }
})

// stack to add drawer to app
const AppStack = createDrawerNavigator({
  app: Drawer
}, {
  drawerPosition: 'left',
  drawerType: 'slide',
  contentComponent: SideMenu
})

export default createAppContainer(AppStack)
