import React from 'react'
import {
  TouchableNativeFeedback,
  Image,
  StyleSheet
} from 'react-native'
import IconMenu from '../../images/icons/ico_menu.png'
const DrawerIcon = props => (
  <TouchableNativeFeedback
    style={{ backgroundColor: 'red', padding: 10, flex: 1 }}
    onPress={() => props.navigation.openDrawer()}>
    <Image
      source={IconMenu}
      style={styles.drawer} />
  </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
  drawer: {
    height: 20,
    width: 20,
    marginLeft: 20
  }
})

export default DrawerIcon
