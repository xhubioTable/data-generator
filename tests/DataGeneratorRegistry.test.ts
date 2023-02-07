import path from 'path'
import { LoggerMemory } from '@tlink/logger'

import {
  DataGeneratorOptions,
  DataGeneratorRegistry,
  DataGeneratorBase
} from '../src/index'

const FIXTURES = path.join(__dirname, 'fixtures')

const GENERATOR_OPTION = {
  name: 'gumbo',
  storeDir: '.',
  storeName: 'simpleStore',
  useStore: true
}

function getGeneratorOptions(): DataGeneratorOptions {
  const obj = JSON.parse(JSON.stringify(GENERATOR_OPTION))
  obj.logger = new LoggerMemory()
  obj.registry = new DataGeneratorRegistry()
  return obj
}

test('Test that registerGenerator could be retrieved', () => {
  const registry = new DataGeneratorRegistry()

  registry.registerGenerator('myService', {
    myName: 'gum'
  } as unknown as DataGeneratorBase)
  const generator = registry.getGenerator('myService')

  expect(generator).toEqual({ myName: 'gum', name: 'myService' })
})

test('Load store: useStore=false', async () => {
  const registry = new DataGeneratorRegistry()

  const options1 = getGeneratorOptions()
  options1.registry = registry
  options1.storeName = 'simpleStore'
  options1.storeDir = FIXTURES
  options1.useStore = false
  const gen1 = new DataGeneratorBase(options1)

  const options2 = getGeneratorOptions()
  options2.registry = registry
  options2.storeName = 'simpleStore2'
  options2.storeDir = FIXTURES
  options2.useStore = false
  const gen2 = new DataGeneratorBase(options2)

  registry.registerGenerator('gen1', gen1)
  registry.registerGenerator('gen2', gen2)

  await registry.loadStore()

  const store1 = {
    uniqueSet: Array.from(gen1.uniqueSet),
    instanceData: Array.from(gen1.instanceData)
  }

  const store2 = {
    uniqueSet: Array.from(gen2.uniqueSet),
    instanceData: Array.from(gen2.instanceData)
  }

  expect(store1).toEqual({ instanceData: [], uniqueSet: [] })
  expect(store2).toEqual({ instanceData: [], uniqueSet: [] })
})

test('Load store: useStore=true', async () => {
  const registry = new DataGeneratorRegistry()

  const options1 = getGeneratorOptions()
  options1.registry = registry
  options1.storeName = 'simpleStore'
  options1.storeDir = FIXTURES
  options1.useStore = true
  const gen1 = new DataGeneratorBase(options1)

  const options2 = getGeneratorOptions()
  options2.registry = registry
  options2.storeName = 'simpleStore2'
  options2.storeDir = FIXTURES
  options1.useStore = true
  const gen2 = new DataGeneratorBase(options2)

  registry.registerGenerator('gen1', gen1)
  registry.registerGenerator('gen2', gen2)

  await registry.loadStore()

  const store1 = {
    uniqueSet: Array.from(gen1.uniqueSet),
    instanceData: Array.from(gen1.instanceData)
  }

  const store2 = {
    uniqueSet: Array.from(gen2.uniqueSet),
    instanceData: Array.from(gen2.instanceData)
  }
  expect(store1).toEqual({
    instanceData: [
      ['T', 'Torsten'],
      ['H', 'Herbert'],
      ['J', 'John'],
      ['A', 'Amadir']
    ],
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir']
  })
  expect(store2).toEqual({
    instanceData: [
      ['TL', 'Torsten'],
      ['HB', 'Herbert'],
      ['JA', 'John'],
      ['AG', 'Amadir']
    ],
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir']
  })
})
