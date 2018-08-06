'use strict'

import { TDGServiceRegistry } from '../lib/index'

test('Test that registerGenerator could be retrieved', () => {
  const registry = new TDGServiceRegistry()

  registry.registerGenerator('myService', { myName: 'gum' })
  const generator = registry.getGenerator('myService')

  expect(generator).toEqual({ myName: 'gum', name: 'myService' })
})
