import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'

const ProductOption = props => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginBottom: 10 }}>{props.title}: {props.selected[props.itemKey]}</Text>
      <FlatList
        extraData={props.selected}
        horizontal
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        renderItem={({ item }) => {
          if (props.type === 'color') {
            return <ProductColors item={item} selected={props.selected} onChange={props.onChange} />
          }
          return <Text
            onPress={() => props.onChange(item)}
            style={{ padding: 15, borderColor: props.selected.id === item.id ? 'green' : 'gray', borderWidth: 1, borderRadius: 3 }}>
            {item[props.itemKey]}
          </Text>
        }}
        data={props.list}
      />
    </View>
  )
}

ProductOption.defaultProps = {
  key: 'name',
  selected: {},
  onChang: (value) => value,
  type: 'normal'
}

const ProductColors = props => {
  return (
    <TouchableOpacity onPress={() => props.onChange(props.item)} style={{ backgroundColor: props.item.value, padding: 20, borderColor: props.selected.id === props.item.id ? 'green' : 'gray', borderWidth: 1, borderRadius: 3 }} />
  )
}

export default ProductOption
