jest.mock('react-native-device-info', () => {
  return {
    getUniqueID: jest.fn()
  }
})
// jest.mock('react-navigation', () => {
//   return {
//     createStackNavigator: jest.fn(),
//     createAppContainer: jest.fn(),
//     createDrawerNavigator:  jest.fn(),
//     createBottomTabNavigator: jest.fn(),
//     createMaterialTopTabNavigator: jest.fn()
//   }
// })
