import React from 'react'
import Input from '../../src/components/input'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import rendered from 'react-test-renderer'

test('render correctly', () => {
  const tree = rendered.create(<Input
    onChangeText= {text => text}/>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render with leftComponent', () => {
  const tree  = rendered.create(<Input
    onChangeText={text => text}
    leftIcon={<Icons name='account' />}
    />)
    expect(tree).toMatchSnapshot()
})