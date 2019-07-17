import React from 'react'
import Price from '../../src/components/price'
import rendered from 'react-test-renderer'

test('render correctly', () => {
  const tree = rendered.create(<Price value={25000} />)
  expect(tree).toMatchSnapshot()
})