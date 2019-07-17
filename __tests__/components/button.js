import React from 'react'
import Button from '../../src/components/button'

import renderer from 'react-test-renderer'

test('render correctly', () => {
  const tree = renderer.create(<Button text='aceptar' />).toJSON()
  expect(tree).toMatchSnapshot()
})
test('render whit custom width', () => {
  const tree = renderer.create(<Button text='aceptar' width='200' />).toJSON()
  expect(tree).toMatchSnapshot()
})