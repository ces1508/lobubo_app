import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons//MaterialCommunityIcons'
import Share from 'react-native-share'
import PropTypes from 'prop-types'

const ShareIcon = props => {
  const handleClick = () => Share.open(props.options)
  return (
    <TouchableWithoutFeedback onPress={handleClick} >
      <View style={{ marginRight: 8, paddingHorizontal: 10 }}>
        <Icon name='share-variant' size={25} />
      </View>
    </TouchableWithoutFeedback>
  )
}

ShareIcon.propTypes = {
  options: PropTypes.object.isRequired
}
export default ShareIcon
