import path from 'path'

import { TDGServiceRegistry } from '../lib/index'
import { DataGeneratorBase } from '../lib/index'

test('Test that registerGenerator could be retrieved', () => {
  const registry = new TDGServiceRegistry()

  registry.registerGenerator('myService', { myName: 'gum' })
  const generator = registry.getGenerator('myService')

  expect(generator).toEqual({ myName: 'gum', name: 'myService' })
})

test('Load store: useStore=false', async () => {
  const registry = new TDGServiceRegistry()

  const gen1 = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
  })

  const gen2 = new DataGeneratorBase(registry, {
    storeName: 'simpleStore2',
    varDir: path.join('tests', 'fixtures'),
  })

  registry.registerGenerator('gen1', gen1)
  registry.registerGenerator('gen2', gen2)

  expect(gen1.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })
  expect(gen2.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })

  await registry.loadStore()

  expect(gen1.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })
  expect(gen2.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })
})

test('Load store: useStore=true', async () => {
  const registry = new TDGServiceRegistry()

  const gen1 = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
    useStore: true,
  })

  const gen2 = new DataGeneratorBase(registry, {
    storeName: 'simpleStore2',
    varDir: path.join('tests', 'fixtures'),
    useStore: true,
  })

  registry.registerGenerator('gen1', gen1)
  registry.registerGenerator('gen2', gen2)

  expect(gen1.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })
  expect(gen2.getStoreData()).toEqual({ instanceData: [], uniqueSet: [] })

  await registry.loadStore()

  expect(gen1.getStoreData()).toEqual({
    instanceData: [
      ['T', 'Torsten'],
      ['H', 'Herbert'],
      ['J', 'John'],
      ['A', 'Amadir'],
    ],
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir'],
  })
  expect(gen2.getStoreData()).toEqual({
    instanceData: [
      ['TL', 'Torsten'],
      ['HB', 'Herbert'],
      ['JA', 'John'],
      ['AG', 'Amadir'],
    ],
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir'],
  })
})
