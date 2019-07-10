import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import numeral from 'numeral'

const Price = props => {
  const price = numeral(props.value).format('$0,0')
  return (
    <Text style={props.style}>
      {price} {props.currency}
    </Text>
  )
}

Price.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}
export default Price
