import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import SvgUri from 'react-native-svg-uri'
import Theme from '../../Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CategoryItem = props => {
  return (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('productsByCategory', { category: props.item })}
      style={styles.container}>
      <View style={styles.category}>
        <SvgUri
          width='25'
          height='25'
          fill='#fff'
          fillAll
          svgXmlData={props.item.attributes.icon.raw} />
      </View>
      <Text style={styles.categoryName}>
        {props.item.attributes.name}
      </Text>
      <Icon name='chevron-right' size={30} />
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  category: {
    backgroundColor: Theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryName: {
    marginLeft: 10,
    flex: 1
  }
})
