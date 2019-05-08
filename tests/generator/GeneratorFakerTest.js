'use strict'

import { GeneratorFaker } from '../../lib/index'

const gen = new GeneratorFaker()

test('test GeneratorFaker', () => {
  const val = gen.generate(1, { data: {} }, { config: 'name.firstName' })
  expect(val).toBeDefined()
})

test('test GeneratorFaker instanceid', () => {
  const val = gen.generate(3, { data: {} }, { config: 'name.firstName' })
  const val1 = gen.generate(3, { data: {} }, { config: 'name.firstName' })
  expect(val).toEqual(val1)
})
